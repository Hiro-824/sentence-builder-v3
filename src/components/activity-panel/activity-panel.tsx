"use client";

import { useState, useEffect } from 'react';
import styles from './activity-panel.module.css';
import { BookIcon, AiIcon } from '@/components/activity-panel/icons/icons';
import { LessonsTabContent } from './tabs/lessons';
import { Lesson } from '@/utils/lessons';
import { AiTutorTabContent } from './tabs/ai-tutor';

const TABS = [
  { id: 'lessons', label: 'テキスト教材', icon: <BookIcon /> },
  { id: 'ai_tutor', label: 'AI講師', icon: <AiIcon /> },
];

interface ActivityPanelProps {
  lessons: Lesson[];
  currentProjectId: string | null;
  aiTutorKey?: string;
  isOpen: boolean;
  onToggle: () => void;
}

const ActivityPanel = ({ lessons, currentProjectId, aiTutorKey, isOpen, onToggle }: ActivityPanelProps) => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

	useEffect(() => {
		const handleAiTutorSend = () => setActiveTab('ai_tutor');
		window.addEventListener('aiTutorSend', handleAiTutorSend as EventListener);
		return () => window.removeEventListener('aiTutorSend', handleAiTutorSend as EventListener);
  }, []);

  return (
    <aside className={`${styles.panel} ${isOpen ? styles.open : styles.collapsed}`} aria-label="Activity panel">
      <button
        type="button"
        className={styles.toggleButton}
        onClick={onToggle}
        aria-label={isOpen ? "アクティビティパネルを閉じる" : "アクティビティパネルを開く"}
        aria-expanded={isOpen}
        title={isOpen ? "閉じる" : "開く"}
      >
        {isOpen ? '›' : '‹'}
      </button>
      {isOpen && (
        <>
          <nav className={styles.tabNav}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
                onClick={() => setActiveTab(tab.id)}
                title={tab.label}
              >
                {tab.icon}
                <span className={styles.tabLabel}>{tab.label}</span>
              </button>
            ))}
          </nav>
          <div className={styles.content}>
            {activeTab === 'lessons' && <LessonsTabContent lessons={lessons} />}
            {activeTab === 'ai_tutor' && (
              <AiTutorTabContent projectId={currentProjectId} key={aiTutorKey ?? currentProjectId ?? 'default'} />
            )}
          </div>
        </>
      )}
    </aside>
  );
};

export default ActivityPanel;
