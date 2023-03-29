import { TestBed } from '@angular/core/testing';

import { SwappingService } from './swapping.service';

describe('SwappingService', () => {
  let service: SwappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
