
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Trophy, Star, Play } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "🟣 Quem é o líder do BTS?",
    options: ["V", "Jin", "RM", "Jimin"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "🟣 Em que ano o BTS estreou?",
    options: ["2012", "2013", "2014", "2015"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "🟣 Qual é o nome oficial do fandom do BTS?",
    options: ["Lovers", "Blinks", "Army", "Dreamers"],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "🟣 Qual integrante é conhecido como 'Golden Maknae'?",
    options: ["Jimin", "V", "Jungkook", "Jin"],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "🟣 Qual música do BTS tem o clipe totalmente em inglês?",
    options: ["DNA", "Fake Love", "Dynamite", "Run"],
    correctAnswer: 2
  },
  {
    id: 6,
    question: "🟣 Qual desses álbuns contém a faixa 'Butterfly'?",
    options: ["BE", "Wings", "Map of the Soul: Persona", "Love Yourself: Her"],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "🟣 Quantos membros tem o grupo BTS?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2
  }
];

const motivationalMessages = [
  "Você está indo muito bem! 💜",
  "Rumo ao prêmio! 🎯",
  "Mostre que você é um verdadeiro ARMY! 💪",
  "Incrível! Continue assim! ⭐",
  "Você é um expert em BTS! 🔥",
  "Quase lá! Mantenha o foco! 🚀",
  "Última pergunta! Vamos nessa! 🏆"
];

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
      toast({
        title: "✅ Parabéns!",
        description: `Você ganhou R$75,00. Seu saldo atual é de R$${newScore},00`,
        duration: 3000,
      });
    } else {
      toast({
        title: "❌ Ops!",
        description: "Resposta incorreta. Mas não se preocupe, você ainda pode continuar e acumular mais!",
        duration: 3000,
        variant: "destructive"
      });
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

  // Welcome Screen - Otimizada para ocupar toda a tela
  if (!gameStarted) {
    return (
      <div className="h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-sm mx-auto">
          <Card className="border-2 border-purple-300 shadow-2xl">
            <CardContent className="p-6 text-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-lg sm:text-xl font-bold text-purple-800 leading-tight">
                  🎤 Desafio BTS: Mostre que é um verdadeiro ARMY e ganhe até R$525,00!
                </h1>
                
                <div className="bg-purple-50 p-4 rounded-xl space-y-3">
                  <p className="text-sm text-gray-700">
                    Cada pergunta certa vale R$75,00.
                  </p>
                  <p className="text-sm text-gray-700">
                    Acerte todas e saque seu saldo via Pix!
                  </p>
                  <p className="text-xs text-purple-600 font-semibold">
                    👉 Toque em COMEÇAR para iniciar o desafio.
                  </p>
                </div>
                
                <Button 
                  onClick={handleStartGame} 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-6 py-3 text-base h-auto shadow-lg transform hover:scale-105 transition-all duration-300 w-full"
                >
                  <Play className="w-4 h-4 mr-2" />
                  COMEÇAR AGORA
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Quiz Game - Otimizado para ocupar toda a tela
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  return (
    <div className="h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 flex flex-col p-4">
      <div className="flex-1 flex flex-col justify-between max-w-2xl mx-auto w-full">
        {/* Header */}
        <div className="text-center pt-4 pb-2">
          <div className="flex items-center justify-center gap-2 mb-3">
            <h1 className="text-xl sm:text-2xl font-bold text-white">💜DESAFIO BTS💜</h1>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-lg font-bold inline-block shadow-lg">
            💰 Saldo: R${score},00
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-white mb-2 text-sm">
            <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
            <span>{Math.round(progress)}% concluído</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card - Flex grow para ocupar espaço disponível */}
        <div className="flex-1 flex flex-col">
          <Card className="border-2 border-purple-300 shadow-2xl flex-1 flex flex-col">
            <CardContent className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
              <div className="text-center mb-4">
                <div className="text-purple-600 font-semibold mb-2 text-sm">
                  {motivationalMessages[currentQuestion]}
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 leading-relaxed">
                  {currentQ.question}
                </h2>
              </div>

              <div className="space-y-3 flex-1 flex flex-col justify-center">
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
                    className={`w-full p-3 sm:p-4 text-left text-sm sm:text-base font-medium h-auto justify-start relative transition-all duration-300 ${
                      showResult && index === currentQ.correctAnswer
                        ? 'bg-green-500 hover:bg-green-600 text-white border-green-500'
                        : showResult && selectedAnswer === index && index !== currentQ.correctAnswer
                        ? 'bg-red-500 hover:bg-red-600 text-white border-red-500'
                        : ''
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={answered}
                  >
                    <span className="mr-3 font-bold text-purple-600">
                      {String.fromCharCode(65 + index)})
                    </span>
                    {option}
                    {showResult && index === currentQ.correctAnswer && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                    )}
                    {showResult && selectedAnswer === index && index !== currentQ.correctAnswer && (
                      <XCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                    )}
                  </Button>
                ))}
              </div>

              {showResult && (
                <div className="mt-4 text-center">
                  <div className="mb-4 p-3 rounded-lg bg-purple-50">
                    {selectedAnswer === currentQ.correctAnswer ? (
                      <div className="text-green-600 font-bold text-sm sm:text-base">
                        🎉 Correto! +R$75,00 na sua conta!
                      </div>
                    ) : (
                      <div className="text-red-600 font-bold text-sm sm:text-base">
                        😞 Resposta incorreta, mas continue tentando!
                      </div>
                    )}
                  </div>
                  
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-6 py-3 text-sm sm:text-base w-full"
                  >
                    {currentQuestion < questions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado Final'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bottom info */}
        <div className="text-center text-white/80 text-xs pt-2">
          💡 Acerte pelo menos 3 perguntas para sacar seu prêmio via Pix!
        </div>
      </div>
    </div>
  );
};

export default QuizGame;
