export type blockChildType = "text" | "dropdown" | "placeholder" | "attachment";

export interface Block {
    id: string;
    x: number;
    y: number;
    color: string;
    children: BlockChild[];
}

export interface BlockChild {
    id: string;
    type: blockChildType;
    selected?: number;
    content: unknown;
}