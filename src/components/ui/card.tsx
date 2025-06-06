import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card"

export default function DesafioBTS() {
  return (
    <div className="min-h-screen bg-purple-700 flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-white">
        <CardHeader>
          <CardTitle className="text-center">💜 DESAFIO BTS 💜</CardTitle>
          <CardDescription className="text-center text-white">
            Saldo: <span className="text-green-300">R$0,00</span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-4 text-center font-medium">
            Você está indo muito bem! 💜
          </div>
          <div className="font-semibold mb-2">❓ Quem é o líder do BTS?</div>
          <div className="space-y-2">
            <button className="w-full bg-white text-purple-700 rounded-md p-2 hover:bg-purple-100">A) V</button>
            <button className="w-full bg-white text-purple-700 rounded-md p-2 hover:bg-purple-100">B) Jin</button>
            <button className="w-full bg-white text-purple-700 rounded-md p-2 hover:bg-purple-100">C) RM</button>
            <button className="w-full bg-white text-purple-700 rounded-md p-2 hover:bg-purple-100">D) Jimin</button>
          </div>
        </CardContent>

        <CardFooter className="justify-center text-sm text-white/80">
          🎯 Acerte pelo menos 3 perguntas para ganhar!
        </CardFooter>
      </Card>
    </div>
  )
}
