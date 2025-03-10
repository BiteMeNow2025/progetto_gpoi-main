import React from 'react';
import { Search } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative h-96 md:h-500">
      <img 
        src="/api/placeholder/1200/500"
        alt="Bar interior"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent bg-opacity-50 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Bite Me Now</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">La tua pausa pranzo perfetta!</p>
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Cerca un prodotto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 border border-white border-opacity-30 focus:outline-none focus:border-opacity-50 transition-all duration-300"
              aria-label="Search products"
            />
            <Search className="absolute right-3 top-2.5 text-white h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;