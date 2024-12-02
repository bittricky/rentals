import { IResolvers } from "@graphql-tools/utils";
import { Request } from "express";
import { ObjectId } from "mongodb";
import { authorize } from "../../lib/utils";
import { Database, User } from "../../lib/types";
import {
  UserArgs,
  UserBookingsArgs,
  UserBookingsData,
  UserListingsArgs,
  UserListingsData,
} from "./types";
import { ContactHostInput, ContactHostResponse } from "./types";

export const userResolvers: IResolvers = {
  Query: {
    user: async (
      _,
      { id }: UserArgs,
      { db }: { db: Database; }
    ): Promise<User> => {
      try {
        const user = await db.users.findOne({ _id: new ObjectId(id) });

        if (!user) {
          throw new Error("user was not found");
        }

        const userWithAuth: User = {
          ...user,
          authorized: false
        };

        return userWithAuth;
      } catch (error) {
        throw new Error(`Failed to query user: ${error}`);
      }
    },
  },
  Mutation: {
    contactHost: async (
      _,
      { input }: { input: ContactHostInput },
      { db }: { db: Database }
    ): Promise<ContactHostResponse> => {
      try {
        const host = await db.users.findOne({ _id: new ObjectId(input.hostId) });
        const listing = await db.listings.findOne({ _id: new ObjectId(input.listingId) });

        if (!host || !listing) {
          throw new Error("Host or listing not found");
        }

        // In a real application, you would:
        // 1. Send an email to the host
        // 2. Store the contact request in the database
        // 3. Potentially create a conversation/thread

        return {
          success: true,
          message: "Contact request sent successfully"
        };
      } catch (error) {
        return {
          success: false,
          message: `Failed to contact host: ${error}`
        };
      }
    }
  },
  User: {
    id: (user: User): string => {
      return user._id.toString();
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
      { db, req }: { db: Database; req: Request }
    ): Promise<UserBookingsData | null> => {
      try {
        const viewer = await authorize(db, req);
        if (viewer && viewer._id.toString() === user._id.toString()) {
          user.authorized = true;
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
      { db, req }: { db: Database; req: Request }
    ): Promise<UserListingsData | null> => {
      try {
        const viewer = await authorize(db, req);
        if (viewer && viewer._id.toString() === user._id.toString()) {
          user.authorized = true;
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
