import type { Block, BlockChild } from "@/models/block";
import type { FeatureStructure, Phrase } from "@/models/grammar-entities";

export type BlockShape =
  | "capsule"
  | "verb"
  | "adjective"
  | "adverb"
  | "preposition"
  | "sentence"
  | "rounded";

const featureType = (head?: FeatureStructure): string | undefined => {
  const value = head?.type;
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && typeof value.type === "string") {
    return value.type;
  }
  return undefined;
};

const shapeForPhrase = (phrase?: Phrase): BlockShape => {
  const type = featureType(phrase?.head);
  if (type === "nominal") return "capsule";
  if (type === "verb") return "verb";
  if (type === "adj") return "adjective";
  if (type === "adverb" || type === "temporal-adv" || type?.includes("adv")) {
    return "adverb";
  }
  if (type === "prep") return "preposition";
  if (type === "sentence") return "sentence";
  return "rounded";
};

const selectedCategory = (block: Block): Phrase | undefined => {
  const headChild = block.children.find((child) => child.id === "head");
  const selectedWord = headChild?.type === "dropdown" ? (headChild.selected ?? 0) : 0;
  return block.words[selectedWord]?.categories?.[0] ?? block.words[0]?.categories?.[0];
};

export const getBlockShape = (block: Block): BlockShape => {
  const shape = shapeForPhrase(selectedCategory(block));
  if (shape !== "rounded") return shape;
  return block.isRound ? "capsule" : "rounded";
};

const argumentChildren = (block: Block, side: "left" | "right") => {
  const headIndex = block.children.findIndex((child) => child.id === "head");
  return block.children.filter((child, index) => {
    if (child.hidden || (child.type !== "placeholder" && child.type !== "attachment")) {
      return false;
    }
    return side === "left" ? index < headIndex : index > headIndex;
  });
};

export const getPlaceholderShape = (block: Block, child: BlockChild): BlockShape => {
  const category = selectedCategory(block);
  if (!category) return "rounded";

  const childIndex = block.children.indexOf(child);
  const headIndex = block.children.findIndex((item) => item.id === "head");
  const side = childIndex < headIndex ? "left" : "right";
  const siblings = argumentChildren(block, side);
  const expected = category[side]?.[siblings.indexOf(child)];
  return shapeForPhrase(expected);
};

const roundedRectPath = (x: number, y: number, width: number, height: number, radius: number) => {
  const r = Math.min(radius, width / 2, height / 2);
  return [
    `M ${x + r} ${y}`,
    `H ${x + width - r}`,
    `Q ${x + width} ${y} ${x + width} ${y + r}`,
    `V ${y + height - r}`,
    `Q ${x + width} ${y + height} ${x + width - r} ${y + height}`,
    `H ${x + r}`,
    `Q ${x} ${y + height} ${x} ${y + height - r}`,
    `V ${y + r}`,
    `Q ${x} ${y} ${x + r} ${y}`,
    "Z",
  ].join(" ");
};

const wavyPath = (
  x: number,
  y: number,
  width: number,
  height: number,
  waves: number,
  amplitude: number,
) => {
  const side = Math.min(16, height / 4);
  const usable = width - side * 2;
  const step = usable / waves;
  const commands = [`M ${x + side} ${y + amplitude / 2}`];

  for (let index = 0; index < waves; index += 1) {
    const start = x + side + index * step;
    const end = start + step;
    const controlY = index % 2 === 0 ? y : y + amplitude;
    commands.push(`Q ${start + step / 2} ${controlY} ${end} ${y + amplitude / 2}`);
  }

  commands.push(`Q ${x + width} ${y + amplitude / 2} ${x + width} ${y + side}`);
  commands.push(`V ${y + height - side}`);
  commands.push(`Q ${x + width} ${y + height - amplitude / 2} ${x + width - side} ${y + height - amplitude / 2}`);

  for (let index = waves - 1; index >= 0; index -= 1) {
    const end = x + side + index * step;
    const start = end + step;
    const controlY = index % 2 === 0 ? y + height : y + height - amplitude;
    commands.push(`Q ${start - step / 2} ${controlY} ${end} ${y + height - amplitude / 2}`);
  }

  commands.push(`Q ${x} ${y + height - amplitude / 2} ${x} ${y + height - side}`);
  commands.push(`V ${y + side}`);
  commands.push(`Q ${x} ${y + amplitude / 2} ${x + side} ${y + amplitude / 2}`);
  commands.push("Z");
  return commands.join(" ");
};

export const buildShapePath = (
  shape: BlockShape,
  x: number,
  y: number,
  width: number,
  height: number,
): string => {
  if (shape === "capsule") {
    return roundedRectPath(x, y, width, height, height / 2);
  }
  if (shape === "verb") {
    const point = Math.min(18, width / 6);
    return [
      `M ${x + point} ${y}`,
      `H ${x + width - point}`,
      `L ${x + width} ${y + height / 2}`,
      `L ${x + width - point} ${y + height}`,
      `H ${x + point}`,
      `L ${x} ${y + height / 2}`,
      "Z",
    ].join(" ");
  }
  if (shape === "adjective") {
    return wavyPath(x, y, width, height, 3, Math.min(9, height / 7));
  }
  if (shape === "adverb") {
    return wavyPath(x, y, width, height, 6, Math.min(12, height / 6));
  }
  if (shape === "preposition") {
    const inset = Math.min(11, width / 8);
    return [
      `M ${x + inset} ${y}`,
      `H ${x + width - inset}`,
      `Q ${x + width} ${y} ${x + width - 2} ${y + inset}`,
      `Q ${x + width - inset} ${y + height / 2} ${x + width - 2} ${y + height - inset}`,
      `Q ${x + width} ${y + height} ${x + width - inset} ${y + height}`,
      `H ${x + inset}`,
      `Q ${x} ${y + height} ${x + 2} ${y + height - inset}`,
      `Q ${x + inset} ${y + height / 2} ${x + 2} ${y + inset}`,
      `Q ${x} ${y} ${x + inset} ${y}`,
      "Z",
    ].join(" ");
  }
  if (shape === "sentence") {
    const cut = Math.min(12, width / 8, height / 5);
    return [
      `M ${x + cut} ${y}`,
      `H ${x + width - cut}`,
      `L ${x + width} ${y + cut}`,
      `V ${y + height - cut}`,
      `L ${x + width - cut} ${y + height}`,
      `H ${x + cut}`,
      `L ${x} ${y + height - cut}`,
      `V ${y + cut}`,
      "Z",
    ].join(" ");
  }
  return roundedRectPath(x, y, width, height, 10);
};

