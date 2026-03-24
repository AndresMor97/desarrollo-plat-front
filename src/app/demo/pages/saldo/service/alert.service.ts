import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Alert {
  id: string;
  type: 'success' | 'danger' | 'warning' | 'info';
  title?: string;
  message: string;
  dismissible?: boolean;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertsSubject = new BehaviorSubject<Alert[]>([]);
  public alerts$ = this.alertsSubject.asObservable();

  constructor(private ngZone: NgZone) {}

  success(message: string, title?: string, duration?: number) {
    this.addAlert('success', message, title, duration);
  }

  danger(message: string, title?: string, duration?: number) {
    this.addAlert('danger', message, title, duration);
  }

  warning(message: string, title?: string, duration?: number) {
    this.addAlert('warning', message, title, duration);
  }

  info(message: string, title?: string, duration?: number) {
    this.addAlert('info', message, title, duration);
  }

  addAlert(type: 'success' | 'danger' | 'warning' | 'info', message: string, title?: string, duration?: number) {
    const alert: Alert = {
      id: Date.now().toString() + Math.random(),
      type,
      title,
      message,
      dismissible: true,
      duration: duration || 5000
    };

    const currentAlerts = this.alertsSubject.value;
    this.alertsSubject.next([...currentAlerts, alert]);

    // Auto-cierre después de la duración especificada
    if (alert.duration && alert.duration > 0) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.ngZone.run(() => {
            this.removeAlert(alert.id);
          });
        }, alert.duration);
      });
    }
  }

  removeAlert(id: string) {
    const currentAlerts = this.alertsSubject.value;
    this.alertsSubject.next(currentAlerts.filter(alert => alert.id !== id));
  }

  clearAll() {
    this.alertsSubject.next([]);
  }
}

