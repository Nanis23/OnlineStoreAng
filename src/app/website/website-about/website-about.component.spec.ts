import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteAboutComponent } from './website-about.component';

describe('WebsiteAboutComponent', () => {
  let component: WebsiteAboutComponent;
  let fixture: ComponentFixture<WebsiteAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebsiteAboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsiteAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
