'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, Clock } from 'lucide-react';
import { Chapter } from '@/types/textbook';
import { cn } from '@/utils/cn';

interface TableOfContentsProps {
  chapters: Chapter[];
  classId: string;
  completedChapters?: string[];
  activeChapterId?: string;
  activeSectionId?: string;
  compact?: boolean;
}

export function TableOfContents({
  chapters,
  classId,
  completedChapters = [],
  activeChapterId,
  activeSectionId,
  compact = false,
}: TableOfContentsProps) {
  
  if (compact) {
    // Compact list for sticky Reader sidebar navigation
    return (
      <div className="space-y-4">
        <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-muted-foreground mb-3 px-2">
          Table of Contents
        </h4>
        <div className="space-y-1">
          {chapters.map((chap) => {
            const isChapActive = activeChapterId === chap.id;
            const isCompleted = completedChapters.includes(chap.id);

            return (
              <div key={chap.id} className="space-y-1">
                {/* Chapter Link */}
                <Link
                  href={`/books/${classId}/${chap.id}`}
                  className={cn(
                    'group flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer',
                    isChapActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                  )}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className={cn(
                      "flex items-center justify-center w-5 h-5 rounded text-[10px] font-bold",
                      isChapActive ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                    )}>
                      {chap.number}
                    </span>
                    <span className="truncate">{chap.title}</span>
                  </div>
                  {isCompleted && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  )}
                </Link>

                {/* Subsections under active chapter */}
                {isChapActive && chap.sections && (
                  <div className="pl-6 border-l border-border/80 ml-5.5 py-1 space-y-1">
                    {chap.sections.map((sect) => {
                      const isSectActive = activeSectionId === sect.id;
                      return (
                        <a
                          key={sect.id}
                          href={`#${sect.id}`}
                          className={cn(
                            'block py-1.5 px-2 text-[11px] font-medium rounded transition-colors truncate cursor-pointer',
                            isSectActive
                              ? 'text-primary bg-primary/5 font-bold'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                          )}
                        >
                          {sect.title}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Full Expanded view for Book details page
  return (
    <div className="space-y-4">
      <h3 className="text-xl md:text-2xl font-heading font-black text-foreground mb-4">
        Table of Contents
      </h3>

      <div className="grid grid-cols-1 gap-4">
        {chapters.map((chap) => {
          const isCompleted = completedChapters.includes(chap.id);

          return (
            <div
              key={chap.id}
              className="group border border-border/80 rounded-2xl bg-card p-5 md:p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5">
                    {/* Chapter badge */}
                    <span className="text-[10px] md:text-xs font-bold text-primary uppercase bg-primary/10 px-2.5 py-0.5 rounded-full">
                      Chapter {chap.number}
                    </span>
                    
                    {/* Reading Time */}
                    <span className="flex items-center gap-1 text-[10px] md:text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {chap.readingTime} mins
                    </span>

                    {/* Completion Tag */}
                    {isCompleted && (
                      <span className="flex items-center gap-1 text-[10px] md:text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        Completed
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg md:text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                    {chap.title}
                  </h4>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {chap.description}
                  </p>
                </div>

                {/* Navigation Button */}
                <div className="shrink-0 flex items-center">
                  <Link href={`/books/${classId}/${chap.id}`} passHref>
                    <button className="flex items-center justify-center gap-1 text-sm font-heading font-bold bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-primary/10 hover:scale-[1.02] cursor-pointer">
                      Start Reading
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Sub-sections indicators list */}
              {chap.sections && chap.sections.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border/50 flex flex-wrap gap-2">
                  {chap.sections.map((sect) => (
                    <span
                      key={sect.id}
                      className="text-[11px] font-semibold text-muted-foreground px-2.5 py-1 rounded bg-muted/60"
                    >
                      {sect.title}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
