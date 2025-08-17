import { Block, BlockChild } from "@/models/block";
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
                    leftArgs[i] = {
                        token: MissingArgument.token,
                        categories: [],
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
        let result = translation.replace(/\s+/g, "");
        result = result.replace(/\[\[UNRESOLVED[^\]]*\]\]/g, "＿");
        return result;
    }

    private isProperNounBlock(block: Block): boolean {
        const headChild = block.children.find(c => c.id === 'head');
        if (!headChild) return false;

        const wordIndex = headChild.type === 'dropdown' ? (headChild.selected ?? 0) : 0;
        const word = block.words[wordIndex];
        if (!word?.categories) return false;

        return word.categories.some(cat => {
            const headType = cat?.head?.type;
            return typeof headType === 'object' && headType !== null && (headType as FeatureStructure).isProper === true;
        });
    }

    private generateInstanceId(): string {
        return "inst_" + crypto.randomUUID().replaceAll(/-/g, '');
    }

    private hideResolvedGapPlaceholders(block: Block): void {
        if (!block) return;
        const phraseInput = this.convert(block);
        if (!phraseInput) return;
        const grammar = new Grammar();
        const parseResult = grammar.parseNestedPhrase(phraseInput);
        if (!parseResult || parseResult.categories.length === 0) return;
        const firstParse = parseResult.categories[0];
        const resolvedGapIds = firstParse.resolvedGapIds;
        if (!resolvedGapIds || resolvedGapIds.length === 0) return;

        const findAndHide = (current: Block) => {
            if (!current.children) return;
            for (const child of current.children) {
                if (child.type === 'placeholder' && child.instanceId && resolvedGapIds.includes(child.instanceId)) {
                    child.resolved = true;
                }
                if (child.content) {
                    findAndHide(child.content as Block);
                }
            }
        };
        findAndHide(block);
    }

    private unhideAll(block: Block): void {
        if (!block.children) return;
        for (const child of block.children) {
            child.hidden = false;
            child.resolved = false;
            if (child.content && typeof child.content === 'object' && 'children' in child.content) {
                const contentBlock = child.content as Block;
                if (contentBlock.children) {
                    for (const grandChild of contentBlock.children) {
                        grandChild.hidden = false;
                        grandChild.resolved = false;
                    }
                }
            }
        }
    }

    private updateChildVisibilityForBlock(block: Block): void {
        const headChild = block.children.find(child => child.id === "head" && (child.type === "text" || child.type === "dropdown"));
        if (!headChild) return;
        const selectedHeadIndex = headChild.type === "dropdown" ? (headChild.selected ?? 0) : 0;
        block.children.forEach(child => {
            if (child.id !== "head" && child.headIndex !== undefined) {
                child.hidden = !child.headIndex.includes(selectedHeadIndex);
            }
        });
    }

    private applyHeadIndexVisibility(block: Block): void {
        if (!block.children) return;
        this.updateChildVisibilityForBlock(block);
        for (const child of block.children) {
            if (child.content && typeof child.content === 'object' && 'children' in child.content) {
                this.applyHeadIndexVisibility(child.content as Block);
            }
        }
    }

    private _cleanBlockText(block: Block): void {
        if (this.isProperNounBlock(block)) {
            return;
        }

        const basicProcess = (input: string): string => {
            if (typeof input !== 'string' || input === '') return input;
            const processed = input.trim().replace(/[.?]$/, "").trim();
            return processed.split(' ').map(word => word.toLowerCase() === 'i' ? 'I' : word.toLowerCase()).join(' ');
        };

        for (const child of block.children) {
            if (child.hidden) continue;

            switch (child.type) {
                case "text":
                    child.content = basicProcess(child.content as string);
                    break;
                case "dropdown":
                    if (Array.isArray(child.content)) {
                        child.content = child.content.map(option => basicProcess(option));
                    }
                    break;
                case "placeholder":
                case "attachment":
                    if (child.content && typeof child.content === 'object') {
                        this._cleanBlockText(child.content as Block);
                    }
                    break;
            }
        }
    }

    private applyPunctuationAndCapitalization(block: Block): void {
        const headChild = block.children.find(c => c.id === 'head');
        const wordIndex = headChild?.type === 'dropdown' ? (headChild.selected ?? 0) : 0;
        const selectedWord = block.words?.[wordIndex];
        const activeCategory = selectedWord?.categories?.[0];

        const isFinite = activeCategory?.head?.type === 'sentence' && activeCategory.head.finite === true;
        const isQuestion = activeCategory?.head?.type === 'sentence' && activeCategory.head.question === true;

        let shouldCapitalize = isFinite;
        const firstVisibleChild = block.children.find(child => !child.hidden);
        if (firstVisibleChild && firstVisibleChild.type === 'placeholder' && !firstVisibleChild.content) {
            shouldCapitalize = false;
        }

        if (shouldCapitalize) {
            const flatList: BlockChild[] = [];
            const _flattenVisibleChildren = (currentBlock: Block) => {
                if (this.isProperNounBlock(currentBlock)) {
                    const head = currentBlock.children.find(c => c.id === 'head');
                    if (head) flatList.push(head);
                    return;
                }
                for (const child of currentBlock.children) {
                    if (child.hidden) continue;
                    if (child.type === "text" || child.type === "dropdown") {
                        flatList.push(child);
                    } else if (child.content && typeof child.content === 'object') {
                        _flattenVisibleChildren(child.content as Block);
                    }
                }
            };
            _flattenVisibleChildren(block);

            const firstElement = flatList[0];
            if (firstElement) {
                const content = firstElement.content;
                if (typeof content === 'string' && content.length > 0) {
                    firstElement.content = content.charAt(0).toUpperCase() + content.slice(1);
                } else if (Array.isArray(content)) {
                    firstElement.content = content.map((option: string) => {
                        if (option.length > 0) return option.charAt(0).toUpperCase() + option.slice(1);
                        return option;
                    });
                }
            }
        }

        if (isFinite) {
            block.isRound = false;
            block.children = block.children.filter(child => child.id !== 'punctuation');
            block.children.push({
                id: 'punctuation',
                type: 'text',
                content: isQuestion ? '?' : '.',
                hidden: false,
            });
        } else {
            block.isRound = true;
        }
    }

    formatBlock(block: Block): Block {
        if (!block) {
            return block;
        }
    
        const newBlock = structuredClone(block);
    
        // Recursively format any nested blocks first (bottom-up approach).
        if (newBlock.children) {
            for (const child of newBlock.children) {
                if (child.content && typeof child.content === 'object' && 'children' in child.content) {
                    child.content = this.formatBlock(child.content as Block);
                }
            }
        }
    
        // 1. Reset visibility and assign unique instance IDs for tracking.
        this.unhideAll(newBlock);
        const assignIds = (current: Block) => {
            if (!current.children) return;
            for (const child of current.children) {
                if ((child.type === 'placeholder' || child.type === 'attachment')) {
                    if (!child.instanceId) child.instanceId = this.generateInstanceId();
                    if (child.content) assignIds(child.content as Block);
                }
            }
        };
        assignIds(newBlock);
    
        // 2. Apply visibility rules based on dropdown selections.
        this.applyHeadIndexVisibility(newBlock);
    
        // 3. Perform basic, word-level text cleaning.
        this._cleanBlockText(newBlock);
    
        // 4. Hide placeholders that have been linguistically filled by gaps.
        this.hideResolvedGapPlaceholders(newBlock);
    
        // 5. Apply sentence-level formatting (capitalization and punctuation).
        this.applyPunctuationAndCapitalization(newBlock);
    
        return newBlock;
    }
}