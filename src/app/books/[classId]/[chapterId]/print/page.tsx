'use client';

import React, { use, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer, ShieldAlert } from 'lucide-react';
import { getBook, getChapterMetadata, getChapterComponent } from '@/lib/mdx';
import { Button } from '@/components/ui/button';
import { ChapterMetadata } from '@/types/textbook';

interface PrintPageProps {
  params: Promise<{ classId: string; chapterId: string }>;
}

export default function PrintPage({ params }: PrintPageProps) {
  const resolvedParams = use(params);
  const { classId, chapterId } = resolvedParams;

  const book = getBook(classId);
  const [chapterMetadata, setChapterMetadata] = useState<ChapterMetadata | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    getChapterMetadata(classId, chapterId)
      .then(setChapterMetadata)
      .catch((err) => console.error("Error loading print metadata:", err));
  }, [classId, chapterId]);

  const ChapterContent = useMemo(() => {
    return getChapterComponent(classId, chapterId);
  }, [classId, chapterId]);

  if (!book || !chapterMetadata) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center bg-white text-black">
        <div className="space-y-4">
          <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-2xl font-bold">Print Page Error</h2>
          <p className="text-sm text-gray-500">The chapter you are attempting to print is not available.</p>
          <Link href="/books">
            <Button variant="primary" className="mt-4">Back to Catalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-12 print-container">
      
      {/* Floating control bar (Hidden during print) */}
      <div className="no-print max-w-4xl mx-auto flex items-center justify-between gap-4 p-4 border border-gray-200 rounded-2xl bg-gray-50 mb-8">
        <Link href={`/books/${classId}/${chapterId}`} passHref>
          <button className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-black cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            Back to Interactive Reader
          </button>
        </Link>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500">
            A4 Standard Printable Mode
          </span>
          <Button variant="primary" size="sm" onClick={handlePrint} className="cursor-pointer font-bold text-xs">
            <Printer className="w-4 h-4 mr-2" />
            Print / Save to PDF
          </Button>
        </div>
      </div>

      {/* Book Cover Sheet / Cover Page (Will break after) */}
      <article className="print-page-break max-w-4xl mx-auto border-2 border-black rounded-3xl p-16 flex flex-col justify-between aspect-[1/1.41] mb-12">
        <div className="space-y-2 border-b border-black pb-4">
          <span className="text-xs font-bold tracking-widest uppercase">Omcentra Print Publications</span>
          <h1 className="text-4xl font-black">{book.title}</h1>
        </div>

        <div className="space-y-6 text-center py-20">
          <div className="w-24 h-24 border border-black flex items-center justify-center mx-auto text-3xl font-black rounded-2xl">
            CH {chapterMetadata.chapterNumber}
          </div>
          <h2 className="text-3xl font-bold uppercase tracking-tight">{chapterMetadata.title}</h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Interactive AI & Robotics digital coursework designed for early primary curricula.
          </p>
        </div>

        <div className="border-t border-black pt-4 flex justify-between items-center text-xs font-bold uppercase">
          <span>Subject: {book.subject}</span>
          <span>Grade: Class {book.grade}</span>
        </div>
      </article>

      {/* Chapter Contents Layout */}
      <article className="max-w-4xl mx-auto space-y-8 font-serif leading-relaxed text-sm md:text-base">
        
        {/* Objectives Section */}
        <section className="space-y-3 edu-card p-6 border border-black rounded-xl">
          <h3 className="text-lg font-bold border-b border-black pb-1 uppercase font-sans">Learning Objectives</h3>
          <ul className="list-disc pl-5 space-y-1.5 font-medium">
            {chapterMetadata.learningObjectives.map((obj, idx) => (
              <li key={idx}>{obj}</li>
            ))}
          </ul>
        </section>

        {/* Dynamic MDX Content rendered in print styles */}
        <div className="prose max-w-none font-serif">
          <ChapterContent />
        </div>

      </article>

      {/* Print Footer Page numbers */}
      <footer className="max-w-4xl mx-auto mt-16 pt-4 border-t border-gray-300 text-center text-xs text-gray-400 uppercase font-bold">
        <span>© Omcentra Student Platform — Interactive AI & Robotics — Class {book.grade} Edition</span>
      </footer>

    </div>
  );
}
