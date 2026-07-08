'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bot, GraduationCap, Search, Menu, X, BookOpen } from 'lucide-react';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/books?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/60 transition-all duration-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="p-2 bg-gradient-to-tr from-primary to-secondary rounded-xl text-white shadow-md shadow-primary/10 group-hover:scale-105 transition-transform duration-200">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black tracking-tight text-base md:text-lg text-foreground leading-none">
              Nectra<span className="text-primary">Learn</span>
            </span>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-0.5">
              Interactive Books
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-foreground/80">
          <Link href="/books" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            Book Library
          </Link>
          <div className="relative group">
            <button className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer">
              <GraduationCap className="w-4 h-4" />
              Classes (1-9)
            </button>
            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-xl py-2 hidden group-hover:block animate-fade-in-down">
              {Array.from({ length: 9 }, (_, i) => {
                const grade = i + 1;
                return (
                  <Link
                    key={grade}
                    href={`/books/class-${grade}`}
                    className="block px-4 py-2 text-xs font-semibold hover:bg-muted hover:text-primary transition-colors"
                  >
                    Class {grade} Textbook
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Search Bar Form */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden sm:flex items-center relative max-w-xs w-full"
        >
          <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search textbooks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-muted/60 hover:bg-muted border border-border/80 rounded-xl focus:outline-none focus:border-primary focus:bg-card transition-all font-medium text-foreground"
          />
        </form>

        {/* Action Controls & Mobile Trigger */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <Link href="/books" passHref className="hidden sm:block">
            <Button variant="primary" size="sm" className="cursor-pointer font-bold text-xs">
              Explore Library
            </Button>
          </Link>

          {/* Mobile Menu Toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-4 space-y-4 animate-fade-in-down">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search textbooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-muted border border-border rounded-xl focus:outline-none focus:border-primary text-foreground"
            />
          </form>

          {/* Links */}
          <nav className="flex flex-col gap-3 font-semibold text-sm">
            <Link
              href="/books"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary py-1"
            >
              Book Library
            </Link>
            <div className="space-y-1">
              <span className="text-xs uppercase text-muted-foreground font-bold tracking-wider block py-1">
                Browse Classes
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {Array.from({ length: 9 }, (_, i) => {
                  const grade = i + 1;
                  return (
                    <Link
                      key={grade}
                      href={`/books/class-${grade}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center p-2 rounded-lg bg-muted text-xs hover:bg-primary hover:text-white font-bold transition-all"
                    >
                      C {grade}
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
