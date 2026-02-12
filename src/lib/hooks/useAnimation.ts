'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

// ============== Types ==============

export interface AnimationOptions {
  duration?: number
  delay?: number
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both'
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  iterations?: number | 'infinite'
  onStart?: () => void
  onComplete?: () => void
  onCancel?: () => void
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export interface AnimationState {
  isAnimating: boolean
  progress: number
  isInView: boolean
  isPlaying: boolean
  isFinished: boolean
  isReversed: boolean
}

export interface UseAnimationReturn extends AnimationState {
  start: () => void
  stop: () => void
  reset: () => void
  toggle: () => void
  ref: (node: HTMLElement | null) => void
  setProgress: (progress: number) => void
  reverse: () => void
  play: () => void
  pause: () => void
  cancel: () => void
  finish: () => void
}

// ============== Main Hook ==============

export default function useAnimation({
  duration = 300,
  delay = 0,
  easing = 'ease',
  direction = 'normal',
  iterations = 1,
  onStart,
  onComplete,
  onCancel,
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true
}: AnimationOptions = {}): UseAnimationReturn {
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [isReversed, setIsReversed] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const elementRef = useRef<HTMLElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const pausedTimeRef = useRef(0)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const iterationRef = useRef(0)
  const hasAnimatedRef = useRef(false)

  // ============== Intersection Observer ==============

  useEffect(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
          
          if (entry.isIntersecting && (!hasAnimatedRef.current || !triggerOnce)) {
            if (!hasAnimatedRef.current) {
              start()
              hasAnimatedRef.current = true
            }
          }
        })
      },
      { threshold, rootMargin }
    )

    if (elementRef.current) {
      observerRef.current.observe(elementRef.current)
    }

    return () => {
      observerRef.current?.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce])

  // ============== Cleanup ==============

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // ============== Easing Functions ==============

  const easeIn = (t: number): number => t * t
  const easeOut = (t: number): number => t * (2 - t)
  const easeInOut = (t: number): number => 
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

  const getEasedProgress = (t: number): number => {
    switch (easing) {
      case 'ease-in': return easeIn(t)
      case 'ease-out': return easeOut(t)
      case 'ease-in-out': return easeInOut(t)
      default: return t
    }
  }

  // ============== Animation Loop ==============

  const animate = useCallback((): void => {
    if (!duration) return

    const step = (currentTime: number) => {
      if (isPaused) {
        pausedTimeRef.current = currentTime - (startTimeRef.current || 0)
        animationRef.current = requestAnimationFrame(step)
        return
      }

      let elapsed = currentTime - (startTimeRef.current || 0) - pausedTimeRef.current
      
      if (delay > 0 && elapsed < delay) {
        animationRef.current = requestAnimationFrame(step)
        return
      }

      elapsed = Math.max(0, elapsed - delay)
      let timeProgress = Math.min(elapsed / duration, 1)
      
      // Apply easing
      let easedProgress = getEasedProgress(timeProgress)

      // Apply direction
      if (direction === 'reverse') {
        easedProgress = 1 - easedProgress
      } else if (direction === 'alternate') {
        const isEven = Math.floor(iterationRef.current) % 2 === 0
        easedProgress = isEven ? easedProgress : 1 - easedProgress
      } else if (direction === 'alternate-reverse') {
        const isEven = Math.floor(iterationRef.current) % 2 === 0
        easedProgress = isEven ? 1 - easedProgress : easedProgress
      }

      // Apply reverse state
      if (isReversed) {
        easedProgress = 1 - easedProgress
      }

      setProgress(easedProgress)

      if (timeProgress < 1) {
        animationRef.current = requestAnimationFrame(step)
      } else {
        // Handle iterations
        if (iterations === 'infinite') {
          iterationRef.current++
          startTimeRef.current = performance.now()
          pausedTimeRef.current = 0
          animationRef.current = requestAnimationFrame(step)
        } else if (iterationRef.current < (iterations as number) - 1) {
          iterationRef.current++
          startTimeRef.current = performance.now()
          pausedTimeRef.current = 0
          animationRef.current = requestAnimationFrame(step)
        } else {
          setIsAnimating(false)
          setIsFinished(true)
          onComplete?.()
        }
      }
    }

    startTimeRef.current = performance.now()
    pausedTimeRef.current = 0
    animationRef.current = requestAnimationFrame(step)
  }, [duration, delay, easing, direction, iterations, isPaused, isReversed, onComplete])

  // ============== Actions ==============

  const start = useCallback(() => {
    setIsReversed(false)
    setProgress(0)
    setIsAnimating(true)
    setIsFinished(false)
    onStart?.()
    animate()
  }, [animate, onStart])

  const stop = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    setIsAnimating(false)
    onCancel?.()
  }, [onCancel])

  const reset = useCallback(() => {
    stop()
    setProgress(0)
    setIsAnimating(false)
    setIsFinished(false)
    setIsReversed(false)
    setIsPaused(false)
    iterationRef.current = 0
    startTimeRef.current = null
    pausedTimeRef.current = 0
    hasAnimatedRef.current = false
  }, [stop])

  const toggle = useCallback(() => {
    if (isAnimating) {
      stop()
    } else {
      start()
    }
  }, [isAnimating, start, stop])

  const setProgressValue = useCallback((value: number) => {
    setProgress(Math.max(0, Math.min(1, value)))
  }, [])

  const reverse = useCallback(() => {
    setIsReversed(prev => !prev)
  }, [])

  const play = useCallback(() => {
    setIsPaused(false)
    if (!isAnimating) {
      start()
    }
  }, [isAnimating, start])

  const pause = useCallback(() => {
    setIsPaused(true)
    setIsAnimating(false)
  }, [])

  const cancel = useCallback(() => {
    stop()
    setProgress(0)
    setIsFinished(false)
  }, [stop])

  const finish = useCallback(() => {
    setProgress(1)
    setIsAnimating(false)
    setIsFinished(true)
    onComplete?.()
  }, [onComplete])

  const ref = useCallback((node: HTMLElement | null) => {
    if (elementRef.current && observerRef.current) {
      observerRef.current.unobserve(elementRef.current)
    }

    elementRef.current = node

    if (node && observerRef.current) {
      observerRef.current.observe(node)
    }
  }, [])

  // ============== Return ==============

  return {
    isAnimating,
    progress,
    isInView,
    isPlaying: isAnimating && !isPaused,
    isFinished,
    isReversed,
    start,
    stop,
    reset,
    toggle,
    ref,
    setProgress: setProgressValue,
    reverse,
    play,
    pause,
    cancel,
    finish
  }
}

// ============== Specific Animation Hooks ==============

export const useFadeIn = (options?: AnimationOptions): UseAnimationReturn => {
  return useAnimation({
    duration: 500,
    easing: 'ease-out',
    ...options
  })
}

export const useSlideIn = (
  direction: 'left' | 'right' | 'top' | 'bottom' = 'left',
  options?: AnimationOptions
) => {
  const animation = useAnimation({
    duration: 600,
    easing: 'ease-out',
    ...options
  })

  const getTransform = () => {
    const distance = 50 * (1 - animation.progress)
    
    switch (direction) {
      case 'left': return `translateX(${distance}px)`
      case 'right': return `translateX(-${distance}px)`
      case 'top': return `translateY(${distance}px)`
      case 'bottom': return `translateY(-${distance}px)`
    }
  }

  return {
    ...animation,
    style: {
      opacity: animation.progress,
      transform: getTransform(),
      transition: `all ${options?.duration || 600}ms ${options?.easing || 'ease-out'}`
    } as React.CSSProperties
  }
}

export const useScaleIn = (options?: AnimationOptions) => {
  const animation = useAnimation({
    duration: 500,
    easing: 'ease-out',
    ...options
  })

  return {
    ...animation,
    style: {
      opacity: animation.progress,
      transform: `scale(${0.5 + animation.progress * 0.5})`,
      transition: `all ${options?.duration || 500}ms ${options?.easing || 'ease-out'}`
    } as React.CSSProperties
  }
}

export const useRotateIn = (options?: AnimationOptions) => {
  const animation = useAnimation({
    duration: 600,
    easing: 'ease-out',
    ...options
  })

  return {
    ...animation,
    style: {
      opacity: animation.progress,
      transform: `rotate(${-180 + animation.progress * 180}deg)`,
      transition: `all ${options?.duration || 600}ms ${options?.easing || 'ease-out'}`
    } as React.CSSProperties
  }
}

export const useBounce = (options?: AnimationOptions) => {
  const animation = useAnimation({
    duration: 800,
    easing: 'ease-in-out',
    ...options
  })

  const getBounce = () => {
    const p = animation.progress
    return Math.sin(p * Math.PI) * (p < 0.5 ? 30 : 15)
  }

  return {
    ...animation,
    style: {
      transform: `translateY(${getBounce()}px)`,
      transition: `all ${options?.duration || 800}ms ${options?.easing || 'ease-in-out'}`
    } as React.CSSProperties
  }
}

export const usePulse = (options?: AnimationOptions) => {
  const animation = useAnimation({
    duration: 1000,
    easing: 'ease-in-out',
    iterations: 'infinite',
    direction: 'alternate',
    ...options
  })

  return {
    ...animation,
    style: {
      transform: `scale(${0.9 + animation.progress * 0.2})`,
      opacity: 0.8 + animation.progress * 0.2,
      transition: `all ${options?.duration || 1000}ms ${options?.easing || 'ease-in-out'}`
    } as React.CSSProperties
  }
}

export const useShake = (options?: AnimationOptions) => {
  const animation = useAnimation({
    duration: 500,
    easing: 'ease-in-out',
    ...options
  })

  const getShake = () => {
    return Math.sin(animation.progress * Math.PI * 4) * 5
  }

  return {
    ...animation,
    style: {
      transform: `translateX(${getShake()}px)`,
      transition: `all ${options?.duration || 500}ms ${options?.easing || 'ease-in-out'}`
    } as React.CSSProperties
  }
}

// ============== Scroll Animation Hook ==============

export const useScrollAnimation = (options?: AnimationOptions) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const animation = useAnimation(options)
  const elementRef = useRef<HTMLElement | null>(null)

  // Set up the ref callback
  const setRef = useCallback((node: HTMLElement | null) => {
    elementRef.current = node
    animation.ref(node)
  }, [animation])

  useEffect(() => {
    const handleScroll = () => {
      const element = elementRef.current
      
      if (!element) return
      
      const rect = element.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      const visibleTop = Math.max(0, rect.top)
      const visibleBottom = Math.min(viewportHeight, rect.bottom)
      
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const visibleHeight = visibleBottom - visibleTop
        const progress = visibleHeight / rect.height
        setScrollProgress(Math.min(1, Math.max(0, progress)))
        animation.setProgress(Math.min(1, Math.max(0, progress)))
      } else {
        setScrollProgress(0)
        animation.setProgress(0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [animation])

  return {
    ...animation,
    scrollProgress,
    ref: setRef
  }
}

// ============== Sequence Animation Hook ==============

export const useSequence = (animations: Array<() => Promise<void>>, options?: AnimationOptions) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const play = useCallback(async () => {
    setIsPlaying(true)
    setCurrentIndex(0)

    for (let i = 0; i < animations.length; i++) {
      setCurrentIndex(i)
      await animations[i]()
      
      if (options?.delay && i < animations.length - 1) {
        await new Promise(resolve => setTimeout(resolve, options.delay))
      }
    }

    setIsPlaying(false)
  }, [animations, options?.delay])

  const reset = useCallback(() => {
    setIsPlaying(false)
    setCurrentIndex(0)
  }, [])

  return {
    play,
    reset,
    isPlaying,
    currentIndex
  }
}

// ============== Parallax Hook ==============

export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0)
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return
      
      const rect = elementRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const scrollY = window.scrollY
        const elementY = rect.top + scrollY
        const relativeOffset = (scrollY - elementY) * speed
        setOffset(relativeOffset)
      } else {
        setOffset(0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  const ref = useCallback((node: HTMLElement | null) => {
    elementRef.current = node
  }, [])

  return {
    ref,
    offset,
    style: {
      transform: `translateY(${offset}px)`,
      transition: 'transform 0.1s linear'
    } as React.CSSProperties
  }
}

// ============== Stagger Hook ==============

export const useStagger = (count: number, baseDelay: number = 50) => {
  const animation = useAnimation({
    duration: 400,
    easing: 'ease-out'
  })

  const getProps = useCallback((index: number) => {
    const delay = index * baseDelay
    const progress = Math.max(0, Math.min(1, 
      animation.progress - (delay / 400)
    ))

    return {
      style: {
        opacity: progress,
        transform: `translateY(${20 * (1 - progress)}px)`,
        transition: `all 400ms ease-out ${delay}ms`
      } as React.CSSProperties,
      'data-stagger': index
    }
  }, [animation.progress, baseDelay])

  return {
    ...animation,
    getProps
  }
}