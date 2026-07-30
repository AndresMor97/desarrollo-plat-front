# 💰 MyMoney - 


---

<div align="center">

![Angular](https://img.shields.io/badge/Angular-19-red?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)
![RxJS](https://img.shields.io/badge/RxJS-7.8-critical?style=for-the-badge&logo=reactivex)

**Aplicación Frontend de Gestión Financiera Personal**

Backend esperado: Flask/Python en `http://localhost:5000`

</div>

---

## 📑 Tabla de Contenidos

1. [¿Qué es esta app?](#qué-es-esta-app)
2. [Tecnologías](#tecnologías)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Guía Rápida para Principiantes](#guía-rápida-para-principiantes)
5. [Componentes](#componentes)
6. [Servicios](#servicios)
7. [Modelos de Datos](#modelos-de-datos)
8. [Flujos de Usuario](#flujos-de-usuario)
9. [Endpoints del API](#endpoints-del-api)
10. [Cómo Ejecutar](#cómo-ejecutar)

---

## 🎯 ¿Qué es esta app?

**FinanzasApp** es una aplicación web para gestionar tus finanzas personales.

### Lo que puedes hacer:

| Función | Descripción |
|---------|-------------|
| 🔐 **Registro/Login** | Crear cuenta e iniciar sesión de forma segura |
| 💰 **Registrar dinero** | Agregar ingresos y gastos con descripción y categoría |
| 💳 **Ver saldo** | Consultar tu saldo total disponible |
| 📜 **Ver historial** | Revisar todas tus transacciones pasadas |
| 📊 **Ver estadísticas** | Gráfico de pastel con tus gastos por categoría |
| 🏷️ **Gestionar categorías** | Crear y eliminar tus propias categorías personalizadas |
| 📈 **Saldos por categoría** | Ver cuánto has ingressado y gastado en cada categoría |

---

## 💻 Tecnologías

| Tecnología | ¿Qué es? | ¿Para qué sirve? |
|------------|----------|------------------|
| **Angular 19** | Framework de JavaScript | Construir páginas web interactivas |
| **TypeScript** | JavaScript mejorado | Código más seguro con tipos |
| **RxJS** | Librería de reactividad | Comunicar componentes entre sí |
| **Chart.js** | Librería de gráficos | Mostrar estadísticas en gráfico de pastel |
| **SCSS** | Estilos avanzados | Diseño visual de la app |

---

## 📁 Estructura del Proyecto

```
Front/
├── src/
│   ├── index.html                    # Punto de entrada HTML
│   ├── main.ts                       # Inicia la aplicación
│   └── app/
│       ├── app.routes.ts             # Rutas de la aplicación
│       ├── auth.guard.ts              # Protege rutas (solo logueados)
│       │
│       └── demo/pages/
│           │
│           ├── auth/                 # 🔐 Autenticación
│           │   ├── login/            # Página de login
│           │   ├── registro/         # Página de registro
│           │   ├── auth.interceptor.ts  # Agrega token a peticiones
│           │   └── service/auth.service.ts
│           │
│           ├── navegacion/            # 🧭 Layout principal
│           │   └── navegacion.component.*  # Barra de navegación + secciones
│           │
│           ├── transaccion/          # 💳 Registrar movimientos
│           │   ├── transaccion.component.*
│           │   └── service/transaccion.service.ts
│           │
│           ├── saldo/                # 💰 Ver saldo
│           │   ├── saldo.component.*
│           │   ├── service/saldo.service.ts
│           │   └── service/alert.service.ts  # Sistema de alertas
│           │
│           ├── categorias/           # 🏷️ Gestionar categorías
│           │   ├── categoria.component.*    # Crear/eliminar categorías
│           │   ├── service/categoria.service.ts
│           │   └── models/categorias.ts
│           │
│           ├── historial/            # 📜 Ver transacciones
│           │   └── historial.component.*
│           │
│           ├── estadisticas/         # 📊 Gráfico de pastel
│           │   └── estadisticas.component.*
│           │
│           ├── usuario/              # 👤 Gestión de usuarios
│           │
│           └── ui-elements/          # 🎨 Componentes reutilizables
│               ├── alert.component.*
│               └── alerts-container.component.*
```

---

## 📚 Guía Rápida para Principiantes

### ¿Qué es Angular?

Angular es un **framework** (herramienta) de Google para construir aplicaciones web. Imagina que es un **kit de construcción**:

- **Componentes** = Piezas visuales (pantallas, botones, formularios)
- **Servicios** = Lógica de negocio (conectar a APIs, procesar datos)
- **Rutas** = Navegación entre páginas sin recargar

### ¿Qué es TypeScript?

TypeScript es JavaScript con **tipos**. Esto evita errores:

```typescript
// ❌ JavaScript permite esto
let saldo = 1000;
saldo = "mil pesos"; // No da error, pero causa problemas

// ✅ TypeScript lo impide
let saldo: number = 1000;
saldo = "mil pesos"; // ❌ Error de tipo!
```

### ¿Qué es RxJS?

Es una librería para manejar datos que llegan **con el tiempo** (como notificaciones).

- **Observable** = Emite datos cuando ocurren eventos
- **Subscription** = Reaccionar cuando llegan datos
- **BehaviorSubject** = Un observable que siempre tiene un valor actual

```typescript
// Ejemplo: Notificaciones del teléfono
miServicio.datos$   // El $ indica que es un Observable
  .subscribe(dato => {
    console.log('Llegó:', dato);
  });
```

---

## 🧩 Componentes

### ¿Qué es un componente?

Es una clase que controla una **parte de la pantalla**. Tiene 3 archivos:

- `.ts` = La lógica (qué hace)
- `.html` = El template (qué se ve)
- `.scss` = Los estilos (cómo se ve)

---

### 1️⃣ NavegacionComponent

Es el **layout principal** después de hacer login. Contiene la barra de navegación inferior.

**Secciones disponibles:**

| Botón | Muestra |
|-------|---------|
| Agregar | TransaccionComponent (formulario de registro) |
| Saldo | SaldoComponent (saldo + saldos por categoría) |
| Historial | HistorialComponent (lista de transacciones) |
| Estadísticas | EstadisticasComponent (gráfico de pastel) |
| Categorías | CategoriaComponent (crear/eliminar categorías) |

---

### 2️⃣ TransaccionComponent

Formulario para registrar ingresos y gastos.

**Campos:**
- **Monto**: Número requerido (mínimo 0.01)
- **Descripción**: Texto opcional
- **Tipo**: Ingreso o Gasto (botones estilo toggle)
- **Categoría**: Selector con las categorías disponibles

---

### 3️⃣ SaldoComponent

Muestra el **saldo total** y los **saldos por categoría**.

**Información que muestra:**
- Saldo disponible (principal, grande)
- Cards por cada categoría con:
  - Total de ingresos
  - Total de gastos
  - Saldo neto (ingresos - gastos)

Se **actualiza automáticamente** cuando se registra una nueva transacción.

---

### 4️⃣ CategoriaComponent

Permite **crear y eliminar** categorías personalizadas.

- Formulario: nombre de la categoría
- Lista de categorías en tarjetas (grid)
- Botón eliminar en cada tarjeta

**Nota:** Las categorías del sistema no se pueden eliminar.

---

### 5️⃣ HistorialComponent

Lista todas las transacciones con:
- Fecha, monto, descripción, categoría
- Botón eliminar con confirmación

---

### 6️⃣ EstadisticasComponent

Gráfico de pastel (Chart.js) mostrando:
- Gastos por categoría
- Porcentaje relativo

---

### 7️⃣ AlertComponent / AlertsContainerComponent

Sistema de **notificaciones** que aparecen en pantalla.

| Tipo | Color | Uso |
|------|-------|-----|
| success | Verde | Confirmaciones |
| danger | Rojo | Errores |
| warning | Amarillo | Advertencias |

---

## 🔧 Servicios

### ¿Qué es un servicio?

Es una clase **compartida** que centraliza lógica de negocio. Solo existe **una instancia** en toda la app.

---

### CategoriaService (`categorias/service/categoria.service.ts`)

```typescript
@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private apiUrl = 'http://localhost:5000/api/categorias';

  // Crear categoría
  crearCategoria(categoria: { nombre: string }): Observable<any> {
    return this.http.post(this.apiUrl, categoria);
  }

  // Eliminar categoría
  eliminarCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Obtener saldos por categoría
  getSaldosPorCategoria(): Observable<any> {
    return this.http.get(`${this.apiUrl}/saldos`);
  }
}
```

---

### TransaccionService (`transaccion/service/transaccion.service.ts`)

Gestiona transacciones y notifica a otros componentes cuando se guarda algo.

```typescript
// Subject para notificar eventos
private transaccionGuardada = new Subject<void>();
public transaccionGuardada$ = this.transaccionGuardada.asObservable();

// Métodos
crearTransaccion(transaccion: Transaccion): Observable<any>
getTransacciones(): Observable<any>
eliminarTransaccion(id: number): Observable<any>
getCategorias(): Observable<any>
getEstadisticasGastos(): Observable<any>

// Notificar a otros componentes
notificarTransaccionGuardada(): void {
  this.transaccionGuardada.next();
}
```

---

### SaldoService (`saldo/service/saldo.service.ts`)

Obtiene el saldo del usuario.

```typescript
getSaldo(idUsuario: number): Observable<any>
```

---

### AlertService (`saldo/service/alert.service.ts`)

Centraliza notificaciones visuales.

```typescript
success('¡Guardado!', 'Movimiento registrado', 3000);
danger('Error al guardar', 'Error', 4000);
```

---

### AuthService (`auth/service/auth.service.ts`)

Maneja autenticación.

```typescript
registro(datos): Observable<any>
login(datos): Observable<any>
isAuthenticated(): boolean  // ¿Hay token?
logout(): void               // Limpia token
getNombre(): string          // Nombre del usuario
```

---

## 📦 Modelos de Datos

### Categoria

```typescript
interface Categoria {
  id_categoria?: number;
  nombre: string;
  id_usuario?: number;
}
```

### Transaccion

```typescript
interface Transaccion {
  monto: number;
  descripcion: string;
  tipo: 'ingreso' | 'gasto';
  id_categoria: number;
}
```

### SaldoCategoria (respuesta del API)

```typescript
interface SaldoCategoria {
  id_categoria: number;
  nombre: string;
  total_ingresos: number;
  total_gastos: number;
  saldo_total: number;  // total_ingresos - total_gastos
}
```

### Alert

```typescript
interface Alert {
  id: string;
  type: 'success' | 'danger' | 'warning' | 'info';
  message: string;
  title?: string;
  dismissible?: boolean;
  duration?: number;
}
```

---

## 🔄 Flujos de Usuario

### Flujo 1: Registrar Transacción

```
Usuario entra a "Agregar"
        ↓
Ve formulario con categorías cargadas
        ↓
Llena: monto, descripción, tipo, categoría
        ↓
Click "Guardar"
        ↓
Backend guarda → responde success
        ↓
AlertService.success() → muestra alerta verde
        ↓
TransaccionService.notificarTransaccionGuardada()
        ↓
SaldoComponent recibe notificación
        ↓
Se actualiza el saldo y los saldos por categoría
```

### Flujo 2: Crear Categoría

```
Usuario entra a "Categorías"
        ↓
Ve formulario + lista de categorías
        ↓
Escribe nombre de categoría
        ↓
Click "Crear Categoría"
        ↓
Backend crea → responde con id
        ↓
Lista se actualiza automáticamente
        ↓
AlertService.success() → "Categoría creada"
```

### Flujo 3: Eliminar Transacción

```
Usuario entra a "Historial"
        ↓
Ve lista de todas las transacciones
        ↓
Click "Eliminar" en una
        ↓
confirm() pregunta: "¿Estás seguro?"
        ↓
Si confirma → DELETE /api/transacciones/{id}
        ↓
Lista se recarga
        ↓
AlertService.success() → "Eliminado"
```

---

## 🌐 Endpoints del API

### Base URL: `http://localhost:5000/api`

**Headers necesarios para peticiones protegidas:**
```
Authorization: Bearer {token}
```

---

### Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/auth/registro` | Registrar usuario | No |
| POST | `/auth/login` | Iniciar sesión | No |

#### POST /auth/registro

```json
// Request
{ "nombre": "Juan", "email": "juan@email.com", "password": "123456" }

// Response (201)
{ "status": "success", "message": "Usuario registrado", "result": { "id": 1 } }
```

#### POST /auth/login

```json
// Request
{ "email": "juan@email.com", "password": "123456" }

// Response (200)
{ "status": "success", "result": { "token": "eyJ...", "nombre": "Juan" } }
```

---

### Transacciones

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/transacciones` | Crear transacción | Sí |
| GET | `/transacciones` | Ver historial | Sí |
| DELETE | `/transacciones/{id}` | Eliminar | Sí |

#### POST /transacciones

```json
// Request
{ "monto": 15000, "descripcion": "Almuerzo", "tipo": "gasto", "id_categoria": 3 }

// Response (201)
{ "status": "success", "message": "Registro exitoso", "result": { "id": 42 } }
```

---

### Saldo

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/saldo` | Saldo total del usuario | Sí |
| GET | `/categorias/saldos` | Saldo por categoría | Sí |

#### GET /saldo

```json
// Response (200)
{
  "status": "success",
  "result": {
    "id_usuario": 1,
    "total_ingresos": 500000,
    "total_gastos": 234000,
    "saldo_actual": 266000
  }
}
```

#### GET /categorias/saldos

```json
// Response (200)
{
  "status": "success",
  "result": [
    {
      "id_categoria": 1,
      "nombre": "Alimentación",
      "total_ingresos": 0,
      "total_gastos": 85000,
      "saldo_total": -85000
    },
    {
      "id_categoria": 2,
      "nombre": "Salario",
      "total_ingresos": 500000,
      "total_gastos": 0,
      "saldo_total": 500000
    }
  ]
}
```

---

### Categorías

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/categorias` | Listar categorías | Sí |
| POST | `/categorias` | Crear categoría | Sí |
| DELETE | `/categorias/{id}` | Eliminar categoría | Sí |

#### GET /categorias

```json
// Response (200)
{
  "status": "success",
  "result": [
    { "id_categoria": 1, "nombre": "Alimentación" },
    { "id_categoria": 2, "nombre": "Salario" }
  ]
}
```

#### POST /categorias

```json
// Request
{ "nombre": "Vacaciones" }

// Response (201)
{ "status": "success", "result": { "id": 5 } }
```

---

### Estadísticas

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/estadisticas/gastos` | Gastos por categoría | Sí |

```json
// Response (200)
{
  "status": "success",
  "result": [
    { "categoria": "Alimentación", "total": 85000 },
    { "categoria": "Transporte", "total": 20000 }
  ]
}
```

---

### Usuarios

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/usuarios` | Listar usuarios | Sí |

---

## 🚀 Cómo Ejecutar

### Requisitos
- Node.js 18+
- npm
- Backend Flask corriendo en `http://localhost:5000`

### Instalación

```bash
# 1. Ir a la carpeta del proyecto
cd Front

# 2. Instalar dependencias
npm install

# 3. Ejecutar
npm start
```

La app estará en `http://localhost:4200`

### Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Servidor de desarrollo (puerto 4200) |
| `npm run build` | Build de producción en `/dist` |
| `npm test` | Ejecutar tests |

---

## 🔮 Mejoras Futuras

1. **Tests E2E** - Cypress/Playwright para probar flujos completos
2. **Variables de entorno** - Mover URLs a `.env`
3. **Dark Mode** - Tema oscuro
4. **Filtros en historial** - Filtrar por fecha, tipo, categoría
5. **Exportar datos** - Exportar a Excel/PDF
6. **PWA** - App instalable en celular

---

<div align="center">

**FinanzasApp** - Angular 19 + TypeScript + RxJS

¿Dudas? Revisa el código en `src/app/`

</div>
