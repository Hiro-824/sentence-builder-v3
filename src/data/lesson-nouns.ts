export interface LessonNoun {
  singular: string;
  plural: string;
  translation: string;
  spriteColumn: number;
  spriteRow: number;
}

export const LESSON_NOUNS: LessonNoun[] = [
  { singular: "dog", plural: "dogs", translation: "犬", spriteColumn: 0, spriteRow: 0 },
  { singular: "cat", plural: "cats", translation: "猫", spriteColumn: 1, spriteRow: 0 },
  { singular: "bird", plural: "birds", translation: "鳥", spriteColumn: 2, spriteRow: 0 },
  { singular: "rabbit", plural: "rabbits", translation: "ウサギ", spriteColumn: 3, spriteRow: 0 },
  { singular: "duck", plural: "ducks", translation: "アヒル", spriteColumn: 4, spriteRow: 0 },
  { singular: "cow", plural: "cows", translation: "牛", spriteColumn: 0, spriteRow: 1 },
  { singular: "horse", plural: "horses", translation: "馬", spriteColumn: 1, spriteRow: 1 },
  { singular: "pig", plural: "pigs", translation: "豚", spriteColumn: 2, spriteRow: 1 },
  { singular: "frog", plural: "frogs", translation: "カエル", spriteColumn: 3, spriteRow: 1 },
  { singular: "apple", plural: "apples", translation: "リンゴ", spriteColumn: 4, spriteRow: 1 },
  { singular: "banana", plural: "bananas", translation: "バナナ", spriteColumn: 0, spriteRow: 2 },
  { singular: "egg", plural: "eggs", translation: "卵", spriteColumn: 1, spriteRow: 2 },
  { singular: "book", plural: "books", translation: "本", spriteColumn: 2, spriteRow: 2 },
  { singular: "ball", plural: "balls", translation: "ボール", spriteColumn: 3, spriteRow: 2 },
  { singular: "car", plural: "cars", translation: "車", spriteColumn: 4, spriteRow: 2 },
  { singular: "cup", plural: "cups", translation: "カップ", spriteColumn: 0, spriteRow: 3 },
  { singular: "bag", plural: "bags", translation: "かばん", spriteColumn: 1, spriteRow: 3 },
  { singular: "hat", plural: "hats", translation: "帽子", spriteColumn: 2, spriteRow: 3 },
  { singular: "chair", plural: "chairs", translation: "椅子", spriteColumn: 3, spriteRow: 3 },
  { singular: "flower", plural: "flowers", translation: "花", spriteColumn: 4, spriteRow: 3 },
];

