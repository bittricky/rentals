import { Request } from "express";
import { Database, User } from "../types";
import jwt from "jsonwebtoken";

// Assuming your JWT secret is stored in an environment variable or another secure location
const JWT_SECRET = process.env.JWT_SECRET as string;

export async function authorize(
  db: Database,
  req: Request
): Promise<User | null> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return null;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const viewer = await db.users.findOne<User>({ _id: decoded.userId });
    return viewer;
  } catch (error) {
    console.error("Failed to authorize with JWT:", error);
    return null;
  }
}
