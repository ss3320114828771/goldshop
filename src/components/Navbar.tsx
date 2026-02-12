// File: src/components/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Cart', href: '/cart' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-black/90 backdrop-blur-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative group">
            <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent animate-gradient">
              Hafiz Sajid Syed
            </div>
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative group px-3 py-2"
              >
                <span className="relative z-10 text-white group-hover:text-yellow-400 transition-colors duration-300">
                  {item.name}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Admin Button */}
          <Link
            href="/admin"
            className="hidden md:block relative overflow-hidden rounded-lg px-6 py-2 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 text-black font-semibold animate-gradient bg-[length:200%_200%] hover:scale-105 transition-transform duration-300"
          >
            Admin Panel
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 focus:outline-none"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
              }`}></div>
              <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}></div>
              <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
              }`}></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="glass-effect rounded-2xl p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-white hover:text-yellow-400 hover:bg-white/10 rounded-xl transition-all duration-300"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 mt-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold rounded-xl text-center hover:scale-105 transition-transform duration-300"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar