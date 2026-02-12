// File: src/components/ProductCard.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface Product {
  id: number
  name: string
  price: string
  image: string
  category: string
}

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden transform-style-3d transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 z-10 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Category Badge */}
          <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/70 backdrop-blur-md text-yellow-400 text-xs font-semibold rounded-full border border-yellow-400/30">
            {product.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-1 truncate">
            {product.name}
          </h3>
          <p className="text-yellow-400 font-bold text-xl mb-3">
            {product.price}
          </p>
          
          <Link
            href={`/product/${product.id}`}
            className="relative block overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <button className="relative w-full px-4 py-2 bg-white/10 group-hover:bg-transparent text-white group-hover:text-black font-semibold rounded-lg border border-yellow-400/50 transition-all duration-300">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard