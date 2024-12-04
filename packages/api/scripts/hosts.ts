import { ObjectId } from "mongodb";
import { Host } from "../src/lib/types";
import { user1Id, user2Id, user3Id, user4Id } from "./users";

export const hosts: Host[] = [
  {
    _id: new ObjectId(),
    user: user1Id,
    license: "CA-REB-12345",
    agency: "Luxury Living Realty",
    experience: "8 years",
    specializations: ["Luxury Homes", "Waterfront Properties"],
    ratings: 4.8,
    reviewCount: 127,
    createdAt: new Date().toISOString()
  },
  {
    _id: new ObjectId(),
    user: user2Id,
    license: "CA-REB-67890",
    agency: "Investment Property Group",
    experience: "12 years",
    specializations: ["Commercial", "Investment Properties"],
    ratings: 4.9,
    reviewCount: 184,
    createdAt: new Date().toISOString()
  },
  {
    _id: new ObjectId(),
    user: user3Id,
    license: "CA-REB-11223",
    agency: "Urban Living Real Estate",
    experience: "6 years",
    specializations: ["First-time Buyers", "Condos"],
    ratings: 4.7,
    reviewCount: 156,
    createdAt: new Date().toISOString()
  },
  {
    _id: new ObjectId(),
    user: user4Id,
    license: "CA-REB-44556",
    agency: "Beverly Hills Estates",
    experience: "15 years",
    specializations: ["Luxury Estates", "Penthouses"],
    ratings: 4.9,
    reviewCount: 203,
    createdAt: new Date().toISOString()
  }
];
