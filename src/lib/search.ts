import { Book, ChapterMetadata } from '@/types/textbook';

export interface BookIndexEntry {
  bookId: string;
  classId: string;
  title: string;
  description: string;
  subject: string;
  grade: number;
  keywords: string[];
}

export interface ChapterIndexEntry {
  bookId: string;
  classId: string;
  chapterId: string;
  chapterNumber: number;
  title: string;
  description: string;
  learningObjectives: string[];
  keywords: string[];
}

export interface ContentIndexEntry {
  bookId: string;
  classId: string;
  chapterId: string;
  sectionId?: string;
  headingText?: string;
  content: string; // Plaintext content from MDX body
  elementType: 'paragraph' | 'card' | 'heading';
}

export interface KeywordIndexEntry {
  keyword: string;
  occurrences: {
    bookId: string;
    classId: string;
    chapterId: string;
    type: 'metadata' | 'content';
    score: number; // Relevance score for keyword matching
  }[];
}

// In-Memory Search Index Foundations
export const bookIndex: Map<string, BookIndexEntry> = new Map();
export const chapterIndex: Map<string, ChapterIndexEntry> = new Map();
export const contentIndex: ContentIndexEntry[] = [];
export const keywordIndex: Map<string, KeywordIndexEntry> = new Map();

/**
 * Builds indexing records for a book's metadata details.
 */
export function indexBook(book: Book): void {
  const entry: BookIndexEntry = {
    bookId: book.id,
    classId: book.classId,
    title: book.title,
    description: book.description,
    subject: book.subject,
    grade: book.grade,
    keywords: [book.subject, `class ${book.grade}`, `grade ${book.grade}`],
  };

  bookIndex.set(book.id, entry);
  
  // Register initial keywords
  entry.keywords.forEach((word) => {
    registerKeywordOccurrence(word, book.id, book.classId, '', 'metadata', 1.0);
  });

  console.log(`[Search Indexer] Indexed Book Metadata: ${book.title}`);
}

/**
 * Builds indexing records for a chapter's metadata and sections.
 */
export function indexChapter(
  bookId: string,
  classId: string,
  chapterId: string,
  meta: ChapterMetadata,
  contentHtml: string = ''
): void {
  const entry: ChapterIndexEntry = {
    bookId,
    classId,
    chapterId,
    chapterNumber: meta.chapterNumber,
    title: meta.title,
    description: meta.title, // Default to title for summary
    learningObjectives: meta.learningObjectives,
    keywords: meta.keywords || [],
  };

  chapterIndex.set(chapterId, entry);

  // Index keywords in metadata
  entry.keywords.forEach((word) => {
    registerKeywordOccurrence(word, bookId, classId, chapterId, 'metadata', 1.5);
  });

  // Extract content strings if HTML is supplied
  if (contentHtml) {
    const textContent = contentHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (textContent) {
      contentIndex.push({
        bookId,
        classId,
        chapterId,
        content: textContent,
        elementType: 'paragraph',
      });

      // Split text into tokens and register index weights
      const words = textContent.toLowerCase().split(/\W+/).filter(w => w.length > 3);
      const frequencies = words.reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      Object.entries(frequencies).forEach(([word, count]) => {
        registerKeywordOccurrence(word, bookId, classId, chapterId, 'content', count);
      });
    }
  }

  console.log(`[Search Indexer] Indexed Chapter Metadata: ${meta.title}`);
}

/**
 * Registers a keyword mapping inside the inverted keyword index.
 */
function registerKeywordOccurrence(
  keyword: string,
  bookId: string,
  classId: string,
  chapterId: string,
  type: 'metadata' | 'content',
  score: number
): void {
  const normalized = keyword.toLowerCase().trim();
  if (!normalized) return;

  let entry = keywordIndex.get(normalized);
  if (!entry) {
    entry = { keyword: normalized, occurrences: [] };
    keywordIndex.set(normalized, entry);
  }

  const existing = entry.occurrences.find(
    (occ) => occ.bookId === bookId && occ.chapterId === chapterId && occ.type === type
  );

  if (existing) {
    existing.score += score;
  } else {
    entry.occurrences.push({
      bookId,
      classId,
      chapterId,
      type,
      score,
    });
  }
}

/**
 * Resets all search index databases.
 */
export function clearSearchIndexes(): void {
  bookIndex.clear();
  chapterIndex.clear();
  contentIndex.length = 0;
  keywordIndex.clear();
}
