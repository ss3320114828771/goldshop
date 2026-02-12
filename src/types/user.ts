// ============== User Types ==============

// ============== User Role Enums ==============

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  VENDOR = 'vendor',
  STAFF = 'staff',
  MANAGER = 'manager',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  BANNED = 'banned',
  PENDING = 'pending',
  DELETED = 'deleted',
}

export enum UserVerificationStatus {
  UNVERIFIED = 'unverified',
  PENDING = 'pending',
  VERIFIED = 'verified',
  FAILED = 'failed',
}

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
  NON_BINARY = 'non_binary',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer_not_to_say',
}

export enum UserSubscriptionTier {
  FREE = 'free',
  BASIC = 'basic',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise',
}

// ============== User Address Types ==============

export interface UserAddress {
  id: string
  userId: string
  addressType: 'shipping' | 'billing' | 'both'
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  countryCode: string
  phone?: string
  email?: string
  instructions?: string
  isDefault: boolean
  isVerified: boolean
  latitude?: number
  longitude?: number
  createdAt: string
  updatedAt: string
}

// ============== User Preference Types ==============

export interface UserNotificationPreferences {
  email: boolean
  sms: boolean
  push: boolean
  orderUpdates: boolean
  promotions: boolean
  newsletter: boolean
  productAlerts: boolean
  priceDrops: boolean
  backInStock: boolean
  reviewReminders: boolean
  accountActivity: boolean
}

export interface UserPrivacySettings {
  profileVisibility: 'public' | 'private' | 'followers'
  showEmail: boolean
  showPhone: boolean
  showAddress: boolean
  showOrderHistory: boolean
  showWishlist: boolean
  allowTracking: boolean
  allowMarketing: boolean
  allowDataSharing: boolean
}

export interface UserSecuritySettings {
  twoFactorEnabled: boolean
  twoFactorMethod?: 'app' | 'sms' | 'email'
  loginNotifications: boolean
  deviceHistory: boolean
  sessionTimeout: number
  passwordLastChanged?: string
  recoveryEmail?: string
  recoveryPhone?: string
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: string
  currency: string
  timezone: string
  dateFormat: string
  timeFormat: '12h' | '24h'
  notifications: UserNotificationPreferences
  privacy: UserPrivacySettings
  security: UserSecuritySettings
  dashboardLayout?: string
  itemsPerPage: number
  recentlyViewedLimit: number
}

// ============== User Social Types ==============

export interface UserSocialLink {
  id: string
  userId: string
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'pinterest' | 'youtube' | 'tiktok' | 'github' | 'other'
  url: string
  username?: string
  displayName?: string
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface UserFollower {
  id: string
  userId: string
  followerId: string
  status: 'pending' | 'accepted' | 'blocked'
  createdAt: string
  updatedAt: string
}

export interface UserFollowing {
  id: string
  userId: string
  followingId: string
  status: 'pending' | 'accepted' | 'blocked'
  createdAt: string
  updatedAt: string
}

// ============== User Payment Types ==============

export interface UserPaymentMethod {
  id: string
  userId: string
  type: 'credit_card' | 'debit_card' | 'paypal' | 'bank_account' | 'apple_pay' | 'google_pay'
  provider: string
  lastFour?: string
  cardBrand?: string
  cardholderName?: string
  expiryMonth?: number
  expiryYear?: number
  bankName?: string
  accountLastFour?: string
  routingNumber?: string
  accountType?: 'checking' | 'savings'
  email?: string
  isDefault: boolean
  isVerified: boolean
  billingAddressId?: string
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
}

// ============== User Activity Types ==============

export interface UserSession {
  id: string
  userId: string
  token: string
  ipAddress: string
  userAgent: string
  deviceType: 'desktop' | 'mobile' | 'tablet' | 'other'
  deviceName?: string
  browser?: string
  operatingSystem?: string
  location?: string
  isActive: boolean
  createdAt: string
  expiresAt: string
  lastActiveAt: string
}

export interface UserActivity {
  id: string
  userId: string
  action: string
  entityType?: string
  entityId?: string
  metadata?: Record<string, unknown>
  ipAddress?: string
  userAgent?: string
  createdAt: string
}

export interface UserLoginHistory {
  id: string
  userId: string
  ipAddress: string
  userAgent: string
  deviceType?: string
  location?: string
  status: 'success' | 'failed' | 'blocked'
  failureReason?: string
  createdAt: string
}

// ============== User Verification Types ==============

export interface UserEmailVerification {
  id: string
  userId: string
  email: string
  token: string
  expiresAt: string
  verifiedAt?: string
  createdAt: string
}

export interface UserPhoneVerification {
  id: string
  userId: string
  phone: string
  code: string
  expiresAt: string
  verifiedAt?: string
  attempts: number
  createdAt: string
}

export interface UserIdentityVerification {
  id: string
  userId: string
  type: 'passport' | 'drivers_license' | 'national_id' | 'other'
  documentNumber: string
  documentImage?: string
  selfieImage?: string
  status: 'pending' | 'approved' | 'rejected' | 'expired'
  rejectionReason?: string
  verifiedBy?: string
  verifiedAt?: string
  expiresAt?: string
  metadata?: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

// ============== User Reward Types ==============

export interface UserRewardPoints {
  id: string
  userId: string
  balance: number
  lifetimeEarned: number
  lifetimeRedeemed: number
  expired: number
  lastEarnedAt?: string
  lastRedeemedAt?: string
  createdAt: string
  updatedAt: string
}

export interface UserRewardTransaction {
  id: string
  userId: string
  type: 'earned' | 'redeemed' | 'expired' | 'adjusted'
  amount: number
  balance: number
  description: string
  orderId?: string
  reviewId?: string
  referralId?: string
  expiresAt?: string
  metadata?: Record<string, unknown>
  createdAt: string
}

export interface UserReferral {
  id: string
  userId: string
  referralCode: string
  referredUserId?: string
  referredEmail?: string
  status: 'pending' | 'completed' | 'expired' | 'cancelled'
  rewardEarned: number
  rewardClaimed: boolean
  createdAt: string
  completedAt?: string
  expiresAt?: string
}

// ============== User Subscription Types ==============

export interface UserSubscription {
  id: string
  userId: string
  tier: UserSubscriptionTier
  status: 'active' | 'inactive' | 'cancelled' | 'expired' | 'past_due'
  startDate: string
  endDate?: string
  cancelledAt?: string
  autoRenew: boolean
  paymentMethodId?: string
  features: string[]
  metadata?: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

export interface UserSubscriptionHistory {
  id: string
  userId: string
  subscriptionId: string
  previousTier?: UserSubscriptionTier
  newTier: UserSubscriptionTier
  action: 'upgraded' | 'downgraded' | 'cancelled' | 'renewed' | 'expired'
  reason?: string
  createdAt: string
}

// ============== User Main Type ==============

export interface User {
  id: string
  email: string
  username?: string
  password: string
  passwordSalt?: string
  
  // Personal Info
  firstName: string
  lastName: string
  fullName: string
  displayName?: string
  gender?: UserGender
  dateOfBirth?: string
  age?: number
  
  // Contact Info
  phone?: string
  phoneVerified: boolean
  emailVerified: boolean
  alternateEmail?: string
  alternatePhone?: string
  
  // Profile
  avatar?: string
  coverImage?: string
  bio?: string
  website?: string
  company?: string
  position?: string
  
  // Status & Role
  role: UserRole
  status: UserStatus
  verificationStatus: UserVerificationStatus
  
  // Statistics
  orderCount: number
  totalSpent: number
  averageRating: number
  reviewCount: number
  wishlistCount: number
  followerCount: number
  followingCount: number
  
  // Preferences
  preferences: UserPreferences
  
  // Relationships
  addresses?: UserAddress[]
  paymentMethods?: UserPaymentMethod[]
  socialLinks?: UserSocialLink[]
  
  // Verification
  emailVerifiedAt?: string
  phoneVerifiedAt?: string
  identityVerifiedAt?: string
  
  // Timestamps
  lastLoginAt?: string
  lastActiveAt?: string
  passwordChangedAt?: string
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
  
  // Flags
  isActive: boolean
  isVerified: boolean
  isAdmin: boolean
  isVendor: boolean
  isStaff: boolean
  isOnline: boolean
}

// ============== User Request/Response Types ==============

export interface CreateUserRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  username?: string
  phone?: string
  gender?: UserGender
  dateOfBirth?: string
  company?: string
  position?: string
  acceptTerms: boolean
  acceptMarketing?: boolean
  referralCode?: string
}

export interface UpdateUserRequest {
  firstName?: string
  lastName?: string
  displayName?: string
  gender?: UserGender
  dateOfBirth?: string
  phone?: string
  alternateEmail?: string
  alternatePhone?: string
  avatar?: string
  coverImage?: string
  bio?: string
  website?: string
  company?: string
  position?: string
}

export interface UpdateUserRoleRequest {
  userId: string
  role: UserRole
  reason?: string
}

export interface UpdateUserStatusRequest {
  userId: string
  status: UserStatus
  reason?: string
}

export interface UserResponse {
  user: User
}

export interface UserListResponse {
  users: User[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface UserProfileResponse {
  id: string
  email: string
  username?: string
  firstName: string
  lastName: string
  fullName: string
  displayName?: string
  avatar?: string
  coverImage?: string
  bio?: string
  website?: string
  company?: string
  position?: string
  role: UserRole
  isVerified: boolean
  isOnline: boolean
  lastActiveAt?: string
  followerCount: number
  followingCount: number
  reviewCount: number
  createdAt: string
}

// ============== User Filter Types ==============

export interface UserFilter {
  role?: UserRole | UserRole[]
  status?: UserStatus | UserStatus[]
  verificationStatus?: UserVerificationStatus | UserVerificationStatus[]
  isVerified?: boolean
  isActive?: boolean
  isAdmin?: boolean
  isVendor?: boolean
  search?: string
  email?: string
  username?: string
  phone?: string
  dateFrom?: string
  dateTo?: string
  lastLoginFrom?: string
  lastLoginTo?: string
  orderCountMin?: number
  orderCountMax?: number
  totalSpentMin?: number
  totalSpentMax?: number
  hasNewsletter?: boolean
  hasMarketing?: boolean
  hasTwoFactor?: boolean
}

export interface UserSortOptions {
  field: string
  direction: 'asc' | 'desc'
}

export interface UserExportOptions {
  format: 'csv' | 'json' | 'xml' | 'pdf'
  fields: string[]
  dateFrom?: string
  dateTo?: string
  role?: UserRole[]
  status?: UserStatus[]
}

// ============== User Auth Types ==============

export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface LoginResponse {
  user: User
  token: string
  refreshToken: string
  expiresIn: number
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  acceptTerms: boolean
  acceptMarketing?: boolean
}

export interface RegisterResponse {
  user: User
  token: string
  refreshToken: string
  expiresIn: number
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  password: string
  confirmPassword: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface VerifyEmailRequest {
  token: string
}

export interface VerifyPhoneRequest {
  code: string
}

export interface TwoFactorRequest {
  code: string
  rememberDevice?: boolean
}

export interface TwoFactorSetupResponse {
  secret: string
  qrCode: string
  recoveryCodes: string[]
}

// ============== User Password Types ==============

export interface UserPasswordReset {
  id: string
  userId: string
  token: string
  expiresAt: string
  usedAt?: string
  createdAt: string
}

export interface UserPasswordHistory {
  id: string
  userId: string
  password: string
  changedAt: string
  changedBy?: string
  reason?: string
}

// ============== User Device Types ==============

export interface UserDevice {
  id: string
  userId: string
  deviceId: string
  deviceType: 'desktop' | 'mobile' | 'tablet' | 'other'
  deviceName?: string
  browser?: string
  browserVersion?: string
  operatingSystem?: string
  osVersion?: string
  isTrusted: boolean
  isCurrent: boolean
  lastUsedAt: string
  createdAt: string
  updatedAt: string
}

// ============== User Constants ==============

export const USER_CONSTANTS = {
  VERSION: '1.0.0',
  
  ROLES: Object.values(UserRole),
  STATUSES: Object.values(UserStatus),
  VERIFICATION_STATUSES: Object.values(UserVerificationStatus),
  GENDERS: Object.values(UserGender),
  SUBSCRIPTION_TIERS: Object.values(UserSubscriptionTier),
  
  DEFAULT_PREFERENCES: {
    theme: 'system' as const,
    language: 'en',
    currency: 'USD',
    timezone: 'America/New_York',
    dateFormat: 'MMM dd, yyyy',
    timeFormat: '12h' as const,
    notifications: {
      email: true,
      sms: false,
      push: true,
      orderUpdates: true,
      promotions: true,
      newsletter: true,
      productAlerts: true,
      priceDrops: true,
      backInStock: true,
      reviewReminders: true,
      accountActivity: true,
    },
    privacy: {
      profileVisibility: 'public' as const,
      showEmail: false,
      showPhone: false,
      showAddress: false,
      showOrderHistory: false,
      showWishlist: true,
      allowTracking: true,
      allowMarketing: false,
      allowDataSharing: false,
    },
    security: {
      twoFactorEnabled: false,
      loginNotifications: true,
      deviceHistory: true,
      sessionTimeout: 30,
    },
    itemsPerPage: 20,
    recentlyViewedLimit: 10,
  },
  
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 72,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL: true,
    HISTORY_LIMIT: 5,
    EXPIRY_DAYS: 90,
  },
  
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30,
    ALLOWED_CHARS: 'a-zA-Z0-9._-',
    PATTERN: '^[a-zA-Z0-9._-]{3,30}$',
  },
  
  SESSION: {
    DEFAULT_TIMEOUT: 30, // minutes
    MAX_ACTIVE_SESSIONS: 5,
    REMEMBER_ME_DAYS: 30,
  },
  
  VERIFICATION: {
    EMAIL_EXPIRY_HOURS: 24,
    PHONE_EXPIRY_MINUTES: 10,
    CODE_LENGTH: 6,
    MAX_ATTEMPTS: 5,
  },
  
  AVATAR: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ACCEPTED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    DIMENSIONS: {
      width: 500,
      height: 500,
    },
  },
  
  DEFAULT_SORT: 'createdAt',
  DEFAULT_SORT_DIRECTION: 'desc',
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const

export const USER_VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 254,
  PHONE_MIN_LENGTH: 10,
  PHONE_MAX_LENGTH: 15,
  BIO_MAX_LENGTH: 500,
  WEBSITE_MAX_LENGTH: 200,
  COMPANY_MAX_LENGTH: 100,
  POSITION_MAX_LENGTH: 100,
} as const

export const USER_ERROR_CODES = {
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  USER_EMAIL_ALREADY_EXISTS: 'USER_EMAIL_ALREADY_EXISTS',
  USER_USERNAME_ALREADY_EXISTS: 'USER_USERNAME_ALREADY_EXISTS',
  USER_PHONE_ALREADY_EXISTS: 'USER_PHONE_ALREADY_EXISTS',
  
  USER_INVALID_CREDENTIALS: 'USER_INVALID_CREDENTIALS',
  USER_ACCOUNT_LOCKED: 'USER_ACCOUNT_LOCKED',
  USER_ACCOUNT_SUSPENDED: 'USER_ACCOUNT_SUSPENDED',
  USER_ACCOUNT_BANNED: 'USER_ACCOUNT_BANNED',
  USER_ACCOUNT_DELETED: 'USER_ACCOUNT_DELETED',
  USER_ACCOUNT_PENDING: 'USER_ACCOUNT_PENDING',
  USER_EMAIL_NOT_VERIFIED: 'USER_EMAIL_NOT_VERIFIED',
  USER_PHONE_NOT_VERIFIED: 'USER_PHONE_NOT_VERIFIED',
  
  USER_INVALID_PASSWORD: 'USER_INVALID_PASSWORD',
  USER_PASSWORD_MISMATCH: 'USER_PASSWORD_MISMATCH',
  USER_PASSWORD_WEAK: 'USER_PASSWORD_WEAK',
  USER_PASSWORD_HISTORY: 'USER_PASSWORD_HISTORY',
  USER_PASSWORD_EXPIRED: 'USER_PASSWORD_EXPIRED',
  
  USER_INVALID_TOKEN: 'USER_INVALID_TOKEN',
  USER_TOKEN_EXPIRED: 'USER_TOKEN_EXPIRED',
  USER_TOKEN_USED: 'USER_TOKEN_USED',
  
  USER_INVALID_ROLE: 'USER_INVALID_ROLE',
  USER_INVALID_STATUS: 'USER_INVALID_STATUS',
  USER_INSUFFICIENT_PERMISSIONS: 'USER_INSUFFICIENT_PERMISSIONS',
  
  USER_ADDRESS_NOT_FOUND: 'USER_ADDRESS_NOT_FOUND',
  USER_ADDRESS_LIMIT_REACHED: 'USER_ADDRESS_LIMIT_REACHED',
  USER_PAYMENT_METHOD_NOT_FOUND: 'USER_PAYMENT_METHOD_NOT_FOUND',
  USER_PAYMENT_METHOD_LIMIT_REACHED: 'USER_PAYMENT_METHOD_LIMIT_REACHED',
  
  USER_SESSION_NOT_FOUND: 'USER_SESSION_NOT_FOUND',
  USER_SESSION_EXPIRED: 'USER_SESSION_EXPIRED',
  USER_SESSION_LIMIT_REACHED: 'USER_SESSION_LIMIT_REACHED',
  
  USER_TWO_FACTOR_REQUIRED: 'USER_TWO_FACTOR_REQUIRED',
  USER_TWO_FACTOR_INVALID: 'USER_TWO_FACTOR_INVALID',
  USER_TWO_FACTOR_ALREADY_ENABLED: 'USER_TWO_FACTOR_ALREADY_ENABLED',
  USER_TWO_FACTOR_NOT_ENABLED: 'USER_TWO_FACTOR_NOT_ENABLED',
  
  USER_RECOVERY_CODE_INVALID: 'USER_RECOVERY_CODE_INVALID',
  USER_RECOVERY_CODE_USED: 'USER_RECOVERY_CODE_USED',
  
  USER_RATE_LIMIT_EXCEEDED: 'USER_RATE_LIMIT_EXCEEDED',
  USER_MAX_LOGIN_ATTEMPTS: 'USER_MAX_LOGIN_ATTEMPTS',
  
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
} as const

export type UserErrorCode = keyof typeof USER_ERROR_CODES

// ============== User Summary Type ==============

export type UserSummary = {
  id: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  avatar?: string
  role: UserRole
  status: UserStatus
  isVerified: boolean
  createdAt: string
  lastActiveAt?: string
}

// ============== User Statistics Types ==============

export interface UserStatistics {
  userId: string
  orderCount: number
  totalSpent: number
  averageOrderValue: number
  reviewCount: number
  averageRating: number
  wishlistCount: number
  followerCount: number
  followingCount: number
  rewardPoints: number
  subscriptionTier: UserSubscriptionTier
  accountAge: number
  lastOrderDate?: string
  firstOrderDate?: string
  loginCount: number
  sessionCount: number
}

// ============== User Dashboard Types ==============

export interface UserDashboardSummary {
  user: UserSummary
  statistics: UserStatistics
  recentOrders: Array<{
    id: string
    orderNumber: string
    total: number
    status: string
    createdAt: string
  }>
  recentReviews: Array<{
    id: string
    productId: string
    productName: string
    rating: number
    content: string
    createdAt: string
  }>
  wishlistItems: Array<{
    id: string
    productId: string
    productName: string
    productImage: string
    price: number
    addedAt: string
  }>
  rewardPoints: {
    balance: number
    lifetimeEarned: number
    lifetimeRedeemed: number
  }
  subscription?: UserSubscription
}

// ============== Export ==============

export default {
  UserRole,
  UserStatus,
  UserVerificationStatus,
  UserGender,
  UserSubscriptionTier,
  USER_CONSTANTS,
  USER_VALIDATION,
  USER_ERROR_CODES,
}