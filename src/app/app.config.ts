import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// 1. Importa la función proveedora del cliente HTTP
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // 2. Ejecuta la función dentro de la lista de providers
    provideHttpClient() 
  ]
};
