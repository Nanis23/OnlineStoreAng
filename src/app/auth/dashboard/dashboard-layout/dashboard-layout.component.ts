import { Component } from '@angular/core';
import { HeaderComponent } from '../component-dashboard/header/header.component';
import { FooterComponent } from '../component-dashboard/footer/footer.component';
import { SidebarComponent } from '../component-dashboard/sidebar/sidebar.component';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    HeaderComponent, FooterComponent, SidebarComponent, NgClass, CommonModule
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {
  sidebarCollapsed: boolean = false; // Define sidebarCollapsed

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
