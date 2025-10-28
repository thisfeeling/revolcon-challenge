export interface Challenge {
  id: string
  name: string
  description: string
  difficulty: "Fácil" | "Medio" | "Difícil" | "Épico"
  category: string
  reward: number
  timeLimit: number // in seconds
  videoRequired: boolean
  completed: boolean
  attempts: number
  bestTime?: number
  thumbnail?: string
}

export interface ChallengeSubmission {
  challengeId: string
  userId: string
  videoUrl?: string
  completedAt: string
  timeSpent: number
  approved: boolean
}
