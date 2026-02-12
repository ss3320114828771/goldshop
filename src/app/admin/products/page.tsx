// File: src/app/admin/products/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AdminProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('newest')

  // Mock products data
  const products = [
    {
      id: 1,
      name: 'MacBook Pro 16"',
      price: 2499,
      oldPrice: 2799,
      image: '/images/n1.jpeg',
      category: 'Laptops',
      subcategory: 'Apple',
      stock: 15,
      sold: 45,
      rating: 4.8,
      reviews: 128,
      status: 'active',
      featured: true,
      sku: 'MBP-16-2024',
      tags: ['premium', 'apple', 'm2-max']
    },
    {
      id: 2,
      name: '22K Gold Necklace',
      price: 2999,
      oldPrice: 3299,
      image: '/images/n2.jpeg',
      category: 'Gold',
      subcategory: 'Necklaces',
      stock: 8,
      sold: 32,
      rating: 4.9,
      reviews: 56,
      status: 'active',
      featured: true,
      sku: 'GLD-NCK-22K',
      tags: ['gold', 'traditional', 'premium']
    },
    {
      id: 3,
      name: 'Diamond Engagement Ring',
      price: 3999,
      oldPrice: 4499,
      image: '/images/n3.jpeg',
      category: 'Diamond',
      subcategory: 'Rings',
      stock: 5,
      sold: 28,
      rating: 5.0,
      reviews: 42,
      status: 'active',
      featured: true,
      sku: 'DMD-RNG-15CT',
      tags: ['diamond', 'engagement', 'luxury']
    },
    {
      id: 4,
      name: 'ASUS ROG Gaming Laptop',
      price: 2199,
      oldPrice: 2399,
      image: '/images/n4.jpeg',
      category: 'Laptops',
      subcategory: 'Gaming',
      stock: 12,
      sold: 25,
      rating: 4.7,
      reviews: 89,
      status: 'active',
      featured: false,
      sku: 'ROG-STRIX-2024',
      tags: ['gaming', 'asus', 'rtx4080']
    },
    {
      id: 5,
      name: 'Gold Bracelet',
      price: 1599,
      oldPrice: 1799,
      image: '/images/n5.jpeg',
      category: 'Gold',
      subcategory: 'Bracelets',
      stock: 20,
      sold: 22,
      rating: 4.6,
      reviews: 34,
      status: 'active',
      featured: false,
      sku: 'GLD-BRC-22K',
      tags: ['gold', 'bracelet', 'daily-wear']
    },
    {
      id: 6,
      name: 'Platinum Watch',
      price: 5999,
      oldPrice: 6499,
      image: '/images/n1.jpeg',
      category: 'Watches',
      subcategory: 'Luxury',
      stock: 3,
      sold: 12,
      rating: 4.9,
      reviews: 18,
      status: 'low-stock',
      featured: true,
      sku: 'PLT-WCH-LUX',
      tags: ['platinum', 'watch', 'rolex']
    },
    {
      id: 7,
      name: 'Diamond Earrings',
      price: 2799,
      oldPrice: 2999,
      image: '/images/n2.jpeg',
      category: 'Diamond',
      subcategory: 'Earrings',
      stock: 7,
      sold: 19,
      rating: 4.8,
      reviews: 27,
      status: 'active',
      featured: false,
      sku: 'DMD-EAR-1CT',
      tags: ['diamond', 'earrings', 'wedding']
    },
    {
      id: 8,
      name: 'Dell XPS 15',
      price: 1899,
      oldPrice: 2099,
      image: '/images/n3.jpeg',
      category: 'Laptops',
      subcategory: 'Professional',
      stock: 9,
      sold: 31,
      rating: 4.6,
      reviews: 67,
      status: 'active',
      featured: false,
      sku: 'XPS-15-2024',
      tags: ['dell', 'professional', 'ultrabook']
    }
  ]

  // Filter products based on category and search
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'newest':
        return b.id - a.id
      case 'oldest':
        return a.id - b.id
      case 'price-high':
        return b.price - a.price
      case 'price-low':
        return a.price - b.price
      case 'name':
        return a.name.localeCompare(b.name)
      case 'stock':
        return b.stock - a.stock
      case 'sold':
        return b.sold - a.sold
      default:
        return 0
    }
  })

  // Calculate stats
  const totalProducts = products.length
  const activeProducts = products.filter(p => p.status === 'active').length
  const lowStockProducts = products.filter(p => p.stock < 10).length
  const outOfStockProducts = products.filter(p => p.stock === 0).length
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0)

  const categories = ['all', ...new Set(products.map(p => p.category.toLowerCase()))]

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const toggleAllProducts = () => {
    if (selectedProducts.length === sortedProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(sortedProducts.map(p => p.id))
    }
  }

  const getStockStatusColor = (stock: number) => {
    if (stock === 0) return 'text-red-400 bg-red-500/20 border-red-500/30'
    if (stock < 10) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
    return 'text-green-400 bg-green-500/20 border-green-500/30'
  }

  const getStockStatusText = (stock: number) => {
    if (stock === 0) return 'Out of Stock'
    if (stock < 10) return 'Low Stock'
    return 'In Stock'
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Products Management
            </h1>
            <p className="text-gray-400 mt-2">
              Manage your product inventory and catalog
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white font-semibold transition-all duration-300 flex items-center space-x-2">
              <span>📤</span>
              <span>Export</span>
            </button>
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white font-semibold transition-all duration-300 flex items-center space-x-2">
              <span>📥</span>
              <span>Import</span>
            </button>
            <Link
              href="/admin/products/add"
              className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold rounded-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <span>➕</span>
              <span>Add Product</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="glass-effect p-4 rounded-xl">
          <p className="text-gray-400 text-xs">Total Products</p>
          <p className="text-2xl font-bold text-white mt-1">{totalProducts}</p>
          <p className="text-xs text-green-400 mt-1">+3 this month</p>
        </div>
        <div className="glass-effect p-4 rounded-xl">
          <p className="text-gray-400 text-xs">Active Products</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{activeProducts}</p>
          <p className="text-xs text-gray-400 mt-1">{((activeProducts/totalProducts)*100).toFixed(0)}% of total</p>
        </div>
        <div className="glass-effect p-4 rounded-xl">
          <p className="text-gray-400 text-xs">Low Stock</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">{lowStockProducts}</p>
          <p className="text-xs text-gray-400 mt-1">Need reorder</p>
        </div>
        <div className="glass-effect p-4 rounded-xl">
          <p className="text-gray-400 text-xs">Out of Stock</p>
          <p className="text-2xl font-bold text-red-400 mt-1">{outOfStockProducts}</p>
          <p className="text-xs text-gray-400 mt-1">Requires attention</p>
        </div>
        <div className="glass-effect p-4 rounded-xl bg-gradient-to-r from-yellow-400/10 to-amber-500/10">
          <p className="text-gray-400 text-xs">Inventory Value</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">${totalValue.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">Cost + Margin</p>
        </div>
      </div>

      {/* Filters and View Options */}
      <div className="glass-effect rounded-2xl p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search products by name, SKU, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 text-white placeholder-gray-500 transition-all duration-300"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 text-white transition-all duration-300"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-gray-900">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 text-white transition-all duration-300"
            >
              <option value="newest" className="bg-gray-900">Newest First</option>
              <option value="oldest" className="bg-gray-900">Oldest First</option>
              <option value="name" className="bg-gray-900">Name</option>
              <option value="price-high" className="bg-gray-900">Price: High to Low</option>
              <option value="price-low" className="bg-gray-900">Price: Low to High</option>
              <option value="stock" className="bg-gray-900">Stock Level</option>
              <option value="sold" className="bg-gray-900">Best Selling</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2 bg-white/5 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                viewMode === 'grid' 
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>📱</span>
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                viewMode === 'list' 
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>📋</span>
              <span>List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-2xl border border-yellow-400/30">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-white font-semibold">{selectedProducts.length} products selected</span>
              <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm transition-colors">
                Update Status
              </button>
              <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm transition-colors">
                Update Category
              </button>
              <button className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm transition-colors">
                Delete Selected
              </button>
            </div>
            <button 
              onClick={() => setSelectedProducts([])}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Products Display - Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <div key={product.id} className="group relative">
                {/* Selection Checkbox */}
                <div className="absolute top-4 left-4 z-10">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleProductSelection(product.id)}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-yellow-400 checked:border-yellow-400 focus:ring-yellow-400 focus:ring-2 transition-all"
                  />
                </div>

                {/* Featured Badge */}
                {product.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-xs font-bold rounded-full">
                      Featured
                    </span>
                  </div>
                )}

                {/* Product Card */}
                <div className="glass-effect rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/20">
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl opacity-30">📷</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Stock Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStockStatusColor(product.stock)}`}>
                        {getStockStatusText(product.stock)} ({product.stock})
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white line-clamp-1">{product.name}</h3>
                        <p className="text-xs text-gray-400">{product.sku}</p>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-white/5 rounded-full text-gray-300">
                        {product.category}
                      </span>
                      <span className="text-xs px-2 py-1 bg-white/5 rounded-full text-gray-300">
                        {product.subcategory}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-2xl font-bold text-yellow-400">${product.price}</span>
                      {product.oldPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.oldPrice}</span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <span>⭐</span>
                        <span>{product.rating}</span>
                        <span>({product.reviews})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>📦</span>
                        <span>{product.sold} sold</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 mt-4">
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm font-semibold transition-colors text-center"
                      >
                        Edit
                      </Link>
                      <button className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm font-semibold transition-colors">
                        👁️
                      </button>
                      <button className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-semibold transition-colors">
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <div className="flex flex-col items-center justify-center">
                <span className="text-6xl mb-4">🔍</span>
                <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
                <p className="text-gray-400">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* List View */
        <div className="glass-effect rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-6 py-4 w-10">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === sortedProducts.length && sortedProducts.length > 0}
                      onChange={toggleAllProducts}
                      className="w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-yellow-400 checked:border-yellow-400 focus:ring-yellow-400 focus:ring-2 transition-all"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Sold
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts.length > 0 ? (
                  sortedProducts.map((product) => (
                    <tr key={product.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleProductSelection(product.id)}
                          className="w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-yellow-400 checked:border-yellow-400 focus:ring-yellow-400 focus:ring-2 transition-all"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                            <span className="text-xl">📷</span>
                          </div>
                          <div>
                            <span className="text-white font-medium">{product.name}</span>
                            {product.featured && (
                              <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-xs rounded-full">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300 text-sm">{product.sku}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-white text-sm">{product.category}</span>
                          <span className="text-xs text-gray-400">{product.subcategory}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-yellow-400 font-bold">${product.price}</span>
                          {product.oldPrice && (
                            <span className="text-xs text-gray-500 line-through">${product.oldPrice}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStockStatusColor(product.stock)}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300">{product.sold}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          product.status === 'active' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <Link
                            href={`/admin/products/edit/${product.id}`}
                            className="text-yellow-400 hover:text-yellow-500 transition-colors"
                          >
                            Edit
                          </Link>
                          <button className="text-blue-400 hover:text-blue-500 transition-colors">
                            View
                          </button>
                          <button className="text-red-400 hover:text-red-500 transition-colors">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-6xl mb-4">📦</span>
                        <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
                        <p className="text-gray-400">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing 1-{sortedProducts.length} of {products.length} products
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold rounded-lg">
                1
              </button>
              <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors">
                2
              </button>
              <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors">
                3
              </button>
              <span className="text-gray-400">...</span>
              <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors">
                8
              </button>
              <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions & Categories */}
      <div className="mt-8 grid lg:grid-cols-3 gap-8">
        {/* Category Distribution */}
        <div className="lg:col-span-2 glass-effect rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Category Distribution</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.filter(c => c !== 'all').map((category) => {
              const count = products.filter(p => p.category.toLowerCase() === category).length
              const percentage = (count / totalProducts) * 100
              return (
                <div key={category} className="p-4 bg-white/5 rounded-xl">
                  <h3 className="text-white font-semibold capitalize mb-2">{category}</h3>
                  <p className="text-2xl font-bold text-yellow-400">{count}</p>
                  <p className="text-xs text-gray-400 mt-1">{percentage.toFixed(1)}% of total</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Add Category */}
        <div className="glass-effect rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <Link
              href="/admin/categories"
              className="flex items-center p-4 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-amber-500 group transition-all duration-300"
            >
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xl group-hover:bg-black/20 mr-3">
                📑
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold group-hover:text-black">Manage Categories</h3>
                <p className="text-xs text-gray-400 group-hover:text-black/70">Edit product categories</p>
              </div>
            </Link>

            <Link
              href="/admin/products/add"
              className="flex items-center p-4 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-green-400 hover:to-emerald-500 group transition-all duration-300"
            >
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xl group-hover:bg-black/20 mr-3">
                📦
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold group-hover:text-black">Bulk Import</h3>
                <p className="text-xs text-gray-400 group-hover:text-black/70">Import multiple products</p>
              </div>
            </Link>

            <Link
              href="/admin/inventory"
              className="flex items-center p-4 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 group transition-all duration-300"
            >
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xl group-hover:bg-black/20 mr-3">
                📊
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold group-hover:text-black">Inventory Report</h3>
                <p className="text-xs text-gray-400 group-hover:text-black/70">View stock levels</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}