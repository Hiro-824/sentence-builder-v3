import { Block } from "../block";
import { A_Lexicon, Book_Lexicon, Books_Lexicon, Colorless_Lexicon, Furiously_Lexicon, Green_Lexicon, Has_Lexicon, Have_Lexicon, Idea_Lexicon, Ideas_Lexicon, Relative_That_Lexicon, Relative_Which_Lexicon, Sentence_Lexicon, Sleep_Lexicon, Sleeps_Lexicon, The_Lexicon } from "./lexicons";

export const Sentence_Block: Block = {
    id: "sentence",
    lexicons: [
        Sentence_Lexicon
    ],
    x: 24,
    y: 24,
    color: "lightBlue",
    children: [
        {
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
    ]
}

export const Colorless_Block: Block = {
    id: "colorless",
    lexicons: [
        Colorless_Lexicon
    ],
    x: 24,
    y: 24,
    color: "dodgerBlue",
    isTransparent: true,
    isRound: true,
    children: [
        {
            id: "head",
            type: "text",
            content: "colorless",
            hidden: false,
        },
    ]
}

export const Green_Block: Block = {
    id: "green",
    lexicons: [
        Green_Lexicon,
    ],
    x: 24,
    y: 24,
    color: "dodgerBlue",
    isRound: true,
    isTransparent: true,
    children: [
        {
            id: "head",
            type: "text",
            content: "green",
            hidden: false,
        },
    ]
}

export const Idea_Block: Block = {
    id: "idea",
    lexicons: [
        Idea_Lexicon,
        Ideas_Lexicon,
    ],
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
        }
    ]
}

export const Book_Block: Block = {
    id: "idea",
    lexicons: [
        Book_Lexicon,
        Books_Lexicon,
    ],
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
        }
    ]
}

export const Sleep_Block: Block = {
    id: "sleep",
    lexicons: [
        Sleep_Lexicon,
        Sleeps_Lexicon,
    ],
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
        }
    ]
}

export const Have_Block: Block = {
    id: "",
    lexicons: [
        Have_Lexicon,
        Has_Lexicon,
    ],
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
        },
        {
            id: "complement",
            type: "placeholder",
            content: null,
            hidden: false,
        }
    ]
}

export const Furiously_Block: Block = {
    id: "furiously",
    lexicons: [
        Furiously_Lexicon,
    ],
    x: 24,
    y: 24,
    color: "tomato",
    isRound: true,
    isTransparent: true,
    children: [
        {
            id: "head",
            type: "text",
            content: "furiously",
            hidden: false,
        }
    ]
}

export const A_Block: Block = {
    id: "a",
    lexicons: [
        A_Lexicon
    ],
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
        },
        {
            id: "complement",
            type: "placeholder",
            content: null,
            hidden: false,
        }
    ]
}

export const The_Block: Block = {
    id: "the",
    lexicons: [
        The_Lexicon
    ],
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
        },
        {
            id: "complement",
            type: "placeholder",
            content: null,
            hidden: false,
        }
    ]
}

export const That_Block: Block = {
    id: "",
    lexicons: [
        Relative_That_Lexicon
    ],
    x: 0,
    y: 0,
    color: "dodgerblue",
    isRound: true,
    isTransparent: true,
    children: [
        {
            id: "head",
            type: "text",
            content: "that",
            hidden: false,
        },
        {
            id: "complement",
            type: "placeholder",
            content: null,
            hidden: false,
        }
    ]
}

export const Which_Block: Block = {
    id: "",
    lexicons: [
        Relative_Which_Lexicon
    ],
    x: 0,
    y: 0,
    color: "dodgerblue",
    isRound: true,
    isTransparent: true,
    children: [
        {
            id: "head",
            type: "text",
            content: "which",
            hidden: false,
        },
        {
            id: "complement",
            type: "placeholder",
            content: null,
            hidden: false,
        }
    ]
}

export const blocks = {
    "文": [
        Sentence_Block
    ],
    "冠詞": [
        A_Block,
        The_Block
    ],
    "名詞": [
        Idea_Block,
        Book_Block,
    ],
    "動詞": [
        Sleep_Block,
        Have_Block,
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