import { Category } from "./category";
import { Lexicon } from "./lexicon";

export interface Phrase {
    id: string;
    categories: Category[];
    content: {
        L_MOD_DTR: Phrase[];
        SUBJ_DTR: Phrase[];
        HEAD_DTR: Lexicon;
        COMPS_DTR: Phrase[];
        R_MOD_DTR: Phrase[];
    } | undefined;
}