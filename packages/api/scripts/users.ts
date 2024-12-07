import { ObjectId } from "mongodb";
import { User } from "../src/lib/types";

export const user1Id = new ObjectId();
export const user2Id = new ObjectId();
export const user3Id = new ObjectId();
export const user4Id = new ObjectId();
export const user5Id = new ObjectId();

export const users: User[] = [
  {
    _id: user1Id,
    token: "token_************",
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    email: "sarah.j@rentals.com",
    walletId: "acct_************",
    income: 723796,
    bookings: [],
    listings: [],
    isHost: true
  },
  {
    _id: user2Id,
    token: "token_************",
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    email: "michael.c@rentals.com",
    walletId: "acct_************",
    income: 256144,
    bookings: [],
    listings: [],
    isHost: true
  },
  {
    _id: user3Id,
    token: "token_************",
    name: "Emma Rodriguez",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    email: "emma.r@rentals.com",
    walletId: "acct_************",
    income: 272359,
    bookings: [],
    listings: [],
    isHost: true
  },
  {
    _id: user4Id,
    token: "token_************",
    name: "David Thompson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    email: "david.t@rentals.com",
    walletId: "acct_************",
    income: 465043,
    bookings: [],
    listings: [],
    isHost: true
  },
  {
    _id: user5Id,
    token: "token_************",
    name: "Regular User",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    email: "user@rentals.com",
    walletId: "acct_************",
    income: 104347,
    bookings: [],
    listings: [],
    isHost: false
  }
];
