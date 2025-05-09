import React from 'react';
import { ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface MobileFloatingIconsProps {
  setIsCartOpen: (value: boolean) => void;
  isCartOpen: boolean;
  setShowProfile: (value: boolean) => void;
  showProfile: boolean;
}

const MobileFloatingIcons: React.FC<MobileFloatingIconsProps> = ({
  setIsCartOpen,
  isCartOpen,
  setShowProfile,
  showProfile
}) => {
  const { totalItems } = useCart();

  return (
    <div className="md:hidden fixed top-4 right-4 z-50 flex flex-col space-y-3">
      {/* Cart Icon */}
      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="relative bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        aria-label="Open cart"
      >
        <ShoppingCart className="text-blue-950 h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-amber-500 text-blue-800 text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
            {totalItems}
          </span>
        )}
      </button>

      {/* Profile Icon */}
      <button
        onClick={() => setShowProfile(!showProfile)}
        className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        aria-label="Open profile"
      >
        <User className="text-blue-950 h-6 w-6" />
      </button>
    </div>
  );
};

export default MobileFloatingIcons;