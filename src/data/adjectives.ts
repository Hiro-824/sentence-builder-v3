import { AdjectiveConfig, Generator } from "@/grammar/generator";
import { Block } from "@/models/block";

const generator = new Generator();

const configBig: AdjectiveConfig = {
    id: "adjective_big",
    base: "big",
    comparative: "bigger",
    superlative: "biggest",
    isGradable: true,
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
    isGradable: true,
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

const configNew: AdjectiveConfig = {
    id: "adjective_new",
    base: "new",
    comparative: "newer",
    superlative: "newest",
    isGradable: true,
    translation: {
        default: "新しい",
        predicative: "新しい",
        past: "新しかった",
        predNeg: "新しくない",
        pastNeg: "新しくなかった",
        predQ: "新しいのか",
        pastQ: "新しかったのか"
    }
};

const configOld: AdjectiveConfig = {
    id: "adjective_old",
    base: "old",
    comparative: "older",
    superlative: "oldest",
    isGradable: true,
    translation: {
        default: "古い",
        predicative: "古い",
        past: "古かった",
        predNeg: "古くない",
        pastNeg: "古くなかった",
        predQ: "古いのか",
        pastQ: "古かったのか"
    }
};

const configGood: AdjectiveConfig = {
    id: "adjective_good",
    base: "good",
    comparative: "better",
    superlative: "best",
    isGradable: true,
    translation: {
        default: "良い",
        predicative: "良い",
        past: "良かった",
        predNeg: "良くない",
        pastNeg: "良くなかった",
        predQ: "良いのか",
        pastQ: "良かったのか"
    }
};

const configBad: AdjectiveConfig = {
    id: "adjective_bad",
    base: "bad",
    comparative: "worse",
    superlative: "worst",
    isGradable: true,
    translation: {
        default: "悪い",
        predicative: "悪い",
        past: "悪かった",
        predNeg: "悪くない",
        pastNeg: "悪くなかった",
        predQ: "悪いのか",
        pastQ: "悪かったのか"
    }
};

const configSmall: AdjectiveConfig = {
    id: "adjective_small",
    base: "small",
    comparative: "smaller",
    superlative: "smallest",
    isGradable: true,
    translation: {
        default: "小さい",
        predicative: "小さい",
        past: "小さかった",
        predNeg: "小さくない",
        pastNeg: "小さくなかった",
        predQ: "小さいのか",
        pastQ: "小さかったのか"
    }
};

const configHot: AdjectiveConfig = {
    id: "adjective_hot",
    base: "hot",
    comparative: "hotter",
    superlative: "hottest",
    isGradable: true,
    translation: {
        default: "暑い",
        predicative: "暑い",
        past: "暑かった",
        predNeg: "暑くない",
        pastNeg: "暑くなかった",
        predQ: "暑いのか",
        pastQ: "暑かったのか"
    }
};

const configCold: AdjectiveConfig = {
    id: "adjective_cold",
    base: "cold",
    comparative: "colder",
    superlative: "coldest",
    isGradable: true,
    translation: {
        default: "寒い",
        predicative: "寒い",
        past: "寒かった",
        predNeg: "寒くない",
        pastNeg: "寒くなかった",
        predQ: "寒いのか",
        pastQ: "寒かったのか"
    }
};

const configDelicious: AdjectiveConfig = {
    id: "adjective_delicious",
    base: "delicious",
    comparative: "more delicious",
    superlative: "most delicious",
    isGradable: true,
    translation: {
        default: "美味しい",
        predicative: "美味しい",
        past: "美味しかった",
        predNeg: "美味しくない",
        pastNeg: "美味しくなかった",
        predQ: "美味しいのか",
        pastQ: "美味しかったのか"
    }
};

const configHappy: AdjectiveConfig = {
    id: "adjective_happy",
    base: "happy",
    comparative: "happier",
    superlative: "happiest",
    isGradable: true,
    translation: {
        default: "嬉しい",
        predicative: "嬉しい",
        past: "嬉しかった",
        predNeg: "嬉しくない",
        pastNeg: "嬉しくなかった",
        predQ: "嬉しいのか",
        pastQ: "嬉しかったのか"
    }
};

const configFun: AdjectiveConfig = {
    id: "adjective_fun",
    base: "fun",
    comparative: "more fun",
    superlative: "most fun",
    isGradable: true,
    translation: {
        default: "楽しい",
        predicative: "楽しい",
        past: "楽しかった",
        predNeg: "楽しくない",
        pastNeg: "楽しくなかった",
        predQ: "楽しいのか",
        pastQ: "楽しかったのか"
    }
};

export const blockBig = generator.createAdjectiveBlock(configBig);
export const blockInteresting = generator.createAdjectiveBlock(configInteresting);
export const blockNew = generator.createAdjectiveBlock(configNew);
export const blockOld = generator.createAdjectiveBlock(configOld);
export const blockGood = generator.createAdjectiveBlock(configGood);
export const blockBad = generator.createAdjectiveBlock(configBad);
export const blockSmall = generator.createAdjectiveBlock(configSmall);
export const blockHot = generator.createAdjectiveBlock(configHot);
export const blockCold = generator.createAdjectiveBlock(configCold);
export const blockDelicious = generator.createAdjectiveBlock(configDelicious);
export const blockHappy = generator.createAdjectiveBlock(configHappy);
export const blockFun = generator.createAdjectiveBlock(configFun);

export const allAdjectiveBlocks: Block[] = [
    blockBig,
    blockInteresting,
    blockNew,
    blockOld,
    blockGood,
    blockBad,
    blockSmall,
    blockHot,
    blockCold,
    blockDelicious,
    blockHappy,
    blockFun
];