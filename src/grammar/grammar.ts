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

            // Complementの確認について、
            // 一番右のComplementだけを確認する
            // 一致しているなら、そのPlaceholderが常に空欄のはずだよ、と知らせる(知らされた側はそれを非表示に)
            // 一致していなくても、空欄が存在するならOK(非表示にしてもらう必要はない)
            // 空欄が存在しないなら、エラー
            // という風に書き換えたい

            // Complementの確認
            const emptyComplementCategories = category.complements.filter((complement, idx) => value.complements[idx] === null);
            const complementsToBeEmpty = required.complements || [];
            const complementsValid = complementsToBeEmpty.every((reqComp) => {
                const valid = emptyComplementCategories.some(slot =>
                    slot.base === reqComp.base &&
                    this.featureChecking(slot.features, reqComp.features)
                );
                return valid;
            });

            // Specifierの確認
            const emptySpecifierCategories = category.specifiers.filter((complement, idx) => value.specifiers[idx] === null);
            const specifiersToBeEmpty = required.specifiers || [];
            const specifiersValid = specifiersToBeEmpty.every((reqSpec) => {
                const valid = emptySpecifierCategories.some(slot =>
                    slot.base === reqSpec.base &&
                    this.featureChecking(slot.features, reqSpec.features)
                )
                return valid;
            });

            if (baseValid && featureValid && specifiersValid && complementsValid) validCategoryFound = true;
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