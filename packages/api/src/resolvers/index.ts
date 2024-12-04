import merge = require("lodash.merge");

import { userResolvers } from "./User";
import { viewerResolvers } from "./Viewer";
import { listingResolvers } from "./Listing";
import { bookingResolvers } from "./Booking";
import { hostResolvers } from "./Host";

export const resolvers = merge(
  userResolvers,
  viewerResolvers,
  listingResolvers,
  bookingResolvers,
  hostResolvers
);
