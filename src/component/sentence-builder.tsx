"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Renderer } from "../lib/renderer";

const SentenceBuilder = () => {
    const svgContainerRef = useRef(null);

    const iBlock = {
        id: "a6f1c048367664668aeeb94e3b58567c7",
        category: "PronounPhrase",
        x: 100,
        y: 50,
        color: "dodgerblue",
        children: [
            {
                id: "text",
                type: "dropdown",
                selected: 0,
                content: [
                    "I",
                    "my",
                    "me",
                    "mine",
                    "myself"
                ],
            }
        ]
    }

    const youBlock = {
        id: "a6f1c048367664668aeeb94e3b58567c8",
        category: "PronounPhrase",
        x: 200,
        y: 50,
        color: "dodgerblue",
        children: [
            {
                id: "text",
                type: "dropdown",
                selected: 0,
                content: [
                    "you",      // subject
                    "your",     // possessive adjective
                    "you",      // object
                    "yours",    // possessive pronoun
                    "yourself"  // reflexive (singular)
                ],
            }
        ]
    };

    const heBlock = {
        id: "a6f1c048367664668aeeb94e3b58567c9",
        category: "PronounPhrase",
        x: 375,
        y: 50,
        color: "dodgerblue",
        children: [
            {
                id: "text",
                type: "dropdown",
                selected: 0,
                content: [
                    "he",       // subject
                    "his",      // possessive adjective
                    "him",      // object
                    "his",      // possessive pronoun
                    "himself"   // reflexive
                ],
            }
        ]
    };

    const sheBlock = {
        id: "a6f1c048367664668aeeb94e3b58567ca",
        category: "PronounPhrase",
        x: 525,
        y: 50,
        color: "dodgerblue",
        children: [
            {
                id: "text",
                type: "dropdown",
                selected: 0,
                content: [
                    "she",       // subject
                    "her",       // possessive adjective
                    "her",       // object
                    "hers",      // possessive pronoun
                    "herself"    // reflexive
                ],
            }
        ]
    };

    const itBlock = {
        id: "a6f1c048367664668aeeb94e3b58567cb",
        category: "PronounPhrase",
        x: 100,
        y: 150,
        color: "dodgerblue",
        children: [
            {
                id: "text",
                type: "dropdown",
                selected: 0,
                content: [
                    "it",        // subject
                    "its",       // possessive adjective
                    "it",        // object
                    "its",       // possessive pronoun (rarely used)
                    "itself"     // reflexive
                ],
            }
        ]
    };

    const weBlock = {
        id: "a6f1c048367664668aeeb94e3b58567cc",
        category: "PronounPhrase",
        x: 225,
        y: 150,
        color: "dodgerblue",
        children: [
            {
                id: "text",
                type: "dropdown",
                selected: 0,
                content: [
                    "we",         // subject
                    "our",        // possessive adjective
                    "us",         // object
                    "ours",       // possessive pronoun
                    "ourselves"   // reflexive
                ],
            }
        ]
    };

    const theyBlock = {
        id: "a6f1c048367664668aeeb94e3b58567cd",
        category: "PronounPhrase",
        x: 375,
        y: 150,
        color: "dodgerblue",
        children: [
            {
                id: "text",
                type: "dropdown",
                selected: 0,
                content: [
                    "they",         // subject
                    "their",        // possessive adjective
                    "them",         // object
                    "theirs",       // possessive pronoun
                    "themselves"    // reflexive
                ],
            }
        ]
    };

    const pronounBlocks = [iBlock, youBlock, heBlock, sheBlock, itBlock, weBlock, theyBlock];

    const loveBlock = {
        id: "a6f1c048367664668aeeb94e3b58567ce",
        category: "CompleteTransitiveVerbPhrase",
        x: 100,
        y: 250,
        color: "tomato",
        children: [
            {
                id: "text",
                type: "dropdown",
                selected: 0,
                content: [
                    "love",
                    "loves",
                    "loved",
                    "loving",
                    "loved",
                ],
            },
            {
                id: "object",
                type: "placeholder",
                content: null,
            }
        ]
    }

    const sentenceBlock = {
        id: "d148de85abf6440c48613325bd0c92cc8",
        category: "Sentence",
        x: 100,
        y: 360,
        color: "lightBlue",
        children: [
            {
                id: "subject",
                type: "placeholder",
                content: null,
            },
            {
                id: "predicate",
                type: "placeholder",
                content: null,
            },
            {
                id: "period",
                type: "text",
                content: ".",
            }
        ]
    }

    // ブロックの色、mediumseagreenとかも綺麗かも

    const data = {
        blocks: [
            ...pronounBlocks,
            loveBlock,
            sentenceBlock,
        ]
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
        new Renderer(data, svg, ((data: unknown) => data), () => true, () => true, () => true);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener("resize", updateSvgSize);
        };
    });

    return <div ref={svgContainerRef} />;
};

export default SentenceBuilder;