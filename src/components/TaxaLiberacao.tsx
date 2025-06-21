import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Briefcase, Lightbulb, MapPin, Gift, CheckCircle } from 'lucide-react';
interface TaxaLiberacaoProps {
  score: number;
  pixKey: string;
  onPayment: () => void;
  onCadastrarAgora: () => void;
}
const TaxaLiberacao = ({
  score,
  pixKey,
  onPayment,
  onCadastrarAgora
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
                <br />
                <br />📲 Dentro do app, você poderá solicitar o saque do seu saldo via Pix com segurança, acompanhar seu histórico e continuar respondendo perguntas todos os dias para acumular ainda mais recompensas!
                <br />
                <br />💜 Essa é a maneira oficial de validar sua conta, evitar fraudes e garantir que apenas verdadeiros fãs participem do clube.
              </p>
            </div>

            <Button onClick={onCadastrarAgora} className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 text-lg shadow-lg mt-6">
              CADASTRAR AGORA
            </Button>
          </CardContent>
        </Card>

        {/* Informações da Taxa */}
        

        {/* Botão de Pagamento */}
        
      </div>
    </div>;
};
export default TaxaLiberacao;