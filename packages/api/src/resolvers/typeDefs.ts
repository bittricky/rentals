import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Booking {
    id: ID!
    listing: Listing!
    tenant: User!
    checkIn: String!
    checkOut: String!
  }

  type Bookings {
    total: Int!
    result: [Booking!]!
  }

  enum ListingType {
    APARTMENT
    HOUSE
  }

  enum ListingsFilter {
    PRICE_LOW_TO_HIGH
    PRICE_HIGH_TO_LOW
  }

  type Listing {
    id: ID!
    title: String!
    description: String!
    image: String!
    host: User!
    country: String!
    admin: String!
    city: String!
    type: ListingType!
    address: String!
    bookings(limit: Int!, page: Int!): Bookings
    bookingsIndex: String!
    price: Int!
    numOfGuests: Int!
  }

  type Listings {
    region: String
    total: Int!
    result: [Listing!]!
  }

  type User {
    id: ID!
    name: String!
    avatar: String!
    contact: String!
    hasWallet: Boolean!
    income: Int
    bookings(limit: Int!, page: Int!): Bookings!
    listings(limit: Int!, page: Int!): Listings!
    isAgent: Boolean
    agentProfile: Agent
  }

  type Agent {
    id: ID!
    user: User!
    license: String!
    agency: String!
    experience: Int!
    specializations: [String!]!
    ratings: Float!
    reviewCount: Int!
  }

  type Agents {
    total: Int!
    result: [Agent!]!
  }

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

  input ContactHostInput {
    listingId: ID!
    hostId: ID!
    message: String!
    name: String!
    email: String!
    phone: String!
  }

  type ContactHostResponse {
    success: Boolean!
    message: String!
  }

  type Query {
    user(id: ID!): User!
    isLoggedIn: Viewer!
    listing(id: ID!): Listing!
    listings(
      location: String
      filter: ListingsFilter!
      limit: Int!
      page: Int!
    ): Listings!
    agent(id: ID!): Agent!
    agents(limit: Int!, page: Int!): Agents!
  }

  type Mutation {
    logIn(input: LoginInput): Viewer!
    logOut: Viewer!
    contactHost(input: ContactHostInput!): ContactHostResponse!
  }
`;
