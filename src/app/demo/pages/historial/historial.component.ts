import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransaccionService } from '../transaccion/service/transaccion.service';

interface Transaccion {
  id: number;
  monto: number;
  descripcion: string;
  tipo: 'ingreso' | 'gasto';
  categoria: string;
  fecha: string;
}

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  transacciones: Transaccion[] = [];
  cargando = true;
  transaccionAEliminar: Transaccion | null = null;
  showConfirmDialog = false;

  constructor(private transaccionService: TransaccionService) {}

  ngOnInit() {
    this.cargarTransacciones();

    this.transaccionService.transaccionGuardada$.subscribe(() => {
      this.cargarTransacciones();
    });
  }

  cargarTransacciones() {
    this.transaccionService.getTransacciones().subscribe({
      next: (res: any) => {
        this.transacciones = res.result || [];
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  confirmarEliminacion(transaccion: Transaccion) {
    this.transaccionAEliminar = transaccion;
    this.showConfirmDialog = true;
  }

  cancelarEliminacion() {
    this.transaccionAEliminar = null;
    this.showConfirmDialog = false;
  }

  eliminarTransaccion() {
    if (!this.transaccionAEliminar) return;

    this.transaccionService.eliminarTransaccion(this.transaccionAEliminar.id).subscribe({
      next: () => {
        this.transaccionAEliminar = null;
        this.showConfirmDialog = false;
        this.cargarTransacciones();
        this.transaccionService.notificarTransaccionGuardada();
      },
      error: () => {
        this.transaccionAEliminar = null;
        this.showConfirmDialog = false;
      }
    });
  }
}
