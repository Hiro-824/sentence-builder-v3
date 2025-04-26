import { argument, Category, Constituent } from "./category";

export class Grammar {
    validateConstituent(constituent: Constituent, ignoreAdjunct = false): { possibleCategories: Category[], lastEmptyIds: string[] } {
        const { categories } = constituent.head;
        const lastEmptyIds: string[] = [];
        const possibleCategories = categories.filter(category => {
            const specifiersValid = this.validateArguments(category.specifiers, constituent.specifiers);
            const complementsValid = this.validateArguments(category.complements, constituent.complements);
            lastEmptyIds.push(...specifiersValid.lastEmptyIds);
            lastEmptyIds.push(...complementsValid.lastEmptyIds);
            if (ignoreAdjunct) {
                return specifiersValid.isValid && complementsValid.isValid;
            }
            const preAdjunctsValid = this.validateAdjuncts(constituent, constituent.preAdjuncts, "left");
            const postAdjunctsValid = this.validateAdjuncts(constituent, constituent.postAdjuncts, "right");
            lastEmptyIds.push(...preAdjunctsValid.lastEmptyIds);
            lastEmptyIds.push(...postAdjunctsValid.lastEmptyIds);
            return specifiersValid.isValid && complementsValid.isValid && preAdjunctsValid.isValid && postAdjunctsValid.isValid;
        });
        return {
            possibleCategories: possibleCategories,
            lastEmptyIds: lastEmptyIds,
        }
    }

    translateConstituent(
        constituent: Constituent,
        lastEmptyComplements: { id: string, index: number }[],
        key?: string,
    ): string {
        const validationResult = this.validateConstituent(constituent);
        if (validationResult.possibleCategories.length === 0) return "";

        const category = validationResult.possibleCategories[0];
        const lastEmptyIds = validationResult.lastEmptyIds;
        lastEmptyIds.forEach((lastEmptyId) => {
            const constituentToHaveLastComplementEmpty = this.findConstituent(lastEmptyId, constituent);
            if (constituentToHaveLastComplementEmpty) {
                const lastComplement = this.findLastComplement(constituentToHaveLastComplementEmpty);
                if (lastComplement !== null) {
                    lastEmptyComplements.push(lastComplement);
                }
            }
        });

        const translationTemplate =
            key && category.translation[key]
                ? category.translation[key]
                : Object.values(category.translation)[0];

        const preAdj = (constituent.preAdjuncts || [])
            .map(a => this.translateConstituent(a, lastEmptyComplements))
            .join("");
        const postAdj = (constituent.postAdjuncts || [])
            .map(a => this.translateConstituent(a, lastEmptyComplements))
            .join("");

        // our new regex:  \{([SC])(\d+)(?:\{([^}]+)\})?\}
        // 1 → “S” or “C”
        // 2 → digit index
        // 3 → optional inner‐key
        // 4 → optional word role indicator
        const filled =
            translationTemplate.replace(
                /\{([SC])(\d+)(?:\{([^}]+)\})?(?:\[(.*?)\])?\}/g,
                (_, type, numStr, innerKey, indicator) => {
                    const idx = parseInt(numStr, 10) - 1;
                    const indicatorWord = indicator ? indicator : "";

                    const arr =
                        type === "S"
                            ? constituent.specifiers || []
                            : constituent.complements || [];
                    const child = arr[idx];

                    if (!child) {
                        if (lastEmptyComplements.some((lastEmptyComplement) => (constituent.id === lastEmptyComplement.id && idx === lastEmptyComplement.index))) {
                            return ""
                        }
                        return `{${constituent.id}-${type}${idx + 1}}${indicatorWord}`;
                    }

                    return innerKey
                        ? this.translateConstituent(child, lastEmptyComplements, innerKey) + indicatorWord
                        : this.translateConstituent(child, lastEmptyComplements) + indicatorWord;
                }
            );

        return postAdj + preAdj + filled;
    }

    findConstituent(
        id: string,
        constituent: Constituent
    ): Constituent | null {
        // check current node
        if (constituent.id === id) {
            return constituent;
        }

        // gather all potential child slots
        const children: (Constituent | null)[] = [
            ...constituent.preAdjuncts,
            ...constituent.specifiers,
            ...constituent.complements,
            ...constituent.postAdjuncts,
        ];

        // recurse into each non-null child
        for (const child of children) {
            if (child !== null) {
                const found = this.findConstituent(id, child);
                if (found !== null) {
                    return found;
                }
            }
        }

        // nothing found in this subtree
        return null;
    }

    findLastComplement(constituent: Constituent): { id: string, index: number } | null {
        const complements = constituent.complements;
        if (complements.length === 0) return null;
        const lastComplement = complements[complements.length - 1];
        if (lastComplement === null) return { id: constituent.id, index: complements.length - 1 };
        return this.findLastComplement(lastComplement);
    }

    validateArguments(required: Category[], provided: argument[]): { isValid: boolean, lastEmptyIds: string[] } {
        const lastEmptyIds: string[] = [];
        const isValid = required.every((requiredCategory, i) => {
            const providedValue = provided[i];
            if (providedValue === null) return true;
            const compatibility = this.isCompatible(requiredCategory, providedValue);
            if (compatibility.lastEmptyIds) lastEmptyIds.push(...compatibility.lastEmptyIds);
            return compatibility.isCompatible;
        });
        return {
            isValid: isValid,
            lastEmptyIds: lastEmptyIds,
        }
    }

    validateAdjuncts(modified: Constituent, adjuncts: Constituent[], side: "right" | "left"): { isValid: boolean, lastEmptyIds: string[] } {
        const lastEmptyIds: string[] = [];
        const isValid = adjuncts.every((adjunct) => {
            // First validate the adjunct itself as a constituent
            const validationResult = this.validateConstituent(adjunct);
            const validCategories = validationResult.possibleCategories;
            lastEmptyIds.push(...validationResult.lastEmptyIds);
            if (validCategories.length === 0) return false;

            // Then check if it can modify the target
            return validCategories.some((adjunctCategory) => {
                if (adjunctCategory.modify === undefined) return false;
                if (adjunctCategory.modify.side !== "both" && adjunctCategory.modify.side !== side) return false;
                const compatibility = this.isCompatible(adjunctCategory.modify.target, modified, true);
                if (compatibility.lastEmptyIds) lastEmptyIds.push(...compatibility.lastEmptyIds);
                return compatibility.isCompatible;
            });
        })
        return {
            isValid: isValid,
            lastEmptyIds: lastEmptyIds
        };
    }

    isCompatible(required: Category, value: Constituent, ignoreAdjunct = false): { isCompatible: boolean, lastEmptyIds: string[] } {
        let validCategoryFound = false;
        const validationResult = this.validateConstituent(value, ignoreAdjunct);
        const possibleHeadCategories = validationResult.possibleCategories;
        const lastEmptyIds = validationResult.lastEmptyIds;

        possibleHeadCategories.forEach(category => {

            // 基底範疇の確認
            const baseValid = (category.base === required.base);

            // 統語素性の確認
            const featureValid = this.featureChecking(category.features, required.features);

            // 空補部の確認
            // 型が不一致の空欄の場合、さらに制約を設けるべきかも
            let emptyComplementValid = true;
            if (required.complements.length > 0) {
                const categoryTobeEmpty = required.complements[required.complements.length - 1];
                const categoryEmpty = this.findLastEmptyCategory(value, category);
                if (categoryEmpty.length === 0) emptyComplementValid = false;
                if (categoryEmpty.some((category) => (category.base === categoryTobeEmpty.base && this.featureChecking(category.features, categoryTobeEmpty.features)))) {
                    console.log(value.id, "must have its last complement empty, and it does!");
                    lastEmptyIds.push(value.id);
                }
            }

            if (baseValid && featureValid && emptyComplementValid) validCategoryFound = true;
        });

        return {
            isCompatible: validCategoryFound,
            lastEmptyIds: lastEmptyIds,
        };
    }

    findLastEmptyCategory(constituent: Constituent, category: Category): Category[] {
        const possibleCategories = [];
        const complements = constituent.complements;
        const lastComplement = complements[complements.length - 1];
        if (lastComplement === null) {
            if (category.complements.length >= complements.length) {
                possibleCategories.push(category.complements[complements.length - 1]);
            }
        } else {
            if (category.complements.length > 0) {
                const possibleChildCategories = this.validateConstituent(lastComplement).possibleCategories;
                possibleChildCategories.forEach((category) => {
                    possibleCategories.push(...this.findLastEmptyCategory(lastComplement, category));
                })
            }
        }
        return possibleCategories;
    }

    featureChecking(features1: Record<string, string[]>, features2: Record<string, string[]>) {
        // Determine the common keys between both feature objects
        const commonKeys = Object.keys(features1).filter(key => features2.hasOwnProperty(key));

        // Iterate over each common key
        for (const key of commonKeys) {
            const list1 = features1[key];
            const list2 = features2[key];

            // Check if there's at least one common value between the lists
            const hasCommonValue = list1.some(value => list2.includes(value));

            // If no common value is found for this key, return false immediately.
            if (!hasCommonValue) {
                return false;
            }
        }
        return true;
    }
}