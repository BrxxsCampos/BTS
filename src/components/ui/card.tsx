import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";

export default function DesafioBTS() {
  return (
    <div className="min-h-screen bg-purple-700 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">💜 DESAFIO BTS 💜</CardTitle>
          <CardDescription className="text-center text-green-500 font-bold">
            Saldo: R$0,00
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-center text-purple-700 font-semibold">
            Você está indo muito bem! 💜
          </p>

          <p className="text-lg font-bold">❓ Quem é o líder do BTS?</p>

          <div className="space-y-2">
            <button className="w-full bg-purple-100 text-purple-900 font-medium py-2 rounded hover:bg-purple-200 transition">
              A) V
            </button>
            <button className="w-full bg-purple-100 text-purple-900 font-medium py-2 rounded hover:bg-purple-200 transition">
              B) Jin
            </button>
            <button className="w-full bg-purple-100 text-purple-900 font-medium py-2 rounded hover:bg-purple-200 transition">
              C) RM
            </button>
            <button className="w-full bg-purple-100 text-purple-900 font-medium py-2 rounded hover:bg-purple-200 transition">
              D) Jimin
            </button>
          </div>
        </CardContent>

        <CardFooter>
          <p className="text-center text-sm text-purple-600 w-full">
            🎯 Acerte pelo menos 3 perguntas para ganhar!
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
