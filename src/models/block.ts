import { Word } from "./grammar-entities";

export type blockChildType = "text" | "dropdown" | "placeholder" | "attachment";

export interface Block {
    id: string;
    x: number;
    y: number;
    words: Word[];
    color: string;
    isRound?: boolean;
    children: BlockChild[];
    translation?: string;
}

export interface BlockChild {
    id: string;
    hidden: boolean;
    headIndex?: number[];
    type: blockChildType;
    selected?: number;
    content: unknown;
    instanceId?: string;
}