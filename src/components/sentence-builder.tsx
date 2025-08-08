/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Renderer } from "@/renderer/renderer";
import { blockList } from "@/data/blocks";
import TopBar from "./top-bar";
import AuthModal from "./auth-modal";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { getProjectData, saveProjectData } from '@/utils/supabase/projects';
import ProjectListModal from "./project-list-modal";
import { useRouter, useSearchParams } from 'next/navigation';
import Loader from "./loader";
import { LoggingService } from "@/utils/supabase/logging";

const SentenceBuilder = () => {
    // ユーザー認証に関する変数
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    // プロジェクト保存・読み込みに関する変数
    const [currentProjectId, setCurrentProjectId] = useState<string | null>("top-bar-button-test");
    const [isDirty, setIsDirty] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isProjectListOpen, setIsProjectListOpen] = useState(false);
    const [isProjectLoading, setIsProjectLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const svgContainerRef = useRef(null);
    const rendererRef = useRef<Renderer | null>(null);
    const loggingServiceRef = useRef<LoggingService | null>(null);
    const supabase = createClient();

    useEffect(() => {
        // Check authentication status on component mount
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

        // Listen for auth changes
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
            // Clean up renderer when not authenticated
            if (rendererRef.current) {
                rendererRef.current.destroy();
                rendererRef.current = null;
            }
            return;
        }

        // Don't reinitialize if renderer already exists
        if (rendererRef.current) return;

        const container = d3.select(svgContainerRef.current);
        container.selectAll("*").remove();

        const topBarHeight = 64;

        const svg = container
            .append("svg")
            .attr("id", "svg")
            .style("background-color", "#ffffff");

        const updateSvgSize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight - topBarHeight;
            svg.attr("width", width).attr("height", height);
        };
        updateSvgSize();
        window.addEventListener("resize", updateSvgSize);

        const logEvent = (eventType: string, eventData: object) => {
            loggingServiceRef.current?.logEvent(eventType, eventData);
        };
        rendererRef.current = new Renderer([], blockList, svg, () => setIsDirty(true), topBarHeight, logEvent);

        // The cleanup function for THIS effect.
        return () => {
            window.removeEventListener("resize", updateSvgSize);
            if (rendererRef.current) {
                rendererRef.current.destroy();
                rendererRef.current = null;
            }
        };
    }, [isAuthenticated]);

    useEffect(() => {
        // Don't run if the user isn't authenticated or the renderer hasn't been created yet.
        if (!isAuthenticated || !rendererRef.current) return;

        const projectIdFromUrl = searchParams.get('projectId');

        if (user) {
            if (projectIdFromUrl && projectIdFromUrl !== currentProjectId) {
                handleLoadProject(projectIdFromUrl);
            } else if (!projectIdFromUrl) {
                // If the URL has no project ID, show the selection modal.
                setIsProjectListOpen(true);
            }
        }

    }, [isAuthenticated, user, searchParams, currentProjectId]);

    useEffect(() => {
        // Only start a session if we have a user and a definitive project ID
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

        // Clean up renderer before signing out
        if (rendererRef.current) {
            rendererRef.current.destroy();
            rendererRef.current = null;
        }

        await supabase.auth.signOut();
        setUser(null);
        setIsAuthenticated(false);
        setCurrentProjectId(null);
        router.push('/', { scroll: false });
        setShowAuthModal(true);
    };

    const handleShowAuthModal = () => {
        setShowAuthModal(true);
    };

    const handleSaveProject = async () => {
        if (!currentProjectId || !rendererRef.current) return;
        setIsSaving(true);
        const projectData = { blocks: rendererRef.current.blocks };
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
            rendererRef.current.blocks = data.blocks;
            setCurrentProjectId(projectId);
            setIsDirty(false);
            rendererRef.current.renderBlocks();
            if (searchParams.get('projectId') !== projectId) {
                router.push(`/?projectId=${projectId}`, { scroll: false });
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
            await saveProjectData(newProjectId, { blocks: [] });
            loggingServiceRef.current?.logEvent('PROJECT_CREATE_SUCCESS', { newProjectId: newProjectId });
            router.push(`/?projectId=${newProjectId}`, { scroll: false });
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
            />

            {isAuthenticated && (
                <div
                    ref={svgContainerRef}
                    style={{
                        position: 'fixed',
                        top: '64px',
                        left: 0,
                    }}
                />
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
                    router.push(`/?projectId=${projectId}`, { scroll: false });
                    setIsProjectListOpen(false);
                }}
                onCreateNew={() => handleCreateNewProject()}
            />
        </>
    );
}

export default SentenceBuilder;