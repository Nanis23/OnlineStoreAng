import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const BASE_URL = "http://localhost:8080";// Update to your endpoint
@Injectable({
  providedIn: 'root',
})
export class UserService {
  

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${BASE_URL}/api/user/allUsers`);
    // .pipe(
    //   catchError(this.handleError) // Add error handling
    // );
  }

  private handleError(error: HttpErrorResponse) {
    // Handle the error and log it to the console
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}

// User interface definition
export interface User {
  id: number;
  city: string;
  email: string;
  password: string;
  zipCode: string;
  roli: number; // Ensure this corresponds to the role ID
  // Consider removing this from the response for security
}

// Role interface definition (if needed in future)
export interface Role {
  id: number;
  roleName: string;
}
