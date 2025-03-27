import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-dashboard-home',
  template: `
    <div>
      <div class="flex justify-between items-center mb-8">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
          <p class="text-gray-600 mt-1">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div class="flex space-x-2">
          <button class="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>
          <button class="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-card p-6 border border-gray-100">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <div class="text-sm font-medium text-gray-500">Total Users</div>
              <div class="text-xl font-semibold">{{ usersCount }}</div>
            </div>
          </div>
          <div class="mt-3 text-sm font-medium text-green-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>+12.5% from last week</span>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-card p-6 border border-gray-100">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <div class="text-sm font-medium text-gray-500">Total Products</div>
              <div class="text-xl font-semibold">{{ productsCount }}</div>
            </div>
          </div>
          <div class="mt-3 text-sm font-medium text-green-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>+8.3% from last month</span>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-card p-6 border border-gray-100">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div class="text-sm font-medium text-gray-500">Revenue</div>
              <div class="text-xl font-semibold">$24,780.50</div>
            </div>
          </div>
          <div class="mt-3 text-sm font-medium text-green-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>+18.2% from last month</span>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-card p-6 border border-gray-100">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <div class="text-sm font-medium text-gray-500">Orders</div>
              <div class="text-xl font-semibold">834</div>
            </div>
          </div>
          <div class="mt-3 text-sm font-medium text-red-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span>-5.1% from last week</span>
          </div>
        </div>
      </div>

      <!-- Two column layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <!-- Chart -->
          <div class="bg-white rounded-xl shadow-card p-6 border border-gray-100 mb-8">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-semibold text-gray-800">Monthly Revenue</h3>
              <div class="flex space-x-2">
                <button class="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100">Weekly</button>
                <button class="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Monthly</button>
                <button class="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100">Yearly</button>
              </div>
            </div>
            
            <div class="h-80 flex items-center justify-center">
              <!-- Placeholder for chart -->
              <div class="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center">
                <div class="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p class="text-gray-500">Chart would appear here in a real implementation</p>
                  <p class="text-gray-400 text-sm mt-1">Bar chart showing monthly revenue over the past year</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Orders Table -->
          <div class="bg-white rounded-xl shadow-card border border-gray-100">
            <div class="p-6 border-b border-gray-100">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-gray-800">Recent Orders</h3>
                <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-800">View All</a>
              </div>
            </div>
            
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-007812</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jacob Smith</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jun 8, 2023</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$120.00</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-007811</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Alex Johnson</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Processing</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jun 7, 2023</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$89.99</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-007810</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sarah Williams</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Shipped</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jun 6, 2023</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$59.49</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-007809</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Michael Brown</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Cancelled</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jun 6, 2023</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$149.99</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <!-- User activity card -->
          <div class="bg-white rounded-xl shadow-card p-6 border border-gray-100 mb-8">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
            
            <div class="space-y-5">
              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">A</div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-900">Admin updated inventory</p>
                  <p class="text-xs text-gray-500 mt-1">10 minutes ago</p>
                </div>
              </div>
              
              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">S</div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-900">Sarah added a new product</p>
                  <p class="text-xs text-gray-500 mt-1">1 hour ago</p>
                </div>
              </div>
              
              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">J</div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-900">John updated user permissions</p>
                  <p class="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
              
              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">M</div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-900">Michael processed order #ORD-007809</p>
                  <p class="text-xs text-gray-500 mt-1">5 hours ago</p>
                </div>
              </div>
            </div>
            
            <div class="mt-6">
              <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-800">View all activity</a>
            </div>
          </div>
          
          <!-- Top Products card -->
          <div class="bg-white rounded-xl shadow-card p-6 border border-gray-100">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Top Products</h3>
            
            <div class="space-y-4">
              <div *ngFor="let product of topProducts; let i = index" class="flex items-center">
                <div class="flex-shrink-0 w-2 h-10 rounded-full" [class]="getColorClass(i)"></div>
                <div class="ml-3 flex-grow">
                  <div class="flex justify-between items-center mb-1">
                    <p class="text-sm font-medium text-gray-900">{{ product.name }}</p>
                    <p class="text-sm font-medium text-gray-900">{{ '$' + product.price.toFixed(2) }}</p>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-1.5">
                    <div class="h-1.5 rounded-full" [class]="getBgColorClass(i)" [style.width.%]="product.popularity"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DashboardHomeComponent implements OnInit {
  usersCount = 0;
  productsCount = 0;
  topProducts: any[] = [];

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.loadData();
    this.initializeTopProducts();
  }

  loadData(): void {
    this.usersCount = this.storageService.getUsers().length;
    this.productsCount = this.storageService.getProducts().length;
  }

  initializeTopProducts(): void {
    const products = this.storageService.getProducts();
    
    this.topProducts = products.slice(0, 5).map(product => ({
      name: product.name,
      price: product.price,
      popularity: Math.floor(Math.random() * 45) + 55 // Random value between 55-100 for demo
    }));
  }

  getColor(index: number, colors: string[]): string {
    return colors[index % colors.length];
  }

  getColorClass(index: number): string {
    return this.getColor(index, [
      'bg-indigo-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-amber-500',
      'bg-purple-500'
    ]);
  }

  getBgColorClass(index: number): string {
    return this.getColor(index, [
      'bg-indigo-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-amber-500',
      'bg-purple-500'
    ]);
  }
} 