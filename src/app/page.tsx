'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, ShieldCheck, Cpu, Library, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { BookCover } from '@/components/textbook/BookCover';
import { BOOKS } from '@/config/books';

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/books?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const featuredBooks = BOOKS.filter((b) => b.grade === 1 || b.grade === 9);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      <Navbar />

      <main className="flex-1">
        {/* Immersive Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-border/60 bg-gradient-to-b from-primary/5 via-transparent to-transparent">
          {/* Decorative background grid and blurs */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="absolute top-20 right-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-1/4 w-72 h-72 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center space-y-6 md:space-y-8 relative z-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3 animate-spin-slow" />
              Om-Nectra Interactive Publishing
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight leading-none text-foreground">
              The Digital Classroom for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-500 to-secondary animate-gradient bg-[size:200%]">
                Robotics & Artificial Intelligence
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              Production-ready interactive textbooks for Class 1 to Class 9. Empowering young learners with data-driven activities, quizzes, lab manuals, and 3D flipbooks.
            </p>

            {/* Central Search Form */}
            <form
              onSubmit={handleSearch}
              className="max-w-lg mx-auto flex items-center relative shadow-md shadow-primary/5 hover:shadow-lg transition-shadow duration-200 border border-border/80 rounded-2xl bg-card overflow-hidden p-1"
            >
              <Search className="absolute left-4 text-muted-foreground w-5 h-5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search subjects, classes, or chapters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-sm md:text-base bg-transparent border-0 focus:outline-none focus:ring-0 font-semibold text-foreground"
              />
              <Button type="submit" variant="primary" size="md" className="cursor-pointer">
                Search
              </Button>
            </form>
          </div>
        </section>

        {/* Grade Catalog Cards Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl md:text-3xl font-heading font-black tracking-tight text-foreground">
              Browse Classes
            </h2>
            <p className="text-sm md:text-base text-muted-foreground font-medium">
              Access mapped curricula custom designed for Class 1 through Class 9.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }, (_, i) => {
              const grade = i + 1;
              const hasFullContent = grade === 1 || grade === 9;
              
              return (
                <Link key={grade} href={`/books/class-${grade}`} passHref>
                  <div className="group relative border border-border/80 bg-card rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 cursor-pointer flex flex-col justify-between h-44 overflow-hidden">
                    {/* Corner gradient glow */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors blur-lg" />
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                          Class {grade}
                        </span>
                        {hasFullContent && (
                          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                            Full Content
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                        {grade === 1 
                          ? "Miko's Tech Adventures"
                          : grade === 9 
                          ? "Foundations of AI & Robotics"
                          : `Next-Gen Subject Curriculum`}
                      </h3>
                      
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        Interactive robotics, computational thinking pathways, quizzes, and mini laboratory tasks for Grade {grade}.
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/30 text-xs font-heading font-bold text-muted-foreground group-hover:text-primary transition-colors">
                      <span>Explore Textbook</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured Spotlights */}
        <section className="bg-muted/40 dark:bg-muted/10 border-y border-border/60 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-heading font-black tracking-tight text-foreground">
                Featured Interactive Textbooks
              </h2>
              <p className="text-sm md:text-base text-muted-foreground font-medium">
                Try out our fully loaded textbook experiences ready for school curriculum deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
              {featuredBooks.map((book) => (
                <div key={book.id} className="grid grid-cols-1 sm:grid-cols-5 gap-6 items-center">
                  <div className="sm:col-span-2">
                    <Link href={`/books/${book.classId}`}>
                      <BookCover
                        title={book.title}
                        grade={book.grade}
                        subject={book.subject}
                        coverColor={book.coverColor}
                        iconName={book.iconName}
                      />
                    </Link>
                  </div>
                  
                  <div className="sm:col-span-3 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                        {book.subject}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                      <span className="text-[10px] font-bold text-accent uppercase">
                        Class {book.grade}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-heading font-black text-foreground">
                      {book.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {book.description}
                    </p>

                    <div className="pt-2">
                      <Link href={`/books/${book.classId}`} passHref>
                        <Button variant="primary" size="sm" className="gap-1 cursor-pointer font-bold text-xs">
                          Open Book details
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Platform Updates / Core Strengths */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-heading font-black tracking-tight text-foreground">
              Built for Scale & Performance
            </h2>
            <p className="text-sm md:text-base text-muted-foreground font-medium">
              A comprehensive publishing foundation optimized for classroom usage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border/80 rounded-2xl p-6 space-y-3 shadow-sm">
              <div className="p-3 bg-primary/10 text-primary rounded-2xl w-fit">
                <Library className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-foreground">
                Modular Content Layers
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Separated content architecture allows for easy MDX textbook mapping, and future updates to Subjects like Mathematics, Science, and Python.
              </p>
            </div>

            <div className="bg-card border border-border/80 rounded-2xl p-6 space-y-3 shadow-sm">
              <div className="p-3 bg-secondary/10 text-secondary rounded-2xl w-fit">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-foreground">
                AI Generation (Future)
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Hooks and routes pre-structured to integrate AI content generators, automated quiz suggestions, and custom graphics directly.
              </p>
            </div>

            <div className="bg-card border border-border/80 rounded-2xl p-6 space-y-3 shadow-sm">
              <div className="p-3 bg-accent/10 text-accent rounded-2xl w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-foreground">
                Fully Responsive & Printable
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Adapts fluidly to tablets, mobile phones, and desktop screens. Exports optimized A4 formats clean of navigation elements for PDF usage.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
