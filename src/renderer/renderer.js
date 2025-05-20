/* eslint-disable @typescript-eslint/no-unused-vars */
import { padding, blockCornerRadius, blockStrokeWidth, highlightStrokeWidth, placeholderWidth, placeholderHeight, placeholderCornerRadius, labelFontSize, dropdownHeight, horizontalPadding, bubbleColor } from "./const.js";
import * as d3 from "d3";

export class Renderer {
    constructor(blocks, svg) {
        this.blocks = blocks;
        this.svg = svg;
        this.render();
    }

    /*レンダリング処理***********************************************************************************************************************************************************************************************************************************************************************************************************************/

    render() {
        this.renderGrid();
        this.renderBlocks();
    }

    renderGrid() {
        const width = 1440;
        const height = 812;

        this.grid = this.svg.append("g").attr("id", "grid");
        const spacing = 50;
        const gridData = [];

        for (let x = -width * 6; x <= width * 6; x += spacing) {
            for (let y = -height * 6; y <= height * 6; y += spacing) {
                gridData.push({ x, y });
            }
        }

        const zoom = d3.zoom()
            .scaleExtent(
                [0.2, 1.5],
            )
            .translateExtent([[-width * 4, -height * 4], [width * 4, height * 4]])
            .on("zoom", (event) => {
                this.grid.attr("transform", event.transform);
            });

        this.svg.call(zoom).on("wheel", (event) => {
            event.preventDefault();
        }, { passive: false });

        //Initial Zoom Level
        const initialTransform = d3.zoomIdentity.translate(0, 0).scale(0.5);
        d3.select("svg").transition().duration(300).call(zoom.transform, initialTransform);
    }

    renderBlocks() {
        console.log(this.blocks)
        this.blocks.forEach(block => {
            this.renderBlock(block, this.grid);
        });
    }

    renderBlock(block, parent) {
        const blockGroup = parent.append("g")
            .attr("transform", `translate(${block.x}, ${block.y})`)
            .attr("id", block.id)
            .classed("grab", true).classed("grabbing", false)
            .datum(block)
            .call(d3.drag()
                .on("start", this.dragStart.bind(this))
                .on("drag", this.dragging.bind(this))
                .on("end", this.dragEnd.bind(this))
            );

        this.renderBlockImage(block, blockGroup);
    }

    /*ブロックの画像の描画***********************************************************************************************************************************************************************************************************************************************************************************************************************/

    renderBlockImage(block, blockGroup) {
        const width = this.calculateWidth(block);
        const height = this.calculateHeight(block);
        const strokeColor = this.darkenColor(block.color, 30);
        const actualCornerRadius = block.isRound ? height / 2 : blockCornerRadius;

        // フレーム描画
        blockGroup.append("rect")
            .attr("id", `frame-${block.id}`)
            .attr("width", width)
            .attr("height", height)
            .attr("fill", block.color)
            .attr("rx", actualCornerRadius)
            .attr("ry", actualCornerRadius)
            .attr("stroke", strokeColor)
            .attr("stroke-width", blockStrokeWidth);

        const children = block.children.filter(c => !c.hidden && !c.keepEmpty);
        let x = horizontalPadding + (block.isRound ? horizontalPadding : 0);

        // 内部の各種アイテムの描画
        for (let count = 0; count < children.length; count++) {
            const child = children[count];
            if (child.type === "placeholder") {
                x += this.renderPlaceholder(child, height, block, blockGroup, count, x);
            } else if (child.type === "text") {
                x += this.renderText(child, height, blockGroup, x);
            } else if (child.type === "dropdown") {
                x += this.renderDropdown(child, height, block, blockGroup, count, x);
            } else if (child.type === "attachment") {
                x += this.renderAttachment(child, height, blockGroup, x);
            }
        }
    }

    renderPlaceholder(child, height, block, blockGroup, count, x) {
        const content = child.content;
        if (content) {
            //ブロックがはまっている場合
            const childWidth = this.calculateWidth(content);
            const childHeight = this.calculateHeight(content);
            content.x = x;
            content.y = (height - childHeight) / 2;
            this.renderBlock(content, blockGroup);
            return (childWidth + horizontalPadding)
        } else {
            //ブロックがはまっていない場合
            const y = (height - placeholderHeight) / 2;
            const inputColor = this.darkenColor(block.color, 30);
            blockGroup.append("rect")
                .attr("id", `placeholder-${count}-${block.id}-${child.id}`)
                .attr("x", x)
                .attr("y", y)
                .attr("width", placeholderWidth)
                .attr("height", placeholderHeight)
                .attr("rx", placeholderCornerRadius)
                .attr("ry", placeholderCornerRadius)
                .attr("fill", inputColor);
            return (placeholderWidth + horizontalPadding);
        }
    }

    renderText(child, height, blockGroup, x) {
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
        return (box.width + horizontalPadding);
    }

    renderDropdown(child, height, block, blockGroup, count, x) {
        const selected = child.selected;
        const text = child.content[selected];
        const box = this.calculateTextHeightAndWidth(text);
        const dropdownWidth = this.calculateDropdownWidth(child);

        const inputColor = this.darkenColor(block.color, 30);
        const y = (height - dropdownHeight) / 2;

        const dropdownId = `dropdown-${count}-${block.id}`;

        const dropdownGroup = blockGroup.append("g")
            .classed("pointer", true)
            .on("mousedown", (event) => {
                if (this.currentlyOpenedDropdownId === dropdownId) {
                    event.stopPropagation();
                    event.preventDefault();
                }
            });

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

        const optionHeight = dropdownHeight;
        const optionsWidth = Math.max(...child.content.map(option =>
            this.calculateTextHeightAndWidth(option).width)) + horizontalPadding * 2;

        const optionsPosition = {
            x: x,
            y: y + dropdownHeight + padding,
            width: optionsWidth,
            height: (optionHeight * child.content.length + blockCornerRadius * 2)
        };

        const optionsGroup = dropdownGroup.append("g")
            .attr("display", "none")
            .classed("dropdown-options", true);

        // Background for options
        optionsGroup.append("rect")
            .attr("x", optionsPosition.x)
            .attr("y", optionsPosition.y)
            .attr("width", optionsWidth)
            .attr("height", optionHeight * child.content.length + blockCornerRadius * 2)
            .attr("fill", block.color)
            .attr("rx", blockCornerRadius)
            .attr("ry", blockCornerRadius)
            .attr("stroke", inputColor)
            .attr("stroke-width", 2);

        // Render each option
        child.content.forEach((option, index) => {
            const optionBox = this.calculateTextHeightAndWidth(option);
            const optionY = optionsPosition.y + blockCornerRadius + (optionHeight * index);

            const isSelected = (index === child.selected);

            const optionGroup = optionsGroup.append("g")
                .classed("pointer", true)
                .attr("id", `option-${index}-dropdown-${count}-${block.id}`)
                .on("click", (event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    child.selected = index;
                    let resultingBlock = null;
                    for (const block of this.data.blocks) {
                        if (this.containsBlock(block, block.id)) {
                            resultingBlock = block;
                        }
                    }
                    this.onDataChanged();
                    const isValid = this.onValidateSelectionContextually(resultingBlock);
                    if (!isValid) {
                        block.x += 30;
                        block.y += 30;
                        this.moveBlockToTopLevel(block.id);
                    }
                    this.onDataChanged();
                    this.render();
                    this.currentlyOpenedDropdownId = null;
                    let element = d3.select(`#${block.id}`);
                    element.raise();
                    // Traverse up until the immediate parent is the svg (whose id is "svg")
                    while (element.node().parentNode && element.node().parentNode.id !== "svg") {
                        element = d3.select(element.node().parentNode);
                    }
                    element.raise();
                });

            // Highlight rectangle
            optionGroup.append("rect")
                .attr("x", optionsPosition.x)
                .attr("y", optionY)
                .attr("width", optionsWidth)
                .attr("height", optionHeight)
                .attr("fill", "white")
                .attr("opacity", 0);

            // Option text
            optionGroup.append("text")
                .text(option)
                .attr("x", optionsPosition.x + horizontalPadding)
                .attr("y", optionY + (optionHeight * 0.5) + (optionBox.height * 0.5))
                .attr("fill", "white")
                .attr("font-size", `${labelFontSize}pt`)
                .attr("dy", "-0.15em")
                .attr('font-weight', isSelected ? 'bold' : 'normal')
                .style('user-select', 'none');

            // Hover effects remain the same
            optionGroup
                .on("mouseenter", function () {
                    d3.select(this).select("rect")
                        .attr("opacity", 0.2);
                    this.currentlyHoveredOptionIndex = index;
                })
                .on("mouseleave", function () {
                    d3.select(this).select("rect")
                        .attr("opacity", 0);
                    this.currentlyHoveredOptionIndex = null;
                });
        });

        dropdownGroup.on("click", (event) => {
            event.stopPropagation();
            event.preventDefault();
            const currentDisplay = optionsGroup.attr("display");
            optionsGroup.attr("display", currentDisplay === "none" ? "block" : "none");

            // Raise the top-level parent block when opening dropdown
            if (currentDisplay === "none") {
                // currentlyOpenedDropdownIdを設定
                this.currentlyOpenedDropdownId = dropdownId;
                // Start with the element that has the block's id
                let element = d3.select(`#${block.id}`);
                element.raise();
                // Traverse up until the immediate parent is the svg (whose id is "svg")
                while (element.node().parentNode && element.node().parentNode.id !== "grid") {
                    element = d3.select(element.node().parentNode);
                }
                element.raise();
            } else {
                this.currentlyOpenedDropdownId = null;
            }
        });

        dropdownGroup.on("mouseenter", () => {
            this.currentlyHoveredDropdownId = `dropdown-${count}-${block.id}`;
        })

        dropdownGroup.on("mouseleave", () => {
            this.currentlyHoveredDropdownId = null;
        })

        return (dropdownWidth + horizontalPadding);
    }

    renderAttachment(child, height, blockGroup, x) {
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

    /*ドラッグ関係の処理***********************************************************************************************************************************************************************************************************************************************************************************************************************/

    dragStart(event, d) {
        const id = `#${d.id}`
        d3.select(id)
            .raise()
            .classed("grab", false)
            .classed("grabbing", true);

        const frameId = `#frame-${d.id}`;
        d3.select(frameId)
            .attr("stroke", "yellow")
            .attr("stroke-width", highlightStrokeWidth);

        this.dragStartX = event.x;
        this.dragStartY = event.y;
        this.dragStartBlockX = d.x;
        this.dragStartBlockY = d.y;
    }

    dragging(event, d) {
        const dx = event.x - this.dragStartX;
        const dy = event.y - this.dragStartY;
        d.x = this.dragStartBlockX + dx;
        d.y = this.dragStartBlockY + dy;
        d3.select(`#${d.id}`).attr("transform", `translate(${d.x}, ${d.y})`);
    }

    dragEnd(event, d) {
        const id = `#${d.id}`
        d3.select(id).classed("grab", true).classed("grabbing", false);

        const frameId = `#frame-${d.id}`;
        const strokeColor = this.darkenColor(d.color, 30);
        d3.select(frameId)
            .attr("stroke", strokeColor)
            .attr("stroke-width", blockStrokeWidth);
    }

    /*幅・高さ・色の計算(できれば他に移動したい)***********************************************************************************************************************************************************************************************************************************************************************************************************************/

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

    calculateWidth(block) {
        const children = block.children.filter((child) => !child.hidden && !child.keepEmpty);
        const paddingNumber = children.length + 1;
        let width = 0;
        if (block.isRound && block.isRound === true) {
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

    calculateHeight(block) {
        const children = block.children.filter((child) => !child.hidden && !child.keepEmpty);
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