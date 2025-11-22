"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./scenario-activity-panel.module.css";

type ChatMessage = {
  id: number;
  text: string;
  sender: "user" | "ai";
};

const DUMMY_RESPONSE = "Hello! This is a dummy response.";
const INITIAL_AI_MESSAGE = "準備OKです。完成した文を送ってください。";

const ScenarioActivityPanel = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, text: INITIAL_AI_MESSAGE, sender: "ai" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messageListRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(2);
  const pendingTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    const handleSend = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const text = typeof customEvent.detail === "string" ? customEvent.detail.trim() : "";
      if (!text) return;

      if (pendingTimeoutRef.current) {
        window.clearTimeout(pendingTimeoutRef.current);
        pendingTimeoutRef.current = null;
      }

      const userId = nextIdRef.current++;
      const aiId = nextIdRef.current++;

      setMessages((prev) => {
        return [...prev, { id: userId, text, sender: "user" }];
      });

      setIsLoading(true);

      pendingTimeoutRef.current = window.setTimeout(() => {
        setMessages((prev) => [...prev, { id: aiId, text: DUMMY_RESPONSE, sender: "ai" }]);
        setIsLoading(false);
        pendingTimeoutRef.current = null;
      }, 600);
    };

    window.addEventListener("aiTutorSend", handleSend as EventListener);
    return () => {
      window.removeEventListener("aiTutorSend", handleSend as EventListener);
      if (pendingTimeoutRef.current) {
        window.clearTimeout(pendingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <aside className={styles.panel} aria-label="Scenario activity panel">
      <div className={styles.container}>
        <div ref={messageListRef} className={styles.messageList}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.messageBubble} ${
                message.sender === "ai" ? styles.aiMessage : styles.userMessage
              }`}
            >
              <div className={styles.messageText}>{message.text}</div>
            </div>
          ))}
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
