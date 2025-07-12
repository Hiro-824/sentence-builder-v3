import { Block, BlockChild } from "@/models/block";
import { Phrase, Word, TranslationTemplates, det, noun, FeatureStructure } from "@/models/grammar-entities";

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

export interface VerbForms {
    base: string;
    es: string;
    ed: string;
    en: string;
    ing: string;
}

export interface VerbTranslation {
    [key: string]: string;
}

export interface VerbTranslations {
    present: VerbTranslation;
    past: VerbTranslation;
    progressive: VerbTranslation;
    perfect: VerbTranslation;
    passive?: VerbTranslation;
    noun: VerbTranslation;
}

export interface VerbConfig {
    id: string;
    forms: VerbForms;
    complements: {
        expected: Phrase;
        particle: string;
    }[];
    transitive: boolean;
    gerundSubject: boolean;
    toSubject: boolean;
    translations: VerbTranslations;
    color?: string;
}

export interface AdjectiveConfig {
    id: string;
    base: string;
    comparative: string;
    superlative: string;
    translation: {
        default: string;
        predicative: string;
        past: string;
    }
    color?: string;
}

export class Generator {
    private getAgrType(person: 1 | 2 | 3, number: 'sing' | 'pl'): '3sing' | 'non-3sing' {
        return person === 3 && number === 'sing' ? '3sing' : 'non-3sing';
    }

    private createNominativeCategory(person: 1 | 2 | 3, number: 'sing' | 'pl', translation: string): Phrase {
        return {
            head: {
                type: det,
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
                type: det,
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

    private createPossessiveDeterminerCategories(translationPrefix: string, defaultTranslation: string): Phrase[] {
        return [{
            head: { type: det, agr: { per: 3 }, determinered: true },
            right: [{
                head: { type: noun, agr: {} }
            }],
            // This unification ensures the determiner phrase inherits the
            // agreement features of the noun it modifies.
            customUnification: [
                [["head", "agr"], ["right", 0, "head", "agr"]]
            ],
            translationTemplates: {
                default: [translationPrefix, { path: ["right", 0], key: "default" }]
            }
        }, {
            head: { type: det, agr: { type: "3sing" }, determinered: true },
            right: [{
                head: { type: det },
                gaps: [{
                    head: { type: det }
                }]
            }],
            translationTemplates: {
                default: [`${defaultTranslation}が`, { path: ["right", 0], key: "default" }]
            }
        }];
    }

    private createPossessivePronounCategory(number: 'sing' | 'pl', translation: string): Phrase {
        return {
            head: {
                type: det,
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
                type: det,
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
                categories: this.createPossessiveDeterminerCategories(translations.possessiveDetPrefix, translations.default)
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
            head: { type: noun, agr: { type: "3sing" } },
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
                head: { type: det, agr: sharedAgr },
                translationTemplates: sharedTranslation
            },
            // Category 2: A simple noun (can be modified by another determiner)
            {
                head: { type: noun, agr: sharedAgr },
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
                head: { type: det, agr: sharedAgr, count: false },
                translationTemplates: sharedTranslation
            },
            // Category 2: A simple noun (can be modified by another determiner)
            {
                head: { type: noun, agr: sharedAgr, count: false },
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

    private createVerbCategory(config: VerbConfig, form: "base" | "es" | "ed" | "ing" | "perfect" | "passive"): Phrase[] {
        const categories: Phrase[] = [];
        const subjectType: FeatureStructure = {
            type: "nominal",
            isDet: true
        };

        if (!config.gerundSubject) {
            subjectType.isGerund = false;
        }
        if (!config.toSubject) {
            subjectType.isTo = false;
        }

        switch (form) {
            case "base":
                categories.push({
                    head: { type: "verb", tense: "present", finite: true, form: "base" },
                    left: [{ head: { type: det, agr: { type: "non-3sing" }, case: "nom" } }],
                    translation: config.translations.present,
                });
                categories.push({
                    head: { type: "verb", finite: false, form: "base" },
                    left: [{ head: { type: subjectType } }],
                    translation: config.translations.present,
                });
                break;
            case "es":
                categories.push({
                    head: { type: "verb", tense: "present", finite: true, form: "es" },
                    left: [{ head: { type: subjectType, agr: { type: "3sing" }, case: "nom" } }],
                    translation: config.translations.present,
                });
                break;
            case "ed":
                categories.push({
                    head: { type: "verb", tense: "past", finite: true, form: "ed" },
                    left: [{ head: { type: subjectType, case: "nom" } }],
                    translation: config.translations.past,
                });
                break;
            case "ing":
                categories.push({
                    head: { type: "verb", finite: false, form: "progressive" },
                    left: [{ head: { type: subjectType } }],
                    translation: config.translations.progressive,
                });
                categories.push({
                    head: { type: { type: "nominal", isGerund: true, }, agr: { type: "3sing" } },
                    left: [{ head: { type: subjectType } }],
                    translation: config.translations.noun,
                });
                break;
            case "perfect":
                categories.push({
                    head: { type: "verb", finite: false, form: "perfect" },
                    left: [{ head: { type: subjectType } }],
                    translation: config.translations.perfect,
                });
                break;
            case "passive":
                categories.push({
                    head: { type: "verb", finite: false, form: "passive" },
                    left: [{ head: { type: subjectType } }],
                    translation: config.translations.passive ?? {},
                });
                break;
        }

        return categories.map((category) => {
            const translationTemplates: TranslationTemplates = {};
            if (category.translation) {
                Object.entries(category.translation).forEach(([key, translationWord]) => {
                    const complementsToUse = form === "passive" ? config.complements.slice(1) : config.complements; //受動態は訳の目的語が消える
                    translationTemplates[key] = [
                        ...complementsToUse.map((complement, index) => ({
                            path: ["right", index],
                            key: "default",
                            particle: complement.particle
                        })),
                        translationWord as string
                    ];
                });
            }
            return {
                head: category.head,
                left: category.left,
                right: [...config.complements.map(complement => complement.expected)],
                translationTemplates
            };
        })
    }

    createVerbBlock(config: VerbConfig): Block {
        const { id, forms, transitive } = config;
        const color = config.color || "tomato";

        const heads = Object.values(forms);
        if (transitive) heads.push(forms.en);

        const words = [
            {
                token: `${forms.base}(base)`,
                categories: this.createVerbCategory(config, "base")
            },
            {
                token: `${forms.es}(es)`,
                categories: this.createVerbCategory(config, "es")
            },
            {
                token: `${forms.ed}(ed)`,
                categories: this.createVerbCategory(config, "ed")
            },
            {
                token: `${forms.en}(perfect)`,
                categories: this.createVerbCategory(config, "perfect")
            },
            {
                token: `${forms.ing}(ing)`,
                categories: this.createVerbCategory(config, "ing")
            },
            ...(transitive ? [{
                token: `${forms.en}(passive)`,
                categories: this.createVerbCategory(config, "passive")
            }] : [])
        ]

        const placeholders: BlockChild[] = config.complements.map((_, index) => {
            return {
                id: `complement-${index}`,
                type: "placeholder",
                content: null,
                hidden: false,
                headIndex: index === 0 ? [0, 1, 2, 3, 4] : undefined,
            }
        });

        return {
            id: id,
            x: 0,
            y: 0,
            words: words,
            color: color,
            children: [{
                id: "head",
                type: "dropdown",
                content: heads,
                selected: 0,
                hidden: false,
            },
            ...placeholders]
        }
    }

    createAdjectiveBlock(config: AdjectiveConfig): Block {
        const { id, base, comparative, superlative, translation } = config;
        const comparativeTranslation = {
            default: `もっと${translation.default}`,
            predicative: `もっと${translation.predicative}`,
            past: `もっと${translation.past}`
        };
        const superlativeTranslation = {
            default: `いちばん${translation.default}`,
            predicative: `いちばん${translation.predicative}`,
            past: `いちばん${translation.past}`
        };
        return {
            id: id,
            x: 0,
            y: 0,
            words: [
                {
                    token: "",
                    categories: [{
                        head: { type: "adj", form: "base" },
                        rightModTargets: [
                            { head: { type: noun } },
                            { head: { type: det, agr: { type: "non-3sing", num: "pl", per: 3 }, determinered: false } },
                            { head: { type: det, count: false, determinered: false } }
                        ],
                        translationTemplates: {
                            default: [translation.default],
                            predicative: [translation.predicative],
                            past: [translation.past]
                        }
                    }]
                },
                {
                    token: "",
                    categories: [{
                        head: { type: "adj", form: "comparative" },
                        rightModTargets: [
                            { head: { type: noun } },
                            { head: { type: det, agr: { type: "non-3sing", num: "pl", per: 3 }, determinered: false } },
                            { head: { type: det, count: false, determinered: false } }
                        ],
                        translationTemplates: {
                            default: [comparativeTranslation.default],
                            predicative: [comparativeTranslation.predicative],
                            past: [comparativeTranslation.past]
                        }
                    }]
                },
                {
                    token: "",
                    categories: [{
                        head: { type: "adj", form: "superlative" },
                        rightModTargets: [
                            { head: { type: noun } },
                            { head: { type: det, agr: { type: "non-3sing", num: "pl", per: 3 }, determinered: false } },
                            { head: { type: det, count: false, determinered: false } }
                        ],
                        translationTemplates: {
                            default: [superlativeTranslation.default],
                            predicative: [superlativeTranslation.predicative],
                            past: [superlativeTranslation.past]
                        }
                    }]
                }
            ],
            color: config.color ?? "dodgerblue",
            isRound: true,
            children: [{
                id: "head",
                hidden: false,
                type: "dropdown",
                selected: 0,
                content: [base, comparative, superlative],
            }]
        }
    }

    private createBeCategory(form: "base" | "am" | "are" | "is" | "was" | "were" | "en" | "ing", agr?: FeatureStructure): Phrase[] {
        const finite = (["base", "en", "ing"].includes(form)) ? false : true;
        const tense = (finite && ["am", "are", "is"].includes(form)) ? "present" : finite ? "past" : undefined;
        const head: FeatureStructure = { type: "verb", finite: finite, form: form };
        const left: Phrase = { head: { type: { type: "nominal", isDet: true } } };
        if (tense) head.tense = tense;
        if (finite) left.head.case = "nom";
        if (agr) left.head.agr = agr;
        return [{
            head: head,
            left: [{ head: { type: { type: "nominal", isDet: true, isTo: false, isGerund: false }, case: "nom", agr: agr ?? {} } }],
            right: [{
                head: { type: "verb", form: "progressive" }
            }],
            translationTemplates: {
                default: [
                    ...finite ? [{
                        path: ["left", 0],
                        key: "default",
                        particle: "は",
                    }] : [],
                    {
                        path: ["right", 0],
                        key: "default",
                    },
                    tense === "present" ? "だ" : tense === "past" ? "だった" : "である"
                ]
            }
        }, {
            head: head,
            left: [left],
            right: [{
                head: { type: { type: "nominal", isDet: true }, case: "acc" }
            }],
            translationTemplates: {
                default: [
                    ...finite ? [{
                        path: ["left", 0],
                        key: "default",
                        particle: "は",
                    }] : [],
                    {
                        path: ["right", 0],
                        key: "default",
                    },
                    tense === "present" ? "だ" : tense === "past" ? "だった" : "である"
                ]
            }
        }, {
            head: head,
            left: [left],
            right: [{
                head: { type: "adj" }
            }],
            translationTemplates: {
                default: [
                    ...finite ? [{
                        path: ["left", 0],
                        key: "default",
                        particle: "は",
                    }] : [],
                    {
                        path: ["right", 0],
                        key: tense === "present" ? "predicative" : "past",
                    },
                ]
            }
        }]
    }

    createBlockBe(): Block {
        return {
            id: "",
            x: 0,
            y: 0,
            words: [{
                token: "",
                categories: [...this.createBeCategory("base")]
            }, {
                token: "",
                categories: [...this.createBeCategory("am", { type: "non-3sing", per: 1, num: 'sing' })]
            }, {
                token: "",
                categories: [
                    ...this.createBeCategory("are", { type: "non-3sing", num: 'pl' }),
                    ...this.createBeCategory("are", { type: "non-3sing", per: 2, num: 'sing' })
                ]
            }, {
                token: "",
                categories: [...this.createBeCategory("is", { type: "3sing" })]
            }, {
                token: "",
                categories: [
                    ...this.createBeCategory("was", { type: "3sing" }),
                    ...this.createBeCategory("was", { type: "non-3sing", num: "sing", per: 1 }),
                ]
            }, {
                token: "",
                categories: [
                    ...this.createBeCategory("were", { type: "non-3sing", num: "pl" }),
                    ...this.createBeCategory("were", { type: "non-3sing", num: "sing", per: 2 })
                ]
            }, {
                token: "",
                categories: [...this.createBeCategory("en")]
            }, {
                token: "",
                categories: [...this.createBeCategory("ing")]
            }],
            color: "tomato",
            children: [{
                id: "specifier",
                hidden: false,
                type: "placeholder",
                content: undefined,
                headIndex: [1, 2, 3, 4, 5],
            }, {
                id: "head",
                hidden: false,
                type: "dropdown",
                selected: 3,
                content: [
                    "be",
                    "am",
                    "are",
                    "is",
                    "was",
                    "were",
                    "been",
                    "being"
                ]
            }, {
                id: "complement",
                hidden: false,
                type: "placeholder",
                content: undefined,
            }]
        }
    }
}