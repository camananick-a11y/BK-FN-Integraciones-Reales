import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal,
  CreditCard,
  Building2,
  QrCode,
  Wallet,
  Eye,
  X
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface PaymentHistoryScreenProps {
  onBack: () => void;
  onNavigateToDetail: () => void;
}

// Mock Data Types
interface Payment {
  id: string;
  client: string;
  email: string;
  amount: string;
  status: 'approved' | 'pending' | 'rejected';
  date: string;
  method: 'card' | 'pix' | 'transfer' | 'wallet';
}

// Mock Data
const MOCK_PAYMENTS: Payment[] = [
  { id: '1', client: 'Maria Gonzalez', email: 'maria.g@gmail.com', amount: '$1,200.00', status: 'approved', date: '2023-10-24', method: 'card' },
  { id: '2', client: 'Carlos Rodriguez', email: 'crod@empresa.com', amount: '$850.50', status: 'pending', date: '2023-10-24', method: 'pix' },
  { id: '3', client: 'Ana Silva', email: 'ana.silva@hotmail.com', amount: '$2,500.00', status: 'approved', date: '2023-10-23', method: 'transfer' },
  { id: '4', client: 'Jorge Perez', email: 'jorgito@tech.co', amount: '$150.00', status: 'rejected', date: '2023-10-23', method: 'card' },
  { id: '5', client: 'Lucia Mendez', email: 'lucia.m@studio.com', amount: '$3,400.00', status: 'approved', date: '2023-10-22', method: 'card' },
  { id: '6', client: 'Roberto Gomez', email: 'rob.gomez@mail.com', amount: '$420.00', status: 'approved', date: '2023-10-21', method: 'wallet' },
  { id: '7', client: 'Elena Torres', email: 'elena.t@design.net', amount: '$1,100.00', status: 'pending', date: '2023-10-20', method: 'transfer' },
  { id: '8', client: 'Miguel Angel', email: 'mangel@constructora.com', amount: '$5,000.00', status: 'approved', date: '2023-10-19', method: 'pix' },
];

export const PaymentHistoryScreen: React.FC<PaymentHistoryScreenProps> = ({ onBack, onNavigateToDetail }) => {
  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter Logic
  const filteredPayments = useMemo(() => {
    return MOCK_PAYMENTS.filter(payment => {
      const matchesSearch = payment.client.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            payment.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
      const matchesMethod = methodFilter === 'all' || payment.method === methodFilter;
      // Date logic omitted for simplicity in prototype, but structure matches requirements
      
      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [searchTerm, statusFilter, methodFilter]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const currentData = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = () => {
    alert("Iniciando descarga de CSV...");
  };

  return (
    <div className="w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
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
            <h1 className="text-2xl font-bold text-slate-900">Historial de Pagos</h1>
            <p className="text-slate-500 text-sm">Revisa y filtra todos los pagos generados con RP PAY.</p>
          </div>
        </div>
        <Button variant="outline" onClick={handleExport} className="bg-white border-slate-200">
          <Download size={16} className="mr-2 text-slate-500" />
          Exportar CSV
        </Button>
      </div>

      {/* Filters Section */}
      <Card className="mb-6 p-5 border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
            
            {/* Search */}
            <div className="lg:col-span-4 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                    <Search size={16} />
                </div>
                <input 
                    type="text" 
                    placeholder="Buscar por nombre, email o teléfono..." 
                    className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Date Range */}
            <div className="lg:col-span-3 flex gap-2">
                <div className="relative w-full group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Calendar size={14} />
                    </div>
                    <input 
                        type="date" 
                        className="block w-full pl-9 pr-2 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none text-sm text-slate-600"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                    />
                </div>
                <div className="relative w-full group">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Calendar size={14} />
                    </div>
                    <input 
                        type="date" 
                        className="block w-full pl-9 pr-2 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none text-sm text-slate-600"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                    />
                </div>
            </div>

            {/* Status Dropdown */}
            <div className="lg:col-span-2">
                 <select 
                    className="block w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none text-sm bg-white text-slate-600"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                 >
                    <option value="all">Estado: Todos</option>
                    <option value="approved">Aprobado</option>
                    <option value="pending">Pendiente</option>
                    <option value="rejected">Rechazado</option>
                 </select>
            </div>

             {/* Method Dropdown */}
             <div className="lg:col-span-2">
                 <select 
                    className="block w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none text-sm bg-white text-slate-600"
                    value={methodFilter}
                    onChange={(e) => setMethodFilter(e.target.value)}
                 >
                    <option value="all">Método: Todos</option>
                    <option value="card">Tarjeta</option>
                    <option value="pix">Pix</option>
                    <option value="transfer">Transferencia</option>
                    <option value="wallet">Billetera</option>
                 </select>
            </div>

            {/* Filter Button */}
            <div className="lg:col-span-1">
                <Button fullWidth variant="primary" className="h-full py-2">
                    <Filter size={16} />
                </Button>
            </div>
        </div>
      </Card>

      {/* Table Section */}
      <Card className="overflow-hidden shadow-sm border border-slate-200">
        {filteredPayments.length > 0 ? (
            <>
                <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-600">Cliente</th>
                            <th className="px-6 py-4 font-semibold text-slate-600">Monto</th>
                            <th className="px-6 py-4 font-semibold text-slate-600">Estado</th>
                            <th className="px-6 py-4 font-semibold text-slate-600">Fecha</th>
                            <th className="px-6 py-4 font-semibold text-slate-600">Método</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-right">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {currentData.map((payment) => (
                            <PaymentRow 
                                key={payment.id} 
                                payment={payment} 
                                onNavigateToDetail={onNavigateToDetail}
                            />
                        ))}
                    </tbody>
                </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-white">
                    <p className="text-sm text-slate-500">
                        Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredPayments.length)}</span> de <span className="font-medium">{filteredPayments.length}</span> resultados
                    </p>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-1 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={20} className="text-slate-600" />
                        </button>
                        <span className="text-sm font-medium text-slate-700 px-2">
                            Página {currentPage} de {totalPages}
                        </span>
                        <button 
                             onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                             disabled={currentPage === totalPages}
                             className="p-1 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight size={20} className="text-slate-600" />
                        </button>
                    </div>
                </div>
            </>
        ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="bg-slate-50 p-4 rounded-full mb-4">
                    <Search size={32} className="text-slate-300" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-1">No se encontraron pagos</h3>
                <p className="text-slate-500 max-w-sm mb-6">
                    No hay resultados con los filtros seleccionados. Intenta cambiar los criterios de búsqueda.
                </p>
                <Button 
                    variant="outline" 
                    onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('all');
                        setMethodFilter('all');
                    }}
                >
                    <X size={16} className="mr-2" />
                    Limpiar filtros
                </Button>
            </div>
        )}
      </Card>
    </div>
  );
};

/* --- Sub Components --- */

const PaymentRow: React.FC<{ payment: Payment, onNavigateToDetail: () => void }> = ({ payment, onNavigateToDetail }) => {
    const statusConfig = {
        approved: { label: 'Aprobado', style: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
        pending: { label: 'Pendiente', style: 'bg-amber-50 text-amber-700 border-amber-100' },
        rejected: { label: 'Rechazado', style: 'bg-rose-50 text-rose-700 border-rose-100' }
    };

    const methodConfig = {
        card: { icon: CreditCard, label: 'Tarjeta' },
        pix: { icon: QrCode, label: 'Pix' },
        transfer: { icon: Building2, label: 'Transferencia' },
        wallet: { icon: Wallet, label: 'Billetera' }
    };

    const StatusBadge = statusConfig[payment.status];
    const MethodData = methodConfig[payment.method];
    const MethodIcon = MethodData.icon;

    return (
        <tr className="hover:bg-slate-50 transition-colors group">
            <td className="px-6 py-4">
                <div>
                    <p className="font-medium text-slate-900">{payment.client}</p>
                    <p className="text-xs text-slate-500">{payment.email}</p>
                </div>
            </td>
            <td className="px-6 py-4 font-bold text-slate-900 font-mono text-sm tracking-tight">{payment.amount}</td>
            <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${StatusBadge.style}`}>
                    {StatusBadge.label}
                </span>
            </td>
            <td className="px-6 py-4 text-slate-500 text-sm">
                {payment.date}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-slate-600 text-xs">
                    <MethodIcon size={14} className="text-slate-400" />
                    {MethodData.label}
                </div>
            </td>
            <td className="px-6 py-4 text-right">
                 <button 
                    onClick={onNavigateToDetail}
                    className="text-brand-600 hover:text-brand-700 text-sm font-medium flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
                >
                    Ver detalles <ArrowLeft className="rotate-180" size={14} />
                 </button>
            </td>
        </tr>
    );
};