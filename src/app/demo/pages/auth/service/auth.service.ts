import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  result: {
    token: string;
    nombre: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  private tokenKey = 'auth_token';
  private nombreKey = 'auth_nombre';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  registro(nombre: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, { nombre, email, password });
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        if (response.result?.token) {
          this.setToken(response.result.token);
          this.setNombre(response.result.nombre);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.nombreKey);
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getNombre(): string | null {
    return localStorage.getItem(this.nombreKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private setNombre(nombre: string): void {
    localStorage.setItem(this.nombreKey, nombre);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}