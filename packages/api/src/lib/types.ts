import { Collection, ObjectId } from "mongodb";

export enum ListingType {
  Apartment = "APARTMENT",
  House = "HOUSE",
  Condo = "CONDO",
  Villa = "VILLA",
}

export interface Viewer {
  _id?: string;
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
  tenant: string;
  checkIn: string;
  checkOut: string;
}

export interface Listing {
  _id: ObjectId;
  title: string;
  description: string;
  image: string;
  host: string;
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
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface Agent {
  _id: ObjectId;
  user: ObjectId;
  license: string;
  agency: string;
  experience: number;
  specializations: string[];
  ratings: number;
  reviewCount: number;
}

export interface User {
  _id: ObjectId;
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
  isAgent?: boolean;
  agentProfile?: ObjectId;
}

export interface Database {
  bookings: Collection<Booking>;
  listings: Collection<Listing>;
  users: Collection<User>;
  agents: Collection<Agent>;
}
