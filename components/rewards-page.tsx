"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Lock, Unlock, Star, Zap } from "lucide-react"

interface Reward {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  progress: number
  requirement: string
}

const MOCK_REWARDS: Reward[] = [
  {
    id: "1",
    name: "Primer Paso",
    description: "Completa tu primer desafío",
    icon: "🎯",
    unlocked: true,
    progress: 100,
    requirement: "1 desafío completado",
  },
  {
    id: "2",
    name: "Coleccionista",
    description: "Completa 10 desafíos diferentes",
    icon: "🏆",
    unlocked: true,
    progress: 100,
    requirement: "10 desafíos completados",
  },
  {
    id: "3",
    name: "Maestro Ácido",
    description: "Alcanza el nivel 10",
    icon: "👑",
    unlocked: false,
    progress: 60,
    requirement: "Nivel 10",
  },
  {
    id: "4",
    name: "Racha de Fuego",
    description: "Mantén una racha de 7 días",
    icon: "🔥",
    unlocked: false,
    progress: 30,
    requirement: "7 días de racha",
  },
  {
    id: "5",
    name: "Velocista",
    description: "Completa un desafío en menos de 30 segundos",
    icon: "⚡",
    unlocked: false,
    progress: 0,
    requirement: "Desafío en <30s",
  },
  {
    id: "6",
    name: "Leyenda",
    description: "Alcanza el nivel 20",
    icon: "✨",
    unlocked: false,
    progress: 20,
    requirement: "Nivel 20",
  },
]

export default function RewardsPage() {
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all")

  const filteredRewards = MOCK_REWARDS.filter((reward) => {
    if (filter === "unlocked") return reward.unlocked
    if (filter === "locked") return !reward.unlocked
    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black mb-2 bg-gradient-to-r from-[#00FF00] to-[#FFFF00] bg-clip-text text-transparent">
          Recompensas y Logros
        </h1>
        <p className="text-gray-400">Desbloquea insignias y recompensas completando desafíos</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-[#00FF00]/20">
        {[
          { id: "all", label: "Todos" },
          { id: "unlocked", label: "Desbloqueados" },
          { id: "locked", label: "Bloqueados" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-4 py-3 font-bold transition-all border-b-2 ${
              filter === tab.id
                ? "border-[#00FF00] text-[#00FF00]"
                : "border-transparent text-gray-400 hover:text-[#FFFF00]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Rewards Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {filteredRewards.map((reward) => (
          <Card
            key={reward.id}
            className={`backdrop-blur-sm p-6 transition-all ${
              reward.unlocked
                ? "bg-[#2D1B4E]/30 border-[#00FF00]/30 hover:border-[#00FF00]/60"
                : "bg-[#1a1a2e]/50 border-gray-600/30 opacity-75"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{reward.icon}</div>
              {reward.unlocked ? (
                <Unlock className="w-5 h-5 text-[#00FF00]" />
              ) : (
                <Lock className="w-5 h-5 text-gray-500" />
              )}
            </div>

            <h3 className={`font-bold mb-1 ${reward.unlocked ? "text-[#00FF00]" : "text-gray-400"}`}>{reward.name}</h3>
            <p className="text-sm text-gray-400 mb-4">{reward.description}</p>

            {!reward.unlocked && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">{reward.requirement}</span>
                  <span className="text-[#FFFF00] font-bold">{reward.progress}%</span>
                </div>
                <div className="w-full bg-[#1a1a2e]/50 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-[#00FF00] to-[#FFFF00] transition-all"
                    style={{ width: `${reward.progress}%` }}
                  />
                </div>
              </div>
            )}

            {reward.unlocked && (
              <div className="flex items-center gap-2 text-[#FFFF00] text-sm font-bold">
                <Star className="w-4 h-4" />
                Desbloqueado
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Rewards Info */}
      <Card className="bg-[#2D1B4E]/30 border-[#00FF00]/30 backdrop-blur-sm p-6">
        <h3 className="text-lg font-bold text-[#00FF00] mb-4">Cómo Desbloquear Recompensas</h3>
        <div className="space-y-3">
          <div className="flex gap-3">
            <Zap className="w-5 h-5 text-[#FFFF00] flex-shrink-0 mt-1" />
            <div>
              <p className="font-bold text-[#00FF00]">Completa Desafíos</p>
              <p className="text-sm text-gray-400">Cada desafío completado te acerca a nuevas recompensas</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Star className="w-5 h-5 text-[#FFFF00] flex-shrink-0 mt-1" />
            <div>
              <p className="font-bold text-[#00FF00]">Sube de Nivel</p>
              <p className="text-sm text-gray-400">Gana puntos y sube de nivel para desbloquear insignias especiales</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Zap className="w-5 h-5 text-[#FFFF00] flex-shrink-0 mt-1" />
            <div>
              <p className="font-bold text-[#00FF00]">Mantén Rachas</p>
              <p className="text-sm text-gray-400">Completa desafíos consecutivos para mantener tu racha activa</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
