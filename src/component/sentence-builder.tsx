"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Renderer } from "../lib/renderer";
import { Block } from "@/grammar/block";
import { A_Block, Colorless_Block, Furiously_Block, Green_Block, Idea_Block, Sentence_Block, Sleep_Block, The_Block } from "@/grammar/lexicons/test-blocks";
import { Converter } from "@/grammar/converter";
import { Grammar } from "@/grammar/grammar";
import BlockList from "./block-list";
import { cloneBlock } from "@/grammar/block";
//import { Sentence_Lexicon } from "@/grammar/lexicons/test-lexicons";

interface SentenceBuilderData {
    blocks: Block[];
}

const SentenceBuilder = () => {
    const svgContainerRef = useRef(null);
    const rendererRef = useRef<Renderer>(null);

    // ブロックの色、mediumseagreenとかも綺麗かも

    const data: SentenceBuilderData = {
        blocks: []
    };

    const converter = new Converter();
    const grammar = new Grammar();

    function validate(block: Block): boolean {
        const constituent = converter.convertBlockIntoConstituent(block);
        const categories = grammar.validateConstituent(constituent);
        return (categories.length > 0);
    }

    function addBlock(block: Block) {
        if (!rendererRef.current) return;
        const gridState = rendererRef.current.getGridState();
        block.x = (200 - gridState.x) / gridState.k;
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
        rendererRef.current = new Renderer(data, svg, ((data: unknown) => data), validate, validate, validate);

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
                blocks={[
                    A_Block, Colorless_Block, Furiously_Block, Green_Block, Idea_Block, Sentence_Block, Sleep_Block, The_Block
                ]}
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