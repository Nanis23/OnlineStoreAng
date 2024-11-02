import { Component, OnInit } from '@angular/core';
import { UserService, UserDTO } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: UserDTO[] = [];
  newUser: UserDTO = { id: 0, email: '', city: '', zipCode: '', roli: 0 };
  editingUser: UserDTO | null = null;
  searchTerm: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Load users from the service
  loadUsers(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  updateUser(): void {
    if (this.editingUser) {
      this.userService.updateUser(this.editingUser).subscribe(() => {
        this.loadUsers();
        this.cancelEditing(); // Reset editing user after update
      });
    }
  }

  // Register or update a user based on whether we're editing
  registerOrUpdateUser(): void {
    if (this.editingUser) {
      // Update existing user
      this.userService.updateUser(this.editingUser).subscribe(() => {
        this.loadUsers();
        this.editingUser = null; // Clear edit mode after update
        this.resetNewUser();
      });
    } else {
      // Register a new user
      this.userService.registerUser(this.newUser).subscribe(() => {
        this.loadUsers();
        this.resetNewUser(); // Reset form after adding new user
      });
    }
  }

  // Reset newUser object
  resetNewUser(): void {
    this.newUser = { id: 0, email: '', city: '', zipCode: '', roli: 0 };
  }

  // Start editing a user
  startEditing(user: UserDTO): void {
    this.editingUser = { ...user }; // Create a copy of the user for editing
  }

  // Cancel editing
  cancelEditing(): void {
    this.editingUser = null;
  }

  // Delete a user
  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
    });
  }

  // Filter users based on search term
  filteredUsers(): UserDTO[] {
    return this.users.filter((user) =>
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Update methods for individual fields
  updateEditingUserRoli(roli: number): void {
    if (this.editingUser) {
      this.editingUser.roli = roli;
    }
  }
  updateEditingUserZipCode(zipCode: string): void {
    if (this.editingUser) {
      this.editingUser.zipCode = zipCode;
    }
  }
  updateEditingUserCity(city: string): void {
    if (this.editingUser) {
      this.editingUser.city = city;
    }
  }
  updateEditingUserEmail(email: string): void {
    if (this.editingUser) {
      this.editingUser.email = email;
    }
  }
}
