import React, { useState } from 'react';
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
import ProfilePage from './pages/Profile';
import LoginPage from './pages/login-page';
import SignUpPage from './pages/signup-page';
import { BrowserRouter as Router, Routes, Route } from 'react-router';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const products: Product[] = [
    {
      id: 1,
      name: 'Panino prosciutto',
      description: 'Panino con prosciutto cotto',
      price: 12,
      image: '/api/placeholder/400/320',
    },
    {
      id: 2,
      name: 'Panino prosciutto',
      description: 'Panino con prosciutto cotto e pate di carciofi',
      price: 14,
      image: '/api/placeholder/400/320',
    },
    {
      id: 3,
      name: 'Panino nutella',
      description: 'Panino con nutella',
      price: 10,
      image: '/api/placeholder/400/320',
    },
    {
      id: 4,
      name: 'Pizza rossa',
      description: 'La classica marinara',
      price: 13,
      image: '/api/placeholder/400/320',
    },
  ];

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
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
