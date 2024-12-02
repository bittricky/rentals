import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { Database, PropertyReview, Listing, User } from "../../lib/types";
import { authorize } from "../utils";

export const propertyReviewResolvers: IResolvers = {
  Query: {
    propertyReviews: async (
      _root: undefined,
      { listingId, limit, page }: { listingId: string; limit: number; page: number },
      { db }: { db: Database }
    ): Promise<{ total: number; result: PropertyReview[] }> => {
      try {
        const data = await db.propertyReviews
          .find({ listing: new ObjectId(listingId) })
          .skip(page > 0 ? (page - 1) * limit : 0)
          .limit(limit)
          .toArray();

        const total = await db.propertyReviews.countDocuments({ listing: new ObjectId(listingId) });

        return {
          total,
          result: data,
        };
      } catch (error) {
        throw new Error(`Failed to query property reviews: ${error}`);
      }
    },
  },
  Mutation: {
    addPropertyReview: async (
      _root: undefined,
      {
        listingId,
        input,
      }: {
        listingId: string;
        input: { content: string; rating: number };
      },
      { db, req }: { db: Database; req: Request }
    ): Promise<PropertyReview> => {
      try {
        const viewer = await authorize(db, req);
        if (!viewer) {
          throw new Error("Viewer cannot be found");
        }

        const listing = await db.listings.findOne({ _id: new ObjectId(listingId) });
        if (!listing) {
          throw new Error("Listing cannot be found");
        }

        const review: PropertyReview = {
          _id: new ObjectId(),
          listing: listing._id,
          author: new ObjectId(viewer._id),
          content: input.content,
          rating: input.rating,
          createdAt: new Date().toISOString(),
        };

        await db.propertyReviews.insertOne(review);

        // Update listing with review reference and recalculate average
        const listingReviews = await db.propertyReviews
          .find({ listing: listing._id })
          .toArray();
        
        const avgRating = listingReviews.reduce((acc, r) => acc + r.rating, 0) / listingReviews.length;

        await db.listings.updateOne(
          { _id: listing._id },
          {
            $push: { reviews: review._id },
            $set: {
              averageRating: avgRating,
              reviewCount: listingReviews.length,
            },
          }
        );

        return review;
      } catch (error) {
        throw new Error(`Failed to add property review: ${error}`);
      }
    },
  },
  PropertyReview: {
    id: (review: PropertyReview): string => review._id.toString(),
    listing: async (
      review: PropertyReview,
      _args: {},
      { db }: { db: Database }
    ): Promise<Listing> => {
      const listing = await db.listings.findOne({ _id: review.listing });
      if (!listing) {
        throw new Error("Listing cannot be found");
      }
      return listing;
    },
    author: async (
      review: PropertyReview,
      _args: {},
      { db }: { db: Database }
    ): Promise<User> => {
      const user = await db.users.findOne({ _id: review.author });
      if (!user) {
        throw new Error("User cannot be found");
      }
      return user;
    },
  },
};
