import React, { useState } from 'react';
import { cn } from '../utils/cn';
import { Search, X } from 'lucide-react';

export const Hero = ({
  totalServices,
  totalCategories,
  onSearch,
  className
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <section className={cn('relative py-8', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-duo-text-light" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="AI 도구 검색..."
              className={cn(
                "w-full pl-12 pr-12 py-3.5 rounded-2xl",
                "bg-white border border-gray-200 shadow-soft",
                "text-duo-text placeholder-duo-text-light",
                "focus:outline-none focus:border-duo-primary focus:ring-2 focus:ring-duo-primary/20",
                "transition-all duration-200"
              )}
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <X className="h-5 w-5 text-duo-text-light hover:text-duo-primary transition-colors" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
