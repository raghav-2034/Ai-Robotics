'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Target } from 'lucide-react';

interface LearningObjectiveCardProps {
  objectives: string[];
}

export function LearningObjectiveCard({ objectives }: LearningObjectiveCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="edu-card overflow-hidden border border-primary/20 bg-primary/5 rounded-2xl p-6 md:p-8 my-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-xl text-primary">
          <Target className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-primary/70">Syllabus Path</span>
          <h3 className="text-lg md:text-xl font-heading font-bold text-foreground">Learning Objectives</h3>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        By the end of this chapter, you will be able to:
      </p>

      <ul className="space-y-3">
        {objectives.map((obj, index) => (
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            key={index}
            className="flex items-start gap-3 text-sm md:text-base text-foreground/90 font-medium"
          >
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <span>{obj}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
