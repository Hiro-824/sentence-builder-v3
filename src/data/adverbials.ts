import { Block } from "@/models/block";
import { Generator, NounConfig } from "@/grammar/generator";

const generator = new Generator();

// 1. Define the nouns that can follow "every"

const dayConfig: NounConfig = {
    id: "day",
    isCountable: true,
    singularForm: "day",
    pluralForm: "days",
    translation: "日",
    pluralTranslation: "日々",
    color: "dodgerblue"
};

const morningConfig: NounConfig = {
    id: "morning",
    isCountable: true,
    singularForm: "morning",
    pluralForm: "mornings",
    translation: "朝",
    color: "dodgerblue"
};

const nightConfig: NounConfig = {
    id: "night",
    isCountable: true,
    singularForm: "night",
    pluralForm: "nights",
    translation: "晩",
    color: "dodgerblue"
};

const weekConfig: NounConfig = {
    id: "week",
    isCountable: true,
    singularForm: "week",
    pluralForm: "weeks",
    translation: "週",
    color: "dodgerblue"
};

const monthConfig: NounConfig = {
    id: "month",
    isCountable: true,
    singularForm: "month",
    pluralForm: "months",
    translation: "月",
    color: "dodgerblue"
};

const year: NounConfig = {
    id: "year",
    isCountable: true,
    singularForm: "year",
    pluralForm: "years",
    translation: "年",
    color: "dodgerblue"
};

// 2. generatorerate the noun blocks using the existing Noun generatorerator

export const blockDay: Block = generator.createNounBlock(dayConfig);
export const blockMorning: Block = generator.createNounBlock(morningConfig);
export const blockNight: Block = generator.createNounBlock(nightConfig);
export const blockWeek: Block = generator.createNounBlock(weekConfig);
export const blockMonth: Block = generator.createNounBlock(monthConfig);
export const blockYear: Block = generator.createNounBlock(year);


export const timeBlocks = [
    blockMorning,
    blockNight,
    blockDay,
    blockWeek,
    blockMonth,
    blockYear,
]

export const blockEvery: Block = generator.createTemporalAdverbialBlock({
    id: "every",
    word: "every",
    translationPrefix: "毎"
});