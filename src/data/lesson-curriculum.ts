export interface CurriculumLesson {
  id: string;
  order: number;
  title: string;
  description: string;
  available: boolean;
}

export interface CurriculumUnit {
  id: string;
  order: number;
  title: string;
  description: string;
  lessons: CurriculumLesson[];
}

export const ACTIVE_LESSON_ID = "countable-noun-phrases";

export const LESSON_CURRICULUM: CurriculumUnit[] = [
  {
    id: "noun-phrases",
    order: 1,
    title: "名詞句練習",
    description: "ものの数や、どれを指しているかに合わせて名詞句を作ります。",
    lessons: [
      {
        id: ACTIVE_LESSON_ID,
        order: 1,
        title: "可算名詞句練習",
        description: "a・an・the・someと、名詞の単数形・複数形を組み合わせます。",
        available: true,
      },
      {
        id: "uncountable-noun-phrases",
        order: 2,
        title: "不可算名詞句練習",
        description: "数えない名詞に合う表現を作ります。",
        available: false,
      },
      {
        id: "interrogative-determiners",
        order: 3,
        title: "疑問決定詞の練習",
        description: "which・what・whoseを使った名詞句を作ります。",
        available: false,
      },
      {
        id: "mixed-noun-phrases",
        order: 4,
        title: "名詞句の総合練習",
        description: "これまでに学んだ名詞句を混ぜて練習します。",
        available: false,
      },
    ],
  },
  {
    id: "verb-phrases",
    order: 2,
    title: "動詞句練習",
    description: "動詞が必要とする要素を、少しずつ組み立てます。",
    lessons: [
      {
        id: "intransitive-verbs",
        order: 1,
        title: "自動詞練習",
        description: "目的語を取らない動詞を使います。",
        available: false,
      },
      {
        id: "transitive-verbs",
        order: 2,
        title: "他動詞練習",
        description: "動詞と目的語を組み合わせます。",
        available: false,
      },
      {
        id: "ditransitive-verbs",
        order: 3,
        title: "二重目的語の練習",
        description: "二つの目的語を取る動詞を使います。",
        available: false,
      },
      {
        id: "mixed-verb-phrases",
        order: 4,
        title: "動詞句の総合練習",
        description: "これまでに学んだ動詞句を混ぜて練習します。",
        available: false,
      },
    ],
  },
];
