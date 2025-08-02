"use client"

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Renderer } from "@/renderer/renderer";
import { blockList } from "@/data/blocks";
import { Block } from "@/models/block";
import TopBar from "./top-bar";

const SentenceBuilder = () => {

    const svgContainerRef = useRef(null);
    const rendererRef = useRef<Renderer | null>(null);

    useEffect(() => {
        if (rendererRef.current) return;

        const blocks: Block[] = [];

        const container = d3.select(svgContainerRef.current);
        container.selectAll("*").remove();

        const topBarHeight = 60;

        const svg = container
            .append("svg")
            .attr("id", "svg")
            .style("background-color", "#f9f9f9");

        const updateSvgSize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight - topBarHeight;
            svg.attr("width", width).attr("height", height);
        };
        updateSvgSize();
        window.addEventListener("resize", updateSvgSize);

        rendererRef.current = new Renderer(blocks, blockList, svg, topBarHeight);

        return () => {
            window.removeEventListener("resize", updateSvgSize);
            rendererRef.current?.destroy(); 
        };
    }, []);

    return (
        <>
            <TopBar />

            <div
                ref={svgContainerRef}
                style={{
                    position: 'fixed',
                    top: '60px',
                    left: 0,
                }}
            />
        </>
    );
}

export default SentenceBuilder;