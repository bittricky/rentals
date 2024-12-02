import { IResolvers } from "@graphql-tools/utils";
import { Database, Agent, User, AgentReview } from "../../lib/types";
import { AgentsArgs, AgentArgs } from "./types";
import { ObjectId } from "mongodb";

export const agentResolvers: IResolvers = {
  Query: {
    agents: async (
      _root: undefined,
      { limit, page }: AgentsArgs,
      { db }: { db: Database }
    ): Promise<{ total: number; result: Agent[] }> => {
      try {
        const data: Agent[] = await db.agents
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
      _args: {},
      { db }: { db: Database }
    ): Promise<AgentReview[]> => {
      try {
        const reviews = await db.agentReviews
          .find({ agent: agent._id })
          .sort({ createdAt: -1 })
          .toArray();
        return reviews;
      } catch (error) {
        throw new Error(`Failed to query agent reviews: ${error}`);
      }
    }
  },
  User: {
    isAgent: async (user: User, _args: {}, { db }: { db: Database }): Promise<boolean> => {
      try {
        return user.isAgent || false;
      } catch (error) {
        throw new Error(`Failed to determine agent status: ${error}`);
      }
    },
    agentProfile: async (user: User, _args: {}, { db }: { db: Database }): Promise<Agent | null> => {
      try {
        if (!user.agentProfile) {
          return null;
        }
        const agent = await db.agents.findOne({ _id: user.agentProfile });
        return agent || null;
      } catch (error) {
        throw new Error(`Failed to query agent profile: ${error}`);
      }
    },
  },
};
