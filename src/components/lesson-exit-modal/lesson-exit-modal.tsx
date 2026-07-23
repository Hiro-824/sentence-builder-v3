"use client";

import styles from "@/components/scenario-complete-modal.module.css";

interface LessonExitModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function LessonExitModal({
  isOpen,
  onCancel,
  onConfirm,
}: LessonExitModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lesson-exit-title"
      onClick={onCancel}
    >
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.content}>
          <div className={styles.badge} aria-hidden="true">↗</div>
          <h2 id="lesson-exit-title" className={styles.title}>
            レッスンを途中で終了しますか？
          </h2>
          <p className={styles.message}>
            この問題までのセッションは保存されず、次に戻ったときは最初からになります。
          </p>
          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.button} ${styles.secondaryButton}`}
              onClick={onCancel}
            >
              レッスンを続ける
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.primaryButton}`}
              onClick={onConfirm}
            >
              終了して移動する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
