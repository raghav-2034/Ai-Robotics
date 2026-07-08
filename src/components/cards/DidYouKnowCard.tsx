'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface DidYouKnowCardProps {
  title?: string;
  text: string;
}

export function DidYouKnowCard({ title = 'Did You Know?', text }: DidYouKnowCardProps) {
  return (
    <div className="edu-card relative overflow-hidden border border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10 rounded-2xl p-6 my-6 shadow-sm">
      {/* Background decoration bubble */}
      <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-amber-500/10 dark:bg-amber-500/5 blur-xl pointer-events-none" />

      <div className="flex gap-4 items-start relative z-10">
        <div className="p-2.5 bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl shrink-0">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-heading font-bold text-base text-amber-700 dark:text-amber-400">
              {title}
            </h4>
          </div>
          
          <p className="text-sm md:text-base leading-relaxed text-foreground/90 font-medium">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
