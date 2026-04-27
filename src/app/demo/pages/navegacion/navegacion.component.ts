import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TransaccionComponent } from '../transaccion/transaccion.component';
import { SaldoComponent } from '../saldo/saldo.component';
import { HistorialComponent } from '../historial/historial.component';
import { EstadisticasComponent } from '../estadisticas/estadisticas.component';
import { AlertsContainerComponent } from '../ui-elements/alerts-container.component';
import { AuthService } from '../auth/service/auth.service';

export type SeccionActiva = 'movimiento' | 'saldo' | 'historial' | 'estadisticas';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [CommonModule, TransaccionComponent, SaldoComponent, HistorialComponent, EstadisticasComponent, AlertsContainerComponent],
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent {
  seccionActiva: SeccionActiva = 'movimiento';
  usuarioNombre: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.usuarioNombre = this.authService.getNombre() || '';
  }

  cambiarSeccion(seccion: SeccionActiva) {
    this.seccionActiva = seccion;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}