import { Generator, VerbConfig } from "@/grammar/generator";
import { Block } from "@/models/block";
import { det } from "@/models/grammar-entities";

const generator = new Generator();

const configRun: VerbConfig = {
    id: "run_verb",
    forms: { base: "run", es: "runs", ed: "ran", en: "run", ing: "running" },
    adv_manner_type: "skill",
    complements: [],
    transitive: false,
    translations: {
        present: { default: "走る", imperfective: "走ら", past: "走った" },
        past: { default: "走った" },
        progressive: { default: "走っているところ", nonPredicate: "走っている", },
        perfect: { default: "既に走っている" },
        noun: { default: "走ること", no: "走るの", past: "走ったこと", pastNo: "走ったの" }
    },
    gerundSubject: false,
    toSubject: false
};

const configRead: VerbConfig = {
    id: "read_verb",
    forms: { base: "read", es: "reads", ed: "read", en: "read", ing: "reading" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "読む", imperfective: "読ま", past: "読んだ" },
        past: { default: "読んだ" },
        progressive: { default: "読んでいるところ", nonPredicate: "読んでいる", },
        perfect: { default: "既に読んでいる" },
        passive: { default: "読まれ" },
        noun: { default: "読むこと", no: "読むの", past: "読んだこと", pastNo: "読んだの" }
    },
    gerundSubject: false,
    toSubject: false
};

const configSee: VerbConfig = {
    id: "see_verb",
    forms: { base: "see", es: "sees", ed: "saw", en: "seen", ing: "seeing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "見る", imperfective: "見な", past: "見た" },
        past: { default: "見た" },
        progressive: { default: "見ているところ", nonPredicate: "見ている", },
        perfect: { default: "既に見ている" },
        passive: { default: "見られ" },
        noun: { default: "見ること", no: "見るの", past: "見たこと", pastNo: "見たの" }
    },
    gerundSubject: false,
    toSubject: false
};

const configHave: VerbConfig = {
    id: "have_verb",
    forms: { base: "have", es: "has", ed: "had", en: "had", ing: "having" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "持っている", imperfective: "持ってい", past: "持っていた" },
        past: { default: "持っていた" },
        progressive: { default: "持っているところ", nonPredicate: "持っている", },
        perfect: { default: "すでに持っている" },
        passive: { default: "所有されてい" },
        noun: { default: "持っていること", no: "持っているの", past: "持っていたこと", pastNo: "持っていたの" }
    },
    gerundSubject: false,
    toSubject: false
};

const configGive: VerbConfig = {
    id: "give_verb",
    forms: { base: "give", es: "gives", ed: "gave", en: "given", ing: "giving" },
    complements: [
        { expected: { head: { type: det, case: "acc" } }, particle: "に" },
        { expected: { head: { type: det, case: "acc" } }, particle: "を" }
    ],
    transitive: true,
    translations: {
        present: { default: "与える", imperfective: "与え", past: "与えた" },
        past: { default: "与えた" },
        progressive: { default: "与えているところ", nonPredicate: "与えている", },
        perfect: { default: "既に与えている" },
        passive: { default: "あたえられ" },
        noun: { default: "与えること", no: "与えるの", past: "与えたこと", pastNo: "与えたの" }
    },
    gerundSubject: true,
    toSubject: true
};

const knowConfig: VerbConfig = {
    id: "know",
    adv_manner_type: 'degree',
    forms: { base: "know", es: "knows", ed: "knew", en: "known", ing: "knowing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    gerundSubject: true,
    toSubject: true,
    translations: {
        present: { default: "知っている", imperfective: "知ってい", past: "知っていた" },
        past: { default: "知っていた" },
        progressive: { default: "知っているところ", nonPredicate: "知っている", },
        perfect: { default: "既に知っている" },
        passive: { default: "知られてい" },
        noun: { default: "知っていること" }
    },
    color: "tomato",
};

const playConfig: VerbConfig = {
    id: "play",
    adv_manner_type: 'skill',
    forms: { base: "play", es: "plays", ed: "played", en: "played", ing: "playing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    gerundSubject: true,
    toSubject: true,
    translations: {
        present: { default: "する", imperfective: "し", past: "した" },
        past: { default: "した" },
        progressive: { default: "しているところ", nonPredicate: "している", },
        perfect: { default: "既にしている" },
        passive: { default: "され" },
        noun: { default: "すること" }
    },
    color: "tomato",
};

const configLike: VerbConfig = {
    id: "like_verb",
    forms: { base: "like", es: "likes", ed: "liked", en: "liked", ing: "liking" },
    adv_manner_type: 'degree',
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "が" }],
    transitive: true,
    gerundSubject: true,
    toSubject: true,
    translations: {
        present: { default: "好きです", imperfective: "好きで", past: "好きだった" },
        past: { default: "好きだった" },
        progressive: { default: "好きになっているところ", nonPredicate: "好きになっている", },
        perfect: { default: "好きでいた" },
        passive: { default: "好まれ" },
        noun: { default: "好きなこと" }
    }
};

const configBuy: VerbConfig = {
    id: "buy_verb",
    forms: { base: "buy", es: "buys", ed: "bought", en: "bought", ing: "buying" },
    adv_manner_type: 'skill',
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    gerundSubject: true,
    toSubject: true,
    translations: {
        present: { default: "買う", imperfective: "買わ", past: "買った" },
        past: { default: "買った" },
        progressive: { default: "買っているところ", nonPredicate: "買っている", },
        perfect: { default: "既に買った" },
        passive: { default: "買われ" },
        noun: { default: "買うこと", no: "買うの", past: "買ったこと", pastNo: "買ったの" }
    }
};

const configGo: VerbConfig = {
    id: "go_verb",
    forms: { base: "go", es: "goes", ed: "went", en: "gone", ing: "going" },
    adv_manner_type: 'skill',
    complements: [],
    transitive: false,
    gerundSubject: true,
    toSubject: true,
    translations: {
        present: { default: "行く", imperfective: "行か", past: "行った" },
        past: { default: "行った" },
        progressive: { default: "行っているところ", nonPredicate: "行っている", },
        perfect: { default: "既に行った" },
        noun: { default: "行くこと", no: "行くの", past: "行ったこと", pastNo: "行ったの" }
    }
};

const configWant: VerbConfig = {
    id: "want_verb",
    forms: { base: "want", es: "wants", ed: "wanted", en: "wanted", ing: "wanting" },
    adv_manner_type: 'degree',
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "が" }],
    transitive: true,
    gerundSubject: true,
    toSubject: true,
    translations: {
        present: { default: "欲しい", imperfective: "欲しく", past: "欲しかった" },
        past: { default: "欲しかった" },
        progressive: { default: "欲しがっているところ", nonPredicate: "欲しがっている", },
        perfect: { default: "欲しがってきた" },
        passive: { default: "欲しがられ" },
        noun: { default: "欲しいこと" }
    }
};

export const verbRun = generator.createVerbBlock(configRun);
export const verbHave = generator.createVerbBlock(configHave);
export const verbRead = generator.createVerbBlock(configRead);
export const verbSee = generator.createVerbBlock(configSee);
export const verbGive = generator.createVerbBlock(configGive);
export const blockKnow: Block = generator.createVerbBlock(knowConfig);
export const blockPlay: Block = generator.createVerbBlock(playConfig);
export const verbLike = generator.createVerbBlock(configLike);
export const verbBuy = generator.createVerbBlock(configBuy);
export const verbGo = generator.createVerbBlock(configGo);
export const verbWant = generator.createVerbBlock(configWant);

export const allVerbBlocks: Block[] = [
    verbGo,
    verbRun,
    verbHave,
    verbRead,
    verbSee,
    blockKnow,
    blockPlay,
    verbLike,
    verbBuy,
    verbWant,
    verbGive
];