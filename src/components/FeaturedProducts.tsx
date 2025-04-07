import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';
import { useCart } from '../context/CartContext';

import { Product } from '../types/types';

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  const { addToCart, isItemAdded, lastAddedItem } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const autoPlayRef = useRef<NodeJS.Timeout>();
  const transitionDuration = 300;

  useEffect(() => {
    setIsVisible(true);
    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, []);

  const changePage = useCallback((direction: 'next' | 'prev') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
    
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  }, [currentPage, totalPages, isTransitioning]);

  const handlers = useSwipeable({
    onSwipedLeft: () => changePage('next'),
    onSwipedRight: () => changePage('prev'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') changePage('prev');
      if (e.key === 'ArrowRight') changePage('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changePage]);

  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => changePage('next');
  const prevPage = () => changePage('prev');

  return (
    <div className="max-w-7xl mx-auto py-24 px-6" {...handlers}>
      <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300">Prodotti consigliati</span>
            </h2>
            <p className="text-gray-400 text-lg">Scopri i nostri prodotti più popolari</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="p-3 rounded-xl  /50 backdrop-blur-lg text-amber-500 hover:  disabled:opacity-50 transition-all duration-500 hover:scale-[1.05] disabled:hover:scale-100"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="p-3 rounded-xl  /50 backdrop-blur-lg text-amber-500 hover:  disabled:opacity-50 transition-all duration-500 hover:scale-[1.05] disabled:hover:scale-100"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-300" style={{ opacity: isTransitioning ? 0.6 : 1 }}>
          <div className="contents">
          {currentProducts.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white backdrop-blur-md rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:  flex flex-col h-full"
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                {/* Rating removed as requested */}
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-blue-950 font-bold text-lg mb-2 group-hover:text-amber-500 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-amber-500 font-bold text-lg">
                    €{product.price.toFixed(2)}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className={`flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-all duration-300 transform hover:scale-[1.05] active:scale-[0.98] ${lastAddedItem?.id === product.id && isItemAdded ? 'animate-pulse ring-4 ring-amber-300' : ''}`}
                  >
                    <ShoppingCart size={16} />
                    <span>{lastAddedItem?.id === product.id && isItemAdded ? 'Aggiunto!' : 'Aggiungi'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>

        <div className="flex justify-center items-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentPage === index + 1 ? 'w-6 bg-amber-500 scale-110' : 'bg-blue-700 hover:bg-blue-600 hover:scale-105'}`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
          </div>
        </div>
      </div>
  );
};

export default FeaturedProducts;
