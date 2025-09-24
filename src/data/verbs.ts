import { Generator, VerbConfig } from "@/grammar/generator";
import { Block } from "@/models/block";
import { det } from "@/models/grammar-entities";

const generator = new Generator();

const configHave: VerbConfig = {
    id: "have_verb",
    forms: { base: "have", es: "has", ed: "had", en: "had", ing: "having" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "持つ", imperfective: "持た", past: "持った" },
        past: { default: "持った" },
        progressive: { default: "持っているところ", nonPredicate: "持っている" },
        perfect: { default: "既に持ってい" },
        passive: { default: "持たれ" },
        noun: { default: "持つこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configDo: VerbConfig = {
    id: "do_verb",
    forms: { base: "do", es: "does", ed: "did", en: "done", ing: "doing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "する", imperfective: "し", past: "した" },
        past: { default: "した" },
        progressive: { default: "しているところ", nonPredicate: "している" },
        perfect: { default: "既にしてい" },
        passive: { default: "され" },
        noun: { default: "すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configSay: VerbConfig = {
    id: "say_verb",
    forms: { base: "say", es: "says", ed: "said", en: "said", ing: "saying" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "言う", imperfective: "言わ", past: "言った" },
        past: { default: "言った" },
        progressive: { default: "言っているところ", nonPredicate: "言っている" },
        perfect: { default: "既に言ってい" },
        passive: { default: "言われ" },
        noun: { default: "言うこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configGet: VerbConfig = {
    id: "get_verb",
    forms: { base: "get", es: "gets", ed: "got", en: "gotten", ing: "getting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "得る", imperfective: "得", past: "得た" },
        past: { default: "得た" },
        progressive: { default: "得ているところ", nonPredicate: "得ている" },
        perfect: { default: "既に得てい" },
        passive: { default: "得られ" },
        noun: { default: "得ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configMake: VerbConfig = {
    id: "make_verb",
    forms: { base: "make", es: "makes", ed: "made", en: "made", ing: "making" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "作る", imperfective: "作ら", past: "作った" },
        past: { default: "作った" },
        progressive: { default: "作っているところ", nonPredicate: "作っている" },
        perfect: { default: "既に作ってい" },
        passive: { default: "作られ" },
        noun: { default: "作ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configGo: VerbConfig = {
    id: "go_verb",
    forms: { base: "go", es: "goes", ed: "went", en: "gone", ing: "going" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "行く", imperfective: "行か", past: "行った" },
        past: { default: "行った" },
        progressive: { default: "行っているところ", nonPredicate: "行っている" },
        perfect: { default: "既に行ってい" },
        noun: { default: "行くこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configKnow: VerbConfig = {
    id: "know_verb",
    forms: { base: "know", es: "knows", ed: "knew", en: "known", ing: "knowing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "知る", imperfective: "知ら", past: "知った" },
        past: { default: "知った" },
        progressive: { default: "知っているところ", nonPredicate: "知っている" },
        perfect: { default: "既に知ってい" },
        passive: { default: "知られ" },
        noun: { default: "知ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configTake: VerbConfig = {
    id: "take_verb",
    forms: { base: "take", es: "takes", ed: "took", en: "taken", ing: "taking" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "取る", imperfective: "取ら", past: "取った" },
        past: { default: "取った" },
        progressive: { default: "取っているところ", nonPredicate: "取っている" },
        perfect: { default: "既に取ってい" },
        passive: { default: "取られ" },
        noun: { default: "取ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configSee: VerbConfig = {
    id: "see_verb",
    forms: { base: "see", es: "sees", ed: "saw", en: "seen", ing: "seeing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "見る", imperfective: "見", past: "見た" },
        past: { default: "見た" },
        progressive: { default: "見ているところ", nonPredicate: "見ている" },
        perfect: { default: "既に見てい" },
        passive: { default: "見られ" },
        noun: { default: "見ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configCome: VerbConfig = {
    id: "come_verb",
    forms: { base: "come", es: "comes", ed: "came", en: "come", ing: "coming" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "来る", imperfective: "来", past: "来た" },
        past: { default: "来た" },
        progressive: { default: "来ているところ", nonPredicate: "来ている" },
        perfect: { default: "既に来てい" },
        noun: { default: "来ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configThink: VerbConfig = {
    id: "think_verb",
    forms: { base: "think", es: "thinks", ed: "thought", en: "thought", ing: "thinking" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "考える", imperfective: "考え", past: "考えた" },
        past: { default: "考えた" },
        progressive: { default: "考えているところ", nonPredicate: "考えている" },
        perfect: { default: "既に考えてい" },
        passive: { default: "考えられ" },
        noun: { default: "考えること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configLook: VerbConfig = {
    id: "look_verb",
    forms: { base: "look", es: "looks", ed: "looked", en: "looked", ing: "looking" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "見る", imperfective: "見", past: "見た" },
        past: { default: "見た" },
        progressive: { default: "見ているところ", nonPredicate: "見ている" },
        perfect: { default: "既に見てい" },
        noun: { default: "見ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configWant: VerbConfig = {
    id: "want_verb",
    forms: { base: "want", es: "wants", ed: "wanted", en: "wanted", ing: "wanting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "が" }],
    transitive: true,
    translations: {
        present: { default: "欲しがる", imperfective: "欲しがら", past: "欲しがった" },
        past: { default: "欲しがった" },
        progressive: { default: "欲しがっているところ", nonPredicate: "欲しがっている" },
        perfect: { default: "既に欲しがってい" },
        passive: { default: "欲しがられ" },
        noun: { default: "欲しがること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configGive: VerbConfig = {
    id: "give_verb",
    forms: { base: "give", es: "gives", ed: "gave", en: "given", ing: "giving" },
    complements: [
        { expected: { head: { type: det, case: "acc" } }, particle: "に" },
        { expected: { head: { type: det, case: "acc" } }, particle: "を" }
    ],
    transitive: true,
    translations: {
        present: { default: "与える", imperfective: "与え", past: "与えた" },
        past: { default: "与えた" },
        progressive: { default: "与えているところ", nonPredicate: "与えている" },
        perfect: { default: "既に与えてい" },
        passive: { default: "与えられ" },
        noun: { default: "与えること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configUse: VerbConfig = {
    id: "use_verb",
    forms: { base: "use", es: "uses", ed: "used", en: "used", ing: "using" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "使う", imperfective: "使わ", past: "使った" },
        past: { default: "使った" },
        progressive: { default: "使っているところ", nonPredicate: "使っている" },
        perfect: { default: "既に使ってい" },
        passive: { default: "使われ" },
        noun: { default: "使うこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configFind: VerbConfig = {
    id: "find_verb",
    forms: { base: "find", es: "finds", ed: "found", en: "found", ing: "finding" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "見つける", imperfective: "見つけ", past: "見つけた" },
        past: { default: "見つけた" },
        progressive: { default: "見つけているところ", nonPredicate: "見つけている" },
        perfect: { default: "既に見つけてい" },
        passive: { default: "見つけられ" },
        noun: { default: "見つけること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configTell: VerbConfig = {
    id: "tell_verb",
    forms: { base: "tell", es: "tells", ed: "told", en: "told", ing: "telling" },
    complements: [
        { expected: { head: { type: det, case: "acc" } }, particle: "に" },
        { expected: { head: { type: det, case: "acc" } }, particle: "を" }
    ],
    transitive: true,
    translations: {
        present: { default: "教える", imperfective: "教え", past: "教えた" },
        past: { default: "教えた" },
        progressive: { default: "教えているところ", nonPredicate: "教えている" },
        perfect: { default: "既に教えてい" },
        passive: { default: "教えられ" },
        noun: { default: "教えること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configAsk: VerbConfig = {
    id: "ask_verb",
    forms: { base: "ask", es: "asks", ed: "asked", en: "asked", ing: "asking" },
    complements: [
        { expected: { head: { type: det, case: "acc" } }, particle: "に" },
        { expected: { head: { type: det, case: "acc" } }, particle: "を" }
    ],
    transitive: true,
    translations: {
        present: { default: "尋ねる", imperfective: "尋ね", past: "尋ねた" },
        past: { default: "尋ねた" },
        progressive: { default: "尋ねているところ", nonPredicate: "尋ねている" },
        perfect: { default: "既に尋ねてい" },
        passive: { default: "尋ねられ" },
        noun: { default: "尋ねること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configWork: VerbConfig = {
    id: "work_verb",
    forms: { base: "work", es: "works", ed: "worked", en: "worked", ing: "working" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "働く", imperfective: "働か", past: "働いた" },
        past: { default: "働いた" },
        progressive: { default: "働いているところ", nonPredicate: "働いている" },
        perfect: { default: "既に働いてい" },
        noun: { default: "働くこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configFeel: VerbConfig = {
    id: "feel_verb",
    forms: { base: "feel", es: "feels", ed: "felt", en: "felt", ing: "feeling" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "感じる", imperfective: "感じ", past: "感じた" },
        past: { default: "感じた" },
        progressive: { default: "感じているところ", nonPredicate: "感じている" },
        perfect: { default: "既に感じてい" },
        passive: { default: "感じられ" },
        noun: { default: "感じること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configTry: VerbConfig = {
    id: "try_verb",
    forms: { base: "try", es: "tries", ed: "tried", en: "tried", ing: "trying" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "試す", imperfective: "試さ", past: "試した" },
        past: { default: "試した" },
        progressive: { default: "試しているところ", nonPredicate: "試している" },
        perfect: { default: "既に試してい" },
        passive: { default: "試され" },
        noun: { default: "試すこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configLeave: VerbConfig = {
    id: "leave_verb",
    forms: { base: "leave", es: "leaves", ed: "left", en: "left", ing: "leaving" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "去る", imperfective: "去ら", past: "去った" },
        past: { default: "去った" },
        progressive: { default: "去っているところ", nonPredicate: "去っている" },
        perfect: { default: "既に去ってい" },
        passive: { default: "去られ" },
        noun: { default: "去ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configCall: VerbConfig = {
    id: "call_verb",
    forms: { base: "call", es: "calls", ed: "called", en: "called", ing: "calling" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "呼ぶ", imperfective: "呼ば", past: "呼んだ" },
        past: { default: "呼んだ" },
        progressive: { default: "呼んでいるところ", nonPredicate: "呼んでいる" },
        perfect: { default: "既に読んでい" },
        passive: { default: "呼ばれ" },
        noun: { default: "呼ぶこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configNeed: VerbConfig = {
    id: "need_verb",
    forms: { base: "need", es: "needs", ed: "needed", en: "needed", ing: "needing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "が" }],
    transitive: true,
    translations: {
        present: { default: "必要とする", imperfective: "必要とし", past: "必要とした" },
        past: { default: "必要とした" },
        progressive: { default: "必要としているところ", nonPredicate: "必要としている" },
        perfect: { default: "既に必要としてい" },
        passive: { default: "必要とされ" },
        noun: { default: "必要とすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configBecome: VerbConfig = {
    id: "become_verb",
    forms: { base: "become", es: "becomes", ed: "became", en: "become", ing: "becoming" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "なる", imperfective: "なら", past: "なった" },
        past: { default: "なった" },
        progressive: { default: "なっているところ", nonPredicate: "なっている" },
        perfect: { default: "既になってい" },
        noun: { default: "なること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configPut: VerbConfig = {
    id: "put_verb",
    forms: { base: "put", es: "puts", ed: "put", en: "put", ing: "putting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "置く", imperfective: "置か", past: "置いた" },
        past: { default: "置いた" },
        progressive: { default: "置いているところ", nonPredicate: "置いている" },
        perfect: { default: "既に置いてい" },
        passive: { default: "置かれ" },
        noun: { default: "置くこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configKeep: VerbConfig = {
    id: "keep_verb",
    forms: { base: "keep", es: "keeps", ed: "kept", en: "kept", ing: "keeping" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "保つ", imperfective: "保た", past: "保った" },
        past: { default: "保った" },
        progressive: { default: "保っているところ", nonPredicate: "保っている" },
        perfect: { default: "既に保ってい" },
        passive: { default: "保たれ" },
        noun: { default: "保つこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configBegin: VerbConfig = {
    id: "begin_verb",
    forms: { base: "begin", es: "begins", ed: "began", en: "begun", ing: "beginning" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "始める", imperfective: "始め", past: "始めた" },
        past: { default: "始めた" },
        progressive: { default: "始めているところ", nonPredicate: "始めている" },
        perfect: { default: "既に始めてい" },
        passive: { default: "始められ" },
        noun: { default: "始めること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configHelp: VerbConfig = {
    id: "help_verb",
    forms: { base: "help", es: "helps", ed: "helped", en: "helped", ing: "helping" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "助ける", imperfective: "助け", past: "助けた" },
        past: { default: "助けた" },
        progressive: { default: "助けているところ", nonPredicate: "助けている" },
        perfect: { default: "既に助けてい" },
        passive: { default: "助けられ" },
        noun: { default: "助けること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configShow: VerbConfig = {
    id: "show_verb",
    forms: { base: "show", es: "shows", ed: "showed", en: "shown", ing: "showing" },
    complements: [
        { expected: { head: { type: det, case: "acc" } }, particle: "に" },
        { expected: { head: { type: det, case: "acc" } }, particle: "を" }
    ],
    transitive: true,
    translations: {
        present: { default: "見せる", imperfective: "見せ", past: "見せた" },
        past: { default: "見せた" },
        progressive: { default: "見せているところ", nonPredicate: "見せている" },
        perfect: { default: "既に見せてい" },
        passive: { default: "見せられ" },
        noun: { default: "見せること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configHear: VerbConfig = {
    id: "hear_verb",
    forms: { base: "hear", es: "hears", ed: "heard", en: "heard", ing: "hearing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "聞く", imperfective: "聞か", past: "聞いた" },
        past: { default: "聞いた" },
        progressive: { default: "聞いているところ", nonPredicate: "聞いている" },
        perfect: { default: "既に聞いてい" },
        passive: { default: "聞かれ" },
        noun: { default: "聞くこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configPlay: VerbConfig = {
    id: "play_verb",
    forms: { base: "play", es: "plays", ed: "played", en: "played", ing: "playing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "遊ぶ", imperfective: "遊ば", past: "遊んだ" },
        past: { default: "遊んだ" },
        progressive: { default: "遊んでいるところ", nonPredicate: "遊んでいる" },
        perfect: { default: "既に遊んでい" },
        passive: { default: "遊ばれ" },
        noun: { default: "遊ぶこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configRun: VerbConfig = {
    id: "run_verb",
    forms: { base: "run", es: "runs", ed: "ran", en: "run", ing: "running" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "走る", imperfective: "走ら", past: "走った" },
        past: { default: "走った" },
        progressive: { default: "走っているところ", nonPredicate: "走っている" },
        perfect: { default: "既に走ってい" },
        noun: { default: "走ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configMove: VerbConfig = {
    id: "move_verb",
    forms: { base: "move", es: "moves", ed: "moved", en: "moved", ing: "moving" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "動かす", imperfective: "動かさ", past: "動かした" },
        past: { default: "動かした" },
        progressive: { default: "動かしているところ", nonPredicate: "動かしている" },
        perfect: { default: "既に動かしてい" },
        passive: { default: "動かされ" },
        noun: { default: "動かすこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configLive: VerbConfig = {
    id: "live_verb",
    forms: { base: "live", es: "lives", ed: "lived", en: "lived", ing: "living" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "住む", imperfective: "住ま", past: "住んだ" },
        past: { default: "住んだ" },
        progressive: { default: "住んでいるところ", nonPredicate: "住んでいる" },
        perfect: { default: "既に住んでい" },
        noun: { default: "住むこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configBelieve: VerbConfig = {
    id: "believe_verb",
    forms: { base: "believe", es: "believes", ed: "believed", en: "believed", ing: "believing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "信じる", imperfective: "信じ", past: "信じた" },
        past: { default: "信じた" },
        progressive: { default: "信じているところ", nonPredicate: "信じている" },
        perfect: { default: "既に信じてい" },
        passive: { default: "信じられ" },
        noun: { default: "信じること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configBring: VerbConfig = {
    id: "bring_verb",
    forms: { base: "bring", es: "brings", ed: "brought", en: "brought", ing: "bringing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "持ってくる", imperfective: "持ってこ", past: "持ってきた" },
        past: { default: "持ってきた" },
        progressive: { default: "持ってきているところ", nonPredicate: "持ってきている" },
        perfect: { default: "既に持ってきてい" },
        passive: { default: "持ってこられ" },
        noun: { default: "持ってくること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configHappen: VerbConfig = {
    id: "happen_verb",
    forms: { base: "happen", es: "happens", ed: "happened", en: "happened", ing: "happening" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "起こる", imperfective: "起こら", past: "起こった" },
        past: { default: "起こった" },
        progressive: { default: "起こっているところ", nonPredicate: "起こっている" },
        perfect: { default: "既に起こってい" },
        noun: { default: "起こること" }
    },
    gerundSubject: true,
    toSubject: true,
    color: "tomato",
};

const configWrite: VerbConfig = {
    id: "write_verb",
    forms: { base: "write", es: "writes", ed: "wrote", en: "written", ing: "writing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "書く", imperfective: "書か", past: "書いた" },
        past: { default: "書いた" },
        progressive: { default: "書いているところ", nonPredicate: "書いている" },
        perfect: { default: "既に書いてい" },
        passive: { default: "書かれ" },
        noun: { default: "書くこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configRead: VerbConfig = {
    id: "read_verb",
    forms: { base: "read", es: "reads", ed: "read", en: "read", ing: "reading" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "読む", imperfective: "読ま", past: "読んだ" },
        past: { default: "読んだ" },
        progressive: { default: "読んでいるところ", nonPredicate: "読んでいる" },
        perfect: { default: "既に読んでい" },
        passive: { default: "読まれ" },
        noun: { default: "読むこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configLike: VerbConfig = {
    id: "like_verb",
    forms: { base: "like", es: "likes", ed: "liked", en: "liked", ing: "liking" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "が" }],
    transitive: true,
    translations: {
        present: { default: "好む", imperfective: "好ま", past: "好んだ" },
        past: { default: "好んだ" },
        progressive: { default: "好んでいるところ", nonPredicate: "好んでいる" },
        perfect: { default: "既に好んでい" },
        passive: { default: "好まれ" },
        noun: { default: "好むこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configBuy: VerbConfig = {
    id: "buy_verb",
    forms: { base: "buy", es: "buys", ed: "bought", en: "bought", ing: "buying" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "買う", imperfective: "買わ", past: "買った" },
        past: { default: "買った" },
        progressive: { default: "買っているところ", nonPredicate: "買っている" },
        perfect: { default: "既に買ってい" },
        passive: { default: "買われ" },
        noun: { default: "買うこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configEat: VerbConfig = {
    id: "eat_verb",
    forms: { base: "eat", es: "eats", ed: "ate", en: "eaten", ing: "eating" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "食べる", imperfective: "食べ", past: "食べた" },
        past: { default: "食べた" },
        progressive: { default: "食べているところ", nonPredicate: "食べている" },
        perfect: { default: "既に食べてい" },
        passive: { default: "食べられ" },
        noun: { default: "食べること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configCover: VerbConfig = {
    id: "cover_verb",
    forms: { base: "cover", es: "covers", ed: "covered", en: "covered", ing: "covering" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "覆う", imperfective: "覆わ", past: "覆った" },
        past: { default: "覆った" },
        progressive: { default: "覆っているところ", nonPredicate: "覆っている" },
        perfect: { default: "既に覆ってい" },
        passive: { default: "覆われ" },
        noun: { default: "覆うこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configCatch: VerbConfig = {
    id: "catch_verb",
    forms: { base: "catch", es: "catches", ed: "caught", en: "caught", ing: "catching" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "捕まえる", imperfective: "捕まえ", past: "捕まえた" },
        past: { default: "捕まえた" },
        progressive: { default: "捕まえているところ", nonPredicate: "捕まえている" },
        perfect: { default: "既に捕まえてい" },
        passive: { default: "捕まえられ" },
        noun: { default: "捕まえること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configDraw: VerbConfig = {
    id: "draw_verb",
    forms: { base: "draw", es: "draws", ed: "drew", en: "drawn", ing: "drawing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "描く", imperfective: "描か", past: "描いた" },
        past: { default: "描いた" },
        progressive: { default: "描いているところ", nonPredicate: "描いている" },
        perfect: { default: "既に描いてい" },
        passive: { default: "描かれ" },
        noun: { default: "描くこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configChoose: VerbConfig = {
    id: "choose_verb",
    forms: { base: "choose", es: "chooses", ed: "chose", en: "chosen", ing: "choosing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "選ぶ", imperfective: "選ば", past: "選んだ" },
        past: { default: "選んだ" },
        progressive: { default: "選んでいるところ", nonPredicate: "選んでいる" },
        perfect: { default: "既に選んでい" },
        passive: { default: "選ばれ" },
        noun: { default: "選ぶこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configProvide: VerbConfig = {
    id: "provide_verb",
    forms: { base: "provide", es: "provides", ed: "provided", en: "provided", ing: "providing" },
    complements: [
        { expected: { head: { type: det, case: "acc" } }, particle: "に" },
        { expected: { head: { type: det, case: "acc" } }, particle: "を" }
    ],
    transitive: true,
    translations: {
        present: { default: "提供する", imperfective: "提供し", past: "提供した" },
        past: { default: "提供した" },
        progressive: { default: "提供しているところ", nonPredicate: "提供している" },
        perfect: { default: "既に提供してい" },
        passive: { default: "提供され" },
        noun: { default: "提供すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configSit: VerbConfig = {
    id: "sit_verb",
    forms: { base: "sit", es: "sits", ed: "sat", en: "sat", ing: "sitting" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "座る", imperfective: "座ら", past: "座った" },
        past: { default: "座った" },
        progressive: { default: "座っているところ", nonPredicate: "座っている" },
        perfect: { default: "既に座ってい" },
        noun: { default: "座ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configStand: VerbConfig = {
    id: "stand_verb",
    forms: { base: "stand", es: "stands", ed: "stood", en: "stood", ing: "standing" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "立つ", imperfective: "立た", past: "立った" },
        past: { default: "立った" },
        progressive: { default: "立っているところ", nonPredicate: "立っている" },
        perfect: { default: "既に立ってい" },
        noun: { default: "立つこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configLose: VerbConfig = {
    id: "lose_verb",
    forms: { base: "lose", es: "loses", ed: "lost", en: "lost", ing: "losing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "失う", imperfective: "失わ", past: "失った" },
        past: { default: "失った" },
        progressive: { default: "失っているところ", nonPredicate: "失っている" },
        perfect: { default: "既に失ってい" },
        passive: { default: "失われ" },
        noun: { default: "失うこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configPay: VerbConfig = {
    id: "pay_verb",
    forms: { base: "pay", es: "pays", ed: "paid", en: "paid", ing: "paying" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "支払う", imperfective: "支払わ", past: "支払った" },
        past: { default: "支払った" },
        progressive: { default: "支払っているところ", nonPredicate: "支払っている" },
        perfect: { default: "既に支払ってい" },
        passive: { default: "支払われ" },
        noun: { default: "支払うこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configMeet: VerbConfig = {
    id: "meet_verb",
    forms: { base: "meet", es: "meets", ed: "met", en: "met", ing: "meeting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "に" }],
    transitive: true,
    translations: {
        present: { default: "会う", imperfective: "会わ", past: "会った" },
        past: { default: "会った" },
        progressive: { default: "会っているところ", nonPredicate: "会っている" },
        perfect: { default: "既に会ってい" },
        passive: { default: "会われ" },
        noun: { default: "会うこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configInclude: VerbConfig = {
    id: "include_verb",
    forms: { base: "include", es: "includes", ed: "included", en: "included", ing: "including" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "含む", imperfective: "含", past: "含んだ" },
        past: { default: "含んだ" },
        progressive: { default: "含んでいるところ", nonPredicate: "含んでいる" },
        perfect: { default: "既に含んでい" },
        passive: { default: "含まれ" },
        noun: { default: "含むこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configContinue: VerbConfig = {
    id: "continue_verb",
    forms: { base: "continue", es: "continues", ed: "continued", en: "continued", ing: "continuing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "続ける", imperfective: "続け", past: "続けた" },
        past: { default: "続けた" },
        progressive: { default: "続けているところ", nonPredicate: "続けている" },
        perfect: { default: "既に続けてい" },
        passive: { default: "続けられ" },
        noun: { default: "続けること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configSet: VerbConfig = {
    id: "set_verb",
    forms: { base: "set", es: "sets", ed: "set", en: "set", ing: "setting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "設定する", imperfective: "設定し", past: "設定した" },
        past: { default: "設定した" },
        progressive: { default: "設定しているところ", nonPredicate: "設定している" },
        perfect: { default: "既に設定してい" },
        passive: { default: "設定され" },
        noun: { default: "設定すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configLearn: VerbConfig = {
    id: "learn_verb",
    forms: { base: "learn", es: "learns", ed: "learned", en: "learned", ing: "learning" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "学ぶ", imperfective: "学ば", past: "学んだ" },
        past: { default: "学んだ" },
        progressive: { default: "学んでいるところ", nonPredicate: "学んでいる" },
        perfect: { default: "既に学んでい" },
        passive: { default: "学ばれ" },
        noun: { default: "学ぶこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configChange: VerbConfig = {
    id: "change_verb",
    forms: { base: "change", es: "changes", ed: "changed", en: "changed", ing: "changing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "変える", imperfective: "変え", past: "変えた" },
        past: { default: "変えた" },
        progressive: { default: "変えているところ", nonPredicate: "変えている" },
        perfect: { default: "既に変えてい" },
        passive: { default: "変えられ" },
        noun: { default: "変えること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configLead: VerbConfig = {
    id: "lead_verb",
    forms: { base: "lead", es: "leads", ed: "led", en: "led", ing: "leading" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "導く", imperfective: "導か", past: "導いた" },
        past: { default: "導いた" },
        progressive: { default: "導いているところ", nonPredicate: "導いている" },
        perfect: { default: "既に導いてい" },
        passive: { default: "導かれ" },
        noun: { default: "導くこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configUnderstand: VerbConfig = {
    id: "understand_verb",
    forms: { base: "understand", es: "understands", ed: "understood", en: "understood", ing: "understanding" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "理解する", imperfective: "理解し", past: "理解した" },
        past: { default: "理解した" },
        progressive: { default: "理解しているところ", nonPredicate: "理解している" },
        perfect: { default: "既に理解してい" },
        passive: { default: "理解され" },
        noun: { default: "理解すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configWatch: VerbConfig = {
    id: "watch_verb",
    forms: { base: "watch", es: "watches", ed: "watched", en: "watched", ing: "watching" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "見る", imperfective: "見", past: "見た" },
        past: { default: "見た" },
        progressive: { default: "見ているところ", nonPredicate: "見ている" },
        perfect: { default: "既に見てい" },
        passive: { default: "見られ" },
        noun: { default: "見ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configFollow: VerbConfig = {
    id: "follow_verb",
    forms: { base: "follow", es: "follows", ed: "followed", en: "followed", ing: "following" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "に" }],
    transitive: true,
    translations: {
        present: { default: "従う", imperfective: "従わ", past: "従った" },
        past: { default: "従った" },
        progressive: { default: "従っているところ", nonPredicate: "従っている" },
        perfect: { default: "既に従ってい" },
        passive: { default: "従われ" },
        noun: { default: "従うこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configStop: VerbConfig = {
    id: "stop_verb",
    forms: { base: "stop", es: "stops", ed: "stopped", en: "stopped", ing: "stopping" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "止める", imperfective: "止め", past: "止めた" },
        past: { default: "止めた" },
        progressive: { default: "止めているところ", nonPredicate: "止めている" },
        perfect: { default: "既に止めてい" },
        passive: { default: "止められ" },
        noun: { default: "止めること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configCreate: VerbConfig = {
    id: "create_verb",
    forms: { base: "create", es: "creates", ed: "created", en: "created", ing: "creating" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "創造する", imperfective: "創造し", past: "創造した" },
        past: { default: "創造した" },
        progressive: { default: "創造しているところ", nonPredicate: "創造している" },
        perfect: { default: "既に創造してい" },
        passive: { default: "創造され" },
        noun: { default: "創造すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configSpeak: VerbConfig = {
    id: "speak_verb",
    forms: { base: "speak", es: "speaks", ed: "spoke", en: "spoken", ing: "speaking" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "話す", imperfective: "話さ", past: "話した" },
        past: { default: "話した" },
        progressive: { default: "話しているところ", nonPredicate: "話している" },
        perfect: { default: "既に話してい" },
        passive: { default: "話され" },
        noun: { default: "話すこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configAllow: VerbConfig = {
    id: "allow_verb",
    forms: { base: "allow", es: "allows", ed: "allowed", en: "allowed", ing: "allowing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "許す", imperfective: "許さ", past: "許した" },
        past: { default: "許した" },
        progressive: { default: "許しているところ", nonPredicate: "許している" },
        perfect: { default: "既に許してい" },
        passive: { default: "許され" },
        noun: { default: "許すこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configAdd: VerbConfig = {
    id: "add_verb",
    forms: { base: "add", es: "adds", ed: "added", en: "added", ing: "adding" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "加える", imperfective: "加え", past: "加えた" },
        past: { default: "加えた" },
        progressive: { default: "加えているところ", nonPredicate: "加えている" },
        perfect: { default: "既に加えてい" },
        passive: { default: "加えられ" },
        noun: { default: "加えること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configSpend: VerbConfig = {
    id: "spend_verb",
    forms: { base: "spend", es: "spends", ed: "spent", en: "spent", ing: "spending" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "費やす", imperfective: "費やさ", past: "費やした" },
        past: { default: "費やした" },
        progressive: { default: "費やしているところ", nonPredicate: "費やしている" },
        perfect: { default: "既に費やしてい" },
        passive: { default: "費やされ" },
        noun: { default: "費やすこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configGrow: VerbConfig = {
    id: "grow_verb",
    forms: { base: "grow", es: "grows", ed: "grew", en: "grown", ing: "growing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "育てる", imperfective: "育て", past: "育てた" },
        past: { default: "育てた" },
        progressive: { default: "育てているところ", nonPredicate: "育てている" },
        perfect: { default: "既に育ててい" },
        passive: { default: "育てられ" },
        noun: { default: "育てること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configOpen: VerbConfig = {
    id: "open_verb",
    forms: { base: "open", es: "opens", ed: "opened", en: "opened", ing: "opening" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "開ける", imperfective: "開け", past: "開けた" },
        past: { default: "開けた" },
        progressive: { default: "開けているところ", nonPredicate: "開けている" },
        perfect: { default: "既に開けてい" },
        passive: { default: "開けられ" },
        noun: { default: "開けること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configWalk: VerbConfig = {
    id: "walk_verb",
    forms: { base: "walk", es: "walks", ed: "walked", en: "walked", ing: "walking" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "歩く", imperfective: "歩か", past: "歩いた" },
        past: { default: "歩いた" },
        progressive: { default: "歩いているところ", nonPredicate: "歩いている" },
        perfect: { default: "既に歩いてい" },
        noun: { default: "歩くこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configWin: VerbConfig = {
    id: "win_verb",
    forms: { base: "win", es: "wins", ed: "won", en: "won", ing: "winning" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "に" }],
    transitive: true,
    translations: {
        present: { default: "勝つ", imperfective: "勝た", past: "勝った" },
        past: { default: "勝った" },
        progressive: { default: "勝っているところ", nonPredicate: "勝っている" },
        perfect: { default: "既に勝ってい" },
        passive: { default: "勝たれ" },
        noun: { default: "勝つこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configOffer: VerbConfig = {
    id: "offer_verb",
    forms: { base: "offer", es: "offers", ed: "offered", en: "offered", ing: "offering" },
    complements: [
        { expected: { head: { type: det, case: "acc" } }, particle: "に" },
        { expected: { head: { type: det, case: "acc" } }, particle: "を" }
    ],
    transitive: true,
    translations: {
        present: { default: "提供する", imperfective: "提供し", past: "提供した" },
        past: { default: "提供した" },
        progressive: { default: "提供しているところ", nonPredicate: "提供している" },
        perfect: { default: "既に提供してい" },
        passive: { default: "提供され" },
        noun: { default: "提供すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configRemember: VerbConfig = {
    id: "remember_verb",
    forms: { base: "remember", es: "remembers", ed: "remembered", en: "remembered", ing: "remembering" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "思い出す", imperfective: "思い出さ", past: "思い出した" },
        past: { default: "思い出した" },
        progressive: { default: "思い出しているところ", nonPredicate: "思い出している" },
        perfect: { default: "既に思い出してい" },
        passive: { default: "思い出され" },
        noun: { default: "思い出すこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configLove: VerbConfig = {
    id: "love_verb",
    forms: { base: "love", es: "loves", ed: "loved", en: "loved", ing: "loving" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "愛する", imperfective: "愛し", past: "愛した" },
        past: { default: "愛した" },
        progressive: { default: "愛しているところ", nonPredicate: "愛している" },
        perfect: { default: "既に愛してい" },
        passive: { default: "愛され" },
        noun: { default: "愛すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configConsider: VerbConfig = {
    id: "consider_verb",
    forms: { base: "consider", es: "considers", ed: "considered", en: "considered", ing: "considering" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "考慮する", imperfective: "考慮し", past: "考慮した" },
        past: { default: "考慮した" },
        progressive: { default: "考慮しているところ", nonPredicate: "考慮している" },
        perfect: { default: "既に考慮してい" },
        passive: { default: "考慮され" },
        noun: { default: "考慮すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configAppear: VerbConfig = {
    id: "appear_verb",
    forms: { base: "appear", es: "appears", ed: "appeared", en: "appeared", ing: "appearing" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "現れる", imperfective: "現れ", past: "現れた" },
        past: { default: "現れた" },
        progressive: { default: "現れているところ", nonPredicate: "現れている" },
        perfect: { default: "既に現れてい" },
        noun: { default: "現れること" }
    },
    gerundSubject: true,
    toSubject: true,
    color: "tomato",
};

const configWait: VerbConfig = {
    id: "wait_verb",
    forms: { base: "wait", es: "waits", ed: "waited", en: "waited", ing: "waiting" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "待つ", imperfective: "待た", past: "待った" },
        past: { default: "待った" },
        progressive: { default: "待っているところ", nonPredicate: "待っている" },
        perfect: { default: "既に待ってい" },
        noun: { default: "待つこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configServe: VerbConfig = {
    id: "serve_verb",
    forms: { base: "serve", es: "serves", ed: "served", en: "served", ing: "serving" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "に" }],
    transitive: true,
    translations: {
        present: { default: "仕える", imperfective: "仕え", past: "仕えた" },
        past: { default: "仕えた" },
        progressive: { default: "仕えているところ", nonPredicate: "仕えている" },
        perfect: { default: "既に仕えてい" },
        passive: { default: "仕えられ" },
        noun: { default: "仕えること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configDie: VerbConfig = {
    id: "die_verb",
    forms: { base: "die", es: "dies", ed: "died", en: "died", ing: "dying" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "死ぬ", imperfective: "死な", past: "死んだ" },
        past: { default: "死んだ" },
        progressive: { default: "死んでいるところ", nonPredicate: "死んでいる" },
        perfect: { default: "既に死んでい" },
        noun: { default: "死ぬこと" }
    },
    gerundSubject: true,
    toSubject: true,
    color: "tomato",
};

const configSend: VerbConfig = {
    id: "send_verb",
    forms: { base: "send", es: "sends", ed: "sent", en: "sent", ing: "sending" },
    complements: [
        { expected: { head: { type: det, case: "acc" } }, particle: "に" },
        { expected: { head: { type: det, case: "acc" } }, particle: "を" }
    ],
    transitive: true,
    translations: {
        present: { default: "送る", imperfective: "送ら", past: "送った" },
        past: { default: "送った" },
        progressive: { default: "送っているところ", nonPredicate: "送っている" },
        perfect: { default: "既に送ってい" },
        passive: { default: "送られ" },
        noun: { default: "送ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configExpect: VerbConfig = {
    id: "expect_verb",
    forms: { base: "expect", es: "expects", ed: "expected", en: "expected", ing: "expecting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "期待する", imperfective: "期待し", past: "期待した" },
        past: { default: "期待した" },
        progressive: { default: "期待しているところ", nonPredicate: "期待している" },
        perfect: { default: "既に期待してい" },
        passive: { default: "期待され" },
        noun: { default: "期待すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configBuild: VerbConfig = {
    id: "build_verb",
    forms: { base: "build", es: "builds", ed: "built", en: "built", ing: "building" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "建てる", imperfective: "建て", past: "建てた" },
        past: { default: "建てた" },
        progressive: { default: "建てているところ", nonPredicate: "建てている" },
        perfect: { default: "既に建ててい" },
        passive: { default: "建てられ" },
        noun: { default: "建てること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configStay: VerbConfig = {
    id: "stay_verb",
    forms: { base: "stay", es: "stays", ed: "stayed", en: "stayed", ing: "staying" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "滞在する", imperfective: "滞在し", past: "滞在した" },
        past: { default: "滞在した" },
        progressive: { default: "滞在しているところ", nonPredicate: "滞在している" },
        perfect: { default: "既に滞在してい" },
        noun: { default: "滞在すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configFall: VerbConfig = {
    id: "fall_verb",
    forms: { base: "fall", es: "falls", ed: "fell", en: "fallen", ing: "falling" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "落ちる", imperfective: "落ち", past: "落ちた" },
        past: { default: "落ちた" },
        progressive: { default: "落ちているところ", nonPredicate: "落ちている" },
        perfect: { default: "既に落ちてい" },
        noun: { default: "落ちること" }
    },
    gerundSubject: true,
    toSubject: true,
    color: "tomato",
};

const configCut: VerbConfig = {
    id: "cut_verb",
    forms: { base: "cut", es: "cuts", ed: "cut", en: "cut", ing: "cutting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "切る", imperfective: "切ら", past: "切った" },
        past: { default: "切った" },
        progressive: { default: "切っているところ", nonPredicate: "切っている" },
        perfect: { default: "既に切ってい" },
        passive: { default: "切られ" },
        noun: { default: "切ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configReach: VerbConfig = {
    id: "reach_verb",
    forms: { base: "reach", es: "reaches", ed: "reached", en: "reached", ing: "reaching" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "に" }],
    transitive: true,
    translations: {
        present: { default: "着く", imperfective: "着か", past: "着いた" },
        past: { default: "着いた" },
        progressive: { default: "着いているところ", nonPredicate: "着いている" },
        perfect: { default: "既に着いてい" },
        passive: { default: "着かれ" },
        noun: { default: "着くこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configKill: VerbConfig = {
    id: "kill_verb",
    forms: { base: "kill", es: "kills", ed: "killed", en: "killed", ing: "killing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "殺す", imperfective: "殺さ", past: "殺した" },
        past: { default: "殺した" },
        progressive: { default: "殺しているところ", nonPredicate: "殺している" },
        perfect: { default: "既に殺してい" },
        passive: { default: "殺され" },
        noun: { default: "殺すこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configRemain: VerbConfig = {
    id: "remain_verb",
    forms: { base: "remain", es: "remains", ed: "remained", en: "remained", ing: "remaining" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "残る", imperfective: "残ら", past: "残った" },
        past: { default: "残った" },
        progressive: { default: "残っているところ", nonPredicate: "残っている" },
        perfect: { default: "既に残ってい" },
        noun: { default: "残ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configSuggest: VerbConfig = {
    id: "suggest_verb",
    forms: { base: "suggest", es: "suggests", ed: "suggested", en: "suggested", ing: "suggesting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "提案する", imperfective: "提案し", past: "提案した" },
        past: { default: "提案した" },
        progressive: { default: "提案しているところ", nonPredicate: "提案している" },
        perfect: { default: "既に提案してい" },
        passive: { default: "提案され" },
        noun: { default: "提案すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configRaise: VerbConfig = {
    id: "raise_verb",
    forms: { base: "raise", es: "raises", ed: "raised", en: "raised", ing: "raising" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "上げる", imperfective: "上げ", past: "上げた" },
        past: { default: "上げた" },
        progressive: { default: "上げているところ", nonPredicate: "上げている" },
        perfect: { default: "既に上げてい" },
        passive: { default: "上げられ" },
        noun: { default: "上げること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configPass: VerbConfig = {
    id: "pass_verb",
    forms: { base: "pass", es: "passes", ed: "passed", en: "passed", ing: "passing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "渡す", imperfective: "渡さ", past: "渡した" },
        past: { default: "渡した" },
        progressive: { default: "渡しているところ", nonPredicate: "渡している" },
        perfect: { default: "既に渡してい" },
        passive: { default: "渡され" },
        noun: { default: "渡すこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configSell: VerbConfig = {
    id: "sell_verb",
    forms: { base: "sell", es: "sells", ed: "sold", en: "sold", ing: "selling" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "売る", imperfective: "売ら", past: "売った" },
        past: { default: "売った" },
        progressive: { default: "売っているところ", nonPredicate: "売っている" },
        perfect: { default: "既に売ってい" },
        passive: { default: "売られ" },
        noun: { default: "売ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configRequire: VerbConfig = {
    id: "require_verb",
    forms: { base: "require", es: "requires", ed: "required", en: "required", ing: "requiring" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "要求する", imperfective: "要求し", past: "要求した" },
        past: { default: "要求した" },
        progressive: { default: "要求しているところ", nonPredicate: "要求している" },
        perfect: { default: "既に要求してい" },
        passive: { default: "要求され" },
        noun: { default: "要求すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configReport: VerbConfig = {
    id: "report_verb",
    forms: { base: "report", es: "reports", ed: "reported", en: "reported", ing: "reporting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "報告する", imperfective: "報告し", past: "報告した" },
        past: { default: "報告した" },
        progressive: { default: "報告しているところ", nonPredicate: "報告している" },
        perfect: { default: "既に報告してい" },
        passive: { default: "報告され" },
        noun: { default: "報告すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configDecide: VerbConfig = {
    id: "decide_verb",
    forms: { base: "decide", es: "decides", ed: "decided", en: "decided", ing: "deciding" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "決める", imperfective: "決め", past: "決めた" },
        past: { default: "決めた" },
        progressive: { default: "決めているところ", nonPredicate: "決めている" },
        perfect: { default: "既に決めてい" },
        passive: { default: "決められ" },
        noun: { default: "決めること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configPull: VerbConfig = {
    id: "pull_verb",
    forms: { base: "pull", es: "pulls", ed: "pulled", en: "pulled", ing: "pulling" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "引く", imperfective: "引か", past: "引いた" },
        past: { default: "引いた" },
        progressive: { default: "引いているところ", nonPredicate: "引いている" },
        perfect: { default: "既に引いてい" },
        passive: { default: "引かれ" },
        noun: { default: "引くこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configReturn: VerbConfig = {
    id: "return_verb",
    forms: { base: "return", es: "returns", ed: "returned", en: "returned", ing: "returning" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "返す", imperfective: "返さ", past: "返した" },
        past: { default: "返した" },
        progressive: { default: "返しているところ", nonPredicate: "返している" },
        perfect: { default: "既に返してい" },
        passive: { default: "返され" },
        noun: { default: "返すこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configExplain: VerbConfig = {
    id: "explain_verb",
    forms: { base: "explain", es: "explains", ed: "explained", en: "explained", ing: "explaining" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "説明する", imperfective: "説明し", past: "説明した" },
        past: { default: "説明した" },
        progressive: { default: "説明しているところ", nonPredicate: "説明している" },
        perfect: { default: "既に説明してい" },
        passive: { default: "説明され" },
        noun: { default: "説明すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configHope: VerbConfig = {
    id: "hope_verb",
    forms: { base: "hope", es: "hopes", ed: "hoped", en: "hoped", ing: "hoping" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "望む", imperfective: "望ま", past: "望んだ" },
        past: { default: "望んだ" },
        progressive: { default: "望んでいるところ", nonPredicate: "望んでいる" },
        perfect: { default: "既に望んでい" },
        noun: { default: "望むこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configDevelop: VerbConfig = {
    id: "develop_verb",
    forms: { base: "develop", es: "develops", ed: "developed", en: "developed", ing: "developing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "開発する", imperfective: "開発し", past: "開発した" },
        past: { default: "開発した" },
        progressive: { default: "開発しているところ", nonPredicate: "開発している" },
        perfect: { default: "既に開発してい" },
        passive: { default: "開発され" },
        noun: { default: "開発すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configCarry: VerbConfig = {
    id: "carry_verb",
    forms: { base: "carry", es: "carries", ed: "carried", en: "carried", ing: "carrying" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "運ぶ", imperfective: "運ば", past: "運んだ" },
        past: { default: "運んだ" },
        progressive: { default: "運んでいるところ", nonPredicate: "運んでいる" },
        perfect: { default: "既に運んでい" },
        passive: { default: "運ばれ" },
        noun: { default: "運ぶこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configBreak: VerbConfig = {
    id: "break_verb",
    forms: { base: "break", es: "breaks", ed: "broke", en: "broken", ing: "breaking" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "壊す", imperfective: "壊さ", past: "壊した" },
        past: { default: "壊した" },
        progressive: { default: "壊しているところ", nonPredicate: "壊している" },
        perfect: { default: "既に壊してい" },
        passive: { default: "壊され" },
        noun: { default: "壊すこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configReceive: VerbConfig = {
    id: "receive_verb",
    forms: { base: "receive", es: "receives", ed: "received", en: "received", ing: "receiving" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "受け取る", imperfective: "受け取ら", past: "受け取った" },
        past: { default: "受け取った" },
        progressive: { default: "受け取っているところ", nonPredicate: "受け取っている" },
        perfect: { default: "既に受け取ってい" },
        passive: { default: "受け取られ" },
        noun: { default: "受け取ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configAgree: VerbConfig = {
    id: "agree_verb",
    forms: { base: "agree", es: "agrees", ed: "agreed", en: "agreed", ing: "agreeing" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "同意する", imperfective: "同意し", past: "同意した" },
        past: { default: "同意した" },
        progressive: { default: "同意しているところ", nonPredicate: "同意している" },
        perfect: { default: "既に同意してい" },
        noun: { default: "同意すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configSupport: VerbConfig = {
    id: "support_verb",
    forms: { base: "support", es: "supports", ed: "supported", en: "supported", ing: "supporting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "支援する", imperfective: "支援し", past: "支援した" },
        past: { default: "支援した" },
        progressive: { default: "支援しているところ", nonPredicate: "支援している" },
        perfect: { default: "既に支援してい" },
        passive: { default: "支援され" },
        noun: { default: "支援すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configHit: VerbConfig = {
    id: "hit_verb",
    forms: { base: "hit", es: "hits", ed: "hit", en: "hit", ing: "hitting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "打つ", imperfective: "打た", past: "打った" },
        past: { default: "打った" },
        progressive: { default: "打っているところ", nonPredicate: "打っている" },
        perfect: { default: "既に打ってい" },
        passive: { default: "打たれ" },
        noun: { default: "打つこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configProduce: VerbConfig = {
    id: "produce_verb",
    forms: { base: "produce", es: "produces", ed: "produced", en: "produced", ing: "producing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "生産する", imperfective: "生産し", past: "生産した" },
        past: { default: "生産した" },
        progressive: { default: "生産しているところ", nonPredicate: "生産している" },
        perfect: { default: "既に生産してい" },
        passive: { default: "生産され" },
        noun: { default: "生産すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configCause: VerbConfig = {
    id: "cause_verb",
    forms: { base: "cause", es: "causes", ed: "caused", en: "caused", ing: "causing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "引き起こす", imperfective: "引き起こさ", past: "引き起こした" },
        past: { default: "引き起こした" },
        progressive: { default: "引き起こしているところ", nonPredicate: "引き起こしている" },
        perfect: { default: "既に引き起こしてい" },
        passive: { default: "引き起こされ" },
        noun: { default: "引き起こすこと" }
    },
    gerundSubject: true,
    toSubject: true,
    color: "tomato",
};

const configPoint: VerbConfig = {
    id: "point_verb",
    forms: { base: "point", es: "points", ed: "pointed", en: "pointed", ing: "pointing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "指す", imperfective: "指さ", past: "指した" },
        past: { default: "指した" },
        progressive: { default: "指しているところ", nonPredicate: "指している" },
        perfect: { default: "既に指してい" },
        passive: { default: "指され" },
        noun: { default: "指すこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

export const verbHave = generator.createVerbBlock(configHave);
export const verbDo = generator.createVerbBlock(configDo);
export const verbSay = generator.createVerbBlock(configSay);
export const verbGet = generator.createVerbBlock(configGet);
export const verbMake = generator.createVerbBlock(configMake);
export const verbGo = generator.createVerbBlock(configGo);
export const verbKnow = generator.createVerbBlock(configKnow);
export const verbTake = generator.createVerbBlock(configTake);
export const verbSee = generator.createVerbBlock(configSee);
export const verbCome = generator.createVerbBlock(configCome);
export const verbThink = generator.createVerbBlock(configThink);
export const verbLook = generator.createVerbBlock(configLook);
export const verbWant = generator.createVerbBlock(configWant);
export const verbGive = generator.createVerbBlock(configGive);
export const verbUse = generator.createVerbBlock(configUse);
export const verbFind = generator.createVerbBlock(configFind);
export const verbTell = generator.createVerbBlock(configTell);
export const verbAsk = generator.createVerbBlock(configAsk);
export const verbWork = generator.createVerbBlock(configWork);
export const verbFeel = generator.createVerbBlock(configFeel);
export const verbTry = generator.createVerbBlock(configTry);
export const verbLeave = generator.createVerbBlock(configLeave);
export const verbCall = generator.createVerbBlock(configCall);
export const verbNeed = generator.createVerbBlock(configNeed);
export const verbBecome = generator.createVerbBlock(configBecome);
export const verbPut = generator.createVerbBlock(configPut);
export const verbKeep = generator.createVerbBlock(configKeep);
export const verbBegin = generator.createVerbBlock(configBegin);
export const verbHelp = generator.createVerbBlock(configHelp);
export const verbShow = generator.createVerbBlock(configShow);
export const verbHear = generator.createVerbBlock(configHear);
export const verbPlay = generator.createVerbBlock(configPlay);
export const verbRun = generator.createVerbBlock(configRun);
export const verbMove = generator.createVerbBlock(configMove);
export const verbLive = generator.createVerbBlock(configLive);
export const verbBelieve = generator.createVerbBlock(configBelieve);
export const verbBring = generator.createVerbBlock(configBring);
export const verbHappen = generator.createVerbBlock(configHappen);
export const verbWrite = generator.createVerbBlock(configWrite);
export const verbRead = generator.createVerbBlock(configRead);
export const verbLike = generator.createVerbBlock(configLike);
export const verbBuy = generator.createVerbBlock(configBuy);
export const verbEat = generator.createVerbBlock(configEat);
export const verbCover = generator.createVerbBlock(configCover);
export const verbCatch = generator.createVerbBlock(configCatch);
export const verbDraw = generator.createVerbBlock(configDraw);
export const verbChoose = generator.createVerbBlock(configChoose);
export const verbProvide = generator.createVerbBlock(configProvide);
export const verbSit = generator.createVerbBlock(configSit);
export const verbStand = generator.createVerbBlock(configStand);
export const verbLose = generator.createVerbBlock(configLose);
export const verbPay = generator.createVerbBlock(configPay);
export const verbMeet = generator.createVerbBlock(configMeet);
export const verbInclude = generator.createVerbBlock(configInclude);
export const verbContinue = generator.createVerbBlock(configContinue);
export const verbSet = generator.createVerbBlock(configSet);
export const verbLearn = generator.createVerbBlock(configLearn);
export const verbChange = generator.createVerbBlock(configChange);
export const verbLead = generator.createVerbBlock(configLead);
export const verbUnderstand = generator.createVerbBlock(configUnderstand);
export const verbWatch = generator.createVerbBlock(configWatch);
export const verbFollow = generator.createVerbBlock(configFollow);
export const verbStop = generator.createVerbBlock(configStop);
export const verbCreate = generator.createVerbBlock(configCreate);
export const verbSpeak = generator.createVerbBlock(configSpeak);
export const verbAllow = generator.createVerbBlock(configAllow);
export const verbAdd = generator.createVerbBlock(configAdd);
export const verbSpend = generator.createVerbBlock(configSpend);
export const verbGrow = generator.createVerbBlock(configGrow);
export const verbOpen = generator.createVerbBlock(configOpen);
export const verbWalk = generator.createVerbBlock(configWalk);
export const verbWin = generator.createVerbBlock(configWin);
export const verbOffer = generator.createVerbBlock(configOffer);
export const verbRemember = generator.createVerbBlock(configRemember);
export const verbLove = generator.createVerbBlock(configLove);
export const verbConsider = generator.createVerbBlock(configConsider);
export const verbAppear = generator.createVerbBlock(configAppear);
export const verbWait = generator.createVerbBlock(configWait);
export const verbServe = generator.createVerbBlock(configServe);
export const verbDie = generator.createVerbBlock(configDie);
export const verbSend = generator.createVerbBlock(configSend);
export const verbExpect = generator.createVerbBlock(configExpect);
export const verbBuild = generator.createVerbBlock(configBuild);
export const verbStay = generator.createVerbBlock(configStay);
export const verbFall = generator.createVerbBlock(configFall);
export const verbCut = generator.createVerbBlock(configCut);
export const verbReach = generator.createVerbBlock(configReach);
export const verbKill = generator.createVerbBlock(configKill);
export const verbRemain = generator.createVerbBlock(configRemain);
export const verbSuggest = generator.createVerbBlock(configSuggest);
export const verbRaise = generator.createVerbBlock(configRaise);
export const verbPass = generator.createVerbBlock(configPass);
export const verbSell = generator.createVerbBlock(configSell);
export const verbRequire = generator.createVerbBlock(configRequire);
export const verbReport = generator.createVerbBlock(configReport);
export const verbDecide = generator.createVerbBlock(configDecide);
export const verbPull = generator.createVerbBlock(configPull);
export const verbReturn = generator.createVerbBlock(configReturn);
export const verbExplain = generator.createVerbBlock(configExplain);
export const verbHope = generator.createVerbBlock(configHope);
export const verbDevelop = generator.createVerbBlock(configDevelop);
export const verbCarry = generator.createVerbBlock(configCarry);
export const verbBreak = generator.createVerbBlock(configBreak);
export const verbReceive = generator.createVerbBlock(configReceive);
export const verbAgree = generator.createVerbBlock(configAgree);
export const verbSupport = generator.createVerbBlock(configSupport);
export const verbHit = generator.createVerbBlock(configHit);
export const verbProduce = generator.createVerbBlock(configProduce);
export const verbCause = generator.createVerbBlock(configCause);
export const verbPoint = generator.createVerbBlock(configPoint);

export const allVerbBlocks: Block[] = [
    verbHave,
    verbDo,
    verbSay,
    verbGet,
    verbMake,
    verbGo,
    verbKnow,
    verbTake,
    verbSee,
    verbCome,
    verbThink,
    verbLook,
    verbWant,
    verbGive,
    verbUse,
    verbFind,
    verbTell,
    verbAsk,
    verbWork,
    verbFeel,
    verbTry,
    verbLeave,
    verbCall,
    verbNeed,
    verbBecome,
    verbPut,
    verbKeep,
    verbBegin,
    verbHelp,
    verbShow,
    verbHear,
    verbPlay,
    verbRun,
    verbMove,
    verbLive,
    verbBelieve,
    verbBring,
    verbHappen,
    verbWrite,
    verbRead,
    verbLike,
    verbBuy,
    verbEat,
    verbCover,
    verbCatch,
    verbDraw,
    verbChoose,
    verbProvide,
    verbSit,
    verbStand,
    verbLose,
    verbPay,
    verbMeet,
    verbInclude,
    verbContinue,
    verbSet,
    verbLearn,
    verbChange,
    verbLead,
    verbUnderstand,
    verbWatch,
    verbFollow,
    verbStop,
    verbCreate,
    verbSpeak,
    verbAllow,
    verbAdd,
    verbSpend,
    verbGrow,
    verbOpen,
    verbWalk,
    verbWin,
    verbOffer,
    verbRemember,
    verbLove,
    verbConsider,
    verbAppear,
    verbWait,
    verbServe,
    verbDie,
    verbSend,
    verbExpect,
    verbBuild,
    verbStay,
    verbFall,
    verbCut,
    verbReach,
    verbKill,
    verbRemain,
    verbSuggest,
    verbRaise,
    verbPass,
    verbSell,
    verbRequire,
    verbReport,
    verbDecide,
    verbPull,
    verbReturn,
    verbExplain,
    verbHope,
    verbDevelop,
    verbCarry,
    verbBreak,
    verbReceive,
    verbAgree,
    verbSupport,
    verbHit,
    verbProduce,
    verbCause,
    verbPoint,
];