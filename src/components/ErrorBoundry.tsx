'use client'

import { Component, ErrorInfo, ReactNode } from 'react'
import Link from 'next/link'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode)
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  resetKeys?: unknown[]
}

interface ErrorBoundaryState {
  error: Error | null
  errorInfo: ErrorInfo | null
  hasError: boolean
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      error: null,
      errorInfo: null,
      hasError: false
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return {
      error,
      hasError: true
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    this.setState({
      errorInfo
    })

    // Call onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by ErrorBoundary:', error)
      console.error('Component stack:', errorInfo.componentStack)
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    // Reset error state if resetKeys change
    if (this.state.hasError && this.props.resetKeys && prevProps.resetKeys) {
      const hasKeyChanged = this.props.resetKeys.some((key, index) => 
        key !== prevProps.resetKeys?.[index]
      )
      
      if (hasKeyChanged) {
        this.resetErrorBoundary()
      }
    }
  }

  resetErrorBoundary = (): void => {
    this.setState({
      error: null,
      errorInfo: null,
      hasError: false
    })
  }

  render(): ReactNode {
    const { hasError, error } = this.state
    const { children, fallback } = this.props

    if (hasError && error) {
      // Use custom fallback if provided
      if (fallback) {
        if (typeof fallback === 'function') {
          return fallback(error, this.resetErrorBoundary)
        }
        return fallback
      }

      // Default error UI
      return (
        <div className="relative min-h-[400px] w-full py-12 px-4 bg-black">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-orange-900/20"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
          
          {/* Decorative Elements */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-20 right-20 text-6xl animate-float opacity-10">⚠️</div>
            <div className="absolute bottom-20 left-20 text-6xl animate-float opacity-10" style={{ animationDelay: '1s' }}>❗</div>
          </div>

          <div className="container mx-auto relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              {/* Icon */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-400/30 to-orange-500/30 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="relative inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-red-400 to-orange-500 rounded-3xl transform -rotate-12 hover:rotate-0 transition-transform duration-500">
                  <span className="text-6xl animate-bounce">⚠️</span>
                </div>
              </div>

              {/* Error Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-red-400 via-orange-500 to-red-400 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
                  Something Went Wrong
                </span>
              </h1>
              
              {/* Error Message */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/10">
                <p className="text-gray-400 mb-4">
                  {error.message || 'An unexpected error occurred'}
                </p>
                
                {/* Error Details (Development Only) */}
                {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                  <details className="text-left mt-4">
                    <summary className="text-sm text-yellow-400 cursor-pointer hover:text-yellow-500 transition-colors">
                      View Error Details
                    </summary>
                    <div className="mt-4 p-4 bg-black/50 rounded-xl border border-white/10 overflow-auto max-h-96">
                      <p className="text-xs text-gray-400 font-mono whitespace-pre-wrap">
                        {error.stack}
                      </p>
                      <p className="text-xs text-gray-500 font-mono mt-4 whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </p>
                    </div>
                  </details>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={this.resetErrorBoundary}
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-full text-lg transform hover:scale-110 transition-all duration-500 hover:shadow-2xl group"
                >
                  <span className="mr-2 group-hover:rotate-180 transition-transform duration-500">↻</span>
                  <span>Try Again</span>
                </button>

                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full text-lg border border-white/20 hover:bg-white/20 transform hover:scale-110 transition-all duration-500"
                >
                  <span className="mr-2">🏠</span>
                  <span>Return Home</span>
                </Link>

                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-md text-white font-bold rounded-full text-lg border border-white/10 hover:bg-white/10 transform hover:scale-110 transition-all duration-500"
                >
                  <span className="mr-2">🔄</span>
                  <span>Reload Page</span>
                </button>
              </div>

              {/* Error Code */}
              <div className="mt-8 text-xs text-gray-600">
                Error ID: {this.generateErrorId()}
              </div>

              {/* Support Link */}
              <div className="mt-4">
                <Link
                  href="/contact"
                  className="text-sm text-gray-500 hover:text-yellow-400 transition-colors"
                >
                  Need help? Contact Support →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return children
  }

  private generateErrorId(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase()
  }
}

// Higher-Order Component for functional components
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
): React.FC<P> {
  const WrappedComponent: React.FC<P> = (props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  )

  WrappedComponent.displayName = `withErrorBoundary(${
    Component.displayName || Component.name || 'Component'
  })`

  return WrappedComponent
}

// Hook for programmatic error handling
export function useErrorHandler<T = Error>(): (error: T) => void {
  const [error, setError] = useState<T | null>(null)
  
  if (error) {
    throw error
  }
  
  return setError
}

// Import useState for the hook
import { useState } from 'react'

// Global error boundary for app root
export class AppErrorBoundary extends ErrorBoundary {
  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-black to-purple-900/30"></div>
          
          <div className="relative z-10 max-w-md w-full">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-400 to-purple-500 rounded-2xl mb-6">
                <span className="text-4xl">🔴</span>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">
                Critical Error
              </h2>
              
              <p className="text-gray-400 text-sm mb-6">
                The application encountered a critical error. Please try refreshing the page.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full py-3 px-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-xl hover:scale-105 transition-transform duration-300"
                >
                  Refresh Page
                </button>
                
                <Link
                  href="/"
                  className="block w-full py-3 px-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors duration-300"
                >
                  Back to Home
                </Link>
              </div>
              
              <p className="mt-6 text-xs text-gray-600">
                If the problem persists, please contact support
              </p>
            </div>
          </div>
        </div>
      )
    }
    
    return this.props.children
  }
}