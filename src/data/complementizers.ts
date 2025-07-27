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

export const whosePronounFeatures: FeatureStructure = { type: "interrogative", nominal: true, determiner: false, possessive: true };
export const blockWhose: Block = {
    id: "whose_pronoun",
    x: 0, y: 0, isRound: true, undraggable: true,
    words: [{
        token: "", categories: [
            {
                head: whosePronounFeatures,
                translationTemplates: {
                    default: ["誰のもの"]
                }
            }]
    }],
    color: "dodgerblue",
    children: [{ id: "head", hidden: false, type: "text", content: "whose" }]
};

export const whoseDeterminerFeatures: FeatureStructure = { type: "interrogative", nominal: false, determiner: true, possessive: true };
export const blockWhoseDeterminer: Block = {
    id: "whose_determiner",
    x: 0, y: 0, isRound: true, undraggable: true,
    words: [{
        token: "", categories: [{
            head: whoseDeterminerFeatures,
            right: [{ head: { type: noun } }],
            translationTemplates: {
                default: ["誰の", { path: ["right", 0], key: "default" }]
            }
        }]
    }],
    color: "dodgerblue",
    children: [
        { id: "head", hidden: false, type: "text", content: "whose" },
        { id: "complement", hidden: false, type: "placeholder", content: undefined }
    ]
};

export const howFeaturesPred: FeatureStructure = { type: "interrogative", adverbial: true, pred: true };
export const howFeaturesAdverbial: FeatureStructure = { type: "interrogative", adverbial: true, pred: false, };
export const blockHow: Block = {
    id: "how_adverb",
    x: 0, y: 0, isRound: true, undraggable: true,
    words: [{
        token: "",
        categories: [
            {
                head: howFeaturesAdverbial,
                translationTemplates: {
                    default: ["どうやって"]
                }
            },
            {
                head: howFeaturesPred,
                translationTemplates: {
                    default: ["どうか"]
                }
            }
        ]
    }],
    color: "dodgerblue",
    children: [{ id: "head", hidden: false, type: "text", content: "how" }]
};

export const whereFeaturesPred: FeatureStructure = { type: "interrogative", adverbial: true, pred: true };
export const whereFeaturesAdverbial: FeatureStructure = { type: "interrogative", adverbial: true, pred: false };
export const blockWhere: Block = {
    id: "where_adverb",
    x: 0, y: 0, isRound: true, undraggable: true,
    words: [{
        token: "",
        categories: [
            {
                head: whereFeaturesAdverbial,
                translationTemplates: {
                    default: ["どこで"]
                }
            },
            {
                head: whereFeaturesPred,
                translationTemplates: {
                    default: ["どこにあるのか"]
                }
            }
        ]
    }],
    color: "dodgerblue",
    children: [{ id: "head", hidden: false, type: "text", content: "where" }]
};

// ===== Part 2: Use the Generator to Build the Final, User-Facing Blocks =====

const nominalNonSubjectGap: FeatureStructure = { type: { type: "nominal", isDet: true }, isSubject: false, isPossessor: false };
const nominalSubjectGap: FeatureStructure = { type: { type: "nominal", isDet: true }, isSubject: true };

export const blockWhatSentence = generator.createWhSentenceBlock({
    id: "what_question",
    whPhraseBlock: blockWhat,
    expectedWhFeatures: whatPronounFeatures,
    adverbial: false,
    nonSubjectGap: nominalNonSubjectGap,
    subjectGap: nominalSubjectGap
});

export const blockWhatDetSentence = generator.createWhSentenceBlock({
    id: "what_det_question",
    whPhraseBlock: blockWhatDeterminer,
    expectedWhFeatures: whatDeterminerFeatures,
    adverbial: false,
    nonSubjectGap: nominalNonSubjectGap,
    subjectGap: nominalSubjectGap
});

export const blockHowManySentence = generator.createWhSentenceBlock({
    id: "how_many_question",
    whPhraseBlock: blockHowMany,
    expectedWhFeatures: howManyFeatures,
    adverbial: false,
    nonSubjectGap: nominalNonSubjectGap,
    subjectGap: nominalSubjectGap
});

export const blockWhichSentence = generator.createWhSentenceBlock({
    id: "which_question",
    whPhraseBlock: blockWhich,
    expectedWhFeatures: whichPronounFeatures,
    adverbial: false,
    nonSubjectGap: nominalNonSubjectGap,
    subjectGap: nominalSubjectGap
});

export const blockWhichDetSentence = generator.createWhSentenceBlock({
    id: "which_det_question",
    whPhraseBlock: blockWhichDeterminer,
    expectedWhFeatures: whichDeterminerFeatures,
    adverbial: false,
    nonSubjectGap: nominalNonSubjectGap,
    subjectGap: nominalSubjectGap
});

export const blockWhoseSentence = generator.createWhSentenceBlock({
    id: "whose_question",
    whPhraseBlock: blockWhose,
    expectedWhFeatures: whosePronounFeatures,
    adverbial: false,
    nonSubjectGap: nominalNonSubjectGap,
    subjectGap: nominalSubjectGap
});

export const blockWhoseDetSentence = generator.createWhSentenceBlock({
    id: "whose_det_question",
    whPhraseBlock: blockWhoseDeterminer,
    expectedWhFeatures: whoseDeterminerFeatures,
    adverbial: false,
    nonSubjectGap: nominalNonSubjectGap,
    subjectGap: nominalSubjectGap
});

export const blockWhereSentence = generator.createWhSentenceBlock({
    id: "where_question",
    whPhraseBlock: blockWhere,
    expectedWhFeatures: whereFeaturesPred,
    expectedWhFeaturesAdverbial: whereFeaturesAdverbial,
    adverbial: true,
    nonSubjectGap: { type: "prep" },
    subjectGap: undefined
});

export const blockHowSentence = generator.createWhSentenceBlock({
    id: "how_question",
    whPhraseBlock: blockHow,
    expectedWhFeatures: howFeaturesPred,
    expectedWhFeaturesAdverbial: howFeaturesAdverbial,
    adverbial: true,
    nonSubjectGap: { type: "adj" },
    subjectGap: undefined
});