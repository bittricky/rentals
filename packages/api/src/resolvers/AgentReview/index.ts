import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { Database, AgentReview, User, Agent } from "../../lib/types";
import { authorize } from "../../lib/utils";

interface ReviewInput {
  content: string;
  rating: number;
}

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
          .sort({ createdAt: -1 })
          .skip(page > 0 ? (page - 1) * limit : 0)
          .limit(limit)
          .toArray();

        const total = await db.agentReviews.countDocuments({
          agent: new ObjectId(agentId)
        });

        return {
          total,
          result: data
        };
      } catch (error) {
        throw new Error(`Failed to query agent reviews: ${error}`);
      }
    }
  },
  Mutation: {
    addAgentReview: async (
      _root: undefined,
      { agentId, input }: { agentId: string; input: ReviewInput },
      { db, req }: { db: Database; req: any }
    ): Promise<AgentReview> => {
      try {
        const viewer = await authorize(db, req);
        if (!viewer) {
          throw new Error("Not authorized");
        }

        const agent = await db.agents.findOne({ _id: new ObjectId(agentId) });
        if (!agent) {
          throw new Error("Agent not found");
        }

        // Check if user has already reviewed this agent
        const existingReview = await db.agentReviews.findOne({
          agent: new ObjectId(agentId),
          author: viewer._id
        });

        if (existingReview) {
          throw new Error("You have already reviewed this agent");
        }

        const review: AgentReview = {
          _id: new ObjectId(),
          agent: agent._id,
          author: viewer._id,
          content: input.content,
          rating: input.rating,
          createdAt: new Date().toISOString()
        };

        await db.agentReviews.insertOne(review);

        // Update agent's review stats
        const reviews = await db.agentReviews
          .find({ agent: agent._id })
          .toArray();

        const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

        await db.agents.updateOne(
          { _id: agent._id },
          {
            $set: {
              ratings: averageRating,
              reviewCount: reviews.length
            }
          }
        );

        return review;
      } catch (error) {
        throw new Error(`Failed to add agent review: ${error}`);
      }
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
      const author = await db.users.findOne({ _id: new ObjectId(review.author.toString()) });
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
      const agent = await db.agents.findOne({ _id: new ObjectId(review.agent.toString()) });
      if (!agent) {
        throw new Error("Agent not found");
      }
      return agent;
    }
  }
};
