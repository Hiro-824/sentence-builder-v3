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
    pred: {
        predAdj: "の中にある",
        past: "の中にあった",
        predNeg: "の中にない",
        predQ: "の中にあるのか",
        pastNeg: "の中になかった",
        pastQ: "の中にあったのか",
    }
};

const configFrom: PrepositionConfig = {
    id: "prep_from",
    word: "from",
    modAdj: "からの",
    pred: {
        predAdj: "の出身である",
        past: "の出身だった",
        predNeg: "の出身ではない",
        predQ: "の出身なのか",
        pastNeg: "の出身ではなかった",
        pastQ: "の出身であったのか",
    }
};

const configWorth: PrepositionConfig = {
    id: "prep_in",
    word: "worth",
    pred: {
        predAdj: "に値する",
        past: "に値した",
        predNeg: "に値しない",
        predQ: "に値しないのか",
        pastNeg: "に値しなかった",
        pastQ: "に値したのか",
    },
};

export const blockIn = generator.createPrepositionBlock(configIn);
export const blockWorth = generator.createPrepositionBlock(configWorth);
export const blockFrom = generator.createPrepositionBlock(configFrom);

export const allPrepositionBlocks: Block[] = [
    blockIn,
    blockFrom,
    blockWorth
];