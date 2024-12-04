import { connectDatabase } from "../src/database";

import { listings } from "./listings";
import { users } from "./users";
import { hosts } from "./hosts";

const seed = async () => {
  try {
    console.log("[seed]: running...");

    const db = await connectDatabase();

    // Clear existing collections
    await db.listings.deleteMany({});
    await db.users.deleteMany({});
    await db.hosts.deleteMany({});
    await db.hostReviews.deleteMany({});

    // Insert new data
    for (const listing of listings) {
      await db.listings.insertOne(listing);
    }

    for (const user of users) {
      await db.users.insertOne(user);
    }

    for (const host of hosts) {
      await db.hosts.insertOne(host);
      // Update the corresponding user to mark them as a host
      await db.users.updateOne(
        { _id: host.user },
        { 
          $set: { 
            isHost: true,
            hostProfile: host._id
          } 
        }
      );
    }

    console.log("[seed]: Database has been seeded");
  } catch (error) {
    throw new Error(`Failed: Database was not seeded ${error}`);
  }
};

seed();
