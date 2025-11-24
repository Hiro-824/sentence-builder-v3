"use client";

import styles from "./scenario-complete-modal.module.css";

type ScenarioCompleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onRestart?: () => void;
  onSelectAnother?: () => void;
  onStartNewProject?: () => void;
  isAuthenticated?: boolean;
};

const ScenarioCompleteModal = ({
  isOpen,
  onClose,
  onRestart,
  onSelectAnother,
  onStartNewProject,
  isAuthenticated,
}: ScenarioCompleteModalProps) => {
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
            <button type="button" className={`${styles.button} ${styles.secondaryButton}`} onClick={onClose}>
              {isAuthenticated ? "このままプロジェクトに戻る" : "このまま続ける"}
            </button>
            {onRestart && (
              <button type="button" className={`${styles.button} ${styles.secondaryButton}`} onClick={onRestart}>
                もう一度練習する
              </button>
            )}
            {onSelectAnother && (
              <button type="button" className={`${styles.button} ${styles.primaryButton}`} onClick={onSelectAnother}>
                別のシナリオを選ぶ
              </button>
            )}
            {onStartNewProject && (
              <button type="button" className={`${styles.button} ${styles.primaryButton}`} onClick={onStartNewProject}>
                新しいプロジェクトで始める
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioCompleteModal;
