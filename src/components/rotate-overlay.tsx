"use client"

import { useState, useEffect, CSSProperties } from 'react';

interface RotateOverlayProps {
    show: boolean;
}

const RotateOverlay = ({ show }: RotateOverlayProps) => {
    const [showLockHint, setShowLockHint] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        // オーバーレイが表示された2.5秒後に、ロックに関するヒントを表示する
        if (show) {
            timer = setTimeout(() => {
                setShowLockHint(true);
            }, 2500);
        } else {
            setShowLockHint(false); // 非表示になったらリセット
        }

        // コンポーネントがアンマウントされる際にタイマーをクリア
        return () => clearTimeout(timer);
    }, [show]);

    if (!show) return null;

    return (
        <div style={styles.overlay}>
            <style>
                {`
                    @keyframes rotate-phone {
                        0% { transform: rotate(0deg); }
                        50% { transform: rotate(-90deg); }
                        100% { transform: rotate(-90deg); }
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}
            </style>
            <div style={styles.content}>
                <div style={styles.phoneIcon}></div>
                <p style={styles.mainText}>
                    より快適にご利用いただくために、<br />端末を横向きにしてお使いください。
                </p>

                {/* 時間差で表示されるヒント */}
                <div style={{ ...styles.lockHint, ...(showLockHint ? styles.lockHintVisible : {}) }}>
                    {/* 【修正箇所】新しい南京錠アイコン */}
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={styles.lockIcon}
                    >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <p style={styles.subText}>
                        画面が回転しない場合は、<br />端末の「画面縦向きロック」をご確認ください。
                    </p>
                </div>
            </div>
        </div>
    );
};

interface StyleObject {
    [key: string]: CSSProperties;
}

const styles: StyleObject = {
    overlay: {
        position: 'fixed', inset: 0, backgroundColor: 'rgba(255, 255, 255, 0.98)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px', textAlign: 'center', zIndex: 1200, color: '#1a1a1a',
        backdropFilter: 'blur(5px)',
    },
    content: {
        maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center',
    },
    phoneIcon: {
        width: '40px', height: '80px', border: '3px solid #1a1a1a',
        borderRadius: '8px', marginBottom: '24px',
        animation: 'rotate-phone 2.5s ease-in-out infinite',
    },
    mainText: {
        fontSize: '18px', lineHeight: 1.6, fontWeight: 600,
        marginBottom: '24px',
    },
    lockHint: {
        opacity: 0,
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    lockHintVisible: {
        opacity: 1,
        animation: 'fadeIn 0.5s ease-out',
    },
    lockIcon: {
        marginBottom: '8px',
        color: '#666666',
    },
    subText: {
        fontSize: '14px', lineHeight: 1.5, color: '#666666',
        fontWeight: 400, margin: 0,
    },
};

export default RotateOverlay;