import dynamic from 'next/dynamic';
import { Book, ChapterMetadata } from '@/types/textbook';
import { BOOKS } from '@/config/books';

export function getBooks(): Book[] {
  return BOOKS;
}

export function getBook(classId: string): Book | undefined {
  return BOOKS.find((b) => b.classId === classId);
}

export async function getChapterMetadata(classId: string, chapterId: string): Promise<ChapterMetadata> {
  // Normalize "class-1" -> "class1", "chapter-1" -> "chapter1" to match folders on disk
  const folderName = classId.replace(/-/g, '');
  const chapterFolderName = chapterId.replace(/-/g, '');
  const meta = await import(`@/content/${folderName}/${chapterFolderName}/meta.json`);
  return meta.default || meta;
}

export function getChapterComponent(classId: string, chapterId: string) {
  // Normalize "class-1" -> "class1", "chapter-1" -> "chapter1" to match folders on disk
  const folderName = classId.replace(/-/g, '');
  const chapterFolderName = chapterId.replace(/-/g, '');
  return dynamic(() => import(`@/content/${folderName}/${chapterFolderName}/index.mdx`), {
    ssr: true,
  });
}
