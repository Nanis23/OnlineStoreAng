import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { CategoryService, Category } from '../../services/category.service';
import { AuthorDTO, AuthorService } from '../../services/author.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  authors: AuthorDTO[] = [];
  newProduct: Product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    availability: 0,
    productType: '',
    categoryId: 0,
    authorId: 0
  };
  editingProduct: Product | null = null;
  searchTerm: string = '';
  productTypes: string[] = ['DIGITAL', 'PHYSICAL'];


  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private authorService: AuthorService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadAuthors();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  loadAuthors(): void {
    this.authorService.getAuthors().subscribe(data => {
      this.authors = data;
    });
  }

  addProduct(): void {
    if (this.newProduct.title && this.newProduct.description) {
      this.productService.addProduct(this.newProduct).subscribe(
        product => {
          this.products.push(product);
          this.newProduct = { id: 0, title: '', description: '', price: 0, availability: 0, productType: '', categoryId: 0, authorId: 0 }; // Reset
        },
        error => console.error('Error while adding product:', error)
      );
    }
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.products = this.products.filter(product => product.id !== id);
      },
      error => console.error('Error while deleting product:', error)
    );
  }

  startEditing(product: Product): void {
    this.editingProduct = { ...product };
  }

  updateProduct(): void {
    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct).subscribe(
        updatedProduct => {
          const index = this.products.findIndex(prod => prod.id === updatedProduct.id);
          if (index > -1) {
            this.products[index] = updatedProduct;
          }
          this.editingProduct = null;
        },
        error => console.error('Error while updating product:', error)
      );
    }
  }

  cancelEditing(): void {
    this.editingProduct = null;
  }

  filteredProducts(): Product[] {
    if (!this.searchTerm) {
      return this.products;
    }
    return this.products.filter(product => 
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  updateEditingProductTitle(title: string): void {
    if (this.editingProduct) {
      this.editingProduct.title = title;
    }
  }


}
