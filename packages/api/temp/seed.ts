import { connectDatabase } from "../src/database";

import { listings } from "./listings";
import { users } from "./users";

const seed = async () => {
  try {
    console.log("[seed]: running...");

    const db = await connectDatabase();

    for (const listing of listings) {
      await db.listings.insertOne(listing);
    }

    for (const user of users) {
      await db.users.insertOne(user);
    }

    console.log("[seed]: Database has been seeded");
  } catch (error) {
    throw new Error(`Failed: Database was not seeded ${error}`);
  }
};

seed();
