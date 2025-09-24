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

const configAccept: VerbConfig = {
    id: "accept_verb",
    forms: { base: "accept", es: "accepts", ed: "accepted", en: "accepted", ing: "accepting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "受け入れる", imperfective: "受け入れ", past: "受け入れた" },
        past: { default: "受け入れた" },
        progressive: { default: "受け入れているところ", nonPredicate: "受け入れている" },
        perfect: { default: "既に受け入れてい" },
        passive: { default: "受け入れられ" },
        noun: { default: "受け入れること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configAffect: VerbConfig = {
    id: "affect_verb",
    forms: { base: "affect", es: "affects", ed: "affected", en: "affected", ing: "affecting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "影響する", imperfective: "影響し", past: "影響した" },
        past: { default: "影響した" },
        progressive: { default: "影響しているところ", nonPredicate: "影響している" },
        perfect: { default: "既に影響してい" },
        passive: { default: "影響され" },
        noun: { default: "影響すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configAnswer: VerbConfig = {
    id: "answer_verb",
    forms: { base: "answer", es: "answers", ed: "answered", en: "answered", ing: "answering" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "に" }],
    transitive: true,
    translations: {
        present: { default: "答える", imperfective: "答え", past: "答えた" },
        past: { default: "答えた" },
        progressive: { default: "答えているところ", nonPredicate: "答えている" },
        perfect: { default: "既に答えてい" },
        passive: { default: "答えられ" },
        noun: { default: "答えること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configArgue: VerbConfig = {
    id: "argue_verb",
    forms: { base: "argue", es: "argues", ed: "argued", en: "argued", ing: "arguing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "議論する", imperfective: "議論し", past: "議論した" },
        past: { default: "議論した" },
        progressive: { default: "議論しているところ", nonPredicate: "議論している" },
        perfect: { default: "既に議論してい" },
        passive: { default: "議論され" },
        noun: { default: "議論すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configArrange: VerbConfig = {
    id: "arrange_verb",
    forms: { base: "arrange", es: "arranges", ed: "arranged", en: "arranged", ing: "arranging" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "手配する", imperfective: "手配し", past: "手配した" },
        past: { default: "手配した" },
        progressive: { default: "手配しているところ", nonPredicate: "手配している" },
        perfect: { default: "既に手配してい" },
        passive: { default: "手配され" },
        noun: { default: "手配すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configArrive: VerbConfig = {
    id: "arrive_verb",
    forms: { base: "arrive", es: "arrives", ed: "arrived", en: "arrived", ing: "arriving" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "到着する", imperfective: "到着し", past: "到着した" },
        past: { default: "到着した" },
        progressive: { default: "到着しているところ", nonPredicate: "到着している" },
        perfect: { default: "既に到着してい" },
        noun: { default: "到着すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configAvoid: VerbConfig = {
    id: "avoid_verb",
    forms: { base: "avoid", es: "avoids", ed: "avoided", en: "avoided", ing: "avoiding" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "避ける", imperfective: "避け", past: "避けた" },
        past: { default: "避けた" },
        progressive: { default: "避けているところ", nonPredicate: "避けている" },
        perfect: { default: "既に避けてい" },
        passive: { default: "避けられ" },
        noun: { default: "避けること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configBake: VerbConfig = {
    id: "bake_verb",
    forms: { base: "bake", es: "bakes", ed: "baked", en: "baked", ing: "baking" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "焼く", imperfective: "焼か", past: "焼いた" },
        past: { default: "焼いた" },
        progressive: { default: "焼いているところ", nonPredicate: "焼いている" },
        perfect: { default: "既に焼いてい" },
        passive: { default: "焼かれ" },
        noun: { default: "焼くこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configBe: VerbConfig = {
    id: "be_verb",
    forms: { base: "be", es: "is", ed: "was", en: "been", ing: "being" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "存在する", imperfective: "存在し", past: "存在した" },
        past: { default: "存在した" },
        progressive: { default: "存在しているところ", nonPredicate: "存在している" },
        perfect: { default: "既に存在してい" },
        noun: { default: "存在すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configBite: VerbConfig = {
    id: "bite_verb",
    forms: { base: "bite", es: "bites", ed: "bit", en: "bitten", ing: "biting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "噛み付く", imperfective: "噛み付か", past: "噛み付いた" },
        past: { default: "噛み付いた" },
        progressive: { default: "噛み付いているところ", nonPredicate: "噛み付いている" },
        perfect: { default: "既に噛み付いてい" },
        passive: { default: "噛み付かれ" },
        noun: { default: "噛み付くこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configBoard: VerbConfig = {
    id: "board_verb",
    forms: { base: "board", es: "boards", ed: "boarded", en: "boarded", ing: "boarding" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "に" }],
    transitive: true,
    translations: {
        present: { default: "乗り込む", imperfective: "乗り込ま", past: "乗り込んだ" },
        past: { default: "乗り込んだ" },
        progressive: { default: "乗り込んでいるところ", nonPredicate: "乗り込んでいる" },
        perfect: { default: "既に乗り込んでい" },
        passive: { default: "乗り込まれ" },
        noun: { default: "乗り込むこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configBoil: VerbConfig = {
    id: "boil_verb",
    forms: { base: "boil", es: "boils", ed: "boiled", en: "boiled", ing: "boiling" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "茹でる", imperfective: "茹で", past: "茹でた" },
        past: { default: "茹でた" },
        progressive: { default: "茹でているところ", nonPredicate: "茹でている" },
        perfect: { default: "既に茹でてい" },
        passive: { default: "茹でられ" },
        noun: { default: "茹でること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configBook: VerbConfig = {
    id: "book_verb",
    forms: { base: "book", es: "books", ed: "booked", en: "booked", ing: "booking" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "予約する", imperfective: "予約し", past: "予約した" },
        past: { default: "予約した" },
        progressive: { default: "予約しているところ", nonPredicate: "予約している" },
        perfect: { default: "既に予約してい" },
        passive: { default: "予約され" },
        noun: { default: "予約すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configBorrow: VerbConfig = {
    id: "borrow_verb",
    forms: { base: "borrow", es: "borrows", ed: "borrowed", en: "borrowed", ing: "borrowing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "借りる", imperfective: "借り", past: "借りた" },
        past: { default: "借りた" },
        progressive: { default: "借りているところ", nonPredicate: "借りている" },
        perfect: { default: "既に借りてい" },
        passive: { default: "借りられ" },
        noun: { default: "借りること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configBrowse: VerbConfig = {
    id: "browse_verb",
    forms: { base: "browse", es: "browses", ed: "browsed", en: "browsed", ing: "browsing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "閲覧する", imperfective: "閲覧し", past: "閲覧した" },
        past: { default: "閲覧した" },
        progressive: { default: "閲覧しているところ", nonPredicate: "閲覧している" },
        perfect: { default: "既に閲覧してい" },
        passive: { default: "閲覧され" },
        noun: { default: "閲覧すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configCamp: VerbConfig = {
    id: "camp_verb",
    forms: { base: "camp", es: "camps", ed: "camped", en: "camped", ing: "camping" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "キャンプする", imperfective: "キャンプし", past: "キャンプした" },
        past: { default: "キャンプした" },
        progressive: { default: "キャンプしているところ", nonPredicate: "キャンプしている" },
        perfect: { default: "既にキャンプしてい" },
        noun: { default: "キャンプすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configCancel: VerbConfig = {
    id: "cancel_verb",
    forms: { base: "cancel", es: "cancels", ed: "canceled", en: "canceled", ing: "canceling" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "取り消す", imperfective: "取り消さ", past: "取り消した" },
        past: { default: "取り消した" },
        progressive: { default: "取り消しているところ", nonPredicate: "取り消している" },
        perfect: { default: "既に取り消してい" },
        passive: { default: "取り消され" },
        noun: { default: "取り消すこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configCharge: VerbConfig = {
    id: "charge_verb",
    forms: { base: "charge", es: "charges", ed: "charged", en: "charged", ing: "charging" },
    complements: [
        { expected: { head: { type: det, case: "acc" } }, particle: "に" },
        { expected: { head: { type: det, case: "acc" } }, particle: "を" }
    ],
    transitive: true,
    translations: {
        present: { default: "請求する", imperfective: "請求し", past: "請求した" },
        past: { default: "請求した" },
        progressive: { default: "請求しているところ", nonPredicate: "請求している" },
        perfect: { default: "既に請求してい" },
        passive: { default: "請求され" },
        noun: { default: "請求すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configChat: VerbConfig = {
    id: "chat_verb",
    forms: { base: "chat", es: "chats", ed: "chatted", en: "chatted", ing: "chatting" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "チャットする", imperfective: "チャットし", past: "チャットした" },
        past: { default: "チャットした" },
        progressive: { default: "チャットしているところ", nonPredicate: "チャットしている" },
        perfect: { default: "既にチャットしてい" },
        noun: { default: "チャットすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configCheck: VerbConfig = {
    id: "check_verb",
    forms: { base: "check", es: "checks", ed: "checked", en: "checked", ing: "checking" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "確認する", imperfective: "確認し", past: "確認した" },
        past: { default: "確認した" },
        progressive: { default: "確認しているところ", nonPredicate: "確認している" },
        perfect: { default: "既に確認してい" },
        passive: { default: "確認され" },
        noun: { default: "確認すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configChew: VerbConfig = {
    id: "chew_verb",
    forms: { base: "chew", es: "chews", ed: "chewed", en: "chewed", ing: "chewing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "噛む", imperfective: "噛ま", past: "噛んだ" },
        past: { default: "噛んだ" },
        progressive: { default: "噛んでいるところ", nonPredicate: "噛んでいる" },
        perfect: { default: "既に噛んでい" },
        passive: { default: "噛まれ" },
        noun: { default: "噛むこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configClean: VerbConfig = {
    id: "clean_verb",
    forms: { base: "clean", es: "cleans", ed: "cleaned", en: "cleaned", ing: "cleaning" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "掃除する", imperfective: "掃除し", past: "掃除した" },
        past: { default: "掃除した" },
        progressive: { default: "掃除しているところ", nonPredicate: "掃除している" },
        perfect: { default: "既に掃除してい" },
        passive: { default: "掃除され" },
        noun: { default: "掃除すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configClick: VerbConfig = {
    id: "click_verb",
    forms: { base: "click", es: "clicks", ed: "clicked", en: "clicked", ing: "clicking" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "クリックする", imperfective: "クリックし", past: "クリックした" },
        past: { default: "クリックした" },
        progressive: { default: "クリックしているところ", nonPredicate: "クリックしている" },
        perfect: { default: "既にクリックしてい" },
        passive: { default: "クリックされ" },
        noun: { default: "クリックすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configClimb: VerbConfig = {
    id: "climb_verb",
    forms: { base: "climb", es: "climbs", ed: "climbed", en: "climbed", ing: "climbing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "に" }],
    transitive: true,
    translations: {
        present: { default: "登る", imperfective: "登ら", past: "登った" },
        past: { default: "登った" },
        progressive: { default: "登っているところ", nonPredicate: "登っている" },
        perfect: { default: "既に登ってい" },
        passive: { default: "登られ" },
        noun: { default: "登ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configClose: VerbConfig = {
    id: "close_verb",
    forms: { base: "close", es: "closes", ed: "closed", en: "closed", ing: "closing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "閉める", imperfective: "閉め", past: "閉めた" },
        past: { default: "閉めた" },
        progressive: { default: "閉めているところ", nonPredicate: "閉めている" },
        perfect: { default: "既に閉めてい" },
        passive: { default: "閉められ" },
        noun: { default: "閉めること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configColor: VerbConfig = {
    id: "color_verb",
    forms: { base: "color", es: "colors", ed: "colored", en: "colored", ing: "coloring" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "色付けする", imperfective: "色付けし", past: "色付けした" },
        past: { default: "色付けした" },
        progressive: { default: "色付けしているところ", nonPredicate: "色付けしている" },
        perfect: { default: "既に色付けしてい" },
        passive: { default: "色付けされ" },
        noun: { default: "色付けすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configComment: VerbConfig = {
    id: "comment_verb",
    forms: { base: "comment", es: "comments", ed: "commented", en: "commented", ing: "commenting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "に" }],
    transitive: true,
    translations: {
        present: { default: "コメントする", imperfective: "コメントし", past: "コメントした" },
        past: { default: "コメントした" },
        progressive: { default: "コメントしているところ", nonPredicate: "コメントしている" },
        perfect: { default: "既にコメントしてい" },
        passive: { default: "コメントされ" },
        noun: { default: "コメントすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configCompare: VerbConfig = {
    id: "compare_verb",
    forms: { base: "compare", es: "compares", ed: "compared", en: "compared", ing: "comparing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "比較する", imperfective: "比較し", past: "比較した" },
        past: { default: "比較した" },
        progressive: { default: "比較しているところ", nonPredicate: "比較している" },
        perfect: { default: "既に比較してい" },
        passive: { default: "比較され" },
        noun: { default: "比較すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configComplain: VerbConfig = {
    id: "complain_verb",
    forms: { base: "complain", es: "complains", ed: "complained", en: "complained", ing: "complaining" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "クレームする", imperfective: "クレームし", past: "クレームした" },
        past: { default: "クレームした" },
        progressive: { default: "クレームしているところ", nonPredicate: "クレームしている" },
        perfect: { default: "既にクレームしてい" },
        passive: { default: "クレームされ" },
        noun: { default: "クレームすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configCook: VerbConfig = {
    id: "cook_verb",
    forms: { base: "cook", es: "cooks", ed: "cooked", en: "cooked", ing: "cooking" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "料理する", imperfective: "料理し", past: "料理した" },
        past: { default: "料理した" },
        progressive: { default: "料理しているところ", nonPredicate: "料理している" },
        perfect: { default: "既に料理してい" },
        passive: { default: "料理され" },
        noun: { default: "料理すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configCool: VerbConfig = {
    id: "cool_verb",
    forms: { base: "cool", es: "cools", ed: "cooled", en: "cooled", ing: "cooling" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "冷やす", imperfective: "冷やさ", past: "冷やした" },
        past: { default: "冷やした" },
        progressive: { default: "冷やしているところ", nonPredicate: "冷やしている" },
        perfect: { default: "既に冷やしてい" },
        passive: { default: "冷やされ" },
        noun: { default: "冷やすこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configCoordinate: VerbConfig = {
    id: "coordinate_verb",
    forms: { base: "coordinate", es: "coordinates", ed: "coordinated", en: "coordinated", ing: "coordinating" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "調整する", imperfective: "調整し", past: "調整した" },
        past: { default: "調整した" },
        progressive: { default: "調整しているところ", nonPredicate: "調整している" },
        perfect: { default: "既に調整してい" },
        passive: { default: "調整され" },
        noun: { default: "調整すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configCopy: VerbConfig = {
    id: "copy_verb",
    forms: { base: "copy", es: "copies", ed: "copied", en: "copied", ing: "copying" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "コピーする", imperfective: "コピーし", past: "コピーした" },
        past: { default: "コピーした" },
        progressive: { default: "コピーしているところ", nonPredicate: "コピーしている" },
        perfect: { default: "既にコピーしてい" },
        passive: { default: "コピーされ" },
        noun: { default: "コピーすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configCost: VerbConfig = {
    id: "cost_verb",
    forms: { base: "cost", es: "costs", ed: "cost", en: "cost", ing: "costing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "要する", imperfective: "要し", past: "要した" },
        past: { default: "要した" },
        progressive: { default: "要しているところ", nonPredicate: "要している" },
        perfect: { default: "既に要してい" },
        passive: { default: "要され" },
        noun: { default: "要すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configCross: VerbConfig = {
    id: "cross_verb",
    forms: { base: "cross", es: "crosses", ed: "crossed", en: "crossed", ing: "crossing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "渡る", imperfective: "渡ら", past: "渡った" },
        past: { default: "渡った" },
        progressive: { default: "渡っているところ", nonPredicate: "渡っている" },
        perfect: { default: "既に渡ってい" },
        passive: { default: "渡られ" },
        noun: { default: "渡ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configDelete: VerbConfig = {
    id: "delete_verb",
    forms: { base: "delete", es: "deletes", ed: "deleted", en: "deleted", ing: "deleting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "削除する", imperfective: "削除し", past: "削除した" },
        past: { default: "削除した" },
        progressive: { default: "削除しているところ", nonPredicate: "削除している" },
        perfect: { default: "既に削除してい" },
        passive: { default: "削除され" },
        noun: { default: "削除すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configDeliver: VerbConfig = {
    id: "deliver_verb",
    forms: { base: "deliver", es: "delivers", ed: "delivered", en: "delivered", ing: "delivering" },
    complements: [
        { expected: { head: { type: det, case: "acc" } }, particle: "に" },
        { expected: { head: { type: det, case: "acc" } }, particle: "を" }
    ],
    transitive: true,
    translations: {
        present: { default: "届ける", imperfective: "届け", past: "届けた" },
        past: { default: "届けた" },
        progressive: { default: "届けているところ", nonPredicate: "届けている" },
        perfect: { default: "既に届けてい" },
        passive: { default: "届けられ" },
        noun: { default: "届けること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configDeny: VerbConfig = {
    id: "deny_verb",
    forms: { base: "deny", es: "denies", ed: "denied", en: "denied", ing: "denying" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "否定する", imperfective: "否定し", past: "否定した" },
        past: { default: "否定した" },
        progressive: { default: "否定しているところ", nonPredicate: "否定している" },
        perfect: { default: "既に否定してい" },
        passive: { default: "否定され" },
        noun: { default: "否定すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configDepart: VerbConfig = {
    id: "depart_verb",
    forms: { base: "depart", es: "departs", ed: "departed", en: "departed", ing: "departing" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "出発する", imperfective: "出発し", past: "出発した" },
        past: { default: "出発した" },
        progressive: { default: "出発しているところ", nonPredicate: "出発している" },
        perfect: { default: "既に出発してい" },
        noun: { default: "出発すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configDepend: VerbConfig = {
    id: "depend_verb",
    forms: { base: "depend", es: "depends", ed: "depended", en: "depended", ing: "depending" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "に" }],
    transitive: true,
    translations: {
        present: { default: "依存する", imperfective: "依存し", past: "依存した" },
        past: { default: "依存した" },
        progressive: { default: "依存しているところ", nonPredicate: "依存している" },
        perfect: { default: "既に依存してい" },
        passive: { default: "依存され" },
        noun: { default: "依存すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configDescribe: VerbConfig = {
    id: "describe_verb",
    forms: { base: "describe", es: "describes", ed: "described", en: "described", ing: "describing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "描写する", imperfective: "描写し", past: "描写した" },
        past: { default: "描写した" },
        progressive: { default: "描写しているところ", nonPredicate: "描写している" },
        perfect: { default: "既に描写してい" },
        passive: { default: "描写され" },
        noun: { default: "描写すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configDesign: VerbConfig = {
    id: "design_verb",
    forms: { base: "design", es: "designs", ed: "designed", en: "designed", ing: "designing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "設計する", imperfective: "設計し", past: "設計した" },
        past: { default: "設計した" },
        progressive: { default: "設計しているところ", nonPredicate: "設計している" },
        perfect: { default: "既に設計してい" },
        passive: { default: "設計され" },
        noun: { default: "設計すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configDisagree: VerbConfig = {
    id: "disagree_verb",
    forms: { base: "disagree", es: "disagrees", ed: "disagreed", en: "disagreed", ing: "disagreeing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "に" }],
    transitive: true,
    translations: {
        present: { default: "反対する", imperfective: "反対し", past: "反対した" },
        past: { default: "反対した" },
        progressive: { default: "反対しているところ", nonPredicate: "反対している" },
        perfect: { default: "既に反対してい" },
        passive: { default: "反対され" },
        noun: { default: "反対すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configDiscuss: VerbConfig = {
    id: "discuss_verb",
    forms: { base: "discuss", es: "discusses", ed: "discussed", en: "discussed", ing: "discussing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "討議する", imperfective: "討議し", past: "討議した" },
        past: { default: "討議した" },
        progressive: { default: "討議しているところ", nonPredicate: "討議している" },
        perfect: { default: "既に討議してい" },
        passive: { default: "討議され" },
        noun: { default: "討議すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configDownload: VerbConfig = {
    id: "download_verb",
    forms: { base: "download", es: "downloads", ed: "downloaded", en: "downloaded", ing: "downloading" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "ダウンロードする", imperfective: "ダウンロードし", past: "ダウンロードした" },
        past: { default: "ダウンロードした" },
        progressive: { default: "ダウンロードしているところ", nonPredicate: "ダウンロードしている" },
        perfect: { default: "既にダウンロードしてい" },
        passive: { default: "ダウンロードされ" },
        noun: { default: "ダウンロードすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configDrink: VerbConfig = {
    id: "drink_verb",
    forms: { base: "drink", es: "drinks", ed: "drank", en: "drunk", ing: "drinking" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "飲む", imperfective: "飲ま", past: "飲んだ" },
        past: { default: "飲んだ" },
        progressive: { default: "飲んでいるところ", nonPredicate: "飲んでいる" },
        perfect: { default: "既に飲んでい" },
        passive: { default: "飲まれ" },
        noun: { default: "飲むこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configDrive: VerbConfig = {
    id: "drive_verb",
    forms: { base: "drive", es: "drives", ed: "drove", en: "driven", ing: "driving" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "運転する", imperfective: "運転し", past: "運転した" },
        past: { default: "運転した" },
        progressive: { default: "運転しているところ", nonPredicate: "運転している" },
        perfect: { default: "既に運転してい" },
        passive: { default: "運転され" },
        noun: { default: "運転すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configEarn: VerbConfig = {
    id: "earn_verb",
    forms: { base: "earn", es: "earns", ed: "earned", en: "earned", ing: "earning" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "稼ぐ", imperfective: "稼が", past: "稼いだ" },
        past: { default: "稼いだ" },
        progressive: { default: "稼いでいるところ", nonPredicate: "稼いでいる" },
        perfect: { default: "既に稼いでい" },
        passive: { default: "稼がれ" },
        noun: { default: "稼ぐこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configEdit: VerbConfig = {
    id: "edit_verb",
    forms: { base: "edit", es: "edits", ed: "edited", en: "edited", ing: "editing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "編集する", imperfective: "編集し", past: "編集した" },
        past: { default: "編集した" },
        progressive: { default: "編集しているところ", nonPredicate: "編集している" },
        perfect: { default: "既に編集してい" },
        passive: { default: "編集され" },
        noun: { default: "編集すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configEmail: VerbConfig = {
    id: "email_verb",
    forms: { base: "email", es: "emails", ed: "emailed", en: "emailed", ing: "emailing" },
    complements: [
        { expected: { head: { type: det, case: "acc" } }, particle: "に" },
        { expected: { head: { type: det, case: "acc" } }, particle: "を" }
    ],
    transitive: true,
    translations: {
        present: { default: "メールする", imperfective: "メールし", past: "メールした" },
        past: { default: "メールした" },
        progressive: { default: "メールしているところ", nonPredicate: "メールしている" },
        perfect: { default: "既にメールしてい" },
        passive: { default: "メールされ" },
        noun: { default: "メールすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configEnd: VerbConfig = {
    id: "end_verb",
    forms: { base: "end", es: "ends", ed: "ended", en: "ended", ing: "ending" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "終える", imperfective: "終え", past: "終えた" },
        past: { default: "終えた" },
        progressive: { default: "終えているところ", nonPredicate: "終えている" },
        perfect: { default: "既に終えてい" },
        passive: { default: "終えられ" },
        noun: { default: "終えること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configEnjoy: VerbConfig = {
    id: "enjoy_verb",
    forms: { base: "enjoy", es: "enjoys", ed: "enjoyed", en: "enjoyed", ing: "enjoying" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "楽しむ", imperfective: "楽しま", past: "楽しんだ" },
        past: { default: "楽しんだ" },
        progressive: { default: "楽しんでいるところ", nonPredicate: "楽しんでいる" },
        perfect: { default: "既に楽しんでい" },
        passive: { default: "楽しまれ" },
        noun: { default: "楽しむこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configEnter: VerbConfig = {
    id: "enter_verb",
    forms: { base: "enter", es: "enters", ed: "entered", en: "entered", ing: "entering" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "に" }],
    transitive: true,
    translations: {
        present: { default: "入る", imperfective: "入ら", past: "入った" },
        past: { default: "入った" },
        progressive: { default: "入っているところ", nonPredicate: "入っている" },
        perfect: { default: "既に入ってい" },
        passive: { default: "入られ" },
        noun: { default: "入ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configErase: VerbConfig = {
    id: "erase_verb",
    forms: { base: "erase", es: "erases", ed: "erased", en: "erased", ing: "erasing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "消す", imperfective: "消さ", past: "消した" },
        past: { default: "消した" },
        progressive: { default: "消しているところ", nonPredicate: "消している" },
        perfect: { default: "既に消してい" },
        passive: { default: "消され" },
        noun: { default: "消すこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configExchange: VerbConfig = {
    id: "exchange_verb",
    forms: { base: "exchange", es: "exchanges", ed: "exchanged", en: "exchanged", ing: "exchanging" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "交換する", imperfective: "交換し", past: "交換した" },
        past: { default: "交換した" },
        progressive: { default: "交換しているところ", nonPredicate: "交換している" },
        perfect: { default: "既に交換してい" },
        passive: { default: "交換され" },
        noun: { default: "交換すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configExercise: VerbConfig = {
    id: "exercise_verb",
    forms: { base: "exercise", es: "exercises", ed: "exercised", en: "exercised", ing: "exercising" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "運動する", imperfective: "運動し", past: "運動した" },
        past: { default: "運動した" },
        progressive: { default: "運動しているところ", nonPredicate: "運動している" },
        perfect: { default: "既に運動してい" },
        noun: { default: "運動すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configExplore: VerbConfig = {
    id: "explore_verb",
    forms: { base: "explore", es: "explores", ed: "explored", en: "explored", ing: "exploring" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "探検する", imperfective: "探検し", past: "探検した" },
        past: { default: "探検した" },
        progressive: { default: "探検しているところ", nonPredicate: "探検している" },
        perfect: { default: "既に探検してい" },
        passive: { default: "探検され" },
        noun: { default: "探検すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configFasten: VerbConfig = {
    id: "fasten_verb",
    forms: { base: "fasten", es: "fastens", ed: "fastened", en: "fastened", ing: "fastening" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "締める", imperfective: "締め", past: "締めた" },
        past: { default: "締めた" },
        progressive: { default: "締めているところ", nonPredicate: "締めている" },
        perfect: { default: "既に締めてい" },
        passive: { default: "締められ" },
        noun: { default: "締めること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configFeed: VerbConfig = {
    id: "feed_verb",
    forms: { base: "feed", es: "feeds", ed: "fed", en: "fed", ing: "feeding" },
    complements: [
        { expected: { head: { type: det, case: "acc" } }, particle: "に" },
        { expected: { head: { type: det, case: "acc" } }, particle: "を" }
    ],
    transitive: true,
    translations: {
        present: { default: "餌を与える", imperfective: "餌を与え", past: "餌を与えた" },
        past: { default: "餌を与えた" },
        progressive: { default: "餌を与えているところ", nonPredicate: "餌を与えている" },
        perfect: { default: "既に餌を与えてい" },
        passive: { default: "餌を与えられ" },
        noun: { default: "餌を与えること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configFill: VerbConfig = {
    id: "fill_verb",
    forms: { base: "fill", es: "fills", ed: "filled", en: "filled", ing: "filling" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "満たす", imperfective: "満たさ", past: "満たした" },
        past: { default: "満たした" },
        progressive: { default: "満たしているところ", nonPredicate: "満たしている" },
        perfect: { default: "既に満たしてい" },
        passive: { default: "満たされ" },
        noun: { default: "満たすこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configFilm: VerbConfig = {
    id: "film_verb",
    forms: { base: "film", es: "films", ed: "filmed", en: "filmed", ing: "filming" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "撮影する", imperfective: "撮影し", past: "撮影した" },
        past: { default: "撮影した" },
        progressive: { default: "撮影しているところ", nonPredicate: "撮影している" },
        perfect: { default: "既に撮影してい" },
        passive: { default: "撮影され" },
        noun: { default: "撮影すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configFinish: VerbConfig = {
    id: "finish_verb",
    forms: { base: "finish", es: "finishes", ed: "finished", en: "finished", ing: "finishing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "終わらせる", imperfective: "終わらせ", past: "終わらせた" },
        past: { default: "終わらせた" },
        progressive: { default: "終わらせているところ", nonPredicate: "終わらせている" },
        perfect: { default: "既に終わらせてい" },
        passive: { default: "終わらせられ" },
        noun: { default: "終わらせること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configFire: VerbConfig = {
    id: "fire_verb",
    forms: { base: "fire", es: "fires", ed: "fired", en: "fired", ing: "firing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "解雇する", imperfective: "解雇し", past: "解雇した" },
        past: { default: "解雇した" },
        progressive: { default: "解雇しているところ", nonPredicate: "解雇している" },
        perfect: { default: "既に解雇してい" },
        passive: { default: "解雇され" },
        noun: { default: "解雇すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configFish: VerbConfig = {
    id: "fish_verb",
    forms: { base: "fish", es: "fishes", ed: "fished", en: "fished", ing: "fishing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "釣りをする", imperfective: "釣りをし", past: "釣りをした" },
        past: { default: "釣りをした" },
        progressive: { default: "釣りをしているところ", nonPredicate: "釣りをしている" },
        perfect: { default: "既に釣りをしてい" },
        passive: { default: "釣りをされ" },
        noun: { default: "釣りをすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configFit: VerbConfig = {
    id: "fit_verb",
    forms: { base: "fit", es: "fits", ed: "fit", en: "fit", ing: "fitting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "に" }],
    transitive: true,
    translations: {
        present: { default: "合う", imperfective: "合わ", past: "合った" },
        past: { default: "合った" },
        progressive: { default: "合っているところ", nonPredicate: "合っている" },
        perfect: { default: "既に合ってい" },
        passive: { default: "合われ" },
        noun: { default: "合うこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configFix: VerbConfig = {
    id: "fix_verb",
    forms: { base: "fix", es: "fixes", ed: "fixed", en: "fixed", ing: "fixing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "修理する", imperfective: "修理し", past: "修理した" },
        past: { default: "修理した" },
        progressive: { default: "修理しているところ", nonPredicate: "修理している" },
        perfect: { default: "既に修理してい" },
        passive: { default: "修理され" },
        noun: { default: "修理すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configFly: VerbConfig = {
    id: "fly_verb",
    forms: { base: "fly", es: "flies", ed: "flew", en: "flown", ing: "flying" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "飛ぶ", imperfective: "飛ば", past: "飛んだ" },
        past: { default: "飛んだ" },
        progressive: { default: "飛んでいるところ", nonPredicate: "飛んでいる" },
        perfect: { default: "既に飛んでい" },
        noun: { default: "飛ぶこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configForbid: VerbConfig = {
    id: "forbid_verb",
    forms: { base: "forbid", es: "forbids", ed: "forbade", en: "forbidden", ing: "forbidding" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "禁じる", imperfective: "禁じ", past: "禁じた" },
        past: { default: "禁じた" },
        progressive: { default: "禁じているところ", nonPredicate: "禁じている" },
        perfect: { default: "既に禁じてい" },
        passive: { default: "禁じられ" },
        noun: { default: "禁じること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configForce: VerbConfig = {
    id: "force_verb",
    forms: { base: "force", es: "forces", ed: "forced", en: "forced", ing: "forcing" },
    complements: [
        { expected: { head: { type: det, case: "acc" } }, particle: "に" },
        { expected: { head: { type: det, case: "acc" } }, particle: "を" }
    ],
    transitive: true,
    translations: {
        present: { default: "強制する", imperfective: "強制し", past: "強制した" },
        past: { default: "強制した" },
        progressive: { default: "強制しているところ", nonPredicate: "強制している" },
        perfect: { default: "既に強制してい" },
        passive: { default: "強制され" },
        noun: { default: "強制すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configFreeze: VerbConfig = {
    id: "freeze_verb",
    forms: { base: "freeze", es: "freezes", ed: "froze", en: "frozen", ing: "freezing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "凍らせる", imperfective: "凍らせ", past: "凍らせた" },
        past: { default: "凍らせた" },
        progressive: { default: "凍らせているところ", nonPredicate: "凍らせている" },
        perfect: { default: "既に凍らせてい" },
        passive: { default: "凍らせられ" },
        noun: { default: "凍らせること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configFry: VerbConfig = {
    id: "fry_verb",
    forms: { base: "fry", es: "fries", ed: "fried", en: "fried", ing: "frying" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "揚げる", imperfective: "揚げ", past: "揚げた" },
        past: { default: "揚げた" },
        progressive: { default: "揚げているところ", nonPredicate: "揚げている" },
        perfect: { default: "既に揚げてい" },
        passive: { default: "揚げられ" },
        noun: { default: "揚げること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configGrill: VerbConfig = {
    id: "grill_verb",
    forms: { base: "grill", es: "grills", ed: "grilled", en: "grilled", ing: "grilling" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "炙る", imperfective: "炙ら", past: "炙った" },
        past: { default: "炙った" },
        progressive: { default: "炙っているところ", nonPredicate: "炙っている" },
        perfect: { default: "既に炙ってい" },
        passive: { default: "炙られ" },
        noun: { default: "炙ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configGuide: VerbConfig = {
    id: "guide_verb",
    forms: { base: "guide", es: "guides", ed: "guided", en: "guided", ing: "guiding" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "案内する", imperfective: "案内し", past: "案内した" },
        past: { default: "案内した" },
        progressive: { default: "案内しているところ", nonPredicate: "案内している" },
        perfect: { default: "既に案内してい" },
        passive: { default: "案内され" },
        noun: { default: "案内すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configHarvest: VerbConfig = {
    id: "harvest_verb",
    forms: { base: "harvest", es: "harvests", ed: "harvested", en: "harvested", ing: "harvesting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "収穫する", imperfective: "収穫し", past: "収穫した" },
        past: { default: "収穫した" },
        progressive: { default: "収穫しているところ", nonPredicate: "収穫している" },
        perfect: { default: "既に収穫してい" },
        passive: { default: "収穫され" },
        noun: { default: "収穫すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configHeat: VerbConfig = {
    id: "heat_verb",
    forms: { base: "heat", es: "heats", ed: "heated", en: "heated", ing: "heating" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "温める", imperfective: "温め", past: "温めた" },
        past: { default: "温めた" },
        progressive: { default: "温めているところ", nonPredicate: "温めている" },
        perfect: { default: "既に温めてい" },
        passive: { default: "温められ" },
        noun: { default: "温めること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configHike: VerbConfig = {
    id: "hike_verb",
    forms: { base: "hike", es: "hikes", ed: "hiked", en: "hiked", ing: "hiking" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "ハイキングする", imperfective: "ハイキングし", past: "ハイキングした" },
        past: { default: "ハイキングした" },
        progressive: { default: "ハイキングしているところ", nonPredicate: "ハイキングしている" },
        perfect: { default: "既にハイキングしてい" },
        noun: { default: "ハイキングすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configHire: VerbConfig = {
    id: "hire_verb",
    forms: { base: "hire", es: "hires", ed: "hired", en: "hired", ing: "hiring" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "雇う", imperfective: "雇わ", past: "雇った" },
        past: { default: "雇った" },
        progressive: { default: "雇っているところ", nonPredicate: "雇っている" },
        perfect: { default: "既に雇ってい" },
        passive: { default: "雇われ" },
        noun: { default: "雇うこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configHold: VerbConfig = {
    id: "hold_verb",
    forms: { base: "hold", es: "holds", ed: "held", en: "held", ing: "holding" },
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
    adv_manner_type: 'skill',
    color: "tomato",
};

const configHost: VerbConfig = {
    id: "host_verb",
    forms: { base: "host", es: "hosts", ed: "hosted", en: "hosted", ing: "hosting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "主催する", imperfective: "主催し", past: "主催した" },
        past: { default: "主催した" },
        progressive: { default: "主催しているところ", nonPredicate: "主催している" },
        perfect: { default: "既に主催してい" },
        passive: { default: "主催され" },
        noun: { default: "主催すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configHug: VerbConfig = {
    id: "hug_verb",
    forms: { base: "hug", es: "hugs", ed: "hugged", en: "hugged", ing: "hugging" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "抱きしめる", imperfective: "抱きしめ", past: "抱きしめた" },
        past: { default: "抱きしめた" },
        progressive: { default: "抱きしめているところ", nonPredicate: "抱きしめている" },
        perfect: { default: "既に抱きしめてい" },
        passive: { default: "抱きしめられ" },
        noun: { default: "抱きしめること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configImprove: VerbConfig = {
    id: "improve_verb",
    forms: { base: "improve", es: "improves", ed: "improved", en: "improved", ing: "improving" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "改善する", imperfective: "改善し", past: "改善した" },
        past: { default: "改善した" },
        progressive: { default: "改善しているところ", nonPredicate: "改善している" },
        perfect: { default: "既に改善してい" },
        passive: { default: "改善され" },
        noun: { default: "改善すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configInstall: VerbConfig = {
    id: "install_verb",
    forms: { base: "install", es: "installs", ed: "installed", en: "installed", ing: "installing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "インストールする", imperfective: "インストールし", past: "インストールした" },
        past: { default: "インストールした" },
        progressive: { default: "インストールしているところ", nonPredicate: "インストールしている" },
        perfect: { default: "既にインストールしてい" },
        passive: { default: "インストールされ" },
        noun: { default: "インストールすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configIntend: VerbConfig = {
    id: "intend_verb",
    forms: { base: "intend", es: "intends", ed: "intended", en: "intended", ing: "intending" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "意図する", imperfective: "意図し", past: "意図した" },
        past: { default: "意図した" },
        progressive: { default: "意図しているところ", nonPredicate: "意図している" },
        perfect: { default: "既に意図してい" },
        passive: { default: "意図され" },
        noun: { default: "意図すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configInvest: VerbConfig = {
    id: "invest_verb",
    forms: { base: "invest", es: "invests", ed: "invested", en: "invested", ing: "investing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "に" }],
    transitive: true,
    translations: {
        present: { default: "投資する", imperfective: "投資し", past: "投資した" },
        past: { default: "投資した" },
        progressive: { default: "投資しているところ", nonPredicate: "投資している" },
        perfect: { default: "既に投資してい" },
        passive: { default: "投資され" },
        noun: { default: "投資すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configInvite: VerbConfig = {
    id: "invite_verb",
    forms: { base: "invite", es: "invites", ed: "invited", en: "invited", ing: "inviting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "招待する", imperfective: "招待し", past: "招待した" },
        past: { default: "招待した" },
        progressive: { default: "招待しているところ", nonPredicate: "招待している" },
        perfect: { default: "既に招待してい" },
        passive: { default: "招待され" },
        noun: { default: "招待すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configJoin: VerbConfig = {
    id: "join_verb",
    forms: { base: "join", es: "joins", ed: "joined", en: "joined", ing: "joining" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "に" }],
    transitive: true,
    translations: {
        present: { default: "参加する", imperfective: "参加し", past: "参加した" },
        past: { default: "参加した" },
        progressive: { default: "参加しているところ", nonPredicate: "参加している" },
        perfect: { default: "既に参加してい" },
        passive: { default: "参加され" },
        noun: { default: "参加すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configJump: VerbConfig = {
    id: "jump_verb",
    forms: { base: "jump", es: "jumps", ed: "jumped", en: "jumped", ing: "jumping" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "跳ぶ", imperfective: "跳ば", past: "跳んだ" },
        past: { default: "跳んだ" },
        progressive: { default: "跳んでいるところ", nonPredicate: "跳んでいる" },
        perfect: { default: "既に跳んでい" },
        noun: { default: "跳ぶこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configKick: VerbConfig = {
    id: "kick_verb",
    forms: { base: "kick", es: "kicks", ed: "kicked", en: "kicked", ing: "kicking" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "蹴る", imperfective: "蹴ら", past: "蹴った" },
        past: { default: "蹴った" },
        progressive: { default: "蹴っているところ", nonPredicate: "蹴っている" },
        perfect: { default: "既に蹴ってい" },
        passive: { default: "蹴られ" },
        noun: { default: "蹴ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configKiss: VerbConfig = {
    id: "kiss_verb",
    forms: { base: "kiss", es: "kisses", ed: "kissed", en: "kissed", ing: "kissing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "キスする", imperfective: "キスし", past: "キスした" },
        past: { default: "キスした" },
        progressive: { default: "キスしているところ", nonPredicate: "キスしている" },
        perfect: { default: "既にキスしてい" },
        passive: { default: "キスされ" },
        noun: { default: "キスすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configLand: VerbConfig = {
    id: "land_verb",
    forms: { base: "land", es: "lands", ed: "landed", en: "landed", ing: "landing" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "着陸する", imperfective: "着陸し", past: "着陸した" },
        past: { default: "着陸した" },
        progressive: { default: "着陸しているところ", nonPredicate: "着陸している" },
        perfect: { default: "既に着陸してい" },
        noun: { default: "着陸すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configLaugh: VerbConfig = {
    id: "laugh_verb",
    forms: { base: "laugh", es: "laughs", ed: "laughed", en: "laughed", ing: "laughing" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "笑う", imperfective: "笑わ", past: "笑った" },
        past: { default: "笑った" },
        progressive: { default: "笑っているところ", nonPredicate: "笑っている" },
        perfect: { default: "既に笑ってい" },
        noun: { default: "笑うこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configLend: VerbConfig = {
    id: "lend_verb",
    forms: { base: "lend", es: "lends", ed: "lent", en: "lent", ing: "lending" },
    complements: [
        { expected: { head: { type: det, case: "acc" } }, particle: "に" },
        { expected: { head: { type: det, case: "acc" } }, particle: "を" }
    ],
    transitive: true,
    translations: {
        present: { default: "貸す", imperfective: "貸さ", past: "貸した" },
        past: { default: "貸した" },
        progressive: { default: "貸しているところ", nonPredicate: "貸している" },
        perfect: { default: "既に貸してい" },
        passive: { default: "貸され" },
        noun: { default: "貸すこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configLet: VerbConfig = {
    id: "let_verb",
    forms: { base: "let", es: "lets", ed: "let", en: "let", ing: "letting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "させる", imperfective: "させ", past: "させた" },
        past: { default: "させた" },
        progressive: { default: "させているところ", nonPredicate: "させている" },
        perfect: { default: "既にさせてい" },
        passive: { default: "させられ" },
        noun: { default: "させること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configLift: VerbConfig = {
    id: "lift_verb",
    forms: { base: "lift", es: "lifts", ed: "lifted", en: "lifted", ing: "lifting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "持ち上げる", imperfective: "持ち上げ", past: "持ち上げた" },
        past: { default: "持ち上げた" },
        progressive: { default: "持ち上げているところ", nonPredicate: "持ち上げている" },
        perfect: { default: "既に持ち上げてい" },
        passive: { default: "持ち上げられ" },
        noun: { default: "持ち上げること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configListen: VerbConfig = {
    id: "listen_verb",
    forms: { base: "listen", es: "listens", ed: "listened", en: "listened", ing: "listening" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "聴く", imperfective: "聴か", past: "聴いた" },
        past: { default: "聴いた" },
        progressive: { default: "聴いているところ", nonPredicate: "聴いている" },
        perfect: { default: "既に聴いてい" },
        passive: { default: "聴かれ" },
        noun: { default: "聴くこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configLock: VerbConfig = {
    id: "lock_verb",
    forms: { base: "lock", es: "locks", ed: "locked", en: "locked", ing: "locking" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "施錠する", imperfective: "施錠し", past: "施錠した" },
        past: { default: "施錠した" },
        progressive: { default: "施錠しているところ", nonPredicate: "施錠している" },
        perfect: { default: "既に施錠してい" },
        passive: { default: "施錠され" },
        noun: { default: "施錠すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configLog: VerbConfig = {
    id: "log_verb",
    forms: { base: "log", es: "logs", ed: "logged", en: "logged", ing: "logging" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "記録する", imperfective: "記録し", past: "記録した" },
        past: { default: "記録した" },
        progressive: { default: "記録しているところ", nonPredicate: "記録している" },
        perfect: { default: "既に記録してい" },
        passive: { default: "記録され" },
        noun: { default: "記録すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configMail: VerbConfig = {
    id: "mail_verb",
    forms: { base: "mail", es: "mails", ed: "mailed", en: "mailed", ing: "mailing" },
    complements: [
        { expected: { head: { type: det, case: "acc" } }, particle: "に" },
        { expected: { head: { type: det, case: "acc" } }, particle: "を" }
    ],
    transitive: true,
    translations: {
        present: { default: "郵送する", imperfective: "郵送し", past: "郵送した" },
        past: { default: "郵送した" },
        progressive: { default: "郵送しているところ", nonPredicate: "郵送している" },
        perfect: { default: "既に郵送してい" },
        passive: { default: "郵送され" },
        noun: { default: "郵送すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configManage: VerbConfig = {
    id: "manage_verb",
    forms: { base: "manage", es: "manages", ed: "managed", en: "managed", ing: "managing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "管理する", imperfective: "管理し", past: "管理した" },
        past: { default: "管理した" },
        progressive: { default: "管理しているところ", nonPredicate: "管理している" },
        perfect: { default: "既に管理してい" },
        passive: { default: "管理され" },
        noun: { default: "管理すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configMarry: VerbConfig = {
    id: "marry_verb",
    forms: { base: "marry", es: "marries", ed: "married", en: "married", ing: "marrying" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "結婚する", imperfective: "結婚し", past: "結婚した" },
        past: { default: "結婚した" },
        progressive: { default: "結婚しているところ", nonPredicate: "結婚している" },
        perfect: { default: "既に結婚してい" },
        noun: { default: "結婚すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configMatch: VerbConfig = {
    id: "match_verb",
    forms: { base: "match", es: "matches", ed: "matched", en: "matched", ing: "matching" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "に" }],
    transitive: true,
    translations: {
        present: { default: "一致する", imperfective: "一致し", past: "一致した" },
        past: { default: "一致した" },
        progressive: { default: "一致しているところ", nonPredicate: "一致している" },
        perfect: { default: "既に一致してい" },
        passive: { default: "一致され" },
        noun: { default: "一致すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configMeasure: VerbConfig = {
    id: "measure_verb",
    forms: { base: "measure", es: "measures", ed: "measured", en: "measured", ing: "measuring" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "計測する", imperfective: "計測し", past: "計測した" },
        past: { default: "計測した" },
        progressive: { default: "計測しているところ", nonPredicate: "計測している" },
        perfect: { default: "既に計測してい" },
        passive: { default: "計測され" },
        noun: { default: "計測すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configMelt: VerbConfig = {
    id: "melt_verb",
    forms: { base: "melt", es: "melts", ed: "melted", en: "melted", ing: "melting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "溶かす", imperfective: "溶かさ", past: "溶かした" },
        past: { default: "溶かした" },
        progressive: { default: "溶かしているところ", nonPredicate: "溶かしている" },
        perfect: { default: "既に溶かしてい" },
        passive: { default: "溶かされ" },
        noun: { default: "溶かすこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configMention: VerbConfig = {
    id: "mention_verb",
    forms: { base: "mention", es: "mentions", ed: "mentioned", en: "mentioned", ing: "mentioning" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "言及する", imperfective: "言及し", past: "言及した" },
        past: { default: "言及した" },
        progressive: { default: "言及しているところ", nonPredicate: "言及している" },
        perfect: { default: "既に言及してい" },
        passive: { default: "言及され" },
        noun: { default: "言及すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configMiss: VerbConfig = {
    id: "miss_verb",
    forms: { base: "miss", es: "misses", ed: "missed", en: "missed", ing: "missing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "逃す", imperfective: "逃さ", past: "逃した" },
        past: { default: "逃した" },
        progressive: { default: "逃しているところ", nonPredicate: "逃している" },
        perfect: { default: "既に逃してい" },
        passive: { default: "逃され" },
        noun: { default: "逃すこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configMix: VerbConfig = {
    id: "mix_verb",
    forms: { base: "mix", es: "mixes", ed: "mixed", en: "mixed", ing: "mixing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "混ぜる", imperfective: "混ぜ", past: "混ぜた" },
        past: { default: "混ぜた" },
        progressive: { default: "混ぜているところ", nonPredicate: "混ぜている" },
        perfect: { default: "既に混ぜてい" },
        passive: { default: "混ぜられ" },
        noun: { default: "混ぜること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configMop: VerbConfig = {
    id: "mop_verb",
    forms: { base: "mop", es: "mops", ed: "mopped", en: "mopped", ing: "mopping" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "モップがけする", imperfective: "モップがけし", past: "モップがけした" },
        past: { default: "モップがけした" },
        progressive: { default: "モップがけしているところ", nonPredicate: "モップがけしている" },
        perfect: { default: "既にモップがけしてい" },
        passive: { default: "モップがけされ" },
        noun: { default: "モップがけすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configOrder: VerbConfig = {
    id: "order_verb",
    forms: { base: "order", es: "orders", ed: "ordered", en: "ordered", ing: "ordering" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "注文する", imperfective: "注文し", past: "注文した" },
        past: { default: "注文した" },
        progressive: { default: "注文しているところ", nonPredicate: "注文している" },
        perfect: { default: "既に注文してい" },
        passive: { default: "注文され" },
        noun: { default: "注文すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configOrganize: VerbConfig = {
    id: "organize_verb",
    forms: { base: "organize", es: "organizes", ed: "organized", en: "organized", ing: "organizing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "整理する", imperfective: "整理し", past: "整理した" },
        past: { default: "整理した" },
        progressive: { default: "整理しているところ", nonPredicate: "整理している" },
        perfect: { default: "既に整理してい" },
        passive: { default: "整理され" },
        noun: { default: "整理すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configOwn: VerbConfig = {
    id: "own_verb",
    forms: { base: "own", es: "owns", ed: "owned", en: "owned", ing: "owning" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "所有する", imperfective: "所有し", past: "所有した" },
        past: { default: "所有した" },
        progressive: { default: "所有しているところ", nonPredicate: "所有している" },
        perfect: { default: "既に所有してい" },
        passive: { default: "所有され" },
        noun: { default: "所有すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configPack: VerbConfig = {
    id: "pack_verb",
    forms: { base: "pack", es: "packs", ed: "packed", en: "packed", ing: "packing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "梱包する", imperfective: "梱包し", past: "梱包した" },
        past: { default: "梱包した" },
        progressive: { default: "梱包しているところ", nonPredicate: "梱包している" },
        perfect: { default: "既に梱包してい" },
        passive: { default: "梱包され" },
        noun: { default: "梱包すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configPaint: VerbConfig = {
    id: "paint_verb",
    forms: { base: "paint", es: "paints", ed: "painted", en: "painted", ing: "painting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "塗る", imperfective: "塗ら", past: "塗った" },
        past: { default: "塗った" },
        progressive: { default: "塗っているところ", nonPredicate: "塗っている" },
        perfect: { default: "既に塗ってい" },
        passive: { default: "塗られ" },
        noun: { default: "塗ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configPark: VerbConfig = {
    id: "park_verb",
    forms: { base: "park", es: "parks", ed: "parked", en: "parked", ing: "parking" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "駐車する", imperfective: "駐車し", past: "駐車した" },
        past: { default: "駐車した" },
        progressive: { default: "駐車しているところ", nonPredicate: "駐車している" },
        perfect: { default: "既に駐車してい" },
        passive: { default: "駐車され" },
        noun: { default: "駐車すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configPaste: VerbConfig = {
    id: "paste_verb",
    forms: { base: "paste", es: "pastes", ed: "pasted", en: "pasted", ing: "pasting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "貼り付ける", imperfective: "貼り付け", past: "貼り付けた" },
        past: { default: "貼り付けた" },
        progressive: { default: "貼り付けているところ", nonPredicate: "貼り付けている" },
        perfect: { default: "既に貼り付けてい" },
        passive: { default: "貼り付けられ" },
        noun: { default: "貼り付けること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configPause: VerbConfig = {
    id: "pause_verb",
    forms: { base: "pause", es: "pauses", ed: "paused", en: "paused", ing: "pausing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "一時停止する", imperfective: "一時停止し", past: "一時停止した" },
        past: { default: "一時停止した" },
        progressive: { default: "一時停止しているところ", nonPredicate: "一時停止している" },
        perfect: { default: "既に一時停止してい" },
        passive: { default: "一時停止され" },
        noun: { default: "一時停止すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configPet: VerbConfig = {
    id: "pet_verb",
    forms: { base: "pet", es: "pets", ed: "petted", en: "petted", ing: "petting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "撫でる", imperfective: "撫で", past: "撫でた" },
        past: { default: "撫でた" },
        progressive: { default: "撫でているところ", nonPredicate: "撫でている" },
        perfect: { default: "既に撫でてい" },
        passive: { default: "撫でられ" },
        noun: { default: "撫でること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configPhotograph: VerbConfig = {
    id: "photograph_verb",
    forms: { base: "photograph", es: "photographs", ed: "photographed", en: "photographed", ing: "photographing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "撮影する", imperfective: "撮影し", past: "撮影した" },
        past: { default: "撮影した" },
        progressive: { default: "撮影しているところ", nonPredicate: "撮影している" },
        perfect: { default: "既に撮影してい" },
        passive: { default: "撮影され" },
        noun: { default: "撮影すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configPlan: VerbConfig = {
    id: "plan_verb",
    forms: { base: "plan", es: "plans", ed: "planned", en: "planned", ing: "planning" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "計画する", imperfective: "計画し", past: "計画した" },
        past: { default: "計画した" },
        progressive: { default: "計画しているところ", nonPredicate: "計画している" },
        perfect: { default: "既に計画してい" },
        passive: { default: "計画され" },
        noun: { default: "計画すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configPlant: VerbConfig = {
    id: "plant_verb",
    forms: { base: "plant", es: "plants", ed: "planted", en: "planted", ing: "planting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "植える", imperfective: "植え", past: "植えた" },
        past: { default: "植えた" },
        progressive: { default: "植えているところ", nonPredicate: "植えている" },
        perfect: { default: "既に植えてい" },
        passive: { default: "植えられ" },
        noun: { default: "植えること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configPost: VerbConfig = {
    id: "post_verb",
    forms: { base: "post", es: "posts", ed: "posted", en: "posted", ing: "posting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "投稿する", imperfective: "投稿し", past: "投稿した" },
        past: { default: "投稿した" },
        progressive: { default: "投稿しているところ", nonPredicate: "投稿している" },
        perfect: { default: "既に投稿してい" },
        passive: { default: "投稿され" },
        noun: { default: "投稿すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configPour: VerbConfig = {
    id: "pour_verb",
    forms: { base: "pour", es: "pours", ed: "poured", en: "poured", ing: "pouring" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "注ぐ", imperfective: "注が", past: "注いだ" },
        past: { default: "注いだ" },
        progressive: { default: "注いでいるところ", nonPredicate: "注いでいる" },
        perfect: { default: "既に注いでい" },
        passive: { default: "注がれ" },
        noun: { default: "注ぐこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configPractice: VerbConfig = {
    id: "practice_verb",
    forms: { base: "practice", es: "practices", ed: "practiced", en: "practiced", ing: "practicing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "練習する", imperfective: "練習し", past: "練習した" },
        past: { default: "練習した" },
        progressive: { default: "練習しているところ", nonPredicate: "練習している" },
        perfect: { default: "既に練習してい" },
        passive: { default: "練習され" },
        noun: { default: "練習すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configPrefer: VerbConfig = {
    id: "prefer_verb",
    forms: { base: "prefer", es: "prefers", ed: "preferred", en: "preferred", ing: "preferring" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "優先する", imperfective: "優先し", past: "優先した" },
        past: { default: "優先した" },
        progressive: { default: "優先しているところ", nonPredicate: "優先している" },
        perfect: { default: "既に優先してい" },
        passive: { default: "優先され" },
        noun: { default: "優先すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configPrepare: VerbConfig = {
    id: "prepare_verb",
    forms: { base: "prepare", es: "prepares", ed: "prepared", en: "prepared", ing: "preparing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "準備する", imperfective: "準備し", past: "準備した" },
        past: { default: "準備した" },
        progressive: { default: "準備しているところ", nonPredicate: "準備している" },
        perfect: { default: "既に準備してい" },
        passive: { default: "準備され" },
        noun: { default: "準備すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configPrint: VerbConfig = {
    id: "print_verb",
    forms: { base: "print", es: "prints", ed: "printed", en: "printed", ing: "printing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "印刷する", imperfective: "印刷し", past: "印刷した" },
        past: { default: "印刷した" },
        progressive: { default: "印刷しているところ", nonPredicate: "印刷している" },
        perfect: { default: "既に印刷してい" },
        passive: { default: "印刷され" },
        noun: { default: "印刷すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configPromise: VerbConfig = {
    id: "promise_verb",
    forms: { base: "promise", es: "promises", ed: "promised", en: "promised", ing: "promising" },
    complements: [
        { expected: { head: { type: det, case: "acc" } }, particle: "に" },
        { expected: { head: { type: det, case: "acc" } }, particle: "を" }
    ],
    transitive: true,
    translations: {
        present: { default: "約束する", imperfective: "約束し", past: "約束した" },
        past: { default: "約束した" },
        progressive: { default: "約束しているところ", nonPredicate: "約束している" },
        perfect: { default: "既に約束してい" },
        passive: { default: "約束され" },
        noun: { default: "約束すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configPush: VerbConfig = {
    id: "push_verb",
    forms: { base: "push", es: "pushes", ed: "pushed", en: "pushed", ing: "pushing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "押す", imperfective: "押さ", past: "押した" },
        past: { default: "押した" },
        progressive: { default: "押しているところ", nonPredicate: "押している" },
        perfect: { default: "既に押してい" },
        passive: { default: "押され" },
        noun: { default: "押すこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configRecommend: VerbConfig = {
    id: "recommend_verb",
    forms: { base: "recommend", es: "recommends", ed: "recommended", en: "recommended", ing: "recommending" },
    complements: [
        { expected: { head: { type: det, case: "acc" } }, particle: "に" },
        { expected: { head: { type: det, case: "acc" } }, particle: "を" }
    ],
    transitive: true,
    translations: {
        present: { default: "推薦する", imperfective: "推薦し", past: "推薦した" },
        past: { default: "推薦した" },
        progressive: { default: "推薦しているところ", nonPredicate: "推薦している" },
        perfect: { default: "既に推薦してい" },
        passive: { default: "推薦され" },
        noun: { default: "推薦すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configRecord: VerbConfig = {
    id: "record_verb",
    forms: { base: "record", es: "records", ed: "recorded", en: "recorded", ing: "recording" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "記録する", imperfective: "記録し", past: "記録した" },
        past: { default: "記録した" },
        progressive: { default: "記録しているところ", nonPredicate: "記録している" },
        perfect: { default: "既に記録してい" },
        passive: { default: "記録され" },
        noun: { default: "記録すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configReduce: VerbConfig = {
    id: "reduce_verb",
    forms: { base: "reduce", es: "reduces", ed: "reduced", en: "reduced", ing: "reducing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "減らす", imperfective: "減らさ", past: "減らした" },
        past: { default: "減らした" },
        progressive: { default: "減らしているところ", nonPredicate: "減らしている" },
        perfect: { default: "既に減らしてい" },
        passive: { default: "減らされ" },
        noun: { default: "減らすこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configRefuse: VerbConfig = {
    id: "refuse_verb",
    forms: { base: "refuse", es: "refuses", ed: "refused", en: "refused", ing: "refusing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "拒否する", imperfective: "拒否し", past: "拒否した" },
        past: { default: "拒否した" },
        progressive: { default: "拒否しているところ", nonPredicate: "拒否している" },
        perfect: { default: "既に拒否してい" },
        passive: { default: "拒否され" },
        noun: { default: "拒否すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configRegister: VerbConfig = {
    id: "register_verb",
    forms: { base: "register", es: "registers", ed: "registered", en: "registered", ing: "registering" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "登録する", imperfective: "登録し", past: "登録した" },
        past: { default: "登録した" },
        progressive: { default: "登録しているところ", nonPredicate: "登録している" },
        perfect: { default: "既に登録してい" },
        passive: { default: "登録され" },
        noun: { default: "登録すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configRelate: VerbConfig = {
    id: "relate_verb",
    forms: { base: "relate", es: "relates", ed: "related", en: "related", ing: "relating" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "に" }],
    transitive: true,
    translations: {
        present: { default: "関連する", imperfective: "関連し", past: "関連した" },
        past: { default: "関連した" },
        progressive: { default: "関連しているところ", nonPredicate: "関連している" },
        perfect: { default: "既に関連してい" },
        passive: { default: "関連され" },
        noun: { default: "関連すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configRemind: VerbConfig = {
    id: "remind_verb",
    forms: { base: "remind", es: "reminds", ed: "reminded", en: "reminded", ing: "reminding" },
    complements: [
        { expected: { head: { type: det, case: "acc" } }, particle: "に" },
        { expected: { head: { type: det, case: "acc" } }, particle: "を" }
    ],
    transitive: true,
    translations: {
        present: { default: "思い出させる", imperfective: "思い出させ", past: "思い出させた" },
        past: { default: "思い出させた" },
        progressive: { default: "思い出させているところ", nonPredicate: "思い出させている" },
        perfect: { default: "既に思い出させてい" },
        passive: { default: "思い出させられ" },
        noun: { default: "思い出させること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configRent: VerbConfig = {
    id: "rent_verb",
    forms: { base: "rent", es: "rents", ed: "rented", en: "rented", ing: "renting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "レンタルする", imperfective: "レンタルし", past: "レンタルした" },
        past: { default: "レンタルした" },
        progressive: { default: "レンタルしているところ", nonPredicate: "レンタルしている" },
        perfect: { default: "既にレンタルしてい" },
        passive: { default: "レンタルされ" },
        noun: { default: "レンタルすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configRepair: VerbConfig = {
    id: "repair_verb",
    forms: { base: "repair", es: "repairs", ed: "repaired", en: "repaired", ing: "repairing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "修理する", imperfective: "修理し", past: "修理した" },
        past: { default: "修理した" },
        progressive: { default: "修理しているところ", nonPredicate: "修理している" },
        perfect: { default: "既に修理してい" },
        passive: { default: "修理され" },
        noun: { default: "修理すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configRepeat: VerbConfig = {
    id: "repeat_verb",
    forms: { base: "repeat", es: "repeats", ed: "repeated", en: "repeated", ing: "repeating" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "繰り返す", imperfective: "繰り返さ", past: "繰り返した" },
        past: { default: "繰り返した" },
        progressive: { default: "繰り返しているところ", nonPredicate: "繰り返している" },
        perfect: { default: "既に繰り返してい" },
        passive: { default: "繰り返され" },
        noun: { default: "繰り返すこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configReplace: VerbConfig = {
    id: "replace_verb",
    forms: { base: "replace", es: "replaces", ed: "replaced", en: "replaced", ing: "replacing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "取り替える", imperfective: "取り替え", past: "取り替えた" },
        past: { default: "取り替えた" },
        progressive: { default: "取り替えているところ", nonPredicate: "取り替えている" },
        perfect: { default: "既に取り替えてい" },
        passive: { default: "取り替えられ" },
        noun: { default: "取り替えること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configReserve: VerbConfig = {
    id: "reserve_verb",
    forms: { base: "reserve", es: "reserves", ed: "reserved", en: "reserved", ing: "reserving" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "予約する", imperfective: "予約し", past: "予約した" },
        past: { default: "予約した" },
        progressive: { default: "予約しているところ", nonPredicate: "予約している" },
        perfect: { default: "既に予約してい" },
        passive: { default: "予約され" },
        noun: { default: "予約すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configReview: VerbConfig = {
    id: "review_verb",
    forms: { base: "review", es: "reviews", ed: "reviewed", en: "reviewed", ing: "reviewing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "見直す", imperfective: "見直さ", past: "見直した" },
        past: { default: "見直した" },
        progressive: { default: "見直しているところ", nonPredicate: "見直している" },
        perfect: { default: "既に見直してい" },
        passive: { default: "見直され" },
        noun: { default: "見直すこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configRide: VerbConfig = {
    id: "ride_verb",
    forms: { base: "ride", es: "rides", ed: "rode", en: "ridden", ing: "riding" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "に" }],
    transitive: true,
    translations: {
        present: { default: "乗る", imperfective: "乗ら", past: "乗った" },
        past: { default: "乗った" },
        progressive: { default: "乗っているところ", nonPredicate: "乗っている" },
        perfect: { default: "既に乗ってい" },
        passive: { default: "乗られ" },
        noun: { default: "乗ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configRow: VerbConfig = {
    id: "row_verb",
    forms: { base: "row", es: "rows", ed: "rowed", en: "rowed", ing: "rowing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "漕ぐ", imperfective: "漕が", past: "漕いだ" },
        past: { default: "漕いだ" },
        progressive: { default: "漕いでいるところ", nonPredicate: "漕いでいる" },
        perfect: { default: "既に漕いでい" },
        passive: { default: "漕がれ" },
        noun: { default: "漕ぐこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configSail: VerbConfig = {
    id: "sail_verb",
    forms: { base: "sail", es: "sails", ed: "sailed", en: "sailed", ing: "sailing" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "航海する", imperfective: "航海し", past: "航海した" },
        past: { default: "航海した" },
        progressive: { default: "航海しているところ", nonPredicate: "航海している" },
        perfect: { default: "既に航海してい" },
        noun: { default: "航海すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configSave: VerbConfig = {
    id: "save_verb",
    forms: { base: "save", es: "saves", ed: "saved", en: "saved", ing: "saving" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "保存する", imperfective: "保存し", past: "保存した" },
        past: { default: "保存した" },
        progressive: { default: "保存しているところ", nonPredicate: "保存している" },
        perfect: { default: "既に保存してい" },
        passive: { default: "保存され" },
        noun: { default: "保存すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configScan: VerbConfig = {
    id: "scan_verb",
    forms: { base: "scan", es: "scans", ed: "scanned", en: "scanned", ing: "scanning" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "スキャンする", imperfective: "スキャンし", past: "スキャンした" },
        past: { default: "スキャンした" },
        progressive: { default: "スキャンしているところ", nonPredicate: "スキャンしている" },
        perfect: { default: "既にスキャンしてい" },
        passive: { default: "スキャンされ" },
        noun: { default: "スキャンすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configSchedule: VerbConfig = {
    id: "schedule_verb",
    forms: { base: "schedule", es: "schedules", ed: "scheduled", en: "scheduled", ing: "scheduling" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "予定する", imperfective: "予定し", past: "予定した" },
        past: { default: "予定した" },
        progressive: { default: "予定しているところ", nonPredicate: "予定している" },
        perfect: { default: "既に予定してい" },
        passive: { default: "予定され" },
        noun: { default: "予定すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configScroll: VerbConfig = {
    id: "scroll_verb",
    forms: { base: "scroll", es: "scrolls", ed: "scrolled", en: "scrolled", ing: "scrolling" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "スクロールする", imperfective: "スクロールし", past: "スクロールした" },
        past: { default: "スクロールした" },
        progressive: { default: "スクロールしているところ", nonPredicate: "スクロールしている" },
        perfect: { default: "既にスクロールしてい" },
        passive: { default: "スクロールされ" },
        noun: { default: "スクロールすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configSearch: VerbConfig = {
    id: "search_verb",
    forms: { base: "search", es: "searches", ed: "searched", en: "searched", ing: "searching" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "検索する", imperfective: "検索し", past: "検索した" },
        past: { default: "検索した" },
        progressive: { default: "検索しているところ", nonPredicate: "検索している" },
        perfect: { default: "既に検索してい" },
        passive: { default: "検索され" },
        noun: { default: "検索すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configSeem: VerbConfig = {
    id: "seem_verb",
    forms: { base: "seem", es: "seems", ed: "seemed", en: "seemed", ing: "seeming" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "見える", imperfective: "見え", past: "見えた" },
        past: { default: "見えた" },
        progressive: { default: "見えているところ", nonPredicate: "見えている" },
        perfect: { default: "既に見えてい" },
        noun: { default: "見えること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configShare: VerbConfig = {
    id: "share_verb",
    forms: { base: "share", es: "shares", ed: "shared", en: "shared", ing: "sharing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "共有する", imperfective: "共有し", past: "共有した" },
        past: { default: "共有した" },
        progressive: { default: "共有しているところ", nonPredicate: "共有している" },
        perfect: { default: "既に共有してい" },
        passive: { default: "共有され" },
        noun: { default: "共有すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configShip: VerbConfig = {
    id: "ship_verb",
    forms: { base: "ship", es: "ships", ed: "shipped", en: "shipped", ing: "shipping" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "発送する", imperfective: "発送し", past: "発送した" },
        past: { default: "発送した" },
        progressive: { default: "発送しているところ", nonPredicate: "発送している" },
        perfect: { default: "既に発送してい" },
        passive: { default: "発送され" },
        noun: { default: "発送すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configSleep: VerbConfig = {
    id: "sleep_verb",
    forms: { base: "sleep", es: "sleeps", ed: "slept", en: "slept", ing: "sleeping" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "寝る", imperfective: "寝", past: "寝た" },
        past: { default: "寝た" },
        progressive: { default: "寝ているところ", nonPredicate: "寝ている" },
        perfect: { default: "既に寝てい" },
        noun: { default: "寝ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configSlice: VerbConfig = {
    id: "slice_verb",
    forms: { base: "slice", es: "slices", ed: "sliced", en: "sliced", ing: "slicing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "薄切りにする", imperfective: "薄切りにし", past: "薄切りにした" },
        past: { default: "薄切りにした" },
        progressive: { default: "薄切りにしているところ", nonPredicate: "薄切りにしている" },
        perfect: { default: "既に薄切りにしてい" },
        passive: { default: "薄切りにされ" },
        noun: { default: "薄切りにすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configSmell: VerbConfig = {
    id: "smell_verb",
    forms: { base: "smell", es: "smells", ed: "smelled", en: "smelled", ing: "smelling" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "嗅ぐ", imperfective: "嗅が", past: "嗅いだ" },
        past: { default: "嗅いだ" },
        progressive: { default: "嗅いでいるところ", nonPredicate: "嗅いでいる" },
        perfect: { default: "既に嗅いでい" },
        passive: { default: "嗅がれ" },
        noun: { default: "嗅ぐこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configStart: VerbConfig = {
    id: "start_verb",
    forms: { base: "start", es: "starts", ed: "started", en: "started", ing: "starting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "開始する", imperfective: "開始し", past: "開始した" },
        past: { default: "開始した" },
        progressive: { default: "開始しているところ", nonPredicate: "開始している" },
        perfect: { default: "既に開始してい" },
        passive: { default: "開始され" },
        noun: { default: "開始すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configStir: VerbConfig = {
    id: "stir_verb",
    forms: { base: "stir", es: "stirs", ed: "stirred", en: "stirred", ing: "stirring" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "かき混ぜる", imperfective: "かき混ぜ", past: "かき混ぜた" },
        past: { default: "かき混ぜた" },
        progressive: { default: "かき混ぜているところ", nonPredicate: "かき混ぜている" },
        perfect: { default: "既にかき混ぜてい" },
        passive: { default: "かき混ぜられ" },
        noun: { default: "かき混ぜること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configStudy: VerbConfig = {
    id: "study_verb",
    forms: { base: "study", es: "studies", ed: "studied", en: "studied", ing: "studying" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "学習する", imperfective: "学習し", past: "学習した" },
        past: { default: "学習した" },
        progressive: { default: "学習しているところ", nonPredicate: "学習している" },
        perfect: { default: "既に学習してい" },
        passive: { default: "学習され" },
        noun: { default: "学習すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configSubscribe: VerbConfig = {
    id: "subscribe_verb",
    forms: { base: "subscribe", es: "subscribes", ed: "subscribed", en: "subscribed", ing: "subscribing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "購読する", imperfective: "購読し", past: "購読した" },
        past: { default: "購読した" },
        progressive: { default: "購読しているところ", nonPredicate: "購読している" },
        perfect: { default: "既に購読してい" },
        passive: { default: "購読され" },
        noun: { default: "購読すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configSwallow: VerbConfig = {
    id: "swallow_verb",
    forms: { base: "swallow", es: "swallows", ed: "swallowed", en: "swallowed", ing: "swallowing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "飲み込む", imperfective: "飲み込ま", past: "飲み込んだ" },
        past: { default: "飲み込んだ" },
        progressive: { default: "飲み込んでいるところ", nonPredicate: "飲み込んでいる" },
        perfect: { default: "既に飲み込んでい" },
        passive: { default: "飲み込まれ" },
        noun: { default: "飲み込むこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configSweep: VerbConfig = {
    id: "sweep_verb",
    forms: { base: "sweep", es: "sweeps", ed: "swept", en: "swept", ing: "sweeping" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "掃く", imperfective: "掃か", past: "掃いた" },
        past: { default: "掃いた" },
        progressive: { default: "掃いているところ", nonPredicate: "掃いている" },
        perfect: { default: "既に掃いてい" },
        passive: { default: "掃かれ" },
        noun: { default: "掃くこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configSwim: VerbConfig = {
    id: "swim_verb",
    forms: { base: "swim", es: "swims", ed: "swam", en: "swum", ing: "swimming" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "泳ぐ", imperfective: "泳が", past: "泳いだ" },
        past: { default: "泳いだ" },
        progressive: { default: "泳いでいるところ", nonPredicate: "泳いでいる" },
        perfect: { default: "既に泳いでい" },
        noun: { default: "泳ぐこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configTalk: VerbConfig = {
    id: "talk_verb",
    forms: { base: "talk", es: "talks", ed: "talked", en: "talked", ing: "talking" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "話す", imperfective: "話さ", past: "話した" },
        past: { default: "話した" },
        progressive: { default: "話しているところ", nonPredicate: "話している" },
        perfect: { default: "既に話してい" },
        noun: { default: "話すこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configTaste: VerbConfig = {
    id: "taste_verb",
    forms: { base: "taste", es: "tastes", ed: "tasted", en: "tasted", ing: "tasting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "味わう", imperfective: "味わわ", past: "味わった" },
        past: { default: "味わった" },
        progressive: { default: "味わっているところ", nonPredicate: "味わっている" },
        perfect: { default: "既に味わってい" },
        passive: { default: "味わわれ" },
        noun: { default: "味わうこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configTeach: VerbConfig = {
    id: "teach_verb",
    forms: { base: "teach", es: "teaches", ed: "taught", en: "taught", ing: "teaching" },
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

const configTest: VerbConfig = {
    id: "test_verb",
    forms: { base: "test", es: "tests", ed: "tested", en: "tested", ing: "testing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "テストする", imperfective: "テストし", past: "テストした" },
        past: { default: "テストした" },
        progressive: { default: "テストしているところ", nonPredicate: "テストしている" },
        perfect: { default: "既にテストしてい" },
        passive: { default: "テストされ" },
        noun: { default: "テストすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configText: VerbConfig = {
    id: "text_verb",
    forms: { base: "text", es: "texts", ed: "texted", en: "texted", ing: "texting" },
    complements: [
        { expected: { head: { type: det, case: "acc" } }, particle: "に" },
        { expected: { head: { type: det, case: "acc" } }, particle: "を" }
    ],
    transitive: true,
    translations: {
        present: { default: "テキストする", imperfective: "テキストし", past: "テキストした" },
        past: { default: "テキストした" },
        progressive: { default: "テキストしているところ", nonPredicate: "テキストしている" },
        perfect: { default: "既にテキストしてい" },
        passive: { default: "テキストされ" },
        noun: { default: "テキストすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configThrow: VerbConfig = {
    id: "throw_verb",
    forms: { base: "throw", es: "throws", ed: "threw", en: "thrown", ing: "throwing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "投げる", imperfective: "投げ", past: "投げた" },
        past: { default: "投げた" },
        progressive: { default: "投げているところ", nonPredicate: "投げている" },
        perfect: { default: "既に投げてい" },
        passive: { default: "投げられ" },
        noun: { default: "投げること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configTouch: VerbConfig = {
    id: "touch_verb",
    forms: { base: "touch", es: "touches", ed: "touched", en: "touched", ing: "touching" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "触る", imperfective: "触ら", past: "触った" },
        past: { default: "触った" },
        progressive: { default: "触っているところ", nonPredicate: "触っている" },
        perfect: { default: "既に触ってい" },
        passive: { default: "触られ" },
        noun: { default: "触ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configTour: VerbConfig = {
    id: "tour_verb",
    forms: { base: "tour", es: "tours", ed: "toured", en: "toured", ing: "touring" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "観光する", imperfective: "観光し", past: "観光した" },
        past: { default: "観光した" },
        progressive: { default: "観光しているところ", nonPredicate: "観光している" },
        perfect: { default: "既に観光してい" },
        passive: { default: "観光され" },
        noun: { default: "観光すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configTrack: VerbConfig = {
    id: "track_verb",
    forms: { base: "track", es: "tracks", ed: "tracked", en: "tracked", ing: "tracking" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "追跡する", imperfective: "追跡し", past: "追跡した" },
        past: { default: "追跡した" },
        progressive: { default: "追跡しているところ", nonPredicate: "追跡している" },
        perfect: { default: "既に追跡してい" },
        passive: { default: "追跡され" },
        noun: { default: "追跡すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configTrain: VerbConfig = {
    id: "train_verb",
    forms: { base: "train", es: "trains", ed: "trained", en: "trained", ing: "training" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "訓練する", imperfective: "訓練し", past: "訓練した" },
        past: { default: "訓練した" },
        progressive: { default: "訓練しているところ", nonPredicate: "訓練している" },
        perfect: { default: "既に訓練してい" },
        passive: { default: "訓練され" },
        noun: { default: "訓練すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configTransfer: VerbConfig = {
    id: "transfer_verb",
    forms: { base: "transfer", es: "transfers", ed: "transferred", en: "transferred", ing: "transferring" },
    complements: [
        { expected: { head: { type: det, case: "acc" } }, particle: "に" },
        { expected: { head: { type: det, case: "acc" } }, particle: "を" }
    ],
    transitive: true,
    translations: {
        present: { default: "振り込む", imperfective: "振り込ま", past: "振り込んだ" },
        past: { default: "振り込んだ" },
        progressive: { default: "振り込んでいるところ", nonPredicate: "振り込んでいる" },
        perfect: { default: "既に振り込んでい" },
        passive: { default: "振り込まれ" },
        noun: { default: "振り込むこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configTravel: VerbConfig = {
    id: "travel_verb",
    forms: { base: "travel", es: "travels", ed: "traveled", en: "traveled", ing: "traveling" },
    complements: [],
    transitive: false,
    translations: {
        present: { default: "旅行する", imperfective: "旅行し", past: "旅行した" },
        past: { default: "旅行した" },
        progressive: { default: "旅行しているところ", nonPredicate: "旅行している" },
        perfect: { default: "既に旅行してい" },
        noun: { default: "旅行すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configTurn: VerbConfig = {
    id: "turn_verb",
    forms: { base: "turn", es: "turns", ed: "turned", en: "turned", ing: "turning" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "回す", imperfective: "回さ", past: "回した" },
        past: { default: "回した" },
        progressive: { default: "回しているところ", nonPredicate: "回している" },
        perfect: { default: "既に回してい" },
        passive: { default: "回され" },
        noun: { default: "回すこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configType: VerbConfig = {
    id: "type_verb",
    forms: { base: "type", es: "types", ed: "typed", en: "typed", ing: "typing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "入力する", imperfective: "入力し", past: "入力した" },
        past: { default: "入力した" },
        progressive: { default: "入力しているところ", nonPredicate: "入力している" },
        perfect: { default: "既に入力してい" },
        passive: { default: "入力され" },
        noun: { default: "入力すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configUnfasten: VerbConfig = {
    id: "unfasten_verb",
    forms: { base: "unfasten", es: "unfastens", ed: "unfastened", en: "unfastened", ing: "unfastening" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "緩める", imperfective: "緩め", past: "緩めた" },
        past: { default: "緩めた" },
        progressive: { default: "緩めているところ", nonPredicate: "緩めている" },
        perfect: { default: "既に緩めてい" },
        passive: { default: "緩められ" },
        noun: { default: "緩めること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configUnlock: VerbConfig = {
    id: "unlock_verb",
    forms: { base: "unlock", es: "unlocks", ed: "unlocked", en: "unlocked", ing: "unlocking" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "解錠する", imperfective: "解錠し", past: "解錠した" },
        past: { default: "解錠した" },
        progressive: { default: "解錠しているところ", nonPredicate: "解錠している" },
        perfect: { default: "既に解錠してい" },
        passive: { default: "解錠され" },
        noun: { default: "解錠すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configUnpack: VerbConfig = {
    id: "unpack_verb",
    forms: { base: "unpack", es: "unpacks", ed: "unpacked", en: "unpacked", ing: "unpacking" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "開梱する", imperfective: "開梱し", past: "開梱した" },
        past: { default: "開梱した" },
        progressive: { default: "開梱しているところ", nonPredicate: "開梱している" },
        perfect: { default: "既に開梱してい" },
        passive: { default: "開梱され" },
        noun: { default: "開梱すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configUpgrade: VerbConfig = {
    id: "upgrade_verb",
    forms: { base: "upgrade", es: "upgrades", ed: "upgraded", en: "upgraded", ing: "upgrading" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "アップグレードする", imperfective: "アップグレードし", past: "アップグレードした" },
        past: { default: "アップグレードした" },
        progressive: { default: "アップグレードしているところ", nonPredicate: "アップグレードしている" },
        perfect: { default: "既にアップグレードしてい" },
        passive: { default: "アップグレードされ" },
        noun: { default: "アップグレードすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configUpload: VerbConfig = {
    id: "upload_verb",
    forms: { base: "upload", es: "uploads", ed: "uploaded", en: "uploaded", ing: "uploading" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "アップロードする", imperfective: "アップロードし", past: "アップロードした" },
        past: { default: "アップロードした" },
        progressive: { default: "アップロードしているところ", nonPredicate: "アップロードしている" },
        perfect: { default: "既にアップロードしてい" },
        passive: { default: "アップロードされ" },
        noun: { default: "アップロードすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configVacuum: VerbConfig = {
    id: "vacuum_verb",
    forms: { base: "vacuum", es: "vacuums", ed: "vacuumed", en: "vacuumed", ing: "vacuuming" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "掃除機をかける", imperfective: "掃除機をかけ", past: "掃除機をかけた" },
        past: { default: "掃除機をかけた" },
        progressive: { default: "掃除機をかけているところ", nonPredicate: "掃除機をかけている" },
        perfect: { default: "既に掃除機をかけてい" },
        passive: { default: "掃除機をかけられ" },
        noun: { default: "掃除機をかけること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configVisit: VerbConfig = {
    id: "visit_verb",
    forms: { base: "visit", es: "visits", ed: "visited", en: "visited", ing: "visiting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "訪れる", imperfective: "訪れ", past: "訪れた" },
        past: { default: "訪れた" },
        progressive: { default: "訪れているところ", nonPredicate: "訪れている" },
        perfect: { default: "既に訪れてい" },
        passive: { default: "訪れられ" },
        noun: { default: "訪れること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configWash: VerbConfig = {
    id: "wash_verb",
    forms: { base: "wash", es: "washes", ed: "washed", en: "washed", ing: "washing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "洗う", imperfective: "洗わ", past: "洗った" },
        past: { default: "洗った" },
        progressive: { default: "洗っているところ", nonPredicate: "洗っている" },
        perfect: { default: "既に洗ってい" },
        passive: { default: "洗われ" },
        noun: { default: "洗うこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configWaste: VerbConfig = {
    id: "waste_verb",
    forms: { base: "waste", es: "wastes", ed: "wasted", en: "wasted", ing: "wasting" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "無駄にする", imperfective: "無駄にし", past: "無駄にした" },
        past: { default: "無駄にした" },
        progressive: { default: "無駄にしているところ", nonPredicate: "無駄にしている" },
        perfect: { default: "既に無駄にしてい" },
        passive: { default: "無駄にされ" },
        noun: { default: "無駄にすること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configWater: VerbConfig = {
    id: "water_verb",
    forms: { base: "water", es: "waters", ed: "watered", en: "watered", ing: "watering" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "給水する", imperfective: "給水し", past: "給水した" },
        past: { default: "給水した" },
        progressive: { default: "給水しているところ", nonPredicate: "給水している" },
        perfect: { default: "既に給水してい" },
        passive: { default: "給水され" },
        noun: { default: "給水すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configWear: VerbConfig = {
    id: "wear_verb",
    forms: { base: "wear", es: "wears", ed: "wore", en: "worn", ing: "wearing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "着る", imperfective: "着", past: "着た" },
        past: { default: "着た" },
        progressive: { default: "着ているところ", nonPredicate: "着ている" },
        perfect: { default: "既に着てい" },
        passive: { default: "着られ" },
        noun: { default: "着ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configWeigh: VerbConfig = {
    id: "weigh_verb",
    forms: { base: "weigh", es: "weighs", ed: "weighed", en: "weighed", ing: "weighing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "量る", imperfective: "量ら", past: "量った" },
        past: { default: "量った" },
        progressive: { default: "量っているところ", nonPredicate: "量っている" },
        perfect: { default: "既に量ってい" },
        passive: { default: "量られ" },
        noun: { default: "量ること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configWithdraw: VerbConfig = {
    id: "withdraw_verb",
    forms: { base: "withdraw", es: "withdraws", ed: "withdrew", en: "withdrawn", ing: "withdrawing" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "引き出す", imperfective: "引き出さ", past: "引き出した" },
        past: { default: "引き出した" },
        progressive: { default: "引き出しているところ", nonPredicate: "引き出している" },
        perfect: { default: "既に引き出してい" },
        passive: { default: "引き出され" },
        noun: { default: "引き出すこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'skill',
    color: "tomato",
};

const configWonder: VerbConfig = {
    id: "wonder_verb",
    forms: { base: "wonder", es: "wonders", ed: "wondered", en: "wondered", ing: "wondering" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "疑問に思う", imperfective: "疑問に思わ", past: "疑問に思った" },
        past: { default: "疑問に思った" },
        progressive: { default: "疑問に思っているところ", nonPredicate: "疑問に思っている" },
        perfect: { default: "既に疑問に思ってい" },
        passive: { default: "疑問に思われ" },
        noun: { default: "疑問に思うこと" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
    color: "tomato",
};

const configWorry: VerbConfig = {
    id: "worry_verb",
    forms: { base: "worry", es: "worries", ed: "worried", en: "worried", ing: "worrying" },
    complements: [{ expected: { head: { type: det, case: "acc" } }, particle: "を" }],
    transitive: true,
    translations: {
        present: { default: "心配する", imperfective: "心配し", past: "心配した" },
        past: { default: "心配した" },
        progressive: { default: "心配しているところ", nonPredicate: "心配している" },
        perfect: { default: "既に心配してい" },
        passive: { default: "心配され" },
        noun: { default: "心配すること" }
    },
    gerundSubject: true,
    toSubject: true,
    adv_manner_type: 'degree',
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

export const verbAccept = generator.createVerbBlock(configAccept);
export const verbAffect = generator.createVerbBlock(configAffect);
export const verbAnswer = generator.createVerbBlock(configAnswer);
export const verbArgue = generator.createVerbBlock(configArgue);
export const verbArrange = generator.createVerbBlock(configArrange);
export const verbArrive = generator.createVerbBlock(configArrive);
export const verbAvoid = generator.createVerbBlock(configAvoid);
export const verbBake = generator.createVerbBlock(configBake);
export const verbBe = generator.createVerbBlock(configBe);
export const verbBite = generator.createVerbBlock(configBite);
export const verbBoard = generator.createVerbBlock(configBoard);
export const verbBoil = generator.createVerbBlock(configBoil);
export const verbBook = generator.createVerbBlock(configBook);
export const verbBorrow = generator.createVerbBlock(configBorrow);
export const verbBrowse = generator.createVerbBlock(configBrowse);
export const verbCamp = generator.createVerbBlock(configCamp);
export const verbCancel = generator.createVerbBlock(configCancel);
export const verbCharge = generator.createVerbBlock(configCharge);
export const verbChat = generator.createVerbBlock(configChat);
export const verbCheck = generator.createVerbBlock(configCheck);
export const verbChew = generator.createVerbBlock(configChew);
export const verbClean = generator.createVerbBlock(configClean);
export const verbClick = generator.createVerbBlock(configClick);
export const verbClimb = generator.createVerbBlock(configClimb);
export const verbClose = generator.createVerbBlock(configClose);
export const verbColor = generator.createVerbBlock(configColor);
export const verbComment = generator.createVerbBlock(configComment);
export const verbCompare = generator.createVerbBlock(configCompare);
export const verbComplain = generator.createVerbBlock(configComplain);
export const verbCook = generator.createVerbBlock(configCook);
export const verbCool = generator.createVerbBlock(configCool);
export const verbCoordinate = generator.createVerbBlock(configCoordinate);
export const verbCopy = generator.createVerbBlock(configCopy);
export const verbCost = generator.createVerbBlock(configCost);
export const verbCross = generator.createVerbBlock(configCross);
export const verbDelete = generator.createVerbBlock(configDelete);
export const verbDeliver = generator.createVerbBlock(configDeliver);
export const verbDeny = generator.createVerbBlock(configDeny);
export const verbDepart = generator.createVerbBlock(configDepart);
export const verbDepend = generator.createVerbBlock(configDepend);
export const verbDescribe = generator.createVerbBlock(configDescribe);
export const verbDesign = generator.createVerbBlock(configDesign);
export const verbDisagree = generator.createVerbBlock(configDisagree);
export const verbDiscuss = generator.createVerbBlock(configDiscuss);
export const verbDownload = generator.createVerbBlock(configDownload);
export const verbDrink = generator.createVerbBlock(configDrink);
export const verbDrive = generator.createVerbBlock(configDrive);
export const verbEarn = generator.createVerbBlock(configEarn);
export const verbEdit = generator.createVerbBlock(configEdit);
export const verbEmail = generator.createVerbBlock(configEmail);
export const verbEnd = generator.createVerbBlock(configEnd);
export const verbEnjoy = generator.createVerbBlock(configEnjoy);
export const verbEnter = generator.createVerbBlock(configEnter);
export const verbErase = generator.createVerbBlock(configErase);
export const verbExchange = generator.createVerbBlock(configExchange);
export const verbExercise = generator.createVerbBlock(configExercise);
export const verbExplore = generator.createVerbBlock(configExplore);
export const verbFasten = generator.createVerbBlock(configFasten);
export const verbFeed = generator.createVerbBlock(configFeed);
export const verbFill = generator.createVerbBlock(configFill);
export const verbFilm = generator.createVerbBlock(configFilm);
export const verbFinish = generator.createVerbBlock(configFinish);
export const verbFire = generator.createVerbBlock(configFire);
export const verbFish = generator.createVerbBlock(configFish);
export const verbFit = generator.createVerbBlock(configFit);
export const verbFix = generator.createVerbBlock(configFix);
export const verbFly = generator.createVerbBlock(configFly);
export const verbForbid = generator.createVerbBlock(configForbid);
export const verbForce = generator.createVerbBlock(configForce);
export const verbFreeze = generator.createVerbBlock(configFreeze);
export const verbFry = generator.createVerbBlock(configFry);
export const verbGrill = generator.createVerbBlock(configGrill);
export const verbGuide = generator.createVerbBlock(configGuide);
export const verbHarvest = generator.createVerbBlock(configHarvest);
export const verbHeat = generator.createVerbBlock(configHeat);
export const verbHike = generator.createVerbBlock(configHike);
export const verbHire = generator.createVerbBlock(configHire);
export const verbHold = generator.createVerbBlock(configHold);
export const verbHost = generator.createVerbBlock(configHost);
export const verbHug = generator.createVerbBlock(configHug);
export const verbImprove = generator.createVerbBlock(configImprove);
export const verbInstall = generator.createVerbBlock(configInstall);
export const verbIntend = generator.createVerbBlock(configIntend);
export const verbInvest = generator.createVerbBlock(configInvest);
export const verbInvite = generator.createVerbBlock(configInvite);
export const verbJoin = generator.createVerbBlock(configJoin);
export const verbJump = generator.createVerbBlock(configJump);
export const verbKick = generator.createVerbBlock(configKick);
export const verbKiss = generator.createVerbBlock(configKiss);
export const verbLand = generator.createVerbBlock(configLand);
export const verbLaugh = generator.createVerbBlock(configLaugh);
export const verbLend = generator.createVerbBlock(configLend);
export const verbLet = generator.createVerbBlock(configLet);
export const verbLift = generator.createVerbBlock(configLift);
export const verbListen = generator.createVerbBlock(configListen);
export const verbLock = generator.createVerbBlock(configLock);
export const verbLog = generator.createVerbBlock(configLog);
export const verbMail = generator.createVerbBlock(configMail);
export const verbManage = generator.createVerbBlock(configManage);
export const verbMarry = generator.createVerbBlock(configMarry);
export const verbMatch = generator.createVerbBlock(configMatch);
export const verbMeasure = generator.createVerbBlock(configMeasure);
export const verbMelt = generator.createVerbBlock(configMelt);
export const verbMention = generator.createVerbBlock(configMention);
export const verbMiss = generator.createVerbBlock(configMiss);
export const verbMix = generator.createVerbBlock(configMix);
export const verbMop = generator.createVerbBlock(configMop);
export const verbOrder = generator.createVerbBlock(configOrder);
export const verbOrganize = generator.createVerbBlock(configOrganize);
export const verbOwn = generator.createVerbBlock(configOwn);
export const verbPack = generator.createVerbBlock(configPack);
export const verbPaint = generator.createVerbBlock(configPaint);
export const verbPark = generator.createVerbBlock(configPark);
export const verbPaste = generator.createVerbBlock(configPaste);
export const verbPause = generator.createVerbBlock(configPause);
export const verbPet = generator.createVerbBlock(configPet);
export const verbPhotograph = generator.createVerbBlock(configPhotograph);
export const verbPlan = generator.createVerbBlock(configPlan);
export const verbPlant = generator.createVerbBlock(configPlant);
export const verbPost = generator.createVerbBlock(configPost);
export const verbPour = generator.createVerbBlock(configPour);
export const verbPractice = generator.createVerbBlock(configPractice);
export const verbPrefer = generator.createVerbBlock(configPrefer);
export const verbPrepare = generator.createVerbBlock(configPrepare);
export const verbPrint = generator.createVerbBlock(configPrint);
export const verbPromise = generator.createVerbBlock(configPromise);
export const verbPush = generator.createVerbBlock(configPush);
export const verbRecommend = generator.createVerbBlock(configRecommend);
export const verbRecord = generator.createVerbBlock(configRecord);
export const verbReduce = generator.createVerbBlock(configReduce);
export const verbRefuse = generator.createVerbBlock(configRefuse);
export const verbRegister = generator.createVerbBlock(configRegister);
export const verbRelate = generator.createVerbBlock(configRelate);
export const verbRemind = generator.createVerbBlock(configRemind);
export const verbRent = generator.createVerbBlock(configRent);
export const verbRepair = generator.createVerbBlock(configRepair);
export const verbRepeat = generator.createVerbBlock(configRepeat);
export const verbReplace = generator.createVerbBlock(configReplace);
export const verbReserve = generator.createVerbBlock(configReserve);
export const verbReview = generator.createVerbBlock(configReview);
export const verbRide = generator.createVerbBlock(configRide);
export const verbRow = generator.createVerbBlock(configRow);
export const verbSail = generator.createVerbBlock(configSail);
export const verbSave = generator.createVerbBlock(configSave);
export const verbScan = generator.createVerbBlock(configScan);
export const verbSchedule = generator.createVerbBlock(configSchedule);
export const verbScroll = generator.createVerbBlock(configScroll);
export const verbSearch = generator.createVerbBlock(configSearch);
export const verbSeem = generator.createVerbBlock(configSeem);
export const verbShare = generator.createVerbBlock(configShare);
export const verbShip = generator.createVerbBlock(configShip);
export const verbSleep = generator.createVerbBlock(configSleep);
export const verbSlice = generator.createVerbBlock(configSlice);
export const verbSmell = generator.createVerbBlock(configSmell);
export const verbStart = generator.createVerbBlock(configStart);
export const verbStir = generator.createVerbBlock(configStir);
export const verbStudy = generator.createVerbBlock(configStudy);
export const verbSubscribe = generator.createVerbBlock(configSubscribe);
export const verbSwallow = generator.createVerbBlock(configSwallow);
export const verbSweep = generator.createVerbBlock(configSweep);
export const verbSwim = generator.createVerbBlock(configSwim);
export const verbTalk = generator.createVerbBlock(configTalk);
export const verbTaste = generator.createVerbBlock(configTaste);
export const verbTeach = generator.createVerbBlock(configTeach);
export const verbTest = generator.createVerbBlock(configTest);
export const verbText = generator.createVerbBlock(configText);
export const verbThrow = generator.createVerbBlock(configThrow);
export const verbTouch = generator.createVerbBlock(configTouch);
export const verbTour = generator.createVerbBlock(configTour);
export const verbTrack = generator.createVerbBlock(configTrack);
export const verbTrain = generator.createVerbBlock(configTrain);
export const verbTransfer = generator.createVerbBlock(configTransfer);
export const verbTravel = generator.createVerbBlock(configTravel);
export const verbTurn = generator.createVerbBlock(configTurn);
export const verbType = generator.createVerbBlock(configType);
export const verbUnfasten = generator.createVerbBlock(configUnfasten);
export const verbUnlock = generator.createVerbBlock(configUnlock);
export const verbUnpack = generator.createVerbBlock(configUnpack);
export const verbUpgrade = generator.createVerbBlock(configUpgrade);
export const verbUpload = generator.createVerbBlock(configUpload);
export const verbVacuum = generator.createVerbBlock(configVacuum);
export const verbVisit = generator.createVerbBlock(configVisit);
export const verbWash = generator.createVerbBlock(configWash);
export const verbWaste = generator.createVerbBlock(configWaste);
export const verbWater = generator.createVerbBlock(configWater);
export const verbWear = generator.createVerbBlock(configWear);
export const verbWeigh = generator.createVerbBlock(configWeigh);
export const verbWithdraw = generator.createVerbBlock(configWithdraw);
export const verbWonder = generator.createVerbBlock(configWonder);
export const verbWorry = generator.createVerbBlock(configWorry);
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
    verbAccept,
    verbAffect,
    verbAnswer,
    verbArgue,
    verbArrange,
    verbArrive,
    verbAvoid,
    verbBake,
    verbBe,
    verbBite,
    verbBoard,
    verbBoil,
    verbBook,
    verbBorrow,
    verbBrowse,
    verbCamp,
    verbCancel,
    verbCharge,
    verbChat,
    verbCheck,
    verbChew,
    verbClean,
    verbClick,
    verbClimb,
    verbClose,
    verbColor,
    verbComment,
    verbCompare,
    verbComplain,
    verbCook,
    verbCool,
    verbCoordinate,
    verbCopy,
    verbCost,
    verbCross,
    verbDelete,
    verbDeliver,
    verbDeny,
    verbDepart,
    verbDepend,
    verbDescribe,
    verbDesign,
    verbDisagree,
    verbDiscuss,
    verbDownload,
    verbDrink,
    verbDrive,
    verbEarn,
    verbEdit,
    verbEmail,
    verbEnd,
    verbEnjoy,
    verbEnter,
    verbErase,
    verbExchange,
    verbExercise,
    verbExplore,
    verbFasten,
    verbFeed,
    verbFill,
    verbFilm,
    verbFinish,
    verbFire,
    verbFish,
    verbFit,
    verbFix,
    verbFly,
    verbForbid,
    verbForce,
    verbFreeze,
    verbFry,
    verbGrill,
    verbGuide,
    verbHarvest,
    verbHeat,
    verbHike,
    verbHire,
    verbHold,
    verbHost,
    verbHug,
    verbImprove,
    verbInstall,
    verbIntend,
    verbInvest,
    verbInvite,
    verbJoin,
    verbJump,
    verbKick,
    verbKiss,
    verbLand,
    verbLaugh,
    verbLend,
    verbLet,
    verbLift,
    verbListen,
    verbLock,
    verbLog,
    verbMail,
    verbManage,
    verbMarry,
    verbMatch,
    verbMeasure,
    verbMelt,
    verbMention,
    verbMiss,
    verbMix,
    verbMop,
    verbOrder,
    verbOrganize,
    verbOwn,
    verbPack,
    verbPaint,
    verbPark,
    verbPaste,
    verbPause,
    verbPet,
    verbPhotograph,
    verbPlan,
    verbPlant,
    verbPost,
    verbPour,
    verbPractice,
    verbPrefer,
    verbPrepare,
    verbPrint,
    verbPromise,
    verbPush,
    verbRecommend,
    verbRecord,
    verbReduce,
    verbRefuse,
    verbRegister,
    verbRelate,
    verbRemind,
    verbRent,
    verbRepair,
    verbRepeat,
    verbReplace,
    verbReserve,
    verbReview,
    verbRide,
    verbRow,
    verbSail,
    verbSave,
    verbScan,
    verbSchedule,
    verbScroll,
    verbSearch,
    verbSeem,
    verbShare,
    verbShip,
    verbSleep,
    verbSlice,
    verbSmell,
    verbStart,
    verbStir,
    verbStudy,
    verbSubscribe,
    verbSwallow,
    verbSweep,
    verbSwim,
    verbTalk,
    verbTaste,
    verbTeach,
    verbTest,
    verbText,
    verbThrow,
    verbTouch,
    verbTour,
    verbTrack,
    verbTrain,
    verbTransfer,
    verbTravel,
    verbTurn,
    verbType,
    verbUnfasten,
    verbUnlock,
    verbUnpack,
    verbUpgrade,
    verbUpload,
    verbVacuum,
    verbVisit,
    verbWash,
    verbWaste,
    verbWater,
    verbWear,
    verbWeigh,
    verbWithdraw,
    verbWonder,
    verbWorry,
];
