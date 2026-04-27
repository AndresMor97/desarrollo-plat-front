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
}