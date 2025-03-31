import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MobileNavbar from './components/MobileNavbar';
import SideMenu from './components/SideMenu';
import Cart from './components/Cart';
import Profile from './components/Profile';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import FeaturedProducts from './components/FeaturedProducts';
import { CartProvider } from './context/CartContext';
import { Product } from './types/types';
import { getProducts } from './services/productService';
import ProfilePage from './pages/Profile';
import LoginPage from './pages/login-page';
import SignUpPage from './pages/signup-page';
import SharedCart from './pages/SharedCart';
import { BrowserRouter as Router, Routes, Route } from 'react-router';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
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
      <CartProvider>
        <div className="min-h-screen bg-zinc-900">
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

          {/* Mobile Bottom Navigation */}
          <MobileNavbar 
            setIsCartOpen={setIsCartOpen} 
            isCartOpen={isCartOpen} 
            setShowProfile={setShowProfile} 
            showProfile={showProfile}
            navItems={navItems}  // Pass the navItems here
          />

          {/* Sidebars and Modals */}
          {isMenuOpen && <SideMenu setIsMenuOpen={setIsMenuOpen} />}
          {isCartOpen && <Cart setIsCartOpen={setIsCartOpen} />}
          {showProfile && <Profile setShowProfile={setShowProfile} />}

          {/* Main Content */}
          <div className="md:pt-16"> {/* Add padding top on medium screens and above to account for fixed navbar */}
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    <HowItWorks />
                    <FeaturedProducts products={filteredProducts} />
                    <FeaturedProducts products={filteredProducts} />
                  </>
                }
              />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/sharedcart' element={<SharedCart/>}/>
          </Routes>
        </div>
      </div>
      </CartProvider>
    </Router>
  );
}

export default App;
