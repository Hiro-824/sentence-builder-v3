import { padding, blockCornerRadius, blockStrokeWidth, placeholderWidth, placeholderHeight, placeholderCornerRadius, labelFontSize, dropdownHeight, horizontalPadding, blockPreviewScaleExtent } from "./const.js";
import * as d3 from "d3";

export class BlockRenderer {
    constructor(block, svg, onClick) {
        this.svg = svg;
        this.onClick = onClick;
        this.renderBlock(block, svg);
    }

    renderBlock(blockData, parent) {

        const width = this.calculateWidth(blockData);
        const height = this.calculateHeight(blockData);

        this.svg.attr("height", blockPreviewScaleExtent * (height + blockStrokeWidth * 3));

        //グループを作成
        const blockGroup = parent.append("g")
            .attr("transform", `translate(${blockStrokeWidth}, ${blockStrokeWidth}) scale(${blockPreviewScaleExtent})`)
            .attr("id", blockData.id)
            .classed("pointer", true)
            .datum(blockData)
            .on("mousedown", this.onClick)

        let opacity = 1;
        if (blockData.isTransparent && blockData.isTransparent === true) {
            opacity = 0.5;
        }

        let actualCornerRadius = blockCornerRadius;
        if (blockData.isRound && blockData.isRound === true) {
            actualCornerRadius = height / 2;
        }

        //フレームを描画
        const strokeColor = this.darkenColor(blockData.color, 30);
        blockGroup.append("rect")
            .attr("id", `preview-${blockData.id}`)
            .attr("opacity", opacity)
            .attr("width", width)
            .attr("height", height)
            .attr("fill", blockData.color)
            .attr("rx", actualCornerRadius)
            .attr("ry", actualCornerRadius)
            .attr("stroke", strokeColor)
            .attr("stroke-width", blockStrokeWidth);

        //内部を描画
        const children = blockData.children;
        let x = horizontalPadding;
        if (blockData.isRound && blockData.isRound === true) {
            x += horizontalPadding;
        }
        for (let count = 0; count < children.length; count++) {
            const child = children[count];
            if(!child.hidden) {
                if (child.type === "placeholder") {
                    const content = child.content;
                    if (content) {
                        //ブロックがはまっている場合
                        const childWidth = this.calculateWidth(content);
                        const childHeight = this.calculateHeight(content);
                        content.x = x;
                        content.y = (height - childHeight) / 2;
                        this.renderBlock(content, blockGroup);
                        x += (childWidth + horizontalPadding)
                    } else {
                        //ブロックがはまっていない場合
                        const y = (height - placeholderHeight) / 2;
                        const inputColor = this.darkenColor(blockData.color, 30);
                        blockGroup.append("rect")
                            .attr("id", `preview-${count}-${blockData.id}-${child.id}`)
                            .attr("x", x)
                            .attr("y", y)
                            .attr("width", placeholderWidth)
                            .attr("height", placeholderHeight)
                            .attr("rx", placeholderCornerRadius)
                            .attr("ry", placeholderCornerRadius)
                            .attr("fill", inputColor);
                        x += (placeholderWidth + horizontalPadding);
                    }
                } else if (child.type === "text") {
                    const content = child.content;
                    const box = this.calculateTextHeightAndWidth(content);
                    const y = ((height - box.height) / 2) + box.height;
                    blockGroup.append("text")
                        .text(content)
                        .attr("x", x)
                        .attr("y", y)
                        .attr('fill', 'white')
                        .attr('font-size', `${labelFontSize}pt`)
                        .attr('font-weight', 'bold')
                        .attr('dy', '-0.15em')
                        .style('user-select', 'none');
                    x += (box.width + horizontalPadding);
                } else if (child.type === "dropdown") {
                    const selected = child.selected;
                    const text = child.content[selected];
                    const box = this.calculateTextHeightAndWidth(text);
                    const dropdownWidth = this.calculateDropdownWidth(child);
    
                    const inputColor = this.darkenColor(blockData.color, 30);
                    const y = (height - dropdownHeight) / 2;
    
                    const dropdownId = `preview-${count}-${blockData.id}`;
    
                    const dropdownGroup = blockGroup.append("g")
                        .classed("pointer", true)
    
                    dropdownGroup.append("rect")
                        .attr("id", dropdownId)
                        .attr("x", x)
                        .attr("y", y)
                        .attr("width", dropdownWidth)
                        .attr("height", dropdownHeight)
                        .attr("rx", blockCornerRadius)
                        .attr("ry", blockCornerRadius)
                        .attr("fill", inputColor);
    
                    const textX = x + horizontalPadding;
                    const textY = ((height - box.height) / 2) + box.height;
                    dropdownGroup.append("text")
                        .text(text)
                        .attr("x", textX)
                        .attr("y", textY)
                        .attr('fill', 'white')
                        .attr('font-size', `${labelFontSize}pt`)
                        .attr('font-weight', 'bold')
                        .attr('dy', '-0.15em')
                        .style('user-select', 'none')
    
                    dropdownGroup.append("text")
                        .text("▼")
                        .attr("x", textX + box.width + horizontalPadding)
                        .attr("y", textY - 10)
                        .attr('fill', 'white')
                        .attr('font-size', `10pt`)
                        .attr('font-weight', 'bold')
                        .attr('dy', '-0.15em')
                        .style('user-select', 'none');
    
                    x += (dropdownWidth + horizontalPadding);
                } else if (child.type === "attachment") {
                    const content = child.content;
                    if (content) {
                        //ブロックがはまっている場合
                        const childWidth = this.calculateWidth(content);
                        const childHeight = this.calculateHeight(content);
                        content.x = x;
                        content.y = (height - childHeight) / 2;
                        this.renderBlock(content, blockGroup);
                        x += (childWidth + horizontalPadding)
                    }
                }
            }
        }
    }

    calculateTextHeightAndWidth(content) {
        const testText = this.svg.append("text")
            .text(content)
            .attr('fill', 'white')
            .attr('font-size', `${labelFontSize}pt`)
            .attr('font-weight', 'bold');
        const box = testText.node().getBBox();
        testText.remove();
        return box;
    }

    calculateDropdownWidth(dropdown) {
        const selected = dropdown.selected;
        const text = dropdown.content[selected];
        const box = this.calculateTextHeightAndWidth(text);
        return horizontalPadding * 4 + box.width;
    }

    calculateWidth(blockData) {
        const children = blockData.children.filter((child) => !child.hidden);
        const paddingNumber = children.length + 1;
        let width = 0;
        if (blockData.isRound && blockData.isRound === true) {
            width += horizontalPadding * 2;
        }
        children.forEach(child => {
            if (child.type === "placeholder") {
                const content = child.content;
                if (content) {
                    const contentWidth = this.calculateWidth(content);
                    width += contentWidth;
                } else {
                    width += placeholderWidth;
                }
            } else if (child.type === "text") {
                const content = child.content;
                const box = this.calculateTextHeightAndWidth(content);
                width += box.width;
            } else if (child.type === "dropdown") {
                const dropdownWidth = this.calculateDropdownWidth(child);
                width += dropdownWidth;
            } else if (child.type === "attachment") {
                const content = child.content;
                if (content) {
                    const contentWidth = this.calculateWidth(content);
                    width += contentWidth;
                }
            }
        });
        width += (horizontalPadding * paddingNumber);
        return width;
    }

    calculateHeight(blockData) {
        const children = blockData.children.filter((child) => !child.hidden);
        let heights = [placeholderHeight - padding * 2];
        children.forEach(child => {
            if (child.type === "placeholder") {
                const content = child.content;
                if (content) {
                    const contentHeight = this.calculateHeight(content);
                    heights.push(contentHeight);
                } else {
                    heights.push(placeholderHeight);
                }
            } else if (child.type === "dropdown") {
                heights.push(dropdownHeight);
            } else if (child.type === "attachment") {
                const content = child.content;
                if (content) {
                    const contentHeight = this.calculateHeight(content);
                    heights.push(contentHeight);
                }
            }
        });
        const highest = Math.max(...heights);
        const height = padding * 2 + highest;
        return height;
    }

    darkenColor(color, factor) {
        let rgb = d3.rgb(color);
        rgb.r = Math.max(0, rgb.r - factor);
        rgb.g = Math.max(0, rgb.g - factor);
        rgb.b = Math.max(0, rgb.b - factor);
        return rgb;
    }
}