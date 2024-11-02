import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteBodyComponent } from './website-body.component';

describe('WebsiteBodyComponent', () => {
  let component: WebsiteBodyComponent;
  let fixture: ComponentFixture<WebsiteBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebsiteBodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsiteBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
