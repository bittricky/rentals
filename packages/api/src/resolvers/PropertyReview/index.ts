import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { Database, PropertyReview, Listing, User } from "../../lib/types";
import { Request } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request to include our user property
interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
  };
}

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
      { db, req }: { db: Database; req: AuthenticatedRequest }
    ): Promise<PropertyReview> => {
      try {
        // Check if user is authenticated via JWT token
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          throw new Error("Authentication required");
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
          throw new Error("Invalid authentication token");
        }

        // Verify JWT token and get userId
        const JWT_SECRET = process.env.JWT_SECRET as string;
        if (!JWT_SECRET) {
          throw new Error("JWT_SECRET is not configured");
        }

        try {
          const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
          if (!decoded.userId) {
            throw new Error("Invalid token payload");
          }
          
          // Find the authenticated user
          const viewer = await db.users.findOne({ 
            _id: new ObjectId(decoded.userId)
          });
          
          if (!viewer) {
            throw new Error("User not found");
          }

          // Check if listing exists
          const listing = await db.listings.findOne({ _id: new ObjectId(listingId) });
          if (!listing) {
            throw new Error("Listing not found");
          }

          // Check if user has already reviewed this listing
          const existingReview = await db.propertyReviews.findOne({
            listing: new ObjectId(listingId),
            author: viewer._id
          });

          if (existingReview) {
            throw new Error("You have already reviewed this property");
          }

          // Create the new review
          const newReview: PropertyReview = {
            _id: new ObjectId(),
            listing: new ObjectId(listingId),
            author: viewer._id,
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
        } catch (jwtError) {
          throw new Error(`Authentication failed: ${jwtError}`);
        }
      } catch (error) {
        throw new Error(`Failed to create property review: ${error}`);
      }
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
  }
};
