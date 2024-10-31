import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'] // Ensure this is plural (styleUrls)
})
export class UpdateUserComponent implements OnInit { // Implement OnInit interface

  users : User[]=[] // Use User interface

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data; // Assign fetched user data to the users array
      },
      error: (err) => {
        console.error('Error fetching users:', err); // Log any errors
      },
    });
  }
}
