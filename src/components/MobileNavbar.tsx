import React from 'react';
import { User, ShoppingCart, Home } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface MobileNavbarProps {
  setIsCartOpen: (value: boolean) => void;
  isCartOpen: boolean;
  setShowProfile: (value: boolean) => void;
  showProfile: boolean;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ 
  setIsCartOpen, 
  isCartOpen, 
  setShowProfile, 
  showProfile 
}) => {
  const { totalItems } = useCart();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0   py-4 px-6 z-50">
      <div className="flex items-center justify-around">
        <button 
          className="flex flex-col items-center text-white hover:text-amber-500 transition-colors"
          aria-label="Home"
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button 
          onClick={() => setIsCartOpen(!isCartOpen)} 
          className="flex flex-col items-center text-white hover:text-amber-500 transition-colors relative"
          aria-label="Cart"
        >
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
              {totalItems}
            </span>
          )}
          <span className="text-xs mt-1">Carrello</span>
        </button>
        <button 
          onClick={() => setShowProfile(!showProfile)} 
          className="flex flex-col items-center text-white hover:text-amber-500 transition-colors"
          aria-label="Profile"
        >
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Profilo</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileNavbar;