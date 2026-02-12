'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  productCount: number
  subcategories?: SubCategory[]
  featured?: boolean
  sale?: boolean
  discount?: number
}

interface SubCategory {
  id: string
  name: string
  slug: string
  productCount: number
}

interface CategoryGridProps {
  categories: Category[]
  layout?: 'grid' | 'masonry' | 'carousel'
  columns?: 2 | 3 | 4 | 5 | 6
  showProductCount?: boolean
  showSubcategories?: boolean
  showDescription?: boolean
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape'
  cardStyle?: 'default' | 'minimal' | 'featured' | 'compact'
  onCategoryClick?: (category: Category) => void
}

export default function CategoryGrid({
  categories,
  layout = 'grid',
  columns = 4,
  showProductCount = true,
  showSubcategories = false,
  showDescription = true,
  aspectRatio = 'square',
  cardStyle = 'default',
  onCategoryClick
}: CategoryGridProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [visibleCategories, setVisibleCategories] = useState<number>(8)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const getGridCols = (): string => {
    if (layout === 'masonry') return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    
    const colMap = {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
      6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
    }
    
    return colMap[columns] || colMap[4]
  }

  const getAspectRatioClass = (): string => {
    const ratioMap = {
      'square': 'aspect-square',
      'video': 'aspect-video',
      'portrait': 'aspect-[3/4]',
      'landscape': 'aspect-[4/3]'
    }
    return ratioMap[aspectRatio]
  }

  const getCardStyles = (category: Category): string => {
    const baseStyles = 'relative overflow-hidden transition-all duration-500 group'
    
    switch (cardStyle) {
      case 'minimal':
        return `${baseStyles} bg-transparent border-0`
      case 'featured':
        return `${baseStyles} bg-gradient-to-br from-yellow-400/10 via-amber-500/5 to-transparent border-2 border-yellow-400/30`
      case 'compact':
        return `${baseStyles} bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl`
      default:
        return `${baseStyles} bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-400/5`
    }
  }

  const handleLoadMore = (): void => {
    setVisibleCategories(prev => prev + 8)
  }

  const handleCategoryClick = (category: Category): void => {
    if (onCategoryClick) {
      onCategoryClick(category)
    }
  }

  const displayedCategories = isMobile 
    ? categories.slice(0, visibleCategories) 
    : categories

  const hasMore = isMobile && visibleCategories < categories.length

  return (
    <div className="w-full">
      {/* Grid Layout */}
      <div className={`
        grid gap-4 sm:gap-6 lg:gap-8
        ${getGridCols()}
        ${layout === 'masonry' ? 'grid-flow-dense' : ''}
      `}>
        {displayedCategories.map((category, index) => (
          <div
            key={category.id}
            className={`
              ${getCardStyles(category)}
              ${layout === 'masonry' ? index % 3 === 0 ? 'md:row-span-2' : '' : ''}
              ${category.featured ? 'md:col-span-2 md:row-span-2' : ''}
            `}
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {/* Sale Badge */}
            {category.sale && (
              <div className="absolute top-3 left-3 z-10">
                <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-400 to-red-600 rounded-full">
                  <span className="text-xs text-white font-bold">SALE</span>
                  {category.discount && (
                    <span className="text-xs text-white bg-white/20 px-1.5 py-0.5 rounded-full">
                      -{category.discount}%
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Featured Badge */}
            {category.featured && !category.sale && (
              <div className="absolute top-3 left-3 z-10">
                <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full">
                  <span className="text-xs text-black font-bold">⭐ FEATURED</span>
                </div>
              </div>
            )}

            {/* Image Container */}
            <Link
              href={`/category/${category.slug}`}
              onClick={() => handleCategoryClick(category)}
              className="block relative w-full h-full"
            >
              <div className={`
                relative w-full ${getAspectRatioClass()}
                ${cardStyle === 'minimal' ? 'rounded-2xl' : 'rounded-t-2xl'}
                overflow-hidden
              `}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className={`
                    object-cover transition-transform duration-700
                    ${hoveredCategory === category.id ? 'scale-110' : 'scale-100'}
                  `}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Hover Overlay Content */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <span className="text-4xl mb-2 animate-float">✨</span>
                  <span className="text-white font-semibold text-sm bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                    Explore Collection
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className={`
                p-4
                ${cardStyle === 'compact' ? 'p-3' : ''}
                ${cardStyle === 'minimal' ? 'px-0' : ''}
              `}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className={`
                      font-bold text-white group-hover:text-yellow-400 transition-colors
                      ${cardStyle === 'compact' ? 'text-base' : 'text-lg lg:text-xl'}
                    `}>
                      {category.name}
                    </h3>
                    
                    {showDescription && category.description && cardStyle !== 'compact' && (
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </div>

                  {showProductCount && (
                    <span className={`
                      flex-shrink-0 px-2 py-1 bg-white/10 rounded-full text-xs text-gray-400
                      ${cardStyle === 'compact' ? 'text-[10px]' : ''}
                    `}>
                      {category.productCount}+
                    </span>
                  )}
                </div>

                {/* Subcategories */}
                {showSubcategories && category.subcategories && category.subcategories.length > 0 && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.slice(0, 3).map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/category/${category.slug}/${sub.slug}`}
                          className="text-xs px-2 py-1 bg-white/5 hover:bg-yellow-400/20 text-gray-400 hover:text-yellow-400 rounded-lg transition-colors"
                        >
                          {sub.name}
                          {showProductCount && ` (${sub.productCount})`}
                        </Link>
                      ))}
                      {category.subcategories.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-white/5 text-gray-400 rounded-lg">
                          +{category.subcategories.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Shop Now Button */}
                {cardStyle === 'featured' && (
                  <div className="mt-4">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-400 group-hover:text-yellow-500 transition-colors">
                      Shop Now
                      <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </span>
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Load More Button - Mobile Only */}
      {hasMore && (
        <div className="mt-8 text-center md:hidden">
          <button
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-semibold transition-all duration-300 group"
          >
            <span>Load More Categories</span>
            <span className="text-lg group-hover:translate-y-1 transition-transform duration-300">↓</span>
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Showing {displayedCategories.length} of {categories.length} categories
          </p>
        </div>
      )}

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/5 rounded-full mb-4">
            <span className="text-5xl">🏷️</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Categories Found</h3>
          <p className="text-gray-400 mb-6">
            We couldn't find any categories matching your criteria.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-xl hover:scale-105 transition-transform duration-300"
          >
            <span>Browse All Products</span>
            <span>→</span>
          </Link>
        </div>
      )}

      {/* Category Stats */}
      {categories.length > 0 && (
        <div className="mt-8 flex items-center justify-between text-sm text-gray-500 border-t border-white/10 pt-6">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">📊</span>
            <span>{categories.length} Categories</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              <span>Featured</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
              <span>Sale</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}