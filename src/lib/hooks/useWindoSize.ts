'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'

// ============== Types ==============

export interface WindowSize {
  width: number
  height: number
}

export interface WindowDimensions extends WindowSize {
  // Breakpoint checks
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLargeDesktop: boolean
  
  // Specific breakpoints
  isSm: boolean
  isMd: boolean
  isLg: boolean
  isXl: boolean
  is2xl: boolean
  
  // Orientation
  isPortrait: boolean
  isLandscape: boolean
  
  // Aspect ratio
  aspectRatio: number
  isSquare: boolean
  isWide: boolean
  isTall: boolean
  
  // Scroll
  scrollY: number
  scrollX: number
  
  // Element dimensions
  getElementSize: (element: HTMLElement | null) => ElementSize | null
  getElementPosition: (element: HTMLElement | null) => ElementPosition | null
  
  // Viewport units
  vw: (percentage: number) => number
  vh: (percentage: number) => number
  
  // Helpers
  isInViewport: (element: HTMLElement | null, offset?: number) => boolean
  isAboveFold: (element: HTMLElement | null) => boolean
}

export interface ElementSize {
  width: number
  height: number
  offsetWidth: number
  offsetHeight: number
  clientWidth: number
  clientHeight: number
  scrollWidth: number
  scrollHeight: number
}

export interface ElementPosition {
  top: number
  right: number
  bottom: number
  left: number
  x: number
  y: number
  width: number
  height: number
}

export interface ScrollPosition {
  x: number
  y: number
}

export interface UseWindowSizeOptions {
  debounceMs?: number
  throttleMs?: number
  includeScroll?: boolean
  includeOrientation?: boolean
  breakpoints?: Breakpoints
}

export interface Breakpoints {
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
}

export interface UseWindowSizeReturn extends WindowDimensions {
  // State
  size: WindowSize
  scroll: ScrollPosition
  
  // Methods
  refresh: () => void
  
  // Breakpoint configuration
  breakpoints: Breakpoints
}

// ============== Constants ==============

const DEFAULT_BREAKPOINTS: Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024
const DESKTOP_BREAKPOINT = 1280
const LARGE_DESKTOP_BREAKPOINT = 1536

const SQUARE_ASPECT_THRESHOLD = 0.1
const WIDE_ASPECT_RATIO = 1.5
const TALL_ASPECT_RATIO = 0.67

// ============== Utility Functions ==============

const isClient = typeof window !== 'undefined'

const getWindowSize = (): WindowSize => {
  if (!isClient) {
    return { width: 0, height: 0 }
  }
  
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

const getScrollPosition = (): ScrollPosition => {
  if (!isClient) {
    return { x: 0, y: 0 }
  }
  
  return {
    x: window.scrollX,
    y: window.scrollY,
  }
}

const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  ms: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = setTimeout(() => {
      fn(...args)
      timeoutId = null
    }, ms)
  }
}

const throttle = <T extends (...args: any[]) => void>(
  fn: T,
  ms: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0
  let timeoutId: NodeJS.Timeout | null = null
  let lastArgs: Parameters<T> | null = null
  
  return (...args: Parameters<T>) => {
    const now = Date.now()
    
    if (now - lastCall >= ms) {
      lastCall = now
      fn(...args)
    } else {
      lastArgs = args
      
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      
      timeoutId = setTimeout(() => {
        if (lastArgs) {
          fn(...lastArgs)
          lastCall = Date.now()
          lastArgs = null
        }
        timeoutId = null
      }, ms - (now - lastCall))
    }
  }
}

// ============== Main Hook ==============

export default function useWindowSize(
  options: UseWindowSizeOptions = {}
): UseWindowSizeReturn {
  const {
    debounceMs = 100,
    throttleMs = 100,
    includeScroll = true,
    includeOrientation = true,
    breakpoints = DEFAULT_BREAKPOINTS,
  } = options

  const [size, setSize] = useState<WindowSize>({ width: 0, height: 0 })
  const [scroll, setScroll] = useState<ScrollPosition>({ x: 0, y: 0 })
  const [isInitialized, setIsInitialized] = useState(false)

  // ============== Handlers ==============

  const handleResize = useCallback(() => {
    setSize(getWindowSize())
  }, [])

  const handleScroll = useCallback(() => {
    if (includeScroll) {
      setScroll(getScrollPosition())
    }
  }, [includeScroll])

  // Debounced/throttled handlers
  const debouncedResize = useMemo(
    () => debounce(handleResize, debounceMs),
    [handleResize, debounceMs]
  )

  const throttledScroll = useMemo(
    () => throttle(handleScroll, throttleMs),
    [handleScroll, throttleMs]
  )

  // ============== Initialize ==============

  useEffect(() => {
    if (!isClient) return

    // Set initial values
    setSize(getWindowSize())
    setScroll(getScrollPosition())
    setIsInitialized(true)

    // Add event listeners
    window.addEventListener('resize', debouncedResize)
    
    if (includeScroll) {
      window.addEventListener('scroll', throttledScroll, { passive: true })
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', debouncedResize)
      
      if (includeScroll) {
        window.removeEventListener('scroll', throttledScroll)
      }
    }
  }, [debouncedResize, throttledScroll, includeScroll])

  // ============== Breakpoint Checks ==============

  const breakpointChecks = useMemo(() => {
    const width = size.width
    
    return {
      isMobile: width > 0 && width < MOBILE_BREAKPOINT,
      isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
      isDesktop: width >= DESKTOP_BREAKPOINT && width < LARGE_DESKTOP_BREAKPOINT,
      isLargeDesktop: width >= LARGE_DESKTOP_BREAKPOINT,
      
      isSm: width >= breakpoints.sm,
      isMd: width >= breakpoints.md,
      isLg: width >= breakpoints.lg,
      isXl: width >= breakpoints.xl,
      is2xl: width >= breakpoints['2xl'],
    }
  }, [size.width, breakpoints])

  // ============== Orientation ==============

  const orientation = useMemo(() => {
    if (!includeOrientation) {
      return { isPortrait: false, isLandscape: false }
    }
    
    return {
      isPortrait: size.height > size.width,
      isLandscape: size.width > size.height,
    }
  }, [size.width, size.height, includeOrientation])

  // ============== Aspect Ratio ==============

  const aspectRatio = useMemo(() => {
    if (size.width === 0 || size.height === 0) return 0
    return Number((size.width / size.height).toFixed(2))
  }, [size.width, size.height])

  const aspectRatioChecks = useMemo(() => {
    return {
      aspectRatio,
      isSquare: Math.abs(aspectRatio - 1) < SQUARE_ASPECT_THRESHOLD,
      isWide: aspectRatio >= WIDE_ASPECT_RATIO,
      isTall: aspectRatio <= TALL_ASPECT_RATIO,
    }
  }, [aspectRatio])

  // ============== Helper Methods ==============

  const getElementSize = useCallback((element: HTMLElement | null): ElementSize | null => {
    if (!element || !isClient) return null
    
    return {
      width: element.getBoundingClientRect().width,
      height: element.getBoundingClientRect().height,
      offsetWidth: element.offsetWidth,
      offsetHeight: element.offsetHeight,
      clientWidth: element.clientWidth,
      clientHeight: element.clientHeight,
      scrollWidth: element.scrollWidth,
      scrollHeight: element.scrollHeight,
    }
  }, [])

  const getElementPosition = useCallback((element: HTMLElement | null): ElementPosition | null => {
    if (!element || !isClient) return null
    
    const rect = element.getBoundingClientRect()
    
    return {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    }
  }, [])

  const vw = useCallback((percentage: number): number => {
    if (!isClient) return 0
    return (size.width * percentage) / 100
  }, [size.width])

  const vh = useCallback((percentage: number): number => {
    if (!isClient) return 0
    return (size.height * percentage) / 100
  }, [size.height])

  const isInViewport = useCallback((element: HTMLElement | null, offset: number = 0): boolean => {
    if (!element || !isClient) return false
    
    const rect = element.getBoundingClientRect()
    
    return (
      rect.top + offset < window.innerHeight &&
      rect.bottom - offset > 0 &&
      rect.left + offset < window.innerWidth &&
      rect.right - offset > 0
    )
  }, [size.width, size.height])

  const isAboveFold = useCallback((element: HTMLElement | null): boolean => {
    if (!element || !isClient) return false
    
    const rect = element.getBoundingClientRect()
    return rect.top < window.innerHeight
  }, [])

  const refresh = useCallback(() => {
    handleResize()
    handleScroll()
  }, [handleResize, handleScroll])

  // ============== Computed Return ==============

  const dimensions: WindowDimensions = useMemo(
    () => ({
      ...size,
      ...breakpointChecks,
      ...orientation,
      ...aspectRatioChecks,
      scrollY: scroll.y,
      scrollX: scroll.x,
      getElementSize,
      getElementPosition,
      vw,
      vh,
      isInViewport,
      isAboveFold,
    }),
    [
      size,
      breakpointChecks,
      orientation,
      aspectRatioChecks,
      scroll,
      getElementSize,
      getElementPosition,
      vw,
      vh,
      isInViewport,
      isAboveFold,
    ]
  )

  return {
    ...dimensions,
    size,
    scroll,
    refresh,
    breakpoints,
  }
}

// ============== Specific Breakpoint Hooks ==============

export const useIsMobile = (): boolean => {
  const { isMobile } = useWindowSize()
  return isMobile
}

export const useIsTablet = (): boolean => {
  const { isTablet } = useWindowSize()
  return isTablet
}

export const useIsDesktop = (): boolean => {
  const { isDesktop } = useWindowSize()
  return isDesktop
}

export const useBreakpoint = (breakpoint: keyof Breakpoints): boolean => {
  const { breakpoints, width } = useWindowSize()
  return width >= breakpoints[breakpoint]
}

export const useBreakpointBetween = (min: keyof Breakpoints, max: keyof Breakpoints): boolean => {
  const { breakpoints, width } = useWindowSize()
  return width >= breakpoints[min] && width < breakpoints[max]
}

// ============== Orientation Hook ==============

export const useOrientation = (): {
  isPortrait: boolean
  isLandscape: boolean
} => {
  const { isPortrait, isLandscape } = useWindowSize({ includeOrientation: true })
  return { isPortrait, isLandscape }
}

// ============== Scroll Hook ==============

export const useScrollPosition = (): ScrollPosition => {
  const { scroll } = useWindowSize({ includeScroll: true })
  return scroll
}

export const useScrollDirection = (): 'up' | 'down' | null => {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    if (!isClient) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY) {
        setDirection('down')
      } else if (currentScrollY < lastScrollY) {
        setDirection('up')
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  return direction
}

export const useScrollThreshold = (threshold: number): boolean => {
  const [isPastThreshold, setIsPastThreshold] = useState(false)

  useEffect(() => {
    if (!isClient) return

    const handleScroll = () => {
      setIsPastThreshold(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [threshold])

  return isPastThreshold
}

// ============== Element Visibility Hook ==============

export const useElementInViewport = (
  elementRef: React.RefObject<HTMLElement>,
  options?: {
    threshold?: number
    rootMargin?: string
    once?: boolean
  }
): boolean => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isClient || !elementRef.current) return

    const { threshold = 0, rootMargin = '0px', once = false } = options || {}

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        
        if (once && entry.isIntersecting) {
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(elementRef.current)

    return () => {
      observer.disconnect()
    }
  }, [elementRef, options?.threshold, options?.rootMargin, options?.once])

  return isVisible
}

// ============== Responsive Value Hook ==============

export const useResponsiveValue = <T,>(
  values: {
    base: T
    sm?: T
    md?: T
    lg?: T
    xl?: T
    '2xl'?: T
  }
): T => {
  const { width, breakpoints } = useWindowSize()

  return useMemo(() => {
    if (width >= breakpoints['2xl'] && values['2xl'] !== undefined) {
      return values['2xl']
    }
    if (width >= breakpoints.xl && values.xl !== undefined) {
      return values.xl
    }
    if (width >= breakpoints.lg && values.lg !== undefined) {
      return values.lg
    }
    if (width >= breakpoints.md && values.md !== undefined) {
      return values.md
    }
    if (width >= breakpoints.sm && values.sm !== undefined) {
      return values.sm
    }
    return values.base
  }, [width, breakpoints, values])
}

// ============== Media Query Hook ==============

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (!isClient) return

    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    
    return () => {
      mediaQuery.removeEventListener('change', handler)
    }
  }, [query])

  return matches
}

// ============== Device Detection Hook ==============

export const useDeviceDetect = (): {
  isTouchDevice: boolean
  isIos: boolean
  isAndroid: boolean
  isMobileDevice: boolean
  isTabletDevice: boolean
  isDesktopDevice: boolean
} => {
  const [deviceInfo, setDeviceInfo] = useState({
    isTouchDevice: false,
    isIos: false,
    isAndroid: false,
    isMobileDevice: false,
    isTabletDevice: false,
    isDesktopDevice: false,
  })

  useEffect(() => {
    if (!isClient) return

    const ua = navigator.userAgent
    const platform = navigator.platform
    
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isIos = /iPad|iPhone|iPod/.test(ua) || (platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    const isAndroid = /Android/.test(ua)
    const isMobileDevice = /Mobile|Android|iPhone|iPad|iPod/.test(ua)
    const isTabletDevice = /iPad|Android(?!.*Mobile)/.test(ua) || (isIos && !/iPhone|iPod/.test(ua))
    const isDesktopDevice = !isMobileDevice && !isTabletDevice

    setDeviceInfo({
      isTouchDevice,
      isIos,
      isAndroid,
      isMobileDevice,
      isTabletDevice,
      isDesktopDevice,
    })
  }, [])

  return deviceInfo
}