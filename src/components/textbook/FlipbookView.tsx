'use client';

import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Chapter } from '@/types/textbook';
import { Button } from '@/components/ui/button';

// Dynamically import react-pageflip to avoid SSR window issues
const HTMLFlipBook = dynamic(
  () => import('react-pageflip').then((mod) => mod.default),
  { ssr: false }
);

import { getChapterComponent } from '@/lib/mdx';

interface FlipbookViewProps {
  chapter: any;
}

export function FlipbookView({ chapter }: FlipbookViewProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flipBookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const ChapterContent = getChapterComponent(chapter.classId, chapter.id);

  // Split chapter sections into digestible "pages" for the flipbook
  const pages: React.ReactNode[] = [];

  // Page 1: Chapter Cover
  pages.push(
    <div className="h-full bg-gradient-to-br from-primary to-indigo-700 p-8 flex flex-col justify-between text-white shadow-inner">
      <div className="border border-white/20 p-4 rounded-xl backdrop-blur-sm bg-white/5">
        <span className="text-xs uppercase tracking-wider text-accent font-bold">Interactive Flipbook</span>
      </div>
      
      <div className="space-y-4">
        <span className="text-5xl font-heading font-black opacity-30">CH {chapter.chapterNumber}</span>
        <h2 className="text-2xl md:text-3xl font-heading font-black tracking-tight leading-tight">
          {chapter.title}
        </h2>
        <p className="text-sm text-white/80 leading-relaxed">
          Class {chapter.grade || '1'} Coursework
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs font-semibold opacity-70">
        <BookOpen className="w-4 h-4" />
        <span>Open to Turn Page</span>
      </div>
    </div>
  );

  // Page 2: Learning Objectives
  pages.push(
    <div className="h-full bg-card p-8 flex flex-col justify-between text-foreground border-r border-border shadow-inner">
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-bold text-primary border-b border-border pb-2">
          Learning Objectives
        </h3>
        <p className="text-xs text-muted-foreground">
          What we will discover in this chapter:
        </p>
        <ul className="space-y-3">
          {chapter.learningObjectives.map((obj: string, idx: number) => (
            <li key={idx} className="flex gap-2 text-xs md:text-sm font-medium text-foreground/90">
              <span className="text-primary font-bold shrink-0">•</span>
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-right text-[10px] text-muted-foreground">Page 1</div>
    </div>
  );

  // Page 3: Dynamic MDX Content scrollable page
  pages.push(
    <div key="mdx-content" className="h-full bg-card p-8 flex flex-col justify-between text-foreground border-r border-border shadow-inner">
      <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px] pr-2 scrollbar-thin">
        <span className="text-[10px] text-primary uppercase font-bold tracking-wider">
          Chapter {chapter.chapterNumber} Contents
        </span>
        <h3 className="text-lg font-heading font-bold text-foreground border-b border-border pb-2">
          Lesson Text & Activities
        </h3>
        <div className="prose dark:prose-invert text-xs md:text-sm leading-relaxed font-medium">
          <ChapterContent />
        </div>
      </div>
      <div className="text-right text-[10px] text-muted-foreground">Page 2</div>
    </div>
  );

  // Final page: Summary
  const summaryPoints = chapter.summary && chapter.summary.length > 0
    ? chapter.summary
    : [
        "Congratulations on reading this chapter!",
        "Review the key definitions and try the mini-project activity.",
        "When you are ready, advance to the next chapter in your textbook!"
      ];

  pages.push(
    <div className="h-full bg-gradient-to-br from-indigo-900 to-slate-900 p-8 flex flex-col justify-between text-white shadow-inner">
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-bold text-accent border-b border-white/10 pb-2">
          Chapter Summary
        </h3>
        <ul className="space-y-2.5">
          {summaryPoints.map((point: string, idx: number) => (
            <li key={idx} className="flex gap-2 text-xs text-white/80 leading-relaxed">
              <span className="text-accent font-bold shrink-0">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-right text-[10px] text-white/50">Page 3</div>
    </div>
  );

  const handlePrev = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const handleNext = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const onPage = (e: { data: number }) => {
    setCurrentPage(e.data);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onInit = (e: any) => {
    if (e && e.object && typeof e.object.getPageCount === 'function') {
      setTotalPages(e.object.getPageCount());
    } else if (e && e.data && typeof e.data.getPageCount === 'function') {
      setTotalPages(e.data.getPageCount());
    } else if (flipBookRef.current && typeof flipBookRef.current.pageFlip === 'function') {
      setTotalPages(flipBookRef.current.pageFlip().getPageCount());
    }
  };

  if (!isMounted) return null;

  return (
    <div className="flex flex-col items-center gap-6 py-6 max-w-5xl mx-auto">
      {/* Flipbook Container */}
      <div className="relative w-full flex justify-center bg-muted/40 dark:bg-muted/10 border border-border/60 rounded-3xl p-6 md:p-10 shadow-inner overflow-hidden">
        {/* Dynamic page-flip component */}
        {HTMLFlipBook ? (
          <HTMLFlipBook
            width={480}
            height={600}
            size="stretch"
            minWidth={320}
            maxWidth={540}
            minHeight={400}
            maxHeight={700}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={onPage}
            onInit={onInit}
            ref={flipBookRef}
            className="shadow-2xl rounded-lg"
            style={{}}
            startPage={0}
            drawShadow={true}
            flippingTime={1000}
            usePortrait={true}
            startZIndex={0}
            autoSize={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
          >
            {pages.map((pageContent, idx) => (
              <div key={idx} className="bg-card w-full h-full shadow-lg">
                {pageContent}
              </div>
            ))}
          </HTMLFlipBook>
        ) : (
          <div className="text-muted-foreground py-20 text-center font-heading">
            Loading interactive flipbook...
          </div>
        )}
      </div>

      {/* Control Strip */}
      <div className="flex items-center gap-4 bg-card px-6 py-2.5 rounded-full border border-border shadow-sm no-print">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="rounded-full w-8 h-8 p-0 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <span className="text-xs md:text-sm font-heading font-bold text-foreground">
          Page {currentPage + 1} of {totalPages || pages.length}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={currentPage >= (totalPages || pages.length) - 1}
          className="rounded-full w-8 h-8 p-0 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
