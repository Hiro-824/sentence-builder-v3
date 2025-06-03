// GAP機能(遅れて上位の構成素で埋めるを作りたい)

/* eslint-disable @typescript-eslint/no-unused-vars */
// --- Basic Types (Updated) ---

type FeatureValue = string | number | boolean | FeatureStructure;

// A hierarchical key-value structure for features.
interface FeatureStructure {
    [key: string]: FeatureValue;
}

// Specification for how a category can modify another. (REVISED)
interface ModifierSpec {
    side: "left" | "right" | "both";
    targets: FeatureStructure[]; // Expected features of the word to be modified (list)
}

// Describes a syntactic category, its features, expectations, and modifier capabilities.
interface SyntacticCategory {
    categoryName?: string; // Optional: for easier debugging/identification
    features: FeatureStructure;
    expectsLeft?: FeatureStructure[];  // Expected features of left arguments/dependents
    expectsRight?: FeatureStructure[]; // Expected features of right arguments/dependents
    mod?: ModifierSpec;          // How this category itself can modify another (uses REVISED ModifierSpec)
}

// Represents a word with one or more possible syntactic categories.
interface Word {
    token: string;
    categories: SyntacticCategory[];
}

// --- New Types for Recursive Parsing ---
type RecursiveParseElement = Word | SubPhraseInput;

interface SubPhraseInput {
    elements: RecursiveParseElement[];
    headIndex: number;
    phraseName?: string; // Optional: for naming the synthetic word from the subphrase
}

// Type guard to check if an item is a Word
function isWord(item: RecursiveParseElement): item is Word {
    return typeof (item as Word).token === 'string' && Array.isArray((item as Word).categories);
}

// Type guard to check if an item is a SubPhraseInput
function isSubPhraseInput(item: RecursiveParseElement): item is SubPhraseInput {
    return typeof (item as SubPhraseInput).headIndex === 'number' && Array.isArray((item as SubPhraseInput).elements);
}

// --- Unification Logic (Unchanged) ---

/**
 * Unifies two feature structures.
 * Returns a new merged feature structure if they are compatible, or null if they conflict.
 */
function unify(fs1: FeatureStructure, fs2: FeatureStructure): FeatureStructure | null {
    const result: FeatureStructure = {};
    const allKeys = new Set([...Object.keys(fs1), ...Object.keys(fs2)]);

    for (const key of allKeys) {
        const val1 = fs1[key];
        const val2 = fs2[key];
        const val1Exists = fs1.hasOwnProperty(key);
        const val2Exists = fs2.hasOwnProperty(key);

        if (val1Exists && val2Exists) {
            const v1IsObject = typeof val1 === 'object' && val1 !== null && !Array.isArray(val1);
            const v2IsObject = typeof val2 === 'object' && val2 !== null && !Array.isArray(val2);

            if (v1IsObject && v2IsObject) {
                const subUnification = unify(val1 as FeatureStructure, val2 as FeatureStructure);
                if (subUnification === null) return null;
                result[key] = subUnification;
            } else if (v1IsObject || v2IsObject) {
                return null;
            } else if (val1 !== val2) {
                return null;
            } else {
                result[key] = val1;
            }
        } else if (val1Exists) {
            result[key] = val1;
        } else if (val2Exists) {
            result[key] = val2;
        }
    }
    return result;
}

// --- Parser Implementation (Updated `parsePhrase` for new ModifierSpec) ---

function parsePhrase(words: Word[], headIndex: number): SyntacticCategory[] {
    if (headIndex < 0 || headIndex >= words.length) {
        return [];
    }
    const headWord = words[headIndex];
    if (!headWord || !headWord.categories || headWord.categories.length === 0) {
        return [];
    }

    const compatibleResults: SyntacticCategory[] = [];

    for (const initialHeadCategory of headWord.categories) {
        const expectedLeftArgsFSArray = initialHeadCategory.expectsLeft || [];
        const numExpectedLeft = expectedLeftArgsFSArray.length;
        const expectedRightArgsFSArray = initialHeadCategory.expectsRight || [];
        const numExpectedRight = expectedRightArgsFSArray.length;

        if (headIndex < numExpectedLeft || headIndex + 1 + numExpectedRight > words.length) {
            continue; // Not enough words for arguments
        }
        const leftArgStartIndex = headIndex - numExpectedLeft;
        const actualLeftArguments = words.slice(leftArgStartIndex, headIndex);
        const actualLeftModifiers = words.slice(0, leftArgStartIndex);
        const rightArgEndIndex = headIndex + 1 + numExpectedRight;
        const actualRightArguments = words.slice(headIndex + 1, rightArgEndIndex);
        const actualRightModifiers = words.slice(rightArgEndIndex, words.length);

        let currentUnifiedFeatures = JSON.parse(JSON.stringify(initialHeadCategory.features));
        let argumentsCompatible = true;

        // 1. Check Left Arguments
        for (let i = 0; i < numExpectedLeft; i++) {
            const expectedArgFS = expectedLeftArgsFSArray[i];
            const actualArgWord = actualLeftArguments[i];
            let argSatisfied = false;
            for (const actualArgCategory of actualArgWord.categories) {
                if (unify(actualArgCategory.features, expectedArgFS) !== null) {
                    argSatisfied = true;
                    break;
                }
            }
            if (!argSatisfied) {
                argumentsCompatible = false;
                break;
            }
        }
        if (!argumentsCompatible) continue;

        // 2. Check Right Arguments
        for (let i = 0; i < numExpectedRight; i++) {
            const expectedArgFS = expectedRightArgsFSArray[i];
            const actualArgWord = actualRightArguments[i];
            let argSatisfied = false;
            for (const actualArgCategory of actualArgWord.categories) {
                if (unify(actualArgCategory.features, expectedArgFS) !== null) {
                    argSatisfied = true;
                    break;
                }
            }
            if (!argSatisfied) {
                argumentsCompatible = false;
                break;
            }
        }
        if (!argumentsCompatible) continue;

        let modifiersCompatible = true;

        // 3. Process Left Modifiers (Updated for new ModifierSpec)
        for (const modifierWord of actualLeftModifiers) {
            let thisModifierWordAppliedSuccessfully = false;
            let headFeaturesAfterThisModifierWord: FeatureStructure | null = null;

            for (const modifierCategory of modifierWord.categories) {
                if (modifierCategory.mod && (modifierCategory.mod.side === "left" || modifierCategory.mod.side === "both")) {
                    for (const targetFS of modifierCategory.mod.targets) {
                        if (unify(targetFS, currentUnifiedFeatures) !== null) {
                            const unified = unify(currentUnifiedFeatures, targetFS);
                            if (unified !== null) {
                                headFeaturesAfterThisModifierWord = unified;
                                thisModifierWordAppliedSuccessfully = true;
                                break; // Found working targetFS
                            }
                        }
                    }
                }
                if (thisModifierWordAppliedSuccessfully) break; // Found working modifierCategory
            }

            if (thisModifierWordAppliedSuccessfully && headFeaturesAfterThisModifierWord) {
                currentUnifiedFeatures = headFeaturesAfterThisModifierWord;
            } else {
                modifiersCompatible = false;
                break;
            }
        }
        if (!modifiersCompatible) continue;

        // 4. Process Right Modifiers (Updated for new ModifierSpec)
        for (const modifierWord of actualRightModifiers) {
            let thisModifierWordAppliedSuccessfully = false;
            let headFeaturesAfterThisModifierWord: FeatureStructure | null = null;

            for (const modifierCategory of modifierWord.categories) {
                if (modifierCategory.mod && (modifierCategory.mod.side === "right" || modifierCategory.mod.side === "both")) {
                    for (const targetFS of modifierCategory.mod.targets) {
                        if (unify(targetFS, currentUnifiedFeatures) !== null) {
                            const unified = unify(currentUnifiedFeatures, targetFS);
                            if (unified !== null) {
                                headFeaturesAfterThisModifierWord = unified;
                                thisModifierWordAppliedSuccessfully = true;
                                break; // Found working targetFS
                            }
                        }
                    }
                }
                if (thisModifierWordAppliedSuccessfully) break; // Found working modifierCategory
            }

            if (thisModifierWordAppliedSuccessfully && headFeaturesAfterThisModifierWord) {
                currentUnifiedFeatures = headFeaturesAfterThisModifierWord;
            } else {
                modifiersCompatible = false;
                break;
            }
        }
        if (!modifiersCompatible) continue;

        const finalUnifiedCategory: SyntacticCategory = {
            categoryName: initialHeadCategory.categoryName ? `Unified(${initialHeadCategory.categoryName})` : 'UnifiedHead',
            features: currentUnifiedFeatures,
            ...(initialHeadCategory.mod && { mod: initialHeadCategory.mod }),
        };
        compatibleResults.push(finalUnifiedCategory);
    }
    return compatibleResults;
}

// --- Recursive Parsing Function (Unchanged) ---

function parseNestedPhrase(input: SubPhraseInput): Word {
    const { elements, headIndex, phraseName } = input;
    const flatWordList: Word[] = [];

    for (const item of elements) {
        if (isWord(item)) {
            flatWordList.push(item);
        } else if (isSubPhraseInput(item)) {
            const subPhraseAsWord = parseNestedPhrase(item);
            flatWordList.push(subPhraseAsWord);
        } else {
            console.error("Unexpected item type in parseNestedPhrase elements:", item);
            flatWordList.push({ token: "[[ERROR_UNKNOWN_ITEM]]", categories: [] });
        }
    }

    const parsedCategories = parsePhrase(flatWordList, headIndex);
    let syntheticToken: string;
    if (phraseName) {
        syntheticToken = phraseName;
    } else if (flatWordList.length > 0) {
        syntheticToken = flatWordList.map(w => w.token).join(" ");
    } else {
        syntheticToken = "[[empty_phrase]]";
    }

    return { token: syntheticToken, categories: parsedCategories };
}

// --- Example Usage and Verification ---

const I: Word = {
    token: "I",
    categories: [{ categoryName: "I_pron", features: { type: "det", case: "nom", agr: { type: "non-3sing", number: "sing", person: "1" } } }]
};

const She: Word = {
    token: "she",
    categories: [{ categoryName: "she_pron", features: { type: "det", case: "nom", agr: { type: "3sing", gender: "fem" } } }]
};

const read_verb: Word = {
    token: "read",
    categories: [
        {
            categoryName: "read_past",
            features: { type: "verb", tense: "past" },
            expectsLeft: [{ type: "det", case: "nom" }],
            expectsRight: [{ type: "det", case: "acc" }]
        },
        {
            categoryName: "read_pres_non3sg",
            features: { type: "verb", tense: "present" },
            expectsLeft: [{ type: "det", case: "nom", agr: { type: "non-3sing" } }],
            expectsRight: [{ type: "det", case: "acc" }]
        }
    ]
};

const reads_verb: Word = {
    token: "reads",
    categories: [{
        categoryName: "reads_pres_3sg",
        features: { type: "verb", tense: "present" },
        expectsLeft: [{ type: "det", case: "nom", agr: { type: "3sing" } }],
        expectsRight: [{ type: "det" }]
    }]
};

const a_determiner: Word = {
    token: "a",
    categories: [{
        categoryName: "a_determiner",
        features: { type: "det" },
        expectsRight: [{
            type: "noun",
            count: true,
            agr: {
                type: "3sing"
            }
        }]
    }]
};

const book_noun: Word = {
    token: "book",
    categories: [{
        categoryName: "book_noun",
        features: {
            type: "noun",
            count: true,
            agr: { type: "3sing", number: "sing" }
        }
    }]
};

const books_noun: Word = {
    token: "books",
    categories: [
        {
            categoryName: "books_noun",
            features: {
                type: "noun",
                count: true,
                agr: { type: "non-3sing", number: "pl" }
            }
        },
        {
            categoryName: "books_det",
            features: {
                type: "det",
                count: true,
                agr: { type: "non-3sing", number: "pl" }
            }
        }
    ]
};

const quickly: Word = {
    token: "quickly",
    categories: [
        {
            categoryName: "quickly",
            features: {
                type: "adv",
            },
            mod: {
                side: "both",
                targets: [{
                    type: "verb"
                }]
            }
        },
    ]
};

const of: Word = {
    token: "of",
    categories: [
        {
            features: {
                type: "preposition"
            },
            expectsRight: [{
                type: "det"
            }],
            mod: {
                side: "right",
                targets: [
                    {
                        type: "verb"
                    },
                    {
                        type: "noun"
                    },
                    {
                        type: "det",
                    },
                ]
            }
        }
    ]
}

const phrase: SubPhraseInput = {
    elements: [
        I,
        read_verb,
        {
            elements: [
                books_noun,
                {
                    elements: [
                        of,
                        books_noun,
                    ],
                    headIndex: 0
                }
            ],
            headIndex: 0
        },
        quickly,
        {
            elements: [
                of,
                books_noun,
            ],
            headIndex: 0
        }
    ],
    headIndex: 1
}

console.log(JSON.stringify(parseNestedPhrase(phrase), null, 2));