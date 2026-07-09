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
      className="edu-card overflow-hidden border-2 border-primary/30 bg-indigo-50/15 rounded-3xl p-6 md:p-8 my-6 shadow-sm print:bg-white print:border-slate-300"
    >
      <div className="flex items-center gap-3.5 mb-5 border-b border-primary/10 pb-4">
        <div className="p-2.5 bg-primary text-white rounded-2xl shrink-0 shadow-sm">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] md:text-xs uppercase tracking-widest font-extrabold text-primary">Concept Check</span>
          <h4 className="text-base md:text-lg font-heading font-black text-slate-800 tracking-tight mt-0.5">
            {question}
          </h4>
        </div>
      </div>

      {/* Options List */}
      <div className="space-y-3 mb-5">
        {options.map((option, idx) => {
          const isSelected = selectedIdx === idx;
          const isCurrentCorrect = idx === correctOptionIndex;
          
          let optionStyles = 'border-2 border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300';
          let statusIcon = null;

          if (isSubmitted) {
            if (isSelected) {
              if (isCorrect) {
                optionStyles = 'border-2 border-emerald-500 bg-emerald-50 text-emerald-800';
                statusIcon = <Check className="w-4 h-4 text-emerald-600 font-extrabold" />;
              } else {
                optionStyles = 'border-2 border-rose-500 bg-rose-50 text-rose-800';
                statusIcon = <X className="w-4 h-4 text-rose-600 font-extrabold" />;
              }
            } else if (isCurrentCorrect) {
              optionStyles = 'border-2 border-emerald-300 bg-emerald-50/50 text-emerald-700';
              statusIcon = <Check className="w-4 h-4 text-emerald-500/60" />;
            } else {
              optionStyles = 'border-2 border-slate-100 bg-slate-50/50 opacity-60';
            }
          } else if (isSelected) {
            optionStyles = 'border-2 border-primary bg-sky-50 text-primary font-bold';
          }

          return (
            <button
              key={idx}
              disabled={isSubmitted}
              onClick={() => handleOptionSelect(idx)}
              className={`w-full text-left flex items-center justify-between p-4 rounded-2xl transition-all duration-200 cursor-pointer disabled:cursor-default shadow-sm ${optionStyles}`}
            >
              <div className="flex items-center gap-3">
                <span className={`flex items-center justify-center w-7 h-7 rounded-full border-2 text-xs font-black shrink-0 shadow-sm ${
                  isSelected && !isSubmitted
                    ? 'bg-primary text-white border-primary'
                    : 'bg-slate-100 border-slate-300 text-slate-600'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="font-bold">{option}</span>
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
            className="w-full sm:w-auto font-black rounded-2xl cursor-pointer"
          >
            Check Answer
          </Button>
        ) : (
          <Button variant="outline" size="sm" onClick={handleReset} className="w-full sm:w-auto font-black rounded-2xl cursor-pointer">
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
            className="mt-5 pt-4 border-t-2 border-slate-100"
          >
            <div className="flex gap-3 items-start bg-slate-50 rounded-2xl p-4 border border-slate-200 text-sm">
              <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 ${isCorrect ? 'text-emerald-500' : 'text-primary'}`} />
              <div className="space-y-1">
                <p className="font-black text-slate-800 uppercase tracking-tight text-xs">
                  {isCorrect ? 'Correct!' : 'Not quite right.'}
                </p>
                <p className="text-slate-600 font-bold leading-relaxed text-sm">
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
