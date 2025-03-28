export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  imageUrl?: string;
}

export interface ProductRequestDto {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  imageUrl?: string;
}

export interface ProductResponseDto {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  imageUrl?: string;
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  details?: any;
} 