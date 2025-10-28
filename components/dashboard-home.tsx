"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Zap, Trophy, Users } from "lucide-react"

interface DashboardHomeProps {
  onNavigate: (tab: string) => void
}

export default function DashboardHome({ onNavigate }: DashboardHomeProps) {
  const quickStats = [
    {
      icon: Zap,
      title: "Desafíos Disponibles",
      value: "12",
      color: "text-[#FFFF00]",
      action: () => onNavigate("challenges"),
    },
    {
      icon: Trophy,
      title: "Tu Posición",
      value: "#1,234",
      color: "text-[#00FF00]",
      action: () => onNavigate("leaderboard"),
    },
    {
      icon: Users,
      title: "Amigos Conectados",
      value: "8",
      color: "text-[#00FF00]",
      action: () => onNavigate("profile"),
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-[#2D1B4E]/50 to-[#1a1a2e]/50 border-[#00FF00]/30 backdrop-blur-sm p-8">
        <h2 className="text-2xl font-black mb-2 text-[#00FF00]">¡Bienvenido de vuelta!</h2>
        <p className="text-gray-300 mb-6">
          Tienes 3 desafíos nuevos esperándote. ¿Estás listo para demostrar tu valentía?
        </p>
        <Button
          onClick={() => onNavigate("challenges")}
          className="bg-gradient-to-r from-[#00FF00] to-[#FFFF00] text-[#1a1a2e] font-bold hover:shadow-lg hover:shadow-[#00FF00]/50"
        >
          Ver Desafíos Nuevos
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        {quickStats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card
              key={idx}
              onClick={stat.action}
              className="bg-[#2D1B4E]/30 border-[#00FF00]/30 backdrop-blur-sm p-6 cursor-pointer hover:border-[#00FF00]/60 transition-all hover:shadow-lg hover:shadow-[#00FF00]/20"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-6 h-6 ${stat.color}`} />
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#00FF00]" />
              </div>
              <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
            </Card>
          )
        })}
      </div>

      <Card className="bg-[#2D1B4E]/30 border-[#00FF00]/30 backdrop-blur-sm p-6">
        <h3 className="text-lg font-bold text-[#FFFF00] mb-4">Próximos Desafíos</h3>
        <div className="space-y-3">
          {[
            { name: "Salto del Ácido", difficulty: "Fácil", reward: "50 pts" },
            { name: "Baile Extremo", difficulty: "Medio", reward: "100 pts" },
            { name: "Reto Épico", difficulty: "Difícil", reward: "250 pts" },
          ].map((challenge, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-[#1a1a2e]/50 rounded-lg border border-[#00FF00]/20"
            >
              <div>
                <p className="font-bold text-[#00FF00]">{challenge.name}</p>
                <p className="text-xs text-gray-400">{challenge.difficulty}</p>
              </div>
              <span className="text-[#FFFF00] font-bold">{challenge.reward}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
