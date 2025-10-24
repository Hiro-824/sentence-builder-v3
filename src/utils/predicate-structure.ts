import { SentenceStructure, SentenceStructureEntry } from "@/models/block";
import { Phrase } from "@/models/grammar-entities";

interface BuildStructureOptions {
    formatTranslation: (text: string) => string;
}

interface PredicateAnalysis {
    actionText: string;
    entries: SentenceStructureEntry[];
}

const HUMAN_KEYWORDS = [
    "私",
    "ぼく",
    "僕",
    "わたし",
    "わたしたち",
    "俺",
    "おれ",
    "あなた",
    "きみ",
    "君",
    "彼",
    "彼女",
    "友達",
    "ともだち",
    "家族",
    "先生",
    "生徒",
    "みんな",
    "人",
    "ひと",
    "子ども",
    "こども",
    "男の子",
    "女の子",
    "少年",
    "少女",
    "大人",
    "父",
    "母",
    "お父さん",
    "お母さん",
    "ママ",
    "パパ",
    "兄",
    "姉",
    "弟",
    "妹",
    "友人",
    "スタッフ",
    "チーム",
    "選手",
    "先生たち",
    "生徒たち",
    "ロボット",
    "犬",
    "猫"
];

const AGENT_REQUIRED_KEYWORDS = [
    "行",
    "来",
    "走",
    "歩",
    "泳",
    "食べ",
    "飲",
    "話",
    "聞",
    "考え",
    "決め",
    "作",
    "建て",
    "読",
    "書",
    "使",
    "教え",
    "学",
    "練習",
    "勉強",
    "働",
    "掃除",
    "運転",
    "歩",
    "遊",
    "届け",
    "助け",
    "準備",
    "探",
    "買",
    "売",
    "歌",
    "踊"
];

const TIME_KEYWORDS = [
    "時",
    "時間",
    "前",
    "後",
    "朝",
    "昼",
    "夜",
    "毎日",
    "毎週",
    "毎月",
    "毎年",
    "昨日",
    "今日",
    "明日",
    "週",
    "月",
    "年",
    "曜日",
    "とき",
    "ころ"
];

function sanitizeTranslation(raw: string | undefined, format: (text: string) => string): string {
    if (!raw) return "";
    const formatted = format(raw);
    return formatted.replace(/\s+/g, "");
}

function extractTranslation(phrase: Phrase | undefined, format: (text: string) => string): string {
    if (!phrase) return "";
    const translation = phrase.translation;
    if (typeof translation === "string") {
        return sanitizeTranslation(translation, format);
    }
    if (translation && typeof translation === "object") {
        const preferredKeys = ["default", "base", "continuous", "imperfective", "past", "noun"];
        for (const key of preferredKeys) {
            const value = translation[key];
            if (typeof value === "string" && value.trim().length > 0) {
                return sanitizeTranslation(value, format);
            }
        }
        for (const value of Object.values(translation)) {
            if (typeof value === "string" && value.trim().length > 0) {
                return sanitizeTranslation(value, format);
            }
        }
    }
    return "";
}

function isMissingValue(value: string): boolean {
    return !value || value.includes("＿");
}

function isLikelyHuman(value: string): boolean {
    if (!value) return false;
    const trimmed = value.replace(/[！？!?。、.]/g, "");
    if (/[A-Za-z]/.test(trimmed)) {
        // Fall back to heuristic: treat pronouns like "you", "we", etc. as human.
        const lower = trimmed.toLowerCase();
        return /(you|we|they|he|she|students?|teachers?|friends?|family|team|kids|children)/.test(lower);
    }
    return HUMAN_KEYWORDS.some(keyword => trimmed.includes(keyword));
}

function requiresAgent(action: string): boolean {
    if (!action) return false;
    return AGENT_REQUIRED_KEYWORDS.some(keyword => action.includes(keyword));
}

function detectTimeLabel(value: string): boolean {
    if (!value) return false;
    return TIME_KEYWORDS.some(keyword => value.includes(keyword));
}

function inferLabelAndIcon(value: string, index: number): { label: string; icon: string } {
    if (!value || value.includes("＿")) {
        return { label: index === 0 ? "なにを？" : "つながり", icon: index === 0 ? "🎯" : "🧩" };
    }

    const multiParticlePatterns = [
        { pattern: /について$/, label: "なにについて？", icon: "💬" },
        { pattern: /のことを$/, label: "なにについて？", icon: "💬" },
        { pattern: /のために$/, label: "なんのために？", icon: "🎯" },
        { pattern: /ために$/, label: "なんのために？", icon: "🎯" },
        { pattern: /として$/, label: "どんな役割で？", icon: "🎭" },
        { pattern: /にとって$/, label: "だれにとって？", icon: "🧠" },
        { pattern: /から$/, label: "どこから？", icon: "🚪" },
        { pattern: /まで$/, label: "どこまで？", icon: "➡️" }
    ];

    const matchedMulti = multiParticlePatterns.find(entry => entry.pattern.test(value));
    if (matchedMulti) {
        return { label: matchedMulti.label, icon: matchedMulti.icon };
    }

    if (detectTimeLabel(value)) {
        return { label: "いつ？", icon: "🕒" };
    }

    const lastChar = value.slice(-1);
    switch (lastChar) {
        case "を":
            return { label: "なにを？", icon: "🎯" };
        case "に":
        case "へ":
            return { label: "どこに？", icon: "📍" };
        case "で":
            return { label: "どこで？", icon: "🏠" };
        case "と":
            return { label: "だれと？", icon: "🤝" };
        default:
            break;
    }

    return {
        label: index === 0 ? "なにとつながる？" : "つながり",
        icon: index === 0 ? "🧩" : "🔗"
    };
}

function buildSubjectEntry(subjectPhrase: Phrase | undefined, actionText: string, format: (text: string) => string): SentenceStructureEntry {
    const subjectValue = extractTranslation(subjectPhrase, format);
    const missing = isMissingValue(subjectValue);
    const human = isLikelyHuman(subjectValue);
    const label = human ? "だれが？" : "なにが？";
    let tone: SentenceStructureEntry["tone"];

    if (missing) {
        tone = "missing";
    } else if (!human && requiresAgent(actionText)) {
        tone = "warning";
    }

    const icon = human ? "👤" : "🧱";
    const value = missing ? "（まだ入っていないよ）" : subjectValue;

    return { icon, label, value, tone };
}

function buildComplementEntries(phrase: Phrase, format: (text: string) => string): SentenceStructureEntry[] {
    const complements = phrase.right ?? [];
    return complements.map((arg, index) => {
        const value = extractTranslation(arg, format);
        const missing = isMissingValue(value);
        const { label, icon } = inferLabelAndIcon(value, index);
        return {
            icon,
            label,
            value: missing ? "（ここはまだ空っぽ）" : value,
            tone: missing ? "missing" : undefined
        };
    });
}

function buildModifierEntries(phrase: Phrase, format: (text: string) => string): SentenceStructureEntry[] {
    const modifierPhrases = [...(phrase.leftModifiers ?? []), ...(phrase.rightModifiers ?? [])];
    return modifierPhrases.map(mod => {
        const value = extractTranslation(mod, format);
        const missing = isMissingValue(value);
        const isTime = detectTimeLabel(value);
        const icon = isTime ? "🕒" : "✨";
        const label = isTime ? "いつ？" : "付け足し";
        return {
            icon,
            label,
            value: missing ? "（ここもまだ空いているよ）" : value,
            tone: missing ? "missing" : undefined
        };
    });
}

function analyzePredicate(predicatePhrase: Phrase | undefined, format: (text: string) => string): PredicateAnalysis {
    if (!predicatePhrase) {
        return {
            actionText: "",
            entries: [{
                icon: "🎬",
                label: "どうする？",
                value: "（まだ動きが決まっていないよ）",
                tone: "missing"
            }]
        };
    }

    const actionText = extractTranslation(predicatePhrase, format);
    const actionEntry: SentenceStructureEntry = {
        icon: "🎬",
        label: "どうする？",
        value: actionText ? actionText : "（まだ動きが決まっていないよ）",
        tone: actionText ? undefined : "missing"
    };

    const entries: SentenceStructureEntry[] = [actionEntry];
    entries.push(...buildComplementEntries(predicatePhrase, format));
    entries.push(...buildModifierEntries(predicatePhrase, format));

    return { actionText, entries };
}

export function buildSentenceStructure(phrase: Phrase | undefined, options: BuildStructureOptions): SentenceStructure | null {
    if (!phrase) return null;

    const formatTranslation = options.formatTranslation;

    const isSentenceType = typeof phrase.head?.type === "string" && phrase.head.type === "sentence";

    const subjectPhrase = isSentenceType ? phrase.left?.[0] : undefined;
    const predicatePhrase = isSentenceType ? phrase.right?.[0] : phrase;

    const predicateAnalysis = analyzePredicate(predicatePhrase, formatTranslation);
    const entries: SentenceStructureEntry[] = [];

    if (subjectPhrase || isSentenceType) {
        entries.push(buildSubjectEntry(subjectPhrase, predicateAnalysis.actionText, formatTranslation));
    }

    entries.push(...predicateAnalysis.entries);

    const hasWarning = entries.some(entry => entry.tone === "warning");
    const hasMissing = entries.some(entry => entry.tone === "missing");

    let note = "👀 ブロックの関係をチェックしよう。少し変だと感じたら並べ替えてみよう！";
    if (hasWarning) {
        note = "⚠️ ちょっと不思議かも：動くのは人かな？ ブロックを入れ替えてみよう。";
    } else if (hasMissing) {
        note = "＋ まだ空いているところがあるよ。必要なブロックを追加してみよう！";
    }

    return {
        title: "つながりチェック",
        entries,
        note
    };
}
