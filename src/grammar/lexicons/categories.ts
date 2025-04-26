import { Category } from "../category";

export const TP_Categories: Category[] = [
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
]

export const CP_Categories: Category[] = [
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

export const Intransitive_Base_Categories: Category[] = [
    {
        base: "TB",
        features: {
            form: ["base"]
        },
        specifiers: [],
        complements: [],
        translation: {}
    },
    {
        base: "VP",
        features: {
            form: ["base"]
        },
        specifiers: [],
        complements: [],
        translation: {}
    }
]

export const Intransitive_Es_Categories: Category[] = [
    {
        base: "TB",
        features: {
            form: ["es"]
        },
        specifiers: [],
        complements: [],
        translation: {}
    },
]

export const Transitive_Base_Categories: Category[] = [
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
        translation: {},
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
        translation: {},
    }
]

export const Transitive_Es_Categories: Category[] = [
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
        translation: {},
    },
]

export const Singular_Noun_Categories: Category[] = [
    {
        base: "NP",
        features: {
            φ: ["3S"]
        },
        specifiers: [],
        complements: [],
        translation: {}
    },
]

export const Plural_Noun_Categories: Category[] = [
    {
        base: "NP",
        features: {
            φ: ["3P"],
        },
        specifiers: [],
        complements: [],
        translation: {}
    },
    {
        base: "DP",
        features: {
            φ: ["3P"],
            case: ["nom", "acc"]
        },
        specifiers: [],
        complements: [],
        translation: {}
    },
]

export const I_Category: Category = {
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
}

export const Posessive_Categories: Category[] = [
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
        translation: {},
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
        translation: {},
    }
]

export const A_Category: Category = {
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
            translation: {
                "base": "ある1つの",
            }
        }
    ],
    translation: {},
}

export const The_Categories: Category[] = [
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
        translation: {},
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
        translation: {},
    }
]

export const Adjective_Category: Category = {
    base: "AdjP",
    features: {
        form: ["base"]
    },
    specifiers: [],
    complements: [],
    translation: {},
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

export const Adverb_Categories: Category[] = [
    {
        base: "AdvP",
        features: {
            form: ["base"]
        },
        specifiers: [],
        complements: [],
        translation: {},
        modify: {
            target: {
                base: "VP",
                features: {},
                specifiers: [],
                complements: [],
                translation: {}
            },
            side: "both"
        }
    },
    {
        base: "AdvP",
        features: {
            form: ["base"]
        },
        specifiers: [],
        complements: [],
        translation: {},
        modify: {
            target: {
                base: "TB",
                features: {},
                specifiers: [],
                complements: [],
                translation: {}
            },
            side: "both"
        }
    }
]

export const Relative_Pronoun_Categories: Category[] = [
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
        translation: {},
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
        translation: {},
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
        translation: {},
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

//TODO: modifierのtargetが複数指定できるように