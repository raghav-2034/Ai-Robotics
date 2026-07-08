'use client';

export function useAnalytics() {
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    // Console logs acting as hook registers for future telemetry vendors
    console.log(`[Analytics Event] ${eventName}:`, properties);
  };

  return {
    trackBookOpened: (bookId: string, title: string) => {
      trackEvent('Book Opened', { bookId, title });
    },
    trackChapterOpened: (bookId: string, chapterId: string, title: string) => {
      trackEvent('Chapter Opened', { bookId, chapterId, title });
    },
    trackReadingStarted: (bookId: string, chapterId: string) => {
      trackEvent('Reading Started', { bookId, chapterId });
    },
    trackReadingCompleted: (bookId: string, chapterId: string) => {
      trackEvent('Reading Completed', { bookId, chapterId });
    },
    trackActivityOpened: (activityTitle: string, duration: string) => {
      trackEvent('Activity Opened', { activityTitle, duration });
    },
    trackQuizOpened: (question: string) => {
      trackEvent('Quiz Opened', { question });
    },
  };
}
