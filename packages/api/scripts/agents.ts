import { ObjectId } from "mongodb";
import { Agent } from "../src/lib/types";

export const agents: Agent[] = [
  {
    _id: new ObjectId("5d378db94e84753160e08c01"),
    user: new ObjectId("5d378db94e84753160e08b55"),  // James J.
    license: "CA-DRE#02345678",
    agency: "Luxury Homes Realty",
    experience: 8,
    specializations: ["Luxury Homes", "Waterfront Properties", "Investment Properties"],
    ratings: 4.9,
    reviewCount: 127
  },
  {
    _id: new ObjectId("5d378db94e84753160e08c02"),
    user: new ObjectId("5d378db94e84753160e08b56"),  // Elizabeth A.
    license: "CA-DRE#01234567",
    agency: "Modern Living Real Estate",
    experience: 12,
    specializations: ["Modern Homes", "Condos", "First-time Buyers"],
    ratings: 4.8,
    reviewCount: 203
  },
  {
    _id: new ObjectId("5d378db94e84753160e08c03"),
    user: new ObjectId("5d378db94e84753160e08b57"),  // Andrew D.
    license: "CA-DRE#03456789",
    agency: "Coastal Properties Group",
    experience: 5,
    specializations: ["Beach Houses", "Vacation Rentals", "Property Management"],
    ratings: 4.7,
    reviewCount: 89
  }
];
