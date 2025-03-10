import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  setIsCartOpen: (value: boolean) => void;
}

const Cart: React.FC<CartProps> = ({ setIsCartOpen }) => {
  const { cartItems, updateQuantity, totalAmount } = useCart();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300">
      <div className="bg-zinc-800 w-full md:w-96 h-full absolute right-0 p-6 transform transition-transform duration-300 ease-out overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-white text-xl font-bold">Il tuo carrello</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="text-white hover:text-amber-500 transition-colors"
            aria-label="Close cart"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">Il tuo carrello è vuoto</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center space-x-4 bg-zinc-700 p-4 rounded-lg transform transition-all duration-300 hover:scale-105"
              >
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="text-white font-bold">{item.name}</h3>
                  <p className="text-gray-400">${item.price}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="text-white hover:text-amber-500 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-white">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="text-white hover:text-amber-500 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-amber-500 font-bold">${item.price * item.quantity}</p>
              </div>
            ))}
            <div className="border-t border-zinc-700 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-white">Totale</span>
                <span className="text-amber-500 font-bold text-xl">${totalAmount}</span>
              </div>
              <button className="w-full border border-amber-500 text-white py-3 rounded-lg mt-4 hover:bg-amber-600/30 transition-colors transform hover:scale-105 active:scale-95 duration-200">
                Vedi il carrello di classe
              </button>
              <button className="w-full bg-amber-500 text-white py-3 rounded-lg mt-4 hover:bg-amber-600 transition-colors transform hover:scale-105 active:scale-95 duration-200">
                Vai al pagamento
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;