"use client"

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Renderer } from "@/renderer/renderer";
import { blockList } from "@/data/blocks";
import { Block } from "@/models/block";
import TopBar from "./top-bar"; // ADVISOR NOTE: Import the new component

const SentenceBuilder = () => {

    const blocks: Block[] = [];

    const svgContainerRef = useRef(null);
    const rendererRef = useRef<Renderer | null>(null); // ADVISOR NOTE: Ref to hold the renderer instance

    useEffect(() => {
        // ADVISOR NOTE: Ensure this effect only runs once
        if (rendererRef.current) return;

        // Select the container from the ref
        const container = d3.select(svgContainerRef.current);
        container.selectAll("*").remove();

        // ADVISOR NOTE: Define top bar height to offset the canvas
        const topBarHeight = 60;

        // Create an SVG element inside the container
        const svg = container
            .append("svg")
            .attr("id", "svg")
            .style("background-color", "#f9f9f9");

        // Update SVG size on window resize
        const updateSvgSize = () => {
            const width = window.innerWidth;
            // ADVISOR NOTE: Adjust the height to account for the top bar
            const height = window.innerHeight - topBarHeight;
            svg.attr("width", width).attr("height", height);
        };
        updateSvgSize();
        window.addEventListener("resize", updateSvgSize);

        // Create a new Renderer instance with the data and svg element
        // We'll also pass the topBarHeight to the renderer so it knows how to offset its own content
        rendererRef.current = new Renderer(blocks, blockList, svg, topBarHeight);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener("resize", updateSvgSize);
            // Optional: Add a destroy method to your renderer to clean up its own listeners
            rendererRef.current?.destroy(); 
        };
    }, []); // ADVISOR NOTE: Add an empty dependency array to run this effect only once.

    return (
        <>
            {/* ADVISOR NOTE: Render the TopBar component here. It will sit on top of the SVG. */}
            <TopBar />

            <div
                ref={svgContainerRef}
                style={{
                    position: 'fixed',
                    // ADVISOR NOTE: Add a top offset to push the D3 canvas below the top bar.
                    top: '60px',
                    left: 0,
                }}
            />
        </>
    );
}

export default SentenceBuilder;