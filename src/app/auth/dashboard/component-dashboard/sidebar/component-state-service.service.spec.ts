import { TestBed } from '@angular/core/testing';

import { ComponentStateServiceService } from './component-state-service.service';

describe('ComponentStateServiceService', () => {
  let service: ComponentStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
