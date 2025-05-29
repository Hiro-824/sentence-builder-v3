"use client"

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Renderer } from "@/renderer/renderer";
import { blockList } from "@/grammar/blocks/blocks";

const blocks = [];

const SentenceBuilder = () => {

    const svgContainerRef = useRef(null);

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
        new Renderer(blocks, blockList, svg);

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
        </>
    );
}

export default SentenceBuilder;