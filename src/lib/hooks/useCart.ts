'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'

// ============== Types ==============

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  sku: string
  category?: string
  maxQuantity?: number
  discount?: number
  inStock: boolean
}

export interface CartSummary {
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  itemCount: number
  uniqueItemCount: number
}

export interface CartState {
  items: CartItem[]
  isLoading: boolean
  isInitialized: boolean
  error: string | null
  lastUpdated: number | null
}

export interface CartCoupon {
  code: string
  discount: number
  type: 'percentage' | 'fixed'
  minOrder?: number
}

export interface UseCartReturn {
  // State
  items: CartItem[]
  summary: CartSummary
  isLoading: boolean
  isInitialized: boolean
  error: string | null
  
  // Cart actions
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  removeItem: (productId: string) => Promise<void>
  clearCart: () => Promise<void>
  
  // Bulk actions
  addItems: (items: Array<Omit<CartItem, 'quantity'>>) => Promise<void>
  removeItems: (productIds: string[]) => Promise<void>
  
  // Coupon
  applyCoupon: (code: string) => Promise<boolean>
  removeCoupon: () => void
  activeCoupon: CartCoupon | null
  
  // Helpers
  isInCart: (productId: string) => boolean
  getItemQuantity: (productId: string) => number
  hasItems: boolean
  isEmpty: boolean
  
  // Sync
  refreshCart: () => Promise<void>
  clearError: () => void
}

// ============== Constants ==============

const STORAGE_KEYS = {
  CART: 'cart_items',
  COUPON: 'cart_coupon',
  EXPIRY: 'cart_expiry',
} as const

const CART_EXPIRY_DAYS = 7
const FREE_SHIPPING_THRESHOLD = 100
const SHIPPING_RATE = 10
const TAX_RATE = 0.08 // 8%

// ============== Utility Functions ==============

const calculateSummary = (items: CartItem[], coupon: CartCoupon | null): CartSummary => {
  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.discount 
      ? item.price * (1 - item.discount / 100) 
      : item.price
    return sum + itemPrice * item.quantity
  }, 0)

  let discount = 0
  if (coupon) {
    if (coupon.type === 'percentage') {
      discount = subtotal * (coupon.discount / 100)
    } else {
      discount = coupon.discount
    }
  }

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE
  const tax = (subtotal - discount) * TAX_RATE
  const total = subtotal - discount + shipping + tax

  return {
    subtotal: Number(subtotal.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    total: Number(total.toFixed(2)),
    itemCount: items.reduce((count, item) => count + item.quantity, 0),
    uniqueItemCount: items.length,
  }
}

// ============== Main Hook ==============

export default function useCart(): UseCartReturn {
  const router = useRouter()
  
  const [state, setState] = useState<CartState>({
    items: [],
    isLoading: true,
    isInitialized: false,
    error: null,
    lastUpdated: null,
  })

  const [activeCoupon, setActiveCoupon] = useState<CartCoupon | null>(null)

  // ============== Storage Helpers ==============

  const loadCartFromStorage = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CART)
      const expiry = localStorage.getItem(STORAGE_KEYS.EXPIRY)
      const storedCoupon = localStorage.getItem(STORAGE_KEYS.COUPON)

      // Check expiry
      if (expiry && Date.now() > parseInt(expiry)) {
        localStorage.removeItem(STORAGE_KEYS.CART)
        localStorage.removeItem(STORAGE_KEYS.COUPON)
        localStorage.removeItem(STORAGE_KEYS.EXPIRY)
        return { items: [], coupon: null }
      }

      const items = stored ? JSON.parse(stored) as CartItem[] : []
      const coupon = storedCoupon ? JSON.parse(storedCoupon) as CartCoupon : null

      return { items, coupon }
    } catch {
      return { items: [], coupon: null }
    }
  }, [])

  const saveCartToStorage = useCallback((items: CartItem[], coupon: CartCoupon | null) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items))
      localStorage.setItem(STORAGE_KEYS.EXPIRY, (Date.now() + CART_EXPIRY_DAYS * 24 * 60 * 60 * 1000).toString())
      
      if (coupon) {
        localStorage.setItem(STORAGE_KEYS.COUPON, JSON.stringify(coupon))
      } else {
        localStorage.removeItem(STORAGE_KEYS.COUPON)
      }
    } catch (error) {
      console.error('Failed to save cart:', error)
    }
  }, [])

  const clearCartStorage = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CART)
      localStorage.removeItem(STORAGE_KEYS.COUPON)
      localStorage.removeItem(STORAGE_KEYS.EXPIRY)
    } catch (error) {
      console.error('Failed to clear cart:', error)
    }
  }, [])

  // ============== Initialize ==============

  useEffect(() => {
    const initialize = () => {
      const { items, coupon } = loadCartFromStorage()
      
      setState({
        items,
        isLoading: false,
        isInitialized: true,
        error: null,
        lastUpdated: Date.now(),
      })

      setActiveCoupon(coupon)
    }

    initialize()
  }, [loadCartFromStorage])

  // ============== Cart Summary ==============

  const summary = useMemo(() => 
    calculateSummary(state.items, activeCoupon),
    [state.items, activeCoupon]
  )

  const hasItems = state.items.length > 0
  const isEmpty = !hasItems

  // ============== API Sync ==============

  const syncCartWithServer = useCallback(async (items: CartItem[]) => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) return

      await fetch('/api/cart/sync', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      })
    } catch (error) {
      console.error('Failed to sync cart:', error)
    }
  }, [])

  // ============== Cart Actions ==============

  const addItem = useCallback(async (
    item: Omit<CartItem, 'quantity'>, 
    quantity: number = 1
  ): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      if (!item.inStock) {
        throw new Error('Item is out of stock')
      }

      setState(prev => {
        const existingItem = prev.items.find(i => i.productId === item.productId)
        
        let updatedItems: CartItem[]
        
        if (existingItem) {
          const newQuantity = existingItem.quantity + quantity
          const maxQuantity = existingItem.maxQuantity || 10
          
          if (newQuantity > maxQuantity) {
            throw new Error(`Maximum quantity is ${maxQuantity}`)
          }

          updatedItems = prev.items.map(i =>
            i.productId === item.productId
              ? { ...i, quantity: newQuantity }
              : i
          )
        } else {
          const newItem: CartItem = {
            ...item,
            quantity: Math.min(quantity, item.maxQuantity || 10),
          }
          updatedItems = [...prev.items, newItem]
        }

        saveCartToStorage(updatedItems, activeCoupon)
        syncCartWithServer(updatedItems)

        return {
          ...prev,
          items: updatedItems,
          isLoading: false,
          lastUpdated: Date.now(),
        }
      })
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to add item',
      }))
    }
  }, [activeCoupon, saveCartToStorage, syncCartWithServer])

  const updateQuantity = useCallback(async (
    productId: string, 
    quantity: number
  ): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      if (quantity < 1) {
        throw new Error('Quantity must be at least 1')
      }

      setState(prev => {
        const item = prev.items.find(i => i.productId === productId)
        
        if (!item) {
          throw new Error('Item not found in cart')
        }

        const maxQuantity = item.maxQuantity || 10
        
        if (quantity > maxQuantity) {
          throw new Error(`Maximum quantity is ${maxQuantity}`)
        }

        const updatedItems = prev.items.map(i =>
          i.productId === productId ? { ...i, quantity } : i
        )

        saveCartToStorage(updatedItems, activeCoupon)
        syncCartWithServer(updatedItems)

        return {
          ...prev,
          items: updatedItems,
          isLoading: false,
          lastUpdated: Date.now(),
        }
      })
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to update quantity',
      }))
    }
  }, [activeCoupon, saveCartToStorage, syncCartWithServer])

  const removeItem = useCallback(async (productId: string): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      setState(prev => {
        const updatedItems = prev.items.filter(i => i.productId !== productId)
        
        saveCartToStorage(updatedItems, activeCoupon)
        syncCartWithServer(updatedItems)

        return {
          ...prev,
          items: updatedItems,
          isLoading: false,
          lastUpdated: Date.now(),
        }
      })
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to remove item',
      }))
    }
  }, [activeCoupon, saveCartToStorage, syncCartWithServer])

  const clearCart = useCallback(async (): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      clearCartStorage()
      setActiveCoupon(null)
      
      setState({
        items: [],
        isLoading: false,
        isInitialized: true,
        error: null,
        lastUpdated: Date.now(),
      })

      await syncCartWithServer([])
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to clear cart',
      }))
    }
  }, [clearCartStorage, syncCartWithServer])

  // ============== Bulk Actions ==============

  const addItems = useCallback(async (
    newItems: Array<Omit<CartItem, 'quantity'>>
  ): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      setState(prev => {
        let updatedItems = [...prev.items]

        newItems.forEach(item => {
          const existingIndex = updatedItems.findIndex(i => i.productId === item.productId)
          
          if (existingIndex >= 0) {
            const existing = updatedItems[existingIndex]
            const maxQuantity = existing.maxQuantity || 10
            const newQuantity = existing.quantity + 1
            
            if (newQuantity <= maxQuantity) {
              updatedItems[existingIndex] = {
                ...existing,
                quantity: newQuantity,
              }
            }
          } else if (item.inStock) {
            updatedItems.push({
              ...item,
              quantity: 1,
            })
          }
        })

        saveCartToStorage(updatedItems, activeCoupon)
        syncCartWithServer(updatedItems)

        return {
          ...prev,
          items: updatedItems,
          isLoading: false,
          lastUpdated: Date.now(),
        }
      })
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to add items',
      }))
    }
  }, [activeCoupon, saveCartToStorage, syncCartWithServer])

  const removeItems = useCallback(async (productIds: string[]): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      setState(prev => {
        const updatedItems = prev.items.filter(i => !productIds.includes(i.productId))
        
        saveCartToStorage(updatedItems, activeCoupon)
        syncCartWithServer(updatedItems)

        return {
          ...prev,
          items: updatedItems,
          isLoading: false,
          lastUpdated: Date.now(),
        }
      })
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to remove items',
      }))
    }
  }, [activeCoupon, saveCartToStorage, syncCartWithServer])

  // ============== Coupon Actions ==============

  const applyCoupon = useCallback(async (code: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await fetch(`/api/coupons/validate?code=${code}`)
      
      if (!response.ok) {
        throw new Error('Invalid coupon code')
      }

      const coupon = await response.json() as CartCoupon

      if (coupon.minOrder && summary.subtotal < coupon.minOrder) {
        throw new Error(`Minimum order of $${coupon.minOrder} required`)
      }

      setActiveCoupon(coupon)
      saveCartToStorage(state.items, coupon)

      setState(prev => ({
        ...prev,
        isLoading: false,
        lastUpdated: Date.now(),
      }))

      return true
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to apply coupon',
      }))
      return false
    }
  }, [state.items, summary.subtotal, saveCartToStorage])

  const removeCoupon = useCallback(() => {
    setActiveCoupon(null)
    saveCartToStorage(state.items, null)
    setState(prev => ({
      ...prev,
      lastUpdated: Date.now(),
    }))
  }, [state.items, saveCartToStorage])

  // ============== Helpers ==============

  const isInCart = useCallback((productId: string): boolean => {
    return state.items.some(item => item.productId === productId)
  }, [state.items])

  const getItemQuantity = useCallback((productId: string): number => {
    return state.items.find(item => item.productId === productId)?.quantity || 0
  }, [state.items])

  const refreshCart = useCallback(async (): Promise<void> => {
    const { items, coupon } = loadCartFromStorage()
    
    setState({
      items,
      isLoading: false,
      isInitialized: true,
      error: null,
      lastUpdated: Date.now(),
    })

    setActiveCoupon(coupon)
  }, [loadCartFromStorage])

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  // ============== Return ==============

  return {
    // State
    items: state.items,
    summary,
    isLoading: state.isLoading,
    isInitialized: state.isInitialized,
    error: state.error,

    // Cart actions
    addItem,
    updateQuantity,
    removeItem,
    clearCart,

    // Bulk actions
    addItems,
    removeItems,

    // Coupon
    applyCoupon,
    removeCoupon,
    activeCoupon,

    // Helpers
    isInCart,
    getItemQuantity,
    hasItems,
    isEmpty,

    // Sync
    refreshCart,
    clearError,
  }
}

// ============== Cart Summary Hook ==============

export const useCartSummary = () => {
  const { summary, items, activeCoupon } = useCart()
  
  const shippingProgress = useMemo(() => {
    const progress = (summary.subtotal / FREE_SHIPPING_THRESHOLD) * 100
    return Math.min(progress, 100)
  }, [summary.subtotal])

  const savings = useMemo(() => {
    const regularTotal = items.reduce((sum, item) => 
      sum + item.price * item.quantity, 0
    )
    return Number((regularTotal - summary.subtotal).toFixed(2))
  }, [items, summary.subtotal])

  return {
    ...summary,
    shippingProgress,
    savings,
    hasCoupon: !!activeCoupon,
    freeShippingEligible: summary.subtotal >= FREE_SHIPPING_THRESHOLD,
    shippingNeeded: FREE_SHIPPING_THRESHOLD - summary.subtotal,
  }
}

// ============== Cart Item Hook ==============

export const useCartItem = (productId: string) => {
  const { items, updateQuantity, removeItem, isInCart, getItemQuantity } = useCart()
  
  const item = useMemo(() => 
    items.find(i => i.productId === productId),
    [items, productId]
  )

  const quantity = getItemQuantity(productId)
  const inCart = isInCart(productId)

  const increase = useCallback(() => {
    if (item) {
      updateQuantity(productId, item.quantity + 1)
    }
  }, [item, productId, updateQuantity])

  const decrease = useCallback(() => {
    if (item && item.quantity > 1) {
      updateQuantity(productId, item.quantity - 1)
    }
  }, [item, productId, updateQuantity])

  const remove = useCallback(() => {
    removeItem(productId)
  }, [productId, removeItem])

  return {
    item,
    quantity,
    inCart,
    increase,
    decrease,
    remove,
  }
}