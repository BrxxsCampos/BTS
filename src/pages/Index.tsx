
import { useState } from 'react';
import QuizGame from '@/components/QuizGame';
import CaptureForm from '@/components/CaptureForm';

const Index = () => {
  const [gameCompleted, setGameCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleGameComplete = (score: number, correct: number) => {
    setFinalScore(score);
    setCorrectAnswers(correct);
    setGameCompleted(true);
  };

  const resetGame = () => {
    setGameCompleted(false);
    setFinalScore(0);
    setCorrectAnswers(0);
  };

  if (gameCompleted) {
    return <CaptureForm score={finalScore} correctAnswers={correctAnswers} onReset={resetGame} />;
  }

  return <QuizGame onComplete={handleGameComplete} />;
};

export default Index;
