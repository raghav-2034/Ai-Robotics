'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/utils/cn';

interface BookCoverProps {
  title: string;
  grade: number;
  subject: string;
  coverColor: string; // Tailwind gradient classes e.g. "from-blue-600 to-indigo-800"
  iconName: string; // Lucide icon identifier
  interactive?: boolean;
}

export function BookCover({ title, grade, subject, coverColor, iconName, interactive = true }: BookCoverProps) {
  // Dynamically resolve the Lucide icon from its string name
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName] || LucideIcons.BookOpen;

  const content = (
    <div className={cn(
      "relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-white/10 text-white flex flex-col justify-between p-6 md:p-8 bg-gradient-to-br",
      coverColor
    )}>
      {/* Glossy Overlay/Sheen */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Floating 3D Book Spine Shadow on Left edge */}
      <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/10 border-r border-white/5 shadow-inner pointer-events-none" />

      {/* Cover Header */}
      <div className="flex justify-between items-start z-10">
        <span className="text-[10px] md:text-xs font-heading font-extrabold tracking-widest uppercase bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
          Interactive Textbook
        </span>
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/20">
          <LucideIcons.Sparkles className="w-4 h-4 text-accent" />
        </span>
      </div>

      {/* Central Illustration / Dynamic Graphic */}
      <div className="flex-1 flex items-center justify-center py-4 z-10 relative">
        <div className="relative p-6 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/15 shadow-2xl">
          {/* Decorative glowing backdrops */}
          <div className="absolute inset-0 -z-10 rounded-3xl bg-white/5 blur-md scale-105" />
          <IconComponent className="w-16 h-16 md:w-20 md:h-20 text-white animate-bounce-slow" />
        </div>
      </div>

      {/* Cover Footer / Book Metadata */}
      <div className="space-y-3 z-10">
        <div className="flex items-center gap-2">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/80">
            {subject}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/50" />
          <span className="text-[10px] md:text-xs font-bold text-accent">
            Grade {grade}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-heading font-black tracking-tight leading-tight text-white drop-shadow-md">
          {title}
        </h3>
        
        <div className="pt-2.5 border-t border-white/10 flex justify-between items-center text-[9px] md:text-xs text-white/70 font-semibold uppercase">
          <span>Omcentra</span>
          <span>Class {grade} Edition</span>
        </div>
      </div>
    </div>
  );

  if (interactive) {
    return (
      <motion.div
        whileHover={{
          y: -8,
          rotateY: -5,
          scale: 1.01,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ perspective: 1000 }}
        className="cursor-pointer select-none"
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
