'use client'

import { useState, useEffect, useCallback } from 'react'

// ============== Types ==============

export interface FilterOption {
  id: string
  label: string
  value: string
  count?: number
}

export interface FilterCategory {
  id: string
  name: string
  type: 'checkbox' | 'radio' | 'range' | 'color' | 'size' | 'rating' | 'toggle'
  options?: FilterOption[]
  min?: number
  max?: number
  step?: number
  unit?: string
}

export interface ProductFilterProps {
  categories: FilterCategory[]
  selectedFilters: Record<string, any>
  onFilterChange: (filters: Record<string, any>) => void
  onClearFilters?: () => void
  showSearch?: boolean
  searchPlaceholder?: string
  onSearch?: (query: string) => void
  searchQuery?: string
  showApplyButton?: boolean
  showResetButton?: boolean
  showCounts?: boolean
  collapsible?: boolean
  className?: string
  sortOptions?: Array<{ label: string; value: string }>
  onSortChange?: (value: string) => void
  sortValue?: string
  totalProducts?: number
}

// ============== Main Component ==============

export default function ProductFilter({
  categories,
  selectedFilters,
  onFilterChange,
  onClearFilters,
  showSearch = false,
  searchPlaceholder = 'Search products...',
  onSearch,
  searchQuery = '',
  showApplyButton = false,
  showResetButton = true,
  showCounts = true,
  collapsible = true,
  className = '',
  sortOptions,
  onSortChange,
  sortValue,
  totalProducts
}: ProductFilterProps) {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})
  const [localSearchQuery, setLocalSearchQuery] = useState<string>(searchQuery)
  const [tempFilters, setTempFilters] = useState<Record<string, any>>(selectedFilters)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])

  // Initialize expanded state
  useEffect(() => {
    const initialExpanded: Record<string, boolean> = {}
    categories.forEach(category => {
      initialExpanded[category.id] = true
    })
    setExpandedCategories(initialExpanded)
  }, [categories])

  // Update temp filters when selected filters change
  useEffect(() => {
    setTempFilters(selectedFilters)
    
    // Update price range if range category exists
    const rangeCategory = categories.find(c => c.type === 'range')
    if (rangeCategory) {
      const rangeValue = selectedFilters[rangeCategory.id]
      if (Array.isArray(rangeValue) && rangeValue.length === 2) {
        setPriceRange([rangeValue[0], rangeValue[1]])
      } else {
        setPriceRange([rangeCategory.min || 0, rangeCategory.max || 1000])
      }
    }
  }, [selectedFilters, categories])

  const toggleCategory = useCallback((categoryId: string): void => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }))
  }, [])

  const updateFilters = useCallback((newFilters: Record<string, any>): void => {
    setTempFilters(newFilters)
    if (!showApplyButton) {
      onFilterChange(newFilters)
    }
  }, [showApplyButton, onFilterChange])

  const handleCheckboxChange = useCallback((categoryId: string, value: string, checked: boolean): void => {
    const currentValues = tempFilters[categoryId] as string[] || []
    
    let newValues: string[]
    if (checked) {
      newValues = [...currentValues, value]
    } else {
      newValues = currentValues.filter(v => v !== value)
    }
    
    updateFilters({
      ...tempFilters,
      [categoryId]: newValues
    })
  }, [tempFilters, updateFilters])

  const handleRadioChange = useCallback((categoryId: string, value: string): void => {
    updateFilters({
      ...tempFilters,
      [categoryId]: value
    })
  }, [tempFilters, updateFilters])

  const handleRangeChange = useCallback((categoryId: string, values: [number, number]): void => {
    setPriceRange(values)
    updateFilters({
      ...tempFilters,
      [categoryId]: values
    })
  }, [tempFilters, updateFilters])

  const handleColorChange = useCallback((categoryId: string, value: string): void => {
    updateFilters({
      ...tempFilters,
      [categoryId]: value
    })
  }, [tempFilters, updateFilters])

  const handleSizeChange = useCallback((categoryId: string, value: string): void => {
    updateFilters({
      ...tempFilters,
      [categoryId]: value
    })
  }, [tempFilters, updateFilters])

  const handleRatingChange = useCallback((categoryId: string, rating: number): void => {
    updateFilters({
      ...tempFilters,
      [categoryId]: rating
    })
  }, [tempFilters, updateFilters])

  const handleToggleChange = useCallback((categoryId: string, checked: boolean): void => {
    updateFilters({
      ...tempFilters,
      [categoryId]: checked
    })
  }, [tempFilters, updateFilters])

  const handleApplyFilters = useCallback((): void => {
    onFilterChange(tempFilters)
  }, [tempFilters, onFilterChange])

  const handleClearFilters = useCallback((): void => {
    const resetFilters: Record<string, any> = {}
    
    categories.forEach(category => {
      switch (category.type) {
        case 'checkbox':
          resetFilters[category.id] = []
          break
        case 'radio':
        case 'color':
        case 'size':
          resetFilters[category.id] = ''
          break
        case 'range':
          resetFilters[category.id] = [category.min || 0, category.max || 1000]
          setPriceRange([category.min || 0, category.max || 1000])
          break
        case 'rating':
          resetFilters[category.id] = 0
          break
        case 'toggle':
          resetFilters[category.id] = false
          break
      }
    })
    
    setTempFilters(resetFilters)
    
    if (onClearFilters) {
      onClearFilters()
    } else {
      onFilterChange(resetFilters)
    }
  }, [categories, onClearFilters, onFilterChange])

  const handleSearchSubmit = useCallback((e: React.FormEvent): void => {
    e.preventDefault()
    onSearch?.(localSearchQuery)
  }, [localSearchQuery, onSearch])

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
    onSortChange?.(e.target.value)
  }, [onSortChange])

  const getSelectedCount = (): number => {
    let count = 0
    
    Object.entries(tempFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        count += value.length
      } else if (typeof value === 'boolean') {
        if (value) count++
      } else if (typeof value === 'string') {
        if (value) count++
      } else if (typeof value === 'number') {
        if (value > 0) count++
      }
    })
    
    return count
  }

  const selectedCount = getSelectedCount()

  const renderFilterContent = (category: FilterCategory): React.ReactNode => {
    const currentValue = tempFilters[category.id]

    switch (category.type) {
      case 'checkbox':
        return (
          <div className="space-y-2">
            {category.options?.map((option) => {
              const values = (currentValue as string[]) || []
              return (
                <label
                  key={option.id}
                  className="flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={values.includes(option.value)}
                      onChange={(e) => handleCheckboxChange(category.id, option.value, e.target.checked)}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-yellow-400 focus:ring-yellow-400"
                    />
                    <span className="text-sm text-gray-300 group-hover:text-white">
                      {option.label}
                    </span>
                  </div>
                  {showCounts && option.count !== undefined && (
                    <span className="text-xs text-gray-500">
                      ({option.count})
                    </span>
                  )}
                </label>
              )
            })}
          </div>
        )

      case 'radio':
        return (
          <div className="space-y-2">
            {category.options?.map((option) => (
              <label
                key={option.id}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={category.id}
                    value={option.value}
                    checked={currentValue === option.value}
                    onChange={() => handleRadioChange(category.id, option.value)}
                    className="w-4 h-4 border-gray-600 bg-gray-800 text-yellow-400 focus:ring-yellow-400"
                  />
                  <span className="text-sm text-gray-300 group-hover:text-white">
                    {option.label}
                  </span>
                </div>
                {showCounts && option.count !== undefined && (
                  <span className="text-xs text-gray-500">
                    ({option.count})
                  </span>
                )}
              </label>
            ))}
          </div>
        )

      case 'range':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                {category.unit}{priceRange[0]}
              </span>
              <span className="text-sm text-gray-400">
                {category.unit}{priceRange[1]}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={category.min || 0}
                max={category.max || 1000}
                step={category.step || 10}
                value={priceRange[0]}
                onChange={(e) => handleRangeChange(category.id, [parseInt(e.target.value), priceRange[1]])}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
              <input
                type="range"
                min={category.min || 0}
                max={category.max || 1000}
                step={category.step || 10}
                value={priceRange[1]}
                onChange={(e) => handleRangeChange(category.id, [priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
            </div>
          </div>
        )

      case 'color':
        return (
          <div className="flex flex-wrap gap-2">
            {category.options?.map((option) => (
              <button
                key={option.id}
                onClick={() => handleColorChange(category.id, option.value)}
                className={`
                  w-8 h-8 rounded-full border-2 transition-all
                  ${currentValue === option.value 
                    ? 'border-yellow-400 scale-110' 
                    : 'border-transparent hover:scale-110'
                  }
                `}
                style={{ backgroundColor: option.value }}
                title={option.label}
              />
            ))}
          </div>
        )

      case 'size':
        return (
          <div className="flex flex-wrap gap-2">
            {category.options?.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSizeChange(category.id, option.value)}
                className={`
                  px-3 py-1.5 text-sm font-medium rounded-lg transition-all
                  ${currentValue === option.value
                    ? 'bg-yellow-400 text-black'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                {option.label}
                {showCounts && option.count !== undefined && (
                  <span className="ml-1 text-xs">
                    ({option.count})
                  </span>
                )}
              </button>
            ))}
          </div>
        )

      case 'rating':
        return (
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={category.id}
                    checked={currentValue === rating}
                    onChange={() => handleRatingChange(category.id, rating)}
                    className="w-4 h-4 border-gray-600 bg-gray-800 text-yellow-400 focus:ring-yellow-400"
                  />
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < rating ? 'text-yellow-400' : 'text-gray-600'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">& Up</span>
                </div>
              </label>
            ))}
          </div>
        )

      case 'toggle':
        return (
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-300">Show only</span>
            <button
              onClick={() => handleToggleChange(category.id, !currentValue)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${currentValue ? 'bg-yellow-400' : 'bg-gray-600'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${currentValue ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </label>
        )

      default:
        return null
    }
  }

  const filterContent = (
    <div className="space-y-6">
      {/* Search */}
      {showSearch && (
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="search"
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 text-white placeholder-gray-500"
          />
        </form>
      )}

      {/* Sort Options */}
      {sortOptions && onSortChange && (
        <div className="pb-6 border-b border-gray-800">
          <h3 className="text-sm font-semibold text-white mb-3">Sort By</h3>
          <select
            value={sortValue}
            onChange={handleSortChange}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 text-white"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Filter Categories */}
      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="border-b border-gray-800 pb-4 last:border-0"
          >
            {/* Category Header */}
            <button
              onClick={() => collapsible && toggleCategory(category.id)}
              className="w-full flex items-center justify-between group"
            >
              <h3 className="text-sm font-semibold text-white group-hover:text-yellow-400">
                {category.name}
              </h3>
              {collapsible && (
                <span className="text-gray-500 text-lg">
                  {expandedCategories[category.id] ? '−' : '+'}
                </span>
              )}
            </button>

            {/* Category Content */}
            {expandedCategories[category.id] && (
              <div className="mt-3">
                {renderFilterContent(category)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Selected Filters Count */}
      {selectedCount > 0 && (
        <div className="pt-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">
              {selectedCount} filter{selectedCount !== 1 ? 's' : ''} selected
            </span>
            {showResetButton && (
              <button
                onClick={handleClearFilters}
                className="text-yellow-400 hover:text-yellow-500 text-sm font-medium"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      )}

      {/* Apply Button */}
      {showApplyButton && (
        <button
          onClick={handleApplyFilters}
          className="w-full py-3 px-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors"
        >
          Apply Filters
        </button>
      )}
    </div>
  )

  return (
    <div className={`bg-gray-900 rounded-2xl p-6 ${className}`}>
      {filterContent}
    </div>
  )
}