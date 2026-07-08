'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

interface ReaderLayoutProps {
  scrollProgress: number;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export function ReaderLayout({ scrollProgress, sidebar, children }: ReaderLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      {/* Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-primary via-indigo-500 to-secondary z-50 transition-all duration-100 no-print"
        style={{ width: `${scrollProgress}%` }}
      />

      <Navbar />

      {/* Reader Layout Splitter */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sticky Left Sidebar Navigation */}
        <aside className="hidden lg:block lg:col-span-1">
          {sidebar}
        </aside>

        {/* Main Textbook Content View */}
        <main className="col-span-1 lg:col-span-3 space-y-8">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
