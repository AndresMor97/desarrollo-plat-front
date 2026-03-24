import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaccion } from '../models/transaccion';

@Injectable({
    providedIn: 'root'
})
export class TransaccionService {
  // Ajusta esta URL según el puerto de tu backend en Python
    private apiUrl = 'http://localhost:5000/api/transacciones'; 

    constructor(private http: HttpClient) { }

    crearTransaccion(transaccion: Transaccion): Observable<any> {
    return this.http.post(this.apiUrl, transaccion);
    }
}