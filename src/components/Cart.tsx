import React, { useRef, useState } from 'react';
import { X, Plus, Minus, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import useClickOutside from '../hooks/useclickoutside';
import PaymentMethods from './PaymentMethods';

interface OrderPayload {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  metadata: Array<{
    key: string;
    value: string;
  }>;
  lineItems: Array<{
    product_id: number; // Changed from productId to product_id to match server expectations
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
  const [pickupTime, setPickupTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  useClickOutside(cartRef, () => setIsCartOpen(false));
  
  // Available time slots
  const timeSlots = ['10:00', '12:00', '14:00'];

  const handleSubmitOrder = async () => {
    try {
      if (!pickupTime) {
        setError('Please select a pickup time');
        return;
      }
      
      setIsSubmitting(true);
      setError('');
      
      const orderPayload: OrderPayload = {
        payment_method,
        payment_method_title: paymentMethod === 'cash' ? 'Cash' : 'Card',
        set_paid: false,
        metadata: [
          { key: "intervallo", value: pickupTime }
        ],
        lineItems: cartItems.map(item => ({
          product_id: item.id, // Changed from productId to product_id to match server expectations
          quantity: item.quantity
        }))
      };

      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://80.16.146.77:2025/creaordine/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderPayload)
      });
      
      console.log('Order submission response:', response.status);
      // Try to get response body for debugging
      try {
        const responseData = await response.json();
        console.log('Order response data:', responseData);
      } catch (e) {
        console.log('Could not parse response JSON:', e);
      }

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      setIsCartOpen(false);
      // No need to navigate to checkout page anymore
      // Just show a success message
      alert('Ordine completato con successo! Ritira alle ore ' + pickupTime);
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
                  <label className="text-white">Metodo di Pagamento</label>
                  <PaymentMethods
                    selectedMethod={paymentMethod}
                    onMethodChange={(method) => setPaymentMethod(method)}
                    colors={{
                      primary: '#FF9500',
                      text: '#FFFFFF',
                      inputBg: '#2C2C2E'
                    }}
                  />
                </div>
                
                <div className="flex flex-col space-y-2 mt-4">
                  <label className="text-white">Orario di Ritiro</label>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map(time => (
                      <label
                        key={time}
                        className={`flex flex-col items-center p-3 rounded-lg cursor-pointer bg-blue-950 transform transition-all duration-300 hover:scale-105 ${pickupTime === time ? 'border border-amber-500' : 'border border-blue-700'}`}
                      >
                        <input
                          type="radio"
                          name="pickupTime"
                          value={time}
                          checked={pickupTime === time}
                          onChange={(e) => setPickupTime(e.target.value)}
                          className="hidden"
                        />
                        <Clock size={20} className={pickupTime === time ? 'text-amber-500' : 'text-white'} />
                        <span
                          className={`mt-2 ${pickupTime === time ? 'text-amber-500' : 'text-white'}`}
                        >
                          {time}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button 
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition-colors transform hover:scale-105 active:scale-95 duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Elaborazione...' : 'Conferma Ordine'}
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