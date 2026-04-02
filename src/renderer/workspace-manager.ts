import { Converter } from "@/grammar/converter";
import { Grammar } from "@/grammar/grammar";
import type { Block, BlockChild, BlockShape } from "@/models/block";
import {
    calculateBlockHeight,
    calculateBlockWidth,
    calculateDropdownWidth,
    calculateTextHeightAndWidth,
    getBlockHorizontalInset,
} from "@/renderer/block-renderer-utils";
import type {
    AttachmentSide,
    BlockAttachmentViewModel,
    BlockChildViewModel,
    BlockDropdownViewModel,
    BlockPlaceholderViewModel,
    BlockTextViewModel,
    BlockViewModel,
} from "@/renderer/view-models";
import { horizontalPadding, placeholderWidth, resolvedGapRadius } from "./const";

export type BlockListGroups = Record<string, Block[]>;
export type BlockListSource = Block[] | BlockListGroups;

export interface BlockSearchResult {
    foundBlock: Block | null;
    parentBlock: Block | null;
    childIndex: number;
    absoluteX: number;
    absoluteY: number;
    rootParent: Block | null;
}

interface WorkspaceManagerOptions {
    blocks?: Block[];
    enableGrammarLogging?: boolean;
}

export class WorkspaceManager {
    private readonly converter: Converter;
    private readonly grammar: Grammar;
    private managedBlocks: Block[];

    constructor(options: WorkspaceManagerOptions = {}) {
        this.converter = new Converter();
        this.grammar = new Grammar(options.enableGrammarLogging ?? false);
        this.managedBlocks = Array.isArray(options.blocks) ? options.blocks : [];
    }

    get blocks(): Block[] {
        return this.managedBlocks;
    }

    set blocks(nextBlocks: Block[]) {
        this.managedBlocks = Array.isArray(nextBlocks) ? nextBlocks : [];
    }

    generateRandomId(): string {
        return "b" + crypto.randomUUID().replaceAll(/-/g, "");
    }

    formatManagedBlocks(): Block[] {
        this.managedBlocks = this.managedBlocks
            .map((block) => this.formatBlock(block))
            .filter((block): block is Block => !!block);
        return this.managedBlocks;
    }

    formatBlockList(source?: BlockListSource | null): BlockListGroups {
        const formatted: BlockListGroups = {};
        if (!source) {
            return formatted;
        }

        if (Array.isArray(source)) {
            formatted[""] = source
                .map((block) => this.formatBlock(block))
                .filter((block): block is Block => !!block);
            return formatted;
        }

        Object.entries(source).forEach(([groupName, blocks]) => {
            formatted[groupName] = Array.isArray(blocks)
                ? blocks
                    .map((block) => this.formatBlock(block))
                    .filter((block): block is Block => !!block)
                : [];
        });

        return formatted;
    }

    cloneBlockList(source?: BlockListGroups | null): BlockListGroups {
        const clone: BlockListGroups = {};
        Object.entries(source ?? {}).forEach(([groupName, blocks]) => {
            clone[groupName] = Array.isArray(blocks) ? blocks.slice() : [];
        });
        return clone;
    }

    buildBlockListViewModels(source?: BlockListGroups | null): Record<string, BlockViewModel[]> {
        const viewModels: Record<string, BlockViewModel[]> = {};
        Object.entries(source ?? {}).forEach(([groupName, blocks]) => {
            viewModels[groupName] = this.buildViewModels(blocks);
        });
        return viewModels;
    }

    createBlockInstance(template: Block | null | undefined): Block | null {
        if (!template) return null;

        const clone = structuredClone(template);
        this.resetBlockInstance(clone, true);
        return clone;
    }

    findBlock(id: string): BlockSearchResult {
        let foundBlock: Block | null = null;
        let parentBlock: Block | null = null;
        let childIndex = -1;
        let absoluteX = 0;
        let absoluteY = 0;
        let rootParent: Block | null = null;

        const searchRecursively = (
            blocks: Block[],
            offsetX = 0,
            offsetY = 0,
            candidateRoot: Block | null = null
        ): boolean => {
            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i];
                const currentRoot = candidateRoot === null ? block : candidateRoot;

                if (block.id === id) {
                    foundBlock = block;
                    rootParent = currentRoot;
                    absoluteX = offsetX + block.x;
                    absoluteY = offsetY + block.y;
                    return true;
                }

                if (!Array.isArray(block.children)) {
                    continue;
                }

                for (let j = 0; j < block.children.length; j++) {
                    const child = block.children[j];
                    if (child.type !== "placeholder" && child.type !== "attachment") {
                        continue;
                    }

                    const content = this.getChildBlockContent(child);
                    if (!content) {
                        continue;
                    }

                    const layout = this.getChildContentLayout(block, j);
                    const childX = layout?.x ?? 0;
                    const childY = layout?.y ?? 0;

                    if (content.id === id) {
                        foundBlock = content;
                        parentBlock = block;
                        childIndex = j;
                        rootParent = currentRoot;
                        absoluteX = offsetX + block.x + childX;
                        absoluteY = offsetY + block.y + childY;
                        return true;
                    }

                    if (
                        searchRecursively(
                            [content],
                            offsetX + block.x + childX,
                            offsetY + block.y + childY,
                            currentRoot
                        )
                    ) {
                        return true;
                    }
                }
            }

            return false;
        };

        searchRecursively(this.managedBlocks, 0, 0, null);

        return {
            foundBlock,
            parentBlock,
            childIndex,
            absoluteX,
            absoluteY,
            rootParent,
        };
    }

    findBlockInTree(block: Block | null | undefined, targetId: string): Block | null {
        if (!block) return null;
        if (block.id === targetId) return block;
        if (!Array.isArray(block.children)) return null;

        for (const child of block.children) {
            if (child.type !== "placeholder" && child.type !== "attachment") {
                continue;
            }

            const content = this.getChildBlockContent(child);
            if (!content) continue;

            const found = this.findBlockInTree(content, targetId);
            if (found) return found;
        }

        return null;
    }

    previewInsertion(id: string, targetParentId: string, index: number): Block | undefined {
        const foundResult = this.findBlock(id);
        if (!foundResult.foundBlock) return undefined;

        const targetParentResult = this.findBlock(targetParentId);
        const targetParent = targetParentResult.foundBlock;

        if (
            !targetParent ||
            !targetParent.children[index] ||
            targetParent.children[index].type !== "placeholder"
        ) {
            console.error(
                `previewInsertion: Invalid target at index ${index}. Child is:`,
                targetParent?.children[index]
            );
            return undefined;
        }

        const expectedParent = structuredClone(targetParentResult.rootParent);
        if (!expectedParent) return undefined;

        const updateParentInCopy = (block: Block): boolean => {
            if (block.id === targetParent.id) {
                block.children[index].content = foundResult.foundBlock;
                return true;
            }

            for (const child of block.children ?? []) {
                if (child.type !== "placeholder" && child.type !== "attachment") {
                    continue;
                }

                const content = this.getChildBlockContent(child);
                if (content && updateParentInCopy(content)) {
                    return true;
                }
            }

            return false;
        };

        updateParentInCopy(expectedParent);
        return expectedParent;
    }

    previewAttachment(
        id: string,
        targetParentId: string,
        side: AttachmentSide
    ): Block | undefined {
        const foundResult = this.findBlock(id);
        if (!foundResult.foundBlock) return undefined;

        const targetParentResult = this.findBlock(targetParentId);
        const targetParent = targetParentResult.foundBlock;
        if (!targetParent) return undefined;

        const attachmentChild = {
            id: "attachment",
            type: "attachment",
            side,
            content: foundResult.foundBlock,
        } as BlockChild & { side: AttachmentSide };

        const expectedParent = structuredClone(targetParentResult.rootParent);
        if (!expectedParent) return undefined;

        const updateParentInCopy = (block: Block): boolean => {
            if (block.id === targetParent.id) {
                if (side === "left") {
                    block.children.unshift(attachmentChild);
                } else {
                    block.children.push(attachmentChild);
                }
                return true;
            }

            for (const child of block.children ?? []) {
                if (child.hidden || child.resolved) continue;
                if (child.type !== "placeholder" && child.type !== "attachment") {
                    continue;
                }

                const content = this.getChildBlockContent(child);
                if (content && updateParentInCopy(content)) {
                    return true;
                }
            }

            return false;
        };

        updateParentInCopy(expectedParent);
        return expectedParent;
    }

    removeBlock(id: string): void {
        const foundResult = this.findBlock(id);
        if (!foundResult.foundBlock) return;

        if (foundResult.parentBlock) {
            this.removeBlockFromParent(foundResult.parentBlock, foundResult.childIndex);
        } else {
            this.removeBlockFromTopLevel(id);
        }
    }

    moveBlock(blockId: string, x: number, y: number): Block | null {
        const { foundBlock } = this.findBlock(blockId);
        if (!foundBlock) return null;
        foundBlock.x = x;
        foundBlock.y = y;
        return foundBlock;
    }

    moveBlockToTopLevel(blockId: string, hop = false): Block | null {
        const foundResult = this.findBlock(blockId);
        if (!foundResult.foundBlock) return null;
        if (!foundResult.parentBlock) return foundResult.foundBlock;

        const block = foundResult.foundBlock;
        block.x = foundResult.absoluteX;
        block.y = foundResult.absoluteY;
        if (hop) {
            block.x += 16;
            block.y += 16;
        }

        this.removeBlock(blockId);
        this.managedBlocks.push(block);
        return block;
    }

    updateBlockInData(newBlock: Block): void {
        const foundResult = this.findBlock(newBlock.id);
        if (!foundResult.foundBlock) return;

        if (foundResult.parentBlock) {
            foundResult.parentBlock.children[foundResult.childIndex].content = newBlock;
            return;
        }

        const blockIndex = this.managedBlocks.findIndex((block) => block.id === newBlock.id);
        if (blockIndex !== -1) {
            this.managedBlocks[blockIndex] = newBlock;
        }
    }

    deleteBlockById(blockId: string): Block | null {
        const { foundBlock } = this.findBlock(blockId);
        if (!foundBlock) return null;
        this.removeBlock(blockId);
        return foundBlock;
    }

    insertBlockIntoPlaceholder(
        draggedId: string,
        targetParentId: string,
        index: number
    ): Block | null {
        const updatedParent = this.previewInsertion(draggedId, targetParentId, index);
        if (!updatedParent) {
            return null;
        }

        this.removeBlock(draggedId);
        this.updateBlockInData(updatedParent);
        this.updateBlockTranslation(updatedParent);
        return updatedParent;
    }

    attachBlockToBlock(
        draggedId: string,
        targetParentId: string,
        side: AttachmentSide
    ): Block | null {
        const updatedParent = this.previewAttachment(draggedId, targetParentId, side);
        if (!updatedParent) {
            return null;
        }

        this.removeBlock(draggedId);
        this.updateBlockInData(updatedParent);
        this.updateBlockTranslation(updatedParent);
        return updatedParent;
    }

    applyDropdownSelection(
        blockId: string,
        dropdownChildId: string,
        newSelected: number
    ): { updatedRoot: Block | null; movedBlockId: string | null } {
        const rootInfo = this.findBlock(blockId);
        const rootParent = rootInfo.rootParent;
        if (!rootParent) {
            return { updatedRoot: null, movedBlockId: null };
        }

        const targetBlock = this.findBlock(blockId).foundBlock;
        const dropdownChild = targetBlock?.children.find(
            (child) => child.id === dropdownChildId && child.type === "dropdown"
        );
        if (!dropdownChild || dropdownChild.type !== "dropdown") {
            return { updatedRoot: null, movedBlockId: null };
        }

        const prevSelected = dropdownChild.selected ?? 0;
        const { formattedRoot, formattedTargetBlock } = this.prepareFormattedBlocksForSelection(
            rootParent,
            blockId,
            dropdownChildId,
            newSelected
        );
        const isBlockValid = formattedTargetBlock ? this.validate(formattedTargetBlock) : false;
        const isParentValid = formattedRoot ? this.validate(formattedRoot) : false;

        if (!isBlockValid) {
            dropdownChild.selected = prevSelected;
            return { updatedRoot: null, movedBlockId: null };
        }

        dropdownChild.selected = newSelected;
        const formattedBlock = this.formatBlock(blockId);

        if (!isParentValid) {
            this.moveBlockToTopLevel(blockId, true);
            const movedBlock = this.findBlock(blockId).foundBlock;
            if (movedBlock) {
                this.updateBlockTranslation(movedBlock);
            }
            return { updatedRoot: movedBlock ?? formattedBlock, movedBlockId: blockId };
        }

        return { updatedRoot: formattedBlock, movedBlockId: null };
    }

    updateEditableText(blockId: string, childId: string, newText: string): Block | null {
        const targetBlock = this.findBlock(blockId).foundBlock;
        if (!targetBlock?.children) return null;

        const targetChild = targetBlock.children.find((child) => child.id === childId);
        if (targetChild) {
            targetChild.content = newText;
        }

        const headChild = targetBlock.children.find(
            (child) => child.id === "head" && (child.type === "dropdown" || child.type === "text")
        );
        const headIndex = headChild?.type === "dropdown" ? (headChild.selected ?? 0) : 0;
        const headWord = Array.isArray(targetBlock.words) ? targetBlock.words[headIndex] : undefined;
        if (headWord) {
            headWord.token = newText;
            if (Array.isArray(headWord.categories)) {
                headWord.categories = headWord.categories.map((category) => ({
                    ...category,
                    translationTemplates: {
                        ...(category.translationTemplates ?? {}),
                        default: [newText],
                    },
                }));
            }
        }

        const rootParent = this.findBlock(blockId).rootParent;
        if (!rootParent) return targetBlock;
        this.updateBlockTranslation(rootParent);
        return rootParent;
    }

    formatBlock(idOrBlock: string | Block): Block | null {
        if (typeof idOrBlock !== "string") {
            return this.converter.formatBlock(idOrBlock);
        }

        const block = this.findBlock(idOrBlock).rootParent;
        if (!block) return null;
        const originalHiddenStates = block.children.map((child) => child.hidden);
        const targetStateBlock = this.converter.formatBlock(block);
        targetStateBlock.children.forEach((child, index) => {
            const wasVisible = !originalHiddenStates[index];
            const isNowHidden = child.hidden;
            const originalChild = block.children.find((candidate) => candidate.id === child.id);

            if (wasVisible && isNowHidden && originalChild?.content) {
                this.moveBlockToTopLevel((originalChild.content as Block).id, true);
            }
        });

        const finalNewBlock = this.converter.formatBlock(block);
        this.updateBlockInData(finalNewBlock);
        this.updateBlockTranslation(finalNewBlock);
        return finalNewBlock;
    }

    prepareFormattedBlocksForSelection(
        rootBlock: Block | null | undefined,
        targetBlockId: string,
        dropdownChildId: string,
        newSelected: number
    ): { formattedRoot: Block | null; formattedTargetBlock: Block | null } {
        if (!rootBlock) {
            return { formattedRoot: null, formattedTargetBlock: null };
        }

        const clonedRoot = structuredClone(rootBlock);
        const targetBlock = this.findBlockInTree(clonedRoot, targetBlockId);
        if (!targetBlock) {
            return { formattedRoot: null, formattedTargetBlock: null };
        }

        const dropdownChild = targetBlock.children.find(
            (child) => child.id === dropdownChildId && child.type === "dropdown"
        );
        if (dropdownChild && dropdownChild.type === "dropdown") {
            dropdownChild.selected = newSelected;
        }

        const formattedRoot = this.formatBlock(clonedRoot);
        const formattedTargetBlock = this.findBlockInTree(formattedRoot, targetBlockId);
        return { formattedRoot, formattedTargetBlock };
    }

    validate(block: Block | null | undefined): boolean {
        if (!block) return false;

        const phraseInput = this.converter.convert(block);
        console.log("block:", block);
        console.log("converted:", phraseInput);
        if (!phraseInput) return false;

        const validationResult = this.grammar.parseNestedPhrase(phraseInput);
        console.log("validated:", validationResult);
        return validationResult.categories.length > 0;
    }

    updateBlockTranslation(block: Block | null | undefined): void {
        if (!block) return;

        for (const child of block.children ?? []) {
            if (child.type !== "placeholder" && child.type !== "attachment") {
                continue;
            }

            const content = this.getChildBlockContent(child);
            if (content) {
                this.updateBlockTranslation(content);
            }
        }

        const phraseInput = this.converter.convert(block);
        if (!phraseInput) {
            block.translation = "";
            return;
        }

        const result = this.grammar.parseNestedPhrase(phraseInput);
        if (!result || !result.categories || result.categories.length === 0) {
            block.translation = "";
            return;
        }

        const translationObject = result.categories[0].translation;
        if (!translationObject || typeof translationObject !== "object") {
            block.translation = "";
            return;
        }

        const firstKey = Object.keys(translationObject)[0];
        const rawTranslation = translationObject[firstKey];
        block.translation = this.converter.formatTranslation(
            typeof rawTranslation === "string" ? rawTranslation : String(rawTranslation ?? "")
        );
    }

    buildViewModels(blocks: Block[] = this.managedBlocks): BlockViewModel[] {
        return blocks.map((block) => {
            const formattedBlock = this.formatBlock(structuredClone(block));
            if (!formattedBlock) return null;
            this.updateBlockTranslation(formattedBlock);
            return this.buildBlockViewModel(formattedBlock);
        }).filter((block): block is BlockViewModel => !!block);
    }

    isFiniteSentence(block: Block | null | undefined): boolean {
        if (!block || !Array.isArray(block.children) || !Array.isArray(block.words) || block.words.length === 0) {
            return false;
        }

        const headChild = block.children.find((child) => child.id === "head");
        if (!headChild) return false;

        const headIndex = headChild.type === "dropdown" ? (headChild.selected ?? 0) : 0;
        const headWord = block.words[headIndex];
        const headCategory = headWord?.categories?.[0];
        const isSentence = headCategory?.head?.type === "sentence";
        const isFinite = isSentence && headCategory.head.finite === true;
        return Boolean(isFinite);
    }

    isBlockComplete(block: Block | null | undefined): boolean {
        if (!block || !Array.isArray(block.children)) return true;

        const hasUnfilled = block.children.some((child) => {
            if (child.hidden) return false;

            if (child.type === "placeholder" && !child.content && !child.resolved) {
                return true;
            }

            if (child.type === "placeholder" || child.type === "attachment") {
                const content = this.getChildBlockContent(child);
                if (content) {
                    return !this.isBlockComplete(content);
                }
            }

            return false;
        });

        return !hasUnfilled;
    }

    private buildBlockViewModel(block: Block): BlockViewModel {
        return {
            id: block.id,
            x: block.x ?? 0,
            y: block.y ?? 0,
            color: block.color,
            shape: this.resolveBlockShape(block),
            draggable: block.undraggable !== true,
            translation: block.translation,
            showSendButton: this.isFiniteSentence(block),
            sendButtonDisabled: !this.isBlockComplete(block),
            children: block.children.map((child, index) => this.buildChildViewModel(child, index)),
            controls: [],
            metadata: {
                tags: Array.isArray(block.tags) ? [...block.tags] : undefined,
                isFiniteSentence: this.isFiniteSentence(block),
                isComplete: this.isBlockComplete(block),
            },
        };
    }

    private buildChildViewModel(child: BlockChild, index: number): BlockChildViewModel {
        switch (child.type) {
            case "text":
                return {
                    id: child.id,
                    kind: "text",
                    hidden: child.hidden,
                    text: typeof child.content === "string" ? child.content : "",
                    editable: child.editable,
                } satisfies BlockTextViewModel;
            case "dropdown":
                return {
                    id: child.id,
                    kind: "dropdown",
                    hidden: child.hidden,
                    options: Array.isArray(child.content)
                        ? child.content.filter((option): option is string => typeof option === "string")
                        : [],
                    selectedIndex: child.selected ?? 0,
                } satisfies BlockDropdownViewModel;
            case "placeholder":
                return {
                    id: child.id,
                    kind: "placeholder",
                    hidden: child.hidden,
                    slotIndex: index,
                    resolved: child.resolved,
                    instanceId: child.instanceId,
                    content: this.buildNestedViewModel(child),
                } satisfies BlockPlaceholderViewModel;
            case "attachment":
                return {
                    id: child.id,
                    kind: "attachment",
                    hidden: child.hidden,
                    content: this.buildNestedViewModel(child),
                } satisfies BlockAttachmentViewModel;
        }
    }

    private buildNestedViewModel(child: BlockChild): BlockViewModel | null {
        const content = this.getChildBlockContent(child);
        return content ? this.buildBlockViewModel(content) : null;
    }

    private getChildBlockContent(child: BlockChild): Block | null {
        if (!child.content || typeof child.content !== "object") {
            return null;
        }

        if (!("children" in child.content) || !Array.isArray((child.content as Block).children)) {
            return null;
        }

        return child.content as Block;
    }

    private removeBlockFromParent(parent: Block, index: number): void {
        const child = parent.children[index];
        if (!child) return;

        if (child.type === "placeholder") {
            parent.children[index].content = null;
            return;
        }

        if (child.type === "attachment") {
            parent.children.splice(index, 1);
        }
    }

    private removeBlockFromTopLevel(id: string): void {
        this.managedBlocks = this.managedBlocks.filter((block) => block.id !== id);
    }

    private resetBlockInstance(block: Block, isRoot = false): void {
        block.id = this.generateRandomId();
        block.translation = "";
        block.x = isRoot ? 0 : block.x ?? 0;
        block.y = isRoot ? 0 : block.y ?? 0;

        for (const child of block.children ?? []) {
            if (child.type === "placeholder" || child.type === "attachment") {
                child.instanceId = undefined;
                child.resolved = false;
                const content = this.getChildBlockContent(child);
                if (content) {
                    this.resetBlockInstance(content);
                }
            }
        }
    }

    private resolveBlockShape(block: Block): BlockShape {
        if (block.blockShape) return block.blockShape;
        return block.isRound ? "capsule" : "rect";
    }

    private getChildContentLayout(
        parentBlock: Block,
        targetChildIndex: number
    ): { x: number; y: number } | null {
        const blockHeight = calculateBlockHeight(parentBlock);
        let currentX = horizontalPadding + getBlockHorizontalInset(parentBlock, blockHeight);

        for (let index = 0; index < parentBlock.children.length; index++) {
            const child = parentBlock.children[index];
            if (child.hidden) {
                continue;
            }

            const content = this.getChildBlockContent(child);

            if (child.resolved && child.type === "placeholder") {
                currentX += resolvedGapRadius * 2 + horizontalPadding;
                continue;
            }

            if (child.type === "placeholder") {
                if (content) {
                    const childWidth = calculateBlockWidth(content);
                    const childHeight = calculateBlockHeight(content);
                    if (index === targetChildIndex) {
                        return { x: currentX, y: (blockHeight - childHeight) / 2 };
                    }
                    currentX += childWidth + horizontalPadding;
                } else {
                    currentX += placeholderWidth + horizontalPadding;
                }
                continue;
            }

            if (child.type === "attachment") {
                if (content) {
                    const childWidth = calculateBlockWidth(content);
                    const childHeight = calculateBlockHeight(content);
                    if (index === targetChildIndex) {
                        return { x: currentX, y: (blockHeight - childHeight) / 2 };
                    }
                    currentX += childWidth + horizontalPadding;
                }
                continue;
            }

            if (child.type === "text") {
                const box = calculateTextHeightAndWidth(String(child.content ?? ""));
                currentX += box.width;
                currentX += horizontalPadding;
                continue;
            }

            if (child.type === "dropdown") {
                currentX += calculateDropdownWidth(child);
                currentX += horizontalPadding;
            }
        }

        return null;
    }
}
