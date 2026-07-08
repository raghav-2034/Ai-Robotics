'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getChapterComponent } from '@/lib/mdx';
import { useAutoTOC } from '@/hooks/useAutoTOC';
import { useAnalytics } from '@/hooks/useAnalytics';

// Layout & Navigation Imports
import { ReaderLayout } from '@/components/layout/ReaderLayout';
import { ChapterLayout } from '@/components/layout/ChapterLayout';
import { SidebarNavigation } from '@/components/navigation/SidebarNavigation';
import { BookProvider, useBook } from '@/components/layout/BookProvider';

function ReaderContent({ classId, chapterId }: { classId: string; chapterId: string }) {
  const {
    currentBook,
    currentChapter,
    completedChapters,
    navigation,
    isLoading,
    toggleChapterCompletion,
    isChapterCompleted,
  } = useBook();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  const analytics = useAnalytics();

  // Scroll Progress and mounting check
  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const scrolled = (window.scrollY / totalScroll) * 100;
        setScrollProgress(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track chapter open events
  useEffect(() => {
    if (currentBook && currentChapter) {
      analytics.trackChapterOpened(currentBook.classId, currentChapter.id, currentChapter.title);
      analytics.trackReadingStarted(currentBook.classId, currentChapter.id);
    }
  }, [currentBook, currentChapter]);

  // Track reading completed when completed status triggers
  const completed = currentChapter ? isChapterCompleted(currentChapter.id) : false;
  useEffect(() => {
    if (completed && currentBook && currentChapter) {
      analytics.trackReadingCompleted(currentBook.classId, currentChapter.id);
    }
  }, [completed, currentBook, currentChapter]);

  // Auto TOC heading parser
  const { headings: dynamicHeadings, activeId: dynamicActiveId } = useAutoTOC(chapterId);

  const ChapterContent = useMemo(() => {
    return getChapterComponent(classId, chapterId);
  }, [classId, chapterId]);

  if (!currentBook) {
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

  if (isLoading || !currentChapter) {
    return <ReaderSkeleton />;
  }

  return (
    <ReaderLayout
      scrollProgress={scrollProgress}
      sidebar={
        <SidebarNavigation
          book={currentBook}
          chapter={currentChapter}
          completedChapters={completedChapters}
          activeSectionId={dynamicActiveId}
          isChapterCompleted={completed}
          onToggleCompletion={() => toggleChapterCompletion(chapterId)}
          dynamicHeadings={dynamicHeadings}
        />
      }
    >
      <ChapterLayout
        book={currentBook}
        chapter={{
          ...currentChapter,
          number: currentChapter.chapterNumber,
          sections: dynamicHeadings,
        }}
        isChapterCompleted={completed}
        onToggleCompletion={() => toggleChapterCompletion(chapterId)}
        prevChapter={navigation?.prev || null}
        nextChapter={navigation?.next || null}
        mounted={mounted}
      >
        <div data-toc-content className="prose dark:prose-invert max-w-none">
          <ChapterContent />
        </div>
      </ChapterLayout>
    </ReaderLayout>
  );
}

export function ReaderClient({ classId, chapterId }: { classId: string; chapterId: string }) {
  return (
    <BookProvider classId={classId} chapterId={chapterId}>
      <ReaderContent classId={classId} chapterId={chapterId} />
    </BookProvider>
  );
}

function ReaderSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground animate-pulse">
      {/* Skeleton Navbar header */}
      <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
        <div className="w-24 h-4 bg-muted rounded" />
        <div className="w-32 h-8 bg-muted rounded-lg" />
      </div>
      {/* Skeleton layout grid container */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Skeleton Sidebar Column */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6">
          <div className="border border-border/80 bg-card rounded-2xl p-5 space-y-4">
            <div className="w-20 h-3 bg-muted rounded" />
            <div className="w-full h-5 bg-muted rounded" />
            <hr className="border-border/60" />
            <div className="space-y-2">
              <div className="w-full h-8 bg-muted rounded-lg" />
              <div className="w-full h-8 bg-muted rounded-lg" />
              <div className="w-full h-8 bg-muted rounded-lg" />
            </div>
          </div>
        </aside>
        {/* Skeleton Content Column */}
        <main className="col-span-1 lg:col-span-3 space-y-6">
          <div className="border border-border/50 bg-card rounded-2xl overflow-hidden shadow-sm">
            <div className="h-48 bg-muted animate-pulse" />
            <div className="p-6 md:p-10 space-y-4">
              <div className="w-1/3 h-6 bg-muted rounded" />
              <div className="w-full h-4 bg-muted rounded" />
              <div className="w-full h-4 bg-muted rounded" />
              <div className="w-2/3 h-4 bg-muted rounded" />
              <div className="h-28 bg-muted rounded-xl mt-6 animate-pulse" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
