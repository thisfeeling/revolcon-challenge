"use client"

import { useState } from "react"
import ChallengesList from "@/components/challenges-list"
import ChallengeDetail from "@/components/challenge-detail"
import ChallengeTimer from "@/components/challenge-timer"

interface Challenge {
  id: string
  name: string
  description: string
  difficulty: "Fácil" | "Medio" | "Difícil" | "Épico"
  category: string
  reward: number
  timeLimit: number
  videoRequired: boolean
  completed: boolean
  attempts: number
}

interface ChallengesPageProps {
  onBack: () => void
}

const MOCK_CHALLENGES: Challenge[] = [
  {
    id: "1",
    name: "Salto del Ácido",
    description: "Realiza un salto de 1 metro de altura sin caer. Demuestra tu agilidad y valentía.",
    difficulty: "Fácil",
    category: "Acrobacias",
    reward: 50,
    timeLimit: 60,
    videoRequired: true,
    completed: false,
    attempts: 0,
  },
  {
    id: "2",
    name: "Baile Extremo",
    description: "Baila durante 2 minutos sin parar. Muestra tus mejores movimientos.",
    difficulty: "Medio",
    category: "Danza",
    reward: 100,
    timeLimit: 120,
    videoRequired: true,
    completed: false,
    attempts: 0,
  },
  {
    id: "3",
    name: "Reto Épico",
    description: "Completa una serie de 5 acrobacias diferentes en menos de 3 minutos.",
    difficulty: "Difícil",
    category: "Acrobacias",
    reward: 250,
    timeLimit: 180,
    videoRequired: true,
    completed: false,
    attempts: 0,
  },
  {
    id: "4",
    name: "Desafío de Velocidad",
    description: "Corre 100 metros en el menor tiempo posible.",
    difficulty: "Medio",
    category: "Velocidad",
    reward: 75,
    timeLimit: 30,
    videoRequired: true,
    completed: false,
    attempts: 0,
  },
  {
    id: "5",
    name: "Equilibrio Perfecto",
    description: "Mantén el equilibrio en una línea durante 1 minuto.",
    difficulty: "Fácil",
    category: "Equilibrio",
    reward: 40,
    timeLimit: 60,
    videoRequired: false,
    completed: false,
    attempts: 0,
  },
]

export default function ChallengesPage({ onBack }: ChallengesPageProps) {
  const [view, setView] = useState<"list" | "detail" | "timer">("list")
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)

  const handleSelectChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge)
    setView("detail")
  }

  const handleStartChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge)
    setView("timer")
  }

  const handleCompleteChallenge = (timeSpent: number) => {
    // Here you would typically save the completion to the backend
    console.log(`Challenge completed in ${timeSpent} seconds`)
    setView("list")
    setSelectedChallenge(null)
  }

  const handleCancel = () => {
    setView("list")
    setSelectedChallenge(null)
  }

  return (
    <div className="space-y-6">
      {view === "list" && (
        <>
          <div>
            <h1 className="text-3xl font-black mb-2 bg-gradient-to-r from-[#00FF00] to-[#FFFF00] bg-clip-text text-transparent">
              Desafíos Disponibles
            </h1>
            <p className="text-gray-400">Elige un desafío y demuestra tu valentía</p>
          </div>
          <ChallengesList challenges={MOCK_CHALLENGES} onSelectChallenge={handleSelectChallenge} />
        </>
      )}

      {view === "detail" && selectedChallenge && (
        <ChallengeDetail challenge={selectedChallenge} onBack={() => setView("list")} onStart={handleStartChallenge} />
      )}

      {view === "timer" && selectedChallenge && (
        <ChallengeTimer
          timeLimit={selectedChallenge.timeLimit}
          onComplete={handleCompleteChallenge}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}
