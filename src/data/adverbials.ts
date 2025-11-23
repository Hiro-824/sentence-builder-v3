import { Block } from "@/models/block";
import { Phrase } from "@/models/grammar-entities";
import { Generator } from "@/grammar/generator";

const generator = new Generator();

type SimpleAdverbType = 'skill' | 'degree' | 'both';

interface SimpleAdverbConfig {
    id: string;
    word: string;
    translation: string;
    advType?: SimpleAdverbType;
    gradable?: boolean;
    color?: string;
}

const createSimpleAdverbBlock = ({ id, word, translation, advType = 'skill', gradable = true, color = 'Coral' }: SimpleAdverbConfig): Block => {
    const targets: Phrase[] = [];
    if (advType === 'skill' || advType === 'both') {
        targets.push({ head: { type: 'verb', adv_manner_type: 'skill' } });
    }
    if (advType === 'degree' || advType === 'both') {
        targets.push({ head: { type: 'verb', adv_manner_type: 'degree' } });
    }
    if (targets.length === 0) {
        targets.push({ head: { type: 'verb' } });
    }

    return {
        id,
        x: 0,
        y: 0,
        isRound: true,
        words: [{
            token: word,
            categories: [{
                head: { type: 'adverb', manner: true, form: 'base', isGradable: gradable },
                leftModTargets: targets,
                translationTemplates: { default: [translation] }
            }]
        }],
        color,
        children: [{
            id: 'head',
            hidden: false,
            type: 'text',
            content: word
        }]
    };
};

export const blockEvery: Block = generator.createTemporalAdverbialBlock({
    id: "every",
    word: "every",
    translationPrefix: "毎"
});

export const blockWell: Block = {
    id: "well_adverb",
    x: 0,
    y: 0,
    isRound: true,
    words: [
        {
            token: "well",
            tags: ["skill", "degree", "good", "nicely"],
            categories: [
                {
                    head: { type: "adverb", manner: true, meaning: "skill", form: "base", isGradable: true },
                    leftModTargets: [{ head: { type: "verb", adv_manner_type: "skill" } }],
                    translationTemplates: { default: ["上手に"] }
                },
                {
                    head: { type: "adverb", manner: true, meaning: "degree", form: "base", isGradable: true },
                    leftModTargets: [{ head: { type: "verb", adv_manner_type: "degree" } }],
                    translationTemplates: { default: ["よく"] }
                }
            ]
        },
        {
            token: "better",
            tags: ["comparative", "improvement"],
            categories: [
                // Skill meaning
                {
                    head: { type: "adverb", manner: true, meaning: "skill", form: "comparative" },
                    leftModTargets: [{ head: { type: "verb", adv_manner_type: "skill" } }],
                    translationTemplates: { default: ["もっと上手に"] }
                },
                // Degree meaning
                {
                    head: { type: "adverb", manner: true, meaning: "degree", form: "comparative" },
                    leftModTargets: [{ head: { type: "verb", adv_manner_type: "degree" } }],
                    translationTemplates: { default: ["もっとよく"] }
                }
            ]
        },
        {
            token: "best",
            tags: ["superlative", "top"],
            categories: [
                // Skill meaning
                {
                    head: { type: "adverb", manner: true, meaning: "skill", form: "superlative" },
                    leftModTargets: [{ head: { type: "verb", adv_manner_type: "degree" } }],
                    translationTemplates: { default: ["いちばん上手に"] }
                },
                // Degree meaning
                {
                    head: { type: "adverb", manner: true, meaning: "degree", form: "superlative" },
                    leftModTargets: [{ head: { type: "verb", adv_manner_type: "degree" } }],
                    translationTemplates: { default: ["いちばんよく"] }
                }
            ]
        }
    ],

    color: "Coral",

    children: [{
        id: "head",
        hidden: false,
        type: "dropdown",
        content: ["well", "better", "best"],
        selected: 0,
    }]
};

export const blockFast: Block = {
    id: "fast",
    x: 0,
    y: 0,
    isRound: true,
    words: [
        {
            token: "fast",
            categories: [
                {
                    head: { type: "adverb", manner: true, form: "base", isGradable: true },
                    leftModTargets: [{ head: { type: "verb", adv_manner_type: "skill" } }],
                    translationTemplates: { default: ["速く"] }
                },
            ]
        },
        {
            token: "faster",
            categories: [
                {
                    head: { type: "adverb", manner: true, form: "comparative" },
                    leftModTargets: [{ head: { type: "verb", adv_manner_type: "skill" } }],
                    translationTemplates: { default: ["もっと速く"] }
                },
            ]
        },
        {
            token: "fastest",
            categories: [
                {
                    head: { type: "adverb", manner: true, form: "superlative" },
                    leftModTargets: [{ head: { type: "verb", adv_manner_type: "degree" } }],
                    translationTemplates: { default: ["いちばん速く"] }
                }
            ]
        }
    ],

    color: "Coral",

    children: [{
        id: "head",
        hidden: false,
        type: "dropdown",
        content: ["fast", "faster", "fastest"],
        selected: 0,
    }]
};

export const blockVery: Block = {
    id: "very_adverb",
    x: 0,
    y: 0,
    isRound: true,
    words: [{
        token: "very",
        categories: [{
            head: { type: "adverb", degree: true },

            rightModTargets: [
                { head: { type: "adj", form: "base", isGradable: true } },
                { head: { type: "adverb", form: "base", isGradable: true } }
            ],

            translationTemplates: {
                default: ["とても"]
            }
        }]
    }],
    color: "Coral",
    children: [{
        id: "head",
        hidden: false,
        type: "text",
        content: "very"
    }]
};

export const blockQuickly = createSimpleAdverbBlock({
    id: "adverb_quickly",
    word: "quickly",
    translation: "速く",
    advType: "both",
});

export const blockSlowly = createSimpleAdverbBlock({
    id: "adverb_slowly",
    word: "slowly",
    translation: "ゆっくり",
    advType: "both",
});

export const blockCarefully = createSimpleAdverbBlock({
    id: "adverb_carefully",
    word: "carefully",
    translation: "注意深く",
    advType: "skill",
});

export const blockQuietly = createSimpleAdverbBlock({
    id: "adverb_quietly",
    word: "quietly",
    translation: "静かに",
    advType: "skill",
});

export const blockClearly = createSimpleAdverbBlock({
    id: "adverb_clearly",
    word: "clearly",
    translation: "はっきり",
    advType: "degree",
});

export const blockEasily = createSimpleAdverbBlock({
    id: "adverb_easily",
    word: "easily",
    translation: "簡単に",
    advType: "degree",
});

export const blockEfficiently = createSimpleAdverbBlock({
    id: "adverb_efficiently",
    word: "efficiently",
    translation: "効率的に",
    advType: "skill",
});

export const blockProfessionally = createSimpleAdverbBlock({
    id: "adverb_professionally",
    word: "professionally",
    translation: "プロらしく",
    advType: "skill",
});

export const blockSafely = createSimpleAdverbBlock({
    id: "adverb_safely",
    word: "safely",
    translation: "安全に",
    advType: "degree",
});

export const blockSmoothly = createSimpleAdverbBlock({
    id: "adverb_smoothly",
    word: "smoothly",
    translation: "スムーズに",
    advType: "degree",
});

export const blockRegularly = createSimpleAdverbBlock({
    id: "adverb_regularly",
    word: "regularly",
    translation: "定期的に",
    advType: "degree",
});

export const blockTogether = createSimpleAdverbBlock({
    id: "adverb_together",
    word: "together",
    translation: "一緒に",
    advType: "both",
    gradable: false,
});

export const blockOnline = createSimpleAdverbBlock({
    id: "adverb_online",
    word: "online",
    translation: "オンラインで",
    advType: "both",
    gradable: false,
});

export const blockActively = createSimpleAdverbBlock({
    id: "adverb_actively",
    word: "actively",
    translation: "積極的に",
    advType: "both",
});

export const blockAggressively = createSimpleAdverbBlock({
    id: "adverb_aggressively",
    word: "aggressively",
    translation: "攻撃的に",
    advType: "skill",
});

export const blockEnergetically = createSimpleAdverbBlock({
    id: "adverb_energetically",
    word: "energetically",
    translation: "元気よく",
    advType: "both",
});

export const blockOutdoors = createSimpleAdverbBlock({
    id: "adverb_outdoors",
    word: "outdoors",
    translation: "屋外で",
    advType: "both",
    gradable: false,
});

export const blockAlways = createSimpleAdverbBlock({
    id: "adverb_always",
    word: "always",
    translation: "いつも",
    advType: "degree",
    gradable: false,
});

export const blockUsually = createSimpleAdverbBlock({
    id: "adverb_usually",
    word: "usually",
    translation: "たいてい",
    advType: "both",
    gradable: false,
});

// Ensure "usually" attaches from the left (before the verb) by using rightModTargets.
if (Array.isArray(blockUsually.words) && blockUsually.words[0]?.categories?.[0]) {
    const category = blockUsually.words[0].categories[0];
    category.rightModTargets = category.leftModTargets;
    delete category.leftModTargets;
}

export const blockOften = createSimpleAdverbBlock({
    id: "adverb_often",
    word: "often",
    translation: "よく",
    advType: "degree",
    gradable: false,
});

export const blockSometimes = createSimpleAdverbBlock({
    id: "adverb_sometimes",
    word: "sometimes",
    translation: "時々",
    advType: "degree",
    gradable: false,
});

export const blockRarely = createSimpleAdverbBlock({
    id: "adverb_rarely",
    word: "rarely",
    translation: "めったに",
    advType: "degree",
    gradable: false,
});

export const blockNever = createSimpleAdverbBlock({
    id: "adverb_never",
    word: "never",
    translation: "決して",
    advType: "degree",
    gradable: false,
});

export const blockHere = createSimpleAdverbBlock({
    id: "adverb_here",
    word: "here",
    translation: "ここで",
    advType: "both",
    gradable: false,
});

export const blockThere = createSimpleAdverbBlock({
    id: "adverb_there",
    word: "there",
    translation: "そこで",
    advType: "both",
    gradable: false,
});

export const blockEverywhere = createSimpleAdverbBlock({
    id: "adverb_everywhere",
    word: "everywhere",
    translation: "どこでも",
    advType: "both",
    gradable: false,
});

export const blockYesterday = createSimpleAdverbBlock({
    id: "adverb_yesterday",
    word: "yesterday",
    translation: "昨日",
    advType: "both",
    gradable: false,
});

export const blockToday = createSimpleAdverbBlock({
    id: "adverb_today",
    word: "today",
    translation: "今日",
    advType: "both",
    gradable: false,
});

export const blockTomorrow = createSimpleAdverbBlock({
    id: "adverb_tomorrow",
    word: "tomorrow",
    translation: "明日",
    advType: "both",
    gradable: false,
});

export const blockNow = createSimpleAdverbBlock({
    id: "adverb_now",
    word: "now",
    translation: "今、",
    advType: "both",
    gradable: false,
});

export const blockAfterSchool: Block = {
    id: "adverb_after_school",
    x: 0,
    y: 0,
    isRound: true,
    words: [{
        token: "after school",
        categories: [{
            head: { type: "adverb", form: "base", isGradable: false },
            leftModTargets: [
                { head: { type: "verb" } },
                { head: { type: "sentence" } },
            ],
            translationTemplates: { default: ["放課後、"] },
        }]
    }],
    color: "Coral",
    children: [{
        id: "head",
        hidden: false,
        type: "text",
        content: "after school"
    }]
};

export const blockSoon = createSimpleAdverbBlock({
    id: "adverb_soon",
    word: "soon",
    translation: "すぐ",
    advType: "both",
    gradable: false,
});

export const blockAlready = createSimpleAdverbBlock({
    id: "adverb_already",
    word: "already",
    translation: "もう",
    advType: "both",
    gradable: false,
});

export const blockStill = createSimpleAdverbBlock({
    id: "adverb_still",
    word: "still",
    translation: "まだ",
    advType: "both",
    gradable: false,
});

export const blockFinally = createSimpleAdverbBlock({
    id: "adverb_finally",
    word: "finally",
    translation: "ついに",
    advType: "both",
    gradable: false,
});

export const blockProbably = createSimpleAdverbBlock({
    id: "adverb_probably",
    word: "probably",
    translation: "おそらく",
    advType: "degree",
});

export const blockMaybe = createSimpleAdverbBlock({
    id: "adverb_maybe",
    word: "maybe",
    translation: "たぶん",
    advType: "degree",
});

export const blockReally = createSimpleAdverbBlock({
    id: "adverb_really",
    word: "really",
    translation: "本当に",
    advType: "degree",
});

export const blockJust = createSimpleAdverbBlock({
    id: "adverb_just",
    word: "just",
    translation: "ちょうど",
    advType: "both",
    gradable: false,
});

export const blockThen = createSimpleAdverbBlock({
    id: "adverb_then",
    word: "then",
    translation: "それから",
    advType: "both",
    gradable: false,
});

export const blockLater = createSimpleAdverbBlock({
    id: "adverb_later",
    word: "later",
    translation: "あとで",
    advType: "both",
    gradable: false,
});

export const blockEarlyAdv = createSimpleAdverbBlock({
    id: "adverb_early",
    word: "early",
    translation: "早く",
    advType: "both",
});

export const blockLateAdv = createSimpleAdverbBlock({
    id: "adverb_late",
    word: "late",
    translation: "遅く",
    advType: "both",
});

export const blockBadly = createSimpleAdverbBlock({
    id: "adverb_badly",
    word: "badly",
    translation: "ひどく",
    advType: "degree",
});

export const blockLoudly = createSimpleAdverbBlock({
    id: "adverb_loudly",
    word: "loudly",
    translation: "大声で",
    advType: "skill",
});

export const blockPolitelyAdv = createSimpleAdverbBlock({
    id: "adverb_politely",
    word: "politely",
    translation: "丁寧に",
    advType: "skill",
});

export const blockCalmly = createSimpleAdverbBlock({
    id: "adverb_calmly",
    word: "calmly",
    translation: "落ち着いて",
    advType: "skill",
});

export const blockHappily = createSimpleAdverbBlock({
    id: "adverb_happily",
    word: "happily",
    translation: "うれしそうに",
    advType: "both",
});

export const blockSeriouslyAdv = createSimpleAdverbBlock({
    id: "adverb_seriously",
    word: "seriously",
    translation: "真剣に",
    advType: "degree",
});

export const blockHardAdv = createSimpleAdverbBlock({
    id: "adverb_hard",
    word: "hard",
    translation: "一生懸命",
    advType: "skill",
});

export const blockFar = createSimpleAdverbBlock({
    id: "adverb_far",
    word: "far",
    translation: "遠くに",
    advType: "both",
});

export const blockNear = createSimpleAdverbBlock({
    id: "adverb_near",
    word: "near",
    translation: "近くに",
    advType: "both",
});

export const blockIndoors = createSimpleAdverbBlock({
    id: "adverb_indoors",
    word: "indoors",
    translation: "屋内で",
    advType: "both",
    gradable: false,
});

export const blockAround = createSimpleAdverbBlock({
    id: "adverb_around",
    word: "around",
    translation: "周りに",
    advType: "both",
});
