import { Generator, VerbConfig } from "@/grammar/generator";
import { Block } from "@/models/block";

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
            default: "走る"
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
    }
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
            head: { type: "det", case: "acc" }
        },
        particle: "を"
    }],
    transitive: true,
    translations: {
        present: {
            default: "読む"
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
    }
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
            head: { type: "det", case: "acc" }
        },
        particle: "に"
    }, {
        expected: {
            head: { type: "det", case: "acc" }
        },
        particle: "を"
    }],
    transitive: true,
    translations: {
        present: {
            default: "あげる"
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
    }
};

export const verbRun = generator.createVerbBlock(configRun);
export const verbRead = generator.createVerbBlock(configRead);
export const verbGive = generator.createVerbBlock(configGive);

export const allVerbBlocks: Block[] = [
    verbRun,
    verbRead,
    verbGive
];