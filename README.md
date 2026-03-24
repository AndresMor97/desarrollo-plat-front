# 💰 DesolloPlatFront - Plataforma de Gestión Financiera

<div align="center">

![Angular](https://img.shields.io/badge/Angular-19.0.6-red?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue?style=flat-square&logo=typescript)
![RxJS](https://img.shields.io/badge/RxJS-7.8.0-critical?style=flat-square&logo=reactivex)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**Una aplicación frontend moderna para gestión y control de transacciones financieras**

[Ver Documentación](#-estructura-del-proyecto) • [Instalación](#-instalación-y-configuración) • [Características](#-características-principales)

</div>

---

## 📋 Descripción General

DesolloPlatFront es una plataforma web moderna construida con **Angular 19** que permite gestionar usuarios, transacciones financieras, monitoreo de saldos y categorización de movimientos. La aplicación utiliza arquitectura de componentes standalone, Reactive Forms y gestión reactiva de estado con RxJS.

---

## ✨ Características Principales

### 👤 Gestión de Usuarios
- **Administración de perfiles**: Crear, consultar y gestionar usuarios del sistema
- **Cambio de usuario activo**: Seleccionar usuarios para visualizar información personalizada
- **Validación robusta**: Formularios con validaciones integradas
- **Sincronización en tiempo real**: Los cambios se replican automáticamente en toda la aplicación

### 💳 Gestión de Transacciones
- **Registro de movimientos**: Ingresos y egresos con descripción detallada
- **Formularios reactivos**: Validación en tiempo real con Angular Reactive Forms
- **Categorización**: Soporte para categorizar transacciones
- **Historial completo**: Consulta de todas las transacciones por usuario
- **Notificaciones**: Sistema de alertas para confirmación de operaciones

### 💰 Control de Saldos
- **Saldo actualizado**: Visualización del balance actual por usuario
- **Actualización automática**: El saldo se recalcula tras cada transacción
- **Monitoreo en tiempo real**: Sincronización con cambios de usuario y transacciones
- **Patrones reactivos**: Uso de Observables con operadores como `takeUntil` para gestión eficiente

### 🎨 Componentes UI Personalizados
- **Alert Component**: Sistema de notificaciones personalizadas
- **Badge Component**: Componentes visuales reutilizables
- **Containers de Alertas**: Gestión centralizada de mensajes

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── demo/
│   │   └── pages/
│   │       ├── categorias/         # ✨ Gestión de categorías
│   │       │   └── models/
│   │       │       └── categorias.ts
│   │       │
│   │       ├── saldo/              # 💰 Módulo de saldos
│   │       │   ├── models/
│   │       │   │   └── saldo.ts
│   │       │   ├── service/
│   │       │   │   ├── alert.service.ts
│   │       │   │   └── saldo.service.ts
│   │       │   ├── saldo.component.ts
│   │       │   ├── saldo.component.html
│   │       │   └── saldo.component.scss
│   │       │
│   │       ├── transaccion/        # 💳 Módulo de transacciones
│   │       │   ├── models/
│   │       │   │   └── transaccion.ts
│   │       │   ├── service/
│   │       │   │   └── transaccion.service.ts
│   │       │   ├── transaccion.component.ts
│   │       │   ├── transaccion.component.html
│   │       │   └── transaccion.component.scss
│   │       │
│   │       ├── usuario/            # 👤 Módulo de usuarios
│   │       │   ├── models/
│   │       │   │   └── usuario.ts
│   │       │   ├── service/
│   │       │   │   └── usuario.service.component.ts
│   │       │   ├── usuario.component.ts
│   │       │   ├── usuario.component.html
│   │       │   └── usuario.component.scss
│   │       │
│   │       └── ui-elements/        # 🎨 Componentes UI reutilizables
│   │           ├── alert.component.ts
│   │           ├── alerts-container.component.ts
│   │           ├── basic-badge.component.ts
│   │           ├── basic-badge.component.html
│   │           └── basic-badge.component.scss
│   │
│   ├── app.component.ts            # Componente raíz
│   ├── app.routes.ts               # Configuración de rutas
│   ├── app.config.ts               # Configuración global
│   └── app.component.html
│
├── main.ts                         # Punto de entrada
├── index.html                      # HTML base
└── styles.css                      # Estilos globales
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- **Node.js** 18+ y npm
- **Angular CLI** 19.0.6
- **Git** para control de versiones

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd DesolloPlatFront
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor de desarrollo**
```bash
npm start
# O manualmente:
ng serve
```

4. **Acceder a la aplicación**
```
Abre http://localhost:4200/ en tu navegador
```

---

## 📚 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| **Desarrollo** | `npm start` | Inicia el servidor de desarrollo con hot-reload |
| **Build** | `npm run build` | Compila el proyecto para producción |
| **Tests** | `npm test` | Ejecuta pruebas unitarias con Karma |
| **Watch** | `npm run watch` | Compilación en modo observador |

---

## 🏗️ Arquitectura y Patrones

### Componentes Standalone
Todos los componentes implementan la arquitectura standalone de Angular 19:
```typescript
@Component({
    selector: 'app-saldo',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './saldo.component.html',
    styleUrls: ['./saldo.component.scss']
})
```

### Gestión Reactiva con RxJS
- **BehaviorSubjects** para estado centralizado
- **Operators reactivos**: `takeUntil`, `subscribe`, etc.
- **OnDestroy pattern** para limpieza de recursos
```typescript
private destroy$ = new Subject<void>();
// Suscripción segura
this.usuarioService.usuarioActual$
    .pipe(takeUntil(this.destroy$))
    .subscribe(usuarioId => {
        this.usuarioActual = usuarioId;
    });
```

### Reactive Forms
Validación y manejo de formularios robustos:
```typescript
this.transaccionForm = this.fb.group({
    id_usuario: [1, Validators.required],
    monto: ['', [Validators.required, Validators.min(0.01)]],
    descripcion: [''],
    tipo: ['ingreso', Validators.required]
});
```

### Inyección de Dependencias
Servicios inyectados para comunicación con Backend:
- `SaldoService`: Obtención y cálculo de saldos
- `TransaccionService`: Gestión de transacciones
- `UsuarioService`: Gestión de usuarios
- `AlertService`: Sistema de alertas

---

## 🔄 Flujo de Datos

```
┌─────────────────┐
│  UI Components  │
│   (Usuarios,    │
│ Transacciones)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Services      │ ◄─── Inyección de Dependencias
│  (Observables)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Backend API   │
│   (REST)        │
└─────────────────┘
```

---

## 🧪 Testing

### Ejecutar Tests Unitarios
```bash
npm test
```

Archivos de testing encontrados:
- `app.component.spec.ts`
- `saldo.component.spec.ts`
- `transaccion.component.spec.ts`
- `usuario.component.spec.ts`
- `saldo.service.spec.ts`
- `transaccion.service.spec.ts`
- `usuario.service.component.spec.ts`

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **Angular** | 19.0.0 | Framework frontend progresivo |
| **TypeScript** | 5.6.2 | Lenguaje tipado para JavaScript |
| **RxJS** | 7.8.0 | Programación reactiva |
| **Angular Forms** | 19.0.0 | Gestión de formularios reactivos |
| **Karma** | 6.4.0 | Test runner |
| **Jasmine** | 5.4.0 | Framework de testing |

---

## 📝 Modelos de Datos

### Usuario
```typescript
interface Usuario {
    id_usuario: number;
    nombre: string;
    email: string;
    // ... más campos
}
```

### Transacción
```typescript
interface Transaccion {
    id: number;
    id_usuario: number;
    monto: number;
    descripcion: string;
    tipo: 'ingreso' | 'egreso';
    // ... más campos
}
```

### Saldo
```typescript
interface Saldo {
    id_usuario: number;
    monto_total: number;
    ultima_actualizacion: Date;
}
```

---

## 🚨 Mejores Prácticas Implementadas

✅ **Componentes Standalone**: Simplifica el código y reduce dependencias  
✅ **Reactive Programming**: Gestión eficiente de estado con RxJS  
✅ **OnDestroy Pattern**: Prevención de memory leaks  
✅ **Reactive Forms**: Validación robusta del lado del cliente  
✅ **Inyección de Dependencias**: Código modular y testeable  
✅ **Tipado Fuerte**: TypeScript para mayor seguridad  
✅ **Separación de Concerns**: Modelos, servicios y componentes separados  
✅ **Estilos Modularizados**: SCSS por componente  

---

## 📖 Documentación Útil

- [Angular Oficial](https://angular.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev/)
- [Angular Reactive Forms](https://angular.io/guide/reactive-forms)

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el repositorio
2. Crea tu rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

<div align="center">

**Hecho con ❤️ en Angular 19**

[⬆ Volver al inicio](#-desolloplat-front---plataforma-de-gestión-financiera)

</div>
