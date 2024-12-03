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

  type Feature {
    name: String!
    icon: String!
    description: String
  }

  type Review {
    id: ID!
    author: User!
    content: String!
    rating: Float!
    createdAt: String!
    updatedAt: String
  }

  type PropertyReview {
    id: ID!
    listing: Listing!
    author: User!
    content: String!
    rating: Float!
    createdAt: String!
    updatedAt: String
  }

  type AgentReview {
    id: ID!
    agent: Agent!
    author: User!
    content: String!
    rating: Float!
    createdAt: String!
    updatedAt: String
  }

  type Reviews {
    total: Int!
    result: [Review!]!
  }

  type PropertyReviews {
    total: Int!
    result: [PropertyReview!]!
  }

  type AgentReviews {
    total: Int!
    result: [AgentReview!]!
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
    bedrooms: Int!
    bathrooms: Int!
    swimmingPools: Int!
    pantries: Int!
    features: [Feature!]!
    reviews(limit: Int!, page: Int!): PropertyReviews
    averageRating: Float!
    reviewCount: Int!
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
    reviews(limit: Int!, page: Int!): AgentReviews
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
    code: String!
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

  input ReviewInput {
    content: String!
    rating: Float!
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
    propertyReviews(listingId: ID!, limit: Int!, page: Int!): PropertyReviews!
    agentReviews(agentId: ID!, limit: Int!, page: Int!): AgentReviews!
  }

  type Mutation {
    logIn(input: LoginInput): Viewer!
    logOut: Viewer!
    contactHost(input: ContactHostInput!): ContactHostResponse!
    addPropertyReview(listingId: ID!, input: ReviewInput!): PropertyReview!
    addAgentReview(agentId: ID!, input: ReviewInput!): AgentReview!
  }
`;
