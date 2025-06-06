
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
}

const CaptureForm = ({ score, correctAnswers, onReset }: CaptureFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pixKey: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  // Timer countdown
  useState(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.pixKey) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos para sacar seu prêmio!",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: "🎉 Dados enviados com sucesso!",
        description: "Você receberá seu prêmio em até 24 horas úteis!",
        duration: 5000
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const canWithdraw = correctAnswers >= 3;

  if (timeLeft === 0) {
    return (
      <div className="h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700 flex items-center justify-center p-3">
        <Card className="max-w-sm mx-auto text-center border-2 border-red-300 w-full">
          <CardContent className="p-4">
            <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-red-600 mb-3">Tempo Esgotado!</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Infelizmente o tempo para saque expirou.
            </p>
            <Button onClick={onReset} className="bg-purple-600 hover:bg-purple-700 w-full">
              Jogar Novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 flex flex-col">
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        {/* Header compacto */}
        <div className="text-center px-3 py-2">
          <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-1" />
          <h1 className="text-lg font-bold text-white mb-2">
            🎉 Parabéns, ARMY!
          </h1>
          
          {canWithdraw ? (
            <>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-xl text-base font-bold mb-1 shadow-lg">
                Você acumulou R${score},00!
              </div>
              <p className="text-white/90 text-sm">
                {correctAnswers} de 7 perguntas certas! 🏆
              </p>
            </>
          ) : (
            <>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-2 rounded-xl text-base font-bold mb-2 shadow-lg">
                R${score},00 acumulados
              </div>
              <p className="text-white/90 text-sm mb-2">
                {correctAnswers} de 7 perguntas certas
              </p>
              <div className="bg-red-500/20 border border-red-400 rounded-lg p-2 text-white text-xs">
                <AlertTriangle className="w-3 h-3 inline mr-1" />
                Precisa acertar 3+ para sacar via Pix
              </div>
            </>
          )}
        </div>

        {canWithdraw ? (
          <div className="flex-1 flex flex-col px-3 pb-3">
            {/* Timer de urgência compacto */}
            <Card className="mb-2 border-2 border-red-400 bg-red-50">
              <CardContent className="p-2">
                <div className="flex items-center gap-2 text-red-600">
                  <Clock className="w-4 h-4" />
                  <div className="flex-1">
                    <div className="font-bold text-xs">⏰ Tempo limitado</div>
                    <div className="text-xs">
                      <span className="font-bold">{formatTime(timeLeft)}</span> para sacar
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Formulário ocupando o resto da tela */}
            <div className="flex-1">
              <Card className="border-2 border-yellow-400 shadow-2xl h-full">
                <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-2">
                  <CardTitle className="text-center text-sm font-bold text-gray-800">
                    💰 Dados para Saque via Pix
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 flex-1 flex flex-col">
                  <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                    <div className="flex-1 space-y-3">
                      <div>
                        <Label htmlFor="name" className="text-xs font-semibold">Nome Completo *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Digite seu nome completo"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="mt-1 text-xs h-8"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-xs font-semibold">E-mail *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Digite seu melhor e-mail"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-1 text-xs h-8"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="pixKey" className="text-xs font-semibold">Chave Pix *</Label>
                        <Input
                          id="pixKey"
                          name="pixKey"
                          type="text"
                          placeholder="CPF, e-mail, telefone ou chave"
                          value={formData.pixKey}
                          onChange={handleInputChange}
                          className="mt-1 text-xs h-8"
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-3 space-y-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-2 text-xs shadow-lg"
                      >
                        {isSubmitting ? (
                          "Processando..."
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            SACAR R${score},00 VIA PIX
                          </>
                        )}
                      </Button>

                      <div className="text-center text-xs text-gray-600">
                        🔒 Dados seguros • 📱 Pix em 24h
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center px-3 pb-3">
            <Button 
              onClick={onReset}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-6 py-3 text-sm w-full"
            >
              Tentar Novamente
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaptureForm;
