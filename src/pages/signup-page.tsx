import React, { useState } from 'react';
import { User, Lock, Mail, Eye, EyeOff, AtSign, ChevronDown, CheckCircle } from 'lucide-react';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    department: ''
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

  const departments = [
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Gestisci la logica di registrazione qui
      console.log('Registrazione con:', formData);
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
                {/* Campo Nome */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                    Nome
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <User size={18} style={{ color: colors.primary }} />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Giovanni"
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
                
                {/* Campo Cognome */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                    Cognome
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <User size={18} style={{ color: colors.primary }} />
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Rossi"
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
                
                {/* Selezione Dipartimento */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                    Dipartimento
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <AtSign size={18} style={{ color: colors.primary }} />
                    </div>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-3 rounded-lg border focus:outline-none appearance-none"
                      style={{ 
                        backgroundColor: colors.inputBg,
                        borderColor: colors.border,
                        color: formData.department ? colors.text : colors.textSecondary
                      }}
                      required
                    >
                      <option value="" disabled>Seleziona il tuo dipartimento</option>
                      {departments.map(dep => (
                        <option key={dep} value={dep}>{dep}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <ChevronDown size={18} style={{ color: colors.textSecondary }} />
                    </div>
                  </div>
                </div>
                
                {/* ID Studente */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                    ID Studente
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <User size={18} style={{ color: colors.primary }} />
                    </div>
                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      placeholder="es. S12345678"
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
