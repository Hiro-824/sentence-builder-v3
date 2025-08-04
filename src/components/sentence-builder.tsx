/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { listProjects, getProjectData, saveProjectData } from '@/utils/supabase/projects';

const SentenceBuilder = () => {
    // ユーザー認証に関する変数
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    // プロジェクト保存・読み込みに関する変数
    const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isProjectListOpen, setIsProjectListOpen] = useState(false);

    const svgContainerRef = useRef(null);
    const rendererRef = useRef<Renderer | null>(null);
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

        const blocks: Block[] = [];

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

        rendererRef.current = new Renderer(blocks, blockList, svg, topBarHeight);

        return () => {
            window.removeEventListener("resize", updateSvgSize);
            if (rendererRef.current) {
                rendererRef.current.destroy();
                rendererRef.current = null;
            }
        };
    }, [isAuthenticated]);

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

    /*
    const runApiTests = async () => {
        console.log("--- STARTING API TESTS ---");

        // 1. Test saveProjectData
        console.log("1. Testing saveProjectData...");
        const testProjectId = `test-project-${new Date().getTime()}`;
        const testProjectData = { blocks: [{ id: 'block1', x: 10, y: 20, words: [], color: 'red', children: [] }] };

        try {
            await saveProjectData(testProjectId, testProjectData);
            console.log(`✅ SUCCESS: saveProjectData completed for project: ${testProjectId}`);
        } catch (error) {
            console.error("❌ FAILED: saveProjectData", error);
            console.log("--- TESTS ABORTED ---");
            return;
        }

        // 2. Test listProjects
        console.log("\n2. Testing listProjects...");
        try {
            const projects = await listProjects();
            console.log("✅ SUCCESS: listProjects returned:", projects);
            if (projects.length === 0) {
                console.warn("⚠️  listProjects returned an empty array. Make sure the saved project exists.");
            } else {
                console.log("Found projects:", projects.map(p => p.id).join(', '));
            }
        } catch (error) {
            console.error("❌ FAILED: listProjects", error);
        }

        // 3. Test getProjectData
        console.log(`\n3. Testing getProjectData for project: ${testProjectId}...`);
        try {
            const data = await getProjectData(testProjectId);
            if (data) {
                console.log("✅ SUCCESS: getProjectData returned:", data);
                // Simple validation
                if (data.blocks && data.blocks[0]?.id === 'block1') {
                    console.log("Data integrity check passed.");
                } else {
                    console.error("Data integrity check FAILED. Retrieved data does not match saved data.");
                }
            } else {
                console.error("❌ FAILED: getProjectData returned null.");
            }
        } catch (error) {
            console.error("❌ FAILED: getProjectData", error);
        }

        console.log("\n--- API TESTS FINISHED ---");
    };*/

    return (
        <>
            <TopBar
                user={user}
                onSignOut={handleSignOut}
                onShowAuthModal={handleShowAuthModal}
            />

            {/* --- TEMPORARY TEST BUTTON --- */}
            {/*isAuthenticated && (
                <button
                    onClick={runApiTests}
                    style={{ position: 'fixed', top: '80px', left: '20px', zIndex: 9999, padding: '10px', background: 'orange' }}
                >
                    Run API Tests
                </button>
            )*/}
            {/* --- END OF TEMPORARY CODE --- */}

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
        </>
    );
}

export default SentenceBuilder;