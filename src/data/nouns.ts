import { Generator, NounConfig } from "@/grammar/generator";
import { Block } from "@/models/block";
import { timeBlocks } from "./time-nominals";

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
    translation: "子供",
    pluralTranslation: "子供たち"
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

const configBird: NounConfig = {
    id: "noun_bird",
    isCountable: true,
    singularForm: "bird",
    pluralForm: "birds",
    translation: "鳥"
};

const configHand: NounConfig = {
    id: "noun_hand",
    isCountable: true,
    singularForm: "hand",
    pluralForm: "hands",
    translation: "手"
};

const configStudent: NounConfig = {
    id: "noun_student",
    isCountable: true,
    singularForm: "student",
    pluralForm: "students",
    translation: "学生"
};

const configName: NounConfig = {
    id: "noun_name",
    isCountable: true,
    singularForm: "name",
    pluralForm: "names",
    translation: "名前"
};

const configBag: NounConfig = {
    id: "noun_name",
    isCountable: true,
    singularForm: "bag",
    pluralForm: "bags",
    translation: "かばん"
};

const configBush: NounConfig = {
    id: "noun_bush",
    isCountable: true,
    singularForm: "bush",
    pluralForm: "bushes",
    translation: "低木"
};

const configPen: NounConfig = {
    id: "noun_pen",
    isCountable: true,
    singularForm: "pen",
    pluralForm: "pens",
    translation: "ペン"
};

const configTeacher: NounConfig = {
    id: "noun_teacher",
    isCountable: true,
    singularForm: "teacher",
    pluralForm: "teachers",
    translation: "先生"
};

const configBus: NounConfig = {
    id: "noun_bus",
    isCountable: true,
    singularForm: "bus",
    pluralForm: "buses",
    translation: "バス"
};

const configStation: NounConfig = {
    id: "noun_station",
    isCountable: true,
    singularForm: "station",
    pluralForm: "stations",
    translation: "駅"
};

const configBoy: NounConfig = {
    id: "noun_boy",
    isCountable: true,
    singularForm: "boy",
    pluralForm: "boys",
    translation: "少年",
    pluralTranslation: "少年たち"
};

const configGirl: NounConfig = {
    id: "noun_girl",
    isCountable: true,
    singularForm: "girl",
    pluralForm: "girls",
    translation: "少女",
    pluralTranslation: "少女たち"
};

const configMan: NounConfig = {
    id: "noun_man",
    isCountable: true,
    singularForm: "man",
    pluralForm: "men",
    translation: "男性",
    pluralTranslation: "男性たち"
};

const configWoman: NounConfig = {
    id: "noun_woman",
    isCountable: true,
    singularForm: "woman",
    pluralForm: "women",
    translation: "女性",
    pluralTranslation: "女性たち"
};

export const blockBook = generator.createNounBlock(configBook);
export const blockChild = generator.createNounBlock(configChild);
export const blockInformation = generator.createNounBlock(configInformation);
export const blockWater = generator.createNounBlock(configWater);
export const blockBird = generator.createNounBlock(configBird);
export const blockHand = generator.createNounBlock(configHand);
export const blockBag = generator.createNounBlock(configBag);
export const blockBush = generator.createNounBlock(configBush);
export const blockStudent = generator.createNounBlock(configStudent);
export const blockName = generator.createNounBlock(configName);
export const blockPen = generator.createNounBlock(configPen);
export const blockTeacher = generator.createNounBlock(configTeacher);
export const blockBus = generator.createNounBlock(configBus);
export const blockStation = generator.createNounBlock(configStation);
export const blockBoy = generator.createNounBlock(configBoy);
export const blockGirl = generator.createNounBlock(configGirl);
export const blockMan = generator.createNounBlock(configMan);
export const blockWoman = generator.createNounBlock(configWoman);

export const blockJohn = generator.createProperNounBlock("John", "ジョン");
export const blockMary = generator.createProperNounBlock("Mary", "メアリー");

export const allNounBlocks: Block[] = [
    blockBook,
    blockChild,
    blockBird,
    blockHand,
    blockStudent,
    blockName,
    blockBag,
    blockBush,
    blockPen,
    blockTeacher,
    blockBus,
    blockStation,
    blockBoy,
    blockGirl,
    blockMan,
    blockWoman,
    blockInformation,
    blockWater,
    blockJohn,
    blockMary,
    ...timeBlocks
];