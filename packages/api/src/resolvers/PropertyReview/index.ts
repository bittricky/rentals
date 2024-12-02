import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { Database, PropertyReview, Listing, User } from "../../lib/types";
import { authorize } from "../../lib/utils";

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
          .sort({ createdAt: -1 })
          .skip(page > 0 ? (page - 1) * limit : 0)
          .limit(limit)
          .toArray();

        const total = await db.propertyReviews.countDocuments({ 
          listing: new ObjectId(listingId) 
        });

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
    createPropertyReview: async (
      _root: undefined,
      {
        listingId,
        content,
        rating
      }: {
        listingId: string;
        content: string;
        rating: number;
      },
      { db, req }: { db: Database; req: { user?: { _id: string } } }
    ): Promise<PropertyReview> => {
      const viewer = await authorize(db, req);
      if (!viewer) {
        throw new Error("Viewer cannot be found");
      }

      const listing = await db.listings.findOne({ _id: new ObjectId(listingId) });
      if (!listing) {
        throw new Error("Listing not found");
      }

      const newReview: PropertyReview = {
        _id: new ObjectId(),
        listing: new ObjectId(listingId),
        author: new ObjectId(viewer._id),
        content,
        rating,
        createdAt: new Date().toISOString()
      };

      await db.propertyReviews.insertOne(newReview);

      // Update listing's review stats
      const reviews = await db.propertyReviews
        .find({ listing: new ObjectId(listingId) })
        .toArray();
      
      const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
      
      await db.listings.updateOne(
        { _id: new ObjectId(listingId) },
        {
          $set: {
            averageRating,
            reviewCount: reviews.length
          }
        }
      );

      return newReview;
    }
  },
  PropertyReview: {
    id: (review: PropertyReview): string => {
      return review._id.toString();
    },
    author: async (
      review: PropertyReview,
      _args: {},
      { db }: { db: Database }
    ): Promise<User> => {
      const author = await db.users.findOne({ _id: new ObjectId(review.author.toString()) });
      if (!author) {
        throw new Error("Author not found");
      }
      return author;
    },
    listing: async (
      review: PropertyReview,
      _args: {},
      { db }: { db: Database }
    ): Promise<Listing> => {
      const listing = await db.listings.findOne({ _id: new ObjectId(review.listing.toString()) });
      if (!listing) {
        throw new Error("Listing not found");
      }
      return listing;
    }
  },
};
