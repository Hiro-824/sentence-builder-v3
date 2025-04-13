import { Lexicon } from "./category";

export type blockChildType = "text" | "dropdown" | "placeholder" | "attachment";

export interface Block {
    id: string;
    lexicons: Lexicon[];
    x: number;
    y: number;
    color: string;
    isTransparent?: boolean;
    isRound?: boolean;
    children: BlockChild[];
}

export interface BlockChild {
    id: string;
    type: blockChildType;
    selected?: number;
    content: unknown;
}