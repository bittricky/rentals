import jwt from "jsonwebtoken";
import { Request } from "express";
import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { Google } from "../../auth/Google";
import { Viewer, Database, User } from "../../lib/types";
import { LoginInArgs } from "./types";

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
  let viewer = await db.users.findOne({ _id: new ObjectId(googleId) });

  if (!viewer) {
    const insertRes = await db.users.insertOne({
      _id: new ObjectId(googleId),
      name: userName,
      avatar: userAvatar,
      contact: userEmail,
      bookings: [],
      income: 0,
      listings: [],
    });

    viewer = await db.users.findOne({ _id: insertRes.insertedId });
  } else {
    const updateRes = await db.users.findOneAndUpdate(
      { _id: new ObjectId(googleId) },
      {
        $set: {
          name: userName,
          avatar: userAvatar,
          contact: userEmail,
        },
      },
      { returnDocument: "after" }
    );

    viewer = updateRes.value;
  }

  return viewer as User;
};

export const viewerResolvers: IResolvers = {
  Query: {
    isLoggedIn: async (
      _root: undefined,
      _args: {},
      { db, req }: { db: Database; req: Request }
    ): Promise<Viewer> => {
      try {
        const userId = req.session?.userId;
        if (!userId) {
          return { didRequest: true };
        }

        const user = await db.users.findOne({ _id: new ObjectId(userId) });
        if (!user) {
          return { didRequest: true };
        }

        return {
          _id: user._id.toString(),
          token: req.session?.token,
          avatar: user.avatar,
          didRequest: true,
        };
      } catch (error) {
        return { didRequest: true };
      }
    },
  },
  Mutation: {
    async logIn(
      _root: undefined,
      { input }: LoginInArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<Viewer> {
      try {
        const payload = await Google.getTokenFromCode(input.code);
        const viewer = await logInViaGoogle(payload, db);

        if (!viewer) {
          throw new Error("Failed to log in with Google");
        }

        // Create a JWT token
        const token = jwt.sign(
          {
            _id: viewer._id.toString(),
            name: viewer.name,
            avatar: viewer.avatar,
            contact: viewer.contact,
          },
          JWT_SECRET,
          { expiresIn: "1d" }
        );

        // Set session data
        if (req.session) {
          req.session.userId = viewer._id.toString();
          req.session.token = token;
        }

        return {
          _id: viewer._id.toString(),
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
      _args: object,
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
    id(viewer: Viewer): string | undefined {
      return viewer._id;
    },
    hasWallet(viewer: Viewer): boolean | undefined {
      return viewer.walletId ? true : undefined;
    },
  },
};
