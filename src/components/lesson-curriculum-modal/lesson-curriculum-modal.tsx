"use client";

import { LESSON_CURRICULUM } from "@/data/lesson-curriculum";
import styles from "./lesson-curriculum-modal.module.css";

interface LessonCurriculumModalProps {
  isOpen: boolean;
  completedLessonIds: string[];
  activeLessonId: string;
  onClose: () => void;
  onSelectLesson: (lessonId: string) => void;
}

export default function LessonCurriculumModal({
  isOpen,
  completedLessonIds,
  activeLessonId,
  onClose,
  onSelectLesson,
}: LessonCurriculumModalProps) {
  if (!isOpen) return null;
  const orderedLessons = LESSON_CURRICULUM.flatMap((unit) => unit.lessons);

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="curriculum-title" onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <p>Curriculum</p>
            <h2 id="curriculum-title">レッスン一覧</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="閉じる">×</button>
        </div>

        <div className={styles.units}>
          {LESSON_CURRICULUM.map((unit) => {
            const completedCount = unit.lessons.filter((lesson) => completedLessonIds.includes(lesson.id)).length;
            return (
              <section className={styles.unit} key={unit.id}>
                <div className={styles.unitHeader}>
                  <div>
                    <span>Unit {unit.order}</span>
                    <h3>{unit.title}</h3>
                    <p>{unit.description}</p>
                  </div>
                  <strong>{completedCount} / {unit.lessons.length}</strong>
                </div>
                <div className={styles.unitProgress}>
                  <span style={{ width: `${(completedCount / unit.lessons.length) * 100}%` }} />
                </div>

                <div className={styles.lessons}>
                  {unit.lessons.map((lesson) => {
                    const completed = completedLessonIds.includes(lesson.id);
                    const active = lesson.id === activeLessonId;
                    const lessonIndex = orderedLessons.findIndex((item) => item.id === lesson.id);
                    const unlocked =
                      lessonIndex === 0
                      || completedLessonIds.includes(orderedLessons[lessonIndex - 1].id);
                    return (
                      <button
                        type="button"
                        key={lesson.id}
                        disabled={!unlocked}
                        className={`${styles.lesson} ${active ? styles.activeLesson : ""}`}
                        onClick={() => onSelectLesson(lesson.id)}
                      >
                        <span className={styles.lessonNumber}>
                          {completed ? "✓" : lesson.order}
                        </span>
                        <span className={styles.lessonText}>
                          <strong>{lesson.title}</strong>
                          <small>{lesson.description}</small>
                        </span>
                        <span className={styles.lessonStatus}>
                          {completed ? "完了" : unlocked ? "学習する" : "未解放"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
