import React, { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ searchQuery, setSearchQuery }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tutte le categorie' },
    { id: 'panini', name: 'Panini' },
    { id: 'pizze', name: 'Pizze' },
    { id: 'bevande', name: 'Bevande' },
    { id: 'snacks', name: 'Snacks' }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 to-zinc-900/90" />
      <img 
        src="/api/placeholder/1200/600"
        alt="Bar interior"
        className="w-full h-full object-cover scale-110 filter blur-sm"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`text-center px-4 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            Bite Me Now
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Scopri il gusto della pausa perfetta. Ordina facilmente e goditi il tuo pasto!
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-3xl mx-auto">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Cerca il tuo piatto preferito..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white backdrop-blur-md border border-white/30 placeholder-gray-300 focus:outline-none focus:border-amber-500 transition-all duration-300"
                aria-label="Search products"
              />
              <Search className="absolute right-3 top-3.5 text-white h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;