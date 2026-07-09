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
    <div className="edu-card overflow-hidden border-4 border-dashed border-primary bg-primary/5 rounded-3xl p-5 md:p-6 my-6 shadow-sm print:bg-white print:border-solid print:border-2 print:border-slate-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 text-left focus:outline-none cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary text-white rounded-2xl shrink-0 shadow-sm">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] md:text-xs uppercase tracking-widest font-extrabold text-primary">
              Teacher&apos;s Corner
            </span>
            <h4 className="text-sm md:text-base font-heading font-black text-slate-800 tracking-tight mt-0.5">
              Pedagogical Insights & Suggestions
            </h4>
          </div>
        </div>

        <div className="text-slate-400 shrink-0 p-1 hover:bg-white border border-transparent hover:border-slate-200 rounded-full transition-all">
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
            <div className="mt-4 pt-4 border-t-2 border-primary/10 space-y-4 text-sm md:text-base">
              {/* Pedagogy Tip */}
              <div className="space-y-1">
                <span className="text-xs font-black text-slate-800 uppercase tracking-tight">Teaching Strategy:</span>
                <p className="text-slate-600 leading-relaxed font-bold text-sm">
                  {pedagogyTip}
                </p>
              </div>

              {/* Classroom Activity suggestion */}
              {classroomActivity && (
                <div className="bg-white border border-primary/20 rounded-2xl p-4 flex gap-2.5 items-start shadow-inner">
                  <Star className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-xs font-black text-primary uppercase tracking-tight">Suggested Activity:</span>
                    <p className="text-xs md:text-sm text-slate-600 font-bold leading-relaxed">
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
