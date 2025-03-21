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
    <div className="max-w-7xl mx-auto py-24 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300">Come funziona?</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Segui questi semplici passaggi per ordinare il tuo pasto</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="group bg-zinc-800/50 backdrop-blur-lg p-8 rounded-2xl text-center hover:bg-zinc-800 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/5"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-zinc-900 p-4 rounded-xl group-hover:bg-zinc-800 transition-all duration-500">
                {step.icon}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors">{step.title}</h3>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;