// File: src/app/products/page.tsx
'use client'

import ProductCard from '@/components/ProductCard'

export default function ProductsPage() {
  const products = [
    { id: 1, name: 'MacBook Pro 16"', price: '$2499', image: 'n1.jpeg', category: 'Laptop' },
    { id: 2, name: 'Gold Necklace 22K', price: '$2999', image: 'n2.jpeg', category: 'Gold' },
    { id: 3, name: 'Diamond Engagement Ring', price: '$3999', image: 'n3.jpeg', category: 'Diamond' },
    { id: 4, name: 'ROG Gaming Laptop', price: '$2199', image: 'n4.jpeg', category: 'Laptop' },
    { id: 5, name: 'Gold Bracelet', price: '$1599', image: 'n5.jpeg', category: 'Gold' },
    { id: 6, name: 'Platinum Watch', price: '$5999', image: 'n1.jpeg', category: 'Watch' },
    { id: 7, name: 'Diamond Earrings', price: '$2799', image: 'n2.jpeg', category: 'Diamond' },
    { id: 8, name: 'Dell XPS 15', price: '$1899', image: 'n3.jpeg', category: 'Laptop' },
    { id: 9, name: 'Gold Bangles', price: '$899', image: 'n4.jpeg', category: 'Gold' },
    { id: 10, name: 'Silver Pendant', price: '$499', image: 'n5.jpeg', category: 'Silver' },
  ]

  return (
    <div className="relative min-h-screen py-20 px-4">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900"></div>
      
      <div className="container mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
              Our Products
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover our exclusive collection of premium laptops, gold, and jewelry
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['All', 'Laptop', 'Gold', 'Diamond', 'Watch', 'Silver'].map((filter) => (
            <button
              key={filter}
              className="px-6 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-gradient-to-r hover:from-yellow-400 hover:to-amber-500 hover:text-black hover:border-transparent transition-all duration-300"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}