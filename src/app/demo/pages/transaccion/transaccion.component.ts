import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransaccionService } from './service/transaccion.service';
import { UsuarioService } from '../usuario/service/usuario.service.component';

@Component({
    selector: 'app-transaccion',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './transaccion.component.html',
    styleUrls: ['./transaccion.component.scss']
})
export class TransaccionComponent {
    transaccionForm: FormGroup;

    constructor(
        private fb: FormBuilder, 
        private transaccionService: TransaccionService,
        private usuarioService: UsuarioService
    ) {
        // 1. Agregamos id_usuario al formulario. 
        // Le ponemos '1' como valor por defecto y lo hacemos requerido.
        this.transaccionForm = this.fb.group({
            id_usuario: [1, Validators.required], 
            monto: ['', [Validators.required, Validators.min(0.01)]],
            descripcion: [''],
            tipo: ['ingreso', Validators.required] 
        });

        // Escuchamos cambios en el select de usuario
        this.transaccionForm.get('id_usuario')?.valueChanges.subscribe(usuarioId => {
            this.usuarioService.setUsuarioActual(Number(usuarioId));
        });
    }

    onSubmit() {
        if (this.transaccionForm.valid) {
            // 2. Ahora tomamos el id_usuario dinámicamente desde el formulario
            const nuevaTransaccion = {
                id_usuario: Number(this.transaccionForm.value.id_usuario), // Aseguramos que sea un número
                monto: this.transaccionForm.value.monto,
                descripcion: this.transaccionForm.value.descripcion,
                tipo: this.transaccionForm.value.tipo,
                id_categoria: 3 // Mantenemos la categoría fija por ahora
            };
            
            this.transaccionService.crearTransaccion(nuevaTransaccion).subscribe({
                next: (res) => {
                    console.log('Respuesta del backend:', res);
                    alert('Movimiento guardado con éxito');
                    // Notificamos que se debe refrescar el saldo
                    this.transaccionService.notificarTransaccionGuardada();
                    // 3. Al resetear, volvemos a poner los valores por defecto
                    this.transaccionForm.reset({ id_usuario: 1, tipo: 'ingreso' });
                },
                error: (err) => console.error('Error al guardar', err)
            });
        }
    }
}