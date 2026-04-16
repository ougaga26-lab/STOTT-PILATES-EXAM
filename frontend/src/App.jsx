import { useState } from 'react';
import { QuizProvider, useQuiz } from './context/QuizContext.jsx';
import { PHASES } from './reducers/quizReducer.js';
import Home from './pages/Home.jsx';
import Quiz from './pages/Quiz.jsx';
import Results from './pages/Results.jsx';
import HistoryList from './pages/HistoryList.jsx';
import HistoryDetail from './pages/HistoryDetail.jsx';

function AppRouter({ page, setPage, historyDetail, setHistoryDetail }) {
  const { phase } = useQuiz();

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
  if (phase === PHASES.COMPLETE) return <Results />;
  return <Quiz />;
}

export default function App() {
  const [page, setPage] = useState('quiz');
  const [historyDetail, setHistoryDetail] = useState(null);

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
