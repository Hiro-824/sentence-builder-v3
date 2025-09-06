"use client";

import { useState } from 'react';
import styles from './activity-panel.module.css';
import { BookIcon, ImageIcon, AiIcon } from '@/components/activity-panel/icons/icons';
import { LessonsTabContent } from './tabs/lessons';
import { Lesson } from '@/utils/lessons';

// Tab Definitions
const TABS = [
  { id: 'lessons', label: 'テキスト教材', icon: <BookIcon /> },
  { id: 'picture', label: '写真描写', icon: <ImageIcon /> },
  { id: 'ai_tutor', label: 'AI講師', icon: <AiIcon /> },
];

const TabContent = ({ title }: { title: string }) => (
  <div className={styles.tabContent}>
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.placeholderText}>
      Coming Soon...
    </p>
  </div>
);

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
        {activeTab === 'picture' && <TabContent title="写真描写トレーニング" />}
        {activeTab === 'ai_tutor' && <TabContent title="AI講師と英会話" />}
      </div>
    </aside>
  );
};

export default ActivityPanel;