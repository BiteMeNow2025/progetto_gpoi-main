import React, { useState } from 'react';
import { Menu, User, ShoppingCart, Search, Wine, FileLock as Cocktail, Beer, Home, X, Plus, Minus, Check, BaggageClaim } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Panino prosciutto",
      price: 12,
      quantity: 2,
      image: "https://www.levoni.it/ContentsFiles/Panino%20prosciutto%20cotto%20e%20pate%20di%20carciofi-1.jpg"
    },
    {
      id: 2,
      name: "Panino prosciutto",
      price: 14,
      quantity: 1,
      image: "https://www.levoni.it/ContentsFiles/Panino%20prosciutto%20cotto%20e%20pate%20di%20carciofi-1.jpg"
    }
  ]);

  const products: Product[] = [
    {
      id: 1,
      name: "Panino prosciutto",
      description: "Panino con prosciutto cotto",
      price: 12,
      image: "https://www.levoni.it/ContentsFiles/Panino%20prosciutto%20cotto%20e%20pate%20di%20carciofi-1.jpg"
    },
    {
      id: 2,
      name: "Panino prosciutto",
      description: "Panino con prosciutto cotto e pate di carciofi",
      price: 14,
      image: "https://www.levoni.it/ContentsFiles/Panino%20prosciutto%20cotto%20e%20pate%20di%20carciofi-1.jpg"
    },
    {
      id: 3,
      name: "Panino nutella",
      description: "Panino con nutella",
      price: 10,
      image: "https://www.levoni.it/ContentsFiles/Panino%20prosciutto%20cotto%20e%20pate%20di%20carciofi-1.jpg"
    },
    {
      id: 4,
      name: "Pizza rossa",
      description: "La classica marinara",
      price: 13,
      image: "https://www.levoni.it/ContentsFiles/Panino%20prosciutto%20cotto%20e%20pate%20di%20carciofi-1.jpg"
    }
  ];

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

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
    
    // Show cart after adding item
    setIsCartOpen(true);
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

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Desktop Navigation */}
      <nav className="bg-zinc-800 py-4 px-6 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-amber-500 transition-colors">
              <Menu className="h-6 w-6" />
            </button>
            <div className="text-white font-bold text-2xl">Bite me now</div>
          </div>
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setIsCartOpen(!isCartOpen)} 
              className="relative hover:text-amber-500 transition-colors"
            >
              <ShoppingCart className="text-white h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className="hover:text-amber-500 transition-colors"
            >
              <User className="text-white h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-800 py-4 px-6 z-50">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center text-white hover:text-amber-500 transition-colors">
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button 
            onClick={() => setIsCartOpen(!isCartOpen)} 
            className="flex flex-col items-center text-white hover:text-amber-500 transition-colors relative"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {cartItems.length}
              </span>
            )}
            <span className="text-xs mt-1">Carrello</span>
          </button>
          <button 
            onClick={() => setShowProfile(!showProfile)} 
            className="flex flex-col items-center text-white hover:text-amber-500 transition-colors"
          >
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profilo</span>
          </button>
        </div>
      </nav>

      {/* Expanded Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300">
          <div className="bg-zinc-800 w-64 h-full p-6 transform transition-transform duration-300 ease-out">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-white text-xl font-bold">Menu</h2>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-amber-500 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <a href="#" className="block text-white hover:text-amber-500 transition-colors">Home</a>
              <a href="#" className="block text-white hover:text-amber-500 transition-colors">Tutti i prodotti</a>
              <a href="#" className="block text-white hover:text-amber-500 transition-colors">Su di noi</a>
              <a href="#" className="block text-white hover:text-amber-500 transition-colors">Contatti</a>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300">
          <div className="bg-zinc-800 w-full md:w-96 h-full absolute right-0 p-6 transform transition-transform duration-300 ease-out overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-white text-xl font-bold">Your Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-white hover:text-amber-500 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center space-x-4 bg-zinc-700 p-4 rounded-lg transform transition-all duration-300 hover:scale-[1.02]"
                >
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="text-white font-bold">{item.name}</h3>
                    <p className="text-gray-400">${item.price}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-white hover:text-amber-500 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-white">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-white hover:text-amber-500 transition-colors"
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
                  <span className="text-white">Total</span>
                  <span className="text-amber-500 font-bold text-xl">${totalAmount}</span>
                </div>
                <button className="w-full bg-amber-500 text-white py-3 rounded-lg mt-4 hover:bg-amber-600 transition-colors transform hover:scale-[1.02] active:scale-[0.98] duration-200">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Page */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300">
          <div className="bg-zinc-800 w-full md:w-96 h-full absolute right-0 p-6 overflow-y-auto transform transition-transform duration-300 ease-out">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-white text-xl font-bold">Profilo</h2>
              <button 
                onClick={() => setShowProfile(false)}
                className="text-white hover:text-amber-500 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 bg-zinc-700 rounded-full flex items-center justify-center mb-4 hover:bg-zinc-600 transition-colors">
                <User className="text-white h-12 w-12" />
              </div>
              <h3 className="text-white text-xl font-bold">John Doe</h3>
              <p className="text-gray-400">john.doe@example.com</p>
            </div>
            <div className="space-y-4">
              <div className="bg-zinc-700 p-4 rounded-lg hover:bg-zinc-600 transition-colors transform hover:scale-[1.02] duration-200 cursor-pointer">
                <h4 className="text-white font-bold mb-2">Ordini Passati</h4>
                <p className="text-gray-400">Visualizza i tuoi ordini passati</p>
              </div>
              <div className="bg-zinc-700 p-4 rounded-lg hover:bg-zinc-600 transition-colors transform hover:scale-[1.02] duration-200 cursor-pointer">
                <h4 className="text-white font-bold mb-2">Metodi di Pagamento</h4>
                <p className="text-gray-400">Gestisci i tuoi metodi di pagamento</p>
              </div>
              <button className="w-full bg-red-500 text-white py-3 rounded-lg mt-4 hover:bg-red-600 transition-colors transform hover:scale-[1.02] active:scale-[0.98] duration-200">
                Esci
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-[500px]">
        <img 
          src="https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1273516682.jpg?c=original"
          alt="Bar interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4">Bite Me Now</h1>
            <p className="text-xl text-gray-200 mb-8">La tua pausa pranzo perfetta!</p>
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Cerca un prodotto..."
                className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 border border-white border-opacity-30 focus:outline-none focus:border-opacity-50 transition-all duration-300"
              />
              <Search className="absolute right-3 top-2.5 text-white h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-white mb-8">Come funziona?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-zinc-800 p-8 rounded-lg text-center hover:bg-zinc-700 transition-all duration-300 transform hover:scale-[1.02]">
            <Check className="text-amber-500 h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Selezione</h3>
            <p className="text-gray-400">Seleziona i prodotti che vorresti acquistare</p>
          </div>
          <div className="bg-zinc-800 p-8 rounded-lg text-center hover:bg-zinc-700 transition-all duration-300 transform hover:scale-[1.02]">
            <ShoppingCart className="text-amber-500 h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Carrello condiviso</h3>
            <p className="text-gray-400">Vengono mandati a un carrello condiviso</p>
          </div>
          <div className="bg-zinc-800 p-8 rounded-lg text-center hover:bg-zinc-700 transition-all duration-300 transform hover:scale-[1.02]">
            <BaggageClaim className="text-amber-500 h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Ritiro</h3>
            <p className="text-gray-400">Vengono ritirati i prodotti</p>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto py-16 px-6 mb-20 md:mb-0">
        <h2 className="text-3xl font-bold text-white mb-8">Prodotti consigliati</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-zinc-800 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02]"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-white font-bold mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-amber-500 font-bold">${product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition-all duration-300 transform hover:scale-[1.05] active:scale-[0.98]"
                  >
                    Aggiungi al Carrello
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;