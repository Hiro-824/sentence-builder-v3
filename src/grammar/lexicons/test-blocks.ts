import { Block } from "../block";
import { A_Lexicon, Colorless_Lexicon, Furiously_Lexicon, Green_Lexicon, Idea_Lexicon, Ideas_Lexicon, Sentence_Lexicon, Sleep_Lexicon, Sleeps_Lexicon, The_Lexicon } from "./test-lexicons";

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
        },
        {
            id: "head",
            type: "text",
            content: "",
        },
        {
            id: "complement",
            type: "placeholder",
            content: null,
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
    color: "mediumseagreen",
    isTransparent: true,
    isRound: true,
    children: [
        {
            id: "head",
            type: "text",
            content: "colorless",
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
    color: "mediumseagreen",
    isRound: true,
    isTransparent: true,
    children: [
        {
            id: "head",
            type: "text",
            content: "green",
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
    color: "mediumseagreen",
    isRound: true,
    isTransparent: true,
    children: [
        {
            id: "head",
            type: "text",
            content: "furiously"
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
            content: "a (an)"
        },
        {
            id: "complement",
            type: "placeholder",
            content: null
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
            content: "the"
        },
        {
            id: "complement",
            type: "placeholder",
            content: null
        }
    ]
}