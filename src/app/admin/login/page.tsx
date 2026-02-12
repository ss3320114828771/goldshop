// File: src/app/admin/login/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate API call
    setTimeout(() => {
      if (email === 'admin@hafizsajid.com' && password === 'admin123') {
        window.location.href = '/admin/dashboard'
      } else {
        setError('Invalid email or password')
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-full filter blur-3xl animate-spin-slow"></div>
      </div>

      {/* Floating Ornaments */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 text-6xl animate-float opacity-20">💎</div>
        <div className="absolute bottom-20 left-20 text-6xl animate-float opacity-20" style={{ animationDelay: '1s' }}>💍</div>
        <div className="absolute top-1/3 right-1/4 text-6xl animate-float opacity-20" style={{ animationDelay: '2s' }}>⌚</div>
        <div className="absolute bottom-1/3 left-1/4 text-6xl animate-float opacity-20" style={{ animationDelay: '3s' }}>💻</div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group perspective-1000">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%] transform-style-3d group-hover:rotate-y-10 transition-all duration-500">
              Hafiz Sajid Syed
            </div>
            <div className="text-sm text-gray-400 mt-2 tracking-widest uppercase">
              Admin Portal
            </div>
          </Link>
        </div>

        {/* Login Card */}
        <div className="relative perspective-1000">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-3xl blur-xl opacity-20 animate-pulse-slow"></div>
          
          {/* Card */}
          <div className="relative glass-effect rounded-3xl p-8 transform-style-3d hover:rotate-x-6 transition-all duration-700">
            {/* Decorative Top Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 rounded-t-3xl"></div>
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-3xl mb-4 transform hover:rotate-12 transition-all duration-500">
                <span className="text-4xl">👑</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-400">Login to access admin dashboard</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                <div className="flex items-center space-x-3">
                  <span className="text-red-400 text-xl">⚠️</span>
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-gray-400 text-xl">📧</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 text-white placeholder-gray-500 transition-all duration-300"
                      placeholder="admin@hafizsajid.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-gray-400 text-xl">🔒</span>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 text-white placeholder-gray-500 transition-all duration-300"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`
                      w-5 h-5 border-2 rounded-md transition-all duration-300
                      ${rememberMe 
                        ? 'bg-gradient-to-r from-yellow-400 to-amber-500 border-yellow-400' 
                        : 'border-white/20 bg-white/5 group-hover:border-yellow-400/50'
                      }
                    `}>
                      {rememberMe && (
                        <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    Remember me
                  </span>
                </label>

                <Link 
                  href="/admin/forgot-password" 
                  className="text-sm text-yellow-400 hover:text-yellow-500 transition-colors duration-300"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`
                  relative w-full py-4 px-6 rounded-xl font-bold text-lg
                  bg-gradient-to-r from-yellow-400 to-amber-500 text-black
                  transform hover:scale-105 transition-all duration-500
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                  group overflow-hidden
                `}
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                
                <span className="relative flex items-center justify-center space-x-2">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <>
                      <span>Login to Dashboard</span>
                      <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-gray-400 text-center mb-2">
                Demo Admin Credentials
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-sm">
                <code className="px-2 py-1 bg-black/30 rounded text-yellow-400">admin@hafizsajid.com</code>
                <span className="text-gray-600 hidden sm:inline">•</span>
                <code className="px-2 py-1 bg-black/30 rounded text-yellow-400">admin123</code>
              </div>
            </div>

            {/* Footer Links */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-gray-400 text-sm">
                Need help?{' '}
                <Link href="/contact" className="text-yellow-400 hover:text-yellow-500 transition-colors duration-300 font-semibold">
                  Contact Support
                </Link>
              </p>
              <Link 
                href="/" 
                className="inline-flex items-center justify-center space-x-2 mt-4 text-sm text-gray-500 hover:text-gray-400 transition-colors duration-300"
              >
                <span>←</span>
                <span>Back to Website</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 text-xs text-gray-600">
            <span>🔒</span>
            <span>Secured with 256-bit encryption</span>
          </div>
        </div>
      </div>
    </div>
  )
}