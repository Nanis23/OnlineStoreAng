import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserDTO {
  id: number;
  email: string;
  city: string;
  zipCode: string;
  roli: number; 
  password?: string; 
}

@Injectable({
  providedIn: 'root',
})


export class UserService {
  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.baseUrl}/allUsers`);
  }

  registerUser(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.baseUrl}/register`, user);
  }

  updateUser(user: UserDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(`${this.baseUrl}/profile`, user);
  }
  

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
