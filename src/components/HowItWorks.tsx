import React from 'react';
import { Check, ShoppingCart, BaggageClaim } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Check className="text-amber-500 h-12 w-12 mx-auto mb-4" />,
      title: "Selezione",
      description: "Seleziona i prodotti che vorresti acquistare"
    },
    {
      icon: <ShoppingCart className="text-amber-500 h-12 w-12 mx-auto mb-4" />,
      title: "Carrello condiviso",
      description: "Vengono mandati a un carrello condiviso"
    },
    {
      icon: <BaggageClaim className="text-amber-500 h-12 w-12 mx-auto mb-4" />,
      title: "Ritiro",
      description: "Vengono ritirati i prodotti"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold text-white mb-8">Come funziona?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="bg-zinc-800 p-8 rounded-lg text-center hover:bg-zinc-700 transition-all duration-300 transform hover:scale-105"
          >
            {step.icon}
            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
            <p className="text-gray-400">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;