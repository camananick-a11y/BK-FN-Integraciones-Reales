import axios from 'axios';

// URL del Backend - Sprint 1
// ⚠️ SIN /api al final porque los endpoints ya incluyen /api/ en sus rutas
const API_URL = 'http://localhost:8000';

// ⚠️ Tenant ID - Reemplaza este UUID con el que generes en el backend
// Para crear un tenant, ejecuta: docker compose exec backend python manage.py shell
// Luego: Account.objects.create(name="Frontend Demo", owner_email="test@test.com", status="active")
const TENANT_ID_REAL = '9ff2ae02-ddb0-41d6-a42c-958c950ed1f1';
//c7f56675-8d78-40aa-89b4-690c0327c60a
//9ff2ae02-ddb0-41d6-a42c-958c950ed1f1

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Forzamos el ID aquí directamente para asegurar que llegue
    'X-Tenant-ID': TENANT_ID_REAL
  },
});

// ⚠️ SPRINT 1: Interceptor JWT comentado (no hay autenticación todavía)
// TODO: Descomentar en Sprint 2 cuando se implemente JWT
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('admin_token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default apiClient;