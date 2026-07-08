'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Check, X, AlertCircle } from 'lucide-react';
import { QuizData } from '@/types/textbook';
import { Button } from '@/components/ui/button';

interface QuizCardProps {
  quiz: QuizData;
}

export function QuizCard({ quiz }: QuizCardProps) {
  const { question, options, correctOptionIndex, explanation } = quiz;
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleOptionSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedIdx(idx);
  };

  const handleSubmit = () => {
    if (selectedIdx === null) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSelectedIdx(null);
    setIsSubmitted(false);
  };

  const isCorrect = selectedIdx === correctOptionIndex;

  return (
    <motion.div
      whileHover={!isSubmitted ? { y: -1 } : undefined}
      className="edu-card overflow-hidden border border-accent/20 bg-accent/5 dark:bg-accent/10 rounded-2xl p-6 my-6 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-accent/15 text-accent rounded-xl">
          <HelpCircle className="w-5 h-5" />
        </div>
        <span className="text-xs uppercase tracking-wider font-semibold text-accent/80">Concept Check</span>
      </div>

      <h4 className="text-base md:text-lg font-heading font-bold text-foreground mb-4">
        {question}
      </h4>

      {/* Options List */}
      <div className="space-y-2 mb-4">
        {options.map((option, idx) => {
          const isSelected = selectedIdx === idx;
          const isCurrentCorrect = idx === correctOptionIndex;
          
          let optionStyles = 'border-border bg-card hover:bg-muted hover:border-muted-foreground/30';
          let statusIcon = null;

          if (isSubmitted) {
            if (isSelected) {
              if (isCorrect) {
                optionStyles = 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300';
                statusIcon = <Check className="w-4 h-4 text-emerald-500" />;
              } else {
                optionStyles = 'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300';
                statusIcon = <X className="w-4 h-4 text-rose-500" />;
              }
            } else if (isCurrentCorrect) {
              optionStyles = 'border-emerald-500/60 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300';
              statusIcon = <Check className="w-4 h-4 text-emerald-500/60" />;
            } else {
              optionStyles = 'border-border/60 bg-card/50 opacity-60';
            }
          } else if (isSelected) {
            optionStyles = 'border-accent bg-accent/10 text-accent-hover font-medium';
          }

          return (
            <button
              key={idx}
              disabled={isSubmitted}
              onClick={() => handleOptionSelect(idx)}
              className={`w-full text-left flex items-center justify-between p-3.5 rounded-xl border text-sm md:text-base transition-all duration-200 cursor-pointer disabled:cursor-default ${optionStyles}`}
            >
              <div className="flex items-center gap-3">
                <span className={`flex items-center justify-center w-6 h-6 rounded-full border text-xs font-bold shrink-0 ${
                  isSelected && !isSubmitted
                    ? 'bg-accent text-white border-accent'
                    : 'bg-muted border-border text-muted-foreground'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>
              {statusIcon}
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        {!isSubmitted ? (
          <Button
            variant="accent"
            size="sm"
            onClick={handleSubmit}
            disabled={selectedIdx === null}
            className="w-full sm:w-auto"
          >
            Check Answer
          </Button>
        ) : (
          <Button variant="outline" size="sm" onClick={handleReset} className="w-full sm:w-auto">
            Try Again
          </Button>
        )}
      </div>

      {/* Explanation Block */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-border"
          >
            <div className="flex gap-2.5 items-start bg-card/60 rounded-xl p-3.5 border border-border/40 text-sm">
              <AlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${isCorrect ? 'text-emerald-500' : 'text-accent'}`} />
              <div className="space-y-1">
                <p className="font-bold text-foreground">
                  {isCorrect ? 'Correct!' : 'Not quite right.'}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {explanation}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
