import session from "express-session";

declare module "express-session" {
  interface SessionData {
    userId?: string;
    isLoggedIn?: boolean;
    token?: string; // Add other custom session properties as needed
  }
}

export interface LoginInArgs {
  input: {
    idToken: string;
  };
}
