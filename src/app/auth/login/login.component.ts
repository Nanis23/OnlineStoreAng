import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login-services/login-service.service'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Logging in with', { email, password });

      this.loginService.login({ email, password }).subscribe({
        next: (response) => {
          if (response.message === "Login successful") {
            const role = response.role;
            this.navigateByRole(role);
          } else {
            this.errorMessage = 'Unexpected response from server.';
          }
        },
        error: (err) => {
          this.errorMessage = 'Invalid credentials';
          console.error('Login failed:', err);
        }
      });
    } else {
      this.errorMessage = 'Please enter valid credentials.';
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
    }
  }

  private navigateByRole(role: string): void {
    switch (role) {
      case 'admin':
        this.router.navigate(['/dashboard']);
        break;
      case 'user':
        this.router.navigate(['/dashboard']);
        break;
      case 'author':
        this.router.navigate(['/author-dashboard']);
        break;
      default:
        this.errorMessage = 'Role not recognized.';
        break;
    }
  }
}
