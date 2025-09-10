"use client";

import { useState } from 'react';
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