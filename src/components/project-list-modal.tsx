"use client"

import { useState } from 'react';

interface ProjectListModalProps {
    isOpen: boolean;
    projects: string[];
    onClose: () => void;
    onLoadProject: (projectId: string) => void;
    onCreateProject: (projectId: string) => void;
    currentProjectId: string;
    isLoading: boolean;
    loadingProjectId: string | null;
}

const Spinner = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 0' }}>
        <svg className="animate-spin" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.99988V5.99988M12 18.0001V21.0001M6.34315 6.34302L8.46447 8.46434M15.5355 15.5357L17.6569 17.657M2.99997 12H6M18 12H21" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
);

const SmallSpinner = () => (
    <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.99988V5.99988M12 18.0001V21.0001M6.34315 6.34302L8.46447 8.46434M15.5355 15.5357L17.6569 17.657M2.99997 12H6M18 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ProjectListModal = ({
    isOpen,
    projects,
    onClose,
    onLoadProject,
    onCreateProject,
    currentProjectId,
    isLoading,
    loadingProjectId,
}: ProjectListModalProps) => {
    const [newProjectName, setNewProjectName] = useState("");

    const handleCreate = () => {
        if (newProjectName && !projects.includes(newProjectName)) {
            onCreateProject(newProjectName);
            setNewProjectName("");
        } else {
            alert("プロジェクト名が有効ではありません。空または既存の名前は使用できません。"); // Project name is not valid. Cannot be empty or an existing name.
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
            <div style={{
                backgroundColor: '#ffffff', borderRadius: '12px', padding: '32px',
                maxWidth: '500px', width: '100%', maxHeight: '80vh', display: 'flex',
                flexDirection: 'column', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>
                        プロジェクト一覧
                    </h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#999' }}>×</button>
                </div>

                <div style={{ borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', overflowY: 'auto', flexGrow: 1, margin: '0 -32px', padding: '0 32px' }}>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {projects.length > 0 ? projects.map(p => {
                                const isItemLoading = loadingProjectId === p;
                                return (
                                    <li key={p}
                                        // Prevent clicking while this item is loading
                                        onClick={() => !isItemLoading && onLoadProject(p)}
                                        style={{
                                            padding: '16px 12px',
                                            // Make item non-interactive while loading
                                            cursor: isItemLoading ? 'not-allowed' : 'pointer',
                                            opacity: isItemLoading ? 0.7 : 1,
                                            backgroundColor: p === currentProjectId ? '#eef2ff' : 'transparent',
                                            fontWeight: p === currentProjectId ? '600' : '500',
                                            color: p === currentProjectId ? '#007AFF' : '#1a1a1a',
                                            borderBottom: '1px solid #f0f0f0',
                                            transition: 'background-color 0.2s ease, opacity 0.2s ease',
                                            borderRadius: '8px',
                                            margin: '4px 0',
                                            // Use flexbox to align text and spinner
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                        onMouseEnter={(e) => { if (p !== currentProjectId && !isItemLoading) e.currentTarget.style.backgroundColor = '#f8f9fa'; }}
                                        onMouseLeave={(e) => { if (p !== currentProjectId && !isItemLoading) e.currentTarget.style.backgroundColor = 'transparent'; }}
                                    >
                                        <span>{p}</span>
                                        {/* Render the small spinner if this item is loading */}
                                        {isItemLoading && <SmallSpinner />}
                                    </li>
                                )
                            }) : <li style={{ padding: '20px', color: '#666' }}>保存されたプロジェクトはありません。</li>}
                        </ul>
                    )}
                </div>

                <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                    <input
                        type="text"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value.trim())}
                        placeholder="新しいプロジェクト名"
                        style={{
                            flexGrow: 1, padding: '12px', border: '1px solid #d1d5db',
                            borderRadius: '8px', fontSize: '15px', outline: 'none'
                        }}
                    />
                    <button
                        onClick={handleCreate}
                        style={{
                            backgroundColor: '#007AFF', color: 'white', padding: '12px 24px',
                            borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '15px',
                            fontWeight: '500', transition: 'background-color 0.2s ease'
                        }}
                    >
                        作成
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectListModal;