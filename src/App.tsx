import React, { useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext';

// Componentes
import { LoginScreen } from './components/LoginScreen';
import { OAuthPreScreen } from './components/OAuthPreScreen';
import { MercadoPagoPreScreen } from './components/MercadoPagoPreScreen';
import { Dashboard } from './components/Dashboard';
import { GenerateLinkScreen } from './components/GenerateLinkScreen';
import { PaymentHistoryScreen } from './components/PaymentHistoryScreen';
import { PaymentDetailScreen } from './components/PaymentDetailScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { SuperAdminDashboard } from './components/SuperAdminDashboard';
import { SuperAdminClientList } from './components/SuperAdminClientList';
import { SuperAdminClientDetail } from './components/SuperAdminClientDetail';
import { SuperAdminLogs } from './components/SuperAdminLogs';
import { UserGuideModal } from './components/UserGuideModal';

type Step = 'ghl' | 'mp' | 'dashboard' | 'generate_link' | 'history' | 'payment_detail' | 'settings' | 'superadmin' | 'superadmin_clients' | 'superadmin_client_detail' | 'superadmin_logs';

const App: React.FC = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState<Step>('dashboard');

  //Estado para saber qué pago ver en detalle
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);

  // ⚠️ SPRINT 1: Login bypass - comentado para desarrollo
  // if (!isAuthenticated) {
  //   return <LoginScreen />;
  // }

  const handleGHLConnect = () => setCurrentStep('mp');
  const handleMPConnect = () => {
    setTimeout(() => setCurrentStep('dashboard'), 1000);
  };

  const nav = {
    toGenerate: () => setCurrentStep('generate_link'),
    toHistory: () => setCurrentStep('history'),
    //Recibe el ID del pago
    toDetail: (id: string) => {
      setSelectedPaymentId(id);
      setCurrentStep('payment_detail');
    },
    toSettings: () => setCurrentStep('settings'),
    toDashboard: () => setCurrentStep('dashboard'),
    toSuperAdmin: () => setCurrentStep('superadmin'),
    toSAClients: () => setCurrentStep('superadmin_clients'),
    toSACliDetail: () => setCurrentStep('superadmin_client_detail'),
    toSALogs: () => setCurrentStep('superadmin_logs'),
    backFromDetail: () => {
      setSelectedPaymentId(null);
      setCurrentStep('history');
    }
  };

  const isWideLayout = ['dashboard', 'generate_link', 'history', 'payment_detail', 'settings', 'superadmin', 'superadmin_clients', 'superadmin_client_detail', 'superadmin_logs'].includes(currentStep);
  const containerClass = isWideLayout ? "w-full max-w-7xl" : "w-full max-w-lg";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50 relative transition-all duration-500">

      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl -translate-y-1/2 transition-opacity duration-700 ${isWideLayout ? 'opacity-40' : 'opacity-100'}`}></div>
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 transition-opacity duration-700 ${isWideLayout ? 'opacity-40' : 'opacity-100'}`}></div>
      </div>

      <div className={`${containerClass} relative z-10 transition-all duration-500`}>

        {(currentStep === 'ghl' || currentStep === 'mp') && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className={`h-2 rounded-full transition-all duration-500 ${currentStep === 'ghl' ? 'w-8 bg-brand-600' : 'w-2 bg-slate-300'}`} />
            <div className={`h-2 rounded-full transition-all duration-500 ${currentStep === 'mp' ? 'w-8 bg-[#009EE3]' : 'w-2 bg-slate-300'}`} />
          </div>
        )}

        {/*RENDERIZADO DE PANTALLAS */}

        {currentStep === 'ghl' && <OAuthPreScreen onConnect={handleGHLConnect} />}
        {currentStep === 'mp' && <MercadoPagoPreScreen onConnect={handleMPConnect} />}

        {currentStep === 'dashboard' && (
          <Dashboard
            userName={user || 'Admin'}
            onLogout={logout}
            onNavigateToGenerateLink={nav.toGenerate}
            onNavigateToHistory={nav.toHistory}
            onNavigateToSettings={nav.toSettings}
            onNavigateToSuperAdmin={nav.toSuperAdmin}
            onNavigateToDetail={(id) => nav.toDetail(id || '')}
          />
        )}

        {currentStep === 'generate_link' && <GenerateLinkScreen onBack={nav.toDashboard} />}

        {currentStep === 'history' && (
          <PaymentHistoryScreen
            onBack={nav.toDashboard}
            onNavigateToDetail={nav.toDetail}
          />
        )}

        {/*Pasamos el ID al componente de detalle */}
        {currentStep === 'payment_detail' && (
          <PaymentDetailScreen
            paymentId={selectedPaymentId}
            onBack={nav.backFromDetail}
          />
        )}

        {currentStep === 'settings' && <SettingsScreen onBack={nav.toDashboard} />}

        {currentStep === 'superadmin' && (
          <SuperAdminDashboard
            onLogout={nav.toDashboard}
            onNavigateToClients={nav.toSAClients}
            onNavigateToLogs={nav.toSALogs}
          />
        )}
        {currentStep === 'superadmin_clients' && <SuperAdminClientList onBack={nav.toSuperAdmin} onNavigateToDetail={nav.toSACliDetail} />}
        {currentStep === 'superadmin_client_detail' && <SuperAdminClientDetail onBack={nav.toSAClients} />}
        {currentStep === 'superadmin_logs' && <SuperAdminLogs onBack={nav.toSuperAdmin} />}

      </div>
    </div>
  );
};

export default App;