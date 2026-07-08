'use client';

import React from 'react';
import { Trophy, HelpCircle } from 'lucide-react';

interface ChallengeCardProps {
  title?: string;
  text: string;
}

export function ChallengeCard({ title = 'Challenge Question', text }: ChallengeCardProps) {
  return (
    <div className="edu-card overflow-hidden border border-rose-500/20 bg-rose-500/5 dark:bg-rose-500/10 rounded-2xl p-6 my-6 shadow-sm">
      <div className="flex gap-4 items-start">
        <div className="p-2.5 bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 rounded-xl shrink-0">
          <Trophy className="w-5 h-5 text-rose-500" />
        </div>

        <div className="space-y-1 flex-1">
          <h4 className="font-heading font-bold text-base text-rose-700 dark:text-rose-400">
            {title}
          </h4>
          
          <p className="text-sm md:text-base leading-relaxed text-foreground/90 font-medium">
            {text}
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs text-rose-600/80 dark:text-rose-400/80 italic">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Try explaining this in your own words to your parents or classmates!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
