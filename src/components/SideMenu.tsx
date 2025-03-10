import React from 'react';
import { X } from 'lucide-react';

interface SideMenuProps {
  setIsMenuOpen: (value: boolean) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ setIsMenuOpen }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300">
      <div className="bg-zinc-800 w-64 h-full p-6 transform transition-transform duration-300 ease-out">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-white text-xl font-bold">Menu</h2>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="text-white hover:text-amber-500 transition-colors"
            aria-label="Close menu"
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
  );
};

export default SideMenu;