
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CadastroFormProps {
  onFinalizarCadastro: () => void;
}

const CadastroForm = ({ onFinalizarCadastro }: CadastroFormProps) => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    telefone: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFinalizarCadastro = () => {
    onFinalizarCadastro();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 flex flex-col p-4 overflow-y-auto">
      <div className="max-w-2xl mx-auto w-full space-y-6 py-6">
        
        {/* Header */}
        <Card className="border-2 border-yellow-400 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4">
            <CardTitle className="text-center text-xl font-bold text-gray-800">📝 CADASTRO</CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-center">
            <h2 className="font-bold text-purple-800 mb-4 text-xl">COMPLETE SEU CADASTRO</h2>
            <p className="text-gray-700 text-lg mb-6">
              Preencha os dados abaixo para finalizar seu cadastro no Clube ARMY
            </p>
          </CardContent>
        </Card>

        {/* Formulário */}
        <Card className="border border-gray-300 shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="nomeCompleto" className="text-base font-medium text-gray-700">
                  Nome Completo:
                </Label>
                <Input
                  id="nomeCompleto"
                  type="text"
                  value={formData.nomeCompleto}
                  onChange={(e) => handleInputChange('nomeCompleto', e.target.value)}
                  className="mt-1"
                  placeholder="Digite seu nome completo"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-base font-medium text-gray-700">
                  Email:
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="mt-1"
                  placeholder="Digite seu email"
                />
              </div>

              <div>
                <Label htmlFor="telefone" className="text-base font-medium text-gray-700">
                  Telefone:
                </Label>
                <Input
                  id="telefone"
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange('telefone', e.target.value)}
                  className="mt-1"
                  placeholder="Digite seu telefone"
                />
              </div>
            </div>

            <Button 
              onClick={handleFinalizarCadastro}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 text-lg shadow-lg mt-6"
            >
              FINALIZAR CADASTRO
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CadastroForm;
