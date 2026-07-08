'use client';

import React from 'react';
import { Clock, BookOpen, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ChapterHeroProps {
  classId: string;
  chapterNumber: number;
  title: string;
  description: string;
  readingTime: number;
  subject: string;
}

export function ChapterHero({
  classId,
  chapterNumber,
  title,
  description,
  readingTime,
  subject,
}: ChapterHeroProps) {
  return (
    <div className="relative overflow-hidden bg-card border-b border-border py-8 md:py-12 px-6 md:px-8 mb-8">
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_14px]" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-4">
        {/* Back Link */}
        <Link href={`/books/${classId}`} passHref>
          <Button variant="ghost" size="sm" className="gap-1.5 mb-2 pl-2 cursor-pointer no-print">
            <ChevronLeft className="w-4 h-4" />
            Back to Book Detail
          </Button>
        </Link>

        {/* Metadata tag header */}
        <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-semibold uppercase tracking-wider">
          <span className="text-primary font-bold">{subject} Edition</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-accent font-bold">Chapter {chapterNumber.toString().padStart(2, '0')}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black tracking-tight leading-tight text-foreground">
          {title}
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          {description}
        </p>

        {/* Info stats strip */}
        <div className="flex items-center gap-4 pt-2 text-xs md:text-sm text-muted-foreground font-semibold uppercase">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-primary" />
            {readingTime} Min Read
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-secondary" />
            Data-Driven Module
          </span>
        </div>
      </div>
    </div>
  );
}
