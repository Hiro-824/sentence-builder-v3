"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import * as d3 from "d3";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Renderer } from "@/renderer/renderer";
import type { Block, BlockChild } from "@/models/block";
import type { LessonNoun } from "@/data/lesson-nouns";
import {
  LESSON_ORDER,
  getLessonDefinition,
  type LessonEntityVisual,
  type LessonQuestion,
  type LessonVisual,
} from "@/data/lesson-content";
import LessonCompleteModal from "@/components/lesson-complete-modal/lesson-complete-modal";
import LessonCurriculumModal from "@/components/lesson-curriculum-modal/lesson-curriculum-modal";
import LessonExitModal from "@/components/lesson-exit-modal/lesson-exit-modal";
import TopBar from "@/components/top-bar";
import { useAppAuth } from "@/components/app-auth-provider";
import {
  playLessonCompleteSound,
  playNextQuestionSound,
} from "@/utils/audio-feedback";
import styles from "./main-lesson.module.css";

type Feedback = "idle" | "wrong" | "correct";

const QUESTION_COUNT = 10;
const WRONG_PHRASE_WARNING_THRESHOLD = 3;
const COMPLETED_LESSONS_STORAGE_KEY = "syntablo:completed-lessons";

const normalizePhrase = (value: string) =>
  value
    .replace(/\([^)]*\)/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const getSourceBlockId = (block: Block): string =>
  (block as Block & { sourceBlockId?: string }).sourceBlockId ?? block.id;

const childText = (child: BlockChild): string => {
  if (child.hidden) return "";
  if ((child.type === "placeholder" || child.type === "attachment") && child.content) {
    return blockText(child.content as Block);
  }
  if (child.type === "dropdown" && Array.isArray(child.content)) {
    return String(child.content[child.selected ?? 0] ?? "");
  }
  if (child.type === "text") return String(child.content ?? "");
  return "";
};

const blockText = (block: Block): string =>
  normalizePhrase(block.children.map(childText).filter(Boolean).join(" "));

const isCompleteBlock = (block: Block): boolean =>
  block.children.every((child) => {
    if (child.hidden) return true;
    if (child.type === "placeholder") {
      return Boolean(child.content) && isCompleteBlock(child.content as Block);
    }
    if (child.type === "attachment" && child.content) {
      return isCompleteBlock(child.content as Block);
    }
    return true;
  });

const isEvaluableRoot = (block: Block, phrase: string, expected: string[]) => {
  if (expected.includes(phrase)) return true;
  const sourceId = getSourceBlockId(block);
  return (
    sourceId.startsWith("det_")
    || sourceId.endsWith("_determiner")
    || sourceId.endsWith("_verb")
  );
};

let speechEngineWarmed = false;

const getPreferredEnglishVoice = (voices: SpeechSynthesisVoice[]) =>
  voices.find((voice) => /google/i.test(voice.name) && /^en(-|_)/i.test(voice.lang))
  ?? voices.find((voice) => /^en-US$/i.test(voice.lang))
  ?? voices.find((voice) => /^en(-|_)/i.test(voice.lang))
  ?? null;

const speakPhrase = (phrase: string) => {
  if (!("speechSynthesis" in window)) return;
  const synthesis = window.speechSynthesis;
  let hasStarted = false;

  const start = () => {
    if (hasStarted) return;
    hasStarted = true;
    synthesis.removeEventListener("voiceschanged", start);
    const voice = getPreferredEnglishVoice(synthesis.getVoices());

    const speakActualPhrase = () => {
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = voice?.lang ?? "en-US";
      utterance.voice = voice;
      utterance.rate = 0.82;
      synthesis.cancel();
      synthesis.speak(utterance);
    };

    if (speechEngineWarmed) {
      speakActualPhrase();
      return;
    }

    speechEngineWarmed = true;
    const warmup = new SpeechSynthesisUtterance(".");
    warmup.lang = voice?.lang ?? "en-US";
    warmup.voice = voice;
    warmup.volume = 0;
    warmup.rate = 2;
    let didFinishWarmup = false;
    const finishWarmup = () => {
      if (didFinishWarmup) return;
      didFinishWarmup = true;
      speakActualPhrase();
    };
    warmup.onend = finishWarmup;
    warmup.onerror = finishWarmup;
    synthesis.cancel();
    synthesis.speak(warmup);
    window.setTimeout(finishWarmup, 350);
  };

  if (synthesis.getVoices().length > 0) start();
  else {
    synthesis.addEventListener("voiceschanged", start, { once: true });
    window.setTimeout(start, 1200);
  }
};

const nounPictureStyle = (noun: LessonNoun) =>
  noun.singular === "egg"
    ? {
        backgroundImage: 'url("/lesson-assets/egg-clean-v3.png")',
        backgroundPosition: "center",
        backgroundSize: "100% 100%",
      }
    : {
        backgroundPosition: `${noun.spriteColumn * 25}% ${noun.spriteRow * (100 / 3)}%`,
      };

const NounPicture = ({ noun, className = "" }: { noun: LessonNoun; className?: string }) => (
  <span
    className={`${styles.nounPicture} ${className}`}
    role="img"
    aria-label={noun.translation}
    style={nounPictureStyle(noun)}
  />
);

const EntityPicture = ({ entity }: { entity: LessonEntityVisual }) => (
  <div className={styles.entityTile}>
    {entity.type === "noun" ? (
      <>
        <NounPicture noun={entity.noun} className={styles.complementNoun} />
        {entity.definite && (
          <Image
            className={styles.objectPointer}
            src="/lesson-assets/pointer-opaque.png"
            alt="対象を指差している手"
            width={72}
            height={72}
            unoptimized
          />
        )}
      </>
    ) : (
      <span
        className={styles.assetEntity}
        role="img"
        aria-label={entity.label}
        style={{ backgroundImage: `url("/lesson-assets/entities/${entity.name}.png")` }}
      />
    )}
  </div>
);

const LessonPicture = ({ visual }: { visual: LessonVisual }) => {
  if (visual.type === "countable") {
    return (
      <>
        <div className={visual.number === "plural" ? styles.pluralPictures : styles.singlePicture}>
          <NounPicture noun={visual.noun} />
          {visual.number === "plural" && (
            <>
              <NounPicture noun={visual.noun} />
              <NounPicture noun={visual.noun} />
            </>
          )}
        </div>
        {visual.definite && (
          <Image
            className={styles.pointer}
            src="/lesson-assets/pointer-opaque.png"
            alt="指差している手"
            width={160}
            height={160}
            priority
            unoptimized
          />
        )}
      </>
    );
  }

  if (visual.type === "uncountable") {
    const standaloneImage =
      visual.spriteIndex === 7
        ? "/lesson-assets/juice-clean-v2.png"
        : visual.spriteIndex === 8
          ? "/lesson-assets/soup-clean-v2.png"
          : null;
    return (
      <>
        <span
          className={styles.uncountablePicture}
          role="img"
          aria-label={visual.label}
          style={
            standaloneImage
              ? {
                  backgroundImage: `url("${standaloneImage}")`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                }
              : {
                  backgroundPosition: `${(visual.spriteIndex % 5) * 25}% ${Math.floor(visual.spriteIndex / 5) * 100}%`,
                }
          }
        />
        {visual.definite && (
          <Image
            className={styles.pointer}
            src="/lesson-assets/pointer-opaque.png"
            alt="指差している手"
            width={160}
            height={160}
            unoptimized
          />
        )}
      </>
    );
  }

  if (visual.type === "predicate") {
    const isDitransitive = visual.complements.length === 2;

    return (
      <div
        className={`${styles.predicateScene} ${styles[`arity${visual.complements.length}`]}`}
        aria-label={visual.label}
      >
        <div className={styles.predicateTile}>
          <span
            className={styles.predicatePicture}
            role="img"
            aria-label={`${visual.predicate} の動作`}
            style={{ backgroundImage: `url("/lesson-assets/predicates/${visual.predicate}-v2.png")` }}
          />
        </div>
        {isDitransitive ? (
          <>
            <span className={styles.relationArrow} aria-hidden="true">→</span>
            <div className={styles.ditransitiveComplements}>
              <EntityPicture entity={visual.complements[1]} />
              <span className={styles.downArrow} aria-hidden="true">↓</span>
              <EntityPicture entity={visual.complements[0]} />
            </div>
          </>
        ) : (
          visual.complements.map((complement, index) => (
            <div className={styles.complementGroup} key={`${visual.predicate}-${index}`}>
              <span className={styles.relationArrow} aria-hidden="true">→</span>
              <EntityPicture entity={complement} />
            </div>
          ))
        )}
      </div>
    );
  }

  if (visual.kind === "what") {
    return (
      <div className={styles.whatScene}>
        <span
          className={styles.silhouettePicture}
          role="img"
          aria-label={visual.target === "animal" ? "動物のシルエット" : "食べ物のシルエット"}
        >
          {visual.target === "animal" ? "🐈" : "🍎"}
        </span>
        <strong>?</strong>
      </div>
    );
  }

  if (visual.kind === "whose") {
    return (
      <div className={styles.whoseScene}>
        <div className={styles.peopleRow}><span>🧒</span><span>👧</span><span>🧑</span></div>
        <NounPicture noun={visual.noun} className={styles.whoseObject} />
        <div className={styles.arrowRow}><span>↖</span><span>↑</span><span>↗</span></div>
        <strong>?</strong>
      </div>
    );
  }

  return (
    <div className={styles.whichScene}>
      <NounPicture noun={visual.noun} />
      <NounPicture noun={visual.noun} />
      <NounPicture noun={visual.noun} />
      <Image
        className={styles.choosingPointer}
        src="/lesson-assets/pointer-opaque.png"
        alt="どれにするか迷っている手"
        width={105}
        height={105}
        unoptimized
      />
      <strong>?</strong>
    </div>
  );
};

export default function MainLesson() {
  const router = useRouter();
  const { user, openAuthModal, signOut } = useAppAuth();
  const [activeLessonId, setActiveLessonId] = useState(LESSON_ORDER[0]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>("idle");
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [firstTryCorrect, setFirstTryCorrect] = useState(0);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [hasCompletedCurrentSession, setHasCompletedCurrentSession] = useState(false);
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false);
  const [pendingMode, setPendingMode] = useState<"scenario" | "sandbox" | null>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const questionRef = useRef<LessonQuestion | null>(null);
  const feedbackRef = useRef<Feedback>("idle");
  const wrongAttemptsRef = useRef(0);
  const lastEvaluationRef = useRef("");

  const activeLesson = useMemo(() => getLessonDefinition(activeLessonId), [activeLessonId]);
  const question = activeLesson.questions[questionIndex];
  questionRef.current = question ?? null;
  feedbackRef.current = feedback;
  wrongAttemptsRef.current = wrongAttempts;
  const lessonNumber = LESSON_ORDER.indexOf(activeLessonId) + 1;
  const lessonBlocks = useMemo(() => question?.blocks ?? [], [question]);

  useEffect(() => {
    if ("speechSynthesis" in window) window.speechSynthesis.getVoices();
    try {
      const stored = window.localStorage.getItem(COMPLETED_LESSONS_STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      if (Array.isArray(parsed)) {
        setCompletedLessonIds(parsed.filter((id): id is string => typeof id === "string"));
      }
    } catch {
      setCompletedLessonIds([]);
    }
  }, []);

  const evaluateCanvas = useCallback(() => {
    const renderer = rendererRef.current;
    const activeQuestion = questionRef.current;
    if (!renderer || !activeQuestion || feedbackRef.current === "correct") return;

    const rootBlocks = renderer.blocks as Block[];
    const incompleteSome = rootBlocks.some((block) =>
      getSourceBlockId(block) === "det_some" && !isCompleteBlock(block)
    );
    if (incompleteSome && activeQuestion.expected.some((answer) => !answer.startsWith("some "))) return;

    const completeAnswers = rootBlocks
      .filter(isCompleteBlock)
      .map((block) => ({ block, phrase: blockText(block) }))
      .filter((answer) => answer.phrase);
    if (completeAnswers.length === 0) return;

    const expected = activeQuestion.expected.map(normalizePhrase);
    const evaluableAnswers = completeAnswers.filter((answer) =>
      isEvaluableRoot(answer.block, answer.phrase, expected)
    );
    if (evaluableAnswers.length === 0) return;

    const signature = JSON.stringify(evaluableAnswers.map((answer) => answer.phrase));
    if (signature === lastEvaluationRef.current) return;
    lastEvaluationRef.current = signature;
    const correctAnswer = evaluableAnswers.find((answer) => expected.includes(answer.phrase));

    if (correctAnswer) {
      setFeedback("correct");
      setShowNext(true);
      if (wrongAttemptsRef.current === 0) setFirstTryCorrect((count) => count + 1);
      renderer.celebrateBlock(`frame-${correctAnswer.block.id}`);
      speakPhrase(correctAnswer.phrase);
      return;
    }

    const nextWrongAttempts = wrongAttemptsRef.current + 1;
    setWrongAttempts(nextWrongAttempts);
    setFeedback(nextWrongAttempts >= WRONG_PHRASE_WARNING_THRESHOLD ? "wrong" : "idle");
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
    renderer.setTranslationVisibility(showTranslation);
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
    };
  }, [evaluateCanvas, lessonBlocks, question, showTranslation]);

  const resetQuestionState = () => {
    setFeedback("idle");
    setWrongAttempts(0);
    setShowNext(false);
    lastEvaluationRef.current = "";
  };

  const startLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setQuestionIndex(0);
    setFirstTryCorrect(0);
    setHasCompletedCurrentSession(false);
    setIsCompleteModalOpen(false);
    setIsCurriculumOpen(false);
    resetQuestionState();
  };

  const handleTranslationChange = () => {
    const next = !showTranslation;
    setShowTranslation(next);
    rendererRef.current?.setTranslationVisibility(next);
  };

  const goNext = () => {
    if (questionIndex === QUESTION_COUNT - 1) {
      playLessonCompleteSound();
      const nextCompleted = Array.from(new Set([...completedLessonIds, activeLessonId]));
      setCompletedLessonIds(nextCompleted);
      window.localStorage.setItem(COMPLETED_LESSONS_STORAGE_KEY, JSON.stringify(nextCompleted));
      setHasCompletedCurrentSession(true);
      setIsCompleteModalOpen(true);
      return;
    }
    playNextQuestionSound();
    setQuestionIndex((index) => index + 1);
    resetQuestionState();
  };

  const goToNextLesson = () => {
    const nextId = LESSON_ORDER[LESSON_ORDER.indexOf(activeLessonId) + 1];
    if (nextId) startLesson(nextId);
    else {
      setIsCompleteModalOpen(false);
      setIsCurriculumOpen(true);
    }
  };

  const selectLesson = (lessonId: string) => {
    const index = LESSON_ORDER.indexOf(lessonId);
    const unlocked = index === 0 || completedLessonIds.includes(LESSON_ORDER[index - 1]);
    if (unlocked) startLesson(lessonId);
  };

  const requestModeChange = (nextMode: "scenario" | "sandbox") => {
    const hasLessonProgress =
      !hasCompletedCurrentSession
      && (questionIndex > 0 || feedback !== "idle" || Boolean(rendererRef.current?.blocks.length));
    if (hasLessonProgress) setPendingMode(nextMode);
    else router.push(`/app/${nextMode}`);
  };

  if (!question) return <div className={styles.loading}>レッスンを準備しています…</div>;

  return (
    <main className={styles.page}>
      <TopBar
        user={user}
        onSignOut={() => void signOut()}
        onShowAuthModal={openAuthModal}
        isDirty={false}
        isSaving={false}
        onSave={() => undefined}
        onShowProjects={() => undefined}
        currentProjectId={null}
        showProjectActions={false}
        contextActions={(
          <>
            <span className={styles.lessonLabel}>Lesson {lessonNumber}</span>
            <button type="button" className={styles.curriculumButton} onClick={() => setIsCurriculumOpen(true)}>
              レッスン一覧
            </button>
          </>
        )}
        showModeSwitch
        mode="lesson"
        onModeChange={(nextMode) => {
          if (nextMode !== "lesson") requestModeChange(nextMode);
        }}
      />

      <div ref={svgContainerRef} className={styles.canvas} />

      <aside className={styles.lessonPanel}>
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.eyebrow}>Lesson {lessonNumber}</p>
            <h1>{activeLesson.title}</h1>
          </div>
          <strong>{questionIndex + 1} / {QUESTION_COUNT}</strong>
        </div>
        <div className={styles.progress}>
          <span style={{ width: `${((questionIndex + 1) / QUESTION_COUNT) * 100}%` }} />
        </div>
        <p className={styles.instruction}>{activeLesson.instruction}</p>

        <div className={styles.pictureStage}>
          <LessonPicture visual={question.visual} />
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
              <span>絵と、完成したブロックをもう一度見比べよう。</span>
            </>
          )}
          {feedback === "correct" && <strong className={styles.correct}>できました！</strong>}
        </div>

        {showNext && (
          <button className={styles.nextButton} type="button" onClick={goNext}>
            {questionIndex === QUESTION_COUNT - 1 ? "レッスン完了" : "次へ"} →
          </button>
        )}
      </aside>

      <LessonCompleteModal
        isOpen={isCompleteModalOpen}
        firstTryCorrect={firstTryCorrect}
        onClose={() => setIsCompleteModalOpen(false)}
        onOpenCurriculum={() => {
          setIsCompleteModalOpen(false);
          setIsCurriculumOpen(true);
        }}
        onNextLesson={goToNextLesson}
      />
      <LessonCurriculumModal
        isOpen={isCurriculumOpen}
        completedLessonIds={completedLessonIds}
        activeLessonId={activeLessonId}
        onClose={() => setIsCurriculumOpen(false)}
        onSelectLesson={selectLesson}
      />
      <LessonExitModal
        isOpen={pendingMode !== null}
        onCancel={() => setPendingMode(null)}
        onConfirm={() => {
          if (!pendingMode) return;
          const destination = pendingMode;
          setPendingMode(null);
          router.push(`/app/${destination}`);
        }}
      />
    </main>
  );
}
