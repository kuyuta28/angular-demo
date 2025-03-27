import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

@Component({
  selector: 'app-products',
  template: `
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold mb-6">Products</h1>
      
      <!-- Search and Filter Controls -->
      <div class="mb-6 flex flex-col md:flex-row gap-4">
        <div class="relative flex-grow">
          <input 
            type="text" 
            placeholder="Search products..." 
            class="w-full p-2 border rounded"
            [(ngModel)]="searchTerm"
            (input)="applyFilters()"
          >
          <button *ngIf="searchTerm" 
            (click)="clearSearch()" 
            class="absolute right-3 top-2.5 text-gray-500">
            ✕
          </button>
        </div>
        
        <select 
          class="p-2 border rounded" 
          [(ngModel)]="categoryFilter"
          (change)="applyFilters()">
          <option value="">All Categories</option>
          <option *ngFor="let category of categories" [value]="category">{{ category }}</option>
        </select>
        
        <button 
          class="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          (click)="toggleStockFilter()">
          {{ showInStockOnly ? 'Show All' : 'In Stock Only' }}
        </button>
      </div>
      
      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div *ngFor="let product of filteredProducts" 
          class="border rounded p-4 hover:shadow-lg transition-shadow">
          <img [src]="product.imageUrl" alt="{{ product.name }}" class="w-full h-48 object-cover">
          <h2 class="text-xl font-semibold mt-2">{{ product.name }}</h2>
          <p class="text-gray-600 text-sm mt-1">{{ product.description }}</p>
          <div class="mt-4 flex justify-between items-center">
            <span class="text-lg font-bold text-blue-600">{{ product.price | currency }}</span>
            <span class="text-sm text-gray-500">Stock: {{ product.stock }}</span>
          </div>
          <div class="mt-4 flex justify-end space-x-2">
            <button 
              class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              [disabled]="product.stock <= 0"
              (click)="addToCart(product)">
              Add to Cart
            </button>
            <button 
              class="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm hover:bg-blue-200"
              (click)="viewDetails(product)">
              Details
            </button>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div *ngIf="filteredProducts.length === 0" class="text-center p-10">
        <p class="text-xl text-gray-600">No products found matching your criteria.</p>
        <button 
          (click)="resetFilters()" 
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Reset Filters
        </button>
      </div>
      
      <!-- Pagination -->
      <div class="mt-8 flex justify-center">
        <nav class="flex items-center space-x-2">
          <button 
            [disabled]="currentPage === 1"
            (click)="goToPage(currentPage - 1)"
            class="px-3 py-1 rounded border" 
            [class.opacity-50]="currentPage === 1">
            Previous
          </button>
          
          <div *ngFor="let page of getPageNumbers()" class="flex space-x-1">
            <button 
              (click)="goToPage(page)"
              class="px-3 py-1 rounded" 
              [class.bg-blue-600]="currentPage === page"
              [class.text-white]="currentPage === page"
              [class.border]="currentPage !== page">
              {{ page }}
            </button>
          </div>
          
          <button 
            [disabled]="currentPage === totalPages"
            (click)="goToPage(currentPage + 1)"
            class="px-3 py-1 rounded border"
            [class.opacity-50]="currentPage === totalPages">
            Next
          </button>
        </nav>
      </div>
    </div>
  `,
  styles: [`
    /* Additional styles can go here */
  `]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  searchTerm = '';
  categoryFilter = '';
  showInStockOnly = false;
  currentPage = 1;
  itemsPerPage = 12;
  totalPages = 1;

  constructor() { }

  ngOnInit(): void {
    // Fetch products and categories
    this.fetchProducts();
    this.extractCategories();
    this.applyFilters();
  }

  fetchProducts(): void {
    // TODO: Replace with actual API call
    this.products = [
      {
        id: 1,
        name: 'Product 1',
        description: 'Description for product 1',
        price: 29.99,
        imageUrl: 'https://via.placeholder.com/300',
        category: 'Category A',
        stock: 10
      },
      {
        id: 2,
        name: 'Product 2',
        description: 'Description for product 2',
        price: 49.99,
        imageUrl: 'https://via.placeholder.com/300',
        category: 'Category B',
        stock: 5
      },
      // Add more sample products as needed
    ];
    this.filteredProducts = [...this.products];
    this.calculateTotalPages();
  }

  extractCategories(): void {
    // Extract unique categories from products
    this.categories = [...new Set(this.products.map(p => p.category))];
  }

  applyFilters(): void {
    let filtered = [...this.products];
    
    // Apply search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term)
      );
    }
    
    // Apply category filter
    if (this.categoryFilter) {
      filtered = filtered.filter(p => p.category === this.categoryFilter);
    }
    
    // Apply stock filter
    if (this.showInStockOnly) {
      filtered = filtered.filter(p => p.stock > 0);
    }
    
    this.filteredProducts = filtered;
    this.calculateTotalPages();
    this.currentPage = 1; // Reset to first page when filters change
  }

  toggleStockFilter(): void {
    this.showInStockOnly = !this.showInStockOnly;
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.categoryFilter = '';
    this.showInStockOnly = false;
    this.applyFilters();
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  addToCart(product: Product): void {
    // TODO: Implement cart functionality
    console.log('Added to cart:', product);
  }

  viewDetails(product: Product): void {
    // TODO: Implement navigation to product details
    console.log('View details:', product);
  }
}