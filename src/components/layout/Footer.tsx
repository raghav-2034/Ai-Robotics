'use client';

import React from 'react';
import Link from 'next/link';
import { Bot, Mail, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/80 py-10 md:py-16 mt-auto no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Branding Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <Bot className="w-5 h-5" />
            </div>
            <span className="font-heading font-black text-lg text-foreground">
              Omcentra
            </span>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            Building the next generation of AI & Robotics curricula. Empowering Class 1 to Class 9 students with hands-on, interactive digital textbooks.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-foreground">
            Curriculum
          </h4>
          <ul className="space-y-1.5 text-xs md:text-sm text-muted-foreground font-medium">
            <li>
              <Link href="/books" className="hover:text-primary transition-colors">
                All Textbooks
              </Link>
            </li>
            <li>
              <Link href="/books/class-1" className="hover:text-primary transition-colors">
                Primary Books (Class 1-3)
              </Link>
            </li>
            <li>
              <Link href="/books/class-6" className="hover:text-primary transition-colors">
                Middle Books (Class 4-6)
              </Link>
            </li>
            <li>
              <Link href="/books/class-9" className="hover:text-primary transition-colors">
                Secondary Books (Class 7-9)
              </Link>
            </li>
          </ul>
        </div>

        {/* Subjects Column */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-foreground">
            Subjects (Future)
          </h4>
          <ul className="space-y-1.5 text-xs md:text-sm text-muted-foreground font-medium">
            <li className="opacity-80">Python & Coding</li>
            <li className="opacity-80">Machine Learning</li>
            <li className="opacity-80">STEM & Robotics</li>
            <li className="opacity-80">Data Science</li>
          </ul>
        </div>

        {/* Contact/Socials Column */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-foreground">
            Connect
          </h4>
          <p className="text-xs md:text-sm text-muted-foreground font-medium">
            Have questions about integrations or license keys?
          </p>
          <div className="flex gap-3 text-muted-foreground">
            <a href="mailto:support@nectralearn.com" className="hover:text-primary transition-colors" aria-label="Mail Support">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Github Repo">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" stroke="none">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
            <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Website">
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-border/40 text-center text-xs text-muted-foreground font-medium">
        <p>© {new Date().getFullYear()} Omcentra Student Platform. All rights reserved. Built with Next.js 16 & React 19.</p>
      </div>
    </footer>
  );
}
