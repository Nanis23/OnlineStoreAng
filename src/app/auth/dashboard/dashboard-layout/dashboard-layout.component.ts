import { Component } from '@angular/core';
import { HeaderComponent } from '../component-dashboard/header/header.component';
import { FooterComponent } from '../component-dashboard/footer/footer.component';
import { SidebarComponent } from '../component-dashboard/sidebar/sidebar.component';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegisterUserComponent } from "../user/register-user/register-user.component";
import { UpdateUserComponent } from "../user/update-user/update-user.component";
import { DeleteUserComponent } from "../user/delete-user/delete-user.component";
import { CategoryComponent } from "../../../components/category/category.component";
import { UserComponent } from "../../../components/user/user.component";
import { ProductComponent } from "../../../components/product/product.component";


@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    HeaderComponent, FooterComponent, SidebarComponent, NgClass, CommonModule,
    RegisterUserComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    CategoryComponent,
    UserComponent,
    ProductComponent
],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {
  sidebarCollapsed = false;
  activeComponent: string | null = null;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  showComponent(componentName: string) {
    this.activeComponent = componentName;
  }
}
