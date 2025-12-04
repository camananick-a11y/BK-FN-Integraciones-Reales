import React from 'react';
import { 
  X, 
  Link, 
  CheckCircle2, 
  RefreshCw, 
  Settings, 
  BookOpen, 
  Lightbulb, 
  Zap,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { Button } from './ui/Button';

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserGuideModal: React.FC<UserGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Fondo oscuro */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        
        {/* Encabezado */}
        <div className="bg-slate-50 px-8 py-5 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-100 rounded-xl text-brand-600 shadow-sm border border-brand-200">
                <BookOpen size={24} />
            </div>
            <div>
                <h3 className="font-bold text-slate-900 text-xl">Cómo funciona RP PAY</h3>
                <p className="text-sm text-slate-500">Domina el flujo de cobro automático en 4 pasos.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-2 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Contenido Scrollable */}
        <div className="p-8 overflow-y-auto">
          <div className="space-y-8">
            
            {/* Paso 1 */}
            <StepItem 
              number="1"
              title="Configuración Inicial"
              description="Antes de empezar, ve a 'Configuración' y conecta tus cuentas. RP PAY actúa como puente: necesita permiso de Mercado Pago para procesar dinero y de GoHighLevel (GHL) para actualizar tus contactos."
              icon={<Settings size={20} className="text-slate-600" />}
              tip="Si ves el check verde ✅ en ambas tarjetas de configuración, ¡ya estás listo!"
            />

            {/* Paso 2 */}
            <StepItem 
              number="2"
              title="Genera un Boleto Digital"
              description="Desde el panel, selecciona un cliente y un monto. El sistema creará un enlace único y seguro. No es un link genérico; está atado a ese cliente específico para poder rastrearlo."
              icon={<Link size={20} className="text-brand-600" />}
              tip="Puedes enviar este link directamente por WhatsApp Web o Email desde la misma pantalla."
            />

            {/* Paso 3 */}
            <StepItem 
              number="3"
              title="El Cliente Realiza el Pago"
              description="Tu cliente abre el link y ve una pasarela oficial de Mercado Pago. Puede pagar con Tarjeta, Efectivo (Oxxo/PagoFácil) o Saldo en cuenta. Todo ocurre bajo la seguridad bancaria de Mercado Pago."
              icon={<CreditCard size={20} className="text-purple-600" />}
            />

            {/* Paso 4 */}
            <StepItem 
              number="4"
              title="Automatización y Cierre"
              description="Aquí ocurre la magia. Apenas el pago es 'Aprobado', RP PAY le avisa a GoHighLevel. Buscamos a tu contacto y le añadimos la etiqueta (Tag) que configuraste (ej: 'pago-confirmado')."
              icon={<Zap size={20} className="text-amber-500" />}
              tip="Configura un Workflow en GHL que se dispare con esa etiqueta para enviar el recibo o dar acceso al curso automáticamente."
            />

          </div>

          {/* Caja de Seguridad */}
          <div className="mt-8 p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3">
            <ShieldCheck className="text-emerald-600 shrink-0 mt-0.5" size={20} />
            <div>
                <h4 className="text-sm font-bold text-emerald-800">Seguridad Garantizada</h4>
                <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                    RP PAY nunca almacena los números de tarjeta de tus clientes ni toca tu dinero. Los fondos van directo de la tarjeta del cliente a tu cuenta de Mercado Pago.
                </p>
            </div>
          </div>
        </div>

        {/* Pie del modal */}
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-between items-center flex-shrink-0">
          <p className="text-xs text-slate-400">v1.0.0 - RP Soft</p>
          <Button onClick={onClose} size="lg" className="px-8">
            Entendido
          </Button>
        </div>

      </div>
    </div>
  );
};

// Sub-componente mejorado para los pasos
const StepItem: React.FC<{ 
    number: string, 
    title: string, 
    description: string, 
    icon: React.ReactNode,
    tip?: string 
}> = ({ number, title, description, icon, tip }) => (
    <div className="flex gap-5 group relative">
        {/* Columna Izquierda */}
        <div className="flex-shrink-0 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-sm font-bold text-slate-500 shadow-sm group-hover:border-brand-500 group-hover:text-brand-600 transition-colors z-10">
                {number}
            </div>
            {/* Línea conectora */}
            <div className="w-0.5 flex-1 bg-slate-200 my-2 group-last:hidden min-h-[40px]" />
        </div>

        {/* Columna Derecha */}
        <div className="pb-8 flex-1">
            <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-slate-100 rounded-md">{icon}</div>
                <h4 className="text-lg font-bold text-slate-900">
                    {title}
                </h4>
            </div>
            
            <p className="text-sm text-slate-600 leading-relaxed text-justify">
                {description}
            </p>

            {tip && (
                <div className="mt-3 flex items-start gap-2 p-3 bg-indigo-50 rounded-lg border border-indigo-100 text-xs text-indigo-800">
                    <Lightbulb size={14} className="shrink-0 mt-0.5 text-indigo-600" />
                    <span><strong>Pro Tip:</strong> {tip}</span>
                </div>
            )}
        </div>
    </div>
);