import { Request } from "express";
import { Database, User } from "../types";

export const authorize = async (
  db: Database,
  req: Request
): Promise<User | null> => {
  const csrfToken = req.headers["x-csrf-token"];

  const sessionId = req.sessionID;

  if (!csrfToken) {
    console.log("Missing CSRF token");
    return null;
  }

  if (!sessionId) {
    console.log("Missing Session ID");
  }

  const user = await db.users.findOne({ sessionID: sessionId });

  if (user && req.session.token === user.token) {
    return user;
  } else {
    console.log("Session token mismatch or user not found");
    return null;
  }
};
