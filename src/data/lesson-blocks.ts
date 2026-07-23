import { Generator, NounConfig } from "@/grammar/generator";
import { Block } from "@/models/block";
import { det, noun } from "@/models/grammar-entities";
import { LESSON_NOUNS } from "./lesson-nouns";
import { blockA, blockAn, blockThe } from "./determiners";

const generator = new Generator();

const lessonNounBlocks = new Map<string, Block>(
  LESSON_NOUNS.map((item) => {
    const config: NounConfig = {
      id: `lesson_noun_${item.singular}`,
      isCountable: true,
      singularForm: item.singular,
      pluralForm: item.plural,
      translation: item.translation,
      pluralTranslation: item.translation,
    };
    return [item.singular, generator.createNounBlock(config)];
  }),
);

export const blockSome: Block = {
  id: "det_some",
  x: 0,
  y: 0,
  words: [{
    token: "some",
    categories: [{
      head: {
        type: det,
        agr: { type: "non-3sing", num: "pl", per: 3 },
        determinered: true,
      },
      right: [{
        head: {
          type: noun,
          agr: { type: "non-3sing", num: "pl", per: 3 },
          count: true,
        },
      }],
      translationTemplates: {
        default: ["いくつかの", { path: ["right", 0], key: "default" }],
      },
    }],
  }],
  color: "dodgerblue",
  isRound: true,
  children: [
    {
      id: "head",
      hidden: false,
      type: "text",
      content: "some",
    },
    {
      id: "complement",
      hidden: false,
      type: "placeholder",
      content: null,
    },
  ],
};

export const getLessonBlocks = (noun: string, distractor: string): Block[] => {
  const nounBlock = lessonNounBlocks.get(noun);
  const distractorBlock = lessonNounBlocks.get(distractor);
  return [blockA, blockAn, blockThe, blockSome, nounBlock, distractorBlock]
    .filter((block): block is Block => Boolean(block));
};
