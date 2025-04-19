import { Category } from "../category";

export const TP_Categories: Category[] = [
    {
        base: "TP",
        features: {
            incomplete: ["false"]
        },
        specifiers: [
            {
                base: "DP",
                features: {
                    φ: ["1S", "2S", "1P", "2P", "3P"],
                    case: ["nom"]
                },
                specifiers: [],
                complements: []
            }
        ],
        complements: [
            {
                base: "TB",
                features: {
                    form: ["base", "ed"]
                },
                specifiers: [],
                complements: []
            }
        ]
    },
    {
        base: "TP",
        features: {
            incomplete: ["false"]
        },
        specifiers: [
            {
                base: "DP",
                features: {
                    φ: ["3S"],
                    case: ["nom"]
                },
                specifiers: [],
                complements: []
            }
        ],
        complements: [
            {
                base: "TB",
                features: {
                    form: ["es", "ed"]
                },
                specifiers: [],
                complements: []
            }
        ]
    },
    {
        base: "TP",
        features: {
            incomplete: ["true"]
        },
        specifiers: [
            {
                base: "DP",
                features: {
                    φ: ["3S"],
                    case: ["nom"]
                },
                specifiers: [],
                complements: []
            }
        ],
        complements: [
            {
                base: "TB",
                features: {
                    form: ["es", "ed"]
                },
                specifiers: [],
                complements: [
                    {
                        base: "DP",
                        features: {
                            case: ["acc"]
                        },
                        specifiers: [],
                        complements: []
                    }
                ]
            }
        ]
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
                complements: []
            }
        ],
        complements: [
            {
                base: "TB",
                features: {
                    form: ["base", "ed"]
                },
                specifiers: [],
                complements: []
            }
        ]
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
                complements: []
            }
        ],
        complements: [
            {
                base: "TB",
                features: {
                    form: ["es", "ed"]
                },
                specifiers: [],
                complements: []
            }
        ]
    }
]

export const Intransitive_Base_Categories: Category[] = [
    {
        base: "TB",
        features: {
            form: ["base"]
        },
        specifiers: [],
        complements: []
    },
    {
        base: "VP",
        features: {
            form: ["base"]
        },
        specifiers: [],
        complements: []
    }
]

export const Intransitive_Es_Categories: Category[] = [
    {
        base: "TB",
        features: {
            form: ["es"]
        },
        specifiers: [],
        complements: []
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
                complements: []
            }
        ]
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
                complements: []
            }
        ]
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
                complements: []
            }
        ]
    },
]

export const Singular_Noun_Categories: Category[] = [
    {
        base: "NP",
        features: {
            φ: ["3S"]
        },
        specifiers: [],
        complements: []
    },
]

export const Plural_Noun_Categories: Category[] = [
    {
        base: "NP",
        features: {
            φ: ["3P"],
        },
        specifiers: [],
        complements: []
    },
    {
        base: "DP",
        features: {
            φ: ["3P"],
            case: ["nom", "acc"]
        },
        specifiers: [],
        complements: []
    },
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
            complements: []
        }
    ]
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
                complements: []
            }
        ]
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
                complements: []
            }
        ]
    }
]

export const Adjective_Category: Category = {
    base: "AdjP",
    features: {
        form: ["base"]
    },
    specifiers: [],
    complements: [],
    modify: {
        target: {
            base: "NP",
            features: {},
            specifiers: [],
            complements: []
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
        modify: {
            target: {
                base: "VP",
                features: {},
                specifiers: [],
                complements: []
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
        modify: {
            target: {
                base: "TB",
                features: {},
                specifiers: [],
                complements: []
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
                features: {
                    incomplete: ["true"]
                },
                specifiers: [],
                complements: []
            }
        ],
        modify: {
            target: {
                base: "NP",
                features: {
                    φ: ["3S", "3P"]
                },
                specifiers: [],
                complements: []
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
                complements: []
            }
        ],
        modify: {
            target: {
                base: "NP",
                features: {
                    φ: ["3P"]
                },
                specifiers: [],
                complements: []
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
                complements: []
            }
        ],
        modify: {
            target: {
                base: "NP",
                features: {
                    φ: ["3S"]
                },
                specifiers: [],
                complements: []
            },
            side: "right"
        }
    },
]

//TODO: modifierのtargetが複数指定できるように