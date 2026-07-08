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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="edu-card overflow-hidden border border-border bg-card hover:border-border/10 rounded-2xl p-6 md:p-8 my-8 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
          <BookOpenCheck className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Chapter Review</span>
          <h3 className="text-lg md:text-xl font-heading font-bold text-foreground">Summary Takeaways</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {summary.map((point, index) => (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            key={index}
            className="flex items-start gap-3 p-4 bg-muted/30 dark:bg-muted/10 border border-border/40 rounded-xl hover:bg-muted/50 transition-colors"
          >
            <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-sm md:text-base text-foreground/90 font-medium leading-relaxed">
              {point}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
