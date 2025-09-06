"use client";

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { 
    renderStaticBlock, 
    calculateBlockWidth, 
    calculateBlockHeight,
    converter
} from '@/renderer/block-renderer-utils';
import type { Block } from '@/models/block';

interface MarkdownBlockRendererProps {
  jsonString: string;
}

const MarkdownBlockRenderer = ({ jsonString }: MarkdownBlockRendererProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!svgRef.current || !jsonString) return;

    let blockData: Block;
    try {
      blockData = JSON.parse(jsonString);
    } catch (error) {
      console.error("Invalid JSON for sentence-block:", error);
      if (containerRef.current) {
          containerRef.current.innerText = 'Error: Invalid block format.';
      }
      return;
    }
    
    // Format the block using the same converter
    const formattedBlock = converter.formatBlock(blockData);
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    // Calculate dimensions
    const width = calculateBlockWidth(formattedBlock);
    const height = calculateBlockHeight(formattedBlock);

    // Set SVG size
    svg.attr('width', width).attr('height', height);

    // Render the block
    const blockGroup = svg.append('g');
    renderStaticBlock(formattedBlock, blockGroup);

  }, [jsonString]);

  return (
    <div 
        ref={containerRef}
        style={{ 
            display: 'inline-block', 
            verticalAlign: 'middle', 
            margin: '8px 0',
            lineHeight: 0,
        }}
    >
        <svg ref={svgRef}></svg>
    </div>
  );
};

export default MarkdownBlockRenderer;