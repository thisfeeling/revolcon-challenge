"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Zap, Video } from "lucide-react"

interface Challenge {
  id: string
  name: string
  description: string
  difficulty: string
  reward: number
  timeLimit: number
  videoRequired: boolean
  completed: boolean
  category: string
}

interface ChallengeDetailProps {
  challenge: Challenge
  onBack: () => void
  onStart: (challenge: Challenge) => void
}

export default function ChallengeDetail({ challenge, onBack, onStart }: ChallengeDetailProps) {
  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="text-[#00FF00] hover:bg-[#00FF00]/10">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver
      </Button>

      <Card className="bg-[#2D1B4E]/30 border-[#00FF00]/30 backdrop-blur-sm p-8">
        <div className="mb-6">
          <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-[#00FF00] to-[#FFFF00] bg-clip-text text-transparent">
            {challenge.name}
          </h1>
          <p className="text-gray-400">{challenge.category}</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1a1a2e]/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Dificultad</p>
            <p className="text-xl font-bold text-[#FFFF00]">{challenge.difficulty}</p>
          </div>
          <div className="bg-[#1a1a2e]/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-[#FFFF00]" />
              <p className="text-gray-400 text-sm">Recompensa</p>
            </div>
            <p className="text-xl font-bold text-[#00FF00]">{challenge.reward} pts</p>
          </div>
          <div className="bg-[#1a1a2e]/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-[#00FF00]" />
              <p className="text-gray-400 text-sm">Tiempo Límite</p>
            </div>
            <p className="text-xl font-bold text-[#FFFF00]">{challenge.timeLimit}s</p>
          </div>
          <div className="bg-[#1a1a2e]/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Video className="w-4 h-4 text-[#00FF00]" />
              <p className="text-gray-400 text-sm">Video</p>
            </div>
            <p className="text-xl font-bold text-[#FFFF00]">{challenge.videoRequired ? "Sí" : "No"}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#00FF00] mb-4">Descripción</h2>
          <p className="text-gray-300 leading-relaxed">{challenge.description}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#00FF00] mb-4">Instrucciones</h2>
          <ol className="space-y-2 text-gray-300">
            <li className="flex gap-3">
              <span className="text-[#FFFF00] font-bold">1.</span>
              <span>Lee cuidadosamente las instrucciones del desafío</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#FFFF00] font-bold">2.</span>
              <span>Prepárate y asegúrate de tener todo lo necesario</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#FFFF00] font-bold">3.</span>
              <span>Inicia el cronómetro cuando estés listo</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#FFFF00] font-bold">4.</span>
              <span>Completa el desafío dentro del tiempo límite</span>
            </li>
            {challenge.videoRequired && (
              <li className="flex gap-3">
                <span className="text-[#FFFF00] font-bold">5.</span>
                <span>Sube un video como prueba de tu desafío completado</span>
              </li>
            )}
          </ol>
        </div>

        <Button
          onClick={() => onStart(challenge)}
          size="lg"
          className="w-full bg-gradient-to-r from-[#00FF00] to-[#FFFF00] text-[#1a1a2e] font-bold text-lg hover:shadow-lg hover:shadow-[#00FF00]/50"
        >
          Comenzar Desafío
        </Button>
      </Card>
    </div>
  )
}
