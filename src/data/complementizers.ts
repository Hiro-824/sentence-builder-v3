import { Block } from "@/models/block";
import { noun } from "@/models/grammar-entities";

export const blockThat: Block = {
    id: "",
    isRound: true,
    x: 0,
    y: 0,
    words: [{
        token: "",
        categories: [{
            head: { type: { type: "nominal" }, agr: { type: "3sing" } },
            right: [{
                head: { type: "sentence", inverted: false }
            }],
            translationTemplates: {
                default: [
                    {
                        path: ["right", 0],
                        key: "default",
                        particle: "と"
                    },
                    "いうこと"
                ]
            }
        }]
    }],
    color: "mediumseagreen",
    children: [{
        id: "head",
        hidden: false,
        type: "text",
        content: "that"
    }, {
        id: "complement",
        hidden: false,
        type: "placeholder",
        content: undefined
    }]
}

export const blockWhat: Block = {
    id: "",
    x: 0,
    y: 0,
    words: [{
        token: "",
        categories: [{
            head: { type: "sentence", finite: true, question: true, inverted: true, wh: true },
            right: [{
                head: { type: "sentence", inverted: true, wh: false },
                gaps: [{ head: { type: { type: "nominal", isDet: true }, isSubject: false } }]
            }]
        }]
    }],
    color: "mediumseagreen",
    children: [{
        id: "head",
        hidden: false,
        type: "text",
        content: "what"
    }, {
        id: "complement",
        hidden: false,
        type: "placeholder",
        content: undefined
    }]
}

export const blockWhatDeterminer: Block = {
    id: "",
    x: 0,
    y: 0,
    isRound: true,
    undraggable: true,
    words: [{
        token: "",
        categories: [{
            head: { type: "what-determiner" },
            right: [{
                head: { type: noun },
            }]
        }]
    }],
    color: "dodgerblue",
    children: [{
        id: "head",
        hidden: false,
        type: "text",
        content: "what"
    }, {
        id: "complement",
        hidden: false,
        type: "placeholder",
        content: undefined
    }]
}

export const blockWhatDetSentence: Block = {
    id: "",
    x: 0,
    y: 0,
    words: [{
        token: "",
        categories: [{
            left: [{
                head: { type: "what-determiner" },
            }],
            head: { type: "sentence", finite: true, question: true, inverted: true, wh: true },
            right: [{
                head: { type: "sentence", inverted: true, wh: false },
                gaps: [{ head: { type: { type: "nominal", isDet: true }, isSubject: false } }]
            }]
        }]
    }],
    color: "mediumseagreen",
    children: [{
        id: "complement",
        hidden: false,
        type: "placeholder",
        content: blockWhatDeterminer
    }, {
        id: "head",
        type: "text",
        content: "",
        hidden: false,
    }, {
        id: "complement",
        hidden: false,
        type: "placeholder",
        content: undefined
    }]
}

export const blockWho: Block = {
    id: "",
    x: 0,
    y: 0,
    words: [{
        token: "",
        categories: [{
            head: { type: "sentence", finite: true, question: true, inverted: true, wh: true },
            right: [{
                head: { type: "sentence", inverted: true, wh: false },
                gaps: [{ head: { type: { type: "nominal", isDet: true }, isSubject: false } }]
            }]
        }]
    }],
    color: "mediumseagreen",
    children: [{
        id: "head",
        hidden: false,
        type: "text",
        content: "who"
    }, {
        id: "complement",
        hidden: false,
        type: "placeholder",
        content: undefined
    }]
}