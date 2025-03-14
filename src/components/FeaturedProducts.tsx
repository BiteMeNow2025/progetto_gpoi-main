import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
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
    <div className="max-w-7xl mx-auto py-16 px-6 mb-20 md:mb-0" {...handlers}>
      <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-white">Prodotti consigliati</h2>
          <div className="flex gap-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 disabled:opacity-50 transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 disabled:opacity-50 transition-all duration-300"
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
              className="group bg-zinc-800/50 backdrop-blur-md rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:bg-zinc-800 flex flex-col h-full"
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
                <div className="absolute top-2 right-2 bg-amber-500 text-white text-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <Star size={12} />
                  <span>4.5</span>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-amber-500 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-amber-500 font-bold text-lg">
                    €{product.price.toFixed(2)}
                  </span>
                  <button className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-all duration-300 transform hover:scale-[1.05] active:scale-[0.98]">
                    <ShoppingCart size={16} />
                    <span>Aggiungi</span>
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
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentPage === index + 1 ? 'w-6 bg-amber-500 scale-110' : 'bg-zinc-700 hover:bg-zinc-600 hover:scale-105'}`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
          </div>
        </div>
      </div>
  );
};

export default FeaturedProducts;
