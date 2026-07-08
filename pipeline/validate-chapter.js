const fs = require('fs');
const path = require('path');

// Extract arguments
const targetDir = process.argv[2];

if (!targetDir) {
  console.error("Error: Please specify the chapter directory path to validate.");
  console.log("Usage: node pipeline/validate-chapter.js <path-to-chapter-folder>");
  process.exit(1);
}

const resolvedPath = path.resolve(targetDir);

if (!fs.existsSync(resolvedPath)) {
  console.error(`Error: Directory not found at: ${resolvedPath}`);
  process.exit(1);
}

// Required files inside every production-ready textbook chapter
const REQUIRED_FILES = [
  'index.mdx',
  'meta.json',
  'teacher-notes.md',
  'worksheet.md',
  'quiz.json',
  'vocabulary.json',
  'image-prompts.md'
];

console.log(`\n========================================`);
console.log(`Checking Curriculum Chapter Production`);
console.log(`Target: ${resolvedPath}`);
console.log(`========================================\n`);

let hasErrors = false;
const errors = [];
const warnings = [];

// Verify existence of all template-derived files
REQUIRED_FILES.forEach(file => {
  const filePath = path.join(resolvedPath, file);
  if (!fs.existsSync(filePath)) {
    errors.push(`Missing Required File: ${file}`);
    hasErrors = true;
  } else {
    console.log(`[PASS] Found: ${file}`);
  }
});

// Fail early if core metadata or content files are missing
if (!fs.existsSync(path.join(resolvedPath, 'index.mdx')) || !fs.existsSync(path.join(resolvedPath, 'meta.json'))) {
  console.error(`\n[FATAL] index.mdx or meta.json missing. Cannot proceed with deep content checks.`);
  console.log(`\nErrors:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

// Load configurations
const meta = JSON.parse(fs.readFileSync(path.join(resolvedPath, 'meta.json'), 'utf8'));
const mdxContent = fs.readFileSync(path.join(resolvedPath, 'index.mdx'), 'utf8');

// Get class-grade level context from path
const folderParts = resolvedPath.split(path.sep);
const classFolderName = folderParts.find(p => p.startsWith('class')) || 'class1';
const grade = parseInt(classFolderName.replace(/\D/g, ''), 10) || 1;

// 1. Mandatory Component Verifications
if (!mdxContent.includes('<LearningObjectiveCard') && !mdxContent.includes('<LearningObjectivesCard')) {
  warnings.push(`Content Guideline: Learning Objectives Card not explicitly declared inside index.mdx.`);
}

if (!mdxContent.includes('<StoryCard')) {
  errors.push(`Validation Rule Error: No <StoryCard /> found in index.mdx. Every chapter must introduce topics in story context.`);
  hasErrors = true;
}

const hasHeadings = /<h[1-3]\s+id=/.test(mdxContent) || /##\s+/.test(mdxContent);
if (!hasHeadings) {
  errors.push(`Validation Rule Error: No navigation headings found in index.mdx. Structured H2/H3 section nodes are required.`);
  hasErrors = true;
}

const hasActivity = mdxContent.includes('<ActivityCard') || mdxContent.includes('<MiniProjectCard');
if (!hasActivity) {
  errors.push(`Validation Rule Error: No <ActivityCard /> or <MiniProjectCard /> found in index.mdx. Exercises are required.`);
  hasErrors = true;
}

if (!mdxContent.includes('<VocabularyCard')) {
  warnings.push(`Content Guideline: No <VocabularyCard /> references declared in index.mdx.`);
}

if (!mdxContent.includes('<SummaryCard')) {
  warnings.push(`Content Guideline: No <SummaryCard /> takeaway list defined in index.mdx.`);
}

// 2. Readability Check (Average Sentence Word Counts)
const sentences = mdxContent
  .replace(/<[^>]*>/g, ' ') // Strip tags
  .split(/[.!?]+/)
  .map(s => s.trim().split(/\s+/).filter(w => w.length > 0))
  .filter(s => s.length > 0);

const totalWords = sentences.reduce((acc, s) => acc + s.length, 0);
const avgSentenceLength = sentences.length > 0 ? totalWords / sentences.length : 0;

let maxSentenceWords = 20;
if (grade <= 3) {
  maxSentenceWords = 10; // Early primary language constraint
} else if (grade <= 6) {
  maxSentenceWords = 15; // Primary language constraint
}

console.log(`[INFO] Average sentence length: ${avgSentenceLength.toFixed(1)} words (Target: <= ${maxSentenceWords} words for Grade ${grade})`);
if (avgSentenceLength > maxSentenceWords) {
  warnings.push(`Quality Checklist: Sentence complexity is high. Average sentence length is ${avgSentenceLength.toFixed(1)} words (Target: <= ${maxSentenceWords} words for Grade ${grade}).`);
}

// 3. Quiz & Assessment Completeness Check
let quizCount = 0;
if (fs.existsSync(path.join(resolvedPath, 'quiz.json'))) {
  try {
    const quizzes = JSON.parse(fs.readFileSync(path.join(resolvedPath, 'quiz.json'), 'utf8'));
    quizCount = quizzes.length;
  } catch (e) {
    errors.push(`Validation Rule Error: quiz.json is invalid JSON.`);
    hasErrors = true;
  }
}
const mdxQuizCount = (mdxContent.match(/<QuizCard/g) || []).length;
const totalQuizzes = quizCount + mdxQuizCount;

if (totalQuizzes < 2) {
  warnings.push(`Quality Checklist: Chapter has only ${totalQuizzes} assessment check(s). Target is >= 2 check questions.`);
}

// 4. Vocabulary Completeness Check
let vocabCount = 0;
if (fs.existsSync(path.join(resolvedPath, 'vocabulary.json'))) {
  try {
    const vocabs = JSON.parse(fs.readFileSync(path.join(resolvedPath, 'vocabulary.json'), 'utf8'));
    vocabCount = vocabs.length;
  } catch (e) {
    errors.push(`Validation Rule Error: vocabulary.json is invalid JSON.`);
    hasErrors = true;
  }
}
const mdxVocabCount = (mdxContent.match(/<VocabularyCard/g) || []).length;
const totalVocabs = vocabCount + mdxVocabCount;

if (totalVocabs < 2) {
  warnings.push(`Quality Checklist: Chapter has only ${totalVocabs} vocabulary definition(s). Target is >= 2 terms.`);
}

// 5. Illustration Plans
const imageMatches = (mdxContent.match(/!\[.*\]\(.*\)/g) || []).length;
if (imageMatches < 1) {
  warnings.push(`Quality Checklist: No illustrations parsed in MDX content. Standalone images are recommended.`);
}

// 6. Compilation Qualification Report
console.log(`\n========================================`);
console.log(`Validation Quality Report`);
console.log(`========================================`);

if (hasErrors) {
  console.log(`\nSTATUS: ❌ FAILED QUALIFICATION`);
  console.log(`\nErrors to fix:`);
  errors.forEach(e => console.log(`- ${e}`));
} else {
  console.log(`\nSTATUS: ✅ PASSED FOR COMPILATION`);
}

if (warnings.length > 0) {
  console.log(`\nRecommendations / Warnings:`);
  warnings.forEach(w => console.log(`- ${w}`));
}

console.log(`\n========================================\n`);

process.exit(hasErrors ? 1 : 0);
