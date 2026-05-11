import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService, Categoria } from './service/categoria.service';
import { AlertService } from '../saldo/service/alert.service';
import { TransaccionService } from '../transaccion/service/transaccion.service';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  categoriaForm: FormGroup;
  categorias: Categoria[] = [];
  categoriaEliminando: number | null = null;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private transaccionService: TransaccionService,
    private alertService: AlertService
  ) {
    this.categoriaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      tipo: ['gasto', Validators.required]
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

  crearCategoria() {
    if (this.categoriaForm.valid) {
      const categoria = this.categoriaForm.value;

      this.categoriaService.crearCategoria(categoria).subscribe({
        next: () => {
          this.alertService.success('Categoría creada con éxito', '¡Éxito!', 3000);
          this.categoriaForm.reset({ tipo: 'gasto' });
          this.cargarCategorias();
        },
        error: (err) => {
          const mensaje = err?.error?.message || 'Error al crear la categoría';
          this.alertService.danger(mensaje, 'Error', 4000);
        }
      });
    }
  }

  eliminarCategoria(categoria: Categoria) {
    if (!categoria.id_categoria) return;

    if (confirm(`¿Estás seguro de eliminar la categoría "${categoria.nombre}"?`)) {
      this.categoriaEliminando = categoria.id_categoria;

      this.categoriaService.eliminarCategoria(categoria.id_categoria).subscribe({
        next: () => {
          this.alertService.success('Categoría eliminada', 'Eliminado', 3000);
          this.cargarCategorias();
          this.categoriaEliminando = null;
        },
        error: (err) => {
          this.categoriaEliminando = null;
          const mensaje = err?.error?.message || 'Error al eliminar la categoría';
          this.alertService.danger(mensaje, 'Error', 4000);
        }
      });
    }
  }
}