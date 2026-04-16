import { buildPrompt } from '../lib/promptBuilder.js';
import { callGemini, GeminiError } from '../lib/gemini.js';
import { parseQuestion, RequestSchema } from '../lib/validation.js';
import { corsResponse } from '../lib/cors.js';

export async function handleGenerateQuestion(request, env, corsHeaders) {
  // Parse request body
  let body;
  try {
    body = await request.json();
  } catch {
    return corsResponse(400, { error: { code: 'BAD_REQUEST', message: 'Request body must be JSON' } }, corsHeaders);
  }

  // Validate input
  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return corsResponse(400, {
      error: { code: 'INVALID_INPUT', message: parsed.error.issues.map(i => i.message).join('; ') },
    }, corsHeaders);
  }

  const { category, excludeIds } = parsed.data;
  const { systemInstruction, userMessage } = buildPrompt(category, excludeIds);

  // Call Gemini
  let rawText;
  try {
    rawText = await callGemini(env.MODEL_NAME, env.GEMINI_API_KEY, systemInstruction, userMessage);
  } catch (err) {
    if (err instanceof GeminiError) {
      const status = err.status >= 500 ? 502 : 400;
      return corsResponse(status, { error: { code: 'GEMINI_ERROR', message: err.message } }, corsHeaders);
    }
    return corsResponse(502, { error: { code: 'UPSTREAM_ERROR', message: 'Failed to reach AI service.' } }, corsHeaders);
  }

  // Validate and parse AI output
  let question;
  try {
    question = parseQuestion(rawText);
  } catch (err) {
    console.error('Parse error:', err.message, '\nRaw:', rawText);
    return corsResponse(500, { error: { code: 'PARSE_ERROR', message: err.message } }, corsHeaders);
  }

  return corsResponse(200, { question }, corsHeaders);
}
