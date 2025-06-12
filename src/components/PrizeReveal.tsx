import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Gift, Sparkles, Star, Trophy, Coins } from 'lucide-react';
interface PrizeRevealProps {
  score: number;
  correctAnswers: number;
  onReveal: () => void;
}
const PrizeReveal = ({
  score,
  correctAnswers,
  onReveal
}: PrizeRevealProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const handleGiftClick = () => {
    setIsOpening(true);

    // Depois de 1.5s inicia a revelação
    setTimeout(() => {
      setIsRevealed(true);
    }, 1500);
  };
  const handleRedeemClick = () => {
    onReveal();
  };
  return <div className="h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Partículas de fundo */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => <Sparkles key={i} className={`absolute text-yellow-300 animate-pulse`} style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        fontSize: `${Math.random() * 20 + 10}px`
      }} />)}
      </div>

      <Card className="border-2 border-yellow-400 shadow-2xl w-full max-w-md relative z-10">
        <CardContent className="p-6 text-center">
          {!isRevealed ? <>
              <div className="mb-4">
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-3" />
                <h1 className="text-2xl font-bold text-purple-800 mb-2">
                  🎉 Incrível, ARMY!
                </h1>
                <p className="text-gray-700 text-lg mb-3">
                  Você acertou <span className="font-bold text-purple-600">{correctAnswers} perguntas</span> e acumulou
                </p>
                
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl shadow-lg mb-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Star className="w-6 h-6" />
                    <p className="text-2xl font-bold">{score} pontos</p>
                    <Star className="w-6 h-6" />
                  </div>
                </div>

                <p className="text-gray-700 text-base">
                  <span className="font-bold text-green-600 text-center">💜 Você provou que é ARMY de verdade!</span>
                  <p className="text-sm text-gray-600">
                    Cada resposta foi um passo...
                  </p>
                  <p className="text-sm text-gray-600">
                    Cada acerto, uma conquista...
                  </p>
                  <span className="font-bold text-green-600 text-center">E agora chegou a sua recompensa merecida.</span>
                </p>
              </div>

              <div className="mb-6">
                <div className={`cursor-pointer transition-all duration-500 ${isOpening ? 'animate-bounce scale-125' : 'hover:scale-110 hover:rotate-3 animate-pulse'}`} onClick={handleGiftClick} style={{
              animation: isOpening ? 'bounce 0.5s infinite, spin 0.5s infinite' : 'pulse 1.5s infinite, bounce 2s infinite'
            }}>
                  <Gift className={`w-24 h-24 mx-auto mb-3 transition-all duration-500 ${isOpening ? 'text-yellow-500 animate-spin' : 'text-purple-600'}`} />
                </div>
                
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-purple-700">CLIQUE NA CAIXA DE PRESENTE ACIMA</p>
                  <p className="text-sm text-gray-600">
                    para descobrir o que só os verdadeiros fãs do BTS conquistam!
                  </p>
                </div>

                {isOpening && <div className="mt-4 animate-pulse">
                    <p className="text-yellow-600 font-bold">
                      ✨ Convertendo seus pontos... ✨
                    </p>
                  </div>}
              </div>
            </> : <div className="animate-fade-in">
              {/* Efeito de explosão de estrelas */}
              <div className="relative mb-4">
                {[...Array(8)].map((_, i) => <Star key={i} className="absolute w-6 h-6 text-yellow-400 animate-ping" style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-40px)`,
              animationDelay: `${i * 0.1}s`
            }} />)}
                <div className="relative z-10 flex items-center justify-center">
                  <Coins className="w-20 h-20 text-yellow-500" />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text animate-pulse">
                  PARABÉNS!
                </h2>
                
                <div className="bg-purple-50 p-3 rounded-lg mb-4">
                  <p className="text-purple-700 text-sm mb-2">
                    Sua recompensa de <span className="font-bold">{score} pontos</span> foram convertidos em:
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl shadow-lg animate-bounce">
                  <p className="text-sm font-medium mb-1">Saldo Real</p>
                  <p className="text-4xl font-bold">R$ {score},00</p>
                </div>

                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-purple-700 font-semibold text-sm">💜 Você é uma verdadeira especialista em BTS! 💜</p>
                  <p className="text-gray-600 text-xs mt-1">Agora você pode sacar sua recompensa via Pix!</p>
                </div>

                <div className="flex items-center justify-center space-x-1 text-yellow-500 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 animate-pulse" style={{
                animationDelay: `${i * 0.2}s`
              }} />)}
                </div>

                <Button onClick={handleRedeemClick} className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 text-lg shadow-lg animate-pulse">
                  🎁 Resgatar Minha Recompensa
                </Button>
              </div>
            </div>}
        </CardContent>
      </Card>

      {/* Confetes animados quando revelado */}
      {isRevealed && <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => <div key={i} className="absolute w-2 h-2 bg-yellow-400 animate-bounce" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${Math.random() * 3 + 1}s`
      }} />)}
        </div>}
    </div>;
};
export default PrizeReveal;
