export type ContentBlockType =
  | 'text'
  | 'image'
  | 'learning-objective'
  | 'activity'
  | 'story'
  | 'quiz'
  | 'vocabulary'
  | 'did-you-know'
  | 'robot-fact'
  | 'challenge'
  | 'mini-project'
  | 'summary'
  | 'teacher-note';

export interface QuizData {
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface VocabularyData {
  term: string;
  definition: string;
  pronunciation?: string;
  exampleSentence?: string;
}

export interface MiniProjectData {
  title: string;
  duration: string;
  materials: string[];
  steps: string[];
  expectedOutput: string;
}

export interface ActivityData {
  title: string;
  duration: string;
  type: 'individual' | 'group' | 'pair';
  instructions: string[];
}

export interface RobotFactData {
  mascot: 'robo-guide' | 'ai-buddy' | 'circuit-chum';
  fact: string;
}

export interface StoryData {
  character: string;
  dialogue: string;
  context?: string;
}

export interface TeacherNoteData {
  pedagogyTip: string;
  classroomActivity?: string;
}

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  title?: string;
  text?: string;
  list?: string[];
  imageUrl?: string;
  // Specific card types
  quiz?: QuizData;
  vocabulary?: VocabularyData;
  miniProject?: MiniProjectData;
  activity?: ActivityData;
  robotFact?: RobotFactData;
  story?: StoryData;
  teacherNote?: TeacherNoteData;
}

export interface Section {
  id: string;
  title: string;
  content: ContentBlock[];
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  description: string;
  readingTime: number; // in minutes
  learningObjectives: string[];
  sections: Section[];
  summary: string[];
}

export interface Book {
  id: string;
  classId: string; // e.g. "class-1"
  grade: number; // 1 to 9
  title: string;
  subject: string;
  description: string;
  coverColor: string; // e.g., gradient css class
  accentColor: string; // Tailwind color class name
  iconName: string; // Lucide icon name
  chapters: Chapter[];
}
