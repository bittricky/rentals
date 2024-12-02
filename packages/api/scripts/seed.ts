import { connectDatabase } from "../src/database";

import { listings } from "./listings";
import { users } from "./users";
import { agents } from "./agents";

const seed = async () => {
  try {
    console.log("[seed]: running...");

    const db = await connectDatabase();

    // Clear existing collections
    await db.listings.deleteMany({});
    await db.users.deleteMany({});
    await db.agents.deleteMany({});

    // Insert new data
    for (const listing of listings) {
      await db.listings.insertOne(listing);
    }

    for (const user of users) {
      await db.users.insertOne(user);
    }

    for (const agent of agents) {
      await db.agents.insertOne(agent);
      // Update the corresponding user to mark them as an agent
      await db.users.updateOne(
        { _id: agent.user },
        { 
          $set: { 
            isAgent: true,
            agentProfile: agent._id
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
