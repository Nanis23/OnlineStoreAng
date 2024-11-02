import { Component, OnInit } from '@angular/core';
import { WebsiteHeaderComponent } from "../website-header/website-header.component";
import { FooterComponent } from "../../auth/dashboard/component-dashboard/footer/footer.component";
import { WebsiteFooterComponent } from "../website-footer/website-footer.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { ProductComponent } from '../../components/product/product.component';

@Component({
  selector: 'app-website-card',
  standalone: true,
  imports: [
    ProductComponent,
    WebsiteHeaderComponent,
    FooterComponent,
    WebsiteFooterComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './website-card.component.html',
  styleUrls: ['./website-card.component.css']
})
export class WebsiteCardComponent implements OnInit {
  products: Product[] = [];
  currency: string = 'ALL';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error loading products', error);
      }
    );
  }
}
