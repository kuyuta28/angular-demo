import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly USERS_KEY = 'admin_dashboard_users';
  private readonly PRODUCTS_KEY = 'admin_dashboard_products';

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    if (!localStorage.getItem(this.USERS_KEY)) {
      const defaultAdmin: User = {
        id: '1',
        username: 'admin',
        email: 'admin@example.com',
        role: 'admin',
        status: 'active',
        createdAt: new Date()
      };
      localStorage.setItem(this.USERS_KEY, JSON.stringify([defaultAdmin]));
    }

    if (!localStorage.getItem(this.PRODUCTS_KEY)) {
      const sampleProducts: Product[] = [
        {
          id: '1',
          name: 'Sample Product 1',
          description: 'This is a sample product',
          price: 99.99,
          category: 'Electronics',
          stock: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          name: 'Sample Product 2',
          description: 'Another sample product',
          price: 149.99,
          category: 'Clothing',
          stock: 50,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(sampleProducts));
    }
  }

  // User methods
  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
  }

  addUser(user: Omit<User, 'id' | 'createdAt'>): User {
    const users = this.getUsers();
    const newUser: User = {
      ...user,
      id: (users.length + 1).toString(),
      createdAt: new Date()
    };
    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return newUser;
  }

  updateUser(user: User): User {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users[index] = { ...user, updatedAt: new Date() };
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }
    return user;
  }

  deleteUser(id: string): void {
    const users = this.getUsers();
    const filteredUsers = users.filter(user => user.id !== id);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(filteredUsers));
  }

  // Product methods
  getProducts(): Product[] {
    return JSON.parse(localStorage.getItem(this.PRODUCTS_KEY) || '[]');
  }

  addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
    const products = this.getProducts();
    const newProduct: Product = {
      ...product,
      id: (products.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    products.push(newProduct);
    localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(products));
    return newProduct;
  }

  updateProduct(product: Product): Product {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      products[index] = { ...product, updatedAt: new Date() };
      localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(products));
    }
    return product;
  }

  deleteProduct(id: string): void {
    const products = this.getProducts();
    const filteredProducts = products.filter(product => product.id !== id);
    localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(filteredProducts));
  }
} 