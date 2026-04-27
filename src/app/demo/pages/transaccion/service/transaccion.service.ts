import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Transaccion } from '../models/transaccion';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  private apiUrl = 'http://localhost:5000/api/transacciones';
  private estadisticasUrl = 'http://localhost:5000/api/estadisticas/gastos';

  private transaccionGuardada = new Subject<void>();
  public transaccionGuardada$ = this.transaccionGuardada.asObservable();

  constructor(private http: HttpClient) { }

  crearTransaccion(transaccion: Transaccion): Observable<any> {
    return this.http.post(this.apiUrl, transaccion);
  }

  getTransacciones(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getEstadisticasGastos(): Observable<any> {
    return this.http.get(this.estadisticasUrl);
  }

  getCategorias(tipo?: string): Observable<any> {
    const url = tipo ? `${this.apiUrl.replace('transacciones', 'categorias')}?tipo=${tipo}` : `${this.apiUrl.replace('transacciones', 'categorias')}`;
    return this.http.get(url);
  }

  notificarTransaccionGuardada(): void {
    this.transaccionGuardada.next();
  }

  eliminarTransaccion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}