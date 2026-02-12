// ============== Type Utilities ==============

/**
 * Makes all properties of T optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * Makes nullable type (T | null | undefined)
 */
export type Nullable<T> = T | null | undefined

/**
 * Makes optional type (T | undefined)
 */
export type Optional<T> = T | undefined

/**
 * Makes specific keys required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

/**
 * Makes specific keys optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * Adds timestamp fields
 */
export interface WithTimestamps {
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
}

/**
 * Adds ID field
 */
export interface WithId {
  id: string
}

/**
 * Adds slug field
 */
export interface WithSlug {
  slug: string
}

/**
 * Adds status fields
 */
export interface WithStatus {
  status: string
  isActive: boolean
}

/**
 * Adds metadata field
 */
export interface WithMetadata {
  metadata?: Record<string, unknown>
}

/**
 * Paginated response wrapper
 */
export interface Paginated<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

/**
 * Sort direction type
 */
export type SortDirection = 'asc' | 'desc'

/**
 * Sort parameters
 */
export interface SortParams {
  field: string
  direction: SortDirection
}

/**
 * Date range
 */
export interface DateRange {
  start: string
  end: string
}

/**
 * Price range
 */
export interface PriceRange {
  min: number
  max: number
}

/**
 * Search parameters
 */
export interface SearchQuery {
  term: string
  fields?: string[]
}

/**
 * Select option
 */
export interface Option {
  label: string
  value: string | number
  disabled?: boolean
}

/**
 * Breadcrumb
 */
export interface Breadcrumb {
  title: string
  path?: string
}

/**
 * Tab
 */
export interface Tab {
  id: string
  label: string
  disabled?: boolean
}

/**
 * Step
 */
export interface Step {
  id: string
  title: string
  description?: string
  status: 'pending' | 'active' | 'completed' | 'error'
}

/**
 * Notification
 */
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  title?: string
  duration?: number
  timestamp: number
  read?: boolean
}

/**
 * Dialog
 */
export interface Dialog {
  open: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

/**
 * Toast
 */
export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  title?: string
  duration?: number
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

/**
 * Menu item
 */
export interface MenuItem {
  id: string
  label: string
  href?: string
  icon?: string
  disabled?: boolean
  divider?: boolean
  children?: MenuItem[]
}

/**
 * Dropdown item
 */
export interface DropdownItem {
  id: string
  label: string
  value: string
  disabled?: boolean
}

// ============== Enums ==============

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_ERROR = 500
}

export enum ContentType {
  JSON = 'application/json',
  FORM_DATA = 'multipart/form-data',
  TEXT = 'text/plain'
}

export enum StorageKey {
  TOKEN = 'token',
  USER = 'user',
  THEME = 'theme',
  CART = 'cart',
  WISHLIST = 'wishlist'
}

export enum Breakpoint {
  SM = 640,
  MD = 768,
  LG = 1024,
  XL = 1280,
  XXL = 1536
}

export enum DeviceType {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop'
}

export enum Orientation {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape'
}

export enum Language {
  EN = 'en',
  ES = 'es',
  FR = 'fr',
  DE = 'de',
  IT = 'it'
}

export enum CurrencyCode {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  CAD = 'CAD',
  AUD = 'AUD'
}

// ============== Constants ==============

export const APP_CONFIG = {
  NAME: 'Jweelary',
  VERSION: '1.0.0',
  URL: 'https://jweelary.com',
  API_URL: 'https://api.jweelary.com'
} as const

export const PAGINATION_CONFIG = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100
} as const

export const VALIDATION_CONFIG = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 72,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 254,
  PHONE_MIN_LENGTH: 10,
  PHONE_MAX_LENGTH: 15
} as const

export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf'],
  MAX_FILES_COUNT: 5
} as const

export const DATE_FORMAT = {
  DEFAULT: 'MMM dd, yyyy',
  SHORT: 'MM/dd/yyyy',
  LONG: 'MMMM dd, yyyy',
  ISO: 'yyyy-MM-dd',
  WITH_TIME: 'MMM dd, yyyy HH:mm'
} as const

export const CACHE_TTL = {
  SHORT: 60,
  MEDIUM: 300,
  LONG: 3600,
  DAY: 86400
} as const

// ============== Global Types ==============

export type ID = string | number
export type Timestamp = string | number | Date

export type Primitive = string | number | boolean | null | undefined
export type JSONValue = Primitive | JSONValue[] | { [key: string]: JSONValue }

export type Callback<T = void> = (...args: unknown[]) => T
export type AsyncCallback<T = void> = (...args: unknown[]) => Promise<T>

export type EventHandler<T = Event> = (event: T) => void

export type ChangeHandler<T = string> = (value: T) => void
export type SubmitHandler<T = Record<string, unknown>> = (data: T) => void | Promise<void>

export type Dictionary<V = unknown> = Record<string, V>
export type EmptyObject = Record<string, never>
export type AnyObject = Record<string, any>