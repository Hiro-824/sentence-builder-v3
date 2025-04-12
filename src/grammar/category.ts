export interface Category {
    base: string;
    features: Record<string, string[]>;
    specifiers: Category[];
    complements: Category[];
}

export interface Lexicon {
    word: string;
    categories: Category[];
}

export type argument = Constituent | null;

export interface Constituent {
    head: Lexicon;
    preModifiers: argument[];
    specifiers: argument[];
    complements: argument[];
    postModifiers: argument[];
}