import { buildCorsHeaders, corsResponse } from './lib/cors.js';
import { handleGenerateQuestion } from './handlers/generateQuestion.js';
import { handleGenerateAnalysis } from './handlers/generateAnalysis.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';
    const corsHeaders = buildCorsHeaders(origin, env.ALLOWED_ORIGIN || '');

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      if (!corsHeaders) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // Reject disallowed origins (non-OPTIONS requests)
    if (!corsHeaders) {
      return new Response(JSON.stringify({ error: { code: 'FORBIDDEN', message: 'Origin not allowed' } }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // App key check (skip health check)
    if (url.pathname !== '/health') {
      const appKey = env.APP_KEY || 'SCTA';
      const providedKey = request.headers.get('X-App-Key') || '';
      if (providedKey !== appKey) {
        return corsResponse(401, { error: { code: 'UNAUTHORIZED', message: '請輸入正確的訪問密碼' } }, corsHeaders);
      }
    }

    // Route: POST /api/generate
    if (url.pathname === '/api/generate' && request.method === 'POST') {
      return handleGenerateQuestion(request, env, corsHeaders);
    }

    // Route: POST /api/analysis
    if (url.pathname === '/api/analysis' && request.method === 'POST') {
      return handleGenerateAnalysis(request, env, corsHeaders);
    }

    // Health check
    if (url.pathname === '/health' && request.method === 'GET') {
      return corsResponse(200, { status: 'ok', model: env.MODEL_NAME }, corsHeaders);
    }

    return corsResponse(404, { error: { code: 'NOT_FOUND', message: 'Route not found' } }, corsHeaders);
  },
};
