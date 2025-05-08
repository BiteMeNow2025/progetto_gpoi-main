import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { CartItem, Product } from '../types';

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (id: number, change: number) => void;
  totalAmount: number;
  totalItems: number;
  lastAddedItem: Product | null;
  isItemAdded: (id: number) => boolean;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [lastAddedItem, setLastAddedItem] = useState<Product | null>(null);
  const [animationActive, setAnimationActive] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    
    // Set the last added item and trigger animation
    setLastAddedItem(product);
    setAnimationActive(true);
    
    // Reset animation state after 1.5 seconds
    setTimeout(() => {
      setAnimationActive(false);
    }, 1500);
  };

  const updateQuantity = (id: number, change: number) => {
    setCartItems(prevItems => {
      const newItems = prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter((item): item is CartItem => item !== null);

      return newItems;
    });
  };

  const isItemAdded = (id: number): boolean => {
    return cartItems.some(item => item.id === id);
  };

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    totalAmount,
    totalItems,
    lastAddedItem,
    isItemAdded
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};