import { Block } from "@/models/block";
import { allPronounBlocks } from "./pronouns";
import { allNounBlocks } from "./nouns";
import { allVerbBlocks } from "./verbs";
import { allAdjectiveBlocks } from "./adjectives";
import { det, noun } from "@/models/grammar-entities";

export const blockSentence: Block = {
    id: "",
    x: 0,
    y: 0,
    color: "lightBlue",
    words: [{
        token: "",
        categories: [{
            head: {
                type: "sentence"
            },
            left: [{
                head: {
                    type: { type: "nominal" },
                    case: "nom"
                }
            }],
            right: [{
                head: {
                    type: "verb",
                    finite: true,
                },
                gaps: [{
                    head: {
                        type: { type: "nominal" },
                        case: "nom"
                    }
                }]
            }],
            customUnification: [
                [
                    ['left', 0, 'head'],
                    ['right', 0, 'gaps', 0, 'head']
                ]
            ],
            translationTemplates: {
                default: [
                    {
                        path: ["left", 0],
                        key: "default",
                        particle: "が",
                    },
                    {
                        path: ["right", 0],
                        key: "default",
                    }
                ]
            }
        }]
    }],
    children: [{
        id: "specifier",
        type: "placeholder",
        content: null,
        hidden: false,
    },
    {
        id: "head",
        type: "text",
        content: "",
        hidden: false,
    },
    {
        id: "complement",
        type: "placeholder",
        content: null,
        hidden: false,
    }
    ],
}

export const blockTo: Block = {
    id: "",
    x: 0,
    y: 0,
    isRound: true,
    words: [{
        token: "",
        categories: [{
            head: {
                type: {
                    type: "nominal",
                    isTo: true,
                }
            },
            right: [{
                head: { type: "verb", finite: false, form: "base" }
            }],
            translationTemplates: {
                default: [
                    {
                        path: ["right", 0],
                        key: "default",
                    },
                    "こと"
                ]
            }
        }]
    }],
    color: "dodgerblue",
    children: [{
        id: "head",
        hidden: false,
        type: "text",
        content: "to"
    }, {
        id: "complement",
        hidden: false,
        type: "placeholder",
        content: undefined
    }]
}

export const blockThe: Block = {
    id: "",
    x: 0,
    y: 0,
    words: [{
        token: "",
        categories: [{
            head: { type: det, agr: {}, determinered: true },
            right: [{
                head: { type: noun, agr: {} }
            }],
            customUnification: [
                [["head", "agr"], ["right", 0, "head", "agr"]]
            ],
            translationTemplates: {
                default: ["(その)", { path: ["right", 0], key: "default" }]
            }
        }]
    }],
    color: "dodgerblue",
    isRound: true,
    children: [{
        id: "head",
        hidden: false,
        type: "text",
        content: ["the"],
    },
    {
        id: "complement",
        hidden: false,
        type: "placeholder",
        content: null,
    }]
}

export const blockA: Block = {
    id: "",
    x: 0,
    y: 0,
    words: [{
        token: "",
        categories: [{
            head: { type: det, agr: { type: "3sing" }, determinered: true },
            right: [{
                head: { type: noun, agr: { type: "3sing" }, count: true }
            }],
            translationTemplates: {
                default: ["(ある)", { path: ["right", 0], key: "default" }]
            }
        }]
    }],
    color: "dodgerblue",
    isRound: true,
    children: [{
        id: "head",
        hidden: false,
        type: "text",
        content: ["a/an"],
    },
    {
        id: "complement",
        hidden: false,
        type: "placeholder",
        content: null,
    }]
}

export const blockList = {
    "文": [
        blockSentence,
    ],
    "代名詞": [
        ...allPronounBlocks,
    ],
    "冠詞": [
        blockA,
        blockThe,
    ],
    "名詞": [
        ...allNounBlocks
    ],
    "動詞": [
        ...allVerbBlocks,
    ],
    "前置詞": [],
    "形容詞": [
        ...allAdjectiveBlocks,
    ],
    "不定詞": [
        blockTo
    ],
    "副詞": [],
    "関係詞": []
}