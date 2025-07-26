import { Block } from "@/models/block";
import { allPronounBlocks } from "./pronouns";
import { allNounBlocks } from "./nouns";
import { allVerbBlocks } from "./verbs";
import { allAdjectiveBlocks } from "./adjectives";
import { blockA, blockS, blockThe } from "./determiners";
import { allAuxiliaryBlocks } from "./auxiliaries";
import { allPrepositionBlocks } from "./prepositions";
import { blockHowManySentence, blockThat, blockWhatDetSentence, blockWhatSentence } from "./complementizers";
import { blockEvery } from "./adverbials";

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
        }, {
            head: { type: "adverbial", isTo: true },
            right: [{
                head: { type: "verb", finite: false, form: "base" }
            }],
            leftModTargets: [{ head: { type: "verb" } }],
            translationTemplates: {
                default: [
                    {
                        path: ["right", 0],
                        key: "default",
                    },
                    "ために"
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

export const blockList = {
    "文・助動詞": [
        ...allAuxiliaryBlocks
    ],
    "動詞": [
        ...allVerbBlocks,
    ],
    "代名詞": [
        ...allPronounBlocks,
    ],
    "冠詞": [
        blockA,
        blockThe,
        blockS,
        blockEvery
    ],
    "疑問詞": [
        blockWhatSentence,
        blockWhatDetSentence,
        blockHowManySentence,
    ],
    "名詞": [
        ...allNounBlocks
    ],
    "前置詞": [
        ...allPrepositionBlocks,
    ],
    "形容詞": [
        ...allAdjectiveBlocks,
    ],
    "接続詞": [
        blockThat,
    ],
    "不定詞": [
        blockTo
    ],
    "副詞": [],
    "関係詞": []
}