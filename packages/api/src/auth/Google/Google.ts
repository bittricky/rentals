import { OAuth2Client } from "google-auth-library";

const oauth2Client = new OAuth2Client(process.env.G_CLIENT_ID);

async function verifyToken(idToken: string) {
  const ticket = await oauth2Client.verifyIdToken({
    idToken,
    audience: process.env.G_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  return payload;
}

export const Google = {
  verifyToken: verifyToken,
};
