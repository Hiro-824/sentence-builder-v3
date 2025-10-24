import { Word } from "./grammar-entities";

export type blockChildType = "text" | "dropdown" | "placeholder" | "attachment";

export interface Block {
    id: string;
    x: number;
    y: number;
    words: Word[];
    color: string;
    isRound?: boolean;
    undraggable?: boolean;
    children: BlockChild[];
    translation?: string;
    tags?: string[];
    structure?: SentenceStructure;
}

export interface BlockChild {
    id: string;
    hidden: boolean;
    resolved?: boolean;
    headIndex?: number[];
    type: blockChildType;
    selected?: number;
    content: unknown;
    instanceId?: string;
}

export interface SentenceStructureEntry {
    icon?: string;
    label: string;
    value: string;
    tone?: 'note' | 'warning' | 'missing';
}

export interface SentenceStructure {
    title: string;
    entries: SentenceStructureEntry[];
    note: string;
}
