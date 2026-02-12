'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CartItemProps {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  sku: string
  category: string
  material?: string
  weight?: number
  inStock: boolean
  maxQuantity?: number
  discount?: number
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
  onSaveForLater?: (id: string) => void
  isWishlist?: boolean
}

export default function CartItem({
  id,
  name,
  price,
  quantity,
  image,
  sku,
  category,
  material,
  weight,
  inStock,
  maxQuantity = 10,
  discount = 0,
  onUpdateQuantity,
  onRemove,
  onSaveForLater,
  isWishlist = false
}: CartItemProps) {
  const [isRemoving, setIsRemoving] = useState<boolean>(false)
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [localQuantity, setLocalQuantity] = useState<number>(quantity)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false)

  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price
  const totalPrice = discountedPrice * localQuantity
  const savings = discount > 0 ? (price - discountedPrice) * localQuantity : 0

  const handleQuantityChange = async (newQuantity: number): Promise<void> => {
    if (newQuantity < 1 || newQuantity > maxQuantity) return
    
    setLocalQuantity(newQuantity)
    setIsUpdating(true)
    
    try {
      await onUpdateQuantity(id, newQuantity)
    } catch (error) {
      // Revert on error
      setLocalQuantity(quantity)
      console.error('Failed to update quantity:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleRemove = async (): Promise<void> => {
    setIsRemoving(true)
    setShowDeleteConfirm(false)
    
    try {
      await onRemove(id)
    } catch (error) {
      console.error('Failed to remove item:', error)
      setIsRemoving(false)
    }
  }

  const handleSaveForLater = async (): Promise<void> => {
    if (onSaveForLater) {
      try {
        await onSaveForLater(id)
      } catch (error) {
        console.error('Failed to save item for later:', error)
      }
    }
  }

  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  return (
    <div 
      className={`
        relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-4 sm:p-6
        transition-all duration-500
        ${isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
        ${!inStock ? 'opacity-60' : ''}
        hover:border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-400/5
      `}
    >
      {/* Loading Overlay */}
      {isUpdating && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-white">Updating...</span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {/* Product Image */}
        <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
          <Link href={`/product/${id}`}>
            <div className="relative w-full h-full group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 128px"
              />
              {!inStock && (
                <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center">
                  <span className="text-red-400 text-xs font-semibold px-3 py-1.5 bg-red-400/20 rounded-full border border-red-400/30">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <Link 
                    href={`/product/${id}`}
                    className="inline-block group"
                  >
                    <h3 className="text-lg lg:text-xl font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
                      {name}
                    </h3>
                  </Link>
                  
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-400">
                      SKU: {sku}
                    </span>
                    <span className="text-xs px-2 py-1 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-full text-yellow-400">
                      {category}
                    </span>
                    {material && (
                      <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-400">
                        {material}
                      </span>
                    )}
                    {weight && (
                      <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-400">
                        {weight}g
                      </span>
                    )}
                  </div>

                  {/* Price Details */}
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-white">
                        {formatPrice(discountedPrice)}
                      </span>
                      {discount > 0 && (
                        <>
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(price)}
                          </span>
                          <span className="text-xs px-2 py-1 bg-green-400/20 text-green-400 rounded-full">
                            {discount}% OFF
                          </span>
                        </>
                      )}
                    </div>
                    {savings > 0 && (
                      <p className="text-xs text-green-400">
                        You save: {formatPrice(savings)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Mobile Actions */}
                <div className="flex items-center gap-2 lg:hidden">
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    aria-label="Remove item"
                    disabled={isRemoving}
                  >
                    <span className="text-xl">🗑️</span>
                  </button>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                <div className="flex items-center gap-3">
                  <label htmlFor={`quantity-${id}`} className="text-sm text-gray-400">
                    Qty:
                  </label>
                  <div className="flex items-center border border-white/10 rounded-xl bg-white/5">
                    <button
                      onClick={() => handleQuantityChange(localQuantity - 1)}
                      disabled={localQuantity <= 1 || isUpdating || !inStock}
                      className="w-10 h-10 flex items-center justify-center text-white hover:text-yellow-400 hover:bg-white/10 rounded-l-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      id={`quantity-${id}`}
                      type="number"
                      min="1"
                      max={maxQuantity}
                      value={localQuantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      disabled={isUpdating || !inStock}
                      className="w-16 h-10 text-center bg-transparent text-white font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none disabled:opacity-30"
                      aria-label="Item quantity"
                    />
                    <button
                      onClick={() => handleQuantityChange(localQuantity + 1)}
                      disabled={localQuantity >= maxQuantity || isUpdating || !inStock}
                      className="w-10 h-10 flex items-center justify-center text-white hover:text-yellow-400 hover:bg-white/10 rounded-r-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-gray-500">
                    max {maxQuantity}
                  </span>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-400">Total</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                    {formatPrice(totalPrice)}
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex lg:flex-col items-end gap-2">
              {!isWishlist && onSaveForLater && (
                <button
                  onClick={handleSaveForLater}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-xl transition-all duration-300"
                  disabled={isRemoving || !inStock}
                >
                  <span className="text-lg">💝</span>
                  <span>Save for later</span>
                </button>
              )}
              
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-300"
                disabled={isRemoving}
              >
                <span className="text-lg">🗑️</span>
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md rounded-2xl flex items-center justify-center z-20">
          <div className="text-center p-6 max-w-sm">
            <div className="text-5xl mb-4 animate-float">🗑️</div>
            <h4 className="text-xl font-bold text-white mb-2">Remove Item?</h4>
            <p className="text-gray-400 text-sm mb-6">
              Are you sure you want to remove {name} from your cart?
            </p>
            <div className="flex items-center gap-3 justify-center">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300"
                autoFocus
              >
                Cancel
              </button>
              <button
                onClick={handleRemove}
                disabled={isRemoving}
                className="px-6 py-2.5 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isRemoving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Removing...</span>
                  </>
                ) : (
                  <span>Remove</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stock Warning */}
      {inStock && localQuantity >= maxQuantity && (
        <div className="absolute bottom-2 right-2">
          <div className="flex items-center gap-1 px-3 py-1.5 bg-yellow-400/20 border border-yellow-400/30 rounded-full">
            <span className="text-xs text-yellow-400">⚠️</span>
            <span className="text-xs text-yellow-400">Max quantity reached</span>
          </div>
        </div>
      )}

      {/* Free Shipping Badge */}
      {totalPrice >= 100 && (
        <div className="absolute top-2 right-2">
          <div className="flex items-center gap-1 px-3 py-1.5 bg-green-400/20 border border-green-400/30 rounded-full">
            <span className="text-xs text-green-400">🚚</span>
            <span className="text-xs text-green-400">Free Shipping</span>
          </div>
        </div>
      )}
    </div>
  )
}