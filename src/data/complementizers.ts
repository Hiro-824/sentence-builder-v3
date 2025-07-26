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
    isRound: true,
    words: [{
        token: "",
        categories: [{
            head: { type: "interrogative", nominal: true, determiner: false, number: false },
        }]
    }],
    color: "dodgerblue",
    children: [{
        id: "head",
        hidden: false,
        type: "text",
        content: "what"
    }]
}

export const blockWhatSentence: Block = {
    id: "",
    x: 0,
    y: 0,
    words: [{
        token: "",
        categories: [{
            left: [{
                head: { type: "interrogative", nominal: true },
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
        content: blockWhat
    }, {
        id: "head",
        hidden: false,
        type: "text",
        content: ""
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
            head: { type: "interrogative", nominal: false, determiner: true, number: false },
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
                head: { type: "interrogative", nominal: false, determiner: true, number: false },
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

export const blockHowMany: Block = {
    id: "",
    x: 0,
    y: 0,
    isRound: true,
    undraggable: true,
    words: [{
        token: "",
        categories: [{
            head: { type: "interrogative", nominal: false, determiner: true, number: true },
            right: [{
                head: { type: noun, agr: { type: "non-3sing", num: "pl" } },
            }]
        }]
    }],
    color: "dodgerblue",
    children: [{
        id: "head",
        hidden: false,
        type: "text",
        content: "how many"
    }, {
        id: "complement",
        hidden: false,
        type: "placeholder",
        content: undefined
    }]
}

export const blockHowManySentence: Block = {
    id: "",
    x: 0,
    y: 0,
    words: [{
        token: "",
        categories: [{
            left: [{
                head: { type: "interrogative", nominal: false, determiner: true, number: true },
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
        content: blockHowMany,
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