import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../component-dashboard/header/header.component';
import { FooterComponent } from '../component-dashboard/footer/footer.component';
import { SidebarComponent } from '../component-dashboard/sidebar/sidebar.component';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegisterUserComponent } from "../user/register-user/register-user.component";
import { UpdateUserComponent } from "../user/update-user/update-user.component";
import { DeleteUserComponent } from "../user/delete-user/delete-user.component";
import { ComponentStateService } from '../component-dashboard/sidebar/component-state-service.service';


@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    HeaderComponent,  FooterComponent, SidebarComponent, NgClass, CommonModule,
    RegisterUserComponent,
    UpdateUserComponent,
    DeleteUserComponent
],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {
  activeComponent: string = ''; // Ensure activeComponent is initialized
  sidebarCollapsed: boolean = false; // Declare and initialize sidebarCollapsed

  constructor(private componentStateService: ComponentStateService) {}

  ngOnInit(): void {
    this.componentStateService.activeComponent$.subscribe(component => {
      this.activeComponent = component;
    });
  }

  // Method to toggle the sidebar state
  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  // Method to show a specific component
  showComponent(componentName: string): void {
    this.activeComponent = componentName;
  }
}
