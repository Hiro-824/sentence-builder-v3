"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import styles from './ai-tutor.module.css';
import { SendIcon } from '../icons/icons';
import { requestAiTutor, ChatMessage } from '@/utils/ai-tutor';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
}

interface Conversation {
    id: string;
    title: string;
    messages: Message[];
    createdAt: number;
    updatedAt: number;
}

interface AiTutorTabContentProps {
    projectId?: string | null;
}

const LOCAL_STORAGE_KEY = 'aiTutorConversations';
const CURRENT_CONVERSATION_KEY = 'aiTutorCurrentConversationId';
const INITIAL_GREETING = 'Hello! How can I help you with your English practice today?';

const generateConversationId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const generateMessageId = () => Date.now() + Math.floor(Math.random() * 1000);

const truncateText = (value: string, limit: number) =>
    value.length > limit ? `${value.slice(0, limit - 1)}…` : value;

const deriveTitleFromMessages = (messages: Message[], fallback: string) => {
    const firstUserMessage = messages.find((msg) => msg.sender === 'user' && msg.text.trim());
    if (!firstUserMessage) {
        return fallback;
    }
    return truncateText(firstUserMessage.text.trim(), 40);
};

const createInitialMessage = (): Message => ({
    id: generateMessageId(),
    text: INITIAL_GREETING,
    sender: 'ai',
});

const createConversation = (labelIndex: number): Conversation => ({
    id: generateConversationId(),
    title: `Conversation ${labelIndex}`,
    messages: [createInitialMessage()],
    createdAt: Date.now(),
    updatedAt: Date.now(),
});

const sanitizeConversation = (value: unknown, index: number): Conversation | null => {
    if (!value || typeof value !== 'object') {
        return null;
    }

    const conversation = value as Partial<Conversation> & { messages?: unknown[] };
    const id = typeof conversation.id === 'string' && conversation.id ? conversation.id : generateConversationId();
    const createdAt = typeof conversation.createdAt === 'number' ? conversation.createdAt : Date.now();
    const updatedAt = typeof conversation.updatedAt === 'number' ? conversation.updatedAt : createdAt;

    const sanitizedMessages = Array.isArray(conversation.messages)
        ? conversation.messages
              .map((msg) => {
                  if (!msg || typeof msg !== 'object') {
                      return null;
                  }
                  const message = msg as Partial<Message>;
                  if ((message.sender !== 'user' && message.sender !== 'ai') || typeof message.text !== 'string') {
                      return null;
                  }
                  const idValue = typeof message.id === 'number' ? message.id : generateMessageId();
                  const parsedMessage: Message = {
                      id: idValue,
                      text: message.text,
                      sender: message.sender,
                  };
                  return parsedMessage;
              })
              .filter((msg): msg is Message => Boolean(msg))
        : [];

    const fallbackTitle = typeof conversation.title === 'string' && conversation.title.trim()
        ? conversation.title
        : `Conversation ${index}`;

    return {
        id,
        title: fallbackTitle,
        messages: sanitizedMessages.length > 0 ? sanitizedMessages : [createInitialMessage()],
        createdAt,
        updatedAt,
    } as Conversation;
};

const formatTimestamp = (value: number) => {
    try {
        return new Intl.DateTimeFormat(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(value));
    } catch (error) {
        console.warn('Unable to format timestamp', error);
        return '';
    }
};

const getConversationPreview = (messages: Message[]) => {
    if (messages.length === 0) {
        return '';
    }
    const lastMessage = messages[messages.length - 1];
    const prefix = lastMessage.sender === 'user' ? 'You: ' : '';
    return truncateText(`${prefix}${lastMessage.text}`, 80);
};

export const AiTutorTabContent = ({ projectId }: AiTutorTabContentProps) => {
    const normalizedProjectId = typeof projectId === 'string' ? projectId.trim() : '';
    const projectKey = normalizedProjectId || 'default';
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [pendingConversationId, setPendingConversationId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasHydrated, setHasHydrated] = useState(false);
    const [hydratedProjectKey, setHydratedProjectKey] = useState<string | null>(null);
    const messageListRef = useRef<HTMLDivElement>(null);

    const storageKeys = useMemo(
        () => ({
            conversations: `${LOCAL_STORAGE_KEY}:${projectKey}`,
            currentConversation: `${CURRENT_CONVERSATION_KEY}:${projectKey}`,
        }),
        [projectKey],
    );

    const currentConversation = useMemo(
        () => conversations.find((conv) => conv.id === currentConversationId) ?? null,
        [conversations, currentConversationId],
    );
    const messages = useMemo(() => currentConversation?.messages ?? [], [currentConversation]);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        setHasHydrated(false);
        setHydratedProjectKey(null);

        const stored = window.localStorage.getItem(storageKeys.conversations);
        let parsed: unknown = null;

        if (stored) {
            try {
                parsed = JSON.parse(stored);
            } catch (error) {
                console.warn('Failed to parse AI tutor conversations from storage', error);
            }
        }

        const sanitized = Array.isArray(parsed)
            ? parsed
                  .map((item, index) => sanitizeConversation(item, index + 1))
                  .filter((conv): conv is Conversation => Boolean(conv))
            : [];

        const nextConversations = sanitized.length > 0 ? sanitized : [createConversation(1)];
        setConversations(nextConversations);

        const storedCurrent = window.localStorage.getItem(storageKeys.currentConversation);
        const fallbackId = nextConversations[0]?.id ?? null;
        const nextCurrent = storedCurrent && nextConversations.some((conv) => conv.id === storedCurrent)
            ? storedCurrent
            : fallbackId;
        setCurrentConversationId(nextCurrent);
        setPendingConversationId(null);
        setHasHydrated(true);
        setHydratedProjectKey(projectKey);
    }, [projectKey, storageKeys]);

    useEffect(() => {
        if (
            !hasHydrated ||
            hydratedProjectKey !== projectKey ||
            typeof window === 'undefined'
        ) {
            return;
        }
        window.localStorage.setItem(storageKeys.conversations, JSON.stringify(conversations));
    }, [conversations, hasHydrated, hydratedProjectKey, projectKey, storageKeys]);

    useEffect(() => {
        if (
            !hasHydrated ||
            hydratedProjectKey !== projectKey ||
            typeof window === 'undefined'
        ) {
            return;
        }
        if (currentConversationId) {
            window.localStorage.setItem(storageKeys.currentConversation, currentConversationId);
        } else {
            window.localStorage.removeItem(storageKeys.currentConversation);
        }
    }, [currentConversationId, hasHydrated, hydratedProjectKey, projectKey, storageKeys]);

    const isCurrentConversationPending = pendingConversationId === currentConversationId;

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages, isCurrentConversationPending, currentConversationId]);

    const sortedConversations = useMemo(
        () => [...conversations].sort((a, b) => b.updatedAt - a.updatedAt),
        [conversations],
    );

    const sendTextToAi = useCallback(
        async (text: string) => {
            const trimmed = text.trim();
            if (!trimmed || !currentConversationId || pendingConversationId === currentConversationId) {
                return;
            }

            const conversation = conversations.find((conv) => conv.id === currentConversationId);
            if (!conversation) {
                return;
            }

            const conversationId = conversation.id;
            const userMessage: Message = {
                id: generateMessageId(),
                text: trimmed,
                sender: 'user',
            };

            const optimisticMessages = [...conversation.messages, userMessage];

            setConversations((prev) =>
                prev.map((conv) => {
                    if (conv.id !== conversationId) {
                        return conv;
                    }
                    const updatedMessages = [...conv.messages, userMessage];
                    return {
                        ...conv,
                        messages: updatedMessages,
                        updatedAt: Date.now(),
                        title: deriveTitleFromMessages(updatedMessages, conv.title),
                    } as Conversation;
                }),
            );
            setPendingConversationId(conversationId);

            try {
                const chatMessages: ChatMessage[] = optimisticMessages.map((msg) => ({
                    role: msg.sender === 'user' ? 'user' : 'assistant',
                    content: msg.text,
                }));

                const aiText = await requestAiTutor(chatMessages);
                const aiMessage: Message = {
                    id: generateMessageId(),
                    text: aiText,
                    sender: 'ai',
                };

                setConversations((prev) =>
                    prev.map((conv) => {
                        if (conv.id !== conversationId) {
                            return conv;
                        }
                        return {
                            ...conv,
                            messages: [...conv.messages, aiMessage],
                            updatedAt: Date.now(),
                        } as Conversation;
                    }),
                );
            } catch (error) {
                console.log(error);
                const errorMessage: Message = {
                    id: generateMessageId(),
                    text: 'Sorry, something went wrong.',
                    sender: 'ai',
                };
                setConversations((prev) =>
                    prev.map((conv) => {
                        if (conv.id !== conversationId) {
                            return conv;
                        }
                        return {
                            ...conv,
                            messages: [...conv.messages, errorMessage],
                            updatedAt: Date.now(),
                        } as Conversation;
                    }),
                );
            } finally {
                setPendingConversationId((prev) => (prev === conversationId ? null : prev));
            }
        },
        [conversations, currentConversationId, pendingConversationId],
    );

    const handleSendMessage = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault();
            if (!inputValue.trim() || isCurrentConversationPending) {
                return;
            }
            const text = inputValue;
            setInputValue('');
            void sendTextToAi(text);
        },
        [inputValue, isCurrentConversationPending, sendTextToAi],
    );

    useEffect(() => {
        const handler = (ev: Event) => {
            const custom = ev as CustomEvent<string>;
            const text = typeof custom.detail === 'string' ? custom.detail : '';
            if (text) {
                void sendTextToAi(text);
            }
        };
        window.addEventListener('aiTutorSend', handler as EventListener);
        return () => window.removeEventListener('aiTutorSend', handler as EventListener);
    }, [sendTextToAi]);

    useEffect(() => {
        setInputValue('');
    }, [currentConversationId]);

    useEffect(() => {
        if (!isModalOpen) {
            return;
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsModalOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen]);

    const handleSelectConversation = (conversationId: string) => {
        setCurrentConversationId(conversationId);
        setIsModalOpen(false);
    };

    const handleStartNewConversation = () => {
        const newConversation = createConversation(conversations.length + 1);
        setConversations((prev) => [...prev, newConversation]);
        setCurrentConversationId(newConversation.id);
        setIsModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <span className={styles.headerLabel}>AI講師</span>
                    <span className={styles.headerTitle}>{currentConversation?.title ?? 'Conversation'}</span>
                </div>
                <button
                    type="button"
                    className={styles.historyButton}
                    onClick={() => setIsModalOpen(true)}
                >
                    会話履歴
                </button>
            </div>

            <div ref={messageListRef} className={styles.messageList}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`${styles.messageBubble} ${msg.sender === 'user' ? styles.userMessage : styles.aiMessage}`}
                    >
                        {msg.text}
                    </div>
                ))}
                {isCurrentConversationPending && (
                    <div className={`${styles.messageBubble} ${styles.aiMessage} ${styles.typingIndicator}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                )}
            </div>

            <form className={styles.inputArea} onSubmit={handleSendMessage}>
                <textarea
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    className={styles.textInput}
                    placeholder="AI講師にメッセージを送信..."
                    rows={1}
                    disabled={isCurrentConversationPending}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' && !event.shiftKey) {
                            event.preventDefault();
                            handleSendMessage(event);
                        }
                    }}
                />
                <button
                    type="submit"
                    className={styles.sendButton}
                    disabled={isCurrentConversationPending || inputValue.trim() === ''}
                >
                    <SendIcon />
                </button>
            </form>

            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
                    <div
                        className={styles.modal}
                        onClick={(event) => event.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="ai-tutor-conversations-title"
                    >
                        <div className={styles.modalHeader}>
                            <h3 id="ai-tutor-conversations-title" className={styles.modalTitle}>
                                会話を選択
                            </h3>
                            <button
                                type="button"
                                className={styles.modalCloseButton}
                                onClick={() => setIsModalOpen(false)}
                                aria-label="Close conversations"
                            >
                                ×
                            </button>
                        </div>
                        <div className={styles.conversationList}>
                            {sortedConversations.map((conversation) => {
                                const isActive = conversation.id === currentConversationId;
                                const preview = getConversationPreview(conversation.messages);
                                return (
                                    <button
                                        key={conversation.id}
                                        type="button"
                                        className={`${styles.conversationItem} ${
                                            isActive ? styles.conversationItemActive : ''
                                        }`}
                                        onClick={() => handleSelectConversation(conversation.id)}
                                    >
                                        <span className={styles.conversationItemTitle}>{conversation.title}</span>
                                        <span className={styles.conversationItemMeta}>
                                            {formatTimestamp(conversation.updatedAt)}
                                        </span>
                                        {preview && (
                                            <span className={styles.conversationItemPreview}>{preview}</span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            type="button"
                            className={styles.newConversationButton}
                            onClick={handleStartNewConversation}
                        >
                            新しい会話を開始
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
