const DEV_ORIGINS = ['http://localhost:5173', 'http://localhost:4173'];

export function buildCorsHeaders(requestOrigin, allowedOrigin) {
  const allowed = [allowedOrigin, ...DEV_ORIGINS];
  const origin = allowed.includes(requestOrigin) ? requestOrigin : null;
  if (!origin) return null;
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-App-Key',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

export function corsResponse(status, body, corsHeaders) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}
