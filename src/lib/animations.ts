// ============== Types ==============

export type EasingFunction = (t: number) => number

export interface AnimationConfig {
  duration?: number
  delay?: number
  easing?: EasingFunction | keyof typeof EASING_FUNCTIONS
  iterations?: number | 'infinite'
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both'
}

export interface Keyframe {
  offset: number
  styles: Record<string, string | number>
  easing?: string
}

export interface SpringConfig {
  mass?: number
  stiffness?: number
  damping?: number
  velocity?: number
}

export interface TransitionConfig {
  property?: string | string[]
  duration?: number
  delay?: number
  easing?: string
}

export interface Variants {
  initial?: Record<string, any>
  animate?: Record<string, any>
  exit?: Record<string, any>
  hover?: Record<string, any>
  tap?: Record<string, any>
  focus?: Record<string, any>
  drag?: Record<string, any>
  [key: string]: Record<string, any> | undefined
}

export interface VariantLabels {
  initial?: string
  animate?: string
  exit?: string
  whileHover?: string
  whileTap?: string
  whileFocus?: string
  whileDrag?: string
}

// ============== Constants ==============

export const EASING_FUNCTIONS = {
  linear: (t: number): number => t,
  
  easeInQuad: (t: number): number => t * t,
  easeOutQuad: (t: number): number => t * (2 - t),
  easeInOutQuad: (t: number): number => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  
  easeInCubic: (t: number): number => t * t * t,
  easeOutCubic: (t: number): number => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t: number): number => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  
  easeInQuart: (t: number): number => t * t * t * t,
  easeOutQuart: (t: number): number => 1 - Math.pow(1 - t, 4),
  easeInOutQuart: (t: number): number => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
  
  easeInQuint: (t: number): number => t * t * t * t * t,
  easeOutQuint: (t: number): number => 1 - Math.pow(1 - t, 5),
  easeInOutQuint: (t: number): number => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
  
  easeInSine: (t: number): number => 1 - Math.cos((t * Math.PI) / 2),
  easeOutSine: (t: number): number => Math.sin((t * Math.PI) / 2),
  easeInOutSine: (t: number): number => -(Math.cos(Math.PI * t) - 1) / 2,
  
  easeInExpo: (t: number): number => t === 0 ? 0 : Math.pow(2, 10 * t - 10),
  easeOutExpo: (t: number): number => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  easeInOutExpo: (t: number): number => {
    if (t === 0) return 0
    if (t === 1) return 1
    if (t < 0.5) return Math.pow(2, 20 * t - 10) / 2
    return (2 - Math.pow(2, -20 * t + 10)) / 2
  },
  
  easeInCirc: (t: number): number => 1 - Math.sqrt(1 - Math.pow(t, 2)),
  easeOutCirc: (t: number): number => Math.sqrt(1 - Math.pow(t - 1, 2)),
  easeInOutCirc: (t: number): number => {
    if (t < 0.5) return (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
    return (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2
  },
  
  easeInBack: (t: number): number => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return c3 * t * t * t - c1 * t * t
  },
  easeOutBack: (t: number): number => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
  },
  easeInOutBack: (t: number): number => {
    const c1 = 1.70158
    const c2 = c1 * 1.525
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2
  },
  
  easeInElastic: (t: number): number => {
    if (t === 0) return 0
    if (t === 1) return 1
    return -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * (2 * Math.PI) / 3)
  },
  easeOutElastic: (t: number): number => {
    if (t === 0) return 0
    if (t === 1) return 1
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI) / 3) + 1
  },
  easeInOutElastic: (t: number): number => {
    if (t === 0) return 0
    if (t === 1) return 1
    if (t < 0.5) {
      return -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * (2 * Math.PI) / 4.5)) / 2
    }
    return (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * (2 * Math.PI) / 4.5)) / 2 + 1
  },
  
  easeInBounce: (t: number): number => 1 - EASING_FUNCTIONS.easeOutBounce(1 - t),
  easeOutBounce: (t: number): number => {
    const n1 = 7.5625
    const d1 = 2.75
    
    if (t < 1 / d1) {
      return n1 * t * t
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375
    }
  },
  easeInOutBounce: (t: number): number => {
    if (t < 0.5) {
      return (1 - EASING_FUNCTIONS.easeOutBounce(1 - 2 * t)) / 2
    }
    return (1 + EASING_FUNCTIONS.easeOutBounce(2 * t - 1)) / 2
  },
} as const

export const CSS_EASING = {
  linear: 'linear',
  
  easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  
  easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  
  easeInQuart: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
  easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  easeInOutQuart: 'cubic-bezier(0.77, 0, 0.175, 1)',
  
  easeInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
  easeOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
  easeInOutQuint: 'cubic-bezier(0.86, 0, 0.07, 1)',
  
  easeInSine: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
  easeOutSine: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
  easeInOutSine: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
  
  easeInExpo: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
  easeOutExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
  easeInOutExpo: 'cubic-bezier(1, 0, 0, 1)',
  
  easeInCirc: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
  easeOutCirc: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
  easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
  
  easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  
  easeInElastic: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOutElastic: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOutElastic: 'cubic-bezier(0.4, 0, 0.2, 1)',
  
  easeInBounce: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOutBounce: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOutBounce: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const

export const SPRING_CONFIG = {
  gentle: { mass: 1, stiffness: 100, damping: 10 },
  wobbly: { mass: 1, stiffness: 180, damping: 12 },
  stiff: { mass: 1, stiffness: 210, damping: 20 },
  slow: { mass: 1, stiffness: 80, damping: 20 },
  molasses: { mass: 1, stiffness: 20, damping: 20 },
  default: { mass: 1, stiffness: 170, damping: 26 },
} as const

export const TRANSITION_PRESETS = {
  default: 'all 0.3s ease',
  smooth: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  fast: 'all 0.15s ease',
  slow: 'all 0.7s ease',
  bounce: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const

// ============== Animation Utilities ==============

export const getEasingFunction = (
  easing: EasingFunction | keyof typeof EASING_FUNCTIONS
): EasingFunction => {
  if (typeof easing === 'function') {
    return easing
  }
  return EASING_FUNCTIONS[easing] || EASING_FUNCTIONS.linear
}

export const createKeyframes = (keyframes: Keyframe[]): Keyframe[] => {
  return keyframes.sort((a, b) => a.offset - b.offset)
}

export const interpolate = (
  start: number,
  end: number,
  progress: number,
  easing: EasingFunction | keyof typeof EASING_FUNCTIONS = 'linear'
): number => {
  const ease = getEasingFunction(easing)
  return start + (end - start) * ease(progress)
}

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

export const normalizeProgress = (progress: number): number => {
  return clamp(progress, 0, 1)
}

// ============== Spring Physics ==============

export const spring = (
  config: SpringConfig = {}
): {
  value: (t: number) => number
  velocity: (t: number) => number
} => {
  const {
    mass = 1,
    stiffness = 170,
    damping = 26,
    velocity = 0,
  } = config

  const omega = Math.sqrt(stiffness / mass)
  const zeta = damping / (2 * Math.sqrt(stiffness * mass))

  if (zeta < 1) {
    const omegaD = omega * Math.sqrt(1 - zeta * zeta)
    const c1 = 1
    const c2 = (velocity + zeta * omega) / omegaD

    return {
      value: (t: number): number => {
        return Math.exp(-zeta * omega * t) * (
          c1 * Math.cos(omegaD * t) + c2 * Math.sin(omegaD * t)
        )
      },
      velocity: (t: number): number => {
        const decay = Math.exp(-zeta * omega * t)
        const cos = Math.cos(omegaD * t)
        const sin = Math.sin(omegaD * t)
        
        return decay * (
          (c2 * omegaD - c1 * zeta * omega) * cos -
          (c1 * omegaD + c2 * zeta * omega) * sin
        )
      },
    }
  }

  if (zeta === 1) {
    const c1 = 1
    const c2 = velocity + omega

    return {
      value: (t: number): number => {
        return (c1 + c2 * t) * Math.exp(-omega * t)
      },
      velocity: (t: number): number => {
        return (c2 - omega * (c1 + c2 * t)) * Math.exp(-omega * t)
      },
    }
  }

  const r1 = -zeta * omega + omega * Math.sqrt(zeta * zeta - 1)
  const r2 = -zeta * omega - omega * Math.sqrt(zeta * zeta - 1)
  const c2 = (velocity - r1) / (r2 - r1)
  const c1 = 1 - c2

  return {
    value: (t: number): number => {
      return c1 * Math.exp(r1 * t) + c2 * Math.exp(r2 * t)
    },
    velocity: (t: number): number => {
      return c1 * r1 * Math.exp(r1 * t) + c2 * r2 * Math.exp(r2 * t)
    },
  }
}

// ============== CSS Utilities ==============

export const cssTransition = (
  config: TransitionConfig | string | string[]
): string => {
  if (typeof config === 'string') {
    return config
  }

  if (Array.isArray(config)) {
    return config.join(', ')
  }

  const {
    property = 'all',
    duration = 300,
    delay = 0,
    easing = 'ease',
  } = config

  const properties = Array.isArray(property) ? property : [property]
  
  return properties
    .map(prop => `${prop} ${duration}ms ${easing} ${delay}ms`)
    .join(', ')
}

export const cssKeyframes = (
  name: string,
  keyframes: Keyframe[]
): string => {
  const sorted = createKeyframes(keyframes)
  
  let css = `@keyframes ${name} {\n`
  
  sorted.forEach(({ offset, styles, easing }) => {
    css += `  ${offset * 100}% {\n`
    
    Object.entries(styles).forEach(([prop, value]) => {
      css += `    ${prop}: ${value};\n`
    })
    
    if (easing) {
      css += `    animation-timing-function: ${easing};\n`
    }
    
    css += `  }\n`
  })
  
  css += '}'
  
  return css
}

// ============== Variant Utilities ==============

export const createVariants = <T extends Variants>(variants: T): T => {
  return variants
}

export const combineVariants = (...variants: Variants[]): Variants => {
  return variants.reduce((acc, curr) => {
    Object.keys(curr).forEach(key => {
      acc[key] = {
        ...acc[key],
        ...curr[key],
      }
    })
    return acc
  }, {} as Variants)
}

// ============== Preset Animations ==============

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
}

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
}

export const scaleInUp = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.8, y: 20 },
}

export const rotateIn = {
  initial: { opacity: 0, rotate: -180 },
  animate: { opacity: 1, rotate: 0 },
  exit: { opacity: 0, rotate: 180 },
}

export const flipIn = {
  initial: { opacity: 0, rotateX: -90 },
  animate: { opacity: 1, rotateX: 0 },
  exit: { opacity: 0, rotateX: 90 },
}

export const slideInUp = {
  initial: { y: '100%' },
  animate: { y: 0 },
  exit: { y: '100%' },
}

export const slideInDown = {
  initial: { y: '-100%' },
  animate: { y: 0 },
  exit: { y: '-100%' },
}

export const slideInLeft = {
  initial: { x: '-100%' },
  animate: { x: 0 },
  exit: { x: '-100%' },
}

export const slideInRight = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
}

export const bounceIn = {
  initial: { opacity: 0, scale: 0.3 },
  animate: {
    opacity: 1,
    scale: [0.3, 1.1, 0.9, 1.03, 0.97, 1],
    transition: {
      duration: 1,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
    },
  },
  exit: { opacity: 0, scale: 0.3 },
}

export const pulse = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
    },
  },
}

export const shake = {
  initial: { x: 0 },
  animate: {
    x: [0, -10, 10, -10, 10, -5, 5, 0],
    transition: { duration: 0.5 },
  },
}

// ============== Stagger Utilities ==============

export const stagger = (
  delay: number,
  index: number
): number => {
  return delay * index
}

export const staggerChildren = (
  delay: number,
  childCount: number
): { delay: number; staggerChildren: number } => {
  return {
    delay: 0,
    staggerChildren: delay,
  }
}

// ============== Transition Generators ==============

export const createTransition = (
  properties: string[],
  duration: number = 300,
  easing: keyof typeof CSS_EASING = 'easeOutQuad'
): string => {
  return properties
    .map(prop => `${prop} ${duration}ms ${CSS_EASING[easing]}`)
    .join(', ')
}

export const createHoverTransition = (
  properties: string[] = ['all'],
  duration: number = 200
): string => {
  return createTransition(properties, duration, 'easeOutQuad')
}

export const createPageTransition = (
  duration: number = 500
): string => {
  return createTransition(['opacity', 'transform'], duration, 'easeInOutQuad')
}

// ============== Animation Helpers ==============

export const isReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const withReducedMotion = <T,>(
  animation: T,
  reducedAnimation: T
): T => {
  return isReducedMotion() ? reducedAnimation : animation
}

export const createReducedMotionVariants = <T extends Variants>(
  variants: T,
  reducedVariants: Partial<T>
): T => {
  if (isReducedMotion()) {
    return { ...variants, ...reducedVariants } as T
  }
  return variants
}

// ============== Animation Sequence ==============

export class AnimationSequence {
  private animations: Array<{
    fn: () => Promise<void>
    delay: number
  }> = []
  
  private currentIndex = 0
  private isPlaying = false
  
  add(animation: () => Promise<void>, delay: number = 0): this {
    this.animations.push({ fn: animation, delay })
    return this
  }
  
  async play(): Promise<void> {
    if (this.isPlaying) return
    
    this.isPlaying = true
    this.currentIndex = 0
    
    while (this.currentIndex < this.animations.length) {
      const { fn, delay } = this.animations[this.currentIndex]
      
      await fn()
      
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay))
      }
      
      this.currentIndex++
    }
    
    this.isPlaying = false
  }
  
  reset(): void {
    this.currentIndex = 0
    this.isPlaying = false
  }
  
  clear(): void {
    this.animations = []
    this.currentIndex = 0
    this.isPlaying = false
  }
}

// ============== RAF Animation Loop ==============

export class AnimationLoop {
  private callback: (progress: number) => void
  private rafId: number | null = null
  private isRunning = false
  
  constructor(callback: (progress: number) => void) {
    this.callback = callback
  }
  
  start(): void {
    if (this.isRunning) return
    
    this.isRunning = true
    let startTime = performance.now()
    
    const animate = (currentTime: number) => {
      if (!this.isRunning) return
      
      const progress = (currentTime - startTime) / 1000
      this.callback(progress)
      
      this.rafId = requestAnimationFrame(animate)
    }
    
    this.rafId = requestAnimationFrame(animate)
  }
  
  stop(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
    this.isRunning = false
  }
  
  reset(): void {
    this.stop()
    this.isRunning = false
  }
}

// ============== Scroll Animation Utilities ==============

export const getScrollProgress = (
  element: HTMLElement,
  viewport: Window | HTMLElement = window
): number => {
  const rect = element.getBoundingClientRect()
  const viewportHeight = viewport === window
    ? window.innerHeight
    : (viewport as HTMLElement).clientHeight
  
  const elementTop = rect.top
  const elementHeight = rect.height
  
  if (elementTop >= viewportHeight) return 0
  if (elementTop + elementHeight <= 0) return 1
  
  const visible = Math.min(viewportHeight, elementTop + elementHeight) - Math.max(0, elementTop)
  return visible / elementHeight
}

export const getParallaxOffset = (
  element: HTMLElement,
  speed: number = 0.5
): number => {
  const rect = element.getBoundingClientRect()
  const viewportHeight = window.innerHeight
  
  const elementCenter = rect.top + rect.height / 2
  const viewportCenter = viewportHeight / 2
  
  const distance = elementCenter - viewportCenter
  return distance * speed
}

// ============== Performance Utilities ==============

export const debounce = <T extends (...args: any[]) => void>(
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

export const throttle = <T extends (...args: any[]) => void>(
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