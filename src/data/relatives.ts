import { Generator, RelativePronounConfig } from "@/grammar/generator";
import { Block } from "@/models/block";

const generator = new Generator();

const configWho: RelativePronounConfig = {
    id: "rel_pron_who",
    word: "who",
    antecedentFeatures: { human: true }, // Requires the antecedent to be human
    gapCase: undefined, // No specific case required for the gap
    color: "mediumseagreen"
};

const configWhom: RelativePronounConfig = {
    id: "rel_pron_whom",
    word: "whom",
    antecedentFeatures: { human: true },
    gapCase: 'acc',
    color: "mediumseagreen"
};

const configWhich: RelativePronounConfig = {
    id: "rel_pron_which",
    word: "which",
    antecedentFeatures: { human: false },
    gapCase: undefined,
    color: "mediumseagreen"
};

const configThat: RelativePronounConfig = {
    id: "rel_pron_that",
    word: "that",
    antecedentFeatures: {},
    gapCase: undefined,
    color: "mediumseagreen"
};

export const blockWhoRelative = generator.createRelativePronounBlock(configWho);
export const blockWhomRelative = generator.createRelativePronounBlock(configWhom);
export const blockWhichRelative = generator.createRelativePronounBlock(configWhich);
export const blockThatRelative = generator.createRelativePronounBlock(configThat);

export const allRelativePronounBlocks: Block[] = [
    blockWhoRelative,
    blockWhomRelative,
    blockWhichRelative,
    blockThatRelative,
];