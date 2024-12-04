import { Collection, ObjectId } from "mongodb";

export enum ListingType {
  Apartment = "APARTMENT",
  House = "HOUSE",
  Condo = "CONDO",
  Villa = "VILLA",
}

export interface Viewer {
  _id?: string | ObjectId;
  token?: string;
  avatar?: string;
  walletId?: string;
  didRequest: boolean;
}

export interface BookingIndexMonth {
  [key: string]: boolean;
}

export interface BookingIndexYear {
  [key: string]: BookingIndexMonth;
}

export interface BookingIndex {
  [key: string]: BookingIndexYear;
}

export interface Booking {
  _id: ObjectId;
  listing: ObjectId;
  tenant: string | ObjectId;
  checkIn: string;
  checkOut: string;
}

export interface Feature {
  name: string;
  icon: string;
  description?: string;
}

export interface Review {
  _id: ObjectId;
  author: ObjectId;  // User who wrote the review
  content: string;
  rating: number;
  createdAt: string;
  updatedAt?: string;
}

export interface PropertyReview extends Review {
  listing: ObjectId;
}

export interface HostReview extends Review {
  host: ObjectId;
}

export interface Listing {
  _id: ObjectId;
  title: string;
  description: string;
  image: string;
  host: string | ObjectId;
  type: ListingType;
  address: string;
  country: string;
  admin: string;
  city: string;
  bookings: ObjectId[];
  bookingsIndex: BookingIndex;
  price: number;
  numOfGuests: number;
  bedrooms: number;
  bathrooms: number;
  swimmingPools: number;
  pantries: number;
  authorized: boolean;
  features: Feature[];
  reviews: ObjectId[];
  averageRating: number;
  reviewCount: number;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface Host {
  _id: ObjectId;
  user: ObjectId;
  license: string;
  agency: string;
  experience: string;
  specializations: string[];
  ratings: number;
  reviewCount: number;
  createdAt: string;
}

export interface User {
  _id: string | ObjectId;
  name: string;
  avatar: string;
  contact: string;
  phone?: string;
  token?: string;
  walletId?: string;
  income: number;
  bookings: ObjectId[];
  listings: ObjectId[];
  authorized?: boolean;
  isHost?: boolean;
  hostProfile?: ObjectId;
}

export interface Database {
  bookings: Collection<Booking>;
  listings: Collection<Listing>;
  users: Collection<User>;
  hosts: Collection<Host>;
  propertyReviews: Collection<PropertyReview>;
  hostReviews: Collection<HostReview>;
}
