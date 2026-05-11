import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categoria {
  id_categoria?: number;
  nombre: string;
  id_usuario?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:5000/api/categorias';

  constructor(private http: HttpClient) {}

  crearCategoria(categoria: Categoria): Observable<any> {
    return this.http.post(this.apiUrl, categoria);
  }

  eliminarCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getSaldosPorCategoria(): Observable<any> {
    return this.http.get(`${this.apiUrl}/saldos`);
  }
}