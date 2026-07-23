"use client";

import styles from "@/components/scenario-complete-modal.module.css";

interface LessonCompleteModalProps {
  isOpen: boolean;
  firstTryCorrect: number;
  onOpenCurriculum: () => void;
  onNextLesson: () => void;
  onClose: () => void;
}

export default function LessonCompleteModal({
  isOpen,
  firstTryCorrect,
  onOpenCurriculum,
  onNextLesson,
  onClose,
}: LessonCompleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="lesson-complete-title" onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.content}>
          <div className={styles.badge} aria-hidden="true">🎉</div>
          <h2 id="lesson-complete-title" className={styles.title}>
            レッスンをクリアしました！
          </h2>
          <p className={styles.message}>
            10問すべて完成しました。はじめから正解できたのは {firstTryCorrect} / 10 問です。
          </p>
          <div className={styles.actions}>
            <button type="button" className={`${styles.button} ${styles.secondaryButton}`} onClick={onOpenCurriculum}>
              レッスン一覧へ
            </button>
            <button type="button" className={`${styles.button} ${styles.primaryButton}`} onClick={onNextLesson}>
              次のレッスンへ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
