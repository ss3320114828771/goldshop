// ============== Types ==============

export type Primitive = string | number | boolean | null | undefined
export type JSONValue = Primitive | JSONValue[] | { [key: string]: JSONValue }
export type AnyFunction = (...args: any[]) => any
export type Nullable<T> = T | null | undefined
export type Optional<T> = T | undefined
export type Dict<T = any> = Record<string, T>

// ============== String Helpers ==============

export const capitalize = (str: string): string => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const capitalizeAll = (str: string): string => {
  if (!str) return ''
  return str.split(' ').map(capitalize).join(' ')
}

export const truncate = (str: string, length: number, ellipsis: string = '...'): string => {
  if (!str) return ''
  if (str.length <= length) return str
  return str.slice(0, length) + ellipsis
}

export const slugify = (str: string): string => {
  if (!str) return ''
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const unslugify = (slug: string): string => {
  if (!slug) return ''
  return slug
    .split('-')
    .map(capitalize)
    .join(' ')
}

export const pluralize = (count: number, singular: string, plural?: string): string => {
  if (count === 1) return `${count} ${singular}`
  return `${count} ${plural || `${singular}s`}`
}

export const maskEmail = (email: string): string => {
  if (!email || !email.includes('@')) return email
  
  const [local, domain] = email.split('@')
  const maskedLocal = local.charAt(0) + '***' + local.charAt(local.length - 1)
  return `${maskedLocal}@${domain}`
}

export const maskPhone = (phone: string): string => {
  if (!phone) return ''
  
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length < 4) return phone
  
  const last4 = cleaned.slice(-4)
  return `***-***-${last4}`
}

export const generateCode = (length: number = 6): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
  
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

// ============== Number Helpers ==============

export const formatPrice = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export const formatPercentage = (value: number, decimals: number = 0): string => {
  return `${value.toFixed(decimals)}%`
}

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

export const lerp = (start: number, end: number, t: number): number => {
  return start * (1 - t) + end * t
}

export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

export const roundToNearest = (value: number, step: number): number => {
  return Math.round(value / step) * step
}

export const floorToNearest = (value: number, step: number): number => {
  return Math.floor(value / step) * step
}

export const ceilToNearest = (value: number, step: number): number => {
  return Math.ceil(value / step) * step
}

export const isBetween = (value: number, min: number, max: number, inclusive: boolean = true): boolean => {
  if (inclusive) return value >= min && value <= max
  return value > min && value < max
}

export const sum = (numbers: number[]): number => {
  return numbers.reduce((acc, curr) => acc + curr, 0)
}

export const average = (numbers: number[]): number => {
  if (numbers.length === 0) return 0
  return sum(numbers) / numbers.length
}

export const median = (numbers: number[]): number => {
  if (numbers.length === 0) return 0
  
  const sorted = [...numbers].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2
  }
  
  return sorted[middle]
}

export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const randomFloat = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}

// ============== Date Helpers ==============

export const formatDate = (
  date: Date | string | number,
  format: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  locale: string = 'en-US'
): string => {
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''
  
  return new Intl.DateTimeFormat(locale, format).format(d)
}

export const formatRelativeTime = (date: Date | string | number): string => {
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''
  
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)
  
  if (seconds < 60) return 'just now'
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
  if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`
  return `${years} year${years > 1 ? 's' : ''} ago`
}

export const isToday = (date: Date | string | number): boolean => {
  const d = new Date(date)
  if (isNaN(d.getTime())) return false
  
  const today = new Date()
  return d.toDateString() === today.toDateString()
}

export const isYesterday = (date: Date | string | number): boolean => {
  const d = new Date(date)
  if (isNaN(d.getTime())) return false
  
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return d.toDateString() === yesterday.toDateString()
}

export const isTomorrow = (date: Date | string | number): boolean => {
  const d = new Date(date)
  if (isNaN(d.getTime())) return false
  
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return d.toDateString() === tomorrow.toDateString()
}

export const addDays = (date: Date | string | number, days: number): Date => {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export const subtractDays = (date: Date | string | number, days: number): Date => {
  return addDays(date, -days)
}

export const startOfDay = (date: Date | string | number): Date => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export const endOfDay = (date: Date | string | number): Date => {
  const d = new Date(date)
  d.setHours(23, 59, 59, 999)
  return d
}

export const getDaysBetween = (start: Date | string | number, end: Date | string | number): number => {
  const startDate = startOfDay(start)
  const endDate = startOfDay(end)
  const diff = endDate.getTime() - startDate.getTime()
  return Math.round(diff / (1000 * 60 * 60 * 24))
}

// ============== Object Helpers ==============

export const isObject = (value: unknown): value is Record<string, any> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export const isPlainObject = (value: unknown): value is Record<string, any> => {
  if (!isObject(value)) return false
  const prototype = Object.getPrototypeOf(value)
  return prototype === null || prototype === Object.prototype
}

export const omit = <T extends Dict, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj }
  keys.forEach(key => {
    delete result[key]
  })
  return result
}

export const pick = <T extends Dict, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}

export const merge = <T extends Dict, U extends Dict>(target: T, source: U): T & U => {
  const result = { ...target } as any
  
  Object.keys(source).forEach(key => {
    const targetValue = result[key]
    const sourceValue = source[key]
    
    if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
      result[key] = merge(targetValue, sourceValue)
    } else {
      result[key] = sourceValue
    }
  })
  
  return result
}

export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as any
  if (obj instanceof RegExp) return new RegExp(obj) as any
  if (Array.isArray(obj)) return obj.map(item => deepClone(item)) as any
  
  const cloned = {} as any
  Object.keys(obj as any).forEach(key => {
    cloned[key] = deepClone((obj as any)[key])
  })
  
  return cloned
}

export const isEmpty = (obj: Dict): boolean => {
  return Object.keys(obj).length === 0
}

export const getNested = <T = any>(obj: Dict, path: string, defaultValue?: T): T | undefined => {
  const keys = path.split('.')
  let result = obj
  
  for (const key of keys) {
    if (result === null || result === undefined || typeof result !== 'object') {
      return defaultValue
    }
    result = result[key]
  }
  
  return (result === undefined ? defaultValue : result) as T
}

export const setNested = <T extends Dict>(obj: T, path: string, value: any): T => {
  const keys = path.split('.')
  const lastKey = keys.pop()!
  const lastObj = keys.reduce((acc, key) => {
    if (!acc[key] || typeof acc[key] !== 'object') {
      acc[key] = {}
    }
    return acc[key]
  }, obj as any)
  
  lastObj[lastKey] = value
  return obj
}

// ============== Array Helpers ==============

export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

export const unique = <T>(array: T[]): T[] => {
  return [...new Set(array)]
}

export const uniqueBy = <T>(array: T[], key: keyof T): T[] => {
  const seen = new Set()
  return array.filter(item => {
    const value = item[key]
    if (seen.has(value)) return false
    seen.add(value)
    return true
  })
}

export const groupBy = <T>(array: T[], key: keyof T | ((item: T) => string)): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const groupKey = typeof key === 'function' ? key(item) : String(item[key])
    if (!result[groupKey]) {
      result[groupKey] = []
    }
    result[groupKey].push(item)
    return result
  }, {} as Record<string, T[]>)
}

export const sortBy = <T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aValue = a[key]
    const bValue = b[key]
    
    if (aValue === bValue) return 0
    if (aValue === null || aValue === undefined) return 1
    if (bValue === null || bValue === undefined) return -1
    
    const comparison = aValue < bValue ? -1 : 1
    return direction === 'asc' ? comparison : -comparison
  })
}

export const shuffle = <T>(array: T[]): T[] => {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export const paginate = <T>(array: T[], page: number, perPage: number): T[] => {
  const start = (page - 1) * perPage
  const end = start + perPage
  return array.slice(start, end)
}

export const move = <T>(array: T[], from: number, to: number): T[] => {
  const result = [...array]
  const [item] = result.splice(from, 1)
  result.splice(to, 0, item)
  return result
}

export const toggle = <T>(array: T[], item: T): T[] => {
  const index = array.indexOf(item)
  if (index === -1) {
    return [...array, item]
  }
  return array.filter((_, i) => i !== index)
}

export const intersect = <T>(...arrays: T[][]): T[] => {
  if (arrays.length === 0) return []
  return arrays.reduce((acc, curr) => acc.filter(item => curr.includes(item)))
}

export const difference = <T>(array1: T[], array2: T[]): T[] => {
  return array1.filter(item => !array2.includes(item))
}

// ============== Validation Helpers ==============

export const isEmail = (email: string): boolean => {
  if (!email) return false
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const isPhone = (phone: string): boolean => {
  if (!phone) return false
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length >= 10 && cleaned.length <= 15
}

export const isUrl = (url: string): boolean => {
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const isStrongPassword = (password: string): boolean => {
  if (!password || password.length < 8) return false
  
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
  return hasUpperCase && hasLowerCase && hasNumbers && hasSpecial
}

export const isCreditCard = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\D/g, '')
  
  // Luhn algorithm
  let sum = 0
  let isEven = false
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10)
    
    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    
    sum += digit
    isEven = !isEven
  }
  
  return sum % 10 === 0
}

// ============== Color Helpers ==============

export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return null
  
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

export const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

export const hexToHsl = (hex: string): { h: number; s: number; l: number } | null => {
  const rgb = hexToRgb(hex)
  if (!rgb) return null
  
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

export const lighten = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  
  const r = Math.min(255, Math.max(0, rgb.r + (255 - rgb.r) * (percent / 100)))
  const g = Math.min(255, Math.max(0, rgb.g + (255 - rgb.g) * (percent / 100)))
  const b = Math.min(255, Math.max(0, rgb.b + (255 - rgb.b) * (percent / 100)))
  
  return rgbToHex(Math.round(r), Math.round(g), Math.round(b))
}

export const darken = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  
  const r = Math.max(0, rgb.r - rgb.r * (percent / 100))
  const g = Math.max(0, rgb.g - rgb.g * (percent / 100))
  const b = Math.max(0, rgb.b - rgb.b * (percent / 100))
  
  return rgbToHex(Math.round(r), Math.round(g), Math.round(b))
}

// ============== DOM Helpers ==============

export const isBrowser = (): boolean => {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

export const getScrollbarWidth = (): number => {
  if (!isBrowser()) return 0
  
  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.overflow = 'scroll'
  document.body.appendChild(outer)
  
  const inner = document.createElement('div')
  outer.appendChild(inner)
  
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth
  outer.parentNode?.removeChild(outer)
  
  return scrollbarWidth
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (!isBrowser()) return false
  
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    
    try {
      document.execCommand('copy')
      document.body.removeChild(textarea)
      return true
    } catch {
      document.body.removeChild(textarea)
      return false
    }
  }
}

export const getCookie = (name: string): string | null => {
  if (!isBrowser()) return null
  
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

export const setCookie = (name: string, value: string, days: number = 7): void => {
  if (!isBrowser()) return
  
  const expires = new Date()
  expires.setDate(expires.getDate() + days)
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`
}

export const deleteCookie = (name: string): void => {
  if (!isBrowser()) return
  
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

// ============== Performance Helpers ==============

export const debounce = <T extends AnyFunction>(
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

export const throttle = <T extends AnyFunction>(
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

export const memoize = <T extends AnyFunction>(fn: T): T => {
  const cache = new Map<string, ReturnType<T>>()
  
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args)
    
    if (cache.has(key)) {
      return cache.get(key)
    }
    
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

export const once = <T extends AnyFunction>(fn: T): T => {
  let called = false
  let result: ReturnType<T>
  
  return ((...args: Parameters<T>) => {
    if (!called) {
      result = fn(...args)
      called = true
    }
    return result
  }) as T
}

// ============== Async Helpers ==============

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const retry = async <T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000,
  backoff: number = 2
): Promise<T> => {
  try {
    return await fn()
  } catch (error) {
    if (retries <= 0) throw error
    
    await sleep(delay)
    return retry(fn, retries - 1, delay * backoff, backoff)
  }
}

export const timeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
    ),
  ])
}

export const parallel = async <T>(tasks: (() => Promise<T>)[], concurrency: number = 5): Promise<T[]> => {
  const results: T[] = []
  const queue = [...tasks]
  
  const worker = async (): Promise<void> => {
    while (queue.length > 0) {
      const task = queue.shift()
      if (task) {
        const result = await task()
        results.push(result)
      }
    }
  }
  
  const workers = Array(Math.min(concurrency, tasks.length))
    .fill(null)
    .map(() => worker())
  
  await Promise.all(workers)
  return results
}

// ============== URL Helpers ==============

export const getQueryParams = (url?: string): Record<string, string> => {
  if (!isBrowser() && !url) return {}
  
  const search = url ? new URL(url).search : window.location.search
  const params = new URLSearchParams(search)
  const result: Record<string, string> = {}
  
  params.forEach((value, key) => {
    result[key] = value
  })
  
  return result
}

export const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value))
    }
  })
  
  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}

export const addQueryParams = (url: string, params: Record<string, any>): string => {
  const urlObj = new URL(url, 'http://localhost')
  const searchParams = new URLSearchParams(urlObj.search)
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value))
    }
  })
  
  urlObj.search = searchParams.toString()
  return urlObj.toString().replace('http://localhost', '')
}

// ============== Storage Helpers ==============

export const localStorage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    if (!isBrowser()) return defaultValue ?? null
    
    try {
      const item = window.localStorage.getItem(key)
      if (!item) return defaultValue ?? null
      return JSON.parse(item) as T
    } catch {
      return defaultValue ?? null
    }
  },
  
  set: <T>(key: string, value: T): void => {
    if (!isBrowser()) return
    
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Silently fail
    }
  },
  
  remove: (key: string): void => {
    if (!isBrowser()) return
    window.localStorage.removeItem(key)
  },
  
  clear: (): void => {
    if (!isBrowser()) return
    window.localStorage.clear()
  },
}

export const sessionStorage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    if (!isBrowser()) return defaultValue ?? null
    
    try {
      const item = window.sessionStorage.getItem(key)
      if (!item) return defaultValue ?? null
      return JSON.parse(item) as T
    } catch {
      return defaultValue ?? null
    }
  },
  
  set: <T>(key: string, value: T): void => {
    if (!isBrowser()) return
    
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Silently fail
    }
  },
  
  remove: (key: string): void => {
    if (!isBrowser()) return
    window.sessionStorage.removeItem(key)
  },
  
  clear: (): void => {
    if (!isBrowser()) return
    window.sessionStorage.clear()
  },
}

// ============== Device Helpers ==============

export const isTouchDevice = (): boolean => {
  if (!isBrowser()) return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export const isIOS = (): boolean => {
  if (!isBrowser()) return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

export const isAndroid = (): boolean => {
  if (!isBrowser()) return false
  return /Android/.test(navigator.userAgent)
}

export const isMobile = (): boolean => {
  if (!isBrowser()) return false
  return isIOS() || isAndroid() || /Mobile/.test(navigator.userAgent)
}

export const isSafari = (): boolean => {
  if (!isBrowser()) return false
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
}

export const isFirefox = (): boolean => {
  if (!isBrowser()) return false
  return /firefox/i.test(navigator.userAgent)
}

export const isChrome = (): boolean => {
  if (!isBrowser()) return false
  return /chrome/i.test(navigator.userAgent) && !isSafari()
}

// ============== React Helpers ==============

export const composeRefs = <T>(...refs: Array<React.Ref<T> | undefined>) => {
  return (instance: T | null) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(instance)
      } else if (ref && typeof ref === 'object' && 'current' in ref) {
        ;(ref as React.MutableRefObject<T | null>).current = instance
      }
    })
  }
}

export const mergeClassNames = (...classes: Array<string | undefined | null | false>): string => {
  return classes.filter(Boolean).join(' ')
}

// ============== Export ==============

export default {
  // String
  capitalize,
  capitalizeAll,
  truncate,
  slugify,
  unslugify,
  pluralize,
  maskEmail,
  maskPhone,
  generateCode,
  generateId,
  formatBytes,
  
  // Number
  formatPrice,
  formatPercentage,
  clamp,
  lerp,
  mapRange,
  roundToNearest,
  floorToNearest,
  ceilToNearest,
  isBetween,
  sum,
  average,
  median,
  randomInt,
  randomFloat,
  
  // Date
  formatDate,
  formatRelativeTime,
  isToday,
  isYesterday,
  isTomorrow,
  addDays,
  subtractDays,
  startOfDay,
  endOfDay,
  getDaysBetween,
  
  // Object
  isObject,
  isPlainObject,
  omit,
  pick,
  merge,
  deepClone,
  isEmpty,
  getNested,
  setNested,
  
  // Array
  chunk,
  unique,
  uniqueBy,
  groupBy,
  sortBy,
  shuffle,
  paginate,
  move,
  toggle,
  intersect,
  difference,
  
  // Validation
  isEmail,
  isPhone,
  isUrl,
  isStrongPassword,
  isCreditCard,
  
  // Color
  hexToRgb,
  rgbToHex,
  hexToHsl,
  lighten,
  darken,
  
  // DOM
  isBrowser,
  getScrollbarWidth,
  copyToClipboard,
  getCookie,
  setCookie,
  deleteCookie,
  
  // Performance
  debounce,
  throttle,
  memoize,
  once,
  
  // Async
  sleep,
  retry,
  timeout,
  parallel,
  
  // URL
  getQueryParams,
  buildQueryString,
  addQueryParams,
  
  // Storage
  localStorage,
  sessionStorage,
  
  // Device
  isTouchDevice,
  isIOS,
  isAndroid,
  isMobile,
  isSafari,
  isFirefox,
  isChrome,
  
  // React
  composeRefs,
  mergeClassNames,
}