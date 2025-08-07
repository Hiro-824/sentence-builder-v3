import { Block } from "@/models/block";

export interface BlockSnapshot {
    id: string;
    string_rep: string;
    translation: string;
}

function generateStringRepresentation(block: Block): string {
    if (!block) return "___";

    const parts = block.children
        .filter(child => !child.hidden)
        .map(child => {
            if (child.id === 'head') {
                if (child.type === 'text') {
                    return child.content as string;
                }
                if (child.type === 'dropdown' && child.selected !== undefined) {
                    return (child.content as string[])[child.selected];
                }
                return block.id;
            }

            if (child.type === 'placeholder' || child.type === 'attachment') {
                if (child.content) {
                    return generateStringRepresentation(child.content as Block);
                }
                if (child.type === 'placeholder') {
                    return "___";
                }
            }

            return null;
        })
        .filter(Boolean);

    return `[${parts.join(' ')}]`;
}

export function createBlockSnapshot(block: Block): BlockSnapshot | null {
    if (!block) return null;

    return {
        id: block.id,
        string_rep: generateStringRepresentation(block),
        translation: block.translation || "",
    };
}

export function createBlockSnapshotList(blocks: Block[]): BlockSnapshot[] {
    return blocks.map(createBlockSnapshot).filter((snapshot): snapshot is BlockSnapshot => !!snapshot);
}