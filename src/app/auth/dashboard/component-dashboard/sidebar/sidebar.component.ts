import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';

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
  collapsed = false;

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }
}
