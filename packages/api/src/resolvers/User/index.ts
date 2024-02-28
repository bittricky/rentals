import { IResolvers } from "@graphql-tools/utils";
import { Request } from "express";
import { Database, User } from "../../lib/types";
import { authorize } from "../../lib/utils";
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

        const viewer = await authorize(db, req);

        if (viewer && viewer._id === user._id) {
          user.authorized = true;
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
      { db }: { db: Database }
    ): Promise<UserBookingsData | null> => {
      try {
        if (!user.authorized) {
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
      { db }: { db: Database }
    ): Promise<UserListingsData | null> => {
      try {
        if (!user.authorized) {
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
