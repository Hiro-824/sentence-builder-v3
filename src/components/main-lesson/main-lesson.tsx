"use client";

import Link from "next/link";
import Image from "next/image";
import * as d3 from "d3";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Renderer } from "@/renderer/renderer";
import { Block } from "@/models/block";
import { LESSON_NOUNS, LessonNoun } from "@/data/lesson-nouns";
import { getLessonBlocks } from "@/data/lesson-blocks";
import styles from "./main-lesson.module.css";

type NumberValue = "singular" | "plural";
type Feedback = "idle" | "wrong" | "correct";

interface LessonQuestion {
  noun: LessonNoun;
  distractor: LessonNoun;
  number: NumberValue;
  definite: boolean;
}

interface BuiltAnswer {
  determiner: "a" | "the" | "some" | null;
  noun: string;
}

const QUESTION_COUNT = 10;

const shuffle = <T,>(items: T[]): T[] => {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
};

const buildQuestions = (): LessonQuestion[] => {
  const opening: Array<Pick<LessonQuestion, "number" | "definite">> = [
    { number: "singular", definite: false },
    { number: "plural", definite: false },
    { number: "singular", definite: true },
    { number: "plural", definite: true },
  ];
  const remaining: Array<Pick<LessonQuestion, "number" | "definite">> = [
    { number: "singular", definite: false },
    { number: "singular", definite: false },
    { number: "plural", definite: false },
    { number: "plural", definite: false },
    { number: "singular", definite: true },
    { number: "plural", definite: true },
  ];
  const conditions = shuffle(opening).concat(shuffle(remaining));
  const nouns = shuffle(LESSON_NOUNS).slice(0, QUESTION_COUNT);

  return conditions.map((condition, index) => ({
    ...condition,
    noun: nouns[index],
    distractor: shuffle(
      LESSON_NOUNS.filter((candidate) => candidate.singular !== nouns[index].singular),
    )[0],
  }));
};

const getSelectedToken = (block: Block): string => {
  const head = block.children.find((child) => child.id === "head");
  const selected = head?.type === "dropdown" ? head.selected ?? 0 : 0;
  return block.words[selected]?.token?.replace(/\([^)]*\)/g, "") || "";
};

const readBuiltAnswers = (blocks: Block[]): BuiltAnswer[] => {
  const answers: BuiltAnswer[] = [];
  for (const block of blocks) {
    const sourceId = (block as Block & { sourceBlockId?: string }).sourceBlockId ?? "";
    const determiner =
      sourceId === "det_a_an" ? "a"
        : sourceId === "det_the" ? "the"
          : sourceId === "det_some" ? "some"
            : null;

    if (determiner) {
      const nounChild = block.children.find(
        (child) => child.type === "placeholder" && child.content,
      )?.content as Block | undefined;
      if (nounChild) answers.push({ determiner, noun: getSelectedToken(nounChild) });
      continue;
    }

    if (sourceId.startsWith("lesson_noun_")) {
      const token = getSelectedToken(block);
      if (token && !token.endsWith("(base)")) answers.push({ determiner: null, noun: token });
    }
  }
  return answers;
};

const NounPicture = ({ noun }: { noun: LessonNoun }) => (
  <span
    className={styles.nounPicture}
    role="img"
    aria-label={noun.translation}
    style={{
      backgroundPosition: `${noun.spriteColumn * 25}% ${noun.spriteRow * (100 / 3)}%`,
    }}
  />
);

export default function MainLesson() {
  const [questions, setQuestions] = useState<LessonQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>("idle");
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [firstTryCorrect, setFirstTryCorrect] = useState(0);
  const [completed, setCompleted] = useState(false);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const questionRef = useRef<LessonQuestion | null>(null);
  const feedbackRef = useRef<Feedback>("idle");
  const wrongAttemptsRef = useRef(0);
  const lastEvaluationRef = useRef("");
  const nextTimerRef = useRef<number | null>(null);

  useEffect(() => setQuestions(buildQuestions()), []);

  const question = questions[questionIndex];
  questionRef.current = question ?? null;
  feedbackRef.current = feedback;
  wrongAttemptsRef.current = wrongAttempts;

  const lessonBlocks = useMemo(
    () => question ? getLessonBlocks(question.noun.singular, question.distractor.singular) : [],
    [question],
  );

  const evaluateCanvas = useCallback(() => {
    const renderer = rendererRef.current;
    const activeQuestion = questionRef.current;
    if (!renderer || !activeQuestion || feedbackRef.current === "correct") return;

    const answers = readBuiltAnswers(renderer.blocks as Block[]);
    if (answers.length === 0) return;

    const signature = JSON.stringify(answers);
    if (signature === lastEvaluationRef.current) return;
    lastEvaluationRef.current = signature;

    const targetWord =
      activeQuestion.number === "plural"
        ? activeQuestion.noun.plural
        : activeQuestion.noun.singular;
    const isCorrect = answers.some((answer) => {
      if (answer.noun !== targetWord) return false;
      if (activeQuestion.definite) return answer.determiner === "the";
      if (activeQuestion.number === "singular") return answer.determiner === "a";
      return answer.determiner === null || answer.determiner === "some";
    });

    if (isCorrect) {
      setFeedback("correct");
      if (wrongAttemptsRef.current === 0) setFirstTryCorrect((count) => count + 1);
      nextTimerRef.current = window.setTimeout(() => setShowNext(true), 800);
    } else {
      setFeedback("wrong");
      setWrongAttempts((count) => count + 1);
    }
  }, []);

  useEffect(() => {
    if (!question || !svgContainerRef.current || rendererRef.current) return;

    const container = d3.select(svgContainerRef.current);
    container.selectAll("*").remove();
    const topBarHeight = 64;
    const svg = container
      .append("svg")
      .attr("id", "svg")
      .attr("width", window.innerWidth)
      .attr("height", window.innerHeight - topBarHeight)
      .style("background-color", "#ffffff");

    const renderer = new Renderer(
      [],
      {},
      svg,
      () => window.setTimeout(evaluateCanvas, 0),
      topBarHeight,
      () => undefined,
      "lesson",
      [],
      false,
      lessonBlocks,
    );
    renderer.setTranslationVisibility(false);
    rendererRef.current = renderer;

    const handleResize = () => {
      svg.attr("width", window.innerWidth).attr("height", window.innerHeight - topBarHeight);
      renderer.canvasHeight = window.innerHeight - topBarHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.destroy();
      rendererRef.current = null;
      if (nextTimerRef.current) window.clearTimeout(nextTimerRef.current);
    };
  }, [evaluateCanvas, lessonBlocks, question]);

  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer || !question) return;
    renderer.blocks = [];
    renderer.setLessonBlockList(lessonBlocks);
    renderer.renderBlocks();
    lastEvaluationRef.current = "";
  }, [lessonBlocks, question]);

  const handleTranslationChange = () => {
    const next = !showTranslation;
    setShowTranslation(next);
    rendererRef.current?.setTranslationVisibility(next);
  };

  const goNext = () => {
    if (nextTimerRef.current) window.clearTimeout(nextTimerRef.current);
    if (questionIndex === QUESTION_COUNT - 1) {
      setCompleted(true);
      return;
    }
    setQuestionIndex((index) => index + 1);
    setFeedback("idle");
    setWrongAttempts(0);
    setShowNext(false);
    lastEvaluationRef.current = "";
  };

  const restart = () => {
    setQuestions(buildQuestions());
    setQuestionIndex(0);
    setFeedback("idle");
    setWrongAttempts(0);
    setShowNext(false);
    setFirstTryCorrect(0);
    setCompleted(false);
    lastEvaluationRef.current = "";
  };

  if (!question) {
    return <div className={styles.loading}>レッスンを準備しています…</div>;
  }

  return (
    <main className={styles.page}>
      <nav className="top-bar-nav">
        <div className="top-bar-left">
          <Link href="/" className="top-bar-logo" style={{ textDecoration: "none" }}>
            <Image
              src="/android-chrome-512x512.png"
              alt="Syntablo icon"
              className="top-bar-logo-icon"
              width={28}
              height={28}
            />
            <span>Syntablo</span>
          </Link>
          <span className={styles.lessonLabel}>Lesson 1</span>
        </div>
        <div className={styles.subNavigation}>
          <Link href="/app/sandbox">Sandbox</Link>
          <Link href="/app/scenario">Scenario</Link>
        </div>
      </nav>

      {!completed && <div ref={svgContainerRef} className={styles.canvas} />}

      {completed ? (
        <section className={styles.completion}>
          <div className={styles.completionIcon}>✓</div>
          <p className={styles.eyebrow}>Lesson complete</p>
          <h1>10問、すべて完成しました！</h1>
          <p>はじめから正解できたのは <strong>{firstTryCorrect} / 10</strong> 問</p>
          <div className={styles.completionActions}>
            <button type="button" onClick={restart}>もう一度</button>
            <Link href="/app/sandbox">自由に作ってみる</Link>
          </div>
        </section>
      ) : (
        <aside className={styles.lessonPanel}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.eyebrow}>Lesson 1</p>
              <h1>絵に合うことばを作ろう</h1>
            </div>
            <strong>{questionIndex + 1} / {QUESTION_COUNT}</strong>
          </div>
          <div className={styles.progress}>
            <span style={{ width: `${((questionIndex + 1) / QUESTION_COUNT) * 100}%` }} />
          </div>
          <p className={styles.instruction}>絵の数と、指が示しているものに注目しよう</p>

          <div className={styles.pictureStage}>
            <div className={question.number === "plural" ? styles.pluralPictures : styles.singlePicture}>
              <NounPicture noun={question.noun} />
              {question.number === "plural" && (
                <>
                  <NounPicture noun={question.noun} />
                  <NounPicture noun={question.noun} />
                </>
              )}
            </div>
            {question.definite && (
              <Image
                className={styles.pointer}
                src="/lesson-assets/pointer.png"
                alt="指差している手"
                width={160}
                height={160}
                priority
              />
            )}
          </div>

          <div className={styles.translationRow}>
            <span>日本語訳</span>
            <button
              type="button"
              role="switch"
              aria-checked={showTranslation}
              className={`${styles.switch} ${showTranslation ? styles.switchOn : ""}`}
              onClick={handleTranslationChange}
            >
              <span />
            </button>
          </div>

          <div className={styles.feedback} aria-live="polite">
            {feedback === "wrong" && (
              <>
                <strong>もう一度やってみよう</strong>
                {wrongAttempts >= 2 && <span>絵の数と、指があるかを見直してみよう。</span>}
              </>
            )}
            {feedback === "correct" && <strong className={styles.correct}>できました！</strong>}
          </div>

          {showNext && (
            <button className={styles.nextButton} type="button" onClick={goNext}>
              {questionIndex === QUESTION_COUNT - 1 ? "結果を見る" : "次へ"} →
            </button>
          )}
        </aside>
      )}
    </main>
  );
}

