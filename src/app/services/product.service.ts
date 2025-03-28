import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, timeout, retry } from 'rxjs/operators';
import { Product, ProductRequestDto, ProductResponseDto, ErrorResponse } from '../models/product.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private endpoint = 'products';

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {}

  /**
   * Get all products
   */
  getProducts(): Observable<Product[]> {
    const url = this.configService.getApiUrl(this.endpoint);
    const config = this.configService.getApiConfig();
    
    return this.http.get<ProductResponseDto[]>(url)
      .pipe(
        timeout(config.timeout),
        retry(config.retryAttempts),
        map(response => response as Product[]),
        catchError(this.handleError)
      );
  }

  /**
   * Get a product by ID
   */
  getProductById(id: number): Observable<Product> {
    const url = this.configService.getApiUrl(`${this.endpoint}/${id}`);
    const config = this.configService.getApiConfig();
    
    return this.http.get<ProductResponseDto>(url)
      .pipe(
        timeout(config.timeout),
        retry(config.retryAttempts),
        map(response => response as Product),
        catchError(this.handleError)
      );
  }

  /**
   * Create a new product
   */
  createProduct(product: ProductRequestDto): Observable<Product> {
    const url = this.configService.getApiUrl(this.endpoint);
    const config = this.configService.getApiConfig();
    
    return this.http.post<ProductResponseDto>(url, product)
      .pipe(
        timeout(config.timeout),
        map(response => response as Product),
        catchError(this.handleError)
      );
  }

  /**
   * Update an existing product
   */
  updateProduct(id: number, product: ProductRequestDto): Observable<Product> {
    const url = this.configService.getApiUrl(`${this.endpoint}/${id}`);
    const config = this.configService.getApiConfig();
    
    return this.http.put<ProductResponseDto>(url, product)
      .pipe(
        timeout(config.timeout),
        map(response => response as Product),
        catchError(this.handleError)
      );
  }

  /**
   * Delete a product
   */
  deleteProduct(id: number): Observable<void> {
    const url = this.configService.getApiUrl(`${this.endpoint}/${id}`);
    const config = this.configService.getApiConfig();
    
    return this.http.delete<void>(url)
      .pipe(
        timeout(config.timeout),
        catchError(this.handleError)
      );
  }

  /**
   * Search products by name
   */
  searchProductsByName(name: string): Observable<Product[]> {
    const url = this.configService.getApiUrl(`${this.endpoint}/search`);
    const config = this.configService.getApiConfig();
    const params = new HttpParams().set('name', name);
    
    return this.http.get<ProductResponseDto[]>(url, { params })
      .pipe(
        timeout(config.timeout),
        retry(config.retryAttempts),
        map(response => response as Product[]),
        catchError(this.handleError)
      );
  }

  /**
   * Get products by maximum price
   */
  getProductsByMaxPrice(maxPrice: number): Observable<Product[]> {
    const url = this.configService.getApiUrl(`${this.endpoint}/price/${maxPrice}`);
    const config = this.configService.getApiConfig();
    
    return this.http.get<ProductResponseDto[]>(url)
      .pipe(
        timeout(config.timeout),
        retry(config.retryAttempts),
        map(response => response as Product[]),
        catchError(this.handleError)
      );
  }

  /**
   * Get products by category
   */
  getProductsByCategory(category: string): Observable<Product[]> {
    const url = this.configService.getApiUrl(`${this.endpoint}/category/${category}`);
    const config = this.configService.getApiConfig();
    
    return this.http.get<ProductResponseDto[]>(url)
      .pipe(
        timeout(config.timeout),
        retry(config.retryAttempts),
        map(response => response as Product[]),
        catchError(this.handleError)
      );
  }

  /**
   * Error handler for HTTP requests
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      const serverError = error.error as ErrorResponse;
      errorMessage = serverError.message || `Error Code: ${error.status}, Message: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
} 