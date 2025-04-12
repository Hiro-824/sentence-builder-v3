import { Constituent } from "../category";
import { It_Lexicon, Loves_Lexicon, TP_Lexicon } from "./lexicons";

export const SheLovesIt: Constituent = {
    head: TP_Lexicon,
    preModifiers: [],
    specifiers: [
        {
            head: It_Lexicon,
            preModifiers: [],
            specifiers: [],
            complements: [],
            postModifiers: []
        }
    ],
    complements: [
        {
            head: Loves_Lexicon,
            preModifiers: [],
            specifiers: [],
            complements: [
                {
                    head: It_Lexicon,
                    preModifiers: [],
                    specifiers: [],
                    complements: [],
                    postModifiers: []
                }
            ],
            postModifiers: []
        }
    ],
    postModifiers: []
}