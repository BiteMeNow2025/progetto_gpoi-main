import React, { useRef, useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import useClickOutside from '../hooks/useclickoutside';

interface OrderPayload {
  paymentMethod: string;
  paymentMethodTitle: string;
  setPaid: boolean;
  lineItems: Array<{
    productId: number;
    quantity: number;
  }>;
}

interface CartProps {
  setIsCartOpen: (value: boolean) => void;
}

const Cart: React.FC<CartProps> = ({ setIsCartOpen }) => {
  const { cartItems, updateQuantity, totalAmount } = useCart();
  const navigate = useNavigate();
  const cartRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem('token');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  useClickOutside(cartRef, () => setIsCartOpen(false));

  const handleSubmitOrder = async () => {
    try {
      setIsSubmitting(true);
      setError('');
      
      const orderPayload: OrderPayload = {
        paymentMethod,
        paymentMethodTitle: paymentMethod === 'cash' ? 'Cash' : 'Card',
        setPaid: false,
        lineItems: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      };

      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://80.16.146.77:2025/creaordine?sessionId='+token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload)
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      setIsCartOpen(false);
      navigate('/checkout');
    } catch (err) {
      setError('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300">
      <div ref={cartRef} className="bg-black/10 backdrop-blur border-l-2 border-white w-full md:w-96 h-full absolute right-0 p-6 transform transition-transform duration-300 ease-out overflow-y-auto">
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
                className="flex items-center space-x-4 bg-blue-950 p-4 rounded-lg transform transition-all duration-300 hover:scale-105"
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
            <div className="border-t border-blue-700 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-white">Totale</span>
                <span className="text-amber-500 font-bold text-xl">${totalAmount}</span>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-white">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="bg-blue-900 text-white p-2 rounded-lg border border-blue-700"
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                  </select>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button 
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition-colors transform hover:scale-105 active:scale-95 duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Submit Order'}
                </button>
              </div>
            </div>
          </div>
        )}
        <button 
          onClick={() => {
            setIsCartOpen(false);
            navigate('/sharedcart');
          }}
          className="w-full border border-amber-500 text-white py-3 rounded-lg mb-4 hover:bg-amber-600/30 transition-colors transform hover:scale-105 active:scale-95 duration-200 mt-4"
        >
          Vedi il carrello di classe
        </button>
      </div>
    </div>
  );
};

export default Cart;