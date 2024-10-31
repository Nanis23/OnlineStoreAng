import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const BASE_URL = "http://localhost:8080"; // Update to your endpoint

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // Method to retrieve users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${BASE_URL}/api/user/allUsers`).pipe(
      catchError(this.handleError) // Add error handling
    );
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error); // Log the error to the console
    return throwError('Something went wrong; please try again later.'); // Return a user-friendly message
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${BASE_URL}/api/roles`); // Adjust the endpoint as needed
  }
}

// User interface definition
export interface User {
  id: number; // Ensure this is defined
  email: string;
  city: string;
  zipCode: string;
  password: string; // Consider removing this from the response for security
  roli: number; // Ensure this corresponds to the role ID
}

export interface Role {
  id: number;
  roleName: string; // Ensure this matches your Role entity
}
