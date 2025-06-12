import { Block } from "@/models/block";
import { MissingArgument, Phrase, RecursiveParseElement, SubPhraseInput } from "@/models/grammar-entities";

export class Converter {
    convert(block: Block): SubPhraseInput | undefined {
        if (!block) return;

        const headChild = block.children.find(c => c.id === "head");
        if (!headChild) return;

        const headWordIndex = headChild.type === "dropdown" ? (headChild.selected || 0) : 0;
        const headWord = block.words[headWordIndex];
        if (!headWord) return;

        const headCategory: Phrase | undefined = headWord.categories[0];
        const expectedLeftCount = headCategory?.left?.length || 0;
        const expectedRightCount = headCategory?.right?.length || 0;

        const leftArgs: RecursiveParseElement[] = Array(expectedLeftCount).fill(MissingArgument);
        const rightArgs: RecursiveParseElement[] = Array(expectedRightCount).fill(MissingArgument);

        const headChildIndexInParent = block.children.findIndex(c => c.id === "head");
        const potentialChildren = block.children.filter(c =>
            c.id !== "head" &&
            !c.hidden &&
            (c.type === 'placeholder' || c.type === 'attachment')
        );

        const potentialLeftChildren = potentialChildren
            .filter(c => block.children.indexOf(c) < headChildIndexInParent)
            .map(c => this.convert(c.content as Block))

        const potentialRightChildren = potentialChildren
            .filter(c => block.children.indexOf(c) > headChildIndexInParent)
            .map(c => this.convert(c.content as Block))

        for (let i = 0; i < Math.min(expectedLeftCount, potentialLeftChildren.length); i++) {
            const convertedChild = potentialLeftChildren.shift();
            if (convertedChild !== undefined) {
                leftArgs[i] = convertedChild;
            }
        }
        for (let i = 0; i < Math.min(expectedRightCount, potentialRightChildren.length); i++) {
            const convertedChild = potentialRightChildren.shift();
            if (convertedChild !== undefined) {
                rightArgs[i] = convertedChild;
            }
        }

        const leftModifiers = potentialLeftChildren.filter(c => c !== undefined);
        const rightModifiers = potentialRightChildren.filter(c => c !== undefined);

        const elements: RecursiveParseElement[] = [
            ...leftModifiers,
            ...leftArgs,
            headWord,
            ...rightArgs,
            ...rightModifiers
        ];

        const finalHeadIndex = leftModifiers.length + leftArgs.length;

        return {
            elements: elements,
            headIndex: finalHeadIndex,
            phraseName: block.id,
        };
    }
}