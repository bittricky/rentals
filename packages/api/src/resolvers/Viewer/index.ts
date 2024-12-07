import { IResolvers } from "@graphql-tools/utils";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { Google } from "../../auth/Google";
import { Database, User, Viewer } from "../../lib/types";
import { LoginInArgs } from "./types";
import { createIdFilter, idToString } from "../../lib/utils";

const JWT_SECRET = process.env.JWT_SECRET as string;

const logInViaGoogle = async (
  payload: any,
  db: Database
): Promise<User | undefined> => {
  const googleId = payload["sub"]; // Google's unique ID for the user
  const userName = payload["name"];
  const userEmail = payload["email"];
  const userAvatar = payload["picture"];

  if (!googleId || !userName || !userAvatar || !userEmail) {
    throw new Error("Google login error");
  }

  // Find user by Google ID
  let viewer = await db.users.findOne(createIdFilter(googleId));

  if (!viewer) {
    // Create new user with Google ID
    await db.users.insertOne({
      _id: googleId, // Use Google ID directly
      name: userName,
      avatar: userAvatar,
      email: userEmail,
      bookings: [],
      income: 0,
      listings: [],
    });

    viewer = await db.users.findOne(createIdFilter(googleId));
    return viewer || undefined;
  }

  // Update existing user
  const updateRes = await db.users.findOneAndUpdate(
    createIdFilter(googleId),
    {
      $set: {
        name: userName,
        avatar: userAvatar,
        contact: userEmail,
      },
    },
    { returnDocument: "after" }
  );

  return updateRes.value || undefined;
};

export const viewerResolvers: IResolvers = {
  Query: {
    authUrl: () => {
      try {
        return Google.authUrl;
      } catch (error) {
        throw new Error(`Failed to query Google Auth Url: ${error}`);
      }
    },
    isLoggedIn: async (
      _root: undefined,
      _args: {},
      { db, req }: { db: Database; req: Request }
    ): Promise<Viewer> => {
      try {
        const token = req.session?.token;
        if (!token) {
          return { didRequest: true };
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { _id: string };
        const user = await db.users.findOne(createIdFilter(decoded._id));
        
        if (!user) {
          return { didRequest: true };
        }

        return {
          _id: user._id,
          token,
          avatar: user.avatar,
          name: user.name,
          email: user.email,
          didRequest: true
        };
      } catch (error) {
        return { didRequest: true };
      }
    },
  },
  Mutation: {
    logIn: async (
      _root: undefined,
      { input }: LoginInArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<Viewer> => {
      try {
        const payload = await Google.getTokenFromCode(input.code);
        const viewer = await logInViaGoogle(payload, db);

        if (!viewer) {
          throw new Error("Failed to log in with Google");
        }

        // Create JWT token
        const token = jwt.sign(
          {
            _id: idToString(viewer._id),
            name: viewer.name,
            avatar: viewer.avatar,
            contact: viewer.contact,
          },
          JWT_SECRET,
          { expiresIn: "1d" }
        );

        // Set session data
        if (req.session) {
          req.session.userId = idToString(viewer._id);
          req.session.token = token;
        }

        return {
          _id: viewer._id,
          token,
          avatar: viewer.avatar,
          didRequest: true,
        };
      } catch (error) {
        throw new Error(`Failed to log in: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    },
    logOut: (
      _root: undefined,
      _args: {},
      { req }: { req: Request }
    ): Viewer => {
      try {
        req.session?.destroy((err: any) => {
          if (err) throw new Error("Failed to destroy session");
        });

        return { didRequest: true };
      } catch (error) {
        throw new Error("Failed to log out");
      }
    },
  },
  Viewer: {
    id: (viewer: Viewer): string | undefined => {
      return viewer._id ? idToString(viewer._id) : undefined;
    },
    hasWallet: (viewer: Viewer): boolean | undefined => {
      return viewer.walletId ? true : undefined;
    },
  },
};
