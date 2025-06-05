
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Trophy, Star } from 'lucide-react';
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
    question: "Qual o nome do líder da banda BTS?",
    options: ["Jin", "RM", "Suga", "J-Hope"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Em que ano o BTS estreou?",
    options: ["2012", "2013", "2014", "2015"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Qual o fandom oficial do BTS?",
    options: ["BLINK", "ARMY", "ONCE", "STAY"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Qual membro é conhecido como 'Golden Maknae'?",
    options: ["V", "Jimin", "Jungkook", "Jin"],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "Qual o nome do álbum que contém a música 'Dynamite'?",
    options: ["Love Yourself: Answer", "Map of the Soul: 7", "BE", "Proof"],
    correctAnswer: 2
  }
];

const motivationalMessages = [
  "Você está indo muito bem! 💜",
  "Rumo ao prêmio! 🎯",
  "Mostre que você é um verdadeiro ARMY! 💪",
  "Incrível! Continue assim! ⭐",
  "Você é um expert em BTS! 🔥"
];

interface QuizGameProps {
  onComplete: (score: number, correctAnswers: number) => void;
}

const QuizGame = ({ onComplete }: QuizGameProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

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

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="text-yellow-400 w-8 h-8" />
            <h1 className="text-3xl font-bold text-white">BTS Quiz Challenge</h1>
            <Star className="text-yellow-400 w-8 h-8" />
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full text-xl font-bold inline-block shadow-lg">
            💰 Saldo: R${score},00
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-white mb-2">
            <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
            <span>{Math.round(progress)}% concluído</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="mb-8 border-2 border-purple-300 shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="text-purple-600 font-semibold mb-2">
                {motivationalMessages[currentQuestion]}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
                {currentQ.question}
              </h2>
            </div>

            <div className="space-y-4">
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
                  className={`w-full p-6 text-left text-lg font-medium h-auto justify-start relative transition-all duration-300 ${
                    showResult && index === currentQ.correctAnswer
                      ? 'bg-green-500 hover:bg-green-600 text-white border-green-500'
                      : showResult && selectedAnswer === index && index !== currentQ.correctAnswer
                      ? 'bg-red-500 hover:bg-red-600 text-white border-red-500'
                      : ''
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={answered}
                >
                  <span className="mr-4 font-bold text-purple-600">
                    {String.fromCharCode(65 + index)})
                  </span>
                  {option}
                  {showResult && index === currentQ.correctAnswer && (
                    <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6" />
                  )}
                  {showResult && selectedAnswer === index && index !== currentQ.correctAnswer && (
                    <XCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6" />
                  )}
                </Button>
              ))}
            </div>

            {showResult && (
              <div className="mt-8 text-center">
                <div className="mb-4 p-4 rounded-lg bg-purple-50">
                  {selectedAnswer === currentQ.correctAnswer ? (
                    <div className="text-green-600 font-bold text-lg">
                      🎉 Correto! +R$75,00 na sua conta!
                    </div>
                  ) : (
                    <div className="text-red-600 font-bold text-lg">
                      😞 Resposta incorreta, mas continue tentando!
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={handleNext}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 text-lg"
                >
                  {currentQuestion < questions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado Final'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Prize info */}
        <div className="text-center text-white/80 text-sm">
          💡 Acerte pelo menos 3 perguntas para sacar seu prêmio via Pix!
        </div>
      </div>
    </div>
  );
};

export default QuizGame;
