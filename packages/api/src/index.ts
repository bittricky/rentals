import express from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

import session from "express-session";
import { ApolloServer } from "apollo-server-express";
import { connectDatabase } from "./database";
import { resolvers } from "./resolvers";
import { typeDefs } from "./resolvers/typeDefs";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is not defined");
}

const JWT_SECRET = process.env.JWT_SECRET as string;
const SESSION_SECRET = process.env.SESSION_SECRET as string;

const mount = async () => {
  const app = express();
  const db = await connectDatabase();

  app.use(
    session({
      name: "sid",
      secret: SESSION_SECRET,
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

  app.use(async (req, _, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      try {
        const decoded: any = jwt.verify(token, JWT_SECRET);

        const user = await db.users.findOne({ _id: decoded?.userId });

        if (user) {
          req.session.userId = user._id.toString();
          req.session.save((err) => {
            if (err) {
              console.error("Session save error:", err);
            }
          });
        } else {
          throw new Error("No User was found");
        }
      } catch (err) {
        console.log("Invalid token: ", err);
      }
    }
    next();
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {
      return { db, req, res };
    },
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
