'use client'

import { ButtonHTMLAttributes, forwardRef, useState } from 'react'
import Link from 'next/link'

export interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'gradient'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  shape?: 'rounded' | 'pill' | 'circle' | 'square'
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
  href?: string
  target?: string
  rel?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
  children?: React.ReactNode
  className?: string
  glow?: boolean
  animate?: boolean
  tooltip?: string
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(({
  variant = 'primary',
  size = 'md',
  shape = 'rounded',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  href,
  target,
  rel,
  onClick,
  children,
  className = '',
  glow = false,
  animate = false,
  tooltip,
  tooltipPosition = 'top',
  type = 'button',
  ...props
}, ref) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const getVariantClasses = (): string => {
    const variants = {
      primary: `
        bg-gradient-to-r from-yellow-400 to-amber-500 
        text-black font-bold
        hover:from-yellow-500 hover:to-amber-600
        active:from-yellow-600 active:to-amber-700
        focus:ring-2 focus:ring-yellow-400/50
      `,
      secondary: `
        bg-white/10 backdrop-blur-md
        text-white font-semibold
        border border-white/20
        hover:bg-white/20 hover:border-white/30
        active:bg-white/30
        focus:ring-2 focus:ring-white/30
      `,
      outline: `
        bg-transparent
        text-white font-semibold
        border-2 border-yellow-400/50
        hover:bg-yellow-400/10 hover:border-yellow-400
        active:bg-yellow-400/20
        focus:ring-2 focus:ring-yellow-400/30
      `,
      ghost: `
        bg-transparent
        text-gray-300 font-medium
        hover:bg-white/10 hover:text-white
        active:bg-white/20
        focus:ring-2 focus:ring-white/20
      `,
      danger: `
        bg-gradient-to-r from-red-400 to-red-600
        text-white font-bold
        hover:from-red-500 hover:to-red-700
        active:from-red-600 active:to-red-800
        focus:ring-2 focus:ring-red-400/50
      `,
      success: `
        bg-gradient-to-r from-green-400 to-emerald-500
        text-white font-bold
        hover:from-green-500 hover:to-emerald-600
        active:from-green-600 active:to-emerald-700
        focus:ring-2 focus:ring-green-400/50
      `,
      warning: `
        bg-gradient-to-r from-orange-400 to-red-400
        text-white font-bold
        hover:from-orange-500 hover:to-red-500
        active:from-orange-600 active:to-red-600
        focus:ring-2 focus:ring-orange-400/50
      `,
      gradient: `
        bg-gradient-to-r from-purple-400 via-pink-500 to-red-400
        text-white font-bold
        hover:from-purple-500 hover:via-pink-600 hover:to-red-500
        active:from-purple-600 active:via-pink-700 active:to-red-600
        focus:ring-2 focus:ring-purple-400/50
        bg-[length:200%_200%] animate-gradient
      `
    }
    return variants[variant] || variants.primary
  }

  const getSizeClasses = (): string => {
    const sizes = {
      xs: 'px-3 py-1.5 text-xs gap-1.5',
      sm: 'px-4 py-2 text-sm gap-2',
      md: 'px-6 py-2.5 text-base gap-2',
      lg: 'px-8 py-3 text-lg gap-3',
      xl: 'px-10 py-4 text-xl gap-3'
    }
    return sizes[size] || sizes.md
  }

  const getShapeClasses = (): string => {
    const shapes = {
      rounded: 'rounded-lg',
      pill: 'rounded-full',
      circle: 'rounded-full aspect-square p-0 flex items-center justify-center',
      square: 'rounded-lg aspect-square p-0 flex items-center justify-center'
    }
    return shapes[shape] || shapes.rounded
  }

  const getIconSize = (): string => {
    const sizes = {
      xs: 'text-base',
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl',
      xl: 'text-3xl'
    }
    return sizes[size] || sizes.md
  }

  const getTooltipPositionClasses = (): string => {
    const positions = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2'
    }
    return positions[tooltipPosition] || positions.top
  }

  const baseClasses = `
    relative inline-flex items-center justify-center
    font-medium transition-all duration-300
    focus:outline-none focus:ring-offset-2 focus:ring-offset-black/90
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    ${fullWidth ? 'w-full' : ''}
    ${glow ? 'hover:shadow-lg hover:shadow-yellow-400/25' : ''}
    ${animate ? 'hover:scale-105 active:scale-95' : ''}
    ${loading ? 'cursor-wait' : ''}
  `

  const buttonContent = (
    <>
      {/* Loading Spinner */}
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center bg-inherit rounded-inherit">
          <svg 
            className="animate-spin h-5 w-5" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      )}

      {/* Content */}
      <span className={`flex items-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {icon && iconPosition === 'left' && (
          <span className={`${getIconSize()} transform group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className={`${getIconSize()} transform group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </span>
        )}
      </span>

      {/* Tooltip */}
      {tooltip && !disabled && (
        <span 
          className={`
            absolute z-50 ${getTooltipPositionClasses()}
            px-2 py-1 text-xs font-medium text-white
            bg-black/95 backdrop-blur-sm border border-white/10
            rounded-lg whitespace-nowrap
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
            pointer-events-none
          `}
          role="tooltip"
        >
          {tooltip}
          <span 
            className={`
              absolute w-2 h-2 bg-black/95 border-white/10
              ${tooltipPosition === 'top' ? 'top-full left-1/2 -translate-x-1/2 -mt-1 border-t-0 border-l-0' : ''}
              ${tooltipPosition === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1 border-b-0 border-r-0' : ''}
              ${tooltipPosition === 'left' ? 'left-full top-1/2 -translate-y-1/2 -ml-1 border-l-0 border-b-0' : ''}
              ${tooltipPosition === 'right' ? 'right-full top-1/2 -translate-y-1/2 -mr-1 border-r-0 border-t-0' : ''}
              transform rotate-45 border
            `}
          />
        </span>
      )}
    </>
  )

  const combinedClassName = `
    ${baseClasses}
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${getShapeClasses()}
    ${shape === 'circle' || shape === 'square' ? `w-${size === 'xs' ? '8' : size === 'sm' ? '10' : size === 'md' ? '12' : size === 'lg' ? '14' : '16'} h-${size === 'xs' ? '8' : size === 'sm' ? '10' : size === 'md' ? '12' : size === 'lg' ? '14' : '16'}` : ''}
    ${className}
  `

  // Render as Link if href is provided
  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={`${combinedClassName} group`}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-disabled={disabled}
        aria-label={props['aria-label']}
        {...(disabled ? { tabIndex: -1 } : {})}
      >
        {buttonContent}
      </Link>
    )
  }

  // Render as button
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={`${combinedClassName} group`}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {buttonContent}
    </button>
  )
})

CustomButton.displayName = 'CustomButton'

export default CustomButton