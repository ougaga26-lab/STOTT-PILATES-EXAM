/**
 * Calls the Gemini REST API directly using the Web Fetch API.
 * Compatible with Cloudflare Workers runtime.
 */
export async function callGemini(modelName, apiKey, systemInstruction, userMessage) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  // Combine system instruction into the user message for maximum compatibility
  const fullPrompt = `${systemInstruction}\n\n---\n\n${userMessage}`;

  const payload = {
    contents: [
      {
        parts: [{ text: fullPrompt }],
      },
    ],
    generationConfig: {
      temperature: 0.8,
      topP: 0.95,
      maxOutputTokens: 8192,
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
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
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
