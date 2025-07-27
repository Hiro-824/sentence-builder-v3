import { Block } from "@/models/block"
import { commonNominal, det, noun } from "@/models/grammar-entities"

export const blockThe: Block = {
    id: "",
    x: 0,
    y: 0,
    words: [{
        token: "",
        categories: [{
            head: { type: det, agr: {}, determinered: true },
            right: [{
                head: { type: noun, agr: {} }
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
            head: { type: det, agr: { type: "3sing" }, determinered: true },
            right: [{
                head: { type: noun, agr: { type: "3sing" }, count: true }
            }],
            translationTemplates: {
                default: ["", { path: ["right", 0], key: "default" }]
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

export const blockS: Block = {
    id: "s",
    x: 0,
    y: 0,
    words: [{
        token: "",
        categories: [{
            head: { type: commonNominal, agr: {}, determinered: true },
            left: [{
                head: { type: { type: "nominal", isDet: true, isTo: false, isGerund: false, isPron: false }, agr: {}, postModified: false, isPossessor: true }
            }],
            right: [{
                head: { type: noun, agr: {} }
            }],
            customUnification: [
                [["head", "agr"], ["right", 0, "head", "agr"]]
            ],
            translationTemplates: {
                default: [{ path: ["left", 0], key: "default" }, "の", { path: ["right", 0], key: "default" }]
            }
        }]
    }],
    isRound: true,
    color: "dodgerblue",
    children: [{
        id: "",
        hidden: false,
        type: "placeholder",
        content: undefined
    }, {
        id: "head",
        hidden: false,
        type: "text",
        content: "'s"
    }, {
        id: "",
        hidden: false,
        type: "placeholder",
        content: undefined
    }]
}