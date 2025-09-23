"use client";

import { useState } from 'react';
import LessonViewer from '../components/lesson-viewer';
import { Lesson } from '@/utils/lessons';
import styles from './lessons.module.css';

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={`${styles.tocToggleIcon} ${!isOpen ? styles.closed : ''}`}
    >
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);


interface LessonsTabContentProps {
  lessons: Lesson[];
}

export const LessonsTabContent = ({ lessons }: LessonsTabContentProps) => {
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [isTocOpen, setIsTocOpen] = useState(true);

    if (!lessons || lessons.length === 0) {
        return <div className={styles.container}>No lessons found.</div>;
    }

    const currentLesson = lessons[currentLessonIndex];
    
    const toggleToc = () => {
        setIsTocOpen(prev => !prev);
    };

    const goToNextLesson = () => {
        setCurrentLessonIndex(prev => Math.min(prev + 1, lessons.length - 1));
    };

    const goToPrevLesson = () => {
        setCurrentLessonIndex(prev => Math.max(prev - 1, 0));
    };

    const goToLesson = (index: number) => {
        setCurrentLessonIndex(index);
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.tableOfContents} ${!isTocOpen ? styles.tocCollapsed : ''}`}>
                <div className={styles.tocHeader} onClick={toggleToc}>
                    <h3 className={styles.tocTitle}>目次</h3>
                    <ChevronIcon isOpen={isTocOpen} />
                </div>
                <ul className={`${styles.tocList} ${!isTocOpen ? styles.tocListClosed : ''}`}>
                    {lessons.map((lesson, index) => (
                        <li
                            key={lesson.slug}
                            className={`${styles.tocItem} ${index === currentLessonIndex ? styles.active : ''}`}
                            onClick={() => goToLesson(index)}
                        >
                            {lesson.title}
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className={styles.lessonContent}>
                <LessonViewer content={currentLesson.content} />
            </div>

            <div className={styles.navigation}>
                <button 
                    onClick={goToPrevLesson} 
                    disabled={currentLessonIndex === 0}
                    className={styles.navButton}
                >
                    &larr; 前へ
                </button>
                <span className={styles.navCounter}>
                    {currentLessonIndex + 1} / {lessons.length}
                </span>
                <button 
                    onClick={goToNextLesson} 
                    disabled={currentLessonIndex === lessons.length - 1}
                    className={styles.navButton}
                >
                    次へ &rarr;
                </button>
            </div>
        </div>
    );
};
