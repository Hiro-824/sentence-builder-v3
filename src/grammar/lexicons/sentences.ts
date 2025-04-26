import { Lexicon } from "../category";

export const Sentence_Lexicon: Lexicon = {
    word: "",
    categories: [
        {
            base: "TP",
            features: {},
            specifiers: [
                {
                    base: "DP",
                    features: {
                        φ: ["1S", "2S", "1P", "2P", "3P"],
                        case: ["nom"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            complements: [
                {
                    base: "TB",
                    features: {
                        form: ["base", "ed"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "wa": "{S1}は{C1}",
                "ga": "{S1}が{C1}"
            },
        },
        {
            base: "TP",
            features: {},
            specifiers: [
                {
                    base: "DP",
                    features: {
                        φ: ["3S"],
                        case: ["nom"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            complements: [
                {
                    base: "TB",
                    features: {
                        form: ["es", "ed"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "wa": "{S1}は{C1}",
                "ga": "{S1}が{C1}"
            },
        },
        {
            base: "CP",
            features: {},
            specifiers: [
                {
                    base: "DP",
                    features: {
                        φ: ["1S", "2S", "1P", "2P", "3P"],
                        case: ["nom"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            complements: [
                {
                    base: "TB",
                    features: {
                        form: ["base", "ed"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "wa": "{S1}は{C1}",
                "ga": "{S1}が{C1}"
            },
        },
        {
            base: "CP",
            features: {},
            specifiers: [
                {
                    base: "DP",
                    features: {
                        φ: ["3S"],
                        case: ["nom"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            complements: [
                {
                    base: "TB",
                    features: {
                        form: ["es", "ed"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "wa": "{S1}は{C1}",
                "ga": "{S1}が{C1}"
            },
        }
    ]
}