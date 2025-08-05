"use client"

import { useState, useEffect } from "react";
import type { Project } from "@/models/project";
import { listProjects } from "@/utils/supabase/projects"; // We will create this file in the next step

interface ProjectListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
  onCreateNew: () => void;
}

const ProjectListModal = ({ isOpen, onClose, onSelectProject, onCreateNew }: ProjectListModalProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchProjects = async () => {
        setIsLoading(true);
        try {
          const projectsData = await listProjects();
          // Sort projects by most recently updated
          projectsData.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
          setProjects(projectsData);
        } catch (error) {
          console.error("Failed to fetch projects:", error);
          alert("プロジェクトの読み込みに失敗しました。");
        } finally {
          setIsLoading(false);
        }
      };
      fetchProjects();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '32px',
          width: '100%',
          maxWidth: '500px',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          margin: '0 16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#1a1a1a',
          margin: '0 0 24px 0',
          textAlign: 'center'
        }}>
          プロジェクト一覧
        </h2>

        <button
          onClick={onCreateNew}
          style={{
            width: '100%',
            backgroundColor: '#007AFF',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'background-color 0.2s ease',
            marginBottom: '24px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007AFF'}
        >
          新しいプロジェクトを作成
        </button>
        
        <div style={{
          flex: 1,
          overflowY: 'auto',
          borderTop: '1px solid #e5e7eb',
          paddingTop: '16px'
        }}>
          {isLoading ? (
            <div style={{ textAlign: 'center', color: '#666666', padding: '20px 0' }}>読み込み中...</div>
          ) : projects.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#666666', padding: '20px 0' }}>プロジェクトがありません。</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => onSelectProject(project.id)}
                  style={{
                    width: '100%',
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: '500',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e5e7eb';
                    e.currentTarget.style.borderColor = '#9ca3af';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                    e.currentTarget.style.borderColor = '#d1d5db';
                  }}
                >
                  {project.name.replace('.json', '')}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectListModal;