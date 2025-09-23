import { Generator, PrepositionConfig } from "@/grammar/generator";
import { Block } from "@/models/block";

const generator = new Generator();

const createPred = (
    present: string,
    past: string,
    negative: string,
    pastNegative: string,
    question: string,
    pastQuestion: string
) => ({
    predAdj: present,
    past,
    predNeg: negative,
    pastNeg: pastNegative,
    predQ: question,
    pastQ: pastQuestion,
});

const createConfig = (
    word: string,
    options: {
        id?: string;
        modAdj?: string;
        adv?: string;
        pred?: ReturnType<typeof createPred>;
    }
): PrepositionConfig => ({
    id: options.id ?? `prep_${word.replace(/[^a-z]/g, "_")}`,
    word,
    ...(options.modAdj ? { modAdj: options.modAdj } : {}),
    ...(options.adv ? { adv: options.adv } : {}),
    ...(options.pred ? { pred: options.pred } : {}),
});

const prepositionConfigs: PrepositionConfig[] = [
    createConfig("of", { modAdj: "の" }),
    createConfig("in", {
        modAdj: "の中の",
        adv: "の中で",
        pred: createPred("の中にある", "の中にあった", "の中にない", "の中になかった", "の中にあるのか", "の中にあったのか"),
    }),
    createConfig("to", {
        modAdj: "への",
        adv: "へ",
        pred: createPred("へ向かっている", "へ向かっていた", "へ向かっていない", "へ向かっていなかった", "へ向かっているのか", "へ向かっていたのか"),
    }),
    createConfig("for", {
        modAdj: "のための",
        adv: "のために",
        pred: createPred("のためである", "のためだった", "のためではない", "のためではなかった", "のためなのか", "のためだったのか"),
    }),
    createConfig("with", {
        modAdj: "と一緒の",
        adv: "と一緒に",
        pred: createPred("と一緒にいる", "と一緒にいた", "と一緒にいない", "と一緒にいなかった", "と一緒にいるのか", "と一緒にいたのか"),
    }),
    createConfig("on", {
        modAdj: "の上の",
        adv: "の上で",
        pred: createPred("の上にある", "の上にあった", "の上にない", "の上になかった", "の上にあるのか", "の上にあったのか"),
    }),
    createConfig("at", {
        modAdj: "での",
        adv: "で",
        pred: createPred("にある", "にあった", "にない", "になかった", "にあるのか", "にあったのか"),
    }),
    createConfig("by", {
        modAdj: "による",
        adv: "によって",
        pred: createPred("によっている", "によっていた", "によっていない", "によっていなかった", "によっているのか", "によっていたのか"),
    }),
    createConfig("from", {
        modAdj: "からの",
        adv: "から",
        pred: createPred("から来ている", "から来ていた", "から来ていない", "から来ていなかった", "から来ているのか", "から来ていたのか"),
    }),
    createConfig("about", {
        modAdj: "についての",
        adv: "について",
        pred: createPred("についている", "についていた", "についていない", "についていなかった", "についているのか", "についていたのか"),
    }),
    createConfig("as", {
        modAdj: "としての",
        adv: "として",
        pred: createPred("としている", "としていた", "としていない", "としていなかった", "としているのか", "としていたのか"),
    }),
    createConfig("like", {
        modAdj: "のような",
        adv: "のように",
        pred: createPred("のようだ", "のようだった", "のようではない", "のようではなかった", "のようなのか", "のようだったのか"),
    }),
    createConfig("into", {
        modAdj: "の中への",
        adv: "の中へ",
        pred: createPred("の中に入っている", "の中に入っていた", "の中に入っていない", "の中に入っていなかった", "の中に入っているのか", "の中に入っていたのか"),
    }),
    createConfig("after", {
        modAdj: "の後の",
        adv: "の後で",
        pred: createPred("の後だ", "の後だった", "の後ではない", "の後ではなかった", "の後なのか", "の後だったのか"),
    }),
    createConfig("over", {
        modAdj: "の上方の",
        adv: "を越えて",
        pred: createPred("の上にある", "の上にあった", "の上にない", "の上になかった", "の上にあるのか", "の上にあったのか"),
    }),
    createConfig("between", {
        modAdj: "の間の",
        adv: "の間で",
        pred: createPred("の間にある", "の間にあった", "の間にない", "の間になかった", "の間にあるのか", "の間にあったのか"),
    }),
    createConfig("through", {
        modAdj: "を通じた",
        adv: "を通って",
        pred: createPred("を通っている", "を通っていた", "を通っていない", "を通っていなかった", "を通っているのか", "を通っていたのか"),
    }),
    createConfig("during", {
        modAdj: "の間の",
        adv: "の間に",
    }),
    createConfig("without", {
        modAdj: "のない",
        adv: "なしで",
        pred: createPred("なしだ", "なしだった", "なしではない", "なしではなかった", "なしなのか", "なしだったのか"),
    }),
    createConfig("before", {
        modAdj: "の前の",
        adv: "の前に",
        pred: createPred("の前だ", "の前だった", "の前ではない", "の前ではなかった", "の前なのか", "の前だったのか"),
    }),
    createConfig("under", {
        modAdj: "の下の",
        adv: "の下で",
        pred: createPred("の下にある", "の下にあった", "の下にない", "の下になかった", "の下にあるのか", "の下にあったのか"),
    }),
    createConfig("around", {
        modAdj: "の周りの",
        adv: "の周りで",
        pred: createPred("の周りにある", "の周りにあった", "の周りにない", "の周りになかった", "の周りにあるのか", "の周りにあったのか"),
    }),
    createConfig("among", {
        modAdj: "の中の",
        adv: "の中で",
    }),
    createConfig("against", {
        modAdj: "に対する",
        adv: "に対して",
        pred: createPred("に反している", "に反していた", "に反していない", "に反していなかった", "に反しているのか", "に反していたのか"),
    }),
    createConfig("across", {
        modAdj: "の向こう側の",
        adv: "を横切って",
    }),
    createConfig("along", {
        modAdj: "に沿った",
        adv: "に沿って",
    }),
    createConfig("beyond", {
        modAdj: "を越えた",
        adv: "を越えて",
    }),
    createConfig("within", {
        modAdj: "以内の",
        adv: "以内に",
        pred: createPred("以内だ", "以内だった", "以内ではない", "以内ではなかった", "以内なのか", "以内だったのか"),
    }),
    createConfig("throughout", {
        modAdj: "じゅうの",
        adv: "じゅうで",
        pred: createPred("じゅうにわたっている", "じゅうにわたっていた", "じゅうにわたっていない", "じゅうにわたっていなかった", "じゅうにわたっているのか", "じゅうにわたっていたのか"),
    }),
    createConfig("inside", {
        modAdj: "の内側の",
        adv: "の内側で",
        pred: createPred("の内側にある", "の内側にあった", "の内側にない", "の内側になかった", "の内側にあるのか", "の内側にあったのか"),
    }),
    createConfig("outside", {
        modAdj: "の外側の",
        adv: "の外で",
        pred: createPred("の外にある", "の外にあった", "の外にない", "の外になかった", "の外にあるのか", "の外にあったのか"),
    }),
    createConfig("up", {
        modAdj: "上向きの",
        adv: "上へ",
    }),
    createConfig("down", {
        modAdj: "下向きの",
        adv: "下へ",
    }),
    createConfig("past", {
        modAdj: "を過ぎた",
        adv: "を過ぎて",
    }),
    createConfig("near", {
        modAdj: "の近くの",
        adv: "の近くで",
        pred: createPred("の近くにある", "の近くにあった", "の近くにない", "の近くになかった", "の近くにあるのか", "の近くにあったのか"),
    }),
    createConfig("above", {
        modAdj: "の上方の",
        adv: "の上で",
        pred: createPred("の上にある", "の上にあった", "の上にない", "の上になかった", "の上にあるのか", "の上にあったのか"),
    }),
    createConfig("below", {
        modAdj: "の下方の",
        adv: "の下で",
        pred: createPred("の下にある", "の下にあった", "の下にない", "の下になかった", "の下にあるのか", "の下にあったのか"),
    }),
    createConfig("beneath", {
        modAdj: "の真下の",
        adv: "の真下で",
        pred: createPred("の真下にある", "の真下にあった", "の真下にない", "の真下になかった", "の真下にあるのか", "の真下にあったのか"),
    }),
    createConfig("behind", {
        modAdj: "の後ろの",
        adv: "の後ろで",
        pred: createPred("の後ろにある", "の後ろにあった", "の後ろにない", "の後ろになかった", "の後ろにあるのか", "の後ろにあったのか"),
    }),
    createConfig("beside", {
        modAdj: "の横の",
        adv: "の横で",
        pred: createPred("の横にある", "の横にあった", "の横にない", "の横になかった", "の横にあるのか", "の横にあったのか"),
    }),
    createConfig("amid", {
        modAdj: "の最中の",
        adv: "の最中で",
    }),
    createConfig("following", {
        modAdj: "に続く",
        adv: "に続いて",
    }),
    createConfig("since", {
        modAdj: "以来の",
        adv: "以来",
        pred: createPred("以来だ", "以来だった", "以来ではない", "以来ではなかった", "以来なのか", "以来だったのか"),
    }),
    createConfig("until", {
        modAdj: "までの",
        adv: "まで",
        pred: createPred("までだ", "までだった", "まではない", "まではなかった", "までなのか", "までだったのか"),
    }),
    createConfig("upon", {
        modAdj: "の上での",
        adv: "の上で",
        pred: createPred("の上にある", "の上にあった", "の上にない", "の上になかった", "の上にあるのか", "の上にあったのか"),
    }),
    createConfig("toward", {
        modAdj: "に向かう",
        adv: "に向かって",
        pred: createPred("に向かっている", "に向かっていた", "に向かっていない", "に向かっていなかった", "に向かっているのか", "に向かっていたのか"),
    }),
    createConfig("towards", {
        modAdj: "に向かう",
        adv: "に向かって",
        pred: createPred("に向かっている", "に向かっていた", "に向かっていない", "に向かっていなかった", "に向かっているのか", "に向かっていたのか"),
    }),
    createConfig("onto", {
        modAdj: "の上への",
        adv: "の上へ",
    }),
    createConfig("opposite", {
        modAdj: "の向かいの",
        adv: "の向かいで",
        pred: createPred("の向かいにある", "の向かいにあった", "の向かいにない", "の向かいになかった", "の向かいにあるのか", "の向かいにあったのか"),
    }),
    createConfig("out", {
        modAdj: "外の",
        adv: "外へ",
    }),
    createConfig("off", {
        modAdj: "から外れた",
        adv: "から離れて",
    }),
    createConfig("round", {
        modAdj: "の周りの",
        adv: "の周りで",
    }),
    createConfig("per", {
        modAdj: "当たりの",
        adv: "当たり",
    }),
    createConfig("plus", {
        modAdj: "プラスの",
        adv: "に加えて",
    }),
    createConfig("concerning", {
        modAdj: "に関する",
        adv: "に関して",
        pred: createPred("に関している", "に関していた", "に関していない", "に関していなかった", "に関しているのか", "に関していたのか"),
    }),
    createConfig("regarding", {
        modAdj: "に関する",
        adv: "に関して",
        pred: createPred("に関している", "に関していた", "に関していない", "に関していなかった", "に関しているのか", "に関していたのか"),
    }),
    createConfig("considering", {
        modAdj: "を考慮した",
        adv: "を考慮して",
    }),
    createConfig("despite", {
        modAdj: "にもかかわらずの",
        adv: "にもかかわらず",
    }),
    createConfig("except", {
        modAdj: "を除く",
        adv: "を除いて",
    }),
    createConfig("but", {
        id: "prep_but",
        word: "but",
        modAdj: "を除く",
        adv: "を除いて",
    }),
    createConfig("save", {
        modAdj: "を除いて",
        adv: "を除いて",
    }),
    createConfig("than", {
        modAdj: "より",
        adv: "より",
    }),
    createConfig("via", {
        modAdj: "経由の",
        adv: "を経由して",
    }),
    createConfig("unlike", {
        modAdj: "とは異なる",
        adv: "とは違って",
    }),
    createConfig("underneath", {
        modAdj: "の真下の",
        adv: "の真下で",
        pred: createPred("の真下にある", "の真下にあった", "の真下にない", "の真下になかった", "の真下にあるのか", "の真下にあったのか"),
    }),
    createConfig("following", {
        id: "prep_following",
        word: "following",
        modAdj: "に続く",
        adv: "に続いて",
    }),
    createConfig("worth", {
        modAdj: "に値する",
        adv: "に値して",
        pred: createPred("に値する", "に値した", "に値しない", "に値しなかった", "に値するのか", "に値したのか"),
    }),
];

const prepositionBlocks: Block[] = prepositionConfigs.map((config) => generator.createPrepositionBlock(config));

export const allPrepositionBlocks: Block[] = prepositionBlocks;
