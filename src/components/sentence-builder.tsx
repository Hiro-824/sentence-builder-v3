/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Renderer } from "@/renderer/renderer";
import { blockList } from "@/data/blocks";
import { testScenario } from "@/data/scenarios";
import TopBar from "./top-bar";
import AuthModal from "./auth-modal";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { getProjectData, saveProjectData } from '@/utils/supabase/projects';
import ProjectListModal from "./project-list-modal";
import { useRouter, useSearchParams } from 'next/navigation';
import Loader from "./loader";
import { LoggingService } from "@/utils/supabase/logging";
import ActivityPanel from "./activity-panel/activity-panel";
import ScenarioActivityPanel from "./scenario-activity-panel/scenario-activity-panel";
import RotateOverlay from "./rotate-overlay";
import ScenarioCompleteModal from "./scenario-complete-modal";
import { Lesson } from "@/utils/lessons";
import { Scenario, ScenarioProgress } from "@/models/scenario";
import { Block } from "@/models/block";
import { ProjectData } from "@/models/project";

const MOBILE_MAX_WIDTH = 1024;
const DEFAULT_SCENARIO = testScenario;

const getScenarioBlocksForTurn = (scenario: Scenario | null, turnIndex: number): Block[] => {
    if (!scenario || turnIndex < 0) return [];
    const turn = scenario.turns[turnIndex];
    return turn && turn.speaker === "user" ? turn.blocks ?? [] : [];
};

const createInitialScenarioProgress = (scenario: Scenario | null): ScenarioProgress => {
    const turns = scenario?.turns ?? [];
    const initialTurn = turns[0];
    const shouldShowInitialAi = initialTurn?.speaker === "ai" && typeof initialTurn.text === "string";
    const initialMessages = shouldShowInitialAi
        ? [{
            id: 1,
            text: initialTurn.text,
            translation: initialTurn.translation,
            sender: "ai" as const,
        }]
        : [];

    const firstUserIndex = turns.findIndex((turn) => turn.speaker === "user");
    const normalizedIndex = firstUserIndex === -1 ? turns.length : firstUserIndex;

    return {
        messages: initialMessages,
        currentTurnIndex: normalizedIndex,
        nextId: initialMessages.length + 1,
        visibleTranslations: {},
        isLoading: false,
    };
};

const normalizeScenarioProgress = (scenario: Scenario | null, progress?: ScenarioProgress | null): ScenarioProgress => {
    const base = createInitialScenarioProgress(scenario);
    if (!progress) return base;

    const turnsLength = scenario?.turns.length ?? 0;
    const clampedIndex = Math.min(Math.max(progress.currentTurnIndex ?? base.currentTurnIndex, 0), turnsLength);

    const sanitizedMessages: ScenarioProgress["messages"] | undefined = Array.isArray(progress.messages)
        ? progress.messages
            .filter((message) => typeof message?.text === "string" && !!message.text.trim())
            .map((message) => ({
                id: typeof message.id === "number" ? message.id : base.nextId,
                text: message.text,
                sender: message.sender === "ai" ? "ai" : "user",
                translation: message.translation,
            }))
        : undefined;

    const messagesToUse = sanitizedMessages ?? base.messages;

    const maxExistingId = messagesToUse.reduce((max, message) => Math.max(max, message.id), 0);
    const candidateNextId = typeof progress.nextId === "number" && progress.nextId > 0 ? progress.nextId : base.nextId;
    const safeNextId = Math.max(candidateNextId, maxExistingId + 1);

    const visibility = progress.visibleTranslations && typeof progress.visibleTranslations === "object"
        ? progress.visibleTranslations
        : base.visibleTranslations;

    return {
        messages: messagesToUse,
        currentTurnIndex: clampedIndex,
        nextId: safeNextId,
        visibleTranslations: visibility,
        isLoading: Boolean(progress.isLoading) && Boolean(messagesToUse.length),
    };
};

const DEFAULT_SCENARIO_PROGRESS = createInitialScenarioProgress(DEFAULT_SCENARIO);
const DEFAULT_SCENARIO_BLOCKS = getScenarioBlocksForTurn(DEFAULT_SCENARIO, DEFAULT_SCENARIO_PROGRESS.currentTurnIndex);

const buildAiTutorConversationFromScenario = (progress: ScenarioProgress | null | undefined) => {
    const messages = Array.isArray(progress?.messages)
        ? progress.messages.map((message) => ({
            id: typeof message.id === "number" ? message.id : Date.now(),
            text: message.text,
            sender: message.sender === "ai" ? "ai" : "user",
            translation: message.translation,
        }))
        : [];

    const now = Date.now();
    const hasMessages = messages.length > 0;

    return {
        conversation: {
            id: "scenario-progress",
            title: "Scenario Progress",
            messages: hasMessages ? messages : [{
                id: now,
                text: "Let's start from your scenario progress.",
                sender: "ai" as const,
            }],
            createdAt: now,
            updatedAt: now,
            scenarioId: null,
            customScenario: "",
        },
        currentConversationId: "scenario-progress",
    };
};

interface SentenceBuilderProps {
    lessons: Lesson[];
    basePath?: string;
}

const SentenceBuilder = ({ lessons, basePath }: SentenceBuilderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const [currentProjectId, setCurrentProjectId] = useState<string | null>("top-bar-button-test");
    const [isDirty, setIsDirty] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isProjectListOpen, setIsProjectListOpen] = useState(false);
    const [isProjectLoading, setIsProjectLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const routeBase = basePath ?? "/app";
    const enableModeSwitch = routeBase === "/app";
    const shouldEnableSidebarDropDelete = enableModeSwitch;

    const [mode, setMode] = useState<"scenario" | "sandbox">(enableModeSwitch ? "scenario" : "sandbox");
    const [isMobileViewport, setIsMobileViewport] = useState(false);
    const [isPortrait, setIsPortrait] = useState(false);
    const [scenario, setScenario] = useState<Scenario | null>(DEFAULT_SCENARIO);
    const [scenarioProgress, setScenarioProgress] = useState<ScenarioProgress>(DEFAULT_SCENARIO_PROGRESS);
    const [scenarioBlocks, setScenarioBlocks] = useState<Block[]>(DEFAULT_SCENARIO_BLOCKS);
    const [showScenarioCompleteModal, setShowScenarioCompleteModal] = useState(false);
    const [hasShownScenarioComplete, setHasShownScenarioComplete] = useState(false);
    const [aiTutorSyncVersion, setAiTutorSyncVersion] = useState(0);

    const getEffectiveMode = () => enableModeSwitch
        ? (isMobileViewport ? "scenario" : mode)
        : "sandbox";

    const svgContainerRef = useRef(null);
    const rendererRef = useRef<Renderer | null>(null);
    const loggingServiceRef = useRef<LoggingService | null>(null);
    const aiTutorStorageSnapshotRef = useRef<string | null>(null);
    const scenarioCompleteTimeoutRef = useRef<number | null>(null);
    const supabase = createClient();

    const getAiTutorStorageKeys = useCallback((projectId?: string | null) => {
        const projectKey = (projectId ?? "").trim() || "default";
        return {
            conversations: `aiTutorConversations:${projectKey}`,
            currentConversation: `aiTutorCurrentConversationId:${projectKey}`,
        };
    }, []);

    const syncAiTutorFromScenario = useCallback((projectId: string | null, progress: ScenarioProgress | null | undefined) => {
        if (typeof window === "undefined") return;
        const keys = getAiTutorStorageKeys(projectId);
        const { conversation, currentConversationId } = buildAiTutorConversationFromScenario(progress);
        const serializedSnapshot = JSON.stringify({ projectId, conversation });
        if (aiTutorStorageSnapshotRef.current === serializedSnapshot) return;
        aiTutorStorageSnapshotRef.current = serializedSnapshot;
        window.localStorage.setItem(keys.conversations, JSON.stringify([conversation]));
        window.localStorage.setItem(keys.currentConversation, currentConversationId);
        setAiTutorSyncVersion((prev) => prev + 1);
    }, [getAiTutorStorageKeys]);

    const handleScenarioCanvasClear = useCallback(() => {
        if (rendererRef.current) {
            rendererRef.current.blocks = [];
            rendererRef.current.renderBlocks();
        }
        setIsDirty(true);
    }, []);

    const handleScenarioAdvance = useCallback((nextBlocks: Block[]) => {
        if (rendererRef.current) {
            rendererRef.current.setScenarioBlockList(nextBlocks);
        }
        setScenarioBlocks(nextBlocks);
        setIsDirty(true);
    }, []);

    const handleScenarioProgressChange = useCallback((nextProgress: ScenarioProgress) => {
        setScenarioProgress(nextProgress);
        setIsDirty(true);
    }, []);

    const handleScenarioCompleteModalClose = useCallback(() => {
        setShowScenarioCompleteModal(false);
    }, []);

    const handleScenarioRestart = useCallback(() => {
        if (!scenario) return;
        if (scenarioCompleteTimeoutRef.current) {
            window.clearTimeout(scenarioCompleteTimeoutRef.current);
            scenarioCompleteTimeoutRef.current = null;
        }
        const initialProgress = createInitialScenarioProgress(scenario);
        handleScenarioProgressChange(initialProgress);
        setScenarioBlocks(getScenarioBlocksForTurn(scenario, initialProgress.currentTurnIndex));
        handleScenarioCanvasClear();
        setShowScenarioCompleteModal(false);
        setHasShownScenarioComplete(false);
    }, [handleScenarioCanvasClear, handleScenarioProgressChange, scenario]);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                setIsAuthenticated(true);
            } else {
                setShowAuthModal(true);
            }
        };
        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session?.user) {
                    setUser(session.user);
                    setIsAuthenticated(true);
                    setShowAuthModal(false);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                    setShowAuthModal(true);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, [supabase.auth]);

    useEffect(() => {
        if (!isAuthenticated) {
            if (rendererRef.current) {
                rendererRef.current.destroy();
                rendererRef.current = null;
            }
            return;
        }

        if (rendererRef.current) return;

        const container = d3.select(svgContainerRef.current);
        container.selectAll("*").remove();

        const getTopBarHeight = () => {
            if (typeof window === "undefined") return 64;
            const rawValue = getComputedStyle(document.documentElement).getPropertyValue("--top-bar-height");
            const parsed = parseInt(rawValue, 10);
            return Number.isFinite(parsed) ? parsed : 64;
        };

        const topBarHeight = getTopBarHeight();

        const svg = container
            .append("svg")
            .attr("id", "svg")
            .style("background-color", "#ffffff");

        const updateSvgSize = () => {
            const currentTopBarHeight = getTopBarHeight();
            const width = window.innerWidth;
            const height = window.innerHeight - currentTopBarHeight;
            svg.attr("width", width).attr("height", height);
            if (rendererRef.current) {
                rendererRef.current.topBarHeight = currentTopBarHeight;
                rendererRef.current.canvasHeight = height;
            }
        };
        updateSvgSize();
        window.addEventListener("resize", updateSvgSize);

        const logEvent = (eventType: string, eventData: object) => {
            loggingServiceRef.current?.logEvent(eventType, eventData);
        };
        const initialSidebarVariant = getEffectiveMode();
        rendererRef.current = new Renderer([], blockList, svg, () => setIsDirty(true), topBarHeight, logEvent, initialSidebarVariant, scenarioBlocks, shouldEnableSidebarDropDelete);

        return () => {
            window.removeEventListener("resize", updateSvgSize);
            if (rendererRef.current) {
                rendererRef.current.destroy();
                rendererRef.current = null;
            }
        };
    }, [isAuthenticated]);

    useEffect(() => {
        if (!isAuthenticated || !rendererRef.current) return;

        const projectIdFromUrl = searchParams.get('projectId');

        if (user) {
            if (projectIdFromUrl && projectIdFromUrl !== currentProjectId) {
                handleLoadProject(projectIdFromUrl);
            } else if (!projectIdFromUrl) {
                setIsProjectListOpen(true);
            }
        }

    }, [isAuthenticated, user, searchParams, currentProjectId]);

    useEffect(() => {
        if (user && currentProjectId && currentProjectId !== "top-bar-button-test") {
            const service = new LoggingService();
            loggingServiceRef.current = service;
            service.startSession(user.id, currentProjectId);

            const handleSessionEnd = () => {
                service.logEvent('SESSION_END_UNLOAD', { reason: 'beforeunload' });
                service.endSession();
            };

            window.addEventListener('beforeunload', handleSessionEnd);

            return () => {
                service.logEvent('SESSION_END', { reason: 'cleanup' });
                service.endSession();
                loggingServiceRef.current = null;
                window.removeEventListener('beforeunload', handleSessionEnd);
            };
        }
    }, [user?.id, currentProjectId]);

    const handleAuthSuccess = () => {
        setIsAuthenticated(true);
        setShowAuthModal(false);
    };

    const handleAnonymousAccess = () => {
        setIsAuthenticated(true);
        setShowAuthModal(false);
    };

    const handleSignOut = async () => {
        loggingServiceRef.current?.logEvent('SIGN_OUT', {});

        if (loggingServiceRef.current) {
            await loggingServiceRef.current.endSession();
        }

        loggingServiceRef.current = null;

        if (rendererRef.current) {
            rendererRef.current.destroy();
            rendererRef.current = null;
        }

        await supabase.auth.signOut();
        setUser(null);
        setIsAuthenticated(false);
        setCurrentProjectId(null);
        setScenario(DEFAULT_SCENARIO);
        setScenarioProgress(DEFAULT_SCENARIO_PROGRESS);
        setScenarioBlocks(DEFAULT_SCENARIO_BLOCKS);
        aiTutorStorageSnapshotRef.current = null;
        setAiTutorSyncVersion(0);
        router.push(routeBase, { scroll: false });
        setShowAuthModal(true);
    };

    const handleShowAuthModal = () => {
        setShowAuthModal(true);
    };

    const handleSaveProject = async () => {
        if (!currentProjectId || !rendererRef.current) return;
        setIsSaving(true);
        const projectData: ProjectData = {
            blocks: rendererRef.current.blocks,
            scenarioProgress,
        };
        try {
            await saveProjectData(currentProjectId, projectData);
            setIsDirty(false);
            loggingServiceRef.current?.logEvent('PROJECT_SAVE_SUCCESS', { projectId: currentProjectId });
        } catch (error) {
            console.error("Failed to save project:", error);
            loggingServiceRef.current?.logEvent('PROJECT_SAVE_FAIL', { projectId: currentProjectId, error: (error as Error).message });
            alert("プロジェクトの保存に失敗しました。");
        } finally {
            setIsSaving(false);
        }
    }

    const handleLoadProject = async (projectId: string) => {
        if (!rendererRef.current) return;
        setIsProjectListOpen(false);
        setIsProjectLoading(true);
        try {
            const data = await getProjectData(projectId);
            if (!data) return;
            rendererRef.current.blocks = data.blocks ?? [];
            const normalizedProgress = normalizeScenarioProgress(scenario, data.scenarioProgress);
            setScenarioProgress(normalizedProgress);
            syncAiTutorFromScenario(projectId, normalizedProgress);
            setScenarioBlocks(getScenarioBlocksForTurn(scenario, normalizedProgress.currentTurnIndex));
            setCurrentProjectId(projectId);
            setIsDirty(false);
            rendererRef.current.renderBlocks();
            if (searchParams.get('projectId') !== projectId) {
                router.push(`${routeBase}?projectId=${projectId}`, { scroll: false });
            }
            loggingServiceRef.current?.logEvent('PROJECT_LOAD_SUCCESS', { projectId });
        } catch (error) {
            console.error("Failed to load project:", error);
            loggingServiceRef.current?.logEvent('PROJECT_LOAD_FAIL', { projectId, error: (error as Error).message });
            alert("プロジェクトの読み込みに失敗しました。");
        } finally {
            setIsProjectLoading(false);
        }
    }

    const handleCreateNewProject = async () => {
        if (!rendererRef.current) return;
        setIsProjectListOpen(false);
        setIsProjectLoading(true);
        try {
            const newProjectId = crypto.randomUUID();
            const freshScenarioProgress = createInitialScenarioProgress(scenario);
            await saveProjectData(newProjectId, { blocks: [], scenarioProgress: freshScenarioProgress });
            loggingServiceRef.current?.logEvent('PROJECT_CREATE_SUCCESS', { newProjectId: newProjectId });
            router.push(`${routeBase}?projectId=${newProjectId}`, { scroll: false });
        } catch (error) {
            console.error("Failed to create new project:", error);
            loggingServiceRef.current?.logEvent('PROJECT_CREATE_FAIL', { error: (error as Error).message });
            alert("プロジェクトの作成に失敗しました。");
            setIsProjectLoading(false);
        }
    }

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (isDirty) {
                event.preventDefault();
                event.returnValue = '';
            } else {
                console.log("NOT DIRTY! YOU CAN LEAVE!")
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirty]);

    useEffect(() => {
        const updateViewportState = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setIsMobileViewport(width <= MOBILE_MAX_WIDTH);
            setIsPortrait(height > width);
        };

        updateViewportState();
        window.addEventListener('resize', updateViewportState);
        window.addEventListener('orientationchange', updateViewportState);

        return () => {
            window.removeEventListener('resize', updateViewportState);
            window.removeEventListener('orientationchange', updateViewportState);
        };
    }, []);

    const effectiveMode = getEffectiveMode();

    useEffect(() => {
        if (!rendererRef.current || !isAuthenticated) return;
        rendererRef.current.setSidebarVariant(effectiveMode);
    }, [effectiveMode, isAuthenticated]);

    useEffect(() => {
        const initialProgress = createInitialScenarioProgress(scenario);
        setScenarioProgress(initialProgress);
        setScenarioBlocks(getScenarioBlocksForTurn(scenario, initialProgress.currentTurnIndex));
    }, [scenario]);

    useEffect(() => {
        setScenarioBlocks((prev) => {
            const nextBlocks = getScenarioBlocksForTurn(scenario, scenarioProgress.currentTurnIndex);
            return prev === nextBlocks ? prev : nextBlocks;
        });
    }, [scenario, scenarioProgress.currentTurnIndex]);

    useEffect(() => {
        const totalTurns = scenario?.turns.length ?? 0;
        if (!scenario || totalTurns === 0) {
            if (showScenarioCompleteModal) setShowScenarioCompleteModal(false);
            if (hasShownScenarioComplete) setHasShownScenarioComplete(false);
            if (scenarioCompleteTimeoutRef.current) {
                window.clearTimeout(scenarioCompleteTimeoutRef.current);
                scenarioCompleteTimeoutRef.current = null;
            }
            return;
        }

        if (scenarioProgress.currentTurnIndex < totalTurns) {
            if (hasShownScenarioComplete || showScenarioCompleteModal) {
                setHasShownScenarioComplete(false);
                setShowScenarioCompleteModal(false);
            }
            if (scenarioCompleteTimeoutRef.current) {
                window.clearTimeout(scenarioCompleteTimeoutRef.current);
                scenarioCompleteTimeoutRef.current = null;
            }
            return;
        }

        const hasFinished = scenarioProgress.currentTurnIndex >= totalTurns && !scenarioProgress.isLoading;
        const hasMessages = scenarioProgress.messages.length > 0;

        if (hasFinished && hasMessages && !hasShownScenarioComplete) {
            if (scenarioCompleteTimeoutRef.current) {
                window.clearTimeout(scenarioCompleteTimeoutRef.current);
            }
            scenarioCompleteTimeoutRef.current = window.setTimeout(() => {
                setShowScenarioCompleteModal(true);
                setHasShownScenarioComplete(true);
                scenarioCompleteTimeoutRef.current = null;
            }, 700);
        }
    }, [
        hasShownScenarioComplete,
        scenario,
        scenarioProgress.currentTurnIndex,
        scenarioProgress.isLoading,
        scenarioProgress.messages.length,
        scenarioCompleteTimeoutRef,
        showScenarioCompleteModal,
    ]);

    useEffect(() => {
        syncAiTutorFromScenario(currentProjectId, scenarioProgress);
    }, [currentProjectId, scenarioProgress, syncAiTutorFromScenario]);

    useEffect(() => {
        if (!rendererRef.current) return;
        rendererRef.current.setScenarioBlockList(scenarioBlocks);
    }, [scenarioBlocks]);

    useEffect(() => {
        return () => {
            if (scenarioCompleteTimeoutRef.current) {
                window.clearTimeout(scenarioCompleteTimeoutRef.current);
            }
        };
    }, []);

    const shouldShowRotateOverlay = isMobileViewport && isPortrait && !showAuthModal;
    const shouldHideSidePanelForViewport = isMobileViewport && !isPortrait && !showAuthModal;
    const shouldShowActivityPanel = effectiveMode === "sandbox" && !shouldHideSidePanelForViewport;
    const shouldShowScenarioPanel = enableModeSwitch && effectiveMode === "scenario";
    const aiTutorKey = `${currentProjectId ?? "default"}:${aiTutorSyncVersion}`;

    return (
        <>
            <TopBar
                user={user}
                onSignOut={handleSignOut}
                onShowAuthModal={handleShowAuthModal}
                isDirty={isDirty}
                isSaving={isSaving}
                onSave={handleSaveProject}
                onShowProjects={() => setIsProjectListOpen(true)}
                currentProjectId={currentProjectId}
                documentURL="https://sentence-builder-docs.hirodevs.com/docs/Introduction/intro"
                showModeSwitch={!isMobileViewport && enableModeSwitch}
                mode={effectiveMode}
                onModeChange={(nextMode) => setMode(nextMode)}
            />

            {isAuthenticated && (
                <>
                    <div
                        ref={svgContainerRef}
                        style={{
                            position: 'fixed',
                            top: 'var(--top-bar-height)',
                            left: 0,
                        }}
                    />
                    {shouldShowActivityPanel && (
                        <ActivityPanel lessons={lessons} currentProjectId={currentProjectId} aiTutorKey={aiTutorKey} />
                    )}
                    {shouldShowScenarioPanel && (
                        <ScenarioActivityPanel
                            scenario={scenario}
                            progress={scenarioProgress}
                            onProgressChange={handleScenarioProgressChange}
                            onCanvasClear={handleScenarioCanvasClear}
                            onScenarioAdvance={handleScenarioAdvance}
                        />
                    )}
                </>
            )}

            {isProjectLoading && <Loader />}

            <AuthModal
                isOpen={showAuthModal}
                onAuthSuccess={handleAuthSuccess}
                onAnonymousAccess={handleAnonymousAccess}
            />

            <ProjectListModal
                isOpen={isProjectListOpen}
                onClose={() => setIsProjectListOpen(false)}
                isDismissible={!!currentProjectId && currentProjectId !== "top-bar-button-test"}
                onSelectProject={(projectId) => {
                    router.push(`${routeBase}?projectId=${projectId}`, { scroll: false });
                    setIsProjectListOpen(false);
                }}
                onCreateNew={() => handleCreateNewProject()}
            />

            <ScenarioCompleteModal
                isOpen={showScenarioCompleteModal}
                onClose={handleScenarioCompleteModalClose}
                onRestart={handleScenarioRestart}
            />

            <RotateOverlay show={shouldShowRotateOverlay} />
        </>
    );
}

export default SentenceBuilder;
