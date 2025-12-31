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
      {/* Decorative Memphis shapes */}
      <div className="absolute top-4 left-8 w-6 h-6 bg-memphis-yellow border-2 border-memphis-black rotate-12 hidden md:block"></div>
      <div className="absolute top-12 right-16 w-8 h-8 bg-memphis-teal border-2 border-memphis-black rounded-full hidden md:block"></div>
      <div className="absolute bottom-4 left-1/4 w-4 h-4 bg-memphis-pink border-2 border-memphis-black hidden md:block"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-memphis-black" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="AI 도구 검색..."
              className={cn(
                "w-full pl-12 pr-12 py-3.5",
                "bg-white border-2 border-memphis-black",
                "text-memphis-black placeholder-memphis-gray font-medium",
                "focus:outline-none focus:shadow-memphis",
                "shadow-memphis-sm"
              )}
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <X className="h-5 w-5 text-memphis-black hover:text-memphis-pink" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
