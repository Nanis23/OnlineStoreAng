import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const BASE_URL = "http://localhost:8080"; 

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${BASE_URL}/api/user/allUsers`).pipe(
      catchError(this.handleError) 
    );
  }



updateUser(user: User): Observable<any> {
  return this.http.put(`${BASE_URL}/api/user/profile`, user)
    .pipe(
      catchError(this.handleError)
    ); 
}



  
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error); 
    return throwError('Something went wrong; please try again later.'); 
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${BASE_URL}/api/roles`);
  }
}


export interface User {
  id: number;
  email: string;
  city: string;
  zipCode: string;
  password: string; 
  roli: number; 
}

export interface Role {
  id: number;
  roleName: string; 
}
