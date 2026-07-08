'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, FileText } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { FlipbookView } from '@/components/textbook/FlipbookView';
import { getBookByClassId, getChapterById } from '@/config/books';

interface FlipbookPageProps {
  params: Promise<{ classId: string; chapterId: string }>;
}

export default function FlipbookPage({ params }: FlipbookPageProps) {
  const resolvedParams = use(params);
  const { classId, chapterId } = resolvedParams;

  const book = getBookByClassId(classId);
  const chapter = book ? getChapterById(book, chapterId) : null;

  if (!book || !chapter) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-heading font-black">Chapter Not Found</h2>
          <p className="text-sm text-muted-foreground mt-2">
            The chapter you are trying to view in the Flipbook does not exist.
          </p>
          <Link href="/books" passHref className="mt-6">
            <Button variant="primary">Back to Catalog</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Navigation & Header block */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div className="space-y-1">
            <Link
              href={`/books/${classId}/${chapterId}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-muted-foreground hover:text-primary transition-colors mb-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Chapter Reader
            </Link>
            
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-secondary" />
              <h1 className="text-xl md:text-2xl font-heading font-black text-foreground leading-tight">
                Flipbook Mode: {chapter.title}
              </h1>
            </div>
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted border border-border px-3 py-1 rounded-full">
            Class {book.grade} • {book.subject}
          </span>
        </div>

        {/* Dynamic Flipbook Wrapper */}
        <FlipbookView chapter={chapter} />

      </main>

      <Footer />
    </div>
  );
}
