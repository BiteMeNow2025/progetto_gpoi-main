import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    setTotalItems(prev => prev + quantity);
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.id === productId);
      if (item) {
        setTotalItems(prev => prev - item.quantity);
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.id === productId) {
          const quantityDiff = quantity - item.quantity;
          setTotalItems(prev => prev + quantityDiff);
          return { ...item, quantity };
        }
        return item;
      });
      return updatedItems;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, totalItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
