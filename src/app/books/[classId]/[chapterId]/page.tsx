import React from 'react';
import { Metadata } from 'next';
import { getBook, getChapterMetadata } from '@/lib/mdx';
import { ReaderClient } from './ReaderClient';

interface ReaderPageProps {
  params: Promise<{ classId: string; chapterId: string }>;
}

// Generate dynamic SEO metadata on the server side
export async function generateMetadata({ params }: ReaderPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { classId, chapterId } = resolvedParams;
  const book = getBook(classId);

  try {
    const meta = await getChapterMetadata(classId, chapterId);
    const title = `${meta.title} - Class ${book?.grade || ''} ${book?.subject || 'Textbook'}`;
    const description = meta.learningObjectives?.join('. ') || book?.description || '';
    const url = `https://nectralearn.edu/books/${classId}/${chapterId}`;

    return {
      title,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        type: 'article',
        siteName: 'NectraLearn',
        authors: ['NectraLearn Publishing'],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    };
  } catch (e) {
    return {
      title: 'Interactive Textbook Reader - NectraLearn',
      description: 'Production-grade digital publishing platform.',
    };
  }
}

export default async function ReaderPage({ params }: ReaderPageProps) {
  const resolvedParams = await params;
  const { classId, chapterId } = resolvedParams;
  const book = getBook(classId);

  let jsonLd = null;
  try {
    const meta = await getChapterMetadata(classId, chapterId);
    const description = meta.learningObjectives?.join('. ') || book?.description || '';
    
    // Construct structured educational JSON-LD schema
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      'headline': meta.title,
      'description': description,
      'inLanguage': 'en',
      'learningResourceType': 'Interactive Textbook Chapter',
      'educationalLevel': `Class ${book?.grade || ''}`,
      'about': {
        '@type': 'Thing',
        'name': book?.subject || 'AI & Robotics',
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'NectraLearn',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://nectralearn.edu/logo.png',
        },
      },
    };
  } catch (e) {
    // Graceful fallback if metadata is missing
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ReaderClient classId={classId} chapterId={chapterId} />
    </>
  );
}
