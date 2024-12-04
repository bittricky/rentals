import { IResolvers } from "@graphql-tools/utils";
import { ObjectId, Filter } from "mongodb";
import { Request } from "express";
import { Database, Listing, User, PropertyReview, ListingType } from "../../lib/types";
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
      _root: undefined,
      { id }: ListingArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<Listing> => {
      try {
        const listing = await db.listings.findOne({ _id: new ObjectId(id) });
        if (!listing) {
          throw new Error("listing can't be found");
        }

        const viewer = await authorize(db, req);
        if (viewer && viewer._id.toString() === listing.host.toString()) {
          listing.authorized = true;
        }

        return listing;
      } catch (error) {
        throw new Error(`Failed to query listing: ${error}`);
      }
    },
    listings: async (
      _root: undefined,
      { location, filter, propertyType, minPrice, maxPrice, limit, page }: ListingsArgs,
      { db }: { db: Database }
    ): Promise<ListingsData> => {
      try {
        const query: ListingsQuery = {};
        const data: ListingsData = {
          region: null,
          total: 0,
          result: [],
        };

        if (location) {
          const { country, admin, city } = await Google.geocode(location);

          if (city) query.city = city;
          if (admin) query.admin = admin;
          if (country) {
            query.country = country;
          } else {
            throw new Error("no country found");
          }

          const cityText = city ? `${city}, ` : "";
          const adminText = admin ? `${admin}, ` : "";
          data.region = `${cityText}${adminText}${country}`;
        }

        // Add property type filter
        if (propertyType) {
          query.type = propertyType as ListingType;
        }

        // Add price range filter
        if (minPrice !== undefined || maxPrice !== undefined) {
          query.price = {};
          if (minPrice !== undefined) {
            query.price.$gte = minPrice;
          }
          if (maxPrice !== undefined) {
            query.price.$lte = maxPrice;
          }
        }

        let cursor = db.listings.find(query as Filter<Listing>);

        if (filter === ListingsFilters.PRICE_LOW_TO_HIGH) {
          cursor = cursor.sort({ price: 1 });
        }

        if (filter === ListingsFilters.PRICE_HIGH_TO_LOW) {
          cursor = cursor.sort({ price: -1 });
        }

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.total = await db.listings.countDocuments(query as Filter<Listing>);
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
      const user = await db.users.findOne({ _id: new ObjectId(listing.host.toString()) });
      if (!user) {
        throw new Error("host can't be found");
      }
      
      // Verify the user is a host
      if (!user.isHost) {
        throw new Error("user is not a host");
      }

      return user;
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

        let cursor = db.bookings.find({
          _id: { $in: listing.bookings.map(id => new ObjectId(id)) },
        });

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.total = await db.bookings.countDocuments({
          _id: { $in: listing.bookings.map(id => new ObjectId(id)) },
        });

        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`Failed to query listing bookings: ${error}`);
      }
    },
    reviews: async (
      listing: Listing,
      { limit = 5, page = 1 }: { limit?: number; page?: number },
      { db }: { db: Database }
    ): Promise<{ total: number; result: PropertyReview[] }> => {
      try {
        // First get the total count
        const total = await db.propertyReviews.countDocuments({ 
          listing: listing._id 
        });

        // If there are no reviews, return early with empty result
        if (total === 0) {
          return {
            total: 0,
            result: [],
          };
        }

        // Then get the paginated data
        const result = await db.propertyReviews
          .find({ listing: listing._id })
          .sort({ createdAt: -1 })
          .skip(page > 0 ? (page - 1) * limit : 0)
          .limit(limit)
          .toArray();

        return {
          total,
          result,
        };
      } catch (error) {
        console.error(`Failed to query listing reviews: ${error}`);
        return {
          total: 0,
          result: [],
        };
      }
    }
  }
};
