import { ObjectId } from "mongodb";
import { PropertyReview, AgentReview } from "../src/lib/types";

// Property Reviews
export const propertyReviews: PropertyReview[] = [
  {
    _id: new ObjectId(),
    listing: new ObjectId("5d378db94e84753160e08b30"),
    author: new ObjectId("5d378db94e84753160e08b59"),  // Sarah K.
    content: "Amazing location and very clean apartment. Perfect for our weekend stay!",
    rating: 5,
    createdAt: "2024-01-15T08:45:00Z",
  },
  {
    _id: new ObjectId(),
    listing: new ObjectId("5d378db94e84753160e08b31"),
    author: new ObjectId("5d378db94e84753160e08b58"),  // Danielle C.
    content: "Great studio for solo travelers. Very affordable and well-maintained.",
    rating: 4.5,
    createdAt: "2024-01-10T15:30:00Z",
  },
  {
    _id: new ObjectId(),
    listing: new ObjectId("5d378db94e84753160e08b40"),
    author: new ObjectId("5d378db94e84753160e08b57"),  // Andrew D.
    content: "Absolutely stunning property! The pool and wine cellar were highlights of our stay.",
    rating: 5,
    createdAt: "2024-01-05T12:15:00Z",
  },
  {
    _id: new ObjectId(),
    listing: new ObjectId("5d378db94e84753160e08b46"),
    author: new ObjectId("5d378db94e84753160e08b56"),  // Elizabeth A.
    content: "Beautiful home in a perfect location. The garden is absolutely gorgeous!",
    rating: 4.8,
    createdAt: "2024-01-20T09:20:00Z",
  }
];

// Agent Reviews
export const agentReviews: AgentReview[] = [
  {
    _id: new ObjectId(),
    agent: new ObjectId("5d378db94e84753160e08c01"),  // James J.
    author: new ObjectId("5d378db94e84753160e08b58"),  // Danielle C.
    content: "James was incredibly professional and found us exactly what we were looking for. Highly recommend!",
    rating: 5,
    createdAt: "2024-01-12T10:30:00Z",
  },
  {
    _id: new ObjectId(),
    agent: new ObjectId("5d378db94e84753160e08c02"),  // Elizabeth A.
    author: new ObjectId("5d378db94e84753160e08b59"),  // Sarah K.
    content: "Elizabeth's knowledge of modern homes and condos is exceptional. She made our first-time buying experience smooth.",
    rating: 4.8,
    createdAt: "2024-01-08T14:45:00Z",
  },
  {
    _id: new ObjectId(),
    agent: new ObjectId("5d378db94e84753160e08c03"),  // Andrew D.
    author: new ObjectId("5d378db94e84753160e08b56"),  // Elizabeth A.
    content: "Andrew's expertise in beach properties really showed. He found us the perfect vacation rental.",
    rating: 4.7,
    createdAt: "2024-01-18T11:20:00Z",
  }
];
