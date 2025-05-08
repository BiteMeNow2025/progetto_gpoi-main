import React, { useState } from 'react';
import { CreditCard, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Order {
  id: string;
  studentName: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  paymentStatus: 'paid' | 'pending' | 'failed';
  paymentMethod?: 'credit_card' | 'cash' | 'other';
  timestamp: string;
}

const PastOrders: React.FC = () => {
  const { user } = useAuth();
  
  // Mock data for orders
  const [orders] = useState<Order[]>([]);

  // Colors for dark mode (matching existing theme)
  const colors = {
    background: '#000000',
    card: '#1C1C1E',
    primary: '#FF9500',
    success: '#34C759',
    danger: '#FF3B30',
    warning: '#FFCC00',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
    inputBg: '#2C2C2E',
  };

  const getPaymentStatusColor = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'paid': return colors.success;
      case 'pending': return colors.warning;
      case 'failed': return colors.danger;
      default: return colors.textSecondary;
    }
  };

  const getPaymentMethodIcon = (method?: Order['paymentMethod']) => {
    switch (method) {
      case 'credit_card': return <CreditCard size={16} />;
      case 'cash': return <DollarSign size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const calculateClassTotal = () => {
    return orders.reduce((sum, order) => sum + order.total, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: colors.background }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
            {user ? user.username : 'Guest'}
          </h1>
          <p style={{ color: colors.textSecondary }}>
            Visualizza gli ordini dei tuoi compagni di classe
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-4 mb-8 bg-blue-50">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl p-4 shadow-sm"
              style={{ backgroundColor: colors.card }}
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="font-medium" style={{ color: colors.text }}>
                    {order.studentName}
                  </h3>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {new Date(order.timestamp).toLocaleTimeString('it-IT', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {/* Payment Method Badge */}
                  {order.paymentMethod && (
                    <div
                      className="px-3 py-1 rounded-full flex items-center space-x-1"
                      style={{ backgroundColor: colors.inputBg }}
                    >
                      {getPaymentMethodIcon(order.paymentMethod)}
                      <span className="text-sm" style={{ color: colors.text }}>
                        {order.paymentMethod === 'credit_card' ? 'Carta' : 'Contanti'}
                      </span>
                    </div>
                  )}
                  {/* Payment Status Badge */}
                  <div
                    className="px-3 py-1 rounded-full flex items-center space-x-1"
                    style={{ backgroundColor: colors.inputBg }}
                  >
                    {order.paymentStatus === 'paid' ? (
                      <CheckCircle size={16} style={{ color: colors.success }} />
                    ) : order.paymentStatus === 'failed' ? (
                      <XCircle size={16} style={{ color: colors.danger }} />
                    ) : (
                      <Clock size={16} style={{ color: colors.warning }} />
                    )}
                    <span className="text-sm" style={{ color: getPaymentStatusColor(order.paymentStatus) }}>
                      {order.paymentStatus === 'paid' ? 'Pagato' :
                       order.paymentStatus === 'pending' ? 'In attesa' : 'Non riuscito'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-2 mb-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div style={{ color: colors.text }}>
                      {item.quantity}x {item.name}
                    </div>
                    <div style={{ color: colors.textSecondary }}>
                      €{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div
                className="flex justify-between pt-2"
                style={{ borderTop: `1px solid ${colors.border}` }}
              >
                <span style={{ color: colors.text }}>Totale</span>
                <span style={{ color: colors.primary }}>€{order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Class Total Summary */}
        <div
          className="rounded-xl p-6 mt-6"
          style={{ backgroundColor: colors.card }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium mb-1" style={{ color: colors.text }}>
                Totale Classe
              </h3>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                {orders.length} ordini
              </p>
            </div>
            <div className="text-2xl font-bold" style={{ color: colors.primary }}>
              €{calculateClassTotal()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastOrders;