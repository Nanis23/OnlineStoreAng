import { Component, importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RegistrationComponent } from './auth/registration/registration.component';
import { CategoryComponent } from './components/category/category.component';
import { HeaderComponent } from "./auth/dashboard/component-dashboard/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RegistrationComponent,
    ReactiveFormsModule, CategoryComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'OnlineShop';
}
