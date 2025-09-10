"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './ai-tutor.module.css';

// A simple Send icon component, placed here for locality
const SendIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);

// Define the structure for a chat message
interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
}

const MOCK_AI_RESPONSES = [
    "That's a great question! Let's break it down.",
    "Could you please rephrase that? I want to make sure I understand.",
    "Interesting point. Can you give me an example?",
];

export const AiTutorTabContent = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello! How can I help you with your English practice today?", sender: 'ai' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messageListRef = useRef<HTMLDivElement>(null);

    // Effect to scroll to the bottom when new messages are added
    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() === '' || isLoading) return;

        const userMessage: Message = {
            id: Date.now(),
            text: inputValue,
            sender: 'user',
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        // --- Mock AI Response Logic ---
        // This is where you would make a real API call in the future.
        setTimeout(() => {
            const randomResponse = MOCK_AI_RESPONSES[Math.floor(Math.random() * MOCK_AI_RESPONSES.length)];
            const aiMessage: Message = {
                id: Date.now() + 1, // Ensure unique ID
                text: randomResponse,
                sender: 'ai',
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsLoading(false);
        }, 1200); // Simulate network delay
    };

    return (
        <div className={styles.container}>
            <div ref={messageListRef} className={styles.messageList}>
                {messages.map((msg) => (
                    <div key={msg.id} className={`${styles.messageBubble} ${msg.sender === 'user' ? styles.userMessage : styles.aiMessage}`}>
                        {msg.text}
                    </div>
                ))}
                {isLoading && (
                    <div className={`${styles.messageBubble} ${styles.aiMessage} ${styles.typingIndicator}`}>
                        <span></span><span></span><span></span>
                    </div>
                )}
            </div>

            <form className={styles.inputArea} onSubmit={handleSendMessage}>
                <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className={styles.textInput}
                    placeholder="AI講師にメッセージを送信..."
                    rows={1}
                    disabled={isLoading}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                        }
                    }}
                />
                <button type="submit" className={styles.sendButton} disabled={isLoading || inputValue.trim() === ''}>
                    <SendIcon />
                </button>
            </form>
        </div>
    );
};