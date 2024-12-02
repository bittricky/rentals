import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { Database, AgentReview, Agent, User } from "../../lib/types";
import { authorize } from "../utils";

export const agentReviewResolvers: IResolvers = {
  Query: {
    agentReviews: async (
      _root: undefined,
      { agentId, limit, page }: { agentId: string; limit: number; page: number },
      { db }: { db: Database }
    ): Promise<{ total: number; result: AgentReview[] }> => {
      try {
        const data = await db.agentReviews
          .find({ agent: new ObjectId(agentId) })
          .skip(page > 0 ? (page - 1) * limit : 0)
          .limit(limit)
          .toArray();

        const total = await db.agentReviews.countDocuments({ agent: new ObjectId(agentId) });

        return {
          total,
          result: data,
        };
      } catch (error) {
        throw new Error(`Failed to query agent reviews: ${error}`);
      }
    },
  },
  Mutation: {
    addAgentReview: async (
      _root: undefined,
      {
        agentId,
        input,
      }: {
        agentId: string;
        input: { content: string; rating: number };
      },
      { db, req }: { db: Database; req: Request }
    ): Promise<AgentReview> => {
      try {
        const viewer = await authorize(db, req);
        if (!viewer) {
          throw new Error("Viewer cannot be found");
        }

        const agent = await db.agents.findOne({ _id: new ObjectId(agentId) });
        if (!agent) {
          throw new Error("Agent cannot be found");
        }

        const review: AgentReview = {
          _id: new ObjectId(),
          agent: agent._id,
          author: new ObjectId(viewer._id),
          content: input.content,
          rating: input.rating,
          createdAt: new Date().toISOString(),
        };

        await db.agentReviews.insertOne(review);

        // Update agent ratings and review count
        const agentReviews = await db.agentReviews
          .find({ agent: agent._id })
          .toArray();
        
        const avgRating = agentReviews.reduce((acc, r) => acc + r.rating, 0) / agentReviews.length;

        await db.agents.updateOne(
          { _id: agent._id },
          {
            $set: {
              ratings: avgRating,
              reviewCount: agentReviews.length,
            },
          }
        );

        return review;
      } catch (error) {
        throw new Error(`Failed to add agent review: ${error}`);
      }
    },
  },
  AgentReview: {
    id: (review: AgentReview): string => review._id.toString(),
    agent: async (
      review: AgentReview,
      _args: {},
      { db }: { db: Database }
    ): Promise<Agent> => {
      const agent = await db.agents.findOne({ _id: review.agent });
      if (!agent) {
        throw new Error("Agent cannot be found");
      }
      return agent;
    },
    author: async (
      review: AgentReview,
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
