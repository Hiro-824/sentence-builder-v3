export interface Category {
    name: string;
    features: Record<string, string[]>;
    arguments: Category[];
}

export interface Lexicon {
    head: string;
    categories: Category[];
}

export type argument = Constituent | null;

export interface Constituent {
    lexicon: Lexicon;
    arguments: argument[];
}