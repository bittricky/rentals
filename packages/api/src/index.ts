import { config } from "dotenv";

config();

import { Application } from "express";
import express = require("express");
import { ApolloServer } from "apollo-server-express";
import { connectDatabase } from "./database";
import { typeDefs, resolvers } from "./graphql";

const mount = async (app: Application) => {
  const db = await connectDatabase();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  });

  server.start().then(() => {
    server.applyMiddleware({ app, path: "/api" });
    app.listen(process.env["PORT"]);
  });

  console.log(`[app]: http://localhost:${process.env["PORT"]}`);
};

mount(express());
