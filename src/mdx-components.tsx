import type { MDXComponents } from 'mdx/types';
import { ActivityCard } from '@/components/cards/ActivityCard';
import { StoryCard } from '@/components/cards/StoryCard';
import { QuizCard } from '@/components/cards/QuizCard';
import { SummaryCard } from '@/components/cards/SummaryCard';
import { VocabularyCard } from '@/components/cards/VocabularyCard';
import { TeacherNoteCard } from '@/components/cards/TeacherNoteCard';
import { ChallengeCard } from '@/components/cards/ChallengeCard';
import { RobotFactCard } from '@/components/cards/RobotFactCard';
import { LearningObjectiveCard } from '@/components/cards/LearningObjectiveCard';
import { DidYouKnowCard } from '@/components/cards/DidYouKnowCard';
import { TextbookPageFlow } from '@/components/layout/TextbookPageFlow';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    wrapper: ({ children }) => <TextbookPageFlow>{children}</TextbookPageFlow>,
    ActivityCard,
    StoryCard,
    QuizCard,
    SummaryCard,
    VocabularyCard,
    TeacherNoteCard,
    ChallengeCard,
    RobotFactCard,
    LearningObjectiveCard,
    LearningObjectivesCard: LearningObjectiveCard, // Map both names for flexibility
    DidYouKnowCard,
  };
}
