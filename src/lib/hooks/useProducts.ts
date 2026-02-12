'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'

// ============== Types ==============

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription?: string
  price: number
  compareAtPrice?: number
  cost?: number
  category: string
  categoryId: string
  subcategory?: string
  subcategoryId?: string
  images: ProductImage[]
  thumbnail: string
  sku: string
  barcode?: string
  inventory: ProductInventory
  attributes: ProductAttribute[]
  variants?: ProductVariant[]
  tags: string[]
  collections?: string[]
  rating: number
  reviewCount: number
  isNew: boolean
  isFeatured: boolean
  isOnSale: boolean
  discount?: number
  discountType?: 'percentage' | 'fixed'
  createdAt: string
  updatedAt: string
  seo?: ProductSEO
}

export interface ProductImage {
  id: string
  url: string
  alt?: string
  isPrimary: boolean
  sortOrder: number
}

export interface ProductInventory {
  quantity: number
  lowStockThreshold: number
  isInStock: boolean
  isBackorderable: boolean
  preorder?: boolean
  preorderDate?: string
}

export interface ProductAttribute {
  name: string
  value: string
  displayName?: string
  group?: string
}

export interface ProductVariant {
  id: string
  name: string
  sku: string
  price: number
  compareAtPrice?: number
  inventory: ProductInventory
  attributes: ProductAttribute[]
  image?: string
}

export interface ProductSEO {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
}

export interface ProductFilter {
  id: string
  name: string
  type: 'category' | 'price' | 'rating' | 'attribute' | 'tag' | 'collection'
  options?: ProductFilterOption[]
  min?: number
  max?: number
}

export interface ProductFilterOption {
  id: string
  label: string
  value: string
  count: number
}

export interface ProductSortOption {
  id: string
  label: string
  field: string
  direction: 'asc' | 'desc'
}

export interface ProductFilters {
  categories?: string[]
  subcategories?: string[]
  collections?: string[]
  tags?: string[]
  priceMin?: number
  priceMax?: number
  rating?: number
  attributes?: Record<string, string[]>
  isOnSale?: boolean
  isNew?: boolean
  inStock?: boolean
  search?: string
}

export interface ProductsState {
  items: Product[]
  featured: Product[]
  newArrivals: Product[]
  onSale: Product[]
  currentProduct: Product | null
  relatedProducts: Product[]
  recentlyViewed: Product[]
  wishlist: Product[]
  compare: Product[]
  
  filters: ProductFilters
  activeFilters: ProductFilters
  availableFilters: ProductFilter[]
  sortBy: string
  sortDirection: 'asc' | 'desc'
  
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  
  isLoading: boolean
  isLoadingMore: boolean
  isInitialized: boolean
  error: string | null
}

export interface UseProductsReturn {
  // State
  items: Product[]
  featured: Product[]
  newArrivals: Product[]
  onSale: Product[]
  currentProduct: Product | null
  relatedProducts: Product[]
  recentlyViewed: Product[]
  wishlist: Product[]
  compare: Product[]
  
  filters: ProductFilters
  activeFilters: ProductFilters
  availableFilters: ProductFilter[]
  sortBy: string
  sortDirection: 'asc' | 'desc'
  
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  
  isLoading: boolean
  isLoadingMore: boolean
  isInitialized: boolean
  error: string | null
  
  // Product actions
  fetchProducts: (params?: FetchProductsParams) => Promise<void>
  fetchMore: () => Promise<void>
  fetchProductById: (id: string) => Promise<Product | null>
  fetchProductBySlug: (slug: string) => Promise<Product | null>
  fetchRelatedProducts: (productId: string, limit?: number) => Promise<void>
  
  // Filter actions
  setFilter: <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => void
  removeFilter: <K extends keyof ProductFilters>(key: K) => void
  clearFilters: () => void
  applyFilters: () => Promise<void>
  
  // Sort actions
  setSortBy: (field: string) => void
  setSortDirection: (direction: 'asc' | 'desc') => void
  toggleSortDirection: () => void
  
  // Pagination
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  
  // Collections
  fetchCategory: (categoryId: string, params?: FetchProductsParams) => Promise<void>
  fetchCollection: (collectionId: string, params?: FetchProductsParams) => Promise<void>
  
  // User actions
  addToRecentlyViewed: (product: Product) => void
  addToWishlist: (productId: string) => Promise<void>
  removeFromWishlist: (productId: string) => Promise<void>
  toggleWishlist: (productId: string) => Promise<boolean>
  isInWishlist: (productId: string) => boolean
  
  addToCompare: (product: Product) => void
  removeFromCompare: (productId: string) => void
  clearCompare: () => void
  
  // Helpers
  getProductById: (id: string) => Product | undefined
  getProductBySlug: (slug: string) => Product | undefined
  refreshProduct: (id: string) => Promise<void>
  clearError: () => void
  reset: () => void
}

export interface FetchProductsParams {
  page?: number
  limit?: number
  filters?: ProductFilters
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
  search?: string
  category?: string
  collection?: string
}

// ============== Constants ==============

const STORAGE_KEYS = {
  RECENTLY_VIEWED: 'recently_viewed',
  WISHLIST: 'wishlist',
  COMPARE: 'compare',
} as const

const DEFAULT_LIMIT = 20
const MAX_RECENTLY_VIEWED = 10
const MAX_COMPARE = 4

const SORT_OPTIONS: ProductSortOption[] = [
  { id: 'price_asc', label: 'Price: Low to High', field: 'price', direction: 'asc' },
  { id: 'price_desc', label: 'Price: High to Low', field: 'price', direction: 'desc' },
  { id: 'newest', label: 'Newest', field: 'createdAt', direction: 'desc' },
  { id: 'rating', label: 'Top Rated', field: 'rating', direction: 'desc' },
  { id: 'popular', label: 'Most Popular', field: 'reviewCount', direction: 'desc' },
  { id: 'name_asc', label: 'Name: A to Z', field: 'name', direction: 'asc' },
  { id: 'name_desc', label: 'Name: Z to A', field: 'name', direction: 'desc' },
]

// ============== Utility Functions ==============

const calculateDiscount = (product: Product): number => {
  if (!product.compareAtPrice || product.compareAtPrice <= product.price) return 0
  return Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
}

const isProductOnSale = (product: Product): boolean => {
  return !!product.compareAtPrice && product.compareAtPrice > product.price
}

const isProductLowStock = (product: Product): boolean => {
  return product.inventory.quantity <= product.inventory.lowStockThreshold
}

// ============== Main Hook ==============

export default function useProducts(initialParams?: FetchProductsParams): UseProductsReturn {
  const [state, setState] = useState<ProductsState>({
    items: [],
    featured: [],
    newArrivals: [],
    onSale: [],
    currentProduct: null,
    relatedProducts: [],
    recentlyViewed: [],
    wishlist: [],
    compare: [],
    
    filters: {},
    activeFilters: {},
    availableFilters: [],
    sortBy: initialParams?.sortBy || 'createdAt',
    sortDirection: initialParams?.sortDirection || 'desc',
    
    page: initialParams?.page || 1,
    limit: initialParams?.limit || DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
    
    isLoading: true,
    isLoadingMore: false,
    isInitialized: false,
    error: null,
  })

  // ============== Storage Helpers ==============

  const loadRecentlyViewed = useCallback((): Product[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }, [])

  const saveRecentlyViewed = useCallback((products: Product[]) => {
    try {
      const recent = products.slice(0, MAX_RECENTLY_VIEWED)
      localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(recent))
    } catch (error) {
      console.error('Failed to save recently viewed:', error)
    }
  }, [])

  const loadWishlist = useCallback((): Product[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.WISHLIST)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }, [])

  const saveWishlist = useCallback((products: Product[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(products))
    } catch (error) {
      console.error('Failed to save wishlist:', error)
    }
  }, [])

  const loadCompare = useCallback((): Product[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.COMPARE)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }, [])

  const saveCompare = useCallback((products: Product[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify(products))
    } catch (error) {
      console.error('Failed to save compare:', error)
    }
  }, [])

  // ============== Initialize ==============

  useEffect(() => {
    const initialize = async () => {
      setState(prev => ({ ...prev, isLoading: true }))

      try {
        const recentlyViewed = loadRecentlyViewed()
        const wishlist = loadWishlist()
        const compare = loadCompare()

        setState(prev => ({
          ...prev,
          recentlyViewed,
          wishlist,
          compare,
          isLoading: false,
          isInitialized: true,
        }))

        // Fetch initial products
        await fetchProducts(initialParams)
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          isInitialized: true,
          error: 'Failed to initialize products',
        }))
      }
    }

    initialize()
  }, [])

  // ============== API Calls ==============

  const fetchProducts = useCallback(async (params?: FetchProductsParams): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const queryParams = new URLSearchParams()

      // Pagination
      queryParams.set('page', String(params?.page || state.page))
      queryParams.set('limit', String(params?.limit || state.limit))

      // Sorting
      queryParams.set('sortBy', params?.sortBy || state.sortBy)
      queryParams.set('sortDirection', params?.sortDirection || state.sortDirection)

      // Filters
      const filters = params?.filters || state.activeFilters
      
      if (filters.categories?.length) {
        filters.categories.forEach(cat => queryParams.append('category', cat))
      }
      
      if (filters.priceMin) {
        queryParams.set('priceMin', String(filters.priceMin))
      }
      
      if (filters.priceMax) {
        queryParams.set('priceMax', String(filters.priceMax))
      }
      
      if (filters.rating) {
        queryParams.set('rating', String(filters.rating))
      }
      
      if (filters.isOnSale) {
        queryParams.set('isOnSale', 'true')
      }
      
      if (filters.isNew) {
        queryParams.set('isNew', 'true')
      }
      
      if (filters.inStock) {
        queryParams.set('inStock', 'true')
      }
      
      if (filters.search) {
        queryParams.set('search', filters.search)
      }

      if (params?.category) {
        queryParams.set('category', params.category)
      }

      if (params?.collection) {
        queryParams.set('collection', params.collection)
      }

      const response = await fetch(`/api/products?${queryParams.toString()}`)

      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()

      setState(prev => ({
        ...prev,
        items: data.products || [],
        total: data.total || 0,
        totalPages: data.totalPages || 0,
        hasNextPage: data.hasNextPage || false,
        hasPrevPage: data.hasPrevPage || false,
        isLoading: false,
        error: null,
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch products',
      }))
    }
  }, [state.page, state.limit, state.sortBy, state.sortDirection, state.activeFilters])

  const fetchMore = useCallback(async (): Promise<void> => {
    if (!state.hasNextPage || state.isLoadingMore) return

    setState(prev => ({ ...prev, isLoadingMore: true }))

    try {
      const nextPage = state.page + 1
      
      const response = await fetch(`/api/products?page=${nextPage}&limit=${state.limit}`)

      if (!response.ok) {
        throw new Error('Failed to fetch more products')
      }

      const data = await response.json()

      setState(prev => ({
        ...prev,
        items: [...prev.items, ...(data.products || [])],
        page: nextPage,
        hasNextPage: data.hasNextPage || false,
        isLoadingMore: false,
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoadingMore: false,
        error: error instanceof Error ? error.message : 'Failed to fetch more products',
      }))
    }
  }, [state.hasNextPage, state.isLoadingMore, state.page, state.limit])

  const fetchProductById = useCallback(async (id: string): Promise<Product | null> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await fetch(`/api/products/${id}`)

      if (!response.ok) {
        throw new Error('Failed to fetch product')
      }

      const product = await response.json()

      setState(prev => ({
        ...prev,
        currentProduct: product,
        isLoading: false,
      }))

      return product
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch product',
      }))
      return null
    }
  }, [])

  const fetchProductBySlug = useCallback(async (slug: string): Promise<Product | null> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await fetch(`/api/products/slug/${slug}`)

      if (!response.ok) {
        throw new Error('Failed to fetch product')
      }

      const product = await response.json()

      setState(prev => ({
        ...prev,
        currentProduct: product,
        isLoading: false,
      }))

      return product
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch product',
      }))
      return null
    }
  }, [])

  const fetchRelatedProducts = useCallback(async (productId: string, limit: number = 4): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await fetch(`/api/products/${productId}/related?limit=${limit}`)

      if (!response.ok) {
        throw new Error('Failed to fetch related products')
      }

      const products = await response.json()

      setState(prev => ({
        ...prev,
        relatedProducts: products,
        isLoading: false,
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch related products',
      }))
    }
  }, [])

  const fetchCategory = useCallback(async (categoryId: string, params?: FetchProductsParams): Promise<void> => {
    await fetchProducts({
      ...params,
      category: categoryId,
    })
  }, [fetchProducts])

  const fetchCollection = useCallback(async (collectionId: string, params?: FetchProductsParams): Promise<void> => {
    await fetchProducts({
      ...params,
      collection: collectionId,
    })
  }, [fetchProducts])

  const refreshProduct = useCallback(async (id: string): Promise<void> => {
    const product = await fetchProductById(id)
    
    if (product) {
      setState(prev => ({
        ...prev,
        items: prev.items.map(p => p.id === id ? product : p),
      }))
    }
  }, [fetchProductById])

  // ============== Filter Actions ==============

  const setFilter = useCallback(<K extends keyof ProductFilters>(
    key: K, 
    value: ProductFilters[K]
  ) => {
    setState(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [key]: value,
      },
    }))
  }, [])

  const removeFilter = useCallback(<K extends keyof ProductFilters>(key: K) => {
    setState(prev => {
      const newFilters = { ...prev.filters }
      delete newFilters[key]
      return { ...prev, filters: newFilters }
    })
  }, [])

  const clearFilters = useCallback(() => {
    setState(prev => ({
      ...prev,
      filters: {},
      activeFilters: {},
      page: 1,
    }))
  }, [])

  const applyFilters = useCallback(async () => {
    setState(prev => ({
      ...prev,
      activeFilters: prev.filters,
      page: 1,
    }))

    await fetchProducts({
      filters: state.filters,
      page: 1,
    })
  }, [state.filters, fetchProducts])

  // ============== Sort Actions ==============

  const setSortBy = useCallback((field: string) => {
    setState(prev => ({ ...prev, sortBy: field, page: 1 }))
  }, [])

  const setSortDirection = useCallback((direction: 'asc' | 'desc') => {
    setState(prev => ({ ...prev, sortDirection: direction, page: 1 }))
  }, [])

  const toggleSortDirection = useCallback(() => {
    setState(prev => ({
      ...prev,
      sortDirection: prev.sortDirection === 'asc' ? 'desc' : 'asc',
      page: 1,
    }))
  }, [])

  // ============== Pagination ==============

  const setPage = useCallback((page: number) => {
    setState(prev => ({ ...prev, page }))
  }, [])

  const setLimit = useCallback((limit: number) => {
    setState(prev => ({ ...prev, limit, page: 1 }))
  }, [])

  // ============== User Actions ==============

  const addToRecentlyViewed = useCallback((product: Product) => {
    setState(prev => {
      const filtered = prev.recentlyViewed.filter(p => p.id !== product.id)
      const updated = [product, ...filtered].slice(0, MAX_RECENTLY_VIEWED)
      
      saveRecentlyViewed(updated)
      
      return { ...prev, recentlyViewed: updated }
    })
  }, [saveRecentlyViewed])

  const addToWishlist = useCallback(async (productId: string): Promise<void> => {
    try {
      const token = localStorage.getItem('auth_token')
      
      if (token) {
        await fetch('/api/wishlist', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId }),
        })
      }

      setState(prev => {
        const product = prev.items.find(p => p.id === productId) || prev.currentProduct
        if (!product) return prev

        const updated = [...prev.wishlist, product]
        saveWishlist(updated)
        
        return { ...prev, wishlist: updated }
      })
    } catch (error) {
      console.error('Failed to add to wishlist:', error)
    }
  }, [saveWishlist])

  const removeFromWishlist = useCallback(async (productId: string): Promise<void> => {
    try {
      const token = localStorage.getItem('auth_token')
      
      if (token) {
        await fetch('/api/wishlist', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId }),
        })
      }

      setState(prev => {
        const updated = prev.wishlist.filter(p => p.id !== productId)
        saveWishlist(updated)
        
        return { ...prev, wishlist: updated }
      })
    } catch (error) {
      console.error('Failed to remove from wishlist:', error)
    }
  }, [saveWishlist])

  const toggleWishlist = useCallback(async (productId: string): Promise<boolean> => {
    const isInWishlist = state.wishlist.some(p => p.id === productId)
    
    if (isInWishlist) {
      await removeFromWishlist(productId)
      return false
    } else {
      await addToWishlist(productId)
      return true
    }
  }, [state.wishlist, addToWishlist, removeFromWishlist])

  const isInWishlist = useCallback((productId: string): boolean => {
    return state.wishlist.some(p => p.id === productId)
  }, [state.wishlist])

  const addToCompare = useCallback((product: Product) => {
    setState(prev => {
      if (prev.compare.length >= MAX_COMPARE) {
        return prev
      }

      if (prev.compare.some(p => p.id === product.id)) {
        return prev
      }

      const updated = [...prev.compare, product]
      saveCompare(updated)
      
      return { ...prev, compare: updated }
    })
  }, [saveCompare])

  const removeFromCompare = useCallback((productId: string) => {
    setState(prev => {
      const updated = prev.compare.filter(p => p.id !== productId)
      saveCompare(updated)
      
      return { ...prev, compare: updated }
    })
  }, [saveCompare])

  const clearCompare = useCallback(() => {
    setState(prev => {
      saveCompare([])
      return { ...prev, compare: [] }
    })
  }, [saveCompare])

  // ============== Helpers ==============

  const getProductById = useCallback((id: string): Product | undefined => {
    return state.items.find(p => p.id === id) || state.currentProduct || undefined
  }, [state.items, state.currentProduct])

  const getProductBySlug = useCallback((slug: string): Product | undefined => {
    return state.items.find(p => p.slug === slug) || state.currentProduct || undefined
  }, [state.items, state.currentProduct])

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  const reset = useCallback(() => {
    setState(prev => ({
      ...prev,
      items: [],
      currentProduct: null,
      relatedProducts: [],
      filters: {},
      activeFilters: {},
      page: 1,
      limit: DEFAULT_LIMIT,
      total: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
      isLoading: false,
      error: null,
    }))
  }, [])

  // ============== Computed Properties ==============

  const featured = useMemo(() => 
    state.items.filter(p => p.isFeatured),
    [state.items]
  )

  const newArrivals = useMemo(() => 
    state.items.filter(p => p.isNew),
    [state.items]
  )

  const onSale = useMemo(() => 
    state.items.filter(p => p.isOnSale || isProductOnSale(p)),
    [state.items]
  )

  // ============== Return ==============

  return {
    // State
    items: state.items,
    featured,
    newArrivals,
    onSale,
    currentProduct: state.currentProduct,
    relatedProducts: state.relatedProducts,
    recentlyViewed: state.recentlyViewed,
    wishlist: state.wishlist,
    compare: state.compare,
    
    filters: state.filters,
    activeFilters: state.activeFilters,
    availableFilters: state.availableFilters,
    sortBy: state.sortBy,
    sortDirection: state.sortDirection,
    
    page: state.page,
    limit: state.limit,
    total: state.total,
    totalPages: state.totalPages,
    hasNextPage: state.hasNextPage,
    hasPrevPage: state.hasPrevPage,
    
    isLoading: state.isLoading,
    isLoadingMore: state.isLoadingMore,
    isInitialized: state.isInitialized,
    error: state.error,
    
    // Product actions
    fetchProducts,
    fetchMore,
    fetchProductById,
    fetchProductBySlug,
    fetchRelatedProducts,
    
    // Filter actions
    setFilter,
    removeFilter,
    clearFilters,
    applyFilters,
    
    // Sort actions
    setSortBy,
    setSortDirection,
    toggleSortDirection,
    
    // Pagination
    setPage,
    setLimit,
    
    // Collections
    fetchCategory,
    fetchCollection,
    
    // User actions
    addToRecentlyViewed,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    addToCompare,
    removeFromCompare,
    clearCompare,
    
    // Helpers
    getProductById,
    getProductBySlug,
    refreshProduct,
    clearError,
    reset,
  }
}

// ============== Product Detail Hook ==============

export const useProduct = (slugOrId: string) => {
  const {
    currentProduct,
    fetchProductBySlug,
    fetchProductById,
    relatedProducts,
    fetchRelatedProducts,
    addToRecentlyViewed,
    isLoading,
    error,
  } = useProducts()

  useEffect(() => {
    const loadProduct = async () => {
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slugOrId)
      
      const product = isUUID
        ? await fetchProductById(slugOrId)
        : await fetchProductBySlug(slugOrId)

      if (product) {
        addToRecentlyViewed(product)
        await fetchRelatedProducts(product.id)
      }
    }

    loadProduct()
  }, [slugOrId])

  return {
    product: currentProduct,
    relatedProducts,
    isLoading,
    error,
  }
}

// ============== Category Products Hook ==============

export const useCategoryProducts = (categoryId: string, initialParams?: FetchProductsParams) => {
  const {
    items,
    fetchCategory,
    isLoading,
    hasNextPage,
    fetchMore,
    ...rest
  } = useProducts()

  useEffect(() => {
    fetchCategory(categoryId, initialParams)
  }, [categoryId])

  return {
    products: items,
    isLoading,
    hasMore: hasNextPage,
    loadMore: fetchMore,
    ...rest,
  }
}

// ============== Wishlist Hook ==============

export const useWishlist = () => {
  const { wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist } = useProducts()

  const isWishlisted = useCallback((productId: string) => {
    return isInWishlist(productId)
  }, [isInWishlist])

  const toggle = useCallback((productId: string) => {
    return toggleWishlist(productId)
  }, [toggleWishlist])

  return {
    items: wishlist,
    count: wishlist.length,
    isEmpty: wishlist.length === 0,
    add: addToWishlist,
    remove: removeFromWishlist,
    toggle,
    isWishlisted,
  }
}

// ============== Compare Hook ==============

export const useCompare = () => {
  const { compare, addToCompare, removeFromCompare, clearCompare } = useProducts()

  return {
    items: compare,
    count: compare.length,
    isEmpty: compare.length === 0,
    isFull: compare.length >= MAX_COMPARE,
    maxItems: MAX_COMPARE,
    add: addToCompare,
    remove: removeFromCompare,
    clear: clearCompare,
  }
}