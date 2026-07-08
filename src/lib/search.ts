import { Book, ChapterMetadata } from '@/types/textbook';

export interface SearchIndexEntry {
  bookId: string;
  classId: string;
  chapterId: string;
  title: string;
  content: string;
  type: 'chapter' | 'section' | 'card';
  keywords: string[];
}

// Global in-memory search index placeholder
let searchIndex: SearchIndexEntry[] = [];

/**
 * Indexes a textbook to prepare for catalog searches.
 * Placeholder implementation for future development in Phase 2.
 */
export function indexBook(book: Book): void {
  // Placeholder: Traverse chapters and build index records
  console.log(`[Search Indexer Placeholder] Indexing book: ${book.title}`);
}

/**
 * Indexes a specific chapter's text content and metadata.
 * Placeholder implementation for future development in Phase 2.
 */
export function indexChapter(
  bookId: string,
  classId: string,
  chapterId: string,
  meta: ChapterMetadata,
  contentHtml: string
): void {
  const entry: SearchIndexEntry = {
    bookId,
    classId,
    chapterId,
    title: meta.title,
    content: contentHtml.replace(/<[^>]*>/g, ''), // Strip tags for index text
    type: 'chapter',
    keywords: meta.keywords,
  };
  
  searchIndex.push(entry);
  console.log(`[Search Indexer Placeholder] Indexing chapter: ${meta.title}`);
}

/**
 * Queries the indexing record and returns matching entries.
 * Placeholder implementation for future development in Phase 2.
 */
export function searchBooks(query: string): SearchIndexEntry[] {
  if (!query) return [];
  const normalizedQuery = query.toLowerCase();
  
  return searchIndex.filter(
    (entry) =>
      entry.title.toLowerCase().includes(normalizedQuery) ||
      entry.content.toLowerCase().includes(normalizedQuery) ||
      entry.keywords.some((k) => k.toLowerCase().includes(normalizedQuery))
  );
}

/**
 * Resets the in-memory search index.
 */
export function clearSearchIndex(): void {
  searchIndex = [];
}
