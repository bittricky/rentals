export interface Viewer {
  id?: string;
  token?: string;
  avatar?: string;
  hasWallet?: boolean;
  didRequest: boolean;
}

export enum ListingsFilter {
  PRICE_LOW_TO_HIGH = "PRICE_LOW_TO_HIGH",
  PRICE_HIGH_TO_LOW = "PRICE_HIGH_TO_LOW"
}

export enum ListingType {
  APARTMENT = "APARTMENT",
  HOUSE = "HOUSE",
  CONDO = "CONDO",
  VILLA = "VILLA"
}

export interface Feature {
  name: string;
  icon: string;
  description?: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  contact: string;
  hasWallet: boolean;
  income?: number;
  bookings?: Bookings;
  listings?: Listings;
  isHost?: boolean;
  hostProfile?: Host;
}

export interface Host {
  id: string;
  user: User;
  license: string;
  agency: string;
  experience: string;
  specializations: string[];
  ratings: number;
  reviewCount: number;
  reviews?: HostReviews;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  images: string[];
  host: User;
  country: string;
  admin: string;
  city: string;
  type: ListingType;
  address: string;
  price: number;
  numOfGuests: number;
  bedrooms: number;
  bathrooms: number;
  swimmingPools: number;
  pantries: number;
  features: Feature[];
  bookings?: Bookings;
  reviews?: PropertyReviews;
  averageRating: number;
  reviewCount: number;
}

export interface Booking {
  id: string;
  listing: Listing;
  tenant: User;
  checkIn: string;
  checkOut: string;
}

export interface Review {
  id: string;
  author: User;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt?: string;
}

export interface PropertyReview extends Review {
  listing: Listing;
}

export interface HostReview extends Review {
  host: Host;
}

export interface Bookings {
  total: number;
  result: Booking[];
}

export interface Listings {
  region?: string;
  total: number;
  result: Listing[];
}

export interface Hosts {
  total: number;
  result: Host[];
}

export interface PropertyReviews {
  total: number;
  result: PropertyReview[];
}

export interface HostReviews {
  total: number;
  result: HostReview[];
}

export interface ContactHostInput {
  listingId: string;
  hostId: string;
  message: string;
  name: string;
  email: string;
  phone: string;
}

export interface ReviewInput {
  content: string;
  rating: number;
}
