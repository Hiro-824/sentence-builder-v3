import { Block } from "@/models/block";
import { Generator } from "@/grammar/generator";

const generator = new Generator();

export const blockEvery: Block = generator.createTemporalAdverbialBlock({
    id: "every",
    word: "every",
    translationPrefix: "毎"
});

export const blockWell: Block = {
    id: "well_adverb",
    x: 0,
    y: 0,
    isRound: true,
    words: [
        {
            token: "well",
            categories: [
                {
                    head: { type: "adverb", manner: true, meaning: "skill", form: "base", isGradable: true },
                    leftModTargets: [{ head: { type: "verb", adv_manner_type: "skill" } }],
                    translationTemplates: { default: ["上手に"] }
                },
                {
                    head: { type: "adverb", manner: true, meaning: "degree", form: "base", isGradable: true },
                    leftModTargets: [{ head: { type: "verb", adv_manner_type: "degree" } }],
                    translationTemplates: { default: ["よく"] }
                }
            ]
        },
        {
            token: "better",
            categories: [
                // "skill" meaning
                {
                    head: { type: "adverb", manner: true, meaning: "skill", form: "comparative" },
                    leftModTargets: [{ head: { type: "verb", adv_manner_type: "skill" } }],
                    translationTemplates: { default: ["もっと上手に"] }
                },
                // "degree" meaning
                {
                    head: { type: "adverb", manner: true, meaning: "degree", form: "comparative" },
                    leftModTargets: [{ head: { type: "verb", adv_manner_type: "degree" } }],
                    translationTemplates: { default: ["もっとよく"] }
                }
            ]
        },
        {
            token: "best",
            categories: [
                // "skill" meaning
                {
                    head: { type: "adverb", manner: true, meaning: "skill", form: "superlative" },
                    leftModTargets: [{ head: { type: "verb", adv_manner_type: "degree" } }],
                    translationTemplates: { default: ["いちばん上手に"] }
                },
                // "degree" meaning
                {
                    head: { type: "adverb", manner: true, meaning: "degree", form: "superlative" },
                    leftModTargets: [{ head: { type: "verb", adv_manner_type: "degree" } }],
                    translationTemplates: { default: ["いちばんよく"] }
                }
            ]
        }
    ],

    color: "Coral",

    children: [{
        id: "head",
        hidden: false,
        type: "dropdown",
        content: ["well", "better", "best"],
        selected: 0,
    }]
};

export const blockFast: Block = {
    id: "fast",
    x: 0,
    y: 0,
    isRound: true,
    words: [
        {
            token: "fast",
            categories: [
                {
                    head: { type: "adverb", manner: true, form: "base", isGradable: true },
                    leftModTargets: [{ head: { type: "verb", adv_manner_type: "skill" } }],
                    translationTemplates: { default: ["速く"] }
                },
            ]
        },
        {
            token: "faster",
            categories: [
                {
                    head: { type: "adverb", manner: true, form: "comparative" },
                    leftModTargets: [{ head: { type: "verb", adv_manner_type: "skill" } }],
                    translationTemplates: { default: ["もっと速く"] }
                },
            ]
        },
        {
            token: "fastest",
            categories: [
                {
                    head: { type: "adverb", manner: true, form: "superlative" },
                    leftModTargets: [{ head: { type: "verb", adv_manner_type: "degree" } }],
                    translationTemplates: { default: ["いちばん速く"] }
                }
            ]
        }
    ],

    color: "Coral",

    children: [{
        id: "head",
        hidden: false,
        type: "dropdown",
        content: ["fast", "faster", "fastest"],
        selected: 0,
    }]
};

export const blockVery: Block = {
    id: "very_adverb",
    x: 0,
    y: 0,
    isRound: true,
    words: [{
        token: "very",
        categories: [{
            head: { type: "adverb", degree: true },

            rightModTargets: [
                { head: { type: "adj", form: "base", isGradable: true } },
                { head: { type: "adverb", form: "base", isGradable: true } }
            ],

            translationTemplates: {
                default: ["とても"]
            }
        }]
    }],
    color: "Coral",
    children: [{
        id: "head",
        hidden: false,
        type: "text",
        content: "very"
    }]
};