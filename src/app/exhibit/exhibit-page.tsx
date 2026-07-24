"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./exhibit.module.css";

type Language = "ja" | "en";
type ViewMode = "presentation" | "document";

const content = {
  ja: {
    languageLabel: "言語",
    modeLabel: "表示",
    japanese: "日本語",
    english: "English",
    presentation: "プレゼン",
    document: "通常閲覧",
    eyebrow: "研究・開発プロジェクト",
    title: "英文法学習アプリ Syntablo",
    subtitle: "見えない文法制約を操作可能な図形として外在化する試み",
    summary:
      "Syntabloは、英単語や句をブロックとして組み合わせながら、英語の文法を学ぶためのWebアプリケーションです。",
    cards: [
      {
        label: "背景",
        title: "英文法学習における課題",
        text: "文法制約や文の階層構造は、言語による説明だけでは具体的に操作・観察することが難しい。",
      },
      {
        label: "提案",
        title: "制約と構造の可視化",
        text: "語や句の結合条件を、ブロックの形、空所、入れ子構造として表現する。",
      },
      {
        label: "実装",
        title: "文法エンジンによる判定",
        text: "語彙項目が持つ素性と結合条件を照合し、ブロック同士の結合可能性を判定する。",
      },
    ],
    screenshotAlt: "Syntabloで英単語ブロックを組み合わせている画面",
    screenshotCaption:
      "単語や句をブロックとして操作し、結合可能性と階層構造を画面上に表示する。",
    tryTitle: "実際のアプリ",
    tryText: "隣のPCで操作できます",
    openApp: "アプリを開く",
    page: "1 / 7",
    problem: {
      section: "背景",
      title: "英文法学習における課題",
      subtitle:
        "言語による説明だけでは、文法制約と文の階層構造を具体的に操作・観察することが難しい",
      introduction:
        "英文を構成するには、単語の意味や表面的な語順だけでなく、語と句の間にある制約や包含関係を扱う必要があります。",
      explanationTitle: "従来的な文法説明の限界",
      rule:
        "「関係代名詞の後ろには、名詞が1つ欠けた文が置かれます。」",
      explanationPoints: [
        {
          title: "抽象的な説明",
          text: "学習者が理解して実際に使うのが難しい。",
        },
        {
          title: "使用場面が不明確",
          text: "いつ、何を伝えるための表現なのかが示されない。",
        },
        {
          title: "意味内容を無視してしまうことが多い",
          text: "学習者の目的は文法的に正しく作文することではなく、意味内容を英語で表現すること。",
        },
      ],
      hierarchyTitle: "階層構造",
      hierarchySummary:
        "英文は単語の平面的な列ではなく、句が段階的に組み合わされた構造を持ちます。",
      words: [
        { word: "The", part: "冠詞", meaning: "その" },
        { word: "teacher", part: "名詞", meaning: "先生" },
        { word: "gave", part: "動詞", meaning: "与えた" },
        { word: "the", part: "冠詞", meaning: "その" },
        { word: "child", part: "名詞", meaning: "子ども" },
        { word: "a", part: "冠詞", meaning: "一つの" },
        { word: "book", part: "名詞", meaning: "本" },
      ],
      nounPhrase: "名詞句",
      verbPhrase: "動詞句",
      sentenceNode: "文",
      page: "2 / 7",
    },
    method: {
      section: "提案手法",
      title: "文法制約と階層構造の可視化",
      subtitle:
        "結合条件をブロックの形と空所として表し、完成した句を別のブロックに組み込む",
      constraintsTitle: "結合条件を空所として表示",
      constraintsText:
        "動詞が必要とする要素の数と種類を、空所の数と形で示します。適合するブロックだけを空所に組み込めます。",
      constraintsAlt:
        "空所の数が異なる動詞ブロックを表示しているSyntabloの画面",
      hierarchyTitle: "句を入れ子にして構造を保持",
      hierarchyText:
        "完成した句は一つのまとまりとして、さらに大きな句や文へ組み込まれます。",
      hierarchyAlt:
        "Learning Englishを含む文を入れ子のブロックで表したSyntabloの画面",
      page: "3 / 7",
    },
    learning: {
      section: "学習設計",
      title: "意味を起点とした学習活動",
      subtitle:
        "画像が表す内容を単語ブロックの組み合わせで表現しようとすることで、必要な文法形式へ注意が向く体験を目指す",
      comparisonTitle: "意味と形式の対応",
      conventionalLabel: "従来の文法説明",
      conventionalText:
        "文法形式ばかりに注意が向いてしまうことが多い。",
      syntabloLabel: "Syntabloの教材",
      syntabloText: "意味内容と英語表現（形式）の対応を重視",
      screenshotAlt:
        "食べる動作とリンゴの画像を見てeat an appleを組み立てる教材画面",
      page: "4 / 7",
    },
    modes: {
      section: "学習モード",
      title: "目的に合わせて選べる3つのモード",
      subtitle:
        "段階的な文法演習を行うモード、会話シナリオで練習するモード、自由な作文を行うモードがある",
      items: [
        {
          title: "レッスンモード",
          text: "画像が表す意味を英語のブロックで組み立て、文法事項を段階的に学ぶ。",
          image: "/screenshots/4.png",
          alt: "画像を見ながら英文を組み立てるレッスンモード",
        },
        {
          title: "会話モード",
          text: "場面に応じた応答を組み立て、相手とのやり取りの中で英文を使う。",
          image: "/screenshots/conversation-mode.png",
          alt: "相手とのやり取りを練習する会話モード",
        },
        {
          title: "サンドボックスモード",
          text: "語彙や構文を自由に選び、ブロックの結合条件を確かめながら英文を試作する。",
          image: "/screenshots/sandbox-mode.png",
          alt: "英文を自由に組み立てるサンドボックスモード",
        },
      ],
      page: "5 / 7",
    },
    validation: {
      section: "内部実装",
      title: "正誤判定の内部実装",
      subtitle:
        "ブロックデータにJSON形式で豊富な文法的情報を添付している。これらの衝突によって文法エラーを検知する。",
      actualLabel: "主語 She の素性",
      requiredLabel: "動詞が要求する主語",
      correctTitle: "She + likes",
      correctStatus: "単一化成功",
      correctText: "agr.type がともに 3sing",
      incorrectTitle: "She + like",
      incorrectStatus: "単一化失敗",
      incorrectText: "3sing と non-3sing が衝突",
      correctAlt: "Sheとlikesのブロックが接続可能と判定された画面",
      incorrectAlt: "Sheとlikeのブロックが接続不可能と判定された画面",
      page: "6 / 7",
    },
    scope: {
      section: "対応範囲",
      title: "現在できること・できないこと",
      subtitle:
        "対応している文法事項とそうでない文法事項がある。また、文法を図形で表現するという方式にも限界がある",
      supportedTitle: "できること",
      supportedGroups: [
        {
          title: "名詞句",
          text: "可算・不可算、単数・複数、冠詞、所有格、代名詞の格、形容詞による修飾",
        },
        {
          title: "動詞と文",
          text: "自動詞・他動詞・二重目的語、主語と動詞の一致、現在・過去、否定、疑問文",
        },
        {
          title: "動詞の拡張",
          text: "進行・完了・受動、法助動詞、to不定詞、動名詞",
        },
        {
          title: "修飾と複文",
          text: "副詞、前置詞句、that節、because節、wh疑問文、関係節と空所",
        },
        {
          title: "出力",
          text: "構造に基づく文法判定と日本語訳",
        },
      ],
      unsupportedTitle: "できないこと",
      unsupportedGrammarTitle: "未対応の主な文法",
      unsupportedGrammar: [
        "and・or・butによる等位接続",
        "if・unless・althoughなどの副詞節",
        "than・asを伴う比較構文",
        "存在構文、分裂文、付加疑問",
        "省略、広範な句動詞・慣用構文",
      ],
      limitationsTitle: "方式上の限界",
      limitations: [
        "複数の品詞を受け付けるスロットでも形は1つだけになり、候補を十分に視覚提示できない",
        "意味的・語用論的に適切かどうかは判定できない",
        "文法的でも不自然な文を排除できない",
      ],
      page: "7 / 7",
    },
  },
  en: {
    languageLabel: "Language",
    modeLabel: "View",
    japanese: "日本語",
    english: "English",
    presentation: "Presentation",
    document: "Document",
    eyebrow: "Research and development project",
    title: "Syntablo: An English Grammar Learning Application",
    subtitle:
      "An attempt to externalize invisible grammatical constraints as manipulable shapes",
    summary:
      "Syntablo is a web application for learning English grammar by combining words and phrases as blocks.",
    cards: [
      {
        label: "Background",
        title: "A problem in grammar learning",
        text: "Grammatical constraints and hierarchical sentence structures are difficult to manipulate and observe through verbal explanations alone.",
      },
      {
        label: "Approach",
        title: "Visualizing constraints and structure",
        text: "Combinatory constraints are represented through block shapes, open slots, and nested structures.",
      },
      {
        label: "Implementation",
        title: "Grammar-based validation",
        text: "The system compares lexical features and combinatory constraints to determine whether blocks can be connected.",
      },
    ],
    screenshotAlt: "The Syntablo interface showing English word blocks being combined",
    screenshotCaption:
      "Words and phrases are manipulated as blocks, while compatibility and hierarchical structure are displayed on screen.",
    tryTitle: "Interactive application",
    tryText: "Available on the adjacent PC",
    openApp: "Open application",
    page: "1 / 7",
    problem: {
      section: "Background",
      title: "Problems in English Grammar Learning",
      subtitle:
        "Verbal explanations alone make grammatical constraints and hierarchical sentence structures difficult to manipulate and observe",
      introduction:
        "Constructing an English sentence requires more than lexical meaning and surface word order. Learners must also handle constraints and containment relations between words and phrases.",
      explanationTitle: "Limitations of traditional grammar explanations",
      rule:
        "“A relative pronoun is followed by a clause in which one noun is missing.”",
      explanationPoints: [
        {
          title: "Abstract explanations",
          text: "They are difficult for learners to understand and use in practice.",
        },
        {
          title: "Unclear context of use",
          text: "The explanation does not show when or why the expression is used.",
        },
        {
          title: "Meaning is often disregarded",
          text: "The learner’s goal is not merely to produce grammatically correct sentences, but to express meaning in English.",
        },
      ],
      hierarchyTitle: "Hierarchical structure",
      hierarchySummary:
        "A sentence is not a flat sequence of words; it consists of phrases combined at multiple levels.",
      words: [
        { word: "The", part: "Article", meaning: "その / the" },
        { word: "teacher", part: "Noun", meaning: "先生 / teacher" },
        { word: "gave", part: "Verb", meaning: "与えた / gave" },
        { word: "the", part: "Article", meaning: "その / the" },
        { word: "child", part: "Noun", meaning: "子ども / child" },
        { word: "a", part: "Article", meaning: "一つの / a" },
        { word: "book", part: "Noun", meaning: "本 / book" },
      ],
      nounPhrase: "Noun phrase",
      verbPhrase: "Verb phrase",
      sentenceNode: "Sentence",
      page: "2 / 7",
    },
    method: {
      section: "Approach",
      title: "Visualizing Grammatical Constraints and Hierarchy",
      subtitle:
        "Combinatory constraints are represented by block shapes and slots, while completed phrases can be nested inside other blocks",
      constraintsTitle: "Displaying constraints as slots",
      constraintsText:
        "The number and shape of slots show what elements a verb requires. Only compatible blocks can be inserted.",
      constraintsAlt:
        "The Syntablo interface showing verb blocks with different numbers of slots",
      hierarchyTitle: "Preserving structure through nesting",
      hierarchyText:
        "A completed phrase becomes a single unit that can be inserted into a larger phrase or sentence.",
      hierarchyAlt:
        "The Syntablo interface showing a nested sentence containing Learning English",
      page: "3 / 7",
    },
    learning: {
      section: "Learning design",
      title: "Meaning-Oriented Learning Activities",
      subtitle:
        "The experience is designed so that trying to express the content of an image by combining word blocks draws learners’ attention to the grammatical forms they need",
      comparisonTitle: "Connecting meaning and form",
      conventionalLabel: "Traditional grammar explanations",
      conventionalText:
        "Learners’ attention is often directed primarily toward grammatical form.",
      syntabloLabel: "Syntablo lessons",
      syntabloText: "Emphasis on the correspondence between meaning and English form",
      screenshotAlt:
        "A lesson screen in which the learner sees an eating action and an apple and builds eat an apple",
      page: "4 / 7",
    },
    modes: {
      section: "Learning modes",
      title: "Three Modes for Different Learning Goals",
      subtitle:
        "There is a mode for step-by-step grammar exercises, a mode for practicing through conversation scenarios, and a mode for free-form sentence writing",
      items: [
        {
          title: "Lesson mode",
          text: "Build the meaning shown in an image with English blocks and learn grammar step by step.",
          image: "/screenshots/4.png",
          alt: "Lesson mode for building an English expression from an image",
        },
        {
          title: "Conversation mode",
          text: "Construct responses for each situation and use English within an unfolding interaction.",
          image: "/screenshots/conversation-mode.png",
          alt: "Conversation mode for practicing an interaction",
        },
        {
          title: "Sandbox mode",
          text: "Freely choose words and constructions and test sentences while checking how blocks can combine.",
          image: "/screenshots/sandbox-mode.png",
          alt: "Sandbox mode for freely building English sentences",
        },
      ],
      page: "5 / 7",
    },
    validation: {
      section: "Implementation",
      title: "How Grammatical Validation Works",
      subtitle:
        "Block data includes rich grammatical information in JSON format. Grammatical errors are detected when these features conflict.",
      actualLabel: "Features of the subject She",
      requiredLabel: "Subject required by the verb",
      correctTitle: "She + likes",
      correctStatus: "Unification succeeds",
      correctText: "Both agr.type values are 3sing",
      incorrectTitle: "She + like",
      incorrectStatus: "Unification fails",
      incorrectText: "3sing conflicts with non-3sing",
      correctAlt: "The interface showing that the blocks She and likes are compatible",
      incorrectAlt: "The interface showing that the blocks She and like are incompatible",
      page: "6 / 7",
    },
    scope: {
      section: "Coverage",
      title: "What the Current System Can and Cannot Do",
      subtitle:
        "Some grammar topics are supported, while others are not. The approach of representing grammar through shapes also has limitations",
      supportedTitle: "Supported",
      supportedGroups: [
        {
          title: "Noun phrases",
          text: "Countability, number, articles, possessives, pronoun case, and adjectival modification",
        },
        {
          title: "Verbs and sentences",
          text: "Intransitive, transitive, and ditransitive verbs; agreement; present and past; negation; questions",
        },
        {
          title: "Verb extensions",
          text: "Progressive, perfect, passive, modal auxiliaries, to-infinitives, and gerunds",
        },
        {
          title: "Modification and clauses",
          text: "Adverbs, prepositional phrases, that- and because-clauses, wh-questions, and relative-clause gaps",
        },
        {
          title: "Output",
          text: "Structure-based grammatical validation and Japanese translation",
        },
      ],
      unsupportedTitle: "Unsupported",
      unsupportedGrammarTitle: "Major unsupported grammar",
      unsupportedGrammar: [
        "Coordination with and, or, and but",
        "Adverbial clauses with if, unless, although, etc.",
        "Comparative constructions with than and as",
        "Existentials, clefts, and tag questions",
        "Ellipsis and a broad range of phrasal or idiomatic constructions",
      ],
      limitationsTitle: "Limitations of the approach",
      limitations: [
        "A slot has only one shape even when it accepts multiple parts of speech, limiting visual feedforward",
        "Semantic and pragmatic appropriateness cannot be evaluated",
        "Grammatical but unnatural sentences cannot be excluded",
      ],
      page: "7 / 7",
    },
  },
} as const;

interface ExhibitFooterProps {
  appLabel: string;
  appText: string;
  openAppLabel: string;
  page: string;
  showAppButton?: boolean;
}

function ExhibitFooter({
  appLabel,
  appText,
  openAppLabel,
  page,
  showAppButton = false,
}: ExhibitFooterProps) {
  return (
    <footer className={styles.slideFooter}>
      <div className={styles.tryApp}>
        <Image src="/QR_972221.png" width={76} height={76} alt="" />
        <div>
          <strong>{appLabel}</strong>
          <span>{appText}</span>
        </div>
        {showAppButton && (
          <Link href="/app" className={styles.primaryButton}>
            {openAppLabel}
          </Link>
        )}
      </div>
      <span className={styles.pageNumber}>{page}</span>
    </footer>
  );
}

export default function ExhibitPage() {
  const [language, setLanguage] = useState<Language>("ja");
  const [viewMode, setViewMode] = useState<ViewMode>("presentation");
  const [currentPage, setCurrentPage] = useState(0);
  const wheelLockedRef = useRef(false);
  const t = content[language];
  const implementedPageCount = 7;

  const movePage = useCallback((direction: 1 | -1) => {
    setCurrentPage((page) =>
      Math.min(Math.max(page + direction, 0), implementedPageCount - 1),
    );
  }, []);

  useEffect(() => {
    if (viewMode !== "presentation") return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target?.tagName === "BUTTON" ||
        target?.tagName === "A" ||
        target?.tagName === "INPUT"
      ) {
        return;
      }

      if (
        event.key === "ArrowDown" ||
        event.key === "ArrowRight" ||
        event.key === " " ||
        event.key === "Enter"
      ) {
        event.preventDefault();
        movePage(1);
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        movePage(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [movePage, viewMode]);

  const handleWheel = (event: React.WheelEvent<HTMLElement>) => {
    if (
      viewMode !== "presentation" ||
      wheelLockedRef.current ||
      Math.abs(event.deltaY) < 30
    ) {
      return;
    }

    wheelLockedRef.current = true;
    movePage(event.deltaY > 0 ? 1 : -1);
    window.setTimeout(() => {
      wheelLockedRef.current = false;
    }, 650);
  };

  return (
    <main
      className={`${styles.exhibit} ${
        viewMode === "presentation" ? styles.presentation : styles.document
      }`}
      onWheel={handleWheel}
    >
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo} aria-label="Syntablo ホーム">
            <Image
              src="/android-chrome-512x512.png"
              width={30}
              height={30}
              alt=""
              priority
            />
            <span>Syntablo</span>
          </Link>

          <div className={styles.controls}>
            <div className={styles.controlGroup} aria-label={t.languageLabel}>
              <span className={styles.controlLabel}>{t.languageLabel}</span>
              <div className={styles.segmented}>
                <button
                  type="button"
                  className={language === "ja" ? styles.active : ""}
                  aria-pressed={language === "ja"}
                  onClick={() => setLanguage("ja")}
                >
                  {t.japanese}
                </button>
                <button
                  type="button"
                  className={language === "en" ? styles.active : ""}
                  aria-pressed={language === "en"}
                  onClick={() => setLanguage("en")}
                >
                  {t.english}
                </button>
              </div>
            </div>

            <div className={styles.controlGroup} aria-label={t.modeLabel}>
              <span className={styles.controlLabel}>{t.modeLabel}</span>
              <div className={styles.segmented}>
                <button
                  type="button"
                  className={viewMode === "presentation" ? styles.active : ""}
                  aria-pressed={viewMode === "presentation"}
                  onClick={() => setViewMode("presentation")}
                >
                  {t.presentation}
                </button>
                <button
                  type="button"
                  className={viewMode === "document" ? styles.active : ""}
                  aria-pressed={viewMode === "document"}
                  onClick={() => setViewMode("document")}
                >
                  {t.document}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <article
        className={`${styles.slide} ${
          currentPage === 0 ? styles.activeSlide : ""
        }`}
      >
        <section className={styles.introduction}>
          <div className={styles.titleBlock}>
            <p className={styles.eyebrow}>{t.eyebrow}</p>
            <h1>{t.title}</h1>
            <p className={styles.subtitle}>{t.subtitle}</p>
            <p className={styles.summary}>{t.summary}</p>
          </div>

          <figure className={styles.visual}>
            <div className={styles.screenshotFrame}>
              <Image
                src="/screenshots/syntablo-hero.png"
                alt={t.screenshotAlt}
                width={1440}
                height={811}
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
            <figcaption>{t.screenshotCaption}</figcaption>
          </figure>
        </section>

        <section className={styles.cardGrid} aria-label={t.summary}>
          {t.cards.map((card) => (
            <article className={styles.card} key={card.label}>
              <span>{card.label}</span>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </article>
          ))}
        </section>

        <ExhibitFooter
          appLabel={t.tryTitle}
          appText={t.tryText}
          openAppLabel={t.openApp}
          page={t.page}
          showAppButton
        />
      </article>

      <article
        className={`${styles.slide} ${styles.problemSlide} ${
          currentPage === 1 ? styles.activeSlide : ""
        }`}
      >
        <header className={styles.slideHeading}>
          <p className={styles.eyebrow}>{t.problem.section}</p>
          <h1>{t.problem.title}</h1>
          <p className={styles.slideSubtitle}>{t.problem.subtitle}</p>
          <p className={styles.slideIntroduction}>{t.problem.introduction}</p>
        </header>

        <div className={styles.problemGrid}>
          <section className={`${styles.problemPanel} ${styles.explanationPanel}`}>
            <div className={styles.panelHeading}>
              <span className={styles.panelNumber}>01</span>
              <div>
                <h2>{t.problem.explanationTitle}</h2>
              </div>
            </div>

            <blockquote className={styles.ruleExample}>{t.problem.rule}</blockquote>

            <div className={styles.explanationPoints}>
              {t.problem.explanationPoints.map((point) => (
                <div className={styles.explanationPoint} key={point.title}>
                  <strong>{point.title}</strong>
                  <p>{point.text}</p>
                </div>
              ))}
            </div>

          </section>

          <section className={styles.problemPanel}>
            <div className={styles.panelHeading}>
              <span className={styles.panelNumber}>02</span>
              <div>
                <h2>{t.problem.hierarchyTitle}</h2>
                <p>{t.problem.hierarchySummary}</p>
              </div>
            </div>

            <div className={styles.structureExample}>
              <div
                className={styles.proofTree}
                aria-label="The teacher gave the child a book."
              >
                {t.problem.words.map((item) => (
                  <div className={styles.lexicalItem} key={`${item.word}-${item.meaning}`}>
                    <strong>{item.word}</strong>
                    <span>{item.part}</span>
                    <small>{item.meaning}</small>
                  </div>
                ))}

                <div className={`${styles.constituent} ${styles.subjectPhrase}`}>
                  <span>The teacher</span>
                  <strong>{t.problem.nounPhrase}</strong>
                </div>
                <div className={`${styles.constituent} ${styles.recipientPhrase}`}>
                  <span>the child</span>
                  <strong>{t.problem.nounPhrase}</strong>
                </div>
                <div className={`${styles.constituent} ${styles.objectPhrase}`}>
                  <span>a book</span>
                  <strong>{t.problem.nounPhrase}</strong>
                </div>
                <div className={`${styles.constituent} ${styles.predicatePhrase}`}>
                  <span>gave the child a book</span>
                  <strong>{t.problem.verbPhrase}</strong>
                </div>
                <div className={`${styles.constituent} ${styles.sentencePhrase}`}>
                  <span>The teacher gave the child a book.</span>
                  <strong>{t.problem.sentenceNode}</strong>
                </div>
              </div>
            </div>
          </section>
        </div>

        <ExhibitFooter
          appLabel={t.tryTitle}
          appText={t.tryText}
          openAppLabel={t.openApp}
          page={t.problem.page}
        />
      </article>

      <article
        className={`${styles.slide} ${styles.methodSlide} ${
          currentPage === 2 ? styles.activeSlide : ""
        }`}
      >
        <header className={styles.slideHeading}>
          <p className={styles.eyebrow}>{t.method.section}</p>
          <h1>{t.method.title}</h1>
          <p className={styles.slideSubtitle}>{t.method.subtitle}</p>
        </header>

        <div className={styles.methodGrid}>
          <section className={styles.methodCard}>
            <div className={styles.methodCardHeading}>
              <span className={styles.panelNumber}>01</span>
              <div>
                <h2>{t.method.constraintsTitle}</h2>
                <p>{t.method.constraintsText}</p>
              </div>
            </div>
            <figure className={styles.methodVisual}>
              <Image
                src="/screenshots/3-1.png"
                alt={t.method.constraintsAlt}
                width={1118}
                height={758}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </figure>
          </section>

          <section className={styles.methodCard}>
            <div className={styles.methodCardHeading}>
              <span className={styles.panelNumber}>02</span>
              <div>
                <h2>{t.method.hierarchyTitle}</h2>
                <p>{t.method.hierarchyText}</p>
              </div>
            </div>
            <figure className={styles.methodVisual}>
              <Image
                src="/screenshots/3-2.png"
                alt={t.method.hierarchyAlt}
                width={1118}
                height={758}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </figure>
          </section>
        </div>

        <ExhibitFooter
          appLabel={t.tryTitle}
          appText={t.tryText}
          openAppLabel={t.openApp}
          page={t.method.page}
        />
      </article>

      <article
        className={`${styles.slide} ${styles.learningSlide} ${
          currentPage === 3 ? styles.activeSlide : ""
        }`}
      >
        <header className={styles.slideHeading}>
          <p className={styles.eyebrow}>{t.learning.section}</p>
          <h1>{t.learning.title}</h1>
          <p className={styles.slideSubtitle}>{t.learning.subtitle}</p>
        </header>

        <div className={styles.learningLayout}>
          <div className={styles.learningContent}>
            <section className={styles.comparisonCard}>
              <h2>{t.learning.comparisonTitle}</h2>
              <div className={`${styles.comparisonItem} ${styles.conventionalItem}`}>
                <span>{t.learning.conventionalLabel}</span>
                <p>{t.learning.conventionalText}</p>
              </div>
              <div className={styles.comparisonArrow} aria-hidden="true">↓</div>
              <div className={`${styles.comparisonItem} ${styles.syntabloItem}`}>
                <span>{t.learning.syntabloLabel}</span>
                <p>{t.learning.syntabloText}</p>
              </div>
            </section>
          </div>

          <figure className={styles.learningVisual}>
            <Image
              src="/screenshots/4.png"
              alt={t.learning.screenshotAlt}
              width={1528}
              height={1598}
              sizes="(max-width: 900px) 100vw, 58vw"
            />
          </figure>
        </div>

        <ExhibitFooter
          appLabel={t.tryTitle}
          appText={t.tryText}
          openAppLabel={t.openApp}
          page={t.learning.page}
        />
      </article>

      <article
        className={`${styles.slide} ${styles.modesSlide} ${
          currentPage === 4 ? styles.activeSlide : ""
        }`}
      >
        <header className={styles.slideHeading}>
          <p className={styles.eyebrow}>{t.modes.section}</p>
          <h1>{t.modes.title}</h1>
          <p className={styles.slideSubtitle}>{t.modes.subtitle}</p>
        </header>

        <div className={styles.modesGrid}>
          {t.modes.items.map((item, index) => (
            <section className={styles.modeCard} key={item.title}>
              <div className={styles.modeCardHeading}>
                <span className={styles.panelNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </div>
              </div>
              <figure className={styles.modeVisual}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={index === 0 ? 1528 : index === 1 ? 1764 : 1974}
                  height={index === 0 ? 1598 : index === 1 ? 770 : 1496}
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
              </figure>
            </section>
          ))}
        </div>

        <ExhibitFooter
          appLabel={t.tryTitle}
          appText={t.tryText}
          openAppLabel={t.openApp}
          page={t.modes.page}
        />
      </article>

      <article
        className={`${styles.slide} ${styles.validationSlide} ${
          currentPage === 5 ? styles.activeSlide : ""
        }`}
      >
        <header className={styles.slideHeading}>
          <p className={styles.eyebrow}>{t.validation.section}</p>
          <h1>{t.validation.title}</h1>
          <p className={styles.slideSubtitle}>{t.validation.subtitle}</p>
        </header>

        <div className={styles.validationGrid}>
          <section className={`${styles.validationCard} ${styles.correctCard}`}>
            <div className={styles.validationHeading}>
              <div>
                <h2>{t.validation.correctTitle}</h2>
                <p>{t.validation.correctText}</p>
              </div>
              <span>{t.validation.correctStatus}</span>
            </div>

            <figure className={styles.validationVisual}>
              <Image
                src="/screenshots/5-correct.png"
                alt={t.validation.correctAlt}
                width={1088}
                height={756}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </figure>

            <div className={styles.featureComparison}>
              <div>
                <span>{t.validation.actualLabel}</span>
                <pre><code>{`{
  "case": "nom",
  "agr.type":
    `}<strong className={styles.matchFeature}>&quot;3sing&quot;</strong>{`
}`}</code></pre>
              </div>
              <b aria-hidden="true">+</b>
              <div>
                <span>{t.validation.requiredLabel}</span>
                <pre><code>{`{
  "case": "nom",
  "agr.type":
    `}<strong className={styles.matchFeature}>&quot;3sing&quot;</strong>{`
}`}</code></pre>
              </div>
            </div>
          </section>

          <section className={`${styles.validationCard} ${styles.incorrectCard}`}>
            <div className={styles.validationHeading}>
              <div>
                <h2>{t.validation.incorrectTitle}</h2>
                <p>{t.validation.incorrectText}</p>
              </div>
              <span>{t.validation.incorrectStatus}</span>
            </div>

            <figure className={styles.validationVisual}>
              <Image
                src="/screenshots/5-incorrect.png"
                alt={t.validation.incorrectAlt}
                width={1088}
                height={756}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </figure>

            <div className={styles.featureComparison}>
              <div>
                <span>{t.validation.actualLabel}</span>
                <pre><code>{`{
  "case": "nom",
  "agr.type":
    `}<strong className={styles.conflictFeature}>&quot;3sing&quot;</strong>{`
}`}</code></pre>
              </div>
              <b aria-hidden="true">+</b>
              <div>
                <span>{t.validation.requiredLabel}</span>
                <pre><code>{`{
  "case": "nom",
  "agr.type":
    `}<strong className={styles.conflictFeature}>&quot;non-3sing&quot;</strong>{`
}`}</code></pre>
              </div>
            </div>
          </section>
        </div>

        <ExhibitFooter
          appLabel={t.tryTitle}
          appText={t.tryText}
          openAppLabel={t.openApp}
          page={t.validation.page}
        />
      </article>

      <article
        className={`${styles.slide} ${styles.scopeSlide} ${
          currentPage === 6 ? styles.activeSlide : ""
        }`}
      >
        <header className={styles.slideHeading}>
          <p className={styles.eyebrow}>{t.scope.section}</p>
          <h1>{t.scope.title}</h1>
          <p className={styles.slideSubtitle}>{t.scope.subtitle}</p>
        </header>

        <div className={styles.scopeGrid}>
          <section className={`${styles.scopeCard} ${styles.supportedCard}`}>
            <div className={styles.scopeCardHeading}>
              <div className={styles.scopeIcon}>01</div>
              <h2>{t.scope.supportedTitle}</h2>
            </div>
            <div className={styles.supportedGroups}>
              {t.scope.supportedGroups.map((group) => (
                <div className={styles.supportedGroup} key={group.title}>
                  <strong>{group.title}</strong>
                  <p>{group.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={`${styles.scopeCard} ${styles.unsupportedCard}`}>
            <div className={styles.scopeCardHeading}>
              <div className={styles.scopeIcon}>02</div>
              <h2>{t.scope.unsupportedTitle}</h2>
            </div>

            <div className={styles.unsupportedSection}>
              <h3>{t.scope.unsupportedGrammarTitle}</h3>
              <ul>
                {t.scope.unsupportedGrammar.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.limitationSection}>
              <h3>{t.scope.limitationsTitle}</h3>
              <ul>
                {t.scope.limitations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <ExhibitFooter
          appLabel={t.tryTitle}
          appText={t.tryText}
          openAppLabel={t.openApp}
          page={t.scope.page}
        />
      </article>
    </main>
  );
}
