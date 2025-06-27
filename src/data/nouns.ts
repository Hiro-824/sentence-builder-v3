import { Generator, NounConfig } from "@/grammar/generator";
import { Block } from "@/models/block";

const generator = new Generator();

const configBook: NounConfig = {
    id: "noun_book",
    isCountable: true,
    singularForm: "book",
    pluralForm: "books",
    translation: "本"
};

const configChild: NounConfig = {
    id: "noun_child",
    isCountable: true,
    singularForm: "child",
    pluralForm: "children",
    translation: "子供"
};

const configInformation: NounConfig = {
    id: "noun_information",
    isCountable: false,
    singularForm: "information",
    translation: "情報"
};

const configWater: NounConfig = {
    id: "noun_water",
    isCountable: false,
    singularForm: "water",
    translation: "水"
};

export const blockBook = generator.createNounBlock(configBook);
export const blockChild = generator.createNounBlock(configChild);
export const blockInformation = generator.createNounBlock(configInformation);
export const blockWater = generator.createNounBlock(configWater);

export const allNounBlocks: Block[] = [
    blockBook,
    blockChild,
    blockInformation,
    blockWater,
];