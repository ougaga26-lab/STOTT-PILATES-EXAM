import { z } from 'zod';

const ChoiceSchema = z.object({
  id: z.enum(['A', 'B', 'C', 'D']),
  text: z.string().min(1),
});

const PrincipleSchema = z.object({
  id: z.number().int().min(1).max(5),
  name: z.string().min(1),
  relevance: z.string().min(1),
});

const AnatomySchema = z.object({
  term: z.string().min(1),
  role: z.string().min(1),
});

const RationaleSchema = z.object({
  explanation: z.string().min(1),
  principles: z.array(PrincipleSchema).optional().default([]),
  anatomy: z.array(AnatomySchema).optional().default([]),
});

export const QuizQuestionSchema = z.object({
  id: z.string().optional().default('q-000000'),
  category: z.string().min(1),
  scenario: z.string().min(1),
  choices: z.array(ChoiceSchema).min(4),
  correctId: z.enum(['A', 'B', 'C', 'D']),
  rationale: RationaleSchema,
});

export const RequestSchema = z.object({
  category: z.enum(['IMP', 'IR', 'ICCB', 'MIXED']),
  excludeIds: z.array(z.string()).optional().default([]),
  difficulty: z.enum(['standard', 'advanced']).optional().default('standard'),
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
    throw new Error('AI response is not valid JSON: ' + e.message);
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
