"use client"

import React, { useCallback, useState, useRef, useEffect } from 'react';
import { User } from '@supabase/supabase-js';

interface TopBarProps {
    user: User | null;
    onSignOut: () => void;
    onShowAuthModal?: () => void;
    isDirty: boolean;
    isSaving: boolean;
    onSave: () => void;
    onShowProjects: () => void;
    currentProjectId: string | null;
    documentURL: string;
}

const TopBar = ({ user, onSignOut, onShowAuthModal, isDirty, isSaving, onSave, onShowProjects, currentProjectId, documentURL }: TopBarProps) => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    const handleButtonHover = useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, isEnter: boolean) => {
        const target = e.currentTarget;
        if (isEnter) {
            target.style.backgroundColor = '#f8f9fa';
            target.style.color = '#1a1a1a';
        } else {
            target.style.backgroundColor = 'transparent';
            target.style.color = '#666666';
        }
    }, []);

    const handleSaveButtonHover = useCallback((e: React.MouseEvent<HTMLButtonElement>, isEnter: boolean) => {
        const target = e.currentTarget;
        if (isEnter) {
            target.style.backgroundColor = '#007AFF';
            target.style.color = '#ffffff';
        } else {
            target.style.backgroundColor = '#f0f0f0';
            target.style.color = '#1a1a1a';
        }
    }, []);

    const handleUserIconHover = useCallback((e: React.MouseEvent<HTMLDivElement>, isEnter: boolean) => {
        const target = e.currentTarget;
        if (isEnter) {
            target.style.backgroundColor = '#f0f0f0';
            target.style.borderColor = '#e0e0e0';
        } else {
            target.style.backgroundColor = '#f5f5f5';
            target.style.borderColor = '#f0f0f0';
        }
    }, []);

    const handleUserIconClick = useCallback(() => {
        if (user) {
            setShowUserMenu(!showUserMenu);
        } else {
            onShowAuthModal?.();
        }
    }, [showUserMenu, user, onShowAuthModal]);

    const handleSignOut = useCallback(() => {
        onSignOut();
        setShowUserMenu(false);
    }, [onSignOut]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };

        if (showUserMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserMenu]);

    return (
        <nav className="top-bar-nav">
            <div className="top-bar-left">
                <span className="top-bar-logo" style={{ userSelect: "none" }}>Sentence Builder</span>
                {user && currentProjectId && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#f5f5f5',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        color: '#666666'
                    }}>
                        <span style={{ fontWeight: 500, color: '#1a1a1a' }}>Project</span>
                        <span style={{ fontFamily: 'var(--font-geist-mono)' }}>
                            {currentProjectId.split('-')[0]}
                        </span>
                    </div>
                )}
                {user && (
                    <button
                        className="top-bar-button"
                        onMouseEnter={(e) => handleButtonHover(e, true)}
                        onMouseLeave={(e) => handleButtonHover(e, false)}
                        onClick={onShowProjects}
                    >
                        プロジェクト一覧
                    </button>
                )}
                <a
                    href={documentURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="top-bar-button"
                    style={{ textDecoration: 'none' }}
                    onMouseEnter={(e) => handleButtonHover(e, true)}
                    onMouseLeave={(e) => handleButtonHover(e, false)}
                >
                    ドキュメント
                </a>
            </div>
            <div className="top-bar-right">
                {user && <button
                    className="top-bar-save-button"
                    disabled={!isDirty || isSaving}
                    onMouseEnter={(e) => handleSaveButtonHover(e, true)}
                    onMouseLeave={(e) => handleSaveButtonHover(e, false)}
                    onClick={onSave}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16L21 8V19C21 20.1046 20.1046 21 19 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17 21V13H7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7 3V8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {isSaving ? "保存中…" : isDirty ? "保存する" : "保存されました"}
                </button>}
                <div
                    ref={userMenuRef}
                    style={{ position: 'relative' }}
                >
                    <div
                        className="top-bar-user-icon"
                        title={user ? `Signed in as ${user.email?.split('@')[0] || 'User'}` : "User Account"}
                        onMouseEnter={(e) => handleUserIconHover(e, true)}
                        onMouseLeave={(e) => handleUserIconHover(e, false)}
                        onClick={handleUserIconClick}
                        style={{ cursor: 'pointer' }}
                    >
                        {user ? (
                            <div style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: '#007AFF',
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '16px',
                                fontWeight: '600',
                                fontFamily: 'system-ui, -apple-system, sans-serif'
                            }}>
                                {(user.email?.split('@')[0] || 'U').charAt(0).toUpperCase()}
                            </div>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#999999" />
                                <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#999999" />
                            </svg>
                        )}
                    </div>

                    {showUserMenu && user && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            marginTop: '8px',
                            backgroundColor: '#ffffff',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                            border: '1px solid #e5e7eb',
                            minWidth: '200px',
                            zIndex: 1000
                        }}>
                            <div style={{
                                padding: '12px 16px',
                                borderBottom: '1px solid #f3f4f6',
                                fontSize: '14px',
                                color: '#6b7280'
                            }}>
                                Signed in as
                            </div>
                            <div style={{
                                padding: '8px 16px',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#1f2937',
                                wordBreak: 'break-all'
                            }}>
                                {user.email?.split('@')[0] || 'User'}
                            </div>
                            <div style={{
                                padding: '8px 0',
                                borderTop: '1px solid #f3f4f6'
                            }}>
                                <button
                                    onClick={handleSignOut}
                                    style={{
                                        width: '100%',
                                        padding: '8px 16px',
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        color: '#dc2626',
                                        textAlign: 'left',
                                        transition: 'background-color 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    サインアウト
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default TopBar;
