import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Viewer {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }

  input LoginInput {
    idToken: String!
  }

  type Query {
    authUrl: String!
    isLoggedIn: Boolean!
  }

  type Mutation {
    logIn(input: LoginInput): Viewer!
    logOut: Viewer!
  }
`;
