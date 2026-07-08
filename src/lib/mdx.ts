import dynamic from 'next/dynamic';
import { Book, ChapterMetadata, ChapterRef } from '@/types/textbook';
import { BOOKS } from '@/config/books';

export function getBooks(): Book[] {
  return BOOKS;
}

export function getAllBooks(): Book[] {
  return BOOKS;
}

export function getBook(classId: string): Book | undefined {
  return BOOKS.find((b) => b.classId === classId);
}

export function getBookMetadata(classId: string): Omit<Book, 'chapters'> | undefined {
  const book = getBook(classId);
  if (!book) return undefined;
  const { chapters, ...metadata } = book;
  return metadata;
}

export function getAllChapters(classId: string): ChapterRef[] {
  const book = getBook(classId);
  return book ? book.chapters : [];
}

export async function getChapterMetadata(classId: string, chapterId: string): Promise<ChapterMetadata> {
  // Normalize "class-1" -> "class1", "chapter-1" -> "chapter1" to match folders on disk
  const folderName = classId.replace(/-/g, '');
  const chapterFolderName = chapterId.replace(/-/g, '');
  const meta = await import(`@/content/${folderName}/${chapterFolderName}/meta.json`);
  return meta.default || meta;
}

export function getChapterComponent(classId: string, chapterId: string) {
  // Next.js dynamic lazy loader for parsing compiled MDX elements
  const folderName = classId.replace(/-/g, '');
  const chapterFolderName = chapterId.replace(/-/g, '');
  return dynamic(() => import(`@/content/${folderName}/${chapterFolderName}/index.mdx`), {
    ssr: true,
  });
}

export async function getChapter(classId: string, chapterId: string) {
  const metadata = await getChapterMetadata(classId, chapterId);
  const Component = getChapterComponent(classId, chapterId);
  return {
    metadata,
    Component,
  };
}
