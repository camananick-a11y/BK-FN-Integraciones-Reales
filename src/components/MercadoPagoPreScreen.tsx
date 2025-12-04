import React from 'react';
import { 
  Link, 
  RefreshCw, 
  CheckCircle2, 
  ShieldCheck, 
  Wallet, 
  History,
  Lock,
  ArrowRightLeft
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface MercadoPagoPreScreenProps {
  onConnect: () => void;
}

export const MercadoPagoPreScreen: React.FC<MercadoPagoPreScreenProps> = ({ onConnect }) => {
  return (
    <Card className="w-full overflow-hidden shadow-2xl border border-slate-200/60 bg-white">
      {/* Header Section with MP Branding Colors */}
      <div className="relative p-8 pb-6 text-center border-b border-slate-100 bg-gradient-to-b from-[#f0f9ff] to-white">
        
        <div className="flex justify-center items-center gap-5 mb-6">
          {/* Logo Placeholder - RP PAY */}
          <div className="w-14 h-14 bg-brand-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-500/20 z-10">
            RP
          </div>
          
          <div className="text-slate-300 relative z-0">
             <ArrowRightLeft size={20} />
          </div>

          {/* Logo Placeholder - Mercado Pago */}
          <div className="w-14 h-14 bg-[#009EE3] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-500/20 z-10">
            {/* Handshake icon representing MP handshake logo vaguely */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m19 5-7 7-7-7"/>
              <path d="M12 21a9 9 0 0 0 9-9v-9H3v9a9 9 0 0 0 9 9Z" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-3">
          Conectar tu cuenta de Mercado Pago
        </h1>
        <p className="text-slate-600 leading-relaxed text-sm px-2">
          RP PAY usará tu cuenta para generar links de cobro y confirmar pagos automáticamente.
        </p>
      </div>

      {/* Main Content */}
      <div className="p-8 pt-6 space-y-8">
        
        {/* What RP PAY Does */}
        <section>
          <h3 className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-4 flex items-center gap-2">
            <RefreshCw size={14} className="animate-spin-slow" />
            ¿Qué hará RP PAY?
          </h3>
          <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100">
            <ul className="space-y-4">
              <BenefitItem 
                icon={<Link className="w-5 h-5 text-brand-600" />}
                title="Generar enlaces"
                description="Crear enlaces de pago para tus clientes."
              />
              <BenefitItem 
                icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                title="Confirmación automática"
                description="Recibir confirmaciones automáticas de MP."
              />
              <BenefitItem 
                icon={<RefreshCw className="w-5 h-5 text-brand-600" />}
                title="Sincronizar con GHL"
                description="Actualizar en GHL el estado 'Pago confirmado'."
              />
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <ShieldCheck size={14} />
            Tu seguridad es primero
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <SecurityItem 
              text="No realiza cobros sin tu autorización" 
              icon={<ShieldCheck size={16} />}
            />
            <SecurityItem 
              text="No accede a tu dinero ni mueve fondos" 
              icon={<Wallet size={16} />}
            />
            <SecurityItem 
              text="No accede a tus ventas anteriores" 
              icon={<History size={16} />}
            />
          </div>
        </section>

        {/* Trust Footer */}
        <div className="pt-2">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-6 bg-slate-50 py-2 rounded-lg border border-slate-100">
            <Lock size={12} className="text-emerald-600" />
            <span>Usamos <strong>OAuth oficial</strong>. Puedes revocar el acceso cuando quieras.</span>
          </div>

          <Button 
            onClick={onConnect} 
            fullWidth 
            size="lg"
            className="!bg-[#009EE3] hover:!bg-[#008FCC] shadow-[#009EE3]/30"
          >
            Conectar con Mercado Pago
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Sub-components

const BenefitItem: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <li className="flex items-start gap-3">
    <div className="mt-0.5 shrink-0 bg-white p-1.5 rounded-lg shadow-sm border border-slate-200">
      {icon}
    </div>
    <div>
      <p className="text-sm font-semibold text-slate-800">{title}</p>
      <p className="text-sm text-slate-500 leading-snug">{description}</p>
    </div>
  </li>
);

const SecurityItem: React.FC<{ text: string; icon: React.ReactNode }> = ({ text, icon }) => (
  <div className="flex items-center gap-3 text-sm text-slate-600 px-3 py-2 rounded-lg border border-transparent hover:bg-slate-50 hover:border-slate-100 transition-colors">
    <div className="text-emerald-600/80 shrink-0">
      {icon}
    </div>
    <span className="font-medium">{text}</span>
  </div>
);