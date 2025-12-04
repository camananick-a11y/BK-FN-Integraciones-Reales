import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Lock, Mail, Loader2, ArrowRight } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulamos un pequeño delay para dar sensación de procesamiento real
    setTimeout(async () => {
      try {
        const result = await login(email, password);
        if (!result.success) {
          setError(result.message || 'Error al iniciar sesión');
          setIsLoading(false);
        }
        // Si es exitoso, el AuthContext actualiza el estado y App.tsx te redirige solo.
      } catch (err) {
        setError('Ocurrió un error inesperado');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="w-full max-w-md space-y-8">
        
        {/* Header con Logo */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-brand-600 rounded-2xl flex items-center justify-center shadow-xl shadow-brand-500/20">
            <span className="text-white text-2xl font-bold">RP</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-slate-900 tracking-tight">
            Bienvenido a RP PAY
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Inicia sesión para gestionar tus cobros
          </p>
        </div>

        {/* Tarjeta de Login */}
        <Card className="p-8 shadow-xl border border-slate-200/60 bg-white">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Input Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Correo Electrónico</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="text" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                  placeholder="admin@demo.com"
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Contraseña</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Mensaje de Error */}
            {error && (
              <div className="text-xs text-rose-600 bg-rose-50 p-3 rounded-lg border border-rose-100 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                {error}
              </div>
            )}

            {/* Botón Submit */}
            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={isLoading || !email || !password}
              className="group"
            >
              {isLoading ? (
                <Loader2 className="animate-spin mr-2" size={20} />
              ) : (
                <>
                  Ingresar al Panel <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform"/>
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              Demo Mode: Usa cualquier usuario y contraseña
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};