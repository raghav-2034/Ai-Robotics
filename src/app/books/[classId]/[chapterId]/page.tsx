'use client';

import React, { use, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getBookByClassId, getChapterById } from '@/config/books';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useActiveSection } from '@/hooks/useActiveSection';

// Layout & Navigation Imports
import { ReaderLayout } from '@/components/layout/ReaderLayout';
import { ChapterLayout } from '@/components/layout/ChapterLayout';
import { SidebarNavigation } from '@/components/navigation/SidebarNavigation';

// Educational Cards Imports
import { ActivityCard } from '@/components/cards/ActivityCard';
import { StoryCard } from '@/components/cards/StoryCard';
import { QuizCard } from '@/components/cards/QuizCard';
import { VocabularyCard } from '@/components/cards/VocabularyCard';
import { DidYouKnowCard } from '@/components/cards/DidYouKnowCard';
import { RobotFactCard } from '@/components/cards/RobotFactCard';
import { ChallengeCard } from '@/components/cards/ChallengeCard';
import { MiniProjectCard } from '@/components/cards/MiniProjectCard';
import { TeacherNoteCard } from '@/components/cards/TeacherNoteCard';

interface ReaderPageProps {
  params: Promise<{ classId: string; chapterId: string }>;
}

export default function ReaderPage({ params }: ReaderPageProps) {
  const resolvedParams = use(params);
  const { classId, chapterId } = resolvedParams;

  const book = getBookByClassId(classId);
  const chapter = book ? getChapterById(book, chapterId) : null;

  // Reading Scroll Progress State
  const [scrollProgress, setScrollProgress] = useState(0);

  // Completed Chapters LocalStorage State
  const [completedChapters, setCompletedChapters] = useLocalStorage<string[]>(
    `completed-chapters-${classId}`,
    []
  );

  const [mounted, setMounted] = useState(false);

  // Active section tracking (scroll spy)
  const sectionIds = useMemo(() => {
    return chapter ? chapter.sections.map((sect) => sect.id) : [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter?.id]);

  const activeSectionId = useActiveSection(sectionIds);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const scrolled = (window.scrollY / totalScroll) * 100;
        setScrollProgress(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!book || !chapter) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground justify-center items-center p-6 text-center">
        <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-heading font-black">Chapter Not Found</h2>
        <p className="text-sm text-muted-foreground mt-2">
          The chapter you are looking for does not exist or has not been written yet.
        </p>
        <Link href="/books" passHref className="mt-6">
          <Button variant="primary">Back to Catalog</Button>
        </Link>
      </div>
    );
  }

  // Chapter completion toggle
  const isChapterCompleted = completedChapters.includes(chapterId);
  const toggleChapterCompletion = () => {
    if (isChapterCompleted) {
      setCompletedChapters(completedChapters.filter((id) => id !== chapterId));
    } else {
      setCompletedChapters([...completedChapters, chapterId]);
    }
  };

  // Pagination indexing
  const currentChapterIdx = book.chapters.findIndex((c) => c.id === chapterId);
  const prevChapter = currentChapterIdx > 0 ? book.chapters[currentChapterIdx - 1] : null;
  const nextChapter = currentChapterIdx < book.chapters.length - 1 ? book.chapters[currentChapterIdx + 1] : null;

  return (
    <ReaderLayout
      scrollProgress={scrollProgress}
      sidebar={
        <SidebarNavigation
          book={book}
          chapter={chapter}
          completedChapters={completedChapters}
          activeSectionId={activeSectionId}
          isChapterCompleted={isChapterCompleted}
          onToggleCompletion={toggleChapterCompletion}
        />
      }
    >
      <ChapterLayout
        book={book}
        chapter={chapter}
        isChapterCompleted={isChapterCompleted}
        onToggleCompletion={toggleChapterCompletion}
        prevChapter={prevChapter}
        nextChapter={nextChapter}
        mounted={mounted}
      >
        {/* Render sections lists */}
        {chapter.sections.map((section) => (
          <section
            id={section.id}
            key={section.id}
            className="space-y-6 scroll-mt-24 border-t border-border/50 pt-8 first:border-0 first:pt-0"
          >
            <h2 className="text-xl md:text-2xl font-heading font-extrabold text-foreground tracking-tight border-l-4 border-primary pl-3">
              {section.title}
            </h2>

            <div className="space-y-4">
              {section.content.map((block) => {
                switch (block.type) {
                  case 'text':
                    return (
                      <p
                        key={block.id}
                        className="text-sm md:text-base leading-relaxed text-foreground/90 font-medium"
                      >
                        {block.text}
                      </p>
                    );

                  case 'activity':
                    return block.activity ? (
                      <ActivityCard key={block.id} activity={block.activity} />
                    ) : null;

                  case 'story':
                    return block.story ? (
                      <StoryCard key={block.id} story={block.story} />
                    ) : null;

                  case 'quiz':
                    return block.quiz ? (
                      <QuizCard key={block.id} quiz={block.quiz} />
                    ) : null;

                  case 'vocabulary':
                    return block.vocabulary ? (
                      <VocabularyCard key={block.id} vocabulary={block.vocabulary} />
                    ) : null;

                  case 'did-you-know':
                    return block.text ? (
                      <DidYouKnowCard key={block.id} text={block.text} title={block.title} />
                    ) : null;

                  case 'robot-fact':
                    return block.robotFact ? (
                      <RobotFactCard key={block.id} robotFact={block.robotFact} />
                    ) : null;

                  case 'challenge':
                    return block.text ? (
                      <ChallengeCard key={block.id} text={block.text} title={block.title} />
                    ) : null;

                  case 'mini-project':
                    return block.miniProject ? (
                      <MiniProjectCard key={block.id} miniProject={block.miniProject} />
                    ) : null;

                  case 'teacher-note':
                    return block.teacherNote ? (
                      <TeacherNoteCard key={block.id} teacherNote={block.teacherNote} />
                    ) : null;

                  default:
                    return null;
                }
              })}
            </div>
          </section>
        ))}
      </ChapterLayout>
    </ReaderLayout>
  );
}
