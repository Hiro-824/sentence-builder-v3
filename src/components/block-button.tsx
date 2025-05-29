"use client"

import { Block } from "@/grammar/block";
import { BlockRenderer } from "@/lib/block-renderer";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

const BlockButton = (block: Block, onClick: (block: Block) => void) => {
    const svgContainerRef = useRef(null);

    useEffect(() => {
        // Select the container from the ref
        const container = d3.select(svgContainerRef.current);
        container.selectAll("*").remove();

        // Create an SVG element inside the container
        const svg = container
            .append("svg")
            .attr("id", "svg")
            .style("background-color", "transparent");

        new BlockRenderer(block, svg, () => {
            onClick(block);
        });
    });

    return (
        <div
            key={block.id}
            ref={svgContainerRef}
        />
    );
}

export default BlockButton;