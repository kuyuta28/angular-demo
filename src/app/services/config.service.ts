import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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
 * Application configuration
 */
export interface AppConfig {
  api: ApiConfig;
  features: Record<string, boolean>;
  version: string;
  theme: string;
  [key: string]: any; // Allow any additional configuration properties
}

/**
 * Service for centralized configuration management
 * Provides a flexible approach to load and update configuration at runtime
 */
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: AppConfig;
  private configUrl: string;
  private initialized = false;

  constructor(private http: HttpClient) {
    // Get external config path from environment
    this.configUrl = environment.configPath || 'assets/config/app-config.json';
    
    // Default configuration that can be overridden by environment settings or external config
    this.config = {
      api: {
        baseUrl: environment.apiBaseUrl || '',
        apiPath: environment.apiPath || '/api',
        timeout: environment.apiTimeout || 30000,
        retryAttempts: environment.retryAttempts || 3,
        retryDelay: environment.retryDelay || 1000
      },
      features: {
        enableNotifications: true,
        darkMode: false
      },
      version: '1.0.0',
      theme: 'default'
    };
  }

  /**
   * Load configuration from external JSON file
   * Can be called during app initialization to load configuration before the app starts
   */
  loadConfig(): Observable<AppConfig> {
    if (this.initialized) {
      return of(this.config);
    }

    console.log(`Loading configuration from: ${this.configUrl}`);
    
    return this.http.get<AppConfig>(this.configUrl).pipe(
      tap(config => {
        console.log('External configuration loaded');
        this.updateConfig(config);
        this.initialized = true;
      }),
      catchError(error => {
        console.warn('Could not load external configuration, using default', error);
        this.initialized = true;
        return of(this.config);
      })
    );
  }

  /**
   * Update the entire configuration or parts of it
   * @param config Full or partial configuration object
   */
  updateConfig(config: Partial<AppConfig>): void {
    // Deep merge the config
    this.deepMerge(this.config, config);
    console.log('Configuration updated:', this.config);
  }

  /**
   * Get the full API URL for a specific endpoint
   */
  getApiUrl(endpoint: string): string {
    const baseUrl = this.config.api.baseUrl;
    const apiPath = this.config.api.apiPath;
    
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
    return { ...this.config.api };
  }

  /**
   * Update the API configuration
   */
  setApiConfig(apiConfig: Partial<ApiConfig>): void {
    this.config.api = { ...this.config.api, ...apiConfig };
  }

  /**
   * Get the entire configuration
   */
  getConfig(): AppConfig {
    return { ...this.config };
  }

  /**
   * Get a specific configuration value by path
   * @param path Dot notation path to the config value (e.g. 'api.baseUrl')
   * @param defaultValue Default value if path doesn't exist
   */
  getValue<T>(path: string, defaultValue?: T): T {
    const value = path.split('.').reduce((obj, key) => {
      return obj && obj[key] !== undefined ? obj[key] : undefined;
    }, this.config as any);
    
    return (value !== undefined) ? value : defaultValue as T;
  }

  /**
   * Set a specific configuration value by path
   * @param path Dot notation path to the config value (e.g. 'api.baseUrl')
   * @param value The value to set
   */
  setValue(path: string, value: any): void {
    const parts = path.split('.');
    let current = this.config;
    
    for (let i = 0; i < parts.length - 1; i++) {
      const key = parts[i];
      if (!current[key]) {
        current[key] = {};
      }
      current = current[key];
    }
    
    current[parts[parts.length - 1]] = value;
  }

  /**
   * Deep merge two objects
   */
  private deepMerge(target: any, source: any): any {
    if (!source) return target;
    
    Object.keys(source).forEach(key => {
      if (source[key] instanceof Object && key in target) {
        this.deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    });
    
    return target;
  }
} 