import { Block } from "@/models/block";

export interface BlockSnapshot {
    id: string;
    type: string;
    string_rep: string;
    translation: string;
}

function generateStringRepresentation(block: Block): string {
    if (!block) return "___";

    const headChild = block.children.find(c => c.id === 'head');
    let headText = block.id;

    if (headChild) {
        if (headChild.type === 'text') {
            headText = headChild.content as string;
        } else if (headChild.type === 'dropdown' && headChild.selected !== undefined) {
            headText = (headChild.content as string[])[headChild.selected];
        }
    }

    const childrenReps = block.children
        .filter(c => !c.hidden && c.id !== 'punctuation' && c.id !== 'head')
        .map(child => {
            if ((child.type === 'placeholder' || child.type === 'attachment') && child.content) {
                return generateStringRepresentation(child.content as Block);
            } else if (child.type === 'placeholder' && !child.content) {
                return "___";
            }
            return "";
        })
        .filter(Boolean);

    const parts = [headText, ...childrenReps];
    return `[${parts.join(' ')}]`;
}

export function createBlockSnapshot(block: Block): BlockSnapshot | null {
    if (!block) return null;

    // Fallback logic for type to ensure it's always a string
    const blockType = (block.words && block.words[0]?.categories[0]?.categoryName) ?
        block.words[0].categories[0].categoryName :
        block.id;

    return {
        id: block.id,
        type: blockType,
        string_rep: generateStringRepresentation(block),
        translation: block.translation || "",
    };
}

export function createBlockSnapshotList(blocks: Block[]): BlockSnapshot[] {
    return blocks.map(createBlockSnapshot).filter((snapshot): snapshot is BlockSnapshot => !!snapshot);
}