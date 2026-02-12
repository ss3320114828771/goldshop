// ============== Types ==============

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  sku: string
  categoryId?: string
  maxQuantity?: number
  minQuantity?: number
  discount?: number
  discountType?: 'percentage' | 'fixed'
  inStock: boolean
  weight?: number
}

export interface CartCoupon {
  id: string
  code: string
  discount: number
  type: 'percentage' | 'fixed' | 'free_shipping'
  minOrder?: number
  maxDiscount?: number
  validFrom?: string
  validUntil?: string
  applicableCategories?: string[]
  applicableProducts?: string[]
  excludedProducts?: string[]
  usageLimit?: number
  usedCount?: number
}

export interface CartShipping {
  methodId: string
  methodName: string
  carrier: string
  price: number
  estimatedDays: string
  isFree: boolean
}

export interface CartState {
  items: CartItem[]
  coupon: CartCoupon | null
  shipping: CartShipping | null
  notes: string
  lastUpdated: number
}

export interface CartTotals {
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
}

export interface CartSummary extends CartTotals {
  itemCount: number
  uniqueItemCount: number
  freeShippingEligible: boolean
  freeShippingProgress: number
}

// ============== Constants ==============

export const CART_CONSTANTS = {
  VERSION: '1.0.0',
  EXPIRY_DAYS: 7,
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 10,
  TAX_RATE: 0.08,
  FREE_SHIPPING_THRESHOLD: 100,
  STANDARD_SHIPPING: 10,
  CURRENCY: 'USD',
  LOCALE: 'en-US',
} as const

export const STORAGE_KEY = 'cart_state'

// ============== Calculator ==============

export const CartCalculator = {
  itemPrice(item: CartItem): number {
    if (!item.discount) return Number(item.price.toFixed(2))
    
    const price = item.discountType === 'percentage'
      ? item.price * (1 - item.discount / 100)
      : item.price - item.discount
    
    return Number(Math.max(0, price).toFixed(2))
  },

  itemTotal(item: CartItem): number {
    return Number((this.itemPrice(item) * item.quantity).toFixed(2))
  },

  subtotal(items: CartItem[]): number {
    return Number(
      items
        .reduce((sum, item) => sum + this.itemTotal(item), 0)
        .toFixed(2)
    )
  },

  productDiscount(items: CartItem[]): number {
    return Number(
      items
        .reduce((sum, item) => {
          if (!item.discount) return sum
          const original = item.price * item.quantity
          const discounted = this.itemTotal(item)
          return sum + (original - discounted)
        }, 0)
        .toFixed(2)
    )
  },

  couponDiscount(subtotal: number, coupon: CartCoupon | null): number {
    if (!coupon || coupon.type === 'free_shipping') return 0
    
    let discount = coupon.type === 'percentage'
      ? subtotal * (coupon.discount / 100)
      : coupon.discount
    
    if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount)
    
    return Number(Math.max(0, discount).toFixed(2))
  },

  shipping(subtotal: number, coupon: CartCoupon | null, shipping?: CartShipping | null): number {
    if (coupon?.type === 'free_shipping') return 0
    if (subtotal >= CART_CONSTANTS.FREE_SHIPPING_THRESHOLD) return 0
    return shipping?.price || CART_CONSTANTS.STANDARD_SHIPPING
  },

  tax(subtotal: number, discount: number): number {
    return Number(((subtotal - discount) * CART_CONSTANTS.TAX_RATE).toFixed(2))
  },

  weight(items: CartItem[]): number {
    return Number(
      items
        .reduce((sum, item) => sum + (item.weight || 0) * item.quantity, 0)
        .toFixed(2)
    )
  },

  freeShippingProgress(subtotal: number): number {
    if (subtotal >= CART_CONSTANTS.FREE_SHIPPING_THRESHOLD) return 100
    return Number(((subtotal / CART_CONSTANTS.FREE_SHIPPING_THRESHOLD) * 100).toFixed(0))
  },

  totals(items: CartItem[], coupon?: CartCoupon | null, shipping?: CartShipping | null): CartTotals {
    const subtotal = this.subtotal(items)
    const productDiscount = this.productDiscount(items)
    const couponDiscount = this.couponDiscount(subtotal, coupon || null)
    const shippingPrice = this.shipping(subtotal, coupon || null, shipping || null)
    
    const totalDiscount = productDiscount + couponDiscount
    const tax = this.tax(subtotal, totalDiscount)
    const total = subtotal - totalDiscount + shippingPrice + tax

    return {
      subtotal: Number(subtotal.toFixed(2)),
      discount: Number(totalDiscount.toFixed(2)),
      shipping: Number(shippingPrice.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      total: Number(total.toFixed(2)),
    }
  },

  summary(items: CartItem[], coupon?: CartCoupon | null, shipping?: CartShipping | null): CartSummary {
    const totals = this.totals(items, coupon, shipping)
    const progress = this.freeShippingProgress(totals.subtotal)

    return {
      ...totals,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      uniqueItemCount: items.length,
      freeShippingEligible: totals.subtotal >= CART_CONSTANTS.FREE_SHIPPING_THRESHOLD || 
                          coupon?.type === 'free_shipping',
      freeShippingProgress: progress,
    }
  }
}

// ============== Validator ==============

export const CartValidator = {
  validateItem(
    item: Omit<CartItem, 'quantity'>,
    quantity: number
  ): string | null {
    if (!item.inStock) return `${item.name} is out of stock`
    
    const min = item.minQuantity || CART_CONSTANTS.MIN_QUANTITY
    const max = item.maxQuantity || CART_CONSTANTS.MAX_QUANTITY
    
    if (quantity < min) return `Minimum quantity is ${min}`
    if (quantity > max) return `Maximum quantity is ${max}`
    if (!Number.isInteger(quantity)) return 'Quantity must be a whole number'
    
    return null
  },

  validateQuantity(quantity: number): boolean {
    return quantity >= CART_CONSTANTS.MIN_QUANTITY && 
           quantity <= CART_CONSTANTS.MAX_QUANTITY && 
           Number.isInteger(quantity)
  }
}

// ============== Cart Manager ==============

export const CartManager = {
  mergeItems(existing: CartItem[], newItems: CartItem[]): CartItem[] {
    const merged = [...existing]

    for (const newItem of newItems) {
      const index = merged.findIndex(item => item.productId === newItem.productId)
      
      if (index >= 0) {
        const current = merged[index]
        const max = current.maxQuantity || CART_CONSTANTS.MAX_QUANTITY
        merged[index] = {
          ...current,
          quantity: Math.min(current.quantity + newItem.quantity, max),
        }
      } else {
        merged.push({ ...newItem })
      }
    }

    return merged
  },

  updateQuantity(items: CartItem[], productId: string, quantity: number): CartItem[] {
    return items.map(item =>
      item.productId === productId
        ? { ...item, quantity: Math.max(0, quantity) }
        : item
    )
  },

  removeItem(items: CartItem[], productId: string): CartItem[] {
    return items.filter(item => item.productId !== productId)
  },

  clear(): CartItem[] {
    return []
  }
}

// ============== Coupon Validator ==============

export const CouponValidator = {
  validate(
    coupon: CartCoupon,
    subtotal: number
  ): { valid: boolean; error?: string } {
    if (coupon.minOrder && subtotal < coupon.minOrder) {
      return { valid: false, error: `Minimum order of $${coupon.minOrder} required` }
    }
    
    if (coupon.validFrom && new Date(coupon.validFrom) > new Date()) {
      return { valid: false, error: 'Coupon is not yet active' }
    }
    
    if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) {
      return { valid: false, error: 'Coupon has expired' }
    }
    
    if (coupon.usageLimit && coupon.usedCount && coupon.usedCount >= coupon.usageLimit) {
      return { valid: false, error: 'Coupon usage limit reached' }
    }
    
    return { valid: true }
  }
}

// ============== Storage ==============

export const CartStorage = {
  isAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
  },

  save(state: CartState): void {
    if (!this.isAvailable()) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (error) {
      console.error('Failed to save cart:', error)
    }
  },

  load(): CartState | null {
    if (!this.isAvailable()) return null
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      return data ? JSON.parse(data) : null
    } catch {
      return null
    }
  },

  clear(): void {
    if (!this.isAvailable()) return
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Failed to clear cart:', error)
    }
  }
}

// ============== Formatter ==============

export const CartFormatter = {
  price(amount: number): string {
    return new Intl.NumberFormat(CART_CONSTANTS.LOCALE, {
      style: 'currency',
      currency: CART_CONSTANTS.CURRENCY,
    }).format(amount)
  },

  quantity(quantity: number): string {
    return new Intl.NumberFormat().format(quantity)
  },

  freeShipping(progress: number): string {
    if (progress >= 100) {
      return 'You qualify for free shipping!'
    }
    const remaining = CART_CONSTANTS.FREE_SHIPPING_THRESHOLD * (1 - progress / 100)
    return `Add ${this.price(remaining)} more for free shipping`
  }
}

// ============== Cart Class ==============

export class Cart {
  private _items: CartItem[] = []
  private _coupon: CartCoupon | null = null
  private _shipping: CartShipping | null = null
  private _notes: string = ''

  constructor(initialState?: Partial<CartState>) {
    const saved = CartStorage.load()
    if (saved) {
      this._items = saved.items || []
      this._coupon = saved.coupon || null
      this._shipping = saved.shipping || null
      this._notes = saved.notes || ''
    }
    
    if (initialState?.items) this._items = initialState.items
    if (initialState?.coupon !== undefined) this._coupon = initialState.coupon
    if (initialState?.shipping !== undefined) this._shipping = initialState.shipping
    if (initialState?.notes !== undefined) this._notes = initialState.notes
  }

  // Getters
  get items(): CartItem[] {
    return [...this._items]
  }

  get coupon(): CartCoupon | null {
    return this._coupon ? { ...this._coupon } : null
  }

  get shipping(): CartShipping | null {
    return this._shipping ? { ...this._shipping } : null
  }

  get notes(): string {
    return this._notes
  }

  get state(): CartState {
    return {
      items: this.items,
      coupon: this.coupon,
      shipping: this.shipping,
      notes: this._notes,
      lastUpdated: Date.now(),
    }
  }

  get summary(): CartSummary {
    return CartCalculator.summary(this._items, this._coupon, this._shipping)
  }

  get totalItems(): number {
    return this._items.reduce((sum, item) => sum + item.quantity, 0)
  }

  get isEmpty(): boolean {
    return this._items.length === 0
  }

  // Actions
  addItem(item: Omit<CartItem, 'quantity'>, quantity = 1): this {
    const error = CartValidator.validateItem(item, quantity)
    if (error) throw new Error(error)

    const existing = this._items.find(i => i.productId === item.productId)
    
    if (existing) {
      const max = existing.maxQuantity || CART_CONSTANTS.MAX_QUANTITY
      const newQuantity = existing.quantity + quantity
      
      if (newQuantity > max) {
        throw new Error(`Maximum quantity is ${max}`)
      }
      
      existing.quantity = newQuantity
    } else {
      this._items.push({
        ...item,
        id: this.generateId(),
        quantity: Math.min(quantity, item.maxQuantity || CART_CONSTANTS.MAX_QUANTITY),
      })
    }

    this.save()
    return this
  }

  updateQuantity(productId: string, quantity: number): this {
    const item = this._items.find(i => i.productId === productId)
    if (!item) throw new Error('Item not found')

    if (!CartValidator.validateQuantity(quantity)) {
      throw new Error(`Quantity must be between ${CART_CONSTANTS.MIN_QUANTITY} and ${CART_CONSTANTS.MAX_QUANTITY}`)
    }

    item.quantity = quantity
    this.save()
    return this
  }

  removeItem(productId: string): this {
    this._items = this._items.filter(i => i.productId !== productId)
    this.save()
    return this
  }

  clear(): this {
    this._items = []
    this._coupon = null
    this._shipping = null
    this._notes = ''
    CartStorage.clear()
    return this
  }

  applyCoupon(coupon: CartCoupon): this {
    const subtotal = CartCalculator.subtotal(this._items)
    const validation = CouponValidator.validate(coupon, subtotal)
    
    if (!validation.valid) {
      throw new Error(validation.error || 'Invalid coupon')
    }

    this._coupon = coupon
    this.save()
    return this
  }

  removeCoupon(): this {
    this._coupon = null
    this.save()
    return this
  }

  setShipping(shipping: CartShipping): this {
    this._shipping = shipping
    this.save()
    return this
  }

  setNotes(notes: string): this {
    this._notes = notes
    this.save()
    return this
  }

  // Helpers
  isInCart(productId: string): boolean {
    return this._items.some(item => item.productId === productId)
  }

  getQuantity(productId: string): number {
    return this._items.find(item => item.productId === productId)?.quantity || 0
  }

  private save(): void {
    CartStorage.save(this.state)
  }

  private generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  }
}

// ============== Singleton ==============

let cartInstance: Cart | null = null

export const getCart = (): Cart => {
  if (!cartInstance) {
    cartInstance = new Cart()
  }
  return cartInstance
}

export const resetCart = (): void => {
  cartInstance = null
}

// ============== React Hook ==============

import { useState, useEffect, useCallback } from 'react'

export const useCart = () => {
  const [cart] = useState(() => getCart())
  const [summary, setSummary] = useState<CartSummary>(cart.summary)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setSummary(cart.summary)
  }, [cart])

  const refresh = useCallback(() => {
    setSummary(cart.summary)
  }, [cart])

  const addItem = useCallback(async (item: Omit<CartItem, 'quantity'>, quantity?: number) => {
    setIsLoading(true)
    try {
      cart.addItem(item, quantity)
      refresh()
    } finally {
      setIsLoading(false)
    }
  }, [cart, refresh])

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    setIsLoading(true)
    try {
      cart.updateQuantity(productId, quantity)
      refresh()
    } finally {
      setIsLoading(false)
    }
  }, [cart, refresh])

  const removeItem = useCallback(async (productId: string) => {
    setIsLoading(true)
    try {
      cart.removeItem(productId)
      refresh()
    } finally {
      setIsLoading(false)
    }
  }, [cart, refresh])

  const clearCart = useCallback(async () => {
    setIsLoading(true)
    try {
      cart.clear()
      refresh()
    } finally {
      setIsLoading(false)
    }
  }, [cart, refresh])

  const applyCoupon = useCallback(async (coupon: CartCoupon) => {
    setIsLoading(true)
    try {
      cart.applyCoupon(coupon)
      refresh()
    } finally {
      setIsLoading(false)
    }
  }, [cart, refresh])

  const removeCoupon = useCallback(async () => {
    setIsLoading(true)
    try {
      cart.removeCoupon()
      refresh()
    } finally {
      setIsLoading(false)
    }
  }, [cart, refresh])

  const setShipping = useCallback(async (shipping: CartShipping) => {
    setIsLoading(true)
    try {
      cart.setShipping(shipping)
      refresh()
    } finally {
      setIsLoading(false)
    }
  }, [cart, refresh])

  const setNotes = useCallback(async (notes: string) => {
    setIsLoading(true)
    try {
      cart.setNotes(notes)
      refresh()
    } finally {
      setIsLoading(false)
    }
  }, [cart, refresh])

  return {
    cart,
    items: cart.items,
    summary,
    isLoading,
    totalItems: cart.totalItems,
    isEmpty: cart.isEmpty,
    isInCart: cart.isInCart.bind(cart),
    getQuantity: cart.getQuantity.bind(cart),
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    removeCoupon,
    setShipping,
    setNotes,
    refresh,
    formatPrice: CartFormatter.price,
    formatFreeShipping: CartFormatter.freeShipping,
  }
}

// ============== Default Export ==============

export default {
  Cart,
  getCart,
  useCart,
  CartCalculator,
  CartValidator,
  CartManager,
  CartStorage,
  CartFormatter,
  CART_CONSTANTS,
}