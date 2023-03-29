import { TestBed } from '@angular/core/testing';

import { SpecialShiftsService } from './special-shifts.service';

describe('SpecialShiftsService', () => {
  let service: SpecialShiftsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialShiftsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
