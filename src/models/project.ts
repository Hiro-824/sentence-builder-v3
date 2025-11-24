import { Block } from "./block";
import { ScenarioProgress } from "./scenario";

export interface Project {
    id: string;
    name: string;
    updated_at: string;
}

export interface ProjectData {
    blocks: Block[];
    scenarioProgress?: ScenarioProgress;
    scenarioId?: string | null;
}
