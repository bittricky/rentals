import express from "express";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import cors from "cors";
import session from "express-session";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { IResolvers, TypeSource } from '@graphql-tools/utils';
import { connectDatabase } from "./database";
import { resolvers } from "./resolvers";
import { typeDefs } from "./resolvers/typeDefs";
import { Database } from "./lib/types";
import MongoStore from "connect-mongo";

config();

// Extend the Request type to include user property
declare module 'express' {
  interface Request {
    user?: { _id: string };
  }
}

interface AppContext {
  db: Database;
  req: Request;
  res: Response;
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is not defined");
}

const mount = async (app: express.Application) => {
  const db = await connectDatabase();

  const corsOptions = {
    origin: process.env.PUBLIC_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'x-csrf-token',
      'apollo-require-preflight',
      'x-apollo-operation-name',
      'x-apollo-operation-type'
    ]
  };

  app.use(cors(corsOptions));

  // Add headers middleware
  app.use((req: Request, res: Response, next: NextFunction): void => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', process.env.PUBLIC_URL!);
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
      res.status(200).json({});
      return;
    }
    next();
  });

  const sessionConfig: session.SessionOptions = {
    name: "rentals",
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    },
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`
    })
  };

  app.use(session(sessionConfig));

  const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token = req.session.token;
      if (token) {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string };
        req.user = payload;
      }
    } catch (error) {
      // Token verification failed, clear the session
      req.session.destroy((err) => {
        if (err) console.error("Error destroying session:", err);
      });
    }
    next();
  };

  app.use(authMiddleware);

  const schema = makeExecutableSchema({
    typeDefs: typeDefs as TypeSource,
    resolvers: resolvers as IResolvers
  });

  const server = new ApolloServer<AppContext>({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    includeStacktraceInErrorResponses: process.env.NODE_ENV !== 'production'
  });

  await server.start();

  app.use(
    '/api',
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }): Promise<AppContext> => ({
        db,
        req,
        res
      })
    })
  );

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`[app]: http://localhost:${PORT}/api`);
  });
};

mount(express()).catch((error) => {
  console.error("Application failed to start", error);
});
