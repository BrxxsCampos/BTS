
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
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos em segundos

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
    
    // Simular envio
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
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700 p-4 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center border-2 border-red-300">
          <CardContent className="p-8">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-600 mb-4">Tempo Esgotado!</h2>
            <p className="text-gray-600 mb-6">
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 p-4">
      <div className="max-w-lg mx-auto pt-8">
        {/* Header com resultado */}
        <div className="text-center mb-8">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-4">
            🎉 Parabéns, ARMY!
          </h1>
          
          {canWithdraw ? (
            <>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl text-2xl font-bold mb-4 shadow-lg">
                Você acumulou R${score},00!
              </div>
              <p className="text-white/90 text-lg">
                Você acertou {correctAnswers} de 5 perguntas! 🏆
              </p>
            </>
          ) : (
            <>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-xl text-xl font-bold mb-4 shadow-lg">
                Você acumulou R${score},00
              </div>
              <p className="text-white/90 text-lg mb-4">
                Você acertou {correctAnswers} de 5 perguntas
              </p>
              <div className="bg-red-500/20 border border-red-400 rounded-lg p-4 text-white">
                <AlertTriangle className="w-6 h-6 inline mr-2" />
                Você precisa acertar pelo menos 3 perguntas para sacar via Pix
              </div>
            </>
          )}
        </div>

        {canWithdraw ? (
          <>
            {/* Urgência */}
            <Card className="mb-6 border-2 border-red-400 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 text-red-600">
                  <Clock className="w-6 h-6" />
                  <div>
                    <div className="font-bold text-lg">⏰ ATENÇÃO! Tempo limitado</div>
                    <div className="text-sm">
                      Você tem <span className="font-bold text-xl">{formatTime(timeLeft)}</span> para sacar seu prêmio via Pix.
                      Após esse tempo, seu saldo será zerado!
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Formulário */}
            <Card className="border-2 border-yellow-400 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-500">
                <CardTitle className="text-center text-xl font-bold text-gray-800">
                  💰 Dados para Saque via Pix
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-lg font-semibold">Nome Completo *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Digite seu nome completo"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-2 text-lg p-4 h-12"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-lg font-semibold">E-mail *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Digite seu melhor e-mail"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-2 text-lg p-4 h-12"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="pixKey" className="text-lg font-semibold">Chave Pix *</Label>
                    <Input
                      id="pixKey"
                      name="pixKey"
                      type="text"
                      placeholder="CPF, e-mail, telefone ou chave aleatória"
                      value={formData.pixKey}
                      onChange={handleInputChange}
                      className="mt-2 text-lg p-4 h-12"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 text-xl h-14 shadow-lg"
                  >
                    {isSubmitting ? (
                      "Processando..."
                    ) : (
                      <>
                        <CheckCircle className="w-6 h-6 mr-2" />
                        SACAR R${score},00 VIA PIX
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                  🔒 Seus dados estão seguros conosco.<br />
                  📱 O Pix será enviado em até 24 horas úteis.
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="text-center mt-8">
            <Button 
              onClick={onReset}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 text-lg"
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
