'use client';

import { useState, useEffect } from 'react';

export interface HeadingItem {
  id: string;
  title: string;
  level: number;
}

export function useAutoTOC(dependency: any) {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Find the main dynamic content container on the page
    const contentEl = document.querySelector('[data-toc-content]') || document.querySelector('main');
    if (!contentEl) return;

    // Retrieve all H1, H2, H3 elements inside the container
    const headingEls = Array.from(contentEl.querySelectorAll('h1, h2, h3'));
    
    const parsedHeadings = headingEls.map((el, index) => {
      let id = el.id;
      // Guarantee that all target tags contain anchorable IDs
      if (!id) {
        const text = el.textContent || '';
        id = text
          .toLowerCase()
          .replace(/\W+/g, '-')
          .replace(/^-+|-+$/g, '');
        
        if (!id) id = `heading-${index}`;
        el.id = id;
      }

      return {
        id,
        title: el.textContent || '',
        level: parseInt(el.tagName.replace('H', ''), 10),
      };
    });

    setHeadings(parsedHeadings);

    // Track active heading position on screen using IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -70% 0px', // Trigger activation near the upper-middle of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      // Find the first intersecting heading and activate it
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) {
        setActiveId(visible.target.id);
      }
    }, observerOptions);

    headingEls.forEach((el) => {
      if (el.id) observer.observe(el);
    });

    return () => {
      headingEls.forEach((el) => {
        if (el.id) observer.unobserve(el);
      });
      observer.disconnect();
    };
  }, [dependency]);

  return { headings, activeId };
}
