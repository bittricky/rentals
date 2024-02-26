import * as crypto from "crypto";
import { Request, Response } from "express";
import { IResolvers } from "@graphql-tools/utils";
import { Google } from "../../auth/Google";
import { Viewer, Database, User } from "../../lib/types";
import { LoginInArgs } from "./types";

const cookieOpts = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === "development" ? false : true,
};

const logInViaGoogle = async (
  payload: any,
  db: Database,
  res: Response
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
      token: payload,
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
          token: payload,
        },
      },
      { returnDocument: "after" }
    );

    viewer = updateRes.value;
  }

  res.cookie("viewer", googleId, {
    ...cookieOpts,
    maxAge: 365 * 24 * 60 * 60 * 1000,
  });

  return viewer as User;
};

const loginViaCookie = async (
  token: string,
  db: Database,
  req: Request,
  res: Response
): Promise<User | undefined> => {
  const updateRes = await db.users.findOneAndUpdate(
    { _id: req.signedCookies.viewer },
    { $set: { token } }
  );

  const viewer = updateRes.value;

  if (!viewer) {
    res.clearCookie("viewer", cookieOpts);
  }

  return viewer as User;
};

export const viewerResolvers: IResolvers = {
  Query: {
    authUrl: () => {
      try {
        return "";
      } catch (error) {
        throw new Error(`Failed to query Google Auth Url: ${error}`);
      }
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

        const payload = await Google.verifyToken(idToken);
        //TODO: refactor cookie login for persistent login
        const viewer = await logInViaGoogle(payload, db, res);
        //TODO: Integrate JWT web tokens for session
        const token = crypto.randomBytes(16).toString("hex");

        if (!viewer) {
          return { didRequest: true };
        }

        return {
          _id: viewer?._id,
          token,
          avatar: viewer?.avatar,
          walletId: viewer?.walletId,
          didRequest: true,
        };
      } catch (error) {
        throw new Error(`Failed to log in: ${error}`);
      }
    },
    logOut: (
      _root: undefined,
      _args: object,
      { res }: { res: Response }
    ): Viewer => {
      try {
        res.clearCookie("viewer", cookieOpts);
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
