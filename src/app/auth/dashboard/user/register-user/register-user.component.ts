import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { ServicesService } from '../../../services/services.service'; 
import { Role } from '../../../services/services.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  validateForm: FormGroup;
  roles: Role[] = []; // Add a property to hold roles

  constructor(private fb: NonNullableFormBuilder, private service: ServicesService) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      roli: ['', [Validators.required]], // Role selection
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.confirmationValidator]],
    });
  }

  ngOnInit(): void {
    this.fetchRoles(); // Call method to fetch roles when the component initializes
  }

  fetchRoles(): void {
    this.service.getRoles().subscribe({
      next: (res) => {
        this.roles = res; // Assign fetched roles to the roles property
      },
      error: (err) => {
        console.error('Failed to fetch roles:', err);
      }
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const formData = this.validateForm.value;  
      console.log('Form Submitted', formData);
      this.service.register(formData).subscribe({
        next: (res) => {
          console.log('Registration successful:', res);
        },
        error: (err) => {
          console.error('Registration failed:', err);
        }
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls['confirmPassword'].updateValueAndValidity());
  }

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.get('password')?.value) {
      return { confirm: true };
    }
    return null;
  };

}
