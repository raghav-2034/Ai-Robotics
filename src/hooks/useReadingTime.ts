import { useMemo } from 'react';
import { Section } from '@/types/textbook';

export function calculateReadingTime(sections: Section[], wordsPerMinute = 150): number {
  let wordCount = 0;

  sections.forEach((section) => {
    section.content.forEach((block) => {
      if (block.text) {
        wordCount += block.text.split(/\s+/).length;
      }
      if (block.title) {
        wordCount += block.title.split(/\s+/).length;
      }
      if (block.list) {
        wordCount += block.list.join(' ').split(/\s+/).length;
      }
      
      // Include educational card contents
      if (block.quiz) {
        wordCount += block.quiz.question.split(/\s+/).length;
        wordCount += block.quiz.options.join(' ').split(/\s+/).length;
        wordCount += block.quiz.explanation.split(/\s+/).length;
      }
      if (block.vocabulary) {
        wordCount += block.vocabulary.term.split(/\s+/).length;
        wordCount += block.vocabulary.definition.split(/\s+/).length;
        if (block.vocabulary.exampleSentence) {
          wordCount += block.vocabulary.exampleSentence.split(/\s+/).length;
        }
      }
      if (block.miniProject) {
        wordCount += block.miniProject.title.split(/\s+/).length;
        wordCount += block.miniProject.materials.join(' ').split(/\s+/).length;
        wordCount += block.miniProject.steps.join(' ').split(/\s+/).length;
        wordCount += block.miniProject.expectedOutput.split(/\s+/).length;
      }
      if (block.activity) {
        wordCount += block.activity.title.split(/\s+/).length;
        wordCount += block.activity.instructions.join(' ').split(/\s+/).length;
      }
      if (block.robotFact) {
        wordCount += block.robotFact.fact.split(/\s+/).length;
      }
      if (block.story) {
        wordCount += block.story.dialogue.split(/\s+/).length;
        if (block.story.context) wordCount += block.story.context.split(/\s+/).length;
      }
      if (block.teacherNote) {
        wordCount += block.teacherNote.pedagogyTip.split(/\s+/).length;
        if (block.teacherNote.classroomActivity) {
          wordCount += block.teacherNote.classroomActivity.split(/\s+/).length;
        }
      }
    });
  });

  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function useReadingTime(sections: Section[], wordsPerMinute = 150) {
  return useMemo(() => {
    return calculateReadingTime(sections, wordsPerMinute);
  }, [sections, wordsPerMinute]);
}
