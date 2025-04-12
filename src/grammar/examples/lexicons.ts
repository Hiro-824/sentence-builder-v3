import { Lexicon } from "../category";
import { TPs, ICategory, SheCategory, LoveCategories, LovesCategories, ItCategories, NotCategory } from "./categories";

export const TP_Lexicon: Lexicon = {
    word: "",
    categories: TPs
};

export const I_Lexicon: Lexicon = {
    word: "I",
    categories: [ICategory]
};

export const She_Lexicon: Lexicon = {
    word: "she",
    categories: [SheCategory]
};

export const Love_Lexicon: Lexicon = {
    word: "love",
    categories: LoveCategories
};

export const Loves_Lexicon: Lexicon = {
    word: "loves",
    categories: LovesCategories
};

export const It_Lexicon: Lexicon = {
    word: "it",
    categories: ItCategories
}

export const Not_Lexicon: Lexicon = {
    word: "not",
    categories: [NotCategory]
}