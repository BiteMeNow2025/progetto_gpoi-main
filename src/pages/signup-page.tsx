import React, { useState } from 'react';
import { User, Lock, Mail, Eye, EyeOff, AtSign, ChevronDown, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    class: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Colori per dark mode
  const colors = {
    background: '#000000',
    card: '#1C1C1E',
    primary: '#FF9500', // Arancione (evitando il blu)
    success: '#34C759', // Verde iOS
    danger: '#FF3B30',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
    inputBg: '#2C2C2E',
  };

  const classs = [
    "Amministrazione Aziendale",
    "Informatica",
    "Ingegneria",
    "Giurisprudenza",
    "Medicina",
    "Arti e Umanistiche"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (step === 2) {
      if (!formData.password) {
        setError('Password is required');
        return false;
      }
      if (!formData.confirmPassword) {
        setError('Please confirm your password');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (!formData.class) {
        setError('Please select your class');
        return false;
      }
      if (!agreeToTerms) {
        setError('Please accept the Terms of Service');
        return false;
      }
      if (!hasLength || !hasUpperCase || !hasLowerCase || !hasNumber) {
        setError('Password does not meet the requirements');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      setError('Please fill in all required fields correctly');
      return;
    }

    if (step === 1) {
      const emailParts = formData.email.split('@');
      if (emailParts.length !== 2 || !emailParts[0].includes('.') || emailParts[1] !== 'peano.it') {
        setError('Email must be in the format name.surname@peano.it');
        return;
      }
      setStep(2);
      return;
    }

    setIsSubmitting(true);
    try {
      const username = formData.email.split('@')[0];
      const registrationData = {
        username,
        email: formData.email,
        password: formData.password,
        class: formData.class
      };

      const success = await register(registrationData);
      
      if (!success) {
        throw new Error('Registration failed');
      }

      setSuccess(true);
      // Add success animation
      const element = document.querySelector('form');
      element.style.transition = 'transform 0.5s ease-in-out';
      element.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        element.style.transform = 'scale(1)';
      }, 200);

      // Automatically log in the user after successful registration
      const loginSuccess = await login(formData.email, formData.password);
      
      if (loginSuccess) {
        // Redirect to home page after successful login
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        // If auto-login fails, redirect to login page
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }
    } catch (error) {
      setError(error.message || 'An error occurred during registration');
      console.error('Registration error:', error);
      
      // Add error shake animation
      const element = document.querySelector('form');
      element.style.transition = 'transform 0.1s ease-in-out';
      element.style.transform = 'translateX(10px)';
      
      setTimeout(() => {
        element.style.transform = 'translateX(-10px)';
      }, 100);
      
      setTimeout(() => {
        element.style.transform = 'translateX(0)';
      }, 200);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Indicatori di forza della password
  const hasLength = formData.password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(formData.password);
  const hasLowerCase = /[a-z]/.test(formData.password);
  const hasNumber = /[0-9]/.test(formData.password);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.password !== '';

  return (
    <div className="min-h-screen py-10" style={{ backgroundColor: colors.background }}>
      <div className="max-w-md w-full mx-auto px-6">
        {/* Logo e Intestazione */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center" 
            style={{ backgroundColor: colors.primary }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" 
              stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: colors.text }}>Crea un Account</h1>
          <p style={{ color: colors.textSecondary }}>Unisciti alla community di School Bar</p>
        </div>

        {/* Indicatore di Progresso */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" 
              style={{ 
                backgroundColor: colors.primary,
                color: '#FFFFFF'
              }}>
              1
            </div>
            <div className="w-10 h-1" style={{ 
              backgroundColor: step === 2 ? colors.primary : colors.border 
            }}></div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" 
              style={{ 
                backgroundColor: step === 2 ? colors.primary : colors.border,
                color: step === 2 ? '#FFFFFF' : colors.textSecondary
              }}>
              2
            </div>
          </div>
        </div>

        {/* Modulo di Registrazione */}
        <div className="rounded-2xl shadow-sm overflow-hidden" style={{ backgroundColor: colors.card }}>
          <form onSubmit={handleSubmit} className="p-6">
            {step === 1 ? (
              <div className="space-y-5">
                {/* Campo Email */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                    Indirizzo Email
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Mail size={18} style={{ color: colors.primary }} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="giovanni.rossi@universita.edu"
                      className="w-full pl-10 pr-3 py-3 rounded-lg border focus:outline-none"
                      style={{ 
                        backgroundColor: colors.inputBg,
                        borderColor: colors.border,
                        color: colors.text
                      }}
                      required
                    />
                  </div>
                </div>
                
                {/* Pulsante Continua */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-medium mt-4"
                  style={{ backgroundColor: colors.primary, color: '#FFFFFF' }}
                >
                  Continua
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Campo Password */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Lock size={18} style={{ color: colors.primary }} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 rounded-lg border focus:outline-none"
                      style={{ 
                        backgroundColor: colors.inputBg,
                        borderColor: colors.border,
                        color: colors.text
                      }}
                      required
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 
                        <EyeOff size={18} style={{ color: colors.textSecondary }} /> : 
                        <Eye size={18} style={{ color: colors.textSecondary }} />
                      }
                    </button>
                  </div>
                  
                  {/* Forza Password */}
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center">
                      <CheckCircle size={14} style={{ 
                        color: hasLength ? colors.success : colors.textSecondary 
                      }} />
                      <span className="ml-2 text-xs" style={{ color: colors.textSecondary }}>
                        Almeno 8 caratteri
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle size={14} style={{ 
                        color: hasUpperCase ? colors.success : colors.textSecondary 
                      }} />
                      <span className="ml-2 text-xs" style={{ color: colors.textSecondary }}>
                        Contiene lettera maiuscola
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle size={14} style={{ 
                        color: hasLowerCase ? colors.success : colors.textSecondary 
                      }} />
                      <span className="ml-2 text-xs" style={{ color: colors.textSecondary }}>
                        Contiene lettera minuscola
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle size={14} style={{ 
                        color: hasNumber ? colors.success : colors.textSecondary 
                      }} />
                      <span className="ml-2 text-xs" style={{ color: colors.textSecondary }}>
                        Contiene numero
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Conferma Password */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                    Conferma Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Lock size={18} style={{ color: colors.primary }} />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 rounded-lg border focus:outline-none"
                      style={{ 
                        backgroundColor: colors.inputBg,
                        borderColor: colors.border,
                        color: colors.text
                      }}
                      required
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? 
                        <EyeOff size={18} style={{ color: colors.textSecondary }} /> : 
                        <Eye size={18} style={{ color: colors.textSecondary }} />
                      }
                    </button>
                  </div>
                  {formData.confirmPassword && !passwordsMatch && (
                    <p className="mt-1 text-xs" style={{ color: colors.danger }}>
                      Le password non corrispondono
                    </p>
                  )}
                </div>
                
                {/* Selezione Classe */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                    Classe
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <AtSign size={18} style={{ color: colors.primary }} />
                    </div>
                    <select
                      name="class"
                      value={formData.class}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-3 rounded-lg border focus:outline-none appearance-none"
                      style={{ 
                        backgroundColor: colors.inputBg,
                        borderColor: colors.border,
                        color: formData.class ? colors.text : colors.textSecondary
                      }}
                      required
                    >
                      <option value="" disabled>Seleziona la tua classe</option>
                      {classs.map(dep => (
                        <option key={dep} value={dep}>{dep}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <ChevronDown size={18} style={{ color: colors.textSecondary }} />
                    </div>
                  </div>
                </div>
                
                {/* Termini e Condizioni */}
                <div className="flex items-start">
                  <div 
                    className="w-5 h-5 rounded border flex items-center justify-center cursor-pointer mt-0.5 mr-2"
                    style={{ 
                      backgroundColor: agreeToTerms ? colors.primary : 'transparent',
                      borderColor: agreeToTerms ? colors.primary : colors.border 
                    }}
                    onClick={() => setAgreeToTerms(!agreeToTerms)}
                  >
                    {agreeToTerms && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" 
                        stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <div>
                    <label className="text-sm cursor-pointer" style={{ color: colors.textSecondary }}>
                      Accetto i <a href="#" style={{ color: colors.primary }}>Termini di Servizio</a> e{' '}
                      <a href="#" style={{ color: colors.primary }}>Politiche sulla Privacy</a>
                    </label>
                  </div>
                </div>
                
                {/* Pulsante Crea Account */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-medium mt-4"
                  style={{ 
                    backgroundColor: colors.primary, 
                    color: '#FFFFFF',
                    opacity: agreeToTerms ? 1 : 0.6
                  }}
                  disabled={!agreeToTerms}
                  onClick={handleSubmit}
                >
                  Crea Account
                </button>
                
                {/* Pulsante Indietro */}
                <button
                  type="button"
                  className="w-full py-3 mt-4 rounded-lg border text-sm"
                  style={{
                    color: colors.primary,
                    borderColor: colors.primary
                  }}
                  onClick={() => setStep(1)}
                >
                  Indietro
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
