import { buildRationalePrompt } from '../lib/promptBuilder.js';
import { callGemini, GeminiError } from '../lib/gemini.js';
import { parseRationale } from '../lib/validation.js';
import { corsResponse } from '../lib/cors.js';
import { z } from 'zod';

const RationaleRequestSchema = z.object({
  scenario: z.string().min(1),
  choices: z.array(z.object({ id: z.enum(['A', 'B', 'C', 'D']), text: z.string() })).min(4),
  correctId: z.enum(['A', 'B', 'C', 'D']),
});

export async function handleGenerateRationale(request, env, corsHeaders) {
  let body;
  try {
    body = await request.json();
  } catch {
    return corsResponse(400, { error: { code: 'BAD_REQUEST', message: 'Request body must be JSON' } }, corsHeaders);
  }

  const parsed = RationaleRequestSchema.safeParse(body);
  if (!parsed.success) {
    return corsResponse(400, {
      error: { code: 'INVALID_INPUT', message: parsed.error.issues.map(i => i.message).join('; ') },
    }, corsHeaders);
  }

  const { scenario, choices, correctId } = parsed.data;
  const { systemInstruction, userMessage } = buildRationalePrompt(scenario, choices, correctId);

  let rawText;
  try {
    rawText = await callGemini(env.MODEL_NAME, env.GEMINI_API_KEY, systemInstruction, userMessage);
  } catch (err) {
    if (err instanceof GeminiError) {
      return corsResponse(502, { error: { code: 'GEMINI_ERROR', message: err.message } }, corsHeaders);
    }
    return corsResponse(502, { error: { code: 'UPSTREAM_ERROR', message: 'Failed to reach AI service.' } }, corsHeaders);
  }

  let rationale;
  try {
    rationale = parseRationale(rawText);
  } catch (err) {
    return corsResponse(500, { error: { code: 'PARSE_ERROR', message: err.message } }, corsHeaders);
  }

  return corsResponse(200, { rationale }, corsHeaders);
}
