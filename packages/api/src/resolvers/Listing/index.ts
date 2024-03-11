import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { Request } from "express";
import { Database, Listing, User } from "../../lib/types";
import { Google } from "../../lib/api";
import { authorize } from "../../lib/utils";
import {
  ListingArgs,
  ListingBookingsArgs,
  ListingBookingsData,
  ListingsArgs,
  ListingsData,
  ListingsFilters,
  ListingsQuery,
} from "./types";

export const listingResolvers: IResolvers = {
  Query: {
    listing: async (
      _: undefined,
      { id }: ListingArgs,
      { db, req }: { db: Database; req: Request }
    ) => {
      try {
        const listing = await db.listings.findOne({ _id: new ObjectId(id) });
        if (!listing) {
          throw new Error("listing can't be found");
        }

        const viewer = await authorize(db, req);

        if (viewer && viewer._id === listing.host) {
          listing.authorized = true;
        }

        return listing;
      } catch (err) {
        throw new Error(`Failed to query lisitng: ${err}`);
      }
    },
    listings: async (
      _: undefined,
      { location, filter, limit, page }: ListingsArgs,
      { db }: { db: Database }
    ): Promise<ListingsData> => {
      try {
        const query: ListingsQuery = {};
        const data: ListingsData = {
          region: null,
          total: 0,
          result: [],
        };

        data.total = await db.listings.countDocuments();

        if (location) {
          const { country, admin, city } = await Google.geocode(location);

          if (city) {
            query.city = city;
          }

          if (admin) {
            query.admin = admin;
          }

          if (country) {
            query.country = country;
          } else {
            throw new Error("No Country was found");
          }

          const cityText = city ? `${city}, ` : "";
          const adminText = admin ? `${admin}, ` : "";
          data.region = `${cityText}${adminText}${country}`;
        }

        const cursor = db.listings
          .find(query)
          .skip(page > 0 ? (page - 1) * limit : 0)
          .limit(limit);

        if (filter && filter === ListingsFilters.PRICE_LOW_TO_HIGH) {
          cursor.sort({ price: 1 }); //1 sorting ascending order
        }

        if (filter && filter === ListingsFilters.PRICE_HIGH_TO_LOW) {
          cursor.sort({ price: -1 }); //-1 sorting descending order
        }

        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`Failed to query listings: ${error}`);
      }
    },
  },
  Listing: {
    id: (listing: Listing): string => {
      return listing._id.toString();
    },
    host: async (
      listing: Listing,
      _args: {},
      { db }: { db: Database }
    ): Promise<User> => {
      const host = await db.users.findOne({ _id: listing.host });

      if (!host) {
        throw new Error("host wasn't found");
      }

      return host;
    },
    bookingsIndex: (listing: Listing): string => {
      return JSON.stringify(listing.bookingsIndex);
    },
    bookings: async (
      listing: Listing,
      { limit, page }: ListingBookingsArgs,
      { db }: { db: Database }
    ): Promise<ListingBookingsData | null> => {
      try {
        if (!listing.authorized) {
          return null;
        }

        const data: ListingBookingsData = {
          total: 0,
          result: [],
        };

        const query = {
          _id: { $in: listing.bookings },
        };

        data.total = await db.bookings.countDocuments(query);

        const cursor = db.bookings
          .find(query)
          .skip(page > 0 ? (page - 1) * limit : 0)
          .limit(limit);

        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`Failed to query listing bookings: ${error}`);
      }
    },
  },
};
