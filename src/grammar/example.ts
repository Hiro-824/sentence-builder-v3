/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grammar, SubPhraseInput, Word } from "./grammar";

const wordI: Word = { token: "I", categories: [{ categoryName: "Pronoun(I)", head: { type: 'det', agr: { type: "non-3sing", num: "sing", per: 1 }, case: "nom" } }] };
const wordShe: Word = { token: "she", categories: [{ categoryName: "Pronoun(she)", head: { type: 'det', agr: { type: "3sing", gender: "female" }, case: "nom" } }] };
const wordRead: Word = { token: "read", categories: [ { categoryName: "Verb(read)-Present", head: { type: 'verb', tense: "present" }, left: [ { head: { case: 'nom', agr: { type: "non-3sing" } } } ], right: [ { head: { type: 'det' } } ] }, { categoryName: "Verb(read)-Past", head: { type: 'verb', tense: "past" }, left: [ { head: { case: 'nom' } } ], right: [ { head: { type: 'det' } } ] } ] };
const wordA: Word = { token: "a", categories: [{ categoryName: "Determiner(a)", head: { type: 'det', agr: { type: "3sing", num: "sing" } }, right: [ { head: { type: 'noun', agr: { type: "3sing" } } } ] }] };
const wordBook: Word = { token: "book", categories: [{ categoryName: "Noun(book)", head: { type: 'noun', agr: { type: "3sing", num: "sing" } } }] };
const wordBooks: Word = { token: "books", categories: [{ categoryName: "Noun(books)", head: { type: 'noun', agr: { type: "non-3sing", num: "pl" } } }] };
const wordQuickly: Word = { token: "quickly", categories: [{ categoryName: "Adverb(quickly)", head: { type: 'adverb' }, leftModTargets: [ { head: { type: 'verb' } } ], rightModTargets: [ { head: { type: 'verb' } } ] }] };
const wordIn: Word = { token: "in", categories: [{ categoryName: "Preposition(in)", head: { type: 'preposition' }, right: [ { head: { type: 'det' } } ], leftModTargets: [ { head: { type: 'verb' } }, { head: { type: 'det' } } ] }] };
const wordThe: Word = { token: "the", categories: [{ categoryName: "Determiner(the)", head: { type: 'det' }, right: [ { head: { type: 'noun' } } ] }] };
const wordRoom: Word = { token: "room", categories: [{ categoryName: "Noun(room)", head: { type: 'noun', agr: { type: "3sing", num: "sing" } } }] };

// --- Building the Nested Structure ---
const subPhraseABook: SubPhraseInput = { elements: [wordA, wordBook], headIndex: 0, phraseName: "[a book]" };
const subPhraseTheRoom: SubPhraseInput = { elements: [wordThe, wordRoom], headIndex: 0, phraseName: "[the room]" };
const subPhraseQuickly: SubPhraseInput = { elements: [wordQuickly], headIndex: 0, phraseName: "[quickly]" };
const subPhraseInTheRoom: SubPhraseInput = { elements: [wordIn, subPhraseTheRoom], headIndex: 0, phraseName: "[in the room]" };
const topLevelPhraseInput: SubPhraseInput = { elements: [ wordShe, wordRead, subPhraseABook, subPhraseQuickly, subPhraseInTheRoom ], headIndex: 1, phraseName: "S" };

// --- Final Execution ---
console.log("--- STARTING NESTED PARSE ---");
const grammar = new Grammar();
const finalResultWord = grammar.parseNestedPhrase(topLevelPhraseInput);
console.log("\n--- FINAL PARSE RESULTS OF NESTED PHRASE ---");
if (finalResultWord.categories.length > 0) {
    console.log(`Success! Found ${finalResultWord.categories.length} valid parse(s) for the phrase "${finalResultWord.token}".`);
    console.log(JSON.stringify(finalResultWord.categories, null, 2));
} else {
    console.log(`Parse failed for phrase "${finalResultWord.token}". No valid interpretations found.`);
}