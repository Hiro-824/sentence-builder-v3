import { argument, Category, Constituent } from "./category";

export class Grammar {
    validateConstituent(constituent: Constituent, ignoreAdjunct = false): Category[] {
        const { categories } = constituent.head;
        return categories.filter(category => {
            const specifiersValid = this.validateArguments(category.specifiers, constituent.specifiers);
            const complementsValid = this.validateArguments(category.complements, constituent.complements);
            if (ignoreAdjunct) {
                return specifiersValid && complementsValid;
            }
            const preAdjunctsValid = this.validateAdjuncts(constituent, constituent.preAdjuncts, "left");
            const postAdjunctsValid = this.validateAdjuncts(constituent, constituent.postAdjuncts, "right");
            return specifiersValid && complementsValid && preAdjunctsValid && postAdjunctsValid;
        });
    }

    validateArguments(required: Category[], provided: argument[]): boolean {
        return required.every((requiredCategory, i) => {
            const providedValue = provided[i];
            return providedValue === null ? true : this.isCompatible(requiredCategory, providedValue);
        });
    }

    validateAdjuncts(modified: Constituent, adjuncts: Constituent[], side: "right" | "left"): boolean {
        return adjuncts.every((adjunct) => {
            // First validate the adjunct itself as a constituent
            const validCategories = this.validateConstituent(adjunct);
            if (validCategories.length === 0) return false;

            // Then check if it can modify the target
            return validCategories.some((adjunctCategory) => {
                if (adjunctCategory.modify === undefined) return false;
                if (adjunctCategory.modify.side !== "both" && adjunctCategory.modify.side !== side) return false;
                return this.isCompatible(adjunctCategory.modify.target, modified, true);
            });
        })
    }

    isCompatible(required: Category, value: Constituent, ignoreAdjunct = false) {
        let validCategoryFound = false;
        const possibleHeadCategories = this.validateConstituent(value, ignoreAdjunct);

        possibleHeadCategories.forEach(category => {

            // 基底範疇の確認
            const baseValid = (category.base === required.base);

            // 統語素性の確認
            const featureValid = this.featureChecking(category.features, required.features);

            let emptyComplementValid = true;
            if (required.complements.length > 0) {
                const categoryTobeEmpty = required.complements[required.complements.length - 1];
                const categoryEmpty = this.findLastEmptyCategory(value, category);
                if (categoryEmpty.length === 0) emptyComplementValid = false;
                if (categoryEmpty.some((category) => (category.base === categoryTobeEmpty.base && this.featureChecking(category.features, categoryTobeEmpty.features)))) {
                    console.log("This placeholder", categoryTobeEmpty.base, "must be kept empty!");
                }
            }

            if (baseValid && featureValid && emptyComplementValid) validCategoryFound = true;
        });

        return validCategoryFound;
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
                const possibleChildCategories = this.validateConstituent(lastComplement);
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