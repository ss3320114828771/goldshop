'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface AdminSidebarProps {
  isOpen: boolean
  onClose?: () => void
}

interface NavItem {
  name: string
  href: string
  icon: string
  badge?: string
  badgeColor?: string
  subItems?: SubNavItem[]
}

interface SubNavItem {
  name: string
  href: string
  icon?: string
}

interface QuickStat {
  label: string
  value: string | number
  change: string
  trend: 'up' | 'down' | 'neutral'
  icon: string
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile && onClose) {
      onClose()
    }
  }, [pathname, isMobile, onClose])

  const toggleExpand = (itemName: string): void => {
    setExpandedItems(prev =>
      prev.includes(itemName)
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

  const isActive = (href: string): boolean => {
    if (href === '/admin') {
      return pathname === '/admin' || pathname === '/admin/dashboard'
    }
    return pathname?.startsWith(href) || false
  }

  const mainNavItems: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: '📊'
    },
    {
      name: 'Orders',
      href: '/admin/orders',
      icon: '🛍️',
      badge: '12',
      badgeColor: 'from-blue-400 to-blue-600',
      subItems: [
        { name: 'All Orders', href: '/admin/orders', icon: '📋' },
        { name: 'Pending', href: '/admin/orders/pending', icon: '⏳' },
        { name: 'Processing', href: '/admin/orders/processing', icon: '⚙️' },
        { name: 'Shipped', href: '/admin/orders/shipped', icon: '🚚' },
        { name: 'Delivered', href: '/admin/orders/delivered', icon: '✅' },
        { name: 'Cancelled', href: '/admin/orders/cancelled', icon: '❌' }
      ]
    },
    {
      name: 'Products',
      href: '/admin/products',
      icon: '💎',
      subItems: [
        { name: 'All Products', href: '/admin/products', icon: '📦' },
        { name: 'Add New', href: '/admin/products/new', icon: '➕' },
        { name: 'Categories', href: '/admin/products/categories', icon: '🏷️' },
        { name: 'Collections', href: '/admin/products/collections', icon: '✨' },
        { name: 'Reviews', href: '/admin/products/reviews', icon: '⭐' }
      ]
    },
    {
      name: 'Inventory',
      href: '/admin/inventory',
      icon: '📦',
      badge: 'Low Stock',
      badgeColor: 'from-red-400 to-red-600'
    },
    {
      name: 'Customers',
      href: '/admin/customers',
      icon: '👥',
      subItems: [
        { name: 'All Customers', href: '/admin/customers', icon: '📇' },
        { name: 'VIP Customers', href: '/admin/customers/vip', icon: '👑' },
        { name: 'Groups', href: '/admin/customers/groups', icon: '👪' }
      ]
    },
    {
      name: 'Marketing',
      href: '/admin/marketing',
      icon: '📢',
      subItems: [
        { name: 'Campaigns', href: '/admin/marketing/campaigns', icon: '📣' },
        { name: 'Discounts', href: '/admin/marketing/discounts', icon: '🏷️' },
        { name: 'Newsletter', href: '/admin/marketing/newsletter', icon: '📧' }
      ]
    },
    {
      name: 'Reports',
      href: '/admin/reports',
      icon: '📈',
      subItems: [
        { name: 'Sales Report', href: '/admin/reports/sales', icon: '💰' },
        { name: 'Inventory Report', href: '/admin/reports/inventory', icon: '📊' },
        { name: 'Customer Report', href: '/admin/reports/customers', icon: '👥' },
        { name: 'Analytics', href: '/admin/reports/analytics', icon: '📉' }
      ]
    },
    {
      name: 'Content',
      href: '/admin/content',
      icon: '📝',
      subItems: [
        { name: 'Pages', href: '/admin/content/pages', icon: '📄' },
        { name: 'Blog', href: '/admin/content/blog', icon: '✍️' },
        { name: 'Media', href: '/admin/content/media', icon: '🖼️' },
        { name: 'FAQ', href: '/admin/content/faq', icon: '❓' }
      ]
    },
    {
      name: 'Appearance',
      href: '/admin/appearance',
      icon: '🎨',
      subItems: [
        { name: 'Themes', href: '/admin/appearance/themes', icon: '🌈' },
        { name: 'Customize', href: '/admin/appearance/customize', icon: '🛠️' },
        { name: 'Widgets', href: '/admin/appearance/widgets', icon: '🧩' }
      ]
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: '⚙️',
      subItems: [
        { name: 'General', href: '/admin/settings/general', icon: '⚙️' },
        { name: 'Store', href: '/admin/settings/store', icon: '🏪' },
        { name: 'Payment', href: '/admin/settings/payment', icon: '💳' },
        { name: 'Shipping', href: '/admin/settings/shipping', icon: '🚚' },
        { name: 'Tax', href: '/admin/settings/tax', icon: '💰' },
        { name: 'Email', href: '/admin/settings/email', icon: '📧' }
      ]
    }
  ]

  const bottomNavItems: NavItem[] = [
    {
      name: 'Help Center',
      href: '/admin/help',
      icon: '❓'
    },
    {
      name: 'Documentation',
      href: '/admin/docs',
      icon: '📚'
    }
  ]

  const quickStats: QuickStat[] = [
    { label: 'Today\'s Sales', value: '$12.4k', change: '+8%', trend: 'up', icon: '💰' },
    { label: 'Orders', value: '156', change: '+12%', trend: 'up', icon: '🛍️' },
    { label: 'Conversion', value: '3.2%', change: '-0.5%', trend: 'down', icon: '📊' }
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-72 bg-black/95 backdrop-blur-md border-r border-white/10
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
        aria-label="Admin navigation sidebar"
      >
        {/* Logo Area */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
          <Link 
            href="/admin/dashboard" 
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
              <span className="text-2xl">💎</span>
            </div>
            <div>
              <h2 className="text-xl font-bold">
                <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent bg-[length:200%_200%]">
                  Jweelary
                </span>
              </h2>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </Link>

          {/* Close button - Mobile only */}
          {isMobile && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
              aria-label="Close sidebar"
            >
              <span className="text-xl">✕</span>
            </button>
          )}
        </div>

        {/* Quick Stats */}
        <div className="p-4 border-b border-white/10">
          <div className="grid grid-cols-3 gap-2">
            {quickStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-xl p-3 text-center"
              >
                <span className="text-lg block mb-1">{stat.icon}</span>
                <p className="text-white font-semibold text-sm">{stat.value}</p>
                <div className="flex items-center justify-center gap-1">
                  <span className={`text-xs ${
                    stat.trend === 'up' ? 'text-green-400' : 
                    stat.trend === 'down' ? 'text-red-400' : 
                    'text-gray-400'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500 text-xs">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {/* Main Navigation */}
            {mainNavItems.map((item) => (
              <div key={item.href} className="space-y-1">
                {item.subItems ? (
                  // Item with submenu
                  <>
                    <button
                      onClick={() => toggleExpand(item.name)}
                      className={`
                        w-full flex items-center justify-between px-3 py-2.5 rounded-xl
                        transition-all duration-300 group
                        ${isActive(item.href)
                          ? 'bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-400/30'
                          : 'hover:bg-white/10'
                        }
                      `}
                      aria-expanded={expandedItems.includes(item.name)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </span>
                        <span className={`text-sm font-medium ${
                          isActive(item.href) ? 'text-yellow-400' : 'text-white'
                        }`}>
                          {item.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className={`px-2 py-0.5 text-xs font-bold text-white rounded-full bg-gradient-to-r ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                        )}
                        <span className={`text-gray-400 text-xs transition-transform duration-300 ${
                          expandedItems.includes(item.name) ? 'rotate-180' : ''
                        }`}>
                          ▼
                        </span>
                      </div>
                    </button>

                    {/* Submenu */}
                    <div
                      className={`
                        ml-8 space-y-1 overflow-hidden transition-all duration-300
                        ${expandedItems.includes(item.name) ? 'max-h-96' : 'max-h-0'}
                      `}
                    >
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`
                            flex items-center gap-3 px-3 py-2 rounded-xl
                            transition-all duration-300 group
                            ${pathname === subItem.href
                              ? 'bg-yellow-400/10 text-yellow-400'
                              : 'text-gray-400 hover:bg-white/10 hover:text-white'
                            }
                          `}
                        >
                          {subItem.icon && (
                            <span className="text-base group-hover:scale-110 transition-transform">
                              {subItem.icon}
                            </span>
                          )}
                          <span className="text-xs">{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  // Item without submenu
                  <Link
                    href={item.href}
                    className={`
                      flex items-center justify-between px-3 py-2.5 rounded-xl
                      transition-all duration-300 group
                      ${isActive(item.href)
                        ? 'bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-400/30'
                        : 'hover:bg-white/10'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </span>
                      <span className={`text-sm font-medium ${
                        isActive(item.href) ? 'text-yellow-400' : 'text-white'
                      }`}>
                        {item.name}
                      </span>
                    </div>
                    {item.badge && (
                      <span className={`px-2 py-0.5 text-xs font-bold text-white rounded-full bg-gradient-to-r ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Navigation */}
          <div className="mt-8 pt-4 border-t border-white/10">
            <div className="space-y-1">
              {bottomNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl
                    transition-all duration-300 group
                    ${isActive(item.href)
                      ? 'bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-400/30'
                      : 'hover:bg-white/10'
                    }
                  `}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <span className={`text-sm font-medium ${
                    isActive(item.href) ? 'text-yellow-400' : 'text-white'
                  }`}>
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Store Info */}
        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🏪</span>
              <div>
                <h4 className="text-sm font-semibold text-white">Jweelary Store</h4>
                <p className="text-xs text-gray-500">Premium Jewelry</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Store Status</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-green-400">Live</span>
              </span>
            </div>
            <div className="flex items-center justify-between text-xs mt-1">
              <span className="text-gray-400">Version</span>
              <span className="text-white">2.1.0</span>
            </div>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-center text-xs text-yellow-400 hover:text-yellow-500 transition-colors"
            >
              View Store →
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}