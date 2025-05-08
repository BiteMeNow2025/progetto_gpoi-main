import React, { useState, useEffect } from 'react';
import { Product } from '../types/types';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface AllProductsProps {
  products: Product[];
  id?: string;
}

const AllProducts: React.FC<AllProductsProps> = ({ products, id = 'tutti-i-prodotti' }) => {
  const { addToCart, isItemAdded, lastAddedItem } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div id={id} className="max-w-7xl mx-auto py-24 px-6">
      <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300">Tutti i prodotti</span>
          </h2>
          <p className="text-gray-400 text-lg">Esplora la nostra selezione completa</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white backdrop-blur-md rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:  flex flex-col h-full cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-amber-500 text-blue-950 text-xs font-bold px-2 py-1 rounded-lg">
                    -{product.discount}%
                  </div>
                )}
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
                    {product.originalPrice && (
                      <span className="text-gray-500 line-through text-sm ml-2">€{product.originalPrice.toFixed(2)}</span>
                    )}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className={`flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-all duration-300 transform hover:scale-[1.05] active:scale-[0.98] ${isItemAdded(product.id) ? 'animate-pulse ring-4 ring-amber-300' : ''}`}
                  >
                    <ShoppingCart size={16} />
                    <span>{isItemAdded(product.id) ? 'Aggiunto!' : 'Aggiungi'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;