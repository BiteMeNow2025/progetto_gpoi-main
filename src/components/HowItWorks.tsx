import React from 'react';
import { Check, ShoppingCart, BaggageClaim, ArrowRight } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Check className="text-amber-500 h-12 w-12 mx-auto mb-4" />,
      title: "Selezione",
      description: "Seleziona i prodotti che vorresti acquistare",
      animation: "fade-right"
    },
    {
      icon: <ShoppingCart className="text-amber-500 h-12 w-12 mx-auto mb-4" />,
      title: "Carrello condiviso",
      description: "Vengono mandati a un carrello condiviso",
      animation: "fade-up"
    },
    {
      icon: <BaggageClaim className="text-amber-500 h-12 w-12 mx-auto mb-4" />,
      title: "Ritiro",
      description: "Vengono ritirati i prodotti",
      animation: "fade-left"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-24 px-6 overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300">Come funziona?</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Segui questi semplici passaggi per ordinare il tuo pasto</p>
      </div>
      
      {/* Desktop view with connecting lines */}
      <div className="hidden md:block relative mb-12">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-amber-500/20 via-amber-500/50 to-amber-500/20 transform -translate-y-1/2 z-0"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {/* Step number indicator */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold z-10 shadow-lg shadow-amber-500/20">
              {index + 1}
            </div>
            
            {/* Connecting arrows for desktop */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <ArrowRight className="text-amber-500 h-6 w-6 animate-pulse" />
              </div>
            )}
            
            <div 
              className={`group bg-zinc-800/50 backdrop-blur-lg p-8 rounded-2xl text-center hover:bg-zinc-800 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/5 border border-transparent hover:border-amber-500/20`}
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-zinc-900 p-4 rounded-xl group-hover:bg-zinc-800 transition-all duration-500">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors">{step.title}</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{step.description}</p>
              
              {/* Visual indicator for step completion */}
              <div className="mt-6 h-1 w-0 bg-amber-500 mx-auto group-hover:w-1/2 transition-all duration-700 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Call to action */}
      <div className="mt-16 text-center">
        <p className="text-amber-500 font-medium text-lg mb-4">Pronto a iniziare?</p>
        <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/20">
          Inizia ora
        </button>
      </div>
    </div>
  );
};

export default HowItWorks;