'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Circle, FileText, Printer } from 'lucide-react';
import { Book } from '@/types/textbook';
import { TableOfContents } from '@/components/textbook/TableOfContents';

interface SidebarNavigationProps {
  book: Book;
  chapter: any;
  completedChapters: string[];
  activeSectionId?: string;
  isChapterCompleted: boolean;
  onToggleCompletion: () => void;
}

export function SidebarNavigation({
  book,
  chapter,
  completedChapters,
  activeSectionId,
  isChapterCompleted,
  onToggleCompletion,
}: SidebarNavigationProps) {
  const chaptersForTOC = React.useMemo(() => {
    return book.chapters.map((c) => {
      if (c.id === chapter.id) {
        return {
          ...c,
          sections: chapter.sections || [],
        };
      }
      return c;
    });
  }, [book.chapters, chapter.id, chapter.sections]);

  return (
    <div className="sticky top-20 space-y-6 border border-border/80 bg-card rounded-2xl p-5 shadow-sm max-h-[calc(100vh-120px)] overflow-y-auto no-print">
      {/* Book Info Block */}
      <div className="space-y-1 pb-4 border-b border-border/60">
        <span className="text-[9px] font-extrabold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
          Class {book.grade} Edition
        </span>
        <h3 className="font-heading font-black text-sm text-foreground leading-tight line-clamp-2 pt-1">
          {book.title}
        </h3>
      </div>

      {/* Table of Contents */}
      <TableOfContents
        chapters={chaptersForTOC}
        classId={book.classId}
        completedChapters={completedChapters}
        activeChapterId={chapter.id}
        activeSectionId={activeSectionId}
        compact={true}
      />

      {/* Completion Trigger */}
      <div className="pt-4 border-t border-border/60">
        <button
          onClick={onToggleCompletion}
          className={`w-full flex items-center justify-center gap-2 text-xs font-heading font-extrabold uppercase border rounded-xl py-2.5 transition-all cursor-pointer ${
            isChapterCompleted
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
              : 'border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
        >
          {isChapterCompleted ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Completed
            </>
          ) : (
            <>
              <Circle className="w-4 h-4" />
              Mark Completed
            </>
          )}
        </button>
      </div>

      {/* Print & Flipbook Shortcuts */}
      <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] font-heading font-bold">
        <Link href={`/books/${book.classId}/${chapter.id}/flipbook`} passHref className="w-full">
          <button className="w-full flex items-center justify-center gap-1 py-2 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer">
            <FileText className="w-3.5 h-3.5 text-secondary" />
            Flipbook
          </button>
        </Link>
        <Link href={`/books/${book.classId}/${chapter.id}/print`} passHref target="_blank" className="w-full">
          <button className="w-full flex items-center justify-center gap-1 py-2 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer">
            <Printer className="w-3.5 h-3.5 text-accent" />
            Print view
          </button>
        </Link>
      </div>
    </div>
  );
}
