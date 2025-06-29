import { AdjectiveConfig, Generator } from "@/grammar/generator";
import { Block } from "@/models/block";

const generator = new Generator();

const configBig: AdjectiveConfig = {
    id: "adjective_big",
    base: "big",
    comparative: "bigger",
    superlative: "biggest",
    translation: "大きい"
};

const configInteresting: AdjectiveConfig = {
    id: "adjective_interesting",
    base: "interesting",
    comparative: "more interesting",
    superlative: "most interesting",
    translation: "面白い"
};

export const blockBig = generator.createAdjectiveBlock(configBig);
export const blockInteresting = generator.createAdjectiveBlock(configInteresting);

export const allAdjectiveBlocks: Block[] = [
    blockBig,
    blockInteresting
];