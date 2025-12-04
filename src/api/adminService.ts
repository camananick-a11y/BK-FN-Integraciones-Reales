import apiClient from './apiClient';

// ⚠️ SPRINT 1: Configuración de modo
// true  = Modo Mock (datos falsos para desarrollo de UI)
// false = Modo Backend Real (conecta con http://localhost:8000)
const USE_MOCK = true;

//INTERFACES
export interface SettingsData {
  test_mode: boolean;
  default_tag_paid?: string;
  default_currency?: string;
  min_amount?: string;
  pipeline_id?: string;
  stage_id?: string;
  notify_client?: boolean;
  notify_seller?: boolean;
  alert_errors?: boolean;
  brand_color?: string;
}

export interface CreatePaymentPayload {
  customer_name: string;
  customer_email: string;
  amount: string;
  currency: string;
  description: string;
  ghl_contact_id?: string;
}

// --- BASE DE DATOS MOCK ---
// Estos clientes son SOLO para el buscador (no hay endpoint /api/clients/)
const MOCK_CLIENTS_DB = [
  { id: 1, name: 'Maria Gonzalez', email: 'maria.g@gmail.com', initials: 'MG' },
  { id: 2, name: 'Carlos Rodriguez', email: 'crod@empresa.com', initials: 'CR' },
  { id: 3, name: 'Ana Silva', email: 'ana.silva@hotmail.com', initials: 'AS' },
  { id: 4, name: 'Jorge Perez', email: 'jorgito@tech.co', initials: 'JP' },
  { id: 5, name: 'Lucia Mendez', email: 'lucia.m@studio.com', initials: 'LM' },
];

const MOCK_PAYMENTS = [
  { id: '1', customer_name: 'Maria Gonzalez', customer_email: 'maria.g@gmail.com', amount: '1200.00', currency: 'USD', status: 'approved', created_at: '2023-10-24T14:30:00', payment_method: 'card' },
  { id: '2', customer_name: 'Carlos Rodriguez', customer_email: 'crod@empresa.com', amount: '850.50', currency: 'USD', status: 'pending', created_at: '2023-10-24T12:15:00', payment_method: 'pix' },
  { id: '3', customer_name: 'Ana Silva', customer_email: 'ana.silva@hotmail.com', amount: '2500.00', currency: 'USD', status: 'approved', created_at: '2023-10-23T18:45:00', payment_method: 'transfer' },
];

// SERVICIO PRINCIPAL
const adminService = {

  // 1. LOGIN
  // ⚠️ No existe /api/auth/login/ en el backend
  // Este login siempre retorna éxito (bypass)
  login: async (username: string, password: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('tenant_id', 'sprint1-demo');
        resolve({
          success: true,
          user: username,
          message: 'Login bypass - No hay autenticación en Sprint 1'
        });
      }, 500);
    });
  },

  // GET LOCATIONS
  // ⚠️ No existe endpoint de locations en el backend
  getLocations: async () => {
    if (USE_MOCK) return [{ id: 'loc_1', name: 'Agencia Demo' }];

    console.warn('⚠️ getLocations: Endpoint no disponible');
    return [];
  },

  // BUSCADOR DE CLIENTES
  // ⚠️ NO EXISTE /api/clients/ en el backend
  // SIEMPRE usa datos mock
  searchClients: async (query: string) => {
    if (!query) return [];

    // SIEMPRE retorna datos mock (no hay endpoint)
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = MOCK_CLIENTS_DB.filter(c =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.email.toLowerCase().includes(query.toLowerCase())
        );
        resolve(results);
      }, 300);
    });
  },

  // OBTENER LISTA DE PAGOS
  // ✅ ENDPOINT REAL: GET /api/payments/
  getPayments: async (page = 1, pageSize = 20, status?: string) => {
    if (USE_MOCK) {
      return { results: MOCK_PAYMENTS, count: MOCK_PAYMENTS.length };
    }

    const params: any = {
      page,
      page_size: pageSize
    };

    if (status) {
      params.status = status;
    }

    const response = await apiClient.get('/api/payments/', { params });
    return response.data;
  },

  // CREAR LINK DE PAGO
  // ✅ ENDPOINT REAL: POST /api/payments/generate-link/
  createPaymentLink: async (data: CreatePaymentPayload) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            payment_link: `https://pay.rp-pay.com/l/mock_${Math.floor(Math.random() * 1000)}`,
            id: `pay_${Date.now()}`
          });
        }, 1500);
      });
    }

    const response = await apiClient.post('/api/payments/generate-link/', {
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      amount: data.amount,
      currency: data.currency || 'ARS',
      description: data.description || '',
      ghl_contact_id: data.ghl_contact_id || ''
    });

    return response.data;
  },

  // OBTENER DETALLE COMPLETO
  // ✅ ENDPOINT REAL: GET /api/payments/{id}/
  getPaymentDetails: async (id: string) => {
    if (USE_MOCK) {
      const found = MOCK_PAYMENTS.find(p => p.id === id) || MOCK_PAYMENTS[0];

      return {
        ...found,
        description: 'Asesoría Estratégica - Pack 5 Horas',
        payment_link: `https://pay.rp-pay.com/l/${found.id}`,
        customer_name: found.customer_name,
        customer_email: found.customer_email,
        ghl_contact_id: 'contacto-123',
        mp_preference_id: '',
        mp_payment_id: '',
        events: [
          {
            id: 'event-1',
            event_type: 'link_created',
            payload_json: '{"message": "Payment link created"}',
            created_at: found.created_at
          }
        ]
      };
    }

    const response = await apiClient.get(`/api/payments/${id}/`);
    return response.data;
  },

  // REENVIAR LINK
  // ⚠️ NO EXISTE /api/payments/{id}/resend/ en el backend
  resendLink: async (id: string) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true, message: 'Link enviado por email (Mock)' }), 1000);
      });
    }

    console.warn('⚠️ resendLink: Endpoint no disponible');
    return { success: false, message: 'Función no disponible en Sprint 1' };
  },

  // CONFIGURACIÓN
  // ✅ ENDPOINT REAL: GET /api/settings/
  getSettings: async () => {
    if (USE_MOCK) {
      return {
        test_mode: true,
        default_currency: 'ARS',
        default_tag_paid: 'Pago confirmado',
        min_amount: '10.00',
        brand_color: '#0ea5e9'
      };
    }

    const response = await apiClient.get('/api/settings/');
    return response.data;
  },

  // ✅ ENDPOINT REAL: PUT /api/settings/
  updateSettings: async (settings: SettingsData) => {
    if (USE_MOCK) {
      return { success: true };
    }

    const response = await apiClient.put('/api/settings/', settings);
    return response.data;
  },

  // SUPERADMIN: Listar Tenants
  // ✅ ENDPOINT REAL: GET /api/admin/accounts/
  getAdminAccounts: async (status?: string) => {
    if (USE_MOCK) return [];

    const params: any = {};
    if (status) params.status = status;

    const response = await apiClient.get('/api/admin/accounts/', { params });
    return response.data;
  },

  // SUPERADMIN: Logs de Webhooks
  // ✅ ENDPOINT REAL: GET /api/admin/logs/
  getAdminLogs: async (source?: string, logStatus?: string) => {
    if (USE_MOCK) return [];

    const params: any = {};
    if (source) params.source = source;
    if (logStatus) params.status = logStatus;

    const response = await apiClient.get('/api/admin/logs/', { params });
    return response.data;
  },

  // Stats (no existe endpoint, retorna vacío)
  getStats: async () => {
    return {};
  }
};

export default adminService;