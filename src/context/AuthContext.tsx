import { createContext } from 'react';

// Definimos qué tipo de datos tendrá nuestro contexto
export interface AuthContextType {
  user: string | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  locations: any[];
  activeLocationId: string | null;
  selectActiveLocation: (id: string) => void;
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

// Creamos el contexto vacío
export const AuthContext = createContext<AuthContextType>(null!);