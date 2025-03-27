import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside class="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div class="flex flex-col h-full">
          <div class="p-4 border-b">
            <h1 class="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          <nav class="flex-1 p-4">
            <ul class="space-y-2">
              <li>
                <a routerLink="/dashboard" routerLinkActive="bg-gray-100" 
                   class="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100">
                  <span class="material-icons mr-2">dashboard</span>
                  Dashboard
                </a>
              </li>
              <li>
                <a routerLink="/dashboard/users" routerLinkActive="bg-gray-100"
                   class="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100">
                  <span class="material-icons mr-2">people</span>
                  Users
                </a>
              </li>
              <li>
                <a routerLink="/dashboard/products" routerLinkActive="bg-gray-100"
                   class="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100">
                  <span class="material-icons mr-2">inventory</span>
                  Products
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="ml-64 p-8">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: []
})
export class DashboardComponent {} 