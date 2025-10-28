"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Zap, Trophy, Users, Gift } from "lucide-react"

interface LandingPageProps {
  onNavigate: (page: "landing" | "auth" | "dashboard") => void
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] text-white overflow-hidden">
      {/* Navigation */}
      <nav className="border-b border-[#00FF00]/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00FF00] to-[#FFFF00] rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-[#1a1a2e]" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-[#00FF00] to-[#FFFF00] bg-clip-text text-transparent">
              REVOLCÓN
            </span>
          </div>
          <Button
            onClick={() => onNavigate("auth")}
            className="bg-gradient-to-r from-[#00FF00] to-[#FFFF00] text-[#1a1a2e] font-bold hover:shadow-lg hover:shadow-[#00FF00]/50 transition-all"
          >
            Entrar
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="mb-8 inline-block">
          <div className="text-6xl md:text-7xl font-black mb-4 leading-tight">
            <span className="bg-gradient-to-r from-[#00FF00] via-[#FFFF00] to-[#2D1B4E] bg-clip-text text-transparent">
              ¡DESAFÍA TU LÍMITE!
            </span>
          </div>
          <p className="text-xl md:text-2xl text-[#00FF00] font-bold mb-2">Revolcón Challenge</p>
          <p className="text-gray-300 text-lg">
            La competencia más ácida de Colombia. Prueba tu valentía, compite con amigos y gana premios épicos.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            onClick={() => onNavigate("auth")}
            size="lg"
            className="bg-gradient-to-r from-[#00FF00] to-[#FFFF00] text-[#1a1a2e] font-bold text-lg px-8 hover:shadow-lg hover:shadow-[#00FF00]/50 transition-all"
          >
            Comenzar Ahora
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-[#2D1B4E] text-[#FFFF00] font-bold text-lg px-8 hover:bg-[#2D1B4E]/20 bg-transparent"
          >
            Ver Reglas
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          <Card className="bg-[#2D1B4E]/30 border-[#00FF00]/30 backdrop-blur-sm p-6 hover:border-[#00FF00]/60 transition-all">
            <Zap className="w-8 h-8 text-[#FFFF00] mx-auto mb-3" />
            <h3 className="font-bold text-[#00FF00] mb-2">Desafíos Épicos</h3>
            <p className="text-sm text-gray-300">Prueba tu valentía con retos cada vez más intensos</p>
          </Card>

          <Card className="bg-[#2D1B4E]/30 border-[#00FF00]/30 backdrop-blur-sm p-6 hover:border-[#00FF00]/60 transition-all">
            <Trophy className="w-8 h-8 text-[#FFFF00] mx-auto mb-3" />
            <h3 className="font-bold text-[#00FF00] mb-2">Leaderboard</h3>
            <p className="text-sm text-gray-300">Compite en tiempo real con jugadores de toda Colombia</p>
          </Card>

          <Card className="bg-[#2D1B4E]/30 border-[#00FF00]/30 backdrop-blur-sm p-6 hover:border-[#00FF00]/60 transition-all">
            <Users className="w-8 h-8 text-[#FFFF00] mx-auto mb-3" />
            <h3 className="font-bold text-[#00FF00] mb-2">Comunidad</h3>
            <p className="text-sm text-gray-300">Comparte tus videos y desafía a tus amigos</p>
          </Card>

          <Card className="bg-[#2D1B4E]/30 border-[#00FF00]/30 backdrop-blur-sm p-6 hover:border-[#00FF00]/60 transition-all">
            <Gift className="w-8 h-8 text-[#FFFF00] mx-auto mb-3" />
            <h3 className="font-bold text-[#00FF00] mb-2">Recompensas</h3>
            <p className="text-sm text-gray-300">Gana puntos y desbloquea premios exclusivos</p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#00FF00]/20 py-8 text-center text-gray-400">
        <p>Revolcón Challenge © 2025 | Hecho con ácido puro</p>
      </footer>
    </div>
  )
}
