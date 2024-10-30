import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post(`${BASE_URL}/api/user/register`, registerRequest);
  }

  // New method to fetch roles
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${BASE_URL}/api/roles`); // Adjust the endpoint as needed
  }
}

export interface RegisterRequest {
  email: string;
  city: string;
  zipCode: string;
  roli: number; // Ensure this corresponds to the role ID
  password: string;
}

export interface Role {
  id: number;
  roleName: string; // Ensure this matches your Role entity
}
