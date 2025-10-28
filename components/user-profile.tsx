"use client"

import { Card } from "@/components/ui/card"
import { Trophy, Zap, Flame, Target } from "lucide-react"

interface UserProfileProps {
  user: any
}

export default function UserProfile({ user }: UserProfileProps) {
  const stats = [
    { icon: Zap, label: "Puntos Totales", value: user.points, color: "text-[#FFFF00]" },
    { icon: Trophy, label: "Nivel", value: user.level, color: "text-[#00FF00]" },
    { icon: Target, label: "Desafíos Completados", value: user.challenges.length, color: "text-[#00FF00]" },
    { icon: Flame, label: "Racha Actual", value: "0 días", color: "text-[#FFFF00]" },
  ]

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-[#2D1B4E]/50 to-[#1a1a2e]/50 border-[#00FF00]/30 backdrop-blur-sm p-8">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00FF00] to-[#FFFF00] flex items-center justify-center">
            <span className="text-4xl font-black text-[#1a1a2e]">{user.username.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <h1 className="text-3xl font-black text-[#00FF00] mb-2">{user.username}</h1>
            <p className="text-gray-400 mb-3">{user.email}</p>
            <div className="flex gap-4">
              <div>
                <p className="text-xs text-gray-400">Miembro desde</p>
                <p className="font-bold text-[#FFFF00]">{new Date(user.createdAt).toLocaleDateString("es-CO")}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Posición</p>
                <p className="font-bold text-[#00FF00]">#7 de 1,234</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="bg-[#2D1B4E]/30 border-[#00FF00]/30 backdrop-blur-sm p-6">
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
            </Card>
          )
        })}
      </div>

      {/* Activity Section */}
      <Card className="bg-[#2D1B4E]/30 border-[#00FF00]/30 backdrop-blur-sm p-6">
        <h3 className="text-lg font-bold text-[#00FF00] mb-4">Actividad Reciente</h3>
        <div className="space-y-3">
          {[
            { action: "Completó desafío", challenge: "Salto del Ácido", points: "+50", time: "Hace 2 horas" },
            { action: "Subió de nivel", challenge: "Nivel 9", points: "+0", time: "Hace 1 día" },
            { action: "Completó desafío", challenge: "Baile Extremo", points: "+100", time: "Hace 2 días" },
          ].map((activity, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-[#1a1a2e]/50 rounded-lg border border-[#00FF00]/20"
            >
              <div>
                <p className="font-bold text-[#00FF00]">{activity.action}</p>
                <p className="text-xs text-gray-400">{activity.challenge}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#FFFF00]">{activity.points}</p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
