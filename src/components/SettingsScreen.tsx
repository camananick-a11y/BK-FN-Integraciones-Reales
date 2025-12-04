import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Save, RefreshCw, Power, CreditCard, Layers, TestTube, 
  Bell, ShieldAlert, CheckCircle2, AlertTriangle, Upload, Activity, Trash2, X 
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import adminService from '../api/adminService';

interface SettingsScreenProps {
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ESTADO MAESTRO DEL FORMULARIO
  const [formData, setFormData] = useState({
    // Preferencias
    test_mode: true,
    default_currency: 'USD',
    min_amount: '10.00',
    default_tag_paid: '',
    pipeline_id: '',
    stage_id: '',
    // Personalización
    brand_color: '#0ea5e9',
    logo_url: '', 
    // Notificaciones
    notify_client: true,
    notify_seller: true,
    alert_errors: true,
    // Estado de Integraciones 
    ghl_connected: true,
    mp_connected: true
  });

  //CARGAR DATOS AL INICIO
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await adminService.getSettings();
        // Fusionamos datos del backend con valores por defecto
        setFormData(prev => ({ ...prev, ...data }));
      } catch (error) {
        console.error("Error cargando configuración", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // MANEJADOR GENÉRICO DE INPUTS
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // MANEJADOR DE SUBIDA DE LOGO
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Creamos una URL local para previsualizar inmediatamente
      const previewUrl = URL.createObjectURL(file);
      handleChange('logo_url', previewUrl);
    }
  };

  // MANEJADOR DE INTEGRACIONES (Conectar/Desconectar)
  const toggleIntegration = (integration: 'ghl' | 'mp') => {
    const field = integration === 'ghl' ? 'ghl_connected' : 'mp_connected';
    const currentValue = formData[field];
    
    if (currentValue) {
        if (window.confirm(`¿Estás seguro de desconectar ${integration === 'ghl' ? 'GoHighLevel' : 'Mercado Pago'}?`)) {
            handleChange(field, false);
        }
    } else {
        alert(`Redirigiendo a login de ${integration === 'ghl' ? 'GoHighLevel' : 'Mercado Pago'}...`);
        setTimeout(() => handleChange(field, true), 1000);
    }
  };

  // GUARDAR CAMBIOS
  const handleSave = async () => {
    setIsSaving(true);
    try {
        await adminService.updateSettings(formData);
        alert("¡Configuración guardada exitosamente!");
    } catch (error) {
        alert("Hubo un error al guardar.");
    } finally {
        setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-20 text-center text-slate-500">Cargando configuración...</div>;

  return (
    <div className="w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-start gap-4">
          <button onClick={onBack} className="mt-1 p-2 hover:bg-white rounded-full transition-colors text-slate-500 hover:text-slate-700 hover:shadow-sm">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Configuración de la Cuenta</h1>
            <p className="text-slate-500 text-sm">Ajusta tus conexiones y preferencias de cobro.</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="hidden md:flex">
            {isSaving ? <RefreshCw className="animate-spin mr-2" size={18}/> : <Save className="mr-2" size={18}/>}
            {isSaving ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>

      <div className="space-y-6">

        {/* SECCIÓN 1: INTEGRACIONES (Ahora Funcionales) */}
        <section className="space-y-3">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-1">Integraciones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Tarjeta GHL */}
                <Card className={`p-6 border shadow-sm relative overflow-hidden transition-colors ${formData.ghl_connected ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200'}`}>
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2 border border-slate-200 shadow-sm">
                                <img src="https://picsum.photos/48/48?grayscale" alt="GHL" className={`w-full h-full object-contain ${!formData.ghl_connected && 'opacity-50 grayscale'}`} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">GoHighLevel</h3>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <div className={`w-2 h-2 rounded-full ${formData.ghl_connected ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                                    <span className={`text-xs font-medium ${formData.ghl_connected ? 'text-emerald-700' : 'text-slate-500'}`}>
                                        {formData.ghl_connected ? 'Conectado' : 'Desconectado'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {formData.ghl_connected && <div className="p-2 bg-emerald-100 text-emerald-600 rounded-full"><CheckCircle2 size={20} /></div>}
                    </div>
                    <div className="flex gap-3">
                        {formData.ghl_connected ? (
                            <Button variant="outline" size="sm" fullWidth className="bg-white border-rose-200 text-rose-600 hover:bg-rose-50" onClick={() => toggleIntegration('ghl')}>
                                <Power size={14} className="mr-2"/> Desconectar
                            </Button>
                        ) : (
                            <Button variant="primary" size="sm" fullWidth onClick={() => toggleIntegration('ghl')}>
                                <RefreshCw size={14} className="mr-2"/> Conectar
                            </Button>
                        )}
                    </div>
                </Card>

                {/* Tarjeta Mercado Pago */}
                <Card className={`p-6 border shadow-sm relative overflow-hidden transition-colors ${formData.mp_connected ? 'border-sky-200 bg-sky-50/30' : 'border-slate-200'}`}>
                     <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200 shadow-sm">
                                <CreditCard className={formData.mp_connected ? "text-[#009EE3]" : "text-slate-400"} size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Mercado Pago</h3>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <div className={`w-2 h-2 rounded-full ${formData.mp_connected ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                                    <span className={`text-xs font-medium ${formData.mp_connected ? 'text-emerald-700' : 'text-slate-500'}`}>
                                        {formData.mp_connected ? 'Conectado' : 'Desconectado'}
                                    </span>
                                </div>
                            </div>
                        </div>
                         {formData.mp_connected && <div className="p-2 bg-emerald-100 text-emerald-600 rounded-full"><CheckCircle2 size={20} /></div>}
                    </div>
                    <div className="flex gap-3">
                        {formData.mp_connected ? (
                            <Button variant="outline" size="sm" fullWidth className="bg-white border-rose-200 text-rose-600 hover:bg-rose-50" onClick={() => toggleIntegration('mp')}>
                                <Power size={14} className="mr-2"/> Desconectar
                            </Button>
                        ) : (
                            <Button variant="primary" size="sm" fullWidth onClick={() => toggleIntegration('mp')} className="!bg-[#009EE3] hover:!bg-[#008FCC]">
                                <RefreshCw size={14} className="mr-2"/> Conectar
                            </Button>
                        )}
                    </div>
                </Card>
            </div>
        </section>

        {/* SECCIÓN 2: PREFERENCIAS DE COBRO */}
        <section className="space-y-3">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-1">Preferencias de Cobro</h2>
            <Card className="p-6 border border-slate-200 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Moneda por defecto</label>
                        <select value={formData.default_currency} onChange={(e) => handleChange('default_currency', e.target.value)} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none">
                            <option value="USD">USD - Dólar Estadounidense</option>
                            <option value="MXN">MXN - Peso Mexicano</option>
                            <option value="COP">COP - Peso Colombiano</option>
                            <option value="CLP">CLP - Peso Chileno</option>
                            <option value="PEN">PEN - Moneda Peruana</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Monto mínimo permitido</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                            <input type="number" value={formData.min_amount} onChange={(e) => handleChange('min_amount', e.target.value)} className="w-full pl-7 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Tag al confirmar pago (GHL)</label>
                        <select value={formData.default_tag_paid} onChange={(e) => handleChange('default_tag_paid', e.target.value)} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none">
                            <option value="">Seleccionar etiqueta...</option>
                            <option value="pago_confirmado">Pago Confirmado</option>
                            <option value="cliente_activo">Cliente Activo</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Mover a Pipeline / Stage</label>
                        <div className="flex gap-2">
                            <select value={formData.pipeline_id} onChange={(e) => handleChange('pipeline_id', e.target.value)} className="flex-1 px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none">
                                <option value="">Pipeline...</option>
                                <option value="ventas">Ventas General</option>
                            </select>
                            <select value={formData.stage_id} onChange={(e) => handleChange('stage_id', e.target.value)} className="flex-1 px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none">
                                <option value="">Stage...</option>
                                <option value="won">Cerrado Ganado</option>
                            </select>
                        </div>
                    </div>
                </div>
            </Card>
        </section>

        {/* SECCIÓN 3: ENTORNO */}
        <section className="space-y-3">
             <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-1">Entorno</h2>
             <Card className={`p-6 border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors ${formData.test_mode ? 'border-amber-200 bg-amber-50' : 'border-slate-200 bg-white'}`}>
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${formData.test_mode ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
                        {formData.test_mode ? <TestTube size={24} /> : <Layers size={24} />}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 mb-1">{formData.test_mode ? 'Modo de Prueba (Sandbox)' : 'Modo Producción'}</h3>
                        <p className="text-sm text-slate-600 max-w-md">{formData.test_mode ? 'Estás utilizando pagos simulados. No se realizarán cobros reales.' : 'Los pagos son reales y se procesarán a través de Mercado Pago.'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium ${formData.test_mode ? 'text-amber-700' : 'text-slate-400'}`}>Test</span>
                    <button onClick={() => handleChange('test_mode', !formData.test_mode)} className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${formData.test_mode ? 'bg-amber-500' : 'bg-slate-300'}`}>
                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition shadow-sm ${formData.test_mode ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                    <span className={`text-sm font-medium ${!formData.test_mode ? 'text-slate-900' : 'text-slate-400'}`}>Live</span>
                </div>
             </Card>
        </section>

        {/* SECCIÓN 4: PERSONALIZACIÓN */}
        <section className="space-y-3">
             <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-1">Personalización</h2>
             <Card className="p-6 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="text-sm font-medium text-slate-700 block">Logo de la Agencia</label>
                    
                    {/* Input invisible */}
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/png, image/jpeg" 
                        onChange={handleLogoUpload}
                    />

                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group relative overflow-hidden"
                    >
                        {formData.logo_url ? (
                            <div className="relative w-full h-32 flex items-center justify-center">
                                <img src={formData.logo_url} alt="Logo Preview" className="max-h-full max-w-full object-contain" />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white text-xs font-medium">Cambiar imagen</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="bg-slate-100 p-3 rounded-full mb-3 group-hover:bg-white group-hover:shadow-sm transition-all">
                                    <Upload size={20} className="text-slate-400 group-hover:text-brand-500" />
                                </div>
                                <p className="text-sm font-medium text-slate-700">Haz clic para subir</p>
                                <p className="text-xs text-slate-400">PNG, JPG (Max. 2MB)</p>
                            </>
                        )}
                    </div>
                    {formData.logo_url && (
                        <button onClick={(e) => { e.stopPropagation(); handleChange('logo_url', ''); }} className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 mx-auto">
                            <X size={12} /> Eliminar logo
                        </button>
                    )}
                </div>
                
                <div className="space-y-4">
                    <label className="text-sm font-medium text-slate-700 block">Color de la marca</label>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg shadow-sm border border-slate-200" style={{ backgroundColor: formData.brand_color }}></div>
                        <div className="flex-1">
                             <input type="color" value={formData.brand_color} onChange={(e) => handleChange('brand_color', e.target.value)} className="w-full h-10 p-1 bg-white border border-slate-200 rounded-lg cursor-pointer" />
                             <p className="text-xs text-slate-500 mt-1">Este color se usará en tus links de pago.</p>
                        </div>
                    </div>
                </div>
             </Card>
        </section>

        {/* SECCIÓN 5: NOTIFICACIONES */}
        <section className="space-y-3">
             <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-1">Notificaciones</h2>
             <Card className="p-6 border border-slate-200 shadow-sm divide-y divide-slate-100">
                {[
                    { key: 'notify_client', label: 'Notificar al cliente', desc: 'Enviar email cuando el pago sea exitoso.', icon: CreditCard },
                    { key: 'notify_seller', label: 'Notificar al vendedor', desc: 'Recibir alerta interna por cada venta.', icon: Bell },
                    { key: 'alert_errors', label: 'Alertas de error', desc: 'Avisar si un webhook de GHL falla.', icon: ShieldAlert }
                ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                        <div className="flex items-center gap-3">
                             <div className="p-2 bg-slate-100 text-slate-500 rounded-lg"><item.icon size={18} /></div>
                             <div>
                                <p className="text-sm font-medium text-slate-900">{item.label}</p>
                                <p className="text-xs text-slate-500">{item.desc}</p>
                             </div>
                        </div>
                        <input 
                            type="checkbox" 
                            checked={!!formData[item.key as keyof typeof formData]}
                            onChange={(e) => handleChange(item.key, e.target.checked)} 
                            className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500 border-gray-300" 
                        />
                    </div>
                ))}
             </Card>
        </section>

        {/* SECCIÓN 6: ZONA DE PELIGRO */}
        <section className="space-y-3">
             <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-1">Seguridad y Accesos</h2>
             <Card className="p-6 border border-slate-200 shadow-sm">
                <div className="pt-2">
                    <h3 className="text-sm font-bold mb-4 text-rose-700 flex items-center gap-2">
                        <AlertTriangle size={16}/> Zona de Peligro
                    </h3>
                    <div className="flex flex-col md:flex-row gap-3">
                        <Button variant="outline" size="sm" className="bg-white border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-300" onClick={() => toggleIntegration('mp')}>
                            <Trash2 size={14} className="mr-2"/> Revocar acceso MP
                        </Button>
                        <Button variant="outline" size="sm" className="bg-white border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-300" onClick={() => toggleIntegration('ghl')}>
                            <Trash2 size={14} className="mr-2"/> Revocar acceso GHL
                        </Button>
                    </div>
                </div>
             </Card>
        </section>

        {/* Botón Guardar Móvil */}
        <div className="md:hidden fixed bottom-4 left-4 right-4 z-20">
             <Button onClick={handleSave} fullWidth size="lg" disabled={isSaving} className="shadow-xl">
                {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
        </div>

      </div>
    </div>
  );
};