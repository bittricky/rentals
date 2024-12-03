export interface Viewer {
  id?: string;
  token?: string;
  avatar?: string;
  hasWallet?: boolean;
  didRequest: boolean;
}

export interface Feature {
  name: string;
  icon: string;
  description?: string;
}

export interface ListingType {
  APARTMENT: 'APARTMENT';
  HOUSE: 'HOUSE';
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
  isAgent?: boolean;
  agentProfile?: Agent;
}

export interface Agent {
  id: string;
  user: User;
  license: string;
  agency: string;
  experience: number;
  specializations: string[];
  ratings: number;
  reviewCount: number;
  reviews?: AgentReviews;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  image: string;
  host: User;
  country: string;
  admin: string;
  city: string;
  type: keyof ListingType;
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

export interface AgentReview extends Review {
  agent: Agent;
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

export interface Agents {
  total: number;
  result: Agent[];
}

export interface PropertyReviews {
  total: number;
  result: PropertyReview[];
}

export interface AgentReviews {
  total: number;
  result: AgentReview[];
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
