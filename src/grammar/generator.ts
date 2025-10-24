import { Block, BlockChild } from "@/models/block";
import { Phrase, Word, TranslationTemplates, det, noun, FeatureStructure, pronoun, commonNominal, CustomUnificationPath } from "@/models/grammar-entities";

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
    adv_manner_type?: 'skill' | 'degree';
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
    isGradable?: boolean;
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

export interface TemporalAdverbialConfig {
    id: string;
    word: string;
    translationPrefix: string;
    color?: string;
}

export interface ModalConfig {
    id: string;
    word: string;
    preTranslation?: string;
    translationKey?: string;
    translation: string;
    color?: string;
}

export interface NegativeModalConfig extends ModalConfig {
    negativeWord: string;
    negativeTranslation: string;
}

export interface WhSentenceConfig {
    id: string;
    whPhraseBlock: Block;
    adverbial: boolean;
    nonSubjectGap?: FeatureStructure;
    subjectGap?: FeatureStructure;
    expectedWhFeatures: FeatureStructure;
    expectedWhFeaturesAdverbial?: FeatureStructure;
    color?: string;
}

export interface RelativePronounConfig {
    id: string;
    word: string;
    antecedentFeatures: FeatureStructure;
    gapCase?: 'acc';
    color?: string;
}

export class Generator {
    private getAgrType(person: 1 | 2 | 3, number: 'sing' | 'pl'): '3sing' | 'non-3sing' {
        return person === 3 && number === 'sing' ? '3sing' : 'non-3sing';
    }

    private ensureContinuousForm(translation?: VerbTranslation): VerbTranslation | undefined {
        if (!translation) {
            return translation;
        }
        if (translation.continuous) {
            return translation;
        }
        const derived = this.deriveContinuousForm(translation);
        if (!derived) {
            return translation;
        }
        return { ...translation, continuous: derived };
    }

    private deriveContinuousForm(translation: VerbTranslation): string | undefined {
        const dictionary = translation.default;
        const imperfective = translation.imperfective;

        if (dictionary) {
            if (dictionary.endsWith("する")) {
                return dictionary.slice(0, -2) + "し";
            }
        }

        if (dictionary && dictionary.endsWith("る") && imperfective && imperfective === dictionary.slice(0, -1)) {
            return imperfective;
        }

        if (imperfective) {
            const converted = this.convertGodanAToI(imperfective);
            if (converted) {
                return converted;
            }
        }

        if (dictionary) {
            if (dictionary === "する") {
                return "し";
            }
            if (dictionary.endsWith("る")) {
                return dictionary.slice(0, -1);
            }
            const converted = this.convertGodanEndingToStem(dictionary);
            if (converted) {
                return converted;
            }
        }

        return undefined;
    }

    private convertGodanAToI(form: string): string {
        if (!form) {
            return form;
        }
        const map: Record<string, string> = {
            "か": "き",
            "が": "ぎ",
            "さ": "し",
            "ざ": "じ",
            "た": "ち",
            "だ": "ぢ",
            "な": "に",
            "は": "ひ",
            "ば": "び",
            "ぱ": "ぴ",
            "ま": "み",
            "ら": "り",
            "わ": "い"
        };
        const lastChar = form.slice(-1);
        const replacement = map[lastChar];
        if (!replacement) {
            return form;
        }
        return form.slice(0, -1) + replacement;
    }

    private convertGodanEndingToStem(dictionary: string): string | undefined {
        if (!dictionary) {
            return undefined;
        }
        const map: Record<string, string> = {
            "う": "い",
            "く": "き",
            "ぐ": "ぎ",
            "す": "し",
            "つ": "ち",
            "ぬ": "に",
            "ぶ": "び",
            "む": "み",
            "る": "り"
        };
        const lastChar = dictionary.slice(-1);
        const replacement = map[lastChar];
        if (!replacement) {
            return undefined;
        }
        return dictionary.slice(0, -1) + replacement;
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
                    left: [{ head: { type: det, agr: { type: "non-3sing" }, case: "nom", isSubject: true } }],
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
                    left: [{ head: { type: subjectType, isSubject: true } }],
                    translation: config.translations.progressive,
                });
                categories.push({
                    head: { type: { type: "nominal", isGerund: true, isSubject: true }, agr: { type: "3sing" } },
                    left: [{ head: { type: subjectType } }],
                    translation: config.translations.noun,
                });
                break;
            case "perfect":
                categories.push({
                    head: { type: "verb", finite: false, form: "perfect" },
                    left: [{ head: { type: subjectType, isSubject: true } }],
                    translation: config.translations.perfect,
                });
                break;
            case "passive":
                categories.push({
                    head: { type: "verb", finite: false, form: "passive" },
                    left: [{ head: { type: subjectType, isSubject: true } }],
                    translation: config.translations.passive ?? {},
                });
                break;
        }

        return categories.map((category) => {
            if (config.adv_manner_type) {
                category.head.adv_manner_type = config.adv_manner_type;
            } else {
                category.head.adv_manner_type = "none";
            }
            const translation = this.ensureContinuousForm(category.translation);
            const translationTemplates: TranslationTemplates = {};
            if (translation) {
                Object.entries(translation).forEach(([key, translationWord]) => {
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
                        head: {
                            type: "adj",
                            form: "base",
                            isGradable: !!config.isGradable
                        },
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
            color: config.color ?? "CornflowerBlue",
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

    createPrepositionBlock(config: PrepositionConfig): Block {
        const categories = [];

        if (config.adv) {
            categories.push({
                head: { type: "prep", pred: false },
                right: [{
                    head: { type: { type: "nominal", isDet: true }, case: "acc" }
                }],
                leftModTargets: [
                    { head: { type: "verb" } },
                    { head: { type: "sentence" } },
                ],
                translationTemplates: {
                    default: [
                        {
                            path: ["right", 0],
                            key: "default",
                        },
                        config.adv
                    ]
                }
            });
        }


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

    createTemporalAdverbialBlock(config: TemporalAdverbialConfig): Block {
        return {
            id: config.id,
            x: 0,
            y: 0,
            isRound: true,
            words: [{
                token: config.word,
                categories: [{
                    // This is the definition for the combined phrase, e.g., "every day"
                    head: { type: "temporal-adv" }, // A custom type for this kind of adverbial
                    right: [{
                        // It expects one argument on its right: a noun.
                        head: { type: noun, agr: { type: "3sing" } }
                    }],
                    // This defines what the resulting phrase can modify.
                    // It can be a right-hand modifier for a sentence or a verb.
                    leftModTargets: [
                        { head: { type: "sentence" } },
                        { head: { type: "verb" } },
                    ],
                    translationTemplates: {
                        // The translation prepends the prefix to the complement's translation.
                        // e.g., "毎" + "日" -> "毎日"
                        default: [config.translationPrefix, { path: ["right", 0], key: "default" }]
                    }
                }]
            }],
            color: config.color ?? "Coral",
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
        };
    }

    private getSubjectGapUnification(): CustomUnificationPath[][] {
        return [
            [
                ['left', 0, 'head'],
                ['right', 0, 'gaps', 0, 'head']
            ]
        ];
    }

    private createBeCategory(form: "base" | "am" | "are" | "is" | "was" | "were" | "en" | "ing", agr?: FeatureStructure): Phrase[] {
        const finite = (["base", "en", "ing"].includes(form)) ? false : true;
        const tense = (finite && ["am", "are", "is"].includes(form)) ? "present" : finite ? "past" : undefined;
        const head: FeatureStructure = { type: "sentence", inverted: false, negative: false, finite: finite, form: form };
        const left: Phrase = { head: { type: { type: "nominal", isDet: true } } };
        if (tense) head.tense = tense;
        if (finite) left.head.case = "nom";
        if (agr) left.head.agr = agr;

        const defaultTenseEnding = tense === "present" ? "だ" : tense === "past" ? "だった" : "である";
        const nominalTenseEnding = tense === "present" ? "" : tense === "past" ? "ところだった" : "である";

        return [{
            head: head,
            left: [{ head: { type: { type: "nominal", isDet: true, isTo: false, isGerund: false }, case: "nom", agr: agr ?? {} } }],
            right: [{
                head: { type: "verb", form: "progressive" },
                gaps: [{ head: { type: { type: "nominal", isDet: true } } }]
            }],
            customUnification: this.getSubjectGapUnification(),
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
                    defaultTenseEnding
                ],
                nominal: [
                    ...finite ? [{
                        path: ["left", 0],
                        key: "default",
                        particle: "が",
                    }] : [],
                    {
                        path: ["right", 0],
                        key: "nonPredicate",
                    },
                    nominalTenseEnding
                ]
            }
        }, {
            head: head,
            left: [left],
            right: [{
                head: { type: { type: "nominal", isDet: true }, case: "acc", isSubject: false }
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
                    defaultTenseEnding
                ],
                nominal: [
                    ...finite ? [{
                        path: ["left", 0],
                        key: "default",
                        particle: "が",
                    }] : [],
                    {
                        path: ["right", 0],
                        key: "default",
                    },
                    nominalTenseEnding
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
                ],
                nominal: [
                    ...finite ? [{
                        path: ["left", 0],
                        key: "default",
                        particle: "が",
                    }] : [],
                    {
                        path: ["right", 0],
                        key: "default",
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
                ],
                nominal: [
                    ...finite ? [{
                        path: ["left", 0],
                        key: "default",
                        particle: "が",
                    }] : [],
                    {
                        path: ["right", 0],
                        key: tense === "present" ? "default" : "past",
                    },
                ]
            }
        }, {
            head: head,
            left: [left],
            right: [{
                head: { type: "verb", form: "passive" }
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
                        particle: tense === "present" ? "る" : "た",
                    },
                ],
                nominal: [
                    ...finite ? [{
                        path: ["left", 0],
                        key: "default",
                        particle: "が",
                    }] : [],
                    {
                        path: ["right", 0],
                        key: tense === "present" ? "default" : "past",
                        particle: tense === "present" ? "る" : "た",
                    },
                ]
            }
        }]
    }

    private createBeNotCategory(form: "am" | "are" | "is" | "was" | "were", agr?: FeatureStructure): Phrase[] {
        const tense = ["am", "are", "is"].includes(form) ? "present" : "past";
        const head: FeatureStructure = { type: "sentence", inverted: false, negative: true, finite: true, form: form };
        const left: Phrase = { head: { type: { type: "nominal", isDet: true }, case: "nom" } };
        if (tense) head.tense = tense;
        if (agr) left.head.agr = agr;

        const tenseEnding = tense === "present" ? "ではない" : "ではなかった";

        return [{
            head: head,
            left: [{ head: { type: { type: "nominal", isDet: true, isTo: false, isGerund: false }, case: "nom", agr: agr ?? {} } }],
            right: [{
                head: { type: "verb", form: "progressive" },
                gaps: [{ head: { type: { type: "nominal", isDet: true } } }]
            }],
            customUnification: this.getSubjectGapUnification(),
            translationTemplates: {
                default: [
                    { path: ["left", 0], key: "default", particle: "は" },
                    { path: ["right", 0], key: "default" },
                    tenseEnding
                ],
                nominal: [
                    { path: ["left", 0], key: "default", particle: "が" },
                    { path: ["right", 0], key: "default" },
                    tenseEnding
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
                    { path: ["left", 0], key: "default", particle: "は" },
                    { path: ["right", 0], key: "default" },
                    tenseEnding
                ],
                nominal: [
                    { path: ["left", 0], key: "default", particle: "が" },
                    { path: ["right", 0], key: "default" },
                    tenseEnding
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
                    { path: ["left", 0], key: "default", particle: "は" },
                    { path: ["right", 0], key: tense === "present" ? "predNeg" : "pastNeg" },
                ],
                nominal: [
                    { path: ["left", 0], key: "default", particle: "が" },
                    { path: ["right", 0], key: tense === "present" ? "predNeg" : "pastNeg" },
                ]
            }
        }]
    }

    private createInvertedBeCategory(form: "am" | "are" | "is" | "was" | "were", agr?: FeatureStructure): Phrase[] {
        const tense = ["am", "are", "is"].includes(form) ? "present" : "past";
        const head: FeatureStructure = { type: "sentence", inverted: true, question: true, negative: false, finite: true, form: form };
        const subject: Phrase = { head: { type: { type: "nominal", isDet: true }, case: "nom", isSubject: true } };
        if (tense) head.tense = tense;
        if (agr) subject.head.agr = agr;

        const defaultTenseEnding = tense === "present" ? "なのか？" : "だったのか？";
        const nominalTenseEnding = tense === "present" ? "なのか" : "だったのか";

        return [{
            head: head,
            right: [
                { head: { type: { type: "nominal", isDet: true, isTo: false, isGerund: false }, case: "nom", agr: agr ?? {}, isSubject: true } },
                { head: { type: "verb", form: "progressive" } }
            ],
            translationTemplates: {
                default: [
                    { path: ["right", 0], key: "default", particle: "は" },
                    { path: ["right", 1], key: "default" },
                    defaultTenseEnding
                ],
                nominal: [
                    { path: ["right", 0], key: "default", particle: "が" },
                    { path: ["right", 1], key: "default" },
                    nominalTenseEnding
                ]
            }
        }, {
            head: head,
            right: [subject, {
                head: { type: { type: "nominal", isDet: true }, case: "acc" }
            }],
            translationTemplates: {
                default: [
                    { path: ["right", 0], key: "default", particle: "は" },
                    { path: ["right", 1], key: "default" },
                    defaultTenseEnding
                ],
                nominal: [
                    { path: ["right", 0], key: "default", particle: "が" },
                    { path: ["right", 1], key: "default" },
                    nominalTenseEnding
                ]
            }
        }, {
            head: head,
            right: [subject, {
                head: { type: "adj" }
            }],
            translationTemplates: {
                default: [
                    { path: ["right", 0], key: "default", particle: "は" },
                    { path: ["right", 1], key: tense === "present" ? "predQ" : "pastQ" },
                    "？"
                ],
                nominal: [
                    { path: ["right", 0], key: "default", particle: "が" },
                    { path: ["right", 1], key: tense === "present" ? "predQ" : "pastQ" },
                ]
            }
        }, {
            head: head,
            right: [subject, {
                head: { type: "prep", pred: true }
            }],
            translationTemplates: {
                default: [
                    { path: ["right", 0], key: "default", particle: "は" },
                    { path: ["right", 1], key: tense === "present" ? "predQ" : "pastQ" },
                    "？"
                ],
                nominal: [
                    { path: ["right", 0], key: "default", particle: "が" },
                    { path: ["right", 1], key: tense === "present" ? "predQ" : "pastQ" },
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
            color: "orange",
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
            color: "orange",
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
            color: "orange",
            children: [{
                id: "head",
                hidden: false,
                type: "dropdown",
                selected: 2,
                content: [
                    "am",
                    "are",
                    "is",
                    "was",
                    "were",
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
            }]
        }
    }

    private createDoNotCategory(form: "do" | "does" | "did", agr?: FeatureStructure) {
        const tense = ["do", "does"].includes(form) ? "present" : "past";
        const head: FeatureStructure = { type: "sentence", inverted: false, negative: true, finite: true, form: form };
        const left: Phrase = { head: { type: { type: "nominal", isDet: true }, case: "nom" } };
        if (tense) head.tense = tense;
        if (agr) left.head.agr = agr;

        const tenseEnding = tense === "present" ? "ない" : "なかった";

        return [{
            head: head,
            left: [{ head: { type: { type: "nominal", isDet: true }, case: "nom", agr: agr ?? {} } }],
            right: [{
                head: { type: "verb", form: "base" },
                gaps: [{ head: { type: { type: "nominal", isDet: true } } }]
            }],
            customUnification: this.getSubjectGapUnification(),
            translationTemplates: {
                default: [
                    { path: ["left", 0], key: "default", particle: "は" },
                    { path: ["right", 0], key: "imperfective" },
                    tenseEnding
                ],
                nominal: [
                    { path: ["left", 0], key: "default", particle: "が" },
                    { path: ["right", 0], key: "imperfective" },
                    tenseEnding
                ]
            }
        }]
    }

    private createInvertedDoCategory(form: "do" | "does" | "did", agr?: FeatureStructure): Phrase[] {
        const tense = ["do", "does"].includes(form) ? "present" : "past";
        const head: FeatureStructure = { type: "sentence", inverted: true, question: true, negative: false, finite: true, form: form };
        if (tense) head.tense = tense;

        // The subject is the first argument to the right, and the base verb is the second.
        const subject: Phrase = { head: { type: { type: "nominal", isDet: true, isTo: false, isGerund: false }, case: "nom", isSubject: true, agr: agr ?? {} } };
        const verb: Phrase = { head: { type: "verb", form: "base" } };

        return [{
            head: head,
            right: [subject, verb],
            translationTemplates: {
                default: [
                    { path: ["right", 0], key: "default", particle: "は" },
                    { path: ["right", 1], key: tense === "present" ? "default" : "past" },
                    "のか？",
                ],
                nominal: [
                    { path: ["right", 0], key: "default", particle: "が" },
                    { path: ["right", 1], key: tense === "present" ? "default" : "past" },
                    "のか",
                ]
            }
        }]
    }

    createBlockDoNot(): Block {
        return {
            id: "",
            x: 0,
            y: 0,
            words: [{
                token: "",
                categories: [...this.createDoNotCategory("do", { type: "non-3sing" })]
            }, {
                token: "",
                categories: [...this.createDoNotCategory("does", { type: "3sing" })]
            }, {
                token: "",
                categories: [...this.createDoNotCategory("did", {})]
            }],
            color: "orange",
            children: [{
                id: "specifier",
                hidden: false,
                type: "placeholder",
                content: undefined,
            }, {
                id: "head",
                hidden: false,
                type: "dropdown",
                selected: 0,
                content: [
                    "do not",
                    "does not",
                    "did not",
                ]
            }, {
                id: "complement",
                hidden: false,
                type: "placeholder",
                content: undefined,
            }]
        }
    }

    createBlockInvertedDo(): Block {
        return {
            id: "inverted_do",
            x: 0,
            y: 0,
            words: [{
                token: "",
                categories: [...this.createInvertedDoCategory("do", { type: "non-3sing" })]
            }, {
                token: "",
                categories: [...this.createInvertedDoCategory("does", { type: "3sing" })]
            }, {
                token: "",
                categories: [...this.createInvertedDoCategory("did", {})]
            }],
            color: "orange",
            children: [{
                id: "head",
                hidden: false,
                type: "dropdown",
                selected: 0,
                content: [
                    "do",
                    "does",
                    "did",
                ]
            }, {
                id: "specifier", // Placeholder for the subject
                hidden: false,
                type: "placeholder",
                content: undefined,
            }, {
                id: "complement", // Placeholder for the main verb (in base form)
                hidden: false,
                type: "placeholder",
                content: undefined,
            }]
        }
    }

    private createHaveCategory(form: "base" | "present" | "es" | "past" | "ing", finite: boolean, agr?: FeatureStructure): Phrase[] {
        const tense = finite ? (form === "past" ? "past" : "present") : undefined;
        const isFiniteSentence = finite && (form === "present" || form === "es" || form === "past");

        const head: FeatureStructure = {
            type: isFiniteSentence ? "sentence" : "verb",
            finite: finite,
            form: form,
        };
        if (tense) head.tense = tense;

        const left: Phrase | undefined = finite ? { head: { type: { type: "nominal", isDet: true }, case: "nom", agr: agr ?? {} } } : undefined;

        const right: Phrase = {
            head: { type: "verb", form: "perfect" },
            gaps: [{ head: { type: { type: "nominal", isDet: true } } }]
        };

        const translationTemplates: TranslationTemplates = {
            default: [
                ...finite ? [{ path: ["left", 0], key: "default", particle: "は" }] : [],
                { path: ["right", 0], key: "default" },
                tense === 'past' ? "た" : "る"
            ],
            nominal: [
                ...finite ? [{ path: ["left", 0], key: "default", particle: "が" }] : [],
                { path: ["right", 0], key: "default" },
                tense === 'past' ? "た" : "る"
            ]
        };

        const category: Phrase = {
            head: head,
            right: [right],
            translationTemplates: translationTemplates
        };

        if (left) {
            category.left = [left];
            category.customUnification = this.getSubjectGapUnification();
        }

        return [category];
    }

    private createHaveNotCategory(form: "present" | "es" | "past", agr?: FeatureStructure): Phrase[] {
        const tense = form === "past" ? "past" : "present";
        const head: FeatureStructure = {
            type: "sentence",
            finite: true,
            negative: true, // Key feature for negation
            inverted: false,
            form: form
        };
        if (tense) head.tense = tense;

        const left: Phrase = { head: { type: { type: "nominal", isDet: true }, case: "nom", agr: agr ?? {} } };

        // The complement MUST be a verb in its perfect form (e.g., "seen", "done").
        const right: Phrase = {
            head: { type: "verb", form: "perfect" },
            gaps: [{ head: { type: { type: "nominal", isDet: true } } }]
        };

        const translationTemplates: TranslationTemplates = {
            default: [
                { path: ["left", 0], key: "default", particle: "は" },
                { path: ["right", 0], key: "default" },
                tense === 'past' ? "なかった" : "ない"
            ],
            nominal: [
                { path: ["left", 0], key: "default", particle: "が" },
                { path: ["right", 0], key: "default" },
                tense === 'past' ? "なかった" : "ない"
            ]
        };

        return [{
            head: head,
            left: [left],
            right: [right],
            customUnification: this.getSubjectGapUnification(),
            translationTemplates: translationTemplates
        }];
    }

    private createInvertedHaveCategory(form: "present" | "es" | "past", agr?: FeatureStructure): Phrase[] {
        const tense = form === "past" ? "past" : "present";
        const head: FeatureStructure = {
            type: "sentence",
            finite: true,
            negative: false,
            inverted: true, // Key feature for Subject-Auxiliary Inversion
            question: true,
            form: form
        };
        if (tense) head.tense = tense;

        // In inverted structures, both subject and complement are on the right.
        const subject: Phrase = { head: { type: { type: "nominal", isDet: true }, case: "nom", agr: agr ?? {} } };
        const complement: Phrase = { head: { type: "verb", form: "perfect" } };

        const translationTemplates: TranslationTemplates = {
            default: [
                { path: ["right", 0], key: "default", particle: "は" },
                { path: ["right", 1], key: "default" },
                tense === 'past' ? "ましたか？" : "ますか？"
            ],
            nominal: [
                { path: ["right", 0], key: "default", particle: "が" },
                { path: ["right", 1], key: "default" },
                tense === 'past' ? "ましたか" : "ますか"
            ]
        };

        return [{
            head: head,
            right: [subject, complement], // Argument order: Subject, then VP
            translationTemplates: translationTemplates
        }];
    }

    createBlockHave(): Block {
        return {
            id: "have_aux",
            x: 0,
            y: 0,
            words: [
                {
                    token: "have_base",
                    categories: this.createHaveCategory("base", false)
                },
                {
                    token: "have_present",
                    categories: this.createHaveCategory("present", true, { type: "non-3sing" })
                },
                {
                    token: "has_present",
                    categories: this.createHaveCategory("es", true, { type: "3sing" })
                },
                {
                    token: "had_past",
                    categories: this.createHaveCategory("past", true, {})
                },
                {
                    token: "having_ing",
                    categories: this.createHaveCategory("ing", false)
                }
            ],
            color: "orange",
            children: [
                {
                    id: "specifier",
                    hidden: false,
                    type: "placeholder",
                    content: undefined,
                    headIndex: [1, 2, 3],
                },
                {
                    id: "head",
                    hidden: false,
                    type: "dropdown",
                    selected: 1,
                    content: [
                        "have",
                        "have",
                        "has",
                        "had",
                        "having"
                    ]
                },
                {
                    id: "complement",
                    hidden: false,
                    type: "placeholder",
                    content: undefined,
                }
            ]
        };
    }

    createBlockHaveNot(): Block {
        return {
            id: "have_not_aux",
            x: 0,
            y: 0,
            words: [
                {
                    token: "have_not",
                    categories: this.createHaveNotCategory("present", { type: "non-3sing" })
                },
                {
                    token: "has_not",
                    categories: this.createHaveNotCategory("es", { type: "3sing" })
                },
                {
                    token: "had_not",
                    categories: this.createHaveNotCategory("past", {})
                }
            ],
            color: "orange",
            children: [
                {
                    id: "specifier", // Subject
                    hidden: false,
                    type: "placeholder",
                    content: undefined,
                },
                {
                    id: "head",
                    hidden: false,
                    type: "dropdown",
                    selected: 0,
                    content: [
                        "have not",
                        "has not",
                        "had not"
                    ]
                },
                {
                    id: "complement", // Verb in perfect form
                    hidden: false,
                    type: "placeholder",
                    content: undefined,
                }
            ]
        };
    }

    createBlockInvertedHave(): Block {
        return {
            id: "inverted_have_aux",
            x: 0,
            y: 0,
            words: [
                {
                    token: "have_inverted",
                    categories: this.createInvertedHaveCategory("present", { type: "non-3sing" })
                },
                {
                    token: "has_inverted",
                    categories: this.createInvertedHaveCategory("es", { type: "3sing" })
                },
                {
                    token: "had_inverted",
                    categories: this.createInvertedHaveCategory("past", {})
                }
            ],
            color: "orange",
            children: [
                {
                    id: "head", // The auxiliary itself
                    hidden: false,
                    type: "dropdown",
                    selected: 0,
                    content: [
                        "Have",
                        "Has",
                        "Had"
                    ]
                },
                {
                    id: "specifier", // The subject, which appears second
                    hidden: false,
                    type: "placeholder",
                    content: undefined,
                },
                {
                    id: "complement", // The main verb phrase
                    hidden: false,
                    type: "placeholder",
                    content: undefined,
                }
            ]
        };
    }

    createModalBlock(config: ModalConfig): Block {
        const { id, word, translation, translationKey, preTranslation } = config;
        const color = config.color || "orange";

        return {
            id: id,
            x: 0,
            y: 0,
            words: [{
                token: "",
                categories: [{
                    head: {
                        type: "sentence",
                        finite: true,
                        inverted: false,
                        negative: false,
                        modal: true
                    },
                    left: [{
                        head: { type: { type: "nominal", isDet: true }, case: "nom" }
                    }],
                    right: [{
                        head: { type: "verb", form: "base", finite: false },
                        gaps: [{ head: { type: { type: "nominal", isDet: true } } }]
                    }],
                    customUnification: this.getSubjectGapUnification(),
                    translationTemplates: {
                        default: [
                            {
                                path: ["left", 0], // The subject
                                key: "default",
                                particle: "は",
                            },
                            preTranslation ?? "",
                            {
                                path: ["right", 0], // The verb phrase complement
                                key: translationKey ?? "default",
                            },
                            translation
                        ],
                        nominal: [
                            {
                                path: ["left", 0], // The subject
                                key: "default",
                                particle: "が",
                            },
                            preTranslation ?? "",
                            {
                                path: ["right", 0], // The verb phrase complement
                                key: translationKey ?? "default",
                            },
                            translation
                        ]
                    }
                }]
            }],
            color: color,
            children: [
                {
                    id: "specifier",
                    hidden: false,
                    type: "placeholder",
                    content: undefined,
                },
                {
                    id: "head",
                    hidden: false,
                    type: "text",
                    content: word,
                },
                {
                    id: "complement",
                    hidden: false,
                    type: "placeholder",
                    content: undefined,
                }
            ]
        };
    }

    createNegativeModalBlock(config: NegativeModalConfig): Block {
        const { id, negativeWord, preTranslation, translationKey, negativeTranslation } = config;
        const color = config.color || "orange";

        return {
            id: id,
            x: 0,
            y: 0,
            words: [{
                token: "",
                categories: [{
                    // The head indicates this is a finite, but now negative, sentence.
                    head: {
                        type: "sentence",
                        finite: true,
                        inverted: false,
                        negative: true, // Key change: this is a negative clause
                        modal: true
                    },
                    // The structure of arguments remains the same as a positive modal.
                    left: [{
                        head: { type: { type: "nominal", isDet: true }, case: "nom" }
                    }],
                    right: [{
                        head: { type: "verb", form: "base", finite: false },
                        gaps: [{ head: { type: { type: "nominal", isDet: true } } }]
                    }],
                    customUnification: this.getSubjectGapUnification(),
                    translationTemplates: {
                        default: [
                            {
                                path: ["left", 0],
                                key: "default",
                                particle: "は",
                            },
                            preTranslation ?? "",
                            {
                                path: ["right", 0],
                                key: translationKey ?? "default",
                            },
                            // Use the specific negative translation
                            negativeTranslation
                        ],
                        nominal: [
                            {
                                path: ["left", 0],
                                key: "default",
                                particle: "が",
                            },
                            preTranslation ?? "",
                            {
                                path: ["right", 0],
                                key: translationKey ?? "default",
                            },
                            // Use the specific negative translation
                            negativeTranslation
                        ]
                    }
                }]
            }],
            color: color,
            // The visual block structure is identical to the positive modal
            children: [
                {
                    id: "specifier", // Subject
                    hidden: false,
                    type: "placeholder",
                    content: undefined,
                },
                {
                    id: "head", // e.g., "can't", "should not"
                    hidden: false,
                    type: "text",
                    content: negativeWord,
                },
                {
                    id: "complement", // Verb Phrase
                    hidden: false,
                    type: "placeholder",
                    content: undefined,
                }
            ]
        };
    }

    createInvertedModalBlock(config: ModalConfig): Block {
        const { id, word, translation, preTranslation, translationKey } = config;
        const color = config.color || "orange";

        return {
            id: id,
            x: 0,
            y: 0,
            words: [{
                token: "",
                categories: [{
                    head: {
                        type: "sentence",
                        finite: true,
                        inverted: true,
                        question: true,
                        negative: false,
                        modal: true
                    },
                    right: [
                        { head: { type: { type: "nominal", isDet: true }, case: "nom" } },
                        { head: { type: "verb", form: "base", finite: false } }
                    ],
                    translationTemplates: {
                        default: [
                            {
                                path: ["right", 0],
                                key: "default",
                                particle: "は",
                            },
                            preTranslation ?? "",
                            {
                                path: ["right", 1],
                                key: translationKey ?? "default",
                            },
                            translation,
                            "か？"
                        ],
                        nominal: [
                            {
                                path: ["right", 0],
                                key: "default",
                                particle: "が",
                            },
                            preTranslation ?? "",
                            {
                                path: ["right", 1],
                                key: translationKey ?? "default",
                            },
                            translation,
                            "か"
                        ]
                    }
                }]
            }],
            color: color,
            children: [
                {
                    id: "head",
                    hidden: false,
                    type: "text",
                    content: word,
                },
                {
                    id: "specifier",
                    hidden: false,
                    type: "placeholder",
                    content: undefined,
                },
                {
                    id: "complement",
                    hidden: false,
                    type: "placeholder",
                    content: undefined,
                }
            ]
        };
    }

    createWhSentenceBlock(config: WhSentenceConfig): Block {
        const { id, whPhraseBlock, expectedWhFeatures, expectedWhFeaturesAdverbial, color } = config;

        const whCategories: Phrase[] = [];

        if (config.nonSubjectGap) {
            whCategories.push({
                head: { type: "sentence", finite: true, question: true, inverted: true, wh: true },
                left: [{ head: expectedWhFeatures }],
                right: [{
                    head: { type: "sentence", inverted: true, wh: false },
                    gaps: [{ head: config.nonSubjectGap }]
                }],
                translationTemplates: {
                    default: [
                        {
                            path: ["right", 0],
                            key: "default",
                            filler: ["left", 0],
                        },
                    ]
                }
            })
        }

        if (config.subjectGap) {
            whCategories.push({
                head: { type: "sentence", finite: true, question: true, inverted: false, wh: true },
                left: [{ head: expectedWhFeatures }],
                right: [{
                    head: { type: "sentence", inverted: false, wh: false },
                    gaps: [{ head: config.subjectGap }]
                }],
                customUnification: [
                    [["left", 0, "head", "agr"], ["right", 0, "gaps", 0, "head", "agr"]]
                ],
                translationTemplates: {
                    default: [
                        {
                            path: ["right", 0],
                            key: "default",
                        },
                        "のは",
                        {
                            path: ["left", 0],
                            key: "default",
                        },
                        "か？"
                    ]
                }
            })
        }

        if (config.adverbial) {
            whCategories.push({
                head: { type: "sentence", finite: true, question: true, inverted: true, wh: true },
                left: [{ head: expectedWhFeaturesAdverbial ?? expectedWhFeatures }],
                right: [{
                    head: { type: "sentence", inverted: true, wh: false },
                }],
                translationTemplates: {
                    default: [
                        {
                            path: ["left", 0],
                            key: "default",
                        },
                        {
                            path: ["right", 0],
                            key: "default",
                        },
                    ]
                }
            });
        }

        return {
            id: id,
            x: 0,
            y: 0,
            words: [{
                token: "",
                categories: whCategories
            }],
            color: color || "orange",
            children: [
                {
                    id: "interrogative-complement",
                    hidden: false,
                    type: "placeholder",
                    content: whPhraseBlock,
                },
                {
                    id: "head",
                    hidden: false,
                    type: "text",
                    content: "",
                },
                {
                    id: "sentence-complement",
                    hidden: false,
                    type: "placeholder",
                    content: undefined
                }
            ]
        };
    }

    createRelativePronounBlock(config: RelativePronounConfig): Block {
        const { id, word, antecedentFeatures, gapCase, color } = config;

        const gapHeadFeatures: FeatureStructure = {};
        if (gapCase) {
            gapHeadFeatures.case = gapCase;
        }

        const relativeClauseCategory: Phrase = {
            head: {},
            left: [{
                head: { type: commonNominal, ...antecedentFeatures }
            }],
            right: [{
                head: { type: "sentence", finite: true, inverted: false },
                gaps: [{ head: gapHeadFeatures }]
            }],
            customUnification: [
                [
                    ["head"],
                    ["left", 0, "head"]
                ],
                [
                    ["left", 0, "head"],
                    ["right", 0, "gaps", 0, "head"]
                ]
            ],
            translationTemplates: {
                default: [
                    { path: ["right", 0], key: "nominal" },
                    { path: ["left", 0], key: "default" },
                ]
            }
        };

        return {
            id: id,
            x: 0,
            y: 0,
            words: [{
                token: "",
                categories: [relativeClauseCategory],
            }],
            color: color || "mediumseagreen",
            isRound: true,
            children: [{
                id: "antecedent-complement",
                hidden: false,
                type: "placeholder",
                content: undefined,
            },
            {
                id: "head",
                hidden: false,
                type: "text",
                content: word,
            },
            {
                id: "sentence-complement",
                hidden: false,
                type: "placeholder",
                content: undefined,
            }]
        };
    }
}
