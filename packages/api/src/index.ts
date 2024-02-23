import { config } from "dotenv";

config();

import express = require("express");
import cookieParser = require("cookie-parser");

import { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { connectDatabase } from "./database";
import { resolvers } from "./resolvers";
import { typeDefs } from "./resolvers/typeDefs";

const mount = async (app: Application) => {
  const db = await connectDatabase();

  app.use(cookieParser(process.env.secret));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ db, req, res }),
  });

  server.start().then(() => {
    server.applyMiddleware({ app, path: "/api" });
    app.listen(process.env["PORT"]);
  });

  console.log(`[app]: http://localhost:${process.env["PORT"]}`);
};

mount(express());
