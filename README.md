# NectraLearn Textbook Publishing Platform

NectraLearn is a production-grade, data-driven interactive textbook publishing platform built for Class 1 to Class 9 AI & Robotics curricula. Designed with a modular architecture, the system is fully scalable to support other subjects (such as Python, Mathematics, Science, and Data Science) by decoupling content files from routing and layout layers.

---

## Architectural Principles (Phase 1 Refactoring)

### 1. Separation of Concerns (Content vs. Metadata)
*   **Static Configuration (`src/config/books.ts`)**: Now contains **only metadata** references (Book ID, titles, cover styles, icons, and chapter references containing paths). No lesson contents, activities, or quizzes remain in this file.
*   **Lesson Content (`src/content/`)**: Decoupled entirely into individual `.mdx` files. This isolates dynamic user interfaces and learning assets from structural layouts.

### 2. Scalability & Bundle Optimization
*   Storing raw lesson text inside a monolithic configuration file causes pages to load excessive, unused data. Moving lessons to MDX and utilizing **Next.js Dynamic Lazy Loading** splits each chapter into independent chunks on disk. Only the text, quizzes, and assets for the active chapter are loaded when a student views a page.

---

## Directory Structure

Textbook contents are structured under modular directory paths:

```
src/content/
├── class1/                # Grade Directory
│   ├── chapter1/          # Chapter Directory
│   │   ├── index.mdx      # Textbook lesson content written in MDX
│   │   ├── meta.json      # Chapter metadata (learning goals, reading stats)
│   │   └── images/        # Local assets owned by this chapter
│   └── chapter2/
│       ├── index.mdx
│       └── meta.json
└── class9/
    └── chapter1/
        ├── index.mdx
        └── meta.json
```

---

## Mapped MDX Components

All premium educational cards can be written directly into MDX files without needing explicit import declarations. They are registered globally inside `src/mdx-components.tsx`:

*   `<ActivityCard activity={{ title, duration, type: 'individual'|'pair'|'group', instructions: [] }} />`
*   `<StoryCard story={{ character, dialogue, context }} />`
*   `<QuizCard quiz={{ question, options: [], correctOptionIndex, explanation }} />`
*   `<VocabularyCard vocabulary={{ term, definition, pronunciation, exampleSentence }} />`
*   `<DidYouKnowCard title text />`
*   `<RobotFactCard robotFact={{ mascot: 'robo-guide'|'ai-buddy'|'circuit-chum', fact }} />`
*   `<ChallengeCard title text />`
*   `<MiniProjectCard miniProject={{ title, duration, materials: [], steps: [], expectedOutput }} />`
*   `<LearningObjectiveCard objectives={[]} />`
*   `<SummaryCard summary={[]} />`
*   `<TeacherNoteCard teacherNote={{ pedagogyTip, classroomActivity }} />`

---

## How to Create a New Chapter

Follow this step-by-step guide to add new chapters:

### Step 1: Register Chapter Metadata in `src/config/books.ts`
Locate the target book inside `src/config/books.ts` and add a new entry to its `chapters` array:
```typescript
{
  id: 'chapter-3',
  number: 3,
  title: 'My New Chapter Title',
  description: 'A brief description of what this chapter covers.',
  readingTime: 15,
  slug: 'my-new-chapter',
  contentPath: 'class1/chapter3' // Directory name under src/content/
}
```

### Step 2: Create the Folder Structure
On your filesystem, create the folder matching your `contentPath`:
```bash
mkdir -p src/content/class1/chapter3
```

### Step 3: Define Chapter Metadata (`meta.json`)
Create `src/content/class1/chapter3/meta.json` to define the learning metadata:
```json
{
  "title": "My New Chapter Title",
  "chapterNumber": 3,
  "readingTime": 15,
  "difficulty": "Beginner",
  "learningObjectives": [
    "Objective 1 details",
    "Objective 2 details"
  ],
  "keywords": ["Keyword1", "Keyword2"],
  "coverImage": "",
  "sections": [
    { "id": "3-1", "title": "First Lesson Section" },
    { "id": "3-2", "title": "Hands-on Activities" }
  ]
}
```

### Step 4: Write Lesson Content (`index.mdx`)
Create `src/content/class1/chapter3/index.mdx`. Place your section headings using JSX tags with custom ID attributes matching the section IDs in `meta.json` (for scroll-spy compatibility), and embed educational cards directly:
```mdx
<h2 id="3-1" className="text-xl md:text-2xl font-heading font-extrabold text-foreground tracking-tight border-l-4 border-primary pl-3 mb-6">First Lesson Section</h2>

Write your lesson paragraphs here.

<RobotFactCard robotFact={{
  mascot: "robo-guide",
  fact: "Robots are helpful tools!"
}} />

<div className="h-4" />

<h2 id="3-2" className="text-xl md:text-2xl font-heading font-extrabold text-foreground tracking-tight border-l-4 border-primary pl-3 mb-6">Hands-on Activities</h2>

<QuizCard quiz={{
  question: "Is Miko a robot?",
  options: ["Yes", "No"],
  correctOptionIndex: 0,
  explanation: "Miko is a helper robot!"
}} />
```

---

## Running the Project Locally

### Install Dependencies
```bash
npm install --legacy-peer-deps
```

### Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the library homepage.
