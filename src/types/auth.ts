export interface User {
  id: string
  username: string
  role: 'auditor' | 'technician'
  name: string
  email?: string
  createdAt: Date
  lastLogin?: Date
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface TechnicianAccess {
  masterPassword: string
  canResetPasswords: boolean
  canAccessAllAudits: boolean
}
