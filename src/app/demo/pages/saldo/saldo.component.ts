import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaldoService } from './service/saldo.service';
import { UsuarioService } from '../usuario/service/usuario.service.component';
import { TransaccionService } from '../transaccion/service/transaccion.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-saldo',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './saldo.component.html',
    styleUrls: ['./saldo.component.scss']
})
export class SaldoComponent implements OnInit, OnDestroy {
    saldoActual: number = 0;
    usuarioActual: number = 2;
    private destroy$ = new Subject<void>();

    constructor(
        private saldoService: SaldoService,
        private usuarioService: UsuarioService,
        private transaccionService: TransaccionService
    ) {}

    ngOnInit(): void {
        // Suscribirse a cambios del usuario activo
        this.usuarioService.usuarioActual$
            .pipe(takeUntil(this.destroy$))
            .subscribe(usuarioId => {
                this.usuarioActual = usuarioId;
                this.obtenerSaldo();
            });

        // Suscribirse a notificaciones de transacciones guardadas
        this.transaccionService.transaccionGuardada$
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.obtenerSaldo();
            });

        // Obtener saldo inicial
        this.obtenerSaldo();
    }

    obtenerSaldo() {
        // Le pasamos el usuario actual a la función del servicio
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

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}