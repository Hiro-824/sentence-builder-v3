import { Lexicon } from "../category";
import { A_Category, Adjective_Category, Adverb_Categories, CP_Categories, Intransitive_Base_Categories, Intransitive_Es_Categories, Plural_Noun_Categories, Relative_Pronoun_Categories, Singular_Noun_Categories, The_Categories, TP_Categories, Transitive_Base_Categories, Transitive_Es_Categories } from "./categories";

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
    word: "ideas",
    categories: [
        ...Plural_Noun_Categories,
    ]
}

export const Book_Lexicon: Lexicon = {
    word: "book",
    categories: [
        ...Singular_Noun_Categories,
    ]
}

export const Books_Lexicon: Lexicon = {
    word: "books",
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

export const Have_Lexicon: Lexicon = {
    word: "have",
    categories: [
        ...Transitive_Base_Categories
    ]
}

export const Has_Lexicon: Lexicon = {
    word: "has",
    categories: [
        ...Transitive_Es_Categories
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
    word: "the",
    categories: [...The_Categories]
}

export const Relative_That_Lexicon: Lexicon = {
    word: "that",
    categories: [...Relative_Pronoun_Categories]
}

export const Relative_Which_Lexicon: Lexicon = {
    word: "which",
    categories: [...Relative_Pronoun_Categories]
}