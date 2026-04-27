import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import { TransaccionService } from '../transaccion/service/transaccion.service';

Chart.register(PieController, ArcElement, Tooltip, Legend);

interface Estadistica {
  categoria: string;
  total: number;
}

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  estadisticas: Estadistica[] = [];
  cargando = true;

  pieChartData: any = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#e74c3c',
        '#3498db',
        '#27ae60',
        '#f39c12',
        '#9b59b6',
        '#1abc9c',
        '#e67e22',
        '#2ecc71',
        '#e91e63',
        '#00bcd4'
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = (context.dataset.data as number[]).reduce((a: number, b: number) => a + b, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    }
  };

  constructor(private transaccionService: TransaccionService) {}

  ngOnInit() {
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {
    this.transaccionService.getEstadisticasGastos().subscribe({
      next: (data: any) => {
        this.estadisticas = data.result || [];
        this.actualizarGrafico();
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

  actualizarGrafico() {
    this.pieChartData = {
      ...this.pieChartData,
      labels: this.estadisticas.map(e => e.categoria),
      datasets: [{
        ...this.pieChartData.datasets[0],
        data: this.estadisticas.map(e => e.total)
      }]
    };
  }

  getTotal(): number {
    return this.estadisticas.reduce((sum, e) => sum + e.total, 0);
  }
}
