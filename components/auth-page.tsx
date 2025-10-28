"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Eye, EyeOff, Check, X } from "lucide-react"

interface AuthPageProps {
  onNavigate: (page: "landing" | "auth" | "dashboard") => void
  setUser: (user: any) => void
}

function getPasswordStrength(password: string): {
  score: number
  label: string
  color: string
  requirements: { met: boolean; label: string }[]
} {
  const requirements = [
    { met: password.length >= 6, label: "At least 6 characters" },
    { met: /[A-Z]/.test(password), label: "One uppercase letter" },
    { met: /[0-9]/.test(password), label: "One number" },
    { met: /[!@#$%^&*]/.test(password), label: "One special character" },
  ]

  const metCount = requirements.filter((r) => r.met).length
  let score = 0
  let label = "Weak"
  let color = "text-red-500"

  if (metCount >= 4) {
    score = 3
    label = "Strong"
    color = "text-green-500"
  } else if (metCount >= 2) {
    score = 2
    label = "Medium"
    color = "text-yellow-500"
  }

  return { score, label, color, requirements }
}

export default function AuthPage({ onNavigate, setUser }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")

  const passwordStrength = getPasswordStrength(formData.password)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (isLogin) {
        // Login validation
        if (!formData.email || !formData.password) {
          throw new Error("Por favor completa todos los campos")
        }

        if (!formData.email.includes("@")) {
          throw new Error("Email inválido")
        }

        const userData = {
          id: Date.now().toString(),
          username: formData.email.split("@")[0],
          email: formData.email,
          points: 0,
          level: 1,
          challenges: [],
          createdAt: new Date().toISOString(),
        }

        localStorage.setItem("revolcon_user", JSON.stringify(userData))
        setUser(userData)
        onNavigate("dashboard")
      } else {
        // Register validation
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
          throw new Error("Por favor completa todos los campos")
        }

        if (formData.username.length < 3) {
          throw new Error("El usuario debe tener al menos 3 caracteres")
        }

        if (!formData.email.includes("@")) {
          throw new Error("Email inválido")
        }

        if (formData.password !== formData.confirmPassword) {
          throw new Error("Las contraseñas no coinciden")
        }

        if (formData.password.length < 6) {
          throw new Error("La contraseña debe tener al menos 6 caracteres")
        }

        const userData = {
          id: Date.now().toString(),
          username: formData.username,
          email: formData.email,
          points: 0,
          level: 1,
          challenges: [],
          createdAt: new Date().toISOString(),
        }

        localStorage.setItem("revolcon_user", JSON.stringify(userData))
        setUser(userData)
        onNavigate("dashboard")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => onNavigate("landing")}
          className="mb-8 text-[#00FF00] hover:bg-[#00FF00]/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>

        <Card className="bg-[#2D1B4E]/40 border-[#00FF00]/30 backdrop-blur-sm p-8">
          <h1 className="text-3xl font-black mb-2 bg-gradient-to-r from-[#00FF00] to-[#FFFF00] bg-clip-text text-transparent">
            {isLogin ? "Inicia Sesión" : "Regístrate"}
          </h1>
          <p className="text-gray-300 mb-6">
            {isLogin ? "Bienvenido de vuelta al desafío" : "Únete a la comunidad más ácida"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-[#00FF00] mb-2">Usuario</label>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Tu nombre de usuario"
                  disabled={isLoading}
                  className="bg-[#1a1a2e]/50 border-[#00FF00]/30 text-white placeholder:text-gray-500 focus:border-[#00FF00] focus:ring-[#00FF00]/50 disabled:opacity-50"
                />
                {formData.username && formData.username.length < 3 && (
                  <p className="text-xs text-red-400 mt-1">Mínimo 3 caracteres</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-[#00FF00] mb-2">Email</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="tu@email.com"
                disabled={isLoading}
                className="bg-[#1a1a2e]/50 border-[#00FF00]/30 text-white placeholder:text-gray-500 focus:border-[#00FF00] focus:ring-[#00FF00]/50 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#00FF00] mb-2">Contraseña</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  disabled={isLoading}
                  className="bg-[#1a1a2e]/50 border-[#00FF00]/30 text-white placeholder:text-gray-500 focus:border-[#00FF00] focus:ring-[#00FF00]/50 disabled:opacity-50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00FF00]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {!isLogin && formData.password && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Fortaleza:</span>
                    <span className={`text-xs font-bold ${passwordStrength.color}`}>{passwordStrength.label}</span>
                  </div>
                  <div className="w-full bg-[#1a1a2e]/50 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        passwordStrength.score === 3
                          ? "bg-green-500 w-full"
                          : passwordStrength.score === 2
                            ? "bg-yellow-500 w-2/3"
                            : "bg-red-500 w-1/3"
                      }`}
                    />
                  </div>
                  <div className="space-y-1">
                    {passwordStrength.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        {req.met ? (
                          <Check className="w-3 h-3 text-green-500" />
                        ) : (
                          <X className="w-3 h-3 text-gray-500" />
                        )}
                        <span className={req.met ? "text-green-500" : "text-gray-500"}>{req.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-[#00FF00] mb-2">Confirmar Contraseña</label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    disabled={isLoading}
                    className="bg-[#1a1a2e]/50 border-[#00FF00]/30 text-white placeholder:text-gray-500 focus:border-[#00FF00] focus:ring-[#00FF00]/50 disabled:opacity-50 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00FF00]"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-400 mt-1">Las contraseñas no coinciden</p>
                )}
              </div>
            )}

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm">{error}</div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#00FF00] to-[#FFFF00] text-[#1a1a2e] font-bold hover:shadow-lg hover:shadow-[#00FF00]/50 transition-all disabled:opacity-50"
            >
              {isLoading ? "Procesando..." : isLogin ? "Inicia Sesión" : "Regístrate"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin)
                  setFormData({ username: "", email: "", password: "", confirmPassword: "" })
                  setError("")
                }}
                className="text-[#FFFF00] font-bold hover:text-[#00FF00] transition-colors"
              >
                {isLogin ? "Regístrate" : "Inicia Sesión"}
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
