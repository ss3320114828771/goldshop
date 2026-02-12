// ============== Types ==============

export type Nullable<T> = T | null | undefined
export type Dict<T = unknown> = Record<string, T>
export type Primitive = string | number | boolean | null | undefined
export type AnyFunction = (...args: unknown[]) => unknown

// ============== Environment Helpers ==============

export const isBrowser = (): boolean => {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

export const isServer = (): boolean => {
  return !isBrowser()
}

export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development'
}

export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production'
}

export const isTest = (): boolean => {
  return process.env.NODE_ENV === 'test'
}

// ============== Type Guards ==============

export const isString = (value: unknown): value is string => {
  return typeof value === 'string'
}

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value)
}

export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean'
}

export const isArray = <T>(value: unknown): value is T[] => {
  return Array.isArray(value)
}

export const isObject = (value: unknown): value is Dict => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export const isFunction = (value: unknown): value is AnyFunction => {
  return typeof value === 'function'
}

export const isDate = (value: unknown): value is Date => {
  return value instanceof Date && !isNaN(value.getTime())
}

export const isRegExp = (value: unknown): value is RegExp => {
  return value instanceof RegExp
}

export const isPromise = <T>(value: unknown): value is Promise<T> => {
  return value instanceof Promise || (isObject(value) && isFunction((value as any).then))
}

export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true
  if (isString(value)) return value.trim().length === 0
  if (isArray(value)) return value.length === 0
  if (isObject(value)) return Object.keys(value).length === 0
  return false
}

export const isPresent = <T>(value: T): value is NonNullable<T> => {
  return !isEmpty(value)
}

// ============== String Utilities ==============

export const toKebabCase = (str: string): string => {
  if (!str) return ''
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

export const toCamelCase = (str: string): string => {
  if (!str) return ''
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
    .replace(/^[A-Z]/, c => c.toLowerCase())
}

export const toPascalCase = (str: string): string => {
  if (!str) return ''
  const camel = toCamelCase(str)
  return camel.charAt(0).toUpperCase() + camel.slice(1)
}

export const toSnakeCase = (str: string): string => {
  if (!str) return ''
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase()
}

export const trimAll = (str: string): string => {
  if (!str) return ''
  return str.replace(/\s+/g, ' ').trim()
}

export const removeWhitespace = (str: string): string => {
  if (!str) return ''
  return str.replace(/\s+/g, '')
}

export const truncateMiddle = (str: string, maxLength: number, separator: string = '...'): string => {
  if (!str || str.length <= maxLength) return str
  
  const charsToShow = maxLength - separator.length
  const frontChars = Math.ceil(charsToShow / 2)
  const backChars = Math.floor(charsToShow / 2)
  
  return str.slice(0, frontChars) + separator + str.slice(-backChars)
}

export const extractNumbers = (str: string): number[] => {
  if (!str) return []
  const matches = str.match(/\d+/g)
  return matches ? matches.map(Number) : []
}

export const extractEmails = (str: string): string[] => {
  if (!str) return []
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
  return str.match(emailRegex) || []
}

export const extractUrls = (str: string): string[] => {
  if (!str) return []
  const urlRegex = /https?:\/\/[^\s]+/g
  return str.match(urlRegex) || []
}

// ============== Number Utilities ==============

export const toNumber = (value: unknown, defaultValue: number = 0): number => {
  if (value === null || value === undefined) return defaultValue
  if (isNumber(value)) return value
  if (isString(value)) {
    const parsed = parseFloat(value)
    return isNaN(parsed) ? defaultValue : parsed
  }
  return defaultValue
}

export const toInt = (value: unknown, defaultValue: number = 0): number => {
  return Math.floor(toNumber(value, defaultValue))
}

export const toFixed = (value: number, decimals: number = 2): number => {
  return Number(value.toFixed(decimals))
}

export const formatNumber = (value: number, locale: string = 'en-US'): string => {
  return new Intl.NumberFormat(locale).format(value)
}

export const formatCompact = (value: number, locale: string = 'en-US'): string => {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value)
}

export const formatOrdinal = (value: number): string => {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const v = value % 100
  return value + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0])
}

export const percentage = (value: number, total: number): number => {
  if (total === 0) return 0
  return (value / total) * 100
}

export const roundTo = (value: number, precision: number = 0): number => {
  const factor = Math.pow(10, precision)
  return Math.round(value * factor) / factor
}

export const floorTo = (value: number, precision: number = 0): number => {
  const factor = Math.pow(10, precision)
  return Math.floor(value * factor) / factor
}

export const ceilTo = (value: number, precision: number = 0): number => {
  const factor = Math.pow(10, precision)
  return Math.ceil(value * factor) / factor
}

// ============== Array Utilities ==============

export const first = <T>(array: T[]): T | undefined => {
  return array[0]
}

export const last = <T>(array: T[]): T | undefined => {
  return array[array.length - 1]
}

export const range = (start: number, end: number, step: number = 1): number[] => {
  const result: number[] = []
  
  if (step === 0) return result
  
  if (start <= end) {
    for (let i = start; i <= end; i += step) {
      result.push(i)
    }
  } else {
    for (let i = start; i >= end; i += step) {
      result.push(i)
    }
  }
  
  return result
}

export const chunk = <T>(array: T[], size: number): T[][] => {
  if (!array.length || size < 1) return []
  
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  
  return result
}

export const flatten = <T>(array: T[][]): T[] => {
  return ([] as T[]).concat(...array)
}

export const unique = <T>(array: T[]): T[] => {
  return [...new Set(array)]
}

export const uniqueBy = <T>(array: T[], key: keyof T): T[] => {
  const seen = new Set<unknown>()
  return array.filter(item => {
    const value = item[key]
    if (seen.has(value)) return false
    seen.add(value)
    return true
  })
}

export const groupBy = <T>(
  array: T[], 
  keySelector: keyof T | ((item: T) => string)
): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const groupKey = typeof keySelector === 'function' 
      ? keySelector(item) 
      : String(item[keySelector])
    
    if (!result[groupKey]) {
      result[groupKey] = []
    }
    result[groupKey].push(item)
    return result
  }, {} as Record<string, T[]>)
}

export const sortBy = <T>(
  array: T[], 
  key: keyof T, 
  direction: 'asc' | 'desc' = 'asc'
): T[] => {
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

export const sample = <T>(array: T[]): T | undefined => {
  return array[Math.floor(Math.random() * array.length)]
}

export const sampleSize = <T>(array: T[], size: number): T[] => {
  if (size >= array.length) return shuffle(array)
  
  const shuffled = shuffle(array)
  return shuffled.slice(0, size)
}

export const partition = <T>(array: T[], predicate: (item: T) => boolean): [T[], T[]] => {
  return array.reduce(
    ([pass, fail], item) => {
      return predicate(item) 
        ? [[...pass, item], fail] 
        : [pass, [...fail, item]]
    },
    [[] as T[], [] as T[]]
  )
}

export const difference = <T>(array1: T[], array2: T[]): T[] => {
  return array1.filter(item => !array2.includes(item))
}

export const intersection = <T>(...arrays: T[][]): T[] => {
  if (arrays.length === 0) return []
  return arrays.reduce((acc, curr) => acc.filter(item => curr.includes(item)))
}

export const union = <T>(...arrays: T[][]): T[] => {
  return unique(flatten(arrays))
}

export const without = <T>(array: T[], ...values: T[]): T[] => {
  return array.filter(item => !values.includes(item))
}

// ============== Object Utilities ==============

export const pick = <T extends Dict, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}

export const omit = <T extends Dict, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj }
  keys.forEach(key => {
    delete result[key]
  })
  return result
}

export const pickBy = <T extends Dict>(
  obj: T, 
  predicate: (value: T[keyof T], key: string) => boolean
): Partial<T> => {
  const result: Partial<T> = {}
  Object.entries(obj).forEach(([key, value]) => {
    if (predicate(value as T[keyof T], key)) {
      result[key as keyof T] = value as T[keyof T]
    }
  })
  return result
}

export const omitBy = <T extends Dict>(
  obj: T, 
  predicate: (value: T[keyof T], key: string) => boolean
): Partial<T> => {
  const result: Partial<T> = {}
  Object.entries(obj).forEach(([key, value]) => {
    if (!predicate(value as T[keyof T], key)) {
      result[key as keyof T] = value as T[keyof T]
    }
  })
  return result
}

export const mapValues = <T extends Dict, R>(
  obj: T, 
  fn: (value: T[keyof T], key: string) => R
): Record<keyof T, R> => {
  const result = {} as Record<keyof T, R>
  Object.entries(obj).forEach(([key, value]) => {
    result[key as keyof T] = fn(value as T[keyof T], key)
  })
  return result
}

export const mapKeys = <T extends Dict>(
  obj: T, 
  fn: (key: string, value: T[keyof T]) => string
): Record<string, T[keyof T]> => {
  const result: Record<string, T[keyof T]> = {}
  Object.entries(obj).forEach(([key, value]) => {
    result[fn(key, value as T[keyof T])] = value as T[keyof T]
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

export const deepMerge = <T extends Dict, U extends Dict>(target: T, source: U): T & U => {
  const result = { ...target } as any
  
  Object.keys(source).forEach(key => {
    const targetValue = result[key]
    const sourceValue = source[key]
    
    if (isObject(targetValue) && isObject(sourceValue)) {
      result[key] = deepMerge(targetValue, sourceValue)
    } else {
      result[key] = sourceValue
    }
  })
  
  return result
}

export const get = <T = unknown>(obj: Dict, path: string, defaultValue?: T): T | undefined => {
  const keys = path.split('.')
  let result: any = obj
  
  for (const key of keys) {
    if (result === null || result === undefined || typeof result !== 'object') {
      return defaultValue
    }
    result = result[key]
  }
  
  return (result === undefined ? defaultValue : result) as T
}

export const set = <T extends Dict>(obj: T, path: string, value: any): T => {
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

export const unset = <T extends Dict>(obj: T, path: string): T => {
  const keys = path.split('.')
  const lastKey = keys.pop()!
  const lastObj = keys.reduce((acc, key) => {
    if (!acc[key] || typeof acc[key] !== 'object') {
      return acc
    }
    return acc[key]
  }, obj as any)
  
  if (lastObj && typeof lastObj === 'object') {
    delete lastObj[lastKey]
  }
  
  return obj
}

export const has = (obj: Dict, path: string): boolean => {
  const keys = path.split('.')
  let result: any = obj
  
  for (const key of keys) {
    if (result === null || result === undefined || typeof result !== 'object') {
      return false
    }
    result = result[key]
  }
  
  return result !== undefined
}

export const flattenObject = (obj: Dict, prefix: string = ''): Dict => {
  let result: Dict = {}
  
  Object.entries(obj).forEach(([key, value]) => {
    const newKey = prefix ? `${prefix}.${key}` : key
    
    if (isObject(value) && !isDate(value) && !isRegExp(value)) {
      result = { ...result, ...flattenObject(value as Dict, newKey) }
    } else {
      result[newKey] = value
    }
  })
  
  return result
}

export const unflattenObject = (obj: Dict): Dict => {
  const result: Dict = {}
  
  Object.entries(obj).forEach(([key, value]) => {
    const keys = key.split('.')
    const lastKey = keys.pop()!
    
    let current = result
    keys.forEach(k => {
      if (!current[k] || typeof current[k] !== 'object') {
        current[k] = {}
      }
      current = current[k] as Dict
    })
    
    current[lastKey] = value
  })
  
  return result
}

// ============== Function Utilities ==============

export const debounce = <T extends AnyFunction>(
  fn: T,
  ms: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  
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
  let timeoutId: ReturnType<typeof setTimeout> | null = null
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
    
    const result = fn(...args) as ReturnType<T>
    cache.set(key, result)
    return result
  }) as T
}

export const once = <T extends AnyFunction>(fn: T): T => {
  let called = false
  let result: ReturnType<T>
  
  return ((...args: Parameters<T>) => {
    if (!called) {
      result = fn(...args) as ReturnType<T>
      called = true
    }
    return result
  }) as T
}

export const noop = (): void => {}

export const identity = <T>(value: T): T => value

export const constant = <T>(value: T): (() => T) => {
  return () => value
}

export const pipe = <T>(...fns: Array<(arg: T) => T>): ((arg: T) => T) => {
  return (arg: T) => fns.reduce((acc, fn) => fn(acc), arg)
}

export const compose = <T>(...fns: Array<(arg: T) => T>): ((arg: T) => T) => {
  return (arg: T) => fns.reduceRight((acc, fn) => fn(acc), arg)
}

// ============== Async Utilities ==============

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

export const parallel = async <T>(
  tasks: Array<() => Promise<T>>,
  concurrency: number = 5
): Promise<T[]> => {
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

export const sequential = async <T>(tasks: Array<() => Promise<T>>): Promise<T[]> => {
  const results: T[] = []
  for (const task of tasks) {
    results.push(await task())
  }
  return results
}

// ============== URL Utilities ==============

export const getQueryParams = (url?: string): Record<string, string> => {
  if (!isBrowser() && !url) return {}
  
  const search = url ? new URL(url, 'http://localhost').search : window.location.search
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

export const removeQueryParams = (url: string, ...params: string[]): string => {
  const urlObj = new URL(url, 'http://localhost')
  const searchParams = new URLSearchParams(urlObj.search)
  
  params.forEach(param => {
    searchParams.delete(param)
  })
  
  urlObj.search = searchParams.toString()
  return urlObj.toString().replace('http://localhost', '')
}

// ============== Color Utilities ==============

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

export const hslToHex = (h: number, s: number, l: number): string => {
  h /= 360
  s /= 100
  l /= 100
  
  let r: number, g: number, b: number
  
  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  
  return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255))
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

export const isLight = (hex: string): boolean => {
  const rgb = hexToRgb(hex)
  if (!rgb) return false
  
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
  return brightness > 128
}

export const isDark = (hex: string): boolean => {
  return !isLight(hex)
}

export const getContrastText = (hex: string): string => {
  return isLight(hex) ? '#000000' : '#ffffff'
}

// ============== Device Utilities ==============

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

export const isTablet = (): boolean => {
  if (!isBrowser()) return false
  return /iPad|Android(?!.*Mobile)/.test(navigator.userAgent) || 
    (isIOS() && !/iPhone|iPod/.test(navigator.userAgent))
}

export const isDesktop = (): boolean => {
  return !isMobile() && !isTablet()
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

export const isEdge = (): boolean => {
  if (!isBrowser()) return false
  return /edg/i.test(navigator.userAgent)
}

// ============== Storage Utilities ==============

export const storage = {
  local: {
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
    
    has: (key: string): boolean => {
      if (!isBrowser()) return false
      return window.localStorage.getItem(key) !== null
    },
  },
  
  session: {
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
    
    has: (key: string): boolean => {
      if (!isBrowser()) return false
      return window.sessionStorage.getItem(key) !== null
    },
  },
}

// ============== Cookie Utilities ==============

export const cookie = {
  get: (name: string): string | null => {
    if (!isBrowser()) return null
    
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null
    return null
  },
  
  set: (name: string, value: string, days: number = 7, path: string = '/'): void => {
    if (!isBrowser()) return
    
    const expires = new Date()
    expires.setDate(expires.getDate() + days)
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=${path}`
  },
  
  remove: (name: string, path: string = '/'): void => {
    if (!isBrowser()) return
    
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`
  },
  
  has: (name: string): boolean => {
    if (!isBrowser()) return false
    return cookie.get(name) !== null
  },
}

// ============== Class Name Utilities ==============

export const cx = (...classes: Array<string | undefined | null | false | Record<string, boolean>>): string => {
  const result: string[] = []
  
  classes.forEach(cls => {
    if (!cls) return
    
    if (typeof cls === 'string') {
      result.push(cls)
    } else if (typeof cls === 'object') {
      Object.entries(cls).forEach(([key, value]) => {
        if (value) {
          result.push(key)
        }
      })
    }
  })
  
  return result.join(' ')
}

// ============== Export ==============

// Export individual functions for tree-shaking
export {
  
  

  

  

  
  
  
  
  
  
  
  
  
}

// No default export -