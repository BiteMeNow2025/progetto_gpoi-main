import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import SearchResults from './SearchResults';
import { Product } from '../types/types';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredProducts?: Product[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ searchQuery, setSearchQuery, filteredProducts = [] }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-blue-950">
      <img 
        src="https://th.bing.com/th/id/OIP.g9meiANJcKP0ekLeCy4laQHaE7?rs=1&pid=ImgDetMain"
        alt="Bar interior"
        className="w-full h-full object-cover scale-110 filter blur-md opacity-80"
      />
      <div className="absolute inset-0 bg-blue-950/20 backdrop-blur-sm">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent to-blue-950">
          <div className={`text-center px-4 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300">Bite</span>
              <span className="text-white"> Me Now</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Scopri il gusto della pausa perfetta. Ordina facilmente e goditi il tuo pasto!
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-3xl mx-auto">
              <div className="relative w-full md:w-[500px] group">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Cerca il tuo piatto preferito..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(e.target.value.trim().length > 0);
                  }}
                  onFocus={() => setShowResults(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const section = document.getElementById('tutti-i-prodotti');
                      if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                        setShowResults(false);
                      }
                    }
                  }}
                  className="w-full px-6 py-4 rounded-2xl text-blue-950 backdrop-blur-xl border-2 border-white/10 placeholder-gray-400 focus:outline-none focus:border-amber-500/50 transition-all duration-300 shadow-lg"
                  aria-label="Search products"
                />
                <Search className="absolute right-4 top-4 text-amber-500/70 h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                <SearchResults 
                  results={filteredProducts}
                  searchQuery={searchQuery}
                  visible={showResults}
                  onProductClick={(productId) => {
                    const section = document.getElementById('tutti-i-prodotti');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                      setShowResults(false);
                    }
                  }}
                  onEnterPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const section = document.getElementById('tutti-i-prodotti');
                      if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                        setShowResults(false);
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;