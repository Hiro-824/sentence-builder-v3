import { Scenario } from "@/models/scenario";
import { blockBe } from "./auxiliaries";
import { blockTo } from "./blocks";
import { blockBecause } from "./complementizers";
import { blockMany } from "./determiners";
import { blockUsually, blockNow } from "./adverbials";
import { blockI } from "./pronouns";
import { blockAfter, blockFrom, blockWith } from "./prepositions";
import { blockEnglish, blockGrammar, blockJapan, blockMary, blockName, blockPerson, blockSchool } from "./nouns";
import { verbStudy, verbTalk, verbWant } from "./verbs";

export const greetingScenario: Scenario = {
  turns: [
    { speaker: "ai", text: "Hi! Nice to meet you. What’s your name?" },
    {
      speaker: "user",
      blocks: [blockI, blockBe, blockName, blockMary],
    },
    { speaker: "ai", text: "Great! Where are you from?" },
    {
      speaker: "user",
      blocks: [blockI, blockBe, blockFrom, blockJapan],
    },
    { speaker: "ai", text: "Nice! What do you usually do after school?" },
    {
      speaker: "user",
      blocks: [blockI, blockUsually, verbStudy, blockEnglish, blockAfter, blockSchool],
    },
    { speaker: "ai", text: "That’s great. What are you studying now?" },
    {
      speaker: "user",
      blocks: [blockI, blockBe, verbStudy, blockEnglish, blockGrammar, blockNow],
    },
    { speaker: "ai", text: "Sounds good! Why do you study English?" },
    {
      speaker: "user",
      blocks: [
        blockI,
        verbStudy,
        blockEnglish,
        blockBecause,
        blockI,
        verbWant,
        blockTo,
        verbTalk,
        blockWith,
        blockMany,
        blockPerson,
      ],
    },
  ],
};
