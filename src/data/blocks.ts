import { Block } from "@/models/block";
import { allPronounBlocks } from "./pronouns";
import { allNounBlocks } from "./nouns";

/*export const Sentence_Block: Block = {
    id: "sentence",
    x: 24,
    y: 24,
    color: "lightBlue",
    children: [
        {
            id: "specifier",
            type: "placeholder",
            content: null,
            hidden: false,
            keepEmpty: false,
        },
        {
            id: "head",
            type: "text",
            content: "",
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
    ],
    lexicons: []
}

export const Colorless_Block: Block = {
    id: "colorless",
    x: 24,
    y: 24,
    color: "dodgerBlue",
    isRound: true,
    children: [
        {
            id: "head",
            type: "text",
            content: "colorless",
            hidden: false,
            keepEmpty: false,
        },
    ],
    lexicons: [
        {
            PHON: "colorless",
            CAT: []
        }
    ]
}

export const Green_Block: Block = {
    id: "green",
    x: 24,
    y: 24,
    color: "dodgerBlue",
    isRound: true,
    children: [
        {
            id: "head",
            type: "text",
            content: "green",
            hidden: false,
            keepEmpty: false,
        },
    ],
    lexicons: [
        {
            PHON: "colorless",
            CAT: []
        }
    ]
}

export const Idea_Block: Block = {
    id: "idea",
    x: 24,
    y: 24,
    color: "dodgerBlue",
    isRound: true,
    children: [
        {
            id: "head",
            type: "dropdown",
            content: [
                "idea",
                "ideas"
            ],
            selected: 0,
            hidden: false,
            keepEmpty: false,
        }
    ],
    lexicons: [
        {
            PHON: "colorless",
            CAT: []
        }
    ]
}

export const Book_Block: Block = {
    id: "idea",
    x: 24,
    y: 24,
    color: "dodgerBlue",
    isRound: true,
    children: [
        {
            id: "head",
            type: "dropdown",
            content: [
                "book",
                "books"
            ],
            selected: 0,
            hidden: false,
            keepEmpty: false,
        }
    ],
    lexicons: [
        {
            PHON: "book",
            CAT: [
                {
                    HEAD: {
                        type: "noun",
                        agr: {
                            type: "3sing"
                        }
                    },
                    SUBJ: [],
                    COMPS: [],
                    SEM: undefined
                }
            ]
        }
    ]
}

export const Sleep_Block: Block = {
    id: "sleep",
    x: 24,
    y: 24,
    color: "tomato",
    children: [
        {
            id: "head",
            type: "dropdown",
            content: [
                "sleep",
                "sleeps"
            ],
            selected: 0,
            hidden: false,
            keepEmpty: false,
        }
    ],
    lexicons: [
        {
            PHON: "colorless",
            CAT: []
        }
    ]
}

export const Have_Block: Block = {
    id: "",
    x: 24,
    y: 24,
    color: "tomato",
    children: [
        {
            id: "head",
            type: "dropdown",
            content: [
                "have",
                "has"
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
    ],
    lexicons: [
        {
            PHON: "have",
            CAT: [
                {
                    HEAD: {
                        type: "verb"
                    },
                    SUBJ: [
                        {
                            HEAD: {
                                type: "det",
                                case: "nom",
                                agr: {
                                    type: "non-3sing"
                                }
                            },
                            SUBJ: [],
                            COMPS: [],
                            SEM: undefined
                        }
                    ],
                    COMPS: [
                        {
                            HEAD: {
                                "type": "det",
                                "case": "acc",
                            },
                            SUBJ: [],
                            COMPS: [],
                            SEM: undefined
                        }
                    ],
                    SEM: undefined
                }
            ]
        }
    ]
}

export const Furiously_Block: Block = {
    id: "furiously",
    x: 24,
    y: 24,
    color: "tomato",
    isRound: true,
    children: [
        {
            id: "head",
            type: "text",
            content: "furiously",
            hidden: false,
            keepEmpty: false,
        }
    ],
    lexicons: [
        {
            PHON: "colorless",
            CAT: []
        }
    ]
}

export const A_Block: Block = {
    id: "a",
    x: 24,
    y: 24,
    color: "dodgerBlue",
    isRound: true,
    children: [
        {
            id: "head",
            type: "text",
            content: "a (an)",
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
    ],
    lexicons: [
        {
            PHON: "a",
            CAT: [
                {
                    HEAD: {
                        type: "det",
                        agr: {
                            type: "3sing"
                        }
                    },
                    SUBJ: [],
                    COMPS: [
                        {
                            HEAD: {
                                type: "noun",
                                agr: {
                                    type: "3sing"
                                },
                                count: true
                            },
                            SUBJ: [],
                            COMPS: [],
                            SEM: undefined
                        }
                    ],
                    SEM: undefined
                }
            ]
        }
    ]
}

export const The_Block: Block = {
    id: "the",
    x: 24,
    y: 24,
    color: "dodgerBlue",
    isRound: true,
    children: [
        {
            id: "head",
            type: "text",
            content: "the",
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
    ],
    lexicons: [
        {
            PHON: "colorless",
            CAT: []
        }
    ]
}

export const That_Block: Block = {
    id: "",
    x: 0,
    y: 0,
    color: "dodgerblue",
    isRound: true,
    children: [
        {
            id: "head",
            type: "text",
            content: "that",
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
    ],
    lexicons: [
        {
            PHON: "colorless",
            CAT: []
        }
    ]
}

export const Which_Block: Block = {
    id: "",
    x: 0,
    y: 0,
    color: "dodgerblue",
    isRound: true,
    children: [
        {
            id: "head",
            type: "text",
            content: "which",
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
    ],
    lexicons: [
        {
            PHON: "colorless",
            CAT: []
        }
    ]
}

export const I_Block: Block = {
    id: "I",
    x: 0,
    y: 0,
    color: "dodgerblue",
    isRound: true,
    children: [
        {
            id: "head",
            hidden: false,
            keepEmpty: false,
            type: "dropdown",
            content: [
                "I",
                "my",
                "me",
                "mine",
                "myself",
            ],
            selected: 0
        },
        {
            id: "complement",
            hidden: true,
            keepEmpty: false,
            type: "placeholder",
            content: null,
            headIndex: [1]
        }
    ],
    lexicons: [
        {
            PHON: "colorless",
            CAT: []
        }
    ]
}

export const We_Block: Block = {
    id: "we",
    x: 0,
    y: 0,
    color: "dodgerblue",
    isRound: true,
    children: [
        {
            id: "head",
            hidden: false,
            keepEmpty: false,
            type: "dropdown",
            content: [
                "we",
                "our",
                "us",
                "ours",
                "ourselves",
            ],
            selected: 0
        },
        {
            id: "complement",
            hidden: true,
            keepEmpty: false,
            type: "placeholder",
            content: null,
            headIndex: [1]
        }
    ],
    lexicons: [
        {
            PHON: "colorless",
            CAT: []
        }
    ]
}

export const You_Block: Block = {
    id: "you",
    x: 0,
    y: 0,
    color: "dodgerblue",
    isRound: true,
    children: [
        {
            id: "head",
            hidden: false,
            keepEmpty: false,
            type: "dropdown",
            content: [
                "you",
                "your",
                "yours",
                "yourself",
                "yourselves",
            ],
            selected: 0
        },
        {
            id: "complement",
            hidden: true,
            keepEmpty: false,
            type: "placeholder",
            content: null,
            headIndex: [1]
        }
    ],
    lexicons: [
        {
            PHON: "colorless",
            CAT: []
        }
    ]
}

export const He_Block: Block = {
    id: "he",
    x: 0,
    y: 0,
    color: "dodgerblue",
    isRound: true,
    children: [
        {
            id: "head",
            hidden: false,
            keepEmpty: false,
            type: "dropdown",
            content: [
                "he",
                "his",
                "him",
                "himself",
            ],
            selected: 0
        },
        {
            id: "complement",
            hidden: true,
            keepEmpty: false,
            type: "placeholder",
            content: null,
            headIndex: [1]
        }
    ],
    lexicons: [
        {
            PHON: "colorless",
            CAT: []
        }
    ]
}

export const She_Block: Block = {
    id: "she",
    x: 0,
    y: 0,
    color: "dodgerblue",
    isRound: true,
    children: [
        {
            id: "head",
            hidden: false,
            keepEmpty: false,
            type: "dropdown",
            content: [
                "she",
                "her",
                "hers",
                "herself",
            ],
            selected: 0
        },
        {
            id: "complement",
            hidden: true,
            keepEmpty: false,
            type: "placeholder",
            content: null,
            headIndex: [1]
        }
    ],
    lexicons: [
        {
            PHON: "colorless",
            CAT: []
        }
    ]
}

export const It_Block: Block = {
    id: "it",
    x: 0,
    y: 0,
    color: "dodgerblue",
    isRound: true,
    children: [
        {
            id: "head",
            hidden: false,
            keepEmpty: false,
            type: "dropdown",
            content: [
                "it",
                "its",
                "itself",
            ],
            selected: 0
        },
        {
            id: "complement",
            hidden: true,
            keepEmpty: false,
            type: "placeholder",
            content: null,
            headIndex: [1]
        }
    ],
    lexicons: [
        {
            PHON: "colorless",
            CAT: []
        }
    ]
}

export const They_Block: Block = {
    id: "they",
    x: 0,
    y: 0,
    color: "dodgerblue",
    isRound: true,
    children: [
        {
            id: "head",
            hidden: false,
            keepEmpty: false,
            type: "dropdown",
            content: [
                "they",
                "their",
                "them",
                "theirs",
                "themselves",
            ],
            selected: 0
        },
        {
            id: "complement",
            hidden: true,
            keepEmpty: false,
            type: "placeholder",
            content: null,
            headIndex: [1]
        }
    ],
    lexicons: [
        {
            PHON: "colorless",
            CAT: []
        }
    ]
}

export const Be_Block: Block = {
    id: "be",
    x: 0,
    y: 0,
    color: "tomato",
    children: [
        {
            id: "head",
            hidden: false,
            keepEmpty: false,
            type: "dropdown",
            content: [
                "be",
                "am",
                "is",
                "are",
                "was",
                "were",
                "been",
                "being"
            ],
            selected: 0
        },
        {
            id: "complement",
            hidden: false,
            keepEmpty: false,
            type: "placeholder",
            content: null
        }
    ],
    lexicons: [
        {
            PHON: "colorless",
            CAT: []
        }
    ]
}

export const Read_Block: Block = {
    id: "read",
    x: 0,
    y: 0,
    color: "tomato",
    children: [
        {
            id: "head",
            hidden: false,
            keepEmpty: false,
            type: "dropdown",
            content: [
                "read",
                "reads",
                "reading",
                "read"
            ],
            selected: 0
        },
        {
            id: "complement",
            hidden: false,
            keepEmpty: false,
            type: "placeholder",
            content: null
        }
    ],
    lexicons: [
        {
            PHON: "colorless",
            CAT: []
        }
    ]
}

export const Send_Block: Block = {
    id: "send",
    x: 0,
    y: 0,
    color: "tomato",
    children: [
        {
            id: "head",
            hidden: false,
            keepEmpty: false,
            type: "dropdown",
            content: [
                "send",
                "sends",
                "sending",
                "sent"
            ],
            selected: 0
        },
        {
            id: "complement",
            hidden: false,
            keepEmpty: false,
            type: "placeholder",
            content: null
        }
    ],
    lexicons: [
        {
            PHON: "colorless",
            CAT: []
        }
    ]
}

export const To_Block: Block = {
    id: "to",
    x: 0,
    y: 0,
    color: "orange",
    isRound: true,
    children: [
        {
            id: "head",
            hidden: false,
            keepEmpty: false,
            type: "text",
            content: "to"
        },
        {
            id: "complement",
            hidden: false,
            keepEmpty: false,
            type: "placeholder",
            content: null
        }
    ],
    lexicons: [
        {
            PHON: "colorless",
            CAT: []
        }
    ]
}

export const Letter_Block: Block = {
    id: "letter",
    x: 24,
    y: 24,
    color: "dodgerBlue",
    isRound: true,
    children: [
        {
            id: "head",
            type: "dropdown",
            content: [
                "letter",
                "letters"
            ],
            selected: 0,
            hidden: false,
            keepEmpty: false,
        }
    ],
    lexicons: [
        {
            PHON: "colorless",
            CAT: []
        }
    ]
} */

export const blockSentence: Block = {
    id: "",
    x: 0,
    y: 0,
    color: "lightBlue",
    words: [{
        token: "",
        categories: [{
            head: {
                type: "sentence"
            },
            left: [{
                head: {
                    type: "det",
                    case: "nom"
                }
            }],
            right: [{
                head: {
                    type: "verb",
                    finite: true,
                },
                gaps: [{
                    head: {
                        type: "det",
                        case: "nom"
                    }
                }]
            }],
            customUnification: [
                [
                    ['left', 0, 'head'],
                    ['right', 0, 'gaps', 0, 'head']
                ]
            ],
            translationTemplates: {
                default: [
                    {
                        path: ["left", 0],
                        key: "default",
                        particle: "が",
                    },
                    {
                        path: ["right", 0],
                        key: "default",
                    }
                ]
            }
        }]
    }],
    children: [{
        id: "specifier",
        type: "placeholder",
        content: null,
        hidden: false,
    },
    {
        id: "head",
        type: "text",
        content: "",
        hidden: false,
    },
    {
        id: "complement",
        type: "placeholder",
        content: null,
        hidden: false,
    }
    ],
}

export const blockI: Block = {
    id: "",
    x: 0,
    y: 0,
    color: "dodgerblue",
    isRound: true,
    words: [{
        token: "I",
        categories: [{
            head: {
                type: "det",
                agr: { type: "non-3sing", per: 1, num: "sing" },
                case: "nom"
            },
            translationTemplates: {
                default: ["私"]
            }
        }]
    },
    {
        token: "my",
        categories: [{
            head: { type: "det", agr: {}, determinered: true },
            right: [{
                head: { type: "noun", agr: {} }
            }],
            customUnification: [
                [["head", "agr"], ["right", 0, "head", "agr"]]
            ],
            translationTemplates: {
                default: ["私の", { path: ["right", 0], key: "default" }]
            }
        }]
    },
    {
        token: "me",
        categories: [{
            head: {
                type: "det",
                agr: { type: "non-3sing", num: "sing", per: 1 },
                case: "acc"
            },
            translationTemplates: {
                default: ["私"]
            }
        }]
    },
    {
        token: "mine",
        categories: [{
            head: {
                type: "det",
                agr: { per: 3 },
            },
            translationTemplates: {
                default: ["私のもの"]
            }
        }]
    },
    {
        token: "myself",
        categories: [{
            head: {
                type: "det",
                agr: { type: "non-3sing", num: "sing", per: 1 },
                refl: true
            },
            translationTemplates: {
                default: ["私自身"]
            }
        }]
    }
    ],
    children: [{
        id: "head",
        hidden: false,
        type: "dropdown",
        content: ["I", "my", "me", "mine"],
        selected: 0
    },
    {
        id: "complement",
        hidden: true,
        type: "placeholder",
        content: null,
        headIndex: [1]
    }]
}

export const blockRead: Block = {
    id: "",
    x: 0,
    y: 0,
    words: [
        {
            token: "read(base)",
            categories: [{
                head: { type: "verb", tense: "present" },
                left: [{ head: { type: "det", agr: { type: "non-3sing" } } }],
                right: [{ head: { type: "det" } }],
                translationTemplates: {
                    default: [
                        {
                            path: ["right", 0],
                            key: "default",
                            particle: "を"
                        },
                        "読む"
                    ]
                }
            }]
        },
        {
            token: "reads",
            categories: [{
                head: { type: "verb", tense: "present" },
                left: [{ head: { type: "det", agr: { type: "3sing" }, case: "nom" } }],
                right: [{ head: { type: "det" } }],
                translationTemplates: {
                    default: [
                        {
                            path: ["right", 0],
                            key: "default",
                            particle: "を"
                        },
                        "読む"
                    ]
                }
            }]
        },
        {
            token: "read(past)",
            categories: [{
                head: { type: "verb", tense: "past" },
                left: [{ head: { type: "det" } }],
                right: [{ head: { type: "det" } }],
                translationTemplates: {
                    default: [
                        {
                            path: ["right", 0],
                            key: "default",
                            particle: "を"
                        },
                        "読んだ"
                    ]
                }
            }]
        },
        {
            token: "reading",
            categories: [{
                head: { type: "verb", finite: false },
                left: [{ head: { type: "det", agr: { type: "3sing" }, case: "nom" } }],
                right: [{ head: { type: "det" } }],
                translationTemplates: {
                    default: [
                        {
                            path: ["right", 0],
                            key: "default",
                            particle: "を"
                        },
                        "読んでいる"
                    ]
                }
            }]
        },
        {
            token: "read",
            categories: [{
                head: { type: "verb", finite: false },
                left: [{ head: { type: "det", agr: { type: "3sing" }, case: "nom" } }],
                translationTemplates: {
                    default: [
                        "読まれた"
                    ]
                }
            }]
        },
    ],
    color: "tomato",
    children: [{
        id: "head",
        type: "dropdown",
        content: ["read", "reads", "read", "reading", "read"],
        selected: 0,
        hidden: false,
    },
    {
        id: "complement",
        type: "placeholder",
        content: null,
        hidden: false,
        headIndex: [0, 1, 2, 3]
    }
    ]
}

export const blockBook: Block = {
    id: "",
    x: 0,
    y: 0,
    words: [{
        token: "",
        categories: [{
            head: { type: "noun", agr: { type: "3sing" } },
            translationTemplates: {
                default: ["本"]
            }
        }]
    },
    {
        token: "",
        categories: [{
            head: { type: "noun", agr: { type: "non-3sing", num: "pl", per: 3 } },
            translationTemplates: {
                default: ["本"]
            }
        },
        {
            head: { type: "det", agr: { type: "non-3sing", num: "pl", per: 3 } },
            translationTemplates: {
                default: ["本"]
            }
        }
        ]
    }
    ],
    color: "dodgerblue",
    isRound: true,
    children: [{
        id: "head",
        hidden: false,
        type: "dropdown",
        content: ["book", "books"],
        selected: 0
    }]
}

export const blockInteresting: Block = {
    id: "",
    x: 0,
    y: 0,
    words: [{
        token: "",
        categories: [{
            head: { type: "adj" },
            rightModTargets: [{
                head: { type: "noun" }
            }],
            translationTemplates: {
                default: ["面白い"]
            }
        },
        {
            head: { type: "adj" },
            rightModTargets: [{
                head: { type: "det", agr: { type: "non-3sing", num: "pl", per: 3 }, determinered: false }
            }],
            translationTemplates: {
                default: ["面白い"]
            }
        }]
    }],
    color: "dodgerblue",
    isRound: true,
    children: [{
        id: "head",
        hidden: false,
        type: "text",
        content: ["interesting"],
    }]
}

export const blockThe: Block = {
    id: "",
    x: 0,
    y: 0,
    words: [{
        token: "",
        categories: [{
            head: { type: "det", agr: {}, determinered: true },
            right: [{
                head: { type: "noun", agr: {} }
            }],
            customUnification: [
                [["head", "agr"], ["right", 0, "head", "agr"]]
            ],
            translationTemplates: {
                default: ["(その)", { path: ["right", 0], key: "default" }]
            }
        }]
    }],
    color: "dodgerblue",
    isRound: true,
    children: [{
        id: "head",
        hidden: false,
        type: "text",
        content: ["the"],
    },
    {
        id: "complement",
        hidden: false,
        type: "placeholder",
        content: null,
    }]
}

export const blockA: Block = {
    id: "",
    x: 0,
    y: 0,
    words: [{
        token: "",
        categories: [{
            head: { type: "det", agr: { type: "3sing" }, determinered: true },
            right: [{
                head: { type: "noun", agr: { type: "3sing" }, count: true }
            }],
            translationTemplates: {
                default: ["(ある)", { path: ["right", 0], key: "default" }]
            }
        }]
    }],
    color: "dodgerblue",
    isRound: true,
    children: [{
        id: "head",
        hidden: false,
        type: "text",
        content: ["a/an"],
    },
    {
        id: "complement",
        hidden: false,
        type: "placeholder",
        content: null,
    }]
}

export const blockList = {
    "文": [
        blockSentence,
    ],
    "代名詞": [
        ...allPronounBlocks,
    ],
    "冠詞": [
        blockA,
        blockThe,
    ],
    "名詞": [
        ...allNounBlocks
    ],
    "動詞": [
        blockRead,
    ],
    "前置詞": [],
    "形容詞": [
        blockInteresting,
    ],
    "副詞": [],
    "関係詞": []
}