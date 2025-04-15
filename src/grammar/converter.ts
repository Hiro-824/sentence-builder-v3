import { Block, BlockChild } from "./block";
import { Constituent } from "./category";

export class Converter {
    convertBlockIntoConstituent(block: Block): Constituent {
        const headIndex = block.children.findIndex(child => child.id === "head");
        const headChild = block.children[headIndex];
        // Helper function that converts a child if its content is a Block; otherwise returns null.
        const convertIfBlock = (child: BlockChild): Constituent | null =>
            this.isBlock(child.content) ? this.convertBlockIntoConstituent(child.content) : null;
        const specifierChildren = block.children.filter(child => child.id.includes("specifier"));
        const complementChildren = block.children.filter(child => child.id.includes("complement"));
        const preAdjunctChildren = block.children.slice(0, headIndex).filter(child => child.type === "attachment");
        const postAdjunctChildren = block.children.slice(headIndex + 1).filter(child => child.type === "attachment");

        const head =
            headChild.type === "dropdown" && headChild.selected !== undefined
                ? block.lexicons[headChild.selected]
                : block.lexicons[0];

        const specifiers = specifierChildren.map(convertIfBlock);
        const complements = complementChildren.map(convertIfBlock);
        const preAdjuncts = preAdjunctChildren.map(convertIfBlock).filter((child): child is Constituent => child !== null);
        const postAdjuncts = postAdjunctChildren.map(convertIfBlock).filter((child): child is Constituent => child !== null);

        return {
            head,
            specifiers,
            complements,
            preAdjuncts,
            postAdjuncts
        };
    }

    isBlock(value: unknown): value is Block {
        if (typeof value !== "object" || value === null) {
            return false;
        }

        // Use a type assertion to access properties safely.
        const block = value as Partial<Block>;

        return (
            typeof block.id === "string" &&
            Array.isArray(block.lexicons) &&
            typeof block.x === "number" &&
            typeof block.y === "number" &&
            typeof block.color === "string" &&
            Array.isArray(block.children)
        );
    }
}