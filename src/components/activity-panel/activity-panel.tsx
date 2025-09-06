"use client";

import { useState } from 'react';
import styles from './activity-panel.module.css';
import { BookIcon, ImageIcon, AiIcon } from '@/components/activity-panel/icons/icons';
import { LessonsTabContent } from './tabs/lessons';

// Tab Definitions
const TABS = [
  { id: 'lessons', label: 'テキスト教材', icon: <BookIcon /> },
  { id: 'picture', label: '画像の説明', icon: <ImageIcon /> },
  { id: 'ai_tutor', label: 'AI先生', icon: <AiIcon /> },
];

const TabContent = ({ title }: { title: string }) => (
  <div className={styles.tabContent}>
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.placeholderText}>
      Coming Soon...
    </p>
  </div>
);

const ActivityPanel = () => {
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
        {activeTab === 'lessons' && <LessonsTabContent />}
        {activeTab === 'picture' && <TabContent title="Picture Description Practice" />}
        {activeTab === 'ai_tutor' && <TabContent title="AI English Tutor" />}
      </div>
    </aside>
  );
};

export default ActivityPanel;