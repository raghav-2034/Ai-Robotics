'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer, ShieldAlert } from 'lucide-react';
import { getBookByClassId, getChapterById } from '@/config/books';
import { Button } from '@/components/ui/button';

interface PrintPageProps {
  params: Promise<{ classId: string; chapterId: string }>;
}

export default function PrintPage({ params }: PrintPageProps) {
  const resolvedParams = use(params);
  const { classId, chapterId } = resolvedParams;

  const book = getBookByClassId(classId);
  const chapter = book ? getChapterById(book, chapterId) : null;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!book || !chapter) {
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
          <span className="text-xs font-bold tracking-widest uppercase">Om-Nectra Print Publications</span>
          <h1 className="text-4xl font-black">{book.title}</h1>
        </div>

        <div className="space-y-6 text-center py-20">
          <div className="w-24 h-24 border border-black flex items-center justify-center mx-auto text-3xl font-black rounded-2xl">
            CH {chapter.number}
          </div>
          <h2 className="text-3xl font-bold uppercase tracking-tight">{chapter.title}</h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto">{chapter.description}</p>
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
            {chapter.learningObjectives.map((obj, idx) => (
              <li key={idx}>{obj}</li>
            ))}
          </ul>
        </section>

        {/* Content sections */}
        {chapter.sections.map((sect) => (
          <section key={sect.id} className="space-y-4 pt-6 first:pt-0">
            <h3 className="text-lg font-bold border-b border-black pb-1 uppercase font-sans">{sect.title}</h3>
            
            <div className="space-y-4">
              {sect.content.map((block) => {
                // In A4 printable textbooks, we render educational cards in simplified black/white outlines
                switch (block.type) {
                  case 'text':
                    return <p key={block.id} className="text-gray-800">{block.text}</p>;
                  
                  case 'story':
                    return block.story ? (
                      <div key={block.id} className="edu-card border border-black p-4 rounded-lg my-4 bg-gray-50 italic">
                        <span className="font-bold block not-italic font-sans text-xs uppercase">{block.story.character}:</span>
                        &quot;{block.story.dialogue}&quot;
                      </div>
                    ) : null;

                  case 'quiz':
                    return block.quiz ? (
                      <div key={block.id} className="edu-card border border-black p-4 rounded-lg my-4">
                        <span className="font-bold block font-sans text-xs uppercase mb-2">Quiz Question:</span>
                        <p className="font-bold mb-2">{block.quiz.question}</p>
                        <ol className="list-decimal pl-5 space-y-1">
                          {block.quiz.options.map((opt, idx) => (
                            <li key={idx}>{opt}</li>
                          ))}
                        </ol>
                        <p className="text-xs text-gray-500 mt-2 italic font-sans">
                          Answer Key: Option {String.fromCharCode(65 + block.quiz.correctOptionIndex)} ({block.quiz.explanation})
                        </p>
                      </div>
                    ) : null;

                  case 'vocabulary':
                    return block.vocabulary ? (
                      <div key={block.id} className="edu-card border border-black p-4 rounded-lg my-4">
                        <span className="font-bold font-sans text-xs uppercase block mb-1">Vocabulary:</span>
                        <p className="font-bold">{block.vocabulary.term} {block.vocabulary.pronunciation && `/${block.vocabulary.pronunciation}/`}</p>
                        <p className="text-gray-600 text-xs">{block.vocabulary.definition}</p>
                        {block.vocabulary.exampleSentence && (
                          <p className="text-xs mt-1 text-gray-500 font-medium">Example: {block.vocabulary.exampleSentence}</p>
                        )}
                      </div>
                    ) : null;

                  case 'did-you-know':
                    return block.text ? (
                      <div key={block.id} className="edu-card border border-black p-4 rounded-lg my-4 bg-gray-50 font-sans text-xs">
                        <span className="font-bold block uppercase mb-1">{block.title || 'Did You Know?'}</span>
                        <p className="leading-relaxed">{block.text}</p>
                      </div>
                    ) : null;

                  case 'robot-fact':
                    return block.robotFact ? (
                      <div key={block.id} className="edu-card border border-black p-4 rounded-lg my-4 font-sans text-xs italic">
                        <span className="font-bold not-italic uppercase block mb-1">Robotics Fact ({block.robotFact.mascot}):</span>
                        {block.robotFact.fact}
                      </div>
                    ) : null;

                  case 'challenge':
                    return block.text ? (
                      <div key={block.id} className="edu-card border border-black p-4 rounded-lg my-4 font-sans">
                        <span className="font-bold block text-xs uppercase mb-1">{block.title || 'Challenge Question'}</span>
                        <p className="text-sm font-medium">{block.text}</p>
                      </div>
                    ) : null;

                  case 'mini-project':
                    return block.miniProject ? (
                      <div key={block.id} className="edu-card border border-black p-4 rounded-lg my-4 font-sans text-xs space-y-2 print-page-break">
                        <span className="font-bold uppercase text-xs block">Lab Project: {block.miniProject.title}</span>
                        <p className="font-semibold text-gray-600">Estimated duration: {block.miniProject.duration}</p>
                        
                        <div>
                          <span className="font-bold">Required Materials:</span>
                          <ul className="list-disc pl-5">
                            {block.miniProject.materials.map((m, idx) => (
                              <li key={idx}>{m}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="font-bold">Procedure:</span>
                          <ol className="list-decimal pl-5">
                            {block.miniProject.steps.map((s, idx) => (
                              <li key={idx}>{s}</li>
                            ))}
                          </ol>
                        </div>

                        <div className="bg-gray-100 p-2.5 rounded border border-gray-300">
                          <span className="font-bold text-gray-700">Expected Result:</span>
                          <p className="italic">{block.miniProject.expectedOutput}</p>
                        </div>
                      </div>
                    ) : null;

                  default:
                    return null;
                }
              })}
            </div>
          </section>
        ))}

        {/* Chapter Summary block */}
        <section className="space-y-3 edu-card p-6 border border-black rounded-xl print-page-break">
          <h3 className="text-lg font-bold border-b border-black pb-1 uppercase font-sans">Chapter Summary</h3>
          <ul className="list-disc pl-5 space-y-1.5 font-medium">
            {chapter.summary.map((pt, idx) => (
              <li key={idx}>{pt}</li>
            ))}
          </ul>
        </section>

      </article>

      {/* Print Footer Page numbers */}
      <footer className="max-w-4xl mx-auto mt-16 pt-4 border-t border-gray-300 text-center text-xs text-gray-400 uppercase font-bold">
        <span>© Om-Nectra Publications — Interactive AI & Robotics — Class {book.grade} Edition</span>
      </footer>

    </div>
  );
}
