'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// ============== Custom Button Component (Built-in) ==============

interface CustomButtonProps {
  href: string
  variant?: 'gradient' | 'outline' | 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  shape?: 'rounded' | 'pill' | 'square'
  animate?: boolean
  glow?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
  children: React.ReactNode
  className?: string
}

const CustomButton = ({
  href,
  variant = 'primary',
  size = 'md',
  shape = 'rounded',
  animate = false,
  glow = false,
  icon,
  iconPosition = 'left',
  children,
  className = '',
}: CustomButtonProps) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium transition-all duration-300
    ${size === 'sm' ? 'px-4 py-2 text-sm' : ''}
    ${size === 'md' ? 'px-6 py-3 text-base' : ''}
    ${size === 'lg' ? 'px-8 py-4 text-lg' : ''}
    ${shape === 'rounded' ? 'rounded-lg' : ''}
    ${shape === 'pill' ? 'rounded-full' : ''}
    ${shape === 'square' ? 'rounded-none' : ''}
    ${animate ? 'hover:scale-105 active:scale-95' : ''}
    ${glow ? 'hover:shadow-lg hover:shadow-yellow-400/25' : ''}
  `

  const variantClasses = {
    gradient: 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold hover:from-yellow-500 hover:to-amber-600',
    outline: 'bg-transparent text-yellow-400 border-2 border-yellow-400 hover:bg-yellow-400/10',
    primary: 'bg-yellow-400 text-black hover:bg-yellow-500',
    secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/20',
  }[variant]

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  )

  if (href.startsWith('/')) {
    return (
      <Link href={href} className={`${baseClasses} ${variantClasses} ${className}`}>
        {content}
      </Link>
    )
  }

  return (
    <a href={href} className={`${baseClasses} ${variantClasses} ${className}`}>
      {content}
    </a>
  )
}

// ============== Types ==============

export interface HeroSlide {
  id: string
  title: string
  subtitle?: string
  description?: string
  image: string
  mobileImage?: string
  ctaPrimary?: {
    label: string
    href: string
  }
  ctaSecondary?: {
    label: string
    href: string
  }
  badge?: {
    label: string
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  }
  offer?: {
    text: string
    percentage?: number
  }
  alignment?: 'left' | 'center' | 'right'
  overlay?: boolean
  overlayOpacity?: number
}

export interface HeroSectionProps {
  slides: HeroSlide[]
  autoplay?: boolean
  autoplaySpeed?: number
  showArrows?: boolean
  showDots?: boolean
  showPagination?: boolean
  height?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  variant?: 'default' | 'split' | 'minimal' | 'fullscreen'
  animation?: 'fade' | 'slide' | 'zoom' | 'none'
  onSlideChange?: (index: number) => void
  className?: string
}

// ============== Main Component ==============

export default function HeroSection({
  slides,
  autoplay = true,
  autoplaySpeed = 5000,
  showArrows = true,
  showDots = true,
  showPagination = true,
  height = 'lg',
  variant = 'default',
  animation = 'fade',
  onSlideChange,
  className = ''
}: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [touchStart, setTouchStart] = useState<number>(0)
  const [touchEnd, setTouchEnd] = useState<number>(0)

  useEffect(() => {
    if (!autoplay || isPaused || slides.length <= 1) return

    const timer = setInterval(() => {
      nextSlide()
    }, autoplaySpeed)

    return () => clearInterval(timer)
  }, [currentSlide, autoplay, autoplaySpeed, isPaused, slides.length])

  const getHeightClass = (): string => {
    const heights = {
      sm: 'min-h-[400px] md:min-h-[500px]',
      md: 'min-h-[500px] md:min-h-[600px]',
      lg: 'min-h-[600px] md:min-h-[700px]',
      xl: 'min-h-[700px] md:min-h-[800px]',
      full: 'min-h-screen'
    }
    return heights[height] || heights.lg
  }

  const getAlignmentClass = (alignment: HeroSlide['alignment'] = 'left'): string => {
    const alignments = {
      left: 'text-left items-start',
      center: 'text-center items-center',
      right: 'text-right items-end'
    }
    return alignments[alignment] || alignments.left
  }

  const getAnimationClass = (index: number): string => {
    if (animation === 'none') return 'opacity-100'
    
    const isActive = index === currentSlide
    
    switch (animation) {
      case 'fade':
        return `transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`
      case 'slide':
        return `transition-transform duration-700 ${isActive ? 'translate-x-0' : 'translate-x-full'}`
      case 'zoom':
        return `transition-all duration-1000 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`
      default:
        return `transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`
    }
  }

  const getVariantClass = (): string => {
    const variants = {
      default: '',
      split: 'grid lg:grid-cols-2 gap-8 items-center',
      minimal: 'py-12',
      fullscreen: 'min-h-screen'
    }
    return variants[variant] || variants.default
  }

  const nextSlide = (): void => {
    if (isAnimating || slides.length <= 1) return
    
    setIsAnimating(true)
    const next = (currentSlide + 1) % slides.length
    setCurrentSlide(next)
    onSlideChange?.(next)
    
    setTimeout(() => setIsAnimating(false), 1000)
  }

  const prevSlide = (): void => {
    if (isAnimating || slides.length <= 1) return
    
    setIsAnimating(true)
    const prev = (currentSlide - 1 + slides.length) % slides.length
    setCurrentSlide(prev)
    onSlideChange?.(prev)
    
    setTimeout(() => setIsAnimating(false), 1000)
  }

  const goToSlide = (index: number): void => {
    if (isAnimating || index === currentSlide || slides.length <= 1) return
    
    setIsAnimating(true)
    setCurrentSlide(index)
    onSlideChange?.(index)
    
    setTimeout(() => setIsAnimating(false), 1000)
  }

  const handleTouchStart = (e: React.TouchEvent): void => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent): void => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (): void => {
    if (!touchStart || !touchEnd || slides.length <= 1) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50
    
    if (isLeftSwipe) nextSlide()
    if (isRightSwipe) prevSlide()
    
    setTouchStart(0)
    setTouchEnd(0)
  }

  if (slides.length === 0) {
    return null
  }

  return (
    <section
      className={`
        relative w-full overflow-hidden bg-black
        ${getHeightClass()}
        ${getVariantClass()}
        ${className}
      `}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Hero banner"
      aria-roledescription="carousel"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-600/20 rounded-full filter blur-3xl animate-pulse-slow" />
      </div>

      {/* Slides Container */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`
              absolute inset-0 w-full h-full
              ${getAnimationClass(index)}
              ${index === currentSlide ? 'z-10' : 'z-0'}
            `}
            aria-hidden={index !== currentSlide}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
              />
              
              {/* Overlay */}
              {slide.overlay !== false && (
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/60"
                  style={{ opacity: slide.overlayOpacity ?? 0.6 }}
                />
              )}
            </div>

            {/* Content */}
            <div className={`
              relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 h-full
              flex flex-col justify-center
              ${getAlignmentClass(slide.alignment)}
            `}>
              <div className="max-w-3xl">
                {/* Badge */}
                {slide.badge && (
                  <div className="mb-6">
                    <span className={`
                      inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold
                      ${slide.badge.variant === 'primary' ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black' : ''}
                      ${slide.badge.variant === 'secondary' ? 'bg-white/20 backdrop-blur-md text-white border border-white/30' : ''}
                      ${slide.badge.variant === 'success' ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' : ''}
                      ${slide.badge.variant === 'warning' ? 'bg-gradient-to-r from-orange-400 to-red-400 text-white' : ''}
                      ${slide.badge.variant === 'danger' ? 'bg-gradient-to-r from-red-400 to-red-600 text-white' : ''}
                      ${!slide.badge.variant ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black' : ''}
                    `}>
                      {slide.badge.label}
                    </span>
                  </div>
                )}

                {/* Offer Badge */}
                {slide.offer && (
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                      <span className="text-yellow-400">🎉</span>
                      <span className="text-white text-sm font-medium">
                        {slide.offer.text}
                        {slide.offer.percentage && (
                          <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-xs rounded-full">
                            -{slide.offer.percentage}%
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                )}

                {/* Title */}
                <h1 className={`
                  text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4
                  ${variant === 'minimal' ? 'text-3xl md:text-4xl' : ''}
                `}>
                  <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
                    {slide.title}
                  </span>
                </h1>

                {/* Subtitle */}
                {slide.subtitle && (
                  <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-4">
                    {slide.subtitle}
                  </h2>
                )}

                {/* Description */}
                {slide.description && (
                  <p className={`
                    text-base sm:text-lg text-gray-400 mb-8 max-w-2xl
                    ${slide.alignment === 'center' ? 'mx-auto' : ''}
                  `}>
                    {slide.description}
                  </p>
                )}

                {/* CTA Buttons */}
                <div className={`
                  flex flex-wrap gap-4
                  ${slide.alignment === 'center' ? 'justify-center' : ''}
                  ${slide.alignment === 'right' ? 'justify-end' : ''}
                `}>
                  {slide.ctaPrimary && (
                    <CustomButton
                      href={slide.ctaPrimary.href}
                      variant="gradient"
                      size="lg"
                      shape="pill"
                      animate
                      glow
                      icon="✨"
                    >
                      {slide.ctaPrimary.label}
                    </CustomButton>
                  )}
                  
                  {slide.ctaSecondary && (
                    <CustomButton
                      href={slide.ctaSecondary.href}
                      variant="outline"
                      size="lg"
                      shape="pill"
                      animate
                      icon="→"
                      iconPosition="right"
                    >
                      {slide.ctaSecondary.label}
                    </CustomButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-black/50 backdrop-blur-md hover:bg-black/70 border border-white/10 rounded-full flex items-center justify-center text-white hover:text-yellow-400 transition-all duration-300 group"
            aria-label="Previous slide"
            disabled={isAnimating}
          >
            <span className="text-2xl transform group-hover:-translate-x-1 transition-transform duration-300">
              ←
            </span>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-black/50 backdrop-blur-md hover:bg-black/70 border border-white/10 rounded-full flex items-center justify-center text-white hover:text-yellow-400 transition-all duration-300 group"
            aria-label="Next slide"
            disabled={isAnimating}
          >
            <span className="text-2xl transform group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`
                transition-all duration-300 rounded-full
                ${index === currentSlide 
                  ? 'w-8 h-2 bg-gradient-to-r from-yellow-400 to-amber-500' 
                  : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                }
              `}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide}
              disabled={isAnimating}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {showPagination && slides.length > 1 && (
        <div className="absolute bottom-8 right-8 z-30 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full">
          <span className="text-sm text-white">
            <span className="text-yellow-400 font-bold">{currentSlide + 1}</span>
            <span className="text-gray-500"> / {slides.length}</span>
          </span>
        </div>
      )}

      {/* Scroll Indicator */}
      {variant === 'fullscreen' && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      )}
    </section>
  )
}

// ============== Variants ==============

export const SplitHero: React.FC<HeroSectionProps> = (props) => (
  <HeroSection {...props} variant="split" height="xl" />
)

export const MinimalHero: React.FC<HeroSectionProps> = (props) => (
  <HeroSection {...props} variant="minimal" height="sm" showArrows={false} showDots={false} />
)

export const FullscreenHero: React.FC<HeroSectionProps> = (props) => (
  <HeroSection {...props} variant="fullscreen" height="full" />
)

// ============== Video Hero ==============

export interface VideoHeroProps {
  videoSrc: string
  posterImage?: string
  title: string
  subtitle?: string
  description?: string
  ctaPrimary?: {
    label: string
    href: string
  }
  ctaSecondary?: {
    label: string
    href: string
  }
  className?: string
}

export const VideoHero: React.FC<VideoHeroProps> = ({
  videoSrc,
  posterImage,
  title,
  subtitle,
  description,
  ctaPrimary,
  ctaSecondary,
  className = ''
}) => {
  return (
    <section className={`relative w-full min-h-screen overflow-hidden bg-black ${className}`}>
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={posterImage}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full min-h-screen flex items-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          
          {subtitle && (
            <h2 className="text-2xl md:text-3xl text-gray-300 mb-4">
              {subtitle}
            </h2>
          )}
          
          {description && (
            <p className="text-lg text-gray-400 mb-8">
              {description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-4">
            {ctaPrimary && (
              <CustomButton
                href={ctaPrimary.href}
                variant="gradient"
                size="lg"
                shape="pill"
                animate
                glow
              >
                {ctaPrimary.label}
              </CustomButton>
            )}
            
            {ctaSecondary && (
              <CustomButton
                href={ctaSecondary.href}
                variant="outline"
                size="lg"
                shape="pill"
                animate
              >
                {ctaSecondary.label}
              </CustomButton>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}