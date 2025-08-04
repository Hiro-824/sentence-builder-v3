import { Block } from "./block";

export interface Project {
    id: string;
    name: string;
    updated_at: string;
}

export interface ProjectData {
    blocks: Block[];
}