import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

export type AlertType = 'success' | 'danger' | 'warning' | 'info';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="alert" 
      [ngClass]="'alert-' + type"
      [@fadeInOut]
      role="alert"
    >
      <div class="d-flex justify-content-between align-items-center">
        <div class="alert-content">
          <strong *ngIf="title">{{ title }}</strong>
          <p *ngIf="message" [class]="title ? 'mb-0 mt-1' : 'mb-0'">{{ message }}</p>
        </div>
        <button 
          *ngIf="dismissible"
          type="button" 
          class="btn-close" 
          (click)="onClose()"
          aria-label="Close"
        ></button>
      </div>
    </div>
  `,
  styles: [`
    .alert {
      padding: 12px 16px;
      border-radius: 4px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      animation: slideIn 0.3s ease-in-out;
    }

    .alert-success {
      background-color: rgba(39, 174, 96, 0.15);
      color: var(--accent-green);
      border: 1px solid rgba(39, 174, 96, 0.3);
    }

    .alert-danger {
      background-color: rgba(255, 95, 87, 0.15);
      color: var(--accent-red);
      border: 1px solid rgba(255, 95, 87, 0.3);
    }

    .alert-warning {
      background-color: rgba(255, 193, 7, 0.15);
      color: #ffc107;
      border: 1px solid rgba(255, 193, 7, 0.3);
    }

    .alert-info {
      background-color: rgba(23, 162, 184, 0.15);
      color: #17a2b8;
      border: 1px solid rgba(23, 162, 184, 0.3);
    }

    .btn-close {
      background: transparent;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      opacity: 0.5;
      padding: 0;
      margin-left: 10px;
      flex-shrink: 0;
    }

    .btn-close:hover {
      opacity: 1;
    }

    .d-flex {
      display: flex;
    }

    .justify-content-between {
      justify-content: space-between;
    }

    .align-items-center {
      align-items: center;
    }

    .mb-0 {
      margin-bottom: 0;
    }

    .mt-1 {
      margin-top: 0.25rem;
    }

    .alert-content {
      flex: 1;
    }

    @keyframes slideIn {
      from {
        transform: translateX(-100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class AlertComponent {
  @Input() type: AlertType = 'info';
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() dismissible: boolean = true;
  @Output() closed = new EventEmitter<void>();

  onClose() {
    this.closed.emit();
  }
}

