"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './lesson-viewer.module.css';
import MarkdownBlockRenderer from './markdown-block-renderer';

interface LessonViewerProps {
  content: string;
}

const LessonViewer = ({ content }: LessonViewerProps) => {
  return (
    <div className={styles.viewer}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { className, children, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            if (match && match[1] === 'sentence') {
              return <MarkdownBlockRenderer jsonString={String(children).replace(/\n$/, '')} />;
            }
            return <code className={className} {...rest}>{children}</code>;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default LessonViewer;