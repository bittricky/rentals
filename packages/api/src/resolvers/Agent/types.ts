import { Agent } from "../../lib/types";
import { AgentReview } from "../../lib/types";

export interface AgentsData {
  total: number;
  result: Agent[];
}

export interface AgentsArgs {
  limit: number;
  page: number;
}

export interface AgentArgs {
  id: string;
}

export interface AgentReviewsArgs {
  agentId: string;
  limit: number;
  page: number;
}

export interface ReviewsArgs {
  limit: number;
  page: number;
}

export interface AgentReviewsData {
  total: number;
  result: AgentReview[];
}
