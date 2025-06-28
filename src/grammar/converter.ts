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

        // Separate children into placeholders (for arguments) and attachments (for modifiers)
        // FIX: Removed `&& c.content` to preserve the position of empty placeholders.
        const placeholderChildren = block.children.filter(c =>
            c.id !== "head" &&
            !c.hidden &&
            c.type === 'placeholder'
        );

        const attachmentChildren = block.children.filter(c =>
            c.id !== "head" &&
            !c.hidden &&
            c.type === 'attachment' &&
            c.content
        );

        // Populate arguments ONLY from placeholders
        const leftPlaceholders = placeholderChildren.filter(c => block.children.indexOf(c) < headChildIndexInParent);
        const rightPlaceholders = placeholderChildren.filter(c => block.children.indexOf(c) > headChildIndexInParent);

        leftPlaceholders.forEach((p, i) => {
            if (i < expectedLeftCount && p.content) { // Added check for p.content here
                const convertedChild = this.convert(p.content as Block);
                if (convertedChild) {
                    leftArgs[i] = convertedChild;
                }
            }
        });

        rightPlaceholders.forEach((p, i) => {
            if (i < expectedRightCount && p.content) { // Added check for p.content here
                const convertedChild = this.convert(p.content as Block);
                if (convertedChild) {
                    rightArgs[i] = convertedChild;
                }
            }
        });

        // Populate modifiers ONLY from attachments
        const leftAttachments = attachmentChildren.filter(c => block.children.indexOf(c) < headChildIndexInParent);
        const rightAttachments = attachmentChildren.filter(c => block.children.indexOf(c) > headChildIndexInParent);
        
        const leftModifiers = leftAttachments
            .map(c => this.convert(c.content as Block))
            .filter((c): c is SubPhraseInput => c !== undefined);

        const rightModifiers = rightAttachments
            .map(c => this.convert(c.content as Block))
            .filter((c): c is SubPhraseInput => c !== undefined);

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


    formatTranslation(translation: string) {
        // Remove all spaces
        let result = translation.replace(/\s+/g, "");
        // Replace [[UNRESOLVED...]] patterns with '＿'
        result = result.replace(/\[\[UNRESOLVED[^\]]*\]\]/g, "＿");
        return result;
    }
}