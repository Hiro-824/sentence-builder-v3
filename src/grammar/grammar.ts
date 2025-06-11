import { FeatureStructure, MissingArgument, Phrase, RecursiveParseElement, SubPhraseInput, Word } from "@/models/grammar-entities";

export class Grammar {
    enableLogging: boolean;

    constructor(enableLogging = false) {
        this.enableLogging = enableLogging;
    }

    logState(stepName: string, phrase: Phrase | null): void {
        if (!this.enableLogging) return; console.log(`\n--- ${stepName} ---`);
        if (phrase) {
            console.log(JSON.stringify(phrase, null, 2));
        } else {
            console.log("STATE: null (Parse failed at this step)");
        }
    }

    deepCopy<T>(obj: T): T { return JSON.parse(JSON.stringify(obj)); }

    unify(fs1: FeatureStructure, fs2: FeatureStructure): FeatureStructure | null {
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
                    const subUnification = this.unify(val1 as FeatureStructure, val2 as FeatureStructure);
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

    processArguments(currentPhrase: Phrase, actualArgs: Word[], expectedPhrases: Phrase[]): Phrase | null {
        const newPhrase = this.deepCopy(currentPhrase);
        if (!newPhrase.gaps) newPhrase.gaps = [];
        for (let i = 0; i < expectedPhrases.length; i++) {
            const expected = expectedPhrases[i];
            const actualWord = actualArgs[i];
            let argSatisfied = false;
            if (actualWord.token === MissingArgument.token) { newPhrase.gaps.push(expected); continue; }
            for (const cat of actualWord.categories) {
                const unifiedHead = this.unify(cat.head, expected.head);
                if (unifiedHead === null) continue;
                const requiredGaps = expected.gaps || [];
                const availableGaps = this.deepCopy(cat.gaps || []);
                let allRequiredGapsMet = true;
                for (const reqGap of requiredGaps) {
                    const foundIndex = availableGaps.findIndex(availGap => this.unify(availGap.head, reqGap.head) !== null);
                    if (foundIndex > -1) { availableGaps.splice(foundIndex, 1); }
                    else { allRequiredGapsMet = false; break; }
                }
                if (allRequiredGapsMet) { newPhrase.gaps.push(...availableGaps); argSatisfied = true; break; }
            }
            if (!argSatisfied) return null;
        }
        return newPhrase;
    }

    processModifiers(currentPhrase: Phrase, modifierWords: Word[], side: "left" | "right"): Phrase | null {
        const phrase = this.deepCopy(currentPhrase);

        for (const modifierWord of modifierWords) {
            let wordApplied = false;
            for (const modCat of modifierWord.categories) {
                // Determine which set of targets to use based on the modifier's position.
                // A modifier on the left targets a head to its right.
                // A modifier on the right targets a head to its left.
                const targets = (side === 'left') ? modCat.rightModTargets : modCat.leftModTargets;

                if (targets) {
                    for (const target of targets) {
                        const unifiedHead = this.unify(phrase.head, target.head);
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

    attemptParseForCategory(words: Word[], headIndex: number, initialPhrase: Phrase): Phrase | null {
        const expectedLeft = initialPhrase.left || [];
        const expectedRight = initialPhrase.right || [];
        if (headIndex < expectedLeft.length || headIndex + 1 + expectedRight.length > words.length) { return null; }
        if (this.enableLogging) { console.log(`\n\n=================================================`); console.log(`NEW ATTEMPT: Head is "${words[headIndex].token}", Category is "${initialPhrase.categoryName || 'Unnamed'}"`); console.log(`=================================================`); }
        const leftArgStart = headIndex - expectedLeft.length;
        const rightArgEnd = headIndex + 1 + expectedRight.length;
        const leftArgs = words.slice(leftArgStart, headIndex);
        const rightArgs = words.slice(headIndex + 1, rightArgEnd);
        const leftMods = words.slice(0, leftArgStart);
        const rightMods = words.slice(rightArgEnd);
        const initialState: Phrase = { ...this.deepCopy(initialPhrase), gaps: [] };
        this.logState("1. Initial State", initialState);
        let currentPhrase: Phrase | null = this.processArguments(initialState, leftArgs, expectedLeft);
        this.logState("2. After Processing Left Arguments", currentPhrase);
        if (!currentPhrase) return null;
        currentPhrase = this.processArguments(currentPhrase, rightArgs, expectedRight);
        this.logState("3. After Processing Right Arguments", currentPhrase);
        if (!currentPhrase) return null;
        currentPhrase = this.processModifiers(currentPhrase, leftMods, "left");
        this.logState("4. After Processing Left Modifiers", currentPhrase);
        if (!currentPhrase) return null;
        currentPhrase = this.processModifiers(currentPhrase, rightMods, "right");
        this.logState("5. After Processing Right Modifiers", currentPhrase);
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

        this.logState("6. Final Synthesized Result (SUCCESS)", finalResult);
        return finalResult;
    }

    parsePhrase(words: Word[], headIndex: number): Phrase[] {
        if (headIndex < 0 || headIndex >= words.length) return [];
        const headWord = words[headIndex];
        if (!headWord || !headWord.categories) return [];
        const compatibleResults: Phrase[] = [];
        for (const initialPhrase of headWord.categories) {
            const result = this.attemptParseForCategory(words, headIndex, initialPhrase);
            if (result) { compatibleResults.push(result); }
        }
        return compatibleResults;
    }

    isWord(item: RecursiveParseElement): item is Word { return typeof (item as Word).token === 'string' && Array.isArray((item as Word).categories); }
    isSubPhraseInput(item: RecursiveParseElement): item is SubPhraseInput { return typeof (item as SubPhraseInput).headIndex === 'number' && Array.isArray((item as SubPhraseInput).elements); }

    parseNestedPhrase(input: SubPhraseInput): Word {
        const { elements, headIndex, phraseName } = input;
        const flatWordList: Word[] = [];
        for (const item of elements) {
            if (this.isWord(item)) {
                flatWordList.push(item);
            } else if (this.isSubPhraseInput(item)) {
                const subPhraseAsWord = this.parseNestedPhrase(item);
                flatWordList.push(subPhraseAsWord);
            }
        }
        const parsedPhrases = this.parsePhrase(flatWordList, headIndex);
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
}