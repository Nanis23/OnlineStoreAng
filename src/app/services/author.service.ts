import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthorDTO {
  id:number,
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private apiUrl = 'http://localhost:8080/api/admin/authors';

  constructor(private http: HttpClient) { }

  // Save a new author
  saveAuthor(author: AuthorDTO): Observable<AuthorDTO> {
    return this.http.post<AuthorDTO>(this.apiUrl, author);
  }

  getAuthors(): Observable<AuthorDTO[]> {
    return this.http.get<AuthorDTO[]>(this.apiUrl);
  }

  // Get an author by ID
  getAuthorById(id: number): Observable<AuthorDTO | null> {
    return this.http.get<AuthorDTO>(`${this.apiUrl}/${id}`);
  }

  // Search for an author by first and last name
  getAuthorByName(firstName: string, lastName: string): Observable<AuthorDTO | null> {
    return this.http.get<AuthorDTO>(`${this.apiUrl}/search?firstName=${firstName}&lastName=${lastName}`);
  }

  // Delete an author by ID
  deleteAuthor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateAuthor(author: AuthorDTO): Observable<AuthorDTO> {
    return this.http.put<AuthorDTO>(`${this.apiUrl}/${author.id}`, author);
  }
}
