'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface AdminHeaderProps {
  onMenuClick?: () => void
  isSidebarOpen?: boolean
}

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: 'order' | 'message' | 'alert' | 'success'
}

interface UserMenuOption {
  label: string
  href: string
  icon: string
}

export default function AdminHeader({ onMenuClick, isSidebarOpen = false }: AdminHeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false)
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Order',
      message: 'Order #12345 has been placed',
      time: '5 min ago',
      read: false,
      type: 'order'
    },
    {
      id: '2',
      title: 'New Message',
      message: 'Customer inquiry about product',
      time: '15 min ago',
      read: false,
      type: 'message'
    },
    {
      id: '3',
      title: 'Low Stock Alert',
      message: 'Diamond Ring SKU: DR-123 is low on stock',
      time: '1 hour ago',
      read: true,
      type: 'alert'
    },
    {
      id: '4',
      title: 'Order Shipped',
      message: 'Order #12340 has been shipped',
      time: '2 hours ago',
      read: true,
      type: 'success'
    }
  ])

  const userMenuOptions: UserMenuOption[] = [
    { label: 'Profile', href: '/admin/profile', icon: '👤' },
    { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
    { label: 'Activity Log', href: '/admin/activity', icon: '📊' },
    { label: 'Help Center', href: '/admin/help', icon: '❓' }
  ]

  const getPageTitle = (): string => {
    if (pathname?.includes('/admin/dashboard')) return 'Dashboard'
    if (pathname?.includes('/admin/orders')) return 'Orders'
    if (pathname?.includes('/admin/products')) return 'Products'
    if (pathname?.includes('/admin/customers')) return 'Customers'
    if (pathname?.includes('/admin/inventory')) return 'Inventory'
    if (pathname?.includes('/admin/reports')) return 'Reports'
    if (pathname?.includes('/admin/settings')) return 'Settings'
    if (pathname?.includes('/admin/profile')) return 'Profile'
    return 'Admin Panel'
  }

  const getNotificationIcon = (type: Notification['type']): string => {
    switch (type) {
      case 'order': return '🛍️'
      case 'message': return '💬'
      case 'alert': return '⚠️'
      case 'success': return '✅'
      default: return '📌'
    }
  }

  const getNotificationColor = (type: Notification['type']): string => {
    switch (type) {
      case 'order': return 'from-blue-400 to-blue-600'
      case 'message': return 'from-purple-400 to-pink-500'
      case 'alert': return 'from-red-400 to-red-600'
      case 'success': return 'from-green-400 to-emerald-500'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const markAsRead = (notificationId: string): void => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = (): void => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const deleteNotification = (notificationId: string): void => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/admin/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  const handleLogout = (): void => {
    // Add your logout logic here
    router.push('/admin/login')
  }

  return (
    <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Menu Button & Page Title */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
              aria-label="Toggle sidebar"
              aria-expanded={isSidebarOpen}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-white transition-transform duration-300 ${
                  isSidebarOpen ? 'rotate-45 translate-y-2' : ''
                }`} />
                <span className={`w-full h-0.5 bg-white transition-opacity duration-300 ${
                  isSidebarOpen ? 'opacity-0' : ''
                }`} />
                <span className={`w-full h-0.5 bg-white transition-transform duration-300 ${
                  isSidebarOpen ? '-rotate-45 -translate-y-2' : ''
                }`} />
              </div>
            </button>

            {/* Page Title */}
            <div>
              <h1 className="text-xl lg:text-2xl font-bold">
                <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent bg-[length:200%_200%]">
                  {getPageTitle()}
                </span>
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>

          {/* Right Section - Search, Notifications, Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Button */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-300 relative"
                aria-label="Search"
              >
                <span className="text-xl">🔍</span>
              </button>

              {/* Search Dropdown */}
              {isSearchOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30"
                    onClick={() => setIsSearchOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 z-40">
                    <div className="bg-black/95 backdrop-blur-md rounded-2xl border border-white/10 p-4">
                      <form onSubmit={handleSearch}>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                            🔍
                          </span>
                          <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search orders, products, customers..."
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 text-white placeholder-gray-500 transition-all duration-300"
                            autoFocus
                          />
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          Press Enter to search
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-300 relative"
                aria-label="Notifications"
              >
                <span className="text-xl">🔔</span>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center text-xs font-bold text-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30"
                    onClick={() => setIsNotificationsOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 z-40">
                    <div className="bg-black/95 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
                      {/* Header */}
                      <div className="flex items-center justify-between p-4 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">🔔</span>
                          <h3 className="font-bold text-white">Notifications</h3>
                          {unreadCount > 0 && (
                            <span className="px-2 py-1 bg-yellow-400/20 text-yellow-400 text-xs rounded-full">
                              {unreadCount} new
                            </span>
                          )}
                        </div>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-xs text-yellow-400 hover:text-yellow-500 transition-colors"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>

                      {/* Notifications List */}
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-4 border-b border-white/10 hover:bg-white/5 transition-colors duration-300 ${
                                !notification.read ? 'bg-yellow-400/5' : ''
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${getNotificationColor(notification.type)} flex items-center justify-center text-xl flex-shrink-0`}>
                                  {getNotificationIcon(notification.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <div>
                                      <h4 className="font-semibold text-white text-sm">
                                        {notification.title}
                                      </h4>
                                      <p className="text-gray-400 text-xs mt-1">
                                        {notification.message}
                                      </p>
                                      <span className="text-gray-500 text-xs mt-2 block">
                                        {notification.time}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      {!notification.read && (
                                        <button
                                          onClick={() => markAsRead(notification.id)}
                                          className="p-1 hover:bg-white/10 rounded transition-colors"
                                          aria-label="Mark as read"
                                        >
                                          <span className="text-xs text-gray-400">✓</span>
                                        </button>
                                      )}
                                      <button
                                        onClick={() => deleteNotification(notification.id)}
                                        className="p-1 hover:bg-white/10 rounded transition-colors"
                                        aria-label="Delete notification"
                                      >
                                        <span className="text-xs text-gray-400">✕</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center">
                            <span className="text-4xl block mb-3">📭</span>
                            <p className="text-gray-400 text-sm">No notifications</p>
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="p-4 border-t border-white/10">
                        <Link
                          href="/admin/notifications"
                          className="block text-center text-sm text-yellow-400 hover:text-yellow-500 transition-colors"
                          onClick={() => setIsNotificationsOpen(false)}
                        >
                          View all notifications
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/10 transition-colors duration-300 group"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center">
                  <span className="text-sm font-bold text-black">AD</span>
                </div>
                <span className="hidden lg:block text-sm font-medium text-white group-hover:text-yellow-400 transition-colors">
                  Admin
                </span>
                <span className={`hidden lg:block text-xs transition-transform duration-300 ${
                  isProfileOpen ? 'rotate-180' : ''
                }`}>
                  ▼
                </span>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30"
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 z-40">
                    <div className="bg-black/95 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
                      {/* User Info */}
                      <div className="p-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center">
                            <span className="text-lg font-bold text-black">AD</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">Admin User</h4>
                            <p className="text-gray-400 text-xs">admin@jweelary.com</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Options */}
                      <div className="p-2">
                        {userMenuOptions.map((option) => (
                          <Link
                            key={option.href}
                            href={option.href}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors duration-300 group"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <span className="text-xl group-hover:scale-110 transition-transform">
                              {option.icon}
                            </span>
                            <span className="text-sm text-white group-hover:text-yellow-400 transition-colors">
                              {option.label}
                            </span>
                          </Link>
                        ))}

                        <div className="border-t border-white/10 my-2" />

                        {/* Logout Button */}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 transition-colors duration-300 group"
                        >
                          <span className="text-xl group-hover:scale-110 transition-transform">
                            🚪
                          </span>
                          <span className="text-sm text-white group-hover:text-red-400 transition-colors">
                            Logout
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}