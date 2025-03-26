import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-link',
  template: `<a routerLink="/admin" class="admin-link">Go to Admin Page</a>`,
  styleUrls: ['./admin-link.component.css']
})
export class AdminLinkComponent {}
