'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { TeacherNoteData } from '@/types/textbook';

interface TeacherNoteCardProps {
  teacherNote: TeacherNoteData;
}

export function TeacherNoteCard({ teacherNote }: TeacherNoteCardProps) {
  const { pedagogyTip, classroomActivity } = teacherNote;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="edu-card overflow-hidden border border-dashed border-primary/40 bg-primary/5 dark:bg-primary/10 rounded-2xl p-5 md:p-6 my-6 shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 text-left focus:outline-none cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/15 text-primary rounded-xl shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] md:text-xs uppercase tracking-wider font-semibold text-primary/80 dark:text-primary/70">
              Teacher&apos;s Corner
            </span>
            <h4 className="text-sm md:text-base font-heading font-bold text-foreground">
              Pedagogical Insights & Suggestions
            </h4>
          </div>
        </div>

        <div className="text-muted-foreground shrink-0 p-1 hover:bg-muted rounded-full transition-colors">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Collapse Container */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-primary/20 space-y-4 text-sm md:text-base">
              {/* Pedagogy Tip */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-foreground/80 uppercase">Teaching Strategy:</span>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  {pedagogyTip}
                </p>
              </div>

              {/* Classroom Activity suggestion */}
              {classroomActivity && (
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-3.5 flex gap-2.5 items-start">
                  <Star className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-primary">Suggested Activity:</span>
                    <p className="text-xs md:text-sm text-foreground/90 font-medium leading-relaxed">
                      {classroomActivity}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
