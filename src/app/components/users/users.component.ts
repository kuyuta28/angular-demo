import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-users',
  template: `
    <div class="container mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">User Management</h2>
        <button (click)="openAddUserModal()" 
                class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Add User
        </button>
      </div>

      <!-- Users Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let user of users">
              <td class="px-6 py-4 whitespace-nowrap">{{ user.username }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span [class]="user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'"
                      class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span [class]="user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                      class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ user.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button (click)="editUser(user)" class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button (click)="deleteUser(user.id)" class="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Add/Edit User Modal -->
      <div *ngIf="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-4">{{ isEditing ? 'Edit User' : 'Add New User' }}</h3>
            <form (ngSubmit)="submitUser()" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Username</label>
                <input type="text" [(ngModel)]="currentUser.username" name="username" required
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" [(ngModel)]="currentUser.email" name="email" required
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Role</label>
                <select [(ngModel)]="currentUser.role" name="role" required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Status</label>
                <select [(ngModel)]="currentUser.status" name="status" required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div class="flex justify-end space-x-3">
                <button type="button" (click)="closeModal()"
                        class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                  Cancel
                </button>
                <button type="submit"
                        class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
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
export class UsersComponent implements OnInit {
  users: User[] = [];
  showModal = false;
  isEditing = false;
  currentUser: Partial<User> = {};

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.storageService.getUsers();
  }

  openAddUserModal() {
    this.isEditing = false;
    this.currentUser = {
      username: '',
      email: '',
      role: 'user',
      status: 'active'
    };
    this.showModal = true;
  }

  editUser(user: User) {
    this.isEditing = true;
    this.currentUser = { ...user };
    this.showModal = true;
  }

  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.storageService.deleteUser(id);
      this.loadUsers();
    }
  }

  submitUser() {
    if (this.isEditing) {
      this.storageService.updateUser(this.currentUser as User);
    } else {
      this.storageService.addUser(this.currentUser as Omit<User, 'id' | 'createdAt'>);
    }
    this.closeModal();
    this.loadUsers();
  }

  closeModal() {
    this.showModal = false;
    this.currentUser = {};
  }
} 