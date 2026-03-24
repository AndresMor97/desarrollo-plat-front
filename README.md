# 💰 DesolloPlatFront - Plataforma de Gestión Financiera

<div align="center">

![Angular](https://img.shields.io/badge/Angular-19.0.6-red?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue?style=flat-square&logo=typescript)
![RxJS](https://img.shields.io/badge/RxJS-7.8.0-critical?style=flat-square&logo=reactivex)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**Documentación técnica completa del código fuente**

[Instalación](#-instalación-y-configuración) • [Componentes](#-componentes-detallados) • [Servicios](#-servicios) • [API](#-endpoints-api-esperados)

</div>

---

## 📋 Descripción General

DesolloPlatFront es una aplicación **ESTRICTAMENTE frontend** construida con **Angular 19** que gestiona:
- 👤 **Usuarios**: Carga, selección y administración de perfiles
- 💳 **Transacciones**: Registro de ingresos/gastos con categorización
- 💰 **Saldos**: Visualización y actualización en tiempo real
- 🎨 **UI Components**: Alertas, badges y componentes personalizados

---

## 🚀 Instalación y Configuración

### Requisitos
- Node.js 18+
- npm o yarn
- Backend en `http://localhost:5000` (Flask/Python)

### Pasos
```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor desarrollo (puerto 4200)
npm start

# 3. Ejecutar tests
npm test

# 4. Build producción
npm run build
```

---

## 📁 Estructura del Proyecto Detallada

```
src/app/demo/pages/
├── saldo/                          # 💰 MÓDULO DE SALDOS
│   ├── models/
│   │   └── saldo.ts                # Interfaz: { total: number }
│   ├── service/
│   │   ├── saldo.service.ts        # HTTP → GET /api/saldo?id_usuario=X
│   │   └── alert.service.ts        # Notificaciones (success/danger/warning/info)
│   ├── saldo.component.ts          # Lógica: obtener saldo, escuchar cambios
│   ├── saldo.component.html        # Template: mostrar saldo con currency pipe
│   └── saldo.component.scss        # Estilos: tarjeta y colores
│
├── transaccion/                    # 💳 MÓDULO DE TRANSACCIONES
│   ├── models/
│   │   └── transaccion.ts          # Interfaz: id_usuario, monto, descripcion, tipo, id_categoria
│   ├── service/
│   │   └── transaccion.service.ts  # HTTP → POST /api/transacciones + Subject notificaciones
│   ├── transaccion.component.ts    # Formulario reactivo con validaciones
│   ├── transaccion.component.html  # Select usuarios, inputs, botón submit
│   └── transaccion.component.scss  # Estilos: formulario y campos
│
├── usuario/                        # 👤 MÓDULO DE USUARIOS
│   ├── models/
│   │   └── usuario.ts              # Interfaz: id_usuario, nombre, etc.
│   ├── service/
│   │   └── usuario.service.component.ts  # BehaviorSubject usuarioActual$, HTTP → GET /api/usuarios
│   ├── usuario.component.ts        # Cargar usuarios, actualizar seleccionado
│   ├── usuario.component.html      # Listado o selector de usuarios
│   └── usuario.component.scss      # Estilos: layout usuario
│
└── ui-elements/                    # 🎨 COMPONENTES REUTILIZABLES
    ├── alert.component.ts          # Muestra alertas individuales
    ├── alerts-container.component.ts # Contenedor de múltiples alertas
    ├── basic-badge.component.ts    # Badge visual (etiquetas)
    ├── basic-badge.component.html
    └── basic-badge.component.scss
```

---

## 🔍 Componentes Detallados

### 1️⃣ **SaldoComponent** (`saldo/saldo.component.ts`)

#### Propósito
Mostrar el saldo actual del usuario activo y actualizarlo en tiempo real.

#### Propiedades
```typescript
saldoActual: number = 0;          // Saldo mostrado en pantalla
usuarioActual: number = 2;        // ID del usuario activo
private destroy$ = new Subject<void>(); // Para limpiar suscripciones
```

#### Métodos Principales

**`ngOnInit()`**
```typescript
// Se ejecuta cuando el componente carga
// 1. Escucha cambios del usuario activo
this.usuarioService.usuarioActual$.pipe(takeUntil(this.destroy$))
  .subscribe(usuarioId => {
    this.usuarioActual = usuarioId;
    this.obtenerSaldo(); // Recarga saldo al cambiar usuario
  });

// 2. Escucha notificaciones de transacciones guardadas
this.transaccionService.transaccionGuardada$.pipe(takeUntil(this.destroy$))
  .subscribe(() => {
    this.obtenerSaldo(); // Recarga saldo tras guardar movimiento
  });

// 3. Obtiene el saldo inicial
this.obtenerSaldo();
```

**`obtenerSaldo()`**
```typescript
// Llama al servicio para obtener saldo del usuario actual
this.saldoService.getSaldo(this.usuarioActual).subscribe({
  next: (res) => {
    if (res.status === 'success') {
      this.saldoActual = res.result.saldo_actual; // Estructura esperada del backend
    }
  },
  error: (err) => console.error('Error al obtener el saldo', err)
});
```

**`ngOnDestroy()`**
```typescript
// Limpia suscripciones antes de destruir el componente
this.destroy$.next();
this.destroy$.complete();
```

#### Template HTML
```html
<div class="tarjeta-saldo">
  <h3>
    <span>account_balance_wallet</span> Mi Saldo Disponible
  </h3>
  <!-- Mostrar saldo con formato moneda COP -->
  <h1 [ngClass]="{'positivo': saldoActual >= 0, 'negativo': saldoActual < 0}">
    {{ saldoActual | currency:'COP':'symbol':'1.0-0' }}
  </h1>
</div>
```

---

### 2️⃣ **TransaccionComponent** (`transaccion/transaccion.component.ts`)

#### Propósito
Formulario para crear nuevas transacciones (ingresos/gastos).

#### Propiedades
```typescript
transaccionForm: FormGroup;       // Formulario reactivo
usuarioActualValue: number = 1;   // Usuario seleccionado en el form
usuarios: Usuario[] = [];         // Lista de usuarios cargados
```

#### Constructor y Inicialización
```typescript
constructor(
  private fb: FormBuilder,
  private transaccionService: TransaccionService,
  private usuarioService: UsuarioService,
  private alertService: AlertService
) {
  // Crear formulario con validaciones
  this.transaccionForm = this.fb.group({
    id_usuario: [1, Validators.required],
    monto: ['', [Validators.required, Validators.min(0.01)]],
    descripcion: [''],
    tipo: ['ingreso', Validators.required]
  });

  // Escuchar cambios en el selector de usuario
  this.transaccionForm.get('id_usuario')?.valueChanges.subscribe(usuarioId => {
    this.usuarioActualValue = Number(usuarioId);
    this.usuarioService.setUsuarioActual(this.usuarioActualValue);
  });

  // Establecer usuario inicial
  this.usuarioService.setUsuarioActual(1);

  // Cargar lista de usuarios
  this.usuarioService.getUsuarios().subscribe({
    next: (data) => {
      if (data?.result && Array.isArray(data.result)) {
        this.usuarios = data.result;
      }
    },
    error: (err) => console.error('Error al cargar usuarios', err)
  });
}
```

#### Método onSubmit()
```typescript
onSubmit() {
  if (this.transaccionForm.valid) {
    const nuevaTransaccion = {
      id_usuario: Number(this.transaccionForm.value.id_usuario),
      monto: this.transaccionForm.value.monto,
      descripcion: this.transaccionForm.value.descripcion,
      tipo: this.transaccionForm.value.tipo,
      id_categoria: 3 // Categoría fija por ahora
    };
    
    this.transaccionService.crearTransaccion(nuevaTransaccion).subscribe({
      next: (res) => {
        // Mostrar alerta de éxito
        this.alertService.success('Movimiento guardado con éxito', '¡Éxito!', 3000);
        
        // Notificar para actualizar saldo
        this.transaccionService.notificarTransaccionGuardada();
        
        // Resetear formulario manteniendo el usuario actual
        this.transaccionForm.reset({
          id_usuario: this.usuarioActualValue,
          tipo: 'ingreso'
        });
      },
      error: (err) => console.error('Error:', err)
    });
  }
}
```

#### Validaciones del Formulario
| Campo | Validación | Valor Default |
|-------|-----------|---|
| `id_usuario` | Requerido | 1 |
| `monto` | Requerido, ≥ 0.01 | Vacío |
| `descripcion` | Opcional | Vacío |
| `tipo` | Requerido | 'ingreso' |

#### Template HTML
```html
<form [formGroup]="transaccionForm" (ngSubmit)="onSubmit()">
  <!-- Select de usuario -->
  <select id="id_usuario" formControlName="id_usuario">
    <option *ngFor="let usuario of usuarios" [value]="usuario.id_usuario">
      {{ usuario.nombre }}
    </option>
  </select>

  <!-- Input monto -->
  <input id="monto" type="number" formControlName="monto" placeholder="Ej: 15000">

  <!-- Input descripción -->
  <input id="descripcion" type="text" formControlName="descripcion" placeholder="Ej: Almuerzo">

  <!-- Select tipo -->
  <select id="tipo" formControlName="tipo">
    <option value="ingreso">Ingreso</option>
    <option value="gasto">Gasto</option>
  </select>

  <!-- Botón submit deshabilitado si form inválido -->
  <button type="submit" [disabled]="transaccionForm.invalid">
    Guardar Movimiento
  </button>
</form>
```

---

### 3️⃣ **UsuarioComponent** (`usuario/usuario.component.ts`)

#### Propósito
Cargar y gestionar la lista de usuarios de la aplicación.

#### Propiedades
```typescript
transaccionForm: FormGroup;  // Formulario (heredado de la estructura)
usuarios: Usuario[] = [];    // Array de usuarios del backend
```

#### ngOnInit()
```typescript
ngOnInit(): void {
  this.cargarUsuarios();
}
```

#### Método cargarUsuarios()
```typescript
cargarUsuarios() {
  this.usuarioService.getUsuarios().subscribe({
    next: (res) => {
      if (res.status === 'success') {
        this.usuarios = res.result; // Guardar lista

        // Seleccionar primer usuario por defecto
        if (this.usuarios.length > 0) {
          this.transaccionForm.patchValue({
            id_usuario: this.usuarios[0].id_usuario
          });
        }
      }
    },
    error: (err) => console.error('Error cargando usuarios', err)
  });
}
```

---

## 🔧 Servicios Detallados

### 1️⃣ **SaldoService** (`saldo/service/saldo.service.ts`)

```typescript
@Injectable({ providedIn: 'root' })
export class SaldoService {
  private apiUrl = 'http://localhost:5000/api/saldo';

  constructor(private http: HttpClient) {}

  // Obtiene el saldo de un usuario específico
  getSaldo(idUsuario: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id_usuario=${idUsuario}`);
  }
}
```

**Uso:**
```typescript
this.saldoService.getSaldo(2).subscribe(res => {
  console.log(res.result.saldo_actual); // Acceso al saldo
});
```

**Respuesta Esperada:**
```json
{
  "status": "success",
  "result": {
    "saldo_actual": 150000
  }
}
```

---

### 2️⃣ **TransaccionService** (`transaccion/service/transaccion.service.ts`)

```typescript
@Injectable({ providedIn: 'root' })
export class TransaccionService {
  private apiUrl = 'http://localhost:5000/api/transacciones';
  
  // Subject para notificar cuando se guarda una transacción
  private transaccionGuardada = new Subject<void>();
  public transaccionGuardada$ = this.transaccionGuardada.asObservable();

  constructor(private http: HttpClient) {}

  // Crea una nueva transacción en el backend
  crearTransaccion(transaccion: Transaccion): Observable<any> {
    return this.http.post(this.apiUrl, transaccion);
  }

  // Notifica a todos los suscriptores que se guardó una transacción
  notificarTransaccionGuardada(): void {
    this.transaccionGuardada.next();
  }
}
```

**Uso:**
```typescript
// Crear y guardar transacción
this.transaccionService.crearTransaccion({
  id_usuario: 1,
  monto: 5000,
  descripcion: 'Café',
  tipo: 'gasto',
  id_categoria: 3
}).subscribe(res => {
  console.log('Guardado:', res);
});

// Escuchar cuando se guarda una transacción
this.transaccionService.transaccionGuardada$.subscribe(() => {
  console.log('¡Se guardó una transacción!');
});
```

---

### 3️⃣ **UsuarioService** (`usuario/service/usuario.service.component.ts`)

```typescript
@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = 'http://localhost:5000/api/usuarios';

  // BehaviorSubject mantiene el estado del usuario activo
  private usuarioActualSubject = new BehaviorSubject<number>(2);
  public usuarioActual$ = this.usuarioActualSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Obtiene lista completa de usuarios
  getUsuarios(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Cambia el usuario activo (notifica a todos los suscriptores)
  setUsuarioActual(usuarioId: number): void {
    this.usuarioActualSubject.next(usuarioId);
  }

  // Obtiene el valor actual sin necesidad de observable
  getUsuarioActual(): number {
    return this.usuarioActualSubject.value;
  }
}
```

**Uso:**
```typescript
// Obtener lista de usuarios
this.usuarioService.getUsuarios().subscribe(res => {
  console.log(res.result); // Array de usuarios
});

// Cambiar usuario activo
this.usuarioService.setUsuarioActual(5);

// Escuchar cambios del usuario activo
this.usuarioService.usuarioActual$.subscribe(usuarioId => {
  console.log('Usuario activo:', usuarioId);
});

// Obtener valor actual
const actual = this.usuarioService.getUsuarioActual();
```

---

### 4️⃣ **AlertService** (`saldo/service/alert.service.ts`)

```typescript
export interface Alert {
  id: string;
  type: 'success' | 'danger' | 'warning' | 'info';
  title?: string;
  message: string;
  dismissible?: boolean;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  private alertsSubject = new BehaviorSubject<Alert[]>([]);
  public alerts$ = this.alertsSubject.asObservable();

  constructor(private ngZone: NgZone) {}

  // Métodos de conveniencia
  success(message: string, title?: string, duration?: number) {
    this.addAlert('success', message, title, duration);
  }

  danger(message: string, title?: string, duration?: number) {
    this.addAlert('danger', message, title, duration);
  }

  warning(message: string, title?: string, duration?: number) {
    this.addAlert('warning', message, title, duration);
  }

  info(message: string, title?: string, duration?: number) {
    this.addAlert('info', message, title, duration);
  }

  // Método principal que añade alertas
  addAlert(type: string, message: string, title?: string, duration?: number) {
    const alert: Alert = {
      id: Date.now().toString() + Math.random(),
      type: type as any,
      title,
      message,
      dismissible: true,
      duration: duration || 5000
    };

    const currentAlerts = this.alertsSubject.value;
    this.alertsSubject.next([...currentAlerts, alert]);
  }
}
```

**Uso:**
```typescript
// Mostrar alerta de éxito
this.alertService.success('¡Guardado!', 'Operación exitosa', 3000);

// Mostrar alerta de error
this.alertService.danger('Error de conexión', 'Error', 5000);

// Mostrar alerta de advertencia
this.alertService.warning('Confirma tu acción', 'Advertencia');

// Escuchar todas las alertas
this.alertService.alerts$.subscribe(alerts => {
  console.log('Alertas:', alerts);
});
```

---

## 📦 Modelos de Datos

### Saldo (`saldo/models/saldo.ts`)
```typescript
export interface Saldo {
  total: number;
}
```

### Transacción (`transaccion/models/transaccion.ts`)
```typescript
export interface Transaccion {
  id_usuario: number;
  monto: number;
  descripcion: string;
  tipo: string;           // 'ingreso' o 'gasto'
  id_categoria: number;
}
```

### Usuario (`usuario/models/usuario.ts`)
```typescript
export interface Usuario {
  id_usuario: number;
  nombre: string;
  email: string;
  // ... más campos según tu backend
}
```

---

## 🌐 Endpoints API Esperados

La aplicación espera estos endpoints en `http://localhost:5000`:

### 1. Obtener Usuarios
```
GET /api/usuarios

Respuesta:
{
  "status": "success",
  "result": [
    {
      "id_usuario": 1,
      "nombre": "Juan García",
      "email": "juan@example.com"
    },
    {
      "id_usuario": 2,
      "nombre": "María López",
      "email": "maria@example.com"
    }
  ]
}
```

### 2. Obtener Saldo
```
GET /api/saldo?id_usuario=1

Respuesta:
{
  "status": "success",
  "result": {
    "saldo_actual": 150000,
    "id_usuario": 1
  }
}
```

### 3. Crear Transacción
```
POST /api/transacciones

Body:
{
  "id_usuario": 1,
  "monto": 5000,
  "descripcion": "Café",
  "tipo": "gasto",
  "id_categoria": 3
}

Respuesta:
{
  "status": "success",
  "message": "Transacción creada",
  "result": {
    "id": 100,
    "id_usuario": 1,
    "monto": 5000,
    "fecha": "2024-03-15"
  }
}
```

---

## 🔄 Flujo de Datos Detallado

### Flujo: Cambiar Usuario
```
1. Usuario selecciona otro en TransaccionComponent
   ↓
2. transaccionForm.get('id_usuario').valueChanges dispara evento
   ↓
3. usuarioService.setUsuarioActual(nuevoId)
   ↓
4. BehaviorSubject notifica a todos los suscriptores
   ↓
5. SaldoComponent recibe nueva ID
   ↓
6. SaldoComponent llama getSaldo(nuevoId)
   ↓
7. Backend retorna saldo nuevo
   ↓
8. Pantalla actualiza e muestra nuevo saldo
```

### Flujo: Guardar Transacción
```
1. Usuario llena formulario y presiona "Guardar Movimiento"
   ↓
2. transaccionComponent.onSubmit() valida el form
   ↓
3. transaccionService.crearTransaccion(datos) envía POST
   ↓
4. Backend guarda la transacción
   ↓
5. transaccionService.notificarTransaccionGuardada() dispara Subject
   ↓
6. SaldoComponent escucha la notificación
   ↓
7. SaldoComponent llama getSaldo() para refrescar
   ↓
8. Saldo en pantalla se actualiza
   ↓
9. AlertService.success() muestra confirmación
```

---

## 📊 Patrones Reactivos Usados

### 1. BehaviorSubject (UsuarioService)
```typescript
private usuarioActualSubject = new BehaviorSubject<number>(2);
public usuarioActual$ = this.usuarioActualSubject.asObservable();

// Inicializa con valor 2
// Emite último valor a nuevos suscriptores
// Permite lectura del valor: getUsuarioActual()
```

### 2. Subject (TransaccionService)
```typescript
private transaccionGuardada = new Subject<void>();
public transaccionGuardada$ = this.transaccionGuardada.asObservable();

// Sin valor inicial
// Solo notifica nuevos suscriptores
// Usado para eventos únicos
```

### 3. takeUntil (Limpieza automática)
```typescript
private destroy$ = new Subject<void>();

this.usuarioService.usuarioActual$
  .pipe(takeUntil(this.destroy$))
  .subscribe(...);

ngOnDestroy(): void {
  this.destroy$.next();    // Completa el observable
  this.destroy$.complete();
}
// Previene memory leaks automáticamente
```

---

## 🎯 Casos de Uso Principales

### Caso 1: Ver mi saldo
1. Página carga → `SaldoComponent` inicia
2. Llama `obtenerSaldo()` con usuario por defecto (2)
3. Muestra saldo formateado en moneda COP

### Caso 2: Cambiar de usuario
1. Selecciono usuario diferente en el dropdown
2. `transaccionForm` dispara `valueChanges`
3. `setUsuarioActual()` actualiza el estado
4. `SaldoComponent` detecta el cambio en `usuarioActual$`
5. Carga nuevo saldo automáticamente

### Caso 3: Registrar gasto
1. Selecciono usuario, monto, descripción
2. Presiono "Guardar Movimiento"
3. HTTP POST a `/api/transacciones`
4. Si es exitoso:
   - Alerta verde de éxito
   - `notificarTransaccionGuardada()` se dispara
   - Saldo se recarga automáticamente
   - Formulario se limpia

---

## 🧪 Ejemplo de Test

```typescript
describe('SaldoComponent', () => {
  let component: SaldoComponent;
  let fixture: ComponentFixture<SaldoComponent>;
  let saldoService: SaldoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaldoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SaldoComponent);
    component = fixture.componentInstance;
    saldoService = TestBed.inject(SaldoService);
  });

  it('debe mostrar el saldo del usuario actual', () => {
    spyOn(saldoService, 'getSaldo').and.returnValue(
      of({ status: 'success', result: { saldo_actual: 50000 } })
    );

    fixture.detectChanges();
    expect(component.saldoActual).toBe(50000);
  });
});
```

---

## 🚨 Notas Importantes

⚠️ **Backend requerido**: La app espera un API en `localhost:5000`  
⚠️ **CORS**: Se debe habilitar CORS en el backend  
⚠️ **Estructura API**: Los endpoints deben retornar `{ status, result }`  
⚠️ **HttpClient providedIn**: Incluye HttpClient en `app.config.ts`  
⚠️ **Memoria**: Se limpian suscripciones con `takeUntil` en `ngOnDestroy`

---

## 🔗 Referencias Rápidas

- **Componentes**: `src/app/demo/pages/`
- **Servicios**: `src/app/demo/pages/*/service/`
- **Modelos**: `src/app/demo/pages/*/models/`
- **Backend URL**: `http://localhost:5000`

---

<div align="center">

**Documentación Técnica Completa del Código**

Generada: 2024 | Angular 19 + TypeScript + RxJS

</div>
