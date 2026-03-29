import { Word } from "./grammar-entities";

export type blockChildType = "text" | "dropdown" | "placeholder" | "attachment";
export type BlockShape = "rect" | "capsule" | "bevel";

export interface Block {
    id: string;
    x: number;
    y: number;
    words: Word[];
    color: string;
    isRound?: boolean;
    blockShape?: BlockShape;
    undraggable?: boolean;
    children: BlockChild[];
    translation?: string;
    tags?: string[];
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
    editable?: boolean;
}
