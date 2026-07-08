import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[], options?: IntersectionObserverInit) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const observerOptions = options || {
      rootMargin: '0px 0px -60% 0px', // Trigger when section occupies the top portion of the screen
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Find the entries that are currently intersecting
      const intersectingEntries = entries.filter((entry) => entry.isIntersecting);
      
      if (intersectingEntries.length > 0) {
        // If multiple are intersecting, choose the first one
        setActiveId(intersectingEntries[0].target.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Track the elements
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
      observer.disconnect();
    };
  }, [sectionIds, options]);

  return activeId;
}
