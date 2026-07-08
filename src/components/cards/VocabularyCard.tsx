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
    <div className="edu-card overflow-hidden border border-border bg-card hover:border-primary/30 rounded-2xl p-5 my-5 shadow-sm transition-all duration-200">
      <div className="flex items-start gap-4">
        {/* Decorative Side Tag */}
        <div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>

        <div className="space-y-2 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-lg font-heading font-bold text-foreground">
              {term}
            </h4>
            
            {pronunciation && (
              <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded">
                /{pronunciation}/
              </span>
            )}
            
            <button
              onClick={handlePronounce}
              className="p-1 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer"
              title="Listen to pronunciation"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm md:text-base text-foreground/90 font-medium leading-relaxed">
            {definition}
          </p>

          {exampleSentence && (
            <div className="flex gap-2 items-start mt-2 text-xs md:text-sm text-muted-foreground bg-muted/30 dark:bg-muted/10 p-3 rounded-xl border border-border/20">
              <Lightbulb className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <p>
                <span className="font-semibold text-foreground/80">Example: </span>
                {exampleSentence}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
