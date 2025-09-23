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
}

const ActivityPanel = ({ lessons, currentProjectId }: ActivityPanelProps) => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

	useEffect(() => {
		const handleAiTutorSend = () => setActiveTab('ai_tutor');
		window.addEventListener('aiTutorSend', handleAiTutorSend as EventListener);
		return () => window.removeEventListener('aiTutorSend', handleAiTutorSend as EventListener);
	}, []);

  return (
    <aside className={styles.panel}>
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
          <AiTutorTabContent projectId={currentProjectId} key={currentProjectId ?? 'default'} />
        )}
      </div>
    </aside>
  );
};

export default ActivityPanel;
