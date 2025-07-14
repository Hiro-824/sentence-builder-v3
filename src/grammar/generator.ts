import { Block, BlockChild } from "@/models/block";
import { Phrase, Word, TranslationTemplates, det, noun, FeatureStructure, pronoun, commonNominal } from "@/models/grammar-entities";

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
        predNeg: string;
        pastNeg: string;
        predQ: string;
        pastQ: string;
    }
    color?: string;
}

export interface PrepositionConfig {
    id: string;
    word: string;
    modAdj?: string;
    adv?: string;
    pred?: {
        predAdj: string;
        past: string;
        predNeg: string;
        pastNeg: string;
        predQ: string;
        pastQ: string;
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
                type: pronoun,
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
                type: pronoun,
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
                type: pronoun,
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
                type: pronoun,
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

    createNumeralPronounBlock(): Block {
        const words = [];
        for (let i = 0; i < 9; i++) {
            if (i === 0) {
                words.push({
                    token: "",
                    categories: [{
                        head: { type: { type: "nominal", isDet: true, isGerund: false, isTo: false }, agr: { type: "3sing" } },
                        translationTemplates: {
                            default: ["1つ"]
                        }
                    }]
                });
            } else {
                words.push({
                    token: "",
                    categories: [{
                        head: { type: { type: "nominal", isDet: true, isGerund: false, isTo: false }, agr: { type: "non-3sing", num: "pl", per: 3 } },
                        translationTemplates: {
                            default: [`${i + 1}つ`]
                        }
                    }]
                });
            }
        }
        return {
            id: "",
            x: 0,
            y: 0,
            isRound: true,
            words: words,
            color: "dodgerblue",
            children: [{
                id: "head",
                hidden: false,
                type: "dropdown",
                selected: 0,
                content: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
            }]
        }
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

    createProperNounBlock(name: string, translation: string): Block {
        return {
            id: `${name}_proper`,
            x: 0,
            y: 0,
            isRound: true,
            words: [{
                token: "",
                categories: [{
                    head: { type: { type: "nominal", isDet: true, isGerund: false, isTo: false, isPron: false, isProper: true }, agr: { type: "3sing" } },
                    translationTemplates: {
                        default: [translation]
                    }
                }]
            }],
            color: "dodgerblue",
            children: [{
                id: "head",
                hidden: false,
                type: "text",
                content: name
            }]
        }
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
            past: `もっと${translation.past}`,
            predNeg: `もっと${translation.predicative}というわけではない`,
            pastNeg: `もっと${translation.predicative}というわけではなかった`,
            predQ: `もっと${translation.predQ}`,
            pastQ: `もっと${translation.pastQ}`
        };
        const superlativeTranslation = {
            default: `いちばん${translation.default}`,
            predicative: `いちばん${translation.predicative}`,
            past: `いちばん${translation.past}`,
            predNeg: `いちばん${translation.predNeg}`,
            pastNeg: `いちばん${translation.pastNeg}`,
            predQ: `いちばん${translation.predQ}`,
            pastQ: `いちばん${translation.pastQ}`
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
                            { head: { type: commonNominal, agr: { type: "non-3sing", num: "pl", per: 3 }, determinered: false } },
                            { head: { type: commonNominal, count: false, determinered: false } }
                        ],
                        translationTemplates: {
                            default: [translation.default],
                            predicative: [translation.predicative],
                            past: [translation.past],
                            predNeg: [translation.predNeg],
                            pastNeg: [translation.pastNeg],
                            predQ: [translation.predQ],
                            pastQ: [translation.pastQ],
                        }
                    }]
                },
                {
                    token: "",
                    categories: [{
                        head: { type: "adj", form: "comparative" },
                        rightModTargets: [
                            { head: { type: noun } },
                            { head: { type: commonNominal, agr: { type: "non-3sing", num: "pl", per: 3 }, determinered: false } },
                            { head: { type: commonNominal, count: false, determinered: false } }
                        ],
                        translationTemplates: {
                            default: [comparativeTranslation.default],
                            predicative: [comparativeTranslation.predicative],
                            past: [comparativeTranslation.past],
                            predNeg: [comparativeTranslation.predNeg],
                            pastNeg: [comparativeTranslation.pastNeg],
                            predQ: [comparativeTranslation.predQ],
                            pastQ: [comparativeTranslation.pastQ],
                        }
                    }]
                },
                {
                    token: "",
                    categories: [{
                        head: { type: "adj", form: "superlative" },
                        rightModTargets: [
                            { head: { type: noun } },
                            { head: { type: commonNominal, agr: { type: "non-3sing", num: "pl", per: 3 }, determinered: false } },
                            { head: { type: commonNominal, count: false, determinered: false } }
                        ],
                        translationTemplates: {
                            default: [superlativeTranslation.default],
                            predicative: [superlativeTranslation.predicative],
                            past: [superlativeTranslation.past],
                            predNeg: [superlativeTranslation.predNeg],
                            pastNeg: [superlativeTranslation.pastNeg],
                            predQ: [superlativeTranslation.predQ],
                            pastQ: [superlativeTranslation.pastQ],
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
        const head: FeatureStructure = { type: "sentence", finite: finite, form: form };
        const left: Phrase = { head: { type: { type: "nominal", isDet: true } } };
        if (tense) head.tense = tense;
        if (finite) left.head.case = "nom";
        if (agr) left.head.agr = agr;
        return [{
            head: head,
            left: [{ head: { type: { type: "nominal", isDet: true, isTo: false, isGerund: false }, case: "nom", agr: agr ?? {} } }],
            right: [{
                head: { type: "sentence", form: "progressive" }
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
        }, {
            head: head,
            left: [left],
            right: [{
                head: { type: "prep", pred: true }
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
                        key: tense === "present" ? "default" : "past",
                    },
                ]
            }
        }]
    }

    private createBeNotCategory(form: "am" | "are" | "is" | "was" | "were", agr?: FeatureStructure): Phrase[] {
        const tense = ["am", "are", "is"].includes(form) ? "present" : "past";
        const head: FeatureStructure = { type: "sentence", finite: true, form: form };
        const left: Phrase = { head: { type: { type: "nominal", isDet: true }, case: "nom" } };
        if (tense) head.tense = tense;
        if (agr) left.head.agr = agr;
        return [{
            head: head,
            left: [{ head: { type: { type: "nominal", isDet: true, isTo: false, isGerund: false }, case: "nom", agr: agr ?? {} } }],
            right: [{
                head: { type: "sentence", form: "progressive" }
            }],
            translationTemplates: {
                default: [
                    {
                        path: ["left", 0],
                        key: "default",
                        particle: "は",
                    },
                    {
                        path: ["right", 0],
                        key: "default",
                    },
                    tense === "present" ? "ではない" : "ではなかった"
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
                    {
                        path: ["left", 0],
                        key: "default",
                        particle: "は",
                    },
                    {
                        path: ["right", 0],
                        key: "default",
                    },
                    tense === "present" ? "ではない" : "ではなかった"
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
                    {
                        path: ["left", 0],
                        key: "default",
                        particle: "は",
                    },
                    {
                        path: ["right", 0],
                        key: tense === "present" ? "predNeg" : "pastNeg",
                    },
                ]
            }
        }, {
            head: head,
            left: [left],
            right: [{
                head: { type: "prep", pred: true }
            }],
            translationTemplates: {
                default: [
                    {
                        path: ["left", 0],
                        key: "default",
                        particle: "は",
                    },
                    {
                        path: ["right", 0],
                        key: tense === "present" ? "predNeg" : "pastNeg",
                    },
                ]
            }
        }]
    }

    private createInvertedBeCategory(form: "am" | "are" | "is" | "was" | "were", agr?: FeatureStructure): Phrase[] {
        const tense = ["am", "are", "is"].includes(form) ? "present" : "past";
        const head: FeatureStructure = { type: "sentence", finite: true, form: form };
        const subject: Phrase = { head: { type: { type: "nominal", isDet: true }, case: "nom" } };
        if (tense) head.tense = tense;
        if (agr) subject.head.agr = agr;
        return [{
            head: head,
            right: [
                { head: { type: { type: "nominal", isDet: true, isTo: false, isGerund: false }, case: "nom", agr: agr ?? {} } },
                { head: { type: "sentence", form: "progressive" } }
            ],
            translationTemplates: {
                default: [
                    {
                        path: ["right", 0],
                        key: "default",
                        particle: "は",
                    },
                    {
                        path: ["right", 1],
                        key: "default",
                    },
                    tense === "present" ? "なのか？" : "だったのか？"
                ]
            }
        }, {
            head: head,
            right: [subject, {
                head: { type: { type: "nominal", isDet: true }, case: "acc" }
            }],
            translationTemplates: {
                default: [
                    {
                        path: ["right", 0],
                        key: "default",
                        particle: "は",
                    },
                    {
                        path: ["right", 1],
                        key: "default",
                    },
                    tense === "present" ? "なのか？" : "だったのか？"
                ]
            }
        }, {
            head: head,
            right: [subject, {
                head: { type: "adj" }
            }],
            translationTemplates: {
                default: [
                    {
                        path: ["right", 0],
                        key: "default",
                        particle: "は",
                    },
                    {
                        path: ["right", 1],
                        key: tense === "present" ? "predQ" : "pastQ",
                    },
                    "？"
                ]
            }
        }, {
            head: head,
            right: [subject, {
                head: { type: "prep", pred: true }
            }],
            translationTemplates: {
                default: [
                    {
                        path: ["right", 0],
                        key: "default",
                        particle: "は",
                    },
                    {
                        path: ["right", 1],
                        key: tense === "present" ? "predQ" : "pastQ",
                    },
                    "？"
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

    createBlockBeNot(): Block {
        return {
            id: "",
            x: 0,
            y: 0,
            words: [{
                token: "",
                categories: [...this.createBeNotCategory("am", { type: "non-3sing", per: 1, num: 'sing' })]
            }, {
                token: "",
                categories: [
                    ...this.createBeNotCategory("are", { type: "non-3sing", num: 'pl' }),
                    ...this.createBeNotCategory("are", { type: "non-3sing", per: 2, num: 'sing' })
                ]
            }, {
                token: "",
                categories: [...this.createBeNotCategory("is", { type: "3sing" })]
            }, {
                token: "",
                categories: [
                    ...this.createBeNotCategory("was", { type: "3sing" }),
                    ...this.createBeNotCategory("was", { type: "non-3sing", num: "sing", per: 1 }),
                ]
            }, {
                token: "",
                categories: [
                    ...this.createBeNotCategory("were", { type: "non-3sing", num: "pl" }),
                    ...this.createBeNotCategory("were", { type: "non-3sing", num: "sing", per: 2 })
                ]
            }],
            color: "tomato",
            children: [{
                id: "specifier",
                hidden: false,
                type: "placeholder",
                content: undefined,
            }, {
                id: "head",
                hidden: false,
                type: "dropdown",
                selected: 2,
                content: [
                    "am not",
                    "are not",
                    "is not",
                    "was not",
                    "were not",
                ]
            }, {
                id: "complement",
                hidden: false,
                type: "placeholder",
                content: undefined,
            }]
        }
    }

    createBlockInvertedBe(): Block {
        return {
            id: "",
            x: 0,
            y: 0,
            words: [{
                token: "",
                categories: [...this.createInvertedBeCategory("am", { type: "non-3sing", per: 1, num: 'sing' })]
            }, {
                token: "",
                categories: [
                    ...this.createInvertedBeCategory("are", { type: "non-3sing", num: 'pl' }),
                    ...this.createInvertedBeCategory("are", { type: "non-3sing", per: 2, num: 'sing' })
                ]
            }, {
                token: "",
                categories: [...this.createInvertedBeCategory("is", { type: "3sing" })]
            }, {
                token: "",
                categories: [
                    ...this.createInvertedBeCategory("was", { type: "3sing" }),
                    ...this.createInvertedBeCategory("was", { type: "non-3sing", num: "sing", per: 1 }),
                ]
            }, {
                token: "",
                categories: [
                    ...this.createInvertedBeCategory("were", { type: "non-3sing", num: "pl" }),
                    ...this.createInvertedBeCategory("were", { type: "non-3sing", num: "sing", per: 2 })
                ]
            }],
            color: "tomato",
            children: [{
                id: "head",
                hidden: false,
                type: "dropdown",
                selected: 2,
                content: [
                    "Am",
                    "Are",
                    "Is",
                    "Was",
                    "Were",
                ]
            }, {
                id: "specifier",
                hidden: false,
                type: "placeholder",
                content: undefined,
            }, {
                id: "complement",
                hidden: false,
                type: "placeholder",
                content: undefined,
            }, {
                id: "punctuation",
                hidden: false,
                type: "text",
                content: "?"
            }]
        }
    }

    createPrepositionBlock(config: PrepositionConfig): Block {
        const categories = [];
        if (config.modAdj) {
            categories.push({
                head: { type: "prep", pred: false },
                right: [{
                    head: { type: { type: "nominal", isDet: true }, case: "acc" }
                }],
                leftModTargets: [
                    { head: { type: noun } },
                    { head: { type: commonNominal, agr: { type: "non-3sing", num: "pl", per: 3 }, determinered: false } },
                    { head: { type: commonNominal, count: false, determinered: false } }
                ],
                translationTemplates: {
                    default: [
                        {
                            path: ["right", 0],
                            key: "default",
                        },
                        config.modAdj
                    ]
                }
            });
        }

        if (config.pred) {
            categories.push({
                head: { type: "prep", pred: true },
                right: [{
                    head: { type: { type: "nominal", isDet: true }, case: "acc" }
                }],
                translationTemplates: {
                    default: [
                        {
                            path: ["right", 0],
                            key: "default",
                        },
                        config.pred.predAdj
                    ],
                    past: [
                        {
                            path: ["right", 0],
                            key: "default",
                        },
                        config.pred.past
                    ],
                    predNeg: [
                        {
                            path: ["right", 0],
                            key: "default",
                        },
                        config.pred.predNeg
                    ],
                    predQ: [
                        {
                            path: ["right", 0],
                            key: "default",
                        },
                        config.pred.predQ
                    ],
                    pastNeg: [
                        {
                            path: ["right", 0],
                            key: "default",
                        },
                        config.pred.pastNeg
                    ],
                    pastQ: [
                        {
                            path: ["right", 0],
                            key: "default",
                        },
                        config.pred.pastQ
                    ]
                }
            });
        }
        return {
            id: "",
            x: 0,
            y: 0,
            isRound: true,
            words: [{
                token: "",
                categories: categories,
            }],
            color: config.color ?? "orange",
            children: [{
                id: "head",
                hidden: false,
                type: "text",
                content: config.word
            }, {
                id: "complement",
                hidden: false,
                type: "placeholder",
                content: undefined
            }]
        }
    }
}