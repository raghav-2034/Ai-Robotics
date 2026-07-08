# Content Production Pipeline Guide

This directory establishes the curriculum development workflow, file templates, quality standards, and automated validation scripts for textbook content creators.

---

## 1. Curriculum Processing Workflow

Every textbook chapter follows a structured lifecycle to ensure academic rigor and pedagogical consistency:

```
[ Curriculum Mapping ]
          │
          ▼
[ Chapter Blueprint ] ────► Define meta.json structure and keywords
          │
          ▼
[ Learning Objectives ] ──► Formulate cognitive outcomes (Bloom's Taxonomy)
          │
          ▼
[ Content Outline ] ──────► Plan section headings (H2/H3 nodes)
          │
          ▼
[ Image Planning ] ───────► Draft Midjourney/DALL-E image-prompts.md
          │
          ▼
[ Activity Planning ] ────► Outline projects and classroom exercises
          │
          ▼
[ Assessment Planning ] ──► Draft quizzes (quiz.json) and worksheet.md
          │
          ▼
[ Teacher Notes ] ────────► Document pedagoy tips (teacher-notes.md)
          │
          ▼
[ MDX Generation ] ───────► Compose index.mdx using educational cards
```

---

## 2. Reusable Templates File Map

A compliant chapter directory contains exactly these 7 files:

1.  `meta.json`: Syllabus configuration (title, reading time, difficulty level, list of learning objectives, index keyword tokens, and list of section headings).
2.  `index.mdx`: Main page lesson prose populated with premium cards (`<StoryCard />`, `<QuizCard />`, `<VocabularyCard />`, etc.).
3.  `teacher-notes.md`: Pedagogical tip blocks, lesson durations, scaffolding ideas, and classroom corrigenda.
4.  `worksheet.md`: Supplemental offline printable homework activities and reflection assignments.
5.  `quiz.json`: Interactive multiple-choice database with choice alternatives and correct option explanations.
6.  `vocabulary.json`: Key terms list showing phonetic pronunciations, context examples, and simple definitions.
7.  `image-prompts.md`: Guidelines and visual prompts for text-to-image AI tools to maintain brand claymation style.

---

## 3. Production Validation Rules

Every chapter must contain these 12 core sections:

*   **Learning Objectives**: Cognitive outcomes declared at the beginning of lessons.
*   **Story**: Friendly mascot dialogues introducing topics in a relatable context.
*   **Concept**: Clear plain-language descriptions of robotics/AI operations.
*   **Examples**: Real-world references demonstrating topics in practice.
*   **Activity**: Hands-on exercises for classroom collaboration.
*   **Mini Project**: Small step-by-step engineering tasks.
*   **Vocabulary**: Glossary definitions of technical jargon.
*   **Summary**: Review notes capturing main conceptual takeaways.
*   **Quiz**: Formative multiple-choice checks.
*   **Homework**: Offline printable worksheets.
*   **Teacher Notes**: Outlines on classroom correction strategies.
*   **Illustration Plan**: Clear text-to-image prompt instructions for graphics consistency.

---

## 4. Running the Quality Inspector

We have automated these quality checks into a validation utility. To inspect a chapter directory, run:

```bash
node pipeline/validate-chapter.js src/content/class1/chapter1
```

The script automatically verifies:
1.  **File presence**: Ensures all 7 required files are present.
2.  **Element checks**: Validates that mandatory interactive cards are present.
3.  **Readability limits**: Enforces average sentence length targets:
    *   **Class 1-3**: Average sentence <= 10 words.
    *   **Class 4-6**: Average sentence <= 15 words.
    *   **Class 7-9**: Average sentence <= 20 words.
4.  **Completeness**: Checks that at least 2 quiz questions and 2 vocabulary terms are present.
5.  **Illustration count**: Verifies image elements exist in the MDX content.
