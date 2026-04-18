/**
 * Calls the Gemini REST API directly using the Web Fetch API.
 * Compatible with Cloudflare Workers runtime.
 */
export async function callGemini(modelName, apiKey, systemInstruction, userMessage, maxOutputTokens = 2000) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const payload = {
    system_instruction: {
      parts: [{ text: systemInstruction }],
    },
    contents: [
      {
        role: 'user',
        parts: [{ text: userMessage }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens,
      responseMimeType: 'application/json',
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Gemini error ${response.status}:`, errorText);
    throw new GeminiError(response.status, errorText);
  }

  const data = await response.json();
  // When thinking mode is active, parts[0] is thinking content (thought: true)
  // and the actual response is in a later part. Find the non-thinking part.
  const parts = data?.candidates?.[0]?.content?.parts || [];
  const text = parts.find(p => !p.thought)?.text;
  if (!text) {
    console.error('Empty Gemini response:', JSON.stringify(data));
    throw new GeminiError(500, 'Empty response from Gemini');
  }
  return text;
}

export class GeminiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
