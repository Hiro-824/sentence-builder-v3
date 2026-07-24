import { Generator, type NounConfig } from "@/grammar/generator";
import type { Block } from "@/models/block";
import { LESSON_NOUNS, type LessonNoun } from "./lesson-nouns";
import { blockA, blockAn, blockThe } from "./determiners";
import { blockSome } from "./lesson-blocks";
import {
  blockWhatDeterminer,
  blockWhichDeterminer,
  blockWhoseDeterminer,
} from "./complementizers";
import {
  verbArrive,
  verbEat,
  verbFall,
  verbGive,
  verbJump,
  verbLaugh,
  verbOpen,
  verbRead,
  verbRun,
  verbSend,
  verbShow,
  verbSit,
  verbSleep,
  verbStand,
  verbSwim,
  verbTell,
  verbWalk,
  verbWash,
} from "./verbs";
import { blockQuickly, blockQuietly } from "./adverbials";

export type LessonPredicate =
  | "run" | "swim" | "sleep" | "jump" | "laugh" | "sit" | "stand" | "fall"
  | "eat" | "read" | "open" | "wash"
  | "give" | "show" | "send" | "tell";

export type LessonEntityVisual =
  | { type: "noun"; noun: LessonNoun; definite: boolean }
  | {
      type: "asset";
      name: "girl" | "boy" | "teacher" | "child" | "picture" | "message" | "story";
      label: string;
      definite: boolean;
    };

export type LessonVisual =
  | { type: "countable"; noun: LessonNoun; number: "singular" | "plural"; definite: boolean }
  | { type: "uncountable"; spriteIndex: number; label: string; definite: boolean }
  | { type: "interrogative"; kind: "which" | "what" | "whose"; noun: LessonNoun; target: string }
  | { type: "predicate"; predicate: LessonPredicate; label: string; complements: LessonEntityVisual[] };

export interface LessonQuestion {
  id: string;
  expected: string[];
  blocks: Block[];
  visual: LessonVisual;
}

export interface LessonDefinition {
  id: string;
  title: string;
  instruction: string;
  questions: LessonQuestion[];
}

const generator = new Generator();

const clone = (block: Block): Block => structuredClone(block);
const movable = (block: Block): Block => ({ ...clone(block), undraggable: false });

const countableBlocks = new Map<string, Block>(
  LESSON_NOUNS.map((noun) => [
    noun.singular,
    generator.createNounBlock({
      id: `lesson_noun_${noun.singular}`,
      isCountable: true,
      singularForm: noun.singular,
      pluralForm: noun.plural,
      translation: noun.translation,
      pluralTranslation: noun.translation,
    }),
  ]),
);

const uncountableItems = [
  ["water", "水"],
  ["milk", "牛乳"],
  ["rice", "米"],
  ["bread", "パン"],
  ["cheese", "チーズ"],
  ["sugar", "砂糖"],
  ["salt", "塩"],
  ["juice", "ジュース"],
  ["soup", "スープ"],
  ["homework", "宿題"],
] as const;

const uncountableBlocks = new Map<string, Block>(
  uncountableItems.map(([word, translation]) => {
    const config: NounConfig = {
      id: `lesson_uncountable_${word}`,
      isCountable: false,
      singularForm: word,
      translation,
    };
    return [word, generator.createNounBlock(config)];
  }),
);

const extraNouns = new Map<string, Block>(
  [
    ["girl", "girls", "女の子"],
    ["boy", "boys", "男の子"],
    ["teacher", "teachers", "先生"],
    ["child", "children", "子ども"],
    ["book", "books", "本"],
    ["picture", "pictures", "絵"],
    ["message", "messages", "メッセージ"],
    ["story", "stories", "物語"],
    ["door", "doors", "ドア"],
  ].map(([singular, plural, translation]) => [
    singular,
    generator.createNounBlock({
      id: `lesson_noun_${singular}`,
      isCountable: true,
      singularForm: singular,
      pluralForm: plural,
      translation,
      pluralTranslation: translation,
    }),
  ]),
);

const nounBlock = (word: string) =>
  countableBlocks.get(word) ?? extraNouns.get(word) ?? uncountableBlocks.get(word);

const blocks = (...items: Array<Block | undefined>) =>
  items.filter((item): item is Block => Boolean(item)).map(clone);

const countableQuestions = (): LessonQuestion[] => {
  const conditions = [
    ["dog", "singular", false],
    ["apple", "singular", false],
    ["cat", "plural", false],
    ["book", "plural", false],
    ["bird", "singular", true],
    ["car", "plural", true],
    ["egg", "singular", false],
    ["flower", "plural", false],
    ["bag", "singular", true],
    ["rabbit", "plural", true],
  ] as const;
  return conditions.map(([word, number, definite], index) => {
    const noun = LESSON_NOUNS.find((item) => item.singular === word)!;
    const target = number === "plural" ? noun.plural : noun.singular;
    const article = /^[aeiou]/i.test(word) ? "an" : "a";
    const expected = definite
      ? [`the ${target}`]
      : number === "plural" ? [target, `some ${target}`] : [`${article} ${target}`];
    const distractor = LESSON_NOUNS[(LESSON_NOUNS.indexOf(noun) + 3) % LESSON_NOUNS.length];
    return {
      id: `countable-${index}`,
      expected,
      blocks: blocks(blockA, blockAn, blockThe, blockSome, nounBlock(word), nounBlock(distractor.singular)),
      visual: { type: "countable", noun, number, definite },
    };
  });
};

const uncountableQuestions = (): LessonQuestion[] =>
  uncountableItems.map(([word, translation], index) => {
    const definite = index === 2 || index === 4 || index === 7 || index === 9;
    const distractor = uncountableItems[(index + 3) % uncountableItems.length][0];
    return {
      id: `uncountable-${word}`,
      expected: definite ? [`the ${word}`] : [word, `some ${word}`],
      blocks: blocks(blockThe, blockSome, nounBlock(word), nounBlock(distractor)),
      visual: { type: "uncountable", spriteIndex: index, label: translation, definite },
    };
  });

const interrogativeSpecs = [
  ["which", "bag"], ["what", "animal"], ["whose", "hat"],
  ["which", "book"], ["what", "food"], ["whose", "car"],
  ["which", "apple"], ["what", "bird"], ["whose", "cup"], ["which", "chair"],
] as const;

const genericInterrogativeNouns = new Map<string, Block>(
  ["animal", "food"].map((word) => [
    word,
    generator.createNounBlock({
      id: `lesson_noun_${word}`,
      isCountable: true,
      singularForm: word,
      pluralForm: `${word}s`,
      translation: word === "animal" ? "動物" : "食べ物",
    }),
  ]),
);

const interrogativeQuestions = (): LessonQuestion[] =>
  interrogativeSpecs.map(([kind, word], index) => {
    const noun = LESSON_NOUNS.find((item) => item.singular === word)
      ?? LESSON_NOUNS[index % LESSON_NOUNS.length];
    const targetNoun = nounBlock(word) ?? genericInterrogativeNouns.get(word);
    const determiner =
      kind === "which" ? movable(blockWhichDeterminer)
        : kind === "what" ? movable(blockWhatDeterminer)
          : movable(blockWhoseDeterminer);
    return {
      id: `interrogative-${index}`,
      expected: [`${kind} ${word}`],
      blocks: blocks(
        determiner,
        movable(blockWhichDeterminer),
        movable(blockWhatDeterminer),
        movable(blockWhoseDeterminer),
        targetNoun,
        nounBlock(LESSON_NOUNS[(index + 5) % LESSON_NOUNS.length].singular),
      ),
      visual: { type: "interrogative", kind, noun, target: word },
    };
  });

const actionQuestion = (
  id: string,
  expected: string,
  predicate: LessonPredicate,
  label: string,
  candidateBlocks: Array<Block | undefined>,
  complements: LessonEntityVisual[] = [],
): LessonQuestion => ({
  id,
  expected: [expected],
  blocks: blocks(...candidateBlocks),
  visual: { type: "predicate", predicate, label, complements },
});

const intransitiveQuestions = (): LessonQuestion[] => [
  actionQuestion("run", "run", "run", "走っている", [verbRun, verbWalk, verbSwim]),
  actionQuestion("swim", "swim", "swim", "泳いでいる", [verbSwim, verbRun, verbSit]),
  actionQuestion("sleep", "sleep", "sleep", "眠っている", [verbSleep, verbStand, verbLaugh]),
  actionQuestion("jump", "jump", "jump", "跳んでいる", [verbJump, verbFall, verbRun]),
  actionQuestion("laugh", "laugh", "laugh", "笑っている", [verbLaugh, verbSleep, verbSit]),
  actionQuestion("sit", "sit", "sit", "座っている", [verbSit, verbStand, verbFall]),
  actionQuestion("stand", "stand", "stand", "立っている", [verbStand, verbSit, verbWalk]),
  actionQuestion("fall", "fall", "fall", "転んでいる", [verbFall, verbJump, verbArrive]),
  actionQuestion("run-quickly", "run quickly", "run", "速く走っている", [verbRun, verbWalk, blockQuickly]),
  actionQuestion("sleep-quietly", "sleep quietly", "sleep", "静かに眠っている", [verbSleep, verbLaugh, blockQuietly]),
];

const transitiveQuestion = (
  predicate: "eat" | "read" | "open" | "wash",
  nounWord: string,
  definite: boolean,
  candidateVerbs: Block[],
  distractorWord: string,
): LessonQuestion => {
  const noun = LESSON_NOUNS.find((item) => item.singular === nounWord)!;
  const article = definite ? "the" : /^[aeiou]/i.test(nounWord) ? "an" : "a";
  return {
    id: `${predicate}-${article}-${nounWord}`,
    expected: [`${predicate} ${article} ${nounWord}`],
    blocks: blocks(
      ...candidateVerbs,
      blockA,
      blockAn,
      blockThe,
      nounBlock(nounWord),
      nounBlock(distractorWord),
    ),
    visual: {
      type: "predicate",
      predicate,
      label: `${predicate} ${noun.translation}`,
      complements: [{ type: "noun", noun, definite }],
    },
  };
};

const transitiveQuestions = (): LessonQuestion[] => [
  transitiveQuestion("eat", "apple", false, [verbEat, verbRead], "banana"),
  transitiveQuestion("eat", "banana", false, [verbEat, verbWash], "apple"),
  transitiveQuestion("eat", "egg", false, [verbEat, verbOpen], "apple"),
  transitiveQuestion("eat", "apple", true, [verbEat, verbRead], "egg"),
  transitiveQuestion("read", "book", false, [verbRead, verbOpen], "bag"),
  transitiveQuestion("read", "book", true, [verbRead, verbEat], "cup"),
  transitiveQuestion("open", "book", false, [verbOpen, verbRead], "bag"),
  transitiveQuestion("open", "bag", true, [verbOpen, verbWash], "book"),
  transitiveQuestion("wash", "car", false, [verbWash, verbOpen], "cup"),
  transitiveQuestion("wash", "cup", true, [verbWash, verbEat], "car"),
];

const entity = (
  name: "girl" | "boy" | "teacher" | "child" | "picture" | "message" | "story",
  label: string,
  definite = false,
): LessonEntityVisual => ({ type: "asset", name, label, definite });

const ditransitiveQuestion = (
  predicate: "give" | "show" | "send" | "tell",
  recipient: "girl" | "boy" | "teacher" | "child",
  recipientLabel: string,
  object: "book" | "picture" | "message" | "story",
  objectLabel: string,
  candidateBlocks: Array<Block | undefined>,
): LessonQuestion => ({
  id: `${predicate}-${recipient}-${object}`,
  expected: [`${predicate} the ${recipient} a ${object}`],
  blocks: blocks(...candidateBlocks),
  visual: {
    type: "predicate",
    predicate,
    label: `${recipientLabel}に${objectLabel}を`,
    complements: [
      entity(recipient, recipientLabel, true),
      object === "book"
        ? { type: "noun", noun: LESSON_NOUNS.find((item) => item.singular === "book")!, definite: false }
        : entity(object, objectLabel),
    ],
  },
});

const ditransitiveQuestions = (): LessonQuestion[] => [
  ditransitiveQuestion("give", "girl", "女の子", "book", "本", [verbGive, verbShow, blockThe, blockA, nounBlock("girl"), nounBlock("book")]),
  ditransitiveQuestion("show", "boy", "男の子", "picture", "絵", [verbShow, verbTell, blockThe, blockA, nounBlock("boy"), nounBlock("picture")]),
  ditransitiveQuestion("send", "teacher", "先生", "message", "メッセージ", [verbSend, verbGive, blockThe, blockA, nounBlock("teacher"), nounBlock("message")]),
  ditransitiveQuestion("tell", "child", "子ども", "story", "物語", [verbTell, verbShow, blockThe, blockA, nounBlock("child"), nounBlock("story")]),
  ditransitiveQuestion("give", "boy", "男の子", "book", "本", [verbGive, verbSend, blockThe, blockA, nounBlock("boy"), nounBlock("book")]),
  ditransitiveQuestion("show", "girl", "女の子", "picture", "絵", [verbShow, verbGive, blockThe, blockA, nounBlock("girl"), nounBlock("picture")]),
  ditransitiveQuestion("send", "child", "子ども", "message", "メッセージ", [verbSend, verbTell, blockThe, blockA, nounBlock("child"), nounBlock("message")]),
  ditransitiveQuestion("tell", "girl", "女の子", "story", "物語", [verbTell, verbShow, blockThe, blockA, nounBlock("girl"), nounBlock("story")]),
  ditransitiveQuestion("give", "teacher", "先生", "book", "本", [verbGive, verbSend, blockThe, blockA, nounBlock("teacher"), nounBlock("book")]),
  ditransitiveQuestion("show", "child", "子ども", "picture", "絵", [verbShow, verbTell, blockThe, blockA, nounBlock("child"), nounBlock("picture")]),
];

const mixedNounQuestions = () => [
  ...countableQuestions().slice(0, 4),
  ...uncountableQuestions().slice(0, 3),
  ...interrogativeQuestions().slice(0, 3),
].map((question, index) => ({ ...question, id: `mixed-noun-${index}` }));

const mixedVerbQuestions = () => [
  ...intransitiveQuestions().slice(0, 3),
  ...transitiveQuestions().slice(0, 4),
  ...ditransitiveQuestions().slice(0, 3),
].map((question, index) => ({ ...question, id: `mixed-verb-${index}` }));

export const LESSON_DEFINITIONS: LessonDefinition[] = [
  { id: "countable-noun-phrases", title: "可算名詞句練習", instruction: "絵の数と、指が示しているものに注目しよう", questions: countableQuestions() },
  { id: "uncountable-noun-phrases", title: "不可算名詞句練習", instruction: "指が示しているものかどうかに注目しよう", questions: uncountableQuestions() },
  { id: "interrogative-determiners", title: "疑問決定詞の練習", instruction: "絵が表す「どの・何の・誰の」を考えよう", questions: interrogativeQuestions() },
  { id: "mixed-noun-phrases", title: "名詞句の総合練習", instruction: "これまでの名詞句を思い出して作ろう", questions: mixedNounQuestions() },
  { id: "intransitive-verbs", title: "自動詞練習", instruction: "絵に合う動きを作ろう", questions: intransitiveQuestions() },
  { id: "transitive-verbs", title: "他動詞練習", instruction: "動きと、その対象を組み合わせよう", questions: transitiveQuestions() },
  { id: "ditransitive-verbs", title: "二重目的語の練習", instruction: "誰に、何をするのかを組み立てよう", questions: ditransitiveQuestions() },
  { id: "mixed-verb-phrases", title: "動詞句の総合練習", instruction: "絵に合う動詞句を完成させよう", questions: mixedVerbQuestions() },
];

export const LESSON_ORDER = LESSON_DEFINITIONS.map((lesson) => lesson.id);

export const getLessonDefinition = (id: string) =>
  LESSON_DEFINITIONS.find((lesson) => lesson.id === id) ?? LESSON_DEFINITIONS[0];
