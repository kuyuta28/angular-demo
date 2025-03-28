import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { Product, ProductRequestDto } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ApiResponseService } from '../../services/api-response.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // Products data
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  
  // UI state
  loading = false;
  showModal = false;
  isEditing = false;
  currentProductId: number | null = null;
  searchTerm = '';
  categoryFilter = '';
  maxPriceFilter: number | null = null;
  inStockOnly = false;
  
  // Form
  productForm!: FormGroup;
  formSubmitted = false;

  constructor(
    private productService: ProductService,
    private apiResponseService: ApiResponseService,
    private formBuilder: FormBuilder,
    private translate: TranslateService
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.loadProducts();
  }

  // Initialize the form
  private initForm() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      imageUrl: ['']
    });
  }

  // Get total inventory value
  getTotalInventoryValue(): number {
    return this.products.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);
  }

  // Load all products from API
  loadProducts() {
    this.loading = true;
    this.productService.getProducts()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.products = data;
          this.filteredProducts = [...data];
          this.extractCategories();
          this.apiResponseService.showSuccess(
            this.translate.instant('PRODUCT.LOADED_SUCCESSFULLY')
          );
        },
        error: (error) => {
          this.apiResponseService.showError(
            this.translate.instant('PRODUCT.LOAD_ERROR')
          );
          console.error('Error loading products:', error);
        }
      });
  }

  // Extract unique categories from products
  private extractCategories() {
    this.categories = [...new Set(this.products.map(p => p.category))];
  }

  // Filter products based on search, category, and stock filters
  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      // Search term filter
      const matchesSearch = !this.searchTerm || 
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = !this.categoryFilter || 
        product.category === this.categoryFilter;
      
      // Max price filter
      const matchesPrice = !this.maxPriceFilter || 
        product.price <= this.maxPriceFilter;
      
      // Stock filter
      const matchesStock = !this.inStockOnly || 
        product.quantity > 0;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesStock;
    });
  }

  // Toggle in-stock only filter
  toggleStockFilter() {
    this.inStockOnly = !this.inStockOnly;
    this.filterProducts();
  }

  // Reset all filters
  resetFilters() {
    this.searchTerm = '';
    this.categoryFilter = '';
    this.maxPriceFilter = null;
    this.inStockOnly = false;
    this.filteredProducts = [...this.products];
  }

  // Open modal for creating a product
  openAddProductModal() {
    this.isEditing = false;
    this.currentProductId = null;
    this.productForm.reset({
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      category: '',
      imageUrl: ''
    });
    this.formSubmitted = false;
    this.showModal = true;
  }

  // Open modal for editing a product
  editProduct(product: Product) {
    this.isEditing = true;
    this.currentProductId = product.id;
    this.productForm.setValue({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      imageUrl: product.imageUrl || ''
    });
    this.formSubmitted = false;
    this.showModal = true;
  }

  // Close the modal
  closeModal() {
    this.showModal = false;
  }

  // Submit the form to create or update a product
  submitProduct() {
    this.formSubmitted = true;
    
    if (this.productForm.invalid) {
      return;
    }
    
    const productData: ProductRequestDto = {
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      quantity: this.productForm.value.quantity,
      category: this.productForm.value.category,
      imageUrl: this.productForm.value.imageUrl || undefined
    };
    
    this.loading = true;
    
    if (this.isEditing && this.currentProductId !== null) {
      // Update existing product
      this.productService.updateProduct(this.currentProductId, productData)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: () => {
            this.apiResponseService.showSuccess(
              this.translate.instant('PRODUCT.UPDATED_SUCCESSFULLY')
            );
            this.closeModal();
            this.loadProducts();
          },
          error: (error) => {
            this.apiResponseService.showError(
              this.translate.instant('PRODUCT.UPDATE_ERROR')
            );
            console.error('Error updating product:', error);
          }
        });
    } else {
      // Create new product
      this.productService.createProduct(productData)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: () => {
            this.apiResponseService.showSuccess(
              this.translate.instant('PRODUCT.CREATED_SUCCESSFULLY')
            );
            this.closeModal();
            this.loadProducts();
          },
          error: (error) => {
            this.apiResponseService.showError(
              this.translate.instant('PRODUCT.CREATE_ERROR')
            );
            console.error('Error creating product:', error);
          }
        });
    }
  }

  // Delete a product
  deleteProduct(id: number) {
    if (confirm(this.translate.instant('PRODUCT.CONFIRM_DELETE'))) {
      this.loading = true;
      this.productService.deleteProduct(id)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: () => {
            this.apiResponseService.showSuccess(
              this.translate.instant('PRODUCT.DELETED_SUCCESSFULLY')
            );
            this.loadProducts();
          },
          error: (error) => {
            this.apiResponseService.showError(
              this.translate.instant('PRODUCT.DELETE_ERROR')
            );
            console.error('Error deleting product:', error);
          }
        });
    }
  }

  // Search products by name
  searchProducts() {
    if (this.searchTerm && this.searchTerm.length >= 3) {
      this.loading = true;
      this.productService.searchProductsByName(this.searchTerm)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (data) => {
            this.filteredProducts = data;
          },
          error: (error) => {
            this.apiResponseService.showError(
              this.translate.instant('PRODUCT.SEARCH_ERROR')
            );
            console.error('Error searching products:', error);
          }
        });
    } else {
      this.filterProducts();
    }
  }

  // Find products by price range
  filterByMaxPrice() {
    if (this.maxPriceFilter && this.maxPriceFilter > 0) {
      this.loading = true;
      this.productService.getProductsByMaxPrice(this.maxPriceFilter)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (data) => {
            this.filteredProducts = data;
          },
          error: (error) => {
            this.apiResponseService.showError(
              this.translate.instant('PRODUCT.PRICE_FILTER_ERROR')
            );
            console.error('Error filtering by price:', error);
          }
        });
    } else {
      this.filterProducts();
    }
  }

  // Find products by category
  filterByCategory() {
    if (this.categoryFilter) {
      this.loading = true;
      this.productService.getProductsByCategory(this.categoryFilter)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (data) => {
            this.filteredProducts = data;
          },
          error: (error) => {
            this.apiResponseService.showError(
              this.translate.instant('PRODUCT.CATEGORY_FILTER_ERROR')
            );
            console.error('Error filtering by category:', error);
          }
        });
    } else {
      this.filterProducts();
    }
  }

  // Form validation helpers
  get f() { 
    return this.productForm.controls; 
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.productForm.get(field);
    return !!(formControl && formControl.invalid && (formControl.dirty || formControl.touched || this.formSubmitted));
  }

  getErrorMessage(field: string): string {
    const formControl = this.productForm.get(field);
    
    if (!formControl) {
      return '';
    }
    
    if (formControl.errors?.['required']) {
      return this.translate.instant('VALIDATION.REQUIRED');
    }
    
    if (formControl.errors?.['minlength']) {
      return this.translate.instant('VALIDATION.MINLENGTH', { 
        minLength: formControl.errors?.['minlength'].requiredLength 
      });
    }
    
    if (formControl.errors?.['min']) {
      return this.translate.instant('VALIDATION.MIN', { 
        min: formControl.errors?.['min'].min 
      });
    }
    
    return '';
  }
}