const API_BASE = import.meta.env.VITE_WORKER_URL
  ? `${import.meta.env.VITE_WORKER_URL}/api`
  : '/api';

/**
 * @param {{ category: string, excludeIds: string[] }} params
 * @returns {Promise<{ question: import('../../shared/types').QuizQuestion }>}
 */
export async function generateQuestion({ category, excludeIds = [] }) {
  const response = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category, excludeIds }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data?.error?.code || 'UNKNOWN', data?.error?.message || 'Unknown error');
  }

  return data;
}

export class ApiError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}
