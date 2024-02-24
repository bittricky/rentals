import { OAuth2Client } from "google-auth-library";
import { people_v1, google } from "googleapis";

const oauth2Client = new OAuth2Client(
  process.env.G_CLIENT_ID,
  process.env.G_CLIENT_SECRET,
  `${process.env.PUBLIC_URL}/login`
);

const generateAuthUrl = () => {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    response_type: "code",
    scope: scopes,
  });
};

export const Google = {
  authUrl: generateAuthUrl(),
  logIn: logInHandler,
};

async function logInHandler(code: string) {
  try {
    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    const user = await getUserProfile(oauth2Client);
    console.log({ user });
    return { user };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getUserProfile(
  auth: OAuth2Client
): Promise<people_v1.Schema$Person> {
  const peopleService = google.people({ version: "v1", auth });
  const { data } = await peopleService.people.get({
    resourceName: "people/me",
    personFields: "emailAddresses,names,photos",
  });

  return data;
}
