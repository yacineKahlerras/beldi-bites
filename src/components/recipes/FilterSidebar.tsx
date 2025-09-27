'use client';

import { useState } from 'react';
import { FilterSidebarProps, RecipeFilters } from '@/types/recipe';

export default function FilterSidebar({
  filters,
  onFilterChange,
  categories,
  cuisines,
  isOpen = true,
  onToggle
}: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState<RecipeFilters>(filters);

  const updateFilter = (key: keyof RecipeFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {};
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(localFilters).some(value => 
    value !== undefined && value !== '' && (Array.isArray(value) ? value.length > 0 : true)
  );

  const sidebarClasses = `
    fixed lg:relative top-0 left-0 h-full lg:h-auto w-80 lg:w-auto bg-white lg:bg-transparent 
    border-r lg:border-r-0 border-gray-200 z-40 transform transition-transform duration-300
    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    lg:block overflow-y-auto
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={sidebarClasses}>
        <div className="p-6 lg:p-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-xl font-bold text-gray-900">Filters</h2>
            <button
              onClick={onToggle}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="hidden lg:flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Filters</h2>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => updateFilter('category', category.value)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                    localFilters.category === category.value
                      ? 'bg-orange-50 text-orange-700 border border-orange-200'
                      : 'hover:bg-gray-50 text-gray-700 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{category.icon}</span>
                    <span className="font-medium">{category.label}</span>
                  </div>
                  {category.count !== undefined && (
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Cuisines */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cuisine</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {cuisines.map((cuisine) => (
                <button
                  key={cuisine.value}
                  onClick={() => updateFilter('cuisine', cuisine.value)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                    localFilters.cuisine === cuisine.value
                      ? 'bg-orange-50 text-orange-700 border border-orange-200'
                      : 'hover:bg-gray-50 text-gray-700 border border-transparent'
                  }`}
                >
                  <span className="font-medium">{cuisine.label}</span>
                  {cuisine.count !== undefined && (
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {cuisine.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Difficulty</h3>
            <div className="space-y-2">
              {['Easy', 'Medium', 'Hard'].map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => updateFilter('difficulty', localFilters.difficulty === difficulty ? '' : difficulty)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                    localFilters.difficulty === difficulty
                      ? 'bg-orange-50 text-orange-700 border border-orange-200'
                      : 'hover:bg-gray-50 text-gray-700 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-3 h-3 rounded-full ${
                      difficulty === 'Easy' ? 'bg-green-400' :
                      difficulty === 'Medium' ? 'bg-yellow-400' : 'bg-red-400'
                    }`} />
                    <span className="font-medium">{difficulty}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cook Time */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Max Cook Time</h3>
            <div className="space-y-2">
              {[15, 30, 60, 120].map((time) => (
                <button
                  key={time}
                  onClick={() => updateFilter('maxCookTime', localFilters.maxCookTime === time ? undefined : time)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                    localFilters.maxCookTime === time
                      ? 'bg-orange-50 text-orange-700 border border-orange-200'
                      : 'hover:bg-gray-50 text-gray-700 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V5z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">
                      {time < 60 ? `${time} mins` : `${time / 60} hour${time > 60 ? 's' : ''}`}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Minimum Rating</h3>
            <div className="space-y-2">
              {[4.5, 4.0, 3.5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => updateFilter('rating', localFilters.rating === rating ? undefined : rating)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                    localFilters.rating === rating
                      ? 'bg-orange-50 text-orange-700 border border-orange-200'
                      : 'hover:bg-gray-50 text-gray-700 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 font-medium">{rating}+</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Clear Button */}
          {hasActiveFilters && (
            <div className="lg:hidden">
              <button
                onClick={clearFilters}
                className="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}