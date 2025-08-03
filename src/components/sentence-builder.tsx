"use client"

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Renderer } from "@/renderer/renderer";
import { blockList } from "@/data/blocks";
import { Block } from "@/models/block";
import TopBar from "./top-bar";
import AuthModal from "./auth-modal";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { saveBlocksToSupabase, listProjectsForUser, loadProjectFromSupabase } from "@/utils/supabase/helpers";
import ProjectListModal from "./project-list-modal";

const SentenceBuilder = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const [currentProjectId, setCurrentProjectId] = useState<string>("default-project");
    const [projectList, setProjectList] = useState<string[]>([]);
    const [showProjectListModal, setShowProjectListModal] = useState(false);
    const [isProjectListLoading, setIsProjectListLoading] = useState(false);
    const [loadingProjectId, setLoadingProjectId] = useState<string | null>(null);

    const svgContainerRef = useRef(null);
    const rendererRef = useRef<Renderer | null>(null);
    const supabase = createClient();

    const initializeRenderer = (initialBlocks: Block[]) => {
        if (rendererRef.current) {
            rendererRef.current.destroy();
            rendererRef.current = null;
        }

        const container = d3.select(svgContainerRef.current);
        container.selectAll("*").remove();

        const topBarHeight = 64;
        const svg = container.append("svg").attr("id", "svg").style("background-color", "#ffffff");

        const updateSvgSize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight - topBarHeight;
            svg.attr("width", width).attr("height", height);
        };
        updateSvgSize();
        window.addEventListener("resize", updateSvgSize);

        rendererRef.current = new Renderer(initialBlocks, blockList, svg, topBarHeight);
    };

    useEffect(() => {
        // Check authentication status on component mount
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                setIsAuthenticated(true);
                handleLoadProject("default-project");
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supabase.auth]);

    useEffect(() => {
        if (isAuthenticated) {
            initializeRenderer([]);
        }
    }, [isAuthenticated]);

    const handleSave = async () => {
        if (!user) {
            alert("Please sign in to save your work.");
            handleShowAuthModal();
            return;
        }
        if (!rendererRef.current) return;

        setIsSaving(true);
        try {
            const blocksToSave = rendererRef.current.blocks;
            const result = await saveBlocksToSupabase(user, blocksToSave, currentProjectId);

            if (result.success) {
                alert(`プロジェクト '${currentProjectId}' が正常に保存されました。`);
                // Refresh project list if this is a new project
                if (!projectList.includes(currentProjectId)) {
                    setProjectList(prev => [...prev, currentProjectId].sort());
                }
            } else {
                alert(`保存に失敗しました: ${result.error}`);
            }
        } finally {
            setIsSaving(false);
        }
    };

    const handleLoadProject = async (projectId: string) => {
        if (!user || loadingProjectId) return;
        setLoadingProjectId(projectId);

        try {
            const { blocks, error } = await loadProjectFromSupabase(user, projectId);
            if (error) {
                handleCreateNewProject(projectId);
            } else if (blocks) {
                initializeRenderer(blocks);
                setCurrentProjectId(projectId);
            }
            setShowProjectListModal(false);
        } catch (e) {
            alert(`プロジェクトの読み込み中に予期せぬエラーが発生しました。${e}`);
        } finally {
            setLoadingProjectId(null);
        }
    };

    const handleCreateNewProject = (projectId: string) => {
        console.log(`Creating new project: ${projectId}`);
        initializeRenderer([]);
        setCurrentProjectId(projectId);
        setShowProjectListModal(false);
    }

    const handleShowProjectList = async () => {
        if (!user) {
            alert("Please sign in to view projects.");
            return;
        }

        // 1. Show the modal frame and loading state IMMEDIATELY
        setShowProjectListModal(true);
        setIsProjectListLoading(true);

        // 2. Fetch the data in the background
        const { projects, error } = await listProjectsForUser(user);

        if (error) {
            alert(`プロジェクトの読み込みに失敗しました: ${error}`);
            setProjectList([]); // Ensure list is empty on error
        } else if (projects) {
            // 3. Populate the modal with the fetched data
            setProjectList(projects);
        }

        // 4. Turn off the loading indicator
        setIsProjectListLoading(false);
    };

    const handleAuthSuccess = () => {
        setIsAuthenticated(true);
        setShowAuthModal(false);
    };

    const handleAnonymousAccess = () => {
        setIsAuthenticated(true);
        setShowAuthModal(false);
    };

    const handleSignOut = async () => {
        // Clean up renderer before signing out
        if (rendererRef.current) {
            rendererRef.current.destroy();
            rendererRef.current = null;
        }

        await supabase.auth.signOut();
        setUser(null);
        setIsAuthenticated(false);
        setShowAuthModal(true);
    };

    const handleShowAuthModal = () => {
        setShowAuthModal(true);
    };

    return (
        <>
            <TopBar
                user={user}
                onSignOut={handleSignOut}
                onShowAuthModal={handleShowAuthModal}
                onSave={handleSave}
                isSaving={isSaving}
                onShowProjects={handleShowProjectList}
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

            <AuthModal
                isOpen={showAuthModal}
                onAuthSuccess={handleAuthSuccess}
                onAnonymousAccess={handleAnonymousAccess}
            />

            <ProjectListModal
                isOpen={showProjectListModal}
                projects={projectList}
                onClose={() => setShowProjectListModal(false)}
                loadingProjectId={loadingProjectId}
                isLoading={isProjectListLoading}
                onLoadProject={handleLoadProject}
                onCreateProject={handleCreateNewProject}
                currentProjectId={currentProjectId}
            />
        </>
    );
}

export default SentenceBuilder;