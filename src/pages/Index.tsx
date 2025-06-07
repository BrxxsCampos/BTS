
import { useState } from 'react';
import QuizGame from '@/components/QuizGame';
import PrizeReveal from '@/components/PrizeReveal';
import CaptureForm from '@/components/CaptureForm';

const Index = () => {
  const [gameCompleted, setGameCompleted] = useState(false);
  const [prizeRevealed, setPrizeRevealed] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleGameComplete = (score: number, correct: number) => {
    setFinalScore(score);
    setCorrectAnswers(correct);
    setGameCompleted(true);
  };

  const handlePrizeReveal = () => {
    setPrizeRevealed(true);
  };

  const resetGame = () => {
    setGameCompleted(false);
    setPrizeRevealed(false);
    setFinalScore(0);
    setCorrectAnswers(0);
  };

  if (gameCompleted && !prizeRevealed) {
    return (
      <PrizeReveal 
        score={finalScore} 
        correctAnswers={correctAnswers} 
        onReveal={handlePrizeReveal} 
      />
    );
  }

  if (prizeRevealed) {
    return <CaptureForm score={finalScore} correctAnswers={correctAnswers} onReset={resetGame} />;
  }

  return <QuizGame onComplete={handleGameComplete} />;
};

export default Index;
