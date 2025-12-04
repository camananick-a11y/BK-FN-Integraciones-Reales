import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthProvider'; // <--- Importante
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* Envolvemos la App con el AuthProvider para que funcione el contexto */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);