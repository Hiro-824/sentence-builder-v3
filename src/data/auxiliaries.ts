import { Generator } from "@/grammar/generator";
import { Block } from "@/models/block";
import { allModalBlocks } from "./modals";

const generator = new Generator();
export const blockSentence: Block = {
    id: "",
    x: 0,
    y: 0,
    color: "orange",
    words: [{
        token: "",
        categories: [{
            head: {
                type: "sentence",
                finite: true,
                inverted: false,
                negative: false,
            },
            left: [{
                head: {
                    type: { type: "nominal", isDet: true },
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
                        type: { type: "nominal" },
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
                        particle: "は",
                    },
                    {
                        path: ["right", 0],
                        key: "default",
                    }
                ],
                nominal: [
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

export const blockBe = generator.createBlockBe();
export const blockBeNot = generator.createBlockBeNot();
export const blockInvertedBe = generator.createBlockInvertedBe();

export const blockDoNot = generator.createBlockDoNot();
export const blockInvertedDo = generator.createBlockInvertedDo();

export const blockHave = generator.createBlockHave();

export const allAuxiliaryBlocks: Block[] = [
    blockSentence,
    blockBe,
    blockBeNot,
    blockInvertedBe,
    blockDoNot,
    blockInvertedDo,
    blockHave,
    ...allModalBlocks
];