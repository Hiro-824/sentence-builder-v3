import { Lexicon } from "../category"

export const Colorless_Lexicon: Lexicon = {
    word: "colorless",
    categories: [
        {
            base: "AdjP",
            features: {
                form: ["base"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "attributive": "無色の",
                "base": "無色だ",
            },
            modify: {
                target: {
                    base: "NP",
                    features: {},
                    specifiers: [],
                    complements: [],
                    translation: {}
                },
                side: "left"
            }
        }
    ]
}

export const Green_Lexicon: Lexicon = {
    word: "green",
    categories: [
        {
            base: "AdjP",
            features: {
                form: ["base"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "attributive": "緑色の",
                "base": "緑色だ",
            },
            modify: {
                target: {
                    base: "NP",
                    features: {},
                    specifiers: [],
                    complements: [],
                    translation: {}
                },
                side: "left"
            }
        }
    ]
}