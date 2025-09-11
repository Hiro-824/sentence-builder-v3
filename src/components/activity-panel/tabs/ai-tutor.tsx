"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './ai-tutor.module.css';
import { SendIcon } from '../icons/icons';
import { requestAiTutor } from '@/utils/ai-tutor';

// Define the structure for a chat message
interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
}

/*const MOCK_AI_RESPONSES = [
    "That's a great question! Let's break it down.",
    "Could you please rephrase that? I want to make sure I understand.",
    "Interesting point. Can you give me an example?",
];*/

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

    const sendTextToAi = async (text: string) => {
        if (text.trim() === '' || isLoading) return;

        const userMessage: Message = {
            id: Date.now(),
            text,
            sender: 'user',
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        /*
        setTimeout(() => {
            const randomResponse = MOCK_AI_RESPONSES[Math.floor(Math.random() * MOCK_AI_RESPONSES.length)];
            const aiMessage: Message = {
                id: Date.now() + 1, // Ensure unique ID
                text: randomResponse,
                sender: 'ai',
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsLoading(false);
        }, 1200);
        */

        try {
            const aiText = await requestAiTutor(userMessage.text);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: aiText, sender: 'ai' }]);
        } catch (e) {
            console.log(e);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: 'Sorry, something went wrong.', sender: 'ai' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() === '' || isLoading) return;
        const text = inputValue;
        setInputValue('');
        await sendTextToAi(text);
    };

    // Listen for external send requests (from renderer send button)
    useEffect(() => {
        const handler = (ev: Event) => {
            const custom = ev as CustomEvent<string>;
            const text = typeof custom.detail === 'string' ? custom.detail : '';
            if (text) {
                sendTextToAi(text);
            }
        };
        window.addEventListener('aiTutorSend', handler as EventListener);
        return () => window.removeEventListener('aiTutorSend', handler as EventListener);
    }, [isLoading]);

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