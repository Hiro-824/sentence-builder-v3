"use client";

import { useEffect, useState } from 'react';
import LessonViewer from '../components/lesson-viewer';

export const LessonsTabContent = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        fetch("/lessons/test.md")
            .then(res => res.text())
            .then(setContent);
    }, []);
    
    return (
        <div>
            <LessonViewer content={content} />
        </div>
    );
};