const API_BASE = import.meta.env.VITE_WORKER_URL
  ? `${import.meta.env.VITE_WORKER_URL}/api`
  : '/api';

function appKeyHeaders() {
  const key = sessionStorage.getItem('app_key') || '';
  return { 'Content-Type': 'application/json', 'X-App-Key': key };
}

/**
 * @param {{ category: string, excludeIds: string[] }} params
 * @returns {Promise<{ question: import('../../shared/types').QuizQuestion }>}
 */
export async function generateQuestion({ category, excludeIds = [], topic = '', usedContexts = [] }) {
  let response;
  try {
    response = await fetch(`${API_BASE}/generate`, {
      method: 'POST',
      headers: appKeyHeaders(),
      body: JSON.stringify({ category, excludeIds, topic, usedContexts }),
    });
  } catch (networkErr) {
    throw new ApiError('NETWORK_ERROR', `網路錯誤：${networkErr.message}（API: ${API_BASE}）`);
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new ApiError('PARSE_ERROR', `HTTP ${response.status}，回傳非 JSON（API: ${API_BASE}）`);
  }

  if (!response.ok) {
    throw new ApiError(data?.error?.code || 'UNKNOWN', data?.error?.message || 'Unknown error');
  }

  return data;
}

export async function generateRationale({ scenario, choices, correctId }) {
  const response = await fetch(`${API_BASE}/rationale`, {
    method: 'POST',
    headers: appKeyHeaders(),
    body: JSON.stringify({ scenario, choices, correctId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data?.error?.code || 'UNKNOWN', data?.error?.message || 'Unknown error');
  }

  return data;
}

export async function generateAnalysis({ categoryLabel, score, wrongQuestions }) {
  const response = await fetch(`${API_BASE}/analysis`, {
    method: 'POST',
    headers: appKeyHeaders(),
    body: JSON.stringify({ categoryLabel, score, wrongQuestions }),
  });
  const data = await response.json();
  if (!response.ok) throw new ApiError(data?.error?.code || 'UNKNOWN', data?.error?.message || 'Unknown error');
  return data;
}

export class ApiError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}
