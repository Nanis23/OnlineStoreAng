import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ComponentStateService } from './component-state-service.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports:[
    NgClass, CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  sidebarCollapsed: boolean = false;

  constructor(private componentStateService: ComponentStateService) {}

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  showComponent(component: string) {
    this.componentStateService.setActiveComponent(component);
  }
}
