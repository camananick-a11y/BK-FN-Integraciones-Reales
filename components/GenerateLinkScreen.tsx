import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  DollarSign, 
  FileText, 
  Tag, 
  MessageSquare, 
  Link as LinkIcon, 
  Copy, 
  ExternalLink, 
  CheckCircle2,
  ChevronDown,
  Loader2
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface GenerateLinkScreenProps {
  onBack: () => void;
}

export const GenerateLinkScreen: React.FC<GenerateLinkScreenProps> = ({ onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [showTag, setShowTag] = useState(false);
  
  // Form State
  const [amount, setAmount] = useState('');
  const [clientName, setClientName] = useState('');
  
  const handleGenerate = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsGenerated(true);
    }, 1500);
  };

  const generatedUrl = "https://pay.rp-pay.com/l/9f8s7d6f";

  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Navigation */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-white rounded-full transition-colors text-slate-500 hover:text-slate-700 hover:shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Generar link de pago</h1>
          <p className="text-slate-500 text-sm">Crea un enlace de cobro para tu cliente y envíalo por el canal que prefieras.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 md:p-8 shadow-sm border border-slate-200">
            <div className="space-y-6">
              
              {/* Client Selector */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Cliente</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                    <Search size={18} />
                  </div>
                  <input 
                    type="text" 
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all placeholder:text-slate-400"
                    placeholder="Buscar por nombre, email o teléfono..."
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                  {/* Mock Dropdown result (Visual only) */}
                  {clientName && !isGenerated && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-100 rounded-xl shadow-xl z-20 overflow-hidden">
                      <div className="p-2 text-xs text-slate-400 uppercase font-semibold bg-slate-50">Resultados</div>
                      <div className="p-3 hover:bg-brand-50 cursor-pointer flex items-center justify-between group/item">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-bold">MG</div>
                            <div>
                                <p className="text-sm font-medium text-slate-800">Maria Gonzalez</p>
                                <p className="text-xs text-slate-500">maria.g@gmail.com</p>
                            </div>
                        </div>
                        <CheckCircle2 size={16} className="text-brand-600 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Amount */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Monto a cobrar</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                      <DollarSign size={18} />
                    </div>
                    <input 
                      type="number" 
                      className="block w-full pl-10 pr-16 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-mono text-lg font-medium"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                       <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">USD</span>
                    </div>
                  </div>
                </div>

                {/* Concept */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Concepto</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                      <FileText size={18} />
                    </div>
                    <input 
                      type="text" 
                      className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all placeholder:text-slate-400"
                      placeholder="Ej. Asesoría 1h..."
                    />
                  </div>
                </div>
              </div>

              {/* Advanced Options Toggles */}
              <div className="space-y-4 pt-2">
                
                {/* Internal Note Toggle */}
                <div className="border border-slate-100 rounded-xl overflow-hidden">
                    <button 
                        onClick={() => setShowNote(!showNote)}
                        className="w-full flex items-center justify-between p-3 bg-slate-50/50 hover:bg-slate-50 transition-colors text-left"
                    >
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <MessageSquare size={16} className="text-slate-400" />
                            Añadir nota interna <span className="text-slate-400 font-normal text-xs">(Opcional)</span>
                        </div>
                        <ChevronDown size={16} className={`text-slate-400 transition-transform ${showNote ? 'rotate-180' : ''}`} />
                    </button>
                    {showNote && (
                        <div className="p-3 bg-white border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
                             <textarea 
                                className="w-full text-sm p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none resize-none h-20"
                                placeholder="Esta nota no será visible para el cliente..."
                             />
                        </div>
                    )}
                </div>

                {/* Tag Toggle */}
                <div className="border border-slate-100 rounded-xl overflow-hidden">
                    <button 
                        onClick={() => setShowTag(!showTag)}
                        className="w-full flex items-center justify-between p-3 bg-slate-50/50 hover:bg-slate-50 transition-colors text-left"
                    >
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <Tag size={16} className="text-slate-400" />
                            Asignar tag en GHL al confirmar <span className="text-slate-400 font-normal text-xs">(Opcional)</span>
                        </div>
                        <ChevronDown size={16} className={`text-slate-400 transition-transform ${showTag ? 'rotate-180' : ''}`} />
                    </button>
                    {showTag && (
                        <div className="p-3 bg-white border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
                             <select className="w-full text-sm p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none bg-white">
                                <option>Seleccionar etiqueta...</option>
                                <option>Pago Confirmado</option>
                                <option>Nuevo Cliente</option>
                                <option>Asesoría VIP</option>
                             </select>
                        </div>
                    )}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <Button 
                    onClick={handleGenerate} 
                    fullWidth 
                    size="lg" 
                    disabled={isLoading || !clientName || !amount}
                    className="relative overflow-hidden"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <Loader2 className="animate-spin" size={20} /> Generando...
                        </span>
                    ) : (
                        "Generar link de pago"
                    )}
                </Button>
              </div>

            </div>
          </Card>
        </div>

        {/* Right Column: Result or Instructions */}
        <div className="lg:col-span-1">
            {isGenerated ? (
                 <div className="animate-in slide-in-from-right-4 fade-in duration-500 space-y-4">
                    {/* Success Card */}
                    <Card className="p-6 bg-emerald-50 border border-emerald-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 blur-xl"></div>
                        
                        <div className="flex items-center gap-3 mb-4 relative z-10">
                            <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
                                <CheckCircle2 size={24} />
                            </div>
                            <h3 className="font-bold text-emerald-900">Link generado</h3>
                        </div>
                        <p className="text-sm text-emerald-800 mb-6 relative z-10">
                            Tu enlace está listo. Envíalo a <strong>{clientName}</strong> para recibir el pago.
                        </p>

                        <div className="space-y-3 relative z-10">
                            <div className="bg-white p-1 rounded-xl border border-emerald-200 shadow-sm flex items-center">
                                <div className="pl-3 overflow-hidden flex-1">
                                    <p className="text-xs text-slate-400 font-mono truncate">{generatedUrl}</p>
                                </div>
                                <button className="p-2 hover:bg-slate-50 text-slate-500 rounded-lg transition-colors" title="Copiar">
                                    <Copy size={16} />
                                </button>
                            </div>
                            
                            <Button variant="primary" fullWidth size="md" className="!bg-emerald-600 hover:!bg-emerald-700 !shadow-emerald-500/20">
                                Copiar Link
                            </Button>
                            
                            <Button variant="outline" fullWidth size="md" className="bg-white hover:bg-white/80 border-emerald-200 text-emerald-700">
                                <span className="flex items-center gap-2">
                                    Abrir en nueva pestaña <ExternalLink size={14} />
                                </span>
                            </Button>
                        </div>
                    </Card>

                    {/* Next Steps Hint */}
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-700">
                        <p className="font-semibold mb-1">¿Qué sucede después?</p>
                        <p>Cuando el cliente pague, recibirás una notificación y el estado en GoHighLevel se actualizará automáticamente.</p>
                    </div>
                 </div>
            ) : (
                <div className="hidden lg:flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl h-full min-h-[400px] text-slate-400">
                    <div className="bg-slate-50 p-4 rounded-full mb-4">
                        <LinkIcon size={32} className="text-slate-300" />
                    </div>
                    <h3 className="text-slate-600 font-medium mb-2">Listo para cobrar</h3>
                    <p className="text-sm max-w-[200px]">Completa el formulario para generar un enlace de pago único y seguro.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
