import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { Database, Host, User, HostReview } from "../../lib/types";
import { authorize } from "../../lib/utils";

interface ReviewInput {
  content: string;
  rating: number;
}

export const hostReviewResolvers: IResolvers = {
  Query: {
    hostReviews: async (
      _root: undefined,
      { hostId, limit, page }: { hostId: string; limit: number; page: number },
      { db }: { db: Database }
    ): Promise<{ total: number; result: HostReview[] }> => {
      try {
        const data = await db.hostReviews
          .find({ host: new ObjectId(hostId) })
          .sort({ createdAt: -1 })
          .skip(page > 0 ? (page - 1) * limit : 0)
          .limit(limit)
          .toArray();

        const total = await db.hostReviews.countDocuments({
          host: new ObjectId(hostId)
        });

        return {
          total,
          result: data
        };
      } catch (error) {
        throw new Error(`Failed to query host reviews: ${error}`);
      }
    }
  },
  Mutation: {
    addHostReview: async (
      _root: undefined,
      { hostId, input }: { hostId: string; input: ReviewInput },
      { db, req }: { db: Database; req: any }
    ): Promise<HostReview> => {
      try {
        const viewer = await authorize(db, req);
        if (!viewer) {
          throw new Error("You must be logged in to leave a review");
        }

        const host = await db.hosts.findOne({ _id: new ObjectId(hostId) });
        if (!host) {
          throw new Error("Host not found");
        }

        // Check if user has already reviewed this host
        const existingReview = await db.hostReviews.findOne({
          host: new ObjectId(hostId),
          author: viewer._id
        });

        if (existingReview) {
          throw new Error("You have already reviewed this host");
        }

        const { content, rating } = input;

        const review: HostReview = {
          _id: new ObjectId(),
          host: new ObjectId(hostId),
          author: viewer._id,
          content,
          rating,
          createdAt: new Date().toISOString(),
        };

        await db.hostReviews.insertOne(review);

        // Update host ratings and review count
        const reviews = await db.hostReviews.find({ host: new ObjectId(hostId) }).toArray();
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;

        await db.hosts.updateOne(
          { _id: new ObjectId(hostId) },
          {
            $set: {
              ratings: averageRating,
              reviewCount: reviews.length,
            },
          }
        );

        return review;
      } catch (error) {
        throw new Error(`Failed to add host review: ${error}`);
      }
    }
  },
  HostReview: {
    id: (review: HostReview): string => review._id.toString(),
    host: async (
      review: HostReview,
      _args: {},
      { db }: { db: Database }
    ): Promise<Host> => {
      const host = await db.hosts.findOne({ _id: review.host });
      if (!host) {
        throw new Error("Host not found");
      }
      return host;
    },
    author: async (
      review: HostReview,
      _args: {},
      { db }: { db: Database }
    ): Promise<User> => {
      const author = await db.users.findOne({ _id: review.author });
      if (!author) {
        throw new Error("Author not found");
      }
      return author;
    },
  },
};
