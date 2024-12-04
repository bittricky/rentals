import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { Database, Host, User, HostReview } from "../../lib/types";
import { authorize } from "../../lib/utils";
import { HostReviewsArgs, HostReviewsData } from "./types";

export const hostResolvers: IResolvers = {
  Query: {
    host: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Host> => {
      try {
        const host = await db.hosts.findOne({ _id: new ObjectId(id) });
        if (!host) {
          throw new Error("Host not found");
        }
        return host;
      } catch (error) {
        throw new Error(`Failed to query host: ${error}`);
      }
    },
    hosts: async (
      _root: undefined,
      { limit, page }: { limit: number; page: number },
      { db }: { db: Database }
    ): Promise<{ total: number; result: Host[] }> => {
      try {
        const data = await db.hosts
          .find({})
          .sort({ ratings: -1 })
          .skip(page > 0 ? (page - 1) * limit : 0)
          .limit(limit)
          .toArray();

        const total = await db.hosts.countDocuments();

        return {
          total,
          result: data,
        };
      } catch (error) {
        throw new Error(`Failed to query hosts: ${error}`);
      }
    }
  },
  Host: {
    id: (host: Host): string => host._id.toString(),
    user: async (
      host: Host,
      _args: {},
      { db }: { db: Database }
    ): Promise<User> => {
      const user = await db.users.findOne({ _id: host.user });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    },
    reviews: async (
      host: Host,
      { limit, page }: HostReviewsArgs,
      { db }: { db: Database }
    ): Promise<HostReviewsData> => {
      try {
        const data = await db.hostReviews
          .find({ host: host._id })
          .sort({ createdAt: -1 })
          .skip(page > 0 ? (page - 1) * limit : 0)
          .limit(limit)
          .toArray();

        const total = await db.hostReviews.countDocuments({ host: host._id });

        return {
          total,
          result: data,
        };
      } catch (error) {
        throw new Error(`Failed to query host reviews: ${error}`);
      }
    }
  },
  User: {
    isHost: async (user: User, _args: {}, { db }: { db: Database }): Promise<boolean> => {
      try {
        const host = await db.hosts.findOne({ user: user._id });
        return !!host;
      } catch (error) {
        throw new Error(`Failed to check if user is host: ${error}`);
      }
    },
    hostProfile: async (user: User, _args: {}, { db }: { db: Database }): Promise<Host | null> => {
      try {
        return await db.hosts.findOne({ user: user._id });
      } catch (error) {
        throw new Error(`Failed to get host profile: ${error}`);
      }
    }
  }
};
