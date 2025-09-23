import { Block } from "@/models/block";
import { allPronounBlocks } from "./pronouns";
import { allNounBlocks } from "./nouns";
import { allVerbBlocks } from "./verbs";
import { allAdjectiveBlocks } from "./adjectives";
import { blockA, blockS, blockThe } from "./determiners";
import { allAuxiliaryBlocks } from "./auxiliaries";
import { allPrepositionBlocks } from "./prepositions";
import { blockHowManySentence, blockHowSentence, blockThat, blockWhatDetSentence, blockWhatSentence, blockWhereSentence, blockWhichDetSentence, blockWhichSentence, blockWhoseDetSentence, blockWhoSentence, blockWhoseSentence } from "./complementizers";
import { blockActively, blockAggressively, blockAlready, blockAlways, blockAround, blockBadly, blockCarefully, blockCalmly, blockClearly, blockEasily, blockEfficiently, blockEnergetically, blockEvery, blockEverywhere, blockFar, blockFast, blockFinally, blockHardAdv, blockHere, blockHappily, blockIndoors, blockJust, blockLateAdv, blockLater, blockLoudly, blockMaybe, blockNear, blockNever, blockNow, blockOften, blockOnline, blockOutdoors, blockPolitelyAdv, blockProbably, blockProfessionally, blockQuickly, blockQuietly, blockRarely, blockReally, blockRegularly, blockSafely, blockSeriouslyAdv, blockSlowly, blockSmoothly, blockSometimes, blockSoon, blockStill, blockThen, blockThere, blockTogether, blockTomorrow, blockToday, blockUsually, blockVery, blockWell, blockYesterday, blockEarlyAdv } from "./adverbials";
import { allRelativePronounBlocks } from "./relatives";

export const blockTo: Block = {
    id: "",
    x: 0,
    y: 0,
    isRound: true,
    words: [{
        token: "",
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
                default: [{ path: ["right", 0], key: "default" }, "こと"],
                base: [{ path: ["right", 0], key: "default" }]
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
