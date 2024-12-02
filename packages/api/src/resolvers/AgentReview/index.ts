import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { Database, AgentReview, Agent, User } from "../../lib/types";
import { authorize } from "../../lib/utils";

export const agentReviewResolvers: IResolvers = {
  Query: {
    agentReviews: async (
      _root: undefined,
      { agentId }: { agentId: string },
      { db }: { db: Database }
    ): Promise<AgentReview[]> => {
      return await db.agentReviews
        .find({ agent: new ObjectId(agentId) })
        .sort({ createdAt: -1 })
        .toArray();
    }
  },
  Mutation: {
    createAgentReview: async (
      _root: undefined,
      {
        agentId,
        content,
        rating
      }: {
        agentId: string;
        content: string;
        rating: number;
      },
      { db, req }: { db: Database; req: { user?: { _id: string } } }
    ): Promise<AgentReview> => {
      if (!req.user) {
        throw new Error("User must be logged in to create a review");
      }

      const viewer = await authorize(db, req);
      if (!viewer) {
        throw new Error("Viewer cannot be found");
      }

      const agent = await db.agents.findOne({ _id: new ObjectId(agentId) });
      if (!agent) {
        throw new Error("Agent not found");
      }

      const newReview: AgentReview = {
        _id: new ObjectId(),
        agent: new ObjectId(agentId),
        author: new ObjectId(viewer._id),
        content,
        rating,
        createdAt: new Date().toISOString()
      };

      await db.agentReviews.insertOne(newReview);

      // Update agent's review stats
      const reviews = await db.agentReviews
        .find({ agent: new ObjectId(agentId) })
        .toArray();
      
      const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
      
      await db.agents.updateOne(
        { _id: new ObjectId(agentId) },
        {
          $set: {
            ratings: averageRating,
            reviewCount: reviews.length
          }
        }
      );

      return newReview;
    }
  },
  AgentReview: {
    id: (review: AgentReview): string => {
      return review._id.toString();
    },
    author: async (
      review: AgentReview,
      _args: {},
      { db }: { db: Database }
    ): Promise<User> => {
      const author = await db.users.findOne({ _id: new ObjectId(review.author) });
      if (!author) {
        throw new Error("Author not found");
      }
      return author;
    },
    agent: async (
      review: AgentReview,
      _args: {},
      { db }: { db: Database }
    ): Promise<Agent> => {
      const agent = await db.agents.findOne({ _id: new ObjectId(review.agent) });
      if (!agent) {
        throw new Error("Agent not found");
      }
      return agent;
    }
  }
};
