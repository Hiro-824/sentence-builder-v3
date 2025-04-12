import { Category, Constituent } from "./category";

export class Grammar {
    validateConstituent(constituent: Constituent): Category[] {
        const categories = constituent.head.categories;
        const grammaticalCategories: Category[] = [];
        categories.forEach((category) => {
            const specifierValidity = this.validateSpecifiers(category, constituent);
            const complementValidity = this.validateComplements(category, constituent);
            if (specifierValidity && complementValidity) grammaticalCategories.push(category);
        });
        return grammaticalCategories;
    }

    validateSpecifiers(category: Category, constituent: Constituent): boolean {
        let allSpecifiersValid = true;
        for (let i = 0; i < category.specifiers.length; i++) {
            const requiredSpecifierCategory = category.specifiers[i];
            const providedSpecifierValue = constituent.specifiers[i];
            const compatible = providedSpecifierValue === null ? true : this.isCompatible(requiredSpecifierCategory, providedSpecifierValue);
            if (!compatible) allSpecifiersValid = false;
        }
        return allSpecifiersValid;
    }

    validateComplements(category: Category, constituent: Constituent): boolean {
        let allComplementsValid = true;
        for (let i = 0; i < category.complements.length; i++) {
            const requiredComplementCategory = category.complements[i];
            const providedComplementValue = constituent.complements[i];
            const compatible = providedComplementValue === null ? true : this.isCompatible(requiredComplementCategory, providedComplementValue);
            if (!compatible) allComplementsValid = false;
        }
        return allComplementsValid;
    }

    isCompatible(required: Category, value: Constituent) {
        // 基底範疇の確認
        let validCategoryFound = false;
        const possibleHeadCategories = this.validateConstituent(value);
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