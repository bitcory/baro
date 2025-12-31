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
    <section className={cn('relative py-6', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-neo-yellow" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="AI 도구 검색..."
              className={cn(
                "w-full pl-12 pr-12 py-3",
                "bg-neo-card border-3 border-neo-yellow shadow-neo-sm",
                "text-white placeholder-gray-400 font-medium",
                "focus:outline-none focus:shadow-neo",
                "focus:translate-x-[-2px] focus:translate-y-[-2px]"
              )}
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <X className="h-5 w-5 text-neo-yellow hover:text-neo-red" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
