// File: src/components/FeatureBox.tsx
'use client'

import { useState } from 'react'

interface FeatureBoxProps {
  title: string
  description: string
  icon: string
  gradient: string
  index: number
}

const FeatureBox = ({ title, description, icon, gradient, index }: FeatureBoxProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative group perspective-1000"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        relative p-6 md:p-8 rounded-2xl bg-gradient-to-br ${gradient}
        transform-style-3d transition-all duration-500
        ${isHovered ? 'rotate-y-10 scale-110 shadow-2xl' : ''}
        animate-float
      `}>
        {/* Shine Effect */}
        <div className={`
          absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
          -skew-x-12 transition-transform duration-1000
          ${isHovered ? 'translate-x-full' : '-translate-x-full'}
        `}></div>

        {/* Icon */}
        <div className="text-4xl md:text-5xl mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
          {icon}
        </div>

        {/* Content */}
        <h3 className="text-lg md:text-xl font-bold text-black mb-2">
          {title}
        </h3>
        <p className="text-sm md:text-base text-black/70">
          {description}
        </p>

        {/* 3D Effect */}
        <div className={`
          absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl blur-xl
          transition-opacity duration-500 -z-10
          ${isHovered ? 'opacity-70' : 'opacity-0'}
        `}></div>
      </div>
    </div>
  )
}

export default FeatureBox