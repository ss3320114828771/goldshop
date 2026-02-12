// ============== Types ==============

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  fields?: Record<string, string>
}

export interface ValidationRule<T = any> {
  validate: (value: T) => boolean
  message: string
}

export interface FieldValidation {
  field: string
  value: any
  rules: ValidationRule[]
}

export interface ValidationSchema {
  [key: string]: ValidationRule[]
}

export interface PasswordStrength {
  score: number
  label: 'weak' | 'fair' | 'good' | 'strong' | 'very-strong'
  suggestions: string[]
}

// ============== Email Validators ==============

export const isEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email.trim())
}

export const isBusinessEmail = (email: string): boolean => {
  if (!isEmail(email)) return false
  
  const freeDomains = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'aol.com',
    'icloud.com',
    'protonmail.com',
    'mail.com',
    'yandex.com',
  ]
  
  const domain = email.split('@')[1].toLowerCase()
  return !freeDomains.includes(domain)
}

export const isEducationalEmail = (email: string): boolean => {
  if (!isEmail(email)) return false
  
  const domain = email.split('@')[1].toLowerCase()
  return domain.endsWith('.edu') || domain.includes('.edu.')
}

export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = []
  
  if (!email) errors.push('Email is required')
  else if (!isEmail(email)) errors.push('Please enter a valid email address')
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

// ============== Phone Validators ==============

export const isPhone = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return false
  
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length >= 10 && cleaned.length <= 15
}

export const isUSPhone = (phone: string): boolean => {
  if (!phone) return false
  
  const cleaned = phone.replace(/\D/g, '')
  const usPhoneRegex = /^1?[2-9]\d{2}[2-9]\d{6}$/
  return usPhoneRegex.test(cleaned)
}

export const isInternationalPhone = (phone: string): boolean => {
  if (!phone) return false
  
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length >= 10 && cleaned.length <= 15 && !isUSPhone(phone)
}

export const validatePhone = (phone: string, required: boolean = false): ValidationResult => {
  const errors: string[] = []
  
  if (required && !phone) errors.push('Phone number is required')
  else if (phone && !isPhone(phone)) errors.push('Please enter a valid phone number')
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

// ============== Password Validators ==============

export const isPasswordStrong = (password: string): boolean => {
  if (!password || typeof password !== 'string') return false
  
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  const isLongEnough = password.length >= 8
  
  return hasUpperCase && hasLowerCase && hasNumbers && hasSpecial && isLongEnough
}

export const isPasswordMedium = (password: string): boolean => {
  if (!password || typeof password !== 'string') return false
  
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const isLongEnough = password.length >= 6
  
  const score = [hasUpperCase, hasLowerCase, hasNumbers, isLongEnough].filter(Boolean).length
  return score >= 3
}

export const isPasswordWeak = (password: string): boolean => {
  if (!password) return true
  return password.length < 6
}

export const getPasswordStrength = (password: string): PasswordStrength => {
  if (!password) {
    return {
      score: 0,
      label: 'weak',
      suggestions: ['Enter a password'],
    }
  }
  
  let score = 0
  const suggestions: string[] = []
  
  // Length check
  if (password.length >= 8) score += 25
  else if (password.length >= 6) score += 15
  else suggestions.push('Use at least 8 characters')
  
  // Uppercase check
  if (/[A-Z]/.test(password)) score += 25
  else suggestions.push('Add uppercase letters')
  
  // Lowercase check
  if (/[a-z]/.test(password)) score += 15
  else suggestions.push('Add lowercase letters')
  
  // Numbers check
  if (/\d/.test(password)) score += 20
  else suggestions.push('Add numbers')
  
  // Special characters check
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 15
  else suggestions.push('Add special characters')
  
  let label: PasswordStrength['label'] = 'weak'
  if (score >= 80) label = 'very-strong'
  else if (score >= 70) label = 'strong'
  else if (score >= 50) label = 'good'
  else if (score >= 30) label = 'fair'
  
  return {
    score,
    label,
    suggestions: suggestions.slice(0, 3),
  }
}

export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = []
  
  if (!password) errors.push('Password is required')
  else {
    if (password.length < 8) errors.push('Password must be at least 8 characters')
    if (!/[A-Z]/.test(password)) errors.push('Password must contain at least one uppercase letter')
    if (!/[a-z]/.test(password)) errors.push('Password must contain at least one lowercase letter')
    if (!/\d/.test(password)) errors.push('Password must contain at least one number')
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character')
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validatePasswordMatch = (password: string, confirmPassword: string): ValidationResult => {
  const errors: string[] = []
  
  if (password !== confirmPassword) errors.push('Passwords do not match')
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

// ============== URL Validators ==============

export const isUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false
  
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const isSecureUrl = (url: string): boolean => {
  if (!isUrl(url)) return false
  
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:'
  } catch {
    return false
  }
}

export const isAbsoluteUrl = (url: string): boolean => {
  if (!url) return false
  return /^https?:\/\//i.test(url) || /^\/\//i.test(url)
}

export const isRelativeUrl = (url: string): boolean => {
  if (!url) return false
  return !isAbsoluteUrl(url)
}

export const isImageUrl = (url: string): boolean => {
  if (!url) return false
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp']
  const lowerUrl = url.toLowerCase()
  return imageExtensions.some(ext => lowerUrl.endsWith(ext))
}

export const isVideoUrl = (url: string): boolean => {
  if (!url) return false
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv']
  const lowerUrl = url.toLowerCase()
  return videoExtensions.some(ext => lowerUrl.endsWith(ext))
}

export const isYouTubeUrl = (url: string): boolean => {
  if (!url) return false
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
  return youtubeRegex.test(url)
}

export const isVimeoUrl = (url: string): boolean => {
  if (!url) return false
  const vimeoRegex = /^(https?:\/\/)?(www\.)?vimeo\.com\/.+$/
  return vimeoRegex.test(url)
}

export const validateUrl = (url: string, required: boolean = false): ValidationResult => {
  const errors: string[] = []
  
  if (required && !url) errors.push('URL is required')
  else if (url && !isUrl(url)) errors.push('Please enter a valid URL')
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

// ============== Credit Card Validators ==============

export const isCreditCard = (cardNumber: string): boolean => {
  if (!cardNumber || typeof cardNumber !== 'string') return false
  
  const cleaned = cardNumber.replace(/\D/g, '')
  if (cleaned.length < 13 || cleaned.length > 19) return false
  
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

export const isVisaCard = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\D/g, '')
  return /^4/.test(cleaned) && [13, 16, 19].includes(cleaned.length)
}

export const isMasterCard = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\D/g, '')
  return /^5[1-5]/.test(cleaned) && cleaned.length === 16
}

export const isAmericanExpressCard = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\D/g, '')
  return /^3[47]/.test(cleaned) && cleaned.length === 15
}

export const isDiscoverCard = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\D/g, '')
  return /^6(?:011|5|4[4-9]|22(?:1(?:2[6-9]|[3-9])|[2-8]|9(?:[01]|2[0-5])))/.test(cleaned) && 
    cleaned.length === 16
}

export const detectCardType = (cardNumber: string): string | null => {
  if (isVisaCard(cardNumber)) return 'visa'
  if (isMasterCard(cardNumber)) return 'mastercard'
  if (isAmericanExpressCard(cardNumber)) return 'amex'
  if (isDiscoverCard(cardNumber)) return 'discover'
  return null
}

export const isCvv = (cvv: string, cardType?: string): boolean => {
  const cleaned = cvv.replace(/\D/g, '')
  
  if (cardType === 'amex') {
    return cleaned.length === 4
  }
  
  return cleaned.length === 3 || cleaned.length === 4
}

export const isExpiryDate = (expiry: string): boolean => {
  if (!expiry) return false
  
  const cleaned = expiry.replace(/\D/g, '')
  if (cleaned.length !== 4 && cleaned.length !== 6) return false
  
  let month: number, year: number
  
  if (cleaned.length === 4) {
    month = parseInt(cleaned.substring(0, 2), 10)
    year = 2000 + parseInt(cleaned.substring(2, 4), 10)
  } else {
    month = parseInt(cleaned.substring(0, 2), 10)
    year = parseInt(cleaned.substring(2, 6), 10)
  }
  
  if (month < 1 || month > 12) return false
  
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  
  return year > currentYear || (year === currentYear && month >= currentMonth)
}

// ============== Date Validators ==============

export const isDate = (date: any): boolean => {
  if (!date) return false
  
  const d = new Date(date)
  return d instanceof Date && !isNaN(d.getTime())
}

export const isPastDate = (date: Date | string | number): boolean => {
  const d = new Date(date)
  if (!isDate(d)) return false
  
  return d.getTime() < Date.now()
}

export const isFutureDate = (date: Date | string | number): boolean => {
  const d = new Date(date)
  if (!isDate(d)) return false
  
  return d.getTime() > Date.now()
}

export const isToday = (date: Date | string | number): boolean => {
  const d = new Date(date)
  if (!isDate(d)) return false
  
  const today = new Date()
  return d.toDateString() === today.toDateString()
}

export const isWeekend = (date: Date | string | number): boolean => {
  const d = new Date(date)
  if (!isDate(d)) return false
  
  const day = d.getDay()
  return day === 0 || day === 6
}

export const isWeekday = (date: Date | string | number): boolean => {
  return !isWeekend(date)
}

export const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

export const isValidAge = (birthDate: Date | string | number, minAge: number = 18): boolean => {
  const bd = new Date(birthDate)
  if (!isDate(bd)) return false
  
  const today = new Date()
  let age = today.getFullYear() - bd.getFullYear()
  const monthDiff = today.getMonth() - bd.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < bd.getDate())) {
    age--
  }
  
  return age >= minAge
}

// ============== Number Validators ==============

export const isNumber = (value: any): boolean => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value)
}

export const isInteger = (value: any): boolean => {
  return isNumber(value) && Number.isInteger(value)
}

export const isPositive = (value: number): boolean => {
  return isNumber(value) && value > 0
}

export const isNegative = (value: number): boolean => {
  return isNumber(value) && value < 0
}

export const isNonNegative = (value: number): boolean => {
  return isNumber(value) && value >= 0
}

export const isInRange = (value: number, min: number, max: number, inclusive: boolean = true): boolean => {
  if (!isNumber(value)) return false
  if (inclusive) return value >= min && value <= max
  return value > min && value < max
}

export const isEven = (value: number): boolean => {
  return isInteger(value) && value % 2 === 0
}

export const isOdd = (value: number): boolean => {
  return isInteger(value) && value % 2 !== 0
}

export const isMultipleOf = (value: number, divisor: number): boolean => {
  return isInteger(value) && isInteger(divisor) && value % divisor === 0
}

export const isPrime = (value: number): boolean => {
  if (!isInteger(value) || value <= 1) return false
  if (value <= 3) return true
  if (value % 2 === 0 || value % 3 === 0) return false
  
  for (let i = 5; i * i <= value; i += 6) {
    if (value % i === 0 || value % (i + 2) === 0) return false
  }
  
  return true
}

// ============== String Validators ==============

export const isAlphanumeric = (str: string): boolean => {
  if (!str) return false
  return /^[a-zA-Z0-9]+$/.test(str)
}

export const isAlphabetic = (str: string): boolean => {
  if (!str) return false
  return /^[a-zA-Z]+$/.test(str)
}

export const isNumeric = (str: string): boolean => {
  if (!str) return false
  return /^\d+$/.test(str)
}

export const isLowercase = (str: string): boolean => {
  if (!str) return false
  return str === str.toLowerCase()
}

export const isUppercase = (str: string): boolean => {
  if (!str) return false
  return str === str.toUpperCase()
}

export const isHexadecimal = (str: string): boolean => {
  if (!str) return false
  return /^[0-9a-fA-F]+$/.test(str)
}

export const isBase64 = (str: string): boolean => {
  if (!str) return false
  const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
  return base64Regex.test(str)
}

export const isJSON = (str: string): boolean => {
  if (!str) return false
  
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

export const hasUppercase = (str: string): boolean => {
  if (!str) return false
  return /[A-Z]/.test(str)
}

export const hasLowercase = (str: string): boolean => {
  if (!str) return false
  return /[a-z]/.test(str)
}

export const hasNumbers = (str: string): boolean => {
  if (!str) return false
  return /\d/.test(str)
}

export const hasSpecialChars = (str: string): boolean => {
  if (!str) return false
  return /[!@#$%^&*(),.?":{}|<>]/.test(str)
}

export const hasWhitespace = (str: string): boolean => {
  if (!str) return false
  return /\s/.test(str)
}

export const isLength = (str: string, min: number, max?: number): boolean => {
  if (!str) return false
  if (max !== undefined) return str.length >= min && str.length <= max
  return str.length >= min
}

export const isExactLength = (str: string, length: number): boolean => {
  if (!str) return false
  return str.length === length
}

// ============== Address Validators ==============

export const isZipCode = (zipCode: string, country: string = 'US'): boolean => {
  if (!zipCode) return false
  
  switch (country) {
    case 'US':
      return /^\d{5}(-\d{4})?$/.test(zipCode)
    case 'CA':
      return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(zipCode)
    case 'UK':
      return /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i.test(zipCode)
    case 'AU':
      return /^\d{4}$/.test(zipCode)
    case 'DE':
    case 'FR':
      return /^\d{5}$/.test(zipCode)
    default:
      return zipCode.length > 0
  }
}

export const isStateCode = (state: string, country: string = 'US'): boolean => {
  if (!state) return false
  
  switch (country) {
    case 'US':
      return /^[A-Z]{2}$/.test(state.toUpperCase())
    case 'CA':
      return /^[A-Z]{2}$/.test(state.toUpperCase())
    case 'AU':
      return /^(NSW|VIC|QLD|WA|SA|TAS|ACT|NT)$/i.test(state)
    default:
      return state.length >= 2
  }
}

// ============== ID Validators ==============

export const isUUID = (uuid: string): boolean => {
  if (!uuid) return false
  
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

export const isMongoId = (id: string): boolean => {
  if (!id) return false
  return /^[0-9a-fA-F]{24}$/.test(id)
}

export const isULID = (ulid: string): boolean => {
  if (!ulid) return false
  return /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/.test(ulid)
}

export const isCUID = (cuid: string): boolean => {
  if (!cuid) return false
  return /^c[^\s-]{8,}$/i.test(cuid)
}

export const isNanoId = (nanoId: string): boolean => {
  if (!nanoId) return false
  return /^[A-Za-z0-9_-]{21}$/.test(nanoId)
}

// ============== SKU Validators ==============

export const isSKU = (sku: string): boolean => {
  if (!sku) return false
  return /^[A-Z0-9-]+$/.test(sku.toUpperCase())
}

// ============== Product Validators ==============

export const isPrice = (price: number): boolean => {
  return isNumber(price) && price >= 0 && price <= 1000000
}

export const isQuantity = (quantity: number): boolean => {
  return isInteger(quantity) && quantity >= 0 && quantity <= 999999
}

export const isDiscount = (discount: number): boolean => {
  return isNumber(discount) && discount >= 0 && discount <= 100
}

export const isRating = (rating: number): boolean => {
  return isNumber(rating) && rating >= 0 && rating <= 5
}

// ============== Form Validators ==============

export const isRequired = (value: any): boolean => {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'object') return Object.keys(value).length > 0
  return true
}

export const isMinLength = (value: string, min: number): boolean => {
  if (!value) return false
  return value.length >= min
}

export const isMaxLength = (value: string, max: number): boolean => {
  if (!value) return true
  return value.length <= max
}

export const isMinValue = (value: number, min: number): boolean => {
  if (!isNumber(value)) return false
  return value >= min
}

export const isMaxValue = (value: number, max: number): boolean => {
  if (!isNumber(value)) return false
  return value <= max
}

export const isMatch = (value: any, matchValue: any): boolean => {
  return value === matchValue
}

export const isUnique = (value: any, existingValues: any[]): boolean => {
  return !existingValues.includes(value)
}

// ============== Schema Validator ==============

export const createValidator = (schema: ValidationSchema) => {
  return (data: Record<string, any>): ValidationResult => {
    const errors: string[] = []
    const fields: Record<string, string> = {}
    
    Object.keys(schema).forEach(field => {
      const rules = schema[field]
      const value = data[field]
      
      rules.forEach(rule => {
        if (!rule.validate(value)) {
          errors.push(rule.message)
          fields[field] = rule.message
        }
      })
    })
    
    return {
      isValid: errors.length === 0,
      errors,
      fields,
    }
  }
}

// ============== Common Validation Rules ==============

export const rules = {
  required: (field: string): ValidationRule => ({
    validate: (value: any) => isRequired(value),
    message: `${field} is required`,
  }),
  
  email: (): ValidationRule => ({
    validate: (value: string) => !value || isEmail(value),
    message: 'Please enter a valid email address',
  }),
  
  phone: (): ValidationRule => ({
    validate: (value: string) => !value || isPhone(value),
    message: 'Please enter a valid phone number',
  }),
  
  minLength: (field: string, min: number): ValidationRule => ({
    validate: (value: string) => !value || value.length >= min,
    message: `${field} must be at least ${min} characters`,
  }),
  
  maxLength: (field: string, max: number): ValidationRule => ({
    validate: (value: string) => !value || value.length <= max,
    message: `${field} must not exceed ${max} characters`,
  }),
  
  exactLength: (field: string, length: number): ValidationRule => ({
    validate: (value: string) => !value || value.length === length,
    message: `${field} must be exactly ${length} characters`,
  }),
  
  minValue: (field: string, min: number): ValidationRule => ({
    validate: (value: number) => !value || value >= min,
    message: `${field} must be at least ${min}`,
  }),
  
  maxValue: (field: string, max: number): ValidationRule => ({
    validate: (value: number) => !value || value <= max,
    message: `${field} must not exceed ${max}`,
  }),
  
  password: (): ValidationRule => ({
    validate: (value: string) => !value || isPasswordStrong(value),
    message: 'Password must be at least 8 characters and contain uppercase, lowercase, numbers, and special characters',
  }),
  
  match: (field: string, matchField: string): ValidationRule => ({
    validate: (value: any, data?: any) => value === data?.[matchField],
    message: `${field} does not match ${matchField}`,
  }),
  
  url: (): ValidationRule => ({
    validate: (value: string) => !value || isUrl(value),
    message: 'Please enter a valid URL',
  }),
  
  zipCode: (country: string = 'US'): ValidationRule => ({
    validate: (value: string) => !value || isZipCode(value, country),
    message: `Please enter a valid ${country} zip code`,
  }),
  
  creditCard: (): ValidationRule => ({
    validate: (value: string) => !value || isCreditCard(value),
    message: 'Please enter a valid credit card number',
  }),
  
  numeric: (field: string): ValidationRule => ({
    validate: (value: any) => !value || isNumeric(String(value)),
    message: `${field} must contain only numbers`,
  }),
  
  alphanumeric: (field: string): ValidationRule => ({
    validate: (value: string) => !value || isAlphanumeric(value),
    message: `${field} must contain only letters and numbers`,
  }),
}

// ============== Export ==============

export default {
  // Email
  isEmail,
  isBusinessEmail,
  isEducationalEmail,
  validateEmail,
  
  // Phone
  isPhone,
  isUSPhone,
  isInternationalPhone,
  validatePhone,
  
  // Password
  isPasswordStrong,
  isPasswordMedium,
  isPasswordWeak,
  getPasswordStrength,
  validatePassword,
  validatePasswordMatch,
  
  // URL
  isUrl,
  isSecureUrl,
  isAbsoluteUrl,
  isRelativeUrl,
  isImageUrl,
  isVideoUrl,
  isYouTubeUrl,
  isVimeoUrl,
  validateUrl,
  
  // Credit Card
  isCreditCard,
  isVisaCard,
  isMasterCard,
  isAmericanExpressCard,
  isDiscoverCard,
  detectCardType,
  isCvv,
  isExpiryDate,
  
  // Date
  isDate,
  isPastDate,
  isFutureDate,
  isToday,
  isWeekend,
  isWeekday,
  isLeapYear,
  isValidAge,
  
  // Number
  isNumber,
  isInteger,
  isPositive,
  isNegative,
  isNonNegative,
  isInRange,
  isEven,
  isOdd,
  isMultipleOf,
  isPrime,
  
  // String
  isAlphanumeric,
  isAlphabetic,
  isNumeric,
  isLowercase,
  isUppercase,
  isHexadecimal,
  isBase64,
  isJSON,
  hasUppercase,
  hasLowercase,
  hasNumbers,
  hasSpecialChars,
  hasWhitespace,
  isLength,
  isExactLength,
  
  // Address
  isZipCode,
  isStateCode,
  
  // ID
  isUUID,
  isMongoId,
  isULID,
  isCUID,
  isNanoId,
  
  // Product
  isSKU,
  isPrice,
  isQuantity,
  isDiscount,
  isRating,
  
  // Form
  isRequired,
  isMinLength,
  isMaxLength,
  isMinValue,
  isMaxValue,
  isMatch,
  isUnique,
  
  // Schema
  createValidator,
  rules,
}