"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Block } from "@/models/block";
import { Scenario, ScenarioTurn } from "@/models/scenario";
import styles from "./scenario-activity-panel.module.css";

type ChatMessage = {
  id: number;
  text: string;
  sender: "user" | "ai";
  translation?: string;
};

type ScenarioActivityPanelProps = {
  scenario: Scenario | null;
  onScenarioAdvance?: (nextBlocks: Block[]) => void;
  onCanvasClear?: () => void;
};

const ScenarioActivityPanel = ({ scenario, onScenarioAdvance, onCanvasClear }: ScenarioActivityPanelProps) => {
  const scenarioTurns = useMemo(() => scenario?.turns ?? [], [scenario]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(scenarioTurns.length);
  const [visibleTranslations, setVisibleTranslations] = useState<Record<number, boolean>>({});
  const messageListRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(1);
  const pendingTimeoutRef = useRef<number | null>(null);
  const turnIndexRef = useRef<number>(scenarioTurns.length);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    turnIndexRef.current = currentTurnIndex;
  }, [currentTurnIndex]);

  const findNextIndex = useCallback(
    (speaker: ScenarioTurn["speaker"], startIndex: number) => {
      return scenarioTurns.findIndex((turn, index) => index >= startIndex && turn.speaker === speaker);
    },
    [scenarioTurns],
  );

  useEffect(() => {
    if (pendingTimeoutRef.current) {
      window.clearTimeout(pendingTimeoutRef.current);
      pendingTimeoutRef.current = null;
    }
    const initialTurn = scenarioTurns[0];
    const shouldShowInitialAi = initialTurn?.speaker === "ai" && typeof initialTurn.text === "string";
    const initialMessages: ChatMessage[] = shouldShowInitialAi
      ? [
          {
            id: 1,
            text: initialTurn.text,
            translation: initialTurn.translation,
            sender: "ai",
          },
        ]
      : [];

    setMessages(initialMessages);
    setIsLoading(false);
    setVisibleTranslations({});
    nextIdRef.current = initialMessages.length + 1;

    const firstUserIndex = findNextIndex("user", 0);
    const normalizedIndex = firstUserIndex === -1 ? scenarioTurns.length : firstUserIndex;
    setCurrentTurnIndex(normalizedIndex);
    turnIndexRef.current = normalizedIndex;
  }, [findNextIndex, scenarioTurns]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = useCallback(
    (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const text = typeof customEvent.detail === "string" ? customEvent.detail.trim() : "";
      if (!text || isLoadingRef.current) return;

      const userId = nextIdRef.current++;
      const userTurnIndex = turnIndexRef.current < scenarioTurns.length ? turnIndexRef.current : -1;
      const aiTurnIndex = findNextIndex("ai", userTurnIndex >= 0 ? userTurnIndex + 1 : 0);
      const nextUserTurnIndex = aiTurnIndex !== -1
        ? findNextIndex("user", aiTurnIndex + 1)
        : findNextIndex("user", (userTurnIndex >= 0 ? userTurnIndex + 1 : 0));

      const nextBlocks =
        nextUserTurnIndex !== -1 && scenarioTurns[nextUserTurnIndex]?.speaker === "user"
          ? scenarioTurns[nextUserTurnIndex].blocks ?? []
          : [];

      const normalizedNextIndex = nextUserTurnIndex !== -1 ? nextUserTurnIndex : scenarioTurns.length;
      setCurrentTurnIndex(normalizedNextIndex);
      turnIndexRef.current = normalizedNextIndex;

      setMessages((prev) => [...prev, { id: userId, text, sender: "user" }]);
      onCanvasClear?.();

      const aiText =
        aiTurnIndex !== -1 && scenarioTurns[aiTurnIndex]?.speaker === "ai"
          ? scenarioTurns[aiTurnIndex].text
          : "";
      const aiTranslation =
        aiTurnIndex !== -1 && scenarioTurns[aiTurnIndex]?.speaker === "ai"
          ? scenarioTurns[aiTurnIndex].translation
          : "";

      if (aiText) {
        const aiId = nextIdRef.current++;
        setIsLoading(true);
        isLoadingRef.current = true;
        pendingTimeoutRef.current = window.setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { id: aiId, text: aiText, sender: "ai", translation: aiTranslation },
          ]);
          setIsLoading(false);
          isLoadingRef.current = false;
          pendingTimeoutRef.current = null;
          onScenarioAdvance?.(nextBlocks);
        }, 600);
        return;
      }
      onScenarioAdvance?.(nextBlocks);
    },
    [findNextIndex, onCanvasClear, onScenarioAdvance, scenarioTurns],
  );

  useEffect(() => {
    window.addEventListener("aiTutorSend", handleSend as EventListener);
    return () => {
      window.removeEventListener("aiTutorSend", handleSend as EventListener);
      if (pendingTimeoutRef.current) {
        window.clearTimeout(pendingTimeoutRef.current);
      }
    };
  }, [handleSend]);

  const toggleTranslationVisibility = useCallback((messageId: number) => {
    setVisibleTranslations((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }));
  }, []);

  return (
    <aside className={styles.panel} aria-label="Scenario activity panel">
      <div className={styles.container}>
        <div ref={messageListRef} className={styles.messageList}>
          {messages.map((message) => {
            const translation = (message.translation ?? "").trim();
            const isTranslationVisible =
              Boolean(translation) && Boolean(visibleTranslations[message.id]);

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
          {isLoading && (
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
