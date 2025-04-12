import SentenceBuilder from "@/component/sentence-builder";
import { NotLoveIt } from "@/grammar/examples/phrases";
import { Grammar } from "@/grammar/grammar";

export default function Home() {

  const grammar = new Grammar();
  const sentence = NotLoveIt;
  console.log(grammar.validateConstituent(sentence));

  return (
    <>
      <SentenceBuilder />
    </>
  );
}
