import { Block } from "../block";
import { Colorless_Lexicon, Green_Lexicon } from "../lexicons/adjectives";
import { Furiously_Lexicon } from "../lexicons/adverbs";
import { A_Lexicon, The_Lexicon } from "../lexicons/determiners";
import { Sentence_Lexicon } from "../lexicons/sentences";
import { Idea_Lexicon, Ideas_Lexicon, Book_Lexicon, Books_Lexicon, Letter_Block } from "../lexicons/nouns";
import { Relative_That_Lexicon, Relative_Which_Lexicon } from "../lexicons/relatives";
import { Sleep_Lexicon, Sleeps_Lexicon, Have_Lexicon, Has_Lexicon, Read_Block, Be_Block, Send_Block } from "../lexicons/verbs";
import { He_Block, I_Block, It_Block, She_Block, They_Block, We_Block, You_Block } from "../lexicons/pronouns";
import { To_Block } from "../lexicons/prepositions";


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
    isTransparent: false,
    isRound: true,
    children: [
        {
            id: "head",
            type: "text",
            content: "colorless",
            hidden: false,
            keepEmpty: false,
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
    isTransparent: false,
    children: [
        {
            id: "head",
            type: "text",
            content: "green",
            hidden: false,
            keepEmpty: false,
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
            keepEmpty: false,
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
            keepEmpty: false,
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
            keepEmpty: false,
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

export const Furiously_Block: Block = {
    id: "furiously",
    lexicons: [
        Furiously_Lexicon,
    ],
    x: 24,
    y: 24,
    color: "tomato",
    isRound: true,
    isTransparent: false,
    children: [
        {
            id: "head",
            type: "text",
            content: "furiously",
            hidden: false,
            keepEmpty: false,
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

export const That_Block: Block = {
    id: "",
    lexicons: [
        Relative_That_Lexicon
    ],
    x: 0,
    y: 0,
    color: "dodgerblue",
    isRound: true,
    isTransparent: false,
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
    isTransparent: false,
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
    ]
}

export const blocks = {
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