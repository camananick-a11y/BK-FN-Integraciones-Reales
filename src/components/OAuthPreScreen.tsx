import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  ArrowRightLeft,
  Info
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface OAuthPreScreenProps {
  onConnect: () => void;
}

export const OAuthPreScreen: React.FC<OAuthPreScreenProps> = ({ onConnect }) => {
  return (
    <Card className="max-w-lg w-full mx-auto overflow-hidden shadow-2xl border border-slate-200/60 bg-white">
      {/* Header Section */}
      <div className="p-8 pb-6 text-center border-b border-slate-100">
        <div className="flex justify-center items-center gap-4 mb-6">
          {/* Logo Placeholder - RP PAY */}
          <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-500/30">
            RP
          </div>
          
          <div className="text-slate-300">
            <ArrowRightLeft size={20} />
          </div>

          {/* Logo Placeholder - GHL */}
          <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm">
            <img 
              src="https://picsum.photos/48/48?grayscale" 
              alt="GHL Logo" 
              className="w-8 h-8 opacity-80" 
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-3">
          Conectar tu cuenta de GoHighLevel
        </h1>
        <p className="text-slate-600 leading-relaxed text-sm px-2">
          RP PAY necesita permiso para actualizar el estado de pago de tus clientes después de una compra en Mercado Pago.
        </p>
      </div>

      {/* Why Section */}
      <div className="p-8 pt-6 space-y-8">
        
        <section>
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Info size={16} className="text-brand-600" />
            ¿Por qué pedimos estos permisos?
          </h3>
          <ul className="space-y-4">
            <FeatureItem 
              icon={<CheckCircle2 className="w-5 h-5 text-success-600" />}
              title="Marcar automáticamente pago confirmado"
              description="Actualizamos el estado del contacto al instante."
            />
            <FeatureItem 
              icon={<ShieldCheck className="w-5 h-5 text-brand-600" />}
              title="Evitar registro manual"
              description="Olvídate de cruzar datos manualmente entre plataformas."
            />
            <FeatureItem 
              icon={<Lock className="w-5 h-5 text-slate-500" />}
              title="Privacidad garantizada"
              description="Sin acceso a tus conversaciones, campañas ni funnels."
            />
          </ul>
        </section>

        {/* Permissions List */}
        <section className="bg-slate-50 rounded-xl p-5 border border-slate-100">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Permisos requeridos
          </h4>
          <ul className="space-y-3">
            <PermissionItem text="Leer datos básicos del contacto (para relacionarlo con tu pago)" />
            <PermissionItem text="Actualizar el contacto (solo para marcar pago realizado)" />
            <PermissionItem text="Crear tags como ‘Pago Confirmado’" />
          </ul>
        </section>

        {/* Trust Message */}
        <div className="flex items-start gap-3 p-3 bg-brand-50 rounded-lg text-brand-700 text-sm border border-brand-100/50">
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              <strong>Control total:</strong> RP PAY solo modifica el estado del contacto asociado al pago. No se accede a otros datos sensibles.
            </p>
        </div>

        {/* CTA */}
        <div className="pt-2">
          <Button onClick={onConnect} fullWidth size="lg">
            Conectar con GoHighLevel
          </Button>
          <p className="text-center text-xs text-slate-400 mt-4">
            Al conectar, aceptas los Términos de Servicio de RP PAY.
          </p>
        </div>
      </div>
    </Card>
  );
};

// Sub-components used only here

const FeatureItem: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <li className="flex items-start gap-3">
    <div className="mt-0.5 shrink-0 bg-white p-1 rounded-full shadow-sm border border-slate-100">
      {icon}
    </div>
    <div>
      <p className="text-sm font-semibold text-slate-800">{title}</p>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  </li>
);

const PermissionItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-start gap-2.5 text-sm text-slate-600">
    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
    <span>{text}</span>
  </li>
);
