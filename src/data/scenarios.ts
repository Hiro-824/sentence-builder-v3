import { Block } from "@/models/block";
import { Scenario } from "@/models/scenario";
import { blockBe, blockSentence } from "./auxiliaries";
import { blockTo } from "./blocks";
import { blockBecause } from "./complementizers";
import { blockMany } from "./determiners";
import { blockUsually, blockNow, blockAfterSchool } from "./adverbials";
import { blockI } from "./pronouns";
import { blockFrom, blockWith } from "./prepositions";
import { blockEnglish, blockGrammar, blockJapan, blockMary, blockName, blockPerson } from "./nouns";
import { verbStudy, verbTalk, verbWant } from "./verbs";

const withHeadSelection = (block: Block, selectedIndex: number): Block => ({
  ...block,
  children: block.children.map((child) =>
    child.id === "head" && child.type === "dropdown"
      ? { ...child, selected: selectedIndex }
      : { ...child }
  ),
});

const blockIMy = withHeadSelection(blockI, 1);
const makeEditableHeadTextBlock = (block: Block, label: string, translation = label, id = block.id): Block => ({
  ...block,
  id,
  words: block.words.map((word, idx) =>
    idx === 0
      ? {
          ...word,
          token: label,
          categories: Array.isArray(word.categories)
            ? word.categories.map((category) => ({
                ...category,
                translationTemplates: {
                  ...(category.translationTemplates ?? {}),
                  default: [translation],
                },
              }))
            : word.categories,
        }
      : { ...word }
  ),
  children: block.children.map((child) =>
    child.id === "head" && child.type === "text"
      ? { ...child, content: label, editable: true }
      : { ...child }
  ),
});
const blockUserNameInput = makeEditableHeadTextBlock(blockMary, "名前を入力…", "ダブルタップ", "user_name_input");

export const testScenario: Scenario = {
  turns: [
    {
      speaker: "ai",
      text: "Hi! Nice to meet you. What’s your name?",
      translation: "こんにちは！ はじめまして。あなたの名前は何ですか？",
    },
    {
      speaker: "user",
      blocks: [blockSentence, blockI, verbTalk],
    },
  ],
};

export const greetingScenario: Scenario = {
  turns: [
    {
      speaker: "ai",
      text: "Hi! Nice to meet you. What’s your name?",
      translation: "こんにちは！ はじめまして。あなたの名前は何ですか？",
    },
    {
      speaker: "user",
      blocks: [blockUserNameInput, blockBe, blockIMy, blockName],
    },
    {
      speaker: "ai",
      text: "Great! Where are you from?",
      translation: "いいですね！ どちらの出身ですか？",
    },
    {
      speaker: "user",
      blocks: [blockBe, blockJapan, blockI, blockFrom],
    },
    {
      speaker: "ai",
      text: "Nice! What do you usually do after school?",
      translation: "いいですね！ 普段、放課後は何をしていますか？",
    },
    {
      speaker: "user",
      blocks: [blockAfterSchool, verbStudy, blockSentence, blockUsually, blockI, blockEnglish],
    },
    {
      speaker: "ai",
      text: "That’s great. What are you studying now?",
      translation: "それは素晴らしいですね。今、何を勉強していますか？",
    },
    {
      speaker: "user",
      blocks: [blockNow, blockGrammar, blockBe, verbStudy, blockI],
    },
    {
      speaker: "ai",
      text: "Sounds good! Why do you study English?",
      translation: "いいですね！ なぜ英語を勉強しているのですか？",
    },
    {
      speaker: "user",
      blocks: [blockSentence, blockBecause, blockI, blockMany, verbStudy, blockPerson, blockSentence, verbTalk, blockEnglish, verbWant, blockTo, blockWith, blockI],
    },
  ],
};
