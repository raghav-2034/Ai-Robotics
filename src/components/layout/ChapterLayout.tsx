'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, CircleCheck } from 'lucide-react';
import { Book, ChapterRef } from '@/types/textbook';
import { ChapterHero } from '@/components/textbook/ChapterHero';
import { LearningObjectiveCard } from '@/components/cards/LearningObjectiveCard';
import { SummaryCard } from '@/components/cards/SummaryCard';
import { Button } from '@/components/ui/button';

interface ChapterLayoutProps {
  book: Book;
  chapter: any;
  isChapterCompleted: boolean;
  onToggleCompletion: () => void;
  prevChapter: ChapterRef | null;
  nextChapter: ChapterRef | null;
  mounted: boolean;
  children: React.ReactNode;
}

export function ChapterLayout({
  book,
  chapter,
  isChapterCompleted,
  onToggleCompletion,
  prevChapter,
  nextChapter,
  mounted,
  children,
}: ChapterLayoutProps) {
  return (
    <div className="w-full space-y-8 print:space-y-0">
      {/* Reading Flow Section */}
      <div className="max-w-4xl mx-auto space-y-8 print:space-y-0">
        
        {/* Content sections child list */}
        <div className="space-y-8 print:space-y-0">{children}</div>

        {/* Mobile Completion Checkbox */}
        {mounted && (
          <div className="lg:hidden py-4 border-t border-slate-200 no-print">
            <button
              onClick={onToggleCompletion}
              className={`w-full flex items-center justify-center gap-2 text-xs font-heading font-extrabold uppercase border rounded-2xl py-3.5 transition-all cursor-pointer ${
                isChapterCompleted
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                  : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              {isChapterCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Completed Chapter
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  Mark Chapter Completed
                </>
              )}
            </button>
          </div>
        )}

        {/* Reader Pagination Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t-2 border-slate-200/80 no-print">
          {prevChapter ? (
            <Link href={`/books/${book.classId}/${prevChapter.id}`} passHref>
              <Button variant="outline" className="gap-2 cursor-pointer font-black text-xs rounded-2xl">
                <ArrowLeft className="w-4 h-4" />
                Prev: {prevChapter.title}
              </Button>
            </Link>
          ) : (
            <div />
          )}

          {nextChapter ? (
            <Link href={`/books/${book.classId}/${nextChapter.id}`} passHref>
              <Button variant="primary" className="gap-2 cursor-pointer font-black text-xs rounded-2xl">
                Next: {nextChapter.title}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <Link href={`/books/${book.classId}`} passHref>
              <Button variant="secondary" className="gap-2 cursor-pointer font-black text-xs rounded-2xl">
                Finished book! Detail Page
                <CircleCheck className="w-4 h-4 text-white" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
