'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'

// ============== Types ==============

export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin' | 'vendor'
  avatar?: string
  emailVerified: boolean
  createdAt: string
}

export interface AuthCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
  expiresIn: number
}

export interface AuthError {
  code: string
  message: string
  field?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  isInitialized: boolean
  error: AuthError | null
}

export interface UseAuthReturn extends AuthState {
  login: (credentials: AuthCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  verifyEmail: (token: string) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (token: string, password: string) => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
  clearError: () => void
}

// ============== Constants ==============

const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'auth_user',
} as const

const REFRESH_THRESHOLD = 5 * 60 * 1000 // 5 minutes

// ============== Error Class ==============

export class AuthErrorClass extends Error {
  public code: string
  public field?: string

  constructor(error: AuthError) {
    super(error.message)
    this.name = 'AuthError'
    this.code = error.code
    this.field = error.field
  }
}

// ============== Main Hook ==============

export default function useAuth(): UseAuthReturn {
  const router = useRouter()
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null)
  
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
    isInitialized: false,
    error: null,
  })

  // ============== Storage Helpers ==============

  const setStoredAuth = useCallback((token: string, user: User) => {
    try {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token)
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
    } catch (error) {
      console.error('Failed to store auth data:', error)
    }
  }, [])

  const clearStoredAuth = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.TOKEN)
      localStorage.removeItem(STORAGE_KEYS.USER)
      sessionStorage.clear()
    } catch (error) {
      console.error('Failed to clear auth data:', error)
    }
  }, [])

  const getStoredAuth = useCallback(() => {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
      const userJson = localStorage.getItem(STORAGE_KEYS.USER)
      const user = userJson ? JSON.parse(userJson) as User : null
      return { token, user }
    } catch (error) {
      console.error('Failed to get stored auth:', error)
      return { token: null, user: null }
    }
  }, [])

  // ============== Token Refresh ==============

  const scheduleTokenRefresh = useCallback((expiresIn: number) => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current)
    }

    const refreshTime = Math.max(expiresIn - REFRESH_THRESHOLD, 0)

    refreshTimerRef.current = setTimeout(async () => {
      if (state.token) {
        try {
          await refreshToken()
        } catch {
          await logout()
        }
      }
    }, refreshTime)
  }, [state.token])

  const refreshToken = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: state.token }),
      })

      if (!response.ok) throw new Error('Refresh failed')

      const data = await response.json() as AuthResponse
      
      setStoredAuth(data.token, data.user)
      
      setState(prev => ({
        ...prev,
        token: data.token,
        user: data.user,
      }))

      scheduleTokenRefresh(data.expiresIn)
    } catch {
      throw new AuthErrorClass({
        code: 'REFRESH_FAILED',
        message: 'Session expired. Please login again.',
      })
    }
  }, [state.token, setStoredAuth, scheduleTokenRefresh])

  // ============== Initialize ==============

  useEffect(() => {
    const initialize = async () => {
      const { token, user } = getStoredAuth()
      
      if (token && user) {
        setState({
          user,
          token,
          isLoading: false,
          isAuthenticated: true,
          isInitialized: true,
          error: null,
        })
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          isInitialized: true,
          isAuthenticated: false,
        }))
      }
    }

    initialize()

    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current)
      }
    }
  }, [getStoredAuth])

  // ============== Auth Actions ==============

  const login = useCallback(async (credentials: AuthCredentials): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new AuthErrorClass({
          code: error.code || 'LOGIN_FAILED',
          message: error.message || 'Invalid email or password',
          field: error.field,
        })
      }

      const data = await response.json() as AuthResponse

      if (credentials.rememberMe) {
        setStoredAuth(data.token, data.user)
      }

      setState({
        user: data.user,
        token: data.token,
        isLoading: false,
        isAuthenticated: true,
        isInitialized: true,
        error: null,
      })

      scheduleTokenRefresh(data.expiresIn)

      // Redirect
      const redirect = new URLSearchParams(window.location.search).get('redirect')
      router.push(redirect || (data.user.role === 'admin' ? '/admin' : '/account'))
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        isAuthenticated: false,
        error: error instanceof AuthErrorClass ? error : new AuthErrorClass({
          code: 'LOGIN_ERROR',
          message: 'An unexpected error occurred',
        }),
      }))
    }
  }, [router, setStoredAuth, scheduleTokenRefresh])

  const register = useCallback(async (data: RegisterData): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      if (data.password !== data.confirmPassword) {
        throw new AuthErrorClass({
          code: 'PASSWORD_MISMATCH',
          message: 'Passwords do not match',
          field: 'confirmPassword',
        })
      }

      if (!data.acceptTerms) {
        throw new AuthErrorClass({
          code: 'TERMS_REQUIRED',
          message: 'You must accept the terms',
          field: 'acceptTerms',
        })
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new AuthErrorClass({
          code: error.code || 'REGISTRATION_FAILED',
          message: error.message || 'Registration failed',
          field: error.field,
        })
      }

      await login({ email: data.email, password: data.password, rememberMe: true })
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof AuthErrorClass ? error : new AuthErrorClass({
          code: 'REGISTRATION_ERROR',
          message: 'Registration failed',
        }),
      }))
    }
  }, [login])

  const logout = useCallback(async (): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true }))

    try {
      if (state.token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${state.token}` },
        }).catch(() => {})
      }
    } finally {
      clearStoredAuth()
      
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current)
      }

      setState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        isInitialized: true,
        error: null,
      })

      router.push('/')
    }
  }, [state.token, router, clearStoredAuth])

  const verifyEmail = useCallback(async (token: string): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })

      if (!response.ok) {
        throw new AuthErrorClass({
          code: 'VERIFICATION_FAILED',
          message: 'Email verification failed',
        })
      }

      if (state.user) {
        const updatedUser = { ...state.user, emailVerified: true }
        setStoredAuth(state.token!, updatedUser)
        
        setState(prev => ({
          ...prev,
          user: updatedUser,
          isLoading: false,
        }))
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof AuthErrorClass ? error : new AuthErrorClass({
          code: 'VERIFICATION_ERROR',
          message: 'Verification failed',
        }),
      }))
    }
  }, [state.user, state.token, setStoredAuth])

  const forgotPassword = useCallback(async (email: string): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new AuthErrorClass({
          code: 'FORGOT_PASSWORD_FAILED',
          message: 'Failed to send reset email',
        })
      }

      setState(prev => ({ ...prev, isLoading: false }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof AuthErrorClass ? error : new AuthErrorClass({
          code: 'FORGOT_PASSWORD_ERROR',
          message: 'Failed to send reset email',
        }),
      }))
    }
  }, [])

  const resetPassword = useCallback(async (token: string, password: string): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })

      if (!response.ok) {
        throw new AuthErrorClass({
          code: 'RESET_PASSWORD_FAILED',
          message: 'Failed to reset password',
        })
      }

      setState(prev => ({ ...prev, isLoading: false }))
      router.push('/auth/login?reset=success')
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof AuthErrorClass ? error : new AuthErrorClass({
          code: 'RESET_PASSWORD_ERROR',
          message: 'Failed to reset password',
        }),
      }))
    }
  }, [router])

  const updateProfile = useCallback(async (data: Partial<User>): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      if (!state.user || !state.token) {
        throw new AuthErrorClass({
          code: 'NOT_AUTHENTICATED',
          message: 'You must be logged in',
        })
      }

      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${state.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new AuthErrorClass({
          code: 'UPDATE_PROFILE_FAILED',
          message: 'Failed to update profile',
        })
      }

      const updatedUser = await response.json() as User
      setStoredAuth(state.token, updatedUser)

      setState(prev => ({
        ...prev,
        user: updatedUser,
        isLoading: false,
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof AuthErrorClass ? error : new AuthErrorClass({
          code: 'UPDATE_PROFILE_ERROR',
          message: 'Failed to update profile',
        }),
      }))
    }
  }, [state.user, state.token, setStoredAuth])

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  return {
    ...state,
    login,
    register,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
    updateProfile,
    clearError,
  }
}

// ============== Route Guards ==============

export const useRequireAuth = (redirectTo: string = '/auth/login') => {
  const router = useRouter()
  const { user, isLoading, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const redirect = encodeURIComponent(window.location.pathname)
      router.push(`${redirectTo}?redirect=${redirect}`)
    }
  }, [isLoading, isAuthenticated, router, redirectTo])

  return { user, isLoading, isAuthenticated }
}

export const useRequireAdmin = (redirectTo: string = '/auth/login') => {
  const router = useRouter()
  const { user, isLoading, isAuthenticated } = useAuth()
  const isAdmin = user?.role === 'admin'

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        const redirect = encodeURIComponent(window.location.pathname)
        router.push(`${redirectTo}?redirect=${redirect}`)
      } else if (!isAdmin) {
        router.push('/account')
      }
    }
  }, [isLoading, isAuthenticated, isAdmin, router, redirectTo])

  return { user, isLoading, isAdmin }
}