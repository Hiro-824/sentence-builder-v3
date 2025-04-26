import { Lexicon } from "../category"

export const Sleep_Lexicon: Lexicon = {
    word: "sleep",
    categories: [
        {
            base: "TB",
            features: {
                form: ["base"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "眠る",
                "imperfective": "眠ら",
            }
        },
        {
            base: "VP",
            features: {
                form: ["base"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "眠る",
                "imperfective": "眠ら",
            }
        }
    ]
}

export const Sleeps_Lexicon: Lexicon = {
    word: "sleeps",
    categories: [
        {
            base: "TB",
            features: {
                form: ["es"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "眠る",
                "imperfective": "眠ら",
            }
        },
    ]
}

export const Have_Lexicon: Lexicon = {
    word: "have",
    categories: [
        {
            base: "TB",
            features: {
                form: ["base"]
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
                "base": "{C1[を]}持っている",
                "imperfect": "{C1[を]}持ってい"
            },
        },
        {
            base: "VP",
            features: {
                form: ["base"]
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
                "base": "{C1[を]}持っている",
                "imperfect": "{C1[を]}持ってい"
            },
        }
    ]
}

export const Has_Lexicon: Lexicon = {
    word: "has",
    categories: [
        {
            base: "TB",
            features: {
                form: ["es"]
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
                "base": "{C1[を]}持っている",
                "imperfect": "{C1[を]}持ってい"
            },
        },
    ]
}