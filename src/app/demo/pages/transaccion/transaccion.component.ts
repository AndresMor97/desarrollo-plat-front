import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransaccionService } from './service/transaccion.service';
import { UsuarioService } from '../usuario/service/usuario.service.component';
import { AlertService } from '../saldo/service/alert.service';
import { Usuario } from '../usuario/models/usuario';

@Component({
    selector: 'app-transaccion',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './transaccion.component.html',
    styleUrls: ['./transaccion.component.scss']
})
export class TransaccionComponent {
    transaccionForm: FormGroup;
    usuarioActualValue: number = 1;
    usuarios: Usuario[] = [];

    constructor(
        private fb: FormBuilder, 
        private transaccionService: TransaccionService,
        private usuarioService: UsuarioService,
        private alertService: AlertService
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
            this.usuarioActualValue = Number(usuarioId);
            this.usuarioService.setUsuarioActual(this.usuarioActualValue);
        });

        // Establecer el usuario inicial
        this.usuarioService.setUsuarioActual(1);

        // Cargar la lista de usuarios desde el servicio
        this.usuarioService.getUsuarios().subscribe({
            next: (data) => {
                console.log('Datos del API:', data);
                // El API retorna en data.result
                if (data && data.result && Array.isArray(data.result)) {
                    this.usuarios = data.result;
                    console.log('Usuarios cargados:', this.usuarios);
                } else {
                    console.error('Formato inesperado del API:', data);
                }
            },
            error: (err) => {
                console.error('Error al cargar usuarios', err);
            }
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
                    this.alertService.success('Movimiento guardado con éxito', '¡Éxito!', 3000);
                    // Notificamos que se debe refrescar el saldo
                    this.transaccionService.notificarTransaccionGuardada();
                    // 3. Al resetear, mantener el usuario actual y solo resetear los otros campos
                    this.transaccionForm.reset({ 
                        id_usuario: this.usuarioActualValue, 
                        tipo: 'ingreso' 
                    });
                },
                error: (err) => {
                    console.error('Error al guardar', err);
                    this.alertService.danger('Error al guardar el movimiento', 'Error', 4000);
                }
            });
        }
    }
}