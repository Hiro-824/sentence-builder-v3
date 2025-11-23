import { Block } from "@/models/block";
import { allPronounBlocks, blockI } from "./pronouns";
import { allNounBlocks, blockMary, blockName } from "./nouns";
import { allVerbBlocks } from "./verbs";
import { allAdjectiveBlocks } from "./adjectives";
import { blockA, blockMany, blockS, blockThe } from "./determiners";
import { allAuxiliaryBlocks, blockBe } from "./auxiliaries";
import { allPrepositionBlocks } from "./prepositions";
import { blockBecause, blockHowManySentence, blockHowSentence, blockThat, blockWhatDetSentence, blockWhatSentence, blockWhereSentence, blockWhichDetSentence, blockWhichSentence, blockWhoseDetSentence, blockWhoSentence, blockWhoseSentence } from "./complementizers";
import { blockActively, blockAfterSchool, blockAggressively, blockAlready, blockAlways, blockAround, blockBadly, blockCarefully, blockCalmly, blockClearly, blockEasily, blockEfficiently, blockEnergetically, blockEvery, blockEverywhere, blockFar, blockFast, blockFinally, blockHardAdv, blockHere, blockHappily, blockIndoors, blockJust, blockLateAdv, blockLater, blockLoudly, blockMaybe, blockNear, blockNever, blockNow, blockOften, blockOnline, blockOutdoors, blockPolitelyAdv, blockProbably, blockProfessionally, blockQuickly, blockQuietly, blockRarely, blockReally, blockRegularly, blockSafely, blockSeriouslyAdv, blockSlowly, blockSmoothly, blockSometimes, blockSoon, blockStill, blockThen, blockThere, blockTogether, blockTomorrow, blockToday, blockUsually, blockVery, blockWell, blockYesterday, blockEarlyAdv } from "./adverbials";
import { allRelativePronounBlocks } from "./relatives";

export const blockTo: Block = {
    id: "",
    x: 0,
    y: 0,
    isRound: true,
    words: [{
        token: "",
        tags: ["infinitive", "to"],
        categories: [
        {
            head: { type: "adverbial", isTo: true },
            right: [{
                head: { type: "verb", finite: false, form: "base" }
            }],
            leftModTargets: [{ head: { type: "verb" } }],
            translationTemplates: {
                default: [
                    {
                        path: ["right", 0],
                        key: "default",
                    },
                    "ために"
                ]
            }
        }, {
            head: { type: { type: "nominal", isTo: true, isDet: true }, agr: { type: "3sing" } },
            right: [{ head: { type: "verb", form: "base" } }],
            translationTemplates: {
                imperfective: [{ path: ["right", 0], key: "default" }, "こと"],
                base: [{ path: ["right", 0], key: "default" }],
                default: [{ path: ["right", 0], key: "continuous" }]
            }
        }]
    }],
    color: "orange",
    children: [{
        id: "head",
        hidden: false,
        type: "text",
        content: "to"
    }, {
        id: "complement",
        hidden: false,
        type: "placeholder",
        content: undefined
    }]
}

export const blockList = {
    "文・助動詞": [
        ...allAuxiliaryBlocks
    ],
    "動詞": [
        ...allVerbBlocks,
    ],
    "副詞": [
        blockEvery,
        blockAlways,
        blockUsually,
        blockOften,
        blockSometimes,
        blockRarely,
        blockNever,
        blockRegularly,
        blockReally,
        blockProbably,
        blockMaybe,
        blockNow,
        blockEarlyAdv,
        blockSoon,
        blockAlready,
        blockJust,
        blockStill,
        blockFinally,
        blockThen,
        blockLater,
        blockYesterday,
        blockToday,
        blockTomorrow,
        blockHere,
        blockThere,
        blockAfterSchool,
        blockEverywhere,
        blockOutdoors,
        blockIndoors,
        blockFar,
        blockNear,
        blockAround,
        blockQuickly,
        blockSlowly,
        blockCarefully,
        blockBadly,
        blockQuietly,
        blockLoudly,
        blockCalmly,
        blockHappily,
        blockSeriouslyAdv,
        blockHardAdv,
        blockClearly,
        blockEasily,
        blockEfficiently,
        blockProfessionally,
        blockSafely,
        blockSmoothly,
        blockTogether,
        blockOnline,
        blockActively,
        blockAggressively,
        blockEnergetically,
        blockPolitelyAdv,
        blockLateAdv,
        blockVery,
        blockWell,
        blockFast,
    ],
    "形容詞": [
        ...allAdjectiveBlocks,
    ],
    "冠詞": [
        blockA,
        blockThe,
        blockMany,
        blockS,
    ],
    "名詞": [
        ...allNounBlocks
    ],
    "代名詞": [
        ...allPronounBlocks,
    ],
    "前置詞": [
        ...allPrepositionBlocks,
    ],
    "不定詞": [
        blockTo
    ],
    "接続詞": [
        blockThat,
        blockBecause,
    ],
    "疑問詞": [
        blockWhatSentence,
        blockWhatDetSentence,
        blockWhichSentence,
        blockWhichDetSentence,
        blockWhoseSentence,
        blockWhoseDetSentence,
        blockHowManySentence,
        blockWhoSentence,
        blockWhereSentence,
        blockHowSentence,
    ],
    "関係詞": [
        ...allRelativePronounBlocks
    ]
}

export const availableBlockList = [
    blockBe,
    blockI,
    blockName,
    blockMary,
]
