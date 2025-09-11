/* eslint-disable @typescript-eslint/no-unused-vars */
import { Converter } from "@/grammar/converter";
import { Grammar } from "@/grammar/grammar";
import { padding, blockCornerRadius, blockStrokeWidth, highlightStrokeWidth, placeholderWidth, placeholderHeight, placeholderCornerRadius, labelFontSize, dropdownHeight, horizontalPadding, bubbleColor, blockListSpacing, blockListFontSize, scrollMomentumExtent, sidebarPadding, resolvedGapRadius, initialVisibleCount, visiblilityIncrement, buttonRadius, iconSize } from "./const.js";
import { createBlockSnapshot, createBlockSnapshotList } from "@/utils/supabase/logging_helpers";
import * as d3 from "d3";

export class Renderer {
    constructor(blocks, blockList, svg, onDirty, topBarHeight = 0, onLogEvent = (string, object) => { }) {
        this.blocks = blocks;
        this.topBarHeight = topBarHeight;
        this.canvasHeight = window.innerHeight - this.topBarHeight;

        this.blockList = blockList;
        // Format each block in blockList using converter.formatBlock()
        this.converter = new Converter;
        Object.keys(this.blockList).forEach(groupName => {
            this.blockList[groupName] = this.blockList[groupName].map(block => this.converter.formatBlock(block));
        });
        this.categoryState = {}; // New property
        Object.keys(this.blockList).forEach(groupName => {
            this.categoryState[groupName] = { isCollapsed: true, displayCount: initialVisibleCount };
        });
        this.svg = svg;
        this.sideBarScrollExtent = 0;
        this.viewportHeight = window.innerHeight;
        this.grammar = new Grammar;

        this.onDirty = onDirty;

        this.onLogEvent = onLogEvent;
        this.dragLogContext = null;
        this.lastHoverTargetId = null;
        this.hoverLogContext = null;

        // Initialize cache
        this.cachedSidebarWidth = null;

        // Update translation for all initial blocks
        this.blocks.forEach(block => this.updateBlockTranslation(block));
        this.render();

        // Add resize event listener to handle orientation changes
        this.handleResize = this.handleResize.bind(this);
        window.addEventListener('resize', this.handleResize);
    }

    getSnapshotAfterDetachment(rootParent, blockToDetachId) {
        if (!rootParent || !blockToDetachId) return null;

        // Work on a deep copy to avoid side effects
        const rootCopy = JSON.parse(JSON.stringify(rootParent));

        // Recursive function to find and nullify the block's content in the copied structure
        const findAndNullifyInCopy = (current) => {
            if (!current.children) return false;
            for (let i = 0; i < current.children.length; i++) {
                const child = current.children[i];
                if (child.content && child.content.id === blockToDetachId) {
                    child.content = null; // Detach by nullifying content
                    return true; // Found and detached
                }
                if (child.content && findAndNullifyInCopy(child.content)) {
                    return true; // Found and detached in a deeper level
                }
            }
            return false;
        };

        findAndNullifyInCopy(rootCopy);
        return createBlockSnapshot(rootCopy);
    }

    generateRandomId() {
        return "b" + crypto.randomUUID().replaceAll(/-/g, '');
    }

    handleResize() {
        // Update viewport height
        this.canvasHeight = window.innerHeight - this.topBarHeight;

        // Clear cache on resize
        this.cachedSidebarWidth = null;

        // Update sidebar background height
        const sidebarBackground = d3.select("#sidebar-background");
        if (!sidebarBackground.empty()) {
            sidebarBackground
                .attr("height", window.innerHeight);
        }

        // Recalculate sidebar scroll bounds
        this.setBlockBoardTransform();
        //this.renderTrashCan();
    }

    // Cleanup method to remove event listeners
    destroy() {
        if (this.handleResize) {
            window.removeEventListener('resize', this.handleResize);
        }
    }

    /*レンダリング処理***********************************************************************************************************************************************************************************************************************************************************************************************************************/

    render() {
        // Clear cache when re-rendering
        this.cachedSidebarWidth = null;

        this.renderGrid();
        this.renderSideBar();
        this.renderDragboard();
        this.renderBlocks();
        //this.renderTrashCan();
    }

    renderTrashCan() {
        // Remove existing trash can to prevent duplicates on resize
        d3.select("#trash-can-group").remove();

        const trashSize = 32;
        const padding = 24;
        const positionX = window.innerWidth - trashSize - padding * 2;
        const positionY = this.canvasHeight - trashSize - padding * 2;

        const trashGroup = this.svg.append("g")
            .attr("id", "trash-can-group")
            .attr("transform", `translate(${positionX}, ${positionY})`);

        // Add a larger, invisible circle for an easier drop target
        trashGroup.append("circle")
            .attr("id", "trash-can-droptarget")
            .attr("cx", trashSize / 2)
            .attr("cy", trashSize / 2)
            .attr("r", trashSize)
            .attr("fill", "#000000")
            .attr("opacity", 0.05);

        const trashIcon = trashGroup.append("g")
            .attr("id", "trash-can-icon")
            .attr("pointer-events", "none");

        // Scale the SVG path to fit the trash size
        const scale = trashSize / 105.16; // Original SVG viewBox width is 105.16
        const scaledHeight = 122.88 * scale; // Original SVG viewBox height is 122.88

        // Center the scaled SVG within the trash area
        const offsetX = (trashSize - trashSize) / 2;
        const offsetY = (trashSize - scaledHeight) / 2;

        // Create the trash can using the provided SVG path
        trashIcon.append("path")
            .attr("d", "M11.17,37.16H94.65a8.4,8.4,0,0,1,2,.16,5.93,5.93,0,0,1,2.88,1.56,5.43,5.43,0,0,1,1.64,3.34,7.65,7.65,0,0,1-.06,1.44L94,117.31v0l0,.13,0,.28v0a7.06,7.06,0,0,1-.2.9v0l0,.06v0a5.89,5.89,0,0,1-5.47,4.07H17.32a6.17,6.17,0,0,1-1.25-.19,6.17,6.17,0,0,1-1.16-.48h0a6.18,6.18,0,0,1-3.08-4.88l-7-73.49a7.69,7.69,0,0,1-.06-1.66,5.37,5.37,0,0,1,1.63-3.29,6,6,0,0,1,3-1.58,8.94,8.94,0,0,1,1.79-.13ZM5.65,8.8H37.12V6h0a2.44,2.44,0,0,1,0-.27,6,6,0,0,1,1.76-4h0A6,6,0,0,1,43.09,0H62.46l.3,0a6,6,0,0,1,5.7,6V6h0V8.8h32l.39,0a4.7,4.7,0,0,1,4.31,4.43c0,.18,0,.32,0,.5v9.86a2.59,2.59,0,0,1-2.59,2.59H2.59A2.59,2.59,0,0,1,0,23.62V13.53H0a1.56,1.56,0,0,1,0-.31v0A4.72,4.72,0,0,1,3.88,8.88,10.4,10.4,0,0,1,5.65,8.8Zm42.1,52.7a4.77,4.77,0,0,1,9.49,0v37a4.77,4.77,0,0,1-9.49,0v-37Zm23.73-.2a4.58,4.58,0,0,1,5-4.06,4.47,4.47,0,0,1,4.51,4.46l-2,37a4.57,4.57,0,0,1-5,4.06,4.47,4.47,0,0,1-4.51-4.46l2-37ZM25,61.7a4.46,4.46,0,0,1,4.5-4.46,4.58,4.58,0,0,1,5,4.06l2,37a4.47,4.47,0,0,1-4.51,4.46,4.57,4.57,0,0,1-5-4.06l-2-37Z")
            .attr("fill", "#666666")
            .attr("fill-rule", "evenodd")
            .attr("transform", `translate(${offsetX}, ${offsetY}) scale(${scale})`);
    }

    renderGrid() {
        const width = 1440;
        const height = window.innerHeight;

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
        this.svg.transition().duration(300).call(zoom.transform, initialTransform);
    }

    renderDragboard() {
        this.dragboard = this.svg.append("g").attr("id", "dragboard");
    }

    renderBlocks() {
        console.log("render blocks")
        d3.select("#grid").selectAll("*").remove();
        d3.select("#dragboard").selectAll("*").remove();
        this.blocks = this.blocks.map((block) => {
            return this.converter.formatBlock(block);
        });
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

        if (block.undraggable !== true) {
            blockGroup.call(d3.drag()
                .container(this.grid.node())
                .on("start", (event, d) => this.dragStart(event, d, fromSideBar, sideBarId))
                .on("drag", (event, d) => this.dragging(event, d, fromSideBar, sideBarId))
                .on("end", this.dragEnd.bind(this))
            );
        }

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
        // Remove the entire sidebar group
        d3.select("#sidebar").remove();

        const width = this.calculateSideBarWidth();
        const height = window.innerHeight;

        this.sidebar = this.svg.append("g")
            .attr("id", "sidebar")
            .attr("transform", `translate(0, 0)`);

        // Add the sidebar background
        this.sidebar.append("rect")
            .attr("id", "sidebar-background")
            .attr("width", width)
            .attr("height", height)
            .attr("fill", "#fafafa")
            .attr("stroke", "#f0f0f0")
            .attr("stroke-width", "1")
            .on("mousedown", (event) => {
                event.stopPropagation();
            });

        this.renderSideBarContent();
        this.enableSideBarScroll();
    }

    calculateSideBarWidth() {
        // Use cached value if available
        if (this.cachedSidebarWidth) {
            return this.cachedSidebarWidth;
        }

        let maxWidth = 0;
        Object.values(this.blockList).forEach(blockArray => {
            blockArray.forEach(block => {
                const width = this.calculateWidth(block);
                maxWidth = Math.max(maxWidth, width);
            });
        });
        // Add padding for the sidebar
        this.cachedSidebarWidth = maxWidth + sidebarPadding.right + sidebarPadding.left * 2;
        return this.cachedSidebarWidth;
    }

    renderSideBarContent() {
        this.sidebarContent = this.sidebar.append("g");
        this.blockBoard = this.sidebarContent.append("g").attr("transform", `translate(${sidebarPadding.left * 2}, 0)`);

        // Cache sidebar width calculation
        const sidebarWidth = this.calculateSideBarWidth();
        this.cachedSidebarWidth = sidebarWidth;
        const headerWidth = sidebarWidth / 2;

        let y = sidebarPadding.top;
        Object.entries(this.blockList).forEach(([groupName, blockArray]) => {
            const isCollapsed = this.categoryState[groupName].isCollapsed;
            const categoryHeader = this.blockBoard.append("g")
                .style("cursor", "pointer")
                .on("pointerdown", () => {
                    const wasOpen = !this.categoryState[groupName].isCollapsed;
                    Object.keys(this.categoryState).forEach(key => {
                        this.categoryState[key].isCollapsed = true;
                        // Reset displayCount to initial value when collapsing
                        this.categoryState[key].displayCount = initialVisibleCount;
                    });
                    if (!wasOpen) {
                        this.categoryState[groupName].isCollapsed = false;
                    }
                    this.renderSideBar();
                });

            categoryHeader.append("rect")
                .attr("x", 0)
                .attr("y", y - blockListFontSize * 2)
                .attr("width", headerWidth)
                .attr("height", blockListFontSize * 4)
                .attr("fill", "transparent");

            categoryHeader.append("text")
                .text(isCollapsed ? "▶" : "▼")
                .attr("y", y)
                .attr('font-size', `${blockListFontSize * 0.7}pt`)
                .attr('fill', '#666666')
                .style('user-select', 'none')
                .style('font-weight', '500');

            categoryHeader.append("text")
                .text(groupName)
                .attr("x", 32)
                .attr("y", y)
                .attr('font-size', `${blockListFontSize * 0.9}pt`)
                .attr('fill', '#1a1a1a')
                .style('user-select', 'none')
                .style("font-weight", "600")
                .style("letter-spacing", "-0.01em");

            y += 40;

            if (!isCollapsed) {
                const blocksToRender = blockArray.slice(0, this.categoryState[groupName].displayCount);
                blocksToRender.forEach((block) => {
                    y += blockListSpacing + this.renderSideBarBlock(block, this.generateRandomId(), y);
                });

                const displayCount = this.categoryState[groupName].displayCount;
                const totalCount = blockArray.length;

                if (totalCount > displayCount) {
                    y += blockListSpacing;
                    const seeMoreCallback = () => {
                        const currentCount = this.categoryState[groupName].displayCount;
                        this.categoryState[groupName].displayCount = currentCount + visiblilityIncrement;
                        this.renderSideBar();
                    };
                    y = this.renderSidebarButton(y + 40, "See more +", seeMoreCallback);
                }

                if (displayCount > initialVisibleCount) {
                    const showLessCallback = () => {
                        this.categoryState[groupName].displayCount -= visiblilityIncrement;
                        this.renderSideBar();
                    };
                    y = this.renderSidebarButton((totalCount > displayCount) ? y : y + 40, "Show less -", showLessCallback);
                }
            }

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

        const scrollableHeight = this.canvasHeight;

        this.sideBarScrollExtent = Math.max(-(this.sideBarContentHeight * zoomExtent - scrollableHeight), this.sideBarScrollExtent);
        this.sideBarScrollExtent = Math.min(0, this.sideBarScrollExtent);

        if (this.sidebarContent) {
            if (this.previousZoomExtent) {
                const zoomRatio = zoomExtent / this.previousZoomExtent;
                this.sideBarScrollExtent *= zoomRatio;
            }
            this.sidebarContent.attr("transform", `translate(0, ${this.sideBarScrollExtent}), scale(${zoomExtent})`);
        }

        const newWidth = this.calculateSideBarWidth() * zoomExtent;
        d3.select("#sidebar rect").attr("width", newWidth);
        this.previousZoomExtent = zoomExtent;
    }

    renderSideBarBlock(block, id, y) {
        this.blockBoard
            .append("g")
            .attr("transform", `translate(0, ${y})`)
            .attr("id", id)
            .datum(block);

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

    renderSidebarButton(y, text, onClickCallback) {
        // Cache button width calculation
        const buttonWidth = this.cachedSidebarWidth ? this.cachedSidebarWidth - sidebarPadding.left * 4 : this.calculateSideBarWidth() - sidebarPadding.left * 4;
        const buttonHeight = 56;
        const buttonCornerRadius = 28;
        const buttonFontSize = "24pt";
        const buttonX = 0;

        const buttonGroup = this.blockBoard.append("g")
            .style("cursor", "pointer")
            .on("pointerdown", (event) => {
                event.stopPropagation();
                onClickCallback();
            });

        // Button background rectangle
        const buttonRect = buttonGroup.append("rect")
            .attr("x", buttonX)
            .attr("y", y - (buttonHeight / 2)) // Vertically center the rect around the y-point
            .attr("width", buttonWidth)
            .attr("height", buttonHeight)
            .attr("rx", buttonCornerRadius)
            .attr("ry", buttonCornerRadius)
            .attr("fill", "#f0f0f0")
            .attr("stroke", "#e0e0e0")
            .attr("stroke-width", "1");

        // Button text label
        buttonGroup.append("text")
            .text(text)
            .attr("x", buttonX + (buttonWidth / 2)) // Horizontally center the text
            .attr("y", y)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle") // Vertically center the text
            .style("font-size", buttonFontSize)
            .style("font-weight", "500")
            .attr("fill", "#666666") // Slightly darker text for better contrast
            .style("user-select", "none");

        // Hover effect
        buttonGroup
            .on("mouseenter", () => {
                buttonRect.attr("fill", "#e8e8e8");
                buttonRect.attr("stroke", "#d0d0d0");
            })
            .on("mouseleave", () => {
                buttonRect.attr("fill", "#f0f0f0");
                buttonRect.attr("stroke", "#e0e0e0");
            });

        // Return the new y-coordinate for the next element
        return y + buttonHeight + blockListSpacing;
    }

    /*ブロックの画像の描画***********************************************************************************************************************************************************************************************************************************************************************************************************************/

    renderBlockImage(block, blockGroup) {
        blockGroup.selectAll("*").remove();
        const width = this.calculateWidth(block);
        const height = this.calculateHeight(block);
        const strokeColor = this.darkenColor(block.color, 30);
        const actualCornerRadius = block.isRound ? height / 2 : blockCornerRadius;

        // 日本語訳を表示する条件：ドラッグ中 or トップレベル(gridの直下にある)
        if ((blockGroup.node().parentNode && blockGroup.node().parentNode.id === "grid") || block.id === this.draggedBlockId) {
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

        let x = horizontalPadding + (block.isRound ? horizontalPadding : 0);
        const allChildren = block.children;

        // 内部の各種アイテムの描画 (Render various internal items)
        // Iterate over the original children array to preserve the correct index.
        for (let originalIndex = 0; originalIndex < allChildren.length; originalIndex++) {
            const child = allChildren[originalIndex];
            if (child.hidden) {
                continue;
            }

            if (child.resolved && child.type === "placeholder") {
                x += this.renderResolvedGap(child, height, block, blockGroup, x);
            } else if (child.type === "placeholder") {
                x += this.renderPlaceholder(child, height, block, blockGroup, originalIndex, x);
            } else if (child.type === "text") {
                x += this.renderText(child, height, blockGroup, x);
            } else if (child.type === "dropdown") {
                x += this.renderDropdown(child, height, block, blockGroup, originalIndex, x);
            } else if (child.type === "attachment") {
                x += this.renderAttachment(child, height, blockGroup, x);
            }
        }

        // After rendering the block contents, optionally render a Send button for finite sentences
        try {
            const isFinite = this.isFiniteSentence(block);
            if (isFinite) {
                const isComplete = this.isBlockComplete(block);
                this.renderSendButton(block, blockGroup, width, height, !isComplete);
            }
        } catch (e) {
            // fail-safe: never break rendering if check fails
        }

        return { width: width, height: height };
    }

    // Determine if a block is a finite sentence type, regardless of completion
    isFiniteSentence(block) {
        if (!block || !Array.isArray(block.children) || !Array.isArray(block.words) || block.words.length === 0) return false;
        const headChild = block.children.find(c => c.id === 'head');
        if (!headChild) return false;
        const headIndex = headChild.type === 'dropdown' ? (headChild.selected ?? 0) : 0;
        const headWord = block.words[headIndex];
        const headCategory = headWord && Array.isArray(headWord.categories) ? headWord.categories[0] : undefined;
        const isSentence = headCategory && headCategory.head && headCategory.head.type === 'sentence';
        const isFinite = isSentence && headCategory.head.finite === true;
        return Boolean(isFinite);
    }

    // Determine if a block has any unfilled placeholders
    isBlockComplete(block) {
        if (!block || !Array.isArray(block.children)) return true; // Default to complete if no children array
        const hasUnfilled = block.children.some(ch => !ch.hidden && ch.type === 'placeholder' && !ch.content && !ch.resolved);
        return !hasUnfilled;
    }

    // Simple string representation to send to AI (matches logging helper semantics)
    generateFlatString(block) {
        if (!block) return '';
        const parts = block.children
            .filter(child => !child.hidden)
            .map(child => {
                if (child.id === 'head') {
                    if (child.type === 'text') return child.content;
                    if (child.type === 'dropdown') {
                        const idx = child.selected ?? 0;
                        return child.content && child.content[idx] ? child.content[idx] : '';
                    }
                    return block.id;
                }
                if ((child.type === 'placeholder' || child.type === 'attachment') && child.content) {
                    return this.generateFlatString(child.content);
                }
                return null;
            })
            .filter(Boolean);
        return parts.join(' ');
    }

    // Render a small icon button to the left of the block
    renderSendButton(block, blockGroup, width, height, isDisabled = false) {
        const gap = 8;

        const group = blockGroup.append('g')
            .attr('id', `send-${block.id}`)
            .classed('pointer', !isDisabled);

        if (isDisabled) {
            group.style('opacity', 0.5)
                .style('cursor', 'not-allowed');
        }

        const cx = -gap - buttonRadius;
        const cy = height / 2;

        const circle = group.append('circle')
            .attr('cx', cx)
            .attr('cy', cy)
            .attr('r', buttonRadius)
            .attr('fill', isDisabled ? '#cdd2d7' : '#007AFF')  // gray when disabled, blue when enabled
            .attr('stroke', '#e0e0e0')
            .attr('stroke-width', 1);

        // SVG path for the send icon. Its original viewBox is 24x24.
        const iconPath = "M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z";
        const scale = iconSize / 24;
        const transform = `translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`;

        group.append('path')
            .attr('d', iconPath)
            .attr('fill', '#FFFFFF')  // icon always white
            .attr('transform', transform)
            .style('pointer-events', 'none');

        if (!isDisabled) {
            group
                .on('mouseenter', () => {
                    circle.attr('fill', '#0056b3');  // darker blue on hover
                })
                .on('mouseleave', () => {
                    circle.attr('fill', '#007AFF');  // restore normal blue
                })
                .on('mousedown', async (event) => {
                    event.stopPropagation();
                    try {
                        // Gather sentence string
                        const text = this.generateFlatString(block);
                        // Call API
                        const res = await fetch('/api/ai-tutor', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ prompt: text })
                        });
                        if (!res.ok) return;
                        const data = await res.json();
                        // Display the response in translation bubble temporarily
                        const original = block.translation || '';
                        block.translation = data && data.text ? String(data.text) : original;
                        // Re-render this block image to show updated bubble
                        this.renderBlockImage(block, blockGroup);
                        // Restore original translation shortly after
                        setTimeout(() => {
                            block.translation = original;
                            const groupNow = d3.select(`#${block.id}`);
                            if (!groupNow.empty()) this.renderBlockImage(block, groupNow);
                        }, 2500);
                    } catch (err) {
                        // swallow errors for now
                    }
                });
        }
        // extend the hit area to include the button when dragging around the block
        group.raise();

        return { x: cx - buttonRadius, y: cy + buttonRadius };
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

            const placeholderDomId = `placeholder-${count}-${block.id}-${child.id}`;

            blockGroup.append("rect")
                .attr("id", placeholderDomId)
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
            .attr('dy', '-0.24em')
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
            .attr('dy', '-0.24em')
            .style('user-select', 'none')

        dropdownGroup.append("text")
            .text("▼")
            .attr("x", textX + box.width + horizontalPadding)
            .attr("y", textY - 10)
            .attr('fill', 'white')
            .attr('font-size', `10pt`)
            .attr('font-weight', 'bold')
            .attr('dy', '-0.24em')
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
                .on("mousedown", (event) => {
                    event.stopPropagation();
                    const isFromSidebar = event.currentTarget.closest("#sidebar") !== null;

                    // ログ出力
                    const fromText = child.content[child.selected];
                    const toText = option;
                    if (!isFromSidebar && fromText !== toText) {
                        const blockSnapshot = createBlockSnapshot(block);
                        this.onLogEvent('BLOCK_INTERACTION', {
                            sub_type: 'dropdown_select',
                            description: `Changed dropdown in '${blockSnapshot.string_rep}' from '${fromText}' to '${toText}'.`,
                            block: blockSnapshot,
                            from: fromText,
                            to: toText
                        });
                    }

                    child.selected = index;
                    if (isFromSidebar) {
                        this.closeAllDropdowns();
                        const blockGroup = d3.select(`#${block.id}`);
                        this.renderBlockImage(block, blockGroup);
                    } else {
                        this.formatBlock(block.id);
                        this.raiseBlock(block.id);
                        const parentBlock = this.findBlock(block.id).rootParent;
                        const isValid = this.validate(parentBlock);
                        if (!isValid) {
                            this.moveBlockToTopLevel(block.id, true);
                            this.updateBlock(block.id);
                            setTimeout(() => d3.select(`#${block.id}`).raise(), 0);
                        }
                        this.onDirty();
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

            dropdownGroup.on("click", (event) => {
                const isFromSidebar = event.currentTarget.closest("#sidebar") !== null;
                const currentDisplay = optionsGroup.attr("display");
                if (currentDisplay === "none") {
                    this.closeAllDropdowns();
                }
                optionsGroup.attr("display", currentDisplay === "none" ? "block" : "none");
                if (isFromSidebar) {
                    const blockGroup = d3.select(`#${block.id}`);
                    const parent = blockGroup.node().parentNode;
                    d3.select(parent).raise();
                } else {
                    this.raiseBlock(block.id);
                }
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

    renderResolvedGap(child, height, block, blockGroup, x) {
        // Use the same darkened color as a regular placeholder for consistency.
        const circleColor = this.darkenColor(block.color, 30);
        const radius = resolvedGapRadius; // Use our new constant

        // Vertically center the circle within the parent block.
        const centerY = height / 2;
        // Horizontally position the center of the circle.
        const centerX = x + radius;

        // Append an SVG <circle> element.
        blockGroup.append("circle")
            .attr("cx", centerX)
            .attr("cy", centerY)
            .attr("r", radius)
            .attr("fill", circleColor)
            .attr("pointer-events", "none"); // This makes the circle non-interactive.

        // Return the space occupied by the circle plus padding, so the next element is positioned correctly.
        return (radius * 2 + horizontalPadding);
    }

    /*ドラッグ関係の処理***********************************************************************************************************************************************************************************************************************************************************************************************************************/

    dragStart(event, d, fromSideBar = false, sideBarId = undefined) {
        this.grabbingCursor(d.id, true);
        this.dragStarted = false;
        this.hoverLogContext = {
            currentPlaceholderId: null,
            timerId: null,
            loggedPlaceholdersForThisDrag: new Set()
        };
        this.svg.node().appendChild(this.dragboard.node());

        // ログ出力
        if (!fromSideBar) {
            const { rootParent, parentBlock } = this.findBlock(d.id);
            if (parentBlock && rootParent) {
                const detachedBlockSnapshot = createBlockSnapshot(d);
                const originalParentSnapshot = createBlockSnapshot(rootParent);
                const resultParentSnapshot = this.getSnapshotAfterDetachment(rootParent, d.id);

                let description = `Detached block '${detachedBlockSnapshot.string_rep}' from '${originalParentSnapshot.string_rep}'.`;
                if (resultParentSnapshot) {
                    description += ` Result: ${resultParentSnapshot.string_rep}`;
                }

                this.onLogEvent('BLOCK_INTERACTION', {
                    sub_type: 'detachment',
                    description: description,
                    detached_block: detachedBlockSnapshot,
                    original_parent: originalParentSnapshot,
                    result_parent: resultParentSnapshot // Add result state
                });
            }
        }
    }

    dragging(event, d, fromSideBar = false) {
        if (!this.dragStarted) {

            if (fromSideBar) {
                // ログ出力
                const newBlockSnapshot = createBlockSnapshot(d);
                this.onLogEvent('BLOCK_INTERACTION', {
                    sub_type: 'creation',
                    description: `Created block '${newBlockSnapshot.string_rep}' from sidebar.`,
                    block: newBlockSnapshot
                });

                this.blocks.push(d);
                const blockRect = d3.select(`#${d.id}`).node().getBoundingClientRect();
                const sideBarX = blockRect.left;
                const sideBarY = blockRect.top;
                const transform = d3.zoomTransform(this.grid.node());
                const gridX = (sideBarX - transform.x) / transform.k;
                const gridY = (sideBarY - this.topBarHeight - transform.y) / transform.k;
                d.x = gridX;
                d.y = gridY;
                const sideBarId = d3.select(`#${d.id}`).node().parentNode.id;
                this.renderPreviewBlock(sideBarId);
            }

            this.moveBlockToTopLevel(d.id);
            this.moveBlockToDragboard(d.id);

            this.dragStartX = event.x;
            this.dragStartY = event.y;
            this.dragStartBlockX = d.x;
            this.dragStartBlockY = d.y;

            d3.select(`#${d.id}`).attr("transform", `translate(${d.x}, ${d.y})`);

            this.dragStarted = true;
            this.draggedBlockId = d.id;

            this.updateBlock(d.id);
            this.grabbingHighlight(d.id, true);
            this.closeAllDropdowns();
        } else {
            const dx = event.x - this.dragStartX;
            const dy = event.y - this.dragStartY;
            d.x = this.dragStartBlockX + dx;
            d.y = this.dragStartBlockY + dy;
            d3.select(`#${d.id}`).attr("transform", `translate(${d.x}, ${d.y})`);
            this.detectOverlapAndHighlight(d);

            // ログ出力
            const placeholderInfo = this.detectPlaceholderOverlap(d, event.x, event.y);
            const currentHoverId = placeholderInfo && !placeholderInfo.isValid ? placeholderInfo.id : null;
            const prevHoverId = this.hoverLogContext.currentPlaceholderId;

            // Case 1: Moved away from a previously hovered invalid placeholder
            if (prevHoverId && prevHoverId !== currentHoverId) {
                if (this.hoverLogContext.timerId) {
                    clearTimeout(this.hoverLogContext.timerId);

                    if (!this.hoverLogContext.loggedPlaceholdersForThisDrag.has(prevHoverId)) {
                        const blockSnapshot = createBlockSnapshot(d);
                        const info = prevHoverId.split("-");
                        const parentId = info[2];
                        const index = info[1];
                        const { foundBlock: parentBlock } = this.findBlock(parentId);
                        const parentSnapshot = createBlockSnapshot(parentBlock);
                        const hypotheticalBlock = this.previewInsertion(d.id, parentId, index);
                        const dismissedResultSnapshot = createBlockSnapshot(hypotheticalBlock);
                        this.onLogEvent('BLOCK_INTERACTION', {
                            sub_type: 'invalid_insertion_pass_by',
                            description: `Passed by an incompatible placeholder with block '${blockSnapshot.string_rep}'.`,
                            block: blockSnapshot,
                            placeholder_id: prevHoverId,
                            parent_block: parentSnapshot,
                            dismissed_result: dismissedResultSnapshot
                        });
                        this.hoverLogContext.loggedPlaceholdersForThisDrag.add(prevHoverId);
                    }
                }
                this.hoverLogContext.currentPlaceholderId = null;
                this.hoverLogContext.timerId = null;
            }

            // Case 2: Hovering over a new invalid placeholder
            if (currentHoverId && currentHoverId !== prevHoverId) {
                if (!this.hoverLogContext.loggedPlaceholdersForThisDrag.has(currentHoverId)) {
                    this.hoverLogContext.currentPlaceholderId = currentHoverId;

                    this.hoverLogContext.timerId = setTimeout(() => {
                        const blockSnapshot = createBlockSnapshot(d);
                        const info = currentHoverId.split("-");
                        const parentId = info[2];
                        const index = info[1];
                        const { foundBlock: parentBlock } = this.findBlock(parentId);
                        const parentSnapshot = createBlockSnapshot(parentBlock);
                        const hypotheticalBlock = this.previewInsertion(d.id, parentId, index);
                        const dismissedResultSnapshot = createBlockSnapshot(hypotheticalBlock);

                        this.onLogEvent('BLOCK_INTERACTION', {
                            sub_type: 'invalid_insertion_attempt',
                            description: `Attempted to insert block '${blockSnapshot.string_rep}' into an incompatible placeholder in '${parentSnapshot.string_rep}'. Dismissed possible result: '${dismissedResultSnapshot.string_rep}'`,
                            block: blockSnapshot,
                            placeholder_id: currentHoverId,
                            duration_ms: 500,
                            parent_block: parentSnapshot,
                            dismissed_result: dismissedResultSnapshot
                        });
                        this.hoverLogContext.loggedPlaceholdersForThisDrag.add(currentHoverId);
                        this.hoverLogContext.timerId = null;
                    }, 500);
                }
            }
        }
    }

    dragEnd(event, d) {
        event.sourceEvent.stopPropagation();
        this.grabbingCursor(d.id, false);
        if (!this.dragStarted) return;

        const draggedBlockNode = d3.select(`#${d.id}`).node();
        const trashTarget = d3.select("#trash-can-droptarget").node();
        const sidebarNode = d3.select("#sidebar rect").node();

        if (draggedBlockNode && trashTarget && sidebarNode) {
            const blockRect = draggedBlockNode.getBoundingClientRect();
            const trashRect = trashTarget.getBoundingClientRect();
            const checkIntersection = (rect1, rect2) => {
                return !(
                    rect1.right < rect2.left ||
                    rect1.left > rect2.right ||
                    rect1.bottom < rect2.top ||
                    rect1.top > rect2.bottom
                );
            };
            const droppedOnTrash = checkIntersection(blockRect, trashRect);

            const { clientX, clientY } = event.sourceEvent;
            const sidebarRect = sidebarNode.getBoundingClientRect();
            const droppedOnSidebar = clientX >= sidebarRect.left && clientX <= sidebarRect.right &&
                clientY >= sidebarRect.top && clientY <= sidebarRect.bottom;

            if (droppedOnTrash /*|| droppedOnSidebar*/) {
                this.deleteBlock(d.id);
                this.dragStarted = false;
                this.draggedBlockId = null;
                return;
            }
        }

        // ログ出力
        const prevHoverId = this.hoverLogContext.currentPlaceholderId;
        if (prevHoverId && this.hoverLogContext.timerId) {
            clearTimeout(this.hoverLogContext.timerId);
            if (!this.hoverLogContext.loggedPlaceholdersForThisDrag.has(prevHoverId)) {
                const blockSnapshot = createBlockSnapshot(d);
                const info = prevHoverId.split("-");
                const parentId = info[2];
                const index = info[1];
                const { foundBlock: parentBlock } = this.findBlock(parentId);
                const parentSnapshot = createBlockSnapshot(parentBlock);
                const hypotheticalBlock = this.previewInsertion(d.id, parentId, index);
                const dismissedResultSnapshot = createBlockSnapshot(hypotheticalBlock);

                this.onLogEvent('BLOCK_INTERACTION', {
                    sub_type: 'invalid_insertion_pass_by',
                    block: blockSnapshot,
                    placeholder_id: prevHoverId,
                    description: `Ended drag after passing by an incompatible placeholder for block '${blockSnapshot.string_rep}' in '${parentSnapshot.string_rep}'. Dismissed possible result: '${dismissedResultSnapshot.string_rep}'`,
                    block: blockSnapshot, placeholder_id: prevHoverId, parent_block: parentSnapshot, dismissed_result: dismissedResultSnapshot
                });
                this.hoverLogContext.loggedPlaceholdersForThisDrag.add(prevHoverId);
            }
        }

        this.dragStarted = false;
        this.grabbingHighlight(d.id, false);

        const placeholderInfo = this.detectPlaceholderOverlap(d, d.x, d.y);
        const overlapInfo = this.detectBlockOverlap(d);

        if (placeholderInfo && placeholderInfo.isValid) {
            const info = placeholderInfo.id.split("-");
            const parentId = info[2];
            const index = info[1];
            this.insertBlock(d.id, parentId, index);
        } else if (overlapInfo) {
            const targetBlockId = overlapInfo.id.split("-")[1];
            this.attachBlock(d.id, targetBlockId, overlapInfo.side)
        } else {
            // ログ出力
            const { foundBlock } = this.findBlock(d.id);
            if (foundBlock) {
                this.onLogEvent('BLOCK_INTERACTION', {
                    sub_type: 'move',
                    description: `Moved block '${createBlockSnapshot(foundBlock).string_rep}'.`,
                    block: createBlockSnapshot(foundBlock),
                    position: { x: Math.round(foundBlock.x), y: Math.round(foundBlock.y) }
                });
            }
            this.moveBlockToGrid(d.id);
            this.formatBlock(d.id);
        }


        this.draggedBlockId = null;
        if (this.findBlock(d.id).foundBlock) {
            this.updateBlock(d.id);
        }
        this.deemphasizeAllPlaceholder();
        this.onDirty();
    }

    /*当たり判定***********************************************************************************************************************************************************************************************************************************************************************************************************************/

    detectOverlapAndHighlight(d) {
        const placeholderInfo = this.detectPlaceholderOverlap(d, d.x, d.y);
        const overlapInfo = this.detectBlockOverlap(d);

        this.grabbingHighlight(d.id, true, false);
        if (placeholderInfo && placeholderInfo.isValid) {
            this.deemphasizeAllBlock();
            this.emphasizePlaceholder(placeholderInfo.id);
        } else {
            this.deemphasizeAllPlaceholder();
            if (overlapInfo) {
                const targetBlockId = overlapInfo.id;
                this.emphasizeBlock(targetBlockId);
            } else {
                if (placeholderInfo && !placeholderInfo.isValid) {
                    this.emphasizePlaceholder(placeholderInfo.id, true);
                    this.grabbingHighlight(d.id, true, true);
                }
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
            const isValid = this.validate(expectedBlock);
            return { id: bestPlaceholderId, isValid: isValid };
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

    deleteBlock(blockId) {
        // ログ出力
        const { foundBlock } = this.findBlock(blockId);
        if (foundBlock) {
            const deletedSnapshot = createBlockSnapshot(foundBlock);
            this.onLogEvent('BLOCK_INTERACTION', {
                sub_type: 'deletion',
                description: `Deleted block '${deletedSnapshot.string_rep}'.`,
                block: deletedSnapshot
            });
        }

        // First, update the data model by removing the block
        this.removeBlock(blockId);

        // Then, remove the block's SVG element from the DOM
        const blockUI = d3.select(`#${blockId}`);
        if (!blockUI.empty()) {
            blockUI.remove();
        }
        this.onDirty();
    }

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

        if (!targetParent || !targetParent.children[index] || targetParent.children[index].type !== "placeholder") {
            console.error(`previewInsertion: Invalid target at index ${index}. Child is:`, targetParent.children[index]);
            return;
        }

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
                    // Skip hidden children
                    if (child.hidden || child.resolved) continue;

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
    moveBlockToTopLevel(id, hop = false) {
        const foundResult = this.findBlock(id);
        if (!foundResult.parentBlock) return;

        // データの変更
        let block = foundResult.foundBlock;
        block.x = foundResult.absoluteX;
        block.y = foundResult.absoluteY;
        if (hop) {
            block.x += 16;
            block.y += 16;
        }
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

        // ログ出力
        const { foundBlock: draggedBlock } = this.findBlock(id);
        const { rootParent: targetParentBefore } = this.findBlock(targetParentId);
        if (draggedBlock && targetParentBefore && updatedParent) {
            const draggedBlockSnapshot = createBlockSnapshot(draggedBlock);
            const originalParentSnapshot = createBlockSnapshot(targetParentBefore);
            const resultParentSnapshot = createBlockSnapshot(updatedParent);

            let description = `Inserted block '${draggedBlockSnapshot.string_rep}' into '${originalParentSnapshot.string_rep}'.`;
            description += ` Result: ${resultParentSnapshot.string_rep}`;

            this.onLogEvent('BLOCK_INTERACTION', {
                sub_type: 'insertion',
                description: description,
                dragged_block: draggedBlockSnapshot,
                original_parent: originalParentSnapshot,
                result_parent: resultParentSnapshot,
            });
        }

        if (!updatedParent) {
            console.error("Insertion failed, preview returned nothing. Aborting.");
            // We might need to move the block back to the grid if insertion fails.
            this.moveBlockToGrid(id);
            this.updateBlock(id); // Rerender the dragged block at its new position
            return;
        }
        this.removeBlock(id);
        this.updateBlockInData(updatedParent);
        // Update translation for the updated parent/root
        this.updateBlockTranslation(updatedParent);
        this.renderBlocks();
    }

    attachBlock(id, targetParentId, side) {
        const updatedParent = this.previewAttachment(id, targetParentId, side);

        // ログ出力
        const { foundBlock: draggedBlock } = this.findBlock(id);
        const { rootParent: targetParentBefore } = this.findBlock(targetParentId);
        if (draggedBlock && targetParentBefore && updatedParent) {
            const draggedBlockSnapshot = createBlockSnapshot(draggedBlock);
            const originalParentSnapshot = createBlockSnapshot(targetParentBefore);
            const resultParentSnapshot = createBlockSnapshot(updatedParent);

            let description = `Attached block '${draggedBlockSnapshot.string_rep}' to '${originalParentSnapshot.string_rep}'.`;
            description += ` Result: ${resultParentSnapshot.string_rep}`;

            this.onLogEvent('BLOCK_INTERACTION', {
                sub_type: 'attachment',
                description: description,
                dragged_block: draggedBlockSnapshot,
                original_parent: originalParentSnapshot,
                result_parent: resultParentSnapshot // Add result state
            });
        }

        this.removeBlock(id);
        this.updateBlockInData(updatedParent);
        // Update translation for the updated parent/root
        this.updateBlockTranslation(updatedParent);
        this.renderBlocks();
    }

    formatBlock(id) {
        const block = this.findBlock(id).rootParent;
        if (!block) return;
        const originalHiddenStates = block.children.map(child => child.hidden);
        const targetStateBlock = this.converter.formatBlock(block);
        targetStateBlock.children.forEach((child, index) => {
            const wasVisible = !originalHiddenStates[index];
            const isNowHidden = child.hidden;
            const originalChild = block.children.find(c => c.id === child.id);

            if (wasVisible && isNowHidden && originalChild && originalChild.content) {
                this.moveBlockToTopLevel(originalChild.content.id, true);
            }
        });
        const finalNewBlock = this.converter.formatBlock(block);
        this.updateBlockInData(finalNewBlock);
        this.updateBlock(block.id);
    }

    /*ハイライト表示***********************************************************************************************************************************************************************************************************************************************************************************************************************/

    grabbingCursor(blockId, isDragging) {
        const id = `#${blockId}`;
        d3.select(id).raise();
        d3.select(id)
            .classed("grab", !isDragging)
            .classed("grabbing", isDragging);
    }

    grabbingHighlight(blockId, isDragging, isError = false) {
        const id = `#${blockId}`;
        this.grabbingCursor(blockId, isDragging)

        const frameId = `#frame-${blockId}`;
        const block = this.findBlock(blockId).foundBlock;
        if (!block) return;

        const strokeColor = isDragging ? isError ? "red" : "yellow" : this.darkenColor(block.color, 30);
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

    emphasizePlaceholder(id, isError = false) {
        this.deemphasizeAllPlaceholder();
        d3.select(`#${id}`).attr("stroke-width", highlightStrokeWidth).attr("stroke", isError ? "red" : "yellow");
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
        if (!phraseInput) return false;
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
            if (child.resolved && child.type === "placeholder") {
                // Add the width of the resolved gap circle (its diameter).
                width += resolvedGapRadius * 2;
            } else if (child.type === "placeholder") {
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
        const children = block.children.filter((child) => (!child.hidden && child.resolved !== true));
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