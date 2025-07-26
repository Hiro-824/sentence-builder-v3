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
                // "skill" meaning
                {
                    head: { type: "adverb", manner: true, meaning: "skill", form: "base" },
                    leftModTargets: [{ head: { type: "verb", adv_manner_type: "skill" } }],
                    translationTemplates: { default: ["上手に"] }
                },
                // "degree" meaning
                {
                    head: { type: "adverb", manner: true, meaning: "degree", form: "base" },
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

    color: "orange",

    children: [{
        id: "head",
        hidden: false,
        type: "dropdown",
        content: ["well", "better", "best"],
        selected: 0,
    }]
};