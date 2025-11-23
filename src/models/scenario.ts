import { Block } from "./block";

export type ScenarioTurn =
  | { speaker: "ai"; text: string }
  | { speaker: "user"; blocks: Block[] };

export interface Scenario {
  turns: ScenarioTurn[];
}
