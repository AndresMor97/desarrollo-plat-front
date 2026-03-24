import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importamos tus componentes recién creados
import { SaldoComponent } from './demo/pages/saldo/saldo.component'; 
import { TransaccionComponent } from './demo/pages/transaccion/transaccion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // Agregamos tus componentes al arreglo de imports
  imports: [CommonModule, SaldoComponent, TransaccionComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mi App de Finanzas';
}