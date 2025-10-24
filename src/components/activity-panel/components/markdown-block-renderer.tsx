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
import styles from './markdown-block-renderer.module.css';

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

    const formattedBlock = converter.formatBlock(blockData);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const scaleFactor = 0.5;

    const padding = 2;

    const blockWidth = calculateBlockWidth(formattedBlock);
    const blockHeight = calculateBlockHeight(formattedBlock);

    svg
      .attr('width', (blockWidth + padding) * scaleFactor)
      .attr('height', (blockHeight + padding) * scaleFactor);

    svg.attr(
      'viewBox',
      `${-padding / 2} ${-padding / 2} ${blockWidth + padding} ${blockHeight + padding}`
    );

    const blockGroup = svg.append('g');
    renderStaticBlock(formattedBlock, blockGroup);

  }, [jsonString]);

  return (
    <div
      ref={containerRef}
      className={styles.container}
    >
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default MarkdownBlockRenderer;
