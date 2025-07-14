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
        past: "大きかった",
        predNeg: "大きくない",
        pastNeg: "大きくなかった",
        predQ: "大きいのか",
        pastQ: "大きかったのか"
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
        past: "興味深かった",
        predNeg: "興味深くない",
        pastNeg: "興味深くなかった",
        predQ: "興味深いのか",
        pastQ: "興味深かったのか"
    }
};

export const blockBig = generator.createAdjectiveBlock(configBig);
export const blockInteresting = generator.createAdjectiveBlock(configInteresting);

export const allAdjectiveBlocks: Block[] = [
    blockBig,
    blockInteresting
];