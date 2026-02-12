// File: src/app/product/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'

export default function ProductPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRange] = useState('All')

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // All Products Data
  const allProducts = [
    // Laptops
    { id: 1, name: 'MacBook Pro 16', price: '$2,499', image: 'n1.jpeg', category: 'Laptops' },
    { id: 2, name: 'MacBook Air M2', price: '$1,299', image: 'n2.jpeg', category: 'Laptops' },
    { id: 3, name: 'Gaming Laptop', price: '$1,999', image: 'n3.jpeg', category: 'Laptops' },
    { id: 4, name: 'Dell XPS 15', price: '$1,899', image: 'n4.jpeg', category: 'Laptops' },
    { id: 5, name: 'ROG Strix', price: '$2,299', image: 'n5.jpeg', category: 'Laptops' },
    
    // Gold
    { id: 6, name: '24K Gold Bar', price: '$3,999', image: 'g1.jpeg', category: 'Gold' },
    { id: 7, name: '22K Gold Coin', price: '$2,499', image: 'g2.jpeg', category: 'Gold' },
    { id: 8, name: 'Gold Biscuit', price: '$4,999', image: 'g3.jpeg', category: 'Gold' },
    
    // Jewelry
    { id: 9, name: 'Diamond Necklace', price: '$5,999', image: 'j1.jpeg', category: 'Jewelry' },
    { id: 10, name: 'Gold Ring', price: '$1,299', image: 'j2.jpeg', category: 'Jewelry' },
    { id: 11, name: 'Platinum Bracelet', price: '$3,499', image: 'j3.jpeg', category: 'Jewelry' },
    { id: 12, name: 'Diamond Earrings', price: '$2,999', image: 'j4.jpeg', category: 'Jewelry' },
    
    // Watches
    { id: 13, name: 'Rolex Submariner', price: '$8,999', image: 'w1.jpeg', category: 'Watches' },
    { id: 14, name: 'Omega Seamaster', price: '$5,999', image: 'w2.jpeg', category: 'Watches' },
    { id: 15, name: 'Tag Heuer', price: '$3,999', image: 'w3.jpeg', category: 'Watches' },
  ]

  // Categories Filter
  const categories = ['All', 'Laptops', 'Gold', 'Jewelry', 'Watches']
  
  // Price Ranges Filter
  const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under $1,000', min: 0, max: 1000 },
    { label: '$1,000 - $2,500', min: 1000, max: 2500 },
    { label: '$2,500 - $5,000', min: 2500, max: 5000 },
    { label: 'Above $5,000', min: 5000, max: Infinity },
  ]

  // Filter Products
  const filteredProducts = allProducts.filter(product => {
    // Category filter
    if (selectedCategory !== 'All' && product.category !== selectedCategory) {
      return false
    }
    
    // Price filter
    if (priceRange !== 'All') {
      const range = priceRanges.find(r => r.label === priceRange)
      if (range) {
        const price = parseInt(product.price.replace(/[$,]/g, ''))
        if (price < range.min || price > range.max) {
          return false
        }
      }
    }
    
    return true
  })

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated Background - Same as Main Page */}
      <div className="fixed inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-yellow-400/30 to-amber-600/30 rounded-full filter blur-3xl animate-pulse"
          style={{ left: `${mousePosition.x * 0.05}px`, top: `${mousePosition.y * 0.05}px` }}
        ></div>
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full filter blur-3xl animate-pulse-slow"
          style={{ right: `${mousePosition.x * 0.03}px`, bottom: `${mousePosition.y * 0.03}px` }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              Our Collection
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Discover premium laptops, gold, jewelry, and luxury watches
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-12 space-y-6">
          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-500/50'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Price Range Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {priceRanges.map((range) => (
              <button
                key={range.label}
                onClick={() => setPriceRange(range.label)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  priceRange === range.label
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center text-gray-400">
            <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent font-bold">
              {filteredProducts.length}
            </span> Products Found
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          // No Products Found
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Products Found</h3>
            <p className="text-gray-400">
              Try adjusting your filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All')
                setPriceRange('All')
              }}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-full hover:scale-105 transition-transform duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Back to Home Link */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-yellow-400 transition-colors duration-300 group"
          >
            <span className="mr-2 group-hover:-translate-x-2 transition-transform duration-300">←</span>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  )
}