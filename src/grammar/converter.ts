import { Block } from "@/models/block";
import { FeatureStructure, MissingArgument, Phrase, RecursiveParseElement, SubPhraseInput, Word } from "@/models/grammar-entities";
import { Grammar } from "./grammar";

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

        const leftArgs: (Word | SubPhraseInput)[] = Array(expectedLeftCount);
        const rightArgs: (Word | SubPhraseInput)[] = Array(expectedRightCount);

        leftArgs.fill({ token: "DEFAULT_UNFILLED", categories: [] });
        rightArgs.fill({ token: "DEFAULT_UNFILLED", categories: [] });
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
            if (i < expectedLeftCount) {
                if (p.content) {
                    const convertedChild = this.convert(p.content as Block);
                    if (convertedChild) {
                        leftArgs[i] = convertedChild;
                    }
                } else {
                    // Create a proper Word object for the gap.
                    leftArgs[i] = {
                        token: MissingArgument.token,
                        categories: [], // Must have categories to be a Word
                        instanceId: p.instanceId
                    };
                }
            }
        });
        for (let i = 0; i < leftArgs.length; i++) {
            if ((leftArgs[i] as Word).token === 'DEFAULT_UNFILLED') {
                leftArgs[i] = { token: MissingArgument.token, categories: [] };
            }
        }

        rightPlaceholders.forEach((p, i) => {
            if (i < expectedRightCount) {
                if (p.content) {
                    const convertedChild = this.convert(p.content as Block);
                    if (convertedChild) {
                        rightArgs[i] = convertedChild;
                    }
                } else {
                    rightArgs[i] = {
                        token: MissingArgument.token,
                        categories: [],
                        instanceId: p.instanceId
                    };
                }
            }
        });
        for (let i = 0; i < rightArgs.length; i++) {
            if ((rightArgs[i] as Word).token === 'DEFAULT_UNFILLED') {
                rightArgs[i] = { token: MissingArgument.token, categories: [] };
            }
        }

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
            ...(leftArgs.filter(arg => (arg as Word).token !== 'DEFAULT_UNFILLED')),
            headWord,
            ...(rightArgs.filter(arg => (arg as Word).token !== 'DEFAULT_UNFILLED')),
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

    private isProperNounBlock(block: Block): boolean {
        const headChild = block.children.find(c => c.id === 'head');
        if (!headChild) return false;

        const wordIndex = headChild.type === 'dropdown' ? (headChild.selected ?? 0) : 0;
        const word = block.words[wordIndex];
        if (!word?.categories) return false;

        // Check if any category has the proper noun feature structure.
        return word.categories.some(cat => {
            const headType = cat?.head?.type;
            // The `type` feature is an object for proper nouns, e.g., { type: "nominal", isProper: true }
            return typeof headType === 'object' && headType !== null && (headType as FeatureStructure).isProper === true;
        });
    }

    private generateInstanceId(): string {
        return "inst_" + crypto.randomUUID().replaceAll(/-/g, '');
    }

    private hideResolvedGapPlaceholders(block: Block): void {
        if (!block) return;

        // 1. Convert the block structure to grammar input.
        const phraseInput = this.convert(block);
        if (!phraseInput) return;

        // 2. Parse the input to get linguistic data.
        // We instantiate Grammar here to keep it self-contained.
        const grammar = new Grammar(); 
        const parseResult = grammar.parseNestedPhrase(phraseInput);
        
        // 3. Extract the resolved gap IDs.
        if (!parseResult || parseResult.categories.length === 0) return;
        
        const firstParse = parseResult.categories[0];
        const resolvedGapIds = firstParse.resolvedGapIds;
        
        if (!resolvedGapIds || resolvedGapIds.length === 0) return;

        // 4. Traverse the block and hide placeholders with matching IDs.
        // This function modifies the block object passed to it by reference.
        const findAndHide = (current: Block) => {
            if (!current.children) return;

            for (const child of current.children) {
                if (child.type === 'placeholder' && child.instanceId && resolvedGapIds.includes(child.instanceId)) {
                    child.hidden = true;
                }
                
                // Recurse into children's content, even if the parent placeholder is now hidden.
                // This is important for deeply nested structures.
                if (child.content) {
                     findAndHide(child.content as Block);
                }
            }
        };

        findAndHide(block);
    }

    formatBlock(block: Block): Block {
        if (!block) {
            return block;
        }

        const newBlock = structuredClone(block);

        const assignIds = (current: Block) => {
            if (!current.children) return;
            for (const child of current.children) {
                if ((child.type === 'placeholder' || child.type === 'attachment')) {
                    if (!child.instanceId) {
                        child.instanceId = this.generateInstanceId();
                    }
                    if (child.content) {
                        assignIds(child.content as Block);
                    }
                }
            }
        };
        assignIds(newBlock);

        const headChild = newBlock.children.find(c => c.id === 'head');
        const wordIndex = headChild?.type === 'dropdown' ? (headChild.selected ?? 0) : 0;
        const selectedWord = newBlock.words?.[wordIndex];
        const activeCategory = selectedWord?.categories?.[0];

        const isFinite = activeCategory?.head?.type === 'sentence' && activeCategory.head.finite === true;
        const isQuestion = activeCategory?.head?.type === 'sentence' && activeCategory.head.question === true;

        // Determine the condition for capitalization. By default, it's true for finite sentences.
        let shouldCapitalize = isFinite;

        // However, find the first *visible* child in the block's linear order.
        const firstVisibleChild = newBlock.children.find(child => !child.hidden);

        // If the first visible child is an empty placeholder, suppress initial capitalization.
        if (firstVisibleChild && firstVisibleChild.type === 'placeholder' && !firstVisibleChild.content) {
            shouldCapitalize = false;
        }

        let firstLetterCapitalized = false;

        const processString = (input: string): string => {
            if (typeof input !== 'string' || input === '') return input;

            let processed = input.trim().replace(/[.?]$/, "").trim();
            processed = processed.split(' ').map(word => word.toLowerCase() === 'i' ? 'I' : word.toLowerCase()).join(' ');

            // Use the new, more intelligent flag to control capitalization.
            if (shouldCapitalize && !firstLetterCapitalized && processed.length > 0) {
                processed = processed.charAt(0).toUpperCase() + processed.slice(1);
                firstLetterCapitalized = true;
            }
            return processed;
        };

        const traverseAndFormat = (currentBlock: Block) => {
            if (this.isProperNounBlock(currentBlock)) {
                return;
            }

            for (const child of currentBlock.children) {
                if (child.hidden) continue;

                switch (child.type) {
                    case "text":
                        child.content = processString(child.content as string);
                        break;
                    case "dropdown":
                        if (Array.isArray(child.content) && typeof child.selected === 'number') {
                            const selectedIndex = child.selected;
                            if (child.content[selectedIndex]) {
                                child.content[selectedIndex] = processString(child.content[selectedIndex]);
                            }
                        }
                        break;
                    case "placeholder":
                    case "attachment":
                        if (child.content && typeof child.content === 'object') {
                            traverseAndFormat(child.content as Block);
                        }
                        break;
                }
            }
        };

        traverseAndFormat(newBlock);

        this.hideResolvedGapPlaceholders(newBlock);

        // Punctuation is still added based on the grammatical `isFinite` property,
        // which is the correct behavior.
        if (isFinite) {
            newBlock.isRound = false;

            newBlock.children = newBlock.children.filter(child => child.id !== 'punctuation');

            newBlock.children.push({
                id: 'punctuation',
                type: 'text',
                content: isQuestion ? '?' : '.',
                hidden: false,
            });
        } else {
            newBlock.isRound = true;
        }

        return newBlock;
    }
}