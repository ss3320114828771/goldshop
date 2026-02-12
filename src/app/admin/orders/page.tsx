// File: src/app/admin/orders/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminOrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [dateRange, setDateRange] = useState('week')
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])

  // Mock orders data
  const orders = [
    { 
      id: 'ORD-2024001', 
      customer: 'Ahmed Khan', 
      email: 'ahmed.khan@email.com',
      date: '2024-02-12', 
      total: 2499, 
      status: 'delivered',
      payment: 'paid',
      items: 2,
      address: '123 Main St, New York, NY 10001'
    },
    { 
      id: 'ORD-2024002', 
      customer: 'Fatima Ali', 
      email: 'fatima.ali@email.com',
      date: '2024-02-12', 
      total: 3999, 
      status: 'processing',
      payment: 'paid',
      items: 1,
      address: '456 Park Ave, Los Angeles, CA 90001'
    },
    { 
      id: 'ORD-2024003', 
      customer: 'Omar Farooq', 
      email: 'omar.farooq@email.com',
      date: '2024-02-11', 
      total: 1599, 
      status: 'shipped',
      payment: 'paid',
      items: 3,
      address: '789 Oak St, Chicago, IL 60601'
    },
    { 
      id: 'ORD-2024004', 
      customer: 'Zainab Malik', 
      email: 'zainab.malik@email.com',
      date: '2024-02-11', 
      total: 5498, 
      status: 'pending',
      payment: 'unpaid',
      items: 2,
      address: '321 Pine St, Houston, TX 77001'
    },
    { 
      id: 'ORD-2024005', 
      customer: 'Bilal Ahmed', 
      email: 'bilal.ahmed@email.com',
      date: '2024-02-10', 
      total: 2199, 
      status: 'delivered',
      payment: 'paid',
      items: 1,
      address: '654 Cedar St, Phoenix, AZ 85001'
    },
    { 
      id: 'ORD-2024006', 
      customer: 'Ayesha Siddiqui', 
      email: 'ayesha.siddiqui@email.com',
      date: '2024-02-10', 
      total: 899, 
      status: 'processing',
      payment: 'paid',
      items: 1,
      address: '987 Elm St, Philadelphia, PA 19101'
    },
    { 
      id: 'ORD-2024007', 
      customer: 'Usman Chaudhry', 
      email: 'usman.chaudhry@email.com',
      date: '2024-02-09', 
      total: 5999, 
      status: 'shipped',
      payment: 'paid',
      items: 2,
      address: '147 Maple St, San Antonio, TX 78201'
    },
    { 
      id: 'ORD-2024008', 
      customer: 'Sara Khan', 
      email: 'sara.khan@email.com',
      date: '2024-02-09', 
      total: 1299, 
      status: 'cancelled',
      payment: 'refunded',
      items: 1,
      address: '258 Birch St, San Diego, CA 92101'
    },
    { 
      id: 'ORD-2024009', 
      customer: 'Hassan Ali', 
      email: 'hassan.ali@email.com',
      date: '2024-02-08', 
      total: 3299, 
      status: 'delivered',
      payment: 'paid',
      items: 2,
      address: '369 Walnut St, Dallas, TX 75201'
    },
    { 
      id: 'ORD-2024010', 
      customer: 'Nadia Ahmed', 
      email: 'nadia.ahmed@email.com',
      date: '2024-02-08', 
      total: 1799, 
      status: 'processing',
      payment: 'paid',
      items: 1,
      address: '741 Spruce St, San Jose, CA 95101'
    },
  ]

  // Filter orders based on status and search
  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  // Calculate stats
  const totalOrders = orders.length
  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const processingOrders = orders.filter(o => o.status === 'processing').length
  const shippedOrders = orders.filter(o => o.status === 'shipped').length
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'delivered': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'shipped': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getPaymentColor = (payment: string) => {
    switch(payment) {
      case 'paid': return 'text-green-400'
      case 'unpaid': return 'text-yellow-400'
      case 'refunded': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }

  const toggleAllOrders = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(filteredOrders.map(o => o.id))
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Orders Management
            </h1>
            <p className="text-gray-400 mt-2">
              Manage and track all customer orders
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white font-semibold transition-all duration-300 flex items-center space-x-2">
              <span>📊</span>
              <span>Export Report</span>
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold rounded-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2">
              <span>➕</span>
              <span>Create Order</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <div className="glass-effect p-4 rounded-xl">
          <p className="text-gray-400 text-xs">Total Orders</p>
          <p className="text-2xl font-bold text-white mt-1">{totalOrders}</p>
        </div>
        <div className="glass-effect p-4 rounded-xl">
          <p className="text-gray-400 text-xs">Pending</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">{pendingOrders}</p>
        </div>
        <div className="glass-effect p-4 rounded-xl">
          <p className="text-gray-400 text-xs">Processing</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">{processingOrders}</p>
        </div>
        <div className="glass-effect p-4 rounded-xl">
          <p className="text-gray-400 text-xs">Shipped</p>
          <p className="text-2xl font-bold text-purple-400 mt-1">{shippedOrders}</p>
        </div>
        <div className="glass-effect p-4 rounded-xl">
          <p className="text-gray-400 text-xs">Delivered</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{deliveredOrders}</p>
        </div>
        <div className="glass-effect p-4 rounded-xl bg-gradient-to-r from-yellow-400/10 to-amber-500/10">
          <p className="text-gray-400 text-xs">Total Revenue</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">${totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-effect rounded-2xl p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search orders by ID, customer, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 text-white placeholder-gray-500 transition-all duration-300"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 text-white transition-all duration-300"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">Date:</span>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 text-white transition-all duration-300"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-effect rounded-2xl overflow-hidden">
        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div className="bg-gradient-to-r from-yellow-400/20 to-amber-500/20 p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-white font-semibold">{selectedOrders.length} orders selected</span>
                <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm transition-colors">
                  Update Status
                </button>
                <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm transition-colors">
                  Print Labels
                </button>
              </div>
              <button 
                onClick={() => setSelectedOrders([])}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/5">
                <th className="px-6 py-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={toggleAllOrders}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-yellow-400 checked:border-yellow-400 focus:ring-yellow-400 focus:ring-2 transition-all"
                  />
                </th>
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
                  Items
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Payment
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
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => toggleOrderSelection(order.id)}
                        className="w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-yellow-400 checked:border-yellow-400 focus:ring-yellow-400 focus:ring-2 transition-all"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-white font-medium">#{order.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-white font-medium">{order.customer}</span>
                        <span className="text-xs text-gray-400">{order.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300">{order.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300">{order.items} items</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-yellow-400 font-bold">${order.total.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`${getPaymentColor(order.payment)} font-semibold capitalize`}>
                        {order.payment}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button className="text-yellow-400 hover:text-yellow-500 transition-colors">
                          View
                        </button>
                        <button className="text-blue-400 hover:text-blue-500 transition-colors">
                          Edit
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
                      <h3 className="text-xl font-semibold text-white mb-2">No orders found</h3>
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
            Showing 1-{filteredOrders.length} of {orders.length} orders
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
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

      {/* Recent Activity */}
      <div className="mt-8 grid lg:grid-cols-2 gap-8">
        {/* Order Status Distribution */}
        <div className="glass-effect rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Order Status Distribution</h2>
          <div className="space-y-4">
            {[
              { status: 'Pending', count: pendingOrders, color: 'bg-yellow-400', percentage: (pendingOrders/totalOrders)*100 },
              { status: 'Processing', count: processingOrders, color: 'bg-blue-400', percentage: (processingOrders/totalOrders)*100 },
              { status: 'Shipped', count: shippedOrders, color: 'bg-purple-400', percentage: (shippedOrders/totalOrders)*100 },
              { status: 'Delivered', count: deliveredOrders, color: 'bg-green-400', percentage: (deliveredOrders/totalOrders)*100 },
            ].map((item) => (
              <div key={item.status} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`w-3 h-3 ${item.color} rounded-full`}></span>
                    <span className="text-gray-300">{item.status}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-white font-semibold">{item.count}</span>
                    <span className="text-gray-400 text-sm">{item.percentage.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Customers */}
        <div className="glass-effect rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent Customers</h2>
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-full flex items-center justify-center text-yellow-400 font-bold">
                    {order.customer.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{order.customer}</h3>
                    <p className="text-xs text-gray-400">{order.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 font-semibold">${order.total}</p>
                  <p className="text-xs text-gray-400">{order.date}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-white/10">
            <Link 
              href="/admin/customers" 
              className="block text-center text-yellow-400 hover:text-yellow-500 transition-colors text-sm font-semibold"
            >
              View All Customers →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}