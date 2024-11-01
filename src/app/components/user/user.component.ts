import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  selectedUser: User | null = null;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: [null],
      email: [''],
      city: [''],
      zipCode: [''],
      roli: [0], // Default to USER
      password: ['']
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.selectedUser) {
        // Update user
        this.userService.updateUser(this.userForm.value).subscribe(() => {
          this.loadUsers();
          this.resetForm();
        });
      } else {
        // Register new user
        this.userService.registerUser(this.userForm.value).subscribe(() => {
          this.loadUsers();
          this.resetForm();
        });
      }
    }
  }

  selectUser(user: User): void {
    this.selectedUser = user;
    this.userForm.patchValue(user);
  }

 
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      () => {
        this.users = this.users.filter(users => users.id !== id);
      },
      (error) => console.error('Error while deleting user:', error)
    );
  }

  resetForm(): void {
    this.selectedUser = null;
    this.userForm.reset();
  }
}