export interface ModInfo {
    target: Category;
    side: "left" | "right" | "both";
}

export interface Category {
    base: string;
    features: Record<string, string[]>;
    specifiers: Category[];
    complements: Category[];
    translation: Record<string, string>;
    modify?: ModInfo;
}

export interface Lexicon {
    word: string;
    categories: Category[];
}

export type argument = Constituent | null;

export interface Constituent {
    id: string;
    head: Lexicon;
    preAdjuncts: Constituent[];
    specifiers: argument[];
    complements: argument[];
    postAdjuncts: Constituent[];
}