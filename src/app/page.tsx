// File: src/app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import FeatureBox from '@/components/FeatureBox'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const features = [
    { title: 'Laptops', description: 'Premium & Gaming', icon: '💻', gradient: 'from-blue-400 to-cyan-500' },
    { title: 'Gold', description: '22K & 24K Pure', icon: '🥇', gradient: 'from-yellow-400 to-amber-500' },
    { title: 'Jewelry', description: 'Diamond & Platinum', icon: '💎', gradient: 'from-purple-400 to-pink-500' },
    { title: 'Watches', description: 'Luxury Collection', icon: '⌚', gradient: 'from-emerald-400 to-teal-500' },
  ]

  const products = [
    { id: 1, name: 'MacBook Pro', price: '$1999', image: 'n1.jpeg', category: 'Laptop' },
    { id: 2, name: 'Gold Necklace', price: '$2999', image: 'n2.jpeg', category: 'Jewelry' },
    { id: 3, name: 'Diamond Ring', price: '$3999', image: 'n3.jpeg', category: 'Jewelry' },
    { id: 4, name: 'Gaming Laptop', price: '$2499', image: 'n4.jpeg', category: 'Laptop' },
    { id: 5, name: 'Gold Bracelet', price: '$1599', image: 'n5.jpeg', category: 'Jewelry' },
  ]

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="container mx-auto text-center">
          {/* Animated Text */}
          <div className="relative perspective-1000">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 transform-style-3d animate-float">
              <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                Hafiz Sajid Syed
              </span>
            </h1>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 filter blur-3xl"></div>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 relative">
                <span className="neon-text">Laptop, Gold & Jewelry</span> - Since 1995
              </p>
            </div>
          </div>

          {/* 3D Button */}
          <div className="relative inline-block group perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full filter blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Link
              href="/products"
              className="relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-full text-lg transform-style-3d group-hover:rotate-x-10 transition-all duration-500 hover:scale-110 hover:shadow-2xl"
            >
              <span className="relative z-10">Explore Collection</span>
              <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
              Our Premium Collections
            </span>
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {features.map((feature, index) => (
              <FeatureBox key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
              Featured Products
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { number: '25+', label: 'Years Experience' },
              { number: '10k+', label: 'Happy Customers' },
              { number: '500+', label: 'Products' },
              { number: '50+', label: 'Gold Designs' },
            ].map((stat, index) => (
              <div
                key={index}
                className="glass-effect rounded-2xl p-6 text-center transform hover:scale-110 transition-all duration-500 hover:shadow-2xl"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}