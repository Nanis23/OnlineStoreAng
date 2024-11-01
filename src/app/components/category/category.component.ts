import { Component, OnInit } from '@angular/core';
import { CategoryService,Category } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 




@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  newCategory: Category = {
    id: 0,
    name: ''
    
  };
  editingCategory: Category | null = null;
  searchTerm: string = '';

  constructor(private categoryService: CategoryService) {

    
  }
  

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }


  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  // Shton një kategori të re
  addCategory(): void {
    if (this.newCategory.name) {
      this.categoryService.addCategory(this.newCategory).subscribe(
        (category) => {
          this.categories.push(category); // Shto kategorinë e re në listë
          this.newCategory = { id: 0,name: '' }; // Pastro fushën e kategorisë
        },
        (error) => console.error('Error while adding category:', error)
      );
    }
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(
      () => {
        this.categories = this.categories.filter(category => category.id !== id);
      },
      (error) => console.error('Error while deleting category:', error)
    );
  }

  startEditing(category: Category): void {
    this.editingCategory = { ...category };
  }

  updateEditingCategoryName(name: string): void {
    if (this.editingCategory) {
      this.editingCategory.name = name;
    }
  }

  updateCategory(): void {
    if (this.editingCategory) { // Kontrollohet që editingCategory nuk është null
      this.categoryService.updateCategory(this.editingCategory).subscribe(
        (updatedCategory) => {
          const index = this.categories.findIndex(cat => cat.id === updatedCategory.id);
          if (index > -1) {
            this.categories[index] = updatedCategory;
          }
          this.editingCategory = null;
        },
        (error) => console.error('Error while updating category:', error)
      );
    }
  }
  

  cancelEditing(): void {
    this.editingCategory = null;
  }

  filteredCategories(): Category[] {
    if (!this.searchTerm) {
      return this.categories;
    }
    return this.categories.filter(category => 
      category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
