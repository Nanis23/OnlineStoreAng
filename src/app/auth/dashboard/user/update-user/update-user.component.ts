import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService, User } from '../../../services/user.service';// Adjust the import as necessary
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-update-user',
  standalone:true,
  imports:[
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  users: User[] = [];
  updateForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.updateForm = this.fb.group({
      email: [''],
      city: [''],
      zipCode: [''],
      roli: [''],
      password: [''] // Optional password field
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data; // Assign the data to the users property
        console.log('Fetched Users:', this.users); // Log fetched users
      },
      error => {
        console.error('Error fetching users:', error); // Log error if any
      }
    );
  }

  selectUser(user: User): void {
    this.updateForm.patchValue({
      email: user.email,
      city: user.city,
      zipCode: user.zipCode,
      roli: user.roli,
      password: '' // Reset password field
    });
  }

  submitUpdate(): void {
    // Update logic here
  }
}
