import { OAuth2Client } from "google-auth-library";

const oauth2Client = new OAuth2Client(
  process.env.G_CLIENT_ID,
  process.env.G_CLIENT_SECRET,
  process.env.G_REDIRECT_URI
);

async function verifyToken(idToken: string) {
  const ticket = await oauth2Client.verifyIdToken({
    idToken,
    audience: process.env.G_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  if (!payload) {
    throw new Error("Invalid token payload");
  }

  return {
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
    sub: payload.sub,
  };
}

async function getTokenFromCode(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  
  if (!tokens.id_token) {
    throw new Error("No ID token received");
  }

  return await verifyToken(tokens.id_token);
}

export const Google = {
  verifyToken,
  getTokenFromCode,
};
