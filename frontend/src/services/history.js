const KEY = 'pilates-exam-history';
const MAX = 10;

export function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveSession(session) {
  const history = loadHistory();
  history.unshift(session);
  if (history.length > MAX) history.splice(MAX);
  localStorage.setItem(KEY, JSON.stringify(history));
}

export function updateAnalysis(id, analysis) {
  const history = loadHistory();
  const idx = history.findIndex(r => r.id === id);
  if (idx !== -1) {
    history[idx].analysis = analysis;
    localStorage.setItem(KEY, JSON.stringify(history));
  }
}
