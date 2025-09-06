"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './lesson-viewer.module.css';

interface LessonViewerProps {
  content: string;
}

const LessonViewer = ({ content }: LessonViewerProps) => {
  return (
    <div className={styles.viewer}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default LessonViewer;