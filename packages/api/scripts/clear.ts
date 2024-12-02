require("dotenv").config();

import { connectDatabase } from "../src/database";

const clear = async () => {
  try {
    console.log("[clear] : running...");

    const db = await connectDatabase();

    // Clear all collections
    const collections = [
      "users",
      "listings",
      "bookings",
      "propertyReviews",
      "agentReviews",
      "agents"
    ];

    for (const collectionName of collections) {
      if (db[collectionName]) {
        await db[collectionName].deleteMany({});
        console.log(`[clear] : cleared ${collectionName} collection`);
      } else {
        console.log(`[clear] : collection ${collectionName} not found`);
      }
    }

    console.log("[clear] : success");
  } catch (error) {
    console.error("[clear] : error -", error);
    throw new Error("failed to clear database");
  }
};

clear();
