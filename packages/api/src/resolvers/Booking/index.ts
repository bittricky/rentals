import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { Booking, Database, Listing, User } from "../../lib/types";

export const bookingResolvers: IResolvers = {
  Booking: {
    id: (booking: Booking): string => {
      return booking._id.toString();
    },
    listing: async (
      booking: Booking,
      _args: {},
      { db }: { db: Database }
    ): Promise<Listing> => {
      const listing = await db.listings.findOne({ _id: new ObjectId(booking.listing.toString()) });
      if (!listing) {
        throw new Error("listing can't be found");
      }
      return listing;
    },
    tenant: async (
      booking: Booking,
      _args: {},
      { db }: { db: Database }
    ): Promise<User> => {
      const tenant = await db.users.findOne({ _id: new ObjectId(booking.tenant.toString()) });
      if (!tenant) {
        throw new Error("tenant can't be found");
      }
      return tenant;
    },
    checkIn: (booking: Booking): string => {
      return booking.checkIn;
    },
    checkOut: (booking: Booking): string => {
      return booking.checkOut;
    }
  }
};
