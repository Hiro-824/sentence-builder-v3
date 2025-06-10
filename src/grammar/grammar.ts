/* eslint-disable @typescript-eslint/no-unused-vars */
const ENABLE_LOGGING = true;

function logState(stepName: string, phrase: Phrase | null): void {
    if (!ENABLE_LOGGING) return;

    console.log(`\n--- ${stepName} ---`);
    if (phrase) {
        // Pretty-print the JSON object for readability
        console.log(JSON.stringify(phrase, null, 2));
    } else {
        console.log("STATE: null (Parse failed at this step)");
    }
}

type FeatureValue = string | number | boolean | FeatureStructure;
interface FeatureStructure { [key: string]: FeatureValue; }
interface Phrase {
    head: FeatureStructure;
    mod?: ModifierSpec;
    left?: Phrase[];
    right?: Phrase[];
    gaps?: Phrase[];
    categoryName?: string;
}
interface ModifierSpec { side: "left" | "right" | "both"; targets: Phrase[]; }
interface Word { token: string; categories: Phrase[]; }
const MissingArgument: Word = { token: "[[MISSING_ARGUMENT]]", categories: [] };

type RecursiveParseElement = Word | SubPhraseInput;
interface SubPhraseInput { elements: RecursiveParseElement[]; headIndex: number; phraseName?: string; }
function isWord(item: RecursiveParseElement): item is Word { return typeof (item as Word).token === 'string' && Array.isArray((item as Word).categories); }
function isSubPhraseInput(item: RecursiveParseElement): item is SubPhraseInput { return typeof (item as SubPhraseInput).headIndex === 'number' && Array.isArray((item as SubPhraseInput).elements); }

function unify(fs1: FeatureStructure, fs2: FeatureStructure): FeatureStructure | null {
    // ... (implementation is identical)
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

function deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

function processArguments(currentPhrase: Phrase, actualArgs: Word[], expectedPhrases: Phrase[]): Phrase | null {
    const newPhrase = deepCopy(currentPhrase);
    if (!newPhrase.gaps) newPhrase.gaps = [];

    for (let i = 0; i < expectedPhrases.length; i++) {
        const expected = expectedPhrases[i];
        const actualWord = actualArgs[i];
        let argSatisfied = false;

        if (actualWord.token === MissingArgument.token) {
            newPhrase.gaps.push(expected);
            continue;
        }

        for (const cat of actualWord.categories) {
            const unifiedHead = unify(cat.head, expected.head);
            if (unifiedHead === null) continue;

            const requiredGaps = expected.gaps || [];
            const availableGaps = deepCopy(cat.gaps || []);
            let allRequiredGapsMet = true;

            for (const reqGap of requiredGaps) {
                const foundIndex = availableGaps.findIndex(
                    availGap => unify(availGap.head, reqGap.head) !== null
                );
                if (foundIndex > -1) {
                    availableGaps.splice(foundIndex, 1);
                } else {
                    allRequiredGapsMet = false;
                    break;
                }
            }
            if (allRequiredGapsMet) {
                newPhrase.gaps.push(...availableGaps);
                argSatisfied = true;
                break;
            }
        }
        if (!argSatisfied) return null;
    }
    return newPhrase;
}

function processModifiers(currentPhrase: Phrase, modifierWords: Word[], side: "left" | "right"): Phrase | null {
    const phrase = deepCopy(currentPhrase);
    for (const modifierWord of modifierWords) {
        let wordApplied = false;
        for (const modCat of modifierWord.categories) {
            if (modCat.mod && (modCat.mod.side === side || modCat.mod.side === "both")) {
                for (const target of modCat.mod.targets) {
                    const unifiedHead = unify(phrase.head, target.head);
                    if (unifiedHead !== null) {
                        phrase.head = unifiedHead;
                        wordApplied = true;
                        break;
                    }
                }
            }
            if (wordApplied) break;
        }
        if (!wordApplied) return null;
    }
    return phrase;
}

function attemptParseForPhrase(words: Word[], headIndex: number, initialPhrase: Phrase): Phrase | null {
    const expectedLeft = initialPhrase.left || [];
    const expectedRight = initialPhrase.right || [];
    if (headIndex < expectedLeft.length || headIndex + 1 + expectedRight.length > words.length) {
        return null;
    }

    // --- LOGGING: Start of a new parse attempt ---
    if (ENABLE_LOGGING) {
        console.log(`\n\n=================================================`);
        console.log(`NEW ATTEMPT: Head is "${words[headIndex].token}", Category is "${initialPhrase.categoryName || 'Unnamed'}"`);
        console.log(`=================================================`);
    }

    const leftArgStart = headIndex - expectedLeft.length;
    const rightArgEnd = headIndex + 1 + expectedRight.length;
    const leftArgs = words.slice(leftArgStart, headIndex);
    const rightArgs = words.slice(headIndex + 1, rightArgEnd);
    const leftMods = words.slice(0, leftArgStart);
    const rightMods = words.slice(rightArgEnd);

    const initialState: Phrase = { ...deepCopy(initialPhrase), gaps: [] };
    logState("1. Initial State", initialState);

    // --- Pipeline Step 1: Left Arguments ---
    let currentPhrase: Phrase | null = processArguments(initialState, leftArgs, expectedLeft);
    logState("2. After Processing Left Arguments", currentPhrase);
    if (!currentPhrase) return null;

    // --- Pipeline Step 2: Right Arguments ---
    currentPhrase = processArguments(currentPhrase, rightArgs, expectedRight);
    logState("3. After Processing Right Arguments", currentPhrase);
    if (!currentPhrase) return null;

    // --- Pipeline Step 3: Left Modifiers ---
    currentPhrase = processModifiers(currentPhrase, leftMods, "left");
    logState("4. After Processing Left Modifiers", currentPhrase);
    if (!currentPhrase) return null;

    // --- Pipeline Step 4: Right Modifiers ---
    currentPhrase = processModifiers(currentPhrase, rightMods, "right");
    logState("5. After Processing Right Modifiers", currentPhrase);
    if (!currentPhrase) return null;

    const finalResult: Phrase = {
        head: currentPhrase.head,
        mod: currentPhrase.mod,
        ...(currentPhrase.gaps && currentPhrase.gaps.length > 0 && { gaps: currentPhrase.gaps }),
        categoryName: initialPhrase.categoryName ? `Unified(${initialPhrase.categoryName})` : 'UnifiedPhrase',
    };
    logState("6. Final Synthesized Result (SUCCESS)", finalResult);

    return finalResult;
}

function parsePhrase(words: Word[], headIndex: number): Phrase[] {
    if (headIndex < 0 || headIndex >= words.length) return [];
    const headWord = words[headIndex];
    if (!headWord || !headWord.categories) return [];

    const compatibleResults: Phrase[] = [];
    for (const initialPhrase of headWord.categories) {
        const result = attemptParseForPhrase(words, headIndex, initialPhrase);
        if (result) {
            compatibleResults.push(result);
        }
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
        }
    }
    const parsedPhrases = parsePhrase(flatWordList, headIndex);
    let syntheticToken: string;
    if (phraseName) {
        syntheticToken = phraseName;
    } else if (flatWordList.length > 0) {
        syntheticToken = flatWordList.map(w => w.token).join(" ");
    } else {
        syntheticToken = "[[empty_phrase]]";
    }
    return { token: syntheticToken, categories: parsedPhrases };
}

const wordI: Word = {
    token: "I",
    categories: [{
        categoryName: "Pronoun(I)",
        head: { type: 'det', agr: { type: "non-3sing", num: "sing", per: 1 }, case: "nom" }
    }]
};

const wordRead: Word = {
    token: "read",
    categories: [
        {
            categoryName: "Verb(read)-Present", // Renamed for clarity in logs
            head: { type: 'verb', tense: "present" },
            left: [
                { head: { case: 'nom', agr: { type: "non-3sing" } } }
            ],
            right: [
                { head: { type: 'det' } }
            ]
        },
        {
            categoryName: "Verb(read)-Past", // Renamed for clarity in logs
            head: { type: 'verb', tense: "past" },
            left: [
                { head: { case: 'nom' } }
            ],
            right: [
                { head: { type: 'det' } }
            ]
        }
    ]
};

const wordBooks: Word = {
    token: "books",
    categories: [{
        categoryName: "Noun(books)",
        head: { type: 'det', agr: { type: "non-3sing", num: "pl" } }
    }]
};

const wordQuickly: Word = {
    token: "quickly",
    categories: [{
        categoryName: "Adverb(quickly)",
        head: { type: 'adverb' },
        mod: {
            side: "both",
            targets: [
                { head: { type: 'verb' } }
            ]
        }
    }]
};

const sentence: Word[] = [wordI, wordRead, MissingArgument, wordQuickly];
const headIndex = 1;

console.log("--- STARTING PARSE ---");
const finalParses = parsePhrase(sentence, headIndex);
console.log("\n--- FINAL PARSE RESULTS ---");

if (finalParses.length > 0) {
    console.log(`Success! Found ${finalParses.length} valid parse(s).`);
    console.log(JSON.stringify(finalParses, null, 2));
} else {
    console.log("Parse failed. No valid interpretations found.");
}
