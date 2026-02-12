'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export interface SearchSuggestion {
  id: string
  text: string
  category?: string
  icon?: string
  href?: string
  image?: string
  price?: string
  badge?: string
}

export interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  onSuggestionClick?: (suggestion: SearchSuggestion) => void
  suggestions?: SearchSuggestion[]
  recentSearches?: string[]
  popularSearches?: string[]
  value?: string
  onChange?: (value: string) => void
  variant?: 'default' | 'minimal' | 'hero' | 'compact'
  size?: 'sm' | 'md' | 'lg'
  shape?: 'rounded' | 'pill' | 'square'
  fullWidth?: boolean
  autoFocus?: boolean
  debounceMs?: number
  showRecentSearches?: boolean
  showPopularSearches?: boolean
  showSuggestions?: boolean
  showClearButton?: boolean
  showSearchButton?: boolean
  showVoiceSearch?: boolean
  showScanButton?: boolean
  searchButtonText?: string
  maxSuggestions?: number
  maxRecentSearches?: number
  maxPopularSearches?: number
  className?: string
  inputClassName?: string
  onFocus?: () => void
  onBlur?: () => void
  onClear?: () => void
  isLoading?: boolean
  error?: string
}

export default function SearchBar({
  placeholder = 'Search for jewelry, watches, gifts...',
  onSearch,
  onSuggestionClick,
  suggestions = [],
  recentSearches = [],
  popularSearches = [],
  value: externalValue,
  onChange: externalOnChange,
  variant = 'default',
  size = 'md',
  shape = 'rounded',
  fullWidth = false,
  autoFocus = false,
  debounceMs = 300,
  showRecentSearches = true,
  showPopularSearches = true,
  showSuggestions = true,
  showClearButton = true,
  showSearchButton = false,
  showVoiceSearch = false,
  showScanButton = false,
  searchButtonText = 'Search',
  maxSuggestions = 5,
  maxRecentSearches = 3,
  maxPopularSearches = 3,
  className = '',
  inputClassName = '',
  onFocus,
  onBlur,
  onClear,
  isLoading = false,
  error
}: SearchBarProps) {
  const router = useRouter()
  const [internalQuery, setInternalQuery] = useState<string>('')
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isListening, setIsListening] = useState<boolean>(false)
  const [showResults, setShowResults] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const [isScanning, setIsScanning] = useState<boolean>(false)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const recognitionRef = useRef<any>(null)

  const query = externalValue !== undefined ? externalValue : internalQuery

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInternalQuery(transcript)
        externalOnChange?.(transcript)
        onSearch?.(transcript)
        setIsListening(false)
      }

      recognitionRef.current.onerror = () => {
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [externalOnChange, onSearch])

  const debouncedSearch = useCallback((searchQuery: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(() => {
      onSearch?.(searchQuery)
    }, debounceMs)
  }, [debounceMs, onSearch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value
    
    if (externalValue === undefined) {
      setInternalQuery(newValue)
    }
    
    externalOnChange?.(newValue)
    debouncedSearch(newValue)
    setShowResults(true)
    setActiveIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const filteredSuggestions = getFilteredSuggestions()
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex(prev => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (activeIndex >= 0 && filteredSuggestions[activeIndex]) {
          handleSuggestionClick(filteredSuggestions[activeIndex])
        } else {
          handleSearch()
        }
        break
      case 'Escape':
        setShowResults(false)
        setActiveIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleSearch = (): void => {
    if (query.trim()) {
      onSearch?.(query.trim())
      setShowResults(false)
      
      // Save to localStorage
      const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]')
      const updated = [query.trim(), ...recent.filter((s: string) => s !== query.trim())].slice(0, 5)
      localStorage.setItem('recentSearches', JSON.stringify(updated))
    }
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion): void => {
    if (suggestion.href) {
      router.push(suggestion.href)
    }
    
    if (onSuggestionClick) {
      onSuggestionClick(suggestion)
    }
    
    setInternalQuery(suggestion.text)
    externalOnChange?.(suggestion.text)
    setShowResults(false)
    setActiveIndex(-1)
  }

  const handleRecentClick = (search: string): void => {
    setInternalQuery(search)
    externalOnChange?.(search)
    onSearch?.(search)
    setShowResults(false)
  }

  const handleClear = (): void => {
    if (externalValue === undefined) {
      setInternalQuery('')
    }
    externalOnChange?.('')
    onClear?.()
    inputRef.current?.focus()
    setShowResults(false)
    setActiveIndex(-1)
  }

  const handleVoiceSearch = (): void => {
    if (isListening) {
      recognitionRef.current?.abort()
      setIsListening(false)
    } else {
      recognitionRef.current?.start()
      setIsListening(true)
    }
  }

  const handleScan = (): void => {
    setIsScanning(true)
    // Simulate scan - replace with actual camera/scan implementation
    setTimeout(() => {
      setIsScanning(false)
      setInternalQuery('Diamond Ring')
      externalOnChange?.('Diamond Ring')
      onSearch?.('Diamond Ring')
    }, 2000)
  }

  const getFilteredSuggestions = (): SearchSuggestion[] => {
    if (!query.trim()) return suggestions.slice(0, maxSuggestions)
    
    return suggestions
      .filter(s => 
        s.text.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, maxSuggestions)
  }

  const getVariantClasses = (): string => {
    const variants = {
      default: `
        bg-white/5 backdrop-blur-md
        border border-white/10
        focus-within:border-yellow-400
        focus-within:ring-2 focus-within:ring-yellow-400/20
      `,
      minimal: `
        bg-transparent
        border-b-2 border-white/10
        focus-within:border-yellow-400
        rounded-none px-0
      `,
      hero: `
        bg-white/10 backdrop-blur-xl
        border-2 border-white/20
        focus-within:border-yellow-400
        focus-within:shadow-lg focus-within:shadow-yellow-400/25
        text-lg
      `,
      compact: `
        bg-white/5
        border border-white/10
        focus-within:border-yellow-400
        text-sm
      `
    }
    return variants[variant] || variants.default
  }

  const getSizeClasses = (): string => {
    const sizes = {
      sm: 'h-10 text-sm',
      md: 'h-12 text-base',
      lg: 'h-14 text-lg'
    }
    return sizes[size] || sizes.md
  }

  const getShapeClasses = (): string => {
    const shapes = {
      rounded: 'rounded-lg',
      pill: 'rounded-full',
      square: 'rounded-none'
    }
    return shapes[shape] || shapes.rounded
  }

  const getInputPadding = (): string => {
    let padding = ''
    
    if (variant === 'minimal') {
      padding = 'pl-0 pr-8'
    } else {
      padding = 'pl-12'
      if (showClearButton && query) padding += ' pr-24'
      else if (showVoiceSearch || showScanButton) padding += ' pr-20'
      else padding += ' pr-4'
    }
    
    return padding
  }

  const filteredSuggestions = getFilteredSuggestions()
  const showDropdown = showResults && isFocused && (
    (showSuggestions && filteredSuggestions.length > 0) ||
    (showRecentSearches && recentSearches.length > 0) ||
    (showPopularSearches && popularSearches.length > 0)
  )

  return (
    <div
      className={`
        relative
        ${fullWidth ? 'w-full' : 'w-full max-w-2xl'}
        ${className}
      `}
    >
      {/* Search Bar Container */}
      <div
        className={`
          relative flex items-center
          ${getVariantClasses()}
          ${getShapeClasses()}
          ${getSizeClasses()}
          transition-all duration-300
        `}
      >
        {/* Search Icon */}
        <span className="absolute left-4 text-gray-500 text-lg">
          🔍
        </span>

        {/* Input */}
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true)
            setShowResults(true)
            onFocus?.()
          }}
          onBlur={() => {
            setIsFocused(false)
            onBlur?.()
          }}
          placeholder={placeholder}
          className={`
            w-full bg-transparent
            text-white placeholder-gray-500
            focus:outline-none
            ${getInputPadding()}
            ${inputClassName}
          `}
          aria-label="Search"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={showDropdown}
          aria-activedescendant={activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined}
        />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute right-4">
            <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Action Buttons */}
        {!isLoading && (
          <div className="absolute right-2 flex items-center gap-1">
            {/* Scan Button */}
            {showScanButton && (
              <button
                onClick={handleScan}
                className={`
                  p-2 text-gray-500 hover:text-yellow-400 
                  transition-colors duration-300
                  ${isScanning ? 'animate-pulse text-yellow-400' : ''}
                `}
                aria-label="Scan product"
              >
                <span className="text-lg">📷</span>
              </button>
            )}

            {/* Voice Search */}
            {showVoiceSearch && (
              <button
                onClick={handleVoiceSearch}
                className={`
                  p-2 text-gray-500 hover:text-yellow-400 
                  transition-colors duration-300
                  ${isListening ? 'animate-pulse text-red-400' : ''}
                `}
                aria-label="Voice search"
              >
                <span className="text-lg">🎤</span>
              </button>
            )}

            {/* Clear Button */}
            {showClearButton && query && (
              <button
                onClick={handleClear}
                className="p-2 text-gray-500 hover:text-yellow-400 transition-colors duration-300"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}

            {/* Search Button */}
            {showSearchButton && (
              <button
                onClick={handleSearch}
                className="px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-medium rounded-lg hover:scale-105 transition-all duration-300"
              >
                {searchButtonText}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-xs text-red-400">
          ⚠️ {error}
        </p>
      )}

      {/* Search Results Dropdown */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          id="search-results"
          className="absolute top-full left-0 right-0 mt-2 z-50"
        >
          <div className="bg-black/95 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Suggestions */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="p-2">
                {filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={suggestion.id}
                    id={`suggestion-${index}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2
                      rounded-xl transition-all duration-300
                      ${activeIndex === index 
                        ? 'bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-400/30' 
                        : 'hover:bg-white/10'
                      }
                    `}
                    role="option"
                    aria-selected={activeIndex === index}
                  >
                    {suggestion.image ? (
                      <img
                        src={suggestion.image}
                        alt={suggestion.text}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    ) : (
                      <span className="text-xl text-gray-500">
                        {suggestion.icon || '🔍'}
                      </span>
                    )}
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white">
                          {suggestion.text}
                        </span>
                        {suggestion.badge && (
                          <span className="px-1.5 py-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-xs rounded-full">
                            {suggestion.badge}
                          </span>
                        )}
                      </div>
                      {suggestion.category && (
                        <span className="text-xs text-gray-500">
                          in {suggestion.category}
                        </span>
                      )}
                    </div>
                    {suggestion.price && (
                      <span className="text-sm font-semibold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                        {suggestion.price}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Recent Searches */}
            {showRecentSearches && recentSearches.length > 0 && (
              <div className="p-2 border-t border-white/10">
                <h3 className="text-xs font-semibold text-gray-500 px-3 mb-2">
                  Recent Searches
                </h3>
                {recentSearches.slice(0, maxRecentSearches).map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentClick(search)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors duration-300"
                  >
                    <span className="text-gray-500">🕒</span>
                    <span className="text-sm text-white">{search}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Popular Searches */}
            {showPopularSearches && popularSearches.length > 0 && (
              <div className="p-2 border-t border-white/10">
                <h3 className="text-xs font-semibold text-gray-500 px-3 mb-2">
                  Popular Searches
                </h3>
                <div className="flex flex-wrap gap-2 px-3">
                  {popularSearches.slice(0, maxPopularSearches).map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentClick(search)}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* View All Results */}
            {query && (
              <div className="p-2 border-t border-white/10">
                <button
                  onClick={handleSearch}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/10 transition-colors duration-300"
                >
                  <span className="text-sm text-white">
                    Search for "{query}"
                  </span>
                  <span className="text-yellow-400">→</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Scan Overlay */}
      {isScanning && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-32 h-32 border-4 border-yellow-400/30 rounded-full animate-ping" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl animate-pulse">📷</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Scanning Product
            </h3>
            <p className="text-gray-400 mb-8">
              Please hold your camera steady
            </p>
            <button
              onClick={() => setIsScanning(false)}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Compact Search Bar Variant
export const CompactSearchBar: React.FC<Omit<SearchBarProps, 'variant' | 'size'>> = (props) => (
  <SearchBar
    {...props}
    variant="compact"
    size="sm"
    showSearchButton={false}
    showVoiceSearch={false}
  />
)

// Hero Search Bar Variant
export const HeroSearchBar: React.FC<Omit<SearchBarProps, 'variant' | 'size'>> = (props) => (
  <SearchBar
    {...props}
    variant="hero"
    size="lg"
    showSearchButton
    showVoiceSearch
    showScanButton
    shape="pill"
  />
)

// Minimal Search Bar Variant
export const MinimalSearchBar: React.FC<Omit<SearchBarProps, 'variant'>> = (props) => (
  <SearchBar
    {...props}
    variant="minimal"
    showClearButton
    showSearchButton={false}
    showVoiceSearch={false}
  />
)