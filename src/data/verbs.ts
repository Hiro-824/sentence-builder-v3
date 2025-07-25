import { Generator, VerbConfig } from "@/grammar/generator";
import { Block } from "@/models/block";
import { det } from "@/models/grammar-entities";

const generator = new Generator();

const configRun: VerbConfig = {
    id: "run_verb",
    forms: {
        base: "run",
        es: "runs",
        ed: "ran",
        en: "run",
        ing: "running"
    },
    complements: [],
    transitive: false,
    translations: {
        present: {
            default: "走る",
            imperfective: "走ら",
            past: "走った"
        },
        past: {
            default: "走った"
        },
        progressive: {
            default: "走っているところ"
        },
        perfect: {
            default: "既に走っている"
        },
        noun: {
            default: "走ること",
            no: "走るの",
            past: "走ったこと",
            pastNo: "走ったの"
        }
    },
    gerundSubject: false,
    toSubject: false
};

const configRead: VerbConfig = {
    id: "read_verb",
    forms: {
        base: "read",
        es: "reads",
        ed: "read",
        en: "read",
        ing: "reading"
    },
    complements: [{
        expected: {
            head: { type: det, case: "acc" }
        },
        particle: "を"
    }],
    transitive: true,
    translations: {
        present: {
            default: "読む",
            imperfective: "読ま",
            past: "読んだ"
        },
        past: {
            default: "読んだ"
        },
        progressive: {
            default: "読んでいるところ"
        },
        perfect: {
            default: "既に読んでいる"
        },
        passive: {
            default: "読まれる"
        },
        noun: {
            default: "読むこと",
            no: "読むの",
            past: "読んだこと",
            pastNo: "読んだの"
        }
    },
    gerundSubject: false,
    toSubject: false
};

const configGive: VerbConfig = {
    id: "give_verb",
    forms: {
        base: "give",
        es: "gives",
        ed: "gave",
        en: "given",
        ing: "giving"
    },
    complements: [{
        expected: {
            head: { type: det, case: "acc" }
        },
        particle: "に"
    }, {
        expected: {
            head: { type: det, case: "acc" }
        },
        particle: "を"
    }],
    transitive: true,
    translations: {
        present: {
            default: "あげる",
            imperfective: "あげ",
            past: "あげた"
        },
        past: {
            default: "あげた"
        },
        progressive: {
            default: "あげているところ"
        },
        perfect: {
            default: "既にあげている"
        },
        passive: {
            default: "あたえられる"
        },
        noun: {
            default: "あげること",
            no: "あげるの",
            past: "あげたこと",
            pastNo: "あげたの"
        }
    },
    gerundSubject: true,
    toSubject: true
};

export const verbRun = generator.createVerbBlock(configRun);
export const verbRead = generator.createVerbBlock(configRead);
export const verbGive = generator.createVerbBlock(configGive);

export const allVerbBlocks: Block[] = [
    verbRun,
    verbRead,
    verbGive
];