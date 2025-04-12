import { Block, BlockChild } from "./block";
import { Lexicon } from "./category";

export class Converter {
    convertLexiconsIntoBlock(lexicons: Lexicon[], color: string): Block {
        const head: BlockChild = (lexicons.length === 1) ? {
            id: "head",
            type: "text",
            content: lexicons[0].word,
        } : {
            id: "head",
            type: "dropdown",
            content: lexicons.map((lexicon) => lexicon.word),
            selected: 0,
        }

        const specifiers: BlockChild[] = lexicons[0].categories[0].specifiers.map((specifier, index) => ({
            id: `specifier-${index}`,
            type: "placeholder",
            content: null
        }));

        const complements: BlockChild[] = lexicons[0].categories[0].complements.map((complement, index) => ({
            id: `complement-${index}`,
            type: "placeholder",
            content: null
        }));

        const block: Block = {
            id: "",
            lexicons: lexicons,
            x: 0,
            y: 0,
            color: color,
            children: [
                ...specifiers,
                head,
                ...complements,
            ]
        };

        return block;
    }
}