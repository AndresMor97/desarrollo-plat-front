import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { AlertService, Alert } from '../saldo/service/alert.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-alerts-container',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  template: `
    <div class="alerts-container">
      <app-alert 
        *ngFor="let alert of alerts; trackBy: trackByAlertId"
        [type]="alert.type"
        [title]="alert.title || ''"
        [message]="alert.message"
        [dismissible]="alert.dismissible ?? true"
        (closed)="onAlertClosed(alert.id)"
      ></app-alert>
    </div>
  `,
  styles: [`
    .alerts-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      max-width: 400px;
      pointer-events: none;
    }

    .alerts-container app-alert {
      pointer-events: auto;
    }

    @media (max-width: 576px) {
      .alerts-container {
        left: 10px;
        right: 10px;
        max-width: none;
      }
    }
  `]
})
export class AlertsContainerComponent implements OnInit, OnDestroy {
  alerts: Alert[] = [];
  private destroy$ = new Subject<void>();

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.alerts$
      .pipe(takeUntil(this.destroy$))
      .subscribe(alerts => {
        this.alerts = alerts;
      });
  }

  onAlertClosed(id: string) {
    this.alertService.removeAlert(id);
  }

  trackByAlertId(index: number, alert: Alert): string {
    return alert.id;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

