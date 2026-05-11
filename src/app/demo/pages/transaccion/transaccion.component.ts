import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransaccionService } from './service/transaccion.service';
import { AlertService } from '../saldo/service/alert.service';

interface Categoria {
  id_categoria: number;
  nombre: string;
}

@Component({
    selector: 'app-transaccion',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './transaccion.component.html',
    styleUrls: ['./transaccion.component.scss']
})
export class TransaccionComponent implements OnInit {
    transaccionForm: FormGroup;
    categorias: Categoria[] = [];

    constructor(
        private fb: FormBuilder,
        private transaccionService: TransaccionService,
        private alertService: AlertService
    ) {
        this.transaccionForm = this.fb.group({
            monto: ['', [Validators.required, Validators.min(0.01)]],
            descripcion: [''],
            tipo: ['ingreso', Validators.required],
            id_categoria: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.cargarCategorias();
    }

    cargarCategorias() {
        this.transaccionService.getCategorias().subscribe({
            next: (res: any) => {
                this.categorias = res.result || [];
            },
            error: () => {
                this.alertService.danger('Error al cargar categorías', 'Error', 4000);
            }
        });
    }

    onSubmit() {
        if (this.transaccionForm.valid) {
            const formValue = this.transaccionForm.value;
            const nuevaTransaccion = {
                monto: formValue.monto,
                descripcion: formValue.descripcion,
                tipo: formValue.tipo,
                id_categoria: formValue.id_categoria
            };

            this.transaccionService.crearTransaccion(nuevaTransaccion).subscribe({
                next: () => {
                    this.alertService.success('Movimiento guardado con éxito', '¡Éxito!', 3000);
                    this.transaccionService.notificarTransaccionGuardada();
                    this.transaccionForm.reset({ tipo: 'ingreso' });
                },
                error: () => {
                    this.alertService.danger('Error al guardar el movimiento', 'Error', 4000);
                }
            });
        }
    }
}