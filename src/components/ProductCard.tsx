import React, { useState } from 'react';
import { ShoppingCart, Heart, Info } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div
      className="bg-stone-50 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer group flex flex-col h-full justify-between"
      onClick={() => onViewDetails && onViewDetails(product)}
    >
      {/* Image Container - Fixed Height */}
      <div className="relative w-full h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
        />

        {/* Badge for discounts */}
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            -{product.discount}%
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 bg-zinc-800 bg-opacity-70 p-2 rounded-full hover:bg-amber-500 transition-colors"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-white'}`} />
        </button>
      </div>

      {/* Content Container - Flex column with flex-grow */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title - Fixed Height */}
        <div className="flex justify-between items-start h-10 mb-2">
          <h3 className="text-lg font-bold text-white truncate">{product.name}</h3>
        </div>

        {/* Description - Fixed Height */}
        <div 
          className="text-gray-400 text-sm h-10 mb-4 line-clamp-2"
        >
          {product.short_description || product.description}
        </div>

        {/* Push the price and buttons to bottom with flex-grow */}
        <div className="mt-auto">
          {/* Price Area - Fixed Height */}
          <div className="h-8 mb-4">
            {product.originalPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-amber-500 font-bold text-lg">${product.price}</span>
                <span className="text-gray-500 text-sm line-through">${product.originalPrice}</span>
              </div>
            ) : (
              <span className="text-amber-500 font-bold text-lg">${product.price}</span>
            )}
          </div>

          {/* Buttons - Fixed Height */}
          <div className="flex justify-between items-center h-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails && onViewDetails(product);
              }}
              className="bg-zinc-700 text-white p-2 rounded hover:bg-zinc-600 transition-colors"
              aria-label="View details"
            >
              <Info className="h-5 w-5" />
            </button>

            <button
              onClick={handleAddToCart}
              className="bg-amber-500 text-white px-3 py-2 rounded flex items-center gap-1 hover:bg-amber-600 transition-colors transform hover:scale-105 active:scale-95 duration-200"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Aggiungi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
