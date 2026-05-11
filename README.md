# 💰 FinanzasApp - Guía Completa para Desarrolladores

> **¿Primera vez viendo Angular? ¿No sabes qué es RxJS? Tranquilo, esta documentación te explica TODO como si nunca hubieras programado.**

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

1. [¿Qué es esta aplicación?](#qué-es-esta-aplicación)
2. [Arquitectura General](#arquitectura-general)
3. [Estructura de Carpetas](#estructura-de-carpetas)
4. [Guía para Principiantes](#guía-para-principiantes)
5. [Componentes (Explicados)](#componentes-explicados)
6. [Servicios (Explicados)](#servicios-explicados)
7. [Modelos de Datos](#modelos-de-datos)
8. [Flujo de la Aplicación](#flujo-de-la-aplicación)
9. [Rutas y Navegación](#rutas-y-navegación)
10. [API del Backend](#api-del-backend)
11. [Instalación y Ejecución](#instalación-y-ejecución)
12. [Glosario de Términos](#glosario-de-términos)

---

## 🎯 ¿Qué es esta aplicación?

**FinanzasApp** es una aplicación web que te permite:

- ✅ **Registrarte e Iniciar Sesión** - Crear cuenta y acceder de forma segura
- ✅ **Registrar Dinero** - Agregar ingresos y gastos con descripción
- ✅ **Ver tu Saldo** - Consultar cuánto dinero tienes disponible
- ✅ **Ver Historial** - Revisar todas tus transacciones pasadas
- ✅ **Ver Estadísticas** - Gráfico de pastel mostrando en qué gastas más

### Tecnologías Usadas

| Tecnología | ¿Qué es? | ¿Para qué sirve? |
|------------|----------|------------------|
| **Angular 19** | Framework de JavaScript | Herramienta para construir páginas web interactivas |
| **TypeScript** | JavaScript con tipos | Hace el código más seguro y fácil de entender |
| **RxJS** | Librería de reactividad | Permite que los componentes se comuniquen entre sí |
| **Chart.js** | Librería de gráficos | Muestra las estadísticas en un gráfico de pastel |
| **SCSS/CSS** | Estilos | Da color y diseño a la aplicación |

---

## 🏗️ Arquitectura General

### ¿Cómo está organizada la aplicación?

```
┌─────────────────────────────────────────────────────────────┐
│                      NAVEGADOR WEB                          │
│  (Lo que ve el usuario: login, botones, gráficos, etc.)     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    ANGULAR (Frontend)                       │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ COMPONENTES │  │  SERVICIOS  │  │   RUTAS     │          │
│  │ (Visuales)  │  │  (Lógica)   │  │(Navegación) │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│         │                │                │                 │
│         └────────────────┼────────────────┘                 │
│                          │                                  │
│                          ▼                                  │
│              ┌───────────────────────┐                      │
│              │   HttpClient (API)    │                      │
│              │   Hace peticiones HTTP │                     │
│              └───────────────────────┘                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                 BACKEND: Flask (Puerto 5000)                │
│              (Recibe peticiones, procesa, responde)         │
└─────────────────────────────────────────────────────────────┘
```

### Conceptos Clave

1. **Componente**: Es una "pantalla" o parte visual de la aplicación. Ejemplo: el formulario de login.

2. **Servicio**: Es una clase que maneja la lógica de negocio (conectar al API, guardar datos).

3. **RxJS/BehaviorSubject**: Forma en que los componentes se comunican sin estar directamente conectados.

4. **Lazy Loading**: Las páginas se cargan solo cuando el usuario las necesita.

---

## 📁 Estructura de Carpetas

```
Front/
│
├── angular.json              # ⚙️ Configuración de Angular (cómo compilar)
├── package.json              # 📦 Lista de dependencias npm
├── tsconfig.json             # 🔧 Configuración de TypeScript
├── src/                      # 📂 Código fuente principal
│   ├── index.html            # 📄 HTML principal (punto de entrada)
│   ├── main.ts               # 🚀 Código que inicia la aplicación
│   ├── styles.css            # 🎨 Estilos globales (afectan a todo)
│   └── app/                  # 💻 Toda la lógica de la aplicación
│       │
│       ├── app.component.ts      # 🏠 Componente raíz (padre de todo)
│       ├── app.config.ts          # ⚙️ Configuración de providers
│       ├── app.routes.ts          # 🛣️ Definición de rutas
│       ├── auth.guard.ts          # 🔒 Protege rutas (solo usuarios logueados)
│       │
│       └── demo/pages/            # 📂 MODULOS DE PÁGINAS
│           │
│           ├── auth/               # 🔐 MÓDULO DE AUTENTICACIÓN
│           │   ├── auth.interceptor.ts  # Agrega token a peticiones HTTP
│           │   ├── login/                 # 📝 Página de inicio de sesión
│           │   ├── registro/              # 📝 Página de registro
│           │   └── service/auth.service.ts    # Lógica de autenticación
│           │
│           ├── navegacion/          # 🧭 LAYOUT PRINCIPAL (post-login)
│           │   ├── navegacion.component.ts    # Barra de navegación + secciones
│           │   ├── navegacion.component.html
│           │   └── navegacion.component.css
│           │
│           ├── transaccion/         # 💳 MÓDULO DE TRANSACCIONES
│           │   ├── transaccion.component.*   # Formulario de registro
│           │   ├── service/transaccion.service.ts
│           │   └── models/transaccion.ts
│           │
│           ├── saldo/               # 💰 MÓDULO DE SALDO
│           │   ├── saldo.component.*     # Muestra el saldo actual
│           │   ├── service/saldo.service.ts
│           │   ├── service/alert.service.ts   # Sistema de alertas
│           │   └── models/saldo.ts
│           │
│           ├── historial/           # 📜 MÓDULO DE HISTORIAL
│           │   ├── historial.component.*   # Lista de transacciones
│           │   └── historial.component.css
│           │
│           ├── estadisticas/         # 📊 MÓDULO DE ESTADÍSTICAS
│           │   ├── estadisticas.component.*   # Gráfico de pastel
│           │   └── estadisticas.component.css
│           │
│           ├── usuario/              # 👤 MÓDULO DE USUARIO (en desarrollo)
│           │   ├── usuario.component.*
│           │   ├── service/usuario.service.component.ts
│           │   └── models/usuario.ts
│           │
│           ├── categorias/          # 🏷️ MODELOS DE CATEGORÍAS
│           │   └── models/categorias.ts
│           │
│           └── ui-elements/         # 🎨 COMPONENTES REUTILIZABLES
│               ├── alert.component.*      # Una alerta individual
│               └── alerts-container.component.*  # Contenedor de alertas
```

---

## 📚 Guía para Principiantes

### ¿Qué es Angular?

**Angular** es un framework (herramienta) creado por Google para construir aplicaciones web de una sola página (SPA - Single Page Application).

Imagina que Angular es como un **kit de construcción**:

- Te da piezas pre-hechas (componentes)
- Te ayuda a organizarte (módulos)
- Te facilita la comunicación entre piezas (services)
- Maneja la navegación sin recargar la página (router)

### ¿Qué es TypeScript?

**TypeScript** es JavaScript mejorado. Agrega "tipos" a las variables.

```javascript
// JavaScript (sin tipos)
let saldo = 1000;
saldo = "mil pesos"; // Esto funciona, pero puede causar errores

// TypeScript (con tipos)
let saldo: number = 1000;
saldo = "mil pesos"; // ❌ Error! TypeScript dice que esto no tiene sentido
```

### ¿Qué es RxJS?

**RxJS** es una librería que ayuda a manejar datos que "fluyen" con el tiempo.

Ejemplo de la vida real: Las notificaciones de tu teléfono.

- No sabes cuándo llegará una notificación
- Pero cuando llega, tu teléfono reacciona
- RxJS hace algo similar: "observable" = la notificación, "subscriber" = tu reacción

```typescript
// Ejemplo simple:
miServicio.datos$  // El $ indica que es un observable (flujo de datos)
  .subscribe(dato => {
    // Esta función se ejecuta cada vez que llega un nuevo dato
    console.log('Llegó:', dato);
  });
```

### ¿Qué es un BehaviorSubject?

Es un tipo especial de observable que **siempre tiene un valor** (aunque no haya nadie escuchando).

Piensa en él como una **variable que avisa cuando cambia**.

```typescript
// Crear un BehaviorSubject con valor inicial 2
private usuarioActual = new BehaviorSubject<number>(2);

// Cualquier componente puede "suscribirse" y será notificado cuando cambie
this.usuarioActual.subscribe(id => {
  console.log('El usuario cambió a:', id);
});

// Cambiar el valor - TODOS los suscriptores serán notificados
this.usuarioActual.next(5); // Output: "El usuario cambió a: 5"
```

---

## 🧩 Componentes Explicados

> **¿Qué es un componente?** Es una clase de TypeScript que controla una parte de la pantalla HTML. Cada componente tiene:
> - `.ts` - La lógica (qué hace)
> - `.html` - El template (qué se ve)
> - `.css/scss` - Los estilos (cómo se ve)

---

### 1️⃣ LoginComponent (`auth/login/`)

**¿Qué hace?** Permite al usuario iniciar sesión.

**Flujo:**
```
Usuario escribe email + password
        ↓
Usuario hace click en "Ingresar"
        ↓
AuthService.login() envía datos al backend
        ↓
Backend responde con token
        ↓
Token se guarda en localStorage (memoria del navegador)
        ↓
NavegacionComponent se muestra
```

**Código clave:**
```typescript
// src/app/demo/pages/auth/login/login.component.ts

onSubmit() {
  // Validar que el formulario esté completo
  if (this.loginForm.valid) {
    this.isLoading = true; // Mostrar indicador de carga

    // Llamar al servicio de autenticación
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        // Guardar token en el navegador
        localStorage.setItem('auth_token', res.result.token);
        localStorage.setItem('auth_nombre', res.result.nombre);

        // Ir a la página principal
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = 'Email o contraseña incorrectos';
        this.isLoading = false;
      }
    });
  }
}
```

---

### 2️⃣ NavegacionComponent (`navegacion/`)

**¿Qué hace?** Es el **layout principal** después de hacer login. Contiene:

- Una barra de navegación inferior con 4 secciones
- Rendering condicional de componentes según la sección activa

**Secciones disponibles:**

| Sección | Icono | Componente Mostrado |
|---------|-------|---------------------|
| Movimiento | 💰 | TransaccionComponent |
| Saldo | 💳 | SaldoComponent |
| Historial | 📜 | HistorialComponent |
| Estadísticas | 📊 | EstadisticasComponent |

**¿Cómo funciona el cambio de sección?**

```typescript
// src/app/demo/pages/navegacion/navegacion.component.ts

// Tipo de sección válida
type SeccionActiva = 'movimiento' | 'saldo' | 'historial' | 'estadisticas';

// Sección que se está mostrando actualmente
seccionActiva: SeccionActiva = 'movimiento';

// Método para cambiar de sección
mostrarSeccion(seccion: SeccionActiva) {
  this.seccionActiva = seccion; // Angular detecta el cambio y actualiza el HTML
}
```

**Template (HTML):**
```html
<!-- Barra de navegación inferior -->
<nav class="navbar">
  <button (click)="mostrarSeccion('movimiento')">💰 Movimiento</button>
  <button (click)="mostrarSeccion('saldo')">💳 Saldo</button>
  <button (click)="mostrarSeccion('historial')">📜 Historial</button>
  <button (click)="mostrarSeccion('estadisticas')">📊 Estadísticas</button>
</nav>

<!-- Área donde se muestra el componente activo -->
<div class="contenido">
  @if (seccionActiva === 'movimiento') {
    <app-transaccion />
  }
  @if (seccionActiva === 'saldo') {
    <app-saldo />
  }
  @if (seccionActiva === 'historial') {
    <app-historial />
  }
  @if (seccionActiva === 'estadisticas') {
    <app-estadisticas />
  }
</div>
```

---

### 3️⃣ TransaccionComponent (`transaccion/`)

**¿Qué hace?** Formulario para registrar ingresos y gastos.

**Campos del formulario:**

| Campo | Tipo | Validación | Ejemplo |
|-------|------|------------|---------|
| Monto | number | Requerido, mínimo 0.01 | 15000 |
| Descripción | text | Opcional | "Almuerzo" |
| Tipo | select | Requerido | "ingreso" o "gasto" |
| Categoría | select | Requerido | (viene del API) |

**Código clave:**
```typescript
// src/app/demo/pages/transaccion/transaccion.component.ts

// Crear formulario reactivo con validaciones
transaccionForm = this.fb.group({
  monto: ['', [Validators.required, Validators.min(0.01)]],
  descripcion: [''],
  tipo: ['ingreso', Validators.required],
  id_categoria: ['', Validators.required]
});

// Cargar categorías al iniciar
ngOnInit() {
  this.transaccionService.getCategorias().subscribe({
    next: (res) => this.categorias = res.result
  });
}

// Cuando usuario envía el formulario
onSubmit() {
  if (this.transaccionForm.valid) {
    this.transaccionService.crearTransaccion(this.transaccionForm.value)
      .subscribe({
        next: () => {
          this.alertService.success('¡Guardado!', 'Movimiento registrado');
          this.transaccionService.notificarTransaccionGuardada(); // Avisa a SaldoComponent
          this.transaccionForm.reset({ tipo: 'ingreso' }); // Limpia el form
        }
      });
  }
}
```

---

### 4️⃣ SaldoComponent (`saldo/`)

**¿Qué hace?** Muestra el saldo actual del usuario y se **actualiza automáticamente** cuando se registra una nueva transacción.

**¿Cómo se actualiza solo?**

```typescript
// src/app/demo/pages/saldo/saldo.component.ts

ngOnInit() {
  // ESCUCHA cambios en el usuario actual
  this.usuarioService.usuarioActual$.pipe(takeUntil(this.destroy$))
    .subscribe(id => {
      this.obtenerSaldo();
    });

  // ESCUCHA cuando se guarda una transacción
  this.transaccionService.transaccionGuardada$.pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      this.obtenerSaldo(); // Recarga el saldo
    });
}

obtenerSaldo() {
  this.saldoService.getSaldo(this.usuarioActual).subscribe({
    next: (res) => {
      this.saldoActual = res.result.saldo_actual;
    }
  });
}
```

**¿Por qué funciona?** Porque usa el **patrón Observable**:

1. `TransaccionService` tiene un `Subject` que "dispara" cuando hay nueva transacción
2. `SaldoComponent` está "suscrito" a ese Subject
3. Cuando ocurre algo, el Subject notifica a todos los suscriptores
4. Cada suscriptor reacciona como necesita

---

### 5️⃣ HistorialComponent (`historial/`)

**¿Qué hace?** Muestra una lista de todas las transacciones y permite **eliminar** registros.

**Funcionalidades:**
- Lista todas las transacciones del usuario
- Botón de eliminar con confirmación
- Muestra tipo (ingreso/gasto) con colores distintos

**Código clave de eliminación:**
```typescript
// src/app/demo/pages/historial/historial.component.ts

confirmarEliminar(id: number) {
  // Mostrar confirmación al usuario
  if (confirm('¿Estás seguro de eliminar esta transacción?')) {
    this.transaccionService.eliminarTransaccion(id).subscribe({
      next: () => {
        this.alertService.success('Eliminado', 'Transacción borrada');
        this.cargarHistorial(); // Recargar la lista
      }
    });
  }
}
```

---

### 6️⃣ EstadisticasComponent (`estadisticas/`)

**¿Qué hace?** Muestra un **gráfico de pastel** (pie chart) con los gastos por categoría.

**Tecnología:** Chart.js + ng2-charts

```typescript
// src/app/demo/pages/estadisticas/estadisticas.component.ts

ngOnInit() {
  this.transaccionService.getEstadisticas().subscribe({
    next: (res) => {
      this.actualizarGrafico(res.result);
    }
  });
}

actualizarGrafico(datos: { categoria: string; total: number }[]) {
  // Configurar datos del gráfico
  this.graficoData = {
    labels: datos.map(d => d.categoria),           // ["Comida", "Transporte", ...]
    datasets: [{
      data: datos.map(d => d.total),                // [150000, 50000, ...]
      backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'] // Colores
    }]
  };
}
```

---

### 7️⃣ AlertComponent y AlertsContainerComponent (`ui-elements/`)

**¿Qué hace?** Sistema de notificaciones/alertas visuales.

**Tipos de alerta:**

| Tipo | Color | Uso |
|------|-------|-----|
| success | Verde | Confirmaciones exitosas |
| danger | Rojo | Errores |
| warning | Amarillo | Advertencias |
| info | Azul | Información |

**¿Cómo funciona?**

```
AuthService / TransaccionService / Cualquier servicio
        │
        ▼
AlertService.addAlert('success', '¡Guardado!')
        │
        ▼
AlertsContainerComponent (que está en NavegacionComponent)
        │
        ▼
Muestra la alerta en pantalla
        │
        ▼
Después de X segundos, desaparece automáticamente
```

---

## 🔧 Servicios Explicados

> **¿Qué es un servicio?** Es una clase que centraliza la lógica de negocio y la comunicación con el backend. Los servicios son "singletons" (solo existe uno en toda la app).

---

### 1️⃣ AuthService (`auth/service/auth.service.ts`)

**¿Qué hace?** Maneja todo lo relacionado a autenticación (registro, login, logout).

```typescript
@Injectable({ providedIn: 'root' }) // Angular crea una sola instancia para toda la app
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // Registrar nuevo usuario
  registro(datos: { nombre: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, datos);
  }

  // Iniciar sesión
  login(datos: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, datos);
  }

  // Verificar si está logueado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_nombre');
  }
}
```

---

### 2️⃣ TransaccionService (`transaccion/service/transaccion.service.ts`)

**¿Qué hace?** Gestiona todas las operaciones relacionadas a transacciones.

```typescript
@Injectable({ providedIn: 'root' })
export class TransaccionService {
  private apiUrl = 'http://localhost:5000/api/transacciones';

  // Subject para notificar eventos a otros componentes
  private transaccionGuardada = new Subject<void>();
  public transaccionGuardada$ = this.transaccionGuardada.asObservable();

  constructor(private http: HttpClient) {}

  // Obtener todas las transacciones
  getTransacciones(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Crear nueva transacción
  crearTransaccion(transaccion: Transaccion): Observable<any> {
    return this.http.post(this.apiUrl, transaccion);
  }

  // Eliminar transacción
  eliminarTransaccion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Obtener categorías para el select
  getCategorias(): Observable<any> {
    return this.http.get('http://localhost:5000/api/categorias');
  }

  // Obtener estadísticas de gastos
  getEstadisticas(): Observable<any> {
    return this.http.get('http://localhost:5000/api/estadisticas/gastos');
  }

  // Notificar a otros componentes que se guardó algo
  notificarTransaccionGuardada(): void {
    this.transaccionGuardada.next(); // "Dispara" el evento
  }
}
```

---

### 3️⃣ SaldoService (`saldo/service/saldo.service.ts`)

**¿Qué hace?** Obtiene el saldo del usuario desde el backend.

```typescript
@Injectable({ providedIn: 'root' })
export class SaldoService {
  private apiUrl = 'http://localhost:5000/api/saldo';

  constructor(private http: HttpClient) {}

  getSaldo(idUsuario: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?id_usuario=${idUsuario}`);
  }
}
```

---

### 4️⃣ AlertService (`saldo/service/alert.service.ts`)

**¿Qué hace?** Centraliza la gestión de alertas/notificaciones.

```typescript
@Injectable({ providedIn: 'root' })
export class AlertService {
  // BehaviorSubject que mantiene la lista actual de alertas
  private alertsSubject = new BehaviorSubject<Alert[]>([]);
  public alerts$ = this.alertsSubject.asObservable();

  // Métodos de conveniencia
  success(message: string, title?: string, duration = 3000) {
    this.addAlert('success', message, title, duration);
  }

  danger(message: string, title?: string, duration = 5000) {
    this.addAlert('danger', message, title, duration);
  }

  // Agregar alerta a la lista
  private addAlert(type: string, message: string, title?: string, duration?: number) {
    const alert: Alert = {
      id: Date.now().toString(),
      type: type as any,
      message,
      title,
      dismissible: true,
      duration
    };

    // Agregar a la lista actual
    const current = this.alertsSubject.value;
    this.alertsSubject.next([...current, alert]);

    // Auto-eliminar después de duration ms
    if (duration) {
      setTimeout(() => this.removeAlert(alert.id), duration);
    }
  }

  removeAlert(id: string) {
    const current = this.alertsSubject.value;
    this.alertsSubject.next(current.filter(a => a.id !== id));
  }
}
```

---

### 5️⃣ UsuarioService (`usuario/service/usuario.service.component.ts`)

**¿Qué hace?** Gestiona el usuario actualmente seleccionado.

```typescript
@Injectable({ providedIn: 'root' })
export class UsuarioService {
  // BehaviorSubject que mantiene el ID del usuario activo
  private usuarioActualSubject = new BehaviorSubject<number>(2);
  public usuarioActual$ = this.usuarioActualSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any> {
    return this.http.get('http://localhost:5000/api/usuarios');
  }

  setUsuarioActual(id: number): void {
    this.usuarioActualSubject.next(id); // Notifica a todos los suscriptores
  }

  getUsuarioActual(): number {
    return this.usuarioActualSubject.value; // Obtener valor actual sin suscribirse
  }
}
```

---

## 📦 Modelos de Datos

> **¿Qué es un modelo/interfaz?** Es la "forma" que deben tener los datos. TypeScript las usa para verificar que la información tiene la estructura correcta.

---

### Transaccion (`transaccion/models/transaccion.ts`)

```typescript
export interface Transaccion {
  monto: number;           // Ejemplo: 15000
  descripcion: string;      // Ejemplo: "Almuerzo"
  tipo: 'ingreso' | 'gasto'; // Solo puede ser una de estas dos opciones
  id_categoria: number;    // Ejemplo: 3
}
```

**Ejemplo de uso:**
```typescript
const miTransaccion: Transaccion = {
  monto: 5000,
  descripcion: 'Café',
  tipo: 'gasto',
  id_categoria: 2
};
```

---

### Saldo (`saldo/models/saldo.ts`)

```typescript
export interface Saldo {
  total: number; // Ejemplo: 150000
}
```

---

### Usuario (`usuario/models/usuario.ts`)

```typescript
export interface Usuario {
  id_usuario: number;
  nombre: string;
  email: string;
  creado_en?: string; // El ? significa que es opcional
}
```

---

### Categoria (`categorias/models/categorias.ts`)

```typescript
export interface Categoria {
  id_categoria: number;
  nombre: string;      // Ejemplo: "Comida"
  tipo: string;        // Ejemplo: "gasto"
}
```

---

### Alert (`saldo/service/alert.service.ts`)

```typescript
export interface Alert {
  id: string;                      // Identificador único
  type: 'success' | 'danger' | 'warning' | 'info'; // Tipo de alerta
  title?: string;                 // Título opcional
  message: string;                 // Mensaje a mostrar
  dismissible?: boolean;           // Si se puede cerrar manual
  duration?: number;               // Ms antes de auto-cerrar
}
```

---

## 🔄 Flujo de la Aplicación

### Flujo 1: Registro de Usuario

```
┌──────────────────────────────────────────────────────────────┐
│                    REGISTRO DE USUARIO                       │
└──────────────────────────────────────────────────────────────┘

  1. Usuario abre /registro
         │
         ▼
  2. RegistroComponent muestra formulario
         │
         ▼
  3. Usuario llena: nombre, email, password, confirmar password
         │
         ▼
  4. Usuario hace click en "Registrarse"
         │
         ▼
  5. AuthService.registro() → POST /api/registro
         │
         ▼
  6. Backend crea usuario, responde { status: "success" }
         │
         ▼
  7. Router redirige a /login
         │
         ▼
  8. Usuario ve pantalla de login para iniciar sesión
```

---

### Flujo 2: Login

```
┌──────────────────────────────────────────────────────────────┐
│                       INICIO DE SESIÓN                       │
└──────────────────────────────────────────────────────────────┘

  1. Usuario abre /login
         │
         ▼
  2. LoginComponent muestra formulario
         │
         ▼
  3. Usuario ingresa email + password
         │
         ▼
  4. Usuario click en "Ingresar"
         │
         ▼
  5. AuthService.login() → POST /api/login
         │
         ▼
  6. Backend valida y responde:
     {
       "status": "success",
       "result": {
         "token": "eyJhbGciOiJIUzI1NiIs...",
         "nombre": "Juan García"
       }
     }
         │
         ▼
  7. Token guardado en localStorage del navegador
         │
         ▼
  8. Router.navigate(['/home'])
         │
         ▼
  9. AuthGuard verifica token (¿existe? ¿válido?)
         │
         ▼
  10. NavegacionComponent se muestra
```

---

### Flujo 3: Registrar Transacción

```
┌──────────────────────────────────────────────────────────────┐
│                 REGISTRAR TRANSACCIÓN                       │
└──────────────────────────────────────────────────────────────┘

  1. NavegacionComponent muestra por defecto sección "movimiento"
         │
         ▼
  2. TransaccionComponent visible
         │
         ▼
  3. ngOnInit() carga categorías desde GET /api/categorias
         │
         ▼
  4. Usuario selecciona:
     - Monto: 15000
     - Descripción: "Almuerzo"
     - Tipo: "gasto"
     - Categoría: "Comida"
         │
         ▼
  5. Usuario click en "Guardar Movimiento"
         │
         ▼
  6. TransaccionService.crearTransaccion() → POST /api/transacciones
         │
         ▼
  7. Backend guarda, responde { status: "success" }
         │
         ▼
  8. AlertService.success() → muestra alerta verde "¡Guardado!"
         │
         ▼
  9. TransaccionService.notificarTransaccionGuardada()
     → transaccionGuardada$.next()
         │
         ▼
  10. SaldoComponent (que está escuchando) recibe notificación
         │
         ▼
  11. SaldoComponent llama getSaldo() → GET /api/saldo
         │
         ▼
  12. Saldo actualizado en pantalla
         │
         ▼
  13. Formulario se limpia (reset)
```

---

### Flujo 4: Ver Historial y Eliminar

```
┌──────────────────────────────────────────────────────────────┐
│                    VER Y ELIMINAR HISTORIAL                  │
└──────────────────────────────────────────────────────────────┘

  1. Usuario click en "Historial" (navegación inferior)
         │
         ▼
  2. NavegacionComponent.seccionActiva = 'historial'
         │
         ▼
  3. HistorialComponent visible
         │
         ▼
  4. ngOnInit() → TransaccionService.getTransacciones()
         │
         ▼
  5. Backend responde lista de transacciones
         │
         ▼
  6. HistorialComponent muestra la lista
         │
         ▼
  7. Usuario click en botón "Eliminar" de una transacción
         │
         ▼
  8. confirm() pregunta: "¿Estás seguro?"
         │
         ▼
  9. Si usuario confirma → DELETE /api/transacciones/{id}
         │
         ▼
  10. Lista se recarga
         │
         ▼
  11. AlertService.success() → "Eliminado correctamente"
```

---

## 🛣️ Rutas y Navegación

### Configuración de Rutas (`app.routes.ts`)

```typescript
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige raíz a login

  // Rutas de autenticación (públicas)
  {
    path: 'login',
    loadComponent: () => import('./demo/pages/auth/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'registro',
    loadComponent: () => import('./demo/pages/auth/registro/registro.component')
      .then(m => m.RegistroComponent)
  },

  // Ruta protegida (solo usuarios logueados)
  {
    path: 'home',
    loadComponent: () => import('./demo/pages/navegacion/navegacion.component')
      .then(m => m.NavegacionComponent),
    canActivate: [AuthGuard] // ← Verifica autenticación
  },

  // Cualquier otra ruta → redirige a login
  { path: '**', redirectTo: '/login' }
];
```

### ¿Qué es el AuthGuard?

Es un "portero" que protege las rutas:

```typescript
// src/app/auth.guard.ts
export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si existe token en localStorage
  if (authService.isAuthenticated()) {
    return true; // Dejar pasar
  } else {
    return router.navigate(['/login']); // Redirigir a login
  }
};
```

### Lazy Loading Explicado

**Sin lazy loading:** Todo el código se carga al iniciar → lento

**Con lazy loading:**
```
Usuario entra a /login
        │
        ↓
Solo se carga el código de LoginComponent
        │
        ↓
Usuario hace login y va a /home
        │
        ↓
AHORA se carga el código de NavegacionComponent
        │
        ↓
Usuario click en "Estadísticas"
        │
        ↓
Se carga el código de EstadisticasComponent (si no estaba cargado)
```

**Ventaja:** La app inicia más rápido porque no carga todo de golpe.

---

## 🌐 API del Backend

> **Nota:** Esta aplicación espera que el backend esté corriendo en `http://localhost:5000`. Los siguientes endpoints son los que la aplicación espera.

---

### Autenticación

#### POST /api/registro
Registrar un nuevo usuario.

```bash
curl -X POST http://localhost:5000/api/registro \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Juan García", "email": "juan@email.com", "password": "123456"}'
```

**Respuesta:**
```json
{
  "status": "success",
  "message": "Usuario registrado correctamente"
}
```

---

#### POST /api/login
Iniciar sesión.

```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email": "juan@email.com", "password": "123456"}'
```

**Respuesta:**
```json
{
  "status": "success",
  "result": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "nombre": "Juan García"
  }
}
```

---

### Transacciones

#### GET /api/transacciones
Obtener todas las transacciones.

**Headers necesarios:**
```
Authorization: Bearer {token}
```

**Respuesta:**
```json
{
  "status": "success",
  "result": [
    {
      "id": 1,
      "id_usuario": 1,
      "monto": 15000,
      "descripcion": "Almuerzo",
      "tipo": "gasto",
      "id_categoria": 3,
      "fecha": "2026-04-27T12:00:00Z"
    }
  ]
}
```

---

#### POST /api/transacciones
Crear una nueva transacción.

```bash
curl -X POST http://localhost:5000/api/transacciones \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "monto": 15000,
    "descripcion": "Almuerzo",
    "tipo": "gasto",
    "id_categoria": 3
  }'
```

**Respuesta:**
```json
{
  "status": "success",
  "result": {
    "id": 15,
    "monto": 15000,
    "descripcion": "Almuerzo",
    "tipo": "gasto",
    "id_categoria": 3
  }
}
```

---

#### DELETE /api/transacciones/{id}
Eliminar una transacción.

```bash
curl -X DELETE http://localhost:5000/api/transacciones/15 \
  -H "Authorization: Bearer {token}"
```

**Respuesta:**
```json
{
  "status": "success"
}
```

---

### Saldo

#### GET /api/saldo?id_usuario={id}
Obtener el saldo actual de un usuario.

```bash
curl http://localhost:5000/api/saldo?id_usuario=1 \
  -H "Authorization: Bearer {token}"
```

**Respuesta:**
```json
{
  "status": "success",
  "result": {
    "saldo_actual": 150000
  }
}
```

---

### Categorías

#### GET /api/categorias
Obtener todas las categorías disponibles.

```bash
curl http://localhost:5000/api/categorias \
  -H "Authorization: Bearer {token}"
```

**Respuesta:**
```json
{
  "status": "success",
  "result": [
    { "id_categoria": 1, "nombre": "Salario", "tipo": "ingreso" },
    { "id_categoria": 2, "nombre": "Comida", "tipo": "gasto" },
    { "id_categoria": 3, "nombre": "Transporte", "tipo": "gasto" },
    { "id_categoria": 4, "nombre": "Entretenimiento", "tipo": "gasto" }
  ]
}
```

---

### Estadísticas

#### GET /api/estadisticas/gastos
Obtener resumen de gastos por categoría.

```bash
curl http://localhost:5000/api/estadisticas/gastos \
  -H "Authorization: Bearer {token}"
```

**Respuesta:**
```json
{
  "status": "success",
  "result": [
    { "categoria": "Comida", "total": 150000 },
    { "categoria": "Transporte", "total": 50000 },
    { "categoria": "Entretenimiento", "total": 30000 }
  ]
}
```

---

### Usuarios

#### GET /api/usuarios
Obtener lista de usuarios.

```bash
curl http://localhost:5000/api/usuarios \
  -H "Authorization: Bearer {token}"
```

**Respuesta:**
```json
{
  "status": "success",
  "result": [
    { "id_usuario": 1, "nombre": "Juan García", "email": "juan@email.com" },
    { "id_usuario": 2, "nombre": "María López", "email": "maria@email.com" }
  ]
}
```

---

## 💻 Instalación y Ejecución

### Requisitos Previos

- **Node.js** versión 18 o superior
- **npm** (viene con Node.js)
- **Backend Flask** corriendo en `http://localhost:5000`

### Pasos de Instalación

```bash
# 1. Abrir terminal en la carpeta del proyecto

# 2. Instalar todas las dependencias
npm install

# 3. (Opcional) Verificar que todo está bien
npm version
```

### Ejecutar en Desarrollo

```bash
# Iniciar el servidor de desarrollo
npm start

# La aplicación estará disponible en:
# http://localhost:4200
```

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia servidor de desarrollo en puerto 4200 |
| `npm test` | Ejecuta los tests (Jasmine/Karma) |
| `npm run build` | Genera build de producción en `/dist` |
| `npm run watch` | Build en modo watch (recompila al cambiar archivos) |

### Build de Producción

```bash
# Genera archivos optimizados en dist/desollo-plat-front/
npm run build

# Los archivos resultantes se pueden desplegar en cualquier servidor web estático
```

---

## 📖 Glosario de Términos

| Término | Definición |
|---------|------------|
| **Angular** | Framework de JavaScript para construir aplicaciones web |
| **BehaviorSubject** | Un tipo de observable que siempre tiene un valor actual |
| **CanActivate** | Función que decide si una ruta puede ser accedida |
| **Component** | Clase que controla una parte de la interfaz de usuario |
| **Decorator** | Función que modifica el comportamiento de una clase (@Injectable, @Component) |
| **Dependency Injection** | Patrón donde Angular "inyecta" las dependencias automáticamente |
| **FormGroup** | Objeto que agrupa y valida campos de un formulario |
| **HttpClient** | Servicio de Angular para hacer peticiones HTTP |
| **Interceptor** | Función que procesa todas las peticiones HTTP salientes |
| **Lazy Loading** | Técnica de cargar código solo cuando se necesita |
| **Observable** | Objeto que emite valores con el tiempo |
| **Reactive Forms** | Formularios basados en observables y validación programática |
| **RxJS** | Librería para manejar datos asíncronos (observables) |
| **Service** | Clase que centraliza lógica de negocio |
| **Standalone** | Componentes que no requieren NgModule |
| **Subject** | Tipo de observable que permite emitir valores manualmente |
| **Subscription** | Conexión entre un observable y un suscriptor |
| **takeUntil** | Operador RxJS que completa un observable cuando otro emite |
| **TypeScript** | Superset de JavaScript con tipos estáticos |
| **Zone.js** | Librería que detecta cambios asíncronos en Angular |

---

## 🔮 Mejoras Futuras Posibles

Si quisieras mejorar esta aplicación, aquí hay algunas ideas:

1. **Tests E2E** - Usar Cypress o Playwright para probar flujos completos
2. **Variables de Entorno** - Mover URLs hardcodeadas a archivos `.env`
3. **Gestión de Estado Global** - Implementar NgRx para estado más complejo
4. **Dark Mode** - Agregar tema oscuro
5. **PWA** - Hacer la app instalable en celulares
6. **Gráficos Avanzados** - Más tipos de gráficos (líneas, barras)
7. **Exportar Datos** - Exportar historial a Excel/PDF
8. **Filtros en Historial** - Filtrar por fecha, tipo, categoría

---

<div align="center">

**Documentación generada para FinanzasApp**
Angular 19 + TypeScript + RxJS

¿Dudas? Revisa el código fuente en `src/app/`

</div>
