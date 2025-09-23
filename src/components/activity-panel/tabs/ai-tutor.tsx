"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './ai-tutor.module.css';
import { SendIcon } from '../icons/icons';
import { requestAiTutor, ChatMessage } from '@/utils/ai-tutor';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
}

export const AiTutorTabContent = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello! How can I help you with your English practice today?", sender: 'ai' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messageListRef = useRef<HTMLDivElement>(null);

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

        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setIsLoading(true);

        try {
            const chatMessages: ChatMessage[] = updatedMessages.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text
            }));

            const aiText = await requestAiTutor(chatMessages);
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
