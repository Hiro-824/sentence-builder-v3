import { Generator, PronounConfig } from "@/grammar/generator";
import { Block } from "@/models/block";

const generator = new Generator();

// --- Configuration Data for Each Pronoun ---

const configI: PronounConfig = {
    id: "pronoun_I",
    person: 1,
    number: 'sing',
    forms: {
        nominative: "I",
        accusative: "me",
        possessiveDet: "my",
        possessivePro: "mine",
        reflexive: "myself"
    },
    translations: {
        default: "私",
        possessiveDetPrefix: "私の",
        possessivePro: "私のもの",
        reflexive: "私自身"
    }
};

const configWe: PronounConfig = {
    id: "pronoun_we",
    person: 1,
    number: 'pl',
    forms: {
        nominative: "we",
        accusative: "us",
        possessiveDet: "our",
        possessivePro: "ours",
        reflexive: "ourselves"
    },
    translations: {
        default: "私たち",
        possessiveDetPrefix: "私たちの",
        possessivePro: "私たちのもの",
        reflexive: "私たち自身"
    }
};

const configYouSingular: PronounConfig = {
    id: "pronoun_you_sg",
    person: 2,
    number: 'sing',
    forms: {
        nominative: "you",
        accusative: "you",
        possessiveDet: "your",
        possessivePro: "yours",
        reflexive: "yourself"
    },
    translations: {
        default: "あなた",
        possessiveDetPrefix: "あなたの",
        possessivePro: "あなたのもの",
        reflexive: "あなた自身"
    }
};

const configYouPlural: PronounConfig = {
    id: "pronoun_you_pl",
    person: 2,
    number: 'pl',
    forms: {
        nominative: "you",
        accusative: "you",
        possessiveDet: "your",
        possessivePro: "yours",
        reflexive: "yourselves"
    },
    translations: {
        default: "あなたたち",
        possessiveDetPrefix: "あなたたちの",
        possessivePro: "あなたたちのもの",
        reflexive: "あなたたち自身"
    }
};

const configHe: PronounConfig = {
    id: "pronoun_he",
    person: 3,
    number: 'sing',
    forms: {
        nominative: "he",
        accusative: "him",
        possessiveDet: "his",
        possessivePro: "his", // Note: form is the same as possessiveDet
        reflexive: "himself"
    },
    translations: {
        default: "彼",
        possessiveDetPrefix: "彼の",
        possessivePro: "彼のもの",
        reflexive: "彼自身"
    }
};

const configShe: PronounConfig = {
    id: "pronoun_she",
    person: 3,
    number: 'sing',
    forms: {
        nominative: "she",
        accusative: "her",
        possessiveDet: "her",
        possessivePro: "hers",
        reflexive: "herself"
    },
    translations: {
        default: "彼女",
        possessiveDetPrefix: "彼女の",
        possessivePro: "彼女のもの",
        reflexive: "彼女自身"
    }
};

const configIt: PronounConfig = {
    id: "pronoun_it",
    person: 3,
    number: 'sing',
    forms: {
        nominative: "it",
        accusative: "it",
        possessiveDet: "its",
        possessivePro: "its", // Note: Possessive pronoun 'its' is rare but included
        reflexive: "itself"
    },
    translations: {
        default: "それ",
        possessiveDetPrefix: "それの",
        possessivePro: "それのもの",
        reflexive: "それ自身"
    }
};

const configThey: PronounConfig = {
    id: "pronoun_they",
    person: 3,
    number: 'pl',
    forms: {
        nominative: "they",
        accusative: "them",
        possessiveDet: "their",
        possessivePro: "theirs",
        reflexive: "themselves"
    },
    translations: {
        default: "彼ら", // Covers all genders in plural
        possessiveDetPrefix: "彼らの",
        possessivePro: "彼らのもの",
        reflexive: "彼ら自身"
    }
};

// --- Individual Block Exports ---
export const blockI = generator.createPronounBlock(configI);
export const blockWe = generator.createPronounBlock(configWe);
export const blockYouSingular = generator.createPronounBlock(configYouSingular);
export const blockYouPlural = generator.createPronounBlock(configYouPlural);
export const blockHe = generator.createPronounBlock(configHe);
export const blockShe = generator.createPronounBlock(configShe);
export const blockIt = generator.createPronounBlock(configIt);
export const blockThey = generator.createPronounBlock(configThey);
export const blockNum = generator.createNumeralPronounBlock();

// --- Grouped Export for UI ---
export const allPronounBlocks: Block[] = [
    blockI,
    blockWe,
    blockYouSingular,
    blockYouPlural,
    blockHe,
    blockShe,
    blockIt,
    blockThey,
    blockNum,
];