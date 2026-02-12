// File: src/app/admin/page.tsx
'use client'

import { useState } from 'react'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="relative min-h-screen py-20 px-4">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
      
      <div className="container mx-auto relative">
        <div className="glass-effect rounded-3xl overflow-hidden">
          {/* Admin Header */}
          <div className="bg-gradient-to-r from-yellow-400 to-amber-500 p-6">
            <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
            <p className="text-black/70">Welcome back, Hafiz Sajid Syed</p>
          </div>

          {/* Admin Tabs */}
          <div className="flex border-b border-white/10">
            {['Dashboard', 'Products', 'Orders', 'Customers', 'Settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-6 py-4 font-semibold transition-all duration-300 ${
                  activeTab === tab.toLowerCase()
                    ? 'text-yellow-400 border-b-2 border-yellow-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total Products', value: '124', icon: '📦', color: 'from-blue-400 to-cyan-500' },
                { label: 'Total Orders', value: '45', icon: '🛍️', color: 'from-green-400 to-emerald-500' },
                { label: 'Total Customers', value: '1,234', icon: '👥', color: 'from-purple-400 to-pink-500' },
                { label: 'Revenue', value: '$52,345', icon: '💰', color: 'from-yellow-400 to-amber-500' },
              ].map((stat, index) => (
                <div key={index} className={`bg-gradient-to-r ${stat.color} p-6 rounded-2xl`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-black/70 text-sm">{stat.label}</p>
                      <p className="text-3xl font-bold text-black mt-2">{stat.value}</p>
                    </div>
                    <span className="text-4xl">{stat.icon}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Orders</h2>
              <div className="bg-white/5 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Order ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Customer</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Total</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <tr key={item} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-white">#ORD-{2024000 + item}</td>
                        <td className="px-6 py-4 text-gray-300">Customer {item}</td>
                        <td className="px-6 py-4 text-gray-300">2024-02-{10 + item}</td>
                        <td className="px-6 py-4 text-yellow-400 font-semibold">${(Math.random() * 5000 + 500).toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item % 3 === 0 ? 'bg-green-500/20 text-green-400' :
                            item % 3 === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {item % 3 === 0 ? 'Delivered' : item % 3 === 1 ? 'Processing' : 'Shipped'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-yellow-400 hover:text-yellow-500 transition-colors">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-effect p-6 rounded-2xl hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center text-2xl">
                    ➕
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Add New Product</h3>
                    <p className="text-sm text-gray-400">Add products to inventory</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-effect p-6 rounded-2xl hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-2xl">
                    📊
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">View Reports</h3>
                    <p className="text-sm text-gray-400">Sales and analytics</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-effect p-6 rounded-2xl hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-2xl">
                    ⚙️
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Store Settings</h3>
                    <p className="text-sm text-gray-400">Configure your store</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}