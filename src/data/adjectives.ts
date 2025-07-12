import { AdjectiveConfig, Generator } from "@/grammar/generator";
import { Block } from "@/models/block";

const generator = new Generator();

const configBig: AdjectiveConfig = {
    id: "adjective_big",
    base: "big",
    comparative: "bigger",
    superlative: "biggest",
    translation: {
        default: "大きい",
        predicative: "大きい",
        past: "大きかった"
    }
};

const configInteresting: AdjectiveConfig = {
    id: "adjective_interesting",
    base: "interesting",
    comparative: "more interesting",
    superlative: "most interesting",
    translation: {
        default: "興味深い",
        predicative: "興味深い",
        past: "興味深かった"
    }
};

export const blockBig = generator.createAdjectiveBlock(configBig);
export const blockInteresting = generator.createAdjectiveBlock(configInteresting);

export const allAdjectiveBlocks: Block[] = [
    blockBig,
    blockInteresting
];