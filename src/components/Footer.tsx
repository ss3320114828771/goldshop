import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Hafiz Sajid Syed
            </h3>
            <p className="text-gray-400">
              Premium laptops, gold, and jewelry since 1995. Exquisite craftsmanship meets modern technology.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons - Using Emoji/Unicode */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-400 hover:to-amber-500 hover:text-black transition-all duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <span className="text-xl">📘</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-400 hover:to-amber-500 hover:text-black transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <span className="text-xl">📷</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-400 hover:to-amber-500 hover:text-black transition-all duration-300 transform hover:scale-110"
                aria-label="Twitter"
              >
                <span className="text-xl">🐦</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-400 hover:to-amber-500 hover:text-black transition-all duration-300 transform hover:scale-110"
                aria-label="WhatsApp"
              >
                <span className="text-xl">💬</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-400">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Products', 'Contact', 'Directions'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase()}`} 
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-yellow-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-400">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start space-x-2">
                <span className="text-yellow-400">📍</span>
                <span>123 Jewelry Street, Gold Market, City</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-yellow-400">📞</span>
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-yellow-400">✉️</span>
                <span>info@hafizsajid.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-400">Newsletter</h4>
            <p className="text-gray-400">Subscribe for exclusive offers and updates</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-500"
              />
              <button className="absolute right-1 top-1 px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold rounded-lg hover:scale-95 transition-transform duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Hafiz Sajid Syed - Gold & Jewelry Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer