import { Lexicon } from "../category";
import { A_Category, Adjective_Category, Adverb_Categories, CP_Categories, Intransitive_Base_Categories, Intransitive_Es_Categories, Plural_Noun_Categories, Singular_Noun_Categories, The_Categories, TP_Categories } from "./test-categories";

export const Sentence_Lexicon: Lexicon = {
    word: "",
    categories: [
        ...TP_Categories,
        ...CP_Categories,
    ]
}

export const Colorless_Lexicon: Lexicon = {
    word: "colorless",
    categories: [
        Adjective_Category
    ]
}

export const Green_Lexicon: Lexicon = {
    word: "green",
    categories: [
        Adjective_Category
    ]
}

export const Idea_Lexicon: Lexicon = {
    word: "idea",
    categories: [
        ...Singular_Noun_Categories,
    ]
}

export const Ideas_Lexicon: Lexicon = {
    word: "idea",
    categories: [
        ...Plural_Noun_Categories,
    ]
}

export const Sleep_Lexicon: Lexicon = {
    word: "sleep",
    categories: [
        ...Intransitive_Base_Categories,
    ]
}

export const Sleeps_Lexicon: Lexicon = {
    word: "sleeps",
    categories: [
        ...Intransitive_Es_Categories,
    ]
}

export const Furiously_Lexicon: Lexicon = {
    word: "furiously",
    categories: [
        ...Adverb_Categories,
    ]
}

export const A_Lexicon: Lexicon = {
    word: "a",
    categories: [A_Category]
}

export const The_Lexicon: Lexicon = {
    word: "a",
    categories: [...The_Categories]
}