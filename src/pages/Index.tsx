
import { useState } from 'react';
import QuizGame from '@/components/QuizGame';
import PrizeReveal from '@/components/PrizeReveal';
import CaptureForm from '@/components/CaptureForm';
import TaxaLiberacao from '@/components/TaxaLiberacao';
import CadastroForm from '@/components/CadastroForm';

const Index = () => {
  const [gameCompleted, setGameCompleted] = useState(false);
  const [prizeRevealed, setPrizeRevealed] = useState(false);
  const [showTaxaLiberacao, setShowTaxaLiberacao] = useState(false);
  const [showCadastroForm, setShowCadastroForm] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [pixKey, setPixKey] = useState('');

  const handleGameComplete = (score: number, correct: number) => {
    setFinalScore(score);
    setCorrectAnswers(correct);
    setGameCompleted(true);
  };

  const handlePrizeReveal = () => {
    setPrizeRevealed(true);
  };

  const handleTaxaLiberacao = (userPixKey: string) => {
    setPixKey(userPixKey);
    setShowTaxaLiberacao(true);
  };

  const handleCadastrarAgora = () => {
    setShowCadastroForm(true);
  };

  const handleFinalizarCadastro = () => {
    // Redireciona para o link de pagamento após finalizar o cadastro
    window.location.href = 'https://checkout.viperpay.com.br/TpDmjqoT';
  };

  const handlePayment = () => {
    // Aqui você pode implementar a lógica de pagamento
    console.log('Processando pagamento...');
  };

  const resetGame = () => {
    setGameCompleted(false);
    setPrizeRevealed(false);
    setShowTaxaLiberacao(false);
    setShowCadastroForm(false);
    setFinalScore(0);
    setCorrectAnswers(0);
    setPixKey('');
  };

  if (showCadastroForm) {
    return (
      <CadastroForm 
        onFinalizarCadastro={handleFinalizarCadastro}
      />
    );
  }

  if (showTaxaLiberacao) {
    return (
      <TaxaLiberacao 
        score={finalScore} 
        pixKey={pixKey}
        onPayment={handlePayment}
        onCadastrarAgora={handleCadastrarAgora}
      />
    );
  }

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
    return (
      <CaptureForm 
        score={finalScore} 
        correctAnswers={correctAnswers} 
        onReset={resetGame}
        onTaxaLiberacao={handleTaxaLiberacao}
      />
    );
  }

  return <QuizGame onComplete={handleGameComplete} />;
};

export default Index;
