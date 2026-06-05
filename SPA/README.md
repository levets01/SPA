# TaskFlowSPA

Una **SPA (Single Page Application)** de gestión de tareas construida con **JavaScript Vanilla**, **HTML**, **CSS** y **Tailwind CSS**. Diseñada como práctica de arquitectura frontend moderna, modularización y routing del lado del cliente sin usar frameworks SPA.

## 🎯 Características principales

- **Autenticación**: Login y registro con persistencia en `localStorage`
- **Gestión de tareas (CRUD)**: Crear, leer, actualizar y eliminar tareas
- **Roles y permisos**: Soporte para `USER` y `ADMIN` con rutas protegidas
- **Panel administrativo**: Gestión de usuarios, cambio de roles (solo para `ADMIN`)
- **Perfil de usuario**: Editar datos personales y eliminar cuenta
- **Routing SPA**: Navegación con `History API` sin recargas de página
- **Backend fake**: `json-server` para simular una API REST

## 📦 Stack tecnológico

- **Frontend**: JavaScript Vanilla (ES Modules)
- **Estilos**: Tailwind CSS v4.3
- **Entorno de desarrollo**: Vite v8
- **Backend simulado**: json-server v1.0-beta
- **Build**: Vite

## 🚀 Instalación y desarrollo

### Requisitos previos

- Node.js >= 16
- npm >= 8

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repo-url>
   cd TaskFlowSPA
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**

   **En terminal 1: Inicia el API fake**
   ```bash
   npm run api
   ```

   **En terminal 2: Inicia Vite**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5174` (o el puerto sugerido por Vite)

### Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia Vite en modo desarrollo |
| `npm run build` | Compila la app para producción |
| `npm run preview` | Previsualiza la build de producción |
| `npm run api` | Inicia json-server en puerto 3000 |

### Ejecutar API y dev juntos (opcional)

Para ejecutar ambos servidores concurrently, instala `concurrently`:

```bash
npm install --save-dev concurrently
```

Luego agrega a `package.json`:

```json
"dev-all": "concurrently \"npm run api\" \"npm run dev\""
```

Usa:
```bash
npm run dev-all
```

## 📂 Estructura del proyecto

```
src/
├── main.js                 # Punto de entrada
├── router/
│   ├── router.js          # Lógica de routing SPA con guards
│   └── routes.js          # Definición de rutas
├── views/
│   ├── home.js            # Landing page
│   ├── auth/              # Autenticación (login, register)
│   ├── tasks/             # Gestión de tareas (lista, formulario)
│   ├── admin/             # Panel administrativo
│   └── app/               # Dashboard principal
├── services/
│   ├── auth.service.js    # Autenticación y sesión
│   ├── task.service.js    # CRUD de tareas
│   └── users.service.js   # CRUD de usuarios
├── styles/
│   └── global.css         # Estilos globales con Tailwind
└── utils/                 # Funciones auxiliares (vacío por ahora)

api/
└── db.json                # Base de datos fake para json-server

index.html                 # Template HTML principal
```

## 🔐 Usuarios de prueba

### Admin
- **Email**: `test@riwi.com`
- **Contraseña**: `12346`
- **Rol**: ADMIN

### Usuario regular
- **Email**: `ana@gmail.com`
- **Contraseña**: `123456`
- **Rol**: USER

## 🔄 Flujo de la aplicación

### Flujo de autenticación

1. Usuario llega a `/` (home page)
2. Hace clic en "Login" → va a `/login`
3. Ingresa credenciales → se valida contra `api/db.json`
4. Si es válido: sesión se guarda en `localStorage` y redirecciona a `/dashboard`
5. Si no: muestra error

### Flujo de rutas

- **Públicas**: `/`, `/login`, `/register`
- **Privadas (requieren autenticación)**: `/dashboard`, `/tasks`, `/tasks-form`, `/profile`
- **Solo Admin**: `/admin`

El router protege automáticamente:
- Redirige usuarios no autenticados a `/login`
- Redirige usuarios sin permisos a `/dashboard`
- Redirige usuarios autenticados fuera de `/register` o `/login` a `/dashboard`

## 📡 API endpoints (json-server)

### Usuarios
- `GET /users` - Obtener todos los usuarios
- `GET /users?email=...` - Buscar usuario por email
- `GET /users/:id` - Obtener usuario por ID
- `POST /users` - Crear usuario
- `PUT /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

### Tareas
- `GET /tasks` - Obtener todas las tareas
- `GET /tasks?userId=...` - Obtener tareas de un usuario
- `GET /tasks/:id` - Obtener tarea por ID
- `POST /tasks` - Crear tarea
- `PUT /tasks/:id` - Actualizar tarea
- `DELETE /tasks/:id` - Eliminar tarea

## 🎨 Diseño y UI

- **Framework CSS**: Tailwind CSS v4.3
- **Componentes**: Botones, formularios, tarjetas con estilos consistentes
- **Diseño responsive**: Optimizado para mobile, tablet y desktop
- **Paleta de colores**: Azul (primary) y variaciones

## ✅ Funcionalidades completadas

- [x] Autenticación (login/register)
- [x] Gestión de tareas (CRUD)
- [x] Roles y permisos (USER/ADMIN)
- [x] Router protegido con guards
- [x] Perfil de usuario (editar/eliminar)
- [x] Panel administrativo (gestión de usuarios)
- [x] Persistencia de sesión
- [x] Backend fake con json-server

## 🚢 Despliegue

### Build para producción

```bash
npm run build
```

Los archivos compilados estarán en `dist/`.

### Opciones de deployment

#### Netlify
1. Conecta tu repositorio a Netlify
2. Configura:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Deploy automático

#### Vercel
1. Importa el proyecto en Vercel
2. Configuración automática para Vite
3. Deploy

#### Servidor estático
```bash
npm run build
# Sirve dist/ con cualquier servidor HTTP
python -m http.server 8000 --directory dist
```

## 🔍 Estructura de datos

### Usuario (api/db.json)
```json
{
  "id": 1,
  "name": "Stevel",
  "lastname": "Iglesias",
  "email": "test@riwi.com",
  "password": "12346",
  "roles": ["ADMIN"]
}
```

### Tarea
```json
{
  "id": 1,
  "title": "Aprender SPA",
  "description": "Entender arquitectura frontend modular",
  "status": "pending",
  "userId": 1,
  "createdAt": "2026-06-01T10:00:00Z"
}
```

## 📚 Principios de arquitectura

### Separación de responsabilidades

- **Vistas**: Renderizado de HTML dinámico
- **Servicios**: Lógica de negocio y comunicación con API
- **Router**: Navegación y control de acceso
- **Utils**: Funciones auxiliares reutilizables

### Modularidad

Cada módulo tiene una responsabilidad clara y bien definida. Se evita el código duplicado y el acoplamiento innecesario.

### Sin frameworks SPA

Se utiliza JavaScript vanilla con `History API` para mantener una experiencia SPA fluida sin dependencias de React, Vue o Angular.

## 🐛 Debugging

### Console del navegador (F12)

Busca logs de:
- Sesión restaurada al iniciar
- Errores de autenticación
- Errores de API

### Archivo db.json

Verifica que los datos estén siendo creados/actualizados correctamente:
```bash
cat api/db.json
```

### Network tab (DevTools)

Revisa solicitudes a `http://localhost:3000` para validar requests/responses.

## 🤝 Contribuir

Este es un proyecto educativo. Si encuentras bugs o tienes sugerencias, abre un issue o PR.

## 📄 Licencia

MIT

---

**Última actualización**: 3 de junio de 2026

Construido con ❤️ como práctica de SPA y arquitectura frontend moderna.
- Sistema de roles y permisos.
- Navegacion SPA con `History API`.
- Renderizado dinamico de vistas.
- Componentes reutilizables.
- CRUD completo de tareas.
- Edicion de perfil del usuario autenticado.
- Eliminacion de la propia cuenta por parte del usuario autenticado.
- Dashboard principal con estadisticas basicas.
- Panel administrativo para usuarios `ADMIN`.
- Consumo de datos desde un backend fake con `json-server`.

## Roles iniciales

### `ADMIN`

- Puede gestionar usuarios.
- Puede visualizar todas las tareas.
- Puede modificar roles y permisos.
- Tiene acceso completo al sistema.

### `USER`

- Puede crear, editar y eliminar sus propias tareas.
- Puede visualizar solo la informacion relacionada con su cuenta.
- Puede editar su propio perfil.
- Puede eliminar su propia cuenta.

## Alcance funcional esperado

La SPA deberia incluir, como minimo, los siguientes modulos o vistas:

- `Login`
- `Dashboard`
- `Mis tareas`
- `Mi perfil`
- `Detalle o formulario de tarea`
- `Administracion de usuarios` solo para `ADMIN`
- `Pagina 404`

## Estructura sugerida

La estructura inicial del proyecto sera sencilla y progresiva:

```text
src/
  main.js
  router/
  views/
  components/
  services/
  utils/
  styles/
```

### Principios de arquitectura

- Cada modulo debe encargarse de una responsabilidad clara.
- Las vistas no deben contener toda la logica de negocio.
- El acceso al backend debe centralizarse en `services`.
- La logica de permisos debe aislarse en el sistema de routing o en utilidades de autorizacion.
- Los componentes compartidos deben ser reutilizables y faciles de identificar.
- Las vistas deben apoyarse en Tailwind CSS para mantener consistencia visual y velocidad de construccion.

## Flujo general de navegacion

1. El usuario entra a la aplicacion.
2. Si no tiene sesion activa, ve la vista de `login`.
3. Tras autenticarse, la sesion se guarda en `localStorage`.
4. El router redirige segun su estado de sesion y permisos.
5. Al recargar la app, la sesion se restaura desde `localStorage`.
6. Las rutas administrativas validan autenticacion y rol `ADMIN`.
7. Al cerrar sesion, los datos de sesion se eliminan del `localStorage`.

## Reglas de negocio base

- Un `USER` solo puede manipular sus propias tareas.
- Un `USER` solo puede editar su propio perfil.
- Un `USER` puede eliminar su propia cuenta.
- Un `ADMIN` puede ver y administrar todas las tareas y usuarios.
- Las rutas privadas no deben renderizarse si no existe una sesion valida.
- El estado de autenticacion debe persistirse de forma controlada en `localStorage`.

## Scripts disponibles

- `npm run dev`: levanta el entorno de desarrollo con Vite.
- `npm run build`: genera la version de produccion.
- `npm run preview`: sirve localmente el build generado.

## Inicio rapido

1. Instala dependencias:

```bash
npm install
```

2. Inicia la app en desarrollo:

```bash
npm run dev
```

3. En paralelo, cuando se agregue el backend fake, inicia `json-server` con el archivo de datos definido para el proyecto.

## Backend fake

La persistencia de datos del sistema estara basada en `json-server`. La idea es simular recursos como:

- `users`
- `tasks`

Ejemplo de responsabilidades del backend fake:

- Consultar usuarios.
- Validar credenciales de manera simulada.
- Consultar y actualizar perfil del usuario autenticado.
- Eliminar la cuenta del usuario autenticado.
- Obtener tareas por usuario.
- Crear, editar y eliminar tareas.
- Permitir consultas globales para administracion.

## Manejo de sesion

Para mantener el proyecto simple y enfocado en el aprendizaje:

- `json-server` se usara para `users` y `tasks`.
- `localStorage` se usara para guardar la sesion activa.
- No se manejara una coleccion `sessions` en el backend fake como parte del flujo principal.

Esto permite practicar autenticacion SPA sin agregar complejidad innecesaria en esta primera etapa.

## Criterios tecnicos del proyecto

- No usar frameworks SPA.
- Mantener una arquitectura simple por capas desde el inicio.
- Evitar mezclar DOM, reglas de negocio y acceso a datos en un mismo archivo.
- Priorizar codigo legible, escalable y facil de mantener.

## Estado actual

La base del proyecto ya esta montada con Vite. La implementacion funcional de la SPA se ira construyendo de forma progresiva, comenzando idealmente por:

1. Configuracion del router.
2. Layout base.
3. Modulo de autenticacion.
4. Guards de rutas.
5. Modulo de tareas.
6. Dashboard.
7. Panel administrativo.

## Licencia

Este proyecto se distribuye bajo la licencia incluida en [`LICENSE`](./LICENSE).
