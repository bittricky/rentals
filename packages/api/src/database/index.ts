import { config } from "dotenv";
config();

import { MongoClient } from "mongodb";
import { Database, User, Listing, Booking, Host, PropertyReview, HostReview } from "../lib/types";

const url = `mongodb+srv://${[process.env["DB_USER"]]}:${
  process.env["DB_USER_PASSWORD"]
}@${process.env["DB_CLUSTER"]}.mongodb.net/?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url);
  const db = client.db("rentals");

  return {
    listings: db.collection<Listing>("listings"),
    users: db.collection<User>("users"),
    hosts: db.collection<Host>("hosts"),
    propertyReviews: db.collection<PropertyReview>("propertyReviews"),
    hostReviews: db.collection<HostReview>("hostReviews"),
    bookings: db.collection<Booking>("bookings"),
  };
};
