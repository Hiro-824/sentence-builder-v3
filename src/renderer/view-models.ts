import type { BlockShape } from "@/models/block";

export type BlockSurface = "canvas" | "sidebar" | "dragboard";
export type AttachmentSide = "left" | "right";
export type DeletionTarget = "trash" | "sidebar";

/**
 * Pure UI blueprint for the renderer.
 * It intentionally carries no Grammar/Converter instances or mutable tree helpers.
 */
export interface BlockViewModel {
    id: string;
    x: number;
    y: number;
    color: string;
    shape: BlockShape;
    draggable: boolean;
    surface?: BlockSurface;
    translation?: string;
    showTranslationBubble?: boolean;
    showSendButton?: boolean;
    sendButtonDisabled?: boolean;
    sourceTemplateId?: string;
    children: BlockChildViewModel[];
    controls?: BlockControlViewModel[];
    metadata?: {
        tags?: string[];
        isFiniteSentence?: boolean;
        isComplete?: boolean;
    };
}

export type BlockChildViewModel =
    | BlockTextViewModel
    | BlockDropdownViewModel
    | BlockPlaceholderViewModel
    | BlockAttachmentViewModel;

interface BaseChildViewModel {
    id: string;
    hidden?: boolean;
}

export interface BlockTextViewModel extends BaseChildViewModel {
    kind: "text";
    text: string;
    editable?: boolean;
}

export interface BlockDropdownViewModel extends BaseChildViewModel {
    kind: "dropdown";
    options: string[];
    selectedIndex: number;
}

export interface BlockPlaceholderViewModel extends BaseChildViewModel {
    kind: "placeholder";
    slotIndex: number;
    resolved?: boolean;
    instanceId?: string;
    content: BlockViewModel | null;
}

export interface BlockAttachmentViewModel extends BaseChildViewModel {
    kind: "attachment";
    content: BlockViewModel | null;
}

export type BlockControlViewModel = BlockSwapControlViewModel;

/**
 * Reserved for future intra-block reordering without changing the renderer contract.
 */
export interface BlockSwapControlViewModel {
    id: string;
    kind: "swap";
    direction: AttachmentSide;
    disabled?: boolean;
}

export interface DropOnPlaceholderEvent {
    draggedId: string;
    targetBlockId: string;
    placeholderId: string;
    slotIndex: number;
}

export interface AttachToBlockEvent {
    draggedId: string;
    targetBlockId: string;
    side: AttachmentSide;
}

export interface MoveBlockEvent {
    blockId: string;
    x: number;
    y: number;
}

export interface DropdownChangeEvent {
    blockId: string;
    childId: string;
    previousIndex: number;
    newIndex: number;
}

export interface TextEditEvent {
    blockId: string;
    childId: string;
    newText: string;
}

export interface TrashDropEvent {
    blockId: string;
    target: DeletionTarget;
}

export interface SidebarBlockInstantiationEvent {
    templateId: string;
    sourceSurface: Extract<BlockSurface, "sidebar">;
}

export interface SendSentenceEvent {
    blockId: string;
}

export interface RendererEvents {
    onDropOnPlaceholder?: (event: DropOnPlaceholderEvent) => void;
    onAttachToBlock?: (event: AttachToBlockEvent) => void;
    onMoveBlock?: (event: MoveBlockEvent) => void;
    onDropdownChange?: (event: DropdownChangeEvent) => void;
    onTextEdit?: (event: TextEditEvent) => void;
    onTrashDrop?: (event: TrashDropEvent) => void;
    onRequestSidebarBlockInstance?: (
        event: SidebarBlockInstantiationEvent
    ) => BlockViewModel | null | Promise<BlockViewModel | null>;
    onSendSentence?: (event: SendSentenceEvent) => void;
}
