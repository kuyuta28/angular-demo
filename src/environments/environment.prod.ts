/**
 * Production environment configuration
 * For more extensive configuration, use the external config file at assets/config/app-config.prod.json
 * This file primarily sets the environment type and points to the external configuration
 */
export const environment = {
  // Basic environment flag
  production: true,
  
  // External configuration path - change this to load different configs
  configPath: 'assets/config/app-config.prod.json',
  
  // Default API settings that can be overridden by external config
  apiBaseUrl: '',
  apiPath: '/api',
  apiTimeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000
}; 