import { gql } from "graphql-tag";

const typeDefs = gql`
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
    CONDO
    VILLA
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

  type HostReview {
    id: ID!
    host: Host!
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

  type HostReviews {
    total: Int!
    result: [HostReview!]!
  }

  type Listing {
    id: ID!
    title: String!
    description: String!
    images: [String!]!
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
    averageRating: Float
    reviewCount: Int
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
    isHost: Boolean!
    hostProfile: Host
    bookings(limit: Int!, page: Int!): Bookings!
    listings(limit: Int!, page: Int!): Listings!
  }

  type Host {
    id: ID!
    user: User!
    license: String!
    agency: String!
    experience: String!
    specializations: [String!]!
    ratings: Float!
    reviewCount: Int!
    reviews(limit: Int!, page: Int!): HostReviews!
  }

  type Hosts {
    total: Int!
    result: [Host!]!
  }

  type Viewer {
    id: ID
    name: String
    token: String
    email: String
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

  type NearbyPlace {
    name: String!
    distance: Float!
    type: String!
  }

  type NearbyCategory {
    name: String!
    icon: String!
    places: [NearbyPlace!]!
  }

  type NearbyLocations {
    categories: [NearbyCategory!]!
  }

  type Query {
    authUrl: String!
    user(id: ID!): User!
    isLoggedIn: Viewer!
    listing(id: ID!): Listing!
    listings(
      location: String
      filter: ListingsFilter!
      propertyType: String
      minPrice: Int
      maxPrice: Int
      limit: Int!
      page: Int!
    ): Listings!
    host(id: ID!): Host!
    hosts(limit: Int!, page: Int!): Hosts!
    propertyReviews(listingId: ID!, limit: Int!, page: Int!): PropertyReviews!
    hostReviews(hostId: ID!, limit: Int!, page: Int!): HostReviews!
    nearbyLocations(listingId: ID!, radius: Float!): NearbyLocations!
  }

  type Mutation {
    logIn(input: LoginInput): Viewer!
    logOut: Viewer!
    contactHost(input: ContactHostInput!): ContactHostResponse!
    addPropertyReview(listingId: ID!, input: ReviewInput!): PropertyReview!
    addHostReview(hostId: ID!, input: ReviewInput!): HostReview!
  }
`;

export { typeDefs };
