import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransaccionService } from '../transaccion/service/transaccion.service';

// 1. Importamos el servicio y el modelo del usuario
import { UsuarioService } from './service/usuario.service.component';
import { Usuario } from './models/usuario';

@Component({
    selector: 'app-usuario',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
    transaccionForm: FormGroup;
    // 2. Creamos un array vacío para guardar los usuarios que lleguen del backend
    usuarios: Usuario[] = []; 

    constructor(
        private fb: FormBuilder, 
        private transaccionService: TransaccionService,
        private usuarioService: UsuarioService // 3. Inyectamos el servicio
    ) {
        this.transaccionForm = this.fb.group({
            id_usuario: ['', Validators.required], 
            monto: ['', [Validators.required, Validators.min(0.01)]],
            descripcion: [''],
            tipo: ['ingreso', Validators.required] 
        });
    }

    // 4. Se ejecuta automáticamente al cargar la pantalla
    ngOnInit(): void {
        this.cargarUsuarios();
    }

    cargarUsuarios() {
        this.usuarioService.getUsuarios().subscribe({
            next: (res) => {
                if (res.status === 'success') {
                    this.usuarios = res.result; // Guardamos la lista en nuestra variable
                    
                    // Opcional: Seleccionar el primer usuario de la lista por defecto
                    if (this.usuarios.length > 0) {
                        this.transaccionForm.patchValue({
                            id_usuario: this.usuarios[0].id_usuario
                        });
                    }
                }
            },
            error: (err) => console.error('Error al cargar usuarios', err)
        });
    }

    onSubmit() {
        if (this.transaccionForm.valid) {
            const nuevaTransaccion = {
                id_usuario: Number(this.transaccionForm.value.id_usuario),
                monto: this.transaccionForm.value.monto,
                descripcion: this.transaccionForm.value.descripcion,
                tipo: this.transaccionForm.value.tipo,
                id_categoria: 3
            };
            
            this.transaccionService.crearTransaccion(nuevaTransaccion).subscribe({
                next: (res) => {
                    alert('Movimiento guardado con éxito');
                    // Al resetear, volvemos a poner al primer usuario de la lista
                    this.transaccionForm.reset({ 
                        id_usuario: this.usuarios.length > 0 ? this.usuarios[0].id_usuario : '', 
                        tipo: 'ingreso' 
                    });
                },
                error: (err) => console.error('Error al guardar', err)
            });
        }
    }
}