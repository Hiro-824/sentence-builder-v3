import { Lexicon } from "../category"

// 一人称単数
export const I_Lexicon: Lexicon = {
    word: "I",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["1S"],
                case: ["nom"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "私"
            }
        },
    ],
}

export const My_Lexicon: Lexicon = {
    word: "my",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3S"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [
                {
                    base: "NP",
                    features: {
                        φ: ["3S"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "base": "私の{C1}"
            },
        },
        {
            base: "DP",
            features: {
                φ: ["3P"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [
                {
                    base: "NP",
                    features: {
                        φ: ["3P"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "base": "私の{C1}"
            },
        }
    ],
}

export const Me_Lexicon: Lexicon = {
    word: "me",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["1S"],
                case: ["acc"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "私"
            },
        },
    ],
}

export const Mine_Lexicon: Lexicon = {
    word: "mine",
    categories: [
        {
            base: "DP",
            features: {
                φ: ["3S"],
                case: ["nom", "acc"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "私のもの"
            },
        },
    ],
}