import { Block } from "@/models/block";

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
                gaps: [{ head: { type: { type: "nominal" } } }]
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