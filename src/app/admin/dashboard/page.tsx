// File: src/app/admin/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [stats, setStats] = useState({
    totalProducts: 124,
    totalOrders: 45,
    totalCustomers: 1234,
    revenue: 52345,
    pendingOrders: 12,
    lowStock: 8,
    todaySales: 3450,
    growth: 23.5
  })

  // Mock data for charts
  const recentOrders = [
    { id: 'ORD-2024001', customer: 'Ahmed Khan', date: '2024-02-12', total: 2499, status: 'delivered' },
    { id: 'ORD-2024002', customer: 'Fatima Ali', date: '2024-02-12', total: 3999, status: 'processing' },
    { id: 'ORD-2024003', customer: 'Omar Farooq', date: '2024-02-11', total: 1599, status: 'shipped' },
    { id: 'ORD-2024004', customer: 'Zainab Malik', date: '2024-02-11', total: 5498, status: 'pending' },
    { id: 'ORD-2024005', customer: 'Bilal Ahmed', date: '2024-02-10', total: 2199, status: 'delivered' },
    { id: 'ORD-2024006', customer: 'Ayesha Siddiqui', date: '2024-02-10', total: 899, status: 'processing' },
    { id: 'ORD-2024007', customer: 'Usman Chaudhry', date: '2024-02-09', total: 5999, status: 'shipped' },
  ]

  const topProducts = [
    { name: 'MacBook Pro 16"', sales: 45, revenue: 112455, stock: 15 },
    { name: '22K Gold Necklace', sales: 32, revenue: 95968, stock: 8 },
    { name: 'Diamond Ring', sales: 28, revenue: 111972, stock: 5 },
    { name: 'ROG Gaming Laptop', sales: 25, revenue: 54975, stock: 12 },
    { name: 'Gold Bracelet', sales: 22, revenue: 35178, stock: 20 },
  ]

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <p className="text-gray-400 mt-2">
              Welcome back, Hafiz Sajid Syed • {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          {/* Period Selector */}
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            {['day', 'week', 'month', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedPeriod === period
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Products */}
        <div className="glass-effect p-6 rounded-2xl transform hover:scale-105 transition-all duration-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Products</p>
              <h3 className="text-3xl font-bold text-white mt-2">{stats.totalProducts}</h3>
              <div className="flex items-center mt-2">
                <span className="text-green-400 text-sm">+12 this month</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl">
              📦
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="glass-effect p-6 rounded-2xl transform hover:scale-105 transition-all duration-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Orders</p>
              <h3 className="text-3xl font-bold text-white mt-2">{stats.totalOrders}</h3>
              <div className="flex items-center mt-2">
                <span className="text-yellow-400 text-sm">{stats.pendingOrders} pending</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center text-3xl">
              🛍️
            </div>
          </div>
        </div>

        {/* Total Customers */}
        <div className="glass-effect p-6 rounded-2xl transform hover:scale-105 transition-all duration-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Customers</p>
              <h3 className="text-3xl font-bold text-white mt-2">{stats.totalCustomers.toLocaleString()}</h3>
              <div className="flex items-center mt-2">
                <span className="text-green-400 text-sm">+48 new</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center text-3xl">
              👥
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="glass-effect p-6 rounded-2xl transform hover:scale-105 transition-all duration-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <h3 className="text-3xl font-bold text-white mt-2">${stats.revenue.toLocaleString()}</h3>
              <div className="flex items-center mt-2">
                <span className="text-green-400 text-sm">+{stats.growth}% vs last {selectedPeriod}</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center text-3xl">
              💰
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/5 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Today's Sales</span>
            <span className="text-yellow-400 font-bold">${stats.todaySales}</span>
          </div>
        </div>
        <div className="bg-white/5 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Pending Orders</span>
            <span className="text-yellow-400 font-bold">{stats.pendingOrders}</span>
          </div>
        </div>
        <div className="bg-white/5 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Low Stock Items</span>
            <span className="text-red-400 font-bold">{stats.lowStock}</span>
          </div>
        </div>
        <div className="bg-white/5 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Avg. Order Value</span>
            <span className="text-green-400 font-bold">$1,234</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="glass-effect rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Recent Orders</h2>
                <Link 
                  href="/admin/orders" 
                  className="text-yellow-400 hover:text-yellow-500 transition-colors text-sm font-semibold"
                >
                  View All →
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">#{order.id}</td>
                      <td className="px-6 py-4 text-gray-300">{order.customer}</td>
                      <td className="px-6 py-4 text-gray-300">{order.date}</td>
                      <td className="px-6 py-4 text-yellow-400 font-semibold">${order.total}</td>
                      <td className="px-6 py-4">
                        <span className={`
                          px-3 py-1 rounded-full text-xs font-semibold
                          ${order.status === 'delivered' ? 'bg-green-500/20 text-green-400' : ''}
                          ${order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' : ''}
                          ${order.status === 'shipped' ? 'bg-purple-500/20 text-purple-400' : ''}
                          ${order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                        `}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-yellow-400 hover:text-yellow-500 transition-colors text-sm font-semibold">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="lg:col-span-1">
          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Top Products</h2>
              <span className="text-sm text-gray-400">This {selectedPeriod}</span>
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-lg flex items-center justify-center text-yellow-400 font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm">{product.name}</h3>
                      <p className="text-xs text-gray-400">{product.sales} units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-400 font-semibold">${product.revenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">Stock: {product.stock}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <Link 
                href="/admin/products" 
                className="block text-center text-yellow-400 hover:text-yellow-500 transition-colors text-sm font-semibold"
              >
                Manage Products →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Analytics */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="glass-effect rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <Link 
                href="/admin/products/add" 
                className="flex items-center p-4 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-amber-500 group transition-all duration-300"
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xl group-hover:bg-black/20 mr-3">
                  ➕
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold group-hover:text-black">Add Product</h3>
                  <p className="text-xs text-gray-400 group-hover:text-black/70">Add new items to inventory</p>
                </div>
              </Link>

              <Link 
                href="/admin/orders" 
                className="flex items-center p-4 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-green-400 hover:to-emerald-500 group transition-all duration-300"
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xl group-hover:bg-black/20 mr-3">
                  📦
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold group-hover:text-black">Process Orders</h3>
                  <p className="text-xs text-gray-400 group-hover:text-black/70">{stats.pendingOrders} pending</p>
                </div>
              </Link>

              <Link 
                href="/admin/reports" 
                className="flex items-center p-4 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 group transition-all duration-300"
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xl group-hover:bg-black/20 mr-3">
                  📊
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold group-hover:text-black">View Reports</h3>
                  <p className="text-xs text-gray-400 group-hover:text-black/70">Sales analytics</p>
                </div>
              </Link>

              <Link 
                href="/admin/settings" 
                className="flex items-center p-4 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-gray-400 hover:to-gray-500 group transition-all duration-300"
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xl group-hover:bg-black/20 mr-3">
                  ⚙️
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold group-hover:text-black">Settings</h3>
                  <p className="text-xs text-gray-400 group-hover:text-black/70">Store configuration</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Sales Overview */}
        <div className="lg:col-span-3">
          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Sales Overview</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                  <span className="text-xs text-gray-400">This {selectedPeriod}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
                  <span className="text-xs text-gray-400">Last {selectedPeriod}</span>
                </div>
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="relative h-64 bg-gradient-to-b from-white/5 to-transparent rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📈</div>
                <p className="text-gray-400">Sales chart visualization</p>
                <p className="text-sm text-gray-500 mt-2">+23.5% growth compared to last {selectedPeriod}</p>
              </div>
              
              {/* Mock Chart Bars */}
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center space-x-2 p-6">
                {[65, 45, 75, 55, 85, 70, 60].map((height, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-8 bg-gradient-to-t from-yellow-400 to-amber-500 rounded-t-lg animate-pulse"
                      style={{ height: `${height}px` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">M</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">$45.2K</p>
                <p className="text-xs text-gray-400">Total Sales</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">156</p>
                <p className="text-xs text-gray-400">Orders</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">$289</p>
                <p className="text-xs text-gray-400">Avg. Order</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-600">
          Last updated: {new Date().toLocaleString()} • Data refreshes every 5 minutes
        </p>
      </div>
    </div>
  )
}