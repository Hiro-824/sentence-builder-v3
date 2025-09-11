"use client";

import { useState, useEffect } from 'react';
import styles from './activity-panel.module.css';
import { BookIcon, AiIcon } from '@/components/activity-panel/icons/icons';
import { LessonsTabContent } from './tabs/lessons';
import { Lesson } from '@/utils/lessons';
import { AiTutorTabContent } from './tabs/ai-tutor';

// Tab Definitions
const TABS = [
  { id: 'lessons', label: 'テキスト教材', icon: <BookIcon /> },
  { id: 'ai_tutor', label: 'AI講師', icon: <AiIcon /> },
];

interface ActivityPanelProps {
  lessons: Lesson[];
}

const ActivityPanel = ({ lessons }: ActivityPanelProps) => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

	// Switch to AI tab when a message is sent from elsewhere (e.g., renderer send button)
	// We listen to a custom DOM event `aiTutorSend` dispatched on window.
	// The AI tab component will handle actually sending the message.
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
        {activeTab === 'ai_tutor' && <AiTutorTabContent />}
      </div>
    </aside>
  );
};

export default ActivityPanel;