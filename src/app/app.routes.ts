import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./demo/pages/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'registro', loadComponent: () => import('./demo/pages/auth/registro/registro.component').then(m => m.RegistroComponent) },
  {
    path: 'home',
    loadComponent: () => import('./demo/pages/navegacion/navegacion.component').then(m => m.NavegacionComponent),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];