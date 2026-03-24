import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Saldo } from '../models/saldo';

@Injectable({
    providedIn: 'root'
})
export class SaldoService {
    private apiUrl = 'http://localhost:5000/api/saldo';

    constructor(private http: HttpClient) { }

// Recibe el ID del usuario y arma la ruta que me indicaste
    getSaldo(idUsuario: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id_usuario=${idUsuario}`);
    }
}