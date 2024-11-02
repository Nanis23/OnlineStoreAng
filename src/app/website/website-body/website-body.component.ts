import { Component } from '@angular/core';
import { WebsiteHeaderComponent } from "../website-header/website-header.component";
import { WebsiteFooterComponent } from "../website-footer/website-footer.component";
import { WebsiteCardComponent } from "../website-card/website-card.component";

@Component({
  selector: 'app-website-body',
  standalone: true,
  imports: [WebsiteHeaderComponent, WebsiteFooterComponent, WebsiteCardComponent],
  templateUrl: './website-body.component.html',
  styleUrl: './website-body.component.css'
})
export class WebsiteBodyComponent {

}
