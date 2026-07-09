'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpenCheck, ArrowRight } from 'lucide-react';

interface SummaryCardProps {
  summary: string[];
}

export function SummaryCard({ summary }: SummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="edu-card overflow-hidden border-2 border-emerald-400 bg-emerald-50/20 rounded-3xl p-6 md:p-8 my-8 shadow-sm print:bg-white print:border-slate-300"
    >
      <div className="flex items-center gap-3.5 mb-6 border-b border-emerald-400/20 pb-4">
        <div className="p-3 bg-emerald-500 text-white rounded-2xl shrink-0 shadow-sm">
          <BookOpenCheck className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] md:text-xs uppercase tracking-widest font-extrabold text-emerald-600">Let's Remember</span>
          <h3 className="text-lg md:text-xl font-heading font-black text-slate-800 tracking-tight">Summary Notes</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {summary.map((point, index) => (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            key={index}
            className="flex items-start gap-3 p-4 bg-white border border-emerald-400/25 rounded-2xl shadow-inner"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
            <p className="text-sm md:text-base text-slate-700 font-bold leading-relaxed">
              {point}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
