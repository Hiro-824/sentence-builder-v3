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
    scenarioId: string | null;
    customScenario: string;
}

interface AiTutorTabContentProps {
    projectId?: string | null;
}

interface ScenarioOption {
    id: string;
    title: string;
    description: string;
}

const NO_SCENARIO_VALUE = 'none';
const CUSTOM_SCENARIO_VALUE = 'custom';

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

const createConversation = (
    labelIndex: number,
    scenario?: { scenarioId: string | null; customScenario?: string },
): Conversation => ({
    id: generateConversationId(),
    title: `Conversation ${labelIndex}`,
    messages: [createInitialMessage()],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    scenarioId: scenario?.scenarioId ?? null,
    customScenario: typeof scenario?.customScenario === 'string' ? scenario.customScenario.trim() : '',
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

    const trimmedCustomScenario = typeof conversation.customScenario === 'string'
        ? conversation.customScenario.trim()
        : '';

    const rawScenarioId = typeof conversation.scenarioId === 'string' && conversation.scenarioId.trim()
        ? conversation.scenarioId.trim()
        : '';

    const normalizedScenarioId = trimmedCustomScenario ? null : rawScenarioId || null;

    return {
        id,
        title: fallbackTitle,
        messages: sanitizedMessages.length > 0 ? sanitizedMessages : [createInitialMessage()],
        createdAt,
        updatedAt,
        scenarioId: normalizedScenarioId,
        customScenario: trimmedCustomScenario,
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
    const [scenarioOptions, setScenarioOptions] = useState<ScenarioOption[]>([]);
    const [allowCustomScenario, setAllowCustomScenario] = useState(true);
    const [isFetchingScenarios, setIsFetchingScenarios] = useState(false);
    const [scenarioFetchError, setScenarioFetchError] = useState<string | null>(null);
    const [selectedScenarioId, setSelectedScenarioId] = useState<string>(NO_SCENARIO_VALUE);
    const [customScenarioInput, setCustomScenarioInput] = useState('');
    const [customScenarioError, setCustomScenarioError] = useState<string | null>(null);
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

    const selectedScenarioOption = useMemo(() => {
        if (selectedScenarioId === CUSTOM_SCENARIO_VALUE || selectedScenarioId === NO_SCENARIO_VALUE) {
            return null;
        }
        return scenarioOptions.find((option) => option.id === selectedScenarioId) ?? null;
    }, [scenarioOptions, selectedScenarioId]);

    const hasUserMessage = useMemo(
        () => currentConversation?.messages.some((msg) => msg.sender === 'user') ?? false,
        [currentConversation],
    );

    const isScenarioLocked = hasUserMessage;

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
        let isCancelled = false;

        const fetchScenarios = async () => {
            setIsFetchingScenarios(true);
            try {
                const response = await fetch('/api/ai-tutor');
                if (!response.ok) {
                    throw new Error(`Failed to fetch scenarios (${response.status})`);
                }
                const data = await response.json();
                if (isCancelled) {
                    return;
                }

                const rawScenarios = Array.isArray(data?.scenarios) ? data.scenarios : [];
                const sanitizedScenarios = rawScenarios
                    .map((item: unknown) => {
                        if (!item || typeof item !== 'object') {
                            return null;
                        }
                        const { id, title, description } = item as Partial<ScenarioOption>;
                        if (typeof id !== 'string' || typeof title !== 'string') {
                            return null;
                        }
                        return {
                            id: id.trim(),
                            title: title.trim(),
                            description: typeof description === 'string' ? description.trim() : '',
                        } satisfies ScenarioOption;
                    })
                    .filter((option): option is ScenarioOption => Boolean(option));

                const uniqueOptions = Array.from(new Map(sanitizedScenarios.map((option) => [option.id, option])).values());
                setScenarioOptions(uniqueOptions);

                if (typeof data?.allowCustomScenario === 'boolean') {
                    setAllowCustomScenario(data.allowCustomScenario);
                }
                setScenarioFetchError(null);
            } catch (error) {
                if (!isCancelled) {
                    console.warn('Failed to load AI tutor scenarios', error);
                    setScenarioFetchError('シナリオ一覧の取得に失敗しました。');
                }
            } finally {
                if (!isCancelled) {
                    setIsFetchingScenarios(false);
                }
            }
        };

        fetchScenarios();

        return () => {
            isCancelled = true;
        };
    }, []);

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

    useEffect(() => {
        if (!hasHydrated || scenarioOptions.length === 0) {
            return;
        }

        setConversations((prev) => {
            let changed = false;
            const validIds = new Set(scenarioOptions.map((option) => option.id));

            const next = prev.map((conv) => {
                if (!conv.scenarioId) {
                    return conv;
                }
                if (!validIds.has(conv.scenarioId)) {
                    changed = true;
                    return {
                        ...conv,
                        scenarioId: null,
                    } as Conversation;
                }
                return conv;
            });

            return changed ? next : prev;
        });
    }, [hasHydrated, scenarioOptions]);

    useEffect(() => {
        if (!currentConversation) {
            setSelectedScenarioId(NO_SCENARIO_VALUE);
            setCustomScenarioInput('');
            setCustomScenarioError(null);
            return;
        }

        const currentCustom = currentConversation.customScenario ?? '';
        const trimmedCustom = currentCustom.trim();
        const hasValidScenarioId = Boolean(
            currentConversation.scenarioId &&
            scenarioOptions.some((option) => option.id === currentConversation.scenarioId)
        );

        if (trimmedCustom && allowCustomScenario) {
            setSelectedScenarioId(CUSTOM_SCENARIO_VALUE);
            setCustomScenarioInput(currentCustom);
            setCustomScenarioError(null);
            return;
        }

        if (hasValidScenarioId) {
            setSelectedScenarioId(currentConversation.scenarioId as string);
            setCustomScenarioInput('');
            setCustomScenarioError(null);
            return;
        }

        if (trimmedCustom && !allowCustomScenario && currentConversationId) {
            setConversations((prev) => {
                let changed = false;
                const next = prev.map((conv) => {
                    if (conv.id !== currentConversationId) {
                        return conv;
                    }
                    if (!conv.customScenario.trim()) {
                        return conv;
                    }
                    changed = true;
                    return {
                        ...conv,
                        customScenario: '',
                    } as Conversation;
                });
                return changed ? next : prev;
            });
        }

        setSelectedScenarioId(NO_SCENARIO_VALUE);
        setCustomScenarioInput('');
        setCustomScenarioError(null);
    }, [allowCustomScenario, currentConversation, currentConversationId, scenarioOptions]);

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

            const trimmedCustomScenario = conversation.customScenario.trim();
            if (selectedScenarioId === CUSTOM_SCENARIO_VALUE && !trimmedCustomScenario) {
                setCustomScenarioError('カスタムシナリオを入力してください。');
                return;
            }
            setCustomScenarioError(null);

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

                const scenarioId = trimmedCustomScenario ? undefined : conversation.scenarioId ?? undefined;
                const aiText = await requestAiTutor(chatMessages, {
                    scenarioId,
                    customScenario: trimmedCustomScenario || undefined,
                });
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
        [conversations, currentConversationId, pendingConversationId, selectedScenarioId],
    );

    const handleSendMessage = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault();
            const trimmedInput = inputValue.trim();
            if (!trimmedInput || isCurrentConversationPending) {
                return;
            }
            if (!isScenarioLocked && selectedScenarioId === CUSTOM_SCENARIO_VALUE && !customScenarioInput.trim()) {
                setCustomScenarioError('カスタムシナリオを入力してください。');
                return;
            }
            setCustomScenarioError(null);
            setInputValue('');
            void sendTextToAi(trimmedInput);
        },
        [customScenarioInput, inputValue, isCurrentConversationPending, isScenarioLocked, selectedScenarioId, sendTextToAi],
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
        const scenarioPreset = selectedScenarioId === CUSTOM_SCENARIO_VALUE
            ? { scenarioId: null, customScenario: customScenarioInput.trim() }
            : selectedScenarioId === NO_SCENARIO_VALUE
                ? { scenarioId: null, customScenario: '' }
                : { scenarioId: selectedScenarioId, customScenario: '' };

        const newConversation = createConversation(conversations.length + 1, scenarioPreset);
        setConversations((prev) => [...prev, newConversation]);
        setCurrentConversationId(newConversation.id);
        setIsModalOpen(false);
    };

    const handleScenarioSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (isScenarioLocked) {
            return;
        }

        const value = event.target.value;
        setSelectedScenarioId(value);
        setCustomScenarioError(null);

        if (!currentConversationId) {
            return;
        }

        if (value === CUSTOM_SCENARIO_VALUE) {
            const existingCustom = conversations.find((conv) => conv.id === currentConversationId)?.customScenario ?? '';
            setCustomScenarioInput(existingCustom);
            setConversations((prev) =>
                prev.map((conv) => {
                    if (conv.id !== currentConversationId) {
                        return conv;
                    }
                    return {
                        ...conv,
                        scenarioId: null,
                    } as Conversation;
                }),
            );
            return;
        }

        const nextScenarioId = value === NO_SCENARIO_VALUE ? null : value;
        setCustomScenarioInput('');
        setConversations((prev) =>
            prev.map((conv) => {
                if (conv.id !== currentConversationId) {
                    return conv;
                }
                return {
                    ...conv,
                    scenarioId: nextScenarioId,
                    customScenario: '',
                } as Conversation;
            }),
        );
    };

    const handleCustomScenarioInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (isScenarioLocked) {
            return;
        }

        const value = event.target.value;
        setCustomScenarioInput(value);
        setCustomScenarioError(null);

        if (!currentConversationId) {
            return;
        }

        setConversations((prev) =>
            prev.map((conv) => {
                if (conv.id !== currentConversationId) {
                    return conv;
                }
                return {
                    ...conv,
                    customScenario: value,
                } as Conversation;
            }),
        );
    };

    const isCustomScenarioSelected = selectedScenarioId === CUSTOM_SCENARIO_VALUE;
    const isCustomScenarioValid = isScenarioLocked || !isCustomScenarioSelected || customScenarioInput.trim().length > 0;
    const isSendDisabled = isCurrentConversationPending || inputValue.trim() === '' || !isCustomScenarioValid;

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

            <div className={styles.scenarioBar}>
                <label className={styles.scenarioLabel} htmlFor="ai-tutor-scenario-select">
                    シナリオを選択
                </label>
                <div className={styles.scenarioRow}>
                    <select
                        id="ai-tutor-scenario-select"
                        className={styles.scenarioSelect}
                        value={selectedScenarioId}
                        onChange={handleScenarioSelect}
                        disabled={isFetchingScenarios || isCurrentConversationPending || isScenarioLocked}
                    >
                        <option value={NO_SCENARIO_VALUE}>シナリオなし（自由に練習）</option>
                        {scenarioOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.title}
                            </option>
                        ))}
                        {allowCustomScenario && (
                            <option value={CUSTOM_SCENARIO_VALUE}>カスタムシナリオを入力</option>
                        )}
                    </select>
                    {isFetchingScenarios && <span className={styles.scenarioStatus}>読込中…</span>}
                </div>
                {scenarioFetchError && (
                    <p className={styles.scenarioError}>{scenarioFetchError}</p>
                )}
                {!isCustomScenarioSelected && selectedScenarioId === NO_SCENARIO_VALUE && (
                    <p className={styles.scenarioDescription}>
                        シナリオを選ばない場合は、通常のやさしいフリートークになります。
                    </p>
                )}
                {!isCustomScenarioSelected && selectedScenarioOption?.description && (
                    <p className={styles.scenarioDescription}>{selectedScenarioOption.description}</p>
                )}
                {allowCustomScenario && isCustomScenarioSelected && (
                    <div className={styles.customScenarioGroup}>
                        <textarea
                            value={customScenarioInput}
                            onChange={handleCustomScenarioInputChange}
                            className={styles.customScenarioInput}
                            placeholder="例：駅で道を聞く / オンラインで自己紹介する"
                            rows={2}
                            disabled={isCurrentConversationPending || isScenarioLocked}
                        />
                        <p className={styles.scenarioHint}>AI講師がこの状況に合わせて会話します。</p>
                        {customScenarioError && <p className={styles.scenarioError}>{customScenarioError}</p>}
                    </div>
                )}
                {isScenarioLocked && (
                    <p className={styles.scenarioLockNotice}>
                        会話が始まったため、この会話のシナリオは変更できません。新しい会話を開始して選び直してください。
                    </p>
                )}
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
                    disabled={isSendDisabled}
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
