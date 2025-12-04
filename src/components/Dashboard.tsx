import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  DollarSign, 
  Link as LinkIcon, 
  Settings, 
  History, 
  BookOpen, 
  CreditCard,
  QrCode,
  Building2,
  Shield,
  LogOut,
  ArrowUpRight,
  Loader2
} from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { UserGuideModal } from './UserGuideModal';
import adminService from '../api/adminService';

interface DashboardProps {
    userName?: string;
    onLogout?: () => void;
    onNavigateToGenerateLink?: () => void;
    onNavigateToHistory?: () => void;
    onNavigateToSettings?: () => void;
    onNavigateToSuperAdmin?: () => void;
    onNavigateToDetail?: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
    userName = 'Admin',
    onLogout,
    onNavigateToGenerateLink, 
    onNavigateToHistory, 
    onNavigateToSettings,
    onNavigateToSuperAdmin,
    onNavigateToDetail
}) => {
  const [showGuide, setShowGuide] = useState(false);
  
  // ESTADOS PARA DATOS REALES
  const [recentPayments, setRecentPayments] = useState<any[]>([]);
  const [stats, setStats] = useState({
      approved: 0,
      pending: 0,
      rejected: 0,
      total_amount: 0
  });
  const [loading, setLoading] = useState(true);

  // CARGAR DATOS AL MONTAR
  useEffect(() => {
    const loadDashboardData = async () => {
        try {
            setLoading(true);
            // Pedimos los pagos al servicio 
            const data = await adminService.getPayments();
            const payments = data.results || [];
            
            // Tomamos los últimos 5 para la tabla
            setRecentPayments(payments.slice(0, 5));

            // Calculamos métricas simples 
            const approved = payments.filter((p: any) => p.status === 'approved').length;
            const pending = payments.filter((p: any) => p.status === 'pending').length;
            const rejected = payments.filter((p: any) => p.status === 'rejected').length;
            const total = payments
                .filter((p: any) => p.status === 'approved')
                .reduce((acc: number, curr: any) => acc + parseFloat(curr.amount), 0);

            setStats({ approved, pending, rejected, total_amount: total });

        } catch (error) {
            console.error("Error cargando dashboard:", error);
        } finally {
            setLoading(false);
        }
    };
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-6 pb-12 relative">
      <UserGuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Panel de Pagos – RP PAY</h1>
          <p className="text-slate-500">Estado de tus cobros y conexiones</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-2 pr-4 rounded-full border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold border border-brand-200">
                {userName.charAt(0).toUpperCase()}
            </div>
            <div className="hidden md:block">
                <p className="text-sm font-bold text-slate-900 leading-tight">{userName}</p>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Plan Pro</p>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
            <button onClick={onLogout} className="text-slate-400 hover:text-rose-600 transition-colors p-1 rounded-full hover:bg-rose-50" title="Cerrar Sesión">
                <LogOut size={18} />
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section 1: Connections */}
        <div className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Conexiones</h2>
            <ConnectionCard name="GoHighLevel" status="connected" iconUrl="https://picsum.photos/48/48?grayscale" platform="ghl" />
            <ConnectionCard name="Mercado Pago" status="connected" iconUrl="" platform="mp" />
        </div>

        {/* Section 2: Metrics (AHORA CONECTADAS) */}
        <div className="lg:col-span-2 space-y-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Métricas (Generales)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard title="Aprobados" value={stats.approved.toString()} trend="Total" icon={<CheckCircle2 className="text-emerald-500" />} color="emerald" />
                <MetricCard title="Pendientes" value={stats.pending.toString()} icon={<AlertCircle className="text-amber-500" />} color="amber" />
                <MetricCard title="Rechazados" value={stats.rejected.toString()} icon={<XCircle className="text-rose-500" />} color="rose" />
                <MetricCard title="Total Cobrado" value={`$${stats.total_amount.toLocaleString()}`} icon={<DollarSign className="text-brand-500" />} color="brand" />
            </div>

            {/* Section 3: Quick Actions */}
            <div className="pt-2">
                 <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Acciones Rápidas</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <ActionCard icon={<LinkIcon />} label="Generar Link" primary onClick={onNavigateToGenerateLink} />
                    <ActionCard icon={<History />} label="Historial" onClick={onNavigateToHistory} />
                    <ActionCard icon={<Settings />} label="Configuración" onClick={onNavigateToSettings} />
                    <ActionCard icon={<BookOpen />} label="Guía de uso" onClick={() => setShowGuide(true)} />
                 </div>
            </div>
        </div>
      </div>

      {/* Section 4: Recent Payments Table  */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Últimos Pagos</h2>
            <Button variant="outline" size="sm" className="text-xs" onClick={onNavigateToHistory}>
                Ver todos
            </Button>
        </div>
        
        <Card className="overflow-hidden shadow-sm border border-slate-200">
            {loading ? (
                <div className="p-8 flex justify-center text-slate-400">
                    <Loader2 className="animate-spin mr-2" /> Cargando...
                </div>
            ) : recentPayments.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-600">Cliente</th>
                                <th className="px-6 py-4 font-semibold text-slate-600">Monto</th>
                                <th className="px-6 py-4 font-semibold text-slate-600">Estado</th>
                                <th className="px-6 py-4 font-semibold text-slate-600">Fecha</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {recentPayments.map((payment: any) => (
                                <TableRow 
                                    key={payment.id}
                                    client={payment.customer_name} 
                                    email={payment.customer_email}
                                    amount={`$${payment.amount}`} 
                                    status={payment.status} 
                                    date={new Date(payment.created_at).toLocaleDateString()} 
                                    method={payment.payment_method || 'card'} 
                                    onClick={() => onNavigateToDetail && onNavigateToDetail(payment.id)}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="p-8 text-center text-slate-500">
                    No hay pagos recientes para mostrar.
                </div>
            )}
        </Card>
      </div>
      
      {/* Dev/Demo Footer Link */}
      <div className="mt-8 text-center border-t border-slate-200 pt-6">
        <button onClick={onNavigateToSuperAdmin} className="text-xs text-slate-400 hover:text-brand-600 flex items-center justify-center gap-1 mx-auto transition-colors">
            <Shield size={10} /> Switch to Super Admin View (Demo Only)
        </button>
      </div>
    </div>
  );
};

//Sub Components

const TableRow: React.FC<{
    client: string;
    email: string;
    amount: string;
    status: 'approved' | 'pending' | 'rejected';
    date: string;
    method: 'card' | 'pix' | 'transfer';
    onClick?: () => void;
}> = ({ client, email, amount, status, date, method, onClick }) => {
    
    const statusStyles: any = {
        approved: "bg-emerald-50 text-emerald-700 border-emerald-100",
        pending: "bg-amber-50 text-amber-700 border-amber-100",
        rejected: "bg-rose-50 text-rose-700 border-rose-100"
    };
    const statusLabels: any = { approved: "Aprobado", pending: "Pendiente", rejected: "Rechazado" };
    const methodIcons: any = { card: <CreditCard size={14} />, pix: <QrCode size={14} />, transfer: <Building2 size={14} /> };
    const methodLabels: any = { card: "Tarjeta", pix: "Pix", transfer: "Transf." };

    return (
        <tr className="hover:bg-slate-50 transition-colors group">
            <td className="px-6 py-4"><div><p className="font-medium text-slate-900">{client}</p><p className="text-xs text-slate-500">{email}</p></div></td>
            <td className="px-6 py-4 font-bold text-slate-900">{amount}</td>
            <td className="px-6 py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[status] || statusStyles.pending}`}>{statusLabels[status] || status}</span></td>
            <td className="px-6 py-4 text-slate-500">{date}</td>
            <td className="px-6 py-4 text-right"><Button variant="outline" size="sm" onClick={onClick} className="transition-opacity">Ver detalles</Button></td>
        </tr>
    );
};

const ConnectionCard: React.FC<{ name: string; status: 'connected' | 'disconnected'; iconUrl: string; platform: 'ghl' | 'mp'; }> = ({ name, status, iconUrl, platform }) => (
    <Card className="p-4 flex items-center justify-between shadow-sm border border-slate-200">
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${platform === 'mp' ? 'bg-[#009EE3]/10' : 'bg-slate-100'}`}>{platform === 'mp' ? <CreditCard className="text-[#009EE3]" size={20} /> : <img src={iconUrl} alt={name} className="w-6 h-6 opacity-75" />}</div>
            <div><h3 className="font-semibold text-slate-900 text-sm">{name}</h3><div className="flex items-center gap-1.5 mt-0.5"><span className={`w-2 h-2 rounded-full ${status === 'connected' ? 'bg-emerald-500' : 'bg-rose-500'}`} /><span className={`text-xs ${status === 'connected' ? 'text-emerald-700' : 'text-rose-700'}`}>{status === 'connected' ? 'Conectado' : 'No conectado'}</span></div></div>
        </div>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0 flex items-center justify-center rounded-lg border-slate-200 text-slate-400"><Settings size={14} /></Button>
    </Card>
);

const MetricCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string; trend?: string; }> = ({ title, value, icon, color, trend }) => (
    <Card className="p-5 shadow-sm border border-slate-200 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-2"><div className={`p-2 rounded-lg bg-${color}-50`}>{icon}</div>{trend && <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center"><ArrowUpRight size={12} className="mr-0.5" /> {trend}</span>}</div>
        <div><p className="text-slate-500 text-sm font-medium">{title}</p><h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3></div>
    </Card>
);

interface ActionCardProps { icon: React.ReactNode; label: string; primary?: boolean; onClick?: () => void; }
const ActionCard: React.FC<ActionCardProps> = ({ icon, label, primary, onClick }) => (
    <button onClick={onClick} className={`flex flex-col items-center justify-center p-6 rounded-xl border transition-all duration-200 group ${primary ? 'bg-brand-600 border-brand-600 text-white shadow-md shadow-brand-500/20 hover:bg-brand-700 hover:-translate-y-1' : 'bg-white border-slate-200 text-slate-600 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 hover:-translate-y-1 shadow-sm'}`}>
        <div className={`mb-3 ${primary ? 'text-white' : 'text-brand-600 group-hover:scale-110 transition-transform'}`}>{React.cloneElement(icon as React.ReactElement<any>, { size: 28 })}</div>
        <span className="font-semibold text-sm">{label}</span>
    </button>
);