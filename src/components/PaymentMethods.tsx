import React from 'react';
import { CreditCard } from 'lucide-react';

interface PaymentMethodsProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
  colors: {
    primary: string;
    text: string;
    inputBg: string;
  };
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ selectedMethod, onMethodChange, colors }) => {
  const paymentMethods = [
    
    {
      id: 'satispay',
      name: 'Satispay'
    },
    
    {
      id: 'card',
      name: 'Card (stripe)',
      icon: <CreditCard size={20} style={{ color: colors.primary }} />,
    },
    {
      id: 'cash',
      name: 'Cash'
    }
  ];

  return (
    <div className="space-y-3">
      {paymentMethods.map((method) => (
        <label
          key={method.id}
          className="flex items-center p-3 rounded-lg cursor-pointer"
          style={{ backgroundColor: selectedMethod === method.id ? colors.inputBg : 'transparent' }}
        >
          <input
            type="radio"
            name="paymentMethod"
            value={method.id}
            checked={selectedMethod === method.id}
            onChange={(e) => onMethodChange(e.target.value)}
            className="hidden"
          />
          <div
            className="w-5 h-5 rounded-full border mr-3 flex items-center justify-center"
            style={{ borderColor: colors.primary }}
          >
            {selectedMethod === method.id && (
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors.primary }}
              />
            )}
          </div>
          {method.icon}
          <span style={{ color: colors.text }} className="ml-2">
            {method.name}
          </span>
        </label>
      ))}
    </div>
  );
};

export default PaymentMethods;