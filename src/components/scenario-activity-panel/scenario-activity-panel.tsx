"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { Block } from "@/models/block";
import { Scenario, ScenarioChatMessage, ScenarioProgress, ScenarioTurn } from "@/models/scenario";
import styles from "./scenario-activity-panel.module.css";

type ScenarioActivityPanelProps = {
  scenario: Scenario | null;
  progress: ScenarioProgress;
  onProgressChange: (next: ScenarioProgress) => void;
  onScenarioAdvance?: (nextBlocks: Block[]) => void;
  onCanvasClear?: () => void;
};

const ScenarioActivityPanel = ({ scenario, progress, onProgressChange, onScenarioAdvance, onCanvasClear }: ScenarioActivityPanelProps) => {
  const scenarioTurns = useMemo(() => scenario?.turns ?? [], [scenario]);
  const messageListRef = useRef<HTMLDivElement>(null);
  const pendingTimeoutRef = useRef<number | null>(null);
  const progressRef = useRef<ScenarioProgress>(progress);

  const findNextIndex = useCallback(
    (speaker: ScenarioTurn["speaker"], startIndex: number) => {
      return scenarioTurns.findIndex((turn, index) => index >= startIndex && turn.speaker === speaker);
    },
    [scenarioTurns],
  );

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    if (pendingTimeoutRef.current) {
      window.clearTimeout(pendingTimeoutRef.current);
      pendingTimeoutRef.current = null;
    }
  }, [scenarioTurns]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [progress.messages, progress.isLoading]);

  useEffect(() => {
    return () => {
      if (pendingTimeoutRef.current) {
        window.clearTimeout(pendingTimeoutRef.current);
      }
    };
  }, []);

  const handleSend = useCallback(
    (event: Event) => {
      const currentProgress = progressRef.current;
      const customEvent = event as CustomEvent<string>;
      const text = typeof customEvent.detail === "string" ? customEvent.detail.trim() : "";
      if (!text || currentProgress.isLoading) return;

      const userId = currentProgress.nextId;
      const userTurnIndex = currentProgress.currentTurnIndex < scenarioTurns.length ? currentProgress.currentTurnIndex : -1;
      const aiTurnIndex = findNextIndex("ai", userTurnIndex >= 0 ? userTurnIndex + 1 : 0);
      const nextUserTurnIndex = aiTurnIndex !== -1
        ? findNextIndex("user", aiTurnIndex + 1)
        : findNextIndex("user", (userTurnIndex >= 0 ? userTurnIndex + 1 : 0));

      const nextBlocks =
        nextUserTurnIndex !== -1 && scenarioTurns[nextUserTurnIndex]?.speaker === "user"
          ? scenarioTurns[nextUserTurnIndex].blocks ?? []
          : [];

      const normalizedNextIndex = nextUserTurnIndex !== -1 ? nextUserTurnIndex : scenarioTurns.length;

      const updatedMessages: ScenarioChatMessage[] = [
        ...currentProgress.messages,
        { id: userId, text, sender: "user" },
      ];

      const baseProgress: ScenarioProgress = {
        ...currentProgress,
        messages: updatedMessages,
        currentTurnIndex: normalizedNextIndex,
        nextId: currentProgress.nextId + 1,
        isLoading: false,
      };

      const aiText =
        aiTurnIndex !== -1 && scenarioTurns[aiTurnIndex]?.speaker === "ai"
          ? scenarioTurns[aiTurnIndex].text
          : "";
      const aiTranslation =
        aiTurnIndex !== -1 && scenarioTurns[aiTurnIndex]?.speaker === "ai"
          ? scenarioTurns[aiTurnIndex].translation
          : "";

      const nextProgress: ScenarioProgress = {
        ...baseProgress,
        isLoading: Boolean(aiText),
      };

      progressRef.current = nextProgress;
      onProgressChange(nextProgress);
      onCanvasClear?.();

      if (aiText) {
        const aiId = nextProgress.nextId;
        pendingTimeoutRef.current = window.setTimeout(() => {
          const latest = progressRef.current;
          const progressed: ScenarioProgress = {
            ...latest,
            messages: [
              ...latest.messages,
              { id: aiId, text: aiText, sender: "ai", translation: aiTranslation },
            ],
            nextId: aiId + 1,
            isLoading: false,
          };
          progressRef.current = progressed;
          onProgressChange(progressed);
          pendingTimeoutRef.current = null;
          onScenarioAdvance?.(nextBlocks);
        }, 600);
        return;
      }
      onScenarioAdvance?.(nextBlocks);
    },
    [findNextIndex, onCanvasClear, onProgressChange, onScenarioAdvance, scenarioTurns],
  );

  useEffect(() => {
    window.addEventListener("aiTutorSend", handleSend as EventListener);
    return () => {
      window.removeEventListener("aiTutorSend", handleSend as EventListener);
    };
  }, [handleSend]);

  const toggleTranslationVisibility = useCallback((messageId: number) => {
    const latest = progressRef.current;
    const updatedVisibility = {
      ...latest.visibleTranslations,
      [messageId]: !latest.visibleTranslations[messageId],
    };
    const updatedProgress: ScenarioProgress = {
      ...latest,
      visibleTranslations: updatedVisibility,
    };
    progressRef.current = updatedProgress;
    onProgressChange(updatedProgress);
  }, [onProgressChange]);

  return (
    <aside className={styles.panel} aria-label="Scenario activity panel">
      <div className={styles.container}>
        <div ref={messageListRef} className={styles.messageList}>
          {progress.messages.map((message) => {
            const translation = (message.translation ?? "").trim();
            const isTranslationVisible =
              Boolean(translation) && Boolean(progress.visibleTranslations[message.id]);

            return (
              <div
                key={message.id}
                className={`${styles.messageBubble} ${
                  message.sender === "ai" ? styles.aiMessage : styles.userMessage
                }`}
              >
                <div className={styles.messageText}>{message.text}</div>
                {message.sender === "ai" && translation && (
                  <div className={styles.translationToggle}>
                    <button
                      type="button"
                      className={styles.translationButton}
                      onClick={() => toggleTranslationVisibility(message.id)}
                    >
                      {isTranslationVisible ? "日本語訳を隠す" : "日本語訳を見る"}
                    </button>
                    {isTranslationVisible && (
                      <div className={styles.translationText}>{translation}</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {progress.isLoading && (
            <div className={`${styles.messageBubble} ${styles.aiMessage} ${styles.typingIndicator}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default ScenarioActivityPanel;
