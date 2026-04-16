/**
 * Calls the Gemini REST API directly using the Web Fetch API.
 * No SDK dependency — compatible with Cloudflare Workers runtime.
 */
export async function callGemini(modelName, apiKey, systemInstruction, userMessage) {
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
      temperature: 0.8,
      topP: 0.95,
      maxOutputTokens: 1024,
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
    throw new GeminiError(response.status, errorText);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new GeminiError(500, 'Empty response from Gemini');
  return text;
}

export class GeminiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
