import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User, Role } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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

  
  updateForm: FormGroup;
  users: User[] = [];
  roles: Role[] = [];

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.updateForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      password: [''],
      roli: ['', Validators.required]
    }, { validators: this.updateUserValidator });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  // Load users from the backend
  private loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  // Load roles from the backend
  private loadRoles(): void {
    this.userService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  // Handle selecting a user row to populate the form
  onSelectUser(user: User): void {
    this.updateForm.patchValue({
      id: user.id,
      email: user.email,
      city: user.city,
      zipCode: user.zipCode,
      roli: user.roli
    });
  }

  // Custom validator function
  private updateUserValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.get('email')?.value;
    const city = control.get('city')?.value;
    const zipCode = control.get('zipCode')?.value;

    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const cityValid = city && city.trim() !== '';
    const zipCodeValid = zipCode && zipCode.trim() !== '';

    const errors: ValidationErrors = {};

    if (!emailValid) {
      errors['invalidEmail'] = true;
    }
    if (!cityValid) {
      errors['emptyCity'] = true;
    }
    if (!zipCodeValid) {
      errors['emptyZipCode'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  }

  // Submit updated user data
  submitUpdate(): void {
    if (this.updateForm.valid) {
      const updatedUser: User = {
        id: this.updateForm.getRawValue().id,
        email: this.updateForm.value.email,
        city: this.updateForm.value.city,
        zipCode: this.updateForm.value.zipCode,
        password: this.updateForm.value.password || null,
        roli: this.updateForm.value.roli,
      };

      this.userService.updateUser(updatedUser).subscribe({
        next: (res) => {
          console.log('User updated successfully:', res);
          this.loadUsers();
          this.updateForm.reset();
        },
        error: (err) => {
          console.error('Update failed:', err);
        }
      });
    } else {
      // Mark all form fields as dirty to show validation errors
      Object.values(this.updateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  }
  

