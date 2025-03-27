import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="min-h-screen bg-gray-50 flex">
      <!-- Sidebar -->
      <aside class="fixed inset-y-0 left-0 w-64 bg-indigo-700 shadow-xl transition-all duration-300 z-10">
        <div class="flex flex-col h-full">
          <div class="p-5 border-b border-indigo-800">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h1 class="text-xl font-bold text-white ml-3">Admin Portal</h1>
            </div>
          </div>
          <nav class="flex-1 p-4 mt-4">
            <ul class="space-y-3">
              <li>
                <a routerLink="/dashboard" routerLinkActive="bg-indigo-800" [routerLinkActiveOptions]="{exact: true}"
                   class="flex items-center p-3 text-white rounded-lg hover:bg-indigo-800 transition-all duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Dashboard
                </a>
              </li>
              <li>
                <a routerLink="/dashboard/users" routerLinkActive="bg-indigo-800"
                   class="flex items-center p-3 text-white rounded-lg hover:bg-indigo-800 transition-all duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Users
                </a>
              </li>
              <li>
                <a routerLink="/dashboard/products" routerLinkActive="bg-indigo-800"
                   class="flex items-center p-3 text-white rounded-lg hover:bg-indigo-800 transition-all duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Products
                </a>
              </li>
            </ul>
          </nav>
          <div class="p-4 border-t border-indigo-800">
            <a href="#" class="flex items-center text-white opacity-80 hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </a>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="ml-64 w-full p-8">
        <div class="container mx-auto">
          <div class="bg-white rounded-xl shadow-md p-6 mb-8">
            <router-outlet></router-outlet>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: []
})
export class DashboardComponent {} 