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
import { saveBlocksToSupabase } from "@/utils/supabase/helpers";

const SentenceBuilder = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isSaving, setIsSaving] = useState(false);

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

    const handleSave = async () => {
        if (!user) {
            alert("Please sign in to save your work.");
            handleShowAuthModal();
            return;
        }

        if (!rendererRef.current) {
            alert("An error occurred. The renderer is not available.");
            return;
        }

        setIsSaving(true);
        try {
            const blocksToSave = rendererRef.current.blocks;
            const result = await saveBlocksToSupabase(user, blocksToSave);

            if (result.success) {
                alert("プロジェクトが正常に保存されました。"); // Project saved successfully.
            } else {
                alert(`保存に失敗しました: ${result.error}`); // Save failed:
            }
        } catch (error) {
            alert(`An unexpected error occurred: ${error}`);
        } finally {
            setIsSaving(false);
        }
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
        </>
    );
}

export default SentenceBuilder;