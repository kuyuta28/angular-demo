import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

/**
 * Configuration interface for API settings
 */
export interface ApiConfig {
  baseUrl: string;
  apiPath: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}

/**
 * Service for centralized configuration management
 */
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiConfig: ApiConfig;

  constructor() {
    // Default configuration that can be overridden by environment settings
    this.apiConfig = {
      baseUrl: environment.apiBaseUrl || '',
      apiPath: environment.apiPath || '/api',
      timeout: environment.apiTimeout || 30000,
      retryAttempts: environment.retryAttempts || 3,
      retryDelay: environment.retryDelay || 1000
    };
  }

  /**
   * Get the full API URL for a specific endpoint
   */
  getApiUrl(endpoint: string): string {
    const baseUrl = this.apiConfig.baseUrl;
    const apiPath = this.apiConfig.apiPath;
    
    // Handle both absolute and relative endpoints
    if (endpoint.startsWith('/')) {
      return `${baseUrl}${endpoint}`;
    }
    
    return `${baseUrl}${apiPath}/${endpoint}`;
  }

  /**
   * Get the API configuration
   */
  getApiConfig(): ApiConfig {
    return { ...this.apiConfig };
  }

  /**
   * Update the API configuration
   */
  setApiConfig(config: Partial<ApiConfig>): void {
    this.apiConfig = { ...this.apiConfig, ...config };
  }
} 