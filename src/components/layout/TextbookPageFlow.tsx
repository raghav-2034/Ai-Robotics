'use client';

import React from 'react';
import { useBook } from '@/components/layout/BookProvider';
import { cn } from '@/utils/cn';

interface TextbookPageFlowProps {
  children: React.ReactNode;
}

// Page style lookup based on page number to apply custom picture book designs
function getPageConfig(pageNum: number) {
  switch (pageNum) {
    case 1: // Cover Page
      return {
        bg: "bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100/40",
        border: "border-yellow-200/60",
        accent: "text-amber-600",
        theme: "cover"
      };
    case 2: // Welcome
      return {
        bg: "bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100/30",
        border: "border-sky-200/60",
        accent: "text-sky-600",
        theme: "welcome"
      };
    case 3: // Story Time
      return {
        bg: "bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-amber-100/30",
        border: "border-amber-200/60",
        accent: "text-amber-800",
        theme: "story"
      };
    case 4: // What is Technology
    case 9: // School Tech
      return {
        bg: "bg-gradient-to-br from-sky-50 via-indigo-50/30 to-sky-100/30",
        border: "border-sky-200/60",
        accent: "text-primary",
        theme: "concept-sky"
      };
    case 5: // Machines Around Us
    case 16: // Quiz
      return {
        bg: "bg-gradient-to-br from-pink-50/75 via-rose-50/30 to-pink-100/30",
        border: "border-pink-200/60",
        accent: "text-rose-600",
        theme: "concept-pink"
      };
    case 6: // Drawing Activity
    case 8: // Roleplay Activity
    case 10: // Scavenger Hunt
    case 12: // Matching Activity
    case 17: // Homework
      return {
        bg: "bg-gradient-to-br from-emerald-50/65 via-teal-50/30 to-emerald-100/30",
        border: "border-emerald-200/60",
        accent: "text-emerald-600",
        theme: "workbook"
      };
    case 11: // Old vs New
      return {
        bg: "bg-gradient-to-br from-orange-50/70 via-amber-50/30 to-orange-100/30",
        border: "border-orange-200/60",
        accent: "text-orange-600",
        theme: "concept-orange"
      };
    case 13: // Did You Know
      return {
        bg: "bg-gradient-to-br from-yellow-50 via-amber-50/40 to-yellow-100/30",
        border: "border-yellow-200/60",
        accent: "text-yellow-700",
        theme: "concept-yellow"
      };
    case 14: // Vocabulary
      return {
        bg: "bg-gradient-to-br from-purple-50/75 via-indigo-50/30 to-purple-100/30",
        border: "border-purple-200/60",
        accent: "text-purple-600",
        theme: "vocabulary"
      };
    case 15: // Let's Remember
      return {
        bg: "bg-gradient-to-br from-teal-50/75 via-emerald-50/30 to-teal-100/30",
        border: "border-teal-200/60",
        accent: "text-teal-600",
        theme: "summary"
      };
    case 18: // Teacher Notes
      return {
        bg: "bg-gradient-to-br from-indigo-50/75 via-slate-50/40 to-indigo-100/30",
        border: "border-indigo-200/60",
        accent: "text-indigo-600",
        theme: "teacher"
      };
    default:
      return {
        bg: "bg-white",
        border: "border-slate-100",
        accent: "text-slate-600",
        theme: "standard"
      };
  }
}

// Background SVG decals for printed notebook visuals
function RenderDecals({ theme }: { theme: string }) {
  if (theme === 'cover') {
    return (
      <>
        <div className="absolute top-12 left-16 opacity-25 text-amber-300 pointer-events-none print:hidden">
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </div>
        <div className="absolute bottom-16 right-20 opacity-20 text-yellow-400 pointer-events-none print:hidden">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </div>
      </>
    );
  }
  if (theme === 'workbook') {
    return (
      <>
        <div className="absolute bottom-12 right-14 opacity-25 text-emerald-300 pointer-events-none print:hidden">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </div>
        <div className="absolute top-10 left-16 opacity-15 text-emerald-400 pointer-events-none print:hidden">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z" />
          </svg>
        </div>
      </>
    );
  }
  if (theme.startsWith('concept')) {
    return (
      <>
        <div className="absolute top-12 right-12 opacity-15 text-slate-300 pointer-events-none print:hidden">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96z" />
          </svg>
        </div>
      </>
    );
  }
  return null;
}

// Left binder spiral decoration to mimic a classroom workbook
function RenderSpiralBind() {
  return (
    <div className="absolute left-2.5 top-8 bottom-8 flex flex-col justify-between w-4 pointer-events-none print:hidden z-20">
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="flex items-center gap-0.5">
          <div className="w-5 h-2.5 rounded-full border border-slate-300 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-400 shadow-[0_2px_4px_rgba(0,0,0,0.1)]" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-800 shadow-inner" />
        </div>
      ))}
    </div>
  );
}

export function TextbookPageFlow({ children }: TextbookPageFlowProps) {
  let currentBook: any = null;
  let currentChapter: any = null;

  try {
    const bookCtx = useBook();
    currentBook = bookCtx.currentBook;
    currentChapter = bookCtx.currentChapter;
  } catch (e) {
    // Fail-safe fallbacks if rendered outside textbook context
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
        const pageConfig = getPageConfig(pageNum);

        return (
          <section
            key={idx}
            className={cn(
              "textbook-page relative w-full shadow-[0_25px_60px_rgba(0,0,0,0.08)] rounded-[2.5rem] p-8 pl-12 md:p-14 md:pl-18 flex flex-col justify-between overflow-hidden border-4",
              pageConfig.bg,
              pageConfig.border,
              "print:border-none print:shadow-none print:rounded-none print:p-0 print:m-0 print:w-[210mm] print:h-[297mm] print:page-break-after-always"
            )}
            style={{
              minHeight: 'min(1130px, 140vw)', // Maintain textbook aspect ratio on screens
            }}
          >
            {/* Left Binder Spiral Decoration */}
            <RenderSpiralBind />

            {/* Background vector decorations */}
            <RenderDecals theme={pageConfig.theme} />

            {/* Textbook Header (Hidden on Cover Page) */}
            {!isCover && (
              <header className="flex items-center justify-between border-b-2 border-slate-200/40 pb-4 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider print:text-slate-500 z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="font-extrabold text-slate-500">{bookName} — {classText}</span>
                </div>
                <span className="font-heading text-slate-500 font-extrabold">{chapterNumber}: {chapterTitle}</span>
              </header>
            )}

            {/* A4 Printed Page Content viewport */}
            <div className="flex-1 py-6 flex flex-col justify-center overflow-y-auto print:overflow-hidden text-sm md:text-base leading-relaxed text-slate-700 font-sans z-10">
              <div className="space-y-4 md:space-y-6">
                {pageContent}
              </div>
            </div>

            {/* Textbook Footer */}
            <footer className="flex items-center justify-between border-t-2 border-slate-200/40 pt-4 text-[9px] md:text-[10px] font-extrabold text-slate-400 uppercase tracking-widest print:text-slate-500 z-10">
              <span>Omcentra Student Platform</span>
              <span className="text-xs md:text-sm font-heading font-black text-primary px-4 py-1.5 bg-white rounded-full border border-slate-200/60 shadow-sm print:border-none print:bg-transparent">
                Page {pageNum}
              </span>
              <span className="lowercase font-bold">omcentra.edu</span>
            </footer>
          </section>
        );
      })}
    </div>
  );
}
