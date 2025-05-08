import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Star } from 'lucide-react';
import { Product } from '../types/types';
import { getProducts } from '../services/productService';
import { useCart } from '../context/CartContext';

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart, isItemAdded } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Since there's no single product endpoint, we fetch all products and filter
        const products = await getProducts();
        const foundProduct = products.find(p => p.id === Number(productId));
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product details');
        console.error('Error fetching product details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      // Add the product to cart multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-24 px-6 flex justify-center items-center">
        <div className="animate-pulse text-amber-500 text-xl">Loading product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto py-24 px-6 flex flex-col items-center">
        <div className="text-red-500 text-xl mb-4">{error || 'Product not found'}</div>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-all duration-300"
        >
          <ArrowLeft size={16} />
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-24 px-6">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-amber-500 mb-8 hover:text-amber-600 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-white backdrop-blur-md rounded-xl overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-white">{product.name}</h1>
          
          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-amber-500">€{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-500 line-through">€{product.originalPrice.toFixed(2)}</span>
            )}
            {product.discount && (
              <span className="bg-amber-500 text-blue-950 text-sm font-bold px-2 py-1 rounded-lg">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={20} 
                  className={i < Math.floor(product.rating || 0) ? 'text-amber-500 fill-amber-500' : 'text-gray-400'} 
                />
              ))}
              <span className="text-gray-400 ml-2">({product.rating})</span>
            </div>
          )}

          {/* Description */}
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Description</h2>
            <p className="text-gray-400">{product.description}</p>
          </div>

          {/* Quantity */}
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Quantity</h2>
            <input 
              type="number" 
              min="1" 
              value={quantity} 
              onChange={handleQuantityChange}
              className="bg-blue-950 border border-blue-700 text-white rounded-lg px-4 py-2 w-20"
            />
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            className={`flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] w-full justify-center text-lg ${isItemAdded(product.id) ? 'animate-pulse ring-4 ring-amber-300' : ''}`}
          >
            <ShoppingCart size={20} />
            <span>{isItemAdded(product.id) ? 'Added to Cart' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;