'use client';

import React, { use, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getBook, getChapterMetadata, getChapterComponent } from '@/lib/mdx';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useActiveSection } from '@/hooks/useActiveSection';
import { ChapterMetadata } from '@/types/textbook';

// Layout & Navigation Imports
import { ReaderLayout } from '@/components/layout/ReaderLayout';
import { ChapterLayout } from '@/components/layout/ChapterLayout';
import { SidebarNavigation } from '@/components/navigation/SidebarNavigation';

interface ReaderPageProps {
  params: Promise<{ classId: string; chapterId: string }>;
}

export default function ReaderPage({ params }: ReaderPageProps) {
  const resolvedParams = use(params);
  const { classId, chapterId } = resolvedParams;

  const book = getBook(classId);
  const [chapterMetadata, setChapterMetadata] = useState<ChapterMetadata | null>(null);

  // Reading Scroll Progress State
  const [scrollProgress, setScrollProgress] = useState(0);

  // Completed Chapters LocalStorage State
  const [completedChapters, setCompletedChapters] = useLocalStorage<string[]>(
    `completed-chapters-${classId}`,
    []
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    // Fetch metadata dynamically
    getChapterMetadata(classId, chapterId)
      .then(setChapterMetadata)
      .catch((err) => console.error("Error loading chapter metadata:", err));

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const scrolled = (window.scrollY / totalScroll) * 100;
        setScrollProgress(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [classId, chapterId]);

  // Active section tracking (scroll spy)
  const sectionIds = useMemo(() => {
    return chapterMetadata && chapterMetadata.sections ? chapterMetadata.sections.map((sect) => sect.id) : [];
  }, [chapterMetadata]);

  const activeSectionId = useActiveSection(sectionIds);

  const chapter = useMemo(() => {
    if (!chapterMetadata) return null;
    return {
      id: chapterId,
      number: chapterMetadata.chapterNumber, // Map metadata chapterNumber to number
      ...chapterMetadata,
      summary: [], // summary is now embedded in index.mdx or handled dynamically
      sections: chapterMetadata.sections || [],
    };
  }, [chapterId, chapterMetadata]);

  const ChapterContent = useMemo(() => {
    return getChapterComponent(classId, chapterId);
  }, [classId, chapterId]);

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground justify-center items-center p-6 text-center">
        <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-heading font-black">Book Not Found</h2>
        <Link href="/books" passHref className="mt-6">
          <Button variant="primary">Back to Catalog</Button>
        </Link>
      </div>
    );
  }

  if (!chapterMetadata || !chapter) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground justify-center items-center p-6 text-center">
        <BookOpen className="w-12 h-12 text-muted-foreground mb-4 animate-pulse" />
        <h2 className="text-2xl font-heading font-black">Loading Chapter...</h2>
      </div>
    );
  }

  // Chapter completion toggle
  const isChapterCompleted = completedChapters.includes(chapterId);
  const toggleChapterCompletion = () => {
    if (isChapterCompleted) {
      setCompletedChapters(completedChapters.filter((id) => id !== chapterId));
    } else {
      setCompletedChapters([...completedChapters, chapterId]);
    }
  };

  // Pagination indexing
  const currentChapterIdx = book.chapters.findIndex((c) => c.id === chapterId);
  const prevChapter = currentChapterIdx > 0 ? book.chapters[currentChapterIdx - 1] : null;
  const nextChapter = currentChapterIdx < book.chapters.length - 1 ? book.chapters[currentChapterIdx + 1] : null;

  return (
    <ReaderLayout
      scrollProgress={scrollProgress}
      sidebar={
        <SidebarNavigation
          book={book}
          chapter={chapter}
          completedChapters={completedChapters}
          activeSectionId={activeSectionId}
          isChapterCompleted={isChapterCompleted}
          onToggleCompletion={toggleChapterCompletion}
        />
      }
    >
      <ChapterLayout
        book={book}
        chapter={chapter}
        isChapterCompleted={isChapterCompleted}
        onToggleCompletion={toggleChapterCompletion}
        prevChapter={prevChapter}
        nextChapter={nextChapter}
        mounted={mounted}
      >
        <div className="prose dark:prose-invert max-w-none">
          <ChapterContent />
        </div>
      </ChapterLayout>
    </ReaderLayout>
  );
}
