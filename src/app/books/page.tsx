'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Library, Layers } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookCover } from '@/components/textbook/BookCover';
import { getBooks } from '@/lib/mdx';
import Link from 'next/link';

function LibraryCatalog() {
  const BOOKS = getBooks();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedClass, setSelectedClass] = useState<string>('all');

  // Synchronize search query from URL query params
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchQuery(initialSearch);
  }, [initialSearch]);

  const filteredBooks = BOOKS.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass = selectedClass === 'all' || book.classId === selectedClass;

    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="space-y-3 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-heading font-black text-foreground flex items-center justify-center md:justify-start gap-3">
          <Library className="w-8 h-8 text-primary" />
          Interactive Textbook Library
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl font-medium">
          Access digital curricula. Select a grade to view details, table of contents, progress tracking, and open the interactive reader.
        </p>
      </div>

      {/* Filter and Search Bar row */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card border border-border/80 p-4 rounded-2xl shadow-sm">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-muted border border-border/80 rounded-xl focus:outline-none focus:border-primary text-foreground font-medium"
          />
        </div>

        {/* Grade selectors */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-thin">
          <button
            onClick={() => setSelectedClass('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-heading font-bold border transition-all shrink-0 cursor-pointer ${
              selectedClass === 'all'
                ? 'bg-primary border-primary text-white'
                : 'border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            All Classes
          </button>
          {BOOKS.reduce((acc, book) => {
            if (!acc.some((b) => b.classId === book.classId)) {
              acc.push(book);
            }
            return acc;
          }, [] as typeof BOOKS)
            .sort((a, b) => a.grade - b.grade)
            .map((book) => (
              <button
                key={book.classId}
                onClick={() => setSelectedClass(book.classId)}
                className={`px-3 py-1.5 rounded-xl text-xs font-heading font-bold border transition-all shrink-0 cursor-pointer ${
                  selectedClass === book.classId
                    ? 'bg-primary border-primary text-white'
                    : 'border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                Class {book.grade}
              </button>
            ))}
        </div>
      </div>

      {/* Textbooks Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredBooks.map((book) => (
            <div key={book.id} className="space-y-4">
              <Link href={`/books/${book.classId}`}>
                <BookCover
                  title={book.title}
                  grade={book.grade}
                  subject={book.subject}
                  coverColor={book.coverColor}
                  iconName={book.iconName}
                />
              </Link>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-accent uppercase">{book.subject}</span>
                <h3 className="text-base font-heading font-bold text-foreground line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {book.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card">
          <Layers className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-heading font-bold text-foreground">No textbooks found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your search filters or browse other classes.
          </p>
        </div>
      )}
    </div>
  );
}

export default function BooksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <Suspense
          fallback={
            <div className="text-center py-20 font-heading text-muted-foreground">
              Loading library catalog...
            </div>
          }
        >
          <LibraryCatalog />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
