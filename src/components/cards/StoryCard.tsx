'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, User } from 'lucide-react';
import { StoryData } from '@/types/textbook';

interface StoryCardProps {
  story: StoryData;
}

export function StoryCard({ story }: StoryCardProps) {
  const { character, dialogue, context } = story;

  // Mascot mapping
  const getAvatar = (name: string) => {
    const iconClass = 'w-6 h-6 text-white';
    if (name.toLowerCase().includes('miko') || name.toLowerCase().includes('robo')) {
      return (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 shadow-md">
          <Bot className={iconClass} />
        </div>
      );
    }
    if (name.toLowerCase().includes('ai') || name.toLowerCase().includes('system')) {
      return (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-600 shadow-md">
          <Sparkles className={iconClass} />
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 shadow-md">
        <User className={iconClass} />
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="edu-card overflow-hidden bg-amber-50/75 border-2 border-amber-200/80 rounded-3xl p-6 my-6 shadow-sm flex gap-4 items-start print:bg-white print:border-slate-300"
    >
      <div className="shrink-0">{getAvatar(character)}</div>
      
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <h5 className="font-heading font-black text-sm md:text-base text-amber-950">
            {character}
          </h5>
          {context && (
            <span className="text-[10px] md:text-xs font-bold text-amber-700/85 italic px-2.5 py-0.5 bg-amber-100/80 rounded-full">
              {context}
            </span>
          )}
        </div>
        
        {/* Dialogue speech bubble design */}
        <div className="relative bg-white border border-amber-200/60 rounded-3xl rounded-tl-none p-4 text-slate-800 text-sm md:text-base leading-relaxed shadow-sm">
          {/* Subtle triangle indicator for speech bubble */}
          <div className="absolute top-0 -left-2.5 w-0 h-0 border-t-[10px] border-t-white border-r-[10px] border-r-transparent filter drop-shadow-[-1px_0_0_rgba(251,191,36,0.3)]" />
          <p className="italic font-medium">&quot;{dialogue}&quot;</p>
        </div>
      </div>
    </motion.div>
  );
}
