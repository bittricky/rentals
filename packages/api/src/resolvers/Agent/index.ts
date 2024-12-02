import { IResolvers } from "@graphql-tools/utils";
import { Database, Agent, User } from "../../lib/types";
import { 
  AgentsArgs, 
  AgentArgs, 
  AgentReviewsArgs,
  ReviewsArgs,
  AgentReviewsData,
  AgentsData 
} from "./types";
import { ObjectId } from "mongodb";

export const agentResolvers: IResolvers = {
  Query: {
    agents: async (
      _root: undefined,
      { limit, page }: AgentsArgs,
      { db }: { db: Database }
    ): Promise<AgentsData> => {
      try {
        const data = await db.agents
          .find({})
          .skip(page > 0 ? (page - 1) * limit : 0)
          .limit(limit)
          .toArray();

        const total = await db.agents.countDocuments({});

        return {
          total,
          result: data,
        };
      } catch (error) {
        throw new Error(`Failed to query agents: ${error}`);
      }
    },
    agent: async (
      _root: undefined,
      { id }: AgentArgs,
      { db }: { db: Database }
    ): Promise<Agent> => {
      try {
        const agent = await db.agents.findOne({ _id: new ObjectId(id) });
        if (!agent) {
          throw new Error("Agent not found");
        }
        return agent;
      } catch (error) {
        throw new Error(`Failed to query agent: ${error}`);
      }
    },
    agentReviews: async (
      _root: undefined,
      { agentId, limit, page }: AgentReviewsArgs,
      { db }: { db: Database }
    ): Promise<AgentReviewsData> => {
      try {
        const data = await db.agentReviews
          .find({ agent: new ObjectId(agentId) })
          .sort({ createdAt: -1 })
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
    }
  },
  Agent: {
    id: (agent: Agent): string => agent._id.toString(),
    user: async (agent: Agent, _args: {}, { db }: { db: Database }): Promise<User> => {
      try {
        const user = await db.users.findOne({ _id: agent.user });
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        throw new Error(`Failed to query user: ${error}`);
      }
    },
    reviews: async (
      agent: Agent,
      { limit, page }: ReviewsArgs,
      { db }: { db: Database }
    ): Promise<AgentReviewsData> => {
      try {
        const data = await db.agentReviews
          .find({ agent: agent._id })
          .sort({ createdAt: -1 })
          .skip(page > 0 ? (page - 1) * limit : 0)
          .limit(limit)
          .toArray();

        const total = await db.agentReviews.countDocuments({ agent: agent._id });

        return {
          total,
          result: data,
        };
      } catch (error) {
        throw new Error(`Failed to query agent reviews: ${error}`);
      }
    },
    ratings: async (agent: Agent, _args: {}, { db }: { db: Database }): Promise<number> => {
      try {
        const reviews = await db.agentReviews.find({ agent: agent._id }).toArray();
        if (reviews.length === 0) return 0;
        
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return totalRating / reviews.length;
      } catch (error) {
        throw new Error(`Failed to calculate agent ratings: ${error}`);
      }
    },
    reviewCount: async (agent: Agent, _args: {}, { db }: { db: Database }): Promise<number> => {
      try {
        return await db.agentReviews.countDocuments({ agent: agent._id });
      } catch (error) {
        throw new Error(`Failed to count agent reviews: ${error}`);
      }
    }
  },
  User: {
    isAgent: async (user: User, _args: {}, { db }: { db: Database }): Promise<boolean> => {
      try {
        const agent = await db.agents.findOne({ user: user._id });
        return !!agent;
      } catch (error) {
        throw new Error(`Failed to check if user is agent: ${error}`);
      }
    },
    agentProfile: async (user: User, _args: {}, { db }: { db: Database }): Promise<Agent | null> => {
      try {
        return await db.agents.findOne({ user: user._id });
      } catch (error) {
        throw new Error(`Failed to get agent profile: ${error}`);
      }
    }
  }
};
