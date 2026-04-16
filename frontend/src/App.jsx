import { QuizProvider, useQuiz } from './context/QuizContext.jsx';
import { PHASES } from './reducers/quizReducer.js';
import Home from './pages/Home.jsx';
import Quiz from './pages/Quiz.jsx';
import Results from './pages/Results.jsx';

function AppRouter() {
  const { phase } = useQuiz();
  if (phase === PHASES.SELECT) return <Home />;
  if (phase === PHASES.COMPLETE) return <Results />;
  return <Quiz />;
}

export default function App() {
  return (
    <QuizProvider>
      <AppRouter />
    </QuizProvider>
  );
}
