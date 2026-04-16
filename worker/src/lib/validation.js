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
  principles: z.array(PrincipleSchema).min(1),
  anatomy: z.array(AnatomySchema).min(1),
});

export const QuizQuestionSchema = z.object({
  id: z.string().regex(/^q-[a-f0-9]{6}$/),
  category: z.enum(['IMP', 'IR', 'ICCB']),
  scenario: z.string().min(10),
  choices: z.array(ChoiceSchema).length(4),
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

/** Parse and validate raw JSON string from Gemini */
export function parseQuestion(rawText) {
  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new Error('AI response is not valid JSON');
  }
  // Overwrite the AI-generated ID with a server-generated one for consistency
  parsed.id = generateId();
  return QuizQuestionSchema.parse(parsed);
}
