import { Block, BlockChild } from "@/models/block";
import { Phrase } from "@/models/phrase";

export class Converter {
    convertBlock(block: Block): Phrase {
        const headIndex = block.children.findIndex(child => child.id === "head");
        const selected = block.children[headIndex].selected ?? 0;

        const L_MOD_CHILD = block.children.slice(0, headIndex).filter(child => child.type === "attachment");
        const SUBJ_CHILD = block.children.slice(0, headIndex).find(child => child.type = "placeholder");
        const COMPS_CHILD = block.children.slice(headIndex + 1).filter(child => child.type === "placeholder");
        const R_MOD_CHILD = block.children.slice(headIndex + 1).filter(child => child.type === "attachment");

        const L_MOD_DTR = L_MOD_CHILD.map((child) => this.convertChild(child));
        const SUBJ_DTR = SUBJ_CHILD ? [this.convertChild(SUBJ_CHILD)] : [];
        const HEAD_DTR = block.lexicons[selected];
        const COMPS_DTR = COMPS_CHILD.map((child) => this.convertChild(child));
        const R_MOD_DTR = R_MOD_CHILD.map((child) => this.convertChild(child));

        return {
            id: block.id,
            categories: [],
            content: {
                L_MOD_DTR: L_MOD_DTR,
                SUBJ_DTR: SUBJ_DTR,
                HEAD_DTR: HEAD_DTR,
                COMPS_DTR: COMPS_DTR,
                R_MOD_DTR: R_MOD_DTR
            }
        }
    }

    convertChild(child: BlockChild): Phrase {
        return child.content ? this.convertBlock(child.content as Block) : {
            id: child.id,
            categories: [],
            content: undefined,
        }
    }
}