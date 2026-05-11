import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaldoService } from './service/saldo.service';
import { CategoriaService } from '../categorias/service/categoria.service';
import { UsuarioService } from '../usuario/service/usuario.service.component';
import { TransaccionService } from '../transaccion/service/transaccion.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface SaldoCategoria {
  id_categoria: number;
  nombre: string;
  total_ingresos: number;
  total_gastos: number;
  saldo_total: number;
}

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
    saldosPorCategoria: SaldoCategoria[] = [];
    private destroy$ = new Subject<void>();

    constructor(
        private saldoService: SaldoService,
        private categoriaService: CategoriaService,
        private usuarioService: UsuarioService,
        private transaccionService: TransaccionService
    ) {}

    ngOnInit(): void {
        this.usuarioService.usuarioActual$
            .pipe(takeUntil(this.destroy$))
            .subscribe(usuarioId => {
                this.usuarioActual = usuarioId;
                this.obtenerSaldo();
                this.obtenerSaldosPorCategoria();
            });

        this.transaccionService.transaccionGuardada$
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.obtenerSaldo();
                this.obtenerSaldosPorCategoria();
            });

        this.obtenerSaldo();
        this.obtenerSaldosPorCategoria();
    }

    obtenerSaldo() {
        this.saldoService.getSaldo(this.usuarioActual).subscribe({
            next: (res) => {
                if (res.status === 'success') {
                    this.saldoActual = res.result.saldo_actual;
                }
            },
            error: (err) => console.error('Error al obtener el saldo', err)
        });
    }

    obtenerSaldosPorCategoria() {
        this.categoriaService.getSaldosPorCategoria().subscribe({
            next: (res) => {
                if (res.status === 'success') {
                    this.saldosPorCategoria = res.result || [];
                }
            },
            error: (err) => console.error('Error al obtener saldos por categoría', err)
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}