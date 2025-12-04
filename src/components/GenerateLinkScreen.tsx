import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Search, DollarSign, FileText, CheckCircle2,
  Loader2, X, Copy, ExternalLink, Link as LinkIcon, 
  Globe, Mail, MessageCircle, Download, Share2
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import adminService from '../api/adminService';
import html2canvas from 'html2canvas';

interface GenerateLinkScreenProps {
  onBack: () => void;
}

export const GenerateLinkScreen: React.FC<GenerateLinkScreenProps> = ({ onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedData, setGeneratedData] = useState<any>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloadingImg, setIsDownloadingImg] = useState(false);
  
  // Referencia para la captura de imagen
  const ticketRef = useRef<HTMLDivElement>(null);
  
  // Formulario
  const [searchTerm, setSearchTerm] = useState('');
  const [clientsFound, setClientsFound] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [concept, setConcept] = useState('');

  // Lógica de Búsqueda
  useEffect(() => {
    if (selectedClient || !searchTerm.trim()) {
        setClientsFound([]);
        return;
    }
    const timeoutId = setTimeout(async () => {
        setIsSearching(true);
        try {
            const results: any = await adminService.searchClients(searchTerm);
            setClientsFound(Array.isArray(results) ? results : []);
        } catch (error) {
            setClientsFound([]);
        } finally {
            setIsSearching(false);
        }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedClient]);

  const handleSelectClient = (client: any) => {
    setSelectedClient(client);
    setSearchTerm(client.name);
    setClientsFound([]);
  };

  const handleClearSelection = () => {
    setSelectedClient(null);
    setSearchTerm('');
    setClientsFound([]);
  };

  const handleGenerate = async () => {
    if (!selectedClient || parseFloat(amount) <= 0 || !concept) return;

    setIsLoading(true);
    try {
        const payload = {
            customer_name: selectedClient.name,
            customer_email: selectedClient.email,
            amount: amount.toString(),
            currency: currency,
            description: concept,
            ghl_contact_id: `ghl_${selectedClient.id}` 
        };

        const response = await adminService.createPaymentLink(payload);
        setGeneratedData(response);
        setIsGenerated(true);
    } catch (error) {
        alert("Ocurrió un error al generar el link.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    if(generatedData?.payment_link) {
        navigator.clipboard.writeText(generatedData.payment_link);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    }
  };

  //FUNCIONES DE ENVÍO Y DESCARGA

  const handleDownloadImage = async () => {
    if (!ticketRef.current) return;
    setIsDownloadingImg(true);
    try {
        const canvas = await html2canvas(ticketRef.current, {
            scale: 2,
            backgroundColor: '#ffffff',
            logging: false
        });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = `Boleto_${selectedClient.name.replace(/\s+/g, '_')}.png`;
        link.click();
    } catch (error) {
        console.error("Error imagen:", error);
        alert("No se pudo generar la imagen.");
    } finally {
        setIsDownloadingImg(false);
    }
  };

  const handleShareWhatsApp = () => {
    if (!generatedData) return;
    const message = `🧾 *BOLETO DE PAGO*\n👤 Cliente: ${selectedClient.name}\n💰 Monto: $${amount} ${currency}\n📝 Concepto: ${concept}\n🔗 Pagar aquí: ${generatedData.payment_link}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleShareEmail = () => {
    if (!generatedData) return;
    const subject = `Boleto de Pago - ${concept}`;
    const body = `Hola ${selectedClient.name},\n\nAdjunto encontrarás el detalle de tu pago pendiente.\n\nMonto: $${amount} ${currency}\nConcepto: ${concept}\n\nPuedes realizar el pago aquí:\n${generatedData.payment_link}\n\nGracias.`;
    window.location.href = `mailto:${selectedClient.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const isFormValid = selectedClient && amount && parseFloat(amount) > 0 && concept.trim() !== '';

  return (
    <div className="w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-white rounded-full transition-colors text-slate-500 hover:text-slate-700 hover:shadow-sm">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Nuevo Cobro</h1>
          <p className="text-slate-500 text-sm">Genera y envía boletos de pago al instante.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: FORMULARIO */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 md:p-8 shadow-sm border border-slate-200">
            <div className="space-y-4">
               <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">1. Cliente</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      {isSearching ? <Loader2 size={18} className="animate-spin text-brand-500"/> : selectedClient ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Search size={18} />}
                    </div>
                    <input 
                      type="text" 
                      className={`block w-full pl-10 pr-10 py-3 border rounded-xl outline-none transition-all ${selectedClient ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium' : 'border-slate-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500'}`}
                      placeholder="Buscar cliente..."
                      value={searchTerm}
                      onChange={(e) => { setSearchTerm(e.target.value); if (selectedClient) setSelectedClient(null); }}
                      disabled={isGenerated}
                    />
                    {searchTerm && !isGenerated && !isSearching && (
                      <button onClick={handleClearSelection} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"><X size={16} /></button>
                    )}
                    
                    {clientsFound.length > 0 && !isGenerated && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden max-h-60 overflow-y-auto">
                        {clientsFound.map((client) => (
                            <div key={client.id} onClick={() => handleSelectClient(client)} className="p-3 hover:bg-brand-50 cursor-pointer flex items-center justify-between border-b border-slate-50 transition-colors">
                              <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-xs font-bold border border-brand-100 text-brand-600">{client.initials}</div>
                                  <div><p className="text-sm font-medium text-slate-800">{client.name}</p><p className="text-xs text-slate-500">{client.email}</p></div>
                              </div>
                            </div>
                        ))}
                      </div>
                    )}
                  </div>
               </div>

               <hr className="border-slate-100" />

               <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">2. Detalle del Cobro</label>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="col-span-1">
                          <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Globe size={16} /></div>
                              <select value={currency} onChange={(e) => setCurrency(e.target.value)} disabled={isGenerated} className="block w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-brand-500 bg-white text-sm font-medium">
                                  <option value="USD">USD</option><option value="MXN">MXN</option><option value="ARS">ARS</option><option value="COP">COP</option>
                              </select>
                          </div>
                      </div>
                      <div className="col-span-2">
                          <div className="relative group">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><DollarSign size={18} /></div>
                              <input type="number" min="0" step="0.01" className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-brand-500" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} disabled={isGenerated} />
                          </div>
                      </div>
                  </div>
                  <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><FileText size={18} /></div>
                      <input type="text" className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-brand-500 transition-colors" placeholder="Concepto (Ej. Asesoría)" value={concept} onChange={(e) => setConcept(e.target.value)} disabled={isGenerated} />
                  </div>
               </div>

               <div className="pt-2">
                  <Button onClick={handleGenerate} fullWidth size="lg" disabled={isLoading || !isFormValid || isGenerated}>
                      {isLoading ? <><Loader2 className="animate-spin mr-2" /> Procesando...</> : "Generar Link de Pago"}
                  </Button>
               </div>
            </div>
          </Card>
        </div>

        {/* COLUMNA DERECHA: BOLETO */}
        <div className="lg:col-span-5">
            {isGenerated && generatedData ? (
                 <div className="animate-in slide-in-from-right-4 fade-in duration-500 space-y-4">
                    
                    {/* ÁREA DE CAPTURA (BOLETO) */}
                    <div ref={ticketRef} className="bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden relative">
                        <div className="h-2 bg-gradient-to-r from-brand-500 to-emerald-500"></div>
                        <div className="p-6 text-center space-y-4">
                            <div className="flex items-center justify-center mb-2 text-brand-600 font-bold text-lg gap-2">
                                <DollarSign className="h-6 w-6" /> RP PAY
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Boleto de Pago</h3>
                                <p className="text-sm text-slate-500">Para: {selectedClient.name}</p>
                            </div>
                            
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-left text-sm space-y-3">
                                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                                    <span className="text-slate-500">Total:</span>
                                    <span className="font-bold text-2xl text-brand-600">${amount} <span className="text-sm">{currency}</span></span>
                                </div>
                                <div><span className="text-slate-500 block mb-1">Concepto:</span><span className="font-medium text-slate-900">{concept}</span></div>
                                <div><span className="text-slate-500 block mb-1">Fecha:</span><span className="font-medium text-slate-900">{new Date().toLocaleDateString()}</span></div>
                            </div>

                            <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-lg border border-slate-200">
                                <p className="text-xs text-slate-500 font-mono truncate flex-1 text-left underline">{generatedData.payment_link}</p>
                            </div>
                        </div>
                    </div>

                    {/* BOTONES DE ACCIÓN */}
                    <div className="grid grid-cols-2 gap-3">
                        <Button onClick={handleDownloadImage} variant="secondary" size="sm" className="col-span-2 bg-brand-50 text-brand-700 hover:bg-brand-100 border-brand-100" disabled={isDownloadingImg}>
                            {isDownloadingImg ? <Loader2 size={16} className="animate-spin mr-2"/> : <Download size={16} className="mr-2" />} Descargar Boleto (Imagen)
                        </Button>
                        <Button onClick={handleShareWhatsApp} variant="outline" size="sm" className="bg-white border-emerald-200 text-emerald-700 hover:bg-emerald-50"><MessageCircle size={16} className="mr-2" /> WhatsApp</Button>
                        <Button onClick={handleShareEmail} variant="outline" size="sm" className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50"><Mail size={16} className="mr-2" /> Email</Button>
                        <Button onClick={handleCopyLink} variant="outline" size="sm" className="col-span-2 bg-white border-slate-200 text-slate-600 hover:bg-slate-50">{isCopied ? <><CheckCircle2 size={16} className="mr-2 text-emerald-500"/> Copiado</> : <><Copy size={16} className="mr-2"/> Copiar Link</>}</Button>
                    </div>
                    
                    <Button variant="ghost" fullWidth onClick={() => { setIsGenerated(false); setAmount(''); setConcept(''); }}>Generar Nuevo Cobro</Button>
                 </div>
            ) : (
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center h-full min-h-[350px] flex flex-col items-center justify-center opacity-75">
                    <LinkIcon size={32} className="text-slate-300 mb-4" />
                    <p className="text-xs text-slate-400 max-w-[200px]">Aquí verás el boleto digital listo para descargar y enviar.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};