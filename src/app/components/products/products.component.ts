import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-products',
  template: `
    <div>
      <div class="flex justify-between items-center mb-8">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Product Management</h2>
          <p class="text-gray-600 mt-1">Manage your inventory and product listings</p>
        </div>
        <button (click)="openAddProductModal()" 
                class="flex items-center bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      <!-- Stats Row -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div class="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-md p-5 text-white">
          <div class="flex items-center">
            <div class="rounded-full bg-white bg-opacity-30 p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <p class="text-white text-opacity-80 text-sm">Total Products</p>
              <h3 class="text-2xl font-bold">{{ products.length }}</h3>
            </div>
          </div>
        </div>
        <div class="bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg shadow-md p-5 text-white">
          <div class="flex items-center">
            <div class="rounded-full bg-white bg-opacity-30 p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p class="text-white text-opacity-80 text-sm">Categories</p>
              <h3 class="text-2xl font-bold">{{ getUniqueCategories().length }}</h3>
            </div>
          </div>
        </div>
        <div class="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg shadow-md p-5 text-white">
          <div class="flex items-center">
            <div class="rounded-full bg-white bg-opacity-30 p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <div>
              <p class="text-white text-opacity-80 text-sm">In Stock</p>
              <h3 class="text-2xl font-bold">{{ getTotalStock() }}</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and filter bar -->
      <div class="bg-white rounded-lg shadow-md p-4 mb-8 flex flex-col sm:flex-row gap-4">
        <div class="relative flex-grow">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            [(ngModel)]="searchTerm"
            (keyup)="filterProducts()"
            placeholder="Search products..."
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <select
          [(ngModel)]="categoryFilter"
          (change)="filterProducts()"
          class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          <option value="">All Categories</option>
          <option *ngFor="let category of getUniqueCategories()" [value]="category">{{ category }}</option>
        </select>
        <button
          (click)="toggleStockFilter()"
          [class.bg-indigo-600]="inStockOnly"
          [class.text-white]="inStockOnly"
          [class.bg-white]="!inStockOnly"
          [class.text-gray-700]="!inStockOnly"
          class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
          In Stock Only
        </button>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let product of filteredProducts" 
             class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
          <div class="h-48 bg-gray-200 relative overflow-hidden">
            <img [src]="product.imageUrl || 'https://via.placeholder.com/400x300?text=' + product.name" 
                 [alt]="product.name"
                 class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
            <div class="absolute top-2 right-2">
              <span class="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {{ product.category }}
              </span>
            </div>
          </div>
          <div class="p-5">
            <h3 class="text-lg font-semibold text-gray-800 mb-2 truncate">{{ product.name }}</h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ product.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-lg font-bold text-indigo-600">{{ '$' + product.price.toFixed(2) }}</span>
              <span [class]="product.stock > 0 ? 'text-green-600' : 'text-red-600'" class="text-sm font-medium">
                {{ product.stock > 0 ? 'In Stock: ' + product.stock : 'Out of Stock' }}
              </span>
            </div>
            <div class="mt-4 flex justify-end space-x-2">
              <button (click)="editProduct(product)" 
                      class="text-indigo-600 hover:text-indigo-900 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button (click)="deleteProduct(product.id)" 
                      class="text-red-600 hover:text-red-900 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div *ngIf="filteredProducts.length === 0" class="bg-white rounded-lg shadow-md p-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-1">No products found</h3>
        <p class="text-gray-500 mb-4">
          {{ searchTerm || categoryFilter || inStockOnly ? 'No products match your current filters.' : 'Add some products to get started.' }}
        </p>
        <button 
          *ngIf="searchTerm || categoryFilter || inStockOnly"
          (click)="resetFilters()"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Reset Filters
        </button>
        <button 
          *ngIf="!searchTerm && !categoryFilter && !inStockOnly"
          (click)="openAddProductModal()"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      <!-- Add/Edit Product Modal -->
      <div *ngIf="showModal" class="fixed inset-0 bg-gray-800 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
        <div class="relative p-6 border w-full max-w-md shadow-xl rounded-lg bg-white">
          <button (click)="closeModal()" class="absolute top-4 right-4 text-gray-400 hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div class="mt-3">
            <div class="text-center mb-6">
              <div class="mx-auto h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mt-2">{{ isEditing ? 'Edit Product' : 'Add New Product' }}</h3>
              <p class="text-sm text-gray-500 mt-1">{{ isEditing ? 'Update product information' : 'Enter product details below' }}</p>
            </div>
            <form (ngSubmit)="submitProduct()" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" [(ngModel)]="currentProduct.name" name="name" required
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Description</label>
                <textarea [(ngModel)]="currentProduct.description" name="description" required
                          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          rows="3"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Price</label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input type="number" [(ngModel)]="currentProduct.price" name="price" required
                         class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                         placeholder="0.00"
                         step="0.01"
                         min="0">
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Category</label>
                <input type="text" [(ngModel)]="currentProduct.category" name="category" required
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Stock</label>
                <input type="number" [(ngModel)]="currentProduct.stock" name="stock" required
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                       min="0">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Image URL</label>
                <input type="url" [(ngModel)]="currentProduct.imageUrl" name="imageUrl"
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                       placeholder="https://example.com/image.jpg">
              </div>
              <div class="flex justify-end space-x-3 pt-4">
                <button type="button" (click)="closeModal()"
                        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Cancel
                </button>
                <button type="submit"
                        class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {{ isEditing ? 'Update' : 'Add' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  showModal = false;
  isEditing = false;
  currentProduct: Partial<Product> = {};
  searchTerm = '';
  categoryFilter = '';
  inStockOnly = false;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.storageService.getProducts();
    this.filteredProducts = [...this.products];
  }

  filterProducts() {
    let filtered = [...this.products];
    
    // Apply search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    }
    
    // Apply category filter
    if (this.categoryFilter) {
      filtered = filtered.filter(p => p.category === this.categoryFilter);
    }
    
    // Apply stock filter
    if (this.inStockOnly) {
      filtered = filtered.filter(p => p.stock > 0);
    }
    
    this.filteredProducts = filtered;
  }

  toggleStockFilter() {
    this.inStockOnly = !this.inStockOnly;
    this.filterProducts();
  }

  resetFilters() {
    this.searchTerm = '';
    this.categoryFilter = '';
    this.inStockOnly = false;
    this.filterProducts();
  }

  getUniqueCategories(): string[] {
    return [...new Set(this.products.map(p => p.category))];
  }

  getTotalStock(): number {
    return this.products.reduce((total, product) => total + product.stock, 0);
  }

  openAddProductModal() {
    this.isEditing = false;
    this.currentProduct = {
      name: '',
      description: '',
      price: 0,
      category: '',
      stock: 0,
      imageUrl: ''
    };
    this.showModal = true;
  }

  editProduct(product: Product) {
    this.isEditing = true;
    this.currentProduct = { ...product };
    this.showModal = true;
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.storageService.deleteProduct(id);
      this.loadProducts();
      this.filterProducts();
    }
  }

  submitProduct() {
    if (this.isEditing) {
      this.storageService.updateProduct(this.currentProduct as Product);
    } else {
      this.storageService.addProduct(this.currentProduct as Omit<Product, 'id' | 'createdAt' | 'updatedAt'>);
    }
    this.closeModal();
    this.loadProducts();
    this.filterProducts();
  }

  closeModal() {
    this.showModal = false;
    this.currentProduct = {};
  }
}