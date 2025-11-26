import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  ExternalLink, 
  Copy, 
  CreditCard, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  FileText, 
  Download, 
  Send, 
  MessageSquare,
  MoreVertical,
  Link as LinkIcon,
  Globe
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface PaymentDetailScreenProps {
  onBack: () => void;
}

// Mock Data for the Detail View
const MOCK_DETAIL = {
  id: 'pay_9f8s7d6f',
  amount: '1,200.00',
  currency: 'USD',
  status: 'approved',
  method: 'card',
  concept: 'Asesoría Estratégica - Pack 5 Horas',
  created_at: '24 Oct 2023, 14:30',
  updated_at: '24 Oct 2023, 14:35',
  link: 'https://pay.rp-pay.com/l/9f8s7d6f',
  client: {
    name: 'Maria Gonzalez',
    email: 'maria.g@gmail.com',
    phone: '+52 55 1234 5678',
    ghl_id: 'ghl_contact_123xyz',
    avatar_initials: 'MG'
  },
  mp_transaction: {
    id: '12345678901',
    status: 'approved',
    status_detail: 'accredited',
    method: 'mastercard',
    card_last4: '4242',
    installments: 1
  },
  timeline: [
    { id: 1, title: 'Link generado', date: '24 Oct, 14:30', icon: LinkIcon, color: 'bg-brand-100 text-brand-600' },
    { id: 2, title: 'Cliente abrió el link', date: '24 Oct, 14:32', icon: Globe, color: 'bg-slate-100 text-slate-600' },
    { id: 3, title: 'Pago iniciado', date: '24 Oct, 14:34', icon: CreditCard, color: 'bg-slate-100 text-slate-600' },
    { id: 4, title: 'Pago aprobado (Mercado Pago)', date: '24 Oct, 14:35', icon: CheckCircle2, color: 'bg-emerald-100 text-emerald-600' },
    { id: 5, title: 'Webhook recibido', date: '24 Oct, 14:35', icon: CheckCircle2, color: 'bg-emerald-100 text-emerald-600' },
    { id: 6, title: 'Actualizado en GoHighLevel', date: '24 Oct, 14:35', icon: ExternalLink, color: 'bg-brand-100 text-brand-600' },
  ]
};

export const PaymentDetailScreen: React.FC<PaymentDetailScreenProps> = ({ onBack }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(MOCK_DETAIL.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-medium text-sm"><CheckCircle2 size={14}/> Aprobado</div>;
      case 'pending':
        return <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 font-medium text-sm"><AlertCircle size={14}/> Pendiente</div>;
      case 'rejected':
        return <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-100 font-medium text-sm"><XCircle size={14}/> Rechazado</div>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white rounded-full transition-colors text-slate-500 hover:text-slate-700 hover:shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Detalle del Pago</h1>
            <p className="text-slate-500 text-sm">Información completa del cobro generado con RP PAY.</p>
          </div>
        </div>
        
        <div className="flex gap-2">
           <Button variant="outline" className="bg-white border-slate-200 text-slate-600">
             <Download size={16} className="mr-2" /> Comprobante
           </Button>
           <Button variant="outline" className="bg-white border-slate-200 text-slate-600 md:hidden">
             <MoreVertical size={16} />
           </Button>
        </div>
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Estado</p>
                {getStatusBadge(MOCK_DETAIL.status)}
            </div>
        </Card>
        
        <Card className="p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Monto Total</p>
                <div className="text-2xl font-bold text-slate-900 flex items-baseline gap-1">
                    <span className="text-sm text-slate-400 font-medium">$</span>
                    {MOCK_DETAIL.amount}
                    <span className="text-xs text-slate-400 font-medium">{MOCK_DETAIL.currency}</span>
                </div>
            </div>
        </Card>

        <Card className="p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Método</p>
                <div className="flex items-center gap-2 font-medium text-slate-700">
                    <CreditCard size={20} className="text-brand-600" />
                    <span className="capitalize">{MOCK_DETAIL.mp_transaction.method} •••• {MOCK_DETAIL.mp_transaction.card_last4}</span>
                </div>
            </div>
        </Card>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Main Details) - Takes 2/3 */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Client Information */}
            <Card className="overflow-hidden border border-slate-200 shadow-sm">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                        <User size={18} className="text-slate-400" /> Información del Cliente
                    </h3>
                    <Button variant="outline" size="sm" className="h-8 text-xs bg-white">
                        Ver en GHL <ExternalLink size={12} className="ml-1" />
                    </Button>
                </div>
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-lg border border-brand-200">
                            {MOCK_DETAIL.client.avatar_initials}
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                            <div>
                                <p className="text-xs text-slate-500 mb-0.5">Nombre Completo</p>
                                <p className="font-medium text-slate-900">{MOCK_DETAIL.client.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-0.5 flex items-center gap-1"><Mail size={12}/> Email</p>
                                <p className="font-medium text-slate-900">{MOCK_DETAIL.client.email}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-0.5 flex items-center gap-1"><Phone size={12}/> Teléfono</p>
                                <p className="font-medium text-slate-900">{MOCK_DETAIL.client.phone}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-0.5">GHL ID</p>
                                <p className="font-mono text-sm text-slate-600 bg-slate-100 w-fit px-2 py-0.5 rounded">{MOCK_DETAIL.client.ghl_id}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Mercado Pago Transaction */}
            <Card className="overflow-hidden border border-slate-200 shadow-sm">
                <div className="bg-[#009EE3]/5 px-6 py-4 border-b border-[#009EE3]/10 flex justify-between items-center">
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                        <CreditCard size={18} className="text-[#009EE3]" /> Transacción Mercado Pago
                    </h3>
                    <Button variant="outline" size="sm" className="h-8 text-xs bg-white hover:text-[#009EE3] hover:border-[#009EE3]/30">
                        Ver en Mercado Pago <ExternalLink size={12} className="ml-1" />
                    </Button>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <p className="text-xs text-slate-500 mb-1">Payment ID</p>
                        <p className="font-mono font-medium text-slate-900">{MOCK_DETAIL.mp_transaction.id}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 mb-1">Status Detail</p>
                        <p className="font-medium text-slate-900 capitalize">{MOCK_DETAIL.mp_transaction.status_detail}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 mb-1">Método</p>
                        <p className="font-medium text-slate-900 flex items-center gap-2 capitalize">
                            {MOCK_DETAIL.mp_transaction.method} **** {MOCK_DETAIL.mp_transaction.card_last4}
                        </p>
                    </div>
                     <div>
                        <p className="text-xs text-slate-500 mb-1">Cuotas</p>
                        <p className="font-medium text-slate-900">{MOCK_DETAIL.mp_transaction.installments}</p>
                    </div>
                </div>
            </Card>

            {/* Timeline */}
            <Card className="overflow-hidden border border-slate-200 shadow-sm">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                        <Clock size={18} className="text-slate-400" /> Eventos
                    </h3>
                </div>
                <div className="p-6">
                    <div className="relative pl-4 border-l-2 border-slate-100 space-y-8">
                        {MOCK_DETAIL.timeline.map((event, index) => {
                            const Icon = event.icon;
                            return (
                                <div key={event.id} className="relative">
                                    <div className={`absolute -left-[25px] p-1 rounded-full border-2 border-white shadow-sm ${event.color}`}>
                                        <Icon size={14} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">{event.title}</p>
                                        <p className="text-xs text-slate-500">{event.date}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Card>
        </div>

        {/* Right Column (Sidebar) - Takes 1/3 */}
        <div className="lg:col-span-1 space-y-6">
            
            {/* Payment Context / Configuration */}
            <Card className="border border-slate-200 shadow-sm p-5 space-y-4">
                 <h3 className="text-sm font-bold text-slate-900">Detalles del Cobro</h3>
                 
                 <div className="space-y-1">
                    <p className="text-xs text-slate-500">Concepto</p>
                    <p className="text-sm font-medium text-slate-800">{MOCK_DETAIL.concept}</p>
                 </div>

                 <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                        <p className="text-xs text-slate-500">Creado</p>
                        <p className="text-xs font-medium text-slate-700 flex items-center gap-1">
                            <Calendar size={10} /> 24 Oct
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Actualizado</p>
                        <p className="text-xs font-medium text-slate-700 flex items-center gap-1">
                             <Clock size={10} /> Hace 2h
                        </p>
                    </div>
                 </div>

                 <div className="pt-2 border-t border-slate-100">
                    <p className="text-xs text-slate-500 mb-2">Link de Pago</p>
                    <div className="flex gap-2">
                        <input 
                            readOnly 
                            value={MOCK_DETAIL.link}
                            className="w-full text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-slate-600 truncate focus:outline-none"
                        />
                        <button 
                            onClick={handleCopyLink}
                            className="bg-white border border-slate-200 p-1.5 rounded hover:bg-slate-50 text-slate-500 transition-colors relative"
                            title="Copiar"
                        >
                            {copied ? <CheckCircle2 size={14} className="text-emerald-500"/> : <Copy size={14} />}
                        </button>
                    </div>
                 </div>
            </Card>

            {/* Actions */}
            <Card className="border border-slate-200 shadow-sm p-5 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 mb-1">Acciones Rápidas</h3>
                
                <Button fullWidth variant="secondary" className="justify-start h-9 text-sm" disabled={MOCK_DETAIL.status !== 'pending'}>
                    <Send size={14} className="mr-2" /> Reenviar Link
                </Button>
                
                <Button fullWidth variant="outline" className="justify-start h-9 text-sm bg-white border-slate-200">
                    <FileText size={14} className="mr-2" /> Nota Interna
                </Button>

                <Button fullWidth variant="outline" className="justify-start h-9 text-sm bg-white border-slate-200 text-rose-600 hover:text-rose-700 hover:bg-rose-50 hover:border-rose-100">
                    <AlertCircle size={14} className="mr-2" /> Reportar Problema
                </Button>
            </Card>
            
            {/* Help Box */}
            <div className="bg-brand-50 rounded-xl p-4 border border-brand-100">
                <h4 className="text-brand-800 text-sm font-semibold mb-1 flex items-center gap-2">
                    <MessageSquare size={14}/> ¿Necesitas ayuda?
                </h4>
                <p className="text-xs text-brand-700/80 mb-3">
                    Si tienes problemas con este pago, contacta a soporte.
                </p>
                <a href="#" className="text-xs font-semibold text-brand-600 hover:underline">Ir al centro de ayuda</a>
            </div>

        </div>

      </div>
    </div>
  );
};