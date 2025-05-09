import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import PaymentMethods from '../components/PaymentMethods';

const CheckoutPage = () => {
  const { clearCart } = useCart();
  const [formData, setFormData] = useState({
    paymentMethod: '',
    pickupTime: '',
  });

  // Colori per dark mode (matching con signup-page)
  const colors = {
    background: '#000000',
    card: '#1C1C1E',
    primary: '#FF9500',
    success: '#34C759',
    danger: '#FF3B30',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
    inputBg: '#2C2C2E',
  };

  // Mock cart data - replace with actual cart data
  const cartItems = [
    { id: 1, name: 'Panino al Prosciutto', price: 4.50, quantity: 2 },
    { id: 2, name: 'Coca Cola', price: 2.00, quantity: 1 },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.10; // 10% tax
  const total = subtotal + tax;

  // Available time slots
  const timeSlots = [
    '10:00', '12:00', '14:00'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.paymentMethod || !formData.pickupTime) {
      alert('Please select both payment method and pickup time');
      return;
    }
    
    // Clear the cart after successful order
    clearCart();
    
    // Show success message
    alert('Ordine completato con successo! Grazie per il tuo acquisto.');
    
    // Redirect to homepage after successful order
    window.location.href = '/';
    console.log('Order submitted:', { ...formData, total });
  };

  return (
    <div className="min-h-screen py-10" style={{ backgroundColor: colors.background }}>
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-2xl font-bold mb-8 text-center" style={{ color: colors.text }}>
          Checkout
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Summary */}
          <div className="rounded-2xl shadow-sm overflow-hidden" style={{ backgroundColor: colors.card }}>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
                Order Summary
              </h2>
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div style={{ color: colors.text }}>
                      <span>{item.quantity}x </span>
                      <span>{item.name}</span>
                    </div>
                    <span style={{ color: colors.text }}>€{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t mt-4 pt-4" style={{ borderColor: colors.border }}>
                  <div className="flex justify-between items-center">
                    <span style={{ color: colors.textSecondary }}>Subtotal</span>
                    <span style={{ color: colors.text }}>€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span style={{ color: colors.textSecondary }}>Tax (10%)</span>
                    <span style={{ color: colors.text }}>€{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-4 text-lg font-semibold">
                    <span style={{ color: colors.text }}>Total</span>
                    <span style={{ color: colors.primary }}>€{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment and Time Selection */}
          <div className="rounded-2xl shadow-sm overflow-hidden" style={{ backgroundColor: colors.card }}>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Payment Method */}
              <div>
                <h2 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
                  Payment Method
                </h2>
                <PaymentMethods
                  selectedMethod={formData.paymentMethod}
                  onMethodChange={(method) => handleChange({ target: { name: 'paymentMethod', value: method } })}
                  colors={{
                    primary: colors.primary,
                    text: colors.text,
                    inputBg: colors.inputBg
                  }}
                />
              </div>

              {/* Time Selection */}
              <div>
                <h2 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
                  Pickup Time
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map(time => (
                    <label
                      key={time}
                      className="flex flex-col items-center p-3 rounded-lg cursor-pointer"
                      style={{
                        backgroundColor: formData.pickupTime === time ? colors.inputBg : 'transparent',
                        borderColor: colors.border,
                        border: '1px solid'
                      }}
                    >
                      <input
                        type="radio"
                        name="pickupTime"
                        value={time}
                        checked={formData.pickupTime === time}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <Clock size={20} style={{ color: formData.pickupTime === time ? colors.primary : colors.textSecondary }} />
                      <span
                        className="mt-2"
                        style={{ color: formData.pickupTime === time ? colors.primary : colors.text }}
                      >
                        {time}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-lg font-medium mt-6"
                style={{ backgroundColor: colors.primary, color: colors.text }}
              >
                Confirm Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;