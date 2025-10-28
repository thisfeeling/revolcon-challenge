"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Clock, Video, Trophy } from "lucide-react"

interface Challenge {
  id: string
  name: string
  description: string
  difficulty: string
  reward: number
  timeLimit: number
  videoRequired: boolean
  completed: boolean
}

interface ChallengesListProps {
  challenges: Challenge[]
  onSelectChallenge: (challenge: Challenge) => void
}

const difficultyColors: Record<string, string> = {
  Fácil: "bg-green-500/20 text-green-400 border-green-500/30",
  Medio: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Difícil: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Épico: "bg-red-500/20 text-red-400 border-red-500/30",
}

export default function ChallengesList({ challenges, onSelectChallenge }: ChallengesListProps) {
  return (
    <div className="space-y-4">
      {challenges.map((challenge) => (
        <Card
          key={challenge.id}
          className="bg-[#2D1B4E]/30 border-[#00FF00]/30 backdrop-blur-sm p-6 hover:border-[#00FF00]/60 transition-all cursor-pointer"
          onClick={() => onSelectChallenge(challenge)}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-[#00FF00]">{challenge.name}</h3>
                {challenge.completed && <Trophy className="w-5 h-5 text-[#FFFF00]" />}
              </div>
              <p className="text-gray-300 text-sm">{challenge.description}</p>
            </div>
            <Button
              onClick={(e) => {
                e.stopPropagation()
                onSelectChallenge(challenge)
              }}
              className="bg-gradient-to-r from-[#00FF00] to-[#FFFF00] text-[#1a1a2e] font-bold hover:shadow-lg hover:shadow-[#00FF00]/50"
            >
              {challenge.completed ? "Repetir" : "Comenzar"}
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${difficultyColors[challenge.difficulty]}`}
            >
              {challenge.difficulty}
            </span>
            <div className="flex items-center gap-1 text-[#FFFF00] text-sm">
              <Zap className="w-4 h-4" />
              {challenge.reward} pts
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <Clock className="w-4 h-4" />
              {challenge.timeLimit}s
            </div>
            {challenge.videoRequired && (
              <div className="flex items-center gap-1 text-[#00FF00] text-sm">
                <Video className="w-4 h-4" />
                Video requerido
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
