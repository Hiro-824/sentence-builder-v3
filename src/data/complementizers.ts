import { Block } from "@/models/block";
import { FeatureStructure, noun } from "@/models/grammar-entities";
import { Generator } from "@/grammar/generator";


export const blockThat: Block = {
    id: "that_clause",
    isRound: true,
    x: 0,
    y: 0,
    words: [{
        token: "",
        categories: [{
            head: { type: { type: "nominal" }, agr: { type: "3sing" } },
            right: [{
                head: { type: "sentence", inverted: false }
            }],
            translationTemplates: {
                default: [
                    {
                        path: ["right", 0],
                        key: "default",
                        particle: "と"
                    },
                    "いうこと"
                ]
            }
        }]
    }],
    color: "mediumseagreen",
    children: [{
        id: "head",
        hidden: false,
        type: "text",
        content: "that"
    }, {
        id: "complement",
        hidden: false,
        type: "placeholder",
        content: undefined
    }]
}
const generator = new Generator();

export const whatPronounFeatures: FeatureStructure = { type: "interrogative", nominal: true, determiner: false, number: false };
export const blockWhat: Block = {
    id: "what_pronoun",
    x: 0, y: 0, isRound: true, undraggable: true,
    words: [{
        token: "", categories: [
            {
                head: whatPronounFeatures,
                translationTemplates: {
                    default: ["何"]
                }
            }]
    }],
    color: "dodgerblue",
    children: [{ id: "head", hidden: false, type: "text", content: "what" }]
};

export const whatDeterminerFeatures: FeatureStructure = { type: "interrogative", nominal: false, determiner: true, number: false };
export const blockWhatDeterminer: Block = {
    id: "what_determiner",
    x: 0, y: 0, isRound: true, undraggable: true,
    words: [{
        token: "", categories: [{
            head: whatDeterminerFeatures,
            right: [{ head: { type: noun } }],
            translationTemplates: {
                default: ["何の", { path: ["right", 0], key: "default" }]
            }
        }]
    }],
    color: "dodgerblue",
    children: [
        { id: "head", hidden: false, type: "text", content: "what" },
        { id: "complement", hidden: false, type: "placeholder", content: undefined }
    ]
};

export const howManyFeatures: FeatureStructure = { type: "interrogative", nominal: false, determiner: true, number: true };
export const blockHowMany: Block = {
    id: "how_many",
    x: 0, y: 0, isRound: true, undraggable: true,
    words: [{
        token: "", categories: [{
            head: howManyFeatures,
            right: [{ head: { type: noun, agr: { type: "non-3sing", num: "pl" } } }],
            translationTemplates: {
                default: ["いくつの", { path: ["right", 0], key: "default" }]
            }
        }],
    }],
    color: "dodgerblue",
    children: [
        { id: "head", hidden: false, type: "text", content: "how many" },
        { id: "complement", hidden: false, type: "placeholder", content: undefined }
    ]
};

export const whichPronounFeatures: FeatureStructure = { type: "interrogative", nominal: true, determiner: false, number: false };
export const blockWhich: Block = {
    id: "which_pronoun",
    x: 0, y: 0, isRound: true, undraggable: true,
    words: [{
        token: "", categories: [
            {
                head: whichPronounFeatures,
                translationTemplates: {
                    default: ["どれ"]
                }
            }]
    }],
    color: "dodgerblue",
    children: [{ id: "head", hidden: false, type: "text", content: "which" }]
};

export const whichDeterminerFeatures: FeatureStructure = { type: "interrogative", nominal: false, determiner: true, number: false };
export const blockWhichDeterminer: Block = {
    id: "which_determiner",
    x: 0, y: 0, isRound: true, undraggable: true,
    words: [{
        token: "", categories: [{
            head: whichDeterminerFeatures,
            right: [{ head: { type: noun } }],
            translationTemplates: {
                default: ["どの", { path: ["right", 0], key: "default" }]
            }
        }]
    }],
    color: "dodgerblue",
    children: [
        { id: "head", hidden: false, type: "text", content: "which" },
        { id: "complement", hidden: false, type: "placeholder", content: undefined }
    ]
};

// ===== Part 2: Use the Generator to Build the Final, User-Facing Blocks =====

export const blockWhatSentence = generator.createWhSentenceBlock({
    id: "what_question",
    whPhraseBlock: blockWhat,
    expectedWhFeatures: whatPronounFeatures
});

export const blockWhatDetSentence = generator.createWhSentenceBlock({
    id: "what_det_question",
    whPhraseBlock: blockWhatDeterminer,
    expectedWhFeatures: whatDeterminerFeatures
});

export const blockHowManySentence = generator.createWhSentenceBlock({
    id: "how_many_question",
    whPhraseBlock: blockHowMany,
    expectedWhFeatures: howManyFeatures
});

export const blockWhichSentence = generator.createWhSentenceBlock({
    id: "which_question",
    whPhraseBlock: blockWhich,
    expectedWhFeatures: whichPronounFeatures
});

export const blockWhichDetSentence = generator.createWhSentenceBlock({
    id: "which_det_question",
    whPhraseBlock: blockWhichDeterminer,
    expectedWhFeatures: whichDeterminerFeatures
});