import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Calendar,
  CreditCard,
  Building2,
  RefreshCw,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface SuperAdminClientListProps {
  onBack: () => void;
  onNavigateToDetail: () => void;
}

// Mock Data Types
interface Client {
  id: string;
  company: string;
  contact_email: string;
  location_id: string;
  ghl_status: 'connected' | 'disconnected' | 'error';
  mp_status: 'connected' | 'disconnected' | 'error';
  install_date: string;
  last_payment: string;
  last_payment_amount: string;
}

const MOCK_CLIENTS: Client[] = [
  { id: '1', company: 'Agency Alpha', contact_email: 'admin@alpha.com', location_id: 'loc_Xy78z9', ghl_status: 'connected', mp_status: 'connected', install_date: '2023-08-15', last_payment: 'Hace 2 horas', last_payment_amount: '$150.00' },
  { id: '2', company: 'Marketing Pro', contact_email: 'sarah@mpro.io', location_id: 'loc_Bk21mQ', ghl_status: 'connected', mp_status: 'error', install_date: '2023-09-01', last_payment: 'Hace 1 día', last_payment_amount: '$89.00' },
  { id: '3', company: 'Local Dental', contact_email: 'dr.smith@dental.com', location_id: 'loc_99An2s', ghl_status: 'disconnected', mp_status: 'disconnected', install_date: '2023-07-20', last_payment: 'Hace 20 días', last_payment_amount: '$1,200.00' },
  { id: '4', company: 'Ecom Boosters', contact_email: 'team@ecomb.com', location_id: 'loc_Hh77ss', ghl_status: 'connected', mp_status: 'connected', install_date: '2023-10-10', last_payment: 'Ayer', last_payment_amount: '$45.00' },
  { id: '5', company: 'Real Estate X', contact_email: 'info@rex.com', location_id: 'loc_Mm33pp', ghl_status: 'error', mp_status: 'connected', install_date: '2023-09-15', last_payment: 'Hace 3 días', last_payment_amount: '$500.00' },
  { id: '6', company: 'Fitness Hub', contact_email: 'gym@fit.com', location_id: 'loc_Qwe123', ghl_status: 'connected', mp_status: 'connected', install_date: '2023-06-01', last_payment: 'Hoy', last_payment_amount: '$30.00' },
  { id: '7', company: 'Legal Advisors', contact_email: 'law@advisors.com', location_id: 'loc_Asd456', ghl_status: 'connected', mp_status: 'connected', install_date: '2023-05-20', last_payment: 'Hace 5 horas', last_payment_amount: '$250.00' },
];

export const SuperAdminClientList: React.FC<SuperAdminClientListProps> = ({ onBack, onNavigateToDetail }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter Logic
  const filteredClients = useMemo(() => {
    return MOCK_CLIENTS.filter(client => {
      const matchesSearch =
        client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.contact_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.location_id.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesStatus = true;
      if (statusFilter === 'active') {
        matchesStatus = client.ghl_status === 'connected' && client.mp_status === 'connected';
      } else if (statusFilter === 'error') {
        matchesStatus = client.ghl_status === 'error' || client.mp_status === 'error';
      } else if (statusFilter === 'disconnected') {
        matchesStatus = client.ghl_status === 'disconnected' || client.mp_status === 'disconnected';
      }

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const handleExport = () => {
    alert("Exportando lista de clientes a CSV...");
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
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              Clientes Conectados
            </h1>
            <p className="text-slate-500 text-sm mt-1">Gestiona todas las subcuentas de GHL integradas en RP PAY.</p>
          </div>
        </div>
        <Button variant="outline" onClick={handleExport} className="bg-white border-slate-200">
          <Download size={16} className="mr-2 text-slate-500" />
          Exportar Lista
        </Button>
      </div>

      {/* Filters Card */}
      <Card className="mb-6 p-5 border border-slate-200 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-end lg:items-center">

          <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto flex-1">
            {/* Search */}
            <div className="relative group min-w-[300px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Buscar por nombre, email o location ID..."
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status Dropdown */}
            <select
              className="block px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm bg-white text-slate-600 min-w-[180px]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos (Todo OK)</option>
              <option value="disconnected">Desconectados</option>
              <option value="error">Con Errores</option>
            </select>

            {/* Date Placeholder */}
            <div className="relative group min-w-[180px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Calendar size={14} />
              </div>
              <input
                type="date"
                className="block w-full pl-9 pr-2 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm text-slate-600"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <Button
              variant="outline"
              className={`bg-white text-xs ${statusFilter === 'error' ? 'border-rose-300 bg-rose-50 text-rose-700' : 'border-slate-200 hover:bg-slate-50'}`}
              onClick={() => setStatusFilter(statusFilter === 'error' ? 'all' : 'error')}
            >
              <AlertTriangle size={14} className={`mr-2 ${statusFilter === 'error' ? 'text-rose-600' : 'text-slate-400'}`} />
              Ver solo errores
            </Button>
          </div>
        </div>
      </Card>

      {/* Table Section */}
      <Card className="overflow-hidden shadow-sm border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-600 text-xs uppercase tracking-wider">Empresa / Contacto</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-xs uppercase tracking-wider">Location ID</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-xs uppercase tracking-wider text-center">Estado GHL</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-xs uppercase tracking-wider text-center">Estado MP</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-xs uppercase tracking-wider">Último Pago</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-xs uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <ClientListRow
                    key={client.id}
                    client={client}
                    onNavigateToDetail={onNavigateToDetail}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Search size={32} className="text-slate-300 mb-2" />
                      <p>No se encontraron clientes con esos filtros.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-white">
          <p className="text-sm text-slate-500">
            Mostrando <span className="font-medium">{filteredClients.length}</span> resultados
          </p>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded hover:bg-slate-100 disabled:opacity-50 transition-colors" disabled>
              <ChevronLeft size={20} className="text-slate-600" />
            </button>
            <span className="text-sm font-medium text-slate-700 px-2">1</span>
            <button className="p-1 rounded hover:bg-slate-100 disabled:opacity-50 transition-colors" disabled>
              <ChevronRight size={20} className="text-slate-600" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

/* --- Sub Components --- */

const ClientListRow: React.FC<{ client: Client, onNavigateToDetail: () => void }> = ({ client, onNavigateToDetail }) => {

  // Helper to get status visual properties
  const getStatusProps = (status: string) => {
    switch (status) {
      case 'connected': return { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' };
      case 'disconnected': return { icon: XCircle, color: 'text-slate-400', bg: 'bg-slate-100' };
      case 'error': return { icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-50' };
      default: return { icon: XCircle, color: 'text-slate-400', bg: 'bg-slate-100' };
    }
  };

  const GHLStatus = getStatusProps(client.ghl_status);
  const GHLIcon = GHLStatus.icon;

  const MPStatus = getStatusProps(client.mp_status);
  const MPIcon = MPStatus.icon;

  return (
    <tr className="hover:bg-slate-50/80 transition-colors group">
      <td className="px-6 py-4">
        <div>
          <p className="font-semibold text-slate-900 text-sm">{client.company}</p>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
            {client.contact_email}
          </p>
        </div>
      </td>
      <td className="px-6 py-4">
        <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600 font-mono border border-slate-200 select-all">
          {client.location_id}
        </code>
      </td>
      <td className="px-6 py-4 text-center">
        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${GHLStatus.bg} border border-${GHLStatus.color.split('-')[1]}-200/50`}>
          <img src="https://picsum.photos/48/48?grayscale" alt="GHL" className={`w-4 h-4 object-contain ${client.ghl_status === 'connected' ? '' : 'opacity-50 grayscale'}`} />
        </div>
        {client.ghl_status === 'error' && <div className="text-[10px] text-rose-500 font-bold mt-1">Error</div>}
      </td>
      <td className="px-6 py-4 text-center">
        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${MPStatus.bg} border border-${MPStatus.color.split('-')[1]}-200/50`}>
          <CreditCard size={14} className={MPStatus.color} />
        </div>
        {client.mp_status === 'error' && <div className="text-[10px] text-rose-500 font-bold mt-1">Error</div>}
      </td>
      <td className="px-6 py-4">
        <p className="text-sm font-medium text-slate-900">{client.last_payment_amount}</p>
        <p className="text-xs text-slate-500">{client.last_payment}</p>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs bg-white border-slate-200"
            onClick={onNavigateToDetail}
          >
            Ver detalles
          </Button>
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-indigo-600 transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};