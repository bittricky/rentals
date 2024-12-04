import { Host, HostReview } from "../../lib/types";

export interface HostsData {
  total: number;
  result: Host[];
}

export interface HostsArgs {
  limit: number;
  page: number;
}

export interface HostArgs {
  id: string;
}

export interface HostReviewsArgs {
  hostId: string;
  limit: number;
  page: number;
}

export interface ReviewsArgs {
  limit: number;
  page: number;
}

export interface HostReviewsData {
  total: number;
  result: HostReview[];
}
