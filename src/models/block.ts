export type blockChildType = "text" | "dropdown" | "placeholder" | "attachment";

export interface Block {
    id: string;
    x: number;
    y: number;
    color: string;
    isTransparent?: boolean;
    isRound?: boolean;
    children: BlockChild[];
    translation?: string;
}

export interface BlockChild {
    id: string;
    hidden: boolean;
    keepEmpty: boolean;
    headIndex?: number[];
    type: blockChildType;
    selected?: number;
    content: unknown;
}