export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
