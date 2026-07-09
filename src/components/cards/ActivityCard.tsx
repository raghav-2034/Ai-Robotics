'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, User, UserCheck, Clock, ClipboardList } from 'lucide-react';
import { ActivityData } from '@/types/textbook';

interface ActivityCardProps {
  activity: ActivityData;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const { title, duration, type, instructions } = activity;

  // Icon selector based on activity type
  const getTypeDetails = () => {
    switch (type) {
      case 'group':
        return {
          icon: <Users className="w-4 h-4" />,
          label: 'Group Work',
          bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        };
      case 'pair':
        return {
          icon: <UserCheck className="w-4 h-4" />,
          label: 'Pair Work',
          bg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
        };
      case 'individual':
      default:
        return {
          icon: <User className="w-4 h-4" />,
          label: 'Individual Work',
          bg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
        };
    }
  };

  const typeConfig = getTypeDetails();

  return (
    <motion.div
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
      className="edu-card overflow-hidden border-4 border-dashed border-secondary/40 bg-secondary/5 rounded-3xl p-6 md:p-8 my-6 shadow-sm print:border-solid print:border-2 print:border-slate-300"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-secondary/15 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-secondary/10 text-secondary rounded-2xl shrink-0">
            <ClipboardList className="w-5 h-5" />
          </div>
          <h4 className="text-base md:text-lg font-heading font-black text-foreground uppercase tracking-tight">
            Activity: {title}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          {/* Duration tag */}
          <span className="flex items-center gap-1 text-xs font-extrabold px-3 py-1 rounded-full border-2 border-slate-200 bg-white text-slate-600">
            <Clock className="w-3.5 h-3.5" />
            {duration}
          </span>
          {/* Type tag */}
          <span className={`flex items-center gap-1 text-xs font-extrabold px-3 py-1 rounded-full border-2 ${typeConfig.bg}`}>
            {typeConfig.icon}
            {typeConfig.label}
          </span>
        </div>
      </div>

      <div className="space-y-3 mt-4">
        {instructions.map((step, idx) => (
          <div key={idx} className="flex gap-3 text-sm md:text-base text-slate-700 font-medium">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-white font-black text-xs shrink-0 mt-0.5 shadow-sm">
              {idx + 1}
            </span>
            <span className="leading-relaxed">{step}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
