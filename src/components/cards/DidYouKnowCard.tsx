'use client';

import React from 'react';
import { Lightbulb } from 'lucide-react';

interface DidYouKnowCardProps {
  title?: string;
  text: string;
}

export function DidYouKnowCard({ title = 'Did You Know?', text }: DidYouKnowCardProps) {
  return (
    <div className="edu-card relative overflow-hidden border-2 border-yellow-300 bg-yellow-50 rounded-3xl p-6 my-6 shadow-sm print:bg-white print:border-slate-300">
      {/* Background decoration bubble */}
      <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-yellow-200/40 blur-xl pointer-events-none print:hidden" />

      <div className="flex gap-4 items-start relative z-10">
        <div className="p-2.5 bg-yellow-200/80 text-yellow-700 rounded-2xl shrink-0 shadow-sm">
          <Lightbulb className="w-5 h-5 animate-bounce" />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h4 className="font-heading font-black text-base text-yellow-800 uppercase tracking-tight">
              {title}
            </h4>
          </div>
          
          <p className="text-sm md:text-base leading-relaxed text-slate-700 font-medium">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
