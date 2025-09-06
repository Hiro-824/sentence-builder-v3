import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Lesson {
  slug: string;
  title: string;
  order: number;
  content: string;
}

const lessonsDirectory = path.join(process.cwd(), 'lessons');

export function getSortedLessonsData(): Lesson[] {
  const fileNames = fs.readdirSync(lessonsDirectory);
  
  const allLessonsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');

    const fullPath = path.join(lessonsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
      slug,
      title: matterResult.data.title || 'Untitled Lesson',
      order: matterResult.data.order || 999,
      content: matterResult.content,
    };
  });

  return allLessonsData.sort((a, b) => (a.order > b.order ? 1 : -1));
}