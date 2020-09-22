import { TestBed } from '@angular/core/testing';

import { CabserviceService } from './cabservice.service';

describe('CabserviceService', () => {
  let service: CabserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CabserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
