// ============== App Information ==============

export const APP = {
  NAME: 'Jweelary',
  FULL_NAME: 'Jweelary Jewelry Shop',
  DESCRIPTION: 'Premium jewelry and watches for every occasion',
  TAGLINE: 'Timeless Elegance',
  URL: process.env.NEXT_PUBLIC_APP_URL || 'https://jweelary.com',
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.jweelary.com',
  VERSION: '1.0.0',
  COPYRIGHT: `© ${new Date().getFullYear()} Jweelary. All rights reserved.`,
} as const

// ============== Navigation ==============

export const NAVIGATION = {
  MAIN: [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'New Arrivals', href: '/new' },
    { name: 'Sale', href: '/sale' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ] as const,
  
  SHOP: [
    { name: 'All Products', href: '/shop' },
    { name: 'New Arrivals', href: '/new' },
    { name: 'Best Sellers', href: '/best-sellers' },
    { name: 'Sale', href: '/sale' },
    { name: 'Gift Cards', href: '/gift-cards' },
  ] as const,
  
  CATEGORIES: [
    { name: 'Rings', href: '/category/rings', count: 124 },
    { name: 'Necklaces', href: '/category/necklaces', count: 89 },
    { name: 'Earrings', href: '/category/earrings', count: 156 },
    { name: 'Bracelets', href: '/category/bracelets', count: 67 },
    { name: 'Watches', href: '/category/watches', count: 45 },
    { name: 'Engagement', href: '/category/engagement', count: 34 },
    { name: 'Wedding', href: '/category/wedding', count: 56 },
    { name: 'Men', href: '/category/men', count: 78 },
  ] as const,
  
  COLLECTIONS: [
    { name: 'Diamond Collection', href: '/collections/diamond' },
    { name: 'Gold Collection', href: '/collections/gold' },
    { name: 'Silver Collection', href: '/collections/silver' },
    { name: 'Pearl Collection', href: '/collections/pearl' },
    { name: 'Luxury Collection', href: '/collections/luxury' },
  ] as const,
  
  USER: [
    { name: 'My Account', href: '/account', icon: '👤' },
    { name: 'Orders', href: '/account/orders', icon: '📦' },
    { name: 'Wishlist', href: '/account/wishlist', icon: '❤️' },
    { name: 'Compare', href: '/account/compare', icon: '⚖️' },
    { name: 'Settings', href: '/account/settings', icon: '⚙️' },
  ] as const,
  
  FOOTER: {
    SHOP: [
      { name: 'All Products', href: '/shop' },
      { name: 'New Arrivals', href: '/new' },
      { name: 'Best Sellers', href: '/best-sellers' },
      { name: 'Sale', href: '/sale' },
      { name: 'Gift Cards', href: '/gift-cards' },
    ] as const,
    
    ABOUT: [
      { name: 'Our Story', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Sustainability', href: '/sustainability' },
    ] as const,
    
    SUPPORT: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Shipping', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'Size Guide', href: '/size-guide' },
    ] as const,
    
    LEGAL: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
    ] as const,
  },
} as const

// ============== Social Media ==============

export const SOCIAL = {
  INSTAGRAM: {
    url: 'https://instagram.com/jweelary',
    handle: '@jweelary',
    icon: '📷',
  },
  FACEBOOK: {
    url: 'https://facebook.com/jweelary',
    handle: '/jweelary',
    icon: '📘',
  },
  TWITTER: {
    url: 'https://twitter.com/jweelary',
    handle: '@jweelary',
    icon: '🐦',
  },
  PINTEREST: {
    url: 'https://pinterest.com/jweelary',
    handle: '@jweelary',
    icon: '📌',
  },
  YOUTUBE: {
    url: 'https://youtube.com/jweelary',
    handle: '/jweelary',
    icon: '▶️',
  },
  TIKTOK: {
    url: 'https://tiktok.com/@jweelary',
    handle: '@jweelary',
    icon: '🎵',
  },
} as const

// ============== Contact Information ==============

export const CONTACT = {
  EMAIL: {
    SUPPORT: 'support@jweelary.com',
    SALES: 'sales@jweelary.com',
    INFO: 'info@jweelary.com',
    CAREERS: 'careers@jweelary.com',
    PRESS: 'press@jweelary.com',
  },
  PHONE: {
    MAIN: '+1 (234) 567-8900',
    SUPPORT: '+1 (234) 567-8901',
    SALES: '+1 (234) 567-8902',
    TOLL_FREE: '1-800-JWEELARY',
  },
  ADDRESS: {
    STREET: '123 Jewelry Street',
    CITY: 'New York',
    STATE: 'NY',
    ZIP: '10001',
    COUNTRY: 'USA',
    FULL: '123 Jewelry Street, New York, NY 10001, USA',
  },
  HOURS: {
    WEEKDAYS: '10:00 AM - 8:00 PM',
    SATURDAY: '10:00 AM - 8:00 PM',
    SUNDAY: '12:00 PM - 6:00 PM',
    HOLIDAYS: '11:00 AM - 5:00 PM',
  },
} as const

// ============== Product Constants ==============

export const PRODUCT = {
  SORT_OPTIONS: [
    { value: 'newest', label: 'Newest' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'name_asc', label: 'Name: A to Z' },
    { value: 'name_desc', label: 'Name: Z to A' },
  ] as const,
  
  PER_PAGE_OPTIONS: [12, 24, 36, 48, 60] as const,
  
  DEFAULT_PER_PAGE: 24,
  
  REVIEW_SORT_OPTIONS: [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'highest', label: 'Highest Rating' },
    { value: 'lowest', label: 'Lowest Rating' },
    { value: 'helpful', label: 'Most Helpful' },
  ] as const,
  
  STOCK_STATUS: {
    IN_STOCK: 'In Stock',
    LOW_STOCK: 'Low Stock',
    OUT_OF_STOCK: 'Out of Stock',
    PRE_ORDER: 'Pre-Order',
    BACK_ORDER: 'Back Order',
  } as const,
  
  CONDITIONS: {
    NEW: 'New',
    LIKE_NEW: 'Like New',
    EXCELLENT: 'Excellent',
    GOOD: 'Good',
    FAIR: 'Fair',
  } as const,
} as const

// ============== Category Constants ==============

export const CATEGORIES = {
  RINGS: {
    id: 'rings',
    name: 'Rings',
    slug: 'rings',
    subcategories: [
      'Engagement Rings',
      'Wedding Bands',
      'Promise Rings',
      'Eternity Rings',
      'Statement Rings',
      'Stackable Rings',
    ],
  },
  NECKLACES: {
    id: 'necklaces',
    name: 'Necklaces',
    slug: 'necklaces',
    subcategories: [
      'Pendants',
      'Chokers',
      'Chains',
      'Pearl Necklaces',
      'Diamond Necklaces',
      'Gold Necklaces',
    ],
  },
  EARRINGS: {
    id: 'earrings',
    name: 'Earrings',
    slug: 'earrings',
    subcategories: [
      'Stud Earrings',
      'Hoop Earrings',
      'Drop Earrings',
      'Chandelier Earrings',
      'Ear Cuffs',
      'Diamond Earrings',
    ],
  },
  BRACELETS: {
    id: 'bracelets',
    name: 'Bracelets',
    slug: 'bracelets',
    subcategories: [
      'Bangles',
      'Cuffs',
      'Tennis Bracelets',
      'Charm Bracelets',
      'Beaded Bracelets',
      'Link Bracelets',
    ],
  },
  WATCHES: {
    id: 'watches',
    name: 'Watches',
    slug: 'watches',
    subcategories: [
      'Luxury Watches',
      'Dress Watches',
      'Sports Watches',
      'Smart Watches',
      'Vintage Watches',
      'Men\'s Watches',
      'Women\'s Watches',
    ],
  },
} as const

// ============== Material Constants ==============

export const MATERIALS = {
  GOLD: {
    '10K': '10K Gold',
    '14K': '14K Gold',
    '18K': '18K Gold',
    '22K': '22K Gold',
    '24K': '24K Gold',
    ROSE: 'Rose Gold',
    WHITE: 'White Gold',
    YELLOW: 'Yellow Gold',
  },
  SILVER: {
    STERLING: 'Sterling Silver',
    PURE: 'Pure Silver',
    VERMEIL: 'Silver Vermeil',
  },
  PLATINUM: {
    PT950: 'Platinum 950',
    PT900: 'Platinum 900',
    PT850: 'Platinum 850',
  },
  GEMSTONES: {
    DIAMOND: 'Diamond',
    RUBY: 'Ruby',
    SAPPHIRE: 'Sapphire',
    EMERALD: 'Emerald',
    PEARL: 'Pearl',
    OPAL: 'Opal',
    AMETHYST: 'Amethyst',
    AQUAMARINE: 'Aquamarine',
    GARNET: 'Garnet',
    TOPAZ: 'Topaz',
    TURQUOISE: 'Turquoise',
    MORGANITE: 'Morganite',
  },
} as const

// ============== Size Constants ==============

export const SIZES = {
  RING: ['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
  NECKLACE: ['14"', '16"', '18"', '20"', '22"', '24"', '30"', '36"'],
  BRACELET: ['6"', '6.5"', '7"', '7.5"', '8"', '8.5"', '9"'],
  WATCH: ['38mm', '40mm', '42mm', '44mm', '46mm'],
} as const

// ============== Pricing Constants ==============

export const PRICING = {
  CURRENCY: {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CAD: 'C$',
    AUD: 'A$',
  },
  DEFAULT_CURRENCY: 'USD',
  TAX_RATE: 0.08, // 8%
  SHIPPING_THRESHOLD: 100, // Free shipping over $100
  STANDARD_SHIPPING: 10,
  EXPRESS_SHIPPING: 25,
  NEXT_DAY_SHIPPING: 35,
} as const

// ============== Order Constants ==============

export const ORDER = {
  STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    CONFIRMED: 'confirmed',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
    ON_HOLD: 'on_hold',
  } as const,
  
  STATUS_LABELS: {
    pending: 'Pending',
    processing: 'Processing',
    confirmed: 'Confirmed',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
    on_hold: 'On Hold',
  } as const,
  
  PAYMENT_STATUS: {
    PENDING: 'pending',
    PAID: 'paid',
    FAILED: 'failed',
    REFUNDED: 'refunded',
    PARTIALLY_REFUNDED: 'partially_refunded',
  } as const,
  
  PAYMENT_METHODS: {
    CREDIT_CARD: 'credit_card',
    DEBIT_CARD: 'debit_card',
    PAYPAL: 'paypal',
    APPLE_PAY: 'apple_pay',
    GOOGLE_PAY: 'google_pay',
    BANK_TRANSFER: 'bank_transfer',
  } as const,
} as const

// ============== Shipping Constants ==============

export const SHIPPING = {
  METHODS: [
    { id: 'standard', name: 'Standard Shipping', price: 10, days: '5-7' },
    { id: 'express', name: 'Express Shipping', price: 25, days: '2-3' },
    { id: 'next_day', name: 'Next Day Delivery', price: 35, days: '1' },
    { id: 'free', name: 'Free Shipping', price: 0, days: '5-10', minOrder: 100 },
  ] as const,
  
  COUNTRIES: [
    { code: 'US', name: 'United States', zones: ['domestic'] },
    { code: 'CA', name: 'Canada', zones: ['north_america'] },
    { code: 'GB', name: 'United Kingdom', zones: ['europe'] },
    { code: 'DE', name: 'Germany', zones: ['europe'] },
    { code: 'FR', name: 'France', zones: ['europe'] },
    { code: 'AU', name: 'Australia', zones: ['asia_pacific'] },
    { code: 'JP', name: 'Japan', zones: ['asia_pacific'] },
  ] as const,
} as const

// ============== Auth Constants ==============

export const AUTH = {
  TOKEN_KEY: 'auth_token',
  REFRESH_TOKEN_KEY: 'auth_refresh_token',
  USER_KEY: 'auth_user',
  EXPIRY_KEY: 'auth_expires_at',
  
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 72,
  
  LOGIN_REDIRECT: '/account',
  LOGOUT_REDIRECT: '/',
  
  ROLES: {
    USER: 'user',
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    VENDOR: 'vendor',
  } as const,
} as const

// ============== Cart Constants ==============

export const CART = {
  STORAGE_KEY: 'cart_items',
  COUPON_KEY: 'cart_coupon',
  EXPIRY_KEY: 'cart_expiry',
  EXPIRY_DAYS: 7,
  
  MAX_QUANTITY: 10,
  MIN_QUANTITY: 1,
  
  FREE_SHIPPING_THRESHOLD: 100,
  STANDARD_SHIPPING_RATE: 10,
  TAX_RATE: 0.08,
} as const

// ============== Wishlist Constants ==============

export const WISHLIST = {
  STORAGE_KEY: 'wishlist',
  MAX_ITEMS: 50,
} as const

// ============== Compare Constants ==============

export const COMPARE = {
  STORAGE_KEY: 'compare',
  MAX_ITEMS: 4,
} as const

// ============== Recently Viewed Constants ==============

export const RECENTLY_VIEWED = {
  STORAGE_KEY: 'recently_viewed',
  MAX_ITEMS: 10,
} as const

// ============== Search Constants ==============

export const SEARCH = {
  DEBOUNCE_MS: 300,
  MIN_CHARS: 2,
  MAX_SUGGESTIONS: 5,
  RECENT_SEARCHES_KEY: 'recent_searches',
  MAX_RECENT_SEARCHES: 5,
} as const

// ============== Pagination Constants ==============

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 24,
  MAX_LIMIT: 100,
  SIBLING_COUNT: 1,
  BOUNDARY_COUNT: 1,
} as const

// ============== File Upload Constants ==============

export const UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
  ACCEPTED_DOCUMENT_TYPES: ['application/pdf'],
  MAX_FILES: 5,
} as const

// ============== Date/Time Constants ==============

export const DATE = {
  FORMAT: {
    DEFAULT: 'MMM dd, yyyy',
    SHORT: 'MM/dd/yyyy',
    LONG: 'MMMM dd, yyyy',
    WITH_TIME: 'MMM dd, yyyy hh:mm a',
    ISO: 'yyyy-MM-dd',
  },
  
  PICKER_FORMATS: {
    parse: {
      dateInput: 'LL',
    },
    display: {
      dateInput: 'MMM DD, YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  },
} as const

// ============== Animation Constants ==============

export const ANIMATION = {
  DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
    VERY_SLOW: 700,
  },
  
  EASING: {
    DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    SMOOTH: 'cubic-bezier(0.4, 0, 0.2, 1)',
    BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    LINEAR: 'linear',
    EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
    EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
    EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const

// ============== Breakpoint Constants ==============

export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export const MEDIA_QUERIES = {
  sm: `(min-width: ${BREAKPOINTS.sm}px)`,
  md: `(min-width: ${BREAKPOINTS.md}px)`,
  lg: `(min-width: ${BREAKPOINTS.lg}px)`,
  xl: `(min-width: ${BREAKPOINTS.xl}px)`,
  '2xl': `(min-width: ${BREAKPOINTS['2xl']}px)`,
  
  mobile: `(max-width: ${BREAKPOINTS.md - 1}px)`,
  tablet: `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`,
  desktop: `(min-width: ${BREAKPOINTS.lg}px)`,
} as const

// ============== Color Constants ==============

export const COLORS = {
  primary: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
} as const

// ============== Error Messages ==============

export const ERRORS = {
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    EMAIL_NOT_VERIFIED: 'Please verify your email address',
    ACCOUNT_LOCKED: 'Account has been locked. Please contact support',
    SESSION_EXPIRED: 'Your session has expired. Please login again',
    UNAUTHORIZED: 'You are not authorized to perform this action',
    FORBIDDEN: 'You do not have permission to access this resource',
  },
  
  VALIDATION: {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    PASSWORD_MISMATCH: 'Passwords do not match',
    PASSWORD_MIN_LENGTH: `Password must be at least ${AUTH.PASSWORD_MIN_LENGTH} characters`,
    PASSWORD_MAX_LENGTH: `Password must not exceed ${AUTH.PASSWORD_MAX_LENGTH} characters`,
    INVALID_PRICE: 'Please enter a valid price',
    INVALID_QUANTITY: 'Please enter a valid quantity',
  },
  
  CART: {
    ITEM_NOT_FOUND: 'Item not found in cart',
    MAX_QUANTITY: `Maximum quantity is ${CART.MAX_QUANTITY}`,
    MIN_QUANTITY: `Minimum quantity is ${CART.MIN_QUANTITY}`,
    OUT_OF_STOCK: 'Item is out of stock',
    INVALID_COUPON: 'Invalid coupon code',
    COUPON_EXPIRED: 'Coupon has expired',
    COUPON_MIN_ORDER: 'Minimum order amount not met',
  },
  
  PRODUCT: {
    NOT_FOUND: 'Product not found',
    OUT_OF_STOCK: 'Product is out of stock',
    DISCONTINUED: 'Product has been discontinued',
  },
  
  ORDER: {
    NOT_FOUND: 'Order not found',
    CANCELLED: 'Order has been cancelled',
    CANNOT_CANCEL: 'Order cannot be cancelled',
    INVALID_STATUS: 'Invalid order status',
  },
  
  PAYMENT: {
    FAILED: 'Payment processing failed',
    DECLINED: 'Payment was declined',
    INVALID_METHOD: 'Invalid payment method',
    REFUND_FAILED: 'Refund processing failed',
  },
  
  SHIPPING: {
    INVALID_ADDRESS: 'Invalid shipping address',
    INVALID_METHOD: 'Invalid shipping method',
    UNAVAILABLE: 'Shipping is not available to this location',
  },
  
  UPLOAD: {
    FILE_TOO_LARGE: `File size must be less than ${UPLOAD.MAX_SIZE / 1024 / 1024}MB`,
    INVALID_TYPE: 'Invalid file type',
    MAX_FILES: `Maximum ${UPLOAD.MAX_FILES} files allowed`,
    UPLOAD_FAILED: 'File upload failed',
  },
  
  NETWORK: {
    OFFLINE: 'No internet connection',
    TIMEOUT: 'Request timed out',
    SERVER_ERROR: 'Server error occurred',
  },
} as const

// ============== Success Messages ==============

export const SUCCESS = {
  AUTH: {
    LOGIN: 'Successfully logged in',
    LOGOUT: 'Successfully logged out',
    REGISTER: 'Account created successfully',
    VERIFIED: 'Email verified successfully',
    PASSWORD_RESET: 'Password reset successfully',
    PROFILE_UPDATED: 'Profile updated successfully',
  },
  
  CART: {
    ADDED: 'Item added to cart',
    UPDATED: 'Cart updated successfully',
    REMOVED: 'Item removed from cart',
    CLEARED: 'Cart cleared successfully',
    COUPON_APPLIED: 'Coupon applied successfully',
    COUPON_REMOVED: 'Coupon removed successfully',
  },
  
  WISHLIST: {
    ADDED: 'Item added to wishlist',
    REMOVED: 'Item removed from wishlist',
  },
  
  ORDER: {
    PLACED: 'Order placed successfully',
    CANCELLED: 'Order cancelled successfully',
  },
  
  REVIEW: {
    ADDED: 'Review added successfully',
    UPDATED: 'Review updated successfully',
    DELETED: 'Review deleted successfully',
  },
} as const

// ============== SEO Constants ==============

export const SEO = {
  TITLE_TEMPLATE: {
    DEFAULT: '%s | Jweelary',
    HOME: 'Jweelary - Premium Jewelry & Watches',
    SHOP: 'Shop Jewelry & Watches | Jweelary',
    CATEGORY: '%s | Jweelary',
    PRODUCT: '%s | Jweelary',
    BLOG: 'Blog | Jweelary',
    ACCOUNT: 'My Account | Jweelary',
  },
  
  DESCRIPTION: {
    DEFAULT: 'Discover timeless elegance at Jweelary. Shop our curated collection of fine jewelry, watches, and custom designs.',
    SHOP: 'Explore our collection of premium jewelry and watches. Find the perfect piece for every occasion.',
  },
  
  KEYWORDS: [
    'jewelry',
    'watches',
    'diamond rings',
    'engagement rings',
    'wedding bands',
    'gold necklaces',
    'silver bracelets',
    'luxury watches',
    'fine jewelry',
  ],
  
  OG_IMAGE: '/images/og-image.jpg',
  TWITTER_HANDLE: '@jweelary',
} as const

// ============== Local Storage Keys ==============

export const STORAGE_KEYS = {
  AUTH: {
    TOKEN: 'auth_token',
    REFRESH_TOKEN: 'auth_refresh_token',
    USER: 'auth_user',
    EXPIRES_AT: 'auth_expires_at',
    REMEMBER_ME: 'auth_remember_me',
  },
  
  CART: {
    ITEMS: 'cart_items',
    COUPON: 'cart_coupon',
    EXPIRY: 'cart_expiry',
  },
  
  WISHLIST: 'wishlist',
  COMPARE: 'compare',
  RECENTLY_VIEWED: 'recently_viewed',
  RECENT_SEARCHES: 'recent_searches',
  
  THEME: 'theme',
  LANGUAGE: 'language',
  CURRENCY: 'currency',
} as const

// ============== API Endpoints ==============

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION: '/auth/resend-verification',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    PROFILE: '/auth/profile',
    PASSWORD: '/auth/password',
    AVATAR: '/auth/avatar',
    ACCOUNT: '/auth/account',
    TWO_FACTOR: {
      ENABLE: '/auth/2fa/enable',
      VERIFY: '/auth/2fa/verify',
      DISABLE: '/auth/2fa/disable',
    },
    PREFERENCES: '/auth/preferences',
  },
  
  PRODUCTS: {
    BASE: '/products',
    BY_ID: (id: string) => `/products/${id}`,
    BY_SLUG: (slug: string) => `/products/slug/${slug}`,
    RELATED: (id: string) => `/products/${id}/related`,
    CATEGORY: (category: string) => `/products/category/${category}`,
    COLLECTION: (collection: string) => `/products/collection/${collection}`,
  },
  
  CATEGORIES: {
    BASE: '/categories',
    BY_ID: (id: string) => `/categories/${id}`,
    BY_SLUG: (slug: string) => `/categories/slug/${slug}`,
  },
  
  CART: {
    BASE: '/cart',
    SYNC: '/cart/sync',
    COUPON: '/cart/coupon',
  },
  
  ORDERS: {
    BASE: '/orders',
    BY_ID: (id: string) => `/orders/${id}`,
    TRACK: (id: string) => `/orders/${id}/track`,
  },
  
  WISHLIST: {
    BASE: '/wishlist',
    CHECK: (productId: string) => `/wishlist/check/${productId}`,
  },
  
  REVIEWS: {
    BASE: '/reviews',
    BY_PRODUCT: (productId: string) => `/reviews/product/${productId}`,
  },
  
  COUPONS: {
    VALIDATE: '/coupons/validate',
  },
  
  SEARCH: {
    BASE: '/search',
    SUGGESTIONS: '/search/suggestions',
  },
} as const