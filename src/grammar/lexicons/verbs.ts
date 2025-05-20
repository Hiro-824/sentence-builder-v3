import { Block } from "../block"
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

// read
export const Read_Lexicon: Lexicon = {
    word: "read",
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
                "base": "{C1[を]}読む",
                "imperfect": "{C1[を]}読む"
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
                "base": "{C1[を]}読む",
                "imperfect": "{C1[を]}読む"
            },
        },
        {
            base: "TB",
            features: {
                form: ["ed"]
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
                "base": "{C1[を]}読んだ",
                "imperfect": "{C1[を]}読んだ"
            },
        },
        {
            base: "VP",
            features: {
                form: ["perfect"]
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
                "base": "{C1[を]}読んだ",
                "imperfect": "{C1[を]}読んだ"
            },
        },
    ]
}

export const Reads_Lexicon: Lexicon = {
    word: "reads",
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
                "base": "{C1[を]}読む",
                "imperfect": "{C1[を]}読む"
            },
        },
    ]
}

export const ReadPassive_Lexicon: Lexicon = {
    word: "read",
    categories: [
        {
            base: "VP",
            features: {
                form: ["passive"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "読まれた",
                "imperfect": "読まれ"
            },
        }
    ]
}

export const Reading_Lexicon: Lexicon = {
    word: "reading",
    categories: [
        {
            base: "VP",
            features: {
                form: ["ing"]
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
                "mod": "{C1[を]}読んでいる",
                "imperfect": "{C1[を]}読んで"
            },
        }
    ]
}

export const Read_Block: Block = {
    id: "read",
    lexicons: [
        Read_Lexicon,
        Reads_Lexicon,
        ReadPassive_Lexicon,
        Reading_Lexicon,
    ],
    x: 0,
    y: 0,
    color: "tomato",
    children: [
        {
            id: "head",
            type: "dropdown",
            content: [
                "read",
                "reads",
                "read",
                "reading",
            ],
            selected: 0,
            hidden: false,
            keepEmpty: false,
        },
        {
            id: "complement",
            type: "placeholder",
            content: null,
            hidden: false,
            keepEmpty: false,
            headIndex: [0, 1, 3],
        }
    ]
}

// send
export const Send_Lexicon: Lexicon = {
    word: "send",
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
                "base": "{C1[を]}送る",
                "imperfect": "{C1[を]}送ら"
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
                "base": "{C1[を]}送る",
                "imperfect": "{C1[を]}送ら"
            },
        },
    ]
}

export const Sends_Lexicon: Lexicon = {
    word: "sends",
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
                "base": "{C1[を]}送る",
                "imperfect": "{C1[を]}送ら"
            },
        },
    ]
}

export const Sent_Lexicon: Lexicon = {
    word: "sent",
    categories: [
        {
            base: "TB",
            features: {
                form: ["ed"]
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
                "base": "{C1[を]}送った",
                "imperfect": "{C1[を]}送って"
            },
        },
        {
            base: "VP",
            features: {
                form: ["perfect"]
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
                "base": "{C1[を]}送った",
                "imperfect": "{C1[を]}送って"
            },
        },
    ]
}

export const SentPassive_Lexicon: Lexicon = {
    word: "sent",
    categories: [
        {
            base: "VP",
            features: {
                form: ["passive"]
            },
            specifiers: [],
            complements: [],
            translation: {
                "base": "送られた",
                "imperfect": "送られ"
            },
        }
    ]
}

export const Sending_Lexicon: Lexicon = {
    word: "sending",
    categories: [
        {
            base: "VP",
            features: {
                form: ["ing"]
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
                "mod": "{C1[を]}送っている",
                "imperfect": "{C1[を]}送って"
            },
        }
    ]
}

export const Send_Block: Block = {
    id: "read",
    lexicons: [
        Send_Lexicon,
        Sends_Lexicon,
        Sent_Lexicon,
        SentPassive_Lexicon,
        Sending_Lexicon,
    ],
    x: 0,
    y: 0,
    color: "tomato",
    children: [
        {
            id: "head",
            type: "dropdown",
            content: [
                "send",
                "sends",
                "sent",
                "sent",
                "sending",
            ],
            selected: 0,
            hidden: false,
            keepEmpty: false,
        },
        {
            id: "complement",
            type: "placeholder",
            content: null,
            hidden: false,
            keepEmpty: false,
            headIndex: [0, 1, 2, 4],
        }
    ]
}

// be動詞
export const Am_Lexicon: Lexicon = {
    word: "am",
    categories: [
        {
            base: "TB",
            features: {
                form: ["am"]
            },
            specifiers: [],
            complements: [
                {
                    base: "VP",
                    features: {
                        form: ["ing"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "base": "{C1{imperfect}}いる",
                "imperfect": "{C1{imperfect}}い"
            }
        }
    ]
}

export const Are_Lexicon: Lexicon = {
    word: "are",
    categories: [
        {
            base: "TB",
            features: {
                form: ["are"]
            },
            specifiers: [],
            complements: [
                {
                    base: "VP",
                    features: {
                        form: ["ing"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "base": "{C1{imperfect}}いる",
                "imperfect": "{C1{imperfect}}い"
            }
        }
    ]
}

export const Is_Lexicon: Lexicon = {
    word: "is",
    categories: [
        {
            base: "TB",
            features: {
                form: ["es"]
            },
            specifiers: [],
            complements: [
                {
                    base: "VP",
                    features: {
                        form: ["ing"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "base": "{C1{imperfect}}いる",
                "imperfect": "{C1{imperfect}}い"
            }
        }
    ]
}

export const Was_Lexicon: Lexicon = {
    word: "was",
    categories: [
        {
            base: "TB",
            features: {
                form: ["was"]
            },
            specifiers: [],
            complements: [
                {
                    base: "VP",
                    features: {
                        form: ["ing"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "base": "{C1{imperfect}}いた",
                "imperfect": "{C1{imperfect}}い"
            }
        }
    ]
}

export const Were_Lexicon: Lexicon = {
    word: "was",
    categories: [
        {
            base: "TB",
            features: {
                form: ["were"]
            },
            specifiers: [],
            complements: [
                {
                    base: "VP",
                    features: {
                        form: ["ing"]
                    },
                    specifiers: [],
                    complements: [],
                    translation: {}
                }
            ],
            translation: {
                "base": "{C1{imperfect}}いた",
                "imperfect": "{C1{imperfect}}い"
            }
        }
    ]
}

export const Be_Lexicon: Lexicon = {
    word: "be",
    categories: [{
        base: "VP",
        features: {
            form: ["base"]
        },
        specifiers: [],
        complements: [
            {
                base: "VP",
                features: {
                    form: ["ing"]
                },
                specifiers: [],
                complements: [],
                translation: {}
            }
        ],
        translation: {
            "base": "{C1{imperfect}}いる",
            "imperfect": "{C1{imperfect}}い"
        }
    }]
}

export const Been_Lexicon: Lexicon = {
    word: "been",
    categories: [{
        base: "VP",
        features: {
            form: ["perfect"]
        },
        specifiers: [],
        complements: [
            {
                base: "VP",
                features: {
                    form: ["ing"]
                },
                specifiers: [],
                complements: [],
                translation: {}
            }
        ],
        translation: {
            "base": "{C1{imperfect}}いる",
            "imperfect": "{C1{imperfect}}い"
        }
    }]
}

export const Be_Block: Block = {
    id: "be",
    lexicons: [
        Is_Lexicon,
        Are_Lexicon,
        Am_Lexicon,
        Be_Lexicon,
        Was_Lexicon,
        Were_Lexicon,
        Been_Lexicon,
    ],
    x: 0,
    y: 0,
    color: "coral",
    children: [
        {
            id: "head",
            type: "dropdown",
            content: [
                "is",
                "are",
                "am",
                "be",
                "was",
                "were",
                "been",
            ],
            selected: 0,
            hidden: false,
            keepEmpty: false,
        },
        {
            id: "complement",
            type: "placeholder",
            content: null,
            hidden: false,
            keepEmpty: false,
        }
    ]
}