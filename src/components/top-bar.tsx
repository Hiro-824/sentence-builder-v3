"use client"

import React from 'react';

const styles: { [key: string]: React.CSSProperties } = {
    nav: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        zIndex: 10,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        backdropFilter: 'blur(8px)',
    },
    leftSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '32px',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
    },
    logo: {
        fontWeight: '700',
        fontSize: '22px',
        color: '#1a1a1a',
        letterSpacing: '-0.02em',
    },
    button: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '15px',
        color: '#666666',
        fontWeight: '500',
        padding: '8px 12px',
        borderRadius: '8px',
        transition: 'all 0.2s ease',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    userIcon: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#f5f5f5',
        border: '2px solid #f0f0f0',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
    }
};

const TopBar = () => {
    return (
        <nav style={styles.nav}>
            <div style={styles.leftSection}>
                <span style={styles.logo}>Sentence Builder</span>
                <button 
                    style={styles.button}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                        e.currentTarget.style.color = '#1a1a1a';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#666666';
                    }}
                >
                    Projects
                </button>
                <button 
                    style={styles.button}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                        e.currentTarget.style.color = '#1a1a1a';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#666666';
                    }}
                >
                    Docs
                </button>
            </div>
            <div style={styles.rightSection}>
                <div 
                    style={styles.userIcon} 
                    title="User Account"
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f0f0f0';
                        e.currentTarget.style.borderColor = '#e0e0e0';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f5f5f5';
                        e.currentTarget.style.borderColor = '#f0f0f0';
                    }}
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