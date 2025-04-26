import { Lexicon } from "../category"

export const A_Lexicon: Lexicon = {
    word: "a",
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
                "base": "ある1つの{C1}",
            },
        }
    ]
}

export const The_Lexicon: Lexicon = {
    word: "the",
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
                "base": "その{C1}"
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
                "base": "その{C1}"
            },
        }
    ]
}