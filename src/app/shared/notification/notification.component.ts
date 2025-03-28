import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiResponseService, Notification, NotificationType } from '../../services/api-response.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-notification',
  template: `
    <div class="fixed top-4 right-4 z-50 flex flex-col space-y-2 max-w-md">
      <div *ngFor="let notification of notifications" 
           class="notification-item rounded-lg shadow-lg p-4 flex items-start transition-all duration-300 transform"
           [ngClass]="{
             'bg-green-50 border-l-4 border-green-500': notification.type === 'success',
             'bg-red-50 border-l-4 border-red-500': notification.type === 'error',
             'bg-yellow-50 border-l-4 border-yellow-500': notification.type === 'warning',
             'bg-blue-50 border-l-4 border-blue-500': notification.type === 'info'
           }">
        <div class="notification-icon mr-3">
          <!-- Success Icon -->
          <svg *ngIf="notification.type === 'success'" class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          
          <!-- Error Icon -->
          <svg *ngIf="notification.type === 'error'" class="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          
          <!-- Warning Icon -->
          <svg *ngIf="notification.type === 'warning'" class="h-6 w-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          
          <!-- Info Icon -->
          <svg *ngIf="notification.type === 'info'" class="h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>
        
        <div class="notification-content flex-grow">
          <h3 class="text-sm font-medium" 
              [ngClass]="{
                'text-green-800': notification.type === 'success',
                'text-red-800': notification.type === 'error',
                'text-yellow-800': notification.type === 'warning',
                'text-blue-800': notification.type === 'info'
              }">
            {{ notification.title || getDefaultTitle(notification.type) }}
          </h3>
          <p class="mt-1 text-sm" 
             [ngClass]="{
               'text-green-700': notification.type === 'success',
               'text-red-700': notification.type === 'error',
               'text-yellow-700': notification.type === 'warning',
               'text-blue-700': notification.type === 'info'
             }">
            {{ notification.message }}
          </p>
        </div>
        
        <button (click)="dismissNotification(notification)" 
                class="ml-3 flex-shrink-0 h-5 w-5 rounded-full inline-flex items-center justify-center focus:outline-none"
                [ngClass]="{
                  'text-green-500 hover:bg-green-100': notification.type === 'success',
                  'text-red-500 hover:bg-red-100': notification.type === 'error',
                  'text-yellow-500 hover:bg-yellow-100': notification.type === 'warning',
                  'text-blue-500 hover:bg-blue-100': notification.type === 'info'
                }">
          <svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .notification-item {
      animation: slide-in 0.3s ease-out forwards;
    }
    
    @keyframes slide-in {
      0% {
        transform: translateX(100%);
        opacity: 0;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `]
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private updateSubscription: Subscription = new Subscription();

  constructor(private apiResponseService: ApiResponseService) {}

  ngOnInit() {
    // Update notifications every 500ms
    this.updateSubscription = interval(500).subscribe(() => {
      this.notifications = this.apiResponseService.getNotifications();
    });
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  dismissNotification(notification: Notification) {
    this.apiResponseService.removeNotification(notification);
  }

  getDefaultTitle(type: NotificationType): string {
    switch (type) {
      case NotificationType.Success:
        return 'Success';
      case NotificationType.Error:
        return 'Error';
      case NotificationType.Warning:
        return 'Warning';
      case NotificationType.Info:
        return 'Information';
      default:
        return 'Notification';
    }
  }
} 