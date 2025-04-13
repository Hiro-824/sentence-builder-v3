import { Constituent } from "../category";
import { It_Lexicon, Love_Lexicon, Loves_Lexicon, TP_Lexicon } from "./lexicons";

export const SheLovesIt: Constituent = {
    head: TP_Lexicon,
    preAdjuncts: [],
    specifiers: [
        {
            head: It_Lexicon,
            preAdjuncts: [],
            specifiers: [],
            complements: [],
            postAdjuncts: []
        }
    ],
    complements: [
        {
            head: Loves_Lexicon,
            preAdjuncts: [],
            specifiers: [],
            complements: [
                {
                    head: It_Lexicon,
                    preAdjuncts: [],
                    specifiers: [],
                    complements: [],
                    postAdjuncts: []
                }
            ],
            postAdjuncts: []
        }
    ],
    postAdjuncts: []
}

export const NotLoveIt: Constituent = {
    preAdjuncts: [],
    specifiers: [],
    head: Love_Lexicon,
    complements: [
        null
    ],
    postAdjuncts: []
}