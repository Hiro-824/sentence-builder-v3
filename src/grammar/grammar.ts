/* eslint-disable @typescript-eslint/no-unused-vars */
const ENABLE_LOGGING = true;

function logState(stepName: string, phrase: Phrase | null): void {
    if (!ENABLE_LOGGING) return; console.log(`\n--- ${stepName} ---`);
    if (phrase) {
        console.log(JSON.stringify(phrase, null, 2));
    } else {
        console.log("STATE: null (Parse failed at this step)");
    }
}

type FeatureValue = string | number | boolean | FeatureStructure;
interface FeatureStructure { [key: string]: FeatureValue; }

interface Phrase {
    head: FeatureStructure;
    left?: Phrase[];
    right?: Phrase[];
    gaps?: Phrase[];
    categoryName?: string;
    leftModTargets?: Phrase[];
    rightModTargets?: Phrase[];
}

interface Word { token: string; categories: Phrase[]; }
const MissingArgument: Word = { token: "[[MISSING_ARGUMENT]]", categories: [] };

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

function deepCopy<T>(obj: T): T { return JSON.parse(JSON.stringify(obj)); }

function processArguments(currentPhrase: Phrase, actualArgs: Word[], expectedPhrases: Phrase[]): Phrase | null {
    const newPhrase = deepCopy(currentPhrase);
    if (!newPhrase.gaps) newPhrase.gaps = [];
    for (let i = 0; i < expectedPhrases.length; i++) {
        const expected = expectedPhrases[i];
        const actualWord = actualArgs[i];
        let argSatisfied = false;
        if (actualWord.token === MissingArgument.token) { newPhrase.gaps.push(expected); continue; }
        for (const cat of actualWord.categories) {
            const unifiedHead = unify(cat.head, expected.head);
            if (unifiedHead === null) continue;
            const requiredGaps = expected.gaps || [];
            const availableGaps = deepCopy(cat.gaps || []);
            let allRequiredGapsMet = true;
            for (const reqGap of requiredGaps) {
                const foundIndex = availableGaps.findIndex(availGap => unify(availGap.head, reqGap.head) !== null);
                if (foundIndex > -1) { availableGaps.splice(foundIndex, 1); }
                else { allRequiredGapsMet = false; break; }
            }
            if (allRequiredGapsMet) { newPhrase.gaps.push(...availableGaps); argSatisfied = true; break; }
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
            // Determine which set of targets to use based on the modifier's position.
            // A modifier on the left targets a head to its right.
            // A modifier on the right targets a head to its left.
            const targets = (side === 'left') ? modCat.rightModTargets : modCat.leftModTargets;

            if (targets) {
                for (const target of targets) {
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
    if (headIndex < expectedLeft.length || headIndex + 1 + expectedRight.length > words.length) { return null; }
    if (ENABLE_LOGGING) { console.log(`\n\n=================================================`); console.log(`NEW ATTEMPT: Head is "${words[headIndex].token}", Category is "${initialPhrase.categoryName || 'Unnamed'}"`); console.log(`=================================================`); }
    const leftArgStart = headIndex - expectedLeft.length;
    const rightArgEnd = headIndex + 1 + expectedRight.length;
    const leftArgs = words.slice(leftArgStart, headIndex);
    const rightArgs = words.slice(headIndex + 1, rightArgEnd);
    const leftMods = words.slice(0, leftArgStart);
    const rightMods = words.slice(rightArgEnd);
    const initialState: Phrase = { ...deepCopy(initialPhrase), gaps: [] };
    logState("1. Initial State", initialState);
    let currentPhrase: Phrase | null = processArguments(initialState, leftArgs, expectedLeft);
    logState("2. After Processing Left Arguments", currentPhrase);
    if (!currentPhrase) return null;
    currentPhrase = processArguments(currentPhrase, rightArgs, expectedRight);
    logState("3. After Processing Right Arguments", currentPhrase);
    if (!currentPhrase) return null;
    currentPhrase = processModifiers(currentPhrase, leftMods, "left");
    logState("4. After Processing Left Modifiers", currentPhrase);
    if (!currentPhrase) return null;
    currentPhrase = processModifiers(currentPhrase, rightMods, "right");
    logState("5. After Processing Right Modifiers", currentPhrase);
    if (!currentPhrase) return null;

    // Create the final result, carrying over any modifier capabilities from the original head phrase.
    const finalResult: Phrase = {
        head: currentPhrase.head,
        gaps: currentPhrase.gaps,
        leftModTargets: currentPhrase.leftModTargets,
        rightModTargets: currentPhrase.rightModTargets,
        categoryName: initialPhrase.categoryName ? `Unified(${initialPhrase.categoryName})` : 'UnifiedPhrase',
    };

    // Clean up empty/undefined properties for a tidier final object.
    if (!finalResult.gaps || finalResult.gaps.length === 0) delete finalResult.gaps;
    if (!finalResult.leftModTargets) delete finalResult.leftModTargets;
    if (!finalResult.rightModTargets) delete finalResult.rightModTargets;

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
        if (result) { compatibleResults.push(result); }
    }
    return compatibleResults;
}

type RecursiveParseElement = Word | SubPhraseInput;
interface SubPhraseInput { elements: RecursiveParseElement[]; headIndex: number; phraseName?: string; }
function isWord(item: RecursiveParseElement): item is Word { return typeof (item as Word).token === 'string' && Array.isArray((item as Word).categories); }
function isSubPhraseInput(item: RecursiveParseElement): item is SubPhraseInput { return typeof (item as SubPhraseInput).headIndex === 'number' && Array.isArray((item as SubPhraseInput).elements); }

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

const wordI: Word = { token: "I", categories: [{ categoryName: "Pronoun(I)", head: { type: 'det', agr: { type: "non-3sing", num: "sing", per: 1 }, case: "nom" } }] };
const wordShe: Word = { token: "she", categories: [{ categoryName: "Pronoun(she)", head: { type: 'det', agr: { type: "3sing", gender: "female" }, case: "nom" } }] };
const wordRead: Word = { token: "read", categories: [ { categoryName: "Verb(read)-Present", head: { type: 'verb', tense: "present" }, left: [ { head: { case: 'nom', agr: { type: "non-3sing" } } } ], right: [ { head: { type: 'det' } } ] }, { categoryName: "Verb(read)-Past", head: { type: 'verb', tense: "past" }, left: [ { head: { case: 'nom' } } ], right: [ { head: { type: 'det' } } ] } ] };
const wordA: Word = { token: "a", categories: [{ categoryName: "Determiner(a)", head: { type: 'det', agr: { type: "3sing", num: "sing" } }, right: [ { head: { type: 'noun', agr: { type: "3sing" } } } ] }] };
const wordBook: Word = { token: "book", categories: [{ categoryName: "Noun(book)", head: { type: 'noun', agr: { type: "3sing", num: "sing" } } }] };
const wordBooks: Word = { token: "books", categories: [{ categoryName: "Noun(books)", head: { type: 'noun', agr: { type: "non-3sing", num: "pl" } } }] };
const wordQuickly: Word = { token: "quickly", categories: [{ categoryName: "Adverb(quickly)", head: { type: 'adverb' }, leftModTargets: [ { head: { type: 'verb' } } ], rightModTargets: [ { head: { type: 'verb' } } ] }] };
const wordIn: Word = { token: "in", categories: [{ categoryName: "Preposition(in)", head: { type: 'preposition' }, right: [ { head: { type: 'det' } } ], leftModTargets: [ { head: { type: 'verb' } }, { head: { type: 'det' } } ] }] };
const wordThe: Word = { token: "the", categories: [{ categoryName: "Determiner(the)", head: { type: 'det' }, right: [ { head: { type: 'noun' } } ] }] };
const wordRoom: Word = { token: "room", categories: [{ categoryName: "Noun(room)", head: { type: 'noun', agr: { type: "3sing", num: "sing" } } }] };

// --- Building the Nested Structure ---
const subPhraseABook: SubPhraseInput = { elements: [wordA, wordBook], headIndex: 0, phraseName: "[a book]" };
const subPhraseTheRoom: SubPhraseInput = { elements: [wordThe, wordRoom], headIndex: 0, phraseName: "[the room]" };
const subPhraseQuickly: SubPhraseInput = { elements: [wordQuickly], headIndex: 0, phraseName: "[quickly]" };
const subPhraseInTheRoom: SubPhraseInput = { elements: [wordIn, subPhraseTheRoom], headIndex: 0, phraseName: "[in the room]" };
const topLevelPhraseInput: SubPhraseInput = { elements: [ wordShe, wordRead, subPhraseABook, subPhraseQuickly, subPhraseInTheRoom ], headIndex: 1, phraseName: "S" };

// --- Final Execution ---
console.log("--- STARTING NESTED PARSE ---");
const finalResultWord = parseNestedPhrase(topLevelPhraseInput);
console.log("\n--- FINAL PARSE RESULTS OF NESTED PHRASE ---");
if (finalResultWord.categories.length > 0) {
    console.log(`Success! Found ${finalResultWord.categories.length} valid parse(s) for the phrase "${finalResultWord.token}".`);
    console.log(JSON.stringify(finalResultWord.categories, null, 2));
} else {
    console.log(`Parse failed for phrase "${finalResultWord.token}". No valid interpretations found.`);
}