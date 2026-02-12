'use client'

import { useEffect, useState } from 'react'

export interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'white' | 'gradient' | 'danger' | 'success' | 'warning'
  type?: 'spinner' | 'dots' | 'pulse' | 'ring' | 'bars' | 'circle' | 'hourglass'
  fullscreen?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  text?: string
  textPosition?: 'top' | 'bottom' | 'left' | 'right'
  overlay?: boolean
  overlayBlur?: boolean
  count?: number
  speed?: 'slow' | 'normal' | 'fast'
  className?: string
  progress?: number
  showProgress?: boolean
  indeterminate?: boolean
  label?: string
  labelClassName?: string
}

export default function LoadingSpinner({
  size = 'md',
  variant = 'primary',
  type = 'spinner',
  fullscreen = false,
  fullWidth = false,
  fullHeight = false,
  text,
  textPosition = 'bottom',
  overlay = false,
  overlayBlur = true,
  count = 3,
  speed = 'normal',
  className = '',
  progress,
  showProgress = false,
  indeterminate = true,
  label,
  labelClassName = ''
}: LoadingSpinnerProps) {
  const [progressValue, setProgressValue] = useState<number>(progress || 0)

  useEffect(() => {
    if (progress !== undefined) {
      setProgressValue(progress)
    }
  }, [progress])

  useEffect(() => {
    if (indeterminate && showProgress && progress === undefined) {
      const interval = setInterval(() => {
        setProgressValue((prev) => (prev >= 90 ? 10 : prev + 10))
      }, 500)
      return () => clearInterval(interval)
    }
  }, [indeterminate, showProgress, progress])

  const getSizeDimensions = (): { width: string; height: string; border: string } => {
    const sizes = {
      xs: { width: 'w-4', height: 'h-4', border: 'border-2' },
      sm: { width: 'w-6', height: 'h-6', border: 'border-2' },
      md: { width: 'w-8', height: 'h-8', border: 'border-3' },
      lg: { width: 'w-12', height: 'h-12', border: 'border-4' },
      xl: { width: 'w-16', height: 'h-16', border: 'border-4' }
    }
    return sizes[size] || sizes.md
  }

  const getDotSize = (): string => {
    const sizes = {
      xs: 'w-1 h-1',
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
      lg: 'w-2.5 h-2.5',
      xl: 'w-3 h-3'
    }
    return sizes[size] || sizes.md
  }

  const getBarSize = (): string => {
    const sizes = {
      xs: 'w-0.5 h-3',
      sm: 'w-0.5 h-4',
      md: 'w-1 h-5',
      lg: 'w-1 h-6',
      xl: 'w-1.5 h-8'
    }
    return sizes[size] || sizes.md
  }

  const getRingSize = (): string => {
    const sizes = {
      xs: 'w-8 h-8',
      sm: 'w-12 h-12',
      md: 'w-16 h-16',
      lg: 'w-20 h-20',
      xl: 'w-24 h-24'
    }
    return sizes[size] || sizes.md
  }

  const getVariantColors = (): string => {
    const variants = {
      primary: 'text-yellow-400 border-yellow-400',
      secondary: 'text-gray-400 border-gray-400',
      white: 'text-white border-white',
      gradient: 'text-transparent border-gradient-to-r from-yellow-400 to-amber-500',
      danger: 'text-red-400 border-red-400',
      success: 'text-green-400 border-green-400',
      warning: 'text-orange-400 border-orange-400'
    }
    return variants[variant] || variants.primary
  }

  const getSpeedAnimation = (): string => {
    const speeds = {
      slow: 'animate-spin-slow',
      normal: 'animate-spin',
      fast: 'animate-spin-fast'
    }
    return speeds[speed] || speeds.normal
  }

  const getPulseSpeed = (): string => {
    const speeds = {
      slow: 'animate-pulse-slow',
      normal: 'animate-pulse',
      fast: 'animate-pulse-fast'
    }
    return speeds[speed] || speeds.normal
  }

  const getBounceSpeed = (): string => {
    const speeds = {
      slow: 'animate-bounce-slow',
      normal: 'animate-bounce',
      fast: 'animate-bounce-fast'
    }
    return speeds[speed] || speeds.normal
  }

  const dimensions = getSizeDimensions()
  const dotSize = getDotSize()
  const barSize = getBarSize()
  const ringSize = getRingSize()
  const variantColors = getVariantColors()
  const spinAnimation = getSpeedAnimation()
  const pulseAnimation = getPulseSpeed()
  const bounceAnimation = getBounceSpeed()

  const renderSpinner = (): React.ReactNode => {
    switch (type) {
      case 'spinner':
        return (
          <div
            className={`
              ${dimensions.width} ${dimensions.height}
              ${dimensions.border} border-current border-t-transparent
              rounded-full ${spinAnimation}
              ${variant === 'gradient' ? 'border-gradient-to-r from-yellow-400 to-amber-500 border-t-transparent' : ''}
            `}
            role="status"
            aria-label="loading"
          />
        )

      case 'dots':
        return (
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className={`
                  ${dotSize} rounded-full
                  ${variant === 'gradient' 
                    ? `bg-gradient-to-r from-yellow-400 to-amber-500` 
                    : `bg-${variantColors.split(' ')[0]}`
                  }
                  ${bounceAnimation}
                `}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        )

      case 'pulse':
        return (
          <div
            className={`
              ${dimensions.width} ${dimensions.height}
              rounded-full ${pulseAnimation}
              ${variant === 'gradient'
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500'
                : `bg-${variantColors.split(' ')[0]}`
              }
            `}
            role="status"
            aria-label="loading"
          />
        )

      case 'ring':
        return (
          <div className="relative">
            <div
              className={`
                ${ringSize} rounded-full
                border-4 border-current/20
                ${variant === 'gradient' ? 'border-yellow-400/20' : ''}
              `}
            />
            <div
              className={`
                absolute inset-0 ${ringSize} rounded-full
                border-4 border-current border-t-transparent
                ${spinAnimation}
                ${variant === 'gradient' ? 'border-gradient-to-r from-yellow-400 to-amber-500 border-t-transparent' : ''}
              `}
            />
          </div>
        )

      case 'bars':
        return (
          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`
                  ${barSize}
                  ${variant === 'gradient'
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500'
                    : `bg-${variantColors.split(' ')[0]}`
                  }
                  animate-bar
                `}
                style={{
                  animation: `barWave 1.2s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        )

      case 'circle':
        return (
          <svg
            className={`
              ${dimensions.width} ${dimensions.height}
              ${spinAnimation}
            `}
            viewBox="0 0 50 50"
            role="status"
            aria-label="loading"
          >
            <circle
              className="opacity-20"
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <circle
              className="opacity-100"
              cx="25"
              cy="25"
              r="20"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="30 100"
              fill="none"
            />
            {variant === 'gradient' && (
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            )}
          </svg>
        )

      case 'hourglass':
        return (
          <div className={`
            ${dimensions.width} ${dimensions.height}
            relative
          `}>
            <div className={`
              absolute inset-0
              border-4 border-current border-t-transparent
              rounded-full ${spinAnimation}
              ${variant === 'gradient' ? 'border-gradient-to-r from-yellow-400 to-amber-500 border-t-transparent' : ''}
            `} />
            <div className={`
              absolute inset-2
              border-2 border-current border-b-transparent
              rounded-full ${spinAnimation}
              ${variant === 'gradient' ? 'border-gradient-to-r from-yellow-400 to-amber-500 border-b-transparent' : ''}
            `} />
          </div>
        )

      default:
        return (
          <div
            className={`
              ${dimensions.width} ${dimensions.height}
              ${dimensions.border} border-current border-t-transparent
              rounded-full ${spinAnimation}
              ${variant === 'gradient' ? 'border-gradient-to-r from-yellow-400 to-amber-500 border-t-transparent' : ''}
            `}
            role="status"
            aria-label="loading"
          />
        )
    }
  }

  const spinnerContent = (
    <div className={`
      flex flex-col items-center justify-center
      ${textPosition === 'top' ? 'flex-col-reverse' : ''}
      ${textPosition === 'left' ? 'flex-row' : ''}
      ${textPosition === 'right' ? 'flex-row-reverse' : ''}
      gap-3
    `}>
      {renderSpinner()}
      
      {(text || label) && (
        <div className={`
          flex flex-col items-center
          ${labelClassName}
        `}>
          {label && (
            <span className="text-sm font-medium text-gray-400">
              {label}
            </span>
          )}
          {text && (
            <span className="text-sm text-gray-500">
              {text}
            </span>
          )}
        </div>
      )}

      {showProgress && (
        <div className="w-32 mt-2">
          <div className="relative h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className={`
                absolute inset-y-0 left-0
                h-full rounded-full
                transition-all duration-300
                ${variant === 'gradient'
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500'
                  : `bg-${variantColors.split(' ')[0]}`
                }
              `}
              style={{ width: `${progressValue}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 mt-1">
            {progressValue}%
          </span>
        </div>
      )}
    </div>
  )

  if (fullscreen || overlay) {
    return (
      <div
        className={`
          fixed inset-0 z-50
          flex items-center justify-center
          ${overlay ? 'bg-black/80' : 'bg-black'}
          ${overlayBlur ? 'backdrop-blur-md' : ''}
          transition-all duration-300
        `}
        role="alert"
        aria-busy="true"
      >
        {spinnerContent}
      </div>
    )
  }

  if (fullWidth || fullHeight) {
    return (
      <div
        className={`
          flex items-center justify-center
          ${fullWidth ? 'w-full' : ''}
          ${fullHeight ? 'h-full' : ''}
          ${className}
        `}
        role="status"
        aria-busy="true"
      >
        {spinnerContent}
      </div>
    )
  }

  return (
    <div
      className={`inline-flex ${className}`}
      role="status"
      aria-busy="true"
    >
      {spinnerContent}
    </div>
  )
}

// Page Loading Spinner
export const PageLoader: React.FC<Omit<LoadingSpinnerProps, 'fullscreen' | 'overlay'>> = (props) => (
  <LoadingSpinner
    {...props}
    fullscreen
    overlay
    overlayBlur
    size="lg"
    type="ring"
    variant="gradient"
    label="Loading..."
  />
)

// Section Loading Spinner
export const SectionLoader: React.FC<Omit<LoadingSpinnerProps, 'fullWidth' | 'fullHeight'>> = (props) => (
  <LoadingSpinner
    {...props}
    fullWidth
    fullHeight
    size="md"
    type="spinner"
    variant="primary"
    className="py-12"
  />
)

// Button Loading Spinner
export const ButtonSpinner: React.FC<Omit<LoadingSpinnerProps, 'size' | 'type'>> = (props) => (
  <LoadingSpinner
    {...props}
    size="xs"
    type="spinner"
    variant="white"
  />
)

// Add custom keyframes to your global CSS file:
/*
@keyframes barWave {
  0%, 100% { transform: scaleY(0.5); }
  50% { transform: scaleY(1.5); }
}

.animate-bar {
  animation: barWave 1.2s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin 2s linear infinite;
}

.animate-spin-fast {
  animation: spin 0.6s linear infinite;
}

.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-pulse-fast {
  animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-bounce-slow {
  animation: bounce 2s infinite;
}

.animate-bounce-fast {
  animation: bounce 0.8s infinite;
}
*/