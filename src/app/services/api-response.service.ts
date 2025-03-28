import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ErrorResponse } from '../models/product.model';

export enum NotificationType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info'
}

export interface Notification {
  type: NotificationType;
  message: string;
  title?: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiResponseService {
  private notifications: Notification[] = [];

  constructor() {}

  /**
   * Add a notification to the queue
   */
  addNotification(notification: Notification): void {
    this.notifications.push(notification);
    
    // Auto-remove notification after duration (default: 5000ms)
    setTimeout(() => {
      this.removeNotification(notification);
    }, notification.duration || 5000);
  }

  /**
   * Remove a notification from the queue
   */
  removeNotification(notification: Notification): void {
    const index = this.notifications.indexOf(notification);
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  }

  /**
   * Get all active notifications
   */
  getNotifications(): Notification[] {
    return [...this.notifications];
  }

  /**
   * Clear all notifications
   */
  clearNotifications(): void {
    this.notifications = [];
  }

  /**
   * Show a success notification
   */
  showSuccess(message: string, title?: string, duration?: number): void {
    this.addNotification({
      type: NotificationType.Success,
      message,
      title,
      duration
    });
  }

  /**
   * Show an error notification
   */
  showError(message: string, title?: string, duration?: number): void {
    this.addNotification({
      type: NotificationType.Error,
      message,
      title,
      duration
    });
  }

  /**
   * Show a warning notification
   */
  showWarning(message: string, title?: string, duration?: number): void {
    this.addNotification({
      type: NotificationType.Warning,
      message,
      title,
      duration
    });
  }

  /**
   * Show an info notification
   */
  showInfo(message: string, title?: string, duration?: number): void {
    this.addNotification({
      type: NotificationType.Info,
      message,
      title,
      duration
    });
  }

  /**
   * Handle API error and return a formatted error message
   */
  handleApiError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.message}`;
    } else if (error.error) {
      // Server-side error
      const serverError = error.error as ErrorResponse;
      errorMessage = serverError.message || `Error Code: ${error.status}, Message: ${error.statusText}`;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    this.showError(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
} 