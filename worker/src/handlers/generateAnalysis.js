import { buildAnalysisPrompt } from '../lib/promptBuilder.js';
import { callGemini, GeminiError } from '../lib/gemini.js';
import { corsResponse } from '../lib/cors.js';
import { z } from 'zod';

const AnalysisRequestSchema = z.object({
  categoryLabel: z.string().min(1),
  score: z.object({ correct: z.number(), total: z.number() }),
  wrongQuestions: z.array(z.object({
    scenario: z.string(),
    correctText: z.string(),
    selectedText: z.string(),
    explanation: z.string().optional().default(''),
  })),
});

export async function handleGenerateAnalysis(request, env, corsHeaders) {
  let body;
  try { body = await request.json(); }
  catch { return corsResponse(400, { error: { code: 'BAD_REQUEST', message: 'Invalid JSON' } }, corsHeaders); }

  const parsed = AnalysisRequestSchema.safeParse(body);
  if (!parsed.success) {
    return corsResponse(400, { error: { code: 'INVALID_INPUT', message: parsed.error.issues.map(i => i.message).join('; ') } }, corsHeaders);
  }

  const { categoryLabel, score, wrongQuestions } = parsed.data;
  const { systemInstruction, userMessage } = buildAnalysisPrompt(categoryLabel, score, wrongQuestions);

  let rawText;
  try {
    rawText = await callGemini(env.MODEL_NAME, env.GEMINI_API_KEY, systemInstruction, userMessage);
  } catch (err) {
    if (err instanceof GeminiError) return corsResponse(502, { error: { code: 'GEMINI_ERROR', message: err.message } }, corsHeaders);
    return corsResponse(502, { error: { code: 'UPSTREAM_ERROR', message: 'Failed to reach AI service.' } }, corsHeaders);
  }

  let analysis;
  try {
    const cleaned = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
    analysis = JSON.parse(cleaned).analysis;
    if (!analysis) throw new Error('missing analysis field');
  } catch {
    // Fallback: treat raw text as the analysis
    analysis = rawText.trim();
  }

  return corsResponse(200, { analysis }, corsHeaders);
}
