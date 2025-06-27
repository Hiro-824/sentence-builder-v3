import { Block } from "@/models/block";
import { Phrase, Word } from "@/models/grammar-entities";

export interface PronounForms {
    nominative: string;
    accusative: string;
    possessiveDet: string;
    possessivePro: string;
    reflexive: string;
}

export interface PronounTranslations {
    default: string;
    possessiveDetPrefix: string;
    possessivePro: string;
    reflexive: string;
}

export interface PronounConfig {
    id: string;
    person: 1 | 2 | 3;
    number: 'sing' | 'pl';
    forms: PronounForms;
    translations: PronounTranslations;
}

export interface NounConfig {
    id: string;
    isCountable: boolean;
    singularForm: string;
    pluralForm?: string;
    translation: string;
    pluralTranslation?: string;
    color?: string;
}

export class Generator {
    private getAgrType(person: 1 | 2 | 3, number: 'sing' | 'pl'): '3sing' | 'non-3sing' {
        return person === 3 && number === 'sing' ? '3sing' : 'non-3sing';
    }

    private createNominativeCategory(person: 1 | 2 | 3, number: 'sing' | 'pl', translation: string): Phrase {
        return {
            head: {
                type: "det",
                case: "nom",
                agr: {
                    type: this.getAgrType(person, number),
                    per: person,
                    num: number
                }
            },
            translationTemplates: {
                default: [translation]
            }
        };
    }

    private createAccusativeCategory(person: 1 | 2 | 3, number: 'sing' | 'pl', translation: string): Phrase {
        return {
            head: {
                type: "det",
                case: "acc",
                agr: {
                    type: this.getAgrType(person, number),
                    per: person,
                    num: number
                }
            },
            translationTemplates: {
                default: [translation]
            }
        };
    }

    private createPossessiveDeterminerCategory(translationPrefix: string): Phrase {
        return {
            head: { type: "det", agr: {}, determinered: true },
            right: [{
                head: { type: "noun", agr: {} }
            }],
            // This unification ensures the determiner phrase inherits the
            // agreement features of the noun it modifies.
            customUnification: [
                [["head", "agr"], ["right", 0, "head", "agr"]]
            ],
            translationTemplates: {
                default: [translationPrefix, { path: ["right", 0], key: "default" }]
            }
        };
    }

    private createPossessivePronounCategory(number: 'sing' | 'pl', translation: string): Phrase {
        return {
            head: {
                type: "det",
                // A standalone possessive pronoun often behaves as a 3rd person nominal.
                // e.g., "Mine *is* red." not "Mine *am* red."
                agr: { per: 3, num: number },
            },
            translationTemplates: {
                default: [translation]
            }
        };
    }

    private createReflexiveCategory(person: 1 | 2 | 3, number: 'sing' | 'pl', translation: string): Phrase {
        return {
            head: {
                type: "det",
                refl: true,
                agr: {
                    type: this.getAgrType(person, number),
                    per: person,
                    num: number
                }
            },
            translationTemplates: {
                default: [translation]
            }
        };
    }

    createPronounBlock(config: PronounConfig): Block {
        const { id, person, number, forms, translations } = config;

        const words: Word[] = [
            {
                token: forms.nominative,
                categories: [this.createNominativeCategory(person, number, translations.default)]
            },
            {
                token: forms.possessiveDet,
                categories: [this.createPossessiveDeterminerCategory(translations.possessiveDetPrefix)]
            },
            {
                token: forms.accusative,
                categories: [this.createAccusativeCategory(person, number, translations.default)]
            },
            {
                token: forms.possessivePro,
                categories: [this.createPossessivePronounCategory(number, translations.possessivePro)]
            },
            {
                token: forms.reflexive,
                categories: [this.createReflexiveCategory(person, number, translations.reflexive)]
            }
        ];

        const dropdownContent = [
            forms.nominative,
            forms.possessiveDet,
            forms.accusative,
            forms.possessivePro,
            forms.reflexive
        ];

        // The placeholder for the noun (e.g., for "my book") should only be visible
        // when the possessive determiner is selected in the dropdown.
        const possessiveDetIndex = dropdownContent.indexOf(forms.possessiveDet);

        return {
            id,
            x: 0,
            y: 0,
            color: "dodgerblue",
            isRound: true,
            words,
            children: [{
                id: "head",
                type: "dropdown",
                content: dropdownContent,
                selected: 0,
                hidden: false,
            },
            {
                id: "complement",
                type: "placeholder",
                content: null,
                hidden: true, // Hide by default, logic will show it
                headIndex: [possessiveDetIndex], // Link to the 'my' form
            }]
        };
    }

    private createSingularCountableNounCategory(translation: string): Phrase {
        return {
            head: { type: "noun", agr: { type: "3sing" } },
            translationTemplates: {
                default: [translation]
            }
        };
    }

    private createPluralCountableNounCategories(translation: string): Phrase[] {
        const sharedAgr = { type: "non-3sing", num: "pl", per: 3 };
        const sharedTranslation = { default: [translation] };
        return [
            // Category 1: A full determiner phrase (can be a subject/object)
            {
                head: { type: "det", agr: sharedAgr },
                translationTemplates: sharedTranslation
            },
            // Category 2: A simple noun (can be modified by another determiner)
            {
                head: { type: "noun", agr: sharedAgr },
                translationTemplates: sharedTranslation
            }
        ];
    }

    private createUncountableNounCategories(translation: string): Phrase[] {
        const sharedAgr = { type: "3sing" };
        const sharedTranslation = { default: [translation] };
        return [
            // Category 1: A full determiner phrase (can be a subject/object)
            {
                head: { type: "det", agr: sharedAgr },
                translationTemplates: sharedTranslation
            },
            // Category 2: A simple noun (can be modified by another determiner)
            {
                head: { type: "noun", agr: sharedAgr },
                translationTemplates: sharedTranslation
            }
        ];
    }

    createNounBlock(config: NounConfig): Block {
        const { id, isCountable, singularForm, translation, pluralTranslation } = config;
        const color = config.color || "dodgerblue";
        let words: Word[];
        let children: Block['children'];

        if (isCountable) {
            const plural = config.pluralForm ?? `${singularForm}s`;
            words = [
                {
                    token: singularForm,
                    categories: [this.createSingularCountableNounCategory(translation)]
                },
                {
                    token: plural,
                    categories: this.createPluralCountableNounCategories(pluralTranslation ?? translation)
                }
            ];
            children = [{
                id: "head",
                type: "dropdown",
                content: [singularForm, plural],
                selected: 0,
                hidden: false,
            }];
        } else { // Uncountable
            words = [{
                token: singularForm,
                categories: this.createUncountableNounCategories(translation)
            }];
            children = [{
                id: "head",
                type: "text",
                content: singularForm,
                hidden: false,
            }];
        }

        return {
            id,
            x: 0,
            y: 0,
            color,
            isRound: true,
            words,
            children
        };
    }
}