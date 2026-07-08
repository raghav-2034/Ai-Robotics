'use client';

import React from 'react';
import { Bot, Cpu, Zap } from 'lucide-react';
import { RobotFactData } from '@/types/textbook';

interface RobotFactCardProps {
  robotFact: RobotFactData;
}

export function RobotFactCard({ robotFact }: RobotFactCardProps) {
  const { mascot, fact } = robotFact;

  const getMascotDetails = () => {
    switch (mascot) {
      case 'ai-buddy':
        return {
          name: 'AI Buddy',
          icon: <Cpu className="w-5 h-5" />,
          colorClass: 'from-purple-500 to-indigo-600',
          bgClass: 'bg-purple-500/5 border-purple-500/20 dark:bg-purple-500/10',
          textColor: 'text-purple-600 dark:text-purple-400',
        };
      case 'circuit-chum':
        return {
          name: 'Circuit Chum',
          icon: <Zap className="w-5 h-5" />,
          colorClass: 'from-emerald-500 to-teal-600',
          bgClass: 'bg-emerald-500/5 border-emerald-500/20 dark:bg-emerald-500/10',
          textColor: 'text-emerald-600 dark:text-emerald-400',
        };
      case 'robo-guide':
      default:
        return {
          name: 'Robo Guide',
          icon: <Bot className="w-5 h-5" />,
          colorClass: 'from-blue-500 to-cyan-600',
          bgClass: 'bg-blue-500/5 border-blue-500/20 dark:bg-blue-500/10',
          textColor: 'text-blue-600 dark:text-blue-400',
        };
    }
  };

  const config = getMascotDetails();

  return (
    <div className={`edu-card border rounded-2xl p-5 my-6 flex gap-4 items-start ${config.bgClass} shadow-sm`}>
      {/* Mascot Icon Circle */}
      <div className={`shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${config.colorClass} shadow-md`}>
        {config.icon}
      </div>

      <div className="space-y-1">
        <span className={`text-xs font-heading font-bold uppercase tracking-wider ${config.textColor}`}>
          {config.name} Tip
        </span>
        <p className="text-sm md:text-base leading-relaxed text-foreground/90 font-medium">
          {fact}
        </p>
      </div>
    </div>
  );
}
