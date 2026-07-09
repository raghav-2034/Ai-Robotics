'use client';

import React from 'react';
import { useBook } from '@/components/layout/BookProvider';

interface TextbookPageFlowProps {
  children: React.ReactNode;
}

export function TextbookPageFlow({ children }: TextbookPageFlowProps) {
  let currentBook: any = null;
  let currentChapter: any = null;

  // Graceful lookup inside BookProvider context
  try {
    const bookCtx = useBook();
    currentBook = bookCtx.currentBook;
    currentChapter = bookCtx.currentChapter;
  } catch (e) {
    // Fail-safe fallbacks if rendered outside textbook readers
  }

  const bookName = currentBook?.title || "AI & Robotics";
  const classText = currentBook?.grade ? `Class ${currentBook.grade}` : "Class 1";
  const chapterNumber = currentChapter?.chapterNumber ? `Chapter ${currentChapter.chapterNumber}` : "Chapter 1";
  const chapterTitle = currentChapter?.title || "Technology is Our Helper!";

  // Split children by <hr /> separator tags
  const elements = React.Children.toArray(children);
  const pages: React.ReactNode[][] = [[]];

  elements.forEach((child) => {
    if (React.isValidElement(child) && (child.type === 'hr' || (child.props as any)?.mdxSource === 'hr')) {
      pages.push([]);
    } else {
      pages[pages.length - 1].push(child);
    }
  });

  return (
    <div className="space-y-12 md:space-y-16 print:space-y-0 print:gap-0 select-none">
      {pages.map((pageContent, idx) => {
        const pageNum = idx + 1;
        const isCover = pageNum === 1;

        return (
          <section
            key={idx}
            className="textbook-page relative w-full bg-white text-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-3xl p-8 md:p-14 flex flex-col justify-between overflow-hidden border border-slate-100 print:border-none print:shadow-none print:rounded-none print:p-0 print:m-0 print:w-[210mm] print:h-[297mm] print:page-break-after-always"
            style={{
              minHeight: 'min(1130px, 140vw)', // Maintain textbook aspect ratio on screens
            }}
          >
            {/* Textbook Header (Hidden on Cover Page) */}
            {!isCover && (
              <header className="flex items-center justify-between border-b-2 border-slate-100 pb-4 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider print:text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="font-extrabold">{bookName} — {classText}</span>
                </div>
                <span className="font-heading text-slate-500 font-extrabold">{chapterNumber}: {chapterTitle}</span>
              </header>
            )}

            {/* Subtle aesthetic decorations inside paper margins */}
            {!isCover && (
              <>
                <div className="absolute top-16 right-4 w-16 h-16 bg-primary/5 rounded-full blur-2xl pointer-events-none print:hidden" />
                <div className="absolute bottom-16 left-4 w-16 h-16 bg-secondary/5 rounded-full blur-2xl pointer-events-none print:hidden" />
                {/* Small playful layout dots representing grid markers */}
                <div className="absolute top-1/2 left-3 w-1.5 h-1.5 rounded-full bg-slate-200 pointer-events-none print:hidden" />
                <div className="absolute top-1/2 right-3 w-1.5 h-1.5 rounded-full bg-slate-200 pointer-events-none print:hidden" />
              </>
            )}

            {/* A4 Printed Page Content viewport */}
            <div className="flex-1 py-6 flex flex-col justify-center overflow-y-auto print:overflow-hidden text-sm md:text-base leading-relaxed text-slate-700 font-sans">
              <div className="space-y-4 md:space-y-6">
                {pageContent}
              </div>
            </div>

            {/* Textbook Footer */}
            <footer className="flex items-center justify-between border-t-2 border-slate-100 pt-4 text-[9px] md:text-[10px] font-extrabold text-slate-400 uppercase tracking-widest print:text-slate-500">
              <span>Om-Nectra Publications</span>
              <span className="text-xs md:text-sm font-heading font-black text-primary px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100 print:border-none print:bg-transparent">
                Page {pageNum}
              </span>
              <span className="lowercase font-bold">nectralearn.edu</span>
            </footer>
          </section>
        );
      })}
    </div>
  );
}
