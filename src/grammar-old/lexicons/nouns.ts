import { Block } from "../block"
import { Lexicon } from "../category"

export const Idea_Lexicon: Lexicon = {
    word: "idea",
    categories: [
        {
            base: "NP",
            features: {
                φ: ["3S"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "考え"
            }
        },
    ]
}

export const Ideas_Lexicon: Lexicon = {
    word: "ideas",
    categories: [
        {
            base: "NP",
            features: {
                φ: ["3P"],
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "考え"
            }
        },
        {
            base: "DP",
            features: {
                φ: ["3P"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "考え"
            }
        },
    ]
}

export const Book_Lexicon: Lexicon = {
    word: "book",
    categories: [
        {
            base: "NP",
            features: {
                φ: ["3S"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "本"
            }
        },
    ]
}

export const Books_Lexicon: Lexicon = {
    word: "books",
    categories: [
        {
            base: "NP",
            features: {
                φ: ["3P"],
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "本"
            }
        },
        {
            base: "DP",
            features: {
                φ: ["3P"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "本"
            }
        },
    ]
}

export const Letter_Lexicon: Lexicon = {
    word: "book",
    categories: [
        {
            base: "NP",
            features: {
                φ: ["3S"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "手紙"
            }
        },
    ]
}

export const Letters_Lexicon: Lexicon = {
    word: "letters",
    categories: [
        {
            base: "NP",
            features: {
                φ: ["3P"],
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "手紙"
            }
        },
        {
            base: "DP",
            features: {
                φ: ["3P"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "手紙"
            }
        },
    ]
}

export const Letter_Block: Block = {
    id: "letter",
    lexicons: [
        Letter_Lexicon,
        Letters_Lexicon,
    ],
    x: 24,
    y: 24,
    color: "dodgerBlue",
    isRound: true,
    children: [
        {
            id: "head",
            type: "dropdown",
            content: [
                "letter",
                "letters"
            ],
            selected: 0,
            hidden: false,
            keepEmpty: false,
        }
    ]
}