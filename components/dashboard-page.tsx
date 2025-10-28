"use client"

import { useState } from "react"
import DashboardHeader from "@/components/dashboard-header"
import DashboardStats from "@/components/dashboard-stats"
import DashboardHome from "@/components/dashboard-home"
import ChallengesPage from "@/components/challenges-page"
import LeaderboardPage from "@/components/leaderboard-page"
import UserProfile from "@/components/user-profile"
import RewardsPage from "@/components/rewards-page"

interface DashboardPageProps {
  user: any
  onLogout: () => void
  onNavigate: (page: "landing" | "auth" | "dashboard") => void
}

export default function DashboardPage({ user, onLogout, onNavigate }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState<"home" | "challenges" | "leaderboard" | "profile" | "rewards">("home")

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] text-white">
      <DashboardHeader username={user.username} onLogout={onLogout} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab !== "challenges" &&
          activeTab !== "leaderboard" &&
          activeTab !== "profile" &&
          activeTab !== "rewards" && (
            <DashboardStats points={user.points} level={user.level} challengesCompleted={user.challenges.length} />
          )}

        {/* Navigation Tabs */}
        <div className="flex gap-2 my-8 border-b border-[#00FF00]/20 overflow-x-auto">
          {["home", "challenges", "leaderboard", "profile", "rewards"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-3 font-bold transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab
                  ? "border-[#00FF00] text-[#00FF00]"
                  : "border-transparent text-gray-400 hover:text-[#FFFF00]"
              }`}
            >
              {tab === "home" && "Mi Zona Ácida"}
              {tab === "challenges" && "Desafíos"}
              {tab === "leaderboard" && "Ranking"}
              {tab === "profile" && "Perfil"}
              {tab === "rewards" && "Recompensas"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "home" && <DashboardHome onNavigate={setActiveTab} />}

          {activeTab === "challenges" && <ChallengesPage onBack={() => setActiveTab("home")} />}

          {activeTab === "leaderboard" && <LeaderboardPage currentUserId={user.id} currentUsername={user.username} />}

          {activeTab === "profile" && <UserProfile user={user} />}

          {activeTab === "rewards" && <RewardsPage />}
        </div>
      </main>
    </div>
  )
}
