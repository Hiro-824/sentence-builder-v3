import { padding, horizontalPadding, placeholderWidth, placeholderHeight, dropdownHeight, resolvedGapRadius, labelFontSize } from "./const.js";
import * as d3 from "d3";

// This is a simplified version for use in React where we can't easily append to a live SVG.
// It relies on approximations but can be replaced with a more robust method if needed.
// For now, we'll use a rough estimate: character count * font size factor.
function calculateTextHeightAndWidth(content) {
    if (typeof content !== 'string') return { width: 0, height: labelFontSize };
    const avgCharWidth = labelFontSize * 0.6; // A reasonable approximation
    const width = content.length * avgCharWidth;
    const height = labelFontSize;
    return { width, height };
}

export function calculateDropdownWidth(dropdown) {
    const selected = dropdown.selected || 0;
    const text = dropdown.content[selected];
    const box = calculateTextHeightAndWidth(text);
    return horizontalPadding * 4 + box.width;
}

export function calculateWidth(block) {
    if (!block) return 0;
    const children = block.children?.filter((child) => !child.hidden) || [];
    const paddingNumber = children.length + 1;
    let width = 0;
    if (block.isRound) {
        width += horizontalPadding * 2;
    }

    children.forEach(child => {
        if (child.resolved && child.type === "placeholder") {
            width += resolvedGapRadius * 2;
        } else if (child.type === "placeholder") {
            const content = child.content;
            if (content) {
                width += calculateWidth(content);
            } else {
                width += placeholderWidth;
            }
        } else if (child.type === "text") {
            const content = child.content;
            const box = calculateTextHeightAndWidth(content);
            width += box.width;
        } else if (child.type === "dropdown") {
            width += calculateDropdownWidth(child);
        } else if (child.type === "attachment") {
            const content = child.content;
            if (content) {
                width += calculateWidth(content);
            }
        }
    });
    width += (horizontalPadding * paddingNumber);
    return width;
}

export function calculateHeight(block) {
    if (!block) return 0;
    const children = block.children?.filter((child) => !child.hidden && !child.resolved) || [];
    let heights = [placeholderHeight - padding * 2];
    children.forEach(child => {
        if (child.type === "placeholder" || child.type === "attachment") {
            const content = child.content;
            if (content) {
                heights.push(calculateHeight(content));
            } else {
                heights.push(placeholderHeight);
            }
        } else if (child.type === "dropdown") {
            heights.push(dropdownHeight);
        }
    });
    const highest = Math.max(...heights);
    return padding * 2 + highest;
}

export function darkenColor(color, factor) {
    let rgb = d3.rgb(color);
    rgb.r = Math.max(0, rgb.r - factor);
    rgb.g = Math.max(0, rgb.g - factor);
    rgb.b = Math.max(0, rgb.b - factor);
    return rgb.toString();
}