import { Lexicon } from "../category"

export const Relative_That_Lexicon: Lexicon = {
    word: "that",
    categories: [
        {
            base: "CP",
            features: {
                relative: ["true"]
            },
            specifiers: [],
            complements: [
                {
                    base: "TP",
                    features: {},
                    specifiers: [],
                    complements: [
                        {
                            base: "DP",
                            features: {
                                φ: ["3S", "3P"]
                            },
                            specifiers: [],
                            complements: [],
                            translation: {}
                        }
                    ],
                    translation: {},
                }
            ],
            translation: {
                "base": "{C1{ga}}",
            },
            modify: {
                target: {
                    base: "NP",
                    features: {
                        φ: ["3S", "3P"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                },
                side: "right"
            }
        },
        {
            base: "CP",
            features: {
                relative: ["true"]
            },
            specifiers: [],
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
                "base": "{C1}",
            },
            modify: {
                target: {
                    base: "NP",
                    features: {
                        φ: ["3P"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                },
                side: "right"
            }
        },
        {
            base: "CP",
            features: {
                relative: ["true"]
            },
            specifiers: [],
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
                "base": "{C1}",
            },
            modify: {
                target: {
                    base: "NP",
                    features: {
                        φ: ["3S"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                },
                side: "right"
            }
        },
    ]
}

export const Relative_Which_Lexicon: Lexicon = {
    word: "which",
    categories: [
        {
            base: "CP",
            features: {
                relative: ["true"]
            },
            specifiers: [],
            complements: [
                {
                    base: "TP",
                    features: {},
                    specifiers: [],
                    complements: [
                        {
                            base: "DP",
                            features: {
                                φ: ["3S", "3P"]
                            },
                            specifiers: [],
                            complements: [],
                            translation: {}
                        }
                    ],
                    translation: {},
                }
            ],
            translation: {
                "base": "{C1{ga}}",
            },
            modify: {
                target: {
                    base: "NP",
                    features: {
                        φ: ["3S", "3P"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                },
                side: "right"
            }
        },
        {
            base: "CP",
            features: {
                relative: ["true"]
            },
            specifiers: [],
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
                "base": "{C1}",
            },
            modify: {
                target: {
                    base: "NP",
                    features: {
                        φ: ["3P"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                },
                side: "right"
            }
        },
        {
            base: "CP",
            features: {
                relative: ["true"]
            },
            specifiers: [],
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
                "base": "{C1}",
            },
            modify: {
                target: {
                    base: "NP",
                    features: {
                        φ: ["3S"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                },
                side: "right"
            }
        },
    ]
}