"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Renderer } from "../lib/renderer";
import { Block } from "@/grammar/block";
import { blocks } from "@/grammar/lexicons/blocks";
import { Converter } from "@/grammar/converter";
import { Grammar } from "@/grammar/grammar";
import BlockList from "./block-list";
import { cloneBlock } from "@/grammar/block";

interface SentenceBuilderData {
    blocks: Block[];
}

const SentenceBuilder = () => {
    const svgContainerRef = useRef(null);
    const rendererRef = useRef<Renderer>(null);

    const converter = new Converter();
    const grammar = new Grammar();

    const data: SentenceBuilderData = {
        blocks: [] // ブロックの色、mediumseagreenとかも綺麗かも
    };

    function validate(block: Block): boolean {
        const constituent = converter.convertBlockIntoConstituent(block);
        const validationResult = grammar.validateConstituent(constituent);
        const categories = validationResult.possibleCategories;
        return (categories.length > 0);
    }

    function onDataChanged() {
        console.log("data changed", data)
        data.blocks.forEach((block) => {
            resetkeepEmpty(block);
            updateChildVisibilityBasedOnHead(block);
            hidePlaceholderTobeEmpty(block);
            block.translation = grammar.translateConstituent(converter.convertBlockIntoConstituent(block), []);
        })
    }

    function resetkeepEmpty(block: Block) {
        for (const child of block.children) {
            child.keepEmpty = false;
            if (child.type === 'placeholder' && converter.isBlock(child.content)) {
                resetkeepEmpty(child.content);
            }
        }
    }

    function updateChildVisibilityBasedOnHead(block: Block): void {
        let headSelectedValue: number | undefined = undefined;

        const headDropdown = block.children.find(
            (child) => child.id.includes('head') && child.type === 'dropdown'
        );

        if (headDropdown && typeof headDropdown.selected === 'number') {
            headSelectedValue = headDropdown.selected;
        }

        for (const child of block.children) {
            child.hidden = false;
            if (child.headIndex && Array.isArray(child.headIndex) && headSelectedValue !== undefined) {
                const hide = !child.headIndex.includes(headSelectedValue);
                child.hidden = hide;
                if (hide && child.type === "placeholder" && converter.isBlock(child.content)) {
                    child.content.x += 30;
                    child.content.y += 30;
                    rendererRef.current?.moveBlockToTopLevel(child.content.id);
                }
            }

            if (child.type === 'placeholder' && converter.isBlock(child.content)) {
                updateChildVisibilityBasedOnHead(child.content);
            }
        }
    }

    function hidePlaceholderTobeEmpty(block: Block) {
        const constituent = converter.convertBlockIntoConstituent(block);
        const validationResult = grammar.validateConstituent(constituent);
        console.log(validationResult.lastEmptyIds);
        validationResult.lastEmptyIds.forEach((id) => {
            const blockWithPlaceholderTobeNull = findBlock(id, block);
            if (blockWithPlaceholderTobeNull) {
                const lastComplement = findLastComplement(blockWithPlaceholderTobeNull);
                if (lastComplement !== undefined) lastComplement.keepEmpty = true;
            } else {
                console.log("COULDN'T FIND IT")
            }
        })
    }

    function findBlock(blockId: string, block: Block): Block | null {
        if (block.id === blockId) {
            return block;
        }

        if (!block.children) {
            return null;
        }

        for (const child of block.children) {
            if ((child.type === "placeholder" || child.type === "attachment")
                && converter.isBlock(child.content)) {
                const content = child.content;

                // recurse
                const found = findBlock(blockId, content);
                if (found) {
                    return found;
                }
            }
        }

        // none of this block’s subtree had it
        return null;
    }

    function findLastComplement(block: Block) {
        const blockComplementChildren = block.children.filter((child) => (child.id.includes("complement")));
        const lastComplementChild = blockComplementChildren[blockComplementChildren.length - 1];
        if (!lastComplementChild || lastComplementChild.type !== "placeholder") return;
        if (lastComplementChild.content === null) return lastComplementChild;
        if (converter.isBlock(lastComplementChild.content)) return findLastComplement(lastComplementChild.content);
    }

    function addBlock(block: Block) {
        if (!rendererRef.current) return;
        const gridState = rendererRef.current.getGridState();
        block.x = (180 - gridState.x) / gridState.k;
        block.y = (10 - gridState.y) / gridState.k;
        data.blocks.push(block);
        rendererRef.current?.render();
    }

    useEffect(() => {
        // Select the container from the ref
        const container = d3.select(svgContainerRef.current);
        container.selectAll("*").remove();

        // Create an SVG element inside the container
        const svg = container
            .append("svg")
            .attr("id", "svg")
            .style("background-color", "#f9f9f9");

        // Update SVG size on window resize
        const updateSvgSize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            svg.attr("width", width).attr("height", height);
        };
        updateSvgSize();
        window.addEventListener("resize", updateSvgSize);

        // Create a new Renderer instance with the data and svg element
        rendererRef.current = new Renderer(data, svg, onDataChanged, validate, validate, validate);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener("resize", updateSvgSize);
        };
    });

    return (
        <>
            <div
                ref={svgContainerRef}
                style={{
                    position: 'fixed',
                }}
            />
            <BlockList
                blocks={blocks}
                onBlockClick={
                    (selectedBlockDefinition) => {
                        const id = "b" + crypto.randomUUID().replaceAll(/-/g, '');
                        const blockToAdd = cloneBlock(selectedBlockDefinition, id);
                        addBlock(blockToAdd);
                    }
                }
            />
        </>
    );
};

export default SentenceBuilder;