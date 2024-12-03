import { IResolvers } from "@graphql-tools/utils";
import { Request } from "express";
import { ObjectId } from "mongodb";
import { createIdFilter, idToString, authorize } from "../../lib/utils";
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
      { db, req }: { db: Database; req: Request }
    ): Promise<User> => {
      try {
        const user = await db.users.findOne(createIdFilter(id));

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
  Mutation: {
    contactHost: async (
      _,
      { input }: { input: ContactHostInput },
      { db, req }: { db: Database; req: Request }
    ): Promise<ContactHostResponse> => {
      try {
        const viewer = await authorize(db, req);
        if (!viewer) {
          throw new Error("viewer not found");
        }

        const host = await db.users.findOne(createIdFilter(input.hostId));
        const listing = await db.listings.findOne({ _id: new ObjectId(input.listingId) });

        if (!host || !listing) {
          throw new Error("Host or listing not found");
        }

        // Send email or notification to host
        console.log(`Contact request from ${input.name} (${input.email}) to host ${idToString(host._id)}`);
        console.log(`Message: ${input.message}`);

        return {
          success: true,
          message: "Contact request sent successfully"
        };
      } catch (error) {
        console.error("Failed to contact host:", error);
        return {
          success: false,
          message: "Failed to send contact request"
        };
      }
    }
  },
  User: {
    id(user: User): string {
      return idToString(user._id);
    },
    hasWallet(user: User): boolean {
      return Boolean(user.walletId);
    },
    income(user: User): number | null {
      return user.income;
    },
    async bookings(
      user: User,
      { limit, page }: UserBookingsArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<UserBookingsData | null> {
      try {
        const viewer = await authorize(db, req);
        if (!viewer || viewer._id !== user._id) {
          throw new Error("not authorized");
        }

        if (!user.bookings) {
          return null;
        }

        const data: UserBookingsData = {
          total: 0,
          result: [],
        };

        const cursor = db.bookings
          .find({
            _id: { $in: user.bookings }
          })
          .skip(page > 0 ? (page - 1) * limit : 0)
          .limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`Failed to query user bookings: ${error}`);
      }
    },
    async listings(
      user: User,
      { limit, page }: UserListingsArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<UserListingsData | null> {
      try {
        const viewer = await authorize(db, req);
        if (!viewer || viewer._id !== user._id) {
          throw new Error("not authorized");
        }

        const data: UserListingsData = {
          total: 0,
          result: [],
        };

        let cursor = db.listings.find({
          _id: { $in: user.listings }
        });

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`Failed to query user listings: ${error}`);
      }
    }
  },
};
