/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Booking = {
  __typename?: 'Booking';
  checkIn: Scalars['String']['output'];
  checkOut: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  listing: Listing;
  tenant: User;
};

export type Bookings = {
  __typename?: 'Bookings';
  result: Array<Booking>;
  total: Scalars['Int']['output'];
};

export type ContactHostInput = {
  email: Scalars['String']['input'];
  hostId: Scalars['ID']['input'];
  listingId: Scalars['ID']['input'];
  message: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type ContactHostResponse = {
  __typename?: 'ContactHostResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Feature = {
  __typename?: 'Feature';
  description?: Maybe<Scalars['String']['output']>;
  icon: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Host = {
  __typename?: 'Host';
  agency: Scalars['String']['output'];
  experience: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  license: Scalars['String']['output'];
  ratings: Scalars['Float']['output'];
  reviewCount: Scalars['Int']['output'];
  reviews: HostReviews;
  specializations: Array<Scalars['String']['output']>;
  user: User;
};


export type HostReviewsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type HostReview = {
  __typename?: 'HostReview';
  author: User;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  host: Host;
  id: Scalars['ID']['output'];
  rating: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type HostReviews = {
  __typename?: 'HostReviews';
  result: Array<HostReview>;
  total: Scalars['Int']['output'];
};

export type Hosts = {
  __typename?: 'Hosts';
  result: Array<Host>;
  total: Scalars['Int']['output'];
};

export type Listing = {
  __typename?: 'Listing';
  address: Scalars['String']['output'];
  admin: Scalars['String']['output'];
  averageRating?: Maybe<Scalars['Float']['output']>;
  bathrooms: Scalars['Int']['output'];
  bedrooms: Scalars['Int']['output'];
  bookings?: Maybe<Bookings>;
  bookingsIndex: Scalars['String']['output'];
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  description: Scalars['String']['output'];
  features: Array<Feature>;
  host: User;
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  numOfGuests: Scalars['Int']['output'];
  pantries: Scalars['Int']['output'];
  price: Scalars['Int']['output'];
  reviewCount?: Maybe<Scalars['Int']['output']>;
  reviews?: Maybe<PropertyReviews>;
  swimmingPools: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  type: ListingType;
};


export type ListingBookingsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type ListingReviewsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export enum ListingType {
  Apartment = 'APARTMENT',
  Condo = 'CONDO',
  House = 'HOUSE',
  Villa = 'VILLA'
}

export type Listings = {
  __typename?: 'Listings';
  region?: Maybe<Scalars['String']['output']>;
  result: Array<Listing>;
  total: Scalars['Int']['output'];
};

export enum ListingsFilter {
  PriceHighToLow = 'PRICE_HIGH_TO_LOW',
  PriceLowToHigh = 'PRICE_LOW_TO_HIGH'
}

export type LoginInput = {
  code: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addHostReview: HostReview;
  addPropertyReview: PropertyReview;
  contactHost: ContactHostResponse;
  logIn: Viewer;
  logOut: Viewer;
};


export type MutationAddHostReviewArgs = {
  hostId: Scalars['ID']['input'];
  input: ReviewInput;
};


export type MutationAddPropertyReviewArgs = {
  input: ReviewInput;
  listingId: Scalars['ID']['input'];
};


export type MutationContactHostArgs = {
  input: ContactHostInput;
};


export type MutationLogInArgs = {
  input?: InputMaybe<LoginInput>;
};

export type NearbyCategory = {
  __typename?: 'NearbyCategory';
  icon: Scalars['String']['output'];
  name: Scalars['String']['output'];
  places: Array<NearbyPlace>;
};

export type NearbyLocations = {
  __typename?: 'NearbyLocations';
  categories: Array<NearbyCategory>;
};

export type NearbyPlace = {
  __typename?: 'NearbyPlace';
  distance: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type PropertyReview = {
  __typename?: 'PropertyReview';
  author: User;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  listing: Listing;
  rating: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type PropertyReviews = {
  __typename?: 'PropertyReviews';
  result: Array<PropertyReview>;
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  authUrl: Scalars['String']['output'];
  host: Host;
  hostReviews: HostReviews;
  hosts: Hosts;
  isLoggedIn: Viewer;
  listing: Listing;
  listings: Listings;
  nearbyLocations: NearbyLocations;
  propertyReviews: PropertyReviews;
  user: User;
};


export type QueryHostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryHostReviewsArgs = {
  hostId: Scalars['ID']['input'];
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type QueryHostsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type QueryListingArgs = {
  id: Scalars['ID']['input'];
};


export type QueryListingsArgs = {
  filter: ListingsFilter;
  limit: Scalars['Int']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  maxPrice?: InputMaybe<Scalars['Int']['input']>;
  minPrice?: InputMaybe<Scalars['Int']['input']>;
  page: Scalars['Int']['input'];
  propertyType?: InputMaybe<Scalars['String']['input']>;
};


export type QueryNearbyLocationsArgs = {
  listingId: Scalars['ID']['input'];
  radius: Scalars['Float']['input'];
};


export type QueryPropertyReviewsArgs = {
  limit: Scalars['Int']['input'];
  listingId: Scalars['ID']['input'];
  page: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type Review = {
  __typename?: 'Review';
  author: User;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  rating: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type ReviewInput = {
  content: Scalars['String']['input'];
  rating: Scalars['Float']['input'];
};

export type Reviews = {
  __typename?: 'Reviews';
  result: Array<Review>;
  total: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String']['output'];
  bookings: Bookings;
  email: Scalars['String']['output'];
  hasWallet: Scalars['Boolean']['output'];
  hostProfile?: Maybe<Host>;
  id: Scalars['ID']['output'];
  income?: Maybe<Scalars['Int']['output']>;
  isHost: Scalars['Boolean']['output'];
  listings: Listings;
  name: Scalars['String']['output'];
};


export type UserBookingsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type UserListingsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type Viewer = {
  __typename?: 'Viewer';
  avatar?: Maybe<Scalars['String']['output']>;
  didRequest: Scalars['Boolean']['output'];
  email?: Maybe<Scalars['String']['output']>;
  hasWallet?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
};

export type ContactHostMutationVariables = Exact<{
  input: ContactHostInput;
}>;


export type ContactHostMutation = { __typename?: 'Mutation', contactHost: { __typename?: 'ContactHostResponse', success: boolean, message: string } };

export type AddPropertyReviewMutationVariables = Exact<{
  listingId: Scalars['ID']['input'];
  input: ReviewInput;
}>;


export type AddPropertyReviewMutation = { __typename?: 'Mutation', addPropertyReview: { __typename?: 'PropertyReview', id: string, content: string, rating: number, createdAt: string, listing: { __typename?: 'Listing', id: string, title: string }, author: { __typename?: 'User', id: string, name: string, avatar: string } } };

export type AddHostReviewMutationVariables = Exact<{
  hostId: Scalars['ID']['input'];
  input: ReviewInput;
}>;


export type AddHostReviewMutation = { __typename?: 'Mutation', addHostReview: { __typename?: 'HostReview', id: string, content: string, rating: number, createdAt: string, host: { __typename?: 'Host', id: string, user: { __typename?: 'User', name: string } }, author: { __typename?: 'User', id: string, name: string, avatar: string } } };

export type ListingsQueryVariables = Exact<{
  location?: InputMaybe<Scalars['String']['input']>;
  filter: ListingsFilter;
  propertyType?: InputMaybe<Scalars['String']['input']>;
  minPrice?: InputMaybe<Scalars['Int']['input']>;
  maxPrice?: InputMaybe<Scalars['Int']['input']>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type ListingsQuery = { __typename?: 'Query', listings: { __typename?: 'Listings', total: number, result: Array<{ __typename?: 'Listing', id: string, title: string, description: string, images: Array<string>, country: string, admin: string, city: string, type: ListingType, address: string, price: number, numOfGuests: number, bedrooms: number, bathrooms: number, swimmingPools: number, pantries: number, averageRating?: number | null, reviewCount?: number | null, host: { __typename?: 'User', id: string, name: string, avatar: string, hasWallet: boolean }, features: Array<{ __typename?: 'Feature', name: string, icon: string, description?: string | null }> }> } };

export type ListingQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ListingQuery = { __typename?: 'Query', listing: { __typename?: 'Listing', id: string, title: string, description: string, images: Array<string>, country: string, admin: string, city: string, type: ListingType, address: string, price: number, numOfGuests: number, bedrooms: number, bathrooms: number, swimmingPools: number, pantries: number, averageRating?: number | null, reviewCount?: number | null, host: { __typename?: 'User', id: string, name: string, avatar: string, hasWallet: boolean }, features: Array<{ __typename?: 'Feature', name: string, icon: string, description?: string | null }>, bookings?: { __typename?: 'Bookings', total: number, result: Array<{ __typename?: 'Booking', id: string, checkIn: string, checkOut: string, tenant: { __typename?: 'User', id: string, name: string, avatar: string } }> } | null, reviews?: { __typename?: 'PropertyReviews', total: number, result: Array<{ __typename?: 'PropertyReview', id: string, content: string, rating: number, createdAt: string, author: { __typename?: 'User', id: string, name: string, avatar: string } }> } | null } };

export type UserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, avatar: string, email: string, hasWallet: boolean, income?: number | null, isHost: boolean, bookings: { __typename?: 'Bookings', total: number, result: Array<{ __typename?: 'Booking', id: string, checkIn: string, checkOut: string, listing: { __typename?: 'Listing', id: string, title: string, images: Array<string>, address: string, price: number } }> }, listings: { __typename?: 'Listings', total: number, result: Array<{ __typename?: 'Listing', id: string, title: string, images: Array<string>, address: string, price: number }> }, hostProfile?: { __typename?: 'Host', id: string, license: string, agency: string, experience: string, specializations: Array<string>, ratings: number, reviewCount: number } | null } };

export type HostsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type HostsQuery = { __typename?: 'Query', hosts: { __typename?: 'Hosts', total: number, result: Array<{ __typename?: 'Host', id: string, license: string, agency: string, experience: string, specializations: Array<string>, ratings: number, reviewCount: number, user: { __typename?: 'User', id: string, name: string, avatar: string } }> } };

export type HostQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type HostQuery = { __typename?: 'Query', host: { __typename?: 'Host', id: string, license: string, agency: string, experience: string, specializations: Array<string>, ratings: number, reviewCount: number, user: { __typename?: 'User', id: string, name: string, avatar: string, email: string }, reviews: { __typename?: 'HostReviews', total: number, result: Array<{ __typename?: 'HostReview', id: string, content: string, rating: number, createdAt: string, author: { __typename?: 'User', id: string, name: string, avatar: string } }> } } };

export type PropertyReviewsQueryVariables = Exact<{
  listingId: Scalars['ID']['input'];
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type PropertyReviewsQuery = { __typename?: 'Query', propertyReviews: { __typename?: 'PropertyReviews', total: number, result: Array<{ __typename?: 'PropertyReview', id: string, content: string, rating: number, createdAt: string, author: { __typename?: 'User', id: string, name: string, avatar: string } }> } };

export type HostReviewsQueryVariables = Exact<{
  hostId: Scalars['ID']['input'];
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type HostReviewsQuery = { __typename?: 'Query', hostReviews: { __typename?: 'HostReviews', total: number, result: Array<{ __typename?: 'HostReview', id: string, content: string, rating: number, createdAt: string, author: { __typename?: 'User', id: string, name: string, avatar: string } }> } };

export type FeaturedListingsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
}>;


export type FeaturedListingsQuery = { __typename?: 'Query', listings: { __typename?: 'Listings', total: number, result: Array<{ __typename?: 'Listing', id: string, title: string, description: string, images: Array<string>, country: string, admin: string, city: string, type: ListingType, address: string, price: number, numOfGuests: number, bedrooms: number, bathrooms: number, averageRating?: number | null, reviewCount?: number | null, host: { __typename?: 'User', id: string, name: string, avatar: string, hasWallet: boolean }, features: Array<{ __typename?: 'Feature', name: string, icon: string, description?: string | null }> }> } };

export type NearbyLocationsQueryVariables = Exact<{
  listingId: Scalars['ID']['input'];
  radius: Scalars['Float']['input'];
}>;


export type NearbyLocationsQuery = { __typename?: 'Query', nearbyLocations: { __typename?: 'NearbyLocations', categories: Array<{ __typename?: 'NearbyCategory', name: string, icon: string, places: Array<{ __typename?: 'NearbyPlace', name: string, distance: number, type: string }> }> } };

export type IsLoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type IsLoggedInQuery = { __typename?: 'Query', isLoggedIn: { __typename?: 'Viewer', id?: string | null, token?: string | null, avatar?: string | null, name?: string | null, email?: string | null, didRequest: boolean } };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut: { __typename?: 'Viewer', didRequest: boolean } };

export type LogInMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LogInMutation = { __typename?: 'Mutation', logIn: { __typename?: 'Viewer', id?: string | null, token?: string | null, avatar?: string | null, hasWallet?: boolean | null, didRequest: boolean } };


export const ContactHostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ContactHost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContactHostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contactHost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ContactHostMutation, ContactHostMutationVariables>;
export const AddPropertyReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPropertyReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReviewInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPropertyReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"listingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"listing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<AddPropertyReviewMutation, AddPropertyReviewMutationVariables>;
export const AddHostReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddHostReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReviewInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addHostReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"host"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<AddHostReviewMutation, AddHostReviewMutationVariables>;
export const ListingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Listings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListingsFilter"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"propertyType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"minPrice"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxPrice"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"propertyType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"propertyType"}}},{"kind":"Argument","name":{"kind":"Name","value":"minPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"minPrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"maxPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxPrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"host"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"hasWallet"}}]}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"numOfGuests"}},{"kind":"Field","name":{"kind":"Name","value":"bedrooms"}},{"kind":"Field","name":{"kind":"Name","value":"bathrooms"}},{"kind":"Field","name":{"kind":"Name","value":"swimmingPools"}},{"kind":"Field","name":{"kind":"Name","value":"pantries"}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}}]}}]}}]}}]} as unknown as DocumentNode<ListingsQuery, ListingsQueryVariables>;
export const ListingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Listing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listing"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"host"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"hasWallet"}}]}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"numOfGuests"}},{"kind":"Field","name":{"kind":"Name","value":"bedrooms"}},{"kind":"Field","name":{"kind":"Name","value":"bathrooms"}},{"kind":"Field","name":{"kind":"Name","value":"swimmingPools"}},{"kind":"Field","name":{"kind":"Name","value":"pantries"}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bookings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"checkIn"}},{"kind":"Field","name":{"kind":"Name","value":"checkOut"}},{"kind":"Field","name":{"kind":"Name","value":"tenant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}}]}}]}}]} as unknown as DocumentNode<ListingQuery, ListingQueryVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"hasWallet"}},{"kind":"Field","name":{"kind":"Name","value":"income"}},{"kind":"Field","name":{"kind":"Name","value":"bookings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"listing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"checkIn"}},{"kind":"Field","name":{"kind":"Name","value":"checkOut"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"listings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"isHost"}},{"kind":"Field","name":{"kind":"Name","value":"hostProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"license"}},{"kind":"Field","name":{"kind":"Name","value":"agency"}},{"kind":"Field","name":{"kind":"Name","value":"experience"}},{"kind":"Field","name":{"kind":"Name","value":"specializations"}},{"kind":"Field","name":{"kind":"Name","value":"ratings"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}}]}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const HostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Hosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"license"}},{"kind":"Field","name":{"kind":"Name","value":"agency"}},{"kind":"Field","name":{"kind":"Name","value":"experience"}},{"kind":"Field","name":{"kind":"Name","value":"specializations"}},{"kind":"Field","name":{"kind":"Name","value":"ratings"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}}]}}]}}]}}]} as unknown as DocumentNode<HostsQuery, HostsQueryVariables>;
export const HostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Host"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"host"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"license"}},{"kind":"Field","name":{"kind":"Name","value":"agency"}},{"kind":"Field","name":{"kind":"Name","value":"experience"}},{"kind":"Field","name":{"kind":"Name","value":"specializations"}},{"kind":"Field","name":{"kind":"Name","value":"ratings"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<HostQuery, HostQueryVariables>;
export const PropertyReviewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PropertyReviews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"propertyReviews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"listingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<PropertyReviewsQuery, PropertyReviewsQueryVariables>;
export const HostReviewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HostReviews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hostReviews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostId"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<HostReviewsQuery, HostReviewsQueryVariables>;
export const FeaturedListingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FeaturedListings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"EnumValue","value":"PRICE_HIGH_TO_LOW"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"host"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"hasWallet"}}]}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"numOfGuests"}},{"kind":"Field","name":{"kind":"Name","value":"bedrooms"}},{"kind":"Field","name":{"kind":"Name","value":"bathrooms"}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}}]}}]}}]}}]} as unknown as DocumentNode<FeaturedListingsQuery, FeaturedListingsQueryVariables>;
export const NearbyLocationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NearbyLocations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"radius"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nearbyLocations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"listingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"radius"},"value":{"kind":"Variable","name":{"kind":"Name","value":"radius"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"distance"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}}]} as unknown as DocumentNode<NearbyLocationsQuery, NearbyLocationsQueryVariables>;
export const IsLoggedInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsLoggedIn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isLoggedIn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"didRequest"}}]}}]}}]} as unknown as DocumentNode<IsLoggedInQuery, IsLoggedInQueryVariables>;
export const LogOutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"didRequest"}}]}}]}}]} as unknown as DocumentNode<LogOutMutation, LogOutMutationVariables>;
export const LogInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"hasWallet"}},{"kind":"Field","name":{"kind":"Name","value":"didRequest"}}]}}]}}]} as unknown as DocumentNode<LogInMutation, LogInMutationVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Booking = {
  __typename?: 'Booking';
  checkIn: Scalars['String']['output'];
  checkOut: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  listing: Listing;
  tenant: User;
};

export type Bookings = {
  __typename?: 'Bookings';
  result: Array<Booking>;
  total: Scalars['Int']['output'];
};

export type ContactHostInput = {
  email: Scalars['String']['input'];
  hostId: Scalars['ID']['input'];
  listingId: Scalars['ID']['input'];
  message: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type ContactHostResponse = {
  __typename?: 'ContactHostResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Feature = {
  __typename?: 'Feature';
  description?: Maybe<Scalars['String']['output']>;
  icon: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Host = {
  __typename?: 'Host';
  agency: Scalars['String']['output'];
  experience: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  license: Scalars['String']['output'];
  ratings: Scalars['Float']['output'];
  reviewCount: Scalars['Int']['output'];
  reviews: HostReviews;
  specializations: Array<Scalars['String']['output']>;
  user: User;
};


export type HostReviewsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type HostReview = {
  __typename?: 'HostReview';
  author: User;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  host: Host;
  id: Scalars['ID']['output'];
  rating: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type HostReviews = {
  __typename?: 'HostReviews';
  result: Array<HostReview>;
  total: Scalars['Int']['output'];
};

export type Hosts = {
  __typename?: 'Hosts';
  result: Array<Host>;
  total: Scalars['Int']['output'];
};

export type Listing = {
  __typename?: 'Listing';
  address: Scalars['String']['output'];
  admin: Scalars['String']['output'];
  averageRating?: Maybe<Scalars['Float']['output']>;
  bathrooms: Scalars['Int']['output'];
  bedrooms: Scalars['Int']['output'];
  bookings?: Maybe<Bookings>;
  bookingsIndex: Scalars['String']['output'];
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  description: Scalars['String']['output'];
  features: Array<Feature>;
  host: User;
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  numOfGuests: Scalars['Int']['output'];
  pantries: Scalars['Int']['output'];
  price: Scalars['Int']['output'];
  reviewCount?: Maybe<Scalars['Int']['output']>;
  reviews?: Maybe<PropertyReviews>;
  swimmingPools: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  type: ListingType;
};


export type ListingBookingsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type ListingReviewsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export enum ListingType {
  Apartment = 'APARTMENT',
  Condo = 'CONDO',
  House = 'HOUSE',
  Villa = 'VILLA'
}

export type Listings = {
  __typename?: 'Listings';
  region?: Maybe<Scalars['String']['output']>;
  result: Array<Listing>;
  total: Scalars['Int']['output'];
};

export enum ListingsFilter {
  PriceHighToLow = 'PRICE_HIGH_TO_LOW',
  PriceLowToHigh = 'PRICE_LOW_TO_HIGH'
}

export type LoginInput = {
  code: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addHostReview: HostReview;
  addPropertyReview: PropertyReview;
  contactHost: ContactHostResponse;
  logIn: Viewer;
  logOut: Viewer;
};


export type MutationAddHostReviewArgs = {
  hostId: Scalars['ID']['input'];
  input: ReviewInput;
};


export type MutationAddPropertyReviewArgs = {
  input: ReviewInput;
  listingId: Scalars['ID']['input'];
};


export type MutationContactHostArgs = {
  input: ContactHostInput;
};


export type MutationLogInArgs = {
  input?: InputMaybe<LoginInput>;
};

export type NearbyCategory = {
  __typename?: 'NearbyCategory';
  icon: Scalars['String']['output'];
  name: Scalars['String']['output'];
  places: Array<NearbyPlace>;
};

export type NearbyLocations = {
  __typename?: 'NearbyLocations';
  categories: Array<NearbyCategory>;
};

export type NearbyPlace = {
  __typename?: 'NearbyPlace';
  distance: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type PropertyReview = {
  __typename?: 'PropertyReview';
  author: User;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  listing: Listing;
  rating: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type PropertyReviews = {
  __typename?: 'PropertyReviews';
  result: Array<PropertyReview>;
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  authUrl: Scalars['String']['output'];
  host: Host;
  hostReviews: HostReviews;
  hosts: Hosts;
  isLoggedIn: Viewer;
  listing: Listing;
  listings: Listings;
  nearbyLocations: NearbyLocations;
  propertyReviews: PropertyReviews;
  user: User;
};


export type QueryHostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryHostReviewsArgs = {
  hostId: Scalars['ID']['input'];
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type QueryHostsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type QueryListingArgs = {
  id: Scalars['ID']['input'];
};


export type QueryListingsArgs = {
  filter: ListingsFilter;
  limit: Scalars['Int']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  maxPrice?: InputMaybe<Scalars['Int']['input']>;
  minPrice?: InputMaybe<Scalars['Int']['input']>;
  page: Scalars['Int']['input'];
  propertyType?: InputMaybe<Scalars['String']['input']>;
};


export type QueryNearbyLocationsArgs = {
  listingId: Scalars['ID']['input'];
  radius: Scalars['Float']['input'];
};


export type QueryPropertyReviewsArgs = {
  limit: Scalars['Int']['input'];
  listingId: Scalars['ID']['input'];
  page: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type Review = {
  __typename?: 'Review';
  author: User;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  rating: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type ReviewInput = {
  content: Scalars['String']['input'];
  rating: Scalars['Float']['input'];
};

export type Reviews = {
  __typename?: 'Reviews';
  result: Array<Review>;
  total: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String']['output'];
  bookings: Bookings;
  email: Scalars['String']['output'];
  hasWallet: Scalars['Boolean']['output'];
  hostProfile?: Maybe<Host>;
  id: Scalars['ID']['output'];
  income?: Maybe<Scalars['Int']['output']>;
  isHost: Scalars['Boolean']['output'];
  listings: Listings;
  name: Scalars['String']['output'];
};


export type UserBookingsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type UserListingsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type Viewer = {
  __typename?: 'Viewer';
  avatar?: Maybe<Scalars['String']['output']>;
  didRequest: Scalars['Boolean']['output'];
  email?: Maybe<Scalars['String']['output']>;
  hasWallet?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
};

export type ContactHostMutationVariables = Exact<{
  input: ContactHostInput;
}>;


export type ContactHostMutation = { __typename?: 'Mutation', contactHost: { __typename?: 'ContactHostResponse', success: boolean, message: string } };

export type AddPropertyReviewMutationVariables = Exact<{
  listingId: Scalars['ID']['input'];
  input: ReviewInput;
}>;


export type AddPropertyReviewMutation = { __typename?: 'Mutation', addPropertyReview: { __typename?: 'PropertyReview', id: string, content: string, rating: number, createdAt: string, listing: { __typename?: 'Listing', id: string, title: string }, author: { __typename?: 'User', id: string, name: string, avatar: string } } };

export type AddHostReviewMutationVariables = Exact<{
  hostId: Scalars['ID']['input'];
  input: ReviewInput;
}>;


export type AddHostReviewMutation = { __typename?: 'Mutation', addHostReview: { __typename?: 'HostReview', id: string, content: string, rating: number, createdAt: string, host: { __typename?: 'Host', id: string, user: { __typename?: 'User', name: string } }, author: { __typename?: 'User', id: string, name: string, avatar: string } } };

export type ListingsQueryVariables = Exact<{
  location?: InputMaybe<Scalars['String']['input']>;
  filter: ListingsFilter;
  propertyType?: InputMaybe<Scalars['String']['input']>;
  minPrice?: InputMaybe<Scalars['Int']['input']>;
  maxPrice?: InputMaybe<Scalars['Int']['input']>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type ListingsQuery = { __typename?: 'Query', listings: { __typename?: 'Listings', total: number, result: Array<{ __typename?: 'Listing', id: string, title: string, description: string, images: Array<string>, country: string, admin: string, city: string, type: ListingType, address: string, price: number, numOfGuests: number, bedrooms: number, bathrooms: number, swimmingPools: number, pantries: number, averageRating?: number | null, reviewCount?: number | null, host: { __typename?: 'User', id: string, name: string, avatar: string, hasWallet: boolean }, features: Array<{ __typename?: 'Feature', name: string, icon: string, description?: string | null }> }> } };

export type ListingQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ListingQuery = { __typename?: 'Query', listing: { __typename?: 'Listing', id: string, title: string, description: string, images: Array<string>, country: string, admin: string, city: string, type: ListingType, address: string, price: number, numOfGuests: number, bedrooms: number, bathrooms: number, swimmingPools: number, pantries: number, averageRating?: number | null, reviewCount?: number | null, host: { __typename?: 'User', id: string, name: string, avatar: string, hasWallet: boolean }, features: Array<{ __typename?: 'Feature', name: string, icon: string, description?: string | null }>, bookings?: { __typename?: 'Bookings', total: number, result: Array<{ __typename?: 'Booking', id: string, checkIn: string, checkOut: string, tenant: { __typename?: 'User', id: string, name: string, avatar: string } }> } | null, reviews?: { __typename?: 'PropertyReviews', total: number, result: Array<{ __typename?: 'PropertyReview', id: string, content: string, rating: number, createdAt: string, author: { __typename?: 'User', id: string, name: string, avatar: string } }> } | null } };

export type UserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, avatar: string, email: string, hasWallet: boolean, income?: number | null, isHost: boolean, bookings: { __typename?: 'Bookings', total: number, result: Array<{ __typename?: 'Booking', id: string, checkIn: string, checkOut: string, listing: { __typename?: 'Listing', id: string, title: string, images: Array<string>, address: string, price: number } }> }, listings: { __typename?: 'Listings', total: number, result: Array<{ __typename?: 'Listing', id: string, title: string, images: Array<string>, address: string, price: number }> }, hostProfile?: { __typename?: 'Host', id: string, license: string, agency: string, experience: string, specializations: Array<string>, ratings: number, reviewCount: number } | null } };

export type HostsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type HostsQuery = { __typename?: 'Query', hosts: { __typename?: 'Hosts', total: number, result: Array<{ __typename?: 'Host', id: string, license: string, agency: string, experience: string, specializations: Array<string>, ratings: number, reviewCount: number, user: { __typename?: 'User', id: string, name: string, avatar: string } }> } };

export type HostQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type HostQuery = { __typename?: 'Query', host: { __typename?: 'Host', id: string, license: string, agency: string, experience: string, specializations: Array<string>, ratings: number, reviewCount: number, user: { __typename?: 'User', id: string, name: string, avatar: string, email: string }, reviews: { __typename?: 'HostReviews', total: number, result: Array<{ __typename?: 'HostReview', id: string, content: string, rating: number, createdAt: string, author: { __typename?: 'User', id: string, name: string, avatar: string } }> } } };

export type PropertyReviewsQueryVariables = Exact<{
  listingId: Scalars['ID']['input'];
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type PropertyReviewsQuery = { __typename?: 'Query', propertyReviews: { __typename?: 'PropertyReviews', total: number, result: Array<{ __typename?: 'PropertyReview', id: string, content: string, rating: number, createdAt: string, author: { __typename?: 'User', id: string, name: string, avatar: string } }> } };

export type HostReviewsQueryVariables = Exact<{
  hostId: Scalars['ID']['input'];
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type HostReviewsQuery = { __typename?: 'Query', hostReviews: { __typename?: 'HostReviews', total: number, result: Array<{ __typename?: 'HostReview', id: string, content: string, rating: number, createdAt: string, author: { __typename?: 'User', id: string, name: string, avatar: string } }> } };

export type FeaturedListingsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
}>;


export type FeaturedListingsQuery = { __typename?: 'Query', listings: { __typename?: 'Listings', total: number, result: Array<{ __typename?: 'Listing', id: string, title: string, description: string, images: Array<string>, country: string, admin: string, city: string, type: ListingType, address: string, price: number, numOfGuests: number, bedrooms: number, bathrooms: number, averageRating?: number | null, reviewCount?: number | null, host: { __typename?: 'User', id: string, name: string, avatar: string, hasWallet: boolean }, features: Array<{ __typename?: 'Feature', name: string, icon: string, description?: string | null }> }> } };

export type NearbyLocationsQueryVariables = Exact<{
  listingId: Scalars['ID']['input'];
  radius: Scalars['Float']['input'];
}>;


export type NearbyLocationsQuery = { __typename?: 'Query', nearbyLocations: { __typename?: 'NearbyLocations', categories: Array<{ __typename?: 'NearbyCategory', name: string, icon: string, places: Array<{ __typename?: 'NearbyPlace', name: string, distance: number, type: string }> }> } };

export type IsLoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type IsLoggedInQuery = { __typename?: 'Query', isLoggedIn: { __typename?: 'Viewer', id?: string | null, token?: string | null, avatar?: string | null, name?: string | null, email?: string | null, didRequest: boolean } };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut: { __typename?: 'Viewer', didRequest: boolean } };

export type LogInMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LogInMutation = { __typename?: 'Mutation', logIn: { __typename?: 'Viewer', id?: string | null, token?: string | null, avatar?: string | null, hasWallet?: boolean | null, didRequest: boolean } };


export const ContactHostDocument = gql`
    mutation ContactHost($input: ContactHostInput!) {
  contactHost(input: $input) {
    success
    message
  }
}
    `;
export type ContactHostMutationFn = Apollo.MutationFunction<ContactHostMutation, ContactHostMutationVariables>;

/**
 * __useContactHostMutation__
 *
 * To run a mutation, you first call `useContactHostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useContactHostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [contactHostMutation, { data, loading, error }] = useContactHostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useContactHostMutation(baseOptions?: Apollo.MutationHookOptions<ContactHostMutation, ContactHostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ContactHostMutation, ContactHostMutationVariables>(ContactHostDocument, options);
      }
export type ContactHostMutationHookResult = ReturnType<typeof useContactHostMutation>;
export type ContactHostMutationResult = Apollo.MutationResult<ContactHostMutation>;
export type ContactHostMutationOptions = Apollo.BaseMutationOptions<ContactHostMutation, ContactHostMutationVariables>;
export const AddPropertyReviewDocument = gql`
    mutation AddPropertyReview($listingId: ID!, $input: ReviewInput!) {
  addPropertyReview(listingId: $listingId, input: $input) {
    id
    listing {
      id
      title
    }
    author {
      id
      name
      avatar
    }
    content
    rating
    createdAt
  }
}
    `;
export type AddPropertyReviewMutationFn = Apollo.MutationFunction<AddPropertyReviewMutation, AddPropertyReviewMutationVariables>;

/**
 * __useAddPropertyReviewMutation__
 *
 * To run a mutation, you first call `useAddPropertyReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPropertyReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPropertyReviewMutation, { data, loading, error }] = useAddPropertyReviewMutation({
 *   variables: {
 *      listingId: // value for 'listingId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddPropertyReviewMutation(baseOptions?: Apollo.MutationHookOptions<AddPropertyReviewMutation, AddPropertyReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPropertyReviewMutation, AddPropertyReviewMutationVariables>(AddPropertyReviewDocument, options);
      }
export type AddPropertyReviewMutationHookResult = ReturnType<typeof useAddPropertyReviewMutation>;
export type AddPropertyReviewMutationResult = Apollo.MutationResult<AddPropertyReviewMutation>;
export type AddPropertyReviewMutationOptions = Apollo.BaseMutationOptions<AddPropertyReviewMutation, AddPropertyReviewMutationVariables>;
export const AddHostReviewDocument = gql`
    mutation AddHostReview($hostId: ID!, $input: ReviewInput!) {
  addHostReview(hostId: $hostId, input: $input) {
    id
    host {
      id
      user {
        name
      }
    }
    author {
      id
      name
      avatar
    }
    content
    rating
    createdAt
  }
}
    `;
export type AddHostReviewMutationFn = Apollo.MutationFunction<AddHostReviewMutation, AddHostReviewMutationVariables>;

/**
 * __useAddHostReviewMutation__
 *
 * To run a mutation, you first call `useAddHostReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddHostReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addHostReviewMutation, { data, loading, error }] = useAddHostReviewMutation({
 *   variables: {
 *      hostId: // value for 'hostId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddHostReviewMutation(baseOptions?: Apollo.MutationHookOptions<AddHostReviewMutation, AddHostReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddHostReviewMutation, AddHostReviewMutationVariables>(AddHostReviewDocument, options);
      }
export type AddHostReviewMutationHookResult = ReturnType<typeof useAddHostReviewMutation>;
export type AddHostReviewMutationResult = Apollo.MutationResult<AddHostReviewMutation>;
export type AddHostReviewMutationOptions = Apollo.BaseMutationOptions<AddHostReviewMutation, AddHostReviewMutationVariables>;
export const ListingsDocument = gql`
    query Listings($location: String, $filter: ListingsFilter!, $propertyType: String, $minPrice: Int, $maxPrice: Int, $limit: Int!, $page: Int!) {
  listings(
    location: $location
    filter: $filter
    propertyType: $propertyType
    minPrice: $minPrice
    maxPrice: $maxPrice
    limit: $limit
    page: $page
  ) {
    total
    result {
      id
      title
      description
      images
      host {
        id
        name
        avatar
        hasWallet
      }
      country
      admin
      city
      type
      address
      price
      numOfGuests
      bedrooms
      bathrooms
      swimmingPools
      pantries
      features {
        name
        icon
        description
      }
      averageRating
      reviewCount
    }
  }
}
    `;

/**
 * __useListingsQuery__
 *
 * To run a query within a React component, call `useListingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListingsQuery({
 *   variables: {
 *      location: // value for 'location'
 *      filter: // value for 'filter'
 *      propertyType: // value for 'propertyType'
 *      minPrice: // value for 'minPrice'
 *      maxPrice: // value for 'maxPrice'
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useListingsQuery(baseOptions: Apollo.QueryHookOptions<ListingsQuery, ListingsQueryVariables> & ({ variables: ListingsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListingsQuery, ListingsQueryVariables>(ListingsDocument, options);
      }
export function useListingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListingsQuery, ListingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListingsQuery, ListingsQueryVariables>(ListingsDocument, options);
        }
export function useListingsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListingsQuery, ListingsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListingsQuery, ListingsQueryVariables>(ListingsDocument, options);
        }
export type ListingsQueryHookResult = ReturnType<typeof useListingsQuery>;
export type ListingsLazyQueryHookResult = ReturnType<typeof useListingsLazyQuery>;
export type ListingsSuspenseQueryHookResult = ReturnType<typeof useListingsSuspenseQuery>;
export type ListingsQueryResult = Apollo.QueryResult<ListingsQuery, ListingsQueryVariables>;
export const ListingDocument = gql`
    query Listing($id: ID!) {
  listing(id: $id) {
    id
    title
    description
    images
    host {
      id
      name
      avatar
      hasWallet
    }
    country
    admin
    city
    type
    address
    price
    numOfGuests
    bedrooms
    bathrooms
    swimmingPools
    pantries
    features {
      name
      icon
      description
    }
    bookings(limit: 10, page: 1) {
      total
      result {
        id
        checkIn
        checkOut
        tenant {
          id
          name
          avatar
        }
      }
    }
    reviews(limit: 5, page: 1) {
      total
      result {
        id
        author {
          id
          name
          avatar
        }
        content
        rating
        createdAt
      }
    }
    averageRating
    reviewCount
  }
}
    `;

/**
 * __useListingQuery__
 *
 * To run a query within a React component, call `useListingQuery` and pass it any options that fit your needs.
 * When your component renders, `useListingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useListingQuery(baseOptions: Apollo.QueryHookOptions<ListingQuery, ListingQueryVariables> & ({ variables: ListingQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListingQuery, ListingQueryVariables>(ListingDocument, options);
      }
export function useListingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListingQuery, ListingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListingQuery, ListingQueryVariables>(ListingDocument, options);
        }
export function useListingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListingQuery, ListingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListingQuery, ListingQueryVariables>(ListingDocument, options);
        }
export type ListingQueryHookResult = ReturnType<typeof useListingQuery>;
export type ListingLazyQueryHookResult = ReturnType<typeof useListingLazyQuery>;
export type ListingSuspenseQueryHookResult = ReturnType<typeof useListingSuspenseQuery>;
export type ListingQueryResult = Apollo.QueryResult<ListingQuery, ListingQueryVariables>;
export const UserDocument = gql`
    query User($id: ID!) {
  user(id: $id) {
    id
    name
    avatar
    email
    hasWallet
    income
    bookings(limit: 10, page: 1) {
      total
      result {
        id
        listing {
          id
          title
          images
          address
          price
        }
        checkIn
        checkOut
      }
    }
    listings(limit: 10, page: 1) {
      total
      result {
        id
        title
        images
        address
        price
      }
    }
    isHost
    hostProfile {
      id
      license
      agency
      experience
      specializations
      ratings
      reviewCount
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables> & ({ variables: UserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export function useUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const HostsDocument = gql`
    query Hosts($limit: Int!, $page: Int!) {
  hosts(limit: $limit, page: $page) {
    total
    result {
      id
      user {
        id
        name
        avatar
      }
      license
      agency
      experience
      specializations
      ratings
      reviewCount
    }
  }
}
    `;

/**
 * __useHostsQuery__
 *
 * To run a query within a React component, call `useHostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useHostsQuery(baseOptions: Apollo.QueryHookOptions<HostsQuery, HostsQueryVariables> & ({ variables: HostsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HostsQuery, HostsQueryVariables>(HostsDocument, options);
      }
export function useHostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HostsQuery, HostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HostsQuery, HostsQueryVariables>(HostsDocument, options);
        }
export function useHostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HostsQuery, HostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HostsQuery, HostsQueryVariables>(HostsDocument, options);
        }
export type HostsQueryHookResult = ReturnType<typeof useHostsQuery>;
export type HostsLazyQueryHookResult = ReturnType<typeof useHostsLazyQuery>;
export type HostsSuspenseQueryHookResult = ReturnType<typeof useHostsSuspenseQuery>;
export type HostsQueryResult = Apollo.QueryResult<HostsQuery, HostsQueryVariables>;
export const HostDocument = gql`
    query Host($id: ID!) {
  host(id: $id) {
    id
    user {
      id
      name
      avatar
      email
    }
    license
    agency
    experience
    specializations
    ratings
    reviewCount
    reviews(limit: 5, page: 1) {
      total
      result {
        id
        author {
          id
          name
          avatar
        }
        content
        rating
        createdAt
      }
    }
  }
}
    `;

/**
 * __useHostQuery__
 *
 * To run a query within a React component, call `useHostQuery` and pass it any options that fit your needs.
 * When your component renders, `useHostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHostQuery(baseOptions: Apollo.QueryHookOptions<HostQuery, HostQueryVariables> & ({ variables: HostQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HostQuery, HostQueryVariables>(HostDocument, options);
      }
export function useHostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HostQuery, HostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HostQuery, HostQueryVariables>(HostDocument, options);
        }
export function useHostSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HostQuery, HostQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HostQuery, HostQueryVariables>(HostDocument, options);
        }
export type HostQueryHookResult = ReturnType<typeof useHostQuery>;
export type HostLazyQueryHookResult = ReturnType<typeof useHostLazyQuery>;
export type HostSuspenseQueryHookResult = ReturnType<typeof useHostSuspenseQuery>;
export type HostQueryResult = Apollo.QueryResult<HostQuery, HostQueryVariables>;
export const PropertyReviewsDocument = gql`
    query PropertyReviews($listingId: ID!, $limit: Int!, $page: Int!) {
  propertyReviews(listingId: $listingId, limit: $limit, page: $page) {
    total
    result {
      id
      author {
        id
        name
        avatar
      }
      content
      rating
      createdAt
    }
  }
}
    `;

/**
 * __usePropertyReviewsQuery__
 *
 * To run a query within a React component, call `usePropertyReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePropertyReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePropertyReviewsQuery({
 *   variables: {
 *      listingId: // value for 'listingId'
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function usePropertyReviewsQuery(baseOptions: Apollo.QueryHookOptions<PropertyReviewsQuery, PropertyReviewsQueryVariables> & ({ variables: PropertyReviewsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PropertyReviewsQuery, PropertyReviewsQueryVariables>(PropertyReviewsDocument, options);
      }
export function usePropertyReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PropertyReviewsQuery, PropertyReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PropertyReviewsQuery, PropertyReviewsQueryVariables>(PropertyReviewsDocument, options);
        }
export function usePropertyReviewsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PropertyReviewsQuery, PropertyReviewsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PropertyReviewsQuery, PropertyReviewsQueryVariables>(PropertyReviewsDocument, options);
        }
export type PropertyReviewsQueryHookResult = ReturnType<typeof usePropertyReviewsQuery>;
export type PropertyReviewsLazyQueryHookResult = ReturnType<typeof usePropertyReviewsLazyQuery>;
export type PropertyReviewsSuspenseQueryHookResult = ReturnType<typeof usePropertyReviewsSuspenseQuery>;
export type PropertyReviewsQueryResult = Apollo.QueryResult<PropertyReviewsQuery, PropertyReviewsQueryVariables>;
export const HostReviewsDocument = gql`
    query HostReviews($hostId: ID!, $limit: Int!, $page: Int!) {
  hostReviews(hostId: $hostId, limit: $limit, page: $page) {
    total
    result {
      id
      author {
        id
        name
        avatar
      }
      content
      rating
      createdAt
    }
  }
}
    `;

/**
 * __useHostReviewsQuery__
 *
 * To run a query within a React component, call `useHostReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHostReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHostReviewsQuery({
 *   variables: {
 *      hostId: // value for 'hostId'
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useHostReviewsQuery(baseOptions: Apollo.QueryHookOptions<HostReviewsQuery, HostReviewsQueryVariables> & ({ variables: HostReviewsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HostReviewsQuery, HostReviewsQueryVariables>(HostReviewsDocument, options);
      }
export function useHostReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HostReviewsQuery, HostReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HostReviewsQuery, HostReviewsQueryVariables>(HostReviewsDocument, options);
        }
export function useHostReviewsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HostReviewsQuery, HostReviewsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HostReviewsQuery, HostReviewsQueryVariables>(HostReviewsDocument, options);
        }
export type HostReviewsQueryHookResult = ReturnType<typeof useHostReviewsQuery>;
export type HostReviewsLazyQueryHookResult = ReturnType<typeof useHostReviewsLazyQuery>;
export type HostReviewsSuspenseQueryHookResult = ReturnType<typeof useHostReviewsSuspenseQuery>;
export type HostReviewsQueryResult = Apollo.QueryResult<HostReviewsQuery, HostReviewsQueryVariables>;
export const FeaturedListingsDocument = gql`
    query FeaturedListings($limit: Int!) {
  listings(filter: PRICE_HIGH_TO_LOW, limit: $limit, page: 1) {
    total
    result {
      id
      title
      description
      images
      host {
        id
        name
        avatar
        hasWallet
      }
      country
      admin
      city
      type
      address
      price
      numOfGuests
      bedrooms
      bathrooms
      features {
        name
        icon
        description
      }
      averageRating
      reviewCount
    }
  }
}
    `;

/**
 * __useFeaturedListingsQuery__
 *
 * To run a query within a React component, call `useFeaturedListingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeaturedListingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeaturedListingsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useFeaturedListingsQuery(baseOptions: Apollo.QueryHookOptions<FeaturedListingsQuery, FeaturedListingsQueryVariables> & ({ variables: FeaturedListingsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeaturedListingsQuery, FeaturedListingsQueryVariables>(FeaturedListingsDocument, options);
      }
export function useFeaturedListingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeaturedListingsQuery, FeaturedListingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeaturedListingsQuery, FeaturedListingsQueryVariables>(FeaturedListingsDocument, options);
        }
export function useFeaturedListingsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FeaturedListingsQuery, FeaturedListingsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FeaturedListingsQuery, FeaturedListingsQueryVariables>(FeaturedListingsDocument, options);
        }
export type FeaturedListingsQueryHookResult = ReturnType<typeof useFeaturedListingsQuery>;
export type FeaturedListingsLazyQueryHookResult = ReturnType<typeof useFeaturedListingsLazyQuery>;
export type FeaturedListingsSuspenseQueryHookResult = ReturnType<typeof useFeaturedListingsSuspenseQuery>;
export type FeaturedListingsQueryResult = Apollo.QueryResult<FeaturedListingsQuery, FeaturedListingsQueryVariables>;
export const NearbyLocationsDocument = gql`
    query NearbyLocations($listingId: ID!, $radius: Float!) {
  nearbyLocations(listingId: $listingId, radius: $radius) {
    categories {
      name
      icon
      places {
        name
        distance
        type
      }
    }
  }
}
    `;

/**
 * __useNearbyLocationsQuery__
 *
 * To run a query within a React component, call `useNearbyLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNearbyLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNearbyLocationsQuery({
 *   variables: {
 *      listingId: // value for 'listingId'
 *      radius: // value for 'radius'
 *   },
 * });
 */
export function useNearbyLocationsQuery(baseOptions: Apollo.QueryHookOptions<NearbyLocationsQuery, NearbyLocationsQueryVariables> & ({ variables: NearbyLocationsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NearbyLocationsQuery, NearbyLocationsQueryVariables>(NearbyLocationsDocument, options);
      }
export function useNearbyLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NearbyLocationsQuery, NearbyLocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NearbyLocationsQuery, NearbyLocationsQueryVariables>(NearbyLocationsDocument, options);
        }
export function useNearbyLocationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<NearbyLocationsQuery, NearbyLocationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NearbyLocationsQuery, NearbyLocationsQueryVariables>(NearbyLocationsDocument, options);
        }
export type NearbyLocationsQueryHookResult = ReturnType<typeof useNearbyLocationsQuery>;
export type NearbyLocationsLazyQueryHookResult = ReturnType<typeof useNearbyLocationsLazyQuery>;
export type NearbyLocationsSuspenseQueryHookResult = ReturnType<typeof useNearbyLocationsSuspenseQuery>;
export type NearbyLocationsQueryResult = Apollo.QueryResult<NearbyLocationsQuery, NearbyLocationsQueryVariables>;
export const IsLoggedInDocument = gql`
    query IsLoggedIn {
  isLoggedIn {
    id
    token
    avatar
    name
    email
    didRequest
  }
}
    `;

/**
 * __useIsLoggedInQuery__
 *
 * To run a query within a React component, call `useIsLoggedInQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsLoggedInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsLoggedInQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsLoggedInQuery(baseOptions?: Apollo.QueryHookOptions<IsLoggedInQuery, IsLoggedInQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsLoggedInQuery, IsLoggedInQueryVariables>(IsLoggedInDocument, options);
      }
export function useIsLoggedInLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsLoggedInQuery, IsLoggedInQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsLoggedInQuery, IsLoggedInQueryVariables>(IsLoggedInDocument, options);
        }
export function useIsLoggedInSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<IsLoggedInQuery, IsLoggedInQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IsLoggedInQuery, IsLoggedInQueryVariables>(IsLoggedInDocument, options);
        }
export type IsLoggedInQueryHookResult = ReturnType<typeof useIsLoggedInQuery>;
export type IsLoggedInLazyQueryHookResult = ReturnType<typeof useIsLoggedInLazyQuery>;
export type IsLoggedInSuspenseQueryHookResult = ReturnType<typeof useIsLoggedInSuspenseQuery>;
export type IsLoggedInQueryResult = Apollo.QueryResult<IsLoggedInQuery, IsLoggedInQueryVariables>;
export const LogOutDocument = gql`
    mutation LogOut {
  logOut {
    didRequest
  }
}
    `;
export type LogOutMutationFn = Apollo.MutationFunction<LogOutMutation, LogOutMutationVariables>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: Apollo.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, options);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const LogInDocument = gql`
    mutation LogIn($input: LoginInput!) {
  logIn(input: $input) {
    id
    token
    avatar
    hasWallet
    didRequest
  }
}
    `;
export type LogInMutationFn = Apollo.MutationFunction<LogInMutation, LogInMutationVariables>;

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLogInMutation(baseOptions?: Apollo.MutationHookOptions<LogInMutation, LogInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument, options);
      }
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = Apollo.MutationResult<LogInMutation>;
export type LogInMutationOptions = Apollo.BaseMutationOptions<LogInMutation, LogInMutationVariables>;