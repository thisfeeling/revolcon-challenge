"use client"

import { useState, useEffect } from "react"
import LandingPage from "@/components/landing-page"
import AuthPage from "@/components/auth-page"
import DashboardPage from "@/components/dashboard-page"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<"landing" | "auth" | "dashboard">("landing")
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("revolcon_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
        setCurrentPage("dashboard")
      } catch (err) {
        // Invalid stored user data, clear it
        localStorage.removeItem("revolcon_user")
        setCurrentPage("landing")
      }
    } else {
      setCurrentPage("landing")
    }
    setIsLoading(false)
  }, [])

  const handleNavigate = (page: "landing" | "auth" | "dashboard") => {
    setCurrentPage(page)
  }

  const handleLogout = () => {
    localStorage.removeItem("revolcon_user")
    setUser(null)
    setCurrentPage("landing")
  }

  const handleSetUser = (userData: any) => {
    setUser(userData)
    localStorage.setItem("revolcon_user", JSON.stringify(userData))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#00FF00] border-t-[#FFFF00] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#00FF00] font-bold">Cargando Revolcón...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e]">
      {currentPage === "landing" && <LandingPage onNavigate={handleNavigate} />}
      {currentPage === "auth" && <AuthPage onNavigate={handleNavigate} setUser={handleSetUser} />}
      {currentPage === "dashboard" && user && (
        <DashboardPage user={user} onLogout={handleLogout} onNavigate={handleNavigate} />
      )}
    </main>
  )
}
