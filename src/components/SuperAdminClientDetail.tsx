import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  Power, 
  Copy, 
  Server, 
  Database, 
  Activity, 
  Clock, 
  Shield, 
  Play,
  Key,
  Mail,
  Phone,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface SuperAdminClientDetailProps {
  onBack: () => void;
}

export const SuperAdminClientDetail: React.FC<SuperAdminClientDetailProps> = ({ onBack }) => {
  const [isReconnecting, setIsReconnecting] = useState(false);

  const handleReconnect = () => {
    setIsReconnecting(true);
    setTimeout(() => setIsReconnecting(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-start gap-4">
          <button 
            onClick={onBack}
            className="mt-1 p-2 hover:bg-white rounded-full transition-colors text-slate-500 hover:text-slate-700 hover:shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900">Agency Alpha</h1>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wide">Activo</span>
            </div>
            <p className="text-slate-500 text-sm mt-1">Detalle técnico y logs de actividad.</p>
          </div>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="bg-white border-slate-200 text-slate-600">
                <Activity size={16} className="mr-2" /> Ver Logs Raw
            </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatusCard 
            title="Conexión GHL" 
            status="connected" 
            label="Conectado" 
            icon={<Server size={18} />}
        />
        <StatusCard 
            title="Conexión Mercado Pago" 
            status="error" 
            label="Token Inválido" 
            icon={<Database size={18} />}
        />
        <StatusCard 
            title="Estado Tokens" 
            status="warning" 
            label="Expira en 24h" 
            icon={<Key size={18} />}
        />
        <StatusCard 
            title="Última Actividad" 
            status="neutral" 
            label="Hace 12 min" 
            icon={<Clock size={18} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Info & Connections */}
        <div className="space-y-6">
            
            {/* Client Info */}
            <Card className="p-5 border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider border-b border-slate-100 pb-2">
                    Información del Cliente
                </h3>
                <div className="space-y-4">
                    <div>
                        <p className="text-xs text-slate-500 mb-1 flex items-center gap-1.5">
                            <Server size={12}/> Nombre del Negocio
                        </p>
                        <p className="text-sm font-medium text-slate-800">Agency Alpha LLC</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 mb-1 flex items-center gap-1.5">
                            <Mail size={12}/> Admin Email
                        </p>
                        <div className="flex items-center gap-2 group">
                             <p className="text-sm font-medium text-slate-800">admin@alpha.com</p>
                             <button className="text-slate-300 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Copy size={12} />
                             </button>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 mb-1 flex items-center gap-1.5">
                            <Phone size={12}/> Teléfono
                        </p>
                        <p className="text-sm font-medium text-slate-800">+1 555 123 4567</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 mb-1 flex items-center gap-1.5">
                            <MapPin size={12}/> Location ID
                        </p>
                         <div className="flex items-center gap-2 group">
                             <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600 font-mono border border-slate-200">
                                loc_Xy78z9
                             </code>
                             <button className="text-slate-300 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Copy size={12} />
                             </button>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Connections Management */}
            <Card className="p-5 border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider border-b border-slate-100 pb-2">
                    Gestión de Conexiones
                </h3>
                
                <div className="space-y-6">
                    {/* GHL Token Section */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-slate-600">Token GHL</span>
                            <span className="text-[10px] px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-100">Valid</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                            <code className="flex-1 bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs text-slate-500 font-mono">
                                •••••••••••• aB9x
                            </code>
                        </div>
                        <div className="flex gap-2">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-1 text-xs bg-white border-slate-200 hover:border-indigo-300 hover:text-indigo-700"
                                onClick={handleReconnect}
                            >
                                <RefreshCw size={12} className={`mr-1.5 ${isReconnecting ? 'animate-spin' : ''}`} /> 
                                {isReconnecting ? 'Conectando...' : 'Reconectar'}
                            </Button>
                        </div>
                    </div>

                    {/* MP Token Section */}
                    <div>
                         <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-slate-600">Token MP</span>
                            <span className="text-[10px] px-1.5 py-0.5 bg-rose-50 text-rose-700 rounded border border-rose-100">Error 401</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                            <code className="flex-1 bg-rose-50 border border-rose-200 rounded px-2 py-1.5 text-xs text-rose-500 font-mono">
                                •••••••••••• 88sL
                            </code>
                        </div>
                        <div className="flex gap-2">
                             <Button variant="outline" size="sm" className="flex-1 text-xs bg-white border-slate-200 hover:border-indigo-300 hover:text-indigo-700">
                                <RefreshCw size={12} className="mr-1.5" /> Reconectar
                            </Button>
                            <Button variant="outline" size="sm" className="text-xs bg-white border-rose-200 text-rose-600 hover:bg-rose-50">
                                <Power size={12} />
                            </Button>
                        </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                        <button className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1.5 w-full justify-center p-2 rounded hover:bg-rose-50 transition-colors">
                            <Shield size={12} /> Revocar todos los accesos
                        </button>
                    </div>
                </div>
            </Card>
        </div>

        {/* Right Column: Logs & Activity */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Recent Errors - High Priority */}
            <Card className="border border-rose-200 shadow-sm overflow-hidden">
                <div className="bg-rose-50 px-5 py-3 border-b border-rose-100 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-rose-800 flex items-center gap-2">
                        <AlertTriangle size={16} /> Errores Recientes
                    </h3>
                    <span className="text-xs font-medium bg-white text-rose-600 px-2 py-0.5 rounded-full border border-rose-100">
                        2 Sin resolver
                    </span>
                </div>
                <div className="divide-y divide-rose-100">
                    <ErrorRow 
                        time="Hace 15 min" 
                        title="Webhook GHL fallido" 
                        code="500 Internal Server Error" 
                        detail="Timeout waiting for GHL API response."
                    />
                    <ErrorRow 
                        time="Hace 2 horas" 
                        title="Token MP expirado" 
                        code="401 Unauthorized" 
                        detail="The access token expired and refresh failed."
                    />
                </div>
            </Card>

            {/* Activity Log */}
            <Card className="border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <Activity size={16} /> Actividad del Cliente
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white border-b border-slate-100">
                            <tr>
                                <th className="px-5 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Evento</th>
                                <th className="px-5 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Fecha</th>
                                <th className="px-5 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Estado</th>
                                <th className="px-5 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider text-right">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            <ActivityRow 
                                event="Pago Recibido" 
                                id="pay_123456" 
                                date="Hoy, 10:30 AM" 
                                status="success" 
                            />
                            <ActivityRow 
                                event="Webhook GHL" 
                                id="wh_987654" 
                                date="Hoy, 10:30 AM" 
                                status="success" 
                            />
                            <ActivityRow 
                                event="Link Generado" 
                                id="link_xyz123" 
                                date="Ayer, 18:45 PM" 
                                status="success" 
                            />
                            <ActivityRow 
                                event="Pago Rechazado" 
                                id="pay_999888" 
                                date="Ayer, 14:20 PM" 
                                status="failed" 
                            />
                             <ActivityRow 
                                event="Sincronización" 
                                id="sync_manual" 
                                date="22 Oct, 09:00 AM" 
                                status="success" 
                            />
                        </tbody>
                    </table>
                </div>
                <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                    <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
                        Cargar más eventos
                    </button>
                </div>
            </Card>

        </div>
      </div>
    </div>
  );
};

//Sub Components

const StatusCard: React.FC<{
    title: string;
    status: 'connected' | 'error' | 'warning' | 'neutral';
    label: string;
    icon: React.ReactNode;
}> = ({ title, status, label, icon }) => {
    
    const styles = {
        connected: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', iconColor: 'text-emerald-600' },
        error: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', iconColor: 'text-rose-600' },
        warning: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', iconColor: 'text-amber-600' },
        neutral: { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', iconColor: 'text-slate-500' },
    };

    const s = styles[status];

    return (
        <Card className={`p-4 border ${s.border} shadow-sm flex items-start justify-between`}>
            <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{title}</p>
                <div className={`flex items-center gap-1.5 font-bold text-sm ${s.text}`}>
                    {label}
                </div>
            </div>
            <div className={`p-2 rounded-lg ${s.bg} ${s.iconColor}`}>
                {icon}
            </div>
        </Card>
    );
};

const ErrorRow: React.FC<{
    title: string;
    code: string;
    detail: string;
    time: string;
}> = ({ title, code, detail, time }) => {
    return (
        <div className="p-4 hover:bg-rose-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
                <div className="mt-0.5 p-1 bg-white border border-rose-200 rounded text-rose-500 shadow-sm">
                    <XCircle size={14} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-slate-900">{title}</h4>
                    <p className="text-xs text-rose-600 font-mono mt-0.5">{code}</p>
                    <p className="text-xs text-slate-500 mt-1">{detail}</p>
                </div>
            </div>
            <div className="flex items-center gap-3 sm:text-right">
                <span className="text-xs text-slate-400 font-medium whitespace-nowrap">{time}</span>
                <Button variant="outline" size="sm" className="h-7 text-xs bg-white border-rose-200 text-rose-700 hover:bg-rose-50">
                    <Play size={10} className="mr-1.5" /> Reintentar
                </Button>
            </div>
        </div>
    );
};

const ActivityRow: React.FC<{
    event: string;
    id: string;
    date: string;
    status: 'success' | 'failed' | 'pending';
}> = ({ event, id, date, status }) => {
    
    const statusIcons = {
        success: <CheckCircle2 size={14} className="text-emerald-500" />,
        failed: <XCircle size={14} className="text-rose-500" />,
        pending: <Clock size={14} className="text-amber-500" />
    };

    return (
        <tr className="hover:bg-slate-50 transition-colors group">
            <td className="px-5 py-3">
                <div>
                    <p className="font-medium text-slate-800 text-sm">{event}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{id}</p>
                </div>
            </td>
            <td className="px-5 py-3 text-xs text-slate-500">
                {date}
            </td>
            <td className="px-5 py-3">
                <div className="flex items-center gap-1.5">
                    {statusIcons[status]}
                    <span className={`text-xs font-medium capitalize ${status === 'success' ? 'text-emerald-700' : status === 'failed' ? 'text-rose-700' : 'text-amber-700'}`}>
                        {status}
                    </span>
                </div>
            </td>
            <td className="px-5 py-3 text-right">
                <button className="text-slate-400 hover:text-indigo-600 p-1.5 rounded hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100">
                    <ExternalLink size={14} />
                </button>
            </td>
        </tr>
    );
};