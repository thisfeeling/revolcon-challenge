"use client"

import { Button } from "@/components/ui/button"
import { LogOut, Zap } from "lucide-react"

interface DashboardHeaderProps {
  username: string
  onLogout: () => void
}

export default function DashboardHeader({ username, onLogout }: DashboardHeaderProps) {
  return (
    <header className="border-b border-[#00FF00]/20 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#00FF00] to-[#FFFF00] rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-[#1a1a2e]" />
          </div>
          <span className="text-2xl font-black bg-gradient-to-r from-[#00FF00] to-[#FFFF00] bg-clip-text text-transparent">
            REVOLCÓN
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-400">Bienvenido</p>
            <p className="font-bold text-[#00FF00]">{username}</p>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            size="sm"
            className="border-[#2D1B4E] text-[#FFFF00] hover:bg-[#2D1B4E]/20 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Salir
          </Button>
        </div>
      </div>
    </header>
  )
}
