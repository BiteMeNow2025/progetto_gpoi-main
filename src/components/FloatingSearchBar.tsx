import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface FloatingSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  productsRef?: React.RefObject<HTMLDivElement>;
}

const FloatingSearchBar: React.FC<FloatingSearchBarProps> = ({ 
  searchQuery, 
  setSearchQuery,
  productsRef
 }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setIsFocused(true);
    // Scroll to products section when search bar is focused
    if (productsRef?.current) {
      productsRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback if ref is not provided
      const productsSection = document.getElementById('tutti-i-prodotti');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 px-4 md:px-6 mx-auto max-w-md">
      <div 
        className={`
          bg-white rounded-full shadow-lg flex items-center overflow-hidden
          transition-all duration-300 ease-in-out
          ${isFocused ? 'ring-2 ring-amber-500 shadow-xl' : ''}
        `}
      >
        <div className="flex-grow flex items-center">
          <Search size={20} className="ml-4 text-gray-400" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={() => setIsFocused(false)}
            placeholder="Cerca prodotti..."
            className="w-full py-3 px-3 focus:outline-none text-blue-950"
          />
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="mr-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full p-2 flex items-center justify-center shadow-md transition-colors"
          aria-label="Modifica filtri"
          style={{ width: 36, height: 36 }}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
        </button>
        {/* Price Range Filter Dropdown */}
        {showFilter && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-4 z-50 w-64 flex flex-col space-y-2">
            <label className="text-blue-950 font-semibold text-sm">Fascia di prezzo (€)</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="0"
                value={priceRange[0]}
                onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-20 px-2 py-1 border rounded text-blue-950"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                min={priceRange[0]}
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-20 px-2 py-1 border rounded text-blue-950"
              />
            </div>
            <button
              onClick={() => setShowFilter(false)}
              className="mt-2 bg-amber-500 hover:bg-amber-600 text-white rounded px-3 py-1 text-sm self-end"
            >
              Fatto
            </button>
          </div>
        )}
        {searchQuery && (
          <button 
            onClick={handleClearSearch}
            className="mr-4 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default FloatingSearchBar;