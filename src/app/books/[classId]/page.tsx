'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Download, FileText, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookCover } from '@/components/textbook/BookCover';
import { TableOfContents } from '@/components/textbook/TableOfContents';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { getBook } from '@/lib/mdx';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface BookPageProps {
  params: Promise<{ classId: string }>;
}

export default function BookDetailPage({ params }: BookPageProps) {
  const resolvedParams = use(params);
  const classId = resolvedParams.classId;
  const book = getBook(classId);

  // Read student progress from local storage
  const [completedChapters] = useLocalStorage<string[]>(
    `completed-chapters-${classId}`,
    []
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-heading font-black">Book Not Found</h2>
          <p className="text-sm text-muted-foreground mt-2">
            The textbook you are looking for does not exist in our library catalog.
          </p>
          <Link href="/books" passHref className="mt-6">
            <Button variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Library
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate stats
  const totalChaptersCount = book.chapters.length;
  const completedCount = completedChapters.length;
  const progressPercent =
    totalChaptersCount > 0 ? Math.round((completedCount / totalChaptersCount) * 100) : 0;

  const firstChapterId = book.chapters[0]?.id || '';

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Back navigation */}
        <Link href="/books" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Book Library
        </Link>

        {/* Book Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
          {/* Cover Left Column */}
          <div className="md:col-span-1 max-w-xs mx-auto md:max-w-none w-full">
            <BookCover
              title={book.title}
              grade={book.grade}
              subject={book.subject}
              coverColor={book.coverColor}
              iconName={book.iconName}
              interactive={false}
            />
          </div>

          {/* Metadata & Progress Right Column */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-semibold uppercase">
              <span className="text-primary font-bold">{book.subject}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-accent font-bold">Class {book.grade} Curriculum</span>
              <span className="text-muted-foreground">•</span>
              <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-bold">{book.grade >= 8 ? 'Advanced' : book.grade >= 4 ? 'Intermediate' : 'Beginner'}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground font-bold">{book.chapters.reduce((acc, c) => acc + c.readingTime, 0)} Mins Total</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black tracking-tight leading-tight text-foreground">
              {book.title}
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {book.description}
            </p>

            {book.learningOutcomes && book.learningOutcomes.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">What You Will Learn</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-foreground/95">
                  {book.learningOutcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary font-bold">✓</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Student Progress Tracker Box */}
            {mounted && (
              <div className="bg-card border border-border/80 rounded-2xl p-5 md:p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center text-xs md:text-sm font-bold uppercase">
                  <span className="text-foreground">Syllabus Completion</span>
                  <span className="text-primary">{progressPercent}% Completed</span>
                </div>
                
                <Progress value={progressPercent} indicatorClassName="bg-gradient-to-r from-primary to-secondary" />

                <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>
                    Completed {completedCount} out of {totalChaptersCount} chapters
                  </span>
                </div>
              </div>
            )}

            {/* Quick Action Button Box */}
            <div className="flex flex-wrap gap-3.5 pt-2">
              {firstChapterId && (
                <>
                  <Link href={`/books/${classId}/${firstChapterId}`} passHref>
                    <Button variant="primary" size="lg" className="cursor-pointer font-bold">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {progressPercent > 0 ? 'Continue Reading' : 'Start Reading'}
                    </Button>
                  </Link>

                  <Link href={`/books/${classId}/${firstChapterId}/flipbook`} passHref>
                    <Button variant="outline" size="lg" className="cursor-pointer font-bold">
                      <FileText className="w-4 h-4 mr-2 text-secondary" />
                      Flipbook Viewer
                    </Button>
                  </Link>

                  <Link href={`/books/${classId}/${firstChapterId}/print`} passHref target="_blank">
                    <Button variant="ghost" size="lg" className="cursor-pointer font-bold border border-border bg-card">
                      <Download className="w-4 h-4 mr-2 text-accent" />
                      Export Printable PDF
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <hr className="border-border/60" />

        {/* Table of Contents Section */}
        <div className="max-w-4xl">
          {mounted && (
            <TableOfContents
              chapters={book.chapters}
              classId={classId}
              completedChapters={completedChapters}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
