'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, ChapterRef, ChapterMetadata } from '@/types/textbook';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getBook, getChapterMetadata } from '@/lib/mdx';

interface BookContextType {
  currentBook: Book | null;
  currentChapter: (ChapterMetadata & { id: string }) | null;
  completedChapters: string[];
  progressPercentage: number;
  navigation: {
    prev: ChapterRef | null;
    next: ChapterRef | null;
    backUrl: string;
  } | null;
  isLoading: boolean;
  toggleChapterCompletion: (chapterId: string) => void;
  isChapterCompleted: (chapterId: string) => boolean;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({
  classId,
  chapterId,
  children,
}: {
  classId: string;
  chapterId?: string;
  children: React.ReactNode;
}) {
  const book = getBook(classId) || null;
  const [chapterMetadata, setChapterMetadata] = useState<ChapterMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // LocalStorage state for completed status tracking
  const [completedChapters, setCompletedChapters] = useLocalStorage<string[]>(
    classId ? `completed-chapters-${classId}` : 'completed-chapters-default',
    []
  );

  useEffect(() => {
    if (classId && chapterId) {
      setIsLoading(true);
      getChapterMetadata(classId, chapterId)
        .then((meta) => {
          setChapterMetadata(meta);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Error loading book provider metadata:', err);
          setIsLoading(false);
        });
    } else {
      setChapterMetadata(null);
      setIsLoading(false);
    }
  }, [classId, chapterId]);

  const toggleChapterCompletion = (cId: string) => {
    if (completedChapters.includes(cId)) {
      setCompletedChapters(completedChapters.filter((id) => id !== cId));
    } else {
      setCompletedChapters([...completedChapters, cId]);
    }
  };

  const isChapterCompleted = (cId: string) => completedChapters.includes(cId);

  // Reconstruct dynamic chapter
  const currentChapter = React.useMemo(() => {
    if (!chapterId || !chapterMetadata) return null;
    return {
      id: chapterId,
      ...chapterMetadata,
    };
  }, [chapterId, chapterMetadata]);

  // Compute progress percentage
  const progressPercentage = React.useMemo(() => {
    if (!book || book.chapters.length === 0) return 0;
    const completedInBook = book.chapters.filter((c) => completedChapters.includes(c.id));
    return parseFloat(((completedInBook.length / book.chapters.length) * 100).toFixed(1));
  }, [book, completedChapters]);

  // Compute navigation endpoints
  const navigation = React.useMemo(() => {
    if (!book || !chapterId) return null;
    const currentIdx = book.chapters.findIndex((c) => c.id === chapterId);
    return {
      prev: currentIdx > 0 ? book.chapters[currentIdx - 1] : null,
      next: currentIdx < book.chapters.length - 1 ? book.chapters[currentIdx + 1] : null,
      backUrl: `/books/${classId}`,
    };
  }, [book, classId, chapterId]);

  return (
    <BookContext.Provider
      value={{
        currentBook: book,
        currentChapter,
        completedChapters,
        progressPercentage,
        navigation,
        isLoading,
        toggleChapterCompletion,
        isChapterCompleted,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useBook() {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBook must be used within a BookProvider');
  }
  return context;
}
