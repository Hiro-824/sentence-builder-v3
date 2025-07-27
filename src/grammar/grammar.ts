import { CustomUnificationPath, FeatureStructure, FeatureValue, MissingArgument, Phrase, RecursiveParseElement, SubPhraseInput, TranslationElement, TranslationTemplates, Word } from "@/models/grammar-entities";

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

    deepCopy<T>(obj: T): T { return structuredClone(obj); }

    findValueByPath(phrase: Phrase, path: CustomUnificationPath): FeatureValue | undefined {
        let currentValue: unknown = phrase;

        for (const segment of path) {
            if (currentValue === null || typeof currentValue !== 'object') return undefined;

            if (typeof segment === 'number') {
                if (!Array.isArray(currentValue)) return undefined;
                currentValue = currentValue[segment];
            } else {
                currentValue = (currentValue as Record<string, unknown>)[segment];
            }
        }

        return currentValue as FeatureValue;
    }

    updateValueByPath(phrase: Phrase, path: CustomUnificationPath, updatedValue: FeatureValue): Phrase {
        const recursiveUpdate = (
            current: unknown,
            remainingPath: CustomUnificationPath
        ): unknown => {
            if (remainingPath.length === 0) {
                return updatedValue;
            }

            if (current === null || typeof current !== 'object') {
                throw new Error(`Invalid path: Cannot traverse into non-object value while trying to update.`);
            }

            const [segment, ...restOfPath] = remainingPath;

            if (typeof segment === 'number') {
                if (!Array.isArray(current)) {
                    throw new Error(`Path mismatch: Expected an array to access index ${segment}, but found an object.`);
                }
                const newArray = [...current];
                newArray[segment] = recursiveUpdate(newArray[segment], restOfPath);
                return newArray;
            } else {
                if (Array.isArray(current)) {
                    throw new Error(`Path mismatch: Expected an object to access key "${segment}", but found an array.`);
                }
                const newObject = { ...current } as Record<string, unknown>;
                newObject[segment] = recursiveUpdate(newObject[segment], restOfPath);
                return newObject;
            }
        };
        return recursiveUpdate(phrase, path) as Phrase;
    }

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

    translate(template: TranslationElement[], phrase: Phrase): string {
        // Helper to resolve a sub-phrase by path
        function resolveByPath(obj: unknown, path: (string | number)[]): unknown {
            let current: unknown = obj;
            for (const segment of path) {
                if (current == null || (typeof current !== 'object' && !Array.isArray(current))) return undefined;
                current = (current as Record<string, unknown>)[segment as keyof typeof current];
            }
            return current;
        }

        const translateModifiers = (modifiers: Phrase[] | undefined): string => {
            if (!modifiers || modifiers.length === 0) {
                return "";
            }
            return modifiers.map(mod => {
                // A modifier is itself a Phrase. We need to find its own translation
                // for the same key we are currently processing.
                const modTranslation = mod.translation?.["default"];
                if (Array.isArray(modTranslation)) {
                    // If the modifier's translation is complex (i.e., a template),
                    // we recursively call `translate`. This correctly handles
                    // modifiers that have their own modifiers (e.g., "very big").
                    return this.translate(modTranslation, mod);
                } else if (typeof modTranslation === 'string') {
                    // If it's a simple string, just return it.
                    return modTranslation;
                }
                // If the modifier has no translation for this key, return an empty string.
                return "";
            }).join(" ");
        };

        // --- STAGE 1: Translate Left Modifiers ---
        const leftModsTranslation = translateModifiers(phrase.leftModifiers);

        // --- STAGE 2: Translate the main template (Original Logic) ---
        const mainParts = template.map((element) => {
            if (typeof element === "string") {
                return element;
            } else if (
                typeof element === "object" &&
                element !== null &&
                Array.isArray(element.path) &&
                typeof element.key === "string"
            ) {
                const subPhrase = resolveByPath(phrase, element.path);
                const particle = (typeof element.particle === "string") ? element.particle : undefined;
                if (
                    subPhrase &&
                    typeof subPhrase === "object" &&
                    'translation' in subPhrase &&
                    typeof (subPhrase as Phrase).translation === "object" &&
                    (subPhrase as Phrase).translation !== null
                ) {
                    const translation = (subPhrase as Phrase).translation;
                    if (translation && translation[element.key]) {
                        const subTemplate = translation[element.key];

                        let subResult = Array.isArray(subTemplate)
                            ? this.translate(subTemplate, subPhrase as Phrase)
                            : String(subTemplate);

                        const unresolvedRegex = /\[\[UNRESOLVED:[^:]*:[^:]*:id=(inst_[a-zA-Z0-9]*)\]\]/g;
                        const allMatches = [...subResult.matchAll(unresolvedRegex)];

                        for (const currentMatch of allMatches) {
                            const fullMatchString = currentMatch[0];
                            const gapId = currentMatch[1];

                            if (phrase.resolvedGapIds && phrase.resolvedGapIds.includes(gapId)) {
                                console.log(`[Grammar.translate] Detected RESOLVED child gap with ID: ${gapId}`);

                                if (element.filler) {
                                    const fillerPhrase = resolveByPath(phrase, element.filler) as Phrase | undefined;
                                    if (fillerPhrase?.translation?.['default']) {
                                        const fillerTemplate = fillerPhrase.translation['default'];
                                        const fillerTranslation = Array.isArray(fillerTemplate)
                                            ? this.translate(fillerTemplate, fillerPhrase)
                                            : String(fillerTemplate);
                                        subResult = subResult.replace(fullMatchString, fillerTranslation);
                                    } else {
                                        subResult = subResult.replace(fullMatchString, "");
                                    }
                                } else {
                                    subResult = subResult.replace(fullMatchString, "");
                                }
                            }
                        }

                        const trimmedResult = subResult.trim();
                        if (trimmedResult === "") {
                            return "";
                        }

                        return particle ? `${trimmedResult} ${particle}` : trimmedResult;
                    }
                }
                const pathStr = element.path?.join(".") ?? "";

                let unresolvedString = `[[UNRESOLVED:${pathStr}:${element.key}`;
                if (subPhrase && typeof subPhrase === 'object' && 'head' in subPhrase) {
                    const head = (subPhrase as Phrase).head;
                    if (head && typeof head === 'object' && 'instanceId' in head && head.instanceId) {
                        unresolvedString += `:id=${head.instanceId}`;
                    }
                }
                unresolvedString += "]]";

                return unresolvedString + (particle ? ` ${particle}` : "");
            } else {
                return "[[UNRESOLVED:INVALID_ELEMENT]]";
            }
        });
        const mainTranslation = mainParts.join(" ");

        // --- STAGE 3: Translate Right Modifiers ---
        const rightModsTranslation = translateModifiers(phrase.rightModifiers);

        // --- FINAL ASSEMBLY ---
        // Combine all parts, filtering out empty strings to avoid extra spaces.
        const finalResult = [
            rightModsTranslation,
            leftModsTranslation,
            mainTranslation
        ].filter(Boolean).join(" "); // filter(Boolean) is a concise way to remove empty strings

        return finalResult.replace(/ +/g, " ").trim();
    }

    processArguments(currentPhrase: Phrase, actualArgs: Word[], expectedPhrases: Phrase[], side: "left" | "right"): Phrase | null {
        const newPhrase = this.deepCopy(currentPhrase);
        if (!newPhrase.gaps) newPhrase.gaps = [];
        if (!newPhrase.resolvedGapIds) newPhrase.resolvedGapIds = [];

        const unifiedArgs: Phrase[] = []; // This will be built up with placeholders for missing args

        for (let i = 0; i < expectedPhrases.length; i++) {
            const expected = expectedPhrases[i];
            const actualWord = actualArgs[i];
            let argSatisfied = false;

            if (actualWord && actualWord.token === MissingArgument.token) {
                const placeholder = this.deepCopy(expected);
                placeholder.head.isGap = true;
                if (actualWord.instanceId) {
                    (placeholder.head).instanceId = actualWord.instanceId;
                }
                unifiedArgs.push(placeholder);
                argSatisfied = true;
            } else if (actualWord) {
                // Original logic for when an argument is present
                for (const cat of actualWord.categories) {
                    const unifiedHead = this.unify(cat.head, expected.head);
                    if (unifiedHead === null) continue;

                    const requiredGaps = expected.gaps || [];
                    const availableGaps = this.deepCopy(cat.gaps || []);
                    let allRequiredGapsMet = true;
                    for (const reqGap of requiredGaps) {
                        const foundIndex = availableGaps.findIndex(availGap => this.unify(availGap.head, reqGap.head) !== null);
                        if (foundIndex > -1) {
                            const resolvedGap = availableGaps[foundIndex];
                            const resolvedId = (resolvedGap.head)?.instanceId;
                            if (resolvedId) {
                                newPhrase.resolvedGapIds.push(resolvedId as string);
                            }
                            availableGaps.splice(foundIndex, 1);
                        }
                        else { allRequiredGapsMet = false; break; }
                    }

                    if (allRequiredGapsMet) {
                        newPhrase.gaps.push(...availableGaps);
                        const unifiedArg = this.deepCopy(cat);
                        unifiedArg.head = unifiedHead;
                        unifiedArgs.push(unifiedArg);
                        argSatisfied = true;
                        break;
                    }
                }
            }

            // This check now correctly handles both found and missing arguments
            if (!argSatisfied) return null;
        }

        if (side === "left") { newPhrase.left = unifiedArgs; } else { newPhrase.right = unifiedArgs; }

        return newPhrase;
    }

    processModifiers(currentPhrase: Phrase, modifierWords: Word[], side: "left" | "right"): Phrase | null {
        const phrase = this.deepCopy(currentPhrase);

        // Initialize modifier arrays if they don't exist
        if (side === "left" && !phrase.leftModifiers) {
            phrase.leftModifiers = [];
        }
        if (side === "right" && !phrase.rightModifiers) {
            phrase.rightModifiers = [];
        }

        for (const modifierWord of modifierWords) {
            let wordApplied = false;
            for (const modCat of modifierWord.categories) {
                // Determine which set of targets to use
                const targets = (side === 'left') ? modCat.rightModTargets : modCat.leftModTargets;

                if (targets) {
                    for (const target of targets) {
                        const unifiedHead = this.unify(phrase.head, target.head);
                        if (unifiedHead !== null) {
                            // On success, update the head AND store the modifier
                            phrase.head = unifiedHead;
                            const modifierPhrase = this.deepCopy(modCat);

                            if (side === 'left') {
                                phrase.leftModifiers!.push(modifierPhrase);
                            } else {
                                phrase.rightModifiers!.push(modifierPhrase);
                            }

                            wordApplied = true;
                            break; // Move to the next modifier word
                        }
                    }
                }
                if (wordApplied) break; // Found a valid category for this word
            }
            if (!wordApplied) {
                // If any modifier word cannot be applied, the parse fails
                return null;
            }
        }
        return phrase;
    }

    processCustomUnifications(phrase: Phrase, unificationGroups: CustomUnificationPath[][]): Phrase | null {
        if (!unificationGroups || unificationGroups.length === 0) {
            return phrase;
        }

        let currentPhraseState = phrase;

        for (const group of unificationGroups) {
            const resolvedPaths = group
                .map(path => ({ path, value: this.findValueByPath(currentPhraseState, path) }))
                .filter((pv): pv is { path: CustomUnificationPath; value: FeatureValue } => pv.value !== undefined);

            if (resolvedPaths.length < 2) {
                continue;
            }

            let unifiedResult: FeatureValue = this.deepCopy(resolvedPaths[0].value);

            for (let i = 1; i < resolvedPaths.length; i++) {
                const val1 = unifiedResult;
                const val2 = resolvedPaths[i].value;

                const v1IsObject = typeof val1 === 'object' && val1 !== null && !Array.isArray(val1);
                const v2IsObject = typeof val2 === 'object' && val2 !== null && !Array.isArray(val2);

                if (v1IsObject && v2IsObject) {
                    const subUnification = this.unify(val1 as FeatureStructure, val2 as FeatureStructure);
                    if (subUnification === null) {
                        console.log(`Custom unification failed: Conflict between ${JSON.stringify(val1)} and ${JSON.stringify(val2)}.`);
                        return null;
                    }
                    unifiedResult = subUnification;
                } else if (val1 !== val2) {
                    console.log(`Custom unification failed: Primitive mismatch between ${JSON.stringify(val1)} and ${JSON.stringify(val2)}.`);
                    return null;
                }
            }

            for (const { path } of resolvedPaths) {
                currentPhraseState = this.updateValueByPath(currentPhraseState, path, unifiedResult);
            }
        }

        return currentPhraseState;
    }

    processTranslation(phrase: Phrase, templates: TranslationTemplates): FeatureStructure {
        const result: FeatureStructure = {};
        for (const key in templates) {
            result[key] = this.translate(templates[key], phrase);
        }
        return result;
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
        let currentPhrase: Phrase | null = this.processArguments(initialState, leftArgs, expectedLeft, "left");
        this.logState("2. After Processing Left Arguments", currentPhrase);
        if (!currentPhrase) return null;
        currentPhrase = this.processArguments(currentPhrase, rightArgs, expectedRight, "right");
        this.logState("3. After Processing Right Arguments", currentPhrase);
        if (!currentPhrase) return null;
        currentPhrase = this.processModifiers(currentPhrase, leftMods, "left");
        this.logState("4. After Processing Left Modifiers", currentPhrase);
        if (!currentPhrase) return null;
        currentPhrase = this.processModifiers(currentPhrase, rightMods, "right");
        this.logState("5. After Processing Right Modifiers", currentPhrase);
        if (!currentPhrase) return null;

        if (initialPhrase.customUnification) {
            currentPhrase = this.processCustomUnifications(currentPhrase, initialPhrase.customUnification);
            this.logState("6. After Custom Unifications", currentPhrase);
            if (!currentPhrase) return null;
        }

        // Step 7: Finalize Gaps.
        const finalizeGaps = (phrase: Phrase): Phrase => {
            const finalPhrase = this.deepCopy(phrase);
            finalPhrase.gaps = finalPhrase.gaps || [];

            const processSide = (side: "left" | "right") => {
                const args = finalPhrase[side];
                if (!args) return;

                const newGaps: Phrase[] = [];
                for (const arg of args) {
                    if (arg.head?.isGap === true) {
                        newGaps.push(arg);
                    }
                }

                finalPhrase.gaps!.unshift(...newGaps);

                for (const arg of args) {
                    if (arg.head?.isGap === true) {
                        delete arg.head.isGap;
                    }
                }
            };

            processSide("right");
            processSide("left");
            return finalPhrase;
        };
        currentPhrase = finalizeGaps(currentPhrase);
        this.logState("7. After Finalizing Gaps", currentPhrase);

        // Step 8: Perform translation on the finalized structure.
        let finalTranslation: FeatureStructure | undefined = undefined;
        if (initialPhrase.translationTemplates) {
            finalTranslation = this.processTranslation(currentPhrase, initialPhrase.translationTemplates);
            const phraseForLog = { ...currentPhrase, translation: finalTranslation };
            this.logState("8. After Translation", phraseForLog);
        }

        // Step 9: Create the final result.
        const finalResult: Phrase = {
            head: currentPhrase.head,
            gaps: currentPhrase.gaps,
            left: currentPhrase.left,
            right: currentPhrase.right,
            leftModifiers: currentPhrase.leftModifiers,
            rightModifiers: currentPhrase.rightModifiers,
            leftModTargets: currentPhrase.leftModTargets,
            rightModTargets: currentPhrase.rightModTargets,
            categoryName: initialPhrase.categoryName ? `Unified(${initialPhrase.categoryName})` : 'UnifiedPhrase',
            translation: finalTranslation,
            resolvedGapIds: currentPhrase.resolvedGapIds,
        };

        if (!finalResult.gaps || finalResult.gaps.length === 0) delete finalResult.gaps;
        if (!finalResult.leftModTargets) delete finalResult.leftModTargets;
        if (!finalResult.rightModTargets) delete finalResult.rightModTargets;
        if (!finalResult.resolvedGapIds || finalResult.resolvedGapIds.length === 0) delete finalResult.resolvedGapIds;

        this.logState("9. Final Synthesized Result (SUCCESS)", finalResult);
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