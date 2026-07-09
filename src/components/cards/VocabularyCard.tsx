'use client';

import React from 'react';
import { BookOpen, Volume2, Lightbulb } from 'lucide-react';
import { VocabularyData } from '@/types/textbook';

interface VocabularyCardProps {
  vocabulary: VocabularyData;
}

export function VocabularyCard({ vocabulary }: VocabularyCardProps) {
  const { term, definition, pronunciation, exampleSentence } = vocabulary;

  // Speak vocabulary word using browser SpeechSynthesis API
  const handlePronounce = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(term);
      utterance.rate = 0.9; // Slightly slower for clarity
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="edu-card overflow-hidden border-2 border-primary bg-sky-50/40 rounded-3xl p-6 my-6 shadow-sm print:bg-white print:border-slate-300">
      <div className="flex items-start gap-4">
        {/* Flashcard style icon */}
        <div className="p-3 bg-primary text-white rounded-2xl shrink-0 shadow-sm">
          <BookOpen className="w-5 h-5" />
        </div>

        <div className="space-y-3 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h4 className="text-lg md:text-xl font-heading font-black text-slate-800 tracking-tight">
              {term}
            </h4>
            
            {pronunciation && (
              <span className="text-xs text-primary font-bold bg-white border border-primary/20 px-2.5 py-0.5 rounded-full">
                /{pronunciation}/
              </span>
            )}
            
            <button
              onClick={handlePronounce}
              className="p-1.5 rounded-full text-slate-400 hover:text-primary hover:bg-white border border-transparent hover:border-slate-200 transition-all cursor-pointer shadow-sm"
              title="Listen to pronunciation"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm md:text-base text-slate-700 font-bold leading-relaxed">
            {definition}
          </p>

          {exampleSentence && (
            <div className="flex gap-2 items-start mt-3 text-xs md:text-sm text-slate-500 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-inner">
              <Lightbulb className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
              <p>
                <span className="font-extrabold text-slate-600">Example: </span>
                {exampleSentence}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
