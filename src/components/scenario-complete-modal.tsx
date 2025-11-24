"use client";

import styles from "./scenario-complete-modal.module.css";

type ScenarioCompleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onRestart?: () => void;
};

const ScenarioCompleteModal = ({ isOpen, onClose, onRestart }: ScenarioCompleteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="scenario-complete-title" onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.content}>
          <div className={styles.badge} aria-hidden="true">🎉</div>
          <h2 id="scenario-complete-title" className={styles.title}>
            シナリオをクリアしました！
          </h2>
          <p className={styles.message}>
            お疲れさまでした。シナリオに沿ったやり取りをやり切りましたね。次の練習やアレンジに進みましょう。
          </p>
          <div className={styles.actions}>
            {onRestart && (
              <button type="button" className={`${styles.button} ${styles.secondaryButton}`} onClick={onRestart}>
                もう一度練習する
              </button>
            )}
            <button type="button" className={`${styles.button} ${styles.primaryButton}`} onClick={onClose}>
              つぎへ進む
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioCompleteModal;
