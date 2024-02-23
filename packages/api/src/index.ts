import express = require("express");
import cookieParser = require("cookie-parser");

import { config } from "dotenv";
config();

import { ApolloServer } from "apollo-server-express";
import { connectDatabase } from "./database";
import { resolvers } from "./resolvers";
import { typeDefs } from "./resolvers/typeDefs";

const mount = async () => {
  const app = express();
  const db = await connectDatabase();

  app.use(cookieParser(process.env.SECRET));

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
