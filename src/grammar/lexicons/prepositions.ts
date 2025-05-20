import { Block } from "../block";
import { Lexicon } from "../category";

export const To_Lexicon: Lexicon = {
    word: "to",
    categories: [
        {
            base: "PP",
            features: {
            },
            modify: {
                side: "right",
                target: {
                    base: "VP",
                    features: {},
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            },
            specifiers: [],
            complements: [
                {
                    base: "DP",
                    features: {
                        case: ["acc"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "base": "{C1}に"
            }
        },
        {
            base: "PP",
            features: {
            },
            modify: {
                side: "right",
                target: {
                    base: "DP",
                    features: {},
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            },
            specifiers: [],
            complements: [
                {
                    base: "DP",
                    features: {
                        case: ["acc"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "base": "{C1}への"
            }
        }
    ]
}

export const To_Block: Block = {
    id: "to",
    lexicons: [
        To_Lexicon
    ],
    x: 0,
    y: 0,
    color: "orange",
    isRound: true,
    children: [
        {
            id: "head",
            hidden: false,
            keepEmpty: false,
            type: "text",
            content: "to"
        },
        {
            id: "complement",
            hidden: false,
            keepEmpty: false,
            type: "placeholder",
            content: null
        }
    ]
}