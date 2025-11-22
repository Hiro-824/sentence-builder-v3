"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./scenario-activity-panel.module.css";

type ChatMessage = {
  id: number;
  text: string;
  sender: "user" | "ai";
};

const DUMMY_RESPONSE = "Hello! This is a dummy response.";

const ScenarioActivityPanel = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messageListRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(1);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleSend = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const text = typeof customEvent.detail === "string" ? customEvent.detail.trim() : "";
      if (!text) return;

      setMessages((prev) => {
        const userId = nextIdRef.current++;
        const aiId = nextIdRef.current++;
        return [
          ...prev,
          { id: userId, text, sender: "user" },
          { id: aiId, text: DUMMY_RESPONSE, sender: "ai" },
        ];
      });
    };

    window.addEventListener("aiTutorSend", handleSend as EventListener);
    return () => window.removeEventListener("aiTutorSend", handleSend as EventListener);
  }, []);

  return (
    <aside className={styles.panel} aria-label="Scenario activity panel">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLabel}>Scenario Chat</div>
          <div className={styles.headerHint}>Send a completed sentence to see it here.</div>
        </div>
        <div ref={messageListRef} className={styles.messageList}>
          {messages.length === 0 ? (
            <div className={styles.placeholder}>Completed sentences will appear here.</div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.messageBubble} ${
                  message.sender === "ai" ? styles.aiMessage : styles.userMessage
                }`}
              >
                <div className={styles.messageText}>{message.text}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </aside>
  );
};

export default ScenarioActivityPanel;
