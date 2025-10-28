"use client"

import { useState, useCallback, useEffect } from "react"

export interface User {
  id: string
  username: string
  email: string
  points: number
  level: number
  challenges: string[]
  createdAt: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  })

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("revolcon_user")
    if (storedUser) {
      try {
        setAuthState({
          user: JSON.parse(storedUser),
          isLoading: false,
          error: null,
        })
      } catch (err) {
        setAuthState({
          user: null,
          isLoading: false,
          error: "Error loading user data",
        })
      }
    } else {
      setAuthState({
        user: null,
        isLoading: false,
        error: null,
      })
    }
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<User> => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Validate inputs
      if (!email || !password) {
        throw new Error("Email and password are required")
      }

      if (!email.includes("@")) {
        throw new Error("Invalid email format")
      }

      // Create user object
      const userData: User = {
        id: Date.now().toString(),
        username: email.split("@")[0],
        email,
        points: 0,
        level: 1,
        challenges: [],
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem("revolcon_user", JSON.stringify(userData))
      setAuthState({
        user: userData,
        isLoading: false,
        error: null,
      })

      return userData
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed"
      setAuthState({
        user: null,
        isLoading: false,
        error: errorMessage,
      })
      throw err
    }
  }, [])

  const register = useCallback(async (username: string, email: string, password: string): Promise<User> => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Validate inputs
      if (!username || !email || !password) {
        throw new Error("All fields are required")
      }

      if (!email.includes("@")) {
        throw new Error("Invalid email format")
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters")
      }

      if (username.length < 3) {
        throw new Error("Username must be at least 3 characters")
      }

      // Create user object
      const userData: User = {
        id: Date.now().toString(),
        username,
        email,
        points: 0,
        level: 1,
        challenges: [],
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem("revolcon_user", JSON.stringify(userData))
      setAuthState({
        user: userData,
        isLoading: false,
        error: null,
      })

      return userData
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed"
      setAuthState({
        user: null,
        isLoading: false,
        error: errorMessage,
      })
      throw err
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("revolcon_user")
    setAuthState({
      user: null,
      isLoading: false,
      error: null,
    })
  }, [])

  const clearError = useCallback(() => {
    setAuthState((prev) => ({ ...prev, error: null }))
  }, [])

  return {
    ...authState,
    login,
    register,
    logout,
    clearError,
  }
}
