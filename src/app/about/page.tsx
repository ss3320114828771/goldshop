// File: src/app/about/page.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="relative min-h-screen py-20 px-4">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              About Hafiz Sajid Syed
            </span>
          </h1>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 filter blur-3xl"></div>
            <p className="text-xl md:text-2xl text-gray-300 relative neon-text">
              Excellence in Laptops, Gold & Jewelry Since 1995
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left Column - Story */}
          <div className="space-y-8">
            <div className="glass-effect p-8 rounded-3xl transform hover:scale-105 transition-all duration-500">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center text-3xl animate-float">
                  📖
                </div>
                <h2 className="text-3xl font-bold text-white">Our Story</h2>
              </div>
              <p className="text-gray-400 leading-relaxed text-lg">
                Founded in 1995 by Hafiz Sajid Syed, we began as a small laptop shop with a vision to provide 
                quality technology products. Over the years, our passion for excellence led us to expand into 
                the world of fine jewelry and precious metals. Today, we stand as a symbol of trust, quality, 
                and luxury, serving thousands of satisfied customers worldwide.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="glass-effect p-6 rounded-2xl transform hover:scale-105 transition-all duration-500 group">
                <div className="text-4xl mb-4 group-hover:rotate-12 transition-transform duration-500">
                  🎯
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
                <p className="text-sm text-gray-400">
                  To provide authentic, high-quality products with exceptional customer service and competitive prices.
                </p>
              </div>
              
              <div className="glass-effect p-6 rounded-2xl transform hover:scale-105 transition-all duration-500 group">
                <div className="text-4xl mb-4 group-hover:rotate-12 transition-transform duration-500">
                  👁️
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Our Vision</h3>
                <p className="text-sm text-gray-400">
                  To become the world's most trusted name in luxury electronics and fine jewelry.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Why Choose Us */}
          <div className="relative perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-amber-500/30 rounded-3xl filter blur-3xl"></div>
            <div className="relative glass-effect p-8 rounded-3xl transform-style-3d hover:rotate-y-6 transition-all duration-700">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center text-3xl animate-float">
                  ⭐
                </div>
                <h2 className="text-3xl font-bold text-white">Why Choose Us?</h2>
              </div>
              
              <div className="space-y-6">
                {[
                  { icon: '✓', text: '100% Authentic Products with Certification', color: 'text-yellow-400' },
                  { icon: '✓', text: '25+ Years of Trust and Excellence', color: 'text-yellow-400' },
                  { icon: '✓', text: 'Expert Craftsmanship & Quality Assurance', color: 'text-yellow-400' },
                  { icon: '✓', text: 'Lifetime Service Warranty', color: 'text-yellow-400' },
                  { icon: '✓', text: 'Competitive Market Prices', color: 'text-yellow-400' },
                  { icon: '✓', text: 'Free Shipping & Insurance', color: 'text-yellow-400' },
                  { icon: '✓', text: 'Easy Returns & Exchange Policy', color: 'text-yellow-400' },
                  { icon: '✓', text: 'Expert Consultation & Guidance', color: 'text-yellow-400' },
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-3 group hover:translate-x-2 transition-transform duration-300"
                  >
                    <span className={`${item.color} text-2xl font-bold`}>{item.icon}</span>
                    <span className="text-gray-300 text-lg group-hover:text-white transition-colors duration-300">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                    25+
                  </div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                    10k+
                  </div>
                  <div className="text-sm text-gray-400">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
              Our Core Values
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🔍',
                title: 'Transparency',
                description: 'Honest pricing and clear product information',
                gradient: 'from-blue-400 to-cyan-500'
              },
              {
                icon: '💎',
                title: 'Quality',
                description: 'Premium products with certification',
                gradient: 'from-purple-400 to-pink-500'
              },
              {
                icon: '🤝',
                title: 'Trust',
                description: 'Building lasting customer relationships',
                gradient: 'from-green-400 to-emerald-500'
              },
              {
                icon: '✨',
                title: 'Excellence',
                description: 'Striving for perfection in every detail',
                gradient: 'from-yellow-400 to-amber-500'
              },
            ].map((value, index) => (
              <div
                key={index}
                className="relative group perspective-1000"
              >
                <div className={`
                  relative p-8 rounded-2xl bg-gradient-to-br ${value.gradient}
                  transform-style-3d transition-all duration-500
                  group-hover:rotate-y-10 group-hover:scale-110
                  animate-float
                `} style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">{value.title}</h3>
                  <p className="text-black/70">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
              Our Leadership
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Hafiz Sajid Syed',
                role: 'Founder & CEO',
                experience: '35+ Years',
                icon: '👑',
                gradient: 'from-yellow-400 to-amber-500'
              },
              {
                name: 'Muhammad Ali',
                role: 'Head of Jewelry Design',
                experience: '20+ Years',
                icon: '💍',
                gradient: 'from-blue-400 to-cyan-500'
              },
              {
                name: 'Fatima Khan',
                role: 'Technical Director',
                experience: '15+ Years',
                icon: '💻',
                gradient: 'from-purple-400 to-pink-500'
              }
            ].map((member, index) => (
              <div
                key={index}
                className="glass-effect p-8 rounded-3xl text-center transform hover:scale-105 transition-all duration-500 group"
              >
                <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-r ${member.gradient} rounded-3xl flex items-center justify-center text-4xl transform group-hover:rotate-12 transition-all duration-500`}>
                  {member.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-yellow-400 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-400">{member.experience} Experience</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="relative perspective-1000">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-3xl filter blur-3xl opacity-50"></div>
          <div className="relative glass-effect p-12 rounded-3xl text-center transform-style-3d hover:rotate-x-6 transition-all duration-700">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Experience Luxury?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Visit our store or browse our collection online for exclusive premium products
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-full text-lg transform hover:scale-110 transition-all duration-500 hover:shadow-2xl"
              >
                <span>Shop Now</span>
                <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full text-lg border border-white/20 hover:bg-white/20 transform hover:scale-110 transition-all duration-500"
              >
                <span>Contact Us</span>
                <span className="ml-2">📞</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-20 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="glass-effect px-6 py-3 rounded-full">
              <span className="text-yellow-400 font-semibold">✓ ISO 9001:2024 Certified</span>
            </div>
            <div className="glass-effect px-6 py-3 rounded-full">
              <span className="text-yellow-400 font-semibold">✓ BIS Hallmark Certified</span>
            </div>
            <div className="glass-effect px-6 py-3 rounded-full">
              <span className="text-yellow-400 font-semibold">✓ GIA Certified Diamonds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}