import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // La ruta de tu nuevo API
  private apiUrl = 'http://localhost:5000/api/usuarios';

  // BehaviorSubject para manejar el usuario activo
  private usuarioActualSubject = new BehaviorSubject<number>(2);
  public usuarioActual$ = this.usuarioActualSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  setUsuarioActual(usuarioId: number): void {
    this.usuarioActualSubject.next(usuarioId);
  }

  getUsuarioActual(): number {
    return this.usuarioActualSubject.value;
  }
}