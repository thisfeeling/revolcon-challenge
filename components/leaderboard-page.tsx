"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Trophy, Zap, Flame } from "lucide-react"

interface LeaderboardUser {
  id: string
  username: string
  points: number
  level: number
  challengesCompleted: number
  streak: number
  rank: number
}

interface LeaderboardPageProps {
  currentUserId: string
  currentUsername: string
}

// Mock leaderboard data
const MOCK_LEADERBOARD: LeaderboardUser[] = [
  {
    id: "1",
    username: "AcidMaster",
    points: 5420,
    level: 15,
    challengesCompleted: 42,
    streak: 12,
    rank: 1,
  },
  {
    id: "2",
    username: "VenomKing",
    points: 4890,
    level: 14,
    challengesCompleted: 38,
    streak: 8,
    rank: 2,
  },
  {
    id: "3",
    username: "ChallengePro",
    points: 4320,
    level: 13,
    challengesCompleted: 35,
    streak: 5,
    rank: 3,
  },
  {
    id: "4",
    username: "BraveHeart",
    points: 3890,
    level: 12,
    challengesCompleted: 31,
    streak: 3,
    rank: 4,
  },
  {
    id: "5",
    username: "DareDevil",
    points: 3450,
    level: 11,
    challengesCompleted: 28,
    streak: 2,
    rank: 5,
  },
  {
    id: "6",
    username: "RiskTaker",
    points: 3120,
    level: 10,
    challengesCompleted: 25,
    streak: 1,
    rank: 6,
  },
  {
    id: "7",
    username: "YouUser",
    points: 2850,
    level: 9,
    challengesCompleted: 22,
    streak: 0,
    rank: 7,
  },
]

export default function LeaderboardPage({ currentUserId, currentUsername }: LeaderboardPageProps) {
  const [activeTab, setActiveTab] = useState<"global" | "friends" | "weekly">("global")

  const getRankMedal = (rank: number) => {
    if (rank === 1) return "🥇"
    if (rank === 2) return "🥈"
    if (rank === 3) return "🥉"
    return `#${rank}`
  }

  const isCurrentUser = (userId: string) => userId === currentUserId

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black mb-2 bg-gradient-to-r from-[#00FF00] to-[#FFFF00] bg-clip-text text-transparent">
          Ranking Nacional
        </h1>
        <p className="text-gray-400">Compite con jugadores de toda Colombia y sube en el ranking</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#00FF00]/20">
        {[
          { id: "global", label: "Global", icon: Trophy },
          { id: "friends", label: "Amigos", icon: Zap },
          { id: "weekly", label: "Esta Semana", icon: Flame },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 font-bold transition-all border-b-2 flex items-center gap-2 ${
                activeTab === tab.id
                  ? "border-[#00FF00] text-[#00FF00]"
                  : "border-transparent text-gray-400 hover:text-[#FFFF00]"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Current User Position */}
      {activeTab === "global" && (
        <Card className="bg-gradient-to-r from-[#2D1B4E]/50 to-[#1a1a2e]/50 border-[#FFFF00]/30 backdrop-blur-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Tu Posición</p>
              <p className="text-2xl font-black text-[#FFFF00]">#7 de 1,234 jugadores</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm mb-1">Puntos</p>
              <p className="text-3xl font-black text-[#00FF00]">2,850</p>
            </div>
          </div>
        </Card>
      )}

      {/* Leaderboard List */}
      <div className="space-y-3">
        {MOCK_LEADERBOARD.map((user) => (
          <Card
            key={user.id}
            className={`backdrop-blur-sm p-4 transition-all ${
              isCurrentUser(user.id)
                ? "bg-[#2D1B4E]/50 border-[#00FF00]/60"
                : "bg-[#2D1B4E]/30 border-[#00FF00]/30 hover:border-[#00FF00]/60"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00FF00] to-[#FFFF00] flex items-center justify-center font-black text-[#1a1a2e] text-lg">
                  {getRankMedal(user.rank)}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[#00FF00]">
                    {user.username}
                    {isCurrentUser(user.id) && <span className="text-[#FFFF00] ml-2">(Tú)</span>}
                  </p>
                  <div className="flex gap-4 text-xs text-gray-400 mt-1">
                    <span>Nivel {user.level}</span>
                    <span>{user.challengesCompleted} desafíos</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-right">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Racha</p>
                  <div className="flex items-center gap-1 justify-end">
                    <Flame className="w-4 h-4 text-[#FFFF00]" />
                    <span className="font-bold text-[#FFFF00]">{user.streak}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Puntos</p>
                  <p className="text-2xl font-black text-[#00FF00]">{user.points}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <Card className="bg-[#2D1B4E]/30 border-[#00FF00]/30 backdrop-blur-sm p-6">
        <h3 className="text-lg font-bold text-[#00FF00] mb-4">Estadísticas Globales</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-[#1a1a2e]/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Jugadores Activos</p>
            <p className="text-2xl font-black text-[#FFFF00]">1,234</p>
          </div>
          <div className="bg-[#1a1a2e]/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Desafíos Completados</p>
            <p className="text-2xl font-black text-[#00FF00]">45,678</p>
          </div>
          <div className="bg-[#1a1a2e]/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Puntos en Juego</p>
            <p className="text-2xl font-black text-[#FFFF00]">2.3M</p>
          </div>
          <div className="bg-[#1a1a2e]/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Racha Máxima</p>
            <p className="text-2xl font-black text-[#00FF00]">127 días</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
