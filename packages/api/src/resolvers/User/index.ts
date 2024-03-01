import { IResolvers } from "@graphql-tools/utils";
import { Request } from "express";
import { Database, User, Viewer } from "../../lib/types";
import {
  UserArgs,
  UserBookingsArgs,
  UserBookingsData,
  UserListingsArgs,
  UserListingsData,
} from "./types";

export const userResolvers: IResolvers = {
  Query: {
    user: async (
      _,
      { id }: UserArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<User> => {
      try {
        const user = await db.users.findOne({ _id: id });

        if (!user) {
          throw new Error("user was not found");
        }

        return user;
      } catch (error) {
        throw new Error(`Failed to query user: ${error}`);
      }
    },
  },
  User: {
    id: (user: User): string => {
      return user._id;
    },
    hasWallet: (user: User): boolean => {
      return Boolean(user.walletId);
    },
    income: (user: User): number | null => {
      return user.authorized ? user.income : null;
    },
    bookings: async (
      user: User,
      { limit, page }: UserBookingsArgs,
      { db, viewer }: { db: Database; viewer: Viewer }
    ): Promise<UserBookingsData | null> => {
      try {
        if (viewer._id !== user._id) {
          return null;
        }

        const data: UserBookingsData = {
          total: 0,
          result: [],
        };

        const query = {
          _id: { $in: user.bookings },
        };

        data.total = await db.bookings.countDocuments(query);

        const cursor = db.bookings
          .find(query)
          .skip(page > 0 ? (page - 1) * limit : 0)
          .limit(limit);

        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`Failed to query user bookings: ${error}`);
      }
    },
    listings: async (
      user: User,
      { limit, page }: UserListingsArgs,
      { db, viewer }: { db: Database; viewer: Viewer }
    ): Promise<UserListingsData | null> => {
      try {
        if (viewer._id !== user._id) {
          return null;
        }

        const data: UserListingsData = {
          total: 0,
          result: [],
        };

        const query = {
          _id: { $in: user.listings },
        };

        data.total = await db.listings.countDocuments(query);

        const cursor = db.listings
          .find(query)
          .skip(page > 0 ? (page - 1) * limit : 0)
          .limit(limit);

        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`Failed to query user listings: ${error}`);
      }
    },
  },
};
