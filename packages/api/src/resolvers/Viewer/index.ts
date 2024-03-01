import * as crypto from "crypto";
import { Request, Response } from "express";
import { IResolvers } from "@graphql-tools/utils";
import { Google } from "../../auth/Google";
import { Viewer, Database, User } from "../../lib/types";
import { LoginInArgs } from "./types";

const logInViaGoogle = async (
  payload: any,
  db: Database,
  res: Response,
  token: string
): Promise<User | undefined> => {
  const googleId = payload["sub"]; // Google's unique ID for the user
  const userName = payload["name"];
  const userEmail = payload["email"];
  const userAvatar = payload["picture"];
  if (!googleId || !userName || !userAvatar || !userEmail) {
    throw new Error("Google login error");
  }
  let viewer = await db.users.findOne({ _id: googleId });

  if (!viewer) {
    const insertRes = await db.users.insertOne({
      _id: googleId,
      name: userName,
      avatar: userAvatar,
      contact: userEmail,
      token,
      bookings: [],
      income: 0,
      listings: [],
    });

    viewer = await db.users.findOne({ _id: insertRes.insertedId });
  } else {
    const updateRes = await db.users.findOneAndUpdate(
      { _id: googleId },
      {
        $set: {
          name: userName,
          avatar: userAvatar,
          contact: userEmail,
          token,
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
    isLoggedIn: async (_, args, { req, db }) => {
      if (!req.session.userId || !req.session.token) {
        return false;
      }

      const user = await db.users.findOne({ _id: req.session.userId });

      if (!user) {
        return false;
      }

      return {
        _id: user._id,
        token: user.token,
        avatar: user.avatar,
        hasWallet: user.hasWallet,
        didRequest: true,
      };
    },
  },
  Mutation: {
    logIn: async (
      _root: undefined,
      { input }: LoginInArgs,
      { db, req, res }: { db: Database; req: Request; res: Response }
    ): Promise<Viewer> => {
      try {
        const { idToken } = input;
        //TODO: Integrate JWT web tokens for session
        const token = crypto.randomBytes(16).toString("hex");
        const payload = await Google.verifyToken(idToken);

        const viewer = payload
          ? await logInViaGoogle(payload, db, res, token)
          : null;

        if (!viewer) {
          return { didRequest: true };
        }

        req.session.userId = viewer._id;
        req.session.token = token;
        req.session.isLoggedIn = true;

        req.session.regenerate((err) => {
          if (err) throw new Error("Session regeneration failed");
        });

        return {
          _id: viewer._id,
          token,
          avatar: viewer.avatar,
          walletId: viewer.walletId,
          didRequest: true,
        };
      } catch (error) {
        throw new Error(`Failed to log in: ${error}`);
      }
    },
    logOut: (
      _root: undefined,
      _args: object,
      { req, res }: { req: Request; res: Response }
    ): Viewer => {
      try {
        req.session.destroy((err) => {
          if (err) {
            return false;
          }
          return true;
        });
        return { didRequest: true };
      } catch (error) {
        throw new Error(`Failed to log out: ${error}`);
      }
    },
  },
  Viewer: {
    id: (viewer): string | undefined => {
      return viewer._id;
    },
    hasWallet: (viewer: Viewer): boolean | undefined => {
      return viewer.walletId ? true : undefined;
    },
  },
};
