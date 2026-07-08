'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme-preference', 'light');
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting until client-side mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  if (!mounted) {
    return <div className="w-9 h-9 rounded-xl bg-muted animate-pulse" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-9 h-9 rounded-xl border border-border bg-card text-foreground hover:bg-muted transition-colors cursor-pointer"
      aria-label="Toggle visual theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-accent" />
      ) : (
        <Moon className="w-4 h-4 text-primary" />
      )}
    </button>
  );
}
