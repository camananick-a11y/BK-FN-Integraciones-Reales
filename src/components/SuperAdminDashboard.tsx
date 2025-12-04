import React from 'react';
import { 
  Users, 
  DollarSign, 
  Activity, 
  AlertTriangle, 
  Search, 
  MoreHorizontal, 
  Server, 
  Database, 
  Globe, 
  ArrowUpRight,
  ShieldAlert,
  Clock,
  CheckCircle2,
  XCircle,
  LogOut,
  Terminal
} from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface SuperAdminDashboardProps {
  onLogout: () => void;
  onNavigateToClients: () => void;
  onNavigateToLogs?: () => void;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ onLogout, onNavigateToClients, onNavigateToLogs }) => {
  return (
    <div className="w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="bg-indigo-600 text-white px-2 py-1 rounded text-xs uppercase tracking-wider font-bold">Admin</span>
            Panel Administrativo
          </h1>
          <p className="text-slate-500 text-sm mt-1">Visión global del sistema RP PAY y estado de clientes.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-slate-900">System Admin</p>
                <p className="text-xs text-slate-500">root@rp-pay.com</p>
            </div>
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                SA
            </div>
            <Button variant="outline" size="sm" onClick={onLogout} className="ml-2 border-slate-200 text-slate-500 flex items-center gap-2">
                <LogOut size={16} />
                <span className="hidden sm:inline">Salir al Usuario</span>
            </Button>
        </div>
      </div>

      {/* Global Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard 
            title="Clientes Activos" 
            value="1,248" 
            trend="+12 this week"
            trendUp={true}
            icon={<Users className="text-indigo-600" size={24} />}
            color="indigo"
        />
        <MetricCard 
            title="Volumen Procesado (Hoy)" 
            value="$45.2k" 
            trend="+5.4% vs yesterday"
            trendUp={true}
            icon={<DollarSign className="text-emerald-600" size={24} />}
            color="emerald"
        />
        <MetricCard 
            title="Webhooks (24h)" 
            value="84.3k" 
            trend="99.9% Success Rate"
            trendUp={true}
            icon={<Activity className="text-blue-600" size={24} />}
            color="blue"
        />
        <MetricCard 
            title="Errores Críticos" 
            value="3" 
            trend="Needs attention"
            trendUp={false}
            icon={<ShieldAlert className="text-rose-600" size={24} />}
            color="rose"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Client Management (Takes 2/3) */}
        <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Clientes Recientes</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
                    <input 
                        type="text" 
                        placeholder="Buscar cliente..." 
                        className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none w-64"
                    />
                </div>
            </div>

            <Card className="overflow-hidden border border-slate-200 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Cliente / Admin</th>
                                <th className="px-6 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Location ID</th>
                                <th className="px-6 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Instalado</th>
                                <th className="px-6 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider text-right">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <ClientRow 
                                name="Agency Alpha" 
                                email="admin@alpha.com" 
                                locationId="loc_Xy78z9" 
                                status="active" 
                                date="Hace 2 horas" 
                            />
                            <ClientRow 
                                name="Marketing Pro" 
                                email="sarah@mpro.io" 
                                locationId="loc_Bk21mQ" 
                                status="active" 
                                date="Hace 5 horas" 
                            />
                            <ClientRow 
                                name="Local Dental" 
                                email="dr.smith@dental.com" 
                                locationId="loc_99An2s" 
                                status="disconnected" 
                                date="Ayer" 
                            />
                            <ClientRow 
                                name="Ecom Boosters" 
                                email="team@ecomb.com" 
                                locationId="loc_Hh77ss" 
                                status="active" 
                                date="22 Oct" 
                            />
                             <ClientRow 
                                name="Real Estate X" 
                                email="info@rex.com" 
                                locationId="loc_Mm33pp" 
                                status="warning" 
                                date="21 Oct" 
                            />
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 text-center">
                    <button 
                        onClick={onNavigateToClients}
                        className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                    >
                        Ver todos los clientes
                    </button>
                </div>
            </Card>
        </div>

        {/* Right Column: System Alerts & Health (Takes 1/3) */}
        <div className="space-y-6">
            
            {/* System Status Summary */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-slate-900">Estado del Sistema</h2>
                    {onNavigateToLogs && (
                        <button 
                            onClick={onNavigateToLogs}
                            className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded flex items-center gap-1 transition-colors"
                        >
                            <Terminal size={12} /> Ver Logs
                        </button>
                    )}
                </div>
                <Card className="p-5 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                <Server size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-900">API Gateway</p>
                                <p className="text-xs text-slate-500">Operational</p>
                            </div>
                        </div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                <Database size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-900">Database</p>
                                <p className="text-xs text-slate-500">Operational</p>
                            </div>
                        </div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                <Globe size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-900">Webhooks Engine</p>
                                <p className="text-xs text-slate-500">Processing</p>
                            </div>
                        </div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    </div>
                </Card>
            </div>

            {/* Alerts Feed */}
            <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center justify-between">
                    Alertas Recientes
                    <span className="bg-rose-100 text-rose-700 text-[10px] px-2 py-0.5 rounded-full font-bold">3 New</span>
                </h2>
                <Card className="border border-slate-200 shadow-sm divide-y divide-slate-100">
                    <AlertItem 
                        type="critical"
                        title="Webhook Delivery Failed"
                        desc="Location loc_99An2s responded 500."
                        time="12m ago"
                    />
                     <AlertItem 
                        type="warning"
                        title="High Latency Detected"
                        desc="Mercado Pago API response > 2s."
                        time="45m ago"
                    />
                     <AlertItem 
                        type="info"
                        title="New Version Deployed"
                        desc="v2.4.0 deployed successfully."
                        time="2h ago"
                    />
                    <div className="p-2 text-center">
                         <button onClick={onNavigateToLogs} className="text-xs font-medium text-slate-500 hover:text-slate-700">Ver log completo</button>
                    </div>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
};

/* --- Sub Components --- */

const MetricCard: React.FC<{
    title: string;
    value: string;
    trend: string;
    trendUp: boolean;
    icon: React.ReactNode;
    color: string;
}> = ({ title, value, trend, trendUp, icon, color }) => {
    return (
        <Card className="p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 rounded-xl bg-${color}-50`}>
                    {icon}
                </div>
                {/* Visual sparkline placeholder */}
                <div className="h-8 w-16 bg-slate-50 rounded flex items-end gap-0.5 pb-1 px-1 opacity-50">
                    <div className={`w-full bg-${color}-400 rounded-t-sm h-[40%]`}></div>
                    <div className={`w-full bg-${color}-400 rounded-t-sm h-[70%]`}></div>
                    <div className={`w-full bg-${color}-400 rounded-t-sm h-[50%]`}></div>
                    <div className={`w-full bg-${color}-400 rounded-t-sm h-[80%]`}></div>
                    <div className={`w-full bg-${color}-600 rounded-t-sm h-[60%]`}></div>
                </div>
            </div>
            <div>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide">{title}</p>
                <div className="flex items-end gap-2 mt-1">
                    <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
                </div>
                <p className={`text-xs mt-2 font-medium flex items-center ${trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                   {trendUp ? <ArrowUpRight size={12} className="mr-1"/> : <AlertTriangle size={12} className="mr-1"/>}
                   {trend}
                </p>
            </div>
        </Card>
    );
};

const ClientRow: React.FC<{
    name: string;
    email: string;
    locationId: string;
    status: 'active' | 'disconnected' | 'warning';
    date: string;
}> = ({ name, email, locationId, status, date }) => {
    const statusConfig = {
        active: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', text: 'Conectado' },
        disconnected: { icon: XCircle, color: 'text-rose-500', bg: 'bg-rose-50', text: 'Desconectado' },
        warning: { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50', text: 'Revisar' },
    };
    
    const Status = statusConfig[status];
    const StatusIcon = Status.icon;

    return (
        <tr className="hover:bg-slate-50/80 transition-colors">
            <td className="px-6 py-4">
                <div>
                    <p className="font-semibold text-slate-900 text-sm">{name}</p>
                    <p className="text-xs text-slate-500">{email}</p>
                </div>
            </td>
            <td className="px-6 py-4">
                <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600 font-mono border border-slate-200">
                    {locationId}
                </code>
            </td>
            <td className="px-6 py-4">
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full w-fit ${Status.bg} border border-${Status.color.replace('text-', '')}/20`}>
                    <StatusIcon size={12} className={Status.color} />
                    <span className={`text-xs font-medium ${Status.color.replace('text', 'text-slate')}`}>{Status.text}</span>
                </div>
            </td>
            <td className="px-6 py-4 text-xs text-slate-500">
                {date}
            </td>
            <td className="px-6 py-4 text-right">
                <button className="text-slate-400 hover:text-indigo-600 transition-colors p-1">
                    <MoreHorizontal size={16} />
                </button>
            </td>
        </tr>
    );
};

const AlertItem: React.FC<{
    type: 'critical' | 'warning' | 'info';
    title: string;
    desc: string;
    time: string;
}> = ({ type, title, desc, time }) => {
    const typeStyles = {
        critical: { icon: XCircle, bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-l-rose-500' },
        warning: { icon: AlertTriangle, bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-l-amber-500' },
        info: { icon: Activity, bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-l-slate-400' },
    };

    const Style = typeStyles[type];
    const Icon = Style.icon;

    return (
        <div className={`p-4 hover:bg-slate-50 transition-colors border-l-4 ${Style.border}`}>
            <div className="flex justify-between items-start mb-1">
                <h4 className={`text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 ${Style.text}`}>
                    <Icon size={12} /> {title}
                </h4>
                <span className="text-[10px] text-slate-400 font-medium bg-white px-1.5 py-0.5 rounded border border-slate-100 flex items-center gap-1">
                    <Clock size={8} /> {time}
                </span>
            </div>
            <p className="text-sm text-slate-600 leading-snug">{desc}</p>
        </div>
    );
};