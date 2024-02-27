import express from "express";
import { config } from "dotenv";
config();

import session from "express-session";
import { ApolloServer } from "apollo-server-express";
import { connectDatabase } from "./database";
import { resolvers } from "./resolvers";
import { typeDefs } from "./resolvers/typeDefs";

const mount = async () => {
  const app = express();
  const db = await connectDatabase();

  app.use(
    session({
      name: "sid",
      secret: process.env.SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: "strict",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days in milliseconds
      },
    })
  );

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ db, req, res }),
  });

  await server.start();
  server.applyMiddleware({ app, path: "/api" });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`[app]: http://localhost:${PORT}${server.graphqlPath}`);
  });
};

mount().catch((error) => {
  console.error("Application failed to start", error);
});
