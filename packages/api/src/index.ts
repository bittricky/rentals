import express, { Application } from "express";
import type { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import cors from "cors";
import session from "express-session";
import { ApolloServer } from "apollo-server-express";
import type { ExpressContext } from "apollo-server-express";
import { connectDatabase } from "./database";
import { resolvers } from "./resolvers";
import { typeDefs } from "./resolvers/typeDefs";
import { Database } from "./lib/types";

config();

// Type declarations
declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

// Define context type for Apollo Server
interface ApolloContext {
  db: Database;
  req: Request;
  res: Response;
}

interface MyContext extends ApolloContext {
  req: Request & { user?: any };
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is not defined");
}

const JWT_SECRET = process.env.JWT_SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET;
const PORT = process.env.PORT || 4000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const mount = async () => {
  const app: Application = express();
  const db = await connectDatabase();

  // Configure middleware
  app.use(cors({
    origin: CLIENT_URL, 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'x-csrf-token',
      'apollo-require-preflight',
      'x-apollo-operation-name',
      'x-apollo-operation-type'
    ]
  }));

  // Enable pre-flight requests for all routes
  app.options('*', cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'x-csrf-token',
      'apollo-require-preflight',
      'x-apollo-operation-name',
      'x-apollo-operation-type'
    ]
  }));

  app.use(express.json());

  // Configure session middleware with proper typing
  const sessionConfig: session.SessionOptions = {
    name: "sid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax"
    }
  };

  app.use(session(sessionConfig) as RequestHandler);

  // JWT Authentication middleware
  const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
      } catch (error) {
        console.error("JWT verification failed:", error);
      }
    }
    next();
  };

  app.use(authMiddleware);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }: ExpressContext): Promise<MyContext> => {
      return { 
        db, 
        req: req as Request & { user?: any }, 
        res: res as Response 
      };
    },
  });

  await server.start();
  
  server.applyMiddleware({ 
    app, 
    path: "/api",
    cors: false // Let Express handle CORS
  });

  app.listen(PORT, () => {
    console.log(`[app]: http://localhost:${PORT}${server.graphqlPath}`);
  });
};

mount().catch((error) => {
  console.error("Application failed to start", error);
});
