import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Download, 
  ChevronLeft, 
  Loader2,
  X,
  CreditCard,
  QrCode,
  Building2
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import adminService from '../api/adminService';

interface PaymentHistoryScreenProps {
  onBack: () => void;
  onNavigateToDetail: (id: string) => void;
}

export const PaymentHistoryScreen: React.FC<PaymentHistoryScreenProps> = ({ onBack, onNavigateToDetail }) => {
  // Estados de datos
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados de filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Cargar datos reales al montar
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const data = await adminService.getPayments();
        setPayments(data.results || []);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  // Filtros locales
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
        (payment.customer_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
        (payment.customer_email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // LÓGICA DE EXPORTACIÓN CSV
  const handleExport = () => {
    // Definir encabezados
    const headers = ["ID", "Cliente", "Email", "Monto", "Moneda", "Estado", "Fecha", "Método"];
    
    // Convertir datos a formato CSV
    const rows = filteredPayments.map(payment => [
      payment.id,
      payment.customer_name,
      payment.customer_email,
      payment.amount,
      payment.currency,
      payment.status,
      payment.created_at,
      payment.payment_method
    ]);

    // Unir todo con comas y saltos de línea
    const csvContent = [
      headers.join(","), 
      ...rows.map(row => row.join(","))
    ].join("\n");

    // Crear un Blob y un URL para descargar
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Crear link invisible y pulsarlo
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `historial_pagos_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    
    // Limpieza
    document.body.removeChild(link);
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
                    placeholder="Buscar por nombre o email..." 
                    className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Status Filter */}
            <div className="lg:col-span-3">
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
        </div>
      </Card>

      {/* Table Section */}
      <Card className="overflow-hidden shadow-sm border border-slate-200">
        {loading ? (
            <div className="p-12 flex justify-center items-center text-slate-400">
                <Loader2 className="animate-spin mr-2" /> Cargando pagos...
            </div>
        ) : filteredPayments.length > 0 ? (
            <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4 font-semibold text-slate-600">Cliente</th>
                        <th className="px-6 py-4 font-semibold text-slate-600">Monto</th>
                        <th className="px-6 py-4 font-semibold text-slate-600">Estado</th>
                        <th className="px-6 py-4 font-semibold text-slate-600">Fecha</th>
                        <th className="px-6 py-4 font-semibold text-slate-600 text-right">Acción</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredPayments.map((payment) => (
                        <PaymentRow 
                            key={payment.id} 
                            payment={payment} 
                            onNavigateToDetail={() => onNavigateToDetail(payment.id)}
                        />
                    ))}
                </tbody>
            </table>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="bg-slate-50 p-4 rounded-full mb-4">
                    <Search size={32} className="text-slate-300" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-1">No se encontraron pagos</h3>
                <p className="text-slate-500 max-w-sm mb-6">
                    No hay resultados con los filtros seleccionados.
                </p>
                <Button variant="outline" onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}>
                    <X size={16} className="mr-2" /> Limpiar filtros
                </Button>
            </div>
        )}
      </Card>
    </div>
  );
};

const PaymentRow: React.FC<{ payment: any, onNavigateToDetail: () => void }> = ({ payment, onNavigateToDetail }) => {
    const statusConfig: any = {
        approved: { label: 'Aprobado', style: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
        pending: { label: 'Pendiente', style: 'bg-amber-50 text-amber-700 border-amber-100' },
        rejected: { label: 'Rechazado', style: 'bg-rose-50 text-rose-700 border-rose-100' }
    };

    const StatusBadge = statusConfig[payment.status] || statusConfig.pending;
    const dateStr = new Date(payment.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });

    return (
        <tr className="hover:bg-slate-50 transition-colors group">
            <td className="px-6 py-4">
                <div>
                    <p className="font-medium text-slate-900">{payment.customer_name}</p>
                    <p className="text-xs text-slate-500">{payment.customer_email}</p>
                </div>
            </td>
            <td className="px-6 py-4 font-bold text-slate-900 font-mono text-sm tracking-tight">
                ${payment.amount} <span className="text-xs text-slate-400 font-normal">{payment.currency}</span>
            </td>
            <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${StatusBadge.style}`}>
                    {StatusBadge.label}
                </span>
            </td>
            <td className="px-6 py-4 text-slate-500 text-sm">
                {dateStr}
            </td>
            <td className="px-6 py-4 text-right">
                 <button 
                    onClick={onNavigateToDetail}
                    className="text-brand-600 hover:text-brand-700 text-sm font-medium flex items-center justify-end gap-1 ml-auto"
                >
                    Ver detalles <ChevronLeft className="rotate-180" size={14} />
                </button>
            </td>
        </tr>
    );
};