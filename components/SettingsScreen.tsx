import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  RefreshCw, 
  Power, 
  CreditCard, 
  Layers, 
  TestTube, 
  Palette, 
  Bell, 
  ShieldAlert, 
  CheckCircle2,
  AlertTriangle,
  Upload,
  Activity,
  Trash2,
  Link
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface SettingsScreenProps {
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const [isTestMode, setIsTestMode] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [brandColor, setBrandColor] = useState('#0ea5e9');
  
  // Notification States
  const [notifyClient, setNotifyClient] = useState(true);
  const [notifySeller, setNotifySeller] = useState(true);
  const [alertErrors, setAlertErrors] = useState(true);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API save
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
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
            <h1 className="text-2xl font-bold text-slate-900">Configuración de la Cuenta</h1>
            <p className="text-slate-500 text-sm">Ajusta tus conexiones y preferencias de cobro.</p>
          </div>
        </div>
        <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="hidden md:flex"
        >
            {isSaving ? <RefreshCw className="animate-spin mr-2" size={18}/> : <Save className="mr-2" size={18}/>}
            {isSaving ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>

      <div className="space-y-6">

        {/* Section 1: Connections */}
        <section className="space-y-3">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-1">Integraciones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* GHL Card */}
                <Card className="p-6 border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center p-2 border border-slate-200">
                                <img src="https://picsum.photos/48/48?grayscale" alt="GHL" className="opacity-80 w-full h-full object-contain" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">GoHighLevel</h3>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-xs font-medium text-emerald-700">Conectado</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-full">
                            <CheckCircle2 size={20} />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm" fullWidth className="bg-white border-slate-200">
                            <RefreshCw size={14} className="mr-2"/> Reconectar
                        </Button>
                        <Button variant="outline" size="sm" fullWidth className="bg-white border-slate-200 text-rose-600 hover:text-rose-700 hover:bg-rose-50 hover:border-rose-100">
                            <Power size={14} className="mr-2"/> Desconectar
                        </Button>
                    </div>
                </Card>

                {/* MP Card */}
                <Card className="p-6 border border-slate-200 shadow-sm relative overflow-hidden">
                     <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#009EE3]/10 rounded-xl flex items-center justify-center border border-[#009EE3]/20">
                                <CreditCard className="text-[#009EE3]" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Mercado Pago</h3>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-xs font-medium text-emerald-700">Conectado</span>
                                </div>
                            </div>
                        </div>
                         <div className="p-2 bg-emerald-50 text-emerald-600 rounded-full">
                            <CheckCircle2 size={20} />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm" fullWidth className="bg-white border-slate-200">
                            <RefreshCw size={14} className="mr-2"/> Reconectar
                        </Button>
                        <Button variant="outline" size="sm" fullWidth className="bg-white border-slate-200 text-rose-600 hover:text-rose-700 hover:bg-rose-50 hover:border-rose-100">
                            <Power size={14} className="mr-2"/> Desconectar
                        </Button>
                    </div>
                </Card>
            </div>
        </section>

        {/* Section 2: Preferences */}
        <section className="space-y-3">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-1">Preferencias de Cobro</h2>
            <Card className="p-6 border border-slate-200 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Moneda por defecto</label>
                        <select className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none">
                            <option value="USD">USD - Dólar Estadounidense</option>
                            <option value="MXN">MXN - Peso Mexicano</option>
                            <option value="COP">COP - Peso Colombiano</option>
                            <option value="CLP">CLP - Peso Chileno</option>
                        </select>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Monto mínimo permitido</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                            <input 
                                type="number" 
                                placeholder="10.00"
                                className="w-full pl-7 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none" 
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Tag al confirmar pago (GHL)</label>
                        <select className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none">
                            <option value="">Seleccionar etiqueta...</option>
                            <option value="pago_confirmado" selected>Pago Confirmado</option>
                            <option value="cliente_activo">Cliente Activo</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Mover a Pipeline / Stage</label>
                        <div className="flex gap-2">
                            <select className="flex-1 px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none">
                                <option value="">Pipeline...</option>
                                <option value="ventas">Ventas General</option>
                            </select>
                            <select className="flex-1 px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none">
                                <option value="">Stage...</option>
                                <option value="won">Cerrado Ganado</option>
                            </select>
                        </div>
                    </div>
                </div>
            </Card>
        </section>

        {/* Section 3: Environment Mode */}
        <section className="space-y-3">
             <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-1">Entorno</h2>
             <Card className={`p-6 border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors ${isTestMode ? 'border-amber-200 bg-amber-50' : 'border-slate-200 bg-white'}`}>
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${isTestMode ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
                        {isTestMode ? <TestTube size={24} /> : <Layers size={24} />}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 mb-1">
                            {isTestMode ? 'Modo de Prueba (Sandbox)' : 'Modo Producción'}
                        </h3>
                        <p className="text-sm text-slate-600 max-w-md">
                            {isTestMode 
                                ? 'Estás utilizando pagos simulados. No se realizarán cobros reales a las tarjetas.' 
                                : 'Los pagos son reales y se procesarán a través de Mercado Pago.'}
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium ${isTestMode ? 'text-amber-700' : 'text-slate-400'}`}>Test</span>
                    <button 
                        onClick={() => setIsTestMode(!isTestMode)}
                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${isTestMode ? 'bg-amber-500' : 'bg-slate-300'}`}
                    >
                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition shadow-sm ${isTestMode ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                    <span className={`text-sm font-medium ${!isTestMode ? 'text-slate-900' : 'text-slate-400'}`}>Live</span>
                </div>
             </Card>
        </section>

        {/* Section 4: Branding */}
        <section className="space-y-3">
             <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-1">Personalización</h2>
             <Card className="p-6 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="text-sm font-medium text-slate-700 block">Logo de la Agencia</label>
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                        <div className="bg-slate-100 p-3 rounded-full mb-3 group-hover:bg-white group-hover:shadow-sm transition-all">
                            <Upload size={20} className="text-slate-400 group-hover:text-brand-500" />
                        </div>
                        <p className="text-sm font-medium text-slate-700">Haz clic para subir</p>
                        <p className="text-xs text-slate-400">PNG, JPG (Max. 2MB)</p>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <label className="text-sm font-medium text-slate-700 block">Color de la marca</label>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg shadow-sm border border-slate-200" style={{ backgroundColor: brandColor }}></div>
                        <div className="flex-1">
                             <input 
                                type="color" 
                                value={brandColor}
                                onChange={(e) => setBrandColor(e.target.value)}
                                className="w-full h-10 p-1 bg-white border border-slate-200 rounded-lg cursor-pointer"
                             />
                             <p className="text-xs text-slate-500 mt-1">Este color se usará en tus links de pago.</p>
                        </div>
                    </div>
                </div>
             </Card>
        </section>

        {/* Section 5: Notifications */}
        <section className="space-y-3">
             <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-1">Notificaciones</h2>
             <Card className="p-6 border border-slate-200 shadow-sm divide-y divide-slate-100">
                <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">
                            <CreditCard size={18} />
                         </div>
                         <div>
                            <p className="text-sm font-medium text-slate-900">Notificar al cliente</p>
                            <p className="text-xs text-slate-500">Enviar email cuando el pago sea exitoso.</p>
                         </div>
                    </div>
                    <input type="checkbox" checked={notifyClient} onChange={() => setNotifyClient(!notifyClient)} className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500 border-gray-300" />
                </div>
                
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">
                            <Bell size={18} />
                         </div>
                         <div>
                            <p className="text-sm font-medium text-slate-900">Notificar al vendedor</p>
                            <p className="text-xs text-slate-500">Recibir alerta interna por cada venta.</p>
                         </div>
                    </div>
                    <input type="checkbox" checked={notifySeller} onChange={() => setNotifySeller(!notifySeller)} className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500 border-gray-300" />
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">
                            <ShieldAlert size={18} />
                         </div>
                         <div>
                            <p className="text-sm font-medium text-slate-900">Alertas de error</p>
                            <p className="text-xs text-slate-500">Avisar si un webhook de GHL falla.</p>
                         </div>
                    </div>
                    <input type="checkbox" checked={alertErrors} onChange={() => setAlertErrors(!alertErrors)} className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500 border-gray-300" />
                </div>
             </Card>
        </section>

        {/* Section 6: Security */}
        <section className="space-y-3">
             <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-1">Seguridad y Accesos</h2>
             <Card className="p-6 border border-slate-200 shadow-sm">
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Activity size={16} className="text-slate-400"/> Actividad Reciente
                    </h3>
                    <div className="space-y-3 pl-2 border-l-2 border-slate-100">
                        <div className="pl-4 relative">
                            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-emerald-400"></div>
                            <p className="text-xs text-slate-500">Hoy, 10:23 AM</p>
                            <p className="text-sm text-slate-800">Reconexión exitosa con Mercado Pago</p>
                        </div>
                        <div className="pl-4 relative">
                            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300"></div>
                            <p className="text-xs text-slate-500">Ayer, 18:45 PM</p>
                            <p className="text-sm text-slate-800">Cambio de configuración: Modo Test activado</p>
                        </div>
                    </div>
                </div>
                
                <div className="pt-6 border-t border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900 mb-4 text-rose-700 flex items-center gap-2">
                        <AlertTriangle size={16}/> Zona de Peligro
                    </h3>
                    <div className="flex flex-col md:flex-row gap-3">
                        <Button variant="outline" size="sm" className="bg-white border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-300">
                            <Trash2 size={14} className="mr-2"/> Revocar acceso MP
                        </Button>
                        <Button variant="outline" size="sm" className="bg-white border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-300">
                            <Trash2 size={14} className="mr-2"/> Revocar acceso GHL
                        </Button>
                    </div>
                </div>
             </Card>
        </section>

        {/* Mobile Save Button (Fixed Bottom) */}
        <div className="md:hidden fixed bottom-4 left-4 right-4 z-20">
             <Button 
                onClick={handleSave} 
                fullWidth 
                size="lg" 
                disabled={isSaving}
                className="shadow-xl"
            >
                {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
        </div>

      </div>
    </div>
  );
};
