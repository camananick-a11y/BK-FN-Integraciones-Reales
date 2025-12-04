import React, { useState, useEffect, useCallback } from 'react';
import adminService from '../api/adminService';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  //ESTADOS
  // ⚠️ SPRINT 1: Autenticación bypasseada (hardcoded)
  const [user, setUser] = useState<string | null>('Usuario Demo');
  const [token, setToken] = useState<string | null>('demo-token-sprint1');
  const [locations, setLocations] = useState<any[]>([]);
  const [activeLocationId, setActiveLocationId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);  // ⚠️ false para no mostrar loading

  // Cambiar subcuenta activa
  const selectActiveLocation = (id: string) => {
    if (!id) return;
    console.log('📍 Subcuenta activa:', id);
    setActiveLocationId(id);
    localStorage.setItem('active_location_id', id);
  };

  // Cerrar sesión
  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('active_location_id');
    setToken(null);
    setUser(null);
    setLocations([]);
    setActiveLocationId(null);
  };

  // Traer subcuentas del backend (no funcional en Sprint 1)
  const fetchLocations = useCallback(async () => {
    try {
      const data = await adminService.getLocations();
      setLocations(data);
    } catch (error) {
      console.error('Error cargando locations:', error);
      setLocations([]);
    }
  }, []);

  //FUNCIONES PRINCIPALES

  const login = async (username: string, password: string) => {
    try {
      const data: any = await adminService.login(username, password);
      const accessToken = data.access || data.token || 'demo-token';

      localStorage.setItem('admin_token', accessToken);
      setToken(accessToken);
      setUser(username);

      return { success: true };
    } catch (error: any) {
      console.error('Error en login:', error);
      return { success: false, message: 'Error de conexión' };
    }
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,  // ⚠️ Siempre true en Sprint 1
    loading,
    locations,
    activeLocationId,
    selectActiveLocation,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};