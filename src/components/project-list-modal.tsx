"use client"

import { useState } from 'react';

interface ProjectListModalProps {
  isOpen: boolean;
  projects: string[];
  onClose: () => void;
  onLoadProject: (projectId: string) => void;
  onCreateProject: (projectId: string) => void;
  currentProjectId: string;
}

const ProjectListModal = ({
  isOpen,
  projects,
  onClose,
  onLoadProject,
  onCreateProject,
  currentProjectId,
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
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {projects.length > 0 ? projects.map(p => (
              <li key={p}
                  onClick={() => onLoadProject(p)}
                  style={{
                    padding: '16px 12px', cursor: 'pointer',
                    backgroundColor: p === currentProjectId ? '#eef2ff' : 'transparent',
                    fontWeight: p === currentProjectId ? '600' : '500',
                    color: p === currentProjectId ? '#007AFF' : '#1a1a1a',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background-color 0.2s ease',
                    borderRadius: '8px',
                    margin: '4px 0'
                  }}
                  onMouseEnter={(e) => { if (p !== currentProjectId) e.currentTarget.style.backgroundColor = '#f8f9fa'; }}
                  onMouseLeave={(e) => { if (p !== currentProjectId) e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                {p}
              </li>
            )) : <li style={{ padding: '20px', color: '#666' }}>保存されたプロジェクトはありません。</li>}
          </ul>
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