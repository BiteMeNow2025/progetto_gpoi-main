import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PaginaLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostraPassword, setMostraPassword] = useState(false);
  const [ricordami, setRicordami] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  // Colori per dark mode
  const colori = {
    background: '#FAFAFA',
    card: '#1C1C1E',
    primary: '#FF9500', // Arancione (per evitare il blu)
    danger: '#FF3B30',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
    inputBg: '#2C2C2E',
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center" style={{ backgroundColor: colori.background }}>
      <div className="max-w-md w-full mx-auto px-6">
        {/* Logo e Intestazione */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center" 
            style={{ backgroundColor: colori.primary }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" 
              stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: colori.text }}>Bentornato</h1>
          <p style={{ color: colori.textSecondary }}>Accedi al tuo account School Bar</p>
        </div>

        {/* Form di Login */}
        <div className="rounded-2xl shadow-sm overflow-hidden" style={{ backgroundColor: colori.card }}>
          <form onSubmit={handleLogin} className="p-6">
            <div className="space-y-5">
              {/* Campo Email */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colori.text }}>
                  Email
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Mail size={18} style={{ color: colori.primary }} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tuonome@università.edu"
                    className="w-full pl-10 pr-3 py-3 rounded-lg border focus:outline-none"
                    style={{ 
                      backgroundColor: colori.inputBg,
                      borderColor: colori.border,
                      color: colori.text
                    }}
                    required
                  />
                </div>
              </div>
              
              {/* Campo Password */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colori.text }}>
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Lock size={18} style={{ color: colori.primary }} />
                  </div>
                  <input
                    type={mostraPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-lg border focus:outline-none"
                    style={{ 
                      backgroundColor: colori.inputBg,
                      borderColor: colori.border,
                      color: colori.text
                    }}
                    required
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setMostraPassword(!mostraPassword)}
                  >
                    {mostraPassword ? 
                      <EyeOff size={18} style={{ color: colori.textSecondary }} /> : 
                      <Eye size={18} style={{ color: colori.textSecondary }} />
                    }
                  </button>
                </div>
              </div>
              
              {/* Ricordami & Password dimenticata */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-5 h-5 rounded border flex items-center justify-center cursor-pointer mr-2"
                    style={{ 
                      backgroundColor: ricordami ? colori.primary : 'transparent',
                      borderColor: ricordami ? colori.primary : colori.border 
                    }}
                    onClick={() => setRicordami(!ricordami)}
                  >
                    {ricordami && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" 
                        stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <label className="text-sm cursor-pointer" style={{ color: colori.textSecondary }}>
                    Ricordami
                  </label>
                </div>
                
                <a href="#" className="text-sm font-medium" style={{ color: colori.primary }}>
                  Password dimenticata?
                </a>
              </div>
              
              {/* Pulsante di invio */}
              {error && (
                <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: colori.danger, color: '#FFFFFF' }}>
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                className="w-full py-3 rounded-lg font-medium mt-4"
                style={{ backgroundColor: colori.primary, color: '#FFFFFF' }}
                disabled={isLoading}
              >
                {isLoading ? 'Accesso in corso...' : 'Accedi'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Link di registrazione */}
        <div className="text-center mt-6">
          <p style={{ color: colori.textSecondary }}>
            Non hai un account?{' '}
            <a href="/signup" className="font-medium" style={{ color: colori.primary }}>
              Registrati
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaginaLogin;