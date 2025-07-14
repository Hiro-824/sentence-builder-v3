import { Generator, PrepositionConfig } from "@/grammar/generator";
import { Block } from "@/models/block";

/*export const blockIn: Block = {
    id: "",
    x: 0,
    y: 0,
    isRound: true,
    words: [{
        token: "",
        categories: [{
            head: { type: "prep" },
            right: [{
                head: { type: { type: "nominal", isDet: true }, case: "acc" }
            }],
            leftModTargets: [{
                head: { type: { type: "nominal", isDet: false, isTo: false, isGerund: false } }
            }],
            translationTemplates: {
                default: [
                    {
                        path: ["right", 0],
                        key: "default",
                    },
                    "の中の"
                ]
            }
        }]
    }],
    color: "orange",
    children: [{
        id: "head",
        hidden: false,
        type: "text",
        content: "in"
    }, {
        id: "complement",
        hidden: false,
        type: "placeholder",
        content: undefined
    }]
}*/

const generator = new Generator();

const configIn: PrepositionConfig = {
    id: "prep_in",
    word: "in",
    modAdj: "の中の",
    predAdj: "の中にある",
    predNeg: "の中にない"
};

const configFrom: PrepositionConfig = {
    id: "prep_from",
    word: "from",
    modAdj: "からの",
    predAdj: "の出身である",
    predNeg: "の出身ではない"
};

const configWorth: PrepositionConfig = {
    id: "prep_in",
    word: "worth",
    predAdj: "に値する",
    predNeg: "に値しない"
};

export const blockIn = generator.createPrepositionBlock(configIn);
export const blockWorth = generator.createPrepositionBlock(configWorth);
export const blockFrom = generator.createPrepositionBlock(configFrom);

export const allPrepositionBlocks: Block[] = [
    blockIn,
    blockFrom,
    blockWorth
];