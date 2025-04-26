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

export const Furiously_Lexicon: Lexicon = {
    word: "furiously",
    categories: [
        {
            base: "AdvP",
            features: {
                form: ["base"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "猛々しく"
            },
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
            translation: {
                "base": "猛々しく"
            },
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
        },
    ]
}

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