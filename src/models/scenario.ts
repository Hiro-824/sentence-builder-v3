import { Block } from "./block";

export type ScenarioTurn =
  | { speaker: "ai"; text: string; translation?: string }
  | { speaker: "user"; blocks: Block[] };

export interface Scenario {
  turns: ScenarioTurn[];
}

export interface ScenarioOption {
  id: string;
  title: string;
  description?: string;
  scenario: Scenario;
}

export interface ScenarioChatMessage {
  id: number;
  text: string;
  sender: "user" | "ai";
  translation?: string;
}

export interface ScenarioProgress {
  messages: ScenarioChatMessage[];
  currentTurnIndex: number;
  nextId: number;
  visibleTranslations: Record<number, boolean>;
  isLoading?: boolean;
}
