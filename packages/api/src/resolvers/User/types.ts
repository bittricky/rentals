import { Booking, Listing } from "../../lib/types";

export interface UserArgs {
  id: string;
}

export interface ContactHostInput {
  listingId: string;
  hostId: string;
  message: string;
  name: string;
  email: string;
  phone: string;
}

export interface ContactHostResponse {
  success: boolean;
  message: string;
}

export interface UserBookingsArgs {
  limit: number;
  page: number;
}

export interface UserBookingsData {
  total: number;
  result: Booking[];
}

export interface UserListingsArgs {
  limit: number;
  page: number;
}

export interface UserListingsData {
  total: number;
  result: Listing[];
}
