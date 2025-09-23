import { Generator } from "@/grammar/generator";
import { Block } from "@/models/block";
import { commonNominal, noun } from "@/models/grammar-entities";

const generator = new Generator();

export const blockCan: Block = generator.createModalBlock({
    id: "can_modal",
    word: "can",
    translation: "ことができる"
});

export const blockCould: Block = generator.createModalBlock({
    id: "could_modal",
    word: "could",
    translation: "かもしれない"
});

export const blockWill: Block = generator.createModalBlock({
    id: "will_modal",
    word: "will",
    preTranslation: "きっと",
    translation: "",
});

export const blockWould: Block = generator.createModalBlock({
    id: "would_modal",
    word: "would",
    translation: "だろう"
});

export const blockShould: Block = generator.createModalBlock({
    id: "should_modal",
    word: "should",
    translation: "べきだ"
});

export const blockMust: Block = generator.createModalBlock({
    id: "must_modal",
    word: "must",
    translationKey: "imperfective",
    translation: "なければならない"
});

export const blockMay: Block = generator.createModalBlock({
    id: "may_modal",
    word: "may",
    translation: "かもしれない"
});

export const blockMight: Block = generator.createModalBlock({
    id: "might_modal",
    word: "might",
    translation: "かもしれない"
});

export const blockCannot: Block = generator.createNegativeModalBlock({ id: "cannot_modal", word: "can", negativeWord: "cannot", translation: "ことができ", negativeTranslation: "ことができない" });
export const blockCouldNot: Block = generator.createNegativeModalBlock({ id: "couldnot_modal", word: "could", negativeWord: "could not", translation: "はずが", negativeTranslation: "はずがない" });
export const blockWont: Block = generator.createNegativeModalBlock({ id: "wont_modal", word: "will", negativeWord: "will not", preTranslation: "きっと", translation: "だろう", negativeTranslation: "ないだろう" });
export const blockWouldNot: Block = generator.createNegativeModalBlock({ id: "wouldnot_modal", word: "would", negativeWord: "would not", translation: "だろう", negativeTranslation: "ないだろう" });
export const blockShouldNot: Block = generator.createNegativeModalBlock({ id: "shouldnot_modal", word: "should", negativeWord: "should not", translation: "べきだ", negativeTranslation: "べきではない" });
export const blockMustNot: Block = generator.createNegativeModalBlock({ id: "mustnot_modal", word: "must", negativeWord: "must not", translation: "なければならない", negativeTranslation: "してはならない" });
export const blockMayNot: Block = generator.createNegativeModalBlock({ id: "maynot_modal", word: "may", negativeWord: "may not", translation: "かもしれない", negativeTranslation: "ないかもしれない" });
export const blockMightNot: Block = generator.createNegativeModalBlock({ id: "mightnot_modal", word: "might", negativeWord: "might not", translation: "かもしれない", negativeTranslation: "ないかもしれない" });

export const blockInvertedCan: Block = generator.createInvertedModalBlock({ id: "inverted_can_modal", word: "Can", translation: "できます" });
export const blockInvertedCould: Block = generator.createInvertedModalBlock({ id: "inverted_could_modal", word: "Could", translation: "いただけます" });
export const blockInvertedWill: Block = generator.createInvertedModalBlock({ id: "inverted_will_modal", word: "Will", preTranslation: "きっと", translation: "ます" });
export const blockInvertedWould: Block = generator.createInvertedModalBlock({ id: "inverted_would_modal", word: "Would", translation: "いただけます" });
export const blockInvertedShould: Block = generator.createInvertedModalBlock({ id: "inverted_should_modal", word: "Should", translation: "べきです" });
export const blockInvertedMust: Block = generator.createInvertedModalBlock({ id: "inverted_must_modal", word: "Must", translation: "なければなりません" });
export const blockInvertedMay: Block = generator.createInvertedModalBlock({ id: "inverted_may_modal", word: "May", translation: "もよろしいです" });
export const blockInvertedMight: Block = generator.createInvertedModalBlock({ id: "inverted_might_modal", word: "Might", translation: "のでしょうか" });

export const blockToInfinitive: Block = {
    id: "to_infinitive",
    x: 0,
    y: 0,
    undraggable: true,
    color: "orange",
    isRound: true,
    words: [{
        token: "",
        categories: [{
            head: { type: { type: "nominal", isTo: true, isDet: true }, agr: { type: "3sing" } },
            right: [{ head: { type: "verb", form: "base" } }],
            translationTemplates: {
                default: [{ path: ["right", 0], key: "default" }, "こと"],
                base: [{ path: ["right", 0], key: "default" }]
            }
        }]
    }],
    children: [
        {
            id: "head",
            hidden: false,
            type: "text",
            content: "to"
        },
        {
            id: "complement",
            hidden: false,
            type: "placeholder", // This is where the user will drop a verb like "swim".
            content: undefined
        }
    ]
};

export const blockAbleTo: Block = {
    id: "able_to",
    x: 0,
    y: 0,
    isRound: true,
    color: "CornflowerBlue", // Adjective color
    words: [{
        token: "",
        categories: [{
            head: { type: "adj" },
            right: [{ head: { type: { type: "nominal", isTo: true } } }],
            rightModTargets: [
                { head: { type: noun } },
                { head: { type: commonNominal, agr: { type: "non-3sing", num: "pl", per: 3 }, determinered: false } },
                { head: { type: commonNominal, count: false, determinered: false } }
            ],
            translationTemplates: {
                default: [{ path: ["right", 0], key: "default" }, "ができる"],
                predicative: [{ path: ["right", 0], key: "default" }, "ができる"],
                past: [{ path: ["right", 0], key: "default" }, "ができた"],
                predNeg: [{ path: ["right", 0], key: "default" }, "ができない"],
                pastNeg: [{ path: ["right", 0], key: "default" }, "ができなかった"],
                predQ: [{ path: ["right", 0], key: "default" }, "ができるのか"],
                pastQ: [{ path: ["right", 0], key: "default" }, "ができたのか"],
            }
        }]
    }],
    children: [
        {
            id: "head",
            hidden: false,
            type: "text",
            content: "able"
        },
        {
            id: "complement",
            hidden: false,
            type: "placeholder",
            content: blockToInfinitive,
        }
    ]
};

export const blockGoingTo: Block = {
    id: "going_to",
    x: 0,
    y: 0,
    isRound: true,
    color: "CornflowerBlue",
    words: [{
        token: "",
        categories: [{
            head: { type: "verb", form: "progressive" },
            right: [{ head: { type: { type: "nominal", isTo: true } } }],
            translationTemplates: {
                default: [{ path: ["right", 0], key: "base" }, "予定"]
            }
        }]
    }],
    children: [
        {
            id: "head",
            hidden: false,
            type: "text",
            content: "going"
        },
        {
            id: "complement",
            hidden: false,
            type: "placeholder",
            content: blockToInfinitive,
        }
    ]
};

export const allModalBlocks: Block[] = [
    blockAbleTo,
    blockGoingTo,
    // Base modals
    blockCan,
    blockCould,
    blockWill,
    blockWould,
    blockShould,
    blockMust,
    blockMay,
    blockMight,
    // Negative forms
    blockCannot,
    blockCouldNot,
    blockWont,
    blockWouldNot,
    blockShouldNot,
    blockMustNot,
    blockMayNot,
    blockMightNot,
    // Inverted forms
    blockInvertedCan,
    blockInvertedCould,
    blockInvertedWill,
    blockInvertedWould,
    blockInvertedShould,
    blockInvertedMust,
    blockInvertedMay,
    blockInvertedMight,
];
