
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle, Trophy, Star, Play, Heart } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [{
  id: 1,
  question: "🟣 Quem é o líder do BTS?",
  options: ["Park JiMin", "Kim Nam-joon", "Jeon JungKook", "Kim SeokJin"],
  correctAnswer: 2
}, {
  id: 2,
  question: "🟣 Em que ano o BTS estreou?",
  options: ["2012", "2013", "2014", "2015"],
  correctAnswer: 1
}, {
  id: 3,
  question: "🟣 Qual é o nome oficial do fandom do BTS?",
  options: ["Lovers", "Blinks", "Army", "Dreamers"],
  correctAnswer: 2
}, {
  id: 4,
  question: "🟣 Qual integrante é conhecido como 'Golden Maknae'?",
  options: ["Jimin", "V", "Jungkook", "Jin"],
  correctAnswer: 2
}, {
  id: 5,
  question: "🟣 Qual música do BTS tem o clipe totalmente em inglês?",
  options: ["DNA", "Fake Love", "Dynamite", "Run"],
  correctAnswer: 2
}, {
  id: 6,
  question: "🟣 Qual desses álbuns contém a faixa 'Butterfly'?",
  options: ["BE", "Wings", "Map of the Soul: Persona", "Love Yourself: Her"],
  correctAnswer: 1
}, {
  id: 7,
  question: "🟣 Quantos membros tem o grupo BTS?",
  options: ["5", "6", "7", "8"],
  correctAnswer: 2
}];

const motivationalMessages = ["Você está indo muito bem! 💜", "Rumo ao prêmio! 🎯", "Mostre que você é um verdadeiro ARMY! 💪", "Incrível! Continue assim! ⭐", "Você é um expert em BTS! 🔥", "Quase lá! Mantenha o foco! 🚀", "Última pergunta! Vamos nessa! 🏆"];

interface QuizGameProps {
  onComplete: (score: number, correctAnswers: number) => void;
}

const QuizGame = ({ onComplete }: QuizGameProps) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [scoreFlashing, setScoreFlashing] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return;
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    setShowResult(true);

    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      const newScore = score + 75;
      setScore(newScore);
      setCorrectAnswers(correctAnswers + 1);
      
      // Trigger flashing effect
      setScoreFlashing(true);
      setTimeout(() => setScoreFlashing(false), 1000);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setAnswered(false);
    } else {
      onComplete(score, correctAnswers);
    }
  };

  // Welcome Screen
  if (!gameStarted) {
    return (
      <div className="h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 flex items-center justify-center p-4">
        <Card className="border-2 border-purple-300 shadow-2xl w-full max-w-md">
          <CardContent className="p-6 text-center flex flex-col justify-center">
            {/* Logo */}
            <div className="mb-6">
              <img 
                src="/lovable-uploads/a3cf91dd-c607-42d5-997e-078d443d5b41.png" 
                alt="Clube Army Logo" 
                className="mx-auto max-w-full h-auto max-h-20 object-contain"
              />
            </div>
            
            <h1 className="text-2xl font-bold text-purple-800 mb-4 leading-tight">💜 Você é fã de verdade do BTS?</h1>
            
            <div className="bg-purple-50 p-4 rounded-xl mb-6 space-y-2">
              <p className="text-lg text-gray-700">Participe do nosso Desafio ARMY e mostre que conhece tudo sobre o grupo!</p>
              <p className="text-lg text-gray-700">A cada resposta certa, você acumula pontos para uma grande recompensa.</p>
              <p className="text-base text-purple-600 font-semibold">
                👉 Toque em COMEÇAR para iniciar o desafio.
              </p>
            </div>
            
            <Button 
              onClick={handleStartGame} 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 text-lg h-auto shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Play className="w-6 h-6 mr-2" />
              COMEÇAR AGORA
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Quiz Game
  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 flex flex-col p-3">
      {/* Header compacto */}
      <div className="text-center mb-3">
        <h1 className="text-xl font-bold text-white mb-3">💜DESAFIO BTS💜</h1>
        <div className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1.5 rounded-full text-base font-bold inline-block shadow-lg transition-all duration-300 ${scoreFlashing ? 'animate-pulse scale-110 bg-gradient-to-r from-yellow-500 to-yellow-600' : ''}`}>
          ⭐ Pontuação: {score} pts
        </div>
      </div>

      {/* Progress com corações roxos */}
      <div className="mb-4">
        <div className="flex justify-between text-white text-xs mb-2">
          <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
          <span>{correctAnswers} acertos</span>
        </div>
        <div className="flex justify-center space-x-2">
          {questions.map((_, index) => (
            <Heart 
              key={index}
              className={`w-6 h-6 transition-all duration-300 ${
                index < currentQuestion 
                  ? 'text-purple-400 fill-purple-400' 
                  : index === currentQuestion 
                  ? 'text-purple-300 fill-purple-300 animate-pulse' 
                  : 'text-purple-600 fill-none'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question Card centralizado e responsivo */}
      <div className="flex-1 flex items-center justify-center">
        <Card className="border-2 border-purple-100 shadow-2xl w-full max-w-md mx-auto">
          <CardContent className="p-4">
            {/* Pergunta */}
            <div className="text-center mb-4">
              <div className="text-purple-600 font-semibold text-xs mb-2">
                {motivationalMessages[currentQuestion]}
              </div>
              <h2 className="text-base font-bold text-gray-800 leading-tight">
                {currentQ.question}
              </h2>
            </div>

            {/* Respostas */}
            <div className="space-y-2 mb-4">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    showResult
                      ? index === currentQ.correctAnswer
                        ? "default"
                        : selectedAnswer === index
                        ? "destructive"
                        : "outline"
                      : selectedAnswer === index
                      ? "secondary"
                      : "outline"
                  }
                  className={`w-full p-2.5 text-left text-sm font-medium h-auto justify-start relative transition-all duration-300 ${
                    showResult && index === currentQ.correctAnswer
                      ? 'bg-green-500 hover:bg-green-600 text-white border-green-500'
                      : showResult && selectedAnswer === index && index !== currentQ.correctAnswer
                      ? 'bg-red-500 hover:bg-red-600 text-white border-red-500'
                      : ''
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={answered}
                >
                  <span className="mr-2 font-bold text-purple-600">
                    {String.fromCharCode(65 + index)})
                  </span>
                  {option}
                  {showResult && index === currentQ.correctAnswer && (
                    <CheckCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                  )}
                  {showResult && selectedAnswer === index && index !== currentQ.correctAnswer && (
                    <XCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                  )}
                </Button>
              ))}
            </div>

            {/* Resultado e botão */}
            {showResult && (
              <div className="text-center">
                <div className="mb-3 p-2 rounded-lg bg-purple-50">
                  {selectedAnswer === currentQ.correctAnswer ? (
                    <div className="text-green-600 font-bold text-xs">
                      🎉 Correto! +75 pontos na sua conta!
                    </div>
                  ) : (
                    <div className="text-red-600 font-bold text-xs">
                      😞 Resposta incorreta, mas continue tentando!
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={handleNext} 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-4 py-2 text-sm"
                >
                  {currentQuestion < questions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado Final'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Prize info compacto */}
      <div className="text-center text-white/80 text-xs mt-2">
        💡 Acerte pelo menos 3 perguntas para resgatar sua recompensa!
      </div>
    </div>
  );
};

export default QuizGame;
