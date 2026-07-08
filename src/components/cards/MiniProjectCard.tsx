'use client';

import React from 'react';
import { Wrench, Clock, FileCheck, Layers } from 'lucide-react';
import { MiniProjectData } from '@/types/textbook';

interface MiniProjectCardProps {
  miniProject: MiniProjectData;
}

export function MiniProjectCard({ miniProject }: MiniProjectCardProps) {
  const { title, duration, materials, steps, expectedOutput } = miniProject;

  return (
    <div className="edu-card overflow-hidden border border-indigo-500/20 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-2xl p-6 md:p-8 my-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 text-indigo-600 rounded-xl">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] md:text-xs uppercase tracking-wider font-semibold text-indigo-600/80 dark:text-indigo-400/80">Hands-on Laboratory</span>
            <h4 className="text-base md:text-lg font-heading font-bold text-foreground">
              Mini Project: {title}
            </h4>
          </div>
        </div>

        <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800 bg-card text-indigo-600 dark:text-indigo-400">
          <Clock className="w-3.5 h-3.5" />
          {duration}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Materials Box */}
        <div className="md:col-span-1 bg-card/60 border border-border/60 rounded-xl p-4">
          <h5 className="font-heading font-bold text-sm text-foreground mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-500" />
            Materials Needed
          </h5>
          <ul className="space-y-1.5 text-xs md:text-sm text-muted-foreground list-disc pl-4 font-medium">
            {materials.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Steps Box */}
        <div className="md:col-span-2 space-y-3 pl-1">
          <h5 className="font-heading font-bold text-sm text-foreground mb-3">
            Steps to Complete
          </h5>
          <div className="space-y-3">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-3 text-sm text-foreground/90">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-600 font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="font-medium">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expected Output Highlight */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex gap-3 items-start">
          <FileCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h6 className="font-heading font-bold text-sm text-emerald-700 dark:text-emerald-400">
              Expected Output
            </h6>
            <p className="text-xs md:text-sm text-foreground/80 leading-relaxed font-medium">
              {expectedOutput}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
