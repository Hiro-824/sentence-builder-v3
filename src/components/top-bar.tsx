"use client"

import React, { useCallback } from 'react';

const TopBar = () => {
    const handleButtonHover = useCallback((e: React.MouseEvent<HTMLButtonElement>, isEnter: boolean) => {
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

    return (
        <nav className="top-bar-nav">
            <div className="top-bar-left">
                <span className="top-bar-logo" style={{ userSelect: "none" }}>Sentence Builder</span>
                <button 
                    className="top-bar-button"
                    onMouseEnter={(e) => handleButtonHover(e, true)}
                    onMouseLeave={(e) => handleButtonHover(e, false)}
                >
                    Projects
                </button>
                <button 
                    className="top-bar-button"
                    onMouseEnter={(e) => handleButtonHover(e, true)}
                    onMouseLeave={(e) => handleButtonHover(e, false)}
                >
                    Docs
                </button>
            </div>
            <div className="top-bar-right">
                <button 
                    className="top-bar-save-button"
                    onMouseEnter={(e) => handleSaveButtonHover(e, true)}
                    onMouseLeave={(e) => handleSaveButtonHover(e, false)}
                    onClick={() => {
                        // Save functionality will be implemented here
                        console.log('Save button clicked');
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16L21 8V19C21 20.1046 20.1046 21 19 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17 21V13H7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 3V8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Save
                </button>
                <div 
                    className="top-bar-user-icon" 
                    title="User Account"
                    onMouseEnter={(e) => handleUserIconHover(e, true)}
                    onMouseLeave={(e) => handleUserIconHover(e, false)}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#999999"/>
                        <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#999999"/>
                    </svg>
                </div>
            </div>
        </nav>
    );
};

export default TopBar;