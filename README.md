🚀 RP PAY - Frontend (Sprint 1)
Este repositorio contiene el código fuente del Frontend para el SaaS RP PAY, una plataforma diseñada para generar links de pago con Mercado Pago y sincronizar automáticamente el estado con GoHighLevel (GHL).

Actualmente se encuentra en la Fase de Fundaciones (Sprint 1), operando con una arquitectura preparada para conectarse a un backend Django.

🛠️ Tecnologías Utilizadas
React (v19): Biblioteca principal para la interfaz de usuario.

Vite: Empaquetador de aplicaciones web, elegido por su velocidad extrema en desarrollo.

TypeScript: Superset de JavaScript que añade tipado estático para evitar errores de código.

Tailwind CSS (v3.4): Framework de estilos "utility-first" para un diseño rápido, responsivo y consistente.

Lucide React: Librería de iconos ligera y moderna.

Axios: Cliente HTTP para la comunicación con la API (y manejo de interceptores).

📂 Estructura del Proyecto
A continuación, se detalla qué hace cada carpeta y archivo clave, y por qué está ahí.

1. 🔌 /src/api (Capa de Servicio)
Esta carpeta aísla la lógica de conexión de datos de la interfaz visual.

apiClient.ts: Configuración base de Axios. Aquí definimos la URL del backend (localhost:8000) y los interceptores que inyectan automáticamente el Token y el Tenant-ID en cada petición.

adminService.ts: El archivo más importante del Sprint 1. Contiene todas las funciones (getPayments, createLink, login).

¿Por qué? Aquí vive la variable const USE_MOCK = true;. Actúa como un interruptor: si es true, devuelve datos falsos instantáneamente para pruebas de UI. Si es false, intenta conectar con el Backend real.

2. 🧱 /src/components (Interfaz de Usuario)
Contiene todos los bloques visuales de la aplicación.

/ui:

Button.tsx y Card.tsx: Componentes base reutilizables.

¿Por qué? Para mantener la consistencia. Si queremos cambiar el radio de borde de todas las tarjetas, solo tocamos Card.tsx.

Pantallas Principales:

LoginScreen.tsx: Pantalla de autenticación.

Dashboard.tsx: Panel principal con métricas y menú.

GenerateLinkScreen.tsx: Formulario con validaciones para crear cobros.

PaymentHistoryScreen.tsx: Tabla con filtros y exportación a CSV.

PaymentDetailScreen.tsx: Vista detallada de un pago específico.

SettingsScreen.tsx: Configuración de tokens, entorno (Test/Live) y colores.

Modales:
UserGuideModal.tsx: Ventana emergente con instrucciones para el usuario.

Onboarding:
OAuthPreScreen.tsx y MercadoPagoPreScreen.tsx: Pantallas simuladas para conectar con GHL y MP.

Super Admin:
SuperAdmin...tsx: Vistas exclusivas para la gestión global de clientes (multitenancy).

3. 🔐 /src/context (Estado Global)
AuthContext.tsx: Define la estructura de los datos de sesión (usuario, token, login, logout).

AuthProvider.tsx: Implementa la lógica de autenticación. Envuelve a toda la aplicación para que cualquier pantalla pueda saber si el usuario está logueado o no sin pasar props manualmente ("prop drilling").

4. 🚀 Raíz de /src
App.tsx: El "Router" manual. Decide qué pantalla mostrar basándose en el estado actual (currentStep) y maneja la navegación. También verifica si estás autenticado; si no, te manda al Login.

index.tsx: Punto de entrada de React. Aquí se "monta" la aplicación en el HTML y se inyectan los estilos globales y el AuthProvider.

index.css: Archivo de estilos globales donde se importan las directivas de Tailwind (@tailwind base, etc.).

5. ⚙️ Archivos de Configuración (Raíz del proyecto)
tailwind.config.js: El cerebro del diseño. Aquí definimos los colores corporativos (colors: { brand: ... }) para que toda la app tenga la misma paleta visual.

postcss.config.js: Traductor necesario para que Vite entienda y procese Tailwind CSS.

vite.config.ts: Configuración del servidor de desarrollo.

package.json: Lista de dependencias y scripts del proyecto.


Cómo correr el proyecto
Instalar dependencias:

Bash

npm install
Iniciar servidor de desarrollo:

Bash

npm run dev
Cambiar a modo Real: Ir a src/api/adminService.ts y cambiar:

TypeScript

const USE_MOCK = false;
Estado del Proyecto: Sprint 1 Completado.