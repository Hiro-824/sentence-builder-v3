/* eslint-disable @typescript-eslint/no-unused-vars */
import { Converter } from "@/grammar/converter";
import { Grammar } from "@/grammar/grammar";
import { padding, blockCornerRadius, blockStrokeWidth, highlightStrokeWidth, placeholderWidth, placeholderHeight, placeholderCornerRadius, labelFontSize, dropdownHeight, horizontalPadding, bubbleColor, blockListSpacing, blockListFontSize, scrollMomentumExtent, sidebarPadding } from "./const.js";
import * as d3 from "d3";

export class Renderer {
    constructor(blocks, blockList, svg) {
        this.blocks = blocks;
        this.blockList = blockList;
        this.svg = svg;
        this.sideBarScrollExtent = 0;
        this.viewportHeight = window.innerHeight
        this.converter = new Converter;
        this.grammar = new Grammar;
        // Update translation for all initial blocks
        this.blocks.forEach(block => this.updateBlockTranslation(block));
        this.render();
    }

    generateRandomId() {
        return "b" + crypto.randomUUID().replaceAll(/-/g, '');
    }

    /*レンダリング処理***********************************************************************************************************************************************************************************************************************************************************************************************************************/

    render() {
        this.renderGrid();
        this.renderSideBar();
        this.renderDragboard();
        this.renderBlocks();
    }

    renderGrid() {
        const width = 1440;
        const height = this.viewportHeight;

        this.grid = this.svg.append("g").attr("id", "grid");

        this.svg.on("mousedown", () => {
            this.closeAllDropdowns();
        });

        const zoom = d3.zoom()
            .scaleExtent(
                [0.2, 1.5],
            )
            .translateExtent([[-width * 4, -height * 4], [width * 4, height * 4]])
            .on("zoom", (event) => {
                this.grid.attr("transform", event.transform);
                this.dragboard.attr("transform", event.transform);
                this.setBlockBoardTransform();
            })
            .filter(event => !event.type.includes('dblclick'));

        this.svg.call(zoom).on("wheel", (event) => {
            event.preventDefault();
        }, { passive: false });

        //Initial Zoom Level
        const initialTransform = d3.zoomIdentity.translate(0, 0).scale(0.5);
        d3.select("svg").transition().duration(300).call(zoom.transform, initialTransform);
    }

    renderDragboard() {
        this.dragboard = this.svg.append("g").attr("id", "dragboard");
    }

    renderBlocks() {
        d3.select("#grid").selectAll("*").remove();
        d3.select("#dragboard").selectAll("*").remove();
        this.blocks.forEach(block => {
            this.renderBlock(block, this.grid);
        });
    }

    renderBlock(block, parent, fromSideBar = false, sideBarId = undefined) {
        // Update translation before rendering
        this.updateBlockTranslation(block);
        const blockGroup = parent.append("g")
            .attr("transform", `translate(${block.x}, ${block.y})`)
            .attr("id", block.id)
            .classed("grab", true).classed("grabbing", false)
            .datum(block)
            .call(d3.drag()
                .container(this.grid.node())
                .on("start", (event, d) => this.dragStart(event, d, fromSideBar, sideBarId))
                .on("drag", (event, d) => this.dragging(event, d, fromSideBar, sideBarId))
                .on("end", this.dragEnd.bind(this))
            );

        this.renderBlockImage(block, blockGroup);
    }

    updateBlock(id) {
        const foundResult = this.findBlock(id);
        // Update translation for the root parent before rendering
        this.updateBlockTranslation(foundResult.rootParent);
        const parentUI = d3.select(`#${foundResult.rootParent.id}`);
        const parentContainer = d3.select(parentUI.node().parentNode);
        parentUI.remove();
        this.renderBlock(foundResult.rootParent, parentContainer);
    }

    raiseBlock(id) {
        const block = d3.select(`#${id}`);
        block.raise();
        const parent = d3.select(`#${this.findBlock(id).rootParent.id}`);
        parent.raise();
    }

    closeAllDropdowns() {
        d3.selectAll(".dropdown-options").attr("display", "none");
        this.currentlyOpenedDropdownId = null;
        this.currentlyHoveredOptionIndex = null;
    }

    /*サイドバーの描画***********************************************************************************************************************************************************************************************************************************************************************************************************************/

    renderSideBar() {
        // Clear existing sidebar content
        d3.select("#sidebar").selectAll("*").remove();

        const width = this.calculateSideBarWidth();
        const height = this.viewportHeight;

        this.sidebar = this.svg.append("g")
            .attr("id", "sidebar")
            .attr("transform", `translate(0, 0)`);

        // Add the sidebar background
        this.sidebar.append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("fill", "#f5f5f5")
            .on("mousedown", (event) => {
                event.stopPropagation();
            });

        this.renderSideBarContent();
        this.enableSideBarScroll();
    }

    calculateSideBarWidth() {
        let maxWidth = 0;
        Object.values(this.blockList).forEach(blockArray => {
            blockArray.forEach(block => {
                const width = this.calculateWidth(block);
                maxWidth = Math.max(maxWidth, width);
            });
        });
        // Add padding for the sidebar
        return maxWidth + sidebarPadding.right + sidebarPadding.left * 2;
    }

    renderSideBarContent() {
        this.sidebarContent = this.sidebar.append("g").attr("transform", `translate(${sidebarPadding.left}, 0)`)
        this.blockBoard = this.sidebarContent.append("g");
        let y = sidebarPadding.top;
        Object.entries(this.blockList).forEach(([groupName, blockArray], groupIndex) => {
            this.blockBoard.append("text")
                .text(groupName)
                .attr("y", y)
                .attr('font-size', `${blockListFontSize}pt`)
                .style('user-select', 'none')
                .style("font-weight", "bold")
                .style("margin-bottom", "0.5rem");

            y += 40;

            blockArray.forEach((block) => {
                y += blockListSpacing + this.renderSideBarBlock(block, this.generateRandomId(), y);
            });

            y += sidebarPadding.bottom;
        });
        this.sideBarContentHeight = y;
        this.setBlockBoardTransform();
    }

    enableSideBarScroll() {
        // PC
        this.sidebar.node().addEventListener(
            'wheel',
            (event) => {
                event.stopPropagation();
                this.sideBarScrollExtent -= event.deltaY;
                this.setBlockBoardTransform();
            },
            { passive: false, capture: true }
        );

        // Mobile
        let touchStartY = 0;
        let isScrolling = false;
        let lastTouchY = 0;
        let lastTouchTime = 0;
        let velocity = 0;
        let animationFrameId = null;

        const applyMomentum = () => {
            if (Math.abs(velocity) < 0.1) {
                velocity = 0;
                cancelAnimationFrame(animationFrameId);
                return;
            }

            this.sideBarScrollExtent -= velocity;
            this.setBlockBoardTransform();

            // Apply deceleration
            velocity *= 0.95;

            animationFrameId = requestAnimationFrame(applyMomentum);
        };

        this.sidebar.node().addEventListener('touchstart', (event) => {
            touchStartY = event.touches[0].clientY;
            lastTouchY = touchStartY;
            lastTouchTime = Date.now();
            isScrolling = true;
            velocity = 0;
            cancelAnimationFrame(animationFrameId);
            event.preventDefault();
            event.stopPropagation();
        }, { passive: false });

        this.sidebar.node().addEventListener('touchmove', (event) => {
            if (!isScrolling) return;

            const touchY = event.touches[0].clientY;
            const currentTime = Date.now();
            const deltaTime = currentTime - lastTouchTime;

            if (deltaTime > 0) {
                // Calculate velocity (pixels per millisecond)
                velocity = scrollMomentumExtent * (lastTouchY - touchY) / deltaTime;
            }

            const deltaY = touchStartY - touchY;
            touchStartY = touchY;
            lastTouchY = touchY;
            lastTouchTime = currentTime;

            this.sideBarScrollExtent -= deltaY;
            this.setBlockBoardTransform();
            event.preventDefault();
            event.stopPropagation();
        }, { passive: false });

        this.sidebar.node().addEventListener('touchend', (event) => {
            isScrolling = false;
            // Start momentum scrolling if there's significant velocity
            if (Math.abs(velocity) > 0.1) {
                animationFrameId = requestAnimationFrame(applyMomentum);
            }
            event.preventDefault();
            event.stopPropagation();
        }, { passive: false });
    }

    setBlockBoardTransform() {
        const zoomExtent = d3.zoomTransform(this.grid.node()).k;
        this.sideBarScrollExtent = Math.max(-(this.sideBarContentHeight * zoomExtent - this.viewportHeight), this.sideBarScrollExtent);
        this.sideBarScrollExtent = Math.min(0, this.sideBarScrollExtent);
        if (this.blockBoard) {
            // Adjust scroll extent based on zoom change
            if (this.previousZoomExtent) {
                const zoomRatio = zoomExtent / this.previousZoomExtent;
                this.sideBarScrollExtent *= zoomRatio;
            }
            this.blockBoard.attr("transform", `translate(0, ${this.sideBarScrollExtent}), scale(${zoomExtent})`);
        }
        // Update sidebar width when zooming
        const newWidth = this.calculateSideBarWidth() * zoomExtent;
        d3.select("#sidebar rect").attr("width", newWidth);
        this.previousZoomExtent = zoomExtent;
    }

    renderSideBarBlock(block, id, y) {
        // グループを作る
        const previewBlockGroup = this.blockBoard
            .append("g")
            .attr("transform", `translate(0, ${y})`)
            .attr("id", id)
            .datum(block);

        // ダミー用に、idを変えたデータを用意
        const dummyData = JSON.parse(JSON.stringify(block));
        dummyData.id = "dummy-" + block.id;
        dummyData.x = 0;
        dummyData.y = 0;
        const dummy = previewBlockGroup.append("g");
        this.renderBlockImage(dummyData, dummy); // インタラクティブでないダミー(画像だけ)をレンダリング

        // 実際のブロックデータを用意
        this.renderPreviewBlock(id);

        return this.calculateHeight(block);
    }

    renderPreviewBlock(id) {
        const previewBlockGroup = d3.select(`#${id}`);
        const block = previewBlockGroup.datum();
        const realData = JSON.parse(JSON.stringify(block));
        realData.id = this.generateRandomId();
        realData.x = 0;
        realData.y = 0;
        this.renderBlock(realData, previewBlockGroup, true, id);
    }

    /*ブロックの画像の描画***********************************************************************************************************************************************************************************************************************************************************************************************************************/

    renderBlockImage(block, blockGroup) {
        blockGroup.selectAll("*").remove();
        const width = this.calculateWidth(block);
        const height = this.calculateHeight(block);
        const strokeColor = this.darkenColor(block.color, 30);
        const actualCornerRadius = block.isRound ? height / 2 : blockCornerRadius;

        // Render translation bubble if this is a top-level block (parent is grid)
        if (blockGroup.node().parentNode && blockGroup.node().parentNode.id === "grid") {
            this.renderTranslationBubble(block, blockGroup, width, height);
        }

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

        const children = block.children.filter(c => !c.hidden);
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

        return { width: width, height: height };
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

        const dropdownGroup = blockGroup.append("g").classed("pointer", true);
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
                .on("mousedown", () => {
                    child.selected = index;
                    this.setChildVisibility(block.id);
                    this.updateBlock(block.id);
                    this.raiseBlock(block.id);
                    // After updating, validate the block
                    const parentBlock = this.findBlock(block.id).rootParent;
                    const isValid = this.validate(parentBlock);
                    if (!isValid) {
                        this.moveBlockToTopLevel(block.id);
                    }
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

            dropdownGroup.on("click", () => {
                const currentDisplay = optionsGroup.attr("display");
                if (currentDisplay === "none") {
                    this.closeAllDropdowns();
                }
                optionsGroup.attr("display", currentDisplay === "none" ? "block" : "none");
                this.raiseBlock(block.id);
                dropdownGroup.raise();
            });
        });

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
            return (childWidth + horizontalPadding);
        }
    }

    renderTranslationBubble(block, blockGroup, width, height) {
        // Only render if translation exists
        if (!block.translation) return;

        // Calculate text box
        const box = this.calculateTextHeightAndWidth(block.translation);
        const bubbleWidth = box.width + padding * 10;
        const bubbleHeight = box.height + padding * 10;
        const bubbleY = -(bubbleHeight + 10);

        const blockCenterX = width / 2;
        const bubbleX = blockCenterX - (bubbleWidth / 2);

        // Bubble background
        blockGroup.append("rect")
            .attr("id", `bubble-${block.id}`)
            .attr("opacity", 0.5)
            .attr("width", bubbleWidth)
            .attr("height", bubbleHeight)
            .attr("x", bubbleX)
            .attr("y", bubbleY)
            .attr("fill", bubbleColor)
            .attr("rx", blockCornerRadius)
            .attr("ry", blockCornerRadius)
            .attr("pointer-events", "none");

        // Bubble text
        blockGroup.append("text")
            .text(block.translation)
            .attr("x", blockCenterX)
            .attr("y", bubbleY + (bubbleHeight / 2))
            .attr('fill', 'white')
            .attr('font-size', `${labelFontSize}pt`)
            .attr('font-weight', 'bold')
            .attr('dy', '0.35em')
            .attr('text-anchor', 'middle')
            .style('user-select', 'none');
    }

    /*ドラッグ関係の処理***********************************************************************************************************************************************************************************************************************************************************************************************************************/

    dragStart(event, d, fromSideBar = false, sideBarId = undefined) {
        if (fromSideBar) {
            this.renderPreviewBlock(sideBarId);
        }
        this.grabbingCursor(d.id, true);
        this.dragStarted = false;
    }

    dragging(event, d, fromSideBar = false) {
        if (!this.dragStarted) {

            if (fromSideBar) {
                this.blocks.push(d);
                const blockRect = d3.select(`#${d.id}`).node().getBoundingClientRect();
                const sideBarX = blockRect.left;
                const sideBarY = blockRect.top;
                const transform = d3.zoomTransform(this.grid.node());
                const gridX = (sideBarX - transform.x) / transform.k;
                const gridY = (sideBarY - transform.y) / transform.k;
                d.x = gridX;
                d.y = gridY;
            }

            this.moveBlockToTopLevel(d.id);
            this.moveBlockToDragboard(d.id);
            this.grabbingHighlight(d.id, true);

            this.dragStartX = event.x;
            this.dragStartY = event.y;
            this.dragStartBlockX = d.x;
            this.dragStartBlockY = d.y;

            d3.select(`#${d.id}`).attr("transform", `translate(${d.x}, ${d.y})`);

            this.dragStarted = true;
        } else {
            const dx = event.x - this.dragStartX;
            const dy = event.y - this.dragStartY;
            d.x = this.dragStartBlockX + dx;
            d.y = this.dragStartBlockY + dy;
            d3.select(`#${d.id}`).attr("transform", `translate(${d.x}, ${d.y})`);
            this.detectOverlapAndHighlight(d);
        }
    }

    dragEnd(event, d) {
        this.grabbingCursor(d.id, false);
        if (!this.dragStarted) return;
        this.dragStarted = false;
        this.grabbingHighlight(d.id, false);

        const placeholderId = this.detectPlaceholderOverlap(d, d.x, d.y);
        const overlapInfo = this.detectBlockOverlap(d);

        if (placeholderId) {
            const info = placeholderId.split("-");
            const parentId = info[2];
            const index = info[1];
            this.insertBlock(d.id, parentId, index);
        } else if (overlapInfo) {
            const targetBlockId = overlapInfo.id.split("-")[1];
            this.attachBlock(d.id, targetBlockId, overlapInfo.side)
        } else {
            this.moveBlockToGrid(d.id);
        }

        this.updateBlock(d.id);
    }

    /*当たり判定***********************************************************************************************************************************************************************************************************************************************************************************************************************/

    detectOverlapAndHighlight(d) {
        const placeholderId = this.detectPlaceholderOverlap(d, d.x, d.y);
        const overlapInfo = this.detectBlockOverlap(d);

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
            .filter(function () {
                // Exclude placeholders in the sidebar
                const parentGroup = d3.select(this.parentNode);
                return !parentGroup.node().closest("#sidebar");
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
            const expectedBlock = this.previewInsertion(blockData.id, parentId, index);
            /*console.log("BLOCK", expectedBlock);
            console.log("SUB-PHRASE-INPUT", this.converter.convert(expectedBlock));*/
            const isValid = this.validate(expectedBlock);
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
            .filter(function () {
                // Exclude blocks in the sidebar
                const parentGroup = d3.select(this.parentNode);
                return !parentGroup.node().closest("#sidebar");
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

                const expectedBlock = this.previewAttachment(blockData.id, parentId, possibleSide);
                const isValid = this.validate(expectedBlock);

                if (isValid) {
                    bestOverlapBlockId = id;
                    side = possibleSide;
                }
            }
        });

        if (bestOverlapBlockId && side) return { id: bestOverlapBlockId, side: side };
        return null;
    }

    /*階層構造に関する処理***********************************************************************************************************************************************************************************************************************************************************************************************************************/

    // 変更しない
    findBlock(id) {
        let foundBlock = null;
        let parentBlock = null;
        let childIndex = -1;
        let absoluteX = 0;
        let absoluteY = 0;
        let rootParent = null;

        function searchRecursively(blocks, offsetX = 0, offsetY = 0, candidateRoot = null) {
            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i];
                const currentRoot = candidateRoot === null ? block : candidateRoot;

                if (block.id === id) {
                    foundBlock = block;
                    rootParent = currentRoot;
                    absoluteX = offsetX + block.x;
                    absoluteY = offsetY + block.y;
                    return true;
                }

                if (block.children) {
                    for (let j = 0; j < block.children.length; j++) {
                        const child = block.children[j];
                        if (child.type === "placeholder" || child.type === "attachment") {
                            const content = child.content;
                            if (content) {
                                // direct hit on the content node
                                if (content.id === id) {
                                    foundBlock = content;
                                    parentBlock = block;
                                    childIndex = j;
                                    rootParent = currentRoot;
                                    absoluteX = offsetX + block.x + content.x;
                                    absoluteY = offsetY + block.y + content.y;
                                    return true;
                                }
                                // or keep recursing deeper
                                if (searchRecursively(
                                    [content],
                                    offsetX + block.x,
                                    offsetY + block.y,
                                    currentRoot
                                )) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            return false;
        }

        // start from the top-level blocks, with no candidate root
        searchRecursively(this.blocks, 0, 0, null);

        return {
            foundBlock,
            parentBlock,
            childIndex,
            absoluteX,
            absoluteY,
            rootParent    // ← now returned
        };
    }

    previewInsertion(id, targetParentId, index) {
        const foundResult = this.findBlock(id);
        if (!foundResult.foundBlock) return;

        const targetParentResult = this.findBlock(targetParentId);
        const targetParent = targetParentResult.foundBlock;
        if (!targetParent || !targetParent.children[index] || targetParent.children[index].type !== "placeholder") return;

        // Create a deep copy of the root parent block
        const expectedParent = JSON.parse(JSON.stringify(targetParentResult.rootParent));

        // Find the target parent in the copied structure and update its children
        const updateParentInCopy = (block) => {
            if (block.id === targetParent.id) {
                block.children[index].content = foundResult.foundBlock;
                return true;
            }
            if (block.children) {
                for (const child of block.children) {
                    if (child.type === "placeholder" || child.type === "attachment") {
                        if (child.content && updateParentInCopy(child.content)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };

        updateParentInCopy(expectedParent);
        return expectedParent;
    }

    previewAttachment(id, targetParentId, side) {
        const foundResult = this.findBlock(id);
        if (!foundResult.foundBlock) return;

        const targetParentResult = this.findBlock(targetParentId);
        const targetParent = targetParentResult.foundBlock;
        if (!targetParent) return;

        const attachmentChild = {
            id: "attachment",
            type: "attachment",
            side: side,
            content: foundResult.foundBlock
        };

        // Create a deep copy of the root parent block
        const expectedParent = JSON.parse(JSON.stringify(targetParentResult.rootParent));

        // Find the target parent in the copied structure and update its children
        const updateParentInCopy = (block) => {
            if (block.id === targetParent.id) {
                if (side === "left") {
                    block.children.unshift(attachmentChild);
                } else {
                    block.children.push(attachmentChild);
                }
                return true;
            }
            if (block.children) {
                for (const child of block.children) {
                    if (child.type === "placeholder" || child.type === "attachment") {
                        if (child.content && updateParentInCopy(child.content)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };

        updateParentInCopy(expectedParent);
        return expectedParent;
    }

    // データを変更する
    removeBlock(id) {
        const foundResult = this.findBlock(id);
        if (!foundResult.foundBlock) return;
        if (foundResult.parentBlock) {
            this.removeBlockFromParent(foundResult.parentBlock, foundResult.childIndex);
        } else {
            this.removeBlockFromTopLevel(id);
        }
    }

    removeBlockFromParent(parent, index) {
        const child = parent.children[index];
        if (child.type === "placeholder") {
            parent.children[index].content = null;
        } else if (child.type === "attachment") {
            parent.children.splice(index, 1);
        }
    }

    removeBlockFromTopLevel(id) {
        this.blocks = this.blocks.filter(b => b.id !== id);
    }

    updateBlockInData(newBlock) {
        const foundResult = this.findBlock(newBlock.id);
        if (!foundResult.foundBlock) return;

        if (foundResult.parentBlock) {
            foundResult.parentBlock.children[foundResult.childIndex].content = newBlock;
        } else {
            const blockIndex = this.blocks.findIndex(b => b.id === newBlock.id);
            if (blockIndex !== -1) {
                this.blocks[blockIndex] = newBlock;
            }
        }
    }

    // UIを変更する
    moveBlockToTopLevel(id) {
        const foundResult = this.findBlock(id);
        if (!foundResult.parentBlock) return;

        // データの変更
        let block = foundResult.foundBlock;
        block.x = foundResult.absoluteX;
        block.y = foundResult.absoluteY;
        this.removeBlock(id);
        this.blocks.push(block);

        // UI部分の移動
        const blockUI = d3.select(`#${id}`).node();
        d3.select(blockUI).attr("transform", `translate(${block.x}, ${block.y})`);
        d3.select(blockUI).raise();
        this.grid.node().appendChild(blockUI);
        this.updateBlock(foundResult.rootParent.id);
        d3.select(`#${id}`).raise();
    }

    moveBlockToDragboard(id) {
        const foundResult = this.findBlock(id);
        if (foundResult.parentBlock) this.moveBlockToTopLevel(id);
        const blockUI = d3.select(`#${id}`).node();
        this.dragboard.node().appendChild(blockUI);
    }

    moveBlockToGrid(id) {
        const foundResult = this.findBlock(id);
        if (foundResult.parentBlock) this.moveBlockToTopLevel(id);
        const blockUI = d3.select(`#${id}`).node();
        this.grid.node().appendChild(blockUI);
    }

    insertBlock(id, targetParentId, index) {
        const updatedParent = this.previewInsertion(id, targetParentId, index);
        this.removeBlock(id);
        this.updateBlockInData(updatedParent);
        // Update translation for the updated parent/root
        this.updateBlockTranslation(updatedParent);
        this.renderBlocks();
    }

    attachBlock(id, targetParentId, side) {
        const updatedParent = this.previewAttachment(id, targetParentId, side);
        this.removeBlock(id);
        this.updateBlockInData(updatedParent);
        // Update translation for the updated parent/root
        this.updateBlockTranslation(updatedParent);
        this.renderBlocks();
    }

    setChildVisibility(id) {
        const foundResult = this.findBlock(id);
        if (!foundResult.foundBlock) return;

        const block = foundResult.foundBlock;

        // Find the head child (first text or dropdown)
        const headChild = block.children.find(child => child.id === "head" && (child.type === "text" || child.type === "dropdown"));
        if (!headChild) return;

        // Determine the selected head index
        const selectedHeadIndex = headChild.type === "text" ? 0 : headChild.selected;

        // Update visibility for each child
        block.children.forEach(child => {
            if (child.headIndex !== undefined) {
                const shouldBeVisible = child.headIndex.includes(selectedHeadIndex);
                if (!shouldBeVisible && child.type === "placeholder" && child.content) {
                    // Move the child block to top level before hiding
                    this.moveBlockToTopLevel(child.content.id);
                }
                child.hidden = !shouldBeVisible;
            } else {
                child.hidden = false;
            }
        });

        // Update the block in the UI
        this.updateBlock(id);
    }

    /*ハイライト表示***********************************************************************************************************************************************************************************************************************************************************************************************************************/

    grabbingCursor(blockId, isDragging) {
        const id = `#${blockId}`;
        d3.select(id).raise();
        d3.select(id)
            .classed("grab", !isDragging)
            .classed("grabbing", isDragging);
    }

    grabbingHighlight(blockId, isDragging) {
        const id = `#${blockId}`;
        this.grabbingCursor(blockId, isDragging)

        const frameId = `#frame-${blockId}`;
        const block = this.findBlock(blockId).foundBlock;
        if (!block) return;

        const strokeColor = isDragging ? "yellow" : this.darkenColor(block.color, 30);
        const strokeWidth = isDragging ? highlightStrokeWidth : blockStrokeWidth;

        d3.select(frameId)
            .attr("stroke", strokeColor)
            .attr("stroke-width", strokeWidth);
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

    /*文法(できれば他に移動したい)***********************************************************************************************************************************************************************************************************************************************************************************************************************/

    validate(block) {
        const phraseInput = this.converter.convert(block);
        console.log("block:", block);
        console.log("converted:", phraseInput);
        if(!phraseInput) return false;
        const validationResult = this.grammar.parseNestedPhrase(phraseInput);
        console.log("validated:", validationResult);
        return (validationResult.categories.length > 0);
    }

    updateBlockTranslation(block) {
        if (!block) return;
        // Recursively update children
        if (Array.isArray(block.children)) {
            block.children.forEach(child => {
                if ((child.type === "placeholder" || child.type === "attachment") && child.content) {
                    this.updateBlockTranslation(child.content);
                }
            });
        }
        // Set translation for this block
        const phraseInput = this.converter.convert(block);
        if (phraseInput) {
            const result = this.grammar.parseNestedPhrase(phraseInput);
            if (result && result.categories && result.categories.length > 0) {
                // Use the first parse result's translation if available
                const translationObj = result.categories[0].translation;
                if (translationObj && typeof translationObj === 'object') {
                    // Use the first key's value as the translation string
                    const firstKey = Object.keys(translationObj)[0];
                    const rawTranslation = translationObj[firstKey] || '';
                    block.translation = this.converter.formatTranslation(rawTranslation);
                } else {
                    block.translation = '';
                }
            } else {
                block.translation = '';
            }
        } else {
            block.translation = '';
        }
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
        const children = block.children.filter((child) => !child.hidden);
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
        const children = block.children.filter((child) => !child.hidden);
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