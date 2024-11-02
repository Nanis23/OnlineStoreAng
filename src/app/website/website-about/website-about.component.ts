import { Component } from '@angular/core';
import { WebsiteHeaderComponent } from "../website-header/website-header.component";
import { WebsiteFooterComponent } from "../website-footer/website-footer.component";
import { WebsiteCardComponent } from "../website-card/website-card.component";


@Component({
  selector: 'app-website-about',
  standalone: true,
  imports: [WebsiteHeaderComponent,WebsiteFooterComponent],
  templateUrl: './website-about.component.html',
  styleUrl: './website-about.component.css'
})
export class WebsiteAboutComponent {

}
