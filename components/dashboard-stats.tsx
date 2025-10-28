import { Card } from "@/components/ui/card"
import { Zap, Trophy, Users, Flame } from "lucide-react"

interface DashboardStatsProps {
  points: number
  level: number
  challengesCompleted: number
}

export default function DashboardStats({ points, level, challengesCompleted }: DashboardStatsProps) {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      <Card className="bg-[#2D1B4E]/30 border-[#00FF00]/30 backdrop-blur-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Puntos</p>
            <p className="text-3xl font-black text-[#00FF00]">{points}</p>
          </div>
          <Zap className="w-8 h-8 text-[#FFFF00]" />
        </div>
      </Card>

      <Card className="bg-[#2D1B4E]/30 border-[#00FF00]/30 backdrop-blur-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Nivel</p>
            <p className="text-3xl font-black text-[#FFFF00]">{level}</p>
          </div>
          <Trophy className="w-8 h-8 text-[#00FF00]" />
        </div>
      </Card>

      <Card className="bg-[#2D1B4E]/30 border-[#00FF00]/30 backdrop-blur-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Desafíos</p>
            <p className="text-3xl font-black text-[#FFFF00]">{challengesCompleted}</p>
          </div>
          <Users className="w-8 h-8 text-[#00FF00]" />
        </div>
      </Card>

      <Card className="bg-[#2D1B4E]/30 border-[#00FF00]/30 backdrop-blur-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Racha</p>
            <p className="text-3xl font-black text-[#00FF00]">0</p>
          </div>
          <Flame className="w-8 h-8 text-[#FFFF00]" />
        </div>
      </Card>
    </div>
  )
}
