import { argument, Category, Constituent } from "./category";

export class Grammar {
    validateConstituent(constituent: Constituent, ignoreAdjunct = false): Category[] {
        const { categories } = constituent.head;
        return categories.filter(category => {
            const specifiersValid = this.validateArguments(category.specifiers, constituent.specifiers);
            const complementsValid = this.validateArguments(category.complements, constituent.complements);
            if(ignoreAdjunct) {
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
            return adjunct.head.categories.some((adjunctCategory) => {
                if (adjunctCategory.modify === undefined) return false;
                if (adjunctCategory.modify.side !== "both" && adjunctCategory.modify.side !== side) return false;
                return this.isCompatible(adjunctCategory.modify.target, modified, true);
            });
        })
    }

    isCompatible(required: Category, value: Constituent, ignoreAdjunct = false) {
        // 基底範疇の確認
        let validCategoryFound = false;
        const possibleHeadCategories = this.validateConstituent(value, ignoreAdjunct);
        possibleHeadCategories.forEach(category => {
            const baseValid = (category.base === required.base);
            const featureValid = this.featureChecking(category.features, required.features);
            if (baseValid && featureValid) validCategoryFound = true;
        });
        return validCategoryFound;
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