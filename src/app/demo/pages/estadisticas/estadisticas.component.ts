import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransaccionService } from '../transaccion/service/transaccion.service';

interface Estadistica {
  categoria: string;
  total: number;
}

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  estadisticas: Estadistica[] = [];
  cargando = true;

  constructor(private transaccionService: TransaccionService) {}

  ngOnInit() {
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {
    this.transaccionService.getEstadisticasGastos().subscribe({
      next: (data) => {
        this.estadisticas = data;
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

  getTotal(): number {
    return this.estadisticas.reduce((sum, e) => sum + e.total, 0);
  }

  getPorcentaje(total: number): number {
    const grandTotal = this.getTotal();
    return grandTotal > 0 ? (total / grandTotal) * 100 : 0;
  }

  getColores(): string[] {
    const colores = ['#e74c3c', '#3498db', '#27ae60', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22'];
    return colores;
  }
}