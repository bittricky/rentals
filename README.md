# Rentals

A modern vacation rental application

> Are you ready to explore the ever expanding horizons of your next getaway—no strings attached?

## Features

- Property listing and search
- User authentication with Google OAuth
- Nearby locations search using Google Maps API
- Property reviews and ratings
- Interactive maps and location services

## Tech Stack

- Frontend: React, TypeScript, Apollo Client, Chakra UI
- Backend: Node.js, Express, GraphQL, Apollo Server
- Database: MongoDB Atlas
- APIs: Google OAuth, Google Maps Services

## Prerequisites

- Node.js (v17.0.0 or higher)
- Yarn package manager
- MongoDB Atlas account
- Google Cloud Platform account (for OAuth and Maps API)

## Development Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd rentals
```

2. **Install dependencies**
```bash
yarn install
```

3. **Environment Configuration**

Create a `.env` file in the `/packages/api` directory using the template below:

```env
PORT=4000                        # API server port
JWT_SECRET=your-jwt-secret      # Secret for JWT tokens
SESSION_SECRET=your-session-secret
DB_USER=your-db-user           # MongoDB Atlas username
DB_USER_PASSWORD=your-password  # MongoDB Atlas password
DB_CLUSTER=your-cluster        # MongoDB Atlas cluster URL
G_CLIENT_ID=your-client-id     # Google OAuth client ID
G_GEOCODE_KEY=your-geocode-key # Google Maps API key
PUBLIC_URL=http://localhost:5173
NODE_ENV=development
```

4. **Setting up Required API Keys**

- **MongoDB Atlas**
  1. Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  2. Create a new cluster
  3. Get your connection credentials from the "Connect" button
  
- **Google Cloud Platform**
  1. Create a project at [Google Cloud Console](https://console.cloud.google.com)
  2. Enable the following APIs:
     - Google OAuth 2.0
     - Google Maps Places API
     - Google Maps Geocoding API
  3. Create credentials (OAuth 2.0 Client ID and API Key)
  4. Add authorized redirect URIs for OAuth

5. **Seed the Database**
```bash
yarn seed
```

## Running the Application

1. **Start the API server**
```bash
yarn start:api
```
The API will be available at `http://localhost:4000`

2. **Start the Web application**
```bash
yarn start:web
```
The web app will be available at `http://localhost:5173`

## Project Structure

```
rentals/
├── packages/
│   ├── api/           # Backend GraphQL API
│   │   ├── src/
│   │   └── .env
│   └── web/           # Frontend React application
│       └── src/
├── package.json
└── README.md
```

## Available Scripts

- `yarn start:api` - Start the API server
- `yarn start:web` - Start the web application
- `yarn seed` - Seed the database with sample data
- `yarn test` - Run tests
- `yarn build` - Build the application for production

## Development Guidelines

- The application uses TypeScript for both frontend and backend
- GraphQL schema is defined in `packages/api/src/resolvers/typeDefs.ts`
- Frontend components are in `packages/web/src/components`
- API resolvers are in `packages/api/src/resolvers`

## Troubleshooting

1. **MongoDB Connection Issues**
   - Verify your IP address is whitelisted in MongoDB Atlas
   - Check DB_USER and DB_USER_PASSWORD are correct
   - Ensure DB_CLUSTER URL is correct

2. **Google API Issues**
   - Verify API keys are correctly set in .env
   - Check if required APIs are enabled in Google Cloud Console
   - Verify OAuth redirect URIs are correctly configured
