import { padding, blockCornerRadius, blockStrokeWidth, highlightStrokeWidth, placeholderWidth, placeholderHeight, placeholderCornerRadius, labelFontSize, dropdownHeight, horizontalPadding } from "./const.js";
import * as d3 from "d3";

export class Renderer {
    constructor(data, svg, onDataChanged, onValidateInsertion, onValidateAttachment, onValidateSelectionContextually) {
        this.data = data;
        this.onDataChanged = onDataChanged || (() => data);
        this.onValidateInsertion = onValidateInsertion || (() => true); // Default to always allow
        this.onValidateAttachment = onValidateAttachment || (() => true);
        this.onValidateSelectionContextually = onValidateSelectionContextually || (() => true); // Default to always allow

        this.dragStartBlockPosition = { x: 0, y: 0 };
        this.dragStartMousePosition = { x: 0, y: 0 };
        this.hasDragged = false;

        this.currentlyHoveredDropdownId = null;
        this.currentlyHoveredOptionIndex = null;
        this.currentlyOpenedDropdownId = null;

        this.svg = svg;

        this.svg.on("mousedown", () => {
            this.closeAllDropdowns();
        });

        this.renderGrid();
        this.render();
    }

    render() {
        d3.select("#grid").selectAll("*").remove();
        const blocks = this.data.blocks;
        blocks.forEach(blockData => {
            this.renderBlock(blockData, this.grid);
        });
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

    renderBlock(blockData, parent) {
        const width = this.calculateWidth(blockData);
        const height = this.calculateHeight(blockData);

        //グループを作成
        const blockGroup = parent.append("g")
            .attr("transform", `translate(${blockData.x}, ${blockData.y})`)
            .attr("id", blockData.id)
            .classed("grab", true).classed("grabbing", false)
            .datum(blockData)
            .call(d3.drag()
                .on("start", this.dragStart.bind(this))
                .on("drag", this.dragging.bind(this))
                .on("end", this.dragEnd.bind(this))
            );

        const r = blockCornerRadius;

        const rectPathData = `M 0 ${r}
                        a ${r} ${r} 0 0 1 ${r} ${-r} h ${width - 2 * r}
                        a ${r} ${r} 0 0 1 ${r} ${r} v ${height - 2 * r}
                        a ${r} ${r} 0 0 1 ${-r} ${r} h ${-(width - 2 * r)}
                        a ${r} ${r} 0 0 1 ${-r} ${-r} z`;

        let opacity = 1;
        if(blockData.isTransparent && blockData.isTransparent === true) {
            opacity = 0.5;
        }

        let actualCornerRadius = blockCornerRadius;
        if(blockData.isRound && blockData.isRound === true) {
            actualCornerRadius = height / 2;
        }

        //フレームを描画
        const strokeColor = this.darkenColor(blockData.color, 30);
        blockGroup.append("rect")
            .attr("d", rectPathData)
            .attr("id", `frame-${blockData.id}`)
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
        if(blockData.isRound && blockData.isRound === true) {
            x += horizontalPadding;
        }
        for (let count = 0; count < children.length; count++) {
            const child = children[count];
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
                        .attr("id", `placeholder-${count}-${blockData.id}-${child.id}`)
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

                const dropdownId = `dropdown-${count}-${blockData.id}`;

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
                    .attr("fill", blockData.color)
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
                        .attr("id", `option-${index}-dropdown-${count}-${blockData.id}`)
                        .on("click", (event) => {
                            event.stopPropagation();
                            event.preventDefault();
                            child.selected = index;
                            let resultingBlock = null;
                            for (const block of this.data.blocks) {
                                if (this.containsBlock(block, blockData.id)) {
                                    resultingBlock = block;
                                }
                            }
                            const isValid = this.onValidateSelectionContextually(resultingBlock);
                            if (!isValid) {
                                blockData.x += 30;
                                blockData.y += 30;
                                this.moveBlockToTopLevel(blockData.id);
                            }
                            this.render();
                            this.currentlyOpenedDropdownId = null;
                            let element = d3.select(`#${blockData.id}`);
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
                        let element = d3.select(`#${blockData.id}`);
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
                    this.currentlyHoveredDropdownId = `dropdown-${count}-${blockData.id}`;
                })

                dropdownGroup.on("mouseleave", () => {
                    this.currentlyHoveredDropdownId = null;
                })

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
        const children = blockData.children;
        const paddingNumber = children.length + 1;
        let width = 0;
        if(blockData.isRound && blockData.isRound === true) {
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
        const children = blockData.children;
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

    updateData() {
        const currentData = this.data;
        this.data = this.onDataChanged(currentData);
        this.render();
    }

    dragStart(event, d) {

        this.hasDragged = false;

        //UI上でも最前面に
        const id = `#${d.id}`
        d3.select(id)
            .raise()
            .classed("grab", false)
            .classed("grabbing", true);

        const frameId = `#frame-${d.id}`;
        d3.select(frameId)
            .attr("stroke", "yellow")
            .attr("stroke-width", highlightStrokeWidth);

        //ドラッグ開始地点を記録
        //this.dragStartBlockPosition = { x: d.x, y: d.y };
        const absoltuePosition = this.calculateAbsolutePosition(d.id);
        this.dragStartBlockPosition = absoltuePosition ? absoltuePosition : { x: d.x, y: d.y };
        const [startX, startY] = d3.pointer(event.sourceEvent, this.svg.node());
        this.dragStartMousePosition = { x: startX, y: startY };
    }

    dragging(event, d) {

        this.hasDragged = true;

        //ブロックを子でなくす
        this.moveBlockToTopLevel(d.id);
        this.render();

        //配列の最初に移動
        const blockDataIndex = this.data.blocks.findIndex(b => b.id === d.id);
        if (blockDataIndex !== -1) {
            const [draggedBlock] = this.data.blocks.splice(blockDataIndex, 1);
            this.data.blocks.push(draggedBlock);
            this.updateData();
        }

        const transform = d3.zoomTransform(this.svg.node());

        const id = `#${d.id}`
        d3.select(id)
            .raise()
            .classed("grab", false)
            .classed("grabbing", true);

        const frameId = `#frame-${d.id}`;
        d3.select(frameId)
            .attr("stroke", "yellow")
            .attr("stroke-width", highlightStrokeWidth);

        const [mouseX, mouseY] = d3.pointer(event.sourceEvent, this.svg.node());
        d.x = this.dragStartBlockPosition.x + (mouseX - this.dragStartMousePosition.x) / transform.k;
        d.y = this.dragStartBlockPosition.y + (mouseY - this.dragStartMousePosition.y) / transform.k;

        d3.select(id).attr("transform", `translate(${d.x}, ${d.y})`);

        const placeholderId = this.detectPlaceholderOverlap(d, d.x, d.y);
        const overlapInfo = this.detectBlockOverlap(d, d.x, d.y);

        if (placeholderId) {
            this.deemphasizeAllBlock();
            this.emphasizePlaceholder(placeholderId);
        } else {
            this.deemphasizeAllPlaceholder();
            if (overlapInfo && !placeholderId) {
                const targetBlockId = overlapInfo.id;
                this.emphasizeBlock(targetBlockId);
            } else {
                this.deemphasizeAllBlock();
            }
        }
    }

    dragEnd(event, d) {

        this.deemphasizeAllPlaceholder();
        this.deemphasizeAllBlock();
        this.render();

        if (!this.hasDragged) {
            this.hasDragged = false;
            if (this.currentlyHoveredDropdownId) {
                const dropdownElem = document.getElementById(this.currentlyHoveredDropdownId);
                if (dropdownElem) dropdownElem.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            }
            return;
        }

        this.hasDragged = false;

        const placeholderId = this.detectPlaceholderOverlap(d, d.x, d.y);
        const overlapInfo = this.detectBlockOverlap(d, d.x, d.y);
        if (placeholderId) {
            const info = placeholderId.split("-");
            const parentId = info[2];
            const index = info[1];
            this.moveBlockToParent(d.id, parentId, index);
            this.render();
        } else if (overlapInfo) {
            const targetBlockId = overlapInfo.id.split("-")[1];
            this.attachBlockToParent(d.id, targetBlockId, overlapInfo.side);
            this.render();
        }

        const id = `#${d.id}`
        d3.select(id).classed("grab", true).classed("grabbing", false);

        const frameId = `#frame-${d.id}`;
        const strokeColor = this.darkenColor(d.color, 30);
        d3.select(frameId)
            .attr("stroke", strokeColor)
            .attr("stroke-width", blockStrokeWidth);

        //配列の最初に移動
        const blockDataIndex = this.data.blocks.findIndex(b => b.id === d.id);
        if (blockDataIndex !== -1) {
            const [draggedBlock] = this.data.blocks.splice(blockDataIndex, 1);
            this.data.blocks.push(draggedBlock);
            this.updateData();
        }
    }

    detectPlaceholderOverlap(blockData, mouseX, mouseY) {
        const calculateOverlapArea = (rect1, rect2) => {
            const rect1Bounds = rect1.node().getBoundingClientRect();
            const rect2Bounds = rect2.node().getBoundingClientRect();
            const xOverlap = Math.max(0, Math.min(rect1Bounds.right, rect2Bounds.right) - Math.max(rect1Bounds.left, rect2Bounds.left));
            const yOverlap = Math.max(0, Math.min(rect1Bounds.bottom, rect2Bounds.bottom) - Math.max(rect1Bounds.top, rect2Bounds.top));
            return xOverlap * yOverlap;
        };
    
        const calculateCursorDistance = (rect, mouseX, mouseY) => {
            const rectBounds = rect.node().getBoundingClientRect();
            // If the mouse is inside the placeholder, the distance is 0.
            if (mouseX >= rectBounds.left && mouseX <= rectBounds.right &&
                mouseY >= rectBounds.top && mouseY <= rectBounds.bottom) {
                return 0;
            }
            // Otherwise, compute the distance to the center.
            const rectCenterX = rectBounds.left + rectBounds.width / 2;
            const rectCenterY = rectBounds.top + rectBounds.height / 2;
            return Math.sqrt(Math.pow(mouseX - rectCenterX, 2) + Math.pow(mouseY - rectCenterY, 2));
        };
    
        const placeholders = d3.selectAll("rect")
            .filter(function () {
                const id = d3.select(this).attr("id");
                return id && id.includes("placeholder");
            })
            .filter(function () {
                const excludedParent = d3.select(`#${blockData.id}`).node();
                return !excludedParent || !excludedParent.contains(this);
            })
            .nodes()
            .map(rect => rect.id)
            .reverse();
    
        const block = d3.select(`#frame-${blockData.id}`);
    
        let bestScore = Infinity;
        let bestPlaceholderId = null;
    
        placeholders.forEach(id => {
            const placeholder = d3.select(`#${id}`);
            const overlapArea = calculateOverlapArea(placeholder, block);
            if (overlapArea === 0) {
                // Skip placeholders that have no overlap.
                return;
            }
            const distance = calculateCursorDistance(placeholder, mouseX, mouseY);
            // Create a score that favors small distance and penalizes large overlap area.
            const score = distance / (overlapArea + 1);  // +1 avoids division by zero
    
            if (score < bestScore) {
                bestScore = score;
                bestPlaceholderId = id;
            }
        });
    
        if (bestPlaceholderId) {
            const info = bestPlaceholderId.split("-");
            const parentId = info[2];
            const index = info[1];
            const expectedBlock = this.predictMoveBlockToParent(blockData.id, parentId, index);
            const isValid = this.onValidateInsertion(expectedBlock);
            return isValid ? bestPlaceholderId : null;
        }
        return null;
    }

    detectBlockOverlap(blockData) {
        const calculateOverlapArea = (rect1, rect2) => {
            const rect1Bounds = rect1.node().getBoundingClientRect();
            const rect2Bounds = rect2.node().getBoundingClientRect();
            const xOverlap = Math.max(0, Math.min(rect1Bounds.right, rect2Bounds.right) - Math.max(rect1Bounds.left, rect2Bounds.left));
            const yOverlap = Math.max(0, Math.min(rect1Bounds.bottom, rect2Bounds.bottom) - Math.max(rect1Bounds.top, rect2Bounds.top));
            return xOverlap * yOverlap;
        };

        // Exclude descendants that are inserted as attachments or placeholders.
        const collectDescendantFrameIds = (block) => {
            let descendants = [];
            if (block.children) {
                block.children.forEach(child => {
                    if ((child.type === "attachment" || child.type === "placeholder") && child.content) {
                        descendants.push(`frame-${child.content.id}`);
                        descendants = descendants.concat(collectDescendantFrameIds(child.content));
                    }
                });
            }
            return descendants;
        };

        const descendantFrameIds = collectDescendantFrameIds(blockData);

        // Select all block frames except the dragged block's own frame and its descendant frames.
        const blockFrameIds = d3.selectAll("rect")
            .filter(function () {
                const id = d3.select(this).attr("id");
                return id && id.startsWith("frame-") &&
                    id !== `frame-${blockData.id}` &&
                    !descendantFrameIds.includes(id);
            })
            .nodes()
            .map(node => node.id);

        const draggedBlockRect = d3.select(`#frame-${blockData.id}`);

        let bestOverlapBlockId = null;
        let side = null;

        blockFrameIds.forEach(id => {
            const otherBlockRect = d3.select(`#${id}`);
            const overlapArea = calculateOverlapArea(otherBlockRect, draggedBlockRect);
            if (overlapArea > 0) {
                // Calculate left/right side.
                const overlappedBounds = otherBlockRect.node().getBoundingClientRect();
                const overlappedCenterX = overlappedBounds.left + overlappedBounds.width / 2;

                const draggedBounds = draggedBlockRect.node().getBoundingClientRect();
                const draggedCenterX = draggedBounds.left + draggedBounds.width / 2;

                const possibleSide = draggedCenterX >= overlappedCenterX ? "right" : "left";

                // Extract candidate block id from frame id ("frame-<blockId>")
                const info = id.split("-");
                const parentId = info[1];

                const expectedBlock = this.predictAttachBlockToParent(blockData.id, parentId, possibleSide);
                const isValid = this.onValidateAttachment(expectedBlock);

                if (isValid) {
                    bestOverlapBlockId = id;
                    side = possibleSide;
                }
            }
        });

        if (bestOverlapBlockId && side) return { id: bestOverlapBlockId, side: side };
        return null;
    }

    findBlock(blockId, blocks, offsetX = 0, offsetY = 0) {
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            if (block.id === blockId) {
                return;
            }
            if (block.children) {
                for (let j = 0; j < block.children.length; j++) {
                    const child = block.children[j];
                    if (child.type === "placeholder") {
                        const content = child.content;
                        if (content) {
                            if (content.id === blockId) {
                                blockToMove = content;
                                parentBlock = block;
                                childIndex = j;
                                // Calculate absolute position
                                absoluteX = offsetX + block.x + content.x;
                                absoluteY = offsetY + block.y + content.y;
                                return;
                            } else {
                                findBlock(blockId, [content], offsetX + block.x, offsetY + block.y);
                            }
                        }
                    }
                }
            }
        }
    }

    moveBlockToTopLevel(blockId) {
        let blockToMove = null;
        let parentBlock = null;
        let childIndex = -1;
        let absoluteX = 0;
        let absoluteY = 0;

        function findBlock(blocks, offsetX = 0, offsetY = 0) {
            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i];
                if (block.id === blockId) {
                    return;
                }
                if (block.children) {
                    for (let j = 0; j < block.children.length; j++) {
                        const child = block.children[j];
                        if (child.type === "placeholder" || child.type === "attachment") {
                            const content = child.content;
                            if (content) {
                                if (content.id === blockId) {
                                    blockToMove = content;
                                    parentBlock = block;
                                    childIndex = j;
                                    // Calculate absolute position
                                    absoluteX = offsetX + block.x + content.x;
                                    absoluteY = offsetY + block.y + content.y;
                                    return;
                                } else {
                                    findBlock([content], offsetX + block.x, offsetY + block.y);
                                }
                            }
                        }
                    }
                }
            }
        }

        // Find the block to move
        findBlock(this.data.blocks);

        // If the block is found and it has a parent, remove it from the parent's children
        if (blockToMove && parentBlock !== null && childIndex !== -1) {
            const child = parentBlock.children[childIndex];
            if (child.type === "placeholder") {
                parentBlock.children[childIndex].content = null;
            } else if (child.type === "attachment") {
                parentBlock.children.splice(childIndex, 1);
            }
        }

        // If the block is found, update its coordinates and add it to the top level of the blocks array
        if (blockToMove) {
            blockToMove.x = absoluteX;
            blockToMove.y = absoluteY;
            this.data.blocks.push(blockToMove);
            this.updateData();
        }
    }

    // 実際にデータを変更(ブロックを挿入)する
    moveBlockToParent(blockId, parentId, index) {
        let blockToMove = null;
        let currentParent = null;
        let currentChildIndex = -1;
        let targetParent = null;

        // Helper function to recursively search for a block and its parent,
        // traversing both placeholders and attachments.
        function findBlockAndParent(blocks, parent = null) {
            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i];
                if (block.id === blockId) {
                    blockToMove = block;
                    currentParent = parent;
                    currentChildIndex = i;
                }
                if (block.id === parentId) {
                    targetParent = block;
                }
                if (block.children) {
                    for (let j = 0; j < block.children.length; j++) {
                        const child = block.children[j];
                        if ((child.type === "placeholder" || child.type === "attachment") && child.content) {
                            findBlockAndParent([child.content], block);
                        }
                    }
                }
            }
        }

        findBlockAndParent(this.data.blocks);

        // Remove the block from its current location.
        if (blockToMove && currentParent !== null) {
            const child = currentParent.children[currentChildIndex];
            if (child.type === "placeholder") {
                currentParent.children[currentChildIndex].content = null;
            } else if (child.type === "attachment") {
                currentParent.children.splice(currentChildIndex, 1);
            }
        } else if (blockToMove) {
            // If the block is at the top level, remove it from the blocks array.
            const topLevelIndex = this.data.blocks.findIndex(b => b.id === blockId);
            if (topLevelIndex !== -1) {
                this.data.blocks.splice(topLevelIndex, 1);
            }
            this.updateData();
        }

        // Insert the block into the target parent's children array.
        if (targetParent) {
            if (!targetParent.children) {
                targetParent.children = [];
            }
            // If the target slot exists, and it's a placeholder, fill its content.
            if (targetParent.children[index]) {
                if (targetParent.children[index].type === "placeholder") {
                    targetParent.children[index].content = blockToMove;
                } else if (targetParent.children[index].type === "attachment") {
                    // For attachments, insert a new placeholder at the desired index.
                    targetParent.children.splice(index, 0, { type: "placeholder", content: blockToMove });
                }
            } else {
                // If no child exists at that index, create a new placeholder child.
                targetParent.children.splice(index, 0, { type: "placeholder", content: blockToMove });
            }
        }
    }

    calculateAbsolutePosition(blockId, blocks = this.data.blocks, offsetX = 0, offsetY = 0) {
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];

            // If the current block is the one we're looking for:
            if (block.id === blockId) {
                return { x: offsetX + block.x, y: offsetY + block.y };
            }

            // If the block has children, iterate over them:
            if (block.children) {
                for (let j = 0; j < block.children.length; j++) {
                    const child = block.children[j];

                    // Only process placeholders and attachments that contain a "content" block.
                    if (child.type === "placeholder" || child.type === "attachment") {
                        const content = child.content;
                        if (content) {
                            // If this child block is the one we're looking for,
                            // calculate its absolute position.
                            if (content.id === blockId) {
                                return { x: offsetX + block.x + content.x, y: offsetY + block.y + content.y };
                            } else {
                                // Otherwise, search within this child block recursively.
                                const result = this.calculateAbsolutePosition(blockId, [content], offsetX + block.x, offsetY + block.y);
                                if (result) {
                                    return result;
                                }
                            }
                        }
                    }
                }
            }
        }
        // Return null if no block with the given ID was found.
        return null;
    }

    // 挿入後のデータを予測する(データを実際には変更しない)
    predictMoveBlockToParent(blockId, parentId, index) {
        const newBlocks = JSON.parse(JSON.stringify(this.data.blocks));

        let blockToMove = null;
        let currentParent = null;
        let currentChildIndex = -1;
        let targetParent = null;

        // Helper function to recursively search for a block and its parent,
        // traversing both placeholders and attachments.
        function findBlockAndParent(blocks, parent = null) {
            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i];
                if (block.id === blockId) {
                    blockToMove = block;
                    currentParent = parent;
                    currentChildIndex = i;
                }
                if (block.id === parentId) {
                    targetParent = block;
                }
                if (block.children) {
                    for (let j = 0; j < block.children.length; j++) {
                        const child = block.children[j];
                        if ((child.type === "placeholder" || child.type === "attachment") && child.content) {
                            findBlockAndParent([child.content], block);
                        }
                    }
                }
            }
        }

        findBlockAndParent(newBlocks);

        // Remove the block from its current location
        if (blockToMove && currentParent !== null) {
            const child = currentParent.children[currentChildIndex];
            if (child.type === "placeholder") {
                currentParent.children[currentChildIndex].content = null;
            } else if (child.type === "attachment") {
                currentParent.children.splice(currentChildIndex, 1);
            }
        } else if (blockToMove) {
            // The block is at the top level
            const topLevelIndex = newBlocks.findIndex(b => b.id === blockId);
            if (topLevelIndex !== -1) {
                newBlocks.splice(topLevelIndex, 1);
            }
        }

        // Insert the block into the target parent's children
        if (targetParent) {
            if (!targetParent.children) {
                targetParent.children = [];
            }
            // If a child exists at the given index, handle according to its type
            if (targetParent.children[index]) {
                if (targetParent.children[index].type === "placeholder") {
                    targetParent.children[index].content = blockToMove;
                } else if (targetParent.children[index].type === "attachment") {
                    // Insert a new placeholder at the desired index for the moved block
                    targetParent.children.splice(index, 0, { type: "placeholder", content: blockToMove });
                }
            } else {
                // If no child exists at that index, create a new placeholder child.
                targetParent.children.splice(index, 0, { type: "placeholder", content: blockToMove });
            }
        }

        // Find and return the top-level block that contains the moved block
        for (const block of newBlocks) {
            if (this.containsBlock(block, blockId)) {
                return block;
            }
        }
        return null;
    }

    // 実際にデータを変更(アタッチ)する
    attachBlockToParent(blockId, parentId, side) {
        let blockToMove = null;
        let currentParent = null;
        let currentChildIndex = -1;
        let targetParent = null;

        // Helper function to recursively search for the block and its parent
        function findBlockAndParent(blocks, parent = null) {
            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i];
                if (block.id === blockId) {
                    blockToMove = block;
                    currentParent = parent;
                    currentChildIndex = i;
                }
                if (block.id === parentId) {
                    targetParent = block;
                }
                if (block.children) {
                    for (let j = 0; j < block.children.length; j++) {
                        const child = block.children[j];
                        if (child.type === "placeholder" || child.type === "attachment") {
                            if (child.content) {
                                findBlockAndParent([child.content], block);
                            }
                        }
                    }
                }
            }
        }

        findBlockAndParent(this.data.blocks);

        // Remove the block from its current location
        if (blockToMove && currentParent !== null) {
            currentParent.children[currentChildIndex].content = null;
        } else if (blockToMove) {
            // If the block is at the top level, remove it from the blocks array
            const topLevelIndex = this.data.blocks.findIndex(b => b.id === blockId);
            if (topLevelIndex !== -1) {
                this.data.blocks.splice(topLevelIndex, 1);
            }
        }

        // Create the attachment child
        const attachmentChild = {
            id: "attachment",
            type: "attachment",
            side: side, // "left" or "right"
            content: blockToMove
        };

        // Insert the attachment into the target parent's children array
        if (targetParent) {
            if (!targetParent.children) {
                targetParent.children = [];
            }
            if (side === "left") {
                targetParent.children.unshift(attachmentChild);
            } else {
                targetParent.children.push(attachmentChild);
            }
        }
    }

    // アタッチ後のデータを予測する(データを実際には変更しない)
    predictAttachBlockToParent(blockId, parentId, side) {
        const newBlocks = JSON.parse(JSON.stringify(this.data.blocks));

        let blockToMove = null;
        let currentParent = null;
        let currentChildIndex = -1;
        let targetParent = null;

        // Recursively find the block to move and its parent, as well as the target parent.
        function findBlockAndParent(blocks, parent = null) {
            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i];
                if (block.id === blockId) {
                    blockToMove = block;
                    currentParent = parent;
                    currentChildIndex = i;
                }
                if (block.id === parentId) {
                    targetParent = block;
                }
                if (block.children) {
                    for (let j = 0; j < block.children.length; j++) {
                        const child = block.children[j];
                        if ((child.type === "placeholder" || child.type === "attachment") && child.content) {
                            findBlockAndParent([child.content], block);
                        }
                    }
                }
            }
        }

        findBlockAndParent(newBlocks);

        // Remove the block from its current location.
        if (blockToMove && currentParent !== null) {
            const child = currentParent.children[currentChildIndex];
            if (child.type === "placeholder") {
                currentParent.children[currentChildIndex].content = null;
            } else if (child.type === "attachment") {
                currentParent.children.splice(currentChildIndex, 1);
            }
        } else if (blockToMove) {
            const topLevelIndex = newBlocks.findIndex(b => b.id === blockId);
            if (topLevelIndex !== -1) {
                newBlocks.splice(topLevelIndex, 1);
            }
        }

        // Create the attachment child.
        const attachmentChild = {
            id: "attachment",
            type: "attachment",
            side: side, // "left" or "right"
            content: blockToMove
        };

        // Insert the attachment into the target parent's children array.
        if (targetParent) {
            if (!targetParent.children) {
                targetParent.children = [];
            }
            if (side === "left") {
                targetParent.children.unshift(attachmentChild);
            } else {
                targetParent.children.push(attachmentChild);
            }
        }

        // Helper function to check if a block contains the moved block.
        function containsBlock(block, id) {
            if (block.id === id) return true;
            if (block.children) {
                for (const child of block.children) {
                    if (child.content && containsBlock(child.content, id)) {
                        return true;
                    }
                }
            }
            return false;
        }

        // Return the top-level block that contains the moved block.
        for (const block of newBlocks) {
            if (containsBlock(block, blockId)) {
                return block;
            }
        }
        return null;
    }

    // あるブロックが含まれているかを確かめる
    containsBlock(block, id) {
        if (block.id === id) {
            return true;
        }
        if (block.children) {
            for (const child of block.children) {
                if (child.content && this.containsBlock(child.content, id)) {
                    return true;
                }
            }
        }
        return false;
    }

    deemphasizeAllPlaceholder() {
        d3.selectAll("rect")
            .filter(function () {
                return this.id.includes("placeholder");
            })
            .attr("stroke-width", 0);
    }

    emphasizePlaceholder(id) {
        this.deemphasizeAllPlaceholder();
        d3.select(`#${id}`).attr("stroke-width", highlightStrokeWidth).attr("stroke", "yellow");
    }

    deemphasizeAllBlock() {
        d3.selectAll("rect")
            .filter(function () {
                const id = d3.select(this).attr("id");
                // Only consider frames, and exclude those whose parent group has class "grabbing"
                const parentGroup = d3.select(this.parentNode);
                return id && id.startsWith("frame-") && !parentGroup.classed("grabbing");
            })
            .each((d, i, nodes) => {
                const rect = d3.select(nodes[i]);
                // Retrieve the block data from the parent group which holds the block's datum
                const parentGroup = d3.select(rect.node().parentNode);
                const blockData = parentGroup.datum();
                if (blockData) {
                    const strokeColor = this.darkenColor(blockData.color, 30);
                    rect.attr("stroke", strokeColor)
                        .attr("stroke-width", blockStrokeWidth);
                }
            });
    }

    emphasizeBlock(id) {
        this.deemphasizeAllBlock();
        d3.select(`#${id}`).attr("stroke-width", highlightStrokeWidth).attr("stroke", "yellow");
    }

    closeAllDropdowns() {
        d3.selectAll(".dropdown-options").attr("display", "none");
        this.currentlyOpenedDropdownId = null;
        this.currentlyHoveredOptionIndex = null;
    }
}