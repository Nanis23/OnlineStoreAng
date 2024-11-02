import { Component, OnInit } from '@angular/core';
import { AuthorService, AuthorDTO } from '../../services/author.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  authors: AuthorDTO[] = [];
  newAuthor: AuthorDTO = {
    id: 0,
    firstName: '',
    lastName: ''
  };
  editingAuthor: AuthorDTO | null = null;
  searchTerm: string = '';

  constructor(private authorService: AuthorService) {}

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors(): void {
    this.authorService.getAuthors().subscribe(data => {
      this.authors = data;
    });
  }

  addAuthor(): void {
    if (this.newAuthor.firstName && this.newAuthor.lastName) {
      this.authorService.saveAuthor(this.newAuthor).subscribe(
        (author) => {
          this.authors.push(author);
          this.newAuthor = { id: 0, firstName: '', lastName: '' };
        },
        (error) => console.error('Error while adding author:', error)
      );
    }
  }

  deleteAuthor(userId: number): void {
    this.authorService.deleteAuthor(userId).subscribe(() => {
      this.loadAuthors();
    });
  }

  startEditing(author: AuthorDTO): void {
    this.editingAuthor = { ...author };
  }

  updateEditingAuthorFirstName(firstName: string): void {
    if (this.editingAuthor) {
      this.editingAuthor.firstName = firstName;
    }
  }

  updateEditingAuthorLastName(lastName: string): void {
    if (this.editingAuthor) {
      this.editingAuthor.lastName = lastName;
    }
  }

  updateAuthor(): void {
    if (this.editingAuthor) {
      this.authorService.updateAuthor(this.editingAuthor).subscribe(
        (updatedAuthor) => {
          const index = this.authors.findIndex(auth => auth.id === updatedAuthor.id);
          if (index > -1) {
            this.authors[index] = updatedAuthor;
          }
          this.editingAuthor = null;
        },
        (error) => console.error('Error while updating author:', error)
      );
    }
  }

  cancelEditing(): void {
    this.editingAuthor = null;
  }

  filteredAuthors(): AuthorDTO[] {
    if (!this.searchTerm) {
      return this.authors;
    }
    return this.authors.filter(author =>
      author.firstName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      author.lastName?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
