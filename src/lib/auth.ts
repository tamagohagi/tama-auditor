'use client'

import React from 'react'
import { User, LoginCredentials, AuthState } from '@/types/auth'
import { db } from '@/lib/db'

class AuthService {
  private static instance: AuthService
  private authState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  }
  private listeners: ((state: AuthState) => void)[] = []

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  private constructor() {
    this.initializeAuth()
  }

  private async initializeAuth(): Promise<void> {
    try {
      const storedUser = localStorage.getItem('tama_auditor_user')
      if (storedUser) {
        const user = JSON.parse(storedUser)
        this.authState = {
          user,
          isAuthenticated: true,
          isLoading: false,
        }
      } else {
        this.authState.isLoading = false
      }
    } catch (error) {
      console.error('Error initializing auth:', error)
      this.authState.isLoading = false
    }
    
    this.notifyListeners()
  }

  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.authState))
  }

  getAuthState(): AuthState {
    return this.authState
  }

  async login(credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> {
    try {
      this.authState.isLoading = true
      this.notifyListeners()

      if (credentials.username === 'technician') {
        const masterPassword = await db.getSetting('technician_password')
        if (credentials.password === masterPassword) {
          const techUser = await db.getUserByUsername('technician')
          if (techUser) {
            await this.setAuthenticatedUser(techUser)
            return { success: true }
          }
        }
        return { success: false, error: 'Mot de passe technicien incorrect' }
      }

      const user = await db.getUserByUsername(credentials.username)
      if (!user) {
        return { success: false, error: 'Utilisateur non trouvé' }
      }

      const storedPassword = await db.getSetting(`user_password_${user.id}`)
      if (storedPassword !== credentials.password) {
        return { success: false, error: 'Mot de passe incorrect' }
      }

      user.lastLogin = new Date()
      await db.updateUser(user)
      await this.setAuthenticatedUser(user)
      return { success: true }

    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Erreur de connexion' }
    } finally {
      this.authState.isLoading = false
      this.notifyListeners()
    }
  }

  async register(userData: {
    username: string
    password: string
    name: string
    email?: string
  }): Promise<{ success: boolean; error?: string }> {
    try {
      const existingUser = await db.getUserByUsername(userData.username)
      if (existingUser) {
        return { success: false, error: 'Nom d\'utilisateur déjà utilisé' }
      }

      const newUser: User = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        username: userData.username,
        role: 'auditor',
        name: userData.name,
        email: userData.email,
        createdAt: new Date(),
      }

      await db.createUser(newUser)
      await db.setSetting(`user_password_${newUser.id}`, userData.password)
      return { success: true }

    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: 'Erreur lors de la création du compte' }
    }
  }

  private async setAuthenticatedUser(user: User): Promise<void> {
    this.authState = {
      user,
      isAuthenticated: true,
      isLoading: false,
    }

    localStorage.setItem('tama_auditor_user', JSON.stringify(user))
    this.notifyListeners()
  }

  async logout(): Promise<void> {
    this.authState = {
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }

    localStorage.removeItem('tama_auditor_user')
    this.notifyListeners()
  }

  getCurrentUser(): User | null {
    return this.authState.user
  }

  isAuthenticated(): boolean {
    return this.authState.isAuthenticated
  }

  isTechnician(): boolean {
    return this.authState.user?.role === 'technician'
  }
}

export const authService = AuthService.getInstance()

export function useAuth() {
  const [authState, setAuthState] = React.useState<AuthState>(authService.getAuthState())

  React.useEffect(() => {
    const unsubscribe = authService.subscribe(setAuthState)
    return unsubscribe
  }, [])

  return {
    ...authState,
    login: authService.login.bind(authService),
    logout: authService.logout.bind(authService),
    register: authService.register.bind(authService),
    isTechnician: authService.isTechnician.bind(authService),
  }
}
