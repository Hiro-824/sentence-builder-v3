"use client"

import React from 'react';

const styles: { [key: string]: React.CSSProperties } = {
    nav: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        zIndex: 10,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    leftSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    logo: {
        fontWeight: 'bold',
        fontSize: '20px',
    },
    button: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        color: '#333',
    },
    userIcon: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: '#e0e0e0',
        cursor: 'pointer',
    }
};

const TopBar = () => {
    return (
        <nav style={styles.nav}>
            <div style={styles.leftSection}>
                <span style={styles.logo}>Sentence Builder</span>
                <button style={styles.button}>Projects</button>
                <button style={styles.button}>Docs</button>
            </div>
            <div style={styles.rightSection}>
                {/* Placeholder for the user icon */}
                <div style={styles.userIcon} title="User Account"></div>
            </div>
        </nav>
    );
};

export default TopBar;