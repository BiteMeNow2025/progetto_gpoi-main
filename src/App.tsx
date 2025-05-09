import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import MobileFloatingIcons from './components/MobileFloatingIcons';
import FloatingSearchBar from './components/FloatingSearchBar';

import SideMenu from './components/SideMenu';
import Cart from './components/Cart';
import Profile from './components/Profile';
import HeroSection from './components/HeroSection';
import AllProducts from './components/AllProducts';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Product } from './types/types';
import { getProducts } from './services/productService';
import ProfilePage from './pages/Profile';
import LoginPage from './pages/login-page';
import SignUpPage from './pages/signup-page';
import SharedCart from './pages/SharedCart';
import CheckoutPage from './pages/checkout-page';
import PastOrders from './pages/PastOrders';
import ProductDetails from './pages/ProductDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Profile', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
        <div className="min-h-screen bg-blue-950">
          {/* Desktop Navigation */}

          <Navbar 
            setIsMenuOpen={setIsMenuOpen} 
            isMenuOpen={isMenuOpen} 
            setIsCartOpen={setIsCartOpen} 
            isCartOpen={isCartOpen} 
            setShowProfile={setShowProfile} 
            showProfile={showProfile}
            navItems={navItems}  // Pass the navItems here
          />

          {/* Mobile Floating Icons */}
          <MobileFloatingIcons 
            setIsCartOpen={setIsCartOpen} 
            isCartOpen={isCartOpen} 
            setShowProfile={setShowProfile} 
            showProfile={showProfile} 
          />



          {/* Sidebars and Modals */}
          {isMenuOpen && <SideMenu setIsMenuOpen={setIsMenuOpen} />}
          {isCartOpen && <Cart setIsCartOpen={setIsCartOpen} />}
          {showProfile && <Profile setShowProfile={setShowProfile} />}
          
          {/* Floating Search Bar */}
          <FloatingSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} productsRef={productsRef} />

          {/* Main Content */}
          <div className="md:pt-16"> {/* Add padding top on medium screens and above to account for fixed navbar */}
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} filteredProducts={filteredProducts} />
                    <div ref={productsRef}>
                      <AllProducts products={filteredProducts} isLoading={isLoading} />
                    </div>
                  </>
                }
              />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/sharedcart' element={<SharedCart/>}/>
            <Route path='/checkout' element={<CheckoutPage />}/>
            <Route path='/pastorders' element={<PastOrders />}/>
            <Route path='/product/:productId' element={<ProductDetails />}/>
          </Routes>
        </div>
      </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
