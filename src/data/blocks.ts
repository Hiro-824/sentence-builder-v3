import { Block } from "@/models/block";

export const Sentence_Block: Block = {
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
}

export const blockList = {
    "文": [
        Sentence_Block
    ],
    "代名詞": [
        I_Block,
        We_Block,
        You_Block,
        He_Block,
        She_Block,
        It_Block,
        They_Block,
    ],
    "冠詞": [
        A_Block,
        The_Block
    ],
    "名詞": [
        Letter_Block,
        Book_Block,
        Idea_Block,
    ],
    "動詞": [
        Be_Block,
        Sleep_Block,
        Have_Block,
        Read_Block,
        Send_Block,
    ],
    "前置詞": [
        To_Block,
    ],
    "形容詞": [
        Colorless_Block,
        Green_Block,
    ],
    "副詞": [
        Furiously_Block,
    ],
    "関係詞": [
        That_Block,
        Which_Block,
    ]
}