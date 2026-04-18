import { z } from 'zod';

const ChoiceSchema = z.object({
  id: z.enum(['A', 'B', 'C', 'D']),
  text: z.string().min(1),
});

// Accept {term, role} objects or plain strings
const AnatomySchema = z.union([
  z.object({ term: z.string().min(1), role: z.string().min(1) }),
  z.string().min(1).transform(s => ({ term: s, role: '' })),
]);

const RationaleSchema = z.object({
  explanation: z.string().min(1),
  // Accept string[] (bilingual principle names) or object[] (legacy)
  principles: z.union([
    z.array(z.string()),
    z.array(z.object({ name: z.string(), zh: z.string().optional(), relevance: z.string().optional() })),
  ]).optional().default([]),
  anatomy: z.array(AnatomySchema).optional().default([]),
});

export const QuizQuestionSchema = z.object({
  id: z.string().optional().default('q-000000'),
  category: z.string().min(1),
  scenario: z.string().default(''),   // empty string allowed for pure knowledge questions
  choices: z.array(ChoiceSchema).min(4),
  correctId: z.enum(['A', 'B', 'C', 'D']),
  rationale: RationaleSchema.optional(),
});

export const RequestSchema = z.object({
  category: z.enum(['IMP', 'IR', 'ICCB', 'MIXED', 'PRINCIPLES', 'ANATOMY']),
  excludeIds: z.array(z.string()).optional().default([]),
  topic: z.string().optional().default(''),
  usedContexts: z.array(z.string()).optional().default([]),
});

/** Generate a random 6-char hex ID */
export function generateId() {
  const bytes = crypto.getRandomValues(new Uint8Array(3));
  return 'q-' + Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

/** Strip markdown code fences if present */
function stripMarkdown(text) {
  return text
    .replace(/^```json\s*/im, '')
    .replace(/^```\s*/im, '')
    .replace(/```\s*$/im, '')
    .trim();
}

/** Parse and validate raw JSON string from Gemini */
export function parseQuestion(rawText) {
  const cleaned = stripMarkdown(rawText);

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    console.error('JSON parse failed. Raw text:', cleaned.slice(0, 300));
    throw new Error('生成內容過長或格式錯誤，請重試');
  }

  const result = QuizQuestionSchema.safeParse(parsed);
  if (!result.success) {
    console.error('Zod validation failed:', JSON.stringify(result.error.issues));
    console.error('Parsed object keys:', Object.keys(parsed));
    throw new Error('Schema mismatch: ' + result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; '));
  }

  result.data.id = generateId();
  return result.data;
}

/** Parse and validate rationale JSON from Gemini (/api/rationale endpoint) */
export function parseRationale(rawText) {
  const cleaned = stripMarkdown(rawText);

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    console.error('Rationale parse failed. Raw text:', cleaned.slice(0, 300));
    throw new Error('解析生成失敗，請再試一次');
  }

  const result = RationaleSchema.safeParse(parsed);
  if (!result.success) {
    console.error('Rationale Zod failed:', JSON.stringify(result.error.issues));
    throw new Error('解析格式錯誤，請再試一次');
  }

  return result.data;
}
