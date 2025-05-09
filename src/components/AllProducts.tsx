import React, { useState, useEffect } from 'react';
import { Product } from '../types/types';
import { ShoppingCart, Star, Search, X, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface AllProductsProps {
  products: Product[];
  id?: string;
  isLoading?: boolean;
}

const AllProducts: React.FC<AllProductsProps> = ({ products, id = 'tutti-i-prodotti', isLoading = false }) => {
  const { addToCart, isItemAdded } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  
  // Stati per i filtri
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  
  // Trova il prezzo massimo per il range
  const maxPrice = Math.max(...products.map(product => product.price));

  useEffect(() => {
    setIsVisible(true);
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);
  
  // Filtra i prodotti basandosi sui criteri selezionati
  useEffect(() => {
    let result = [...products];
    
    // Filtro per ricerca testuale
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filtro per range di prezzo
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(result);
  }, [products, searchTerm, priceRange]);
  
  // Reset filtri
  const resetFilters = () => {
    setSearchTerm('');
    setPriceRange([0, maxPrice]);
  };

  return (
    <div id={id} className="max-w-7xl mx-auto py-24 px-6">
      <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300">Prodotti in Evidenza</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Scopri la nostra selezione di prodotti, selezionati con cura per offrirti solo il meglio</p>
        </div>      

        {/* Loading indicator */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={48} className="text-amber-500 animate-spin mb-4" />
            <p className="text-gray-400 text-lg">Caricamento prodotti in corso...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-gradient-to-b from-white to-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-[1.02] flex flex-col h-full cursor-pointer border border-gray-100"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.discount && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-blue-950 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                      -{product.discount}%
                    </div>
                  )}
                  {product.rating && (
                    <div className="absolute bottom-3 left-3 bg-blue-950/80 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1.5 rounded-lg flex items-center gap-1">
                      <Star size={12} className="text-amber-500 fill-amber-500" />
                      <span>{product.rating}</span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-blue-950 font-bold text-lg mb-2 group-hover:text-amber-500 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <div 
                    className="text-gray-500 text-sm mb-5 line-clamp-2 flex-grow"
                    dangerouslySetInnerHTML={{ __html: product.short_description || product.description }}
                  />
                  <div className="flex items-center justify-between mt-auto pt-4 border-gray-100 bg-amber-50 p-4 rounded-lg">
                    <div className="flex flex-col">
                      <span className="text-amber-500 font-bold text-lg">
                        €{product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through text-xs">€{product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className={`flex items-center gap-2 bg-amber-500 text-white px-4 py-2.5 rounded-lg hover:bg-amber-600 transition-all duration-300 transform hover:scale-[1.05] active:scale-[0.98] ${isItemAdded(product.id) ? 'ring-4 ring-amber-300/50 animate-pulse' : ''}`}
                    >
                      <ShoppingCart size={16} />
                      <span className="font-medium">{isItemAdded(product.id) ? 'Aggiunto!' : 'Aggiungi'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-5xl mb-4">😕</div>
            <h3 className="text-xl font-bold text-blue-950 mb-2">Nessun prodotto trovato</h3>
            <p className="text-gray-500">Prova a modificare i filtri o a cercare qualcos'altro.</p>
            <button 
              onClick={resetFilters}
              className="mt-6 bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-all duration-300"
            >
              Reimposta filtri
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;