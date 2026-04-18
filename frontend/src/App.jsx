import { useState } from 'react';
import { QuizProvider, useQuiz, useQuizDispatch } from './context/QuizContext.jsx';
import { PHASES } from './reducers/quizReducer.js';
import Home from './pages/Home.jsx';
import Quiz from './pages/Quiz.jsx';
import Results from './pages/Results.jsx';
import HistoryList from './pages/HistoryList.jsx';
import HistoryDetail from './pages/HistoryDetail.jsx';
import PasswordGate from './pages/PasswordGate.jsx';

function AppRouter({ page, setPage, historyDetail, setHistoryDetail }) {
  const { phase } = useQuiz();
  const dispatch = useQuizDispatch();

  if (page === 'history-list') {
    return (
      <HistoryList
        onBack={() => setPage('quiz')}
        onDetail={r => { setHistoryDetail(r); setPage('history-detail'); }}
      />
    );
  }
  if (page === 'history-detail') {
    return (
      <HistoryDetail
        record={historyDetail}
        onBack={() => setPage('history-list')}
      />
    );
  }

  if (phase === PHASES.SELECT) return <Home onHistory={() => setPage('history-list')} />;
  if (phase === PHASES.COMPLETE) return <Results onHistory={() => { dispatch({ type: 'RESET' }); setPage('history-list'); }} />;
  return <Quiz />;
}

export default function App() {
  const [page, setPage] = useState('quiz');
  const [historyDetail, setHistoryDetail] = useState(null);
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem('app_key') === 'SCTA'
  );

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <QuizProvider>
      <AppRouter
        page={page}
        setPage={setPage}
        historyDetail={historyDetail}
        setHistoryDetail={setHistoryDetail}
      />
    </QuizProvider>
  );
}
