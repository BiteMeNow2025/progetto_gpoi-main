import React from 'react';
import { Product } from '../types/types';
import { Search } from 'lucide-react';

interface SearchResultsProps {
  results: Product[];
  searchQuery: string;
  visible: boolean;
  onProductClick: (productId: number) => void;
  onEnterPress: (e: React.KeyboardEvent) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  searchQuery,
  visible,
  onProductClick,
  onEnterPress
}) => {
  if (!visible || searchQuery.trim() === '') {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-xl border-2 border-white/10 rounded-xl shadow-lg max-h-80 overflow-y-auto z-50">
      {results.length > 0 ? (
        <div className="p-2">
          <div className="text-gray-300 text-sm px-3 py-2 border-b border-white/10">
            {results.length} risultati trovati
          </div>
          <ul>
            {results.map((product) => (
              <li 
                key={product.id} 
                className="px-3 py-2 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                onClick={() => onProductClick(product.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="text-white font-medium">{product.name}</div>
                    <div className="text-amber-500 font-bold">
                      €{product.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="p-4 text-center text-gray-300">
          <Search className="mx-auto h-6 w-6 text-amber-500/70 mb-2" />
          <p>Nessun prodotto trovato</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;