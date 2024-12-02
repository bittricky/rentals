import { ObjectId } from "mongodb";
import { PropertyReview, AgentReview } from "../src/lib/types";

// Property Reviews
export const propertyReviews: PropertyReview[] = [
  {
    _id: new ObjectId(),
    listing: new ObjectId("5d378db94e84753160e08b30"),
    author: new ObjectId("5d378db94e84753160e08b59"),
    content: "Amazing location and very clean apartment. Perfect for our weekend stay!",
    rating: 5,
    createdAt: "2024-01-15T08:45:00Z",
  },
  {
    _id: new ObjectId(),
    listing: new ObjectId("5d378db94e84753160e08b31"),
    author: new ObjectId("5d378db94e84753160e08b58"),
    content: "Great studio for solo travelers. Very affordable and well-maintained.",
    rating: 4.5,
    createdAt: "2024-01-10T15:30:00Z",
  },
  {
    _id: new ObjectId(),
    listing: new ObjectId("5d378db94e84753160e08b32"),
    author: new ObjectId("5d378db94e84753160e08b57"),
    content: "Beautiful house with amazing amenities. The pool was a great bonus!",
    rating: 5,
    createdAt: "2024-01-05T10:15:00Z",
  },
  {
    _id: new ObjectId(),
    listing: new ObjectId("5d378db94e84753160e08b33"),
    author: new ObjectId("5d378db94e84753160e08b56"),
    content: "Location was perfect but the apartment needed some maintenance.",
    rating: 3.5,
    createdAt: "2024-01-02T14:20:00Z",
  },
  {
    _id: new ObjectId(),
    listing: new ObjectId("5d378db94e84753160e08b34"),
    author: new ObjectId("5d378db94e84753160e08b55"),
    content: "Spacious and modern. Great for family gatherings!",
    rating: 4.8,
    createdAt: "2023-12-28T11:00:00Z",
  }
];

// Agent Reviews
export const agentReviews: AgentReview[] = [
  {
    _id: new ObjectId(),
    agent: new ObjectId("5d378db94e84753160e08b57"),
    author: new ObjectId("5d378db94e84753160e08b59"),
    content: "Very professional and responsive. Made the rental process smooth.",
    rating: 5,
    createdAt: "2024-01-14T09:30:00Z",
  },
  {
    _id: new ObjectId(),
    agent: new ObjectId("5d378db94e84753160e08b55"),
    author: new ObjectId("5d378db94e84753160e08b58"),
    content: "Quick to respond and very knowledgeable about the area.",
    rating: 4.5,
    createdAt: "2024-01-08T16:45:00Z",
  },
  {
    _id: new ObjectId(),
    agent: new ObjectId("5d378db94e84753160e08b56"),
    author: new ObjectId("5d378db94e84753160e08b57"),
    content: "Helped us find the perfect rental within our budget.",
    rating: 4.8,
    createdAt: "2024-01-03T13:20:00Z",
  }
];
