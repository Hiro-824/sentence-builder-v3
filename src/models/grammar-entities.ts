export type FeatureValue = string | number | boolean | FeatureStructure;
export interface FeatureStructure { [key: string]: FeatureValue; }
export type TranslationElement = string | {
    path: (string | number)[];
    key: string;
    particle?: string;
};
export interface TranslationTemplates { [key: string]: TranslationElement[] }

export interface Phrase {
    head: FeatureStructure;
    left?: Phrase[];
    right?: Phrase[];
    gaps?: Phrase[];
    categoryName?: string;
    leftModTargets?: Phrase[];
    rightModTargets?: Phrase[];
    customUnification?: CustomUnificationPath[][];
    translation?: FeatureStructure;
    translationTemplates?: TranslationTemplates;
}

export type CustomUnificationPath = (string | number)[];
export interface Word { token: string; categories: Phrase[]; }
export const MissingArgument: Word = { token: "[[MISSING_ARGUMENT]]", categories: [] };

export type RecursiveParseElement = Word | SubPhraseInput;
export interface SubPhraseInput { elements: RecursiveParseElement[]; headIndex: number; phraseName?: string; }