import React, { useState } from 'react';
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

type Step = 'ghl' | 'mp' | 'dashboard' | 'generate_link' | 'history' | 'payment_detail' | 'settings' | 'superadmin' | 'superadmin_clients' | 'superadmin_client_detail' | 'superadmin_logs';

const App: React.FC = () => {
  // Set default to dashboard for normal user view
  const [currentStep, setCurrentStep] = useState<Step>('dashboard');

  const handleGHLConnect = () => {
    console.log("GHL Connected. Moving to Mercado Pago step...");
    setCurrentStep('mp');
  };

  const handleMPConnect = () => {
    console.log("Mercado Pago flow initiated...");
    // Simulate auth flow completion
    setTimeout(() => {
      setCurrentStep('dashboard');
    }, 1000);
  };

  const navigateToGenerateLink = () => {
    setCurrentStep('generate_link');
  };

  const navigateToHistory = () => {
    setCurrentStep('history');
  };
  
  const navigateToDetail = () => {
    setCurrentStep('payment_detail');
  };

  const navigateToSettings = () => {
    setCurrentStep('settings');
  };

  const navigateToDashboard = () => {
    setCurrentStep('dashboard');
  };

  const navigateToSuperAdmin = () => {
    setCurrentStep('superadmin');
  };

  const navigateToSuperAdminClients = () => {
    setCurrentStep('superadmin_clients');
  };

  const navigateToSuperAdminClientDetail = () => {
    setCurrentStep('superadmin_client_detail');
  };

  const navigateToSuperAdminLogs = () => {
    setCurrentStep('superadmin_logs');
  };

  const handleBackFromDetail = () => {
      setCurrentStep('history');
  }

  // Determine container width based on step
  const isWideLayout = ['dashboard', 'generate_link', 'history', 'payment_detail', 'settings', 'superadmin', 'superadmin_clients', 'superadmin_client_detail', 'superadmin_logs'].includes(currentStep);
  const containerClass = isWideLayout ? "w-full max-w-7xl" : "w-full max-w-lg";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50 relative transition-all duration-500">
      
      {/* Background decoration - subtle for dashboard, focused for auth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-96 h-96 bg-brand-100/40 rounded-full blur-3xl -translate-y-1/2 transition-opacity duration-700 ${isWideLayout ? 'opacity-30' : 'opacity-100'}`}></div>
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl translate-y-1/2 transition-opacity duration-700 ${isWideLayout ? 'opacity-30' : 'opacity-100'}`}></div>
      </div>

      <div className={`${containerClass} relative z-10 transition-all duration-500`}>
        {/* Stepper only visible during onboarding */}
        {(currentStep === 'ghl' || currentStep === 'mp') && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className={`h-2 rounded-full transition-all duration-500 ${currentStep === 'ghl' ? 'w-8 bg-brand-600' : 'w-2 bg-slate-300'}`} />
            <div className={`h-2 rounded-full transition-all duration-500 ${currentStep === 'mp' ? 'w-8 bg-[#009EE3]' : 'w-2 bg-slate-300'}`} />
          </div>
        )}

        {currentStep === 'ghl' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <OAuthPreScreen onConnect={handleGHLConnect} />
          </div>
        )}

        {currentStep === 'mp' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <MercadoPagoPreScreen onConnect={handleMPConnect} />
          </div>
        )}

        {currentStep === 'dashboard' && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <Dashboard 
                onNavigateToGenerateLink={navigateToGenerateLink} 
                onNavigateToHistory={navigateToHistory}
                onNavigateToSettings={navigateToSettings}
                onNavigateToSuperAdmin={navigateToSuperAdmin}
            />
          </div>
        )}

        {currentStep === 'generate_link' && (
            <GenerateLinkScreen onBack={navigateToDashboard} />
        )}

        {currentStep === 'history' && (
            <PaymentHistoryScreen 
                onBack={navigateToDashboard} 
                onNavigateToDetail={navigateToDetail}
            />
        )}
        
        {currentStep === 'payment_detail' && (
            <PaymentDetailScreen onBack={handleBackFromDetail} />
        )}

        {currentStep === 'settings' && (
            <SettingsScreen onBack={navigateToDashboard} />
        )}

        {currentStep === 'superadmin' && (
            <SuperAdminDashboard 
                onLogout={navigateToDashboard} 
                onNavigateToClients={navigateToSuperAdminClients}
                onNavigateToLogs={navigateToSuperAdminLogs}
            />
        )}

        {currentStep === 'superadmin_clients' && (
            <SuperAdminClientList 
                onBack={navigateToSuperAdmin} 
                onNavigateToDetail={navigateToSuperAdminClientDetail}
            />
        )}

        {currentStep === 'superadmin_client_detail' && (
            <SuperAdminClientDetail onBack={navigateToSuperAdminClients} />
        )}

        {currentStep === 'superadmin_logs' && (
            <SuperAdminLogs onBack={navigateToSuperAdmin} />
        )}
      </div>
    </div>
  );
};

export default App;