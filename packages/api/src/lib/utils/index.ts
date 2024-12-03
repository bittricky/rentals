import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { Database, User } from "../types";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Type guard to check if an ID is an ObjectId
export const isObjectId = (id: string | ObjectId): id is ObjectId => {
  return id instanceof ObjectId;
};

// Convert any ID to string format
export const idToString = (id: string | ObjectId): string => {
  return isObjectId(id) ? id.toString() : id;
};

// Convert string to appropriate ID type
export const formatId = (id: string): string | ObjectId => {
  // Check if the id is a valid MongoDB ObjectId
  if (ObjectId.isValid(id) && new ObjectId(id).toString() === id) {
    return new ObjectId(id);
  }
  // If not a valid ObjectId, return as is (for Google IDs)
  return id;
};

// Create a MongoDB filter for _id that works with both types
export const createIdFilter = (id: string | ObjectId) => {
  return { _id: typeof id === 'string' ? formatId(id) : id };
};

export async function authorize(
  db: Database,
  req: Request
): Promise<User | null> {
  const token = req.session?.token;
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const viewer = await db.users.findOne(createIdFilter(decoded.userId));
    return viewer;
  } catch (error) {
    console.error("Failed to authorize with JWT:", error);
    return null;
  }
}
