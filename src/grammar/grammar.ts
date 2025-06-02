/* eslint-disable @typescript-eslint/no-unused-vars */
// --- Basic Types (Updated) ---

type FeatureValue = string | number | boolean | FeatureStructure;

// A hierarchical key-value structure for features.
interface FeatureStructure {
    [key: string]: FeatureValue;
}

// Specification for how a category can modify another.
interface ModifierSpec {
    side: "left" | "right";
    target: FeatureStructure; // Expected features of the word to be modified
}

// Describes a syntactic category, its features, expectations, and modifier capabilities.
interface SyntacticCategory {
    categoryName?: string; // Optional: for easier debugging/identification
    features: FeatureStructure;
    expectsLeft?: FeatureStructure[];  // Expected features of left arguments/dependents
    expectsRight?: FeatureStructure[]; // Expected features of right arguments/dependents
    mod?: ModifierSpec;          // How this category itself can modify another
}

// Represents a word with one or more possible syntactic categories.
interface Word {
    token: string;
    categories: SyntacticCategory[];
}

// New Phrase structure: more explicit about roles.
interface Phrase {
    leftModifiers: Word[];
    leftArguments: Word[];
    head: Word;
    rightArguments: Word[];
    rightModifiers: Word[];
}

// --- Unification Logic (Mostly Unchanged) ---

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
            // Check if both are non-null, non-array objects for recursive unification
            const v1IsObject = typeof val1 === 'object' && val1 !== null && !Array.isArray(val1);
            const v2IsObject = typeof val2 === 'object' && val2 !== null && !Array.isArray(val2);

            if (v1IsObject && v2IsObject) {
                const subUnification = unify(val1 as FeatureStructure, val2 as FeatureStructure);
                if (subUnification === null) {
                    return null; // Conflict in nested structure
                }
                result[key] = subUnification;
            } else if (v1IsObject || v2IsObject) {
                // Type mismatch: one is an object, the other is a primitive/literal. Conflict.
                return null;
            } else if (val1 !== val2) {
                // Both are primitives but have different values. Conflict.
                return null;
            } else {
                // Both are primitives and have the same value.
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

// --- Parser Implementation (Updated) ---

/**
 * Parses a phrase and returns a list of compatible, unified head categories.
 * Arguments are checked first. Then, modifiers are applied sequentially,
 * augmenting the head's features if compatible.
 * Each word provided in a modifier slot MUST successfully modify the head.
 */
function parsePhrase(phrase: Phrase): SyntacticCategory[] {
    const compatibleResults: SyntacticCategory[] = [];

    for (const initialHeadCategory of phrase.head.categories) {
        // Start with a deep copy of the initial head category's features.
        // This will be the base for augmentation by modifiers.
        let currentUnifiedFeatures = JSON.parse(JSON.stringify(initialHeadCategory.features));
        let argumentsCompatible = true;

        // 1. Check Left Arguments
        const expectedLeftArgs = initialHeadCategory.expectsLeft || [];
        if (phrase.leftArguments.length !== expectedLeftArgs.length) {
            continue; // Arity mismatch for left arguments
        }
        for (let i = 0; i < expectedLeftArgs.length; i++) {
            const expectedArgFS = expectedLeftArgs[i];
            const actualArgWord = phrase.leftArguments[i];
            let argSatisfied = false;
            for (const actualArgCategory of actualArgWord.categories) {
                if (unify(actualArgCategory.features, expectedArgFS) !== null) {
                    argSatisfied = true;
                    // Argument features are NOT merged into the head's features here.
                    // They just need to satisfy the head's expectation.
                    break;
                }
            }
            if (!argSatisfied) {
                argumentsCompatible = false;
                break;
            }
        }
        if (!argumentsCompatible) continue; // Try next head category

        // 2. Check Right Arguments
        const expectedRightArgs = initialHeadCategory.expectsRight || [];
        if (phrase.rightArguments.length !== expectedRightArgs.length) {
            continue; // Arity mismatch for right arguments
        }
        for (let i = 0; i < expectedRightArgs.length; i++) {
            const expectedArgFS = expectedRightArgs[i];
            const actualArgWord = phrase.rightArguments[i];
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
        if (!argumentsCompatible) continue; // Try next head category

        // If arguments are compatible, `currentUnifiedFeatures` is still effectively the head's original features.
        // Now, try to apply modifiers. Each successful modification updates `currentUnifiedFeatures`.
        let modifiersCompatible = true;

        // 3. Process Left Modifiers
        // Modifiers in the list are applied sequentially to the (potentially already modified) head.
        for (const modifierWord of phrase.leftModifiers) {
            let thisModifierWordApplied = false;
            let featuresAfterThisModifier = currentUnifiedFeatures; // Store best result for this modifier word

            for (const modifierCategory of modifierWord.categories) {
                if (modifierCategory.mod && modifierCategory.mod.side === "left") {
                    // Check if modifier's target is compatible with the head's current features
                    if (unify(modifierCategory.mod.target, currentUnifiedFeatures) !== null) {
                        // If compatible, unify the modifier's *own* features into the head's features
                        const newHeadFeatures = unify(currentUnifiedFeatures, modifierCategory.features);
                        if (newHeadFeatures !== null) {
                            featuresAfterThisModifier = newHeadFeatures; // This category of modifier works
                            thisModifierWordApplied = true;
                            break; // This modifier word found a compatible category
                        }
                    }
                }
            }

            if (thisModifierWordApplied) {
                currentUnifiedFeatures = featuresAfterThisModifier; // Commit the update
            } else {
                // This modifier word could not be applied with any of its categories.
                // As per assumption, all declared modifiers must attach.
                modifiersCompatible = false;
                break;
            }
        }
        if (!modifiersCompatible) continue; // Try next head category

        // 4. Process Right Modifiers (similar logic)
        for (const modifierWord of phrase.rightModifiers) {
            let thisModifierWordApplied = false;
            let featuresAfterThisModifier = currentUnifiedFeatures;

            for (const modifierCategory of modifierWord.categories) {
                if (modifierCategory.mod && modifierCategory.mod.side === "right") {
                    if (unify(modifierCategory.mod.target, currentUnifiedFeatures) !== null) {
                        const newHeadFeatures = unify(currentUnifiedFeatures, modifierCategory.features);
                        if (newHeadFeatures !== null) {
                            featuresAfterThisModifier = newHeadFeatures;
                            thisModifierWordApplied = true;
                            break;
                        }
                    }
                }
            }
            if (thisModifierWordApplied) {
                currentUnifiedFeatures = featuresAfterThisModifier;
            } else {
                modifiersCompatible = false;
                break;
            }
        }
        if (!modifiersCompatible) continue; // Try next head category

        // If all arguments and modifiers were successfully processed:
        const finalUnifiedCategory: SyntacticCategory = {
            categoryName: initialHeadCategory.categoryName ? `Unified(${initialHeadCategory.categoryName})` : 'UnifiedHead',
            features: currentUnifiedFeatures,
            // Preserve the head's own modifier specification, if it had one (it's not part of 'features')
            ...(initialHeadCategory.mod && { mod: initialHeadCategory.mod }),
            // Original 'expectsLeft' and 'expectsRight' are considered 'consumed'
            // and are not part of the resulting category's explicit expectations.
        };
        compatibleResults.push(finalUnifiedCategory);
    }

    return compatibleResults;
}


// --- Example Usage and Verification ---

const I: Word = {
    token: "I",
    categories: [
        {
            categoryName: "I",
            features: {
                type: "det",
                case: "nom",
                agr: {
                    type: "non-3sing",
                    number: "sing",
                    person: "1",
                }
            },
        }
    ]
};

const She: Word = {
    token: "she",
    categories: [
        {
            categoryName: "she",
            features: {
                type: "det",
                case: "nom",
                agr: {
                    type: "3sing",
                    gender: "fem",
                }
            },
        }
    ]
};

const read: Word = {
    token: "read",
    categories: [
        {
            categoryName: "read",
            features: {
                type: "verb",
            },
            expectsLeft: [
                {
                    type: "det",
                    case: "nom",
                    agr: {
                        type: "non-3sing"
                    }
                }
            ],
            expectsRight: [
                {
                    type: "det",
                    case: "acc",
                }
            ]
        },
    ]
};

const reads: Word = {
    token: "reads",
    categories: [
        {
            categoryName: "reads",
            features: {
                type: "verb",
            },
            expectsLeft: [
                {
                    type: "det",
                    case: "nom",
                    agr: {
                        type: "3sing"
                    }
                }
            ],
            expectsRight: [
                {
                    type: "det",
                    case: "acc",
                }
            ]
        },
    ]
};

const a: Word = {
    token: "a",
    categories: [
        {
            categoryName: "a",
            features: {
                type: "det",
            },
            expectsRight: [
                {
                    type: "noun",
                    count: true,
                    agr: {
                        type: "3sing",
                        number: "sing",
                    }
                }
            ]
        },
    ]
};

const book: Word = {
    token: "book",
    categories: [
        {
            categoryName: "book",
            features: {
                type: "noun",
                count: true,
                agr: {
                    type: "3sing",
                    number: "sing",
                }
            },
        },
    ]
};

const books: Word = {
    token: "books",
    categories: [
        {
            categoryName: "books",
            features: {
                type: "noun",
                count: true,
                agr: {
                    type: "non-3sing",
                    number: "pl",
                }
            },
        },
        {
            categoryName: "books",
            features: {
                type: "det",
                count: true,
                agr: {
                    type: "non-3sing",
                    number: "pl",
                }
            },
        },
    ]
};

const sheReadBooks: Phrase = {
    leftModifiers: [],
    leftArguments: [I],
    head: read,
    rightArguments: [books],
    rightModifiers: []
}

console.log(JSON.stringify(parsePhrase(sheReadBooks), null, 2))