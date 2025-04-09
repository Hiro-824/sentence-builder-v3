import { Category, Constituent, Lexicon } from "../category"

export const SentenceCategory: Category = {
    name: "TP",
    features: {},
    arguments: [
        {
            name: "DP",
            features: {},
            arguments: []
        }, 
        {
            name: "Tbar",
            features: {},
            arguments: []
        }
    ]
}

// The category for "buy" that is tensed (present)
export const finiteBuyCategory: Category = {
    name: "Tbar",
    features: {
        "φ": ["1S", "2S", "1P", "2P", "3P"]
    },
    arguments: [
        {
            name: "DP",
            features: {
                "case": ["NOM"]
            },
            arguments: []
        }
    ]
}

// The category for "buy" that is not tensed (base)
export const nonfiniteBuyCategory: Category = {
    name: "VP",
    features: {
        "form": ["base"],
    },
    arguments: [
        {
            name: "DP",
            features: {
                "case": ["NOM"]
            },
            arguments: []
        }
    ]
}

// The category for "I"
export const ICategory: Category = {
    name: "DP",
    features: {
        "φ": ["1S"],
        "case": ["NOM"]
    },
    arguments: [],
}

// The category for "it"
export const itCategory: Category = {
    name: "DP",
    features: {
        "φ": ["3S"],
        "case": ["ACC"]
    },
    arguments: [],
}

// The category for "that" as a subjective relative pronoun (as in "a pen that is on the table")
export const thatSubjectiveRelativeCategory: Category = {
    name: "AdjP",
    features: {},
    arguments: [
        {
            name: "Tbar",
            features: {},
            arguments: [],
        }
    ]
}

// The category for "that" as an objective relative pronoun (as in "a pen that I bought ___")
export const thatObjectiveRelativeCategory: Category = {
    name: "AdjP",
    features: {},
    arguments: [
        {
            name: "TP",
            features: {},
            arguments: [
                {
                    name: "DP",
                    features: {
                        "case": ["NOM"],
                    },
                    arguments: []
                }
            ],
        }
    ]
}

// The lexicon for "I"
export const ILexicon: Lexicon = {
    head: "I",
    categories: [
        ICategory,
    ]
}

// The lexicon for "that"
export const thatLexicon: Lexicon = {
    head: "that",
    categories: [
        thatSubjectiveRelativeCategory,
        thatObjectiveRelativeCategory,
    ]
}

// The lexicon for "buy"
export const buyLexicon: Lexicon = {
    head: "buy",
    categories: [
        finiteBuyCategory,
        nonfiniteBuyCategory,
    ]
}

// The lexicon for it
export const itLexicon: Lexicon = {
    head: "it",
    categories: [itCategory],
}

// The lexicon for a sentence
export const sentenceLexicon: Lexicon = {
    head: "",
    categories: [
        SentenceCategory,
    ]
}

// The constituent for "that I buy" grammatical
export const thatIBuyConstituent: Constituent = {
    lexicon: thatLexicon,
    arguments: [
        {
            lexicon: sentenceLexicon,
            arguments: [
                {
                    lexicon: ILexicon,
                    arguments: [],
                },
                {
                    lexicon: buyLexicon,
                    arguments: [
                        null
                    ],
                }
            ]
        }
    ]
}

// The constituent for "that I buy it" ungrammatical
export const thatIBuyItConstituent: Constituent = {
    lexicon: thatLexicon,
    arguments: [
        {
            lexicon: sentenceLexicon,
            arguments: [
                {
                    lexicon: ILexicon,
                    arguments: [],
                },
                {
                    lexicon: buyLexicon,
                    arguments: [
                        {
                            lexicon: itLexicon,
                            arguments: [],
                        }
                    ],
                }
            ]
        }
    ]
}
