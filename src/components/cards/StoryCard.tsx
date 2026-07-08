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
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="edu-card overflow-hidden bg-card border border-border/80 rounded-2xl p-5 md:p-6 my-6 shadow-sm flex gap-4 items-start"
    >
      <div className="shrink-0">{getAvatar(character)}</div>
      
      <div className="flex-1 space-y-1.5">
        <div className="flex items-center gap-2">
          <h5 className="font-heading font-bold text-sm md:text-base text-foreground">
            {character}
          </h5>
          {context && (
            <span className="text-[10px] md:text-xs font-medium text-muted-foreground italic px-2 py-0.5 bg-muted rounded-full">
              {context}
            </span>
          )}
        </div>
        
        {/* Dialogue speech bubble design */}
        <div className="relative bg-muted/50 dark:bg-muted/30 border border-border/40 rounded-2xl rounded-tl-none p-4 text-foreground/90 text-sm md:text-base leading-relaxed">
          {/* Subtle triangle indicator for speech bubble */}
          <div className="absolute top-0 -left-2 w-0 h-0 border-t-[8px] border-t-muted/50 dark:border-t-muted/30 border-r-[8px] border-r-transparent" />
          <p className="italic">&quot;{dialogue}&quot;</p>
        </div>
      </div>
    </motion.div>
  );
}
