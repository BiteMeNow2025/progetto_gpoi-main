import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import SearchResults from './SearchResults';
import { Product } from '../types/types';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredProducts?: Product[];
}

// Define service status types
type ServiceStatus = 'operational' | 'degraded' | 'down';

interface ServiceState {
  name: string;
  status: ServiceStatus;
}

const HeroSection: React.FC<HeroSectionProps> = ({ searchQuery, setSearchQuery, filteredProducts = [] }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Mock service statuses - in a real app, these would come from an API
  const [services, setServices] = useState<ServiceState[]>([
    { name: 'Ordini Online', status: 'operational' },
    { name: 'Consegne', status: 'degraded' }
  ]);

  useEffect(() => {
    setIsVisible(true);
    
    // Set up scroll spy
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const getStatusIcon = (status: ServiceStatus) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="text-green-500" size={18} />;
      case 'degraded':
        return <AlertCircle className="text-yellow-500" size={18} />;
      case 'down':
        return <XCircle className="text-red-500" size={18} />;
    }
  };

  const getStatusText = (status: ServiceStatus) => {
    switch (status) {
      case 'operational':
        return 'Operativo';
      case 'degraded':
        return 'Rallentato';
      case 'down':
        return 'Non disponibile';
    }
  };

  return (
    <section id="hero" className="relative h-screen overflow-hidden bg-blue-950">
      {/* Background Image */}
      <img 
        src="https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?cs=srgb&dl=bread-color-copyspace-1565982.jpg&fm=jpg"
        alt="Bar interior"
        className="w-full h-full object-cover scale-110 filter blur-md opacity-80"
      />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 bg-blue-950/20 backdrop-blur-sm">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-transparent to-blue-950">
          {/* Main Hero Content */}
          <div className={`text-center px-4 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300">Bite</span>
              <span className="text-white"> Me Now</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Scopri il gusto della pausa perfetta. Ordina facilmente e goditi il tuo pasto!
            </p>
            
            {/* Service Status */}
            <div className="flex flex-col items-center mb-12">
              <h3 className="text-white font-medium mb-4">Stato dei Servizi</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-sm">
                    {getStatusIcon(service.status)}
                    <span className="ml-2 text-white">{service.name}: </span>
                    <span className={`ml-1 ${
                      service.status === 'operational' ? 'text-green-400' : 
                      service.status === 'degraded' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {getStatusText(service.status)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Scroll Down Indicator */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center">
            <button 
              onClick={() => scrollToSection('menu')} 
              className="flex flex-col items-center text-white/80 hover:text-white transition-colors"
            >
              <ChevronDown className="animate-bounce" size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;