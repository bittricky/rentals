import merge = require("lodash.merge");

import { userResolvers } from "./User";
import { viewerResolvers } from "./Viewer";

export const resolvers = merge(userResolvers, viewerResolvers);
