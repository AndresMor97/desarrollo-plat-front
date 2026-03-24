import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaldoService } from './service/saldo.service';

@Component({
    selector: 'app-saldo',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './saldo.component.html',
    styleUrls: ['./saldo.component.scss']
})
export class SaldoComponent implements OnInit {
    saldoActual: number = 0;

  // Definimos qué usuario estamos consultando (por ahora fijo en 1)
usuarioActual: number = 1; 

constructor(private saldoService: SaldoService) {}

ngOnInit(): void {
    this.obtenerSaldo();
}

obtenerSaldo() {
    // Le pasamos el número 1 a la función del servicio
    this.saldoService.getSaldo(this.usuarioActual).subscribe({
    next: (res) => {
        // Recuerda que según tu Postman, el saldo viene dentro de res.result.saldo_actual
        if (res.status === 'success') {
        this.saldoActual = res.result.saldo_actual;
        }
    },
    error: (err) => console.error('Error al obtener el saldo', err)
    });
}
}