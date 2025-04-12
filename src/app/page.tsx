import SentenceBuilder from "@/component/sentence-builder";
import { SheLovesIt } from "@/grammar/examples/phrases";
import { Grammar } from "@/grammar/grammar";

export default function Home() {

  const grammar = new Grammar();
  const sentence = SheLovesIt;
  console.log(grammar.validateConstituent(sentence));

  return (
    <>
      <SentenceBuilder />
    </>
  );
}
