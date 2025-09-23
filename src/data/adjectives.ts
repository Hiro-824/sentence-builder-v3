import { AdjectiveConfig, Generator } from "@/grammar/generator";
import { Block } from "@/models/block";

const generator = new Generator();

const configBig: AdjectiveConfig = {
    id: "adjective_big",
    base: "big",
    comparative: "bigger",
    superlative: "biggest",
    isGradable: true,
    translation: {
        default: "大きい",
        predicative: "大きい",
        past: "大きかった",
        predNeg: "大きくない",
        pastNeg: "大きくなかった",
        predQ: "大きいのか",
        pastQ: "大きかったのか"
    }
};

const configInteresting: AdjectiveConfig = {
    id: "adjective_interesting",
    base: "interesting",
    comparative: "more interesting",
    superlative: "most interesting",
    isGradable: true,
    translation: {
        default: "興味深い",
        predicative: "興味深い",
        past: "興味深かった",
        predNeg: "興味深くない",
        pastNeg: "興味深くなかった",
        predQ: "興味深いのか",
        pastQ: "興味深かったのか"
    }
};

const configNew: AdjectiveConfig = {
    id: "adjective_new",
    base: "new",
    comparative: "newer",
    superlative: "newest",
    isGradable: true,
    translation: {
        default: "新しい",
        predicative: "新しい",
        past: "新しかった",
        predNeg: "新しくない",
        pastNeg: "新しくなかった",
        predQ: "新しいのか",
        pastQ: "新しかったのか"
    }
};

const configOld: AdjectiveConfig = {
    id: "adjective_old",
    base: "old",
    comparative: "older",
    superlative: "oldest",
    isGradable: true,
    translation: {
        default: "古い",
        predicative: "古い",
        past: "古かった",
        predNeg: "古くない",
        pastNeg: "古くなかった",
        predQ: "古いのか",
        pastQ: "古かったのか"
    }
};

const configGood: AdjectiveConfig = {
    id: "adjective_good",
    base: "good",
    comparative: "better",
    superlative: "best",
    isGradable: true,
    translation: {
        default: "良い",
        predicative: "良い",
        past: "良かった",
        predNeg: "良くない",
        pastNeg: "良くなかった",
        predQ: "良いのか",
        pastQ: "良かったのか"
    }
};

const configBad: AdjectiveConfig = {
    id: "adjective_bad",
    base: "bad",
    comparative: "worse",
    superlative: "worst",
    isGradable: true,
    translation: {
        default: "悪い",
        predicative: "悪い",
        past: "悪かった",
        predNeg: "悪くない",
        pastNeg: "悪くなかった",
        predQ: "悪いのか",
        pastQ: "悪かったのか"
    }
};

const configSmall: AdjectiveConfig = {
    id: "adjective_small",
    base: "small",
    comparative: "smaller",
    superlative: "smallest",
    isGradable: true,
    translation: {
        default: "小さい",
        predicative: "小さい",
        past: "小さかった",
        predNeg: "小さくない",
        pastNeg: "小さくなかった",
        predQ: "小さいのか",
        pastQ: "小さかったのか"
    }
};

const configHot: AdjectiveConfig = {
    id: "adjective_hot",
    base: "hot",
    comparative: "hotter",
    superlative: "hottest",
    isGradable: true,
    translation: {
        default: "暑い",
        predicative: "暑い",
        past: "暑かった",
        predNeg: "暑くない",
        pastNeg: "暑くなかった",
        predQ: "暑いのか",
        pastQ: "暑かったのか"
    }
};

const configCold: AdjectiveConfig = {
    id: "adjective_cold",
    base: "cold",
    comparative: "colder",
    superlative: "coldest",
    isGradable: true,
    translation: {
        default: "寒い",
        predicative: "寒い",
        past: "寒かった",
        predNeg: "寒くない",
        pastNeg: "寒くなかった",
        predQ: "寒いのか",
        pastQ: "寒かったのか"
    }
};

const configDelicious: AdjectiveConfig = {
    id: "adjective_delicious",
    base: "delicious",
    comparative: "more delicious",
    superlative: "most delicious",
    isGradable: true,
    translation: {
        default: "美味しい",
        predicative: "美味しい",
        past: "美味しかった",
        predNeg: "美味しくない",
        pastNeg: "美味しくなかった",
        predQ: "美味しいのか",
        pastQ: "美味しかったのか"
    }
};

const configHappy: AdjectiveConfig = {
    id: "adjective_happy",
    base: "happy",
    comparative: "happier",
    superlative: "happiest",
    isGradable: true,
    translation: {
        default: "幸せな",
        predicative: "幸せだ",
        past: "幸せだった",
        predNeg: "幸せではない",
        pastNeg: "幸せではなかった",
        predQ: "幸せなのか",
        pastQ: "幸せだったのか"
    }
};

const configFun: AdjectiveConfig = {
    id: "adjective_fun",
    base: "fun",
    comparative: "more fun",
    superlative: "most fun",
    isGradable: true,
    translation: {
        default: "楽しい",
        predicative: "楽しい",
        past: "楽しかった",
        predNeg: "楽しくない",
        pastNeg: "楽しくなかった",
        predQ: "楽しいのか",
        pastQ: "楽しかったのか"
    }
};

const configClean: AdjectiveConfig = {
    id: "adjective_clean",
    base: "clean",
    comparative: "cleaner",
    superlative: "cleanest",
    isGradable: true,
    translation: {
        default: "きれいな",
        predicative: "きれいだ",
        past: "きれいだった",
        predNeg: "きれいではない",
        pastNeg: "きれいではなかった",
        predQ: "きれいなのか",
        pastQ: "きれいだったのか"
    }
};

const configBusy: AdjectiveConfig = {
    id: "adjective_busy",
    base: "busy",
    comparative: "busier",
    superlative: "busiest",
    isGradable: true,
    translation: {
        default: "忙しい",
        predicative: "忙しい",
        past: "忙しかった",
        predNeg: "忙しくない",
        pastNeg: "忙しくなかった",
        predQ: "忙しいのか",
        pastQ: "忙しかったのか"
    }
};

const configComfortable: AdjectiveConfig = {
    id: "adjective_comfortable",
    base: "comfortable",
    comparative: "more comfortable",
    superlative: "most comfortable",
    isGradable: true,
    translation: {
        default: "快適な",
        predicative: "快適だ",
        past: "快適だった",
        predNeg: "快適ではない",
        pastNeg: "快適ではなかった",
        predQ: "快適なのか",
        pastQ: "快適だったのか"
    }
};

const configCheap: AdjectiveConfig = {
    id: "adjective_cheap",
    base: "cheap",
    comparative: "cheaper",
    superlative: "cheapest",
    isGradable: true,
    translation: {
        default: "安い",
        predicative: "安い",
        past: "安かった",
        predNeg: "安くない",
        pastNeg: "安くなかった",
        predQ: "安いのか",
        pastQ: "安かったのか"
    }
};

const configSmart: AdjectiveConfig = {
    id: "adjective_smart",
    base: "smart",
    comparative: "smarter",
    superlative: "smartest",
    isGradable: true,
    translation: {
        default: "賢い",
        predicative: "賢い",
        past: "賢かった",
        predNeg: "賢くない",
        pastNeg: "賢くなかった",
        predQ: "賢いのか",
        pastQ: "賢かったのか"
    }
};

const configEasy: AdjectiveConfig = {
    id: "adjective_easy",
    base: "easy",
    comparative: "easier",
    superlative: "easiest",
    isGradable: true,
    translation: {
        default: "簡単な",
        predicative: "簡単だ",
        past: "簡単だった",
        predNeg: "簡単ではない",
        pastNeg: "簡単ではなかった",
        predQ: "簡単なのか",
        pastQ: "簡単だったのか"
    }
};

const configDifficult: AdjectiveConfig = {
    id: "adjective_difficult",
    base: "difficult",
    comparative: "more difficult",
    superlative: "most difficult",
    isGradable: true,
    translation: {
        default: "難しい",
        predicative: "難しい",
        past: "難しかった",
        predNeg: "難しくない",
        pastNeg: "難しくなかった",
        predQ: "難しいのか",
        pastQ: "難しかったのか"
    }
};

const configImportant: AdjectiveConfig = {
    id: "adjective_important",
    base: "important",
    comparative: "more important",
    superlative: "most important",
    isGradable: true,
    translation: {
        default: "重要な",
        predicative: "重要だ",
        past: "重要だった",
        predNeg: "重要ではない",
        pastNeg: "重要ではなかった",
        predQ: "重要なのか",
        pastQ: "重要だったのか"
    }
};

const configProfessional: AdjectiveConfig = {
    id: "adjective_professional",
    base: "professional",
    comparative: "more professional",
    superlative: "most professional",
    isGradable: true,
    translation: {
        default: "専門的な",
        predicative: "専門的だ",
        past: "専門的だった",
        predNeg: "専門的ではない",
        pastNeg: "専門的ではなかった",
        predQ: "専門的なのか",
        pastQ: "専門的だったのか"
    }
};

const configEfficient: AdjectiveConfig = {
    id: "adjective_efficient",
    base: "efficient",
    comparative: "more efficient",
    superlative: "most efficient",
    isGradable: true,
    translation: {
        default: "効率的な",
        predicative: "効率的だ",
        past: "効率的だった",
        predNeg: "効率的ではない",
        pastNeg: "効率的ではなかった",
        predQ: "効率的なのか",
        pastQ: "効率的だったのか"
    }
};

const configAvailable: AdjectiveConfig = {
    id: "adjective_available",
    base: "available",
    comparative: "more available",
    superlative: "most available",
    isGradable: true,
    translation: {
        default: "利用可能な",
        predicative: "利用可能だ",
        past: "利用可能だった",
        predNeg: "利用可能ではない",
        pastNeg: "利用可能ではなかった",
        predQ: "利用可能なのか",
        pastQ: "利用可能だったのか"
    }
};

const configSerious: AdjectiveConfig = {
    id: "adjective_serious",
    base: "serious",
    comparative: "more serious",
    superlative: "most serious",
    isGradable: true,
    translation: {
        default: "まじめな",
        predicative: "まじめだ",
        past: "まじめだった",
        predNeg: "まじめではない",
        pastNeg: "まじめではなかった",
        predQ: "まじめなのか",
        pastQ: "まじめだったのか"
    }
};

const configLong: AdjectiveConfig = {
    id: "adjective_long",
    base: "long",
    comparative: "longer",
    superlative: "longest",
    isGradable: true,
    translation: {
        default: "長い",
        predicative: "長い",
        past: "長かった",
        predNeg: "長くない",
        pastNeg: "長くなかった",
        predQ: "長いのか",
        pastQ: "長かったのか"
    }
};

const configSafe: AdjectiveConfig = {
    id: "adjective_safe",
    base: "safe",
    comparative: "safer",
    superlative: "safest",
    isGradable: true,
    translation: {
        default: "安全な",
        predicative: "安全だ",
        past: "安全だった",
        predNeg: "安全ではない",
        pastNeg: "安全ではなかった",
        predQ: "安全なのか",
        pastQ: "安全だったのか"
    }
};

const configCrowded: AdjectiveConfig = {
    id: "adjective_crowded",
    base: "crowded",
    comparative: "more crowded",
    superlative: "most crowded",
    isGradable: true,
    translation: {
        default: "混んでいる",
        predicative: "混んでいる",
        past: "混んでいた",
        predNeg: "混んでいない",
        pastNeg: "混んでいなかった",
        predQ: "混んでいるのか",
        pastQ: "混んでいたのか"
    }
};

const configExpensive: AdjectiveConfig = {
    id: "adjective_expensive",
    base: "expensive",
    comparative: "more expensive",
    superlative: "most expensive",
    isGradable: true,
    translation: {
        default: "高い",
        predicative: "高い",
        past: "高かった",
        predNeg: "高くない",
        pastNeg: "高くなかった",
        predQ: "高いのか",
        pastQ: "高かったのか"
    }
};

const configHealthy: AdjectiveConfig = {
    id: "adjective_healthy",
    base: "healthy",
    comparative: "healthier",
    superlative: "healthiest",
    isGradable: true,
    translation: {
        default: "健康な",
        predicative: "健康だ",
        past: "健康だった",
        predNeg: "健康ではない",
        pastNeg: "健康ではなかった",
        predQ: "健康なのか",
        pastQ: "健康だったのか"
    }
};

const configTired: AdjectiveConfig = {
    id: "adjective_tired",
    base: "tired",
    comparative: "more tired",
    superlative: "most tired",
    isGradable: true,
    translation: {
        default: "疲れている",
        predicative: "疲れている",
        past: "疲れていた",
        predNeg: "疲れていない",
        pastNeg: "疲れていなかった",
        predQ: "疲れているのか",
        pastQ: "疲れていたのか"
    }
};

const configSick: AdjectiveConfig = {
    id: "adjective_sick",
    base: "sick",
    comparative: "sicker",
    superlative: "sickest",
    isGradable: true,
    translation: {
        default: "病気の",
        predicative: "病気だ",
        past: "病気だった",
        predNeg: "病気ではない",
        pastNeg: "病気ではなかった",
        predQ: "病気なのか",
        pastQ: "病気だったのか"
    }
};

const configStrong: AdjectiveConfig = {
    id: "adjective_strong",
    base: "strong",
    comparative: "stronger",
    superlative: "strongest",
    isGradable: true,
    translation: {
        default: "強い",
        predicative: "強い",
        past: "強かった",
        predNeg: "強くない",
        pastNeg: "強くなかった",
        predQ: "強いのか",
        pastQ: "強かったのか"
    }
};

const configSpicy: AdjectiveConfig = {
    id: "adjective_spicy",
    base: "spicy",
    comparative: "spicier",
    superlative: "spiciest",
    isGradable: true,
    translation: {
        default: "辛い",
        predicative: "辛い",
        past: "辛かった",
        predNeg: "辛くない",
        pastNeg: "辛くなかった",
        predQ: "辛いのか",
        pastQ: "辛かったのか"
    }
};

const configSweet: AdjectiveConfig = {
    id: "adjective_sweet",
    base: "sweet",
    comparative: "sweeter",
    superlative: "sweetest",
    isGradable: true,
    translation: {
        default: "甘い",
        predicative: "甘い",
        past: "甘かった",
        predNeg: "甘くない",
        pastNeg: "甘くなかった",
        predQ: "甘いのか",
        pastQ: "甘かったのか"
    }
};

const configSalty: AdjectiveConfig = {
    id: "adjective_salty",
    base: "salty",
    comparative: "saltier",
    superlative: "saltiest",
    isGradable: true,
    translation: {
        default: "しょっぱい",
        predicative: "しょっぱい",
        past: "しょっぱかった",
        predNeg: "しょっぱくない",
        pastNeg: "しょっぱくなかった",
        predQ: "しょっぱいのか",
        pastQ: "しょっぱかったのか"
    }
};

const configFresh: AdjectiveConfig = {
    id: "adjective_fresh",
    base: "fresh",
    comparative: "fresher",
    superlative: "freshest",
    isGradable: true,
    translation: {
        default: "新鮮な",
        predicative: "新鮮だ",
        past: "新鮮だった",
        predNeg: "新鮮ではない",
        pastNeg: "新鮮ではなかった",
        predQ: "新鮮なのか",
        pastQ: "新鮮だったのか"
    }
};

const configGreen: AdjectiveConfig = {
    id: "adjective_green",
    base: "green",
    comparative: "greener",
    superlative: "greenest",
    isGradable: true,
    translation: {
        default: "緑の",
        predicative: "緑だ",
        past: "緑だった",
        predNeg: "緑ではない",
        pastNeg: "緑ではなかった",
        predQ: "緑なのか",
        pastQ: "緑だったのか"
    }
};

const configQuiet: AdjectiveConfig = {
    id: "adjective_quiet",
    base: "quiet",
    comparative: "quieter",
    superlative: "quietest",
    isGradable: true,
    translation: {
        default: "静かな",
        predicative: "静かだ",
        past: "静かだった",
        predNeg: "静かではない",
        pastNeg: "静かではなかった",
        predQ: "静かなのか",
        pastQ: "静かだったのか"
    }
};

const configNatural: AdjectiveConfig = {
    id: "adjective_natural",
    base: "natural",
    comparative: "more natural",
    superlative: "most natural",
    isGradable: true,
    translation: {
        default: "自然な",
        predicative: "自然だ",
        past: "自然だった",
        predNeg: "自然ではない",
        pastNeg: "自然ではなかった",
        predQ: "自然なのか",
        pastQ: "自然だったのか"
    }
};

const configBeautiful: AdjectiveConfig = {
    id: "adjective_beautiful",
    base: "beautiful",
    comparative: "more beautiful",
    superlative: "most beautiful",
    isGradable: true,
    translation: {
        default: "美しい",
        predicative: "美しい",
        past: "美しかった",
        predNeg: "美しくない",
        pastNeg: "美しくなかった",
        predQ: "美しいのか",
        pastQ: "美しかったのか"
    }
};

const configModern: AdjectiveConfig = {
    id: "adjective_modern",
    base: "modern",
    comparative: "more modern",
    superlative: "most modern",
    isGradable: true,
    translation: {
        default: "現代的な",
        predicative: "現代的だ",
        past: "現代的だった",
        predNeg: "現代的ではない",
        pastNeg: "現代的ではなかった",
        predQ: "現代的なのか",
        pastQ: "現代的だったのか"
    }
};

const configDigital: AdjectiveConfig = {
    id: "adjective_digital",
    base: "digital",
    comparative: "more digital",
    superlative: "most digital",
    isGradable: true,
    translation: {
        default: "デジタルな",
        predicative: "デジタルだ",
        past: "デジタルだった",
        predNeg: "デジタルではない",
        pastNeg: "デジタルではなかった",
        predQ: "デジタルなのか",
        pastQ: "デジタルだったのか"
    }
};

const configConvenient: AdjectiveConfig = {
    id: "adjective_convenient",
    base: "convenient",
    comparative: "more convenient",
    superlative: "most convenient",
    isGradable: true,
    translation: {
        default: "便利な",
        predicative: "便利だ",
        past: "便利だった",
        predNeg: "便利ではない",
        pastNeg: "便利ではなかった",
        predQ: "便利なのか",
        pastQ: "便利だったのか"
    }
};

const configActive: AdjectiveConfig = {
    id: "adjective_active",
    base: "active",
    comparative: "more active",
    superlative: "most active",
    isGradable: true,
    translation: {
        default: "活動的な",
        predicative: "活動的だ",
        past: "活動的だった",
        predNeg: "活動的ではない",
        pastNeg: "活動的ではなかった",
        predQ: "活動的なのか",
        pastQ: "活動的だったのか"
    }
};

const configCompetitive: AdjectiveConfig = {
    id: "adjective_competitive",
    base: "competitive",
    comparative: "more competitive",
    superlative: "most competitive",
    isGradable: true,
    translation: {
        default: "競争的な",
        predicative: "競争的だ",
        past: "競争的だった",
        predNeg: "競争的ではない",
        pastNeg: "競争的ではなかった",
        predQ: "競争的なのか",
        pastQ: "競争的だったのか"
    }
};

const configYoung: AdjectiveConfig = {
    id: "adjective_young",
    base: "young",
    comparative: "younger",
    superlative: "youngest",
    isGradable: true,
    translation: {
        default: "若い",
        predicative: "若い",
        past: "若かった",
        predNeg: "若くない",
        pastNeg: "若くなかった",
        predQ: "若いのか",
        pastQ: "若かったのか"
    }
};

const configDifferent: AdjectiveConfig = {
    id: "adjective_different",
    base: "different",
    comparative: "more different",
    superlative: "most different",
    isGradable: true,
    translation: {
        default: "違う",
        predicative: "違う",
        past: "違った",
        predNeg: "違わない",
        pastNeg: "違わなかった",
        predQ: "違うのか",
        pastQ: "違ったのか"
    }
};

const configEarly: AdjectiveConfig = {
    id: "adjective_early",
    base: "early",
    comparative: "earlier",
    superlative: "earliest",
    isGradable: true,
    translation: {
        default: "早い",
        predicative: "早い",
        past: "早かった",
        predNeg: "早くない",
        pastNeg: "早くなかった",
        predQ: "早いのか",
        pastQ: "早かったのか"
    }
};

const configLate: AdjectiveConfig = {
    id: "adjective_late",
    base: "late",
    comparative: "later",
    superlative: "latest",
    isGradable: true,
    translation: {
        default: "遅い",
        predicative: "遅い",
        past: "遅かった",
        predNeg: "遅くない",
        pastNeg: "遅くなかった",
        predQ: "遅いのか",
        pastQ: "遅かったのか"
    }
};

const configHigh: AdjectiveConfig = {
    id: "adjective_high",
    base: "high",
    comparative: "higher",
    superlative: "highest",
    isGradable: true,
    translation: {
        default: "高い",
        predicative: "高い",
        past: "高かった",
        predNeg: "高くない",
        pastNeg: "高くなかった",
        predQ: "高いのか",
        pastQ: "高かったのか"
    }
};

const configLow: AdjectiveConfig = {
    id: "adjective_low",
    base: "low",
    comparative: "lower",
    superlative: "lowest",
    isGradable: true,
    translation: {
        default: "低い",
        predicative: "低い",
        past: "低かった",
        predNeg: "低くない",
        pastNeg: "低くなかった",
        predQ: "低いのか",
        pastQ: "低かったのか"
    }
};

const configShort: AdjectiveConfig = {
    id: "adjective_short",
    base: "short",
    comparative: "shorter",
    superlative: "shortest",
    isGradable: true,
    translation: {
        default: "短い",
        predicative: "短い",
        past: "短かった",
        predNeg: "短くない",
        pastNeg: "短くなかった",
        predQ: "短いのか",
        pastQ: "短かったのか"
    }
};

const configTall: AdjectiveConfig = {
    id: "adjective_tall",
    base: "tall",
    comparative: "taller",
    superlative: "tallest",
    isGradable: true,
    translation: {
        default: "背が高い",
        predicative: "背が高い",
        past: "背が高かった",
        predNeg: "背が高くない",
        pastNeg: "背が高くなかった",
        predQ: "背が高いのか",
        pastQ: "背が高かったのか"
    }
};

const configNarrow: AdjectiveConfig = {
    id: "adjective_narrow",
    base: "narrow",
    comparative: "narrower",
    superlative: "narrowest",
    isGradable: true,
    translation: {
        default: "狭い",
        predicative: "狭い",
        past: "狭かった",
        predNeg: "狭くない",
        pastNeg: "狭くなかった",
        predQ: "狭いのか",
        pastQ: "狭かったのか"
    }
};

const configWide: AdjectiveConfig = {
    id: "adjective_wide",
    base: "wide",
    comparative: "wider",
    superlative: "widest",
    isGradable: true,
    translation: {
        default: "広い",
        predicative: "広い",
        past: "広かった",
        predNeg: "広くない",
        pastNeg: "広くなかった",
        predQ: "広いのか",
        pastQ: "広かったのか"
    }
};

const configBright: AdjectiveConfig = {
    id: "adjective_bright",
    base: "bright",
    comparative: "brighter",
    superlative: "brightest",
    isGradable: true,
    translation: {
        default: "明るい",
        predicative: "明るい",
        past: "明るかった",
        predNeg: "明るくない",
        pastNeg: "明るくなかった",
        predQ: "明るいのか",
        pastQ: "明るかったのか"
    }
};

const configDark: AdjectiveConfig = {
    id: "adjective_dark",
    base: "dark",
    comparative: "darker",
    superlative: "darkest",
    isGradable: true,
    translation: {
        default: "暗い",
        predicative: "暗い",
        past: "暗かった",
        predNeg: "暗くない",
        pastNeg: "暗くなかった",
        predQ: "暗いのか",
        pastQ: "暗かったのか"
    }
};

const configDry: AdjectiveConfig = {
    id: "adjective_dry",
    base: "dry",
    comparative: "drier",
    superlative: "driest",
    isGradable: true,
    translation: {
        default: "乾いた",
        predicative: "乾いている",
        past: "乾いていた",
        predNeg: "乾いていない",
        pastNeg: "乾いていなかった",
        predQ: "乾いているのか",
        pastQ: "乾いていたのか"
    }
};

const configWet: AdjectiveConfig = {
    id: "adjective_wet",
    base: "wet",
    comparative: "wetter",
    superlative: "wettest",
    isGradable: true,
    translation: {
        default: "濡れた",
        predicative: "濡れている",
        past: "濡れていた",
        predNeg: "濡れていない",
        pastNeg: "濡れていなかった",
        predQ: "濡れているのか",
        pastQ: "濡れていたのか"
    }
};

const configSevere: AdjectiveConfig = {
    id: "adjective_severe",
    base: "severe",
    comparative: "more severe",
    superlative: "most severe",
    isGradable: true,
    translation: {
        default: "深刻な",
        predicative: "深刻だ",
        past: "深刻だった",
        predNeg: "深刻ではない",
        pastNeg: "深刻ではなかった",
        predQ: "深刻なのか",
        pastQ: "深刻だったのか"
    }
};

const configFriendly: AdjectiveConfig = {
    id: "adjective_friendly",
    base: "friendly",
    comparative: "friendlier",
    superlative: "friendliest",
    isGradable: true,
    translation: {
        default: "親しみやすい",
        predicative: "親しみやすい",
        past: "親しみやすかった",
        predNeg: "親しみやすくない",
        pastNeg: "親しみやすくなかった",
        predQ: "親しみやすいのか",
        pastQ: "親しみやすかったのか"
    }
};

const configPolite: AdjectiveConfig = {
    id: "adjective_polite",
    base: "polite",
    comparative: "politer",
    superlative: "politest",
    isGradable: true,
    translation: {
        default: "丁寧な",
        predicative: "丁寧だ",
        past: "丁寧だった",
        predNeg: "丁寧ではない",
        pastNeg: "丁寧ではなかった",
        predQ: "丁寧なのか",
        pastQ: "丁寧だったのか"
    }
};

const configHonest: AdjectiveConfig = {
    id: "adjective_honest",
    base: "honest",
    comparative: "more honest",
    superlative: "most honest",
    isGradable: true,
    translation: {
        default: "正直な",
        predicative: "正直だ",
        past: "正直だった",
        predNeg: "正直ではない",
        pastNeg: "正直ではなかった",
        predQ: "正直なのか",
        pastQ: "正直だったのか"
    }
};

const configCalm: AdjectiveConfig = {
    id: "adjective_calm",
    base: "calm",
    comparative: "calmer",
    superlative: "calmest",
    isGradable: true,
    translation: {
        default: "落ち着いた",
        predicative: "落ち着いている",
        past: "落ち着いていた",
        predNeg: "落ち着いていない",
        pastNeg: "落ち着いていなかった",
        predQ: "落ち着いているのか",
        pastQ: "落ち着いていたのか"
    }
};

const configAngry: AdjectiveConfig = {
    id: "adjective_angry",
    base: "angry",
    comparative: "angrier",
    superlative: "angriest",
    isGradable: true,
    translation: {
        default: "怒っている",
        predicative: "怒っている",
        past: "怒っていた",
        predNeg: "怒っていない",
        pastNeg: "怒っていなかった",
        predQ: "怒っているのか",
        pastQ: "怒っていたのか"
    }
};

const configAfraid: AdjectiveConfig = {
    id: "adjective_afraid",
    base: "afraid",
    comparative: "more afraid",
    superlative: "most afraid",
    isGradable: true,
    translation: {
        default: "怖い",
        predicative: "怖い",
        past: "怖かった",
        predNeg: "怖くない",
        pastNeg: "怖くなかった",
        predQ: "怖いのか",
        pastQ: "怖かったのか"
    }
};

const configExcitedAdj: AdjectiveConfig = {
    id: "adjective_excited",
    base: "excited",
    comparative: "more excited",
    superlative: "most excited",
    isGradable: true,
    translation: {
        default: "ワクワクした",
        predicative: "ワクワクしている",
        past: "ワクワクしていた",
        predNeg: "ワクワクしていない",
        pastNeg: "ワクワクしていなかった",
        predQ: "ワクワクしているのか",
        pastQ: "ワクワクしていたのか"
    }
};

const configDirty: AdjectiveConfig = {
    id: "adjective_dirty",
    base: "dirty",
    comparative: "dirtier",
    superlative: "dirtiest",
    isGradable: true,
    translation: {
        default: "汚い",
        predicative: "汚い",
        past: "汚かった",
        predNeg: "汚くない",
        pastNeg: "汚くなかった",
        predQ: "汚いのか",
        pastQ: "汚かったのか"
    }
};

const configWarm: AdjectiveConfig = {
    id: "adjective_warm",
    base: "warm",
    comparative: "warmer",
    superlative: "warmest",
    isGradable: true,
    translation: {
        default: "暖かい",
        predicative: "暖かい",
        past: "暖かかった",
        predNeg: "暖かくない",
        pastNeg: "暖かくなかった",
        predQ: "暖かいのか",
        pastQ: "暖かかったのか"
    }
};

const configCoolAdj: AdjectiveConfig = {
    id: "adjective_cool",
    base: "cool",
    comparative: "cooler",
    superlative: "coolest",
    isGradable: true,
    translation: {
        default: "涼しい",
        predicative: "涼しい",
        past: "涼しかった",
        predNeg: "涼しくない",
        pastNeg: "涼しくなかった",
        predQ: "涼しいのか",
        pastQ: "涼しかったのか"
    }
};

const configFree: AdjectiveConfig = {
    id: "adjective_free",
    base: "free",
    comparative: "freer",
    superlative: "freest",
    isGradable: true,
    translation: {
        default: "無料の",
        predicative: "無料だ",
        past: "無料だった",
        predNeg: "無料ではない",
        pastNeg: "無料ではなかった",
        predQ: "無料なのか",
        pastQ: "無料だったのか"
    }
};

const configFull: AdjectiveConfig = {
    id: "adjective_full",
    base: "full",
    comparative: "fuller",
    superlative: "fullest",
    isGradable: true,
    translation: {
        default: "いっぱいの",
        predicative: "いっぱいだ",
        past: "いっぱいだった",
        predNeg: "いっぱいではない",
        pastNeg: "いっぱいではなかった",
        predQ: "いっぱいなのか",
        pastQ: "いっぱいだったのか"
    }
};

const configEmpty: AdjectiveConfig = {
    id: "adjective_empty",
    base: "empty",
    comparative: "emptier",
    superlative: "emptiest",
    isGradable: true,
    translation: {
        default: "空の",
        predicative: "空だ",
        past: "空だった",
        predNeg: "空ではない",
        pastNeg: "空ではなかった",
        predQ: "空なのか",
        pastQ: "空だったのか"
    }
};

const configSimple: AdjectiveConfig = {
    id: "adjective_simple",
    base: "simple",
    comparative: "simpler",
    superlative: "simplest",
    isGradable: true,
    translation: {
        default: "シンプルな",
        predicative: "シンプルだ",
        past: "シンプルだった",
        predNeg: "シンプルではない",
        pastNeg: "シンプルではなかった",
        predQ: "シンプルなのか",
        pastQ: "シンプルだったのか"
    }
};

const configClearAdj: AdjectiveConfig = {
    id: "adjective_clear",
    base: "clear",
    comparative: "clearer",
    superlative: "clearest",
    isGradable: true,
    translation: {
        default: "明確な",
        predicative: "明確だ",
        past: "明確だった",
        predNeg: "明確ではない",
        pastNeg: "明確ではなかった",
        predQ: "明確なのか",
        pastQ: "明確だったのか"
    }
};

const configLight: AdjectiveConfig = {
    id: "adjective_light",
    base: "light",
    comparative: "lighter",
    superlative: "lightest",
    isGradable: true,
    translation: {
        default: "軽い",
        predicative: "軽い",
        past: "軽かった",
        predNeg: "軽くない",
        pastNeg: "軽くなかった",
        predQ: "軽いのか",
        pastQ: "軽かったのか"
    }
};

const configHeavy: AdjectiveConfig = {
    id: "adjective_heavy",
    base: "heavy",
    comparative: "heavier",
    superlative: "heaviest",
    isGradable: true,
    translation: {
        default: "重い",
        predicative: "重い",
        past: "重かった",
        predNeg: "重くない",
        pastNeg: "重くなかった",
        predQ: "重いのか",
        pastQ: "重かったのか"
    }
};

const configHungry: AdjectiveConfig = {
    id: "adjective_hungry",
    base: "hungry",
    comparative: "hungrier",
    superlative: "hungriest",
    isGradable: true,
    translation: {
        default: "お腹が空いている",
        predicative: "お腹が空いている",
        past: "お腹が空いていた",
        predNeg: "お腹が空いていない",
        pastNeg: "お腹が空いていなかった",
        predQ: "お腹が空いているのか",
        pastQ: "お腹が空いていたのか"
    }
};

const configThirsty: AdjectiveConfig = {
    id: "adjective_thirsty",
    base: "thirsty",
    comparative: "thirstier",
    superlative: "thirstiest",
    isGradable: true,
    translation: {
        default: "喉が渇いている",
        predicative: "喉が渇いている",
        past: "喉が渇いていた",
        predNeg: "喉が渇いていない",
        pastNeg: "喉が渇いていなかった",
        predQ: "喉が渇いているのか",
        pastQ: "喉が渇いていたのか"
    }
};

const configSleepy: AdjectiveConfig = {
    id: "adjective_sleepy",
    base: "sleepy",
    comparative: "sleepier",
    superlative: "sleepiest",
    isGradable: true,
    translation: {
        default: "眠い",
        predicative: "眠い",
        past: "眠かった",
        predNeg: "眠くない",
        pastNeg: "眠くなかった",
        predQ: "眠いのか",
        pastQ: "眠かったのか"
    }
};

const configBored: AdjectiveConfig = {
    id: "adjective_bored",
    base: "bored",
    comparative: "more bored",
    superlative: "most bored",
    isGradable: true,
    translation: {
        default: "退屈している",
        predicative: "退屈している",
        past: "退屈していた",
        predNeg: "退屈していない",
        pastNeg: "退屈していなかった",
        predQ: "退屈しているのか",
        pastQ: "退屈していたのか"
    }
};

const configNoisy: AdjectiveConfig = {
    id: "adjective_noisy",
    base: "noisy",
    comparative: "noisier",
    superlative: "noisiest",
    isGradable: true,
    translation: {
        default: "うるさい",
        predicative: "うるさい",
        past: "うるさかった",
        predNeg: "うるさくない",
        pastNeg: "うるさくなかった",
        predQ: "うるさいのか",
        pastQ: "うるさかったのか"
    }
};

const configWindy: AdjectiveConfig = {
    id: "adjective_windy",
    base: "windy",
    comparative: "windier",
    superlative: "windiest",
    isGradable: true,
    translation: {
        default: "風の強い",
        predicative: "風が強い",
        past: "風が強かった",
        predNeg: "風が強くない",
        pastNeg: "風が強くなかった",
        predQ: "風が強いのか",
        pastQ: "風が強かったのか"
    }
};

const configRainy: AdjectiveConfig = {
    id: "adjective_rainy",
    base: "rainy",
    comparative: "rainier",
    superlative: "rainiest",
    isGradable: true,
    translation: {
        default: "雨の",
        predicative: "雨が降っている",
        past: "雨が降っていた",
        predNeg: "雨が降っていない",
        pastNeg: "雨が降っていなかった",
        predQ: "雨が降っているのか",
        pastQ: "雨が降っていたのか"
    }
};

const configSunny: AdjectiveConfig = {
    id: "adjective_sunny",
    base: "sunny",
    comparative: "sunnier",
    superlative: "sunniest",
    isGradable: true,
    translation: {
        default: "晴れた",
        predicative: "晴れている",
        past: "晴れていた",
        predNeg: "晴れていない",
        pastNeg: "晴れていなかった",
        predQ: "晴れているのか",
        pastQ: "晴れていたのか"
    }
};

const configNice: AdjectiveConfig = {
    id: "adjective_nice",
    base: "nice",
    comparative: "nicer",
    superlative: "nicest",
    isGradable: true,
    translation: {
        default: "素敵な",
        predicative: "素敵だ",
        past: "素敵だった",
        predNeg: "素敵ではない",
        pastNeg: "素敵ではなかった",
        predQ: "素敵なのか",
        pastQ: "素敵だったのか"
    }
};

const configKindAdj: AdjectiveConfig = {
    id: "adjective_kind",
    base: "kind",
    comparative: "kinder",
    superlative: "kindest",
    isGradable: true,
    translation: {
        default: "親切な",
        predicative: "親切だ",
        past: "親切だった",
        predNeg: "親切ではない",
        pastNeg: "親切ではなかった",
        predQ: "親切なのか",
        pastQ: "親切だったのか"
    }
};

const configHelpful: AdjectiveConfig = {
    id: "adjective_helpful",
    base: "helpful",
    comparative: "more helpful",
    superlative: "most helpful",
    isGradable: true,
    translation: {
        default: "役に立つ",
        predicative: "役に立つ",
        past: "役に立った",
        predNeg: "役に立たない",
        pastNeg: "役に立たなかった",
        predQ: "役に立つのか",
        pastQ: "役に立ったのか"
    }
};

const configFunny: AdjectiveConfig = {
    id: "adjective_funny",
    base: "funny",
    comparative: "funnier",
    superlative: "funniest",
    isGradable: true,
    translation: {
        default: "おかしい",
        predicative: "おかしい",
        past: "おかしかった",
        predNeg: "おかしくない",
        pastNeg: "おかしくなかった",
        predQ: "おかしいのか",
        pastQ: "おかしかったのか"
    }
};

const configSad: AdjectiveConfig = {
    id: "adjective_sad",
    base: "sad",
    comparative: "sadder",
    superlative: "saddest",
    isGradable: true,
    translation: {
        default: "悲しい",
        predicative: "悲しい",
        past: "悲しかった",
        predNeg: "悲しくない",
        pastNeg: "悲しくなかった",
        predQ: "悲しいのか",
        pastQ: "悲しかったのか"
    }
};

const configReady: AdjectiveConfig = {
    id: "adjective_ready",
    base: "ready",
    comparative: "more ready",
    superlative: "most ready",
    isGradable: true,
    translation: {
        default: "準備ができた",
        predicative: "準備ができている",
        past: "準備ができていた",
        predNeg: "準備ができていない",
        pastNeg: "準備ができていなかった",
        predQ: "準備ができているのか",
        pastQ: "準備ができていたのか"
    }
};

const configQuickAdj: AdjectiveConfig = {
    id: "adjective_quick",
    base: "quick",
    comparative: "quicker",
    superlative: "quickest",
    isGradable: true,
    translation: {
        default: "速い",
        predicative: "速い",
        past: "速かった",
        predNeg: "速くない",
        pastNeg: "速くなかった",
        predQ: "速いのか",
        pastQ: "速かったのか"
    }
};

const configSlowAdj: AdjectiveConfig = {
    id: "adjective_slow",
    base: "slow",
    comparative: "slower",
    superlative: "slowest",
    isGradable: true,
    translation: {
        default: "遅い",
        predicative: "遅い",
        past: "遅かった",
        predNeg: "遅くない",
        pastNeg: "遅くなかった",
        predQ: "遅いのか",
        pastQ: "遅かったのか"
    }
};

const configWeak: AdjectiveConfig = {
    id: "adjective_weak",
    base: "weak",
    comparative: "weaker",
    superlative: "weakest",
    isGradable: true,
    translation: {
        default: "弱い",
        predicative: "弱い",
        past: "弱かった",
        predNeg: "弱くない",
        pastNeg: "弱くなかった",
        predQ: "弱いのか",
        pastQ: "弱かったのか"
    }
};

const configSoft: AdjectiveConfig = {
    id: "adjective_soft",
    base: "soft",
    comparative: "softer",
    superlative: "softest",
    isGradable: true,
    translation: {
        default: "柔らかい",
        predicative: "柔らかい",
        past: "柔らかかった",
        predNeg: "柔らかくない",
        pastNeg: "柔らかくなかった",
        predQ: "柔らかいのか",
        pastQ: "柔らかかったのか"
    }
};

const configHardAdj: AdjectiveConfig = {
    id: "adjective_hard",
    base: "hard",
    comparative: "harder",
    superlative: "hardest",
    isGradable: true,
    translation: {
        default: "固い",
        predicative: "固い",
        past: "固かった",
        predNeg: "固くない",
        pastNeg: "固くなかった",
        predQ: "固いのか",
        pastQ: "固かったのか"
    }
};

export const blockBig = generator.createAdjectiveBlock(configBig);
export const blockInteresting = generator.createAdjectiveBlock(configInteresting);
export const blockNew = generator.createAdjectiveBlock(configNew);
export const blockOld = generator.createAdjectiveBlock(configOld);
export const blockGood = generator.createAdjectiveBlock(configGood);
export const blockBad = generator.createAdjectiveBlock(configBad);
export const blockSmall = generator.createAdjectiveBlock(configSmall);
export const blockHot = generator.createAdjectiveBlock(configHot);
export const blockCold = generator.createAdjectiveBlock(configCold);
export const blockDelicious = generator.createAdjectiveBlock(configDelicious);
export const blockHappy = generator.createAdjectiveBlock(configHappy);
export const blockFun = generator.createAdjectiveBlock(configFun);
export const blockClean = generator.createAdjectiveBlock(configClean);
export const blockBusy = generator.createAdjectiveBlock(configBusy);
export const blockComfortable = generator.createAdjectiveBlock(configComfortable);
export const blockCheap = generator.createAdjectiveBlock(configCheap);
export const blockSmart = generator.createAdjectiveBlock(configSmart);
export const blockEasy = generator.createAdjectiveBlock(configEasy);
export const blockDifficult = generator.createAdjectiveBlock(configDifficult);
export const blockImportant = generator.createAdjectiveBlock(configImportant);
export const blockProfessional = generator.createAdjectiveBlock(configProfessional);
export const blockEfficient = generator.createAdjectiveBlock(configEfficient);
export const blockAvailable = generator.createAdjectiveBlock(configAvailable);
export const blockSerious = generator.createAdjectiveBlock(configSerious);
export const blockLong = generator.createAdjectiveBlock(configLong);
export const blockSafe = generator.createAdjectiveBlock(configSafe);
export const blockCrowded = generator.createAdjectiveBlock(configCrowded);
export const blockExpensive = generator.createAdjectiveBlock(configExpensive);
export const blockHealthy = generator.createAdjectiveBlock(configHealthy);
export const blockTired = generator.createAdjectiveBlock(configTired);
export const blockSick = generator.createAdjectiveBlock(configSick);
export const blockStrong = generator.createAdjectiveBlock(configStrong);
export const blockSpicy = generator.createAdjectiveBlock(configSpicy);
export const blockSweet = generator.createAdjectiveBlock(configSweet);
export const blockSalty = generator.createAdjectiveBlock(configSalty);
export const blockFresh = generator.createAdjectiveBlock(configFresh);
export const blockGreen = generator.createAdjectiveBlock(configGreen);
export const blockQuiet = generator.createAdjectiveBlock(configQuiet);
export const blockNatural = generator.createAdjectiveBlock(configNatural);
export const blockBeautiful = generator.createAdjectiveBlock(configBeautiful);
export const blockModern = generator.createAdjectiveBlock(configModern);
export const blockDigital = generator.createAdjectiveBlock(configDigital);
export const blockConvenient = generator.createAdjectiveBlock(configConvenient);
export const blockActive = generator.createAdjectiveBlock(configActive);
export const blockCompetitive = generator.createAdjectiveBlock(configCompetitive);
export const blockYoung = generator.createAdjectiveBlock(configYoung);
export const blockDifferent = generator.createAdjectiveBlock(configDifferent);
export const blockEarly = generator.createAdjectiveBlock(configEarly);
export const blockLate = generator.createAdjectiveBlock(configLate);
export const blockHigh = generator.createAdjectiveBlock(configHigh);
export const blockLow = generator.createAdjectiveBlock(configLow);
export const blockShort = generator.createAdjectiveBlock(configShort);
export const blockTall = generator.createAdjectiveBlock(configTall);
export const blockNarrow = generator.createAdjectiveBlock(configNarrow);
export const blockWide = generator.createAdjectiveBlock(configWide);
export const blockBright = generator.createAdjectiveBlock(configBright);
export const blockDark = generator.createAdjectiveBlock(configDark);
export const blockDry = generator.createAdjectiveBlock(configDry);
export const blockWet = generator.createAdjectiveBlock(configWet);
export const blockSevere = generator.createAdjectiveBlock(configSevere);
export const blockFriendly = generator.createAdjectiveBlock(configFriendly);
export const blockPolite = generator.createAdjectiveBlock(configPolite);
export const blockHonest = generator.createAdjectiveBlock(configHonest);
export const blockCalmAdj = generator.createAdjectiveBlock(configCalm);
export const blockAngry = generator.createAdjectiveBlock(configAngry);
export const blockAfraid = generator.createAdjectiveBlock(configAfraid);
export const blockExcitedAdj = generator.createAdjectiveBlock(configExcitedAdj);
export const blockDirty = generator.createAdjectiveBlock(configDirty);
export const blockWarm = generator.createAdjectiveBlock(configWarm);
export const blockCool = generator.createAdjectiveBlock(configCoolAdj);
export const blockFree = generator.createAdjectiveBlock(configFree);
export const blockFull = generator.createAdjectiveBlock(configFull);
export const blockEmpty = generator.createAdjectiveBlock(configEmpty);
export const blockSimple = generator.createAdjectiveBlock(configSimple);
export const blockClear = generator.createAdjectiveBlock(configClearAdj);
export const blockLight = generator.createAdjectiveBlock(configLight);
export const blockHeavy = generator.createAdjectiveBlock(configHeavy);
export const blockHungry = generator.createAdjectiveBlock(configHungry);
export const blockThirsty = generator.createAdjectiveBlock(configThirsty);
export const blockSleepy = generator.createAdjectiveBlock(configSleepy);
export const blockBored = generator.createAdjectiveBlock(configBored);
export const blockNoisy = generator.createAdjectiveBlock(configNoisy);
export const blockWindy = generator.createAdjectiveBlock(configWindy);
export const blockRainy = generator.createAdjectiveBlock(configRainy);
export const blockSunny = generator.createAdjectiveBlock(configSunny);
export const blockNice = generator.createAdjectiveBlock(configNice);
export const blockKindAdj = generator.createAdjectiveBlock(configKindAdj);
export const blockHelpful = generator.createAdjectiveBlock(configHelpful);
export const blockFunny = generator.createAdjectiveBlock(configFunny);
export const blockSad = generator.createAdjectiveBlock(configSad);
export const blockReady = generator.createAdjectiveBlock(configReady);
export const blockQuick = generator.createAdjectiveBlock(configQuickAdj);
export const blockSlowAdj = generator.createAdjectiveBlock(configSlowAdj);
export const blockWeak = generator.createAdjectiveBlock(configWeak);
export const blockSoft = generator.createAdjectiveBlock(configSoft);
export const blockHardAdj = generator.createAdjectiveBlock(configHardAdj);

const dailyLifeAdjectiveBlocks: Block[] = [
    blockClean,
    blockDirty,
    blockNice,
    blockKindAdj,
    blockHelpful,
    blockFriendly,
    blockPolite,
    blockHonest,
    blockReady,
    blockQuick,
    blockSlowAdj,
    blockBusy,
    blockComfortable,
    blockCheap,
    blockFree,
    blockEmpty,
    blockGood,
    blockBad,
    blockBig,
    blockSmall,
    blockNew,
    blockOld,
    blockDifferent,
    blockYoung,
    blockFunny,
    blockHappy,
    blockSad,
    blockCalmAdj,
    blockAngry,
    blockAfraid,
    blockExcitedAdj,
    blockNoisy,
];

const educationAdjectiveBlocks: Block[] = [
    blockSmart,
    blockEasy,
    blockDifficult,
    blockImportant,
    blockSimple,
    blockClear,
];

const workAdjectiveBlocks: Block[] = [
    blockProfessional,
    blockEfficient,
    blockAvailable,
    blockSerious,
    blockConvenient,
    blockEarly,
    blockLate,
    blockHigh,
    blockLow,
];

const travelAdjectiveBlocks: Block[] = [
    blockLong,
    blockShort,
    blockTall,
    blockSafe,
    blockCrowded,
    blockExpensive,
    blockLight,
    blockHeavy,
];

const healthAdjectiveBlocks: Block[] = [
    blockHealthy,
    blockWeak,
    blockHungry,
    blockThirsty,
    blockSleepy,
    blockBored,
    blockTired,
    blockSick,
    blockStrong,
    blockSevere,
];

const foodAdjectiveBlocks: Block[] = [
    blockDelicious,
    blockSpicy,
    blockSweet,
    blockSalty,
    blockFresh,
    blockFull,
];

const natureAdjectiveBlocks: Block[] = [
    blockGreen,
    blockWindy,
    blockRainy,
    blockSunny,
    blockNatural,
    blockBeautiful,
    blockQuiet,
    blockHot,
    blockWarm,
    blockCool,
    blockCold,
    blockSoft,
    blockHardAdj,
    blockBright,
    blockDark,
    blockDry,
    blockWet,
    blockNarrow,
    blockWide,
];

const technologyAdjectiveBlocks: Block[] = [
    blockModern,
    blockDigital,
];

const sportsAdjectiveBlocks: Block[] = [
    blockActive,
    blockCompetitive,
    blockFun,
];

export const allAdjectiveBlocks: Block[] = [
    ...dailyLifeAdjectiveBlocks,
    ...educationAdjectiveBlocks,
    ...workAdjectiveBlocks,
    ...travelAdjectiveBlocks,
    ...healthAdjectiveBlocks,
    ...foodAdjectiveBlocks,
    ...natureAdjectiveBlocks,
    ...technologyAdjectiveBlocks,
    ...sportsAdjectiveBlocks,
];
