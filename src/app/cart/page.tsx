// File: src/app/cart/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'MacBook Pro 16"',
      price: 2499,
      quantity: 1,
      image: '/images/n1.jpeg',
      category: 'Laptops',
      stock: 15,
      sku: 'MBP-16-2024',
      maxQuantity: 15
    },
    {
      id: 2,
      name: '22K Gold Necklace',
      price: 2999,
      quantity: 1,
      image: '/images/n2.jpeg',
      category: 'Gold',
      stock: 8,
      sku: 'GLD-NCK-22K',
      maxQuantity: 8
    },
    {
      id: 5,
      name: 'Gold Bracelet',
      price: 1599,
      quantity: 2,
      image: '/images/n5.jpeg',
      category: 'Gold',
      stock: 20,
      sku: 'GLD-BRC-22K',
      maxQuantity: 20
    }
  ])

  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [shippingMethod, setShippingMethod] = useState('standard')
  const [giftWrap, setGiftWrap] = useState(false)
  const [insurance, setInsurance] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [couponError, setCouponError] = useState('')
  const [couponSuccess, setCouponSuccess] = useState('')

  // Calculate cart totals
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  
  const shippingCosts = {
    standard: 10,
    express: 25,
    overnight: 50
  }
  
  const shipping = shippingMethod ? shippingCosts[shippingMethod as keyof typeof shippingCosts] : 0
  const giftWrapCost = giftWrap ? 5 : 0
  const insuranceCost = insurance ? subtotal * 0.02 : 0
  const tax = subtotal * 0.1
  const discount = promoApplied ? subtotal * 0.1 : 0
  const total = subtotal + shipping + giftWrapCost + insuranceCost + tax - discount

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    const item = cartItems.find(item => item.id === id)
    if (item && newQuantity > item.maxQuantity) {
      alert(`Only ${item.maxQuantity} items available in stock`)
      return
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const clearCart = () => {
    if (cartItems.length > 0) {
      if (window.confirm('Are you sure you want to clear your cart?')) {
        setCartItems([])
      }
    }
  }

  const applyPromoCode = () => {
    setCouponError('')
    setCouponSuccess('')
    
    if (promoCode.toLowerCase() === 'hafiz10') {
      setPromoApplied(true)
      setPromoDiscount(subtotal * 0.1)
      setCouponSuccess('Promo code applied successfully! You saved 10%')
    } else if (promoCode.toLowerCase() === 'welcome20') {
      setPromoApplied(true)
      setPromoDiscount(subtotal * 0.2)
      setCouponSuccess('Promo code applied successfully! You saved 20%')
    } else if (promoCode.toLowerCase() === 'freeship') {
      setPromoApplied(true)
      setShippingMethod('standard')
      setCouponSuccess('Promo code applied successfully! Free shipping')
    } else {
      setCouponError('Invalid promo code. Please try again.')
      setPromoApplied(false)
      setPromoDiscount(0)
    }
  }

  const removePromoCode = () => {
    setPromoApplied(false)
    setPromoDiscount(0)
    setPromoCode('')
    setCouponSuccess('')
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    setTimeout(() => {
      window.location.href = '/checkout'
    }, 1000)
  }

  if (cartItems.length === 0) {
    return (
      <div className="relative min-h-screen py-20 px-4">
        {/* Animated Background */}
        <div className="fixed inset-0 bg-black">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            {/* Empty Cart Animation */}
            <div className="relative perspective-1000 mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-amber-500/30 rounded-full filter blur-3xl animate-pulse"></div>
              <div className="relative text-8xl md:text-9xl animate-float">
                🛒
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
                Your Cart is Empty
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8">
              Looks like you haven't added any items to your cart yet.
              <br />
              Explore our premium collection of laptops, gold, and jewelry.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-full text-lg transform hover:scale-110 transition-all duration-500 hover:shadow-2xl"
              >
                <span>Continue Shopping</span>
                <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
              </Link>

              <Link
                href="/products?category=featured"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full text-lg border border-white/20 hover:bg-white/20 transform hover:scale-110 transition-all duration-500"
              >
                <span>View Featured</span>
                <span className="ml-2">✨</span>
              </Link>
            </div>

            {/* Popular Categories */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-6">Popular Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Laptops', icon: '💻', color: 'from-blue-400 to-cyan-500' },
                  { name: 'Gold', icon: '🥇', color: 'from-yellow-400 to-amber-500' },
                  { name: 'Diamonds', icon: '💎', color: 'from-purple-400 to-pink-500' },
                  { name: 'Watches', icon: '⌚', color: 'from-emerald-400 to-teal-500' }
                ].map((category, index) => (
                  <Link
                    key={index}
                    href={`/products?category=${category.name.toLowerCase()}`}
                    className="glass-effect p-6 rounded-2xl transform hover:scale-105 transition-all duration-500 group"
                  >
                    <div className={`text-4xl mb-3 group-hover:scale-110 transition-transform duration-500`}>
                      {category.icon}
                    </div>
                    <h3 className="text-white font-semibold">{category.name}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen py-20 px-4">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
                Shopping Cart
              </span>
            </h1>
            <p className="text-gray-400">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link
              href="/products"
              className="text-yellow-400 hover:text-yellow-500 transition-colors flex items-center space-x-2"
            >
              <span>←</span>
              <span>Continue Shopping</span>
            </Link>
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-red-400 hover:text-red-500 transition-colors flex items-center space-x-2"
              >
                <span>🗑️</span>
                <span>Clear Cart</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="glass-effect rounded-2xl p-4 transform hover:scale-102 transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="relative w-full sm:w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl opacity-30">📷</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <span className="absolute top-1 left-1 px-2 py-0.5 bg-black/70 text-yellow-400 text-xs rounded-full">
                      {item.category}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">SKU: {item.sku}</p>
                        
                        {/* Stock Status */}
                        <p className="text-xs mt-2">
                          {item.quantity >= item.stock ? (
                            <span className="text-red-400">Max stock reached</span>
                          ) : (
                            <span className="text-green-400">{item.stock} available</span>
                          )}
                        </p>
                      </div>

                      <div className="text-right mt-2 sm:mt-0">
                        <p className="text-2xl font-bold text-yellow-400">${item.price}</p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-400">${item.price * item.quantity} total</p>
                        )}
                      </div>
                    </div>

                    {/* Quantity and Actions */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                        <label className="text-sm text-gray-400">Qty:</label>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 rounded-lg bg-white/5 text-white hover:bg-yellow-400 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:text-white transition-all duration-300"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-white font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className="w-8 h-8 rounded-lg bg-white/5 text-white hover:bg-yellow-400 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:text-white transition-all duration-300"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-400 hover:text-red-500 transition-colors text-sm flex items-center space-x-1"
                        >
                          <span>🗑️</span>
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                        <button className="text-gray-400 hover:text-yellow-400 transition-colors text-sm flex items-center space-x-1">
                          <span>❤️</span>
                          <span className="hidden sm:inline">Save</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Free Shipping Progress */}
            <div className="glass-effect rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">Free Shipping Progress</span>
                <span className="text-yellow-400 font-bold">
                  ${subtotal >= 5000 ? 'Eligible!' : `$${5000 - subtotal} more`}
                </span>
              </div>
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((subtotal / 5000) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {subtotal >= 5000 
                  ? '🎉 You qualify for free shipping!' 
                  : 'Add $5,000 worth of items to get free shipping'}
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-2xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Promo Code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 text-white placeholder-gray-500 transition-all duration-300"
                    disabled={promoApplied}
                  />
                  {!promoApplied ? (
                    <button
                      onClick={applyPromoCode}
                      className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold rounded-xl hover:scale-105 transition-all duration-300"
                    >
                      Apply
                    </button>
                  ) : (
                    <button
                      onClick={removePromoCode}
                      className="px-6 py-3 bg-red-500/20 text-red-400 font-semibold rounded-xl hover:bg-red-500/30 transition-all duration-300"
                    >
                      Remove
                    </button>
                  )}
                </div>
                {couponError && (
                  <p className="text-red-400 text-xs mt-2">{couponError}</p>
                )}
                {couponSuccess && (
                  <p className="text-green-400 text-xs mt-2">{couponSuccess}</p>
                )}
              </div>

              {/* Shipping Options */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Shipping Method
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'standard', name: 'Standard Shipping', price: 10, days: '5-7' },
                    { id: 'express', name: 'Express Shipping', price: 25, days: '2-3' },
                    { id: 'overnight', name: 'Overnight Shipping', price: 50, days: '1' }
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                        shippingMethod === method.id
                          ? 'border-yellow-400 bg-yellow-400/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={method.id}
                          checked={shippingMethod === method.id}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="w-4 h-4 text-yellow-400 border-white/20 bg-white/5 focus:ring-yellow-400"
                        />
                        <div>
                          <span className="text-white text-sm">{method.name}</span>
                          <p className="text-xs text-gray-400">{method.days} business days</p>
                        </div>
                      </div>
                      <span className="text-yellow-400 font-semibold">
                        ${method.price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div className="mb-6 space-y-3">
                <label className="flex items-center justify-between p-3 rounded-xl border border-white/10 cursor-pointer hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={giftWrap}
                      onChange={(e) => setGiftWrap(e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-yellow-400 focus:ring-yellow-400"
                    />
                    <span className="text-white text-sm">Gift Wrap</span>
                  </div>
                  <span className="text-gray-400">$5</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-white/10 cursor-pointer hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={insurance}
                      onChange={(e) => setInsurance(e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-yellow-400 focus:ring-yellow-400"
                    />
                    <span className="text-white text-sm">Purchase Protection</span>
                  </div>
                  <span className="text-gray-400">2%</span>
                </label>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>${shipping}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Gift Wrap</span>
                  <span>${giftWrapCost}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Insurance</span>
                  <span>${insuranceCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                <span className="text-lg font-semibold text-white">Total</span>
                <span className="text-3xl font-bold text-yellow-400">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full mt-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-xl transform hover:scale-105 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                <span className="relative flex items-center justify-center space-x-2">
                  {isCheckingOut ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Proceed to Checkout</span>
                      <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </>
                  )}
                </span>
              </button>

              {/* Payment Methods */}
              <div className="mt-6">
                <p className="text-xs text-gray-400 text-center mb-3">
                  We accept
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <span className="text-2xl opacity-50 hover:opacity-100 transition-opacity">💳</span>
                  <span className="text-2xl opacity-50 hover:opacity-100 transition-opacity">📱</span>
                  <span className="text-2xl opacity-50 hover:opacity-100 transition-opacity">🏦</span>
                  <span className="text-2xl opacity-50 hover:opacity-100 transition-opacity">💰</span>
                </div>
              </div>

              {/* Secure Checkout */}
              <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
                <span>🔒</span>
                <span>Secure checkout</span>
                <span>•</span>
                <span>SSL encrypted</span>
              </div>
            </div>
          </div>
        </div>

        {/* You Might Also Like */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
              You Might Also Like
            </span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 3, name: 'Diamond Ring', price: 3999, image: '/images/n3.jpeg', category: 'Diamond' },
              { id: 4, name: 'ROG Gaming Laptop', price: 2199, image: '/images/n4.jpeg', category: 'Laptops' },
              { id: 6, name: 'Platinum Watch', price: 5999, image: '/images/n1.jpeg', category: 'Watches' },
              { id: 7, name: 'Diamond Earrings', price: 2799, image: '/images/n2.jpeg', category: 'Diamond' }
            ].map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="glass-effect p-4 rounded-2xl transform hover:scale-105 transition-all duration-500 group"
              >
                <div className="relative h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl mb-3 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl opacity-30">📷</span>
                  </div>
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 text-yellow-400 text-xs rounded-full">
                    {product.category}
                  </span>
                </div>
                <h3 className="text-white font-semibold group-hover:text-yellow-400 transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-yellow-400 font-bold mt-1">${product.price}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $5,000' },
            { icon: '🔄', title: '30-Day Returns', desc: 'Hassle-free returns' },
            { icon: '✅', title: '1 Year Warranty', desc: 'On all products' },
            { icon: '🔒', title: 'Secure Payment', desc: '256-bit SSL' }
          ].map((badge, index) => (
            <div key={index} className="text-center p-4">
              <span className="text-3xl mb-2 block">{badge.icon}</span>
              <h3 className="text-white font-semibold text-sm">{badge.title}</h3>
              <p className="text-xs text-gray-400 mt-1">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}