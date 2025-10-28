"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"

interface ChallengeTimerProps {
  timeLimit: number
  onComplete: (timeSpent: number) => void
  onCancel: () => void
}

export default function ChallengeTimer({ timeLimit, onComplete, onCancel }: ChallengeTimerProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit)
  const [isRunning, setIsRunning] = useState(false)
  const [timeSpent, setTimeSpent] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
        setTimeSpent((prev) => prev + 1)
      }, 1000)
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = ((timeLimit - timeLeft) / timeLimit) * 100

  return (
    <Card className="bg-[#2D1B4E]/30 border-[#00FF00]/30 backdrop-blur-sm p-8 text-center">
      <h2 className="text-2xl font-bold text-[#00FF00] mb-6">Cronómetro del Desafío</h2>

      <div className="mb-8">
        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="96" cy="96" r="88" fill="none" stroke="#00FF00" strokeWidth="2" opacity="0.2" />
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="#00FF00"
              strokeWidth="3"
              strokeDasharray={`${(progress / 100) * 552.92} 552.92`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div>
              <p className="text-5xl font-black text-[#FFFF00]">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </p>
              <p className="text-gray-400 text-sm mt-2">Tiempo restante</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => setIsRunning(!isRunning)}
            className="bg-gradient-to-r from-[#00FF00] to-[#FFFF00] text-[#1a1a2e] font-bold hover:shadow-lg hover:shadow-[#00FF00]/50"
          >
            {isRunning ? "Pausar" : "Iniciar"}
          </Button>
          <Button
            onClick={() => onComplete(timeSpent)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Completado
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
        </div>
      </div>

      <div className="text-gray-400 text-sm">
        <p>
          Tiempo transcurrido: {String(Math.floor(timeSpent / 60)).padStart(2, "0")}:
          {String(timeSpent % 60).padStart(2, "0")}
        </p>
      </div>
    </Card>
  )
}
