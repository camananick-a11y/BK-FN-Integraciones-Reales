import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download, 
  Terminal, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileJson,
  X,
  RefreshCw,
  Server
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface SuperAdminLogsProps {
  onBack: () => void;
}

// Mock Data Types
type LogStatus = 'success' | 'error' | 'warning';
type EventType = 'payment_approved' | 'webhook_received' | 'error' | 'reconnection' | 'sync_contact';

interface SystemLog {
  id: string;
  timestamp: string;
  client: string;
  event_type: EventType;
  message: string;
  payment_id?: string;
  status: LogStatus;
  details_json: string; // Simulated raw data
}

const MOCK_LOGS: SystemLog[] = [
  { 
    id: 'log_001', 
    timestamp: '2023-10-25 10:42:15', 
    client: 'Agency Alpha', 
    event_type: 'payment_approved', 
    message: 'Payment processed successfully via API.', 
    payment_id: 'pay_123456789', 
    status: 'success',
    details_json: '{"amount": 150.00, "currency": "USD", "method": "credit_card", "processor": "mercadopago"}'
  },
  { 
    id: 'log_002', 
    timestamp: '2023-10-25 10:41:03', 
    client: 'Marketing Pro', 
    event_type: 'error', 
    message: 'GHL API Timeout (504 Gateway Time-out)', 
    payment_id: 'pay_987654321', 
    status: 'error',
    details_json: '{"error_code": 504, "endpoint": "/v1/contacts", "retry_count": 3, "latency_ms": 5002}'
  },
  { 
    id: 'log_003', 
    timestamp: '2023-10-25 10:38:55', 
    client: 'Local Dental', 
    event_type: 'reconnection', 
    message: 'Mercado Pago token refreshed automatically.', 
    status: 'warning',
    details_json: '{"old_token_prefix": "APP_USR-123", "new_expiry": "2023-10-26T10:38:55Z"}'
  },
  { 
    id: 'log_004', 
    timestamp: '2023-10-25 10:35:20', 
    client: 'Ecom Boosters', 
    event_type: 'webhook_received', 
    message: 'Webhook received from GHL (Opportunity Won)', 
    status: 'success',
    details_json: '{"trigger_type": "opportunity_status_update", "status": "won", "pipeline_id": "pip_123"}'
  },
  { 
    id: 'log_005', 
    timestamp: '2023-10-25 10:30:11', 
    client: 'Agency Alpha', 
    event_type: 'sync_contact', 
    message: 'Contact updated: marked as paid.', 
    payment_id: 'pay_123456789', 
    status: 'success',
    details_json: '{"contact_id": "con_xyz789", "tags_added": ["pago_confirmado"]}'
  },
  { 
    id: 'log_006', 
    timestamp: '2023-10-25 10:15:00', 
    client: 'Unknown Source', 
    event_type: 'error', 
    message: 'Invalid signature in webhook payload.', 
    status: 'error',
    details_json: '{"ip_address": "203.0.113.45", "user_agent": "PostmanRuntime/7.28.0"}'
  },
];

export const SuperAdminLogs: React.FC<SuperAdminLogsProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState<SystemLog | null>(null);

  // Filter Logic
  const filteredLogs = useMemo(() => {
    return MOCK_LOGS.filter(log => {
      const matchesSearch = 
        log.client.toLowerCase().includes(searchTerm.toLowerCase()) || 
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.payment_id && log.payment_id.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = eventTypeFilter === 'all' || log.event_type === eventTypeFilter;
      const matchesStatus = statusFilter === 'all' || log.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchTerm, eventTypeFilter, statusFilter]);

  return (
    <div className="w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <button 
            onClick={onBack}
            className="mt-1 p-2 hover:bg-white rounded-full transition-colors text-slate-500 hover:text-slate-700 hover:shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <Terminal size={24} className="text-slate-700" />
              Logs del Sistema
            </h1>
            <p className="text-slate-500 text-sm mt-1">Registro centralizado de eventos, errores y webhooks.</p>
          </div>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="bg-white border-slate-200" onClick={() => window.location.reload()}>
                <RefreshCw size={16} className="mr-2" /> Actualizar
            </Button>
            <Button variant="outline" className="bg-white border-slate-200">
                <Download size={16} className="mr-2" /> Exportar (JSON)
            </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <Card className="mb-6 p-4 border border-slate-200 shadow-sm bg-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
            
            {/* Search */}
            <div className="lg:col-span-4 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <Search size={16} />
                </div>
                <input 
                    type="text" 
                    placeholder="Buscar por cliente, ID de pago o mensaje..." 
                    className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm font-mono"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Event Type Dropdown */}
            <div className="lg:col-span-3">
                 <select 
                    className="block w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm bg-white text-slate-700"
                    value={eventTypeFilter}
                    onChange={(e) => setEventTypeFilter(e.target.value)}
                 >
                    <option value="all">Evento: Todos</option>
                    <option value="payment_approved">Pago Aprobado</option>
                    <option value="webhook_received">Webhook Recibido</option>
                    <option value="error">Error del Sistema</option>
                    <option value="reconnection">Reconexión</option>
                 </select>
            </div>

            {/* Status Dropdown */}
            <div className="lg:col-span-2">
                 <select 
                    className="block w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm bg-white text-slate-700"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                 >
                    <option value="all">Estado: Todos</option>
                    <option value="success">OK (Success)</option>
                    <option value="error">Error (Critical)</option>
                    <option value="warning">Warning</option>
                 </select>
            </div>

            {/* Date Picker (Simulated) */}
            <div className="lg:col-span-3 relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Calendar size={14} />
                </div>
                <input 
                    type="date" 
                    className="block w-full pl-9 pr-2 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm text-slate-600"
                />
            </div>
        </div>
      </Card>

      {/* Logs Table */}
      <Card className="overflow-hidden shadow-sm border border-slate-200">
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
                <thead className="bg-slate-100 border-b border-slate-200">
                    <tr>
                        <th className="px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider font-mono">Timestamp</th>
                        <th className="px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider text-center">Status</th>
                        <th className="px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Cliente / Source</th>
                        <th className="px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Evento</th>
                        <th className="px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Mensaje</th>
                        <th className="px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider font-mono">Payment ID</th>
                        <th className="px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider text-right">Detalle</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredLogs.length > 0 ? (
                        filteredLogs.map((log) => (
                            <LogTableRow 
                                key={log.id} 
                                log={log} 
                                onSelect={() => setSelectedLog(log)}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                                <div className="flex flex-col items-center justify-center">
                                    <Search size={32} className="text-slate-300 mb-2" />
                                    <p>No se encontraron logs con esos criterios.</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <p className="text-xs text-slate-500 font-mono">
                Showing {filteredLogs.length} entries
            </p>
            <div className="flex items-center gap-2">
                <button className="p-1 rounded hover:bg-slate-200 disabled:opacity-50 transition-colors" disabled>
                    <ChevronLeft size={16} className="text-slate-600" />
                </button>
                <button className="p-1 rounded hover:bg-slate-200 disabled:opacity-50 transition-colors" disabled>
                    <ChevronRight size={16} className="text-slate-600" />
                </button>
            </div>
        </div>
      </Card>

      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <FileJson size={18} className="text-slate-500" /> Detalle del Log <span className="text-xs font-mono bg-slate-200 px-2 py-0.5 rounded text-slate-600">{selectedLog.id}</span>
                    </h3>
                    <button 
                        onClick={() => setSelectedLog(null)}
                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full p-1 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Evento</p>
                            <p className="text-sm font-medium text-slate-900 mt-1">{selectedLog.event_type}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Timestamp</p>
                            <p className="text-sm font-mono text-slate-900 mt-1">{selectedLog.timestamp}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Mensaje</p>
                            <p className="text-sm text-slate-800 mt-1 bg-slate-50 p-2 rounded border border-slate-100">{selectedLog.message}</p>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Payload Data (JSON)</p>
                            <button className="text-[10px] text-indigo-600 font-medium hover:underline flex items-center gap-1">
                                <RefreshCw size={10} /> Format
                            </button>
                        </div>
                        <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-xs overflow-auto max-h-60 shadow-inner">
                            <pre>{JSON.stringify(JSON.parse(selectedLog.details_json), null, 2)}</pre>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
                    <Button variant="secondary" onClick={() => setSelectedLog(null)}>
                        Cerrar
                    </Button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

/* --- Sub Components --- */

const LogTableRow: React.FC<{ log: SystemLog; onSelect: () => void }> = ({ log, onSelect }) => {
    
    const statusConfig = {
        success: { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
        error: { icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200' },
        warning: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    };

    const Status = statusConfig[log.status];
    const StatusIcon = Status.icon;

    return (
        <tr className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 font-mono text-xs">
            <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                {log.timestamp}
            </td>
            <td className="px-4 py-3 text-center">
                 <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${Status.bg} border ${Status.border}`}>
                    <StatusIcon size={14} className={Status.color} />
                 </div>
            </td>
            <td className="px-4 py-3 text-slate-700 font-sans font-medium">
                {log.client}
            </td>
            <td className="px-4 py-3">
                 <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200 whitespace-nowrap">
                    {log.event_type}
                 </span>
            </td>
            <td className="px-4 py-3 text-slate-600 font-sans truncate max-w-xs" title={log.message}>
                {log.message}
            </td>
            <td className="px-4 py-3 text-slate-500">
                {log.payment_id || '-'}
            </td>
            <td className="px-4 py-3 text-right">
                <button 
                    onClick={onSelect}
                    className="text-slate-400 hover:text-indigo-600 hover:bg-slate-200 p-1.5 rounded transition-colors"
                    title="Ver detalle"
                >
                    <Eye size={16} />
                </button>
            </td>
        </tr>
    );
};