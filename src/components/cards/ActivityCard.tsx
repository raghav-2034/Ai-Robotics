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
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="edu-card overflow-hidden border border-secondary/20 bg-secondary/5 dark:bg-secondary/10 rounded-2xl p-6 my-6 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-secondary/10 text-secondary rounded-xl">
            <ClipboardList className="w-5 h-5" />
          </div>
          <h4 className="text-base md:text-lg font-heading font-bold text-foreground">
            Activity: {title}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          {/* Duration tag */}
          <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border border-border bg-card text-muted-foreground">
            <Clock className="w-3 h-3" />
            {duration}
          </span>
          {/* Type tag */}
          <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${typeConfig.bg}`}>
            {typeConfig.icon}
            {typeConfig.label}
          </span>
        </div>
      </div>

      <div className="space-y-2 mt-3 pl-1">
        {instructions.map((step, idx) => (
          <div key={idx} className="flex gap-3 text-sm md:text-base text-foreground/90">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-secondary/20 text-secondary font-bold text-xs shrink-0 mt-0.5">
              {idx + 1}
            </span>
            <span>{step}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
