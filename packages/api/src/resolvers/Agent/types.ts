import { Agent } from "../../lib/types";
import { Database } from "../../lib/types";

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
