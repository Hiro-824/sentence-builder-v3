import { Generator } from "@/grammar/generator";
import { Block } from "@/models/block";

const generator = new Generator();

// --- Added definitions for each modal block ---
export const blockCan: Block = generator.createModalBlock({
    id: "can_modal",
    word: "can",
    translation: "ことができる"
});

export const blockCould: Block = generator.createModalBlock({
    id: "could_modal",
    word: "could",
    translation: "かもしれない"
});

export const blockWill: Block = generator.createModalBlock({
    id: "will_modal",
    word: "will",
    preTranslation: "きっと",
    translation: "",
});

export const blockWould: Block = generator.createModalBlock({
    id: "would_modal",
    word: "would",
    translation: "だろう"
});

export const blockShould: Block = generator.createModalBlock({
    id: "should_modal",
    word: "should",
    translation: "べきだ"
});

export const blockMust: Block = generator.createModalBlock({
    id: "must_modal",
    word: "must",
    translationKey: "imperfective",
    translation: "なければならない"
});

export const blockMay: Block = generator.createModalBlock({
    id: "may_modal",
    word: "may",
    translation: "かもしれない"
});

export const blockMight: Block = generator.createModalBlock({
    id: "might_modal",
    word: "might",
    translation: "かもしれない"
});

export const blockCannot: Block = generator.createNegativeModalBlock({ id: "cannot_modal", word: "can", negativeWord: "cannot", translation: "ことができ", negativeTranslation: "ことができない" });
export const blockCouldNot: Block = generator.createNegativeModalBlock({ id: "couldnot_modal", word: "could", negativeWord: "could not", translation: "はずが", negativeTranslation: "はずがない" });
export const blockWont: Block = generator.createNegativeModalBlock({ id: "wont_modal", word: "will", negativeWord: "will not", preTranslation: "きっと", translation: "だろう", negativeTranslation: "ないだろう" });
export const blockWouldNot: Block = generator.createNegativeModalBlock({ id: "wouldnot_modal", word: "would", negativeWord: "would not", translation: "だろう", negativeTranslation: "ないだろう" });
export const blockShouldNot: Block = generator.createNegativeModalBlock({ id: "shouldnot_modal", word: "should", negativeWord: "should not", translation: "べきだ", negativeTranslation: "べきではない" });
export const blockMustNot: Block = generator.createNegativeModalBlock({ id: "mustnot_modal", word: "must", negativeWord: "must not", translation: "なければならない", negativeTranslation: "してはならない" });
export const blockMayNot: Block = generator.createNegativeModalBlock({ id: "maynot_modal", word: "may", negativeWord: "may not", translation: "かもしれない", negativeTranslation: "ないかもしれない" });
export const blockMightNot: Block = generator.createNegativeModalBlock({ id: "mightnot_modal", word: "might", negativeWord: "might not", translation: "かもしれない", negativeTranslation: "ないかもしれない" });

export const blockInvertedCan: Block = generator.createInvertedModalBlock({ id: "inverted_can_modal", word: "Can", translation: "できます" });
export const blockInvertedCould: Block = generator.createInvertedModalBlock({ id: "inverted_could_modal", word: "Could", translation: "いただけます" });
export const blockInvertedWill: Block = generator.createInvertedModalBlock({ id: "inverted_will_modal", word: "Will", preTranslation: "きっと", translation: "ます" });
export const blockInvertedWould: Block = generator.createInvertedModalBlock({ id: "inverted_would_modal", word: "Would", translation: "いただけます" });
export const blockInvertedShould: Block = generator.createInvertedModalBlock({ id: "inverted_should_modal", word: "Should", translation: "べきです" });
export const blockInvertedMust: Block = generator.createInvertedModalBlock({ id: "inverted_must_modal", word: "Must", translation: "なければなりません" });
export const blockInvertedMay: Block = generator.createInvertedModalBlock({ id: "inverted_may_modal", word: "May", translation: "もよろしいです" });
export const blockInvertedMight: Block = generator.createInvertedModalBlock({ id: "inverted_might_modal", word: "Might", translation: "のでしょうか" });

export const allModalBlocks: Block[] = [
    blockCan,
    blockCould,
    blockWill,
    blockWould,
    blockShould,
    blockMust,
    blockMay,
    blockMight,
    // Negative
    blockCannot,
    blockCouldNot,
    blockWont,
    blockWouldNot,
    blockShouldNot,
    blockMustNot,
    blockMayNot,
    blockMightNot,
    // Inverted (Questions)
    blockInvertedCan,
    blockInvertedCould,
    blockInvertedWill,
    blockInvertedWould,
    blockInvertedShould,
    blockInvertedMust,
    blockInvertedMay,
    blockInvertedMight,
];