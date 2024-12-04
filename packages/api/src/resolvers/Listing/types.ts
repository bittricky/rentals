import { Booking, Listing, ListingType } from "../../lib/types";

export enum ListingsFilters {
  PRICE_LOW_TO_HIGH = "PRICE_LOW_TO_HIGH",
  PRICE_HIGH_TO_LOW = "PRICE_HIGH_TO_LOW",
  PROPERTY_TYPE = "PROPERTY_TYPE",
  PRICE_RANGE = "PRICE_RANGE",
}

export interface ListingArgs {
  id: string;
}

export interface ListingReviewsArgs {
  limit?: number;
  page?: number;
}

export interface ListingBookingsArgs {
  limit: number;
  page: number;
}

export interface ListingBookingsData {
  total: number;
  result: Booking[];
}

export interface ListingsArgs {
  location: string | null;
  filter: ListingsFilters;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  limit: number;
  page: number;
}

export interface ListingsData {
  region: string | null;
  total: number;
  result: Listing[];
}

export interface ListingsQuery {
  country?: string;
  admin?: string;
  city?: string;
  type?: ListingType;
  price?: {
    $gte?: number;
    $lte?: number;
  };
}
