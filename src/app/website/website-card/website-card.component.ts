import { Component } from '@angular/core';
import { WebsiteHeaderComponent } from "../website-header/website-header.component";
import { FooterComponent } from "../../auth/dashboard/component-dashboard/footer/footer.component";
import { WebsiteFooterComponent } from "../website-footer/website-footer.component";

@Component({
  selector: 'app-website-card',
  standalone: true,
  imports: [WebsiteHeaderComponent, FooterComponent, WebsiteFooterComponent],
  templateUrl: './website-card.component.html',
  styleUrl: './website-card.component.css'
})
export class WebsiteCardComponent {

}
