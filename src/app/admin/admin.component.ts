import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: []  // Remove CSS file reference
})
export class AdminComponent implements OnInit {
  adminTitle = 'Admin Dashboard';
  currentTime: string = '';
  
  ngOnInit() {
    // Update time every second to provide visual confirmation of changes
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString();
    }, 1000);
  }
}
