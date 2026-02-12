// File: src/app/directions/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DirectionsPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Animated Background - Same as homepage */}
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

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              How to Reach Us
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Visit our flagship store in the heart of the city
          </p>
        </div>

        {/* Store Location Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Main Store */}
          <div className="glass-effect rounded-3xl p-8 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
            <div className="text-5xl mb-4">🏬</div>
            <h2 className="text-2xl font-bold text-white mb-3">Main Showroom</h2>
            <div className="space-y-3 text-gray-300">
              <p className="flex items-start gap-3">
                <span className="text-yellow-400">📍</span>
                123 Business Avenue, Saddar, Rawalpindi
              </p>
              <p className="flex items-start gap-3">
                <span className="text-yellow-400">🕐</span>
                Mon-Sat: 11:00 AM - 9:00 PM<br />
                Sunday: 4:00 PM - 9:00 PM
              </p>
              <p className="flex items-start gap-3">
                <span className="text-yellow-400">📞</span>
                +92 300 1234567
              </p>
            </div>
          </div>

          {/* Branch Store */}
          <div className="glass-effect rounded-3xl p-8 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
            <div className="text-5xl mb-4">🏪</div>
            <h2 className="text-2xl font-bold text-white mb-3">City Branch</h2>
            <div className="space-y-3 text-gray-300">
              <p className="flex items-start gap-3">
                <span className="text-yellow-400">📍</span>
                456 Main Boulevard, DHA Phase 2, Islamabad
              </p>
              <p className="flex items-start gap-3">
                <span className="text-yellow-400">🕐</span>
                Mon-Sun: 12:00 PM - 10:00 PM
              </p>
              <p className="flex items-start gap-3">
                <span className="text-yellow-400">📞</span>
                +92 300 7654321
              </p>
            </div>
          </div>
        </div>

        {/* Contact & Map Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Contact Info */}
          <div className="glass-effect rounded-3xl p-8 md:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-300">
                <span className="text-2xl text-yellow-400">📧</span>
                <span>info@hafizsajidsyed.com</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <span className="text-2xl text-yellow-400">🌐</span>
                <span>www.hafizsajidsyed.com</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <span className="text-2xl text-yellow-400">📱</span>
                <span>+92 300 1112223</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="text-white font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-4">
                <span className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center text-2xl hover:bg-yellow-400 hover:text-black transition-all duration-300 cursor-pointer">📘</span>
                <span className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center text-2xl hover:bg-yellow-400 hover:text-black transition-all duration-300 cursor-pointer">📸</span>
                <span className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center text-2xl hover:bg-yellow-400 hover:text-black transition-all duration-300 cursor-pointer">🎵</span>
              </div>
            </div>
          </div>

          {/* Map/How to Reach */}
          <div className="glass-effect rounded-3xl p-8 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-6">How to Reach</h3>
            
            <div className="space-y-4">
              {/* Transport Options */}
              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                <span className="text-3xl">🚗</span>
                <div>
                  <h4 className="text-yellow-400 font-semibold">By Car</h4>
                  <p className="text-gray-400">Ample parking available at both locations</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                <span className="text-3xl">🚕</span>
                <div>
                  <h4 className="text-yellow-400 font-semibold">By Taxi/Ride Sharing</h4>
                  <p className="text-gray-400">Uber/Careem available - drop off at main entrance</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                <span className="text-3xl">🚌</span>
                <div>
                  <h4 className="text-yellow-400 font-semibold">By Public Transport</h4>
                  <p className="text-gray-400">Metro Bus Station is 5 min walk from Main Showroom</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                <span className="text-3xl">🚶</span>
                <div>
                  <h4 className="text-yellow-400 font-semibold">Walking Directions</h4>
                  <p className="text-gray-400">From Saddar Station, walk towards Bank Road - we're on the left</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center">
          <Link
            href="/"
            className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-full text-lg transform hover:scale-110 transition-all duration-500 hover:shadow-2xl"
          >
            <span className="mr-2">←</span>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}