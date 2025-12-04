import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, User, ExternalLink, Copy, CreditCard, Calendar, Clock,
  CheckCircle2, AlertCircle, XCircle, FileText, Download, Send,
  MessageSquare, Loader2, Share2
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import adminService from '../api/adminService';

interface PaymentDetailScreenProps {
  paymentId: string | null;
  onBack: () => void;
}

export const PaymentDetailScreen: React.FC<PaymentDetailScreenProps> = ({ paymentId, onBack }) => {
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // 1. Cargar datos
  useEffect(() => {
    if (!paymentId) return;
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await adminService.getPaymentDetails(paymentId);
        setDetail(data);
      } catch (error) {
        console.error("Error cargando detalle", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [paymentId]);

  // 2. Lógica de Botones
  const handleCopyLink = () => {
    if (detail?.payment_link) {
      navigator.clipboard.writeText(detail.payment_link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleResendEmail = async () => {
    setIsSending(true);
    try {
      await adminService.resendLink(paymentId || '');
      alert(`✅ Link reenviado correctamente a ${detail.customer_email}`);
    } catch (error) {
      alert("Error al reenviar el correo.");
    } finally {
      setIsSending(false);
    }
  };

  const handleShareWhatsApp = () => {
    const message = `Hola ${detail.customer_name || 'cliente'}, aquí tienes tu link de pago: ${detail.payment_link}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleDownloadReceipt = () => {
    if (!detail) return;
    const receiptContent = `
========================================
          COMPROBANTE DE PAGO
               RP PAY
========================================
ID Transacción: ${detail.id}
Fecha:          ${new Date(detail.created_at).toLocaleString()}
Estado:         ${detail.status?.toUpperCase()}
----------------------------------------
Cliente:        ${detail.customer_name}
Email:          ${detail.customer_email}
----------------------------------------
Concepto:       ${detail.description}
Monto Total:    $${detail.amount} ${detail.currency}
Método:         ${detail.mp_transaction?.card_brand || detail.payment_method || 'Link'}
========================================
    `;
    const blob = new Blob([receiptContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `comprobante_${detail.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="flex h-96 items-center justify-center text-slate-400"><Loader2 className="animate-spin mb-4" size={32} /> Cargando información...</div>;
  if (!detail) return <div className="p-12 text-center">No se encontró el pago. <Button onClick={onBack}>Volver</Button></div>;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': return <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-sm"><CheckCircle2 size={16} /> Aprobado</div>;
      case 'pending': return <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 font-bold text-sm"><AlertCircle size={16} /> Pendiente</div>;
      default: return <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200 font-bold text-sm"><XCircle size={16} /> Rechazado</div>;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-white rounded-full transition-colors text-slate-500 hover:text-slate-700 hover:shadow-sm">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Detalle del Pago</h1>
            <p className="text-slate-500 text-sm">ID: <span className="font-mono text-slate-600 select-all">{detail.id}</span></p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white border-slate-200 text-slate-600" onClick={handleDownloadReceipt}>
            <Download size={16} className="mr-2" /> Comprobante
          </Button>
        </div>
      </div>

      {/* Tarjetas Resumen (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-5 border border-slate-200 shadow-sm bg-white flex flex-col justify-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Estado</p>
          {getStatusBadge(detail.status)}
        </Card>
        <Card className="p-5 border border-slate-200 shadow-sm bg-white flex flex-col justify-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Monto Total</p>
          <div className="text-3xl font-bold text-slate-900 flex items-baseline gap-1">
            <span className="text-lg text-slate-400 font-medium">$</span>
            {detail.amount}
            <span className="text-sm text-slate-400 font-medium">{detail.currency}</span>
          </div>
        </Card>
        <Card className="p-5 border border-slate-200 shadow-sm bg-white flex flex-col justify-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Método</p>
          <div className="flex items-center gap-2 font-medium text-slate-700 capitalize">
            <CreditCard size={20} className="text-brand-600" />
            {detail.mp_transaction?.card_brand || detail.payment_method || 'Link'}
          </div>
        </Card>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* COLUMNA IZQUIERDA (Info + Timeline) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Info Cliente */}
          <Card className="overflow-hidden border border-slate-200 shadow-sm">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <User size={18} className="text-slate-400" /> Información del Cliente
              </h3>
              <Button variant="outline" size="sm" className="h-8 text-xs bg-white">
                Ver en GHL <ExternalLink size={12} className="ml-1" />
              </Button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><p className="text-xs text-slate-500 mb-1">Nombre</p><p className="font-medium">{detail.customer_name}</p></div>
              <div><p className="text-xs text-slate-500 mb-1">Email</p><p className="font-medium">{detail.customer_email}</p></div>
              {detail.description && (
                <div className="md:col-span-2"><p className="text-xs text-slate-500 mb-1">Descripción</p><p className="font-medium">{detail.description}</p></div>
              )}
            </div>
          </Card>

          {/* Timeline de Eventos (ESTO ES LO QUE FALTABA) */}
          <Card className="overflow-hidden border border-slate-200 shadow-sm">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Clock size={18} className="text-slate-400" /> Historial de Eventos
              </h3>
            </div>
            <div className="p-6">
              {detail.events?.map((event: any, index: number) => (
                <div key={index} className="flex gap-4 mb-4 last:mb-0">
                  <div className="mt-1 w-2 h-2 rounded-full bg-brand-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800 capitalize">{event.event_type?.replace(/_/g, ' ')}</p>
                    <p className="text-xs text-slate-500">{new Date(event.created_at).toLocaleString()}</p>
                  </div>
                </div>
              ))}
              {(!detail.events || detail.events.length === 0) && (
                <p className="text-sm text-slate-400 italic">No hay eventos registrados aún.</p>
              )}
            </div>
          </Card>
        </div>

        {/* COLUMNA DERECHA (Acciones y Link) */}
        <div className="lg:col-span-1 space-y-6">

          {/* Link de Pago */}
          <Card className="border border-slate-200 shadow-sm p-5 space-y-4 bg-white">
            <h3 className="text-sm font-bold text-slate-900">Link de Pago</h3>
            <div className="flex gap-2">
              <input
                readOnly
                value={detail.payment_link}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded px-2 py-2 text-slate-600 truncate"
              />
              <button onClick={handleCopyLink} className="bg-white border p-2 rounded hover:bg-slate-50 text-slate-500 transition-colors">
                {copied ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
              </button>
            </div>
          </Card>

          {/* Acciones de Comunicación (ESTO ES LO QUE FALTABA) */}
          <Card className="border border-slate-200 shadow-sm p-5 space-y-3 bg-white">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Comunicación</h3>

            <Button
              fullWidth
              variant="secondary"
              className="justify-start h-10 text-sm"
              onClick={handleResendEmail}
              disabled={isSending}
            >
              {isSending ? <Loader2 className="animate-spin mr-2" size={16} /> : <Send size={16} className="mr-2" />}
              {isSending ? 'Enviando...' : 'Reenviar Email'}
            </Button>

            <Button
              fullWidth
              variant="outline"
              className="justify-start h-10 text-sm bg-white border-slate-200 text-emerald-600 hover:bg-emerald-50"
              onClick={handleShareWhatsApp}
            >
              <Share2 size={16} className="mr-2" /> Enviar por WhatsApp
            </Button>
          </Card>

          {/* Ayuda */}
          <div className="bg-brand-50 rounded-xl p-4 border border-brand-100">
            <h4 className="text-brand-800 text-sm font-semibold mb-1 flex items-center gap-2">
              <MessageSquare size={16} /> ¿Necesitas ayuda?
            </h4>
            <p className="text-xs text-brand-700/80 mb-3 leading-relaxed">
              Si tienes problemas con la conciliación, contacta a soporte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};